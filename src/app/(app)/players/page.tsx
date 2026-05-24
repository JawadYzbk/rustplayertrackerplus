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

  // Batch Selection State
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<Set<string>>(new Set());
  const [isBatchDeleting, setIsBatchDeleting] = useState(false);

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
    const timer = setTimeout(() => {
      fetchGroups();
    }, 0);
    return () => clearTimeout(timer);
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

  const handleBatchDelete = async () => {
    const count = selectedPlayerIds.size;
    if (count === 0) return;
    if (!confirm(`Are you sure you want to stop tracking ${count} selected players?`)) return;

    setIsBatchDeleting(true);
    try {
      await axios.delete("/api/players", {
        data: { playerIds: Array.from(selectedPlayerIds) },
      });
      toast.success(`Stopped tracking ${count} players`);
      setSelectedPlayerIds(new Set());
      fetchPlayers();
      fetchGroups();
    } catch {
      toast.error("Failed to delete selected players");
    } finally {
      setIsBatchDeleting(false);
    }
  };

  const toggleSelectPlayer = (playerId: string) => {
    setSelectedPlayerIds(prev => {
      const next = new Set(prev);
      if (next.has(playerId)) next.delete(playerId);
      else next.add(playerId);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedPlayerIds.size === players.length && players.length > 0) {
      setSelectedPlayerIds(new Set());
    } else {
      setSelectedPlayerIds(new Set(players.map(p => p.id)));
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
    if (!confirm("Delete this group? ALL players in this group will also be deleted from tracking.")) return;
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
    <div key={player.id} className={`rounded-xl border bg-card p-4 space-y-3 transition-all ${selectedPlayerIds.has(player.id) ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            className="rounded border-white/20 bg-white/5 accent-primary h-4 w-4"
            checked={selectedPlayerIds.has(player.id)}
            onChange={() => toggleSelectPlayer(player.id)}
          />
          <div className="flex items-center gap-2">
            {player.isOnline ? (
              <span className="pulse-dot"></span>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30"></span>
            )}
            <h4 className="font-bold text-sm">{player.name}</h4>
          </div>
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
        <div>
          <p className="text-muted-foreground text-[10px] uppercase font-semibold mb-1">Rust+ Alerts</p>
          <Button
            variant={player.rustPlusNotifications ? "secondary" : "outline"}
            size="sm"
            className="w-full text-xs h-8"
            disabled={togglingNotifId === player.id}
            onClick={() =>
              handleToggleRustPlusNotifications(
                player.id,
                player.rustPlusNotifications
              )
            }
          >
            {togglingNotifId === player.id ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : player.rustPlusNotifications ? (
              "Enabled"
            ) : (
              "Disabled"
            )}
          </Button>
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
    <TableRow key={player.id} className={`group transition-colors ${selectedPlayerIds.has(player.id) ? 'bg-primary/5' : ''}`}>
      <TableCell className="w-10">
        <input 
          type="checkbox" 
          className="rounded border-white/20 bg-white/5 accent-primary"
          checked={selectedPlayerIds.has(player.id)}
          onChange={() => toggleSelectPlayer(player.id)}
        />
      </TableCell>
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
      <TableCell>
        <Button
          variant={player.rustPlusNotifications ? "secondary" : "outline"}
          size="sm"
          disabled={togglingNotifId === player.id}
          onClick={() =>
            handleToggleRustPlusNotifications(
              player.id,
              player.rustPlusNotifications
            )
          }
        >
          {togglingNotifId === player.id ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : player.rustPlusNotifications ? (
            "Enabled"
          ) : (
            "Disabled"
          )}
        </Button>
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
    <div className="mx-auto max-w-7xl space-y-10 pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-2">Players</h1>
          <p className="text-lg text-muted-foreground">Manage and track your player database across all servers.</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={manageGroupsOpen} onOpenChange={(open) => {
            setManageGroupsOpen(open);
            if (!open) setEditingGroup(null);
          }}>
            <DialogTrigger render={<Button variant="outline" className="rounded-xl border-border/40 hover:bg-white/5" />}>
              <Settings className="h-4 w-4 mr-2" /> Manage Groups
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-2xl glass-panel border-white/5 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">{editingGroup ? `Edit Group: ${editingGroup.name}` : "Manage Player Groups"}</DialogTitle>
              </DialogHeader>

              {editingGroup ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200 mt-4">
                  <form onSubmit={handleUpdateGroup} className="space-y-4">
                    <div className="flex gap-3 items-end">
                      <div className="space-y-2 flex-1">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground opacity-60">Group Name</label>
                        <Input value={editName} onChange={e => setEditName(e.target.value)} required className="rounded-xl bg-background/40 border-border/40 h-11" />
                      </div>
                      <div className="space-y-2 w-20">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground opacity-60">Color</label>
                        <Input type="color" className="p-1 h-11 w-full cursor-pointer rounded-xl bg-background/40 border-border/40" value={editColor} onChange={e => setEditColor(e.target.value)} />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="flex-1 rounded-xl h-11 shadow-lg" disabled={updatingGroup}>
                        {updatingGroup ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Save Changes
                      </Button>
                      <Button type="button" variant="outline" className="rounded-xl h-11 border-border/40" onClick={() => setEditingGroup(null)}>Cancel</Button>
                    </div>
                  </form>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        Group Members
                        <Badge variant="secondary" className="text-[10px] bg-white/5 rounded-md">{groupedPlayers.get(editingGroup.id)?.length || 0}</Badge>
                      </h4>
                    </div>
                    <div className="border border-white/5 rounded-xl divide-y divide-white/5 max-h-48 overflow-y-auto bg-white/5">
                      {groupedPlayers.get(editingGroup.id)?.length === 0 ? (
                        <div className="p-4 text-center text-xs text-muted-foreground">No members in this group.</div>
                      ) : (
                        groupedPlayers.get(editingGroup.id)?.map(player => (
                          <div key={player.id} className="flex items-center justify-between p-3 pl-4">
                            <span className="text-sm font-semibold truncate mr-2">{player.name}</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 text-[10px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10 px-3 rounded-lg"
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
                <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-200 mt-4">
                  <form onSubmit={handleCreateGroup} className="flex gap-3 items-end">
                    <div className="space-y-2 flex-1">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground opacity-60">New Group Name</label>
                      <Input value={newGroupName} onChange={e => setNewGroupName(e.target.value)} placeholder="e.g. Clan Enemies" required className="rounded-xl bg-background/40 border-border/40 h-11" />
                    </div>
                    <div className="space-y-2 w-20">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground opacity-60">Color</label>
                      <Input type="color" className="p-1 h-11 w-full cursor-pointer rounded-xl bg-background/40 border-border/40" value={newGroupColor} onChange={e => setNewGroupColor(e.target.value)} />
                    </div>
                    <Button type="submit" size="lg" className="rounded-xl h-11 w-11 p-0 shadow-lg" disabled={creatingGroup}>
                      {creatingGroup ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-5 w-5" />}
                    </Button>
                  </form>

                  <div className="border border-white/5 rounded-xl divide-y divide-white/5 max-h-64 overflow-y-auto bg-white/5">
                    {groups.length === 0 ? (
                      <div className="p-6 text-center text-sm text-muted-foreground opacity-60 italic">No groups created yet.</div>
                    ) : (
                      groups.map(group => (
                        <div key={group.id} className="flex items-center justify-between p-4 bg-transparent hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: group.color || '#ccc' }} />
                            <span className="font-bold text-sm">{group.name}</span>
                            <Badge variant="secondary" className="text-[10px] font-bold bg-white/5 rounded-md">{group._count?.players || 0}</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 rounded-lg hover:bg-white/10"
                              onClick={() => {
                                setEditingGroup(group);
                                setEditName(group.name);
                                setEditColor(group.color || "#3b82f6");
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0 rounded-lg"
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

          <Button 
            variant="outline"
            className="rounded-xl border-border/40 hover:bg-white/5"
            onClick={() => setShowAddForm((value) => !value)}
          >
            {showAddForm ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
            {showAddForm ? "Cancel" : "Add Player"}
          </Button>
        </div>
      </div>

      {showAddForm && (
        <Card className="glass-card border-none shadow-none overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Manually Add Player</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddPlayer} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Player ID (BattleMetrics)</label>
                <Input 
                  value={newPlayerId} 
                  onChange={e => setNewPlayerId(e.target.value)} 
                  placeholder="e.g. 1234567" 
                  className="rounded-xl bg-background/40 border-border/40 h-11"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Target Server</label>
                <Select
                  value={newPlayerServer}
                  onValueChange={(v) => v && setNewPlayerServer(v)}
                >
                  <SelectTrigger className="w-full h-11 rounded-xl bg-background/40 border-border/40">
                    <SelectValue placeholder="Select server" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl glass-panel border-white/5">
                    {servers.map(s => (
                      <SelectItem key={s.id} value={s.id} className="rounded-lg">{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" size="lg" className="rounded-xl h-11 shadow-lg" disabled={adding || !newPlayerId || !newPlayerServer}>
                {adding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Track Player
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="glass-card border-none shadow-none overflow-hidden">
        <CardHeader className="pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <Users size={20} className="text-primary" />
              </div>
              Player Directory
            </CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                className="pl-10 h-11 rounded-xl bg-background/40 border-border/40 focus:bg-background/60 transition-all"
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
              <div className="absolute inset-0 bg-background/30 backdrop-blur-md z-10 flex items-center justify-center rounded-2xl">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            )}
            
            {/* Desktop View */}
            <div className="rounded-2xl border border-white/5 overflow-hidden hidden md:block">
              {selectedPlayerIds.size > 0 && (
                <div className="bg-destructive/10 border-b border-white/5 p-3 px-6 flex items-center justify-between animate-in slide-in-from-top-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-destructive flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    {selectedPlayerIds.size} Players Selected
                  </span>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="h-8 text-[10px] font-bold uppercase tracking-widest rounded-lg"
                    onClick={handleBatchDelete}
                    disabled={isBatchDeleting}
                  >
                    {isBatchDeleting ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : null}
                    Confirm Delete
                  </Button>
                </div>
              )}
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-border/40 hover:bg-transparent">
                    <TableHead className="w-10">
                      <input 
                        type="checkbox" 
                        className="rounded border-white/20 bg-white/5 accent-primary"
                        checked={selectedPlayerIds.size === players.length && players.length > 0}
                        onChange={toggleSelectAll}
                      />
                    </TableHead>
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
                    <TableHead className="py-4 text-xs font-bold uppercase tracking-widest">Group</TableHead>
                    <TableHead className="py-4 text-xs font-bold uppercase tracking-widest">Rust+ Alerts</TableHead>
                    <TableHead className="py-4 text-xs font-bold uppercase tracking-widest"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.length === 0 && !loading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-40 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-3">
                          <Users size={40} className="opacity-10" />
                          <p>No players found.</p>
                        </div>
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
                              className="bg-white/5 hover:bg-white/10 cursor-pointer border-border/40"
                              onClick={() => toggleGroupExpand(group.id)}
                            >
                              <TableCell colSpan={9} className="py-3">
                                <div className="flex items-center gap-3 font-bold text-xs uppercase tracking-wider">
                                  <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
                                  <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: group.color || '#ccc' }} />
                                  {group.name}
                                  <Badge variant="secondary" className="ml-2 font-bold text-[10px] bg-white/5 rounded-md">{groupPlayers.length}</Badge>
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
                            className="bg-white/5 hover:bg-white/10 cursor-pointer border-border/40"
                            onClick={() => toggleGroupExpand("ungrouped")}
                          >
                            <TableCell colSpan={9} className="py-3">
                              <div className="flex items-center gap-3 font-bold text-xs uppercase tracking-wider text-muted-foreground">
                                <ChevronDown className={`h-4 w-4 transition-transform ${expandedGroups["ungrouped"] !== false ? '' : '-rotate-90'}`} />
                                Ungrouped
                                <Badge variant="secondary" className="ml-2 font-bold text-[10px] bg-white/5 rounded-md">{groupedPlayers.get("ungrouped")?.length}</Badge>
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
              {selectedPlayerIds.size > 0 && (
                <div className="fixed bottom-20 left-4 right-4 z-50 bg-destructive p-4 rounded-2xl shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom-8">
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-bold">{selectedPlayerIds.size} Players</span>
                    <span className="text-white/70 text-[10px] uppercase tracking-widest font-bold">Selected</span>
                  </div>
                  <Button 
                    variant="secondary"
                    size="sm"
                    className="h-10 px-6 rounded-xl font-bold"
                    onClick={handleBatchDelete}
                    disabled={isBatchDeleting}
                  >
                    {isBatchDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
                    Delete Selected
                  </Button>
                </div>
              )}
              {players.length === 0 && !loading ? (
                <div className="h-40 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border/40 rounded-2xl gap-3">
                  <Users size={32} className="opacity-10" />
                  <p className="text-sm">No players found.</p>
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
                          className="flex items-center gap-3 font-bold text-xs uppercase tracking-wider bg-white/5 p-4 rounded-xl border border-white/5 cursor-pointer active:bg-white/10 transition-colors"
                          onClick={() => toggleGroupExpand(group.id)}
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
                          <div className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: group.color || '#ccc' }} />
                          <span className="truncate">{group.name}</span>
                          <Badge variant="secondary" className="ml-auto font-bold text-[10px] bg-white/10 rounded-md">{groupPlayers.length}</Badge>
                        </div>
                        {isExpanded && <div className="grid gap-3">{groupPlayers.map(renderPlayerCard)}</div>}
                      </div>
                    );
                  })}

                  {(groupedPlayers.get("ungrouped")?.length ?? 0) > 0 && (
                    <div className="space-y-3">
                      <div 
                        className="flex items-center gap-3 font-bold text-xs uppercase tracking-wider text-muted-foreground bg-white/5 p-4 rounded-xl border border-white/5 cursor-pointer active:bg-white/10 transition-colors"
                        onClick={() => toggleGroupExpand("ungrouped")}
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform ${expandedGroups["ungrouped"] !== false ? '' : '-rotate-90'}`} />
                        <span className="truncate">Ungrouped</span>
                        <Badge variant="secondary" className="ml-auto font-bold text-[10px] bg-white/10 rounded-md">{groupedPlayers.get("ungrouped")?.length}</Badge>
                      </div>
                      {expandedGroups["ungrouped"] !== false && <div className="grid gap-3">{groupedPlayers.get("ungrouped")?.map(renderPlayerCard)}</div>}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
            <p className="text-sm text-muted-foreground font-medium">
              Showing <span className="text-foreground">{players.length}</span> of <span className="text-foreground">{total}</span> players
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
