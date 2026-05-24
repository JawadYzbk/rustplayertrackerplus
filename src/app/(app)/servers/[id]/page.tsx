"use client";

import { useEffect, useState, use, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { 
  Loader2, 
  Settings, 
  Trash2, 
  Power, 
  PowerOff, 
  Smartphone, 
  ArrowLeft,
  Terminal,
  Save,
  ChevronRight,
  Pencil,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SmartDevice {
  id: string;
  name: string;
  customCommand: string | null;
  type: string;
  icon: string | null;
  isActive: boolean;
  value: boolean;
  amount?: number;
  capacity?: number;
  createdAt: string;
}

interface Server {
  id: string;
  name: string;
  rustPlusIp: string | null;
  rustPlusPort: number | null;
}

export default function ServerShowPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: serverId } = use(params);
  const router = useRouter();
  
  const [server, setServer] = useState<Server | null>(null);
  const [devices, setDevices] = useState<SmartDevice[]>([]);
  const [cmdPrefix, setCmdPrefix] = useState("!");
  const [loading, setLoading] = useState(true);
  const [editingDeviceId, setEditingDeviceId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", customCommand: "", icon: "" });
  const [saving, setSaving] = useState(false);
  const [controllingId, setControllingId] = useState<string | null>(null);

  // Dedicated Icon Selection Dialog State
  const [iconDialogOpen, setIconDialogOpen] = useState(false);
  const [selectingIconDeviceId, setSelectingIconDeviceId] = useState<string | null>(null);
  const [allItems, setAllItems] = useState<{ id: string, name: string, category: string }[]>([]);
  const [iconSearchQuery, setIconSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    axios.get("/items.json")
      .then(res => setAllItems(res.data))
      .catch(() => {});
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    allItems.forEach(item => cats.add(item.category));
    return ["All", ...Array.from(cats)];
  }, [allItems]);

  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(iconSearchQuery.toLowerCase()) ||
                            item.id.toLowerCase().includes(iconSearchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allItems, iconSearchQuery, selectedCategory]);

  const displayedItems = useMemo(() => {
    if (!iconSearchQuery.trim() && selectedCategory === "All") {
      return filteredItems.slice(0, 15);
    }
    return filteredItems;
  }, [filteredItems, iconSearchQuery, selectedCategory]);

  async function handleUpdateDeviceIcon(deviceId: string, iconName: string | null) {
    try {
      const updated = await axios.patch<SmartDevice>(`/api/servers/${serverId}/devices/${deviceId}`, {
        icon: iconName
      });
      setDevices(devices.map(d => d.id === deviceId ? updated.data : d));
      if (editingDeviceId === deviceId) {
        setEditForm(prev => ({ ...prev, icon: iconName || "" }));
      }
      toast.success("Device icon updated");
      setIconDialogOpen(false);
    } catch {
      toast.error("Failed to update device icon");
    }
  }

  async function fetchData() {
    setLoading(true);
    
    // Fetch user settings for command prefix
    try {
      const userRes = await axios.get("/api/user/settings");
      setCmdPrefix(userRes.data.commandPrefix || "!");
    } catch {
      // fallback to !
    }

    try {
      const serverRes = await axios.get<Server>(`/api/servers/${serverId}`);
      setServer(serverRes.data);
    } catch {
      toast.error("Server not found");
      setLoading(false);
      return;
    }

    try {
      const devicesRes = await axios.get<SmartDevice[]>(`/api/servers/${serverId}/devices`);
      setDevices(devicesRes.data);
    } catch {
      toast.error("Failed to load devices");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 0);
    return () => clearTimeout(timer);
  }, [serverId]);

  async function handleControlDevice(id: string, state: boolean) {
    setControllingId(id);
    try {
      await axios.post(`/api/servers/${serverId}/devices/${id}`, { state });
      setDevices(prev => prev.map(d => d.id === id ? { ...d, value: state } : d));
      toast.success(`Device turned ${state ? "on" : "off"}`);
    } catch (error) {
      toast.error(axios.isAxiosError(error) ? error.response?.data?.error || "Failed to control device" : "Failed to control device");
    } finally {
      setControllingId(null);
    }
  }

  async function handleDeleteDevice(id: string) {
    if (!confirm("Are you sure you want to remove this device?")) return;
    
    try {
      await axios.delete(`/api/servers/${serverId}/devices/${id}`);
      setDevices(devices.filter(d => d.id !== id));
      toast.success("Device removed");
    } catch (error) {
      toast.error("Failed to remove device");
    }
  }

  async function handleToggleDevice(device: SmartDevice) {
    try {
      const updated = await axios.patch<SmartDevice>(`/api/servers/${serverId}/devices/${device.id}`, {
        isActive: !device.isActive
      });
      setDevices(devices.map(d => d.id === device.id ? updated.data : d));
    } catch (error) {
      toast.error("Failed to toggle device");
    }
  }

  function startEditing(device: SmartDevice) {
    setEditingDeviceId(device.id);
    setEditForm({ 
      name: device.name, 
      customCommand: device.customCommand || "",
      icon: device.icon || ""
    });
  }

  async function handleSaveEdit() {
    if (!editingDeviceId) return;
    setSaving(true);
    try {
      const updated = await axios.patch<SmartDevice>(`/api/servers/${serverId}/devices/${editingDeviceId}`, {
        name: editForm.name,
        customCommand: editForm.customCommand || null,
        icon: editForm.icon || null
      });
      setDevices(devices.map(d => d.id === editingDeviceId ? updated.data : d));
      setEditingDeviceId(null);
      toast.success("Device updated");
    } catch (error) {
      toast.error("Failed to update device");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!server) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Server not found.</p>
        <Button variant="link" onClick={() => router.push("/servers")}>Back to Servers</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10 pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push("/servers")} className="h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{server.name}</h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground ml-14">
            <Badge variant="outline" className="font-mono text-[10px] rounded-md border-border/40 uppercase tracking-widest">{server.id}</Badge>
            {server.rustPlusIp && (
              <span className="flex items-center gap-2 font-medium opacity-60 italic">
                <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                {server.rustPlusIp}:{server.rustPlusPort}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="lg" onClick={() => router.push(`/servers`)} className="rounded-xl border-border/40 hover:bg-white/5 shadow-lg">
            <Settings className="mr-2 h-5 w-5" /> Configure Rust+
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <Card className="glass-card border-none shadow-none overflow-hidden">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-2.5">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  Smart Devices
                </CardTitle>
                <Badge variant="secondary" className="bg-white/5 rounded-md font-bold uppercase tracking-widest text-[10px] border-none">{devices.length} Devices</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {devices.length === 0 ? (
                <div className="text-center py-24 border-2 border-dashed border-border/40 rounded-2xl bg-white/5">
                  <Smartphone className="w-16 h-16 text-muted-foreground/10 mx-auto mb-6" />
                  <p className="text-lg font-bold">No smart devices paired yet.</p>
                  <p className="text-sm text-muted-foreground/60 mt-2">Use the pairing listener on the Servers page to add devices.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {devices.map((device) => (
                    <Card key={device.id} className={`overflow-hidden transition-all border-none bg-white/5 hover:bg-white/10 ${device.isActive ? 'ring-1 ring-primary/20' : 'opacity-60'}`}>
                      <div className="p-5 space-y-5">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4 items-center">
                            <div 
                              className="relative group cursor-pointer w-16 h-16 rounded-2xl bg-background/40 flex items-center justify-center overflow-hidden shrink-0 border border-white/5 hover:border-primary/50 transition-all shadow-inner"
                              onClick={() => {
                                setSelectingIconDeviceId(device.id);
                                setIconDialogOpen(true);
                                setIconSearchQuery("");
                                setSelectedCategory("All");
                              }}
                            >
                              {device.icon ? (
                                <img 
                                  src={`https://cdn.rusthelp.com/images/public/${device.icon}.png`} 
                                  alt={device.icon}
                                  className="w-12 h-12 object-contain group-hover:scale-90 transition-transform"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://cdn.rusthelp.com/images/public/smart.switch.png';
                                  }}
                                />
                              ) : (
                                <Smartphone className="w-8 h-8 text-muted-foreground/30 group-hover:scale-90 transition-transform" />
                              )}
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                                <Pencil className="w-5 h-5 text-white" />
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              {editingDeviceId === device.id ? (
                                <Input 
                                  className="h-8 text-sm font-bold bg-background/60 border-primary/40 focus:bg-background/80" 
                                  value={editForm.name}
                                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                />
                              ) : (
                                <h3 className="font-bold text-base leading-none tracking-tight">{device.name}</h3>
                              )}
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-[9px] font-bold uppercase tracking-widest py-0 px-2 h-4.5 bg-white/5 border-none text-muted-foreground/80">
                                  {device.type}
                                </Badge>
                                <span className="text-[10px] text-muted-foreground/50 font-mono tracking-widest uppercase">ID: {device.id}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              className={`text-[10px] font-bold h-5 px-2 border-none rounded-md transition-all ${device.value ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-zinc-800 text-zinc-400'}`}
                            >
                              {device.value ? 'ON' : 'OFF'}
                            </Badge>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-9 w-9 text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 rounded-xl"
                              onClick={() => handleDeleteDevice(device.id)}
                            >
                              <Trash2 className="h-4.5 w-4.5" />
                            </Button>
                          </div>
                        </div>

                        <div className="bg-black/20 rounded-2xl p-4 space-y-4 border border-white/5 shadow-inner">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 flex items-center gap-2">
                              <Terminal className="w-3.5 h-3.5" /> COMMAND
                            </span>
                            {editingDeviceId !== device.id && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 text-[10px] font-bold uppercase tracking-widest px-3 hover:bg-white/5 rounded-lg text-primary"
                                onClick={() => startEditing(device)}
                              >
                                Edit Logic
                              </Button>
                            )}
                          </div>
                          
                          {editingDeviceId === device.id ? (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest ml-1">Alias</label>
                                  <Input 
                                    placeholder="e.g. turrets" 
                                    className="h-9 text-xs font-mono bg-background/40 border-border/40"
                                    value={editForm.customCommand}
                                    onChange={(e) => setEditForm({...editForm, customCommand: e.target.value})}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest ml-1">Icon ID</label>
                                  <div className="flex gap-2">
                                    <Input 
                                      className="h-9 text-xs font-mono bg-background/20 border-border/40 text-muted-foreground"
                                      value={editForm.icon}
                                      readOnly
                                    />
                                    <Button 
                                      type="button" 
                                      size="sm" 
                                      variant="outline" 
                                      className="h-9 w-9 p-0 rounded-xl border-border/40"
                                      onClick={() => {
                                        setSelectingIconDeviceId(device.id);
                                        setIconDialogOpen(true);
                                        setIconSearchQuery("");
                                        setSelectedCategory("All");
                                      }}
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  className="h-9 text-xs font-bold flex-1 rounded-xl shadow-lg"
                                  onClick={handleSaveEdit}
                                  disabled={saving}
                                >
                                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                  Update Device
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-9 text-xs font-bold rounded-xl border-border/40"
                                  onClick={() => setEditingDeviceId(null)}
                                  disabled={saving}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20">
                                <code className="text-xs font-bold text-primary tracking-tight">
                                  {device.customCommand ? `${cmdPrefix}${device.customCommand}` : `${cmdPrefix}${device.name.toLowerCase().replace(/\s+/g, '-')}`}
                                </code>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 italic">
                                <span>Team Chat</span>
                                <ChevronRight className="w-3 h-3" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="flex gap-3">
                            {(device.type === "1" || device.type === "switch") ? (
                              <Button 
                                variant={device.value ? "destructive" : "default"}
                                size="lg" 
                                className={`h-12 flex-1 font-extrabold rounded-xl shadow-lg transition-all active:scale-[0.98] ${!device.value ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-600/20' : 'shadow-destructive/20'}`}
                                onClick={() => handleControlDevice(device.id, !device.value)}
                                disabled={controllingId === device.id || !device.isActive}
                              >
                                {controllingId === device.id ? (
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                  <>
                                    {device.value ? <PowerOff className="w-5 h-5 mr-3" /> : <Power className="w-5 h-5 mr-3" />}
                                    {device.value ? "SWITCH OFF" : "SWITCH ON"}
                                  </>
                                )}
                              </Button>
                            ) : (
                              <div className="flex-1 flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="lg" 
                                  className="h-12 flex-1 text-sm font-black tracking-widest rounded-xl border-border/40 bg-white/5 opacity-80"
                                  disabled
                                >
                                  {device.amount !== undefined ? `${device.amount} / ${device.capacity ?? '?'}` : "MONITOR ONLY"}
                                </Button>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-2.5">
                               <div className="relative flex h-2.5 w-2.5">
                                 {device.isActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-30"></span>}
                                 <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${device.isActive ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' : 'bg-zinc-700'}`} />
                               </div>
                               <span className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest">
                                 {device.isActive ? 'OPERATIONAL' : 'OFFLINE'}
                               </span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 text-[10px] font-black uppercase tracking-widest px-3 hover:bg-white/5 rounded-lg opacity-40 hover:opacity-100 transition-opacity"
                              onClick={() => handleToggleDevice(device)}
                            >
                              {device.isActive ? "DISABLE" : "ENABLE"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card className="glass-card border-none shadow-none overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <Terminal className="w-5 h-5 text-primary" />
                </div>
                Quick Reference
              </CardTitle>
              <CardDescription className="text-sm font-medium opacity-70">
                Team chat command palette.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-3">
                <div className="group flex items-center justify-between bg-black/30 p-4 rounded-2xl border border-white/5 hover:bg-black/40 transition-all">
                  <code className="text-sm font-black text-primary tracking-tight">{cmdPrefix}[cmd]</code>
                  <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest border border-white/5 px-2 py-1 rounded-md">Toggle</span>
                </div>
                <div className="group flex items-center justify-between bg-black/30 p-4 rounded-2xl border border-white/5 hover:bg-black/40 transition-all">
                  <code className="text-sm font-black text-primary tracking-tight">{cmdPrefix}on [cmd]</code>
                  <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest border border-white/5 px-2 py-1 rounded-md">Force On</span>
                </div>
                <div className="group flex items-center justify-between bg-black/30 p-4 rounded-2xl border border-white/5 hover:bg-black/40 transition-all">
                  <code className="text-sm font-black text-primary tracking-tight">{cmdPrefix}status</code>
                  <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest border border-white/5 px-2 py-1 rounded-md">Status</span>
                </div>
                <div className="group flex items-center justify-between bg-black/30 p-4 rounded-2xl border border-white/5 hover:bg-black/40 transition-all">
                  <code className="text-sm font-black text-primary tracking-tight">{cmdPrefix}devices</code>
                  <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest border border-white/5 px-2 py-1 rounded-md">List</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 italic">
                <p className="text-xs text-muted-foreground/60 leading-relaxed text-center">
                  Commands work for anyone in your <span className="text-primary font-bold">Rust In-Game Team</span>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Icon Selector Dialog */}
      <Dialog open={iconDialogOpen} onOpenChange={setIconDialogOpen}>
        <DialogContent className="max-w-md bg-zinc-950 border-zinc-800 text-zinc-100 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Select Device Icon</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items (e.g. switch, alarm)..."
                className="pl-9 h-9 bg-zinc-900 border-zinc-800 focus-visible:ring-primary text-sm"
                value={iconSearchQuery}
                onChange={(e) => setIconSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                      : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Icons Grid */}
            <div className="border border-zinc-800 rounded-lg p-2 bg-zinc-900/50 max-h-72 overflow-y-auto">
              {displayedItems.length === 0 ? (
                <div className="text-center py-8 text-sm text-zinc-500">
                  No icons found matching query.
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {displayedItems.map((item) => {
                    const isSelected = devices.find(d => d.id === selectingIconDeviceId)?.icon === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => selectingIconDeviceId && handleUpdateDeviceIcon(selectingIconDeviceId, item.id)}
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all ${
                          isSelected
                            ? "bg-primary/10 border-primary shadow-[0_0_8px_rgba(59,130,246,0.2)] text-primary-foreground"
                            : "bg-zinc-900 border-zinc-850 hover:border-zinc-700 hover:bg-zinc-850 text-zinc-300"
                        }`}
                      >
                        <div className="w-16 h-16 flex items-center justify-center overflow-hidden bg-black/25 rounded border border-zinc-800/40">
                          <img
                            src={`https://cdn.rusthelp.com/images/public/${item.id}.png`}
                            alt={item.name}
                            className="w-13 h-13 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://cdn.rusthelp.com/images/public/smart.switch.png';
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-center font-medium line-clamp-1 w-full px-0.5">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Default / Reset Option */}
            <div className="flex gap-2 pt-1 border-t border-zinc-800 pt-3">
              <Button
                variant="outline"
                className="flex-1 h-8 text-xs border-zinc-800 hover:bg-zinc-900 hover:text-zinc-100"
                onClick={() => selectingIconDeviceId && handleUpdateDeviceIcon(selectingIconDeviceId, null)}
              >
                Reset to Default Icon
              </Button>
              <Button
                variant="ghost"
                className="h-8 text-xs text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                onClick={() => setIconDialogOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
