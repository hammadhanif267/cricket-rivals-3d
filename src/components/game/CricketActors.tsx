"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

type Position = [number, number, number];

type ActorProps = {
  position?: Position;
};

/* =========================================================
   CRICKET BAT
========================================================= */

function CricketBat({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  position?: Position;
  rotation?: Position;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Handle */}
      <mesh castShadow position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 1.15, 12]} />
        <meshStandardMaterial
          color="#17120d"
          roughness={0.55}
          metalness={0.15}
        />
      </mesh>

      {/* Grip */}
      <mesh castShadow position={[0, 1.22, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.42, 12]} />
        <meshStandardMaterial color="#252525" roughness={0.7} />
      </mesh>

      {/* Blade */}
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[0.58, 1.65, 0.16]} />
        <meshStandardMaterial
          color="#c79b5b"
          roughness={0.68}
          metalness={0.03}
        />
      </mesh>

      {/* Bat face */}
      <mesh position={[0, 0.08, -0.085]}>
        <boxGeometry args={[0.47, 1.45, 0.025]} />
        <meshStandardMaterial color="#e1bd7d" roughness={0.58} />
      </mesh>

      {/* Bat toe */}
      <mesh castShadow position={[0, -0.78, 0]}>
        <boxGeometry args={[0.62, 0.12, 0.19]} />
        <meshStandardMaterial color="#b8894d" roughness={0.72} />
      </mesh>
    </group>
  );
}

/* =========================================================
   HELMET
========================================================= */

function CricketHelmet({ position = [0, 0, 0] }: ActorProps) {
  return (
    <group position={position}>
      {/* Main helmet */}
      <mesh castShadow>
        <sphereGeometry
          args={[0.43, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.7]}
        />

        <meshStandardMaterial
          color="#101513"
          roughness={0.38}
          metalness={0.3}
        />
      </mesh>

      {/* Helmet lower rim */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
        <torusGeometry args={[0.36, 0.045, 8, 24]} />

        <meshStandardMaterial
          color="#1e2522"
          roughness={0.42}
          metalness={0.25}
        />
      </mesh>

      {/* Face guard */}
      <group position={[0, -0.02, 0.38]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.28, 0.025, 8, 20, Math.PI]} />

          <meshStandardMaterial
            color="#555d59"
            roughness={0.35}
            metalness={0.75}
          />
        </mesh>

        <mesh position={[-0.18, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.55, 8]} />

          <meshStandardMaterial
            color="#606864"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        <mesh position={[0.18, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.55, 8]} />

          <meshStandardMaterial
            color="#606864"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      </group>
    </group>
  );
}

/* =========================================================
   BODY MATERIALS
========================================================= */

const jerseyMaterial = new THREE.MeshStandardMaterial({
  color: "#edf1ee",
  roughness: 0.72,
});

const darkJerseyMaterial = new THREE.MeshStandardMaterial({
  color: "#101817",
  roughness: 0.68,
});

const skinMaterial = new THREE.MeshStandardMaterial({
  color: "#9b6849",
  roughness: 0.82,
});

const trouserMaterial = new THREE.MeshStandardMaterial({
  color: "#e4e8e4",
  roughness: 0.82,
});

const shoeMaterial = new THREE.MeshStandardMaterial({
  color: "#121615",
  roughness: 0.45,
  metalness: 0.12,
});

/* =========================================================
   BATSMAN
========================================================= */

