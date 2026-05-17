"use client";

import { useCallback, useEffect, useMemo, useState, Fragment } from "react";
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
  ChevronDown,
  Loader2,
  Search,
  Users,
  Trash2,
  Settings,
  Plus,
  Pencil,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PlayerSortKey = "name" | "server" | "lastSeen" | "firstSeen" | "status";
type SortDir = "asc" | "desc";

interface Group {
  id: string;
  name: string;
  color: string | null;
  _count?: { players: number };
}

interface Player {
  id: string;
  name: string;
  serverId: string;
  server: { name: string };
  firstSeen: string;
  lastSeen: string;
  isOnline: boolean;
  rustPlusNotifications: boolean;
  groupId: string | null;
  group?: { id: string; name: string; color: string | null } | null;
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
  const [groups, setGroups] = useState<Group[]>([]);
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
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingNotifId, setTogglingNotifId] = useState<string | null>(null);
  const [assigningGroupId, setAssigningGroupId] = useState<string | null>(null);

  // Group Management State
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [manageGroupsOpen, setManageGroupsOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupColor, setNewGroupColor] = useState("#3b82f6");
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [deletingGroupId, setDeletingGroupId] = useState<string | null>(null);

  // Editing Group State
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [editName, setEditName] = useState("");
  const [editColor, setEditColor] = useState("");
  const [updatingGroup, setUpdatingGroup] = useState(false);

  const getGroupName = useCallback((groupId: string | null) => {
    if (!groupId || groupId === "ungrouped") return "Ungrouped";
    const group = groups.find(g => g.id === groupId);
    return group ? group.name : "Ungrouped";
  }, [groups]);

  const getServerName = useCallback((serverId: string) => {
    const server = servers.find(s => s.id === serverId);
    return server ? server.name : "Select a server...";
  }, [servers]);

  useEffect(() => {
    axios.get("/api/servers").then((res) => setServers(res.data));
  }, []);

  const fetchGroups = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/groups");
      setGroups(data);
      // Update editingGroup if it's currently open to reflect latest counts/data
      setEditingGroup(prev => {
        if (!prev) return null;
        return data.find((g: Group) => g.id === prev.id) || null;
      });
      // Automatically expand all groups initially if not set
      setExpandedGroups(prev => {
        const next = { ...prev };
        let changed = false;
        data.forEach((g: Group) => {
          if (next[g.id] === undefined) {
            next[g.id] = true;
            changed = true;
          }
        });
        if (next["ungrouped"] === undefined) {
          next["ungrouped"] = true;
          changed = true;
        }
        return changed ? next : prev;
      });
    } catch {
      toast.error("Failed to fetch groups");
    }
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
    fetchGroups();
  }, [fetchGroups]);

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

  const handleStopTracking = async (playerId: string) => {
    if (!confirm("Are you sure you want to stop tracking this player? Historical data will be preserved.")) return;
    
    setDeletingId(playerId);
    try {
      await axios.delete(`/api/players/${playerId}`);
      toast.success("Stopped tracking player");
      fetchPlayers();
    } catch {
      toast.error("Failed to stop tracking player");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleRustPlusNotifications = async (
    playerId: string,
    enabled: boolean
  ) => {
    setTogglingNotifId(playerId);
    try {
      await axios.patch(`/api/players/${playerId}`, {
        rustPlusNotifications: !enabled,
      });
      setPlayers((prev) =>
        prev.map((player) =>
          player.id === playerId
            ? { ...player, rustPlusNotifications: !enabled }
            : player
        )
      );
      toast.success(`Rust+ alerts ${enabled ? "disabled" : "enabled"}`);
    } catch {
      toast.error("Failed to update Rust+ alerts");
    } finally {
      setTogglingNotifId(null);
    }
  };

  const handleAssignGroup = async (playerId: string, groupId: string | null) => {
    setAssigningGroupId(playerId);
    try {
      await axios.patch(`/api/players/${playerId}`, {
        groupId,
      });
      toast.success("Group assigned");
      fetchPlayers();
      fetchGroups(); // refresh counts
    } catch {
      toast.error("Failed to assign group");
    } finally {
      setAssigningGroupId(null);
    }
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    setCreatingGroup(true);
    try {
      await axios.post("/api/groups", { name: newGroupName.trim(), color: newGroupColor });
      toast.success("Group created");
      setNewGroupName("");
      fetchGroups();
    } catch {
      toast.error("Failed to create group");
    } finally {
      setCreatingGroup(false);
    }
  };

  const handleUpdateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGroup || !editName.trim()) return;
    setUpdatingGroup(true);
    try {
      await axios.patch(`/api/groups/${editingGroup.id}`, { 
        name: editName.trim(), 
        color: editColor 
      });
      toast.success("Group updated");
      fetchGroups();
      setEditingGroup(null);
    } catch {
      toast.error("Failed to update group");
    } finally {
      setUpdatingGroup(false);
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    if (!confirm("Delete this group? Players in this group will become ungrouped.")) return;
    setDeletingGroupId(groupId);
    try {
      await axios.delete(`/api/groups/${groupId}`);
      toast.success("Group deleted");
      fetchGroups();
      fetchPlayers();
    } catch {
      toast.error("Failed to delete group");
    } finally {
      setDeletingGroupId(null);
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

  const groupedPlayers = useMemo(() => {
    const map = new Map<string, Player[]>();
    map.set("ungrouped", []);
    groups.forEach(g => map.set(g.id, []));

    sortedPlayers.forEach(p => {
      if (p.groupId && map.has(p.groupId)) {
        map.get(p.groupId)!.push(p);
      } else {
        map.get("ungrouped")!.push(p);
      }
    });
    return map;
  }, [sortedPlayers, groups]);

  const toggleSort = (key: PlayerSortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const toggleGroupExpand = (groupId: string) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const renderPlayerCard = (player: Player) => (
    <div key={player.id} className="rounded-lg border bg-card p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {player.isOnline ? (
            <span className="pulse-dot"></span>
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30"></span>
          )}
          <h4 className="font-medium text-sm">{player.name}</h4>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-destructive hover:bg-destructive/10 -mt-2 -mr-2"
          onClick={() => handleStopTracking(player.id)}
          disabled={deletingId === player.id}
        >
          {deletingId === player.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex flex-col gap-2.5 text-xs">
        <div>
          <p className="text-muted-foreground text-[10px] uppercase font-semibold">Server</p>
          <div className="mt-1 flex flex-wrap">
            <Badge variant="outline" className="h-auto whitespace-normal break-all py-0.5 px-2">
              {player.server.name}
            </Badge>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground text-[10px] uppercase font-semibold">Last Seen</p>
          <p className="text-muted-foreground mt-1">{new Date(player.lastSeen).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-[10px] uppercase font-semibold mb-1">Group</p>
          <Select
            value={player.groupId || "ungrouped"}
            onValueChange={(value) => handleAssignGroup(player.id, value === "ungrouped" ? null : value)}
            disabled={assigningGroupId === player.id}
          >
            <SelectTrigger className="w-full h-8 text-xs">
              <span data-slot="select-value" className="flex flex-1 text-left line-clamp-1">
                {getGroupName(player.groupId)}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ungrouped">Ungrouped</SelectItem>
              {groups.map(g => (
                <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex gap-2 pt-2 border-t">
        <Link href={`/players/${player.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full gap-1">
            Insights <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );

  const renderPlayerRow = (player: Player) => (
    <TableRow key={player.id} className="group transition-colors">
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
        <div className="flex items-center gap-2">
          {player.name}
        </div>
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
      <TableCell>
        <Select
          value={player.groupId || "ungrouped"}
          onValueChange={(value) => handleAssignGroup(player.id, value === "ungrouped" ? null : value)}
          disabled={assigningGroupId === player.id}
        >
          <SelectTrigger className="w-32 h-8 text-xs">
            <span data-slot="select-value" className="flex flex-1 text-left line-clamp-1">
              {getGroupName(player.groupId)}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ungrouped">Ungrouped</SelectItem>
            {groups.map(g => (
              <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Link href={`/players/${player.id}`}>
            <Button variant="ghost" size="sm" className="gap-1">
              Insights <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-destructive hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleStopTracking(player.id)}
            disabled={deletingId === player.id}
            title="Stop Tracking"
          >
            {deletingId === player.id ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Players</h1>
          <p className="text-muted-foreground">View and search tracked players across all servers.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={manageGroupsOpen} onOpenChange={(open) => {
            setManageGroupsOpen(open);
            if (!open) setEditingGroup(null);
          }}>
            <DialogTrigger render={<Button variant="outline" className="gap-2" />}>
              <Settings className="h-4 w-4" /> Manage Groups
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingGroup ? `Edit Group: ${editingGroup.name}` : "Manage Player Groups"}</DialogTitle>
              </DialogHeader>

              {editingGroup ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                  <form onSubmit={handleUpdateGroup} className="space-y-4">
                    <div className="flex gap-3 items-end">
                      <div className="space-y-2 flex-1">
                        <label className="text-sm font-medium">Group Name</label>
                        <Input value={editName} onChange={e => setEditName(e.target.value)} required />
                      </div>
                      <div className="space-y-2 w-20">
                        <label className="text-sm font-medium">Color</label>
                        <Input type="color" className="p-1 h-10 w-full cursor-pointer" value={editColor} onChange={e => setEditColor(e.target.value)} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1" disabled={updatingGroup}>
                        {updatingGroup ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Save Changes
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setEditingGroup(null)}>Cancel</Button>
                    </div>
                  </form>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        Group Members
                        <Badge variant="secondary" className="text-[10px]">{groupedPlayers.get(editingGroup.id)?.length || 0}</Badge>
                      </h4>
                    </div>
                    <div className="border rounded-lg divide-y max-h-48 overflow-y-auto bg-muted/20">
                      {groupedPlayers.get(editingGroup.id)?.length === 0 ? (
                        <div className="p-4 text-center text-xs text-muted-foreground">No members in this group.</div>
                      ) : (
                        groupedPlayers.get(editingGroup.id)?.map(player => (
                          <div key={player.id} className="flex items-center justify-between p-2 pl-3">
                            <span className="text-sm font-medium truncate mr-2">{player.name}</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 text-[10px] text-destructive hover:bg-destructive/10 px-2"
                              onClick={() => handleAssignGroup(player.id, null)}
                              disabled={assigningGroupId === player.id}
                            >
                              {assigningGroupId === player.id ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                              Remove
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-200">
                  <form onSubmit={handleCreateGroup} className="flex gap-3 items-end">
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium">New Group Name</label>
                      <Input value={newGroupName} onChange={e => setNewGroupName(e.target.value)} placeholder="e.g. Clan Enemies" required />
                    </div>
                    <div className="space-y-2 w-20">
                      <label className="text-sm font-medium">Color</label>
                      <Input type="color" className="p-1 h-10 w-full cursor-pointer" value={newGroupColor} onChange={e => setNewGroupColor(e.target.value)} />
                    </div>
                    <Button type="submit" disabled={creatingGroup}>
                      {creatingGroup ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                    </Button>
                  </form>

                  <div className="border rounded-md divide-y max-h-64 overflow-y-auto">
                    {groups.length === 0 ? (
                      <div className="p-4 text-center text-sm text-muted-foreground">No groups created yet.</div>
                    ) : (
                      groups.map(group => (
                        <div key={group.id} className="flex items-center justify-between p-3 bg-card hover:bg-muted/10 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: group.color || '#ccc' }} />
                            <span className="font-medium text-sm">{group.name}</span>
                            <Badge variant="secondary" className="text-[10px]">{group._count?.players || 0}</Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                setEditingGroup(group);
                                setEditName(group.name);
                                setEditColor(group.color || "#3b82f6");
                              }}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                              onClick={() => handleDeleteGroup(group.id)}
                              disabled={deletingGroupId === group.id}
                            >
                              {deletingGroupId === group.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Button onClick={() => setShowAddForm((value) => !value)}>
            {showAddForm ? "Cancel" : "Add Player Manually"}
          </Button>
        </div>
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
                <Select
                  value={newPlayerServer}
                  onValueChange={(v) => v && setNewPlayerServer(v)}
                >
                  <SelectTrigger className="w-full h-10">
                    <span data-slot="select-value" className="flex flex-1 text-left line-clamp-1">
                      {getServerName(newPlayerServer)}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {servers.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-md">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            
            {/* Desktop View */}
            <div className="rounded-md border hidden md:block">
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
                    <TableHead>Group</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.length === 0 && !loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                        No players found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {groups.map(group => {
                        const groupPlayers = groupedPlayers.get(group.id) || [];
                        if (groupPlayers.length === 0) return null;
                        const isExpanded = expandedGroups[group.id] !== false;

                        return (
                          <Fragment key={group.id}>
                            <TableRow 
                              className="bg-muted/30 hover:bg-muted/50 cursor-pointer"
                              onClick={() => toggleGroupExpand(group.id)}
                            >
                              <TableCell colSpan={7} className="py-2">
                                <div className="flex items-center gap-2 font-medium">
                                  <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: group.color || '#ccc' }} />
                                  {group.name}
                                  <Badge variant="secondary" className="ml-2 font-normal text-xs">{groupPlayers.length}</Badge>
                                </div>
                              </TableCell>
                            </TableRow>
                            {isExpanded && groupPlayers.map(renderPlayerRow)}
                          </Fragment>
                        );
                      })}
                      
                      {/* Ungrouped Section */}
                      {(groupedPlayers.get("ungrouped")?.length ?? 0) > 0 && (
                        <Fragment key="ungrouped">
                          <TableRow 
                            className="bg-muted/30 hover:bg-muted/50 cursor-pointer"
                            onClick={() => toggleGroupExpand("ungrouped")}
                          >
                            <TableCell colSpan={7} className="py-2">
                              <div className="flex items-center gap-2 font-medium text-muted-foreground">
                                <ChevronDown className={`h-4 w-4 transition-transform ${expandedGroups["ungrouped"] !== false ? '' : '-rotate-90'}`} />
                                Ungrouped
                                <Badge variant="secondary" className="ml-2 font-normal text-xs">{groupedPlayers.get("ungrouped")?.length}</Badge>
                              </div>
                            </TableCell>
                          </TableRow>
                          {expandedGroups["ungrouped"] !== false && groupedPlayers.get("ungrouped")?.map(renderPlayerRow)}
                        </Fragment>
                      )}
                    </>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Mobile View */}
            <div className="grid gap-4 md:hidden">
              {players.length === 0 && !loading ? (
                <div className="h-24 flex items-center justify-center text-muted-foreground border rounded-md">
                  No players found.
                </div>
              ) : (
                <>
                  {groups.map(group => {
                    const groupPlayers = groupedPlayers.get(group.id) || [];
                    if (groupPlayers.length === 0) return null;
                    const isExpanded = expandedGroups[group.id] !== false;

                    return (
                      <div key={group.id} className="space-y-3">
                        <div 
                          className="flex items-center gap-2 font-medium bg-muted/30 p-3 rounded-lg border cursor-pointer active:bg-muted/50 transition-colors"
                          onClick={() => toggleGroupExpand(group.id)}
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: group.color || '#ccc' }} />
                          <span className="truncate">{group.name}</span>
                          <Badge variant="secondary" className="ml-auto font-normal text-xs">{groupPlayers.length}</Badge>
                        </div>
                        {isExpanded && <div className="grid gap-3">{groupPlayers.map(renderPlayerCard)}</div>}
                      </div>
                    );
                  })}

                  {(groupedPlayers.get("ungrouped")?.length ?? 0) > 0 && (
                    <div className="space-y-3">
                      <div 
                        className="flex items-center gap-2 font-medium text-muted-foreground bg-muted/30 p-3 rounded-lg border cursor-pointer active:bg-muted/50 transition-colors"
                        onClick={() => toggleGroupExpand("ungrouped")}
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform ${expandedGroups["ungrouped"] !== false ? '' : '-rotate-90'}`} />
                        <span className="truncate">Ungrouped</span>
                        <Badge variant="secondary" className="ml-auto font-normal text-xs">{groupedPlayers.get("ungrouped")?.length}</Badge>
                      </div>
                      {expandedGroups["ungrouped"] !== false && <div className="grid gap-3">{groupedPlayers.get("ungrouped")?.map(renderPlayerCard)}</div>}
                    </div>
                  )}
                </>
              )}
            </div>
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
