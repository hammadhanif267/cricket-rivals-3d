"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";

const StadiumScene = dynamic(() => import("@/components/game/StadiumScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[680px] w-full items-center justify-center bg-[#030604]">
      <div className="text-center">
        <div className="mx-auto mb-4 h-11 w-11 animate-spin rounded-full border-2 border-white/10 border-t-[#9cff00]" />
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/55">
          Loading Stadium
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/25">
          Preparing Cricket Rivals
        </p>
      </div>
    </div>
  ),
});

const GAME_MODES = [
  {
    title: "Quick Match",
    subtitle: "Play Now",
    description: "Jump straight into a fast cricket match.",
    icon: "🏏",
    href: "/match",
    accent: true,
  },
  {
    title: "Career",
    subtitle: "Build Your Legacy",
    description: "Develop your player and climb the ranks.",
    icon: "◆",
    href: "#",
    accent: false,
  },
  {
    title: "Tournament",
    subtitle: "Compete",
    description: "Take on multiple teams and chase the trophy.",
    icon: "🏆",
    href: "#",
    accent: false,
  },
  {
    title: "Multiplayer",
    subtitle: "Coming Soon",
    description: "Challenge other players online.",
    icon: "VS",
    href: "#",
    accent: false,
  },
];

export default function HomePage() {
  const [activeMode, setActiveMode] = useState("Quick Match");

  return (
    <main className="cr-app min-h-screen">
      <div className="mx-auto min-h-screen w-full max-w-[1500px] px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
        <div className="cr-game-frame relative min-h-[calc(100vh-24px)] overflow-hidden sm:min-h-[calc(100vh-40px)]">
          {/* Stadium Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <StadiumScene />
          </div>

          {/* Cinematic Overlay */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/85 via-black/35 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-[#020504] via-[#020504]/55 to-transparent" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.18)_58%,rgba(0,0,0,0.7)_100%)]" />
          </div>

          {/* Header */}
          <header className="relative z-30 flex items-center justify-between border-b border-white/[0.07] px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.38em] text-[#9cff00]/75">
                Cricket Rivals
              </p>

              <h1 className="mt-1 text-base font-black uppercase tracking-[0.12em] text-white sm:text-xl">
                3D
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="#"
                className="hidden rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.16em] text-white/60 backdrop-blur-xl transition hover:border-white/20 hover:text-white sm:block"
              >
                Leaderboard
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/35 text-sm text-white/60 backdrop-blur-xl transition hover:border-[#9cff00]/30 hover:text-[#b8ff55]"
                aria-label="Profile"
              >
                ◉
              </Link>
            </div>
          </header>

          {/* Hero */}
          <section className="relative z-20 px-5 pb-8 pt-10 sm:px-8 sm:pb-12 sm:pt-14 lg:px-12 lg:pt-16">
            <div className="max-w-[680px]">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#9cff00]/20 bg-[#9cff00]/[0.06] px-3 py-1.5 backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9cff00] shadow-[0_0_10px_rgba(156,255,0,0.8)]" />

                <span className="text-[8px] font-black uppercase tracking-[0.24em] text-[#b8ff55]">
                  Next Generation Cricket
                </span>
              </div>

              <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                Own the
                <br />
                <span className="text-[#b8ff55]">Crease.</span>
              </h2>

              <p className="mt-5 max-w-[540px] text-sm font-medium leading-6 text-white/50 sm:text-base">
                Step into a cinematic 3D cricket experience. Read the ball,
                choose your shot, time it perfectly and dominate the match.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <div className="rounded-xl border border-white/10 bg-black/35 px-4 py-2.5 backdrop-blur-xl">
                  <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/30">
                    Stadium
                  </p>

                  <p className="mt-1 text-xs font-black uppercase text-white">
                    Night Arena
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/35 px-4 py-2.5 backdrop-blur-xl">
                  <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/30">
                    Gameplay
                  </p>

                  <p className="mt-1 text-xs font-black uppercase text-white">
                    Real Time
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/35 px-4 py-2.5 backdrop-blur-xl">
                  <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/30">
                    Controls
                  </p>

                  <p className="mt-1 text-xs font-black uppercase text-white">
                    Touch + Keyboard
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Game Modes */}
          <section className="relative z-30 px-4 pb-5 sm:px-6 lg:px-8">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#9cff00]/70">
                  Game Modes
                </p>

                <h3 className="mt-1 text-lg font-black uppercase tracking-tight text-white">
                  Choose Your Battle
                </h3>
              </div>

              <p className="hidden text-[9px] font-bold uppercase tracking-[0.15em] text-white/25 sm:block">
                Select a mode
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {GAME_MODES.map((mode) => {
                const isActive = activeMode === mode.title;

                if (mode.title === "Quick Match") {
                  return (
                    <Link
                      key={mode.title}
                      href={mode.href}
                      onClick={() => setActiveMode(mode.title)}
                      className="group relative overflow-hidden rounded-2xl border border-[#9cff00]/25 bg-[#9cff00]/[0.08] p-4 shadow-[0_15px_45px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#9cff00]/50 hover:bg-[#9cff00]/[0.12] sm:p-5"
                    >
                      <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#9cff00]/10 blur-2xl transition group-hover:bg-[#9cff00]/20" />

                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{mode.icon}</span>

                          <span className="rounded-lg bg-[#9cff00]/10 px-2 py-1 text-[7px] font-black uppercase tracking-[0.15em] text-[#b8ff55]">
                            Play
                          </span>
                        </div>

                        <p className="mt-5 text-[8px] font-black uppercase tracking-[0.2em] text-[#9cff00]/70">
                          {mode.subtitle}
                        </p>

                        <h4 className="mt-1 text-sm font-black uppercase text-white sm:text-base">
                          {mode.title}
                        </h4>

                        <p className="mt-2 hidden text-[10px] leading-4 text-white/35 sm:block">
                          {mode.description}
                        </p>
                      </div>
                    </Link>
                  );
                }

                return (
                  <button
                    key={mode.title}
                    type="button"
                    onClick={() => setActiveMode(mode.title)}
                    className={[
                      "group relative overflow-hidden rounded-2xl border p-4 text-left backdrop-blur-xl transition-all duration-300 sm:p-5",
                      isActive
                        ? "border-white/15 bg-white/[0.07]"
                        : "border-white/[0.08] bg-black/35 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06]",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl opacity-80">{mode.icon}</span>

                      <span className="rounded-lg border border-white/10 px-2 py-1 text-[7px] font-black uppercase tracking-[0.12em] text-white/30">
                        Soon
                      </span>
                    </div>

                    <p className="mt-5 text-[8px] font-black uppercase tracking-[0.2em] text-white/30">
                      {mode.subtitle}
                    </p>

                    <h4 className="mt-1 text-sm font-black uppercase text-white/80 sm:text-base">
                      {mode.title}
                    </h4>

                    <p className="mt-2 hidden text-[10px] leading-4 text-white/30 sm:block">
                      {mode.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Bottom Stats */}
          <section className="relative z-30 px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8">
            <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/45 backdrop-blur-2xl">
              <div className="border-r border-white/[0.07] px-3 py-3 text-center sm:px-5">
                <p className="text-lg font-black text-white sm:text-xl">01</p>

                <p className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.2em] text-white/25 sm:text-[8px]">
                  Matches
                </p>
              </div>

              <div className="border-r border-white/[0.07] px-3 py-3 text-center sm:px-5">
                <p className="text-lg font-black text-[#b8ff55] sm:text-xl">
                  00
                </p>

                <p className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.2em] text-white/25 sm:text-[8px]">
                  Wins
                </p>
              </div>

              <div className="px-3 py-3 text-center sm:px-5">
                <p className="text-lg font-black text-white sm:text-xl">000</p>

                <p className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.2em] text-white/25 sm:text-[8px]">
                  Runs
                </p>
              </div>
            </div>
          </section>

          {/* Bottom Navigation */}
          <nav className="relative z-40 flex items-center justify-around border-t border-white/[0.07] bg-[#030604]/80 px-3 py-3 backdrop-blur-2xl sm:hidden">
            <Link
              href="/"
              className="flex flex-col items-center gap-1 text-[#b8ff55]"
            >
              <span className="text-sm">⌂</span>
              <span className="text-[7px] font-black uppercase tracking-[0.16em]">
                Home
              </span>
            </Link>

            <Link
              href="/match"
              className="flex flex-col items-center gap-1 text-white/35 transition hover:text-white"
            >
              <span className="text-sm">🏏</span>
              <span className="text-[7px] font-black uppercase tracking-[0.16em]">
                Match
              </span>
            </Link>

            <Link
              href="#"
              className="flex flex-col items-center gap-1 text-white/35 transition hover:text-white"
            >
              <span className="text-sm">◆</span>
              <span className="text-[7px] font-black uppercase tracking-[0.16em]">
                Career
              </span>
            </Link>

            <Link
              href="#"
              className="flex flex-col items-center gap-1 text-white/35 transition hover:text-white"
            >
              <span className="text-sm">◉</span>
              <span className="text-[7px] font-black uppercase tracking-[0.16em]">
                Profile
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
