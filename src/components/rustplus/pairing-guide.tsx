import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, Monitor, ShieldCheck, Info } from "lucide-react";

export function PairingGuide() {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Info className="w-4 h-4 text-primary" /> Setup Guide: How to get FCM Credentials
        </CardTitle>
        <CardDescription className="text-xs">
          Follow these steps to obtain your persistent Rust+ credentials.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="web" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="web" className="text-xs gap-2">
              <Globe className="w-3 h-3" /> Web Method
            </TabsTrigger>
            <TabsTrigger value="app" className="text-xs gap-2">
              <Monitor className="w-3 h-3" /> App Method
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="web" className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-none w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">1</div>
                <p className="text-xs">
                  Install the extension for your browser: 
                  <a href="https://chromewebstore.google.com/detail/rustplusplus-credential-a/ooahmkklkanfgfmphpknpcgdpdcoikhe" target="_blank" rel="noreferrer" className="text-primary hover:underline mx-1">Chrome</a> or 
                  <a href="https://addons.mozilla.org/en-US/firefox/addon/rustplusplus-credential-app" target="_blank" rel="noreferrer" className="text-primary hover:underline mx-1">Firefox</a>.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex-none w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">2</div>
                <p className="text-xs">Login with your <b>Steam Account</b> when prompted by the extension.</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-none w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">3</div>
                <p className="text-xs">Copy the resulting <code>/credentials add ...</code> command or the raw JSON and paste it in the inputs above.</p>
              </div>
            </div>
            <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 flex gap-2">
               <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
               <p className="text-[10px] text-amber-200/80 leading-tight">Note: These credentials expire every 2 weeks. You will need to refresh them occasionally.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="app" className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-none w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">1</div>
                <p className="text-xs">Download the <a href="https://github.com/alexemanuelol/rustplusplus-credential-application/releases" target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">Desktop Application <ExternalLink className="w-2 h-2" /></a>.</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-none w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">2</div>
                <p className="text-xs">Open the app and click <b>Connect with Rust+</b>.</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-none w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">3</div>
                <p className="text-xs">Complete the Steam login in the popup window.</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-none w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">4</div>
                <p className="text-xs">Click <b>Copy</b> on the command string and paste it into the "Command String" field above.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
