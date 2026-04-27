"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Server as ServerIcon, Plus, Loader2, Clock, ArrowUpDown, ArrowUp, ArrowDown, Search } from "lucide-react";

interface Server {
  id: string;
  name: string;
  createdAt: string;
  _count: { players: number; sessions: number };
}

interface LivePlayer {
  id: string;
  name: string;
  sessionStart: string | null;
}

type SortKey = "playtime" | "alpha";
type SortDir = "asc" | "desc";

function formatDuration(ms: number) {
  if (ms < 0) return "Just Joined";
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m ${seconds % 60}s`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

export default function ServersPage() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [newId, setNewId] = useState("");
  const [adding, setAdding] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date().getTime());

  // Modal state
  const [liveModalServer, setLiveModalServer] = useState<Server | null>(null);
  const [livePlayers, setLivePlayers] = useState<LivePlayer[]>([]);
  const [liveLoading, setLiveLoading] = useState(false);
  const [addingPlayerId, setAddingPlayerId] = useState<string | null>(null);

  // Filter & sort state
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("playtime");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const fetchServers = async () => {
    try {
      const { data } = await axios.get<Server[]>("/api/servers");
      setServers(data);
    } catch {
      toast.error("Failed to fetch servers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchServers();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!liveModalServer) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    return () => window.clearInterval(timer);
  }, [liveModalServer]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newId) return;
    setAdding(true);
    try {
      await axios.post("/api/servers", { id: newId });
      toast.success("Server added successfully");
      setNewId("");
      fetchServers();
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.error || "Failed to add server"
          : "Failed to add server"
      );
    } finally {
      setAdding(false);
    }
  };

  const handleViewLive = async (server: Server) => {
    setLiveModalServer(server);
    setLiveLoading(true);
    setSearch("");
    setSortKey("playtime");
    setSortDir("desc");
    setLivePlayers([]);
    try {
      const { data } = await axios.get(`/api/servers/${server.id}/live-players`);
      setLivePlayers(data);
    } catch {
      toast.error("Failed to load live players");
    } finally {
      setLiveLoading(false);
    }
  };

  const handleTrackPlayer = async (playerId: string, name: string, serverId: string, sessionStart?: string) => {
    setAddingPlayerId(playerId);
    try {
      await axios.post("/api/players/create", { id: playerId, name, serverId, sessionStart });
      toast.success("Player added to tracker list");
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.error || "Failed to track player"
          : "Failed to track player"
      );
    } finally {
      setAddingPlayerId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this server? All related players and sessions will be permanently deleted.")) {
      return;
    }
    try {
      await axios.delete(`/api/servers/${id}`);
      toast.success("Server deleted");
      fetchServers();
    } catch {
      toast.error("Failed to delete server");
    }
  };

  // Sorted & filtered live players
  const displayedPlayers = useMemo(() => {
    const filtered = livePlayers.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.includes(search)
    );

    filtered.sort((a, b) => {
      if (sortKey === "alpha") {
        const cmp = a.name.localeCompare(b.name);
        return sortDir === "asc" ? cmp : -cmp;
      }
      // playtime: no sessionStart = 0ms elapsed
      const aMs = a.sessionStart ? currentTime - new Date(a.sessionStart).getTime() : 0;
      const bMs = b.sessionStart ? currentTime - new Date(b.sessionStart).getTime() : 0;
      return sortDir === "desc" ? bMs - aMs : aMs - bMs;
    });

    return filtered;
  }, [currentTime, livePlayers, search, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "playtime" ? "desc" : "asc");
    }
  };

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) {
      return <ArrowUpDown className="w-3 h-3 opacity-40" />;
    }

    return sortDir === "desc" ? (
      <ArrowDown className="w-3 h-3" />
    ) : (
      <ArrowUp className="w-3 h-3" />
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Servers</h1>
        <p className="text-muted-foreground">Manage your tracked Rust servers.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus size={18} className="text-primary" /> Add Server
          </CardTitle>
          <CardDescription>
            Enter the BattleMetrics Server ID and a descriptive name.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="flex items-end gap-4">
            <div className="space-y-2 flex-1 max-w-sm">
              <label className="text-sm font-medium">Server ID</label>
              <Input
                placeholder="e.g. 12345678"
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={adding || !newId}>
              {adding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Server (Auto-fetches name)
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ServerIcon size={18} className="text-primary" /> Tracked Servers
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 flex justify-center text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : servers.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <ServerIcon className="mx-auto h-12 w-12 opacity-20 mb-4" />
              <p>No servers tracked yet.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>BattleMetrics ID</TableHead>
                    <TableHead>Tracked Players</TableHead>
                    <TableHead>Sessions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {servers.map((server) => (
                    <TableRow key={server.id}>
                      <TableCell className="font-medium">{server.name}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{server.id}</TableCell>
                      <TableCell>{server._count.players.toLocaleString()}</TableCell>
                      <TableCell>{server._count.sessions.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewLive(server)}
                          className="mr-2"
                        >
                          Live Players
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(server.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live Players Modal */}
      {liveModalServer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setLiveModalServer(null)}
        >
          <div
            className="bg-card w-full max-w-2xl rounded-xl shadow-xl border overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-bold text-lg">{liveModalServer.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {liveLoading ? "Loading..." : `${livePlayers.length} online · ${displayedPlayers.length} shown`}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setLiveModalServer(null)}>
                Close
              </Button>
            </div>

            {/* Search & Sort toolbar */}
            {!liveLoading && livePlayers.length > 0 && (
              <div className="p-3 border-b flex items-center gap-2 shrink-0 bg-secondary/20">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input
                    className="pl-8 h-8 text-sm"
                    placeholder="Filter by name or ID…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <Button
                  size="sm"
                  variant={sortKey === "playtime" ? "secondary" : "ghost"}
                  className="h-8 gap-1.5 text-xs"
                  onClick={() => toggleSort("playtime")}
                >
                  <Clock className="w-3 h-3" /> Playtime {renderSortIcon("playtime")}
                </Button>
                <Button
                  size="sm"
                  variant={sortKey === "alpha" ? "secondary" : "ghost"}
                  className="h-8 gap-1.5 text-xs"
                  onClick={() => toggleSort("alpha")}
                >
                  A-Z {renderSortIcon("alpha")}
                </Button>
              </div>
            )}

            {/* Player list */}
            <div className="p-4 overflow-y-auto flex-1">
              {liveLoading ? (
                <div className="py-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
              ) : displayedPlayers.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {livePlayers.length === 0 ? "No players currently online." : "No players match your filter."}
                </p>
              ) : (
                <div className="space-y-1.5">
                  {displayedPlayers.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <div className="flex-1 min-w-0 mr-3">
                        <p className="font-medium text-sm flex items-center gap-2">
                          {p.name}
                          {p.sessionStart && (
                            <span className="text-xs text-muted-foreground flex items-center font-normal shrink-0">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatDuration(currentTime - new Date(p.sessionStart).getTime())}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5 truncate">{p.id}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={addingPlayerId === p.id}
                        onClick={() => handleTrackPlayer(p.id, p.name, liveModalServer.id, p.sessionStart ?? undefined)}
                      >
                        {addingPlayerId === p.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Track"}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
