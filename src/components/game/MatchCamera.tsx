"use client";

import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

type CameraMode = "batting" | "bowling" | "field" | "replay";

type MatchCameraProps = {
  mode?: CameraMode;
  target?: [number, number, number];
  enabled?: boolean;
};

type CameraConfig = {
  position: [number, number, number];
  target: [number, number, number];
};

const CAMERA_CONFIGS: Record<CameraMode, CameraConfig> = {
  /*
   * Main gameplay camera.
   *
   * The camera stays relatively close to the striker so
   * the pitch and players feel like an actual cricket game.
   */
  batting: {
    position: [4.6, 2.65, 6.9],
    target: [0, 1.0, 0.15],
  },

  /*
   * Bowling camera.
   *
   * Used for a slightly wider view from the bowler's end.
   */
  bowling: {
    position: [-4.4, 2.9, -7.2],
    target: [0, 0.95, 0],
  },

  /*
   * Field camera.
   *
   * Wider cinematic angle for boundaries.
   */
  field: {
    position: [7.2, 4.7, 8.6],
    target: [0, 0.7, -1.2],
  },

  /*
   * Replay camera.
   *
   * Slightly elevated cinematic angle.
   */
  replay: {
    position: [6.0, 3.8, 6.8],
    target: [0, 0.9, -0.8],
  },
};

export default function MatchCamera({
  mode = "batting",
  target,
  enabled = true,
}: MatchCameraProps) {
  const { camera } = useThree();

  const desiredPosition = useRef(
    new THREE.Vector3(...CAMERA_CONFIGS.batting.position),
  );

  const desiredTarget = useRef(
    new THREE.Vector3(...CAMERA_CONFIGS.batting.target),
  );

  const currentTarget = useRef(
    new THREE.Vector3(...CAMERA_CONFIGS.batting.target),
  );

  const initialized = useRef(false);

  useEffect(() => {
    const config = CAMERA_CONFIGS[mode];

    desiredPosition.current.set(
      config.position[0],
      config.position[1],
      config.position[2],
    );

    const nextTarget = target ?? config.target;

    desiredTarget.current.set(nextTarget[0], nextTarget[1], nextTarget[2]);

    /*
     * On the first camera update, immediately establish
     * the correct gameplay composition.
     */
    if (!initialized.current) {
      camera.position.set(
        config.position[0],
        config.position[1],
        config.position[2],
      );

      currentTarget.current.set(nextTarget[0], nextTarget[1], nextTarget[2]);

      camera.lookAt(currentTarget.current);

      initialized.current = true;
    }
  }, [camera, mode, target]);

  useFrame((_, delta) => {
    if (!enabled) return;

    /*
     * Frame-rate independent smoothing.
     *
     * This keeps camera transitions smooth on both
     * desktop and mobile devices.
     */
    const smooth = 1 - Math.exp(-delta * 5.5);

    const nextX = THREE.MathUtils.lerp(
      camera.position.x,
      desiredPosition.current.x,
      smooth,
    );

    const nextY = THREE.MathUtils.lerp(
      camera.position.y,
      desiredPosition.current.y,
      smooth,
    );

    const nextZ = THREE.MathUtils.lerp(
      camera.position.z,
      desiredPosition.current.z,
      smooth,
    );

    camera.position.set(nextX, nextY, nextZ);

    const targetX = THREE.MathUtils.lerp(
      currentTarget.current.x,
      desiredTarget.current.x,
      smooth,
    );

    const targetY = THREE.MathUtils.lerp(
      currentTarget.current.y,
      desiredTarget.current.y,
      smooth,
    );

    const targetZ = THREE.MathUtils.lerp(
      currentTarget.current.z,
      desiredTarget.current.z,
      smooth,
    );

    currentTarget.current.set(targetX, targetY, targetZ);

    camera.lookAt(currentTarget.current);
  });

  return null;
}
