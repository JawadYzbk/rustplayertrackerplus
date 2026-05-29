import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Brain,
  Radar,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import TypingFeature from "@/components/TypingFeature";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Logo from "@/app/Logo.png";

const featureCards = [
  {
    icon: Radar,
    title: "Live Server Radar",
    description:
      "Instantly discover who is active, scan game servers, and import player activity directly into your tracked database.",
  },
  {
    icon: Brain,
    title: "Behavior Forecasting",
    description:
      "Predict exact player habits with recency-weighted probability charts, peak playtime logs, and offline intervals.",
  },
  {
    icon: ShieldCheck,
    title: "Isolated Intelligence",
    description:
      "Keep server intel confidential. Every user receives a private, secure database workspace isolated at the account level.",
  },
];

const highlights = [
  "Track servers using BattleMetrics IDs",
  "Build private history files & live sessions logs",
  "Forecast peaks, off-hours, and session ratios",
  "Clean, isolated workspace sandbox access",
];

export default async function WelcomePage() {
  const { userId } = await auth();
  const isSignedIn = Boolean(userId);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Visual background atmospheric lights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.68_0.21_42_/_0.15),transparent_45%),radial-gradient(circle_at_bottom_left,oklch(0.72_0.19_145_/_0.08),transparent_35%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-10 lg:px-12">
        {/* Header */}
        <header className="mb-14 flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-zinc-950/40 p-4 backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 p-1">
              <Image src={Logo} alt="Logo" width={32} height={32} className="rounded-lg object-cover" />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-foreground font-heading">
                Rust<span className="text-primary">Tracker+</span>
              </h2>
              <p className="text-[10px] text-muted-foreground font-semibold tracking-wider uppercase opacity-80">
                Player Intelligence Center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={isSignedIn ? "/dashboard" : "/sign-in"}
              className="text-xs font-bold uppercase tracking-widest text-muted-foreground transition-all hover:text-foreground"
            >
              {isSignedIn ? "Console" : "Login"}
            </Link>
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button size="sm" className="gap-2 rounded-xl text-xs font-extrabold uppercase tracking-widest px-4 shadow-lg shadow-primary/20 transition-all hover:scale-[1.03] active:scale-[0.97]">
                {isSignedIn ? "Dashboard" : "Register"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="grid items-center gap-14 pb-20 pt-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-primary shadow-[inset_0_0_12px_rgba(240,110,50,0.06)]">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Isolated Intel • Secure Sandbox Environment
            </div>

            <div className="space-y-6">
              <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-balance sm:text-6xl font-heading leading-[1.1] leading-none">
                Rust telemetry that makes{" "}
                <span className="text-primary font-black block mt-2">
                  <TypingFeature
                    phrases={[
                      "active servers visible.",
                      "player habits predictable.",
                      "workspace secure and private.",
                      "session charts actionable.",
                    ]}
                  />
                </span>
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground font-medium opacity-90">
                RustTracker+ converts noisy server metadata into clean, isolated workspace intelligence. Connect servers via BattleMetrics, monitor join/leave logs, and build private player profiles.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                <Button size="lg" className="gap-2.5 rounded-xl text-sm font-black uppercase tracking-widest px-6 shadow-xl shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  {isSignedIn ? "Access Workspace" : "Establish Sandbox"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={isSignedIn ? "/servers" : "/sign-in"}>
                <Button size="lg" variant="outline" className="rounded-xl text-sm font-black uppercase tracking-widest px-6 border-white/10 hover:bg-white/5">
                  {isSignedIn ? "Manage Servers" : "Inspect Interface"}
                </Button>
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 pt-4">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/5 bg-zinc-950/20 px-5 py-3.5 text-xs font-bold text-muted-foreground tracking-wide flex items-center gap-2.5"
                >
                  <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Sandbox Preview Card */}
          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-primary/10 blur-3xl" />
            <Card className="relative overflow-hidden border-primary/20 bg-zinc-950/50 shadow-2xl rounded-3xl backdrop-blur-md">
              <CardHeader className="border-b border-white/5 bg-zinc-900/20 p-6">
                <CardTitle className="flex items-center gap-2.5 text-sm font-black uppercase tracking-widest font-heading">
                  <Activity className="h-4.5 w-4.5 text-primary" />
                  Telemetry Hub Preview
                </CardTitle>
                <CardDescription className="text-xs font-semibold text-muted-foreground opacity-80 mt-1">
                  Preview of your dashboard console after establishing access.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/5 bg-zinc-900/10 p-5 space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
                      Servers Under Radar
                    </p>
                    <p className="text-4xl font-extrabold font-heading text-primary">24</p>
                    <p className="text-[10px] text-muted-foreground/80 font-medium leading-relaxed">
                      Continuous monitoring over targeted server worlds.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-zinc-900/10 p-5 space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
                      Session Captures
                    </p>
                    <p className="text-4xl font-extrabold font-heading flex items-center gap-2 text-green-500">
                      <span className="pulse-dot" />
                      Live
                    </p>
                    <p className="text-[10px] text-muted-foreground/80 font-medium leading-relaxed">
                      Instant connection logs showing server joins/leaves.
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 rounded-2xl border border-white/5 bg-zinc-900/15 p-5">
                  <div className="flex items-center justify-between text-xs font-bold tracking-wide">
                    <span className="flex items-center gap-2.5 text-muted-foreground">
                      <Server className="h-4 w-4 text-primary/70" />
                      BattleMetrics Sync
                    </span>
                    <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-[9px] uppercase font-bold tracking-widest text-green-400 border border-green-500/20">
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold tracking-wide">
                    <span className="flex items-center gap-2.5 text-muted-foreground">
                      <Users className="h-4 w-4 text-primary/70" />
                      Player Behavior Trends
                    </span>
                    <span className="text-[10px] text-foreground font-semibold">
                      heatmaps & forecasts
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold tracking-wide">
                    <span className="flex items-center gap-2.5 text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-primary/70" />
                      Cryptographic Privacy
                    </span>
                    <span className="text-[10px] text-foreground font-semibold">
                      account-isolated data
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="grid gap-6 pb-20 md:grid-cols-3">
          {featureCards.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-white/5 bg-zinc-950/20 rounded-2xl shadow-xl hover:border-primary/20 hover:bg-zinc-950/30 transition-all duration-300 group">
              <CardHeader className="p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/10 transition-transform group-hover:scale-105 duration-300">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <CardTitle className="text-lg font-bold font-heading">{title}</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <p className="text-xs leading-relaxed text-muted-foreground font-semibold opacity-85">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Closing CTA */}
        <section className="rounded-3xl border border-white/5 bg-zinc-950/30 px-8 py-12 text-center backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
          <p className="text-xs uppercase tracking-[0.25em] font-extrabold text-primary font-heading">
            Secure Access Portal
          </p>
          <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
            Deploy intelligence. Connect. Track. Control.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xs font-semibold leading-relaxed text-muted-foreground opacity-80">
            Establish your tracking console in less than 2 minutes. Start monitoring active playtimes, predict clan hours, and secure high-value telemetry.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button size="lg" className="rounded-xl text-xs font-black uppercase tracking-widest px-6 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                {isSignedIn ? "Return to Console" : "Establish Workspace"}
              </Button>
            </Link>
            {!isSignedIn && (
              <Link href="/sign-in">
                <Button size="lg" variant="outline" className="rounded-xl text-xs font-black uppercase tracking-widest px-6 border-white/10 hover:bg-white/5">
                  Access Existing Hub
                </Button>
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
