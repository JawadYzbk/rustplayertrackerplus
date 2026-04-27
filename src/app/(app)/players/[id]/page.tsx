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
        const [analyticsResponse, sessionsResponse] = await Promise.all([
          axios.get(`/api/players/${id}/analytics`),
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
      <div className="mx-auto max-w-6xl space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <div className="grid grid-cols-3 gap-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  if (!player || !analytics) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <Users className="mb-4 h-16 w-16 text-muted-foreground opacity-20" />
        <h2 className="text-xl font-bold">Player not found</h2>
        <Link href="/players">
          <Button variant="outline" className="mt-4">
            Return to Players
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
    <div className="mx-auto max-w-7xl space-y-6 pb-12">
      <Link
        href="/players"
        className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to directory
      </Link>

      <div className="flex flex-col justify-between gap-6 rounded-2xl border bg-card/50 p-6 md:flex-row md:items-center">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-primary/30 bg-primary/20 text-2xl font-bold uppercase text-primary">
            {player.name.substring(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{player.name}</h1>
              {isOnline ? (
                <Badge className="gap-1.5 bg-green-500/20 text-green-500 hover:bg-green-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  Online
                </Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">
                  Offline
                </Badge>
              )}
            </div>
            <p className="mt-1 flex items-center gap-2 text-muted-foreground">
              <Server className="h-3.5 w-3.5" />
              {player.server.name}
              <span className="opacity-50">•</span>
              <Calendar className="h-3.5 w-3.5" />
              First seen {new Date(player.firstSeen).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex gap-4 md:text-right">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Last 24h
            </p>
            <p className="text-2xl font-bold text-primary">
              {formatHours(analytics.summary.last24h)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Last 7d
            </p>
            <p className="text-2xl font-bold">
              {formatHours(analytics.summary.last7d)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Avg Session
            </p>
            <p className="text-2xl font-bold">
              {formatMin(analytics.insights.avgSessionLength)}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="forecast">Forecast & Trends</TabsTrigger>
          <TabsTrigger value="sessions">Session Log</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="h-4 w-4 text-primary" />
                  Activity Heatmap (24h)
                </CardTitle>
                <CardDescription>
                  Intensity based on historical hourly playtime
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-4 flex h-32 items-end gap-1">
                  {Array.from({ length: 24 }).map((_, hour) => {
                    const hourData = analytics.hourly.find((item) => item.hour === hour);
                    const totalTimeSec = hourData ? hourData.totalTimeSec : 0;
                    const height = Math.max((totalTimeSec / maxHourlyValue) * 100, 4);

                    return (
                      <div
                        key={hour}
                        className="group relative flex h-full flex-1 flex-col items-center justify-end"
                      >
                        <div className="mb-1 font-mono text-[9px] text-muted-foreground opacity-70">
                          {totalTimeSec > 0 ? `${Math.round(totalTimeSec / 60)}m` : ""}
                        </div>
                        <div
                          className={`w-full rounded-t-sm transition-colors ${
                            totalTimeSec > 0
                              ? "bg-primary hover:bg-primary/80"
                              : "bg-primary/10 hover:bg-primary/20"
                          }`}
                          style={{ height: `${height}%` }}
                        />
                        <div className="pointer-events-none absolute -top-10 z-10 rounded border bg-popover p-1.5 text-xs whitespace-nowrap text-popover-foreground opacity-0 shadow-lg group-hover:opacity-100">
                          {hour}:00 - {formatHours(totalTimeSec)} total
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 flex justify-between font-mono text-xs text-muted-foreground">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:00</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="mb-1 text-sm font-medium">Peak Hours (UTC)</p>
                  <div className="flex gap-2">
                    {analytics.insights.peakHours.map((hour) => (
                      <Badge key={hour} variant="secondary">
                        {hour}:00
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium">Dead Hours (UTC)</p>
                  <div className="flex gap-2">
                    {analytics.insights.deadHours.map((hour) => (
                      <Badge key={hour} variant="outline" className="opacity-50">
                        {hour}:00
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium">Last Seen</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(player.lastSeen).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-4 w-4 text-primary" />
                Playtime (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value}h`}
                    />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{
                        backgroundColor: "var(--popover)",
                        borderColor: "var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="hours" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4 text-primary" />
                Recency-Weighted Forecast
              </CardTitle>
              <CardDescription>
                Probability of the player being online at any given hour based
                on recency-weighted historical data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="hour" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--popover)",
                        borderColor: "var(--border)",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => {
                        const displayValue = Array.isArray(value)
                          ? value[0]
                          : value;

                        return [`${displayValue ?? 0}%`, "Probability"];
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="prob"
                      stroke="var(--primary)"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "var(--background)", strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4 text-primary" />
                Recent Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessions.length === 0 ? (
                  <p className="py-4 text-center text-sm text-muted-foreground">
                    No recent sessions.
                  </p>
                ) : (
                  sessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between rounded-lg border bg-card/50 p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {new Date(session.joinedAt).toLocaleString()}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {session.leftAt
                            ? `Left at ${new Date(session.leftAt).toLocaleTimeString()}`
                            : "Currently active"}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={session.durationSec === null ? "default" : "secondary"}
                        >
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
