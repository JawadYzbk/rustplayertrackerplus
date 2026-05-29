"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import { 
  Activity, 
  Clock, 
  Loader2, 
  Server, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Power, 
  PowerOff, 
  Smartphone, 
  Sparkles, 
  ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServerStat {
  id: string;
  name: string;
  _count: { players: number; sessions: number };
}

interface SmartDevice {
  id: string;
  name: string;
  customCommand: string | null;
  type: string;
  icon: string | null;
  isActive: boolean;
  value: boolean;
  createdAt: string;
}

interface DashboardDevice extends SmartDevice {
  serverId: string;
  serverName: string;
}

export default function DashboardPage() {
  const [servers, setServers] = useState<ServerStat[]>([]);
  const [devices, setDevices] = useState<DashboardDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [controllingId, setControllingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        // Fetch tracked servers
        const { data: serverData } = await axios.get<ServerStat[]>("/api/servers");
        setServers(serverData);

        // Fetch smart devices for each server in parallel
        const allDevicesPromises = serverData.map((server) =>
          axios
            .get<SmartDevice[]>(`/api/servers/${server.id}/devices`)
            .then((res) =>
              res.data.map((d) => ({
                ...d,
                serverId: server.id,
                serverName: server.name,
              }))
            )
            .catch(() => [] as DashboardDevice[])
        );

        const resolvedDevices = await Promise.all(allDevicesPromises);
        setDevices(resolvedDevices.flat());
      } catch (error) {
        console.error("Failed to load dashboard statistics", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const handleToggleDevice = async (serverId: string, deviceId: string, currentState: boolean) => {
    setControllingId(deviceId);
    const nextState = !currentState;
    try {
      await axios.post(`/api/servers/${serverId}/devices/${deviceId}`, { state: nextState });
      setDevices((prev) =>
        prev.map((d) => (d.id === deviceId ? { ...d, value: nextState } : d))
      );
      toast.success(`Smart switch turned ${nextState ? "on" : "off"}`);
    } catch {
      toast.error("Failed to toggle smart switch. Verify IP connections.");
    } finally {
      setControllingId(null);
    }
  };

  const totalServers = servers.length;
  const totalPlayers = servers.reduce((acc, item) => acc + item._count.players, 0);
  const totalSessions = servers.reduce((acc, item) => acc + item._count.sessions, 0);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 bg-card/45 px-8 py-6 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-md">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-heading">Synchronizing cockpit...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-7xl space-y-10 pb-12">
      {/* Decorative ambient glowing background spots */}
      <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-[oklch(0.72_0.19_145)]/2 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Page Header */}
      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 mb-3">
            <Sparkles size={13} className="text-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Mission Control Center</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl font-heading">
            Cockpit <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">Telemetry</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl">
            Real-time radar sweeps, active target demographics, and automated smart power grids.
          </p>
        </div>

        <Link href="/servers">
          <Button size="lg" className="rounded-xl shadow-xl shadow-primary/20 font-black uppercase tracking-wider text-xs px-6 transition-all hover:scale-[1.03] active:scale-[0.97] h-11 cursor-pointer">
            <Server className="h-4.5 w-4.5 mr-2 text-primary-foreground" /> Connect Server Host
          </Button>
        </Link>
      </div>

      {/* Bento Stats Row */}
      <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Tracked Servers */}
        <Card className="glass-card glass-card-hover border-none shadow-none relative overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/60 font-heading">Tracked Server Worlds</CardTitle>
            <div className="rounded-xl bg-primary/10 p-2 border border-primary/10 transition-all duration-300">
              <Server className="h-4.5 w-4.5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4.5xl font-black font-heading text-foreground tracking-tight">{totalServers.toLocaleString()}</div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-[10px] font-semibold text-muted-foreground/60 font-heading">Connected instances</p>
              <Badge variant="outline" className="text-[8px] py-0 px-2 rounded border-white/5 bg-white/5 font-extrabold uppercase tracking-widest text-primary">polling</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Total Players */}
        <Card className="glass-card glass-card-hover border-none shadow-none relative overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/60 font-heading">Monitored Registry</CardTitle>
            <div className="rounded-xl bg-primary/10 p-2 border border-primary/10 transition-all duration-300">
              <Users className="h-4.5 w-4.5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4.5xl font-black font-heading text-foreground tracking-tight">{totalPlayers.toLocaleString()}</div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-[10px] font-semibold text-muted-foreground/60 font-heading">Inside database cohort</p>
              <Badge variant="outline" className="text-[8px] py-0 px-2 rounded border-white/5 bg-white/5 font-extrabold uppercase tracking-widest text-muted-foreground/80">monitored</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Total Sessions */}
        <Card className="glass-card glass-card-hover border-none shadow-none relative overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/60 font-heading">Radar Timeline Captures</CardTitle>
            <div className="rounded-xl bg-primary/10 p-2 border border-primary/10 transition-all duration-300">
              <Clock className="h-4.5 w-4.5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4.5xl font-black font-heading text-foreground tracking-tight">{totalSessions.toLocaleString()}</div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-[10px] font-semibold text-muted-foreground/60 font-heading">Historical sweeps compiled</p>
              <Badge variant="outline" className="text-[8px] py-0 px-2 rounded border-white/5 bg-white/5 font-extrabold uppercase tracking-widest text-muted-foreground/80">compiled</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Telemetry Link Status */}
        <Card className="glass-card glass-card-hover border-none shadow-none relative overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground/60 font-heading">Telemetry Link Status</CardTitle>
            <div className="rounded-xl bg-green-500/10 p-2 border border-green-500/10 transition-all duration-300">
              <Activity className="h-4.5 w-4.5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4.5xl font-black font-heading text-green-500 tracking-tight flex items-center gap-2">
              Operational
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-[10px] font-semibold text-muted-foreground/60 font-heading">Radar background sweep</p>
              <span className="flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest text-green-500">
                <span className="pulse-dot" />
                Active
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bento Main Widgets */}
      <div className="relative z-10 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Top Server Demographics Card */}
        <Card className="glass-card border-none shadow-none overflow-hidden flex flex-col justify-between">
          <CardHeader className="pb-5 border-b border-white/5 bg-white/[0.01]">
            <CardTitle className="text-base font-bold font-heading flex items-center gap-2.5">
              <Server className="h-4.5 w-4.5 text-primary animate-pulse" />
              Primary server targets
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              {servers.slice(0, 4).map((server) => (
                <div key={server.id} className="group flex items-center justify-between p-3 px-4 rounded-2xl border border-white/5 bg-zinc-950/20 hover:bg-zinc-950/40 hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900/60 border border-white/5 shrink-0 transition-colors group-hover:border-primary/30">
                      <Server size={18} className="text-muted-foreground/60 transition-colors group-hover:text-primary group-hover:scale-105 duration-300" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <p className="text-xs font-bold leading-none text-foreground tracking-wide truncate">{server.name}</p>
                      <code className="text-[9px] font-mono text-muted-foreground/50 tracking-tighter uppercase">ID: {server.id}</code>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-black font-heading text-primary leading-none">
                      {server._count.players.toLocaleString()}
                    </p>
                    <p className="text-[8px] font-extrabold uppercase tracking-widest text-muted-foreground/50 mt-1">
                      Tracked
                    </p>
                  </div>
                </div>
              ))}
              {servers.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/5 bg-zinc-950/20 px-6 py-12 text-center">
                  <p className="text-xs font-semibold text-muted-foreground leading-relaxed">
                    No server hosts tracked. Connect your first target on the upper right to begin indexing telemetry data.
                  </p>
                </div>
              )}
            </div>
            <div className="pt-2 border-t border-white/5">
              <Link href="/servers">
                <Button variant="outline" className="w-full rounded-xl py-5 h-10 border-white/5 bg-white/5 text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-white/10 cursor-pointer">
                  Configure server indexes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* RE-DESIGNED ACTIVE SMART DEVICES SWITCHBOARD */}
        <Card className="glass-card border-none shadow-none overflow-hidden flex flex-col justify-between">
          <CardHeader className="pb-5 border-b border-white/5 bg-white/[0.01]">
            <CardTitle className="text-base font-bold font-heading flex items-center gap-2.5">
              <Cpu className="h-4.5 w-4.5 text-primary animate-pulse" />
              Smart IoT switchboard
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              {devices.slice(0, 4).map((device) => {
                const isControlling = controllingId === device.id;
                return (
                  <div 
                    key={device.id} 
                    className={`group flex items-center justify-between p-3 px-4 rounded-2xl border transition-all duration-300 ${
                      device.value 
                        ? 'border-green-500/15 bg-green-500/[0.02] hover:bg-green-500/[0.04]' 
                        : 'border-white/5 bg-zinc-950/20 hover:bg-zinc-950/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative group cursor-pointer w-11 h-11 rounded-xl bg-zinc-900/60 flex items-center justify-center overflow-hidden shrink-0 border border-white/5">
                        {device.icon ? (
                          <img 
                            src={`https://cdn.rusthelp.com/images/public/${device.icon}.png`} 
                            alt={device.icon}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://cdn.rusthelp.com/images/public/smart.switch.png';
                            }}
                          />
                        ) : (
                          <Smartphone className="w-5 h-5 text-muted-foreground/45" />
                        )}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <p className="text-xs font-bold leading-none text-foreground tracking-wide truncate">{device.name}</p>
                        <p className="text-[8px] font-mono text-muted-foreground/50 tracking-tighter uppercase truncate font-semibold">
                          {device.serverName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <Badge 
                        variant="secondary"
                        className={`text-[8px] font-black uppercase px-2 h-5 rounded border-none tracking-widest ${
                          device.value 
                            ? 'bg-green-500/10 text-green-400 border border-green-500/10 shadow-[0_0_10px_rgba(34,197,94,0.15)]' 
                            : 'bg-zinc-900 text-zinc-500'
                        }`}
                      >
                        {device.value ? 'ON' : 'OFF'}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-9 w-9 rounded-xl border transition-all cursor-pointer ${
                          device.value 
                            ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/15 border-green-500/30' 
                            : 'bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'
                        }`}
                        onClick={() => handleToggleDevice(device.serverId, device.id, device.value)}
                        disabled={isControlling || !device.isActive}
                      >
                        {isControlling ? (
                          <Loader2 className="h-4.5 w-4.5 animate-spin" />
                        ) : device.value ? (
                          <Power className="h-4.5 w-4.5" />
                        ) : (
                          <PowerOff className="h-4.5 w-4.5" />
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
              {devices.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/5 bg-zinc-950/20 px-6 py-12 text-center flex flex-col items-center justify-center">
                  <Smartphone className="h-8 w-8 text-muted-foreground/20 mb-3" />
                  <p className="text-xs font-semibold text-muted-foreground leading-relaxed">
                    No active smart devices paired. Use the pairing listener at the Servers dashboard to link in-game telemetry switches.
                  </p>
                </div>
              )}
            </div>
            <div className="pt-2 border-t border-white/5">
              <Link href="/servers">
                <Button variant="outline" className="w-full rounded-xl py-5 h-10 border-white/5 bg-white/5 text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-white/10 flex items-center gap-1.5 cursor-pointer">
                  Open IoT consoles <ExternalLink size={11} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Intelligence Actions & Integrity Panel */}
        <Card className="glass-card border-none shadow-none overflow-hidden flex flex-col">
          <CardHeader className="pb-5 border-b border-white/5 bg-white/[0.01]">
            <CardTitle className="text-base font-bold font-heading">Intelligence Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 flex-1">
            <Link href="/players" className="block group">
              <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-zinc-950/20 p-4 transition-all group-hover:bg-zinc-950/40 group-hover:border-primary/20 group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] duration-300">
                <div className="rounded-xl bg-primary/10 p-2.5 text-primary border border-primary/10 transition-transform group-hover:scale-105 group-hover:shadow-[0_0_15px_oklch(0.68_0.21_42_/_0.2)]">
                  <Users className="h-5 w-5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-bold tracking-wide flex items-center gap-1.5">
                    Player Directory
                    <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </h4>
                  <p className="text-[10px] text-muted-foreground leading-normal font-medium opacity-80 truncate">
                    Scan, catalog, and forecast targets.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/sessions" className="block group">
              <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-zinc-950/20 p-4 transition-all group-hover:bg-zinc-950/40 group-hover:border-primary/20 group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] duration-300">
                <div className="rounded-xl bg-primary/10 p-2.5 text-primary border border-primary/10 transition-transform group-hover:scale-105 group-hover:shadow-[0_0_15px_oklch(0.68_0.21_42_/_0.2)]">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-bold tracking-wide flex items-center gap-1.5">
                    Session Log Book
                    <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </h4>
                  <p className="text-[10px] text-muted-foreground leading-normal font-medium opacity-80 truncate">
                    Inspect join and disconnect radar timestamps.
                  </p>
                </div>
              </div>
            </Link>

            <div className="p-4 rounded-2xl bg-zinc-950/40 border border-white/5 space-y-2 mt-2">
              <h5 className="text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5 font-heading">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Workspace Integrity
              </h5>
              <p className="text-[11px] text-muted-foreground/80 leading-relaxed font-semibold">
                Your database is privately sandboxed. Only your logged-in Clerk profile can access these player records and active server radars.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
