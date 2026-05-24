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
import { Trash2, Server as ServerIcon, Plus, Loader2, Clock, ArrowUpDown, ArrowUp, ArrowDown, Search, Terminal, Wifi, WifiOff, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import { PairingGuide } from "@/components/rustplus/pairing-guide";

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
    <div className="max-w-7xl mx-auto space-y-10 pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-2">Servers</h1>
          <p className="text-lg text-muted-foreground">Manage your tracked Rust servers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card className="glass-card border-none shadow-none overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <Plus size={20} className="text-primary" />
                </div>
                Add Server
              </CardTitle>
              <CardDescription className="text-sm font-medium opacity-70">
                Enter the BattleMetrics Server ID to begin tracking.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-6">
                <div className="space-y-2.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">BattleMetrics ID</label>
                  <Input
                    placeholder="e.g. 12345678"
                    className="rounded-xl h-11 bg-background/40 border-border/40 focus:bg-background/60 transition-all"
                    value={newId}
                    onChange={(e) => setNewId(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full rounded-xl h-11 shadow-lg" disabled={adding || !newId}>
                  {adding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ServerIcon className="mr-2 h-4 w-4" />}
                  Add Server
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="glass-card border-none shadow-none overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Rust+ Setup</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-lg h-8 text-primary hover:bg-primary/10 transition-colors"
                  onClick={() => setShowGuide(!showGuide)}
                >
                  <HelpCircle className="w-4 h-4 mr-1.5" /> 
                  {showGuide ? "Hide" : "Guide"}
                </Button>
              </div>
              <CardDescription className="text-sm font-medium opacity-70">
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
                    : "bg-green-500/10 border-green-500/20 text-green-500"
                }`}>
                  <Clock size={16} />
                  <div className="flex-1">
                    <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-0.5">Credential Status</p>
                    <p className="text-xs font-semibold">
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
                  className="w-full rounded-xl border-border/40 bg-white/5 hover:bg-white/10 h-10 text-xs font-bold uppercase tracking-widest"
                  onClick={() => setShowManualConfig(!showManualConfig)}
                >
                  {showManualConfig ? "Close Configuration" : "Manual Configuration"}
                </Button>
                
                {showManualConfig && (
                  <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold opacity-60">Credentials JSON</p>
                      <textarea
                        className="w-full min-h-[100px] rounded-xl border border-border/40 bg-background/40 px-3 py-2 text-xs font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:opacity-50"
                        placeholder='{ "gcm": { ... } }'
                        value={fcmCredentialsJson}
                        onChange={(e) => setFcmCredentialsJson(e.target.value)}
                      />
                      <Button 
                        className="w-full rounded-xl"
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
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                      <div className="relative h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <span className="font-mono font-bold text-lg tracking-tighter">
                        {Math.floor(timeLeft / 60000)}:{(Math.floor(timeLeft / 1000) % 60).toString().padStart(2, '0')}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Active</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {fcmInfo?.hasSavedCredentials ? (
                    <Button 
                      className="w-full h-12 text-sm font-bold rounded-xl shadow-lg transition-all active:scale-[0.98]"
                      onClick={() => void startPairingWithSavedCredentials()}
                      disabled={startingPairing || timeLeft !== null}
                    >
                      {startingPairing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wifi className="mr-2 h-5 w-5" />}
                      {timeLeft !== null ? "Listener Active" : "Start Pairing Listener"}
                    </Button>
                  ) : null}
                  
                  {pairingStatus && (pairingStatus.status === "starting" || pairingStatus.status === "listening") && (
                    <Button variant="destructive" className="h-12 rounded-xl shadow-lg" onClick={handleStopPairing}>
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
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="rounded-xl bg-primary/10 p-2.5">
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
              <div className="py-24 text-center text-muted-foreground border-2 border-dashed border-border/40 rounded-2xl bg-white/5">
                <ServerIcon className="mx-auto h-16 w-16 opacity-10 mb-6" />
                <p className="text-lg font-medium">No servers tracked yet.</p>
                <p className="text-sm opacity-60">Add your first BattleMetrics server on the left.</p>
              </div>
            ) : (
              <>
                {/* Desktop View */}
                <div className="rounded-2xl border border-white/5 overflow-hidden hidden md:block">
                  <Table>
                    <TableHeader className="bg-white/5">
                      <TableRow className="border-border/40 hover:bg-transparent">
                        <TableHead className="py-4 text-xs font-bold uppercase tracking-widest">Name</TableHead>
                        <TableHead className="py-4 text-xs font-bold uppercase tracking-widest">Players</TableHead>
                        <TableHead className="py-4 text-xs font-bold uppercase tracking-widest">Rust+</TableHead>
                        <TableHead className="py-4 text-xs font-bold uppercase tracking-widest text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {servers.map((server) => (
                        <TableRow key={server.id} className="border-border/40 hover:bg-white/5 transition-colors">
                          <TableCell className="py-5">
                            <p className="font-bold text-base leading-none">{server.name}</p>
                            <p className="text-[10px] font-mono text-muted-foreground/60 mt-1.5 tracking-tighter uppercase">{server.id}</p>
                          </TableCell>
                          <TableCell className="py-5">
                            <div className="flex items-center gap-2 font-bold text-lg">
                              {server._count.players.toLocaleString()}
                              <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">tracked</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-5">
                            {server.rustPlusIp ? (
                              <Badge variant="secondary" className="bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider border-none">Ready</Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-white/5 text-muted-foreground/40 text-[10px] font-bold uppercase tracking-wider border-none">Missing</Badge>
                            )}
                          </TableCell>
                          <TableCell className="py-5 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg h-9 border-border/40 bg-white/5 hover:bg-white/10"
                                onClick={() => handleViewLive(server)}
                              >
                                Live
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg h-9 border-border/40 bg-white/5 hover:bg-white/10"
                                onClick={() => openRustPlusConfig(server)}
                              >
                                Config
                              </Button>
                              <Link
                                href={`/servers/${server.id}`}
                                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-lg h-9 border-border/40 bg-white/5 hover:bg-white/10")}
                              >
                                IoT
                              </Link>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(server.id)}
                                className="rounded-lg h-9 w-9 text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile View */}
                <div className="grid gap-4 md:hidden">
                  {servers.map((server) => (
                    <div key={server.id} className="rounded-2xl border border-white/5 bg-white/5 p-5 space-y-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">{server.name}</h4>
                          <p className="font-mono text-xs text-muted-foreground/60 tracking-tighter uppercase mt-1">{server.id}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(server.id)}
                          className="text-destructive hover:bg-destructive/10 -mt-2 -mr-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/50 mb-1">Players</p>
                          <p className="font-bold text-lg leading-none">{server._count.players.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/50 mb-1">Rust+</p>
                          {server.rustPlusIp ? (
                            <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Active</span>
                          ) : (
                            <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">Inactive</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="secondary" size="sm" className="flex-1 rounded-xl h-10 font-bold" onClick={() => handleViewLive(server)}>Live</Button>
                        <Button variant="outline" size="sm" className="flex-1 rounded-xl h-10 font-bold border-border/40" onClick={() => openRustPlusConfig(server)}>Config</Button>
                        <Link 
                          href={`/servers/${server.id}`}
                          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1 rounded-xl h-10 font-bold border-border/40")}
                        >
                          IoT
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals & Dialogs below */}
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
                        variant={p.isTracked ? "ghost" : "secondary"}
                        disabled={addingPlayerId === p.id || p.isTracked}
                        onClick={() => handleTrackPlayer(p.id, p.name, liveModalServer.id, p.sessionStart ?? undefined)}
                      >
                        {addingPlayerId === p.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : p.isTracked ? (
                          "Tracked"
                        ) : (
                          "Track"
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

      {configServer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setConfigServer(null)}
        >
          <div
            className="w-full max-w-lg rounded-xl border bg-card p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold">Rust+ Chat Settings</h3>
            <p className="text-xs text-muted-foreground">
              {configServer.name} ({configServer.id})
            </p>

            <form className="mt-4 space-y-3" onSubmit={handleSaveRustPlus}>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Server IP / Host</label>
                <Input
                  value={rustPlusIp}
                  onChange={(e) => setRustPlusIp(e.target.value)}
                  placeholder="e.g. 127.0.0.1"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">App Port (app.port)</label>
                <Input
                  value={rustPlusPort}
                  onChange={(e) => setRustPlusPort(e.target.value)}
                  placeholder="e.g. 28082"
                  inputMode="numeric"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Player ID (Steam ID)</label>
                <Input
                  value={rustPlusPlayerId}
                  onChange={(e) => setRustPlusPlayerId(e.target.value)}
                  placeholder="Your Rust+ player ID"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Player Token</label>
                <Input
                  value={rustPlusPlayerToken}
                  onChange={(e) => setRustPlusPlayerToken(e.target.value)}
                  placeholder="Rust+ pairing token"
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Leave all fields empty and save to disable Rust+ messages for this server.
              </p>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setConfigServer(null)}
                  disabled={savingRustPlus}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
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
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
