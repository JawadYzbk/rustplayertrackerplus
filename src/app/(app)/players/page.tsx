"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
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
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronRight,
  Loader2,
  Search,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type PlayerSortKey = "name" | "server" | "lastSeen" | "firstSeen" | "status";
type SortDir = "asc" | "desc";

interface Player {
  id: string;
  name: string;
  serverId: string;
  server: { name: string };
  firstSeen: string;
  lastSeen: string;
  isOnline: boolean;
}

interface SortableHeadProps {
  label: string;
  sortKey: PlayerSortKey;
  activeSortKey: PlayerSortKey;
  sortDir: SortDir;
  onToggle: (key: PlayerSortKey) => void;
}

function SortableHead({
  label,
  sortKey,
  activeSortKey,
  sortDir,
  onToggle,
}: SortableHeadProps) {
  const icon =
    activeSortKey === sortKey ? (
      sortDir === "asc" ? (
        <ArrowUp className="h-3 w-3" />
      ) : (
        <ArrowDown className="h-3 w-3" />
      )
    ) : (
      <ArrowUpDown className="h-3 w-3 opacity-30" />
    );

  return (
    <TableHead
      className="cursor-pointer select-none transition-colors hover:text-foreground"
      onClick={() => onToggle(sortKey)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {icon}
      </span>
    </TableHead>
  );
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortKey, setSortKey] = useState<PlayerSortKey>("lastSeen");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const [servers, setServers] = useState<{id: string, name: string}[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlayerId, setNewPlayerId] = useState("");
  const [newPlayerServer, setNewPlayerServer] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    axios.get("/api/servers").then((res) => setServers(res.data));
  }, []);

  const fetchPlayers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/players`, {
        params: { search, page, limit: 50 },
      });
      setPlayers(data.data);
      setTotal(data.total);
    } catch {
      toast.error("Failed to fetch players");
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPlayers();
    }, 300); // debounce search
    return () => clearTimeout(timer);
  }, [fetchPlayers]);

  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerId || !newPlayerServer) return;
    setAdding(true);
    try {
      await axios.post("/api/players/create", { id: newPlayerId, serverId: newPlayerServer });
      toast.success("Player added successfully");
      setNewPlayerId("");
      setShowAddForm(false);
      fetchPlayers();
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.error || "Failed to add player"
          : "Failed to add player"
      );
    } finally {
      setAdding(false);
    }
  };

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "server") cmp = a.server.name.localeCompare(b.server.name);
      else if (sortKey === "lastSeen") cmp = new Date(a.lastSeen).getTime() - new Date(b.lastSeen).getTime();
      else if (sortKey === "firstSeen") cmp = new Date(a.firstSeen).getTime() - new Date(b.firstSeen).getTime();
      else if (sortKey === "status") cmp = (a.isOnline ? 1 : 0) - (b.isOnline ? 1 : 0);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [players, sortKey, sortDir]);

  const toggleSort = (key: PlayerSortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Players</h1>
          <p className="text-muted-foreground">View and search tracked players across all servers.</p>
        </div>
        <Button onClick={() => setShowAddForm((value) => !value)}>
          {showAddForm ? "Cancel" : "Add Player Manually"}
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Manually Add Player</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddPlayer} className="flex gap-4 items-end">
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Player ID (BattleMetrics)</label>
                <Input value={newPlayerId} onChange={e => setNewPlayerId(e.target.value)} placeholder="e.g. 1234567" />
              </div>
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Target Server</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newPlayerServer}
                  onChange={e => setNewPlayerServer(e.target.value)}
                >
                  <option value="">Select a server...</option>
                  {servers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <Button type="submit" disabled={adding || !newPlayerId || !newPlayerServer}>
                {adding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Track Player
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users size={18} className="text-primary" /> Player Directory
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                className="pl-9"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
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
                  <SortableHead
                    label="Status"
                    sortKey="status"
                    activeSortKey={sortKey}
                    sortDir={sortDir}
                    onToggle={toggleSort}
                  />
                  <SortableHead
                    label="Name"
                    sortKey="name"
                    activeSortKey={sortKey}
                    sortDir={sortDir}
                    onToggle={toggleSort}
                  />
                  <SortableHead
                    label="Server"
                    sortKey="server"
                    activeSortKey={sortKey}
                    sortDir={sortDir}
                    onToggle={toggleSort}
                  />
                  <SortableHead
                    label="Last Seen"
                    sortKey="lastSeen"
                    activeSortKey={sortKey}
                    sortDir={sortDir}
                    onToggle={toggleSort}
                  />
                  <SortableHead
                    label="First Seen"
                    sortKey="firstSeen"
                    activeSortKey={sortKey}
                    sortDir={sortDir}
                    onToggle={toggleSort}
                  />
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.length === 0 && !loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No players found.
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedPlayers.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell>
                        {player.isOnline ? (
                          <div className="flex items-center gap-2">
                            <span className="pulse-dot"></span>
                            <span className="text-xs font-medium text-green-500">Online</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30"></span>
                            <span className="text-xs font-medium text-muted-foreground">Offline</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">
                        {player.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        <Badge variant="outline">{player.server.name}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(player.lastSeen).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(player.firstSeen).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/players/${player.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1">
                            Insights <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {players.length} of {total} players
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
                disabled={players.length < 50}
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
