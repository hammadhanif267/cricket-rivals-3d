"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
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
      {/* Outer grass */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.12, 0]}
        receiveShadow
      >
        <circleGeometry args={[15.5, 128]} />
        <meshStandardMaterial color="#0b3218" roughness={0.96} />
      </mesh>

      {/* Main outfield */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.055, 0]}
        receiveShadow
      >
        <circleGeometry args={[14.25, 128]} />
        <meshStandardMaterial color="#185b29" roughness={0.92} />
      </mesh>

      {/* Mowing rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.035, 0]}>
        <ringGeometry args={[9.2, 14.25, 128]} />
        <meshStandardMaterial color="#1c662e" roughness={0.93} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]}>
        <ringGeometry args={[5.8, 9.2, 128]} />
        <meshStandardMaterial color="#185a29" roughness={0.93} />
      </mesh>

      {/* Pitch */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[3.2, 0.1, 20]} />
        <meshStandardMaterial color="#a98451" roughness={0.88} />
      </mesh>

      <mesh position={[0, 0.078, 0]} receiveShadow>
        <boxGeometry args={[2.72, 0.025, 19.65]} />
        <meshStandardMaterial color="#c5a66e" roughness={0.82} />
      </mesh>

      {/* Pitch center */}
      <mesh position={[0, 0.094, 0]}>
        <boxGeometry args={[1.9, 0.012, 19.2]} />
        <meshStandardMaterial color="#d3b77e" roughness={0.8} />
      </mesh>

      {/* Pitch wear */}
      <mesh position={[0, 0.101, 0]}>
        <boxGeometry args={[1.1, 0.008, 18.6]} />
        <meshStandardMaterial color="#c4a66c" roughness={0.88} />
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
      <meshStandardMaterial color="#f5ead2" roughness={0.7} />
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
        <torusGeometry args={[13.9, 0.075, 10, 160]} />
        <meshStandardMaterial color="#e6e6df" roughness={0.3} metalness={0.1} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.095, 0]}>
        <torusGeometry args={[13.65, 0.026, 8, 160]} />
        <meshStandardMaterial
          color="#9cff00"
          emissive="#5f9000"
          emissiveIntensity={0.65}
          roughness={0.3}
        />
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
  const crowdColors = ["#4b5550", "#303a35", "#5a625d", "#252e2a", "#39433e"];

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Main stand body */}
      <mesh castShadow>
        <boxGeometry args={[19, 2.7, 3.6]} />
        <meshStandardMaterial
          color="#0b1210"
          roughness={0.82}
          metalness={0.18}
        />
      </mesh>

      {/* Seating levels */}
      <mesh position={[0, 1.55, -0.1]}>
        <boxGeometry args={[19.4, 0.22, 3.8]} />
        <meshStandardMaterial color="#1c2722" roughness={0.7} />
      </mesh>

      <mesh position={[0, 2.25, -0.15]}>
        <boxGeometry args={[19.2, 0.2, 3.55]} />
        <meshStandardMaterial color="#141d19" roughness={0.72} />
      </mesh>

      {/* Crowd */}
      {Array.from({ length: 25 }).map((_, index) => (
        <mesh
          key={index}
          position={[-8.9 + index * 0.74, 1.0 + (index % 3) * 0.1, 1.25]}
        >
          <boxGeometry args={[0.32, 0.42 + (index % 2) * 0.1, 0.3]} />
          <meshStandardMaterial
            color={crowdColors[index % crowdColors.length]}
            roughness={0.92}
          />
        </mesh>
      ))}

      {/* Green stadium trim */}
      <mesh position={[0, 2.48, 0.15]}>
        <boxGeometry args={[19.5, 0.1, 3.7]} />
        <meshStandardMaterial
          color="#15291b"
          emissive="#163d1d"
          emissiveIntensity={0.22}
          roughness={0.72}
        />
      </mesh>

      {/* Front railing */}
      <mesh position={[0, 0.1, 1.88]}>
        <boxGeometry args={[19, 0.12, 0.08]} />
        <meshStandardMaterial
          color="#56615b"
          metalness={0.65}
          roughness={0.38}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   FLOODLIGHT TOWER
========================================================= */

function StadiumLightTower({
  position,
  rotation = 0,
}: {
  position: [number, number, number];
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Tower */}
      <mesh castShadow>
        <cylinderGeometry args={[0.13, 0.22, 9, 10]} />
        <meshStandardMaterial
          color="#272f2b"
          metalness={0.78}
          roughness={0.32}
        />
      </mesh>

      {/* Top support */}
      <mesh position={[0, 4.35, 0]}>
        <boxGeometry args={[2.5, 0.18, 0.5]} />
        <meshStandardMaterial
          color="#353c38"
          metalness={0.65}
          roughness={0.35}
        />
      </mesh>

      {/* Light bank */}
      <mesh position={[0, 4.62, 0]}>
        <boxGeometry args={[2.2, 0.5, 0.48]} />
        <meshStandardMaterial
          color="#e8eadf"
          emissive="#fff5ce"
          emissiveIntensity={2.5}
          roughness={0.2}
        />
      </mesh>

      {/* Light source */}
      <pointLight
        position={[0, 4.05, 0]}
        intensity={22}
        distance={28}
        decay={2}
        color="#fff2d0"
      />
    </group>
  );
}

