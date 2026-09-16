"use client";

import Link from "next/link";

import MatchGame from "@/components/game/MatchGame";

export default function MatchPage() {
  return (
    <main className="min-h-screen bg-[#010302] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col">
        {/* Header */}
        <header className="relative z-40 flex h-16 shrink-0 items-center justify-between border-b border-white/[0.07] bg-[#030604]/95 px-3 backdrop-blur-xl sm:h-[72px] sm:px-5 lg:px-7">
          {/* Home */}
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2 text-[8px] font-black uppercase tracking-[0.16em] text-white/45 transition-all hover:border-white/20 hover:bg-white/[0.05] hover:text-white active:scale-95 sm:px-4 sm:py-2.5"
          >
            <span className="text-sm transition-transform group-hover:-translate-x-0.5">
              ←
            </span>

            <span className="hidden sm:inline">Home</span>
          </Link>

          {/* Brand */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-[7px] font-black uppercase tracking-[0.32em] text-[#9cff00] sm:text-[8px]">
              Cricket Rivals
            </p>

            <h1 className="mt-0.5 text-[13px] font-black uppercase tracking-[-0.02em] text-white sm:text-base">
              Quick Match
            </h1>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 rounded-xl border border-[#9cff00]/15 bg-[#9cff00]/[0.04] px-3 py-2 sm:px-4 sm:py-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9cff00]/50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#9cff00]" />
            </span>

            <span className="text-[7px] font-black uppercase tracking-[0.18em] text-[#b8ff55]">
              Live
            </span>
          </div>
        </header>

        {/* Match Area */}
        <section className="relative flex-1 p-2 sm:p-4 lg:p-6">
          <div className="relative h-full min-h-[calc(100vh-120px)] overflow-hidden rounded-[28px] sm:min-h-[calc(100vh-140px)] sm:rounded-[30px]">
            <MatchGame />
          </div>
        </section>

        {/* Footer */}
        <footer className="flex min-h-10 shrink-0 items-center justify-center border-t border-white/[0.06] px-3 py-2.5 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[6px] font-bold uppercase tracking-[0.18em] text-white/20 sm:gap-x-4 sm:text-[7px]">
            <span>Cricket Rivals 3D</span>

            <span className="h-1 w-1 rounded-full bg-white/10" />

            <span>1–4 Shot Controls</span>

            <span className="h-1 w-1 rounded-full bg-white/10" />

            <span>Touch Enabled</span>

            <span className="hidden h-1 w-1 rounded-full bg-white/10 sm:block" />

            <span className="hidden sm:inline">ESC to Resume</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
