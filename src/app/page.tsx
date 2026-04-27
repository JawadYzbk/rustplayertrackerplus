"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Server, Clock, Activity, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ServerStat {
  id: string;
  name: string;
  _count: { players: number; sessions: number };
}

export default function Dashboard() {
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
  const totalPlayers = servers.reduce((acc, s) => acc + s._count.players, 0);
  const totalSessions = servers.reduce((acc, s) => acc + s._count.sessions, 0);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your Rust player intelligence platform.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tracked Servers</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalServers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Active instances</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPlayers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all servers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Historical records</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Healthy</div>
            <p className="text-xs text-muted-foreground mt-1">Worker polling active</p>
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
                    <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center">
                      <Server size={14} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{server.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{server.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{server._count.players.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Players</p>
                  </div>
                </div>
              ))}
              {servers.length === 0 && (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  No servers added yet.
                </div>
              )}
            </div>
            <div className="mt-6">
              <Link href="/servers">
                <Button variant="outline" className="w-full">Manage Servers</Button>
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
              <div className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-secondary transition-colors">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <h4 className="text-sm font-semibold">Player Directory</h4>
                  <p className="text-xs text-muted-foreground">Search and analyze individual players.</p>
                </div>
              </div>
            </Link>
            <Link href="/sessions" className="block">
              <div className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-secondary transition-colors">
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <h4 className="text-sm font-semibold">Session Logs</h4>
                  <p className="text-xs text-muted-foreground">View real-time player join/leave events.</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
