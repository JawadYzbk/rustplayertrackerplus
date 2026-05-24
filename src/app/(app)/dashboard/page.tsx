"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Activity, Clock, Loader2, Server, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ServerStat {
  id: string;
  name: string;
  _count: { players: number; sessions: number };
}

export default function DashboardPage() {
  const [servers, setServers] = useState<ServerStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data } = await axios.get<ServerStat[]>("/api/servers");
        setServers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const totalServers = servers.length;
  const totalPlayers = servers.reduce((acc, item) => acc + item._count.players, 0);
  const totalSessions = servers.reduce((acc, item) => acc + item._count.sessions, 0);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10 pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Overview of your private Rust player intelligence workspace.
          </p>
        </div>

        <Link href="/servers">
          <Button size="lg" className="rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
            Add your next server
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card overflow-hidden border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tracked Servers</CardTitle>
            <div className="rounded-full bg-primary/10 p-2">
              <Server className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalServers.toLocaleString()}</div>
            <p className="mt-1 text-xs text-muted-foreground">Active instances</p>
          </CardContent>
        </Card>

        <Card className="glass-card overflow-hidden border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Total Players</CardTitle>
            <div className="rounded-full bg-primary/10 p-2">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalPlayers.toLocaleString()}</div>
            <p className="mt-1 text-xs text-muted-foreground">Across all servers</p>
          </CardContent>
        </Card>

        <Card className="glass-card overflow-hidden border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Total Sessions</CardTitle>
            <div className="rounded-full bg-primary/10 p-2">
              <Clock className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalSessions.toLocaleString()}</div>
            <p className="mt-1 text-xs text-muted-foreground">Historical records</p>
          </CardContent>
        </Card>

        <Card className="glass-card overflow-hidden border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">System Status</CardTitle>
            <div className="rounded-full bg-green-500/10 p-2">
              <Activity className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500 uppercase tracking-tighter">Healthy</div>
            <p className="mt-1 text-xs text-muted-foreground">Worker polling active</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glass-card border-none shadow-none lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Top Servers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {servers.slice(0, 5).map((server) => (
                <div key={server.id} className="group flex items-center justify-between transition-all">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/50 transition-colors group-hover:bg-secondary">
                      <Server size={20} className="text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-semibold leading-none">{server.name}</p>
                      <p className="mt-1.5 text-xs font-mono text-muted-foreground/60">{server.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {server._count.players.toLocaleString()}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                      Players
                    </p>
                  </div>
                </div>
              ))}
              {servers.length === 0 && (
                <div className="rounded-2xl border-2 border-dashed border-border/50 px-4 py-12 text-center">
                  <p className="text-sm text-muted-foreground">
                    No servers added yet. Start by connecting your first
                    BattleMetrics server.
                  </p>
                </div>
              )}
            </div>
            <div className="mt-8">
              <Link href="/servers">
                <Button variant="outline" className="w-full rounded-xl border-border/50 bg-transparent py-6 text-sm font-bold uppercase tracking-widest transition-all hover:bg-secondary">
                  Manage Servers
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/players" className="block">
              <div className="flex items-center gap-5 rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:bg-white/10 hover:shadow-xl group">
                <div className="rounded-xl bg-primary/20 p-3 text-primary transition-transform group-hover:scale-110">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Player Directory</h4>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Search and analyze individual players.
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/sessions" className="block">
              <div className="flex items-center gap-5 rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:bg-white/10 hover:shadow-xl group">
                <div className="rounded-xl bg-primary/20 p-3 text-primary transition-transform group-hover:scale-110">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Session Logs</h4>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    View real-time player join and leave history.
                  </p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
