"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

import MatchControls, { type ShotType } from "./MatchControls";

import MatchHUD from "./MatchHUD";
import MatchCamera from "./MatchCamera";
import MatchResult from "./MatchResult";
import MatchPause from "./MatchPause";

import { Batsman, Bowler, CricketBall, CricketStumps } from "./CricketActors";

import { useMatchState } from "./MatchState";

const StadiumScene = dynamic(() => import("./StadiumScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[500px] items-center justify-center bg-[#020504]">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#9cff00]" />
        <p className="mt-4 text-[8px] font-black uppercase tracking-[0.3em] text-white/30">
          Loading Stadium
        </p>
      </div>
    </div>
  ),
});

type CameraMode = "batting" | "field" | "replay";

export default function MatchGame() {
  const [cameraMode, setCameraMode] = useState<CameraMode>("batting");

  const [shotFeedback, setShotFeedback] = useState("");

  const [ballPosition, setBallPosition] = useState<[number, number, number]>([
    0, 1.25, 2.1,
  ]);

  const [paused, setPaused] = useState(false);

  const { state, playShot, resetMatch } = useMatchState();

  const {
    runs,
    wickets,
    overs,
    runRate,
    target,
    ballsRemaining,
    striker,
    nonStriker,
    bowler,
    lastBall,
    status,
  } = state;

  const handleResume = useCallback(() => {
    if (status !== "playing") {
      return;
    }

    setPaused(false);
  }, [status]);

  const handleRestart = useCallback(() => {
    resetMatch();

    setPaused(false);
    setShotFeedback("");
    setBallPosition([0, 1.25, 2.1]);
    setCameraMode("batting");
  }, [resetMatch]);

  const handleShot = useCallback(
    (shot: ShotType) => {
      if (status !== "playing" || paused) {
        return;
      }

      playShot(shot);

      const shotName = shot
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      setShotFeedback(shotName);

      const normalizedShot = shot.toLowerCase();

      const isBoundary = [
        "cover",
        "loft",
        "pull",
        "square",
        "sweep",
        "drive",
        "cut",
        "hook",
        "reverse",
      ].some((value) => normalizedShot.includes(value));

      const isRunningShot = ["defensive", "push", "tap", "guide", "nudge"].some(
        (value) => normalizedShot.includes(value),
      );

      if (isBoundary) {
        setBallPosition([3.8, 2.15, -4.2]);

        setCameraMode("field");
      } else if (isRunningShot) {
        setBallPosition([1.6, 1.45, -2.2]);

        setCameraMode("replay");
      } else {
        setBallPosition([0.45, 1.05, 0.85]);

        setCameraMode("batting");
      }

      window.setTimeout(() => {
        setShotFeedback("");

        setBallPosition([0, 1.25, 2.1]);

        setCameraMode("batting");
      }, 900);
    },
    [paused, playShot, status],
  );

  return (
    <div className="relative h-full min-h-[680px] w-full overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#030604] shadow-[0_30px_100px_rgba(0,0,0,0.65)]">
      {/* 3D Stadium */}
      <div className="absolute inset-0">
        <StadiumScene>
          <MatchCamera mode={cameraMode} enabled={!paused} />

          <Batsman />

          <Bowler />

          <CricketStumps />

          <CricketBall position={ballPosition} />
        </StadiumScene>
      </div>

      {/* Stadium vignette */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_42%,transparent_18%,rgba(0,0,0,0.08)_48%,rgba(0,0,0,0.6)_100%)]" />

      {/* Top HUD */}
      <div className="absolute inset-x-0 top-0 z-20 p-2 sm:p-3 lg:p-4">
        <MatchHUD
          team="CR Rivals"
          opponent="City XI"
          runs={runs}
          wickets={wickets}
          overs={overs}
          runRate={runRate}
          target={target}
          ballsRemaining={ballsRemaining}
          striker={striker}
          nonStriker={nonStriker}
          bowler={bowler}
          lastBall={lastBall}
        />
      </div>

      {/* Pause button */}
      {status === "playing" && !paused && (
        <button
          type="button"
          aria-label="Pause match"
          onClick={() => setPaused(true)}
          className="absolute right-3 top-[118px] z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-white/65 shadow-lg backdrop-blur-xl transition-all hover:border-[#9cff00]/30 hover:bg-black/60 hover:text-[#b8ff55] active:scale-95 sm:right-4 sm:top-[126px] sm:h-11 sm:w-11"
        >
          <span className="flex items-center gap-1">
            <span className="h-4 w-1.5 rounded-full bg-current" />
            <span className="h-4 w-1.5 rounded-full bg-current" />
          </span>
        </button>
      )}

      {/* Shot feedback */}
      {shotFeedback && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-2xl border border-[#9cff00]/25 bg-black/55 px-6 py-3 shadow-[0_0_50px_rgba(156,255,0,0.12)] backdrop-blur-xl">
            <p className="text-center text-[9px] font-black uppercase tracking-[0.3em] text-[#b8ff55]">
              {shotFeedback}
            </p>
          </div>
        </div>
      )}

      {/* Player information */}
      <div className="absolute bottom-[118px] left-3 z-20 hidden w-[180px] rounded-2xl border border-white/10 bg-black/35 p-3 backdrop-blur-xl sm:block">
        <p className="text-[7px] font-black uppercase tracking-[0.25em] text-white/25">
          Batting
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] font-bold text-white/75">{striker}</span>

          <span className="rounded-md bg-[#9cff00]/10 px-1.5 py-1 text-[6px] font-black uppercase text-[#b8ff55]">
            STRIKER
          </span>
        </div>

        <div className="mt-2 h-px bg-white/[0.06]" />

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[9px] font-medium text-white/40">
            {nonStriker}
          </span>

          <span className="text-[6px] font-bold uppercase tracking-[0.12em] text-white/20">
            NON-STRIKER
          </span>
        </div>
      </div>

      {/* Bowler information */}
      <div className="absolute bottom-[118px] right-3 z-20 hidden w-[150px] rounded-2xl border border-white/10 bg-black/35 p-3 text-right backdrop-blur-xl sm:block">
        <p className="text-[7px] font-black uppercase tracking-[0.25em] text-white/25">
          Bowling
        </p>

        <p className="mt-2 text-[10px] font-bold text-white/70">{bowler}</p>

        <p className="mt-1 text-[7px] font-bold uppercase tracking-[0.16em] text-white/20">
          Current Bowler
        </p>
      </div>

      {/* Pause overlay */}
      {paused && status === "playing" && (
        <MatchPause
          runs={runs}
          wickets={wickets}
          overs={overs}
          onResume={handleResume}
          onRestart={handleRestart}
        />
      )}

      {/* Result overlay */}
      {status !== "playing" && !paused && (
        <MatchResult
          status={status === "won" ? "won" : "complete"}
          runs={runs}
          wickets={wickets}
          overs={overs}
          target={target}
          onPlayAgain={handleRestart}
        />
      )}

      {/* Shot controls */}
      <div className="absolute inset-x-0 bottom-0 z-30">
        <MatchControls
          onShot={handleShot}
          disabled={status !== "playing" || paused}
        />
      </div>
    </div>
  );
}
