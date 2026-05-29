"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Clock, Search, Loader2, Database, Activity, ChevronLeft, ChevronRight, Calendar, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Session {
  id: number;
  playerId: string;
  serverId: string;
  joinedAt: string;
  leftAt: string | null;
  durationSec: number | null;
  player: { name: string };
  server: { name: string };
}

function formatDuration(seconds: number | null) {
  if (seconds === null) return "Active";
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m ${seconds % 60}s`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchPlayerId, setSearchPlayerId] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/sessions`, {
        params: { playerId: searchPlayerId || undefined, page, limit: 50 },
      });
      setSessions(data.data);
      setTotal(data.total);
    } catch {
      toast.error("Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  }, [searchPlayerId, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSessions();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchSessions]);

  // Live session count from current dataset
  const liveCount = sessions.filter((s) => s.leftAt === null).length;

  return (
    <div className="relative max-w-7xl mx-auto space-y-10 pb-10">
      {/* Decorative ambient glowing background spot */}
      <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute -top-20 left-10 w-96 h-96 bg-[oklch(0.72_0.19_145)]/3 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Header section with telemetry identity */}
      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 mb-3">
            <Sparkles size={13} className="text-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Log Intelligence</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl font-heading">
            Session <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">Radar</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl">
            Real-time telemetry and comprehensive historical timelines of player activity across tracked servers.
          </p>
        </div>
      </div>

      {/* Bento-style Telemetry Metrics Cards */}
      <div className="relative z-10 grid gap-5 grid-cols-1 sm:grid-cols-3">
        {/* Total Logged Card */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[130px]">
          <div className="absolute -right-4 -bottom-4 opacity-5">
            <Database size={100} className="text-primary" />
          </div>
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-heading">Total Recorded Logged</span>
            <div className="rounded-xl bg-primary/10 p-2.5">
              <Database size={18} className="text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold tracking-tight font-heading text-foreground">{total.toLocaleString()}</h2>
            <p className="text-[10px] text-muted-foreground/60 mt-1">Sessions logged historically</p>
          </div>
        </div>

        {/* Live Radar Sessions Card */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[130px]">
          <div className="absolute -right-4 -bottom-4 opacity-5">
            <Activity size={100} className="text-green-500" />
          </div>
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-heading">Active On Radar</span>
            <div className="rounded-xl bg-green-500/10 p-2.5">
              <Activity size={18} className="text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <h2 className="text-3xl font-extrabold tracking-tight font-heading text-foreground">{liveCount}</h2>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="pulse-dot" />
              <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Live</span>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground/60 mt-1">Active sessions in current view</p>
        </div>

        {/* Telemetry Status Card */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[130px]">
          <div className="absolute -right-4 -bottom-4 opacity-5">
            <Clock size={100} className="text-orange-400" />
          </div>
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-heading">Operational Status</span>
            <div className="rounded-xl bg-orange-400/10 p-2.5">
              <Clock size={18} className="text-orange-400" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold tracking-tight font-heading text-foreground">99.9%</h2>
            <p className="text-[10px] text-green-500/80 font-semibold mt-1">Radar fully operational</p>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Table Container */}
      <Card className="glass-card border-none shadow-none overflow-hidden relative z-10">
        <CardHeader className="pb-6 border-b border-white/5 bg-white/[0.01]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="flex items-center gap-3 text-lg font-bold font-heading">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <Clock size={18} className="text-primary" />
              </div>
              Telemetry Timeline Log
            </CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter by Player ID..."
                className="pl-10 h-11 rounded-xl bg-background/40 border-white/5 focus:border-primary/50 focus:bg-background/60 focus:ring-1 focus:ring-primary/20 transition-all font-sans text-sm"
                value={searchPlayerId}
                onChange={(e) => {
                  setSearchPlayerId(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-background/40 backdrop-blur-md z-15 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 bg-card/60 px-8 py-6 rounded-2xl border border-white/5 shadow-2xl">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-heading">Scanning logs...</span>
                </div>
              </div>
            )}

            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader className="bg-white/[0.02] border-b border-white/5">
                  <TableRow className="border-none hover:bg-transparent">
                    <TableHead className="py-5 pl-6 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground font-heading">Player</TableHead>
                    <TableHead className="py-5 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground font-heading">Server</TableHead>
                    <TableHead className="py-5 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground font-heading">Joined At</TableHead>
                    <TableHead className="py-5 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground font-heading">Left At</TableHead>
                    <TableHead className="py-5 pr-6 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground font-heading text-right">Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.length === 0 && !loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-60 text-center text-muted-foreground">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="rounded-2xl bg-white/5 p-4 border border-white/5 mb-2">
                            <Clock size={36} className="opacity-20 text-primary" />
                          </div>
                          <p className="font-heading font-semibold text-lg text-foreground/80">No active radar sweeps found</p>
                          <p className="text-sm text-muted-foreground max-w-xs">Verify your search criteria or make sure players are tracked in the directory.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    sessions.map((session) => {
                      const isLive = session.leftAt === null;
                      return (
                        <TableRow
                          key={session.id}
                          className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors relative ${
                            isLive ? "after:absolute after:left-0 after:top-0 after:bottom-0 after:w-[3px] after:bg-green-500" : ""
                          }`}
                        >
                          <TableCell className="py-5 pl-6 font-semibold font-heading text-foreground">
                            {session.player.name}
                            <div className="text-[9px] text-muted-foreground/60 font-mono mt-1 tracking-tighter">{session.playerId}</div>
                          </TableCell>
                          <TableCell className="py-5">
                            <Badge
                              variant="secondary"
                              className="text-[9px] font-black uppercase tracking-wider rounded-lg border-none bg-white/5 text-muted-foreground/90 py-1 px-2.5"
                            >
                              {session.server.name}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-5 text-xs text-muted-foreground font-sans">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={12} className="text-muted-foreground/40" />
                              {new Date(session.joinedAt).toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell className="py-5 text-xs text-muted-foreground font-sans">
                            {session.leftAt ? (
                              <div className="flex items-center gap-1.5">
                                <Calendar size={12} className="text-muted-foreground/40" />
                                {new Date(session.leftAt).toLocaleString()}
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                                <span className="pulse-dot" />
                                <span className="text-green-500 font-extrabold uppercase text-[9px] tracking-widest">Active Live</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="py-5 pr-6 font-mono text-xs font-semibold text-right text-foreground">
                            {isLive ? (
                              <span className="text-green-500 font-extrabold uppercase text-[10px] tracking-wider bg-green-500/5 px-2 py-1 rounded-md border border-green-500/10">
                                Live Now
                              </span>
                            ) : (
                              formatDuration(session.durationSec)
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Mobile View Card Grid */}
            <div className="grid gap-4 p-5 md:hidden">
              {sessions.length === 0 && !loading ? (
                <div className="h-48 flex flex-col items-center justify-center text-muted-foreground border border-dashed border-white/5 rounded-2xl gap-3">
                  <Clock size={32} className="opacity-20 text-primary" />
                  <p className="font-heading font-medium text-sm">No active radar sweeps found</p>
                </div>
              ) : (
                sessions.map((session) => {
                  const isLive = session.leftAt === null;
                  return (
                    <div
                      key={session.id}
                      className={`rounded-2xl border border-white/5 bg-white/[0.02] p-5 space-y-4 hover:bg-white/[0.04] transition-colors relative ${
                        isLive ? "before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[3px] before:bg-green-500 before:rounded-r" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-base font-heading text-foreground">{session.player.name}</h4>
                          <p className="font-mono text-[9px] text-muted-foreground/60 mt-0.5 tracking-tighter">{session.playerId}</p>
                        </div>
                        <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-wider bg-white/5 rounded-lg border-none">
                          {session.server.name}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-1">
                        <div>
                          <p className="text-muted-foreground text-[8px] uppercase font-extrabold tracking-widest mb-1 opacity-50 font-heading">Joined At</p>
                          <p className="text-[11px] text-muted-foreground font-sans">{new Date(session.joinedAt).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-[8px] uppercase font-extrabold tracking-widest mb-1 opacity-50 font-heading">Left At</p>
                          {session.leftAt ? (
                            <p className="text-[11px] text-muted-foreground font-sans">{new Date(session.leftAt).toLocaleString()}</p>
                          ) : (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="pulse-dot" />
                              <span className="text-green-500 font-extrabold uppercase text-[9px] tracking-widest">Active Live</span>
                            </div>
                          )}
                        </div>
                        <div className="col-span-2 pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-muted-foreground text-[8px] uppercase font-extrabold tracking-widest opacity-50 font-heading">Duration</span>
                          <span className="font-mono text-xs font-bold text-foreground">
                            {isLive ? (
                              <span className="text-green-500 font-extrabold uppercase text-[9px] tracking-wider bg-green-500/5 px-2 py-0.5 rounded border border-green-500/10">
                                Live Now
                              </span>
                            ) : (
                              formatDuration(session.durationSec)
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Table Footer / Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t border-white/5 gap-4 bg-white/[0.01]">
            <p className="text-xs text-muted-foreground font-medium font-heading">
              Showing <span className="text-foreground font-bold">{sessions.length}</span> of <span className="text-foreground font-bold">{total.toLocaleString()}</span> session records
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl px-4 h-9 border-white/5 hover:bg-white/5 text-xs font-bold font-heading inline-flex items-center gap-1 transition-all"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft size={14} />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl px-4 h-9 border-white/5 hover:bg-white/5 text-xs font-bold font-heading inline-flex items-center gap-1 transition-all"
                onClick={() => setPage((p) => p + 1)}
                disabled={sessions.length < 50}
              >
                Next
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

