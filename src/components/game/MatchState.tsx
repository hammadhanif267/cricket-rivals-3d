"use client";

import { useCallback, useMemo, useState } from "react";

export type BallResult = {
  runs: number;
  wicket: boolean;
  label: string;
};

export type MatchStatus = "playing" | "won" | "complete";

export type MatchState = {
  runs: number;
  wickets: number;
  balls: number;
  overs: string;
  runRate: number;
  target: number;
  ballsRemaining: number;
  striker: string;
  nonStriker: string;
  bowler: string;
  lastBall: string;
  status: MatchStatus;
};

type UseMatchStateOptions = {
  target?: number;
  totalBalls?: number;
};

const DEFAULT_TARGET = 80;
const DEFAULT_TOTAL_BALLS = 60;

const PLAYERS = ["Hammad", "Aizal", "Rizwan", "Arslan"];

const BOWLERS = ["S. Khan", "M. Ali", "A. Shah"];

function randomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function createInitialState(target: number, totalBalls: number): MatchState {
  return {
    runs: 0,
    wickets: 0,
    balls: 0,
    overs: "0.0",
    runRate: 0,
    target,
    ballsRemaining: totalBalls,
    striker: PLAYERS[0],
    nonStriker: PLAYERS[1],
    bowler: BOWLERS[0],
    lastBall: "Ready",
    status: "playing",
  };
}

function getOvers(ballCount: number) {
  const completedOvers = Math.floor(ballCount / 6);

  const ballsInOver = ballCount % 6;

  return `${completedOvers}.${ballsInOver}`;
}

function getRunRate(runs: number, balls: number) {
  if (balls <= 0) {
    return 0;
  }

  const overs = balls / 6;

  return Number((runs / overs).toFixed(2));
}

function getBallResult(shot: string): BallResult {
  const normalizedShot = shot.toLowerCase();

  const roll = Math.random();

  /*
   * Defensive shot
   * Mostly dot balls and singles.
   */

  if (normalizedShot.includes("defend")) {
    if (roll < 0.62) {
      return {
        runs: 0,
        wicket: false,
        label: "Dot Ball",
      };
    }

    if (roll < 0.94) {
      return {
        runs: 1,
        wicket: false,
        label: "1 Run",
      };
    }

    return {
      runs: 0,
      wicket: true,
      label: "Wicket!",
    };
  }

  /*
   * Cover drive
   * Strong chance of 2/4.
   */

  if (normalizedShot.includes("cover")) {
    if (roll < 0.15) {
      return {
        runs: 0,
        wicket: true,
        label: "Caught!",
      };
    }

    if (roll < 0.34) {
      return {
        runs: 1,
        wicket: false,
        label: "1 Run",
      };
    }

    if (roll < 0.58) {
      return {
        runs: 2,
        wicket: false,
        label: "2 Runs",
      };
    }

    if (roll < 0.9) {
      return {
        runs: 4,
        wicket: false,
        label: "FOUR!",
      };
    }

    return {
      runs: 6,
      wicket: false,
      label: "SIX!",
    };
  }

  /*
   * Straight drive
   * Balanced attacking shot.
   */

  if (normalizedShot.includes("straight")) {
    if (roll < 0.1) {
      return {
        runs: 0,
        wicket: true,
        label: "Bowled!",
      };
    }

    if (roll < 0.27) {
      return {
        runs: 1,
        wicket: false,
        label: "1 Run",
      };
    }

    if (roll < 0.45) {
      return {
        runs: 2,
        wicket: false,
        label: "2 Runs",
      };
    }

    if (roll < 0.82) {
      return {
        runs: 4,
        wicket: false,
        label: "FOUR!",
      };
    }

    return {
      runs: 6,
      wicket: false,
      label: "SIX!",
    };
  }

  /*
   * Pull shot
   * Highest reward but slightly higher wicket risk.
   */

  if (normalizedShot.includes("pull")) {
    if (roll < 0.2) {
      return {
        runs: 0,
        wicket: true,
        label: "Caught!",
      };
    }

    if (roll < 0.32) {
      return {
        runs: 1,
        wicket: false,
        label: "1 Run",
      };
    }

    if (roll < 0.48) {
      return {
        runs: 2,
        wicket: false,
        label: "2 Runs",
      };
    }

    if (roll < 0.72) {
      return {
        runs: 4,
        wicket: false,
        label: "FOUR!",
      };
    }

    return {
      runs: 6,
      wicket: false,
      label: "SIX!",
    };
  }

  return {
    runs: 0,
    wicket: false,
    label: "Dot Ball",
  };
}

