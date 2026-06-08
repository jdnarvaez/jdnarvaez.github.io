import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollSignal } from './scrollSignal';
import { introSignal } from './introSignal';

/* ---------------------------------------------------------------- *
 * Palettes (kept in sync with the CSS themes)
 * ---------------------------------------------------------------- */
// Dark / neon night
const ORANGE = new THREE.Color('#ff6a1a');
const ORANGE_HOT = new THREE.Color('#ffa24d');
const OFFWHITE = new THREE.Color('#ece7dd');
const FOG_DARK = new THREE.Color('#0a0908');

// Light / "blueprint" day
const FOG_LIGHT = new THREE.Color('#efe9de');
const PAPER = new THREE.Color('#efe9de');
const INK = new THREE.Color('#3c372f'); // warm charcoal
const BURNT = new THREE.Color('#b3551c'); // burnt orange
const BURNT_DEEP = new THREE.Color('#8a3c10');

/* ---------------------------------------------------------------- *
 * Cheap value-noise + fbm (no extra deps)
 * ---------------------------------------------------------------- */
function hash(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}
function valueNoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}
function fbm(x: number, y: number): number {
  let value = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < 4; i++) {
    value += amp * valueNoise(x * freq, y * freq);
    freq *= 2;
    amp *= 0.5;
  }
  return value;
}
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

const CITY_R = 22;
const EXTENT = 66;

/* ---------------------------------------------------------------- *
 * Terrain: dot-matrix ground that rises into a ring of mountains
 * ---------------------------------------------------------------- */
function useTerrain(light: boolean) {
  return useMemo(() => {
    const step = 0.7;
    const half = EXTENT;
    const cols = Math.floor((half * 2) / step);
    const positions: number[] = [];
    const colors: number[] = [];
    const c = new THREE.Color();
    const c2 = new THREE.Color();

    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= cols; j++) {
        const x = -half + i * step;
        const z = -half + j * step;
        const r = Math.hypot(x, z);
        if (r > EXTENT) continue;

        const ground = (fbm(x * 0.04, z * 0.04) - 0.5) * 1.6;
        const mask = smoothstep(CITY_R + 2, EXTENT * 0.97, r);
        const ridge = 1 - Math.abs(2 * fbm(x * 0.045, z * 0.045) - 1);
        const detail = 1 - Math.abs(2 * fbm(x * 0.11, z * 0.11) - 1);
        const mtn = (Math.pow(ridge, 1.3) * 30 + Math.pow(detail, 2) * 6) * mask;
        const y = ground + mtn;

        positions.push(x, y, z);

        const peak = smoothstep(1.5, 18, mtn);
        const fade = 1 - smoothstep(CITY_R, EXTENT, r) * 0.4;

        if (light) {
          // ink on paper: charcoal peaks, faintly-burnt basin
          c.copy(INK).lerp(BURNT, (1 - peak) * 0.35);
          const strength = Math.min(0.85, (0.2 + peak * 0.6) * fade);
          c2.copy(PAPER).lerp(c, strength);
          colors.push(c2.r, c2.g, c2.b);
        } else {
          // glowing orange -> warm-white peaks (additive)
          c.copy(ORANGE).lerp(OFFWHITE, peak);
          const lum = (0.26 + peak * 0.72) * fade;
          colors.push(c.r * lum, c.g * lum, c.b * lum);
        }
      }
    }
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
    };
  }, [light]);
}

/* ---------------------------------------------------------------- *
 * City: vertical point-columns + a few solid towers
 * ---------------------------------------------------------------- */
