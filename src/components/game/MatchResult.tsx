"use client";

import Link from "next/link";

type MatchResultProps = {
  status: "won" | "lost" | "complete";
  runs: number;
  wickets: number;
  overs: string;
  target: number;
  onPlayAgain: () => void;
};

export default function MatchResult({
  status,
  runs,
  wickets,
  overs,
  target,
  onPlayAgain,
}: MatchResultProps) {
  const isWon = status === "won";

  const title = isWon ? "Victory" : "Match Complete";

  const subtitle = isWon
    ? "A dominant performance at the crease."
    : "The innings has come to an end.";

  const margin = Math.max(target - runs, 0);

  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-[#010302]/80 p-4 backdrop-blur-xl sm:p-6">
      <div className="relative w-full max-w-[470px] overflow-hidden rounded-[30px] border border-white/10 bg-[#070c09]/95 shadow-[0_35px_120px_rgba(0,0,0,0.85)]">
        {/* Top Glow */}

        <div
          className={[
            "absolute left-1/2 top-0 h-32 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
            isWon ? "bg-[#9cff00]/15" : "bg-white/[0.05]",
          ].join(" ")}
        />

        {/* Content */}

        <div className="relative px-5 py-7 text-center sm:px-8 sm:py-9">
          {/* Result Icon */}

          <div
            className={[
              "mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] border shadow-lg sm:h-20 sm:w-20",
              isWon
                ? "border-[#9cff00]/25 bg-[#9cff00]/10 shadow-[0_0_45px_rgba(156,255,0,0.12)]"
                : "border-white/10 bg-white/[0.04]",
            ].join(" ")}
          >
            <span
              className={[
                "text-2xl font-black sm:text-3xl",
                isWon ? "text-[#b8ff55]" : "text-white/60",
              ].join(" ")}
            >
              {isWon ? "✓" : "!"}
            </span>
          </div>

          {/* Label */}

          <p
            className={[
              "mt-5 text-[8px] font-black uppercase tracking-[0.34em]",
              isWon ? "text-[#9cff00]" : "text-white/35",
            ].join(" ")}
          >
            Match Result
          </p>

          {/* Title */}

          <h2 className="mt-2 text-4xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl">
            {title}
          </h2>

          <p className="mx-auto mt-3 max-w-[330px] text-xs font-medium leading-5 text-white/40">
            {subtitle}
          </p>

          {/* Score */}

          <div className="mx-auto mt-7 overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.025]">
            <div className="px-5 py-5">
              <p className="text-[7px] font-black uppercase tracking-[0.26em] text-white/25">
                Final Score
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

            {/* Stats */}

            <div className="grid grid-cols-3 border-t border-white/[0.07]">
              <div className="border-r border-white/[0.07] px-2 py-3">
                <p className="text-[7px] font-bold uppercase tracking-[0.14em] text-white/25">
                  Target
                </p>

                <p className="mt-1 text-sm font-black text-white">{target}</p>
              </div>

              <div className="border-r border-white/[0.07] px-2 py-3">
                <p className="text-[7px] font-bold uppercase tracking-[0.14em] text-white/25">
                  Wickets
                </p>

                <p className="mt-1 text-sm font-black text-white">{wickets}</p>
              </div>

              <div className="px-2 py-3">
                <p className="text-[7px] font-bold uppercase tracking-[0.14em] text-white/25">
                  Result
                </p>

                <p
                  className={[
                    "mt-1 text-sm font-black",
                    isWon ? "text-[#b8ff55]" : "text-white/70",
                  ].join(" ")}
                >
                  {isWon ? `+${margin}` : "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            <button
              type="button"
              onClick={onPlayAgain}
              className="rounded-2xl border border-[#9cff00]/30 bg-[#9cff00]/10 px-5 py-3.5 text-[9px] font-black uppercase tracking-[0.2em] text-[#b8ff55] transition-all hover:border-[#9cff00]/50 hover:bg-[#9cff00]/15 active:scale-[0.98]"
            >
              Play Again
            </button>

            <Link
              href="/"
              className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3.5 text-[9px] font-black uppercase tracking-[0.2em] text-white/55 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white active:scale-[0.98]"
            >
              Back to Home
            </Link>
          </div>

          {/* Footer */}

          <div className="mt-5 flex items-center justify-center gap-2">
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