export function useMatchState(options: UseMatchStateOptions = {}) {
  const target = options.target ?? DEFAULT_TARGET;

  const totalBalls = options.totalBalls ?? DEFAULT_TOTAL_BALLS;

  const [state, setState] = useState<MatchState>(() =>
    createInitialState(target, totalBalls),
  );

  const playShot = useCallback(
    (shot: string) => {
      setState((current) => {
        if (current.status !== "playing") {
          return current;
        }

        if (current.balls >= totalBalls) {
          return current;
        }

        const result = getBallResult(shot);

        const nextBalls = current.balls + 1;

        const nextRuns = current.runs + result.runs;

        const nextWickets = current.wickets + (result.wicket ? 1 : 0);

        const nextBallsRemaining = Math.max(totalBalls - nextBalls, 0);

        const nextOvers = getOvers(nextBalls);

        const nextRunRate = getRunRate(nextRuns, nextBalls);

        /*
         * Target reached.
         */

        if (nextRuns >= current.target) {
          return {
            ...current,
            runs: nextRuns,
            wickets: nextWickets,
            balls: nextBalls,
            overs: nextOvers,
            runRate: nextRunRate,
            ballsRemaining: nextBallsRemaining,
            lastBall: result.label,
            status: "won",
          };
        }

        /*
         * All wickets lost.
         */

        if (nextWickets >= 10) {
          return {
            ...current,
            runs: nextRuns,
            wickets: nextWickets,
            balls: nextBalls,
            overs: nextOvers,
            runRate: nextRunRate,
            ballsRemaining: nextBallsRemaining,
            lastBall: result.label,
            status: "complete",
          };
        }

        /*
         * Innings finished.
         */

        if (nextBalls >= totalBalls) {
          return {
            ...current,
            runs: nextRuns,
            wickets: nextWickets,
            balls: nextBalls,
            overs: nextOvers,
            runRate: nextRunRate,
            ballsRemaining: 0,
            lastBall: result.label,
            status: "complete",
          };
        }

        /*
         * Strike rotation.
         *
         * Odd runs change striker.
         */

        let nextStriker = current.striker;

        let nextNonStriker = current.nonStriker;

        if (result.runs % 2 === 1) {
          nextStriker = current.nonStriker;

          nextNonStriker = current.striker;
        }

        /*
         * End of over changes strike.
         */

        if (nextBalls % 6 === 0) {
          const temporary = nextStriker;

          nextStriker = nextNonStriker;

          nextNonStriker = temporary;
        }

        /*
         * If wicket falls, bring in
         * another placeholder batsman.
         */

        if (result.wicket) {
          const availablePlayers = PLAYERS.filter(
            (player) => player !== nextStriker && player !== nextNonStriker,
          );

          const replacement = randomItem(availablePlayers);

          nextStriker = replacement;
        }

        /*
         * Occasionally rotate bowler
         * after an over.
         */

        let nextBowler = current.bowler;

        if (nextBalls % 6 === 0) {
          const availableBowlers = BOWLERS.filter(
            (player) => player !== current.bowler,
          );

          nextBowler = randomItem(availableBowlers);
        }

        return {
          ...current,
          runs: nextRuns,
          wickets: nextWickets,
          balls: nextBalls,
          overs: nextOvers,
          runRate: nextRunRate,
          ballsRemaining: nextBallsRemaining,
          striker: nextStriker,
          nonStriker: nextNonStriker,
          bowler: nextBowler,
          lastBall: result.label,
          status: "playing",
        };
      });
    },
    [totalBalls],
  );

  const resetMatch = useCallback(() => {
    setState(createInitialState(target, totalBalls));
  }, [target, totalBalls]);

  const requiredRuns = useMemo(
    () => Math.max(state.target - state.runs, 0),
    [state.target, state.runs],
  );

  const requiredRunRate = useMemo(() => {
    if (state.ballsRemaining <= 0 || requiredRuns <= 0) {
      return 0;
    }

    const remainingOvers = state.ballsRemaining / 6;

    return Number((requiredRuns / remainingOvers).toFixed(2));
  }, [state.ballsRemaining, requiredRuns]);

  return {
    state,
    playShot,
    resetMatch,
    requiredRuns,
    requiredRunRate,
  };
}
