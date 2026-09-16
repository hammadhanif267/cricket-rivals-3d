"use client";

import { useEffect, useState } from "react";

export type ShotType = "defend" | "cover-drive" | "straight-drive" | "pull";

type MatchControlsProps = {
  onShot: (shot: ShotType) => void;
  disabled?: boolean;
};

const SHOTS: {
  id: ShotType;
  key: string;
  label: string;
  shortLabel: string;
  direction: string;
  icon: string;
}[] = [
  {
    id: "defend",
    key: "1",
    label: "Defend",
    shortLabel: "DEF",
    direction: "Safe Play",
    icon: "◆",
  },
  {
    id: "cover-drive",
    key: "2",
    label: "Cover Drive",
    shortLabel: "COVER",
    direction: "Off Side",
    icon: "↗",
  },
  {
    id: "straight-drive",
    key: "3",
    label: "Straight Drive",
    shortLabel: "DRIVE",
    direction: "Straight",
    icon: "↑",
  },
  {
    id: "pull",
    key: "4",
    label: "Pull",
    shortLabel: "PULL",
    direction: "Leg Side",
    icon: "↖",
  },
];

export default function MatchControls({
  onShot,
  disabled = false,
}: MatchControlsProps) {
  const [activeShot, setActiveShot] = useState<ShotType | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disabled) return;

      const shot = SHOTS.find((item) => item.key === event.key);

      if (!shot) return;

      event.preventDefault();

      setActiveShot(shot.id);
      onShot(shot.id);

      window.setTimeout(() => {
        setActiveShot(null);
      }, 260);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [disabled, onShot]);

  const handleShot = (shot: ShotType) => {
    if (disabled) return;

    setActiveShot(shot);
    onShot(shot);

    window.setTimeout(() => {
      setActiveShot(null);
    }, 260);
  };

  return (
    <div className="w-full">
      {/* Control Header */}

      <div className="mb-2 flex items-center justify-between px-1">
        <div>
          <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#9cff00]/70">
            Batting Controls
          </p>

          <p className="mt-0.5 text-[9px] font-medium text-white/30">
            Choose your shot
          </p>
        </div>

        <div className="hidden items-center gap-1.5 sm:flex">
          <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/20">
            Keyboard
          </span>

          <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-1 text-[8px] font-black text-white/40">
            1–4
          </span>
        </div>
      </div>

      {/* Shot Buttons */}

      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {SHOTS.map((shot) => {
          const active = activeShot === shot.id;

          return (
            <button
              key={shot.id}
              type="button"
              disabled={disabled}
              onPointerDown={(event) => {
                event.preventDefault();
                handleShot(shot.id);
              }}
              className={[
                "group relative min-w-0 overflow-hidden rounded-2xl border px-1.5 py-3 text-center",
                "touch-manipulation select-none",
                "transition-all duration-150",
                "active:scale-[0.96]",
                "sm:px-2.5 sm:py-3.5",
                disabled
                  ? "cursor-not-allowed border-white/[0.05] bg-white/[0.02] opacity-35"
                  : active
                    ? "border-[#9cff00]/60 bg-[#9cff00]/15 shadow-[0_0_30px_rgba(156,255,0,0.18)]"
                    : "border-white/10 bg-white/[0.035] hover:border-[#9cff00]/30 hover:bg-[#9cff00]/[0.07]",
              ].join(" ")}
            >
              {/* Active glow */}

              {active && (
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(156,255,0,0.18),transparent_65%)]" />
              )}

              <span className="relative z-10 flex items-center justify-between px-0.5">
                <span
                  className={[
                    "flex h-6 w-6 items-center justify-center rounded-lg border text-[10px] font-black transition-all sm:h-7 sm:w-7",
                    active
                      ? "border-[#9cff00]/30 bg-[#9cff00]/15 text-[#c5ff76]"
                      : "border-white/10 bg-black/20 text-white/35 group-hover:border-[#9cff00]/20 group-hover:text-[#b8ff55]",
                  ].join(" ")}
                >
                  {shot.key}
                </span>

                <span
                  className={[
                    "text-sm font-black transition-transform duration-150 sm:text-base",
                    active
                      ? "scale-110 text-[#c5ff76]"
                      : "text-white/35 group-hover:text-white/70",
                  ].join(" ")}
                >
                  {shot.icon}
                </span>
              </span>

              <span className="relative z-10 mt-2 block truncate text-[8px] font-black uppercase tracking-[0.08em] text-white/75 sm:text-[9px] sm:tracking-[0.12em]">
                {shot.shortLabel}
              </span>

              <span className="relative z-10 mt-0.5 hidden truncate text-[7px] font-bold uppercase tracking-[0.12em] text-white/25 sm:block">
                {shot.direction}
              </span>

              {/* Bottom indicator */}

              <span
                className={[
                  "absolute inset-x-3 bottom-0 h-px transition-all duration-200",
                  active
                    ? "bg-[#9cff00] shadow-[0_0_10px_rgba(156,255,0,0.8)]"
                    : "bg-transparent",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>

      {/* Mobile Hint */}

      <div className="mt-2 flex items-center justify-center gap-1.5 sm:hidden">
        <span className="h-1 w-1 rounded-full bg-[#9cff00]/60" />

        <span className="text-[7px] font-bold uppercase tracking-[0.16em] text-white/20">
          Tap to play shot
        </span>

        <span className="h-1 w-1 rounded-full bg-[#9cff00]/60" />
      </div>
    </div>
  );
}