/* =========================================================
   STADIUM ROOF
========================================================= */

function StadiumRoof() {
  return (
    <group>
      {/* Main roof ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 8.5, 0]}>
        <torusGeometry args={[17.2, 0.3, 12, 128]} />
        <meshStandardMaterial
          color="#101714"
          roughness={0.68}
          metalness={0.4}
        />
      </mesh>

      {/* Green illuminated ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 8.35, 0]}>
        <torusGeometry args={[16.55, 0.055, 8, 128]} />
        <meshStandardMaterial
          color="#9cff00"
          emissive="#6c9c00"
          emissiveIntensity={0.4}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   STADIUM BACKGROUND
========================================================= */

function StadiumBackdrop() {
  return (
    <group>
      {/* Dark sky */}
      <mesh position={[0, 7, -25]}>
        <planeGeometry args={[70, 30]} />
        <meshBasicMaterial color="#020504" side={THREE.DoubleSide} />
      </mesh>

      {/* Horizon glow */}
      <mesh position={[0, 4.5, -23]}>
        <planeGeometry args={[48, 10]} />
        <meshBasicMaterial
          color="#18301e"
          transparent
          opacity={0.34}
          depthWrite={false}
        />
      </mesh>

      {/* Distant stadium glow */}
      <mesh position={[0, 5.5, -21]}>
        <planeGeometry args={[34, 6]} />
        <meshBasicMaterial
          color="#29482d"
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   STADIUM ATMOSPHERE
========================================================= */

function StadiumAtmosphere() {
  return (
    <>
      {/* Sky */}
      <color attach="background" args={["#020504"]} />

      <fog attach="fog" args={["#020504", 22, 55]} />

      {/* Base ambient */}
      <ambientLight intensity={0.72} />

      {/* Main directional stadium light */}
      <directionalLight
        position={[8, 15, 7]}
        intensity={2.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={60}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />

      {/* Front fill */}
      <pointLight
        position={[0, 5, 9]}
        intensity={12}
        distance={25}
        decay={2}
        color="#fff2d5"
      />

      {/* Green field fill */}
      <pointLight
        position={[0, 6, 0]}
        intensity={8}
        distance={28}
        decay={2}
        color="#8fd34b"
      />

      {/* Side fill */}
      <pointLight
        position={[-9, 6, 4]}
        intensity={8}
        distance={22}
        decay={2}
        color="#d9ead0"
      />

      {/* Small stadium particles */}
      <Sparkles
        count={70}
        scale={[30, 12, 30]}
        size={0.9}
        speed={0.08}
        opacity={0.18}
      />
    </>
  );
}

/* =========================================================
   STADIUM CONTENT
========================================================= */

function StadiumContents({ children }: { children?: ReactNode }) {
  return (
    <>
      <CricketField />

      <BoundaryRope />

      {/* Wickets */}
      <StadiumWicket position={[0, 0, 7.55]} />
      <StadiumWicket position={[0, 0, -7.55]} />

      {/* Main stands */}
      <StadiumStand position={[0, 1.5, -15.4]} />

      <StadiumStand position={[0, 1.5, 15.4]} rotation={[0, Math.PI, 0]} />

      {/* Side stands */}
      <StadiumStand
        position={[-15.5, 1.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.72}
      />

      <StadiumStand
        position={[15.5, 1.5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.72}
      />

      {/* Floodlights */}
      <StadiumLightTower position={[-11.5, 0, -10.5]} />

      <StadiumLightTower position={[11.5, 0, -10.5]} />

      <StadiumLightTower position={[-11.5, 0, 10.5]} />

      <StadiumLightTower position={[11.5, 0, 10.5]} />

      <StadiumRoof />

      <StadiumBackdrop />

      <StadiumAtmosphere />

      {/* Camera + actors */}
      {children}
    </>
  );
}

/* =========================================================
   WICKET
========================================================= */

function StadiumWicket({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {[-0.19, 0, 0.19].map((x) => (
        <mesh key={x} position={[x, 0.66, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.052, 1.32, 12]} />
          <meshStandardMaterial color="#ead5a2" roughness={0.55} />
        </mesh>
      ))}

      <mesh position={[-0.095, 1.33, 0]} castShadow>
        <boxGeometry args={[0.22, 0.055, 0.07]} />
        <meshStandardMaterial color="#f0dcae" roughness={0.5} />
      </mesh>

      <mesh position={[0.095, 1.33, 0]} castShadow>
        <boxGeometry args={[0.22, 0.055, 0.07]} />
        <meshStandardMaterial color="#f0dcae" roughness={0.5} />
      </mesh>
    </group>
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
        dpr={[1, 1.35]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
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

          gl.toneMappingExposure = 1.35;
        }}
      >
        <StadiumContents>{children}</StadiumContents>
      </Canvas>
    </div>
  );
}
