"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const StadiumScene = dynamic(() => import("../components/game/StadiumScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[360px] w-full items-center justify-center bg-[#020603]">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-lime-300" />
        <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">
          Loading Stadium
        </p>
      </div>
    </div>
  ),
});

type GameMode = {
  title: string;
  subtitle: string;
  badge: string;
  featured?: boolean;
};

const gameModes: GameMode[] = [
  {
    title: "Quick Match",
    subtitle: "Jump straight into the action",
    badge: "PLAY",
    featured: true,
  },
  {
    title: "Career Mode",
    subtitle: "Build your cricket legacy",
    badge: "CAREER",
  },
  {
    title: "Tournament",
    subtitle: "Compete for the championship",
    badge: "EVENT",
  },
  {
    title: "Multiplayer",
    subtitle: "PvP coming soon",
    badge: "ONLINE",
  },
];

export default function HomePage() {
  const [activeMode, setActiveMode] = useState<string | null>(null);

  return (
    <main className="cr-app">
      <div className="cr-game-frame">
        <div className="cr-stadium-glow" />

        {/* Header */}
        <header className="relative z-20 flex shrink-0 items-center justify-between px-5 py-4 cr-safe-top">
          <div>
            <p className="cr-label">Welcome back</p>

            <h1 className="mt-1 text-xl font-black tracking-tight text-white">
              CRICKET <span className="cr-accent">RIVALS</span>
            </h1>
          </div>

          <button
            type="button"
            aria-label="Open player profile"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-black text-white shadow-lg backdrop-blur-md transition hover:border-lime-400/30 hover:bg-lime-400/10"
          >
            CR
          </button>
        </header>

        {/* Scrollable game content */}
        <div className="relative z-10 min-h-0 flex-1 overflow-y-auto">
          <div className="px-5 pb-5">
            {/* 3D Stadium */}
            <section className="relative mt-2 overflow-hidden rounded-[24px] border border-white/10 shadow-2xl">
              <div className="absolute left-4 top-4 z-10">
                <div className="rounded-full border border-lime-300/20 bg-black/40 px-3 py-1.5 backdrop-blur-md">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-lime-300">
                    Live Stadium
                  </span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 z-10 max-w-[230px]">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">
                  Cricket Rivals 3D
                </p>

                <p className="mt-1 text-2xl font-black leading-none tracking-[-0.03em] text-white">
                  OWN THE <span className="text-lime-300">PITCH.</span>
                </p>
              </div>

              <div className="h-[290px] w-full sm:h-[330px]">
                <StadiumScene />
              </div>
            </section>

            {/* Player stats */}
            <section className="mt-4 grid grid-cols-3 gap-2">
              <StatCard label="LEVEL" value="01" />
              <StatCard label="RATING" value="72" accent />
              <StatCard label="COINS" value="1,250" />
            </section>

            {/* Game modes */}
            <section className="mt-6">
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <p className="cr-label">Game modes</p>

                  <h2 className="mt-1 text-lg font-extrabold tracking-tight text-white">
                    Choose your challenge
                  </h2>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                  Season 01
                </span>
              </div>

              <div className="space-y-2.5">
                {gameModes.map((mode) => {
                  const isActive = activeMode === mode.title;

                  return (
                    <button
                      key={mode.title}
                      type="button"
                      onClick={() => setActiveMode(mode.title)}
                      className={[
                        "group relative flex w-full items-center overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200",
                        mode.featured
                          ? "border-lime-300/20 bg-lime-300/[0.07]"
                          : "border-white/[0.08] bg-white/[0.035]",
                        isActive ? "border-lime-300/40 bg-lime-300/[0.1]" : "",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "mr-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-[10px] font-black tracking-wider",
                          mode.featured
                            ? "border-lime-300/30 bg-lime-300/10 text-lime-300"
                            : "border-white/10 bg-white/5 text-white/50",
                        ].join(" ")}
                      >
                        {mode.badge.slice(0, 2)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-extrabold text-white">
                          {mode.title}
                        </p>

                        <p className="mt-0.5 truncate text-[11px] text-white/40">
                          {mode.subtitle}
                        </p>
                      </div>

                      <span className="ml-3 text-lg text-white/25 transition group-hover:translate-x-0.5 group-hover:text-lime-300">
                        →
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Secondary panels */}
            <section className="mt-5 grid grid-cols-2 gap-2.5">
              <InfoCard label="Leaderboard" value="Global rankings" icon="01" />

              <InfoCard label="Profile" value="Your cricket career" icon="CR" />
            </section>
          </div>
        </div>

        {/* Bottom navigation */}
        <nav className="relative z-20 shrink-0 border-t border-white/[0.07] bg-black/50 px-5 pt-2 backdrop-blur-xl cr-safe-bottom">
          <div className="grid grid-cols-4">
            <BottomNavItem label="Home" active icon="⌂" />
            <BottomNavItem label="Matches" icon="◆" />
            <BottomNavItem label="Rankings" icon="♜" />
            <BottomNavItem label="Settings" icon="⚙" />
          </div>
        </nav>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="cr-panel min-w-0 px-3 py-3">
      <p className="cr-label truncate">{label}</p>

      <p
        className={[
          "mt-1 truncate text-sm font-black tracking-tight",
          accent ? "cr-accent" : "text-white",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <button
      type="button"
      className="cr-panel flex min-w-0 items-center gap-3 p-3 text-left transition hover:border-lime-300/25"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[10px] font-black text-lime-300">
        {icon}
      </span>

      <span className="min-w-0">
        <span className="block truncate text-xs font-extrabold text-white">
          {label}
        </span>

        <span className="mt-0.5 block truncate text-[9px] text-white/35">
          {value}
        </span>
      </span>
    </button>
  );
}

function BottomNavItem({
  label,
  icon,
  active = false,
}: {
  label: string;
  icon: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={[
        "flex min-h-[52px] flex-col items-center justify-center gap-1 transition",
        active ? "text-lime-300" : "text-white/30 hover:text-white/60",
      ].join(" ")}
    >
      <span className="text-base leading-none">{icon}</span>

      <span className="text-[9px] font-bold uppercase tracking-wider">
        {label}
      </span>
    </button>
  );
}
