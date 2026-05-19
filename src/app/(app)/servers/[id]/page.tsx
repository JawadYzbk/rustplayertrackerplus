"use client";

import { useEffect, useState, use } from "react";
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
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

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

  useEffect(() => {
    fetchData();
  }, [serverId]);

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
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.push("/servers")} className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">{server.name}</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground ml-10">
            <Badge variant="outline" className="font-mono text-[10px]">{server.id}</Badge>
            {server.rustPlusIp && (
              <span className="flex items-center gap-1.5">
                <Separator orientation="vertical" className="h-3" />
                {server.rustPlusIp}:{server.rustPlusPort}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => router.push(`/servers`)}>
            <Settings className="mr-2 h-4 w-4" /> Configure Rust+
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" /> Smart Devices
                </CardTitle>
                <CardDescription>
                  Manage paired smart entities for this server.
                </CardDescription>
              </div>
              <Badge variant="secondary">{devices.length} Devices</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {devices.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-xl bg-muted/20">
                <Smartphone className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground font-medium">No smart devices paired yet.</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Use the pairing listener on the Servers page to add devices.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {devices.map((device) => (
                  <Card key={device.id} className={`overflow-hidden transition-all border-l-4 ${device.isActive ? 'border-l-primary' : 'border-l-muted'}`}>
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0 border border-muted-foreground/10">
                            {device.icon ? (
                              <img 
                                src={`https://cdn.rusthelp.com/images/public/${device.icon}.png`} 
                                alt={device.icon}
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://cdn.rusthelp.com/images/public/smart.switch.png';
                                }}
                              />
                            ) : (
                              <Smartphone className="w-5 h-5 text-muted-foreground/50" />
                            )}
                          </div>
                          <div className="space-y-1">
                            {editingDeviceId === device.id ? (
                              <Input 
                                size={1} 
                                className="h-7 text-sm font-bold mb-1" 
                                value={editForm.name}
                                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                              />
                            ) : (
                              <h3 className="font-bold text-sm leading-none">{device.name}</h3>
                            )}
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-[9px] uppercase tracking-wider py-0 px-1.5 h-4 bg-muted/50 border-none">
                                {device.type}
                              </Badge>
                              <span className="text-[10px] text-muted-foreground font-mono">ID: {device.id}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge 
                            className={`text-[9px] font-bold h-4 px-1.5 border-none ${device.value ? 'bg-green-500 hover:bg-green-600 text-white shadow-[0_0_8px_rgba(34,197,94,0.3)]' : 'bg-zinc-700 hover:bg-zinc-800 text-zinc-300'}`}
                          >
                            {device.value ? 'ON' : 'OFF'}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDeleteDevice(device.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="bg-muted/30 rounded-lg p-2.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                            <Terminal className="w-3 h-3" /> Custom Command
                          </span>
                          {editingDeviceId !== device.id && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-5 text-[9px] uppercase font-bold px-2 hover:bg-muted"
                              onClick={() => startEditing(device)}
                            >
                              Settings
                            </Button>
                          )}
                        </div>
                        
                        {editingDeviceId === device.id ? (
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <label className="text-[9px] font-bold text-muted-foreground uppercase ml-1">Command</label>
                                <Input 
                                  placeholder="e.g. turrets" 
                                  className="h-8 text-xs font-mono"
                                  value={editForm.customCommand}
                                  onChange={(e) => setEditForm({...editForm, customCommand: e.target.value})}
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[9px] font-bold text-muted-foreground uppercase ml-1">Icon (Shortname)</label>
                                <Input 
                                  placeholder="smart.switch" 
                                  className="h-8 text-xs font-mono"
                                  value={editForm.icon}
                                  onChange={(e) => setEditForm({...editForm, icon: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className="h-7 text-[10px] flex-1"
                                onClick={handleSaveEdit}
                                disabled={saving}
                              >
                                {saving ? <Loader2 className="w-3 h-3 animate-spin mr-1.5" /> : <Save className="w-3 h-3 mr-1.5" />}
                                Save Changes
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-7 text-[10px]"
                                onClick={() => setEditingDeviceId(null)}
                                disabled={saving}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <code className="text-xs bg-black/10 px-1.5 py-0.5 rounded text-primary font-bold">
                              {device.customCommand ? `${cmdPrefix}${device.customCommand}` : "None (uses name)"}
                            </code>
                            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground italic">
                              <span className="opacity-50">In-game:</span>
                              <span className="font-mono text-foreground font-semibold">{cmdPrefix}{device.customCommand || device.name}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-muted/50 pt-3">
                        <div className="flex gap-2 flex-1">
                          {(device.type === "1" || device.type === "switch") ? (
                            <Button 
                              variant={device.value ? "destructive" : "default"}
                              size="sm" 
                              className={`h-9 flex-1 font-bold transition-all ${!device.value ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
                              onClick={() => handleControlDevice(device.id, !device.value)}
                              disabled={controllingId === device.id || !device.isActive}
                            >
                              {controllingId === device.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  {device.value ? <PowerOff className="w-4 h-4 mr-2" /> : <Power className="w-4 h-4 mr-2" />}
                                  {device.value ? "Switch OFF" : "Switch ON"}
                                </>
                              )}
                            </Button>
                          ) : (
                            <div className="flex-1 flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-9 flex-1 text-xs font-bold"
                                disabled
                              >
                                {device.amount !== undefined ? `${device.amount} / ${device.capacity ?? '?'}` : "MONITOR ONLY"}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                           <span className={`h-2 w-2 rounded-full ${device.isActive ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-muted'}`} />
                           <span className="text-[9px] font-bold uppercase text-muted-foreground tracking-tighter">
                             {device.isActive ? 'ACTIVE' : 'DISABLED'}
                           </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-[9px] font-bold px-2 hover:bg-muted"
                          onClick={() => handleToggleDevice(device)}
                        >
                          {device.isActive ? "DISABLE" : "ENABLE"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" /> Team Chat Commands
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center justify-between bg-black/10 p-2 rounded-lg border border-black/5">
                <code className="text-[11px] font-bold text-primary">{cmdPrefix}[command]</code>
                <span className="text-[9px] text-muted-foreground font-medium bg-muted/50 px-1.5 py-0.5 rounded">TOGGLE</span>
              </div>
              <div className="flex items-center justify-between bg-black/10 p-2 rounded-lg border border-black/5">
                <code className="text-[11px] font-bold text-primary">{cmdPrefix}on [name]</code>
                <span className="text-[9px] text-muted-foreground font-medium bg-muted/50 px-1.5 py-0.5 rounded">FORCE ON</span>
              </div>
              <div className="flex items-center justify-between bg-black/10 p-2 rounded-lg border border-black/5">
                <code className="text-[11px] font-bold text-primary">{cmdPrefix}status [name]</code>
                <span className="text-[9px] text-muted-foreground font-medium bg-muted/50 px-1.5 py-0.5 rounded">GET STATUS</span>
              </div>
              <div className="flex items-center justify-between bg-black/10 p-2 rounded-lg border border-black/5">
                <code className="text-[11px] font-bold text-primary">{cmdPrefix}devices</code>
                <span className="text-[9px] text-muted-foreground font-medium bg-muted/50 px-1.5 py-0.5 rounded">LIST ALL</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground italic text-center">
              * Using just the command (e.g. <code>{cmdPrefix}base-lights</code>) will toggle the current state.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
