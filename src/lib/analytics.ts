/**
 * Analytics Engine — computes summary, insights, daily/hourly data and forecast.
 * Uses raw session overlaps for recent windows and day-accurate charts.
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

function shiftByOffset(d: Date, timezoneOffsetMinutes: number): Date {
  return new Date(d.getTime() - timezoneOffsetMinutes * 60_000);
}

function formatShiftedDateKey(d: Date, timezoneOffsetMinutes: number): string {
  const shifted = shiftByOffset(d, timezoneOffsetMinutes);
  const year = shifted.getUTCFullYear();
  const month = String(shifted.getUTCMonth() + 1).padStart(2, "0");
  const day = String(shifted.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfDay(d: Date, timezoneOffsetMinutes = 0): Date {
  const shifted = shiftByOffset(d, timezoneOffsetMinutes);
  return new Date(
    Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate()) +
      timezoneOffsetMinutes * 60_000
  );
}

function addUtcDays(d: Date, days: number): Date {
  const next = new Date(d);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function clampSessionRange(start: Date, end: Date, windowStart: Date, windowEnd: Date) {
  const clampedStart = start > windowStart ? start : windowStart;
  const clampedEnd = end < windowEnd ? end : windowEnd;

  if (clampedStart >= clampedEnd) {
    return null;
  }

  return { start: clampedStart, end: clampedEnd };
}

// ─── Main Analytics Function ──────────────────────────────────────────────────

export async function computeAnalytics(
  userId: string,
  playerId: string,
  timezoneOffsetMinutes = 0
): Promise<AnalyticsResult> {
  const now = new Date();
  const todayStart = startOfDay(now, timezoneOffsetMinutes);
  const day84Ago = addUtcDays(todayStart, -84);
  const last24hStart = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const last7dStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [sessions, todaySessions] = await Promise.all([
    prisma.session.findMany({
      where: {
        userId,
        playerId,
        joinedAt: { lt: now },
        OR: [{ leftAt: null }, { leftAt: { gt: day84Ago } }],
      },
      select: {
        joinedAt: true,
        leftAt: true,
        durationSec: true,
      },
      orderBy: { joinedAt: "asc" },
    }),
    prisma.session.findMany({
      where: {
        userId,
        playerId,
        joinedAt: { lt: now },
        OR: [{ leftAt: null }, { leftAt: { gt: todayStart } }],
      },
      select: {
        joinedAt: true,
        leftAt: true,
      },
      orderBy: { joinedAt: "asc" },
    }),
  ]);

  let last24h = 0;
  let last7d = 0;
  let last12w = 0;
  const dailyMap = new Map<string, DailyPoint>();
  const todayHourlyBuckets = new Array<number>(24).fill(0);
  const historicalHourlyBuckets = new Array<number>(24).fill(0);
  let closedSessionCount = 0;
  let closedSessionTime = 0;

  for (const session of todaySessions) {
    const sessionEnd = session.leftAt ?? now;
    const todayRange = clampSessionRange(session.joinedAt, sessionEnd, todayStart, now);
    if (!todayRange) {
      continue;
    }

    const hourSplits = splitSessionAcrossHours(
      todayRange.start,
      todayRange.end,
      timezoneOffsetMinutes
    );
    for (const { hour, seconds } of hourSplits) {
      todayHourlyBuckets[hour] += seconds;
    }
  }

  for (const session of sessions) {
    const sessionEnd = session.leftAt ?? now;

    const range24h = clampSessionRange(session.joinedAt, sessionEnd, last24hStart, now);
    if (range24h) {
      last24h += Math.round((range24h.end.getTime() - range24h.start.getTime()) / 1000);
    }

    const range7d = clampSessionRange(session.joinedAt, sessionEnd, last7dStart, now);
    if (range7d) {
      last7d += Math.round((range7d.end.getTime() - range7d.start.getTime()) / 1000);
    }

    const range12w = clampSessionRange(session.joinedAt, sessionEnd, day84Ago, now);
    if (range12w) {
      const daySplits = splitSessionAcrossDays(
        range12w.start,
        range12w.end,
        timezoneOffsetMinutes
      );
      for (const { date, seconds } of daySplits) {
        const key = formatShiftedDateKey(date, timezoneOffsetMinutes);
        const existing = dailyMap.get(key);

        if (existing) {
          existing.totalTimeSec += seconds;
          existing.sessionsCount += 1;
        } else {
          dailyMap.set(key, {
            date: key,
            totalTimeSec: seconds,
            sessionsCount: 1,
          });
        }

        last12w += seconds;
      }

      const hourSplits = splitSessionAcrossHours(
        range12w.start,
        range12w.end,
        timezoneOffsetMinutes
      );
      for (const { hour, seconds } of hourSplits) {
        historicalHourlyBuckets[hour] += seconds;
      }
    }

    if (session.leftAt && session.durationSec) {
      closedSessionCount += 1;
      closedSessionTime += session.durationSec;
    }
  }

  // ── Insights ───────────────────────────────────────────────────────────────
  const sortedByTime = historicalHourlyBuckets
    .map((totalTimeSec, hour) => ({ hour, totalTimeSec }))
    .sort((a, b) => b.totalTimeSec - a.totalTimeSec);
  const peakHours = sortedByTime.slice(0, 3).map((h) => h.hour);
  const deadHours = sortedByTime.slice(-3).map((h) => h.hour);
  const avgSessionLength =
    closedSessionCount > 0 ? Math.round(closedSessionTime / closedSessionCount) : 0;

  // ── Forecast (recency-weighted) ────────────────────────────────────────────
  const forecast = await computeForecast(userId, playerId, now);

  // ── Format outputs ─────────────────────────────────────────────────────────
  const daily: DailyPoint[] = [...dailyMap.values()].sort((a, b) => a.date.localeCompare(b.date));
  const hourly: HourlyPoint[] = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    totalTimeSec: todayHourlyBuckets[hour],
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
  end: Date,
  timezoneOffsetMinutes = 0
): { hour: number; seconds: number }[] {
  const result: { hour: number; seconds: number }[] = [];
  let cursor = new Date(start);

  while (cursor < end) {
    const shiftedCursor = shiftByOffset(cursor, timezoneOffsetMinutes);
    const hour = shiftedCursor.getUTCHours();
    const shiftedHourEnd = new Date(shiftedCursor);
    shiftedHourEnd.setUTCHours(hour + 1, 0, 0, 0);
    const hourEnd = new Date(shiftedHourEnd.getTime() + timezoneOffsetMinutes * 60_000);
    const segEnd = hourEnd < end ? hourEnd : end;
    const seconds = Math.round((segEnd.getTime() - cursor.getTime()) / 1000);
    if (seconds > 0) result.push({ hour, seconds });
    cursor = hourEnd;
  }

  return result;
}

export function splitSessionAcrossDays(
  start: Date,
  end: Date,
  timezoneOffsetMinutes = 0
): { date: Date; seconds: number }[] {
  const result: { date: Date; seconds: number }[] = [];
  let cursor = new Date(start);

  while (cursor < end) {
    const dayStart = startOfDay(cursor, timezoneOffsetMinutes);
    const dayEnd = addUtcDays(dayStart, 1);
    const segEnd = dayEnd < end ? dayEnd : end;
    const seconds = Math.round((segEnd.getTime() - cursor.getTime()) / 1000);

    if (seconds > 0) {
      result.push({ date: dayStart, seconds });
    }

    cursor = dayEnd;
  }

  return result;
}
