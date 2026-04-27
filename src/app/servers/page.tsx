"use client";

import { useEffect, useState } from "react";
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
import { Trash2, Server as ServerIcon, Plus, Loader2, Clock } from "lucide-react";

interface Server {
  id: string;
  name: string;
  createdAt: string;
  _count: { players: number; sessions: number };
}

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

  // Modal state
  const [liveModalServer, setLiveModalServer] = useState<Server | null>(null);
  const [livePlayers, setLivePlayers] = useState<any[]>([]);
  const [liveLoading, setLiveLoading] = useState(false);
  const [addingPlayerId, setAddingPlayerId] = useState<string | null>(null);

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      const { data } = await axios.get<Server[]>("/api/servers");
      setServers(data);
    } catch (error) {
      toast.error("Failed to fetch servers");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newId) return;

    setAdding(true);
    try {
      await axios.post("/api/servers", { id: newId });
      toast.success("Server added successfully");
      setNewId("");
      fetchServers();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to add server");
    } finally {
      setAdding(false);
    }
  };

  const handleViewLive = async (server: Server) => {
    setLiveModalServer(server);
    setLiveLoading(true);
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
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to track player");
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
    } catch (error) {
      toast.error("Failed to delete server");
    }
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-2xl rounded-xl shadow-xl border overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Live Players: {liveModalServer.name}</h3>
                <p className="text-xs text-muted-foreground">{livePlayers.length} online</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setLiveModalServer(null)}>
                Close
              </Button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              {liveLoading ? (
                <div className="py-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
              ) : livePlayers.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No players currently online.</p>
              ) : (
                <div className="space-y-2">
                  {livePlayers.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border bg-secondary/30">
                      <div className="flex-1">
                        <p className="font-medium text-sm flex items-center gap-2">
                          {p.name}
                          {p.sessionStart && (
                            <span className="text-xs text-muted-foreground flex items-center font-normal">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatDuration(Date.now() - new Date(p.sessionStart).getTime())}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">{p.id}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        disabled={addingPlayerId === p.id}
                        onClick={() => handleTrackPlayer(p.id, p.name, liveModalServer.id, p.sessionStart)}
                      >
                        {addingPlayerId === p.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Tracker"}
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
