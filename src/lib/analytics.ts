/**
 * Analytics Engine — computes summary, insights, daily/hourly data and forecast.
 * All reads use precomputed aggregation tables (no raw session scans).
 */

import { prisma } from "./prisma";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AnalyticsSummary {
  last24h: number;
  last7d: number;
  last12w: number;
}

export interface InsightData {
  peakHours: number[];
  deadHours: number[];
  avgSessionLength: number; // seconds
}

export interface ForecastPoint {
  hour: number;
  probability: number;
}

export interface DailyPoint {
  date: string; // ISO date string
  totalTimeSec: number;
  sessionsCount: number;
}

export interface HourlyPoint {
  hour: number;
  totalTimeSec: number;
}

export interface AnalyticsResult {
  summary: AnalyticsSummary;
  daily: DailyPoint[];
  hourly: HourlyPoint[];
  insights: InsightData;
  forecast: ForecastPoint[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function startOfDay(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

// ─── Main Analytics Function ──────────────────────────────────────────────────

export async function computeAnalytics(
  userId: string,
  playerId: string
): Promise<AnalyticsResult> {
  const now = new Date();
  const day84Ago = new Date(now);
  day84Ago.setUTCDate(day84Ago.getUTCDate() - 84);

  // ── Fetch daily stats (last 84 days) ──────────────────────────────────────
  const dailyStats = await prisma.playerDailyStat.findMany({
    where: { userId, playerId, date: { gte: day84Ago } },
    orderBy: { date: "asc" },
  });

  // ── Fetch hourly stats ─────────────────────────────────────────────────────
  const hourlyStats = await prisma.playerHourlyStat.findMany({
    where: { userId, playerId },
    orderBy: { hour: "asc" },
  });

  // ── Summary ────────────────────────────────────────────────────────────────
  const todayStart = startOfDay(now);
  const day7Ago = new Date(now);
  day7Ago.setUTCDate(day7Ago.getUTCDate() - 7);

  let last24h = 0;
  let last7d = 0;
  let last12w = 0;

  for (const stat of dailyStats) {
    last12w += stat.totalTimeSec;
    if (stat.date >= day7Ago) last7d += stat.totalTimeSec;
    if (stat.date >= todayStart) last24h += stat.totalTimeSec;
  }

  // Add current open session time to last24h, hourly, and daily
  const openSession = await prisma.session.findFirst({
    where: { userId, playerId, leftAt: null },
    orderBy: { joinedAt: "desc" },
  });
  if (openSession) {
    const elapsed = Math.floor((now.getTime() - openSession.joinedAt.getTime()) / 1000);
    last24h += elapsed;

    // Merge into hourly stats for heatmap
    const splits = splitSessionAcrossHours(openSession.joinedAt, now);
    for (const { hour, seconds } of splits) {
      const existingHour = hourlyStats.find((h) => h.hour === hour);
      if (existingHour) {
        existingHour.totalTimeSec += seconds;
      } else {
        hourlyStats.push({ id: -1, userId, playerId, hour, totalTimeSec: seconds });
      }
    }

    // Merge into daily stats
    const today = startOfDay(now);
    const existingDaily = dailyStats.find((d) => d.date.getTime() === today.getTime());
    if (existingDaily) {
      existingDaily.totalTimeSec += elapsed;
    } else {
      dailyStats.push({
        id: -1,
        userId,
        playerId,
        date: today,
        totalTimeSec: elapsed,
        sessionsCount: 1,
      });
    }
  }

  // ── Insights ───────────────────────────────────────────────────────────────
  const sortedByTime = [...hourlyStats].sort((a, b) => b.totalTimeSec - a.totalTimeSec);
  const peakHours = sortedByTime.slice(0, 3).map((h) => h.hour);
  const deadHours = sortedByTime.slice(-3).map((h) => h.hour);

  const totalSessions = dailyStats.reduce((s, d) => s + d.sessionsCount, 0);
  const totalTime = dailyStats.reduce((s, d) => s + d.totalTimeSec, 0);
  const avgSessionLength = totalSessions > 0 ? Math.round(totalTime / totalSessions) : 0;

  // ── Forecast (recency-weighted) ────────────────────────────────────────────
  const forecast = await computeForecast(userId, playerId, now);

  // ── Format outputs ─────────────────────────────────────────────────────────
  const daily: DailyPoint[] = dailyStats.map((s) => ({
    date: s.date.toISOString().split("T")[0],
    totalTimeSec: s.totalTimeSec,
    sessionsCount: s.sessionsCount,
  }));

  const hourly: HourlyPoint[] = hourlyStats.map((s) => ({
    hour: s.hour,
    totalTimeSec: s.totalTimeSec,
  }));

  return {
    summary: { last24h, last7d, last12w },
    daily,
    hourly,
    insights: { peakHours, deadHours, avgSessionLength },
    forecast,
  };
}

// ─── Recency-Weighted Forecast ─────────────────────────────────────────────────
// weight = e^(-daysAgo / 7) per session, split across its hours

async function computeForecast(
  userId: string,
  playerId: string,
  now: Date
): Promise<ForecastPoint[]> {
  // Look at sessions in last 84 days
  const cutoff = new Date(now);
  cutoff.setUTCDate(cutoff.getUTCDate() - 84);

  const sessions = await prisma.session.findMany({
    where: {
      userId,
      playerId,
      joinedAt: { gte: cutoff },
      leftAt: { not: null },
    },
    select: { joinedAt: true, leftAt: true, durationSec: true },
  });

  const weightedHours = new Array(24).fill(0);
  let totalWeight = 0;

  for (const session of sessions) {
    if (!session.leftAt || !session.durationSec) continue;
    const daysAgo = (now.getTime() - session.joinedAt.getTime()) / (1000 * 60 * 60 * 24);
    const weight = Math.exp(-daysAgo / 7);

    // Split session across hours
    const splits = splitSessionAcrossHours(session.joinedAt, session.leftAt);
    for (const { hour, seconds } of splits) {
      const contribution = weight * (seconds / session.durationSec);
      weightedHours[hour] += contribution;
      totalWeight += contribution;
    }
  }

  return Array.from({ length: 24 }, (_, hour) => ({
    hour,
    probability: totalWeight > 0 ? weightedHours[hour] / totalWeight : 0,
  }));
}

// ─── Session Hour Splitter ────────────────────────────────────────────────────

export function splitSessionAcrossHours(
  start: Date,
  end: Date
): { hour: number; seconds: number }[] {
  const result: { hour: number; seconds: number }[] = [];
  let cursor = new Date(start);

  while (cursor < end) {
    const hour = cursor.getUTCHours();
    const hourEnd = new Date(cursor);
    hourEnd.setUTCHours(hour + 1, 0, 0, 0);
    const segEnd = hourEnd < end ? hourEnd : end;
    const seconds = Math.round((segEnd.getTime() - cursor.getTime()) / 1000);
    if (seconds > 0) result.push({ hour, seconds });
    cursor = hourEnd;
  }

  return result;
}
