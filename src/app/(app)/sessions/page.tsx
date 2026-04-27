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
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Sessions</h1>
        <p className="text-muted-foreground">Historical log of all player sessions.</p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock size={18} className="text-primary" /> Session Logs
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter by Player ID..."
                className="pl-9"
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
          <div className="rounded-md border relative">
            {loading && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead>Server</TableHead>
                  <TableHead>Joined At</TableHead>
                  <TableHead>Left At</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.length === 0 && !loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      No sessions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  sessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">
                        {session.player.name}
                        <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{session.playerId}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">{session.server.name}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(session.joinedAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {session.leftAt ? new Date(session.leftAt).toLocaleString() : (
                          <span className="text-green-500 font-medium">Online Now</span>
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {formatDuration(session.durationSec)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {sessions.length} of {total} sessions
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
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
