"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Server as ServerIcon, Plus, Loader2, Clock, ArrowUpDown, ArrowUp, ArrowDown, Search, Terminal, Wifi, WifiOff, CheckCircle2, AlertCircle, HelpCircle, Activity, Cpu, Settings } from "lucide-react";
import { PairingGuide } from "@/components/rustplus/pairing-guide";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Server {
  id: string;
  name: string;
  createdAt: string;
  _count: { players: number; sessions: number };
  rustPlusIp: string | null;
  rustPlusPort: number | null;
  rustPlusPlayerId: string | null;
  rustPlusPlayerToken: string | null;
}

interface PairingStatus {
  startedAt: number;
  expiresAt: number;
  status: "starting" | "listening" | "completed" | "expired" | "error";
  message: string;
  logs?: Array<{ timestamp: number; level: "info" | "warn" | "error" | "success"; message: string }>;
  lastPairing: {
    id: string;
    name?: string;
    ip: string;
    port: string | number;
  } | null;
}

interface FcmInfo {
  hasSavedCredentials?: boolean;
  steamId: string | null;
  expiresAt: string | null;
}

interface LivePlayer {
  id: string;
  name: string;
  sessionStart: string | null;
  isTracked: boolean;
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
  const [configServer, setConfigServer] = useState<Server | null>(null);
  const [rustPlusIp, setRustPlusIp] = useState("");
  const [rustPlusPort, setRustPlusPort] = useState("");
  const [rustPlusPlayerId, setRustPlusPlayerId] = useState("");
  const [rustPlusPlayerToken, setRustPlusPlayerToken] = useState("");
  const [savingRustPlus, setSavingRustPlus] = useState(false);
  const [pairingStatus, setPairingStatus] = useState<PairingStatus | null>(null);
  const [startingPairing, setStartingPairing] = useState(false);
  const [manualAuthToken, setManualAuthToken] = useState("");
  const [credentialsCommand, setCredentialsCommand] = useState("");
  const [fcmCredentialsJson, setFcmCredentialsJson] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [showManualConfig, setShowManualConfig] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [fcmInfo, setFcmInfo] = useState<FcmInfo | null>(null);

  // Filter & sort state
  const [search, setSearch] = useState("");

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

