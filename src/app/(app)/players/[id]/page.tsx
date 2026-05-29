"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  Calendar,
  ChevronLeft,
  Clock,
  Server,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalyticsSummary {
  last24h: number;
  last7d: number;
  last12w: number;
}

interface InsightData {
  peakHours: number[];
  deadHours: number[];
  avgSessionLength: number;
}

interface ForecastPoint {
  hour: number;
  probability: number;
}

interface DailyPoint {
  date: string;
  totalTimeSec: number;
  sessionsCount: number;
}

interface HourlyPoint {
  hour: number;
  totalTimeSec: number;
}

interface Player {
  id: string;
  name: string;
  serverId: string;
  server: { name: string };
  firstSeen: string;
  lastSeen: string;
}

interface AnalyticsResult {
  summary: AnalyticsSummary;
  daily: DailyPoint[];
  hourly: HourlyPoint[];
  insights: InsightData;
  forecast: ForecastPoint[];
}

interface Session {
  id: number;
  joinedAt: string;
  leftAt: string | null;
  durationSec: number | null;
}

function formatHours(seconds: number) {
  return `${(seconds / 3600).toFixed(1)}h`;
}

function formatMin(seconds: number) {
  return `${Math.round(seconds / 60)}m`;
}

function formatDuration(seconds: number | null) {
  if (seconds === null) return "Active";
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

export default function PlayerAnalyticsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [player, setPlayer] = useState<Player | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsResult | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(() => new Date().getTime());

  useEffect(() => {
    async function fetchData() {
      try {
        const timezoneOffsetMinutes = new Date().getTimezoneOffset();
        const [analyticsResponse, sessionsResponse] = await Promise.all([
          axios.get(`/api/players/${id}/analytics`, {
            params: { timezoneOffsetMinutes },
          }),
          axios.get(`/api/sessions`, { params: { playerId: id, limit: 100 } }),
        ]);

        setPlayer(analyticsResponse.data.player);
        setAnalytics(analyticsResponse.data.analytics);
        setSessions(sessionsResponse.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 30000);

    return () => window.clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 pt-10">
        <Skeleton className="h-8 w-32 rounded-xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="grid grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!player || !analytics) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <Users className="mb-4 h-16 w-16 text-muted-foreground opacity-15 text-primary animate-bounce" />
        <h2 className="text-xl font-bold font-heading">Player profile index empty</h2>
        <Link href="/players">
          <Button variant="outline" className="mt-4 rounded-xl border-white/10">
            Return to Directory
          </Button>
        </Link>
      </div>
    );
  }

  const isOnline = currentTime - new Date(player.lastSeen).getTime() < 120000;
  const maxHourlyValue = Math.max(...analytics.hourly.map((item) => item.totalTimeSec), 1);

  const dailyChartData = analytics.daily.slice(-7).map((item) => ({
    name: new Date(item.date).toLocaleDateString(undefined, { weekday: "short" }),
    hours: Number((item.totalTimeSec / 3600).toFixed(2)),
  }));

  const forecastChartData = analytics.forecast.map((item) => ({
    hour: `${item.hour}:00`,
    prob: Number((item.probability * 100).toFixed(1)),
  }));

  return (
    <div className="mx-auto max-w-7xl space-y-10 pb-12">
      {/* Back button */}
      <div>
        <Link
          href="/players"
          className="group mb-6 inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground transition-all hover:text-foreground"
        >
          <div className="mr-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950/20 border border-white/5 transition-all group-hover:border-primary/20 group-hover:bg-primary/5">
            <ChevronLeft className="h-4.5 w-4.5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          Back to directory
        </Link>

        {/* User Dashboard Profile Banner */}
        <div className="glass-card glass-card-hover flex flex-col justify-between gap-8 rounded-3xl border-none p-8 shadow-none md:flex-row md:items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full blur-3xl" />
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-3xl font-black uppercase text-primary shadow-lg shadow-primary/10 font-heading shrink-0">
              {player.name.substring(0, 2)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl font-heading">{player.name}</h1>
                {isOnline ? (
                  <Badge className="h-7 gap-2 rounded-lg bg-green-500/10 px-3 text-[9px] font-extrabold uppercase tracking-widest text-green-400 hover:bg-green-500/20 border border-green-500/25">
                    <span className="pulse-dot" />
                    Online
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="h-7 rounded-lg bg-white/5 px-3 text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground/60 border border-white/5">
                    Offline
                  </Badge>
                )}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-foreground/60">
                <p className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-primary/60" />
                  {player.server.name}
                </p>
                <div className="h-1 w-1 rounded-full bg-muted-foreground/20" />
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary/60" />
                  First seen {new Date(player.firstSeen).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 md:text-right shrink-0">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 font-heading">
                Last 24 Hours
              </p>
              <p className="text-3xl font-black text-primary font-heading">
                {formatHours(analytics.summary.last24h)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 font-heading">
                Last 7 Days
              </p>
              <p className="text-3xl font-black text-foreground font-heading">
                {formatHours(analytics.summary.last7d)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 font-heading">
                Average Session
              </p>
              <p className="text-3xl font-black text-foreground font-heading">
                {formatMin(analytics.insights.avgSessionLength)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-8 h-12 w-full justify-start gap-2 bg-transparent p-0 sm:w-auto">
          <TabsTrigger value="overview" className="rounded-xl px-6 h-11 text-xs font-bold uppercase tracking-widest transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg shadow-primary/20">Overview</TabsTrigger>
          <TabsTrigger value="forecast" className="rounded-xl px-6 h-11 text-xs font-bold uppercase tracking-widest transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg shadow-primary/20">Forecast</TabsTrigger>
          <TabsTrigger value="sessions" className="rounded-xl px-6 h-11 text-xs font-bold uppercase tracking-widest transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg shadow-primary/20">Sessions</TabsTrigger>
        </TabsList>

        {/* OVERVIEW CONTENT */}
        <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Playtime Heatmap */}
            <Card className="glass-card border-none shadow-none overflow-hidden lg:col-span-2 flex flex-col justify-between">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-xl font-bold font-heading">
                  <div className="rounded-xl bg-primary/10 p-2.5 border border-primary/10">
                    <Activity className="h-4.5 w-4.5 text-primary" />
                  </div>
                  Activity Distribution
                </CardTitle>
                <CardDescription className="text-xs font-semibold text-muted-foreground opacity-80 mt-1">
                  Hourly playtime distribution over the last 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex h-44 items-end gap-1.5 px-2">
                  {Array.from({ length: 24 }).map((_, hour) => {
                    const hourData = analytics.hourly.find((item) => item.hour === hour);
                    const totalTimeSec = hourData ? hourData.totalTimeSec : 0;
                    const height = Math.max((totalTimeSec / maxHourlyValue) * 100, 6);

                    return (
                      <div
                        key={hour}
                        className="group relative flex h-full flex-1 flex-col items-center justify-end"
                      >
                        <div
                          className={`w-full rounded-t-lg transition-all duration-300 group-hover:brightness-125 ${
                            totalTimeSec > 0
                              ? "bg-primary shadow-[0_0_15px_rgba(240,110,50,0.25)]"
                              : "bg-white/5 group-hover:bg-white/10"
                          }`}
                          style={{ height: `${height}%` }}
                        />
                        <div className="pointer-events-none absolute -top-12 z-50 rounded-xl glass-panel border border-white/5 p-2.5 text-[9px] font-mono font-bold uppercase tracking-wider whitespace-nowrap text-foreground opacity-0 shadow-2xl transition-all group-hover:-top-14 group-hover:opacity-100">
                          <span className="text-primary">{hour}:00</span> <span className="mx-2 opacity-30">•</span> {formatHours(totalTimeSec)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-between font-mono text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40 px-2">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:00</span>
                </div>
              </CardContent>
            </Card>

            {/* Insights Panel */}
            <Card className="glass-card border-none shadow-none overflow-hidden flex flex-col justify-between">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold font-heading">Insights</CardTitle>
                <CardDescription className="text-xs font-semibold text-muted-foreground opacity-80">
                  Behavioral pattern analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Peak Activity (UTC)</p>
                  <div className="flex flex-wrap gap-2">
                    {analytics.insights.peakHours.map((hour) => (
                      <Badge key={hour} variant="secondary" className="rounded-lg bg-primary/10 text-primary border border-primary/20 px-3 py-0.5 font-bold">
                        {hour}:00
                      </Badge>
                    ))}
                    {analytics.insights.peakHours.length === 0 && <span className="text-xs font-semibold opacity-40 italic">Not enough data</span>}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Dead Hours (UTC)</p>
                  <div className="flex flex-wrap gap-2">
                    {analytics.insights.deadHours.map((hour) => (
                      <Badge key={hour} variant="outline" className="rounded-lg border-white/10 text-muted-foreground/60 px-3 py-0.5 font-bold">
                        {hour}:00
                      </Badge>
                    ))}
                    {analytics.insights.deadHours.length === 0 && <span className="text-xs font-semibold opacity-40 italic">Rarely offline</span>}
                  </div>
                </div>
                <div className="pt-5 border-t border-white/5">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">Last Seen active</p>
                  <p className="text-xs font-bold text-foreground/80 font-mono">
                    {new Date(player.lastSeen).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Trend Chart */}
          <Card className="glass-card border-none shadow-none overflow-hidden">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl font-bold font-heading">
                <div className="rounded-xl bg-primary/10 p-2.5 border border-primary/10">
                  <BarChart3 className="h-4.5 w-4.5 text-primary" />
                </div>
                Weekly play trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyChartData}>
                    <defs>
                      <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.15} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700 }}
                      tickFormatter={(value) => `${value}h`}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.02)", radius: 8 }}
                      contentStyle={{
                        backgroundColor: "rgba(10, 8, 16, 0.9)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "16px",
                        boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
                        padding: "12px 16px"
                      }}
                      itemStyle={{ color: "var(--primary)", fontWeight: 800, fontSize: '12px' }}
                      labelStyle={{ color: "rgba(255,255,255,0.5)", marginBottom: '4px', fontWeight: 750, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                    />
                    <Bar dataKey="hours" fill="url(#barGrad)" radius={[6, 6, 2, 2]} barSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FORECAST CONTENT */}
        <TabsContent value="forecast" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="glass-card border-none shadow-none overflow-hidden">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl font-bold font-heading">
                <div className="rounded-xl bg-primary/10 p-2.5 border border-primary/10">
                  <Activity className="h-4.5 w-4.5 text-primary" />
                </div>
                Intelligence Forecast Radar
              </CardTitle>
              <CardDescription className="text-xs font-semibold text-muted-foreground opacity-80 mt-1">
                Probability of the player being online at any given hour based on recency-weighted historical session analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full pt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastChartData}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                    <XAxis 
                      dataKey="hour" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700 }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(10, 8, 16, 0.9)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "16px",
                        boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
                        padding: "12px 16px"
                      }}
                      formatter={(value) => {
                        const displayValue = Array.isArray(value) ? value[0] : value;
                        return [`${displayValue ?? 0}%`, "Online Probability"];
                      }}
                      itemStyle={{ color: "var(--primary)", fontWeight: 800, fontSize: '12px' }}
                      labelStyle={{ color: "rgba(255,255,255,0.5)", marginBottom: '4px', fontWeight: 750, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="prob"
                      stroke="var(--primary)"
                      strokeWidth={4}
                      dot={{ r: 5, fill: "var(--background)", stroke: "var(--primary)", strokeWidth: 3 }}
                      activeDot={{ r: 8, strokeWidth: 0, fill: "var(--primary)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SESSIONS CONTENT */}
        <TabsContent value="sessions" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="glass-card border-none shadow-none overflow-hidden">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl font-bold font-heading">
                <div className="rounded-xl bg-primary/10 p-2.5 border border-primary/10">
                  <Clock className="h-4.5 w-4.5 text-primary" />
                </div>
                Session logs archive
              </CardTitle>
              <CardDescription className="text-xs font-semibold text-muted-foreground opacity-80 mt-1">
                Recent historical captures of player activity inside monitored worlds.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessions.length === 0 ? (
                  <div className="py-20 text-center border border-dashed border-white/5 rounded-2xl bg-zinc-950/20">
                    <Clock className="mx-auto h-12 w-12 opacity-15 mb-4 text-primary" />
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70 italic">No recent sessions discovered.</p>
                  </div>
                ) : (
                  sessions.map((session) => (
                    <div
                      key={session.id}
                      className="group flex items-center justify-between rounded-2xl border border-white/5 bg-zinc-950/20 p-5 transition-all duration-300 hover:bg-zinc-950/45 hover:border-primary/20"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-foreground/90 font-mono">
                          {new Date(session.joinedAt).toLocaleString()}
                        </p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">
                          {session.leftAt
                            ? `Disconnected at ${new Date(session.leftAt).toLocaleTimeString()}`
                            : "Active sandbox session"}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={session.durationSec === null ? "default" : "secondary"}
                          className={`rounded-lg px-3 py-1 font-bold text-[9px] uppercase tracking-widest border border-white/5 ${session.durationSec === null ? 'bg-green-500/10 text-green-400 border-green-500/25 animate-pulse' : 'bg-white/5 text-muted-foreground/80'}`}
                        >
                          {session.durationSec === null && <span className="pulse-dot mr-1.5" />}
                          {formatDuration(session.durationSec)}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
