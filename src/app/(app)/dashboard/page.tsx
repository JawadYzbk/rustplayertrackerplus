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
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your private Rust player intelligence workspace.
          </p>
        </div>

        <Link href="/servers">
          <Button>Add your next server</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tracked Servers</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalServers.toLocaleString()}</div>
            <p className="mt-1 text-xs text-muted-foreground">Active instances</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPlayers.toLocaleString()}</div>
            <p className="mt-1 text-xs text-muted-foreground">Across all servers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions.toLocaleString()}</div>
            <p className="mt-1 text-xs text-muted-foreground">Historical records</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Healthy</div>
            <p className="mt-1 text-xs text-muted-foreground">Worker polling active</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Servers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {servers.slice(0, 5).map((server) => (
                <div key={server.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary">
                      <Server size={14} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{server.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{server.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {server._count.players.toLocaleString()}
                    </p>
                    <p className="text-[10px] uppercase text-muted-foreground">
                      Players
                    </p>
                  </div>
                </div>
              ))}
              {servers.length === 0 && (
                <div className="rounded-xl border border-dashed px-4 py-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No servers added yet. Start by connecting your first
                    BattleMetrics server.
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6">
              <Link href="/servers">
                <Button variant="outline" className="w-full">
                  Manage Servers
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/players" className="block">
              <div className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-secondary">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <h4 className="text-sm font-semibold">Player Directory</h4>
                  <p className="text-xs text-muted-foreground">
                    Search and analyze individual players.
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/sessions" className="block">
              <div className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-secondary">
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <h4 className="text-sm font-semibold">Session Logs</h4>
                  <p className="text-xs text-muted-foreground">
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