export function Batsman({ position = [0, 0, 0] }: ActorProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    /*
     * Very subtle idle movement.
     * Keeps the player alive without looking robotic.
     */
    const breathing = Math.sin(state.clock.elapsedTime * 1.8) * 0.008;

    group.current.position.y = position[1] + breathing;
  });

  return (
    <group ref={group} position={position} rotation={[0, Math.PI, 0]}>
      {/* =========================
          LEGS
      ========================== */}

      <mesh
        castShadow
        position={[-0.17, 0.72, 0]}
        rotation={[0.05, 0, -0.04]}
        material={trouserMaterial}
      >
        <capsuleGeometry args={[0.13, 0.72, 6, 12]} />
      </mesh>

      <mesh
        castShadow
        position={[0.17, 0.72, -0.05]}
        rotation={[-0.04, 0, 0.05]}
        material={trouserMaterial}
      >
        <capsuleGeometry args={[0.13, 0.72, 6, 12]} />
      </mesh>

      {/* =========================
          SHOES
      ========================== */}

      <mesh castShadow position={[-0.2, 0.24, 0.1]} material={shoeMaterial}>
        <capsuleGeometry args={[0.14, 0.28, 6, 12]} />
      </mesh>

      <mesh castShadow position={[0.2, 0.24, -0.02]} material={shoeMaterial}>
        <capsuleGeometry args={[0.14, 0.28, 6, 12]} />
      </mesh>

      {/* =========================
          TORSO
      ========================== */}

      <mesh castShadow position={[0, 1.42, 0]} material={jerseyMaterial}>
        <capsuleGeometry args={[0.34, 0.62, 8, 16]} />
      </mesh>

      {/* Jersey center detail */}
      <mesh position={[0, 1.43, -0.335]}>
        <boxGeometry args={[0.055, 0.48, 0.018]} />

        <meshStandardMaterial
          color="#9cff00"
          emissive="#406d00"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* =========================
          HEAD
      ========================== */}

      <mesh castShadow position={[0, 2.18, 0]} material={skinMaterial}>
        <sphereGeometry args={[0.29, 20, 16]} />
      </mesh>

      <CricketHelmet position={[0, 2.22, 0]} />

      {/* =========================
          FRONT ARM
      ========================== */}

      <group position={[0.28, 1.67, -0.02]} rotation={[0.15, 0, -0.35]}>
        <mesh castShadow position={[0, -0.28, 0]} material={jerseyMaterial}>
          <capsuleGeometry args={[0.11, 0.48, 6, 12]} />
        </mesh>

        <mesh castShadow position={[0, -0.62, 0]} material={skinMaterial}>
          <sphereGeometry args={[0.115, 14, 10]} />
        </mesh>
      </group>

      {/* =========================
          BACK ARM
      ========================== */}

      <group position={[-0.28, 1.67, 0.02]} rotation={[0.18, 0, 0.32]}>
        <mesh castShadow position={[0, -0.28, 0]} material={jerseyMaterial}>
          <capsuleGeometry args={[0.11, 0.48, 6, 12]} />
        </mesh>

        <mesh castShadow position={[0, -0.62, 0]} material={skinMaterial}>
          <sphereGeometry args={[0.115, 14, 10]} />
        </mesh>
      </group>

      {/* =========================
          BAT
      ========================== */}

      <group
        position={[0.38, 0.88, -0.02]}
        rotation={[
          THREE.MathUtils.degToRad(-12),
          THREE.MathUtils.degToRad(-4),
          THREE.MathUtils.degToRad(-18),
        ]}
      >
        <CricketBat />
      </group>
    </group>
  );
}

/* =========================================================
   BOWLER
========================================================= */

