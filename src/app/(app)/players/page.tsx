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
  Activity,
  Database,
  Sparkles,
  Calendar,
  Bell,
  SlidersHorizontal,
  FolderLock
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
        <ArrowUp className="h-3 w-3 text-primary" />
      ) : (
        <ArrowDown className="h-3 w-3 text-primary" />
      )
    ) : (
      <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-75 transition-opacity" />
    );

  return (
    <TableHead
      className="cursor-pointer select-none transition-colors hover:text-foreground group font-heading text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground"
      onClick={() => onToggle(sortKey)}
    >
      <span className="inline-flex items-center gap-1.5 py-1">
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

  const [servers, setServers] = useState<{ id: string; name: string }[]>([]);
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
  const [newGroupColor, setNewGroupColor] = useState("#f06e28"); // Rust-like primary color default
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [deletingGroupId, setDeletingGroupId] = useState<string | null>(null);

  // Editing Group State
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [editName, setEditName] = useState("");
  const [editColor, setEditColor] = useState("");
  const [updatingGroup, setUpdatingGroup] = useState(false);

  // Delete confirmation dialog states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmDescription, setConfirmDescription] = useState("");

  const triggerConfirm = (title: string, description: string, action: () => void) => {
    setConfirmTitle(title);
    setConfirmDescription(description);
    setConfirmAction(() => action);
    setConfirmOpen(true);
  };

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

  const handleStopTracking = (playerId: string) => {
    triggerConfirm(
      "Stop Tracking Player?",
      "Are you sure you want to stop tracking this player? Historical data will be preserved.",
      async () => {
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
      }
    );
  };

  const handleBatchDelete = () => {
    const count = selectedPlayerIds.size;
    if (count === 0) return;
    triggerConfirm(
      "Stop Tracking Selected Players?",
      `Are you sure you want to stop tracking ${count} selected players?`,
      async () => {
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
      }
    );
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

  const handleDeleteGroup = (groupId: string) => {
    triggerConfirm(
      "Delete Group?",
      "Delete this group? ALL players in this group will also be deleted from tracking.",
      async () => {
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
      }
    );
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

  const onlineCount = useMemo(() => {
    return players.filter(p => p.isOnline).length;
  }, [players]);

  const renderPlayerCard = (player: Player) => (
    <div
      key={player.id}
      className={`relative glass-card rounded-2xl p-5 space-y-4 transition-all duration-300 hover:border-primary/25 hover:shadow-[0_8px_30px_rgba(240,110,50,0.04)] ${
        selectedPlayerIds.has(player.id) ? "border-primary/30 bg-primary/5 shadow-inner" : "bg-white/[0.01]"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="rounded border-white/20 bg-background/40 accent-primary h-4.5 w-4.5 cursor-pointer focus:ring-0 focus:ring-offset-0"
            checked={selectedPlayerIds.has(player.id)}
            onChange={() => toggleSelectPlayer(player.id)}
          />
          <div className="flex items-center gap-2">
            {player.isOnline ? (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="pulse-dot" />
                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Online</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 shrink-0" />
                <span className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest">Offline</span>
              </div>
            )}
            <h4 className="font-extrabold text-sm font-heading tracking-wide text-foreground leading-none">{player.name}</h4>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 rounded-xl h-8 w-8 -mt-1 -mr-1"
          onClick={() => handleStopTracking(player.id)}
          disabled={deletingId === player.id}
        >
          {deletingId === player.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
        <div className="space-y-1">
          <p className="text-muted-foreground/50 text-[8px] uppercase tracking-widest font-extrabold font-heading">Target Server</p>
          <div className="flex flex-wrap">
            <Badge variant="outline" className="h-auto font-bold border-white/5 bg-white/5 text-muted-foreground/80 whitespace-normal py-0.5 px-2 rounded-lg text-[10px]">
              {player.server.name}
            </Badge>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground/50 text-[8px] uppercase tracking-widest font-extrabold font-heading">Last Active</p>
          <p className="text-muted-foreground/90 text-[11px] font-sans mt-0.5 flex items-center gap-1">
            <Calendar size={11} className="text-muted-foreground/40" />
            {new Date(player.lastSeen).toLocaleDateString()}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground/50 text-[8px] uppercase tracking-widest font-extrabold font-heading mb-1">Group Tag</p>
          <Select
            value={player.groupId || "ungrouped"}
            onValueChange={(value) => handleAssignGroup(player.id, value === "ungrouped" ? null : value)}
            disabled={assigningGroupId === player.id}
          >
            <SelectTrigger className="w-full h-8 text-[11px] font-bold rounded-xl border-white/5 bg-background/40">
              <span data-slot="select-value" className="flex flex-1 text-left line-clamp-1">
                {getGroupName(player.groupId)}
              </span>
            </SelectTrigger>
            <SelectContent className="rounded-2xl bg-zinc-950 border-white/5 text-xs font-bold">
              <SelectItem value="ungrouped" className="rounded-lg">Ungrouped</SelectItem>
              {groups.map(g => (
                <SelectItem key={g.id} value={g.id} className="rounded-lg">{g.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground/50 text-[8px] uppercase tracking-widest font-extrabold font-heading mb-1">Rust+ Alerts</p>
          <Button
            variant={player.rustPlusNotifications ? "secondary" : "outline"}
            size="sm"
            className={`w-full text-[10px] font-extrabold uppercase tracking-wider rounded-xl h-8 border-white/5 ${
              player.rustPlusNotifications ? "bg-primary/10 border-primary/20 text-primary hover:bg-primary/15" : "bg-white/5 text-muted-foreground/60 hover:text-foreground"
            }`}
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
              "Active alerts"
            ) : (
              "Alerts disabled"
            )}
          </Button>
        </div>
      </div>

      <div className="flex gap-2 pt-3 border-t border-white/5">
        <Link href={`/players/${player.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full gap-1 text-[10px] font-black uppercase tracking-widest rounded-xl border-white/5 bg-background/50 hover:bg-white/5 h-9 transition-all cursor-pointer">
            Insights Cockpit <ChevronRight className="h-3.5 w-3.5 text-primary" />
          </Button>
        </Link>
      </div>
    </div>
  );

  const renderPlayerRow = (player: Player) => (
    <TableRow key={player.id} className={`group transition-all duration-200 border-b border-white/5 relative ${selectedPlayerIds.has(player.id) ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-white/[0.01]'}`}>
      <TableCell className="w-10 pl-6">
        <input
          type="checkbox"
          className="rounded border-white/20 bg-background/40 accent-primary h-4.5 w-4.5 cursor-pointer focus:ring-0 focus:ring-offset-0"
          checked={selectedPlayerIds.has(player.id)}
          onChange={() => toggleSelectPlayer(player.id)}
        />
      </TableCell>
      <TableCell className="py-4.5">
        {player.isOnline ? (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="pulse-dot"></span>
            <span className="text-[9px] font-black uppercase tracking-widest text-green-500 font-heading">Online</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 shrink-0"></span>
            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 font-heading">Offline</span>
          </div>
        )}
      </TableCell>
      <TableCell className="font-extrabold text-foreground tracking-wide font-heading py-4.5">
        {player.name}
      </TableCell>
      <TableCell className="text-muted-foreground py-4.5">
        <Badge variant="outline" className="font-bold border-white/5 bg-white/5 text-muted-foreground/80 py-0.5 px-2 rounded-lg text-[10px]">{player.server.name}</Badge>
      </TableCell>
      <TableCell className="text-xs font-mono font-medium text-muted-foreground/75 py-4.5">
        <div className="flex items-center gap-1.5">
          <Calendar size={12} className="text-muted-foreground/45" />
          {new Date(player.lastSeen).toLocaleString()}
        </div>
      </TableCell>
      <TableCell className="text-xs font-mono font-medium text-muted-foreground/60 py-4.5">
        <div className="flex items-center gap-1.5">
          <Calendar size={12} className="text-muted-foreground/45" />
          {new Date(player.firstSeen).toLocaleDateString()}
        </div>
      </TableCell>
      <TableCell className="py-4.5">
        <Select
          value={player.groupId || "ungrouped"}
          onValueChange={(value) => handleAssignGroup(player.id, value === "ungrouped" ? null : value)}
          disabled={assigningGroupId === player.id}
        >
          <SelectTrigger className="w-32 h-8 text-[11px] font-extrabold rounded-xl border-white/5 bg-background/40">
            <span data-slot="select-value" className="flex flex-1 text-left line-clamp-1">
              {getGroupName(player.groupId)}
            </span>
          </SelectTrigger>
          <SelectContent className="rounded-2xl bg-zinc-950 border-white/5 text-xs font-bold">
            <SelectItem value="ungrouped" className="rounded-lg">Ungrouped</SelectItem>
            {groups.map(g => (
              <SelectItem key={g.id} value={g.id} className="rounded-lg">{g.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="py-4.5">
        <Button
          variant={player.rustPlusNotifications ? "secondary" : "outline"}
          size="sm"
          className={`text-[9px] font-black uppercase tracking-widest rounded-xl h-8 border-white/5 ${
            player.rustPlusNotifications ? "bg-primary/10 border-primary/20 text-primary hover:bg-primary/15" : "bg-white/5 text-muted-foreground/60 hover:text-foreground"
          }`}
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
            "Active alerts"
          ) : (
            "Disabled"
          )}
        </Button>
      </TableCell>
      <TableCell className="text-right pr-6 py-4.5">
        <div className="flex items-center justify-end gap-2">
          <Link href={`/players/${player.id}`}>
            <Button variant="outline" size="sm" className="gap-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl border-white/5 bg-background/50 hover:bg-white/5 h-8.5 px-3 cursor-pointer">
              Insights <ChevronRight className="h-3.5 w-3.5 text-primary" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground/35 hover:text-destructive hover:bg-destructive/10 rounded-xl h-8.5 w-8.5 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
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
    <div className="relative mx-auto max-w-7xl space-y-10 pb-12">
      {/* Decorative ambient glowing background spots */}
      <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Header section */}
      <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 mb-3">
            <Sparkles size={13} className="text-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Directory intelligence</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl font-heading">
            Player <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">Registry</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl">
            Centralized telemetry log of tracked cohort profiles, alerts states, and group cohort associations.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Dialog open={manageGroupsOpen} onOpenChange={(open) => {
            setManageGroupsOpen(open);
            if (!open) setEditingGroup(null);
          }}>
            <DialogTrigger render={<Button variant="outline" className="rounded-xl border-white/5 bg-white/5 text-xs font-bold uppercase tracking-widest hover:bg-white/10 h-11 px-5 shadow-md flex items-center gap-2 cursor-pointer" />}>
              <Settings className="h-4 w-4 text-primary" /> Manage Groups
            </DialogTrigger>
            <DialogContent className="max-w-md bg-zinc-950 border-white/5 shadow-2xl rounded-2xl p-6 text-zinc-100">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold font-heading">{editingGroup ? `Edit Group: ${editingGroup.name}` : "Manage Player Groups"}</DialogTitle>
              </DialogHeader>

              {editingGroup ? (
                <div className="space-y-6 mt-4">
                  <form onSubmit={handleUpdateGroup} className="space-y-4">
                    <div className="flex gap-3 items-end">
                      <div className="space-y-2 flex-1">
                        <label className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground/60 font-heading">Group Name</label>
                        <Input value={editName} onChange={e => setEditName(e.target.value)} required className="rounded-xl bg-background/40 border-white/10 focus:border-primary/55 h-11 text-xs font-semibold" />
                      </div>
                      <div className="space-y-2 w-20">
                        <label className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground/60 font-heading">Color</label>
                        <Input type="color" className="p-1 h-11 w-full cursor-pointer rounded-xl bg-background/40 border-white/10" value={editColor} onChange={e => setEditColor(e.target.value)} />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button type="submit" className="flex-1 rounded-xl h-11 text-xs font-bold uppercase tracking-widest shadow-lg" disabled={updatingGroup}>
                        {updatingGroup ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Save Changes
                      </Button>
                      <Button type="button" variant="outline" className="rounded-xl h-11 text-xs font-bold uppercase tracking-widest border-white/10 hover:bg-white/5" onClick={() => setEditingGroup(null)}>Cancel</Button>
                    </div>
                  </form>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2 font-heading">
                        Group Members
                        <Badge variant="secondary" className="text-[9px] bg-white/5 text-muted-foreground/80 font-mono rounded-md py-0 px-1.5 border-none">{groupedPlayers.get(editingGroup.id)?.length || 0}</Badge>
                      </h4>
                    </div>
                    <div className="border border-white/5 rounded-xl divide-y divide-white/5 max-h-48 overflow-y-auto bg-zinc-950/40">
                      {groupedPlayers.get(editingGroup.id)?.length === 0 ? (
                        <div className="p-4 text-center text-xs text-muted-foreground/50 italic font-medium">No members in this group.</div>
                      ) : (
                        groupedPlayers.get(editingGroup.id)?.map(player => (
                          <div key={player.id} className="flex items-center justify-between p-3 pl-4">
                            <span className="text-xs font-bold truncate mr-2 text-foreground/90">{player.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-[9px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10 px-3 rounded-lg cursor-pointer"
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
                <div className="space-y-6 mt-4">
                  <form onSubmit={handleCreateGroup} className="flex gap-3 items-end">
                    <div className="space-y-2 flex-1">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground/60 font-heading">New Group Name</label>
                      <Input value={newGroupName} onChange={e => setNewGroupName(e.target.value)} placeholder="e.g. Rival Clan" required className="rounded-xl bg-background/40 border-white/10 focus:border-primary/55 h-11 text-xs font-semibold" />
                    </div>
                    <div className="space-y-2 w-20">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground/60 font-heading">Color</label>
                      <Input type="color" className="p-1 h-11 w-full cursor-pointer rounded-xl bg-background/40 border-white/10" value={newGroupColor} onChange={e => setNewGroupColor(e.target.value)} />
                    </div>
                    <Button type="submit" size="lg" className="rounded-xl h-11 w-11 p-0 shadow-lg shrink-0 cursor-pointer" disabled={creatingGroup}>
                      {creatingGroup ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-5 w-5" />}
                    </Button>
                  </form>

                  <div className="border border-white/5 rounded-xl divide-y divide-white/5 max-h-64 overflow-y-auto bg-zinc-950/40">
                    {groups.length === 0 ? (
                      <div className="p-6 text-center text-xs text-muted-foreground/50 italic font-semibold">No groups created yet.</div>
                    ) : (
                      groups.map(group => (
                        <div key={group.id} className="flex items-center justify-between p-4 bg-transparent hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-3.5 h-3.5 rounded-full shadow-sm border border-white/10" style={{ backgroundColor: group.color || '#ccc' }} />
                            <span className="font-bold text-xs text-foreground/95">{group.name}</span>
                            <Badge variant="secondary" className="text-[9px] font-mono font-bold bg-white/5 text-muted-foreground/80 rounded-md py-0 px-1.5 border-none">{group._count?.players || 0}</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground cursor-pointer"
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
                              className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0 rounded-lg cursor-pointer"
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
            className="rounded-xl border-white/5 bg-white/5 text-xs font-bold uppercase tracking-widest hover:bg-white/10 h-11 px-5 shadow-md flex items-center gap-2 cursor-pointer"
            onClick={() => setShowAddForm((value) => !value)}
          >
            {showAddForm ? <X className="h-4 w-4 text-destructive" /> : <Plus className="h-4 w-4 text-primary" />}
            {showAddForm ? "Cancel" : "Track Player"}
          </Button>
        </div>
      </div>

      {/* Bento telemetry metric panels */}
      <div className="relative z-10 grid gap-5 grid-cols-1 sm:grid-cols-3">
        {/* Total Profiles Card */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[130px]">
          <div className="absolute -right-4 -bottom-4 opacity-5">
            <Users size={100} className="text-primary" />
          </div>
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-heading">Monitored Registry</span>
            <div className="rounded-xl bg-primary/10 p-2.5">
              <Database size={18} className="text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold tracking-tight font-heading text-foreground">{total.toLocaleString()}</h2>
            <p className="text-[10px] text-muted-foreground/60 mt-1">Total profiles indexed</p>
          </div>
        </div>

        {/* Live Cohort Card */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[130px]">
          <div className="absolute -right-4 -bottom-4 opacity-5">
            <Activity size={100} className="text-green-500" />
          </div>
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-heading">Threat Radar Online</span>
            <div className="rounded-xl bg-green-500/10 p-2.5">
              <Activity size={18} className="text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <h2 className="text-3xl font-extrabold tracking-tight font-heading text-foreground">{onlineCount}</h2>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="pulse-dot" />
              <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Active</span>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground/60 mt-1">Targets live on server hosts</p>
        </div>

        {/* Dynamic Watchlists Card */}
        <div className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[130px]">
          <div className="absolute -right-4 -bottom-4 opacity-5">
            <FolderLock size={100} className="text-orange-400" />
          </div>
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-heading">Sect Watchlists</span>
            <div className="rounded-xl bg-orange-400/10 p-2.5">
              <FolderLock size={18} className="text-orange-400" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold tracking-tight font-heading text-foreground">{groups.length}</h2>
            <p className="text-[10px] text-muted-foreground/60 mt-1">Classified player groups</p>
          </div>
        </div>
      </div>

      {showAddForm && (
        <Card className="glass-card border-none shadow-none overflow-hidden relative z-10 animate-in slide-in-from-top-4 duration-300">
          <CardHeader className="border-b border-white/5 bg-white/[0.01]">
            <CardTitle className="text-lg font-bold font-heading flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <Plus size={18} className="text-primary" />
              </div>
              Track New Target
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleAddPlayer} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 font-heading">BattleMetrics Profile ID</label>
                <Input
                  value={newPlayerId}
                  onChange={e => setNewPlayerId(e.target.value)}
                  placeholder="e.g. 10294829"
                  className="rounded-xl bg-background/40 border-white/5 h-11 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 font-mono text-xs font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 font-heading">Target Server World</label>
                <Select
                  value={newPlayerServer}
                  onValueChange={(v) => v && setNewPlayerServer(v)}
                >
                  <SelectTrigger className="w-full h-11 rounded-xl bg-background/40 border-white/5 text-xs font-semibold focus:ring-1 focus:ring-primary/20">
                    <SelectValue placeholder="Select host server" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl bg-zinc-950 border-white/5 text-xs font-semibold">
                    {servers.map(s => (
                      <SelectItem key={s.id} value={s.id} className="rounded-lg">{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" size="lg" className="rounded-xl h-11 text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-primary/10 cursor-pointer" disabled={adding || !newPlayerId || !newPlayerServer}>
                {adding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Track Target Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Main Frosted Directory Card */}
      <Card className="glass-card border-none shadow-none overflow-hidden relative z-10">
        <CardHeader className="pb-6 border-b border-white/5 bg-white/[0.01]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="flex items-center gap-3 text-lg font-bold font-heading">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <Users size={18} className="text-primary" />
              </div>
              Player Database Registry
            </CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
              <Input
                placeholder="Search index database..."
                className="pl-10 h-11 rounded-xl bg-background/45 border-white/5 focus:bg-background/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 font-semibold text-xs transition-all font-sans"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
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
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-heading">Scanning database...</span>
                </div>
              </div>
            )}

            {/* Desktop View */}
            <div className="hidden md:block">
              {selectedPlayerIds.size > 0 && (
                <div className="bg-destructive/10 border-b border-white/5 p-4.5 px-6 flex items-center justify-between animate-in slide-in-from-top-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-destructive flex items-center gap-2 font-heading">
                    <Trash2 className="h-4.5 w-4.5" />
                    {selectedPlayerIds.size} Target Profiles Selected
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8.5 text-[9px] font-black uppercase tracking-widest rounded-xl px-4 cursor-pointer"
                    onClick={handleBatchDelete}
                    disabled={isBatchDeleting}
                  >
                    {isBatchDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" /> : null}
                    Confirm Stop Tracking
                  </Button>
                </div>
              )}
              <Table>
                <TableHeader className="bg-white/[0.02] border-b border-white/5">
                  <TableRow className="border-none hover:bg-transparent">
                    <TableHead className="w-10 pl-6 py-4.5">
                      <input
                        type="checkbox"
                        className="rounded border-white/20 bg-background/40 accent-primary h-4.5 w-4.5 cursor-pointer focus:ring-0 focus:ring-offset-0"
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
                      label="Server World"
                      sortKey="server"
                      activeSortKey={sortKey}
                      sortDir={sortDir}
                      onToggle={toggleSort}
                    />
                    <SortableHead
                      label="Last Active"
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
                    <TableHead className="py-4.5 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground font-heading">Group Tag</TableHead>
                    <TableHead className="py-4.5 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground font-heading">Rust+ Alerts</TableHead>
                    <TableHead className="py-4.5 pr-6"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.length === 0 && !loading ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-60 text-center text-muted-foreground">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="rounded-2xl bg-white/5 p-4 border border-white/5 mb-2">
                            <Users size={36} className="opacity-20 text-primary" />
                          </div>
                          <p className="font-heading font-semibold text-lg text-foreground/80">No monitored players found</p>
                          <p className="text-sm text-muted-foreground max-w-xs">Verify your search criteria or register a new target player on the top right.</p>
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
                              className="bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer border-b border-white/5 transition-colors"
                              onClick={() => toggleGroupExpand(group.id)}
                            >
                              <TableCell colSpan={9} className="py-3 px-6">
                                <div className="flex items-center gap-3 font-bold text-xs uppercase tracking-wider font-heading">
                                  <ChevronDown className={`h-4.5 w-4.5 text-muted-foreground/60 transition-transform duration-300 ${isExpanded ? '' : '-rotate-90'}`} />
                                  <div className="w-3 h-3 rounded-full border border-white/10 shadow-sm shrink-0" style={{ backgroundColor: group.color || '#ccc' }} />
                                  <span className="text-foreground">{group.name}</span>
                                  <Badge variant="secondary" className="ml-2 font-mono font-bold text-[9px] bg-white/5 text-muted-foreground/80 rounded-md py-0.5 px-2 border-none">{groupPlayers.length}</Badge>
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
                            className="bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer border-b border-white/5 transition-colors"
                            onClick={() => toggleGroupExpand("ungrouped")}
                          >
                            <TableCell colSpan={9} className="py-3 px-6">
                              <div className="flex items-center gap-3 font-bold text-xs uppercase tracking-wider text-muted-foreground/80 font-heading">
                                <ChevronDown className={`h-4.5 w-4.5 text-muted-foreground/40 transition-transform duration-300 ${expandedGroups["ungrouped"] !== false ? '' : '-rotate-90'}`} />
                                <span className="font-heading">Ungrouped Database Cohort</span>
                                <Badge variant="secondary" className="ml-2 font-mono font-bold text-[9px] bg-white/5 text-muted-foreground/60 rounded-md py-0.5 px-2 border-none">{groupedPlayers.get("ungrouped")?.length}</Badge>
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
            <div className="grid gap-4 p-5 md:hidden">
              {selectedPlayerIds.size > 0 && (
                <div className="fixed bottom-20 left-4 right-4 z-50 bg-destructive p-4 rounded-2xl shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom-8">
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-bold">{selectedPlayerIds.size} Selected</span>
                    <span className="text-white/70 text-[9px] uppercase tracking-widest font-extrabold">Profiles</span>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-10 px-5 rounded-xl font-bold uppercase text-[10px] tracking-wider shadow-lg cursor-pointer"
                    onClick={handleBatchDelete}
                    disabled={isBatchDeleting}
                  >
                    {isBatchDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
                    Confirm Delete
                  </Button>
                </div>
              )}
              {players.length === 0 && !loading ? (
                <div className="h-48 flex flex-col items-center justify-center text-muted-foreground border border-dashed border-white/5 rounded-2xl gap-3 bg-white/[0.01]">
                  <Users size={32} className="opacity-20 text-primary" />
                  <p className="font-heading font-medium text-sm">No monitored players found</p>
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
                          className="flex items-center gap-3 font-bold text-xs uppercase tracking-wider bg-white/[0.02] p-4 rounded-xl border border-white/5 cursor-pointer active:bg-white/[0.04] transition-all font-heading"
                          onClick={() => toggleGroupExpand(group.id)}
                        >
                          <ChevronDown className={`h-4.5 w-4.5 transition-transform duration-300 ${isExpanded ? '' : '-rotate-90'}`} />
                          <div className="w-3 h-3 rounded-full shrink-0 border border-white/10 shadow-sm" style={{ backgroundColor: group.color || '#ccc' }} />
                          <span className="truncate">{group.name}</span>
                          <Badge variant="secondary" className="ml-auto font-mono font-bold text-[9px] bg-white/5 text-muted-foreground/80 rounded-md py-0.5 px-2 border-none">{groupPlayers.length}</Badge>
                        </div>
                        {isExpanded && <div className="grid gap-3">{groupPlayers.map(renderPlayerCard)}</div>}
                      </div>
                    );
                  })}

                  {(groupedPlayers.get("ungrouped")?.length ?? 0) > 0 && (
                    <div className="space-y-3">
                      <div
                        className="flex items-center gap-3 font-bold text-xs uppercase tracking-wider text-muted-foreground bg-white/[0.02] p-4 rounded-xl border border-white/5 cursor-pointer active:bg-white/[0.04] transition-all font-heading"
                        onClick={() => toggleGroupExpand("ungrouped")}
                      >
                        <ChevronDown className={`h-4.5 w-4.5 transition-transform duration-300 ${expandedGroups["ungrouped"] !== false ? '' : '-rotate-90'}`} />
                        <span className="truncate">Ungrouped database cohort</span>
                        <Badge variant="secondary" className="ml-auto font-mono font-bold text-[9px] bg-white/5 text-muted-foreground/60 rounded-md py-0.5 px-2 border-none">{groupedPlayers.get("ungrouped")?.length}</Badge>
                      </div>
                      {expandedGroups["ungrouped"] !== false && <div className="grid gap-3">{groupedPlayers.get("ungrouped")?.map(renderPlayerCard)}</div>}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Table Footer / Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t border-white/5 gap-4 bg-white/[0.01]">
            <p className="text-xs text-muted-foreground font-medium font-heading">
              Showing <span className="text-foreground font-bold">{players.length}</span> of <span className="text-foreground font-bold">{total.toLocaleString()}</span> monitored target profiles
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl px-5 h-9 border-white/5 hover:bg-white/5 text-xs font-bold font-heading inline-flex items-center gap-1 transition-all cursor-pointer"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl px-5 h-9 border-white/5 hover:bg-white/5 text-xs font-bold font-heading inline-flex items-center gap-1 transition-all cursor-pointer"
                onClick={() => setPage((p) => p + 1)}
                disabled={players.length < 50}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sleek Delete Confirmation Popup */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-md bg-zinc-950 border-white/5 text-zinc-100 shadow-2xl rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-heading">{confirmTitle}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {confirmDescription}
            </p>
            <div className="flex gap-3 pt-3 border-t border-white/5">
              <Button
                variant="destructive"
                className="flex-1 h-10 text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg cursor-pointer animate-in fade-in"
                onClick={() => {
                  if (confirmAction) confirmAction();
                  setConfirmOpen(false);
                }}
              >
                Confirm Delete
              </Button>
              <Button
                variant="outline"
                className="h-10 text-xs font-bold uppercase tracking-widest rounded-xl border-white/5 hover:bg-white/5 text-zinc-400 hover:text-zinc-200 cursor-pointer"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
