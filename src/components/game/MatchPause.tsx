"use client";

import Link from "next/link";
import { useEffect } from "react";

type MatchPauseProps = {
  runs: number;
  wickets: number;
  overs: string;
  onResume: () => void;
  onRestart: () => void;
};

export default function MatchPause({
  runs,
  wickets,
  overs,
  onResume,
  onRestart,
}: MatchPauseProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onResume();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onResume]);

  return (
    <div className="absolute inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-[#010302]/75 p-4 backdrop-blur-xl sm:p-6">
      <div className="relative w-full max-w-[430px] overflow-hidden rounded-[30px] border border-white/10 bg-[#070c09]/95 shadow-[0_35px_120px_rgba(0,0,0,0.9)]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9cff00]/10 blur-3xl" />

        <div className="relative px-5 py-7 text-center sm:px-8 sm:py-9">
          {/* Pause Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] border border-[#9cff00]/20 bg-[#9cff00]/10 shadow-[0_0_45px_rgba(156,255,0,0.1)] sm:h-20 sm:w-20">
            <div className="flex items-center gap-1.5">
              <span className="h-7 w-2 rounded-full bg-[#b8ff55] sm:h-9 sm:w-2.5" />
              <span className="h-7 w-2 rounded-full bg-[#b8ff55] sm:h-9 sm:w-2.5" />
            </div>
          </div>

          {/* Heading */}
          <p className="mt-5 text-[8px] font-black uppercase tracking-[0.34em] text-[#9cff00]">
            Match Paused
          </p>

          <h2 className="mt-2 text-4xl font-black uppercase tracking-[-0.05em] text-white sm:text-5xl">
            Pause
          </h2>

          <p className="mx-auto mt-3 max-w-[300px] text-xs font-medium leading-5 text-white/40">
            Take a break. Your match is safely paused and ready to continue.
          </p>

          {/* Score */}
          <div className="mx-auto mt-7 overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.025]">
            <div className="px-5 py-5">
              <p className="text-[7px] font-black uppercase tracking-[0.26em] text-white/25">
                Current Score
              </p>

              <div className="mt-2 flex items-end justify-center gap-2">
                <span className="text-5xl font-black leading-none tracking-[-0.06em] text-white sm:text-6xl">
                  {runs}
                </span>

                <span className="mb-1 text-2xl font-black text-white/25">
                  /
                </span>

                <span className="mb-1 text-2xl font-black text-white/60">
                  {wickets}
                </span>
              </div>

              <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.18em] text-white/25">
                {overs} Overs
              </p>
            </div>

            <div className="grid grid-cols-2 border-t border-white/[0.07]">
              <div className="border-r border-white/[0.07] px-3 py-3">
                <p className="text-[7px] font-bold uppercase tracking-[0.14em] text-white/25">
                  Status
                </p>

                <p className="mt-1 text-sm font-black text-[#b8ff55]">PAUSED</p>
              </div>

              <div className="px-3 py-3">
                <p className="text-[7px] font-bold uppercase tracking-[0.14em] text-white/25">
                  Resume
                </p>

                <p className="mt-1 text-sm font-black text-white">ESC</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-2.5">
            <button
              type="button"
              onClick={onResume}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-[#9cff00]/30 bg-[#9cff00]/10 px-5 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-[#b8ff55] transition-all hover:border-[#9cff00]/50 hover:bg-[#9cff00]/15 active:scale-[0.98]"
            >
              <span className="text-sm transition-transform group-hover:translate-x-0.5">
                ▶
              </span>
              Resume Match
            </button>

            <button
              type="button"
              onClick={onRestart}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-white/60 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white active:scale-[0.98]"
            >
              <span className="text-sm">↻</span>
              Restart Match
            </button>

            <Link
              href="/"
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/[0.07] bg-transparent px-5 py-3.5 text-[9px] font-black uppercase tracking-[0.2em] text-white/30 transition-all hover:text-white/65 active:scale-[0.98]"
            >
              <span className="text-sm">←</span>
              Exit to Home
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-white/10" />

            <span className="text-[6px] font-bold uppercase tracking-[0.25em] text-white/20">
              Cricket Rivals 3D
            </span>

            <span className="h-px w-8 bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
