"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { type ReactNode } from "react";

type StadiumSceneProps = {
  children?: ReactNode;
};

/* =========================================================
   CRICKET FIELD
========================================================= */

function CricketField() {
  return (
    <group>
      {/* Main field */}

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.06, 0]}
        receiveShadow
      >
        <circleGeometry args={[14.5, 96]} />

        <meshStandardMaterial color="#12391e" roughness={0.96} />
      </mesh>

      {/* Inner grass */}

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.025, 0]}
        receiveShadow
      >
        <circleGeometry args={[11.7, 96]} />

        <meshStandardMaterial color="#1e5b2b" roughness={0.91} />
      </mesh>

      {/* Outfield mowing ring */}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.018, 0]}>
        <ringGeometry args={[8.8, 11.7, 96]} />

        <meshStandardMaterial color="#225f2e" roughness={0.94} />
      </mesh>

      {/* Pitch base */}

      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[3.15, 0.09, 20]} />

        <meshStandardMaterial color="#b6945d" roughness={0.9} />
      </mesh>

      {/* Pitch center */}

      <mesh position={[0, 0.075, 0]} receiveShadow>
        <boxGeometry args={[2.68, 0.025, 19.6]} />

        <meshStandardMaterial color="#c9aa70" roughness={0.84} />
      </mesh>

      {/* Pitch subtle center strip */}

      <mesh position={[0, 0.092, 0]}>
        <boxGeometry args={[1.85, 0.012, 19.2]} />

        <meshStandardMaterial color="#d1b47c" roughness={0.82} />
      </mesh>

      {/* Creases */}

      <PitchLine position={[0, 0.115, 7.45]} />
      <PitchLine position={[0, 0.115, -7.45]} />

      <PitchLine position={[-1.05, 0.115, 7.05]} width={0.07} length={1.05} />

      <PitchLine position={[1.05, 0.115, 7.05]} width={0.07} length={1.05} />

      <PitchLine position={[-1.05, 0.115, -7.05]} width={0.07} length={1.05} />

      <PitchLine position={[1.05, 0.115, -7.05]} width={0.07} length={1.05} />
    </group>
  );
}

function PitchLine({
  position,
  width = 3.15,
  length = 0.07,
}: {
  position: [number, number, number];
  width?: number;
  length?: number;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={[width, 0.018, length]} />

      <meshStandardMaterial color="#f5ead2" roughness={0.72} />
    </mesh>
  );
}

/* =========================================================
   BOUNDARY
========================================================= */

function BoundaryRope() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
        <torusGeometry args={[13.85, 0.075, 10, 128]} />

        <meshStandardMaterial
          color="#deded6"
          roughness={0.35}
          metalness={0.12}
        />
      </mesh>

      {/* Green LED-style inner rope */}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.092, 0]}>
        <torusGeometry args={[13.65, 0.024, 8, 128]} />

        <meshStandardMaterial
          color="#9cff00"
          emissive="#6a9d00"
          emissiveIntensity={0.5}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   WICKET
========================================================= */

function Wicket({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {[-0.19, 0, 0.19].map((x) => (
        <mesh key={x} castShadow position={[x, 0.66, 0]}>
          <cylinderGeometry args={[0.045, 0.052, 1.32, 12]} />

          <meshStandardMaterial color="#ead5a2" roughness={0.58} />
        </mesh>
      ))}

      <mesh castShadow position={[-0.095, 1.33, 0]}>
        <boxGeometry args={[0.22, 0.055, 0.07]} />

        <meshStandardMaterial color="#f0dcae" roughness={0.5} />
      </mesh>

      <mesh castShadow position={[0.095, 1.33, 0]}>
        <boxGeometry args={[0.22, 0.055, 0.07]} />

        <meshStandardMaterial color="#f0dcae" roughness={0.5} />
      </mesh>
    </group>
  );
}

/* =========================================================
   STADIUM STANDS
========================================================= */

