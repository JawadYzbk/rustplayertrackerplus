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

const featureCards = [
  {
    icon: Radar,
    title: "Live server radar",
    description:
      "See who is online right now, scan active servers, and turn live activity into tracked intelligence in one click.",
  },
  {
    icon: Brain,
    title: "Behavior forecasting",
    description:
      "Surface peak hours, dead zones, playtime trends, and recency-weighted forecasts for every tracked player.",
  },
  {
    icon: ShieldCheck,
    title: "Private dashboard access",
    description:
      "Each workspace is isolated per signed-in account, so your tracked players, sessions, and servers stay yours.",
  },
];

const highlights = [
  "Track servers with BattleMetrics IDs",
  "Build private player histories and session logs",
  "Inspect peak hours, dead hours, and average session length",
  "Open a clean dashboard only after authorization",
];

export default async function WelcomePage() {
  const { userId } = await auth();
  const isSignedIn = Boolean(userId);

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.65_0.18_40_/_0.16),transparent_35%),radial-gradient(circle_at_bottom_right,oklch(0.7_0.14_150_/_0.1),transparent_25%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-10">
        <header className="mb-10 flex items-center justify-between gap-4 rounded-2xl border bg-card/60 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight">RustTracker+</p>
              <p className="text-xs text-muted-foreground">
                Player intelligence for serious Rust server tracking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={isSignedIn ? "/dashboard" : "/sign-in"}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {isSignedIn ? "Open dashboard" : "Sign in"}
            </Link>
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button className="gap-2">
                {isSignedIn ? "Workspace" : "Get started"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </header>

        <section className="grid items-center gap-10 pb-14 pt-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Public welcome page, private dashboard access
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-black tracking-tight text-balance sm:text-6xl">
                Welcome to the Rust tracker that keeps{" "}
                <TypingFeature
                  phrases={[
                    "live server activity visible",
                    "player patterns easy to spot",
                    "your dashboard private and secure",
                    "session history ready for action",
                  ]}
                />
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                RustTracker+ helps players and server operators monitor live
                activity, understand behavior over time, and turn noisy server
                data into a clear intelligence workspace.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                <Button size="lg" className="gap-2">
                  {isSignedIn ? "Go to dashboard" : "Create your workspace"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={isSignedIn ? "/servers" : "/sign-in"}>
                <Button size="lg" variant="outline">
                  {isSignedIn ? "Manage servers" : "See the secure app"}
                </Button>
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border bg-card/40 px-4 py-3 text-sm text-muted-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-primary/10 blur-3xl" />
            <Card className="relative overflow-hidden border-primary/15 bg-card/85 shadow-2xl">
              <CardHeader className="border-b bg-secondary/30">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="h-4 w-4 text-primary" />
                  Mission Preview
                </CardTitle>
                <CardDescription>
                  A quick look at what new users unlock after sign-in.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border bg-background/50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Tracked servers
                    </p>
                    <p className="mt-3 text-3xl font-bold">24</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Watch multiple Rust worlds from one private command center.
                    </p>
                  </div>
                  <div className="rounded-2xl border bg-background/50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Session flow
                    </p>
                    <p className="mt-3 text-3xl font-bold">Live</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Follow join and leave activity without leaving the app.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border bg-background/50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-primary" />
                      BattleMetrics sync
                    </span>
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                      online
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Player history
                    </span>
                    <span className="text-muted-foreground">
                      heatmaps, trends, forecasts
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Access control
                    </span>
                    <span className="text-muted-foreground">
                      dashboard requires authorization
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-5 pb-14 md:grid-cols-3">
          {featureCards.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-white/8 bg-card/60">
              <CardHeader>
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="rounded-[2rem] border bg-card/60 px-6 py-8 text-center backdrop-blur">
          <p className="text-sm uppercase tracking-[0.25em] text-primary">
            Ready to explore?
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Start with a welcome page. Unlock the dashboard after sign-in.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            New users get a clear introduction to the platform first, then step
            into a secure dashboard for servers, players, sessions, and deeper
            analytics.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button size="lg">
                {isSignedIn ? "Return to dashboard" : "Create account"}
              </Button>
            </Link>
            {!isSignedIn && (
              <Link href="/sign-in">
                <Button size="lg" variant="outline">
                  I already have an account
                </Button>
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
