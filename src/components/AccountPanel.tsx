"use client";

import { useEffect, useState } from "react";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { LogOut, Settings, Save, Loader2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";

export default function AccountPanel() {
  const [prefix, setPrefix] = useState("[Tracker]");
  const [cmdPrefix, setCmdPrefix] = useState("!");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      axios.get("/api/user/settings")
        .then(res => {
          setPrefix(res.data.notificationPrefix || "[Tracker]");
          setCmdPrefix(res.data.commandPrefix || "!");
        })
        .finally(() => setLoading(false));
    }
  }, [open]);

  async function handleSave() {
    setSaving(true);
    try {
      await axios.patch("/api/user/settings", { 
        notificationPrefix: prefix,
        commandPrefix: cmdPrefix
      });
      toast.success("Settings updated");
      setOpen(false);
    } catch {
      toast.error("Failed to update settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant="ghost" size="icon" className="h-9 w-9" />}>
          <Settings className="h-5 w-5" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" /> Bot Settings
            </DialogTitle>
            <DialogDescription>
              Customize how the tracker bot communicates in your team chat.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">
                Notification Prefix
              </label>
              {loading ? (
                <div className="h-10 w-full animate-pulse bg-muted rounded-md" />
              ) : (
                <Input
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  placeholder="[Tracker]"
                  maxLength={20}
                  className="font-mono"
                />
              )}
              <p className="text-[10px] text-muted-foreground ml-1 italic">
                This appears before every message sent by the bot.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">
                Command Trigger
              </label>
              {loading ? (
                <div className="h-10 w-full animate-pulse bg-muted rounded-md" />
              ) : (
                <Select value={cmdPrefix} onValueChange={(val) => setCmdPrefix(val ?? "!")}>
                  <SelectTrigger className="font-mono">
                    <SelectValue placeholder="Select a trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="!" className="font-mono">! (Exclamation)</SelectItem>
                    <SelectItem value="." className="font-mono">. (Period)</SelectItem>
                    <SelectItem value="," className="font-mono">, (Comma)</SelectItem>
                    <SelectItem value="#" className="font-mono"># (Hash)</SelectItem>
                    <SelectItem value="$" className="font-mono">$ (Dollar)</SelectItem>
                    <SelectItem value="%" className="font-mono">% (Percent)</SelectItem>
                  </SelectContent>
                </Select>
              )}
              <p className="text-[10px] text-muted-foreground ml-1 italic">
                The character that triggers bot commands (e.g. {cmdPrefix}on turrets).
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave} disabled={saving || loading} className="w-full">
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="rounded-full border bg-background/60 p-1">
        <UserButton />
      </div>

      <SignOutButton redirectUrl="/">
        <Button variant="outline" size="sm" className="gap-2 hidden md:flex">
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </SignOutButton>
    </div>
  );
}