  async function startPairingListener(authToken: string) {
    setStartingPairing(true);
    try {
      const { data } = await axios.post<{ status: PairingStatus | null }>(
        "/api/rustplus/pairing",
        {
          authToken,
          listenMs: 120000,
        }
      );
      setPairingStatus(data.status);
      toast.success("Rust+ listener started. Pair your server in-game now.");
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.error || "Failed to start Rust+ listener"
          : "Failed to start Rust+ listener"
      );
    } finally {
      setStartingPairing(false);
    }
  }

  async function startPairingListenerWithCredentials(command: string) {
    setStartingPairing(true);
    try {
      const { data } = await axios.post<{ status: PairingStatus | null }>(
        "/api/rustplus/pairing",
        {
          credentialsCommand: command,
          listenMs: 120000,
        }
      );
      setPairingStatus(data.status);
      toast.success("FCM listener started. Pair your server in-game now.");
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.error || "Failed to start FCM listener"
          : "Failed to start FCM listener"
      );
    } finally {
      setStartingPairing(false);
    }
  }

  async function startPairingListenerWithJson(jsonStr: string) {
    setStartingPairing(true);
    try {
      let fcmCredentials;
      try {
        fcmCredentials = JSON.parse(jsonStr);
      } catch {
        throw new Error("Invalid JSON format. Please paste the exact JSON from the guide.");
      }

      const { data } = await axios.post<{ status: PairingStatus | null }>(
        "/api/rustplus/pairing",
        {
          fcmCredentials,
          listenMs: 120000,
        }
      );
      setPairingStatus(data.status);
      toast.success("FCM listener started using provided JSON credentials.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to start FCM listener"
      );
    } finally {
      setStartingPairing(false);
    }
  }

  async function startPairingWithSavedCredentials() {
    setStartingPairing(true);
    try {
      const { data } = await axios.post<{ status: PairingStatus | null }>(
        "/api/rustplus/pairing",
        {
          listenMs: 120000,
        }
      );
      setPairingStatus(data.status);
      toast.success("FCM listener started using saved credentials.");
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.error || "Failed to start FCM listener"
          : "Failed to start FCM listener"
      );
    } finally {
      setStartingPairing(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchServers();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadPairingStatus = async () => {
      try {
        const { data } = await axios.get<{ status: PairingStatus | null; fcm: FcmInfo | null }>(
          "/api/rustplus/pairing"
        );
        setPairingStatus(data.status);
        setFcmInfo(data.fcm);

        // If credentials are valid, collapse manual config by default
        if (showManualConfig === null && data.fcm?.hasSavedCredentials) {
          const isExpired = data.fcm.expiresAt && new Date(data.fcm.expiresAt) < new Date();
          setShowManualConfig(isExpired ? true : false);
        }
      } catch {
        // ignore initial status load errors
      }
    };

    void loadPairingStatus();
  }, [showManualConfig]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    const isActive = pairingStatus?.status === "starting" || pairingStatus?.status === "listening";

    if (isActive && pairingStatus?.expiresAt) {
      const update = () => {
        const remaining = Math.max(0, pairingStatus.expiresAt! - Date.now());
        setTimeLeft(remaining);
      };
      update();
      timer = setInterval(update, 1000);
    } else {
      setTimeLeft(null);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [pairingStatus?.status, pairingStatus?.expiresAt]);

  useEffect(() => {
    const token = window.sessionStorage.getItem("rustplus_auth_token");
    if (!token) return;
    window.sessionStorage.removeItem("rustplus_auth_token");
    setManualAuthToken(token);
    void startPairingListener(token);
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

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    const isActive =
      pairingStatus?.status === "starting" || pairingStatus?.status === "listening";

    if (isActive) {
      timer = setInterval(async () => {
        try {
          const { data } = await axios.get<{ status: PairingStatus | null; fcm: FcmInfo | null }>(
            "/api/rustplus/pairing"
          );
          setPairingStatus(data.status);
          if (data.fcm) setFcmInfo(data.fcm);
          if (data.status?.status === "completed") {
            await fetchServers();
            toast.success("Rust+ pairing received and server credentials saved.");
          }
        } catch {
          // best effort polling
        }
      }, 3000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [pairingStatus?.status]);

  useEffect(() => {
    if (pairingStatus?.logs?.length) {
      const el = document.getElementById("fcm-console-end");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [pairingStatus?.logs]);

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
      setLivePlayers(prev => prev.map(p => p.id === playerId ? { ...p, isTracked: true } : p));
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

  const handleDelete = (id: string) => {
    triggerConfirm(
      "Delete Tracked Server?",
      "Are you sure you want to delete this server? All related players and sessions will be permanently deleted.",
      async () => {
        try {
          await axios.delete(`/api/servers/${id}`);
          toast.success("Server deleted");
          fetchServers();
        } catch {
          toast.error("Failed to delete server");
        }
      }
    );
  };

  const openRustPlusConfig = (server: Server) => {
    setConfigServer(server);
    setRustPlusIp(server.rustPlusIp ?? "");
    setRustPlusPort(server.rustPlusPort ? String(server.rustPlusPort) : "");
    setRustPlusPlayerId(server.rustPlusPlayerId ?? "");
    setRustPlusPlayerToken(server.rustPlusPlayerToken ?? "");
  };

  const handleSaveRustPlus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!configServer) return;

    setSavingRustPlus(true);
    try {
      const normalizedIp = rustPlusIp.trim();
      const normalizedPort = rustPlusPort.trim();
      const normalizedPlayerId = rustPlusPlayerId.trim();
      const normalizedPlayerToken = rustPlusPlayerToken.trim();

      const shouldClearAll =
        !normalizedIp && !normalizedPort && !normalizedPlayerId && !normalizedPlayerToken;

      await axios.patch(`/api/servers/${configServer.id}`, {
        rustPlusIp: shouldClearAll ? null : normalizedIp,
        rustPlusPort: shouldClearAll ? null : Number(normalizedPort),
        rustPlusPlayerId: shouldClearAll ? null : normalizedPlayerId,
        rustPlusPlayerToken: shouldClearAll ? null : normalizedPlayerToken,
      });

      toast.success("Rust+ settings saved");
      setConfigServer(null);
      await fetchServers();
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.error || "Failed to save Rust+ settings"
          : "Failed to save Rust+ settings"
      );
    } finally {
      setSavingRustPlus(false);
    }
  };

  const handleConnectRustPlus = () => {
    const callbackUrl = `${window.location.origin}/rustplus/connect/callback`;
    const rustAppUrl = `https://companion-rust.facepunch.com/app?returnUrl=${encodeURIComponent(
      callbackUrl
    )}`;
    window.location.href = rustAppUrl;
  };

  const handleStopPairing = async () => {
    try {
      await axios.delete("/api/rustplus/pairing");
      setPairingStatus(null);
      toast.success("Rust+ pairing listener stopped.");
    } catch {
      toast.error("Failed to stop Rust+ pairing listener");
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
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-2 font-heading">
            Servers
          </h1>
          <p className="text-sm font-semibold text-muted-foreground opacity-80 leading-relaxed">
            Manage your tracked Rust server worlds and pairings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          {/* Add Server */}
          <Card className="glass-card border-none shadow-none overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl font-bold font-heading">
                <div className="rounded-xl bg-primary/10 p-2.5 border border-primary/10">
                  <Plus size={20} className="text-primary" />
                </div>
                Add Server
              </CardTitle>
              <CardDescription className="text-xs font-semibold text-muted-foreground opacity-80 mt-1">
                Enter the BattleMetrics Server ID to begin tracking.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">BattleMetrics Server ID</label>
                  <Input
                    placeholder="e.g. 12948294"
                    className="rounded-xl h-11 bg-background/40 border-white/10 focus:bg-background/60 focus:border-primary/55 font-mono text-xs font-bold transition-all"
                    value={newId}
                    onChange={(e) => setNewId(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full rounded-xl h-11 text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-primary/10" disabled={adding || !newId}>
                  {adding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ServerIcon className="mr-2 h-4 w-4" />}
                  Add Server
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Rust+ Setup */}
          <Card className="glass-card border-none shadow-none overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold font-heading">Rust+ Setup</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-lg h-8 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/10 transition-colors"
                  onClick={() => setShowGuide(!showGuide)}
                >
                  <HelpCircle className="w-4 h-4 mr-1.5" /> 
                  {showGuide ? "Hide" : "Guide"}
                </Button>
              </div>
              <CardDescription className="text-xs font-semibold text-muted-foreground opacity-80 mt-1">
                Configure FCM for server notifications.
              </CardDescription>
              {showGuide && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <PairingGuide />
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {fcmInfo?.expiresAt && (
                <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                  new Date(fcmInfo.expiresAt) < new Date() 
                    ? "bg-destructive/10 border-destructive/20 text-destructive" 
                    : "bg-green-500/10 border-green-500/20 text-green-400"
                }`}>
                  <Clock size={16} />
                  <div className="flex-1">
                    <p className="text-[9px] uppercase font-bold tracking-widest opacity-80 mb-0.5">Credential Status</p>
                    <p className="text-xs font-bold font-mono">
                      {new Date(fcmInfo.expiresAt) < new Date() 
                        ? "FCM Token Expired" 
                        : `Valid until ${new Date(fcmInfo.expiresAt).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl border-white/10 bg-zinc-950/20 hover:bg-white/5 h-10 text-[10px] font-extrabold uppercase tracking-widest"
                  onClick={() => setShowManualConfig(!showManualConfig)}
                >
                  {showManualConfig ? "Close Configuration" : "Manual Configuration"}
                </Button>
                
                {showManualConfig && (
                  <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="space-y-2">
                      <p className="text-[9px] uppercase tracking-widest text-muted-foreground/60 font-bold">Command String</p>
                      <Input
                        className="rounded-xl border-white/10 bg-background/40 h-10 text-xs font-mono"
                        placeholder="/credentials add gcm_android_id:..."
                        value={credentialsCommand}
                        onChange={(e) => setCredentialsCommand(e.target.value)}
                      />
                      <Button 
                        className="w-full rounded-xl text-xs font-bold uppercase tracking-widest h-9"
                        variant="secondary"
                        size="sm"
                        disabled={startingPairing || !credentialsCommand.trim()}
                        onClick={() => void startPairingListenerWithCredentials(credentialsCommand.trim())}
                      >
                        Start with Command
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[9px] uppercase tracking-widest text-muted-foreground/60 font-bold">Credentials JSON</p>
                      <textarea
                        className="w-full min-h-[100px] rounded-xl border border-white/10 bg-background/45 px-3 py-2 text-xs font-mono ring-offset-background placeholder:text-muted-foreground/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:opacity-50"
                        placeholder='{ "gcm": { ... } }'
                        value={fcmCredentialsJson}
                        onChange={(e) => setFcmCredentialsJson(e.target.value)}
                      />
                      <Button 
                        className="w-full rounded-xl text-xs font-bold uppercase tracking-widest h-9"
                        variant="secondary"
                        size="sm"
                        disabled={startingPairing || !fcmCredentialsJson.trim()}
                        onClick={() => void startPairingListenerWithJson(fcmCredentialsJson.trim())}
                      >
                        Start with JSON
                      </Button>
                    </div>
                  </div>
                )}

                {timeLeft !== null && (
                  <div className="flex justify-center py-2 animate-in fade-in zoom-in-95 duration-300">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary shadow-[0_0_15px_rgba(240,110,50,0.15)]">
                      <div className="relative h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <span className="font-mono font-black text-xl tracking-tighter">
                        {Math.floor(timeLeft / 60000)}:{(Math.floor(timeLeft / 1000) % 60).toString().padStart(2, '0')}
                      </span>
                      <span className="text-[9px] uppercase font-bold tracking-widest opacity-70">Active</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {fcmInfo?.hasSavedCredentials ? (
                    <Button 
                      className="w-full h-12 text-xs font-black uppercase tracking-widest rounded-xl shadow-lg transition-all active:scale-[0.98]"
                      onClick={() => void startPairingWithSavedCredentials()}
                      disabled={startingPairing || timeLeft !== null}
                    >
                      {startingPairing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wifi className="mr-2 h-5 w-5 text-primary" />}
                      {timeLeft !== null ? "Listener Active" : "Start Pairing Listener"}
                    </Button>
                  ) : null}
                  
                  {pairingStatus && (pairingStatus.status === "starting" || pairingStatus.status === "listening") && (
                    <Button variant="destructive" className="h-12 rounded-xl shadow-lg text-xs font-black uppercase tracking-widest" onClick={handleStopPairing}>
                      <WifiOff className="mr-2 h-5 w-5" /> Stop Listener
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-2 glass-card border-none shadow-none overflow-hidden">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-xl font-bold font-heading">
              <div className="rounded-xl bg-primary/10 p-2.5 border border-primary/10">
                <ServerIcon size={20} className="text-primary" />
              </div>
              Tracked Servers
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-20 flex justify-center text-muted-foreground">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : servers.length === 0 ? (
              <div className="py-24 text-center text-muted-foreground border border-dashed border-white/5 rounded-2xl bg-zinc-950/20">
                <ServerIcon className="mx-auto h-16 w-16 opacity-15 mb-6 text-primary" />
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">No servers tracked yet.</p>
                <p className="text-xs text-muted-foreground opacity-60 mt-1">Add your first BattleMetrics server on the left.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {servers.map((server) => {
                  const hasSync = !!server.rustPlusIp;
                  return (
                    <div
                      key={server.id}
                      className={cn(
                        "glass-card rounded-2xl p-5 border border-white/5 transition-all duration-300 bg-white/[0.01]",
                        "flex flex-col lg:flex-row lg:items-center justify-between gap-6",
                        "hover:border-primary/25 hover:shadow-[0_12px_40px_rgba(240,110,50,0.05)] hover:bg-white/[0.02]"
                      )}
                    >
                      {/* Left Side: Server avatar and description */}
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className={cn(
                            "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500",
                            hasSync
                              ? "bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.05)] text-green-400"
                              : "bg-gradient-to-br from-primary/10 to-orange-500/5 border-primary/10 shadow-[0_0_20px_rgba(240,110,50,0.05)] text-primary"
                          )}
                        >
                          <ServerIcon size={24} className="hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="space-y-1.5 min-w-0">
                          <h3 className="font-extrabold text-base md:text-lg text-foreground tracking-wide leading-snug truncate font-heading">
                            {server.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[9px] text-muted-foreground/60 tracking-tighter uppercase font-bold px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                              ID: {server.id}
                            </span>
                            {hasSync ? (
                              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                                <span className="pulse-dot" />
                                <span className="text-[9px] font-black uppercase text-green-400 tracking-wider">Sync Ready</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                                <span className="text-[9px] font-black uppercase text-muted-foreground/60 tracking-wider">Unsynced</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Middle Side: Telemetry Details */}
                      <div className="grid grid-cols-2 sm:flex sm:items-center gap-6 sm:gap-12 shrink-0">
                        {/* Live Demographics Metric */}
                        <div className="space-y-1">
                          <p className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground/50 font-heading">live cohort</p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-black font-heading text-primary leading-none">
                              {server._count.players.toLocaleString()}
                            </span>
                            <span className="text-[9px] uppercase font-black tracking-widest text-muted-foreground/60 font-heading">players</span>
                          </div>
                        </div>

                        {/* Telemetry Status info */}
                        <div className="space-y-1">
                          <p className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground/50 font-heading">telemetry status</p>
                          {hasSync ? (
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-foreground leading-none font-mono">
                                {server.rustPlusIp}:{server.rustPlusPort}
                              </span>
                              <span className="text-[9px] text-green-500 font-bold uppercase tracking-wider mt-1 font-heading">Live Sync Stream</span>
                            </div>
                          ) : (
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-muted-foreground/50 leading-none">
                                Not Configured
                              </span>
                              <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider mt-1 font-heading">IoT Offline</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Side: Visual Actions Deck */}
                      <div className="flex flex-wrap items-center gap-2 mt-4 lg:mt-0 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl h-9 px-4 text-xs font-bold border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/20 text-foreground transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                          onClick={() => handleViewLive(server)}
                        >
                          <Activity size={13} className="text-primary" />
                          Live
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl h-9 px-4 text-xs font-bold border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/20 text-foreground transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                          onClick={() => openRustPlusConfig(server)}
                        >
                          <Settings size={13} className="text-muted-foreground/80" />
                          Config
                        </Button>
                        <Link
                          href={`/servers/${server.id}`}
                          className={cn(
                            buttonVariants({ variant: "outline", size: "sm" }),
                            "rounded-xl h-9 px-4 text-xs font-bold border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/20 text-foreground transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer",
                            hasSync && "border-primary/10 bg-primary/5 hover:bg-primary/10 hover:border-primary/20"
                          )}
                        >
                          <Cpu size={13} className={cn("text-muted-foreground/70", hasSync && "text-primary animate-pulse")} />
                          IoT
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(server.id)}
                          className="rounded-xl h-9 w-9 text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* MODALS & DIALOGS */}
      {/* Live Players Modal */}
      {liveModalServer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setLiveModalServer(null)}
        >
          <div
            className="bg-zinc-950 border border-white/5 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between shrink-0 bg-zinc-900/10">
              <div>
                <h3 className="font-extrabold text-lg font-heading text-foreground">{liveModalServer.name}</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
                  {liveLoading ? "Initializing scan..." : `${livePlayers.length} online • ${displayedPlayers.length} filtered`}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="rounded-lg text-xs font-bold uppercase tracking-widest h-8" onClick={() => setLiveModalServer(null)}>
                Close
              </Button>
            </div>

            {/* Search & Sort Toolbar */}
            {!liveLoading && livePlayers.length > 0 && (
              <div className="p-3 border-b border-white/5 flex flex-wrap items-center gap-3 shrink-0 bg-zinc-950/40">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                  <Input
                    className="pl-9 h-9 text-xs rounded-xl bg-background/40 border-white/10 focus:border-primary/55 font-semibold"
                    placeholder="Filter online players…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={sortKey === "playtime" ? "secondary" : "ghost"}
                    className="h-9 gap-1.5 text-[10px] font-bold uppercase tracking-wider rounded-xl border border-white/5 bg-zinc-950/10 hover:bg-zinc-950/30"
                    onClick={() => toggleSort("playtime")}
                  >
                    <Clock className="w-3.5 h-3.5 text-primary" /> Playtime {renderSortIcon("playtime")}
                  </Button>
                  <Button
                    size="sm"
                    variant={sortKey === "alpha" ? "secondary" : "ghost"}
                    className="h-9 gap-1.5 text-[10px] font-bold uppercase tracking-wider rounded-xl border border-white/5 bg-zinc-950/10 hover:bg-zinc-950/30"
                    onClick={() => toggleSort("alpha")}
                  >
                    A-Z {renderSortIcon("alpha")}
                  </Button>
                </div>
              </div>
            )}

            {/* Live Player List container */}
            <div className="p-5 overflow-y-auto flex-1 bg-zinc-950/20">
              {liveLoading ? (
                <div className="py-16 flex justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>
              ) : displayedPlayers.length === 0 ? (
                <div className="text-center py-12">
                  <WifiOff className="mx-auto h-12 w-12 opacity-10 mb-4 text-primary" />
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 italic">
                    {livePlayers.length === 0 ? "No active players currently online." : "No players match filter parameters."}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {displayedPlayers.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-zinc-950/35 hover:bg-zinc-950/65 transition-colors">
                      <div className="flex-1 min-w-0 mr-3 space-y-1">
                        <p className="font-bold text-sm text-foreground/90 font-heading tracking-wide flex flex-wrap items-center gap-2">
                          {p.name}
                          {p.sessionStart && (
                            <span className="text-[10px] text-primary bg-primary/5 border border-primary/10 rounded-md font-mono font-extrabold px-1.5 py-0.5 flex items-center shrink-0">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatDuration(currentTime - new Date(p.sessionStart).getTime())}
                            </span>
                          )}
                        </p>
                        <p className="text-[10px] text-muted-foreground/50 font-mono tracking-tighter truncate font-semibold uppercase">ID: {p.id}</p>
                      </div>
                      <Button
                        size="sm"
                        variant={p.isTracked ? "ghost" : "secondary"}
                        className="rounded-xl text-[10px] font-bold uppercase tracking-widest h-8"
                        disabled={addingPlayerId === p.id || p.isTracked}
                        onClick={() => handleTrackPlayer(p.id, p.name, liveModalServer.id, p.sessionStart ?? undefined)}
                      >
                        {addingPlayerId === p.id ? (
                          <Loader2 className="h-4.5 w-4.5 animate-spin" />
                        ) : p.isTracked ? (
                          "Tracked"
                        ) : (
                          "Track Profile"
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chat Config settings Modal */}
      {configServer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setConfigServer(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-white/5 bg-zinc-950 p-6 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold font-heading text-foreground">Rust+ Chat Settings</h3>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground mt-1 leading-relaxed">
              {configServer.name} <span className="text-primary font-mono ml-2">ID: {configServer.id}</span>
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSaveRustPlus}>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Server IP Address</label>
                <Input
                  className="rounded-xl h-10 bg-background/40 border-white/10 focus:border-primary/55 font-mono text-xs font-bold"
                  value={rustPlusIp}
                  onChange={(e) => setRustPlusIp(e.target.value)}
                  placeholder="e.g. 192.168.1.1"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">App Companion Port (app.port)</label>
                <Input
                  className="rounded-xl h-10 bg-background/40 border-white/10 focus:border-primary/55 font-mono text-xs font-bold"
                  value={rustPlusPort}
                  onChange={(e) => setRustPlusPort(e.target.value)}
                  placeholder="e.g. 28082"
                  inputMode="numeric"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Player Steam ID</label>
                <Input
                  className="rounded-xl h-10 bg-background/40 border-white/10 focus:border-primary/55 font-mono text-xs font-bold"
                  value={rustPlusPlayerId}
                  onChange={(e) => setRustPlusPlayerId(e.target.value)}
                  placeholder="Your Steam Profile ID"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Player Token</label>
                <Input
                  className="rounded-xl h-10 bg-background/40 border-white/10 focus:border-primary/55 font-mono text-xs font-bold"
                  value={rustPlusPlayerToken}
                  onChange={(e) => setRustPlusPlayerToken(e.target.value)}
                  placeholder="Rust+ connection pairing token"
                />
              </div>

              <p className="text-[10px] text-muted-foreground/50 leading-relaxed font-semibold italic mt-2">
                Leave all fields blank and click save to disable companion notifications for this indexing target.
              </p>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/5 mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-xl h-10 text-xs font-bold uppercase tracking-widest"
                  onClick={() => setConfigServer(null)}
                  disabled={savingRustPlus}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl h-10 text-xs font-extrabold uppercase tracking-widest px-6"
                  disabled={
                    savingRustPlus ||
                    ((rustPlusIp.trim() === "" ||
                      rustPlusPort.trim() === "" ||
                      rustPlusPlayerId.trim() === "" ||
                      rustPlusPlayerToken.trim() === "") &&
                      (rustPlusIp.trim() !== "" ||
                        rustPlusPort.trim() !== "" ||
                        rustPlusPlayerId.trim() !== "" ||
                        rustPlusPlayerToken.trim() !== ""))
                  }
                >
                  {savingRustPlus && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Settings
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

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