export function Bowler({ position = [0, 0, -5] }: ActorProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    const idle = Math.sin(state.clock.elapsedTime * 1.4) * 0.018;

    group.current.rotation.z = idle;
  });

  return (
    <group ref={group} position={position} rotation={[0, 0, 0]}>
      {/* Legs */}

      <mesh
        castShadow
        position={[-0.18, 0.72, 0]}
        material={darkJerseyMaterial}
      >
        <capsuleGeometry args={[0.14, 0.75, 6, 12]} />
      </mesh>

      <mesh
        castShadow
        position={[0.18, 0.72, -0.08]}
        material={darkJerseyMaterial}
      >
        <capsuleGeometry args={[0.14, 0.75, 6, 12]} />
      </mesh>

      {/* Shoes */}

      <mesh castShadow position={[-0.18, 0.24, 0]} material={shoeMaterial}>
        <capsuleGeometry args={[0.14, 0.28, 6, 12]} />
      </mesh>

      <mesh castShadow position={[0.18, 0.24, -0.06]} material={shoeMaterial}>
        <capsuleGeometry args={[0.14, 0.28, 6, 12]} />
      </mesh>

      {/* Torso */}

      <mesh castShadow position={[0, 1.45, 0]} material={darkJerseyMaterial}>
        <capsuleGeometry args={[0.35, 0.65, 8, 16]} />
      </mesh>

      {/* Jersey accent */}

      <mesh position={[0, 1.46, 0.34]}>
        <boxGeometry args={[0.06, 0.5, 0.02]} />

        <meshStandardMaterial
          color="#9cff00"
          emissive="#406d00"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Head */}

      <mesh castShadow position={[0, 2.2, 0]} material={skinMaterial}>
        <sphereGeometry args={[0.29, 20, 16]} />
      </mesh>

      {/* Bowling arm */}

      <group position={[0.3, 1.72, 0]} rotation={[0, 0, -0.8]}>
        <mesh castShadow position={[0, 0.28, 0]} material={darkJerseyMaterial}>
          <capsuleGeometry args={[0.11, 0.5, 6, 12]} />
        </mesh>

        <mesh castShadow position={[0, 0.65, 0]} material={skinMaterial}>
          <sphereGeometry args={[0.115, 14, 10]} />
        </mesh>
      </group>

      {/* Support arm */}

      <group position={[-0.28, 1.65, 0]} rotation={[0, 0, 0.3]}>
        <mesh castShadow position={[0, -0.27, 0]} material={darkJerseyMaterial}>
          <capsuleGeometry args={[0.11, 0.5, 6, 12]} />
        </mesh>

        <mesh castShadow position={[0, -0.6, 0]} material={skinMaterial}>
          <sphereGeometry args={[0.115, 14, 10]} />
        </mesh>
      </group>
    </group>
  );
}

/* =========================================================
   CRICKET BALL
========================================================= */

export function CricketBall({ position = [0, 1.2, 1.8] }: ActorProps) {
  const ball = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ball.current) return;

    ball.current.rotation.x += delta * 5;
    ball.current.rotation.z += delta * 3;
  });

  return (
    <group position={position}>
      <mesh ref={ball} castShadow>
        <sphereGeometry args={[0.105, 24, 24]} />

        <meshStandardMaterial
          color="#b51f2b"
          roughness={0.34}
          metalness={0.05}
        />
      </mesh>

      {/* Ball seam */}

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.078, 0.009, 8, 32]} />

        <meshStandardMaterial color="#f1e5d0" roughness={0.55} />
      </mesh>
    </group>
  );
}

/* =========================================================
   CRICKET STUMPS
========================================================= */

export function CricketStumps({ position = [0, 0, 0.9] }: ActorProps) {
  return (
    <group position={position}>
      {/* Stumps */}

      {[-0.2, 0, 0.2].map((x) => (
        <mesh key={x} castShadow position={[x, 0.65, 0]}>
          <cylinderGeometry args={[0.045, 0.055, 1.3, 14]} />

          <meshStandardMaterial color="#ead7a6" roughness={0.58} />
        </mesh>
      ))}

      {/* Bails */}

      <mesh castShadow position={[-0.1, 1.32, 0]}>
        <boxGeometry args={[0.22, 0.055, 0.07]} />

        <meshStandardMaterial color="#f1dfb2" roughness={0.5} />
      </mesh>

      <mesh castShadow position={[0.1, 1.32, 0]}>
        <boxGeometry args={[0.22, 0.055, 0.07]} />

        <meshStandardMaterial color="#f1dfb2" roughness={0.5} />
      </mesh>

      {/* Ground shadow / base */}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <circleGeometry args={[0.42, 32]} />

        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