function StadiumStand({
  position,
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Lower structure */}

      <mesh castShadow>
        <boxGeometry args={[18, 2.4, 3]} />

        <meshStandardMaterial
          color="#0b1210"
          roughness={0.84}
          metalness={0.15}
        />
      </mesh>

      {/* Seating levels */}

      <mesh position={[0, 1.45, -0.1]}>
        <boxGeometry args={[18.4, 0.2, 3.2]} />

        <meshStandardMaterial color="#202a26" roughness={0.72} />
      </mesh>

      <mesh position={[0, 2.15, -0.2]}>
        <boxGeometry args={[18.2, 0.18, 3]} />

        <meshStandardMaterial color="#151e1b" roughness={0.75} />
      </mesh>

      {/* Crowd blocks */}

      {Array.from({ length: 22 }).map((_, index) => {
        const crowdColors = ["#353d39", "#454d49", "#252d2a", "#59605c"];

        return (
          <mesh
            key={index}
            position={[-8.2 + index * 0.78, 1.05 + (index % 3) * 0.08, 1.1]}
          >
            <boxGeometry args={[0.38, 0.48 + (index % 2) * 0.08, 0.34]} />

            <meshStandardMaterial
              color={crowdColors[index % crowdColors.length]}
              roughness={0.9}
            />
          </mesh>
        );
      })}

      {/* Green accent band */}

      <mesh position={[0, 2.42, 0.15]}>
        <boxGeometry args={[18.5, 0.08, 3.1]} />

        <meshStandardMaterial
          color="#17251c"
          emissive="#182d1b"
          emissiveIntensity={0.18}
          roughness={0.75}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   STADIUM LIGHT TOWERS
========================================================= */

function StadiumLightTower({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      {/* Tower */}

      <mesh castShadow>
        <cylinderGeometry args={[0.14, 0.2, 8.5, 10]} />

        <meshStandardMaterial
          color="#272d2a"
          metalness={0.72}
          roughness={0.34}
        />
      </mesh>

      {/* Light panel */}

      <mesh position={[0, 4.45, 0]}>
        <boxGeometry args={[2.1, 0.42, 0.45]} />

        <meshStandardMaterial
          color="#e8eadf"
          emissive="#fff6c9"
          emissiveIntensity={2.2}
          roughness={0.25}
        />
      </mesh>

      {/* Small glow */}

      <pointLight
        position={[0, 4.15, 0]}
        intensity={42}
        distance={27}
        decay={2}
        color="#fff4d2"
        castShadow
      />
    </group>
  );
}

/* =========================================================
   STADIUM ROOF / RING
========================================================= */

function StadiumRoofRing() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 8.2, 0]}>
        <torusGeometry args={[17, 0.24, 10, 96]} />

        <meshStandardMaterial
          color="#101714"
          roughness={0.72}
          metalness={0.35}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 8.08, 0]}>
        <torusGeometry args={[16.4, 0.055, 8, 96]} />

        <meshStandardMaterial
          color="#9cff00"
          emissive="#5f8f00"
          emissiveIntensity={0.3}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   ATMOSPHERE
========================================================= */

function StadiumAtmosphere() {
  return (
    <>
      <color attach="background" args={["#020504"]} />

      <fog attach="fog" args={["#020504", 19, 47]} />

      {/* Main ambient */}

      <ambientLight intensity={0.62} />

      {/* Main stadium directional light */}

      <directionalLight
        position={[7, 13, 5]}
        intensity={2.35}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={55}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
      />

      {/* Green field fill */}

      <pointLight
        position={[0, 7, 0]}
        intensity={18}
        distance={32}
        color="#9cff00"
      />

      {/* Warm player fill */}

      <pointLight
        position={[2, 4, 5]}
        intensity={9}
        distance={17}
        color="#fff1d0"
      />

      <Environment preset="night" />

      <Sparkles
        count={95}
        scale={[28, 10, 28]}
        size={1.05}
        speed={0.12}
        opacity={0.22}
      />
    </>
  );
}

/* =========================================================
   CINEMATIC BACKGROUND
========================================================= */

function StadiumBackdrop() {
  return (
    <group>
      {/* Far background */}

      <mesh position={[0, 5, -22]}>
        <planeGeometry args={[55, 20]} />

        <meshBasicMaterial
          color="#020403"
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </mesh>

      {/* Stadium horizon glow */}

      <mesh position={[0, 4, -20]}>
        <planeGeometry args={[38, 8]} />

        <meshBasicMaterial
          color="#142519"
          transparent
          opacity={0.32}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   COMPLETE STADIUM CONTENT
========================================================= */

function StadiumContents({ children }: { children?: ReactNode }) {
  return (
    <>
      <CricketField />

      <BoundaryRope />

      {/* Wickets */}

      <Wicket position={[0, 0, 7.55]} />
      <Wicket position={[0, 0, -7.55]} />

      {/* Stands */}

      <StadiumStand position={[0, 1.5, -15.3]} rotation={[0, 0, 0]} />

      <StadiumStand position={[0, 1.5, 15.3]} rotation={[0, Math.PI, 0]} />

      <StadiumStand
        position={[-15.4, 1.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.72}
      />

      <StadiumStand
        position={[15.4, 1.5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.72}
      />

      {/* Lighting */}

      <StadiumLightTower position={[-11.5, 0, -10.5]} />
      <StadiumLightTower position={[11.5, 0, -10.5]} />
      <StadiumLightTower position={[-11.5, 0, 10.5]} />
      <StadiumLightTower position={[11.5, 0, 10.5]} />

      <StadiumRoofRing />

      <StadiumBackdrop />

      <StadiumAtmosphere />

      {/* Game actors / camera */}

      {children}
    </>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function StadiumScene({ children }: StadiumSceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
        camera={{
          position: [4.6, 2.65, 6.9],
          fov: 48,
          near: 0.1,
          far: 100,
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={[4.6, 2.65, 6.9]}
          fov={48}
          near={0.1}
          far={100}
        />

        <StadiumContents>{children}</StadiumContents>
      </Canvas>
    </div>
  );
}
