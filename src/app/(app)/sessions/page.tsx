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
import { Clock, Search, Loader2 } from "lucide-react";
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

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-2">Sessions</h1>
          <p className="text-lg text-muted-foreground">Historical log of all player sessions.</p>
        </div>
      </div>

      <Card className="glass-card border-none shadow-none overflow-hidden">
        <CardHeader className="pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <Clock size={20} className="text-primary" />
              </div>
              Session Logs
            </CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter by Player ID..."
                className="pl-10 h-11 rounded-xl bg-background/40 border-border/40 focus:bg-background/60 transition-all"
                value={searchPlayerId}
                onChange={(e) => {
                  setSearchPlayerId(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-background/30 backdrop-blur-md z-10 flex items-center justify-center rounded-2xl">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            )}
            
            {/* Desktop View */}
            <div className="rounded-2xl border border-white/5 overflow-hidden hidden md:block">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-border/40 hover:bg-transparent">
                    <TableHead className="py-4 text-xs font-bold uppercase tracking-widest">Player</TableHead>
                    <TableHead className="py-4 text-xs font-bold uppercase tracking-widest">Server</TableHead>
                    <TableHead className="py-4 text-xs font-bold uppercase tracking-widest">Joined At</TableHead>
                    <TableHead className="py-4 text-xs font-bold uppercase tracking-widest">Left At</TableHead>
                    <TableHead className="py-4 text-xs font-bold uppercase tracking-widest">Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.length === 0 && !loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-40 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-3">
                          <Clock size={40} className="opacity-10" />
                          <p>No sessions found.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    sessions.map((session) => (
                      <TableRow key={session.id} className="border-border/40 hover:bg-white/5 transition-colors">
                        <TableCell className="py-5 font-semibold">
                          {session.player.name}
                          <div className="text-[10px] text-muted-foreground/60 font-mono mt-1 tracking-tighter">{session.playerId}</div>
                        </TableCell>
                        <TableCell className="py-5">
                          <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider rounded-lg border-none bg-white/5 py-1 px-2.5">{session.server.name}</Badge>
                        </TableCell>
                        <TableCell className="py-5 text-sm text-muted-foreground">
                          {new Date(session.joinedAt).toLocaleString()}
                        </TableCell>
                        <TableCell className="py-5 text-sm text-muted-foreground">
                          {session.leftAt ? new Date(session.leftAt).toLocaleString() : (
                            <div className="flex items-center gap-2">
                              <span className="pulse-dot" />
                              <span className="text-green-500 font-bold uppercase text-[10px] tracking-widest">Live</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="py-5 font-mono text-xs font-medium">
                          {formatDuration(session.durationSec)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Mobile View */}
            <div className="grid gap-4 md:hidden">
              {sessions.length === 0 && !loading ? (
                <div className="h-40 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border/40 rounded-2xl gap-3">
                   <Clock size={32} className="opacity-10" />
                   <p className="text-sm">No sessions found.</p>
                </div>
              ) : (
                sessions.map((session) => (
                  <div key={session.id} className="rounded-2xl border border-white/5 bg-white/5 p-5 space-y-4 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-base">{session.player.name}</h4>
                        <p className="font-mono text-xs text-muted-foreground/60 mt-0.5 tracking-tighter">{session.playerId}</p>
                      </div>
                      <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider bg-white/5">{session.server.name}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest mb-1.5 opacity-50">Joined At</p>
                        <p className="text-xs text-muted-foreground leading-tight">{new Date(session.joinedAt).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest mb-1.5 opacity-50">Left At</p>
                        {session.leftAt ? (
                          <p className="text-xs text-muted-foreground leading-tight">{new Date(session.leftAt).toLocaleString()}</p>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="pulse-dot" />
                            <span className="text-green-500 font-bold uppercase text-[10px] tracking-widest">Live</span>
                          </div>
                        )}
                      </div>
                      <div className="col-span-2 pt-2 border-t border-white/5">
                        <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest mb-1 opacity-50">Duration</p>
                        <p className="font-mono text-xs font-bold">{formatDuration(session.durationSec)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
            <p className="text-sm text-muted-foreground font-medium">
              Showing <span className="text-foreground">{sessions.length}</span> of <span className="text-foreground">{total}</span> sessions
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl px-5 border-border/40 hover:bg-white/5"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl px-5 border-border/40 hover:bg-white/5"
                onClick={() => setPage((p) => p + 1)}
                disabled={sessions.length < 50}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