function useCity(light: boolean) {
  return useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const towers: { x: number; z: number; h: number; w: number }[] = [];
    const c = new THREE.Color();
    const spacing = 2.1;
    const n = Math.floor((CITY_R * 2) / spacing);

    for (let i = -n; i <= n; i++) {
      for (let j = -n; j <= n; j++) {
        if (i % 5 === 0 || j % 6 === 0) continue;
        const bx = i * spacing + (hash(i, j) - 0.5) * 0.8;
        const bz = j * spacing + (hash(j, i) - 0.5) * 0.8;
        const r = Math.hypot(bx, bz);
        if (r > CITY_R) continue;
        if (hash(i * 3.1, j * 1.7) < 0.32) continue;

        const centerBias = 1 - r / CITY_R;
        const h =
          1.4 + Math.pow(centerBias, 1.3) * 9 * (0.45 + hash(i + 9, j - 4));

        const dotStep = 0.5;
        const count = Math.max(2, Math.floor(h / dotStep));
        for (let k = 0; k <= count; k++) {
          const y = (k / count) * h;
          positions.push(bx, y, bz);
          const topFrac = k / count;
          if (light) {
            c.copy(BURNT_DEEP).lerp(BURNT, topFrac);
            colors.push(c.r, c.g, c.b);
          } else {
            c.copy(ORANGE).lerp(ORANGE_HOT, topFrac * 0.8);
            const lum = 0.45 + topFrac * 0.75;
            colors.push(c.r * lum, c.g * lum, c.b * lum);
          }
        }

        if (h > 7.4 && towers.length < 22) {
          towers.push({ x: bx, z: bz, h, w: 0.7 + hash(i, j) * 0.5 });
        }
      }
    }
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      towers,
    };
  }, [light]);
}

type Props = { reducedMotion?: boolean; theme?: 'light' | 'dark' };

export function CityScene({ reducedMotion = false, theme = 'dark' }: Props) {
  const light = theme === 'light';
  const fieldRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const terrain = useTerrain(light);
  const city = useCity(light);
  const eased = useRef(0);

  useFrame((state) => {
    const t = reducedMotion ? 0 : state.clock.elapsedTime;
    eased.current += (scrollSignal.progress - eased.current) * 0.06;
    const p = eased.current;

    if (fieldRef.current) {
      fieldRef.current.rotation.y = t * 0.025;
    }

    // "enter the grid": when enter < 1, the camera is pulled far back + up and
    // rushes in to the normal pose as the intro completes.
    const out = 1 - introSignal.enter; // 0 normal, 1 fully pulled out
    camera.position.x = Math.sin(t * 0.06) * 5;
    camera.position.y = 13 - p * 6.5 + Math.sin(t * 0.45) * 0.3 + out * 16;
    camera.position.z = 44 - p * 20 + out * 48;
    camera.lookAt(0, 4.5 + p * 1.5, 0);
  });

  const blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;

  return (
    <group>
      <fog
        attach="fog"
        args={[(light ? FOG_LIGHT : FOG_DARK).getHex(), 24, 92]}
      />
      <ambientLight intensity={light ? 0.9 : 0.18} />
      <pointLight
        position={[0, 14, 0]}
        intensity={light ? 6 : 45}
        distance={70}
        decay={2}
        color={light ? '#ffffff' : ORANGE.getHex()}
      />
      <directionalLight
        position={[12, 20, 14]}
        intensity={light ? 0.7 : 0.25}
        color={light ? '#ffffff' : OFFWHITE.getHex()}
      />

      <group ref={fieldRef}>
        {/* terrain + mountains */}
        <points key={`terrain-${theme}`} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[terrain.positions, 3]}
            />
            <bufferAttribute attach="attributes-color" args={[terrain.colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.1}
            sizeAttenuation
            vertexColors
            transparent
            opacity={0.95}
            depthWrite={false}
            blending={blending}
          />
        </points>

        {/* city light-columns */}
        <points key={`city-${theme}`} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[city.positions, 3]}
            />
            <bufferAttribute attach="attributes-color" args={[city.colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.16}
            sizeAttenuation
            vertexColors
            transparent
            opacity={1}
            depthWrite={false}
            blending={blending}
          />
        </points>

        {/* solid accent towers */}
        {city.towers.map((tw, idx) => (
          <mesh key={idx} position={[tw.x, tw.h / 2, tw.z]}>
            <boxGeometry args={[tw.w, tw.h, tw.w]} />
            <meshStandardMaterial
              color={light ? BURNT.getHex() : '#0b0a0a'}
              emissive={light ? '#000000' : ORANGE.getHex()}
              emissiveIntensity={light ? 0 : 0.45}
              roughness={light ? 0.8 : 0.6}
              metalness={0.1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
