"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, Calendar, Clock, Activity, BarChart3, Loader2, Users, Server } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// ─── Interfaces ─────────────────────────────────────────────────────────────
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
interface ForecastPoint { hour: number; probability: number; }
interface DailyPoint { date: string; totalTimeSec: number; sessionsCount: number; }
interface HourlyPoint { hour: number; totalTimeSec: number; }

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

// ─── Helpers ────────────────────────────────────────────────────────────────
function formatHours(seconds: number) {
  return (seconds / 3600).toFixed(1) + "h";
}

function formatMin(seconds: number) {
  return Math.round(seconds / 60) + "m";
}

function formatDuration(seconds: number | null) {
  if (seconds === null) return "Active";
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m ${seconds % 60}s`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

// ─── Components ─────────────────────────────────────────────────────────────

export default function PlayerAnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [player, setPlayer] = useState<Player | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsResult | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [anRes, sesRes] = await Promise.all([
          axios.get(`/api/players/${id}/analytics`),
          axios.get(`/api/sessions`, { params: { playerId: id, limit: 100 } }),
        ]);
        setPlayer(anRes.data.player);
        setAnalytics(anRes.data.analytics);
        setSessions(sesRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
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
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Users className="h-16 w-16 text-muted-foreground opacity-20 mb-4" />
        <h2 className="text-xl font-bold">Player not found</h2>
        <Link href="/players">
          <Button variant="outline" className="mt-4">Return to Players</Button>
        </Link>
      </div>
    );
  }

  const isOnline = Date.now() - new Date(player.lastSeen).getTime() < 120000;

  // Transform daily for recharts
  const dailyChartData = analytics.daily.slice(-7).map(d => ({
    name: new Date(d.date).toLocaleDateString(undefined, { weekday: 'short' }),
    hours: Number((d.totalTimeSec / 3600).toFixed(2))
  }));

  // Forecast chart data
  const forecastChartData = analytics.forecast.map(f => ({
    hour: `${f.hour}:00`,
    prob: Number((f.probability * 100).toFixed(1))
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <Link href="/players" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
        <ChevronLeft className="mr-1 h-4 w-4" /> Back to directory
      </Link>

      {/* Hero Section */}
      <div className="p-6 rounded-2xl border bg-card/50 flex flex-col md:flex-row md:items-center gap-6 justify-between">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-2xl font-bold uppercase">
            {player.name.substring(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{player.name}</h1>
              {isOnline ? (
                <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online</Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">Offline</Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <Server className="h-3.5 w-3.5" /> {player.server.name}
              <span className="opacity-50">•</span>
              <Calendar className="h-3.5 w-3.5" /> First seen {new Date(player.firstSeen).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-4 md:text-right">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Last 24h</p>
            <p className="text-2xl font-bold text-primary">{formatHours(analytics.summary.last24h)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Last 7d</p>
            <p className="text-2xl font-bold">{formatHours(analytics.summary.last7d)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Avg Session</p>
            <p className="text-2xl font-bold">{formatMin(analytics.insights.avgSessionLength)}</p>
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
          <div className="grid md:grid-cols-3 gap-6">
            {/* Heatmap */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" /> Activity Heatmap (24h)
                </CardTitle>
                <CardDescription>Intensity based on historical hourly playtime</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1 h-32 items-end mt-4">
                  {Array.from({ length: 24 }).map((_, hour) => {
                    const hourData = analytics.hourly.find(h => h.hour === hour);
                    const totalTimeSec = hourData ? hourData.totalTimeSec : 0;
                    const max = Math.max(...analytics.hourly.map(x => x.totalTimeSec), 1);
                    const height = Math.max((totalTimeSec / max) * 100, 4);
                    
                    return (
                      <div key={hour} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                        <div className="text-[9px] text-muted-foreground font-mono mb-1 opacity-70">
                           {totalTimeSec > 0 ? Math.round(totalTimeSec / 60) + 'm' : ""}
                        </div>
                        <div 
                          className={`w-full transition-colors rounded-t-sm ${totalTimeSec > 0 ? 'bg-primary hover:bg-primary/80' : 'bg-primary/10 hover:bg-primary/20'}`}
                          style={{ height: `${height}%` }}
                        />
                        <div className="absolute -top-10 bg-popover text-popover-foreground text-xs p-1.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10 border shadow-lg">
                          {hour}:00 - {formatHours(totalTimeSec)} total
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground font-mono">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:00</span>
                </div>
              </CardContent>
            </Card>

            {/* Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Peak Hours (UTC)</p>
                  <div className="flex gap-2">
                    {analytics.insights.peakHours.map(h => (
                      <Badge key={h} variant="secondary">{h}:00</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Dead Hours (UTC)</p>
                  <div className="flex gap-2">
                    {analytics.insights.deadHours.map(h => (
                      <Badge key={h} variant="outline" className="opacity-50">{h}:00</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Last Seen</p>
                  <p className="text-sm text-muted-foreground">{new Date(player.lastSeen).toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" /> Playtime (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${v}h`} />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ backgroundColor: 'var(--popover)', borderColor: 'var(--border)', borderRadius: '8px' }}
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
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" /> Recency-Weighted Forecast
              </CardTitle>
              <CardDescription>Probability of the player being online at any given hour (based on recency-weighted historical data).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="hour" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--popover)', borderColor: 'var(--border)', borderRadius: '8px' }}
                      formatter={(value: any) => [`${value}%`, 'Probability']}
                    />
                    <Line type="monotone" dataKey="prob" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: "var(--background)", strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Recent Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No recent sessions.</p>
                ) : (
                  sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                      <div>
                        <p className="text-sm font-medium">{new Date(session.joinedAt).toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {session.leftAt ? `Left at ${new Date(session.leftAt).toLocaleTimeString()}` : 'Currently active'}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={session.durationSec === null ? "default" : "secondary"}>
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
