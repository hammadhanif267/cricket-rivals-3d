"use client";

type MatchHUDProps = {
  team?: string;
  opponent?: string;
  runs: number;
  wickets: number;
  overs: string;
  runRate: number;
  target: number;
  ballsRemaining: number;
  striker: string;
  nonStriker: string;
  bowler: string;
  lastBall: string;
};

function StatBox({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="truncate text-[7px] font-black uppercase tracking-[0.18em] text-white/30 sm:text-[8px]">
        {label}
      </p>

      <p
        className={[
          "mt-0.5 truncate text-sm font-black leading-none sm:text-base",
          accent ? "text-[#b8ff55]" : "text-white",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}

function PlayerRow({
  name,
  label,
  active = false,
}: {
  name: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span
        className={[
          "h-1.5 w-1.5 shrink-0 rounded-full",
          active
            ? "bg-[#9cff00] shadow-[0_0_9px_rgba(156,255,0,0.8)]"
            : "bg-white/20",
        ].join(" ")}
      />

      <div className="min-w-0">
        <p className="text-[6px] font-bold uppercase tracking-[0.16em] text-white/25 sm:text-[7px]">
          {label}
        </p>

        <p className="max-w-[90px] truncate text-[9px] font-black text-white/80 sm:max-w-[130px] sm:text-[10px]">
          {name}
        </p>
      </div>
    </div>
  );
}

export default function MatchHUD({
  team = "CR RIVALS",
  opponent = "RIVAL XI",
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
}: MatchHUDProps) {
  const requiredRuns = Math.max(target - runs, 0);

  const ballsLabel =
    ballsRemaining === 1 ? "1 BALL" : `${ballsRemaining} BALLS`;

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#030705]/78 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
        {/* Top Match Bar */}

        <div className="flex items-center justify-between border-b border-white/[0.07] px-3 py-2 sm:px-4 sm:py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[#9cff00]/20 bg-[#9cff00]/[0.07] text-[9px] font-black text-[#b8ff55] sm:h-7 sm:w-7">
              CR
            </span>

            <div className="min-w-0">
              <p className="truncate text-[8px] font-black uppercase tracking-[0.14em] text-white/75 sm:text-[9px]">
                {team}
              </p>

              <p className="truncate text-[6px] font-bold uppercase tracking-[0.12em] text-white/25 sm:text-[7px]">
                vs {opponent}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-[#9cff00]/15 bg-[#9cff00]/[0.05] px-2 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9cff00] shadow-[0_0_8px_rgba(156,255,0,0.8)]" />

            <span className="text-[6px] font-black uppercase tracking-[0.16em] text-[#b8ff55] sm:text-[7px]">
              Live
            </span>
          </div>
        </div>

        {/* Main Score */}

        <div className="grid grid-cols-[1fr_auto] items-center gap-3 px-3 py-3 sm:px-5 sm:py-4">
          <div className="min-w-0">
            <p className="text-[7px] font-black uppercase tracking-[0.25em] text-[#9cff00]/65 sm:text-[8px]">
              Current Score
            </p>

            <div className="mt-1 flex items-end gap-2">
              <span className="text-4xl font-black leading-none tracking-[-0.06em] text-white sm:text-5xl">
                {runs}
              </span>

              <span className="mb-1 text-xl font-black leading-none text-white/35 sm:text-2xl">
                /
              </span>

              <span className="mb-1 text-xl font-black leading-none text-white/65 sm:text-2xl">
                {wickets}
              </span>
            </div>

            <p className="mt-1 text-[7px] font-bold uppercase tracking-[0.16em] text-white/25 sm:text-[8px]">
              Overs {overs}
            </p>
          </div>

          {/* Target */}

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-3 py-2.5 text-right sm:px-4">
            <p className="text-[6px] font-black uppercase tracking-[0.2em] text-white/25 sm:text-[7px]">
              Target
            </p>

            <p className="mt-1 text-xl font-black leading-none text-[#b8ff55] sm:text-2xl">
              {target}
            </p>

            <p className="mt-1 text-[6px] font-bold uppercase tracking-[0.12em] text-white/25 sm:text-[7px]">
              {requiredRuns > 0 ? `${requiredRuns} to win` : "Complete"}
            </p>
          </div>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-3 border-y border-white/[0.06] bg-black/15 px-3 py-2.5 sm:px-5">
          <StatBox label="Run Rate" value={runRate.toFixed(2)} accent />

          <StatBox label="Balls Left" value={ballsLabel} />

          <StatBox label="Wickets" value={`${wickets}/10`} />
        </div>

        {/* Players */}

        <div className="grid grid-cols-[1fr_auto] items-center gap-3 px-3 py-2.5 sm:px-5 sm:py-3">
          <div className="grid min-w-0 grid-cols-2 gap-3">
            <PlayerRow name={striker} label="Striker" active />

            <PlayerRow name={nonStriker} label="Non-Striker" />
          </div>

          <div className="min-w-0 border-l border-white/[0.07] pl-3 text-right sm:pl-5">
            <p className="text-[6px] font-bold uppercase tracking-[0.16em] text-white/25 sm:text-[7px]">
              Bowler
            </p>

            <p className="mt-0.5 max-w-[100px] truncate text-[9px] font-black text-white/75 sm:max-w-[150px] sm:text-[10px]">
              {bowler}
            </p>
          </div>
        </div>

        {/* Last Ball */}

        <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#9cff00]/[0.025] px-3 py-2 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="text-[6px] font-black uppercase tracking-[0.2em] text-white/25 sm:text-[7px]">
              Last Ball
            </span>

            <span className="h-3 w-px bg-white/10" />

            <span className="max-w-[150px] truncate text-[8px] font-black uppercase tracking-[0.1em] text-[#c5ff76] sm:max-w-none sm:text-[9px]">
              {lastBall}
            </span>
          </div>

          <span className="hidden text-[6px] font-bold uppercase tracking-[0.16em] text-white/20 sm:block">
            Cricket Rivals 3D
          </span>
        </div>
      </div>
    </div>
  );
}
