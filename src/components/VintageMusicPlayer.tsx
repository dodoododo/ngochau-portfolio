'use client';

/**
 * GramophonePlayer — Classic Wood & Brass Gramophone
 * ---------------------------------------------------
 * Fully procedural (no .glb) R3F scene: a wood cabinet body, a curved
 * brass SWAN-NECK horn (S-curved tube-along-a-spline + flared bell), a
 * physically-plausible brass tonearm, bouncy vinyl-swap physics with a
 * full mechanical changeover sequence, and sheet-music "smoke" flowing
 * out of the horn. Toon-shaded with hand-drawn canvas textures (wood
 * grain, sheet music) for a stylized comic/toy look, while the tonearm
 * and vinyl use metallic / physical materials for extra realism.
 *
 * Drop-in usage:
 * <GramophonePlayer />
 * <GramophonePlayer tracks={myTracks} />
 *
 * IMPORTANT — Next.js / SSR:
 * This file uses `document` (to paint canvas textures) and WebGL, so it
 * must never be server-rendered. Import it with ssr disabled:
 * const GramophonePlayer = dynamic(() => import('./GramophonePlayer'), { ssr: false });
 */

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Edges,
  PresentationControls,
  ContactShadows,
  Sparkles,
  useTexture,
  Environment,
} from '@react-three/drei';
import { useSpring, useTransition, animated } from '@react-spring/three';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

/* -------------------------------------------------------------------- */
/* Data                                                                */
/* -------------------------------------------------------------------- */

interface Track {
  id: number;
  title: string;
  artist: string;
  color: string;
  cover: string;
  audio: string;
  start_time: number; // Thời gian bắt đầu mặc định (tính bằng giây)
}

const DEFAULT_TRACKS: Track[] = [
  { id: 0, title: 'Pain', artist: 'PinkPantheress', color: '#D496A7', cover: '/song-cover/song1.jpg', audio: '/audio/song1.mp3', start_time: 0 },
  { id: 1, title: 'قديش كان في ناس', artist: 'Fairuz', color: '#B8860B', cover: '/song-cover/song2.jpg', audio: '/audio/song2.mp3', start_time: 18 },
  { id: 2, title: '03 Hay Là', artist: 'Ngọt', color: '#ed2132', cover: '/song-cover/song3.jpg', audio: '/audio/song3.mp3', start_time: 74 },
  { id: 3, title: 'Lovers Rock', artist: 'TV Girl', color: '#E84A5F', cover: '/song-cover/song4.jpg', audio: '/audio/song4.mp3', start_time: 0 },
  { id: 4, title: 'Back Again', artist: 'King Von', color: '#8B2635', cover: '/song-cover/song5.jpg', audio: '/audio/song5.mp3', start_time: 74 },
  { id: 5, title: '불장난 (PLAYING WITH FIRE)', artist: "BLACKPINK", color: '#C11C84', cover: '/song-cover/song6.jpg', audio: '/audio/song6.mp3', start_time: 0 },
  { id: 6, title: 'Chúng Ta Của Hiện Tại', artist: 'Sơn Tùng M-TP', color: '#a9e2f5', cover: '/song-cover/song7.png', audio: '/audio/song7.mp3', start_time: 0 },
  { id: 7, title: '大風吹', artist: "草東沒有派對 No Party For Cao Dong", color: '#4A4E69', cover: '/song-cover/song8.jpg', audio: '/audio/song8.mp3', start_time: 0 },
  { id: 8, title: "Hips Don't Lie", artist: 'Shakira', color: '#82edca', cover: '/song-cover/song9.jpg', audio: '/audio/song9.mp3', start_time: 0 },
  { id: 9, title: 'mosi mosi?', artist: '楽音 (Sasane)', color: '#9D8189', cover: '/song-cover/song10.jpg', audio: '/audio/song10.mp3', start_time: 0 },
];

/* -------------------------------------------------------------------- */
/* Palette                                                             */
/* -------------------------------------------------------------------- */

const BRASS_LIGHT = '#f1d789';
const BRASS_MID = '#d4af37';
const BRASS_DARK = '#8a6a1f';
const WOOD_BASE_COLOR = '#c98a4b';
const WOOD_DARK_COLOR = '#5c3a1e';
const FELT_GREEN = '#2f4d3a';
const NEEDLE_DARK = '#241623';
const LABEL_CREAM = '#f4ead2';

/* -------------------------------------------------------------------- */
/* Bell geometry constants — computed, not guessed                     */
/* -------------------------------------------------------------------- */

const BELL_TOP_R = 0.78;
const BELL_BOTTOM_R = 0.2;
const BELL_HEIGHT = 1.3;
const BELL_OVERLAP = 0.09;
const BELL_LIFT = BELL_HEIGHT / 2 - BELL_OVERLAP;

function bellRadiusAt(localY: number) {
  const ratio = THREE.MathUtils.clamp((localY + BELL_HEIGHT / 2) / BELL_HEIGHT, 0, 1);
  return BELL_BOTTOM_R + (BELL_TOP_R - BELL_BOTTOM_R) * ratio;
}

/* -------------------------------------------------------------------- */
/* Tonearm geometry constants — computed, not guessed                  */
/* -------------------------------------------------------------------- */

const ARM_PIVOT: [number, number, number] = [1.32, -0.43, 0.5];
const ARM_LENGTH = 1.15;
const ARM_PIVOT_R = Math.hypot(ARM_PIVOT[0], ARM_PIVOT[2]);
const ARM_BASE_YAW = Math.atan2(ARM_PIVOT[0], ARM_PIVOT[2]);

function swingAngleForRadius(radius: number) {
  const cosPhi = THREE.MathUtils.clamp(
    (ARM_PIVOT_R ** 2 + ARM_LENGTH ** 2 - radius ** 2) / (2 * ARM_PIVOT_R * ARM_LENGTH),
    -1,
    1
  );
  return Math.acos(cosPhi);
}

const RECORD_OUTER_R = 0.74; 
const RECORD_INNER_REF_R = 0.6; 
const REST_TIP_R = 1.18; 

const ARM_SWING_PLAY_OUTER = swingAngleForRadius(RECORD_OUTER_R);
const ARM_SWING_PLAY_INNER_REF = swingAngleForRadius(RECORD_INNER_REF_R);
const ARM_SWING_REST = swingAngleForRadius(REST_TIP_R);

const ARM_TILT_UP = 0.32;
const ARM_TILT_DOWN = 0.02;

const ARM_DRIFT_MAX = THREE.MathUtils.degToRad(4.5);
const ARM_DRIFT_RATE = THREE.MathUtils.degToRad(0.55); 

const ARM_MOVE_CONFIG = { tension: 220, friction: 28, mass: 0.9 };
const ARM_LOWER_CONFIG = { tension: 180, friction: 35, mass: 1.0 };

/* -------------------------------------------------------------------- */
/* Platter spin constants                                              */
/* -------------------------------------------------------------------- */

const PLATTER_SPEED = 1.6;
const PLATTER_SPINUP_LAMBDA = 3.2; 
const PLATTER_SPINDOWN_LAMBDA = 1.1; 

/* -------------------------------------------------------------------- */
/* Toon shading + hand-drawn textures                                  */
/* -------------------------------------------------------------------- */

const VolumeIcon = ({ muted }: { muted: boolean }) => 
  muted ? <VolumeX size={16} /> : <Volume2 size={16} />;

function useToonGradientMap(steps = 4) {
  return useMemo(() => {
    const data = new Uint8Array(steps);
    for (let i = 0; i < steps; i++) data[i] = Math.round((i / (steps - 1)) * 255);
    const texture = new THREE.DataTexture(data, steps, 1, THREE.RedFormat);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;
    return texture;
  }, [steps]);
}

function useWoodTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#f2ead9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 46; i++) {
      const y = Math.random() * canvas.height;
      ctx.strokeStyle = `rgba(90, 55, 25, ${0.08 + Math.random() * 0.2})`;
      ctx.lineWidth = 1 + Math.random() * 2.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= canvas.width; x += 16) {
        ctx.lineTo(x, y + Math.sin(x * 0.03 + i) * 6 + (Math.random() - 0.5) * 3);
      }
      ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    return texture;
  }, []);
}

function useTiledTexture(source: THREE.Texture, repeatX: number, repeatY: number) {
  return useMemo(() => {
    const t = source.clone();
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeatX, repeatY);
    t.needsUpdate = true;
    return t;
  }, [source, repeatX, repeatY]);
}

function useSheetMusicTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#fdf6e3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#2b2130';
    ctx.fillStyle = '#2b2130';
    ctx.lineWidth = 2;
    for (let block = 0; block < 3; block++) {
      const top = 24 + block * 84;
      for (let line = 0; line < 5; line++) {
        const y = top + line * 9;
        ctx.beginPath();
        ctx.moveTo(6, y);
        ctx.lineTo(canvas.width - 6, y);
        ctx.stroke();
      }
      for (let n = 0; n < 4; n++) {
        const nx = 14 + n * 27 + Math.random() * 6;
        const ny = top + Math.random() * 36;
        ctx.beginPath();
        ctx.ellipse(nx, ny, 5, 3.6, -0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(nx + 4.5, ny);
        ctx.lineTo(nx + 4.5, ny - 22);
        ctx.stroke();
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

function useFadeGradientTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 8;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(255,255,255,0)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.85)');
    gradient.addColorStop(1, 'rgba(255,255,255,1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

function useGrooveTexture() {
  return useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const cx = size / 2;
    const cy = size / 2;
    const maxR = size * 0.49;

    ctx.fillStyle = '#100d16';
    ctx.fillRect(0, 0, size, size);

    let r = maxR;
    let i = 0;
    while (r > size * 0.08) {
      const shade = 18 + (Math.sin(i * 0.7) * 0.5 + 0.5) * 14;
      ctx.strokeStyle = `rgba(${shade + 10}, ${shade + 6}, ${shade + 16}, ${0.35 + (i % 3 === 0 ? 0.15 : 0)})`;
      ctx.lineWidth = 1 + (i % 5 === 0 ? 0.6 : 0);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      r -= 2.1 + Math.random() * 0.6;
      i++;
    }

    const sheen = ctx.createLinearGradient(0, 0, size, size);
    sheen.addColorStop(0, 'rgba(255,255,255,0)');
    sheen.addColorStop(0.48, 'rgba(255,255,255,0.05)');
    sheen.addColorStop(0.52, 'rgba(255,255,255,0.09)');
    sheen.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sheen;
    ctx.beginPath();
    ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

function useMetalGradientTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
    g.addColorStop(0, '#8a6a1f');
    g.addColorStop(0.22, '#f1d789');
    g.addColorStop(0.32, '#fff6da');
    g.addColorStop(0.45, '#d4af37');
    g.addColorStop(0.7, '#8a6a1f');
    g.addColorStop(1, '#caa53a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    return texture;
  }, []);
}

function useBrassSheenTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#d9b95a';
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 220; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const rad = 1.2 + Math.random() * 2.4;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 245, 210, ${0.05 + Math.random() * 0.08})`;
      ctx.fill();
    }
    for (let y = 0; y < size; y += 6) {
      ctx.strokeStyle = `rgba(90, 65, 20, ${0.04 + Math.random() * 0.04})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y + Math.random() * 3);
      ctx.lineTo(size, y + Math.random() * 3);
      ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 1.4);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

/* -------------------------------------------------------------------- */
/* Maple leaf texture — palmate 5-lobe silhouette, jagged serrated edge, */
/* radiating veins + stem, drawn procedurally so it reads as a real     */
/* maple leaf (not a generic almond/teardrop shape) even edge-on.       */
/* -------------------------------------------------------------------- */

function useLeafTexture() {
  return useMemo(() => {
    const size = 160;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const cx = size / 2;
    const cy = size / 2 + size * 0.06;
    const baseR = size * 0.65;
    const lobes = 5;

    // Sweep across the top ~332° (leaving a gap at the bottom for the stem
    // notch), sampling a polar radius that bulges into 5 palmate lobes and
    // is jittered with a high-frequency term for serrated "teeth".
    const points: [number, number][] = [];
    const steps = 220;
    for (let i = 0; i <= steps; i++) {
      const tt = i / steps;
      const theta = -Math.PI * 0.94 + tt * Math.PI * 1.88;
      const lobeShape = Math.pow(Math.abs(Math.cos(theta * (lobes / 2))), 0.55);
      let r = baseR * (0.4 + 0.64 * lobeShape);
      // serration teeth
      r += Math.sin(theta * 42) * baseR * 0.032;
      r += Math.sin(theta * 17 + 1.7) * baseR * 0.018;
      // taper the outer two lobes down a touch for a more natural silhouette
      r *= 0.86 + 0.14 * Math.cos(theta * 0.9);
      const x = cx + Math.sin(theta) * r;
      const y = cy - Math.cos(theta) * r;
      points.push([x, y]);
    }

    ctx.beginPath();
    ctx.moveTo(cx, cy + size * 0.3);
    points.forEach(([x, y]) => ctx.lineTo(x, y));
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, cy - baseR, 0, cy + size * 0.28);
    grad.addColorStop(0, '#f4a83f');
    grad.addColorStop(0.42, '#e8672f');
    grad.addColorStop(0.78, '#bb3c20');
    grad.addColorStop(1, '#7c2716');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = 'rgba(48,14,8,0.55)';
    ctx.lineWidth = 1.4;
    ctx.stroke();

    // central vein + 4 radiating veins (2 per side), giving it the
    // palmate-vein look real maple leaves have
    ctx.strokeStyle = 'rgba(60,20,10,0.42)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, cy + size * 0.28);
    ctx.lineTo(cx, cy - baseR * 0.92);
    ctx.stroke();
    [-0.92, -0.48, 0.48, 0.92].forEach((a) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy + size * 0.06);
      ctx.lineTo(cx + Math.sin(a) * baseR * 0.78, cy - Math.cos(a) * baseR * 0.78);
      ctx.stroke();
    });

    // stem — a longer, gently curved petiole "strand" hanging from the root
    ctx.strokeStyle = '#4a2512';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy + size * 0.26);
    ctx.quadraticCurveTo(cx + size * 0.025, cy + size * 0.34, cx - size * 0.01, cy + size * 0.44);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

// A shared, gently-curled leaf plane (instead of a flat quad) so leaves
// catch light believably and don't look like paper cutouts when seen
// edge-on while tumbling.
function useCurledLeafGeometry() {
  return useMemo(() => {
    const geo = new THREE.PlaneGeometry(1, 1, 6, 6);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const curl = Math.sin((x + 0.5) * Math.PI) * 0.05 + Math.cos((y + 0.5) * Math.PI * 0.5) * 0.025;
      pos.setZ(i, curl);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);
}

const LEAF_COUNT = 15;
function FloatingLeaves({
  isPlaying,
  analyserRef,
  dataArrayRef,
}: {
  isPlaying: boolean;
  analyserRef: React.RefObject<AnalyserNode | null>;
  dataArrayRef: React.RefObject<Uint8Array>;
}) {
  const leafTexture = useLeafTexture();
  const leafGeometry = useCurledLeafGeometry();
  const leafRefs = useRef<(THREE.Mesh | null)[]>([]);

  const seeds = useMemo(
    () =>
      Array.from({ length: LEAF_COUNT }).map(() => ({
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * 7 - 2,
        z: (Math.random() - 0.5) * 6 - 1.5,
        speed: 0.25 + Math.random() * 0.35,
        driftFreq: 0.3 + Math.random() * 0.6,
        driftAmp: 0.4 + Math.random() * 0.6,
        spin: 0.4 + Math.random() * 0.8,
        spinAxis: Math.random() > 0.5 ? 1 : -1,
        scale: 0.22 + Math.random() * 0.2, 
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    let bass = 0;
    if (isPlaying) {
      const levels = sampleAudioLevels(analyserRef, dataArrayRef);
      bass = levels.bass;
    }
    
    const windBoost = 1;

    for (let i = 0; i < seeds.length; i++) {
      const mesh = leafRefs.current[i];
      if (!mesh) continue;
      const s = seeds[i];

      // 1. THAY ĐỔI QUAN TRỌNG: Trừ trực tiếp vào s.y thay vì mesh.position.y
      // Việc này giúp lá lưu giữ vị trí đang rơi kể cả khi React re-render.
      s.y -= delta * s.speed * windBoost;

      // 2. Check threshold bằng s.y
      if (s.y < -3.2) {
        if (isPlaying) {
          s.y = 4 + Math.random() * 3;
          mesh.visible = true; 
        } else {
          mesh.visible = false;
        }
      }

      const sway = Math.sin(t * s.driftFreq + s.phase) * s.driftAmp * (1 + bass * 0.5);
      
      // 3. THAY ĐỔI QUAN TRỌNG: Cập nhật vị trí hoàn toàn thông qua mesh.position.set
      mesh.position.set(
        s.x + sway * 0.6, 
        s.y, 
        s.z + Math.cos(t * s.driftFreq * 0.7 + s.phase) * 0.3
      );
      
      mesh.rotation.x += delta * 0.3 * s.spinAxis;
      mesh.rotation.y += delta * 0.2;
      mesh.rotation.z += delta * s.spin * s.spinAxis * windBoost;
    }
  });

  return (
    <group>
      {seeds.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => { leafRefs.current[i] = el; }}
          scale={s.scale}
          geometry={leafGeometry}
          // 4. THAY ĐỔI QUAN TRỌNG: Xóa position={[s.x, s.y, s.z]} ở đây!
          // Không cho React can thiệp vào vị trí nữa, để useFrame tự kiểm soát 100%.
        >
          <meshStandardMaterial
            map={leafTexture}
            transparent
            alphaTest={0.4}
            side={THREE.DoubleSide}
            roughness={0.75}
            metalness={0.03}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------- */
/* Procedural geometry + outline helper                                 */
/* -------------------------------------------------------------------- */

type GeoType = 'box' | 'cylinder' | 'cone' | 'torus' | 'sphere';

interface GeoDef {
  type: GeoType;
  args: any[];
}

function GeoNode({ geo }: { geo: GeoDef }) {
  switch (geo.type) {
    case 'box': return <boxGeometry args={geo.args as any} />;
    case 'cylinder': return <cylinderGeometry args={geo.args as any} />;
    case 'cone': return <coneGeometry args={geo.args as any} />;
    case 'torus': return <torusGeometry args={geo.args as any} />;
    case 'sphere': return <sphereGeometry args={geo.args as any} />;
    default: return null;
  }
}

type MaterialKind = 'toon' | 'metal' | 'physical';

interface StylizedPartProps {
  geo: GeoDef;
  color: string;
  gradientMap?: THREE.Texture;
  map?: THREE.Texture;
  position?: [number, number, number];
  rotation?: [number, number, number];
  quaternion?: THREE.Quaternion;
  scale?: [number, number, number] | number;
  outlineWidth?: number;
  outlineColor?: string;
  doubleSided?: boolean;
  material?: MaterialKind;
  metalness?: number;
  roughness?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  envMapIntensity?: number;
}

function StylizedPart({
  geo,
  color,
  gradientMap,
  map,
  position = [0, 0, 0],
  rotation,
  quaternion,
  scale = 1,
  outlineWidth = 0.04,
  outlineColor = '#241623',
  doubleSided = false,
  material = 'toon',
  metalness = 0.78,
  roughness = 0.3,
  clearcoat = 0,
  clearcoatRoughness = 0.2,
  envMapIntensity = 1,
}: StylizedPartProps) {
  const outlineScale = useMemo<[number, number, number] | number>(() => {
    const s = 1 + outlineWidth;
    if (typeof scale === 'number') return scale * s;
    return [scale[0] * s, scale[1] * s, scale[2] * s];
  }, [scale, outlineWidth]);

  const groupProps: Record<string, any> = { position };
  if (quaternion) groupProps.quaternion = quaternion;
  else groupProps.rotation = rotation || [0, 0, 0];

  const side = doubleSided ? THREE.DoubleSide : THREE.FrontSide;

  return (
    <group {...groupProps}>
      <mesh scale={outlineScale as any}>
        <GeoNode geo={geo} />
        <meshBasicMaterial color={outlineColor} side={THREE.BackSide} />
      </mesh>
      <mesh scale={scale as any} castShadow receiveShadow>
        <GeoNode geo={geo} />
        {material === 'toon' && <meshToonMaterial color={color} map={map} gradientMap={gradientMap} side={side} />}
        {material === 'metal' && <meshStandardMaterial color={color} map={map} metalness={metalness} roughness={roughness} envMapIntensity={envMapIntensity} side={side} />}
        {material === 'physical' && <meshPhysicalMaterial color={color} map={map} metalness={metalness} roughness={roughness} clearcoat={clearcoat} clearcoatRoughness={clearcoatRoughness} envMapIntensity={envMapIntensity} side={side} />}
      </mesh>
    </group>
  );
}

function cylinderBetween(a: THREE.Vector3, b: THREE.Vector3) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const length = dir.length();
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.clone().normalize()
  );
  return { mid, length, quaternion };
}

/* -------------------------------------------------------------------- */
/* Vinyl record (bouncy fly-in / fly-out, now with a physical slide)    */
/* -------------------------------------------------------------------- */

interface SpringStyle {
  posX: any;
  posY: any;
  posZ: any;
  rotX: any;
  rotY: any;
  rotZ: any;
  scale: any;
}

function VinylDisc({ track, style, gradientMap }: { track: Track; style: SpringStyle; gradientMap: THREE.Texture }) {
  const cover = useTexture(track.cover);
  const grooveTexture = useGrooveTexture();

  return (
    <animated.group
      position-x={style.posX}
      position-y={style.posY}
      position-z={style.posZ}
      rotation-x={style.rotX}
      rotation-y={style.rotY}
      rotation-z={style.rotZ}
      scale={style.scale}
    >
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.0, 1.0, 0.045, 96]} />
        <meshPhysicalMaterial
          color="#1b1723"
          map={grooveTexture}
          metalness={0.05}
          roughness={0.32}
          clearcoat={0.65}
          clearcoatRoughness={0.22}
          envMapIntensity={1.2}
        />
      </mesh>
      <mesh position={[0, 0.024, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.46, 56]} />
        <meshToonMaterial color={LABEL_CREAM} gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.4, 56]} />
        <meshBasicMaterial map={cover} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.028, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.415, 0.018, 8, 56]} />
        <meshToonMaterial color={track.color} gradientMap={gradientMap} />
      </mesh>
    </animated.group>
  );
}

/* -------------------------------------------------------------------- */
/* Horn VFX — sheet music flowing out like wavy smoke                  */
/* -------------------------------------------------------------------- */

const SHEET_BASE_OPACITY = 0.6;

function MusicSheetRibbon({
  sheetTexture,
  fadeTexture,
  width = 0.5,
  length = 2.2,
  segments = 20,
  phase = 0,
  speed = 0.3,
  scrollSpeed = 0.35,
  amp = 0.2,
  fadeRef,
}: {
  sheetTexture: THREE.Texture;
  fadeTexture: THREE.Texture;
  width?: number;
  length?: number;
  segments?: number;
  phase?: number;
  speed?: number;
  scrollSpeed?: number;
  amp?: number;
  fadeRef: React.MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  const geometry = useMemo(() => new THREE.PlaneGeometry(width, length, 1, segments), [width, length, segments]);
  const basePositions = useMemo(() => (geometry.attributes.position.array as Float32Array).slice(), [geometry]);

  const map = useMemo(() => {
    const t = sheetTexture.clone();
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(1, length / 1.3);
    t.needsUpdate = true;
    return t;
  }, [sheetTexture, length]);

  const alphaMap = useMemo(() => {
    const t = fadeTexture.clone();
    t.wrapS = THREE.ClampToEdgeWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
    t.needsUpdate = true;
    return t;
  }, [fadeTexture]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    map.offset.y -= delta * scrollSpeed;

    const pos = geometry.attributes.position;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const bz = basePositions[i + 2];
      const heightRatio = by / length + 0.5;
      const sway = Math.sin(by * 2.1 + t * speed * 4 + phase) * amp * heightRatio;
      const bulge = Math.cos(by * 1.4 + t * speed * 3 + phase) * amp * 0.5 * heightRatio;
      arr[i] = bx + sway;
      arr[i + 2] = bz + bulge;
    }
    pos.needsUpdate = true;

    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.3 + phase) * 0.15;
    }
    if (materialRef.current) {
      materialRef.current.opacity = SHEET_BASE_OPACITY * fadeRef.current;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, length / 2, 0]}>
      <meshBasicMaterial
        ref={materialRef}
        map={map}
        alphaMap={alphaMap}
        transparent
        opacity={SHEET_BASE_OPACITY}
        depthWrite={false}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

function MusicMagic({ active, position = [0, 0, 0] as [number, number, number] }: { active: boolean; position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const sheetTexture = useSheetMusicTexture();
  const fadeTexture = useFadeGradientTexture();

  const [mounted, setMounted] = useState(active);
  const activeRef = useRef(active);
  const fadeRef = useRef(active ? 1 : 0);

  useEffect(() => {
    activeRef.current = active;
    if (active) setMounted(true);
  }, [active]);

  useFrame((state, delta) => {
    const target = activeRef.current ? 1 : 0;
    const lambda = target > fadeRef.current ? 5 : 1.1;
    fadeRef.current = THREE.MathUtils.damp(fadeRef.current, target, lambda, delta);

    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
      groupRef.current.visible = fadeRef.current > 0.01;
    }

    if (!activeRef.current && fadeRef.current < 0.01 && mounted) {
      setMounted(false);
    }
  });

  if (!mounted) return null;

  return (
    <group ref={groupRef} position={position}>
      <Sparkles count={30} scale={[0.6, 1.3, 0.6]} size={3} speed={0.5} color="#ffe066" position={[0, 0.3, 0]} />
      <Sparkles count={14} scale={[0.4, 0.9, 0.4]} size={2} speed={0.35} color="#fff3d6" position={[0, 0.4, 0]} />
      <group rotation={[0, -0.35, 0]}>
        <MusicSheetRibbon sheetTexture={sheetTexture} fadeTexture={fadeTexture} phase={0} length={2.2} speed={0.3} scrollSpeed={0.35} fadeRef={fadeRef} />
      </group>
      <group rotation={[0, 0.1, 0]}>
        <MusicSheetRibbon sheetTexture={sheetTexture} fadeTexture={fadeTexture} phase={2.1} length={2.6} speed={0.36} scrollSpeed={0.42} fadeRef={fadeRef} />
      </group>
      <group rotation={[0, 0.45, 0]}>
        <MusicSheetRibbon sheetTexture={sheetTexture} fadeTexture={fadeTexture} phase={4.2} length={1.9} speed={0.26} scrollSpeed={0.3} fadeRef={fadeRef} />
      </group>
    </group>
  );
}

/* -------------------------------------------------------------------- */
/* Swan-neck horn — S-curved brass pipe flaring into a bell             */
/* -------------------------------------------------------------------- */

const SWAN_NECK_POINTS: [number, number, number][] = [
  [ 0.0,   0.0,  0.0  ],
  [-0.12,  0.25, 0.02 ],
  [-0.35,  0.6,  0.08 ],
  [-0.45,  1.0,  0.15 ],
  [-0.15,  1.35, 0.25 ],
  [ 0.35,  1.6,  0.35 ],
  [ 0.85,  1.8,  0.45 ],
  [ 1.45,  1.9,  0.55 ],
];

const SWAN_NECK_TUBE_RADIUS = 0.2;
const SWAN_NECK_TUBULAR_SEGMENTS = 200;
const SWAN_NECK_RADIAL_SEGMENTS = 32;
const SWAN_NECK_RING_TS = [0.1, 0.3, 0.5, 0.68, 0.85];

function useSwanNeckCurve() {
  return useMemo(() => {
    const points = SWAN_NECK_POINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z));
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.4);
  }, []);
}

function SwanNeckTube({ curve, map }: { curve: THREE.CatmullRomCurve3; map?: THREE.Texture }) {
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, SWAN_NECK_TUBULAR_SEGMENTS, SWAN_NECK_TUBE_RADIUS, SWAN_NECK_RADIAL_SEGMENTS, false), [curve]);
  const outlineGeometry = useMemo(() => new THREE.TubeGeometry(curve, SWAN_NECK_TUBULAR_SEGMENTS, SWAN_NECK_TUBE_RADIUS * 1.22, SWAN_NECK_RADIAL_SEGMENTS, false), [curve]);

  return (
    <group>
      <mesh geometry={outlineGeometry}>
        <meshBasicMaterial color={NEEDLE_DARK} side={THREE.BackSide} />
      </mesh>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color={BRASS_MID} map={map} metalness={0.82} roughness={0.26} envMapIntensity={1.1} />
      </mesh>
    </group>
  );
}

function SwanNeckHorn({ gradientMap, isPlaying }: { gradientMap: THREE.Texture; isPlaying: boolean }) {
  const curve = useSwanNeckCurve();
  const metalGradient = useMetalGradientTexture();
  const brassSheen = useBrassSheenTexture();

  const ringTransforms = useMemo(
    () =>
      SWAN_NECK_RING_TS.map((t) => {
        const point = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t).normalize();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
        return { point, quaternion };
      }),
    [curve]
  );

  const bellTransform = useMemo(() => {
    const endPoint = curve.getPointAt(1);
    const tangent = curve.getTangentAt(1).normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
    const mountPoint = endPoint.clone().addScaledVector(tangent, -BELL_OVERLAP);
    return { mountPoint, quaternion };
  }, [curve]);

  const brace = useMemo(() => {
    const start = curve.getPointAt(0.5);
    const end = new THREE.Vector3(0.34, 0.16, 0.2);
    return cylinderBetween(start, end);
  }, [curve]);

  return (
    <group position={[-1.15, -0.6, -0.95]}>
      <SwanNeckTube curve={curve} map={metalGradient} />

      <StylizedPart geo={{ type: 'cylinder', args: [SWAN_NECK_TUBE_RADIUS * 1.4, SWAN_NECK_TUBE_RADIUS * 1.4, SWAN_NECK_TUBE_RADIUS * 1.7, 24] }} color={BRASS_DARK} gradientMap={gradientMap} material="metal" position={[0, 0.05, 0]} />

      {ringTransforms.map((r, i) => (
        <StylizedPart key={i} geo={{ type: 'torus', args: [SWAN_NECK_TUBE_RADIUS * 1.6, 0.03, 16, 48] }} color={i % 2 === 0 ? BRASS_DARK : BRASS_LIGHT} gradientMap={gradientMap} material="metal" position={[r.point.x, r.point.y, r.point.z]} quaternion={r.quaternion} outlineWidth={0.05} />
      ))}

      <StylizedPart geo={{ type: 'cylinder', args: [0.032, 0.032, brace.length, 16] }} color={BRASS_DARK} gradientMap={gradientMap} material="metal" position={[brace.mid.x, brace.mid.y, brace.mid.z]} quaternion={brace.quaternion} outlineWidth={0.06} />
      <StylizedPart geo={{ type: 'sphere', args: [0.045, 16, 16] }} color={BRASS_DARK} gradientMap={gradientMap} material="metal" position={[0.34, 0.16, 0.2]} />

      <group position={bellTransform.mountPoint} quaternion={bellTransform.quaternion}>
        <StylizedPart geo={{ type: 'cylinder', args: [BELL_TOP_R, BELL_BOTTOM_R, BELL_HEIGHT, 48, 1, true] }} color={BRASS_MID} map={brassSheen} gradientMap={gradientMap} material="metal" position={[0, BELL_LIFT, 0]} doubleSided />
        <StylizedPart geo={{ type: 'torus', args: [bellRadiusAt(-0.25), 0.03, 12, 48] }} color={BRASS_DARK} gradientMap={gradientMap} material="metal" position={[0, BELL_LIFT - 0.25, 0]} rotation={[Math.PI / 2, 0, 0]} />
        <StylizedPart geo={{ type: 'torus', args: [bellRadiusAt(0.15), 0.035, 12, 48] }} color={BRASS_LIGHT} gradientMap={gradientMap} material="metal" position={[0, BELL_LIFT + 0.15, 0]} rotation={[Math.PI / 2, 0, 0]} />
        <StylizedPart geo={{ type: 'torus', args: [BELL_TOP_R, 0.05, 14, 64] }} color={BRASS_LIGHT} gradientMap={gradientMap} material="metal" position={[0, BELL_LIFT + BELL_HEIGHT / 2, 0]} rotation={[Math.PI / 2, 0, 0]} />
        <MusicMagic active={isPlaying} position={[0, BELL_LIFT + BELL_HEIGHT / 2 + 0.05, 0]} />
      </group>
    </group>
  );
}

/* -------------------------------------------------------------------- */
/* Tonearm — pivots on the right, swings inward onto the record         */
/* -------------------------------------------------------------------- */

function Tonearm({
  gradientMap,
  isPlaying,
  uiTrackIndex,
  onSwapComplete
}: {
  gradientMap: THREE.Texture;
  isPlaying: boolean;
  uiTrackIndex: number;
  onSwapComplete: () => void;
}) {
  const metalGradient = useMetalGradientTexture();
  const yawRef = useRef<THREE.Group>(null);
  const tiltRef = useRef<THREE.Group>(null);

  const [{ swing, tilt }, armApi] = useSpring(() => ({
    swing: ARM_SWING_REST,
    tilt: ARM_TILT_UP,
    config: ARM_MOVE_CONFIG,
  }));

  const armStateRef = useRef<'rest' | 'lifting' | 'swinging-out' | 'swinging-in' | 'lowering' | 'playing'>('rest');
  
  // FIX 1: Dùng boolean cho touchdown để đồng bộ chính xác thời gian Three.js
  const touchdownRef = useRef<number | boolean | null>(null);
  const isPlayingRef = useRef(false);
  const sequenceIdRef = useRef(0);
  
  // Biến lưu độ trôi của kim
  const driftRef = useRef(0);

  const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

  const lift = useCallback(() => armApi.start({ tilt: ARM_TILT_UP, config: ARM_MOVE_CONFIG }), [armApi]);
  const lower = useCallback(() => {
    touchdownRef.current = null;
    return Promise.all(armApi.start({ tilt: ARM_TILT_DOWN, config: ARM_LOWER_CONFIG })).then(() => {
      touchdownRef.current = true; // Kích hoạt hiệu ứng nhún kim
    });
  }, [armApi]);
  const swingOut = useCallback(() => armApi.start({ swing: ARM_SWING_REST, config: ARM_MOVE_CONFIG }), [armApi]);
  const swingIn = useCallback(() => armApi.start({ swing: ARM_SWING_PLAY_OUTER, config: ARM_MOVE_CONFIG }), [armApi]);

  const cueIn = useCallback(async () => {
    driftRef.current = 0; // FIX 2: Reset độ trôi về 0 mỗi khi bắt đầu nghe lại để chống giật
    armStateRef.current = 'lifting';
    await lift();
    armStateRef.current = 'swinging-in';
    await swingIn();
    armStateRef.current = 'lowering';
    await lower();
    armStateRef.current = 'playing';
  }, [lift, swingIn, lower]);

  const cueOut = useCallback(async () => {
    armStateRef.current = 'lifting';
    await lift();
    armStateRef.current = 'swinging-out';
    await swingOut();
    armStateRef.current = 'rest';
  }, [lift, swingOut]);

  const runSequence = useCallback(
    async (kind: 'trackChange' | 'playToggle', shouldPlay: boolean, onSwap?: () => void) => {
      const id = ++sequenceIdRef.current;
      const stillCurrent = () => sequenceIdRef.current === id;

      if (kind === 'trackChange') {
        if (armStateRef.current !== 'rest') {
          armStateRef.current = 'lifting';
          await lift();
          if (!stillCurrent()) return;
        }
        armStateRef.current = 'swinging-out';
        await swingOut();
        if (!stillCurrent()) return;
        armStateRef.current = 'rest';

        await delay(80);
        if (!stillCurrent()) return;
        
        onSwap?.(); 
        
        await delay(550); 
        if (!stillCurrent()) return;

        await delay(200);
        if (!stillCurrent()) return;

        if (shouldPlay) {
          driftRef.current = 0; // FIX 2: Reset độ trôi khi chuyển bài
          armStateRef.current = 'swinging-in';
          await swingIn();
          if (!stillCurrent()) return;
          armStateRef.current = 'lowering';
          await lower();
          if (!stillCurrent()) return;
          armStateRef.current = 'playing';
        }
        return;
      }

      if (shouldPlay) {
        await cueIn();
      } else {
        await cueOut();
      }
    },
    [cueIn, cueOut, lift, swingOut, swingIn, lower]
  );

  const prevTrackIndex = useRef(uiTrackIndex);
  useEffect(() => {
    if (uiTrackIndex !== prevTrackIndex.current) {
      prevTrackIndex.current = uiTrackIndex;
      isPlayingRef.current = isPlaying; 
      runSequence('trackChange', isPlaying, onSwapComplete);
    } else if (isPlaying !== isPlayingRef.current) {
      isPlayingRef.current = isPlaying;
      runSequence('playToggle', isPlaying);
    }
  }, [isPlaying, uiTrackIndex, runSequence, onSwapComplete]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    let extraSwing = 0;

    if (armStateRef.current === 'playing' && isPlayingRef.current) {
      // Cộng dồn độ trôi cực kỳ mượt mà
      driftRef.current += ARM_DRIFT_RATE * delta;
      const maxDrift = Math.min(ARM_DRIFT_MAX, ARM_SWING_PLAY_OUTER - ARM_SWING_PLAY_INNER_REF);
      driftRef.current = Math.min(driftRef.current, maxDrift);
      
      const vibration = Math.sin(t * 46) * 0.0016 + Math.sin(t * 97 + 1.3) * 0.0006;
      extraSwing = -driftRef.current + vibration;
    }

    let extraTilt = 0;
    // Đồng bộ thời gian nhún kim chuẩn xác với Three.js clock
    if (touchdownRef.current === true) {
      touchdownRef.current = t; 
    }
    if (typeof touchdownRef.current === 'number') {
      const since = t - touchdownRef.current;
      if (since >= 0 && since < 0.3) {
        extraTilt = Math.sin(since * 38) * 0.007 * Math.exp(-since * 14);
      } else if (since >= 0.3) {
        touchdownRef.current = null;
      }
    }

    if (yawRef.current) yawRef.current.rotation.y = ARM_BASE_YAW + swing.get() + extraSwing;
    if (tiltRef.current) tiltRef.current.rotation.x = tilt.get() + extraTilt;
  });

  return (
    <group position={ARM_PIVOT}>
      <StylizedPart geo={{ type: 'cylinder', args: [0.11, 0.13, 0.22, 20] }} color={BRASS_DARK} gradientMap={gradientMap} material="metal" position={[0, -0.02, 0]} />
      <StylizedPart geo={{ type: 'cylinder', args: [0.075, 0.075, 0.16, 20] }} color={BRASS_MID} map={metalGradient} gradientMap={gradientMap} material="metal" position={[0, 0.13, 0]} />

      <group ref={yawRef}>
        <StylizedPart geo={{ type: 'cylinder', args: [0.1, 0.1, 0.16, 20] }} color={NEEDLE_DARK} gradientMap={gradientMap} material="metal" metalness={0.4} roughness={0.5} position={[0, 0.05, 0.36]} />
        <StylizedPart geo={{ type: 'cylinder', args: [0.032, 0.032, 0.42, 12] }} color={BRASS_DARK} gradientMap={gradientMap} material="metal" position={[0, 0.05, 0.14]} rotation={[Math.PI / 2, 0, 0]} />
        <StylizedPart geo={{ type: 'sphere', args: [0.075, 16, 16] }} color={BRASS_LIGHT} gradientMap={gradientMap} material="metal" position={[0, 0.1, 0]} />

        <group ref={tiltRef} position={[0, 0.1, 0]}>
          <StylizedPart geo={{ type: 'cylinder', args: [0.04, 0.045, 1.05, 16] }} color={BRASS_MID} map={metalGradient} gradientMap={gradientMap} material="metal" position={[0, 0.02, -0.55]} rotation={[Math.PI / 2, 0, 0]} />
          <StylizedPart geo={{ type: 'cylinder', args: [0.05, 0.045, 0.1, 14] }} color={BRASS_DARK} gradientMap={gradientMap} material="metal" position={[0, 0.02, -1.08]} rotation={[Math.PI / 2, 0, 0]} />
          <StylizedPart geo={{ type: 'box', args: [0.1, 0.075, 0.16] }} color={NEEDLE_DARK} gradientMap={gradientMap} material="metal" metalness={0.55} roughness={0.4} position={[0, 0, -1.16]} />
          <StylizedPart geo={{ type: 'box', args: [0.075, 0.055, 0.1] }} color="#3a2f1a" gradientMap={gradientMap} material="metal" metalness={0.3} roughness={0.55} position={[0, -0.05, -1.22]} />
          <StylizedPart geo={{ type: 'cone', args: [0.03, 0.075, 10] }} color={NEEDLE_DARK} gradientMap={gradientMap} material="metal" metalness={0.2} roughness={0.5} position={[0, -0.09, -1.25]} rotation={[Math.PI, 0, 0]} />
          <StylizedPart geo={{ type: 'sphere', args: [0.012, 8, 8] }} color="#e8e4ea" gradientMap={gradientMap} material="metal" metalness={0.1} roughness={0.2} position={[0, -0.125, -1.25]} />
        </group>
      </group>
    </group>
  );
}

function RoomDecor() {
  return (
    <group>

      {/* ══════════════════════════════════════════ */}
      {/* ROOM SHELL                                 */}
      {/* ══════════════════════════════════════════ */}

      {/* Back wall — warm linen white */}
      <mesh position={[0, 1, -7]} receiveShadow>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color="#ede3d5" roughness={0.95} metalness={0} />
      </mesh>

      {/* Left wall — same tone, slightly warmer in shadow */}
      <mesh position={[-6, 2.2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color="#e8be84" roughness={0.95} metalness={0} />
      </mesh>

      {/* Right wall */}
      <mesh position={[7, 2.2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color="#e6dace" roughness={0.95} metalness={0} />
      </mesh>

      {/* Ceiling — slightly cooler ivory so it reads as separate */}
      <mesh position={[0, 8.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f5f0e8" roughness={1} metalness={0} />
      </mesh>

      {/* ══════════════════════════════════════════ */}
      {/* TRIM — all aged oak                        */}
      {/* ══════════════════════════════════════════ */}

      {/* Skirting board — back wall */}
      <mesh position={[0, -1.3, -6.9]} receiveShadow>
        <boxGeometry args={[20, 0.5, 0.1]} />
        <meshStandardMaterial color="#8b6343" roughness={0.6} metalness={0.06} />
      </mesh>
      {/* Skirting board — left wall */}
      <mesh position={[-9.9, -1.3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[20, 0.4, 0.1]} />
        <meshStandardMaterial color="#8b6343" roughness={0.6} metalness={0.06} />
      </mesh>

      {/* Dado rail — back wall, sits at ~waist height */}
      <mesh position={[0, 0.55, -6.87]}>
        <boxGeometry args={[20, 0.1, 0.09]} />
        <meshStandardMaterial color="#a0784e" roughness={0.5} metalness={0.08} />
      </mesh>

      {/* Crown moulding — back wall top */}
      <mesh position={[0, 6.1, -6.87]}>
        <boxGeometry args={[20, 0.18, 0.09]} />
        <meshStandardMaterial color="#a0784e" roughness={0.5} metalness={0.08} />
      </mesh>

      {/* ══════════════════════════════════════════ */}
      {/* WINDOW — left of center, realistic height  */}
      {/* ══════════════════════════════════════════ */}

      <group position={[-3.0, 2.6, -6.88]}>
        {/* Outer frame — oak */}
        <mesh>
          <boxGeometry args={[2.6, 3.8, 0.14]} />
          <meshStandardMaterial color="#8b6343" roughness={0.55} metalness={0.08} />
        </mesh>
        {/* Inner reveal (slightly lighter oak) */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[2.3, 3.5, 0.06]} />
          <meshStandardMaterial color="#a07848" roughness={0.6} />
        </mesh>
        {/* Glass — very subtle warm tint */}
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[2.1, 3.28]} />
          <meshPhysicalMaterial
            color="#dae6eb"
            transparent
            opacity={0.12}
            roughness={0.02}
            metalness={0}
            transmission={0.92}
          />
        </mesh>
        {/* Vertical muntin */}
        <mesh position={[0, 0, 0.12]}>
          <boxGeometry args={[0.055, 3.28, 0.04]} />
          <meshStandardMaterial color="#8b6343" roughness={0.55} />
        </mesh>
        {/* Horizontal muntin — splits into upper and lower sash */}
        <mesh position={[0, 0.3, 0.12]}>
          <boxGeometry args={[2.1, 0.06, 0.04]} />
          <meshStandardMaterial color="#8b6343" roughness={0.55} />
        </mesh>
        {/* Windowsill */}
        <mesh position={[0, -1.97, 0.2]}>
          <boxGeometry args={[2.8, 0.08, 0.42]} />
          <meshStandardMaterial color="#c4a882" roughness={0.45} metalness={0.05} />
        </mesh>
        {/* Warm afternoon sun through the glass */}
        <pointLight position={[0, 0.5, 2.5]} intensity={2.8} color="#ffcc88" distance={10} decay={2} />
      </group>

      {/* ══════════════════════════════════════════ */}
      {/* GALLERY WALL — right of center, 3 frames   */}
      {/* ══════════════════════════════════════════ */}

      {/* Frame 1 — large landscape, top left of cluster */}
      <group position={[1, 2.5, -6.86]}>
        <mesh>
          <boxGeometry args={[1.8, 1.2, 0.06]} />
          <meshStandardMaterial color="#6b4c30" roughness={0.5} metalness={0.12} />
        </mesh>
        {/* Matting */}
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[1.6, 1.0]} />
          <meshStandardMaterial color="#f5ede0" roughness={0.9} />
        </mesh>
        {/* Art — warm landscape abstraction */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[1.35, 0.75]} />
          <meshStandardMaterial color="#c4875a" roughness={0.85} />
        </mesh>
        {/* Sky band */}
        <mesh position={[0, 0.22, 0.056]}>
          <planeGeometry args={[1.35, 0.3]} />
          <meshStandardMaterial color="#d4a882" roughness={0.85} />
        </mesh>
        {/* Horizon tree silhouette */}
        <mesh position={[-0.28, -0.1, 0.057]}>
          <planeGeometry args={[0.08, 0.4]} />
          <meshStandardMaterial color="#4a3220" roughness={0.9} />
        </mesh>
        <mesh position={[0.15, -0.08, 0.057]}>
          <planeGeometry args={[0.06, 0.36]} />
          <meshStandardMaterial color="#4a3220" roughness={0.9} />
        </mesh>
      </group>

      {/* Frame 2 — small portrait, bottom right of cluster */}
      <group position={[-0.5, 2.5, -6.86]}>
        <mesh>
          <boxGeometry args={[0.85, 1.05, 0.055]} />
          <meshStandardMaterial color="#8b6343" roughness={0.5} metalness={0.12} />
        </mesh>
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[0.68, 0.88]} />
          <meshStandardMaterial color="#e8d5b8" roughness={0.9} />
        </mesh>
        {/* Botanical illustration feel */}
        <mesh position={[0, 0.1, 0.042]}>
          <cylinderGeometry args={[0.005, 0.005, 0.55, 6]} />
          <meshStandardMaterial color="#5a7a4a" roughness={0.8} />
        </mesh>
        <mesh position={[-0.1, 0.22, 0.042]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#7a9a5a" roughness={0.8} />
        </mesh>
        <mesh position={[0.08, 0.28, 0.042]}>
          <sphereGeometry args={[0.075, 8, 8]} />
          <meshStandardMaterial color="#6a8a4a" roughness={0.8} />
        </mesh>
      </group>

      {/* Frame 3 — small square, top right */}
      <group position={[1, 1.4, -6.86]}>
        <mesh>
          <boxGeometry args={[0.8, 0.8, 0.055]} />
          <meshStandardMaterial color="#5c3d22" roughness={0.5} metalness={0.12} />
        </mesh>
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[0.64, 0.64]} />
          <meshStandardMaterial color="#2e2218" roughness={0.9} />
        </mesh>
        {/* Moody dark art with warm accent */}
        <mesh position={[0, -0.05, 0.042]}>
          <circleGeometry args={[0.18, 24]} />
          <meshStandardMaterial color="#d4a05a" roughness={0.8} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════ */}
      {/* BOOKSHELF — against left wall              */}
      {/* ══════════════════════════════════════════ */}

      {/* Shelf unit carcass */}
      <group position={[-5, 0.3, -2.5]} rotation={[0, Math.PI / 2, 0]}>
        {/* Back panel */}
        <mesh position={[0, 1.4, -0.22]}>
          <boxGeometry args={[2.2, 3.2, 0.04]} />
          <meshStandardMaterial color="#7a5535" roughness={0.7} />
        </mesh>
        {/* Left side */}
        <mesh position={[-1.08, 1.4, 0]}>
          <boxGeometry args={[0.04, 3.2, 0.44]} />
          <meshStandardMaterial color="#8b6343" roughness={0.6} />
        </mesh>
        {/* Right side */}
        <mesh position={[1.08, 1.4, 0]}>
          <boxGeometry args={[0.04, 3.2, 0.44]} />
          <meshStandardMaterial color="#8b6343" roughness={0.6} />
        </mesh>
        {/* Bottom shelf */}
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[2.16, 0.04, 0.44]} />
          <meshStandardMaterial color="#8b6343" roughness={0.6} />
        </mesh>
        {/* Middle shelf */}
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[2.16, 0.04, 0.44]} />
          <meshStandardMaterial color="#8b6343" roughness={0.6} />
        </mesh>
        {/* Top shelf */}
        <mesh position={[0, 2.76, 0]}>
          <boxGeometry args={[2.16, 0.04, 0.44]} />
          <meshStandardMaterial color="#8b6343" roughness={0.6} />
        </mesh>

        {/* Books — bottom row */}
        {[
          { x: -0.82, w: 0.13, h: 0.52, col: '#7a4b3a' },
          { x: -0.66, w: 0.09, h: 0.48, col: '#c4a882' },
          { x: -0.55, w: 0.11, h: 0.55, col: '#4a6358' },
          { x: -0.42, w: 0.08, h: 0.46, col: '#8b6343' },
          { x: -0.32, w: 0.14, h: 0.5,  col: '#d4a05a' },
          { x: -0.16, w: 0.09, h: 0.44, col: '#5a4a6a' },
          { x: -0.05, w: 0.12, h: 0.52, col: '#3a5a4a' },
          { x:  0.09, w: 0.1,  h: 0.48, col: '#8b4a38' },
          { x:  0.21, w: 0.13, h: 0.54, col: '#a07848' },
          { x:  0.36, w: 0.08, h: 0.42, col: '#6a5a3a' },
          { x:  0.46, w: 0.11, h: 0.5,  col: '#4a6880' },
          { x:  0.59, w: 0.1,  h: 0.46, col: '#7a3a38' },
          { x:  0.71, w: 0.12, h: 0.53, col: '#c4875a' },
        ].map((b, i) => (
          <mesh key={i} position={[b.x, 0.06 + b.h / 2, 0.01]}>
            <boxGeometry args={[b.w, b.h, 0.32]} />
            <meshStandardMaterial color={b.col} roughness={0.7} metalness={0.03} />
          </mesh>
        ))}

        {/* Books — top row (sparser, some decorative objects) */}
        {[
          { x: -0.82, w: 0.11, h: 0.42, col: '#d4b896' },
          { x: -0.69, w: 0.09, h: 0.38, col: '#8a6a4a' },
          { x: -0.58, w: 0.13, h: 0.45, col: '#5a7a6a' },
          { x: -0.43, w: 0.08, h: 0.4,  col: '#c49070' },
          { x:  0.3,  w: 0.1,  h: 0.44, col: '#7a5a3a' },
          { x:  0.42, w: 0.12, h: 0.38, col: '#4a6a58' },
          { x:  0.56, w: 0.09, h: 0.42, col: '#a07060' },
          { x:  0.67, w: 0.11, h: 0.46, col: '#6a4a2a' },
          { x:  0.8,  w: 0.1,  h: 0.4,  col: '#8a5a48' },
        ].map((b, i) => (
          <mesh key={`t${i}`} position={[b.x, 1.42 + b.h / 2, 0.01]}>
            <boxGeometry args={[b.w, b.h, 0.32]} />
            <meshStandardMaterial color={b.col} roughness={0.7} metalness={0.03} />
          </mesh>
        ))}

        {/* Small globe on top shelf */}
        <mesh position={[-0.1, 2.82, 0.0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#8ba0a8" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Globe stand */}
        <mesh position={[-0.1, 2.62, 0.0]}>
          <cylinderGeometry args={[0.03, 0.08, 0.18, 10]} />
          <meshStandardMaterial color="#a07848" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Ceramic pot on top shelf */}
        <mesh position={[0.6, 2.82, 0.0]}>
          <cylinderGeometry args={[0.1, 0.08, 0.25, 14]} />
          <meshStandardMaterial color="#c4875a" roughness={0.35} metalness={0.05} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════ */}
      {/* PENDANT LAMP — centered over scene         */}
      {/* ══════════════════════════════════════════ */}

      <group position={[0.5, 6.8, -2.5]}>
        {/* Ceiling rose */}
        <mesh position={[0, 1.62, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.04, 20]} />
          <meshStandardMaterial color="#ede3d5" roughness={0.8} />
        </mesh>
        {/* Cord */}
        <mesh>
          <cylinderGeometry args={[0.008, 0.008, 3.2, 6]} />
          <meshStandardMaterial color="#6b4a2a" roughness={0.85} />
        </mesh>
        {/* Shade — open-bottom cone, warm brass */}
        <mesh position={[0, -1.72, 0]}>
          <coneGeometry args={[0.42, 0.32, 28, 1, true]} />
          <meshStandardMaterial
            color="#c4a050"
            roughness={0.3}
            metalness={0.45}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Inner shade rim */}
        <mesh position={[0, -1.58, 0]}>
          <torusGeometry args={[0.42, 0.015, 8, 28]} />
          <meshStandardMaterial color="#a08040" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Warm pool of light downward */}
        <pointLight position={[0, -1.8, 0]} intensity={2.2} color="#ffdd99" distance={8} decay={2} />
      </group>

    </group>
  );
}

/* -------------------------------------------------------------------- */
/* Arm-rest peg                                                         */
/* -------------------------------------------------------------------- */

function ArmRest({ gradientMap }: { gradientMap: THREE.Texture }) {
  const restPoint = useMemo(() => {
    const theta = ARM_BASE_YAW + ARM_SWING_REST;
    const x = ARM_PIVOT[0] - ARM_LENGTH * Math.sin(theta);
    const z = ARM_PIVOT[2] - ARM_LENGTH * Math.cos(theta);
    return [x, ARM_PIVOT[1] - 0.09, z] as [number, number, number];
  }, []);

  return (
    <group position={restPoint}>
      <StylizedPart geo={{ type: 'cylinder', args: [0.09, 0.1, 0.05, 16] }} color={BRASS_DARK} gradientMap={gradientMap} material="metal" position={[0, 0, 0]} />
      <StylizedPart geo={{ type: 'torus', args: [0.075, 0.014, 8, 24, Math.PI] }} color={BRASS_LIGHT} gradientMap={gradientMap} material="metal" position={[0, 0.045, 0]} rotation={[Math.PI / 2, 0, Math.PI * 0.75]} />
    </group>
  );
}

function AudioVisualizer({
  color,
  isPlaying,
  analyserRef,
  dataArrayRef,
  barCount = 30,
  position = [1, -1.5, -3.5] as [number, number, number],
  rotationY = 0.1,
}: {
  color: string;
  isPlaying: boolean;
  analyserRef: React.RefObject<AnalyserNode | null>;
  dataArrayRef: React.RefObject<Uint8Array>;
  barCount?: number;
  position?: [number, number, number];
  rotationY?: number;
}) {
  const barsRef = useRef<(THREE.Mesh | null)[]>([]);
  const materialColor = useMemo(() => new THREE.Color(color), [color]);
  const IDLE_HEIGHT = 0.08; 

  useFrame((state, delta) => {
    const analyser = analyserRef.current;
    const data = dataArrayRef.current;
    const binCount = data.length;
    const t = state.clock.elapsedTime;

    if (isPlaying && analyser) {
      analyser.getByteFrequencyData(data as Uint8Array<ArrayBuffer>);
    }

    for (let i = 0; i < barsRef.current.length; i++) {
      const mesh = barsRef.current[i];
      if (!mesh) continue;

      let targetH: number;
      if (isPlaying) {
        const binIndex = Math.min(binCount - 1, Math.floor(((i + 1) / barCount) * binCount * 0.6));
        const raw = data[binIndex] / 255;
        targetH = IDLE_HEIGHT + raw * 1.5;
      } else {
        targetH = IDLE_HEIGHT + (Math.sin(t * 1.4 + i * 0.4) * 0.5 + 0.5) * 0.03;
      }

      const currentH = mesh.scale.y || IDLE_HEIGHT;
      const newH = THREE.MathUtils.damp(currentH, targetH, isPlaying ? 10 : 4, delta);
      mesh.scale.y = newH;
      mesh.position.y = newH / 2;

      const mat = mesh.material as THREE.MeshStandardMaterial;
      // Slightly boosted the base opacity so the colors don't wash out inside the borders
      mat.opacity = isPlaying ? 0.65 + Math.min(1, (newH - IDLE_HEIGHT)) * 0.35 : 0.5;
    }
  });

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {Array.from({ length: barCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { barsRef.current[i] = el; }}
          position={[(i - barCount / 2) * 0.09, IDLE_HEIGHT / 2, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.06, 1, 0.06]} />
          
          <meshStandardMaterial
            color={materialColor}
            transparent
            opacity={0.5}
            metalness={0.15}
            roughness={0.45}
            emissive={materialColor}
            emissiveIntensity={0.3} // Boosted glow to contrast with the dark borders
          />
          
          {/* THE BORDER EFFECT */}
          <Edges 
            linewidth={1} 
            threshold={15} 
            color="#111111" // Dark almost-black color for a crisp outline
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------- */
/* Wind field — shared directional gust math for ground + dust streaks  */
/* -------------------------------------------------------------------- */

// Hướng gió cố định: thổi chéo nhẹ từ trái sang phải, hơi lệch về phía loa kèn
const WIND_DIR = new THREE.Vector2(1, 0.28).normalize();

// Cường độ gust (đợt gió) biến thiên chậm, tạo cảm giác gió "thở" tự nhiên
// thay vì đều đều — nhiều nhịp sin tần số thấp cộng lại giả lập turbulence.
function gustEnvelope(t: number) {
  const g =
    Math.sin(t * 0.35) * 0.5 +
    Math.sin(t * 0.61 + 1.3) * 0.3 +
    Math.sin(t * 0.19 + 4.1) * 0.4;
  return THREE.MathUtils.clamp(0.55 + g * 0.45, 0.15, 1);
}

const GROUND_SIZE = 16;
const GROUND_SEGMENTS = 64; // lower than before — we recompute normals every frame now, keep it cheap
const GROUND_MAX_R = GROUND_SIZE * 0.5;
const GROUND_BOUNCE_MAX = 0.2;      // giảm biên độ nhô lên
const GROUND_BOUNCE_ATTACK = 15;      // rise chậm hơn một chút
const GROUND_BOUNCE_RELEASE = 2.0;   // fall cũng chậm hơn cho mượt

function SpeakerConeGround({
  color,
  isPlaying,
  analyserRef,
  dataArrayRef,
}: {
  color: string;
  isPlaying: boolean;
  analyserRef: React.RefObject<AnalyserNode | null>;
  dataArrayRef: React.RefObject<Uint8Array>;
}) {
  const pulseRef = useRef(0);
  const idleRef = useRef(0);
  const glowRampRef = useRef(0);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(GROUND_SIZE, GROUND_SIZE, GROUND_SEGMENTS, GROUND_SEGMENTS);
    geo.rotateX(-Math.PI / 2);
    const count = geo.attributes.position.count;
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    return geo;
  }, []);

  const basePositions = useMemo(
    () => (geometry.attributes.position.array as Float32Array).slice(),
    [geometry]
  );

  const baseColor = useMemo(() => new THREE.Color('#1c1522'), []);
  const glowColor = useMemo(() => new THREE.Color('#d4af6a'), []);
  const themeColor = useMemo(() => new THREE.Color(color), [color]);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    let bass = 0;
    let overall = 0;
    if (isPlaying && analyserRef.current) {
      const levels = sampleAudioLevels(analyserRef, dataArrayRef);
      bass = levels.bass;
      overall = levels.overall;
    }

    // slow fade-in/out for the spotlight — small lambda = long ramp (~2–3s to fill, ~1.5s to fade out)
    glowRampRef.current = THREE.MathUtils.damp(glowRampRef.current, isPlaying ? 1 : 0, 0.35, delta);
    const t = state.clock.elapsedTime;
    const glowRampEased = glowRampRef.current * glowRampRef.current;


    const target = isPlaying ? bass : 0;
    const lambda = target > pulseRef.current ? GROUND_BOUNCE_ATTACK : GROUND_BOUNCE_RELEASE;
    pulseRef.current = THREE.MathUtils.damp(pulseRef.current, target, lambda, delta);

    const idleTarget = isPlaying ? 0 : (Math.sin(t * 0.6) * 0.5 + 0.5) * 0.12;
    idleRef.current = THREE.MathUtils.damp(idleRef.current, idleTarget, 1.5, delta);

    const punch = pulseRef.current + idleRef.current;

    const pos = geometry.attributes.position;
    const arr = pos.array as Float32Array;
    const colorAttr = geometry.attributes.color;
    const colArr = colorAttr.array as Float32Array;

    for (let i = 0; i < basePositions.length; i += 3) {
      const bx = basePositions[i];
      const bz = basePositions[i + 2];
      
      const r = Math.min(1, Math.hypot(bx, bz) / GROUND_MAX_R);
      const theta = Math.atan2(bz, bx);

      // 1. PHYSICAL DISPLACEMENT
      const cone = Math.cos(r * Math.PI * 0.5);
      const ripple = Math.sin(r * 10 - t * 2.2) * 0.15 * pulseRef.current;
      arr[i + 1] = (cone * punch + ripple * cone) * GROUND_BOUNCE_MAX;

      // 2. BASE COLOR & BASS GLOW
      const glow = (Math.max(0, cone) * (punch * 1.4) + Math.max(0, ripple) * 0.4) * glowRampEased;
      tmpColor.copy(baseColor).lerp(glowColor, Math.min(1, glow));

      // 3. THE "SPOTLIGHT" THEME GRADIENT
      
      const distortion = 
        Math.sin(theta * 3 + t * 0.5) * 0.15 + 
        Math.cos(theta * 2 - t * 0.3) * 0.1;
      
      const distortedR = Math.max(0, r + distortion);
      
      // RESTORED THE SPOTLIGHT: 1.1 forces it to fade out smoothly before hitting the edges
      const circleMask = Math.max(0, 1 - distortedR * 1.1); 
      
      // Broad, gentle wave
      const flowWave = Math.sin(distortedR * 5 - t * 0.8) * 0.5 + 0.5;

      // Lowered the base audio multiplier so it isn't overpowering
      const audioMultiplier = isPlaying ? (overall * 0.7 + 0.3) : 0.15;
      
      // Lighter density: A subtle 15% base pool of color, letting the 65% wave do the heavy lifting
      const themeIntensity = circleMask * (0.15 + flowWave * 1) * audioMultiplier * glowRampEased;

      // Apply the color
      tmpColor.lerp(themeColor, Math.min(1, Math.max(0, themeIntensity)));

      colArr[i] = tmpColor.r;
      colArr[i + 1] = tmpColor.g;
      colArr[i + 2] = tmpColor.b;
    }
    
    pos.needsUpdate = true;
    colorAttr.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh geometry={geometry} position={[0, -1.58, 0]} receiveShadow>
      <meshStandardMaterial vertexColors roughness={0.7} metalness={0.15} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* -------------------------------------------------------------------- */
/* Wind dust streaks — visible low-flying wisps that sell "you can see  */
/* the wind" skimming across the floor in the same direction. Now in    */
/* two depth layers (near/far) and bursting brighter on bass hits.      */
/* -------------------------------------------------------------------- */

function useWindStreakTexture() {
  return useMemo(() => {
    const w = 128;
    const h = 16;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    // Đuôi (tail, phía sau hướng bay) mờ dần — đầu (head) sáng rõ như vệt sao băng
    grad.addColorStop(0, 'rgba(255,235,190,0)');
    grad.addColorStop(0.55, 'rgba(255,235,190,0.12)');
    grad.addColorStop(0.85, 'rgba(255,244,214,0.55)');
    grad.addColorStop(1, 'rgba(255,250,230,0.9)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

const DUST_STREAK_COUNT = 46;
const GROUND_HALF = GROUND_SIZE / 2;

function WindDustStreaks({
  color,
  isPlaying,
  analyserRef,
  dataArrayRef,
}: {
  color: string;
  isPlaying: boolean;
  analyserRef: React.RefObject<AnalyserNode | null>;
  dataArrayRef: React.RefObject<Uint8Array>;
}) {
  const texture = useWindStreakTexture();
  const themeColor = useMemo(() => new THREE.Color(color), [color]);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const bassPulseRef = useRef(0);

  // Góc quay quanh Y để mặt phẳng luôn hướng đúng theo WIND_DIR
  const windAngle = useMemo(() => Math.atan2(WIND_DIR.x, WIND_DIR.y), []);

  const seeds = useMemo(
    () =>
      Array.from({ length: DUST_STREAK_COUNT }).map(() => {
        const near = Math.random() > 0.45;
        return {
          // vị trí khởi tạo dọc theo trục "ngang gió" (cross) ngẫu nhiên trong phạm vi sàn
          cross: (Math.random() - 0.5) * GROUND_SIZE * 1.1,
          along: (Math.random() - 0.5) * GROUND_SIZE * 1.4,
          y: near ? -1.52 + Math.random() * 0.2 : -1.3 + Math.random() * 0.5, // lớp gần sát sàn, lớp xa lơ lửng cao hơn
          speed: (near ? 0.9 : 0.5) + Math.random() * 0.7,
          length: (near ? 0.7 : 0.4) + Math.random() * 0.7,
          thickness: (near ? 0.028 : 0.016) + Math.random() * 0.016,
          phase: Math.random() * Math.PI * 2,
          driftFreq: 0.4 + Math.random() * 0.5,
          near,
        };
      }),
    []
  );

  useFrame((state, delta) => {
    const { overall, bass } = sampleAudioLevels(analyserRef, dataArrayRef);
    const t = state.clock.elapsedTime;
    const gust = gustEnvelope(t);
    bassPulseRef.current = THREE.MathUtils.damp(bassPulseRef.current, isPlaying ? bass : 0, 5, delta);
    const audioBoost = isPlaying ? overall * 1.3 : 0;
    const speedMul = 1 + gust * 0.8 + audioBoost * 1.0 + bassPulseRef.current * 0.7;

    for (let i = 0; i < seeds.length; i++) {
      const mesh = meshRefs.current[i];
      if (!mesh) continue;
      const s = seeds[i];

      // Di chuyển liên tục theo hướng gió (along), wrap-around khi ra khỏi phạm vi sàn
      let along = s.along + ((t * s.speed * speedMul) % (GROUND_SIZE * 1.4));
      along = ((along + GROUND_SIZE * 0.7) % (GROUND_SIZE * 1.4)) - GROUND_SIZE * 0.7;

      const crossDrift = Math.sin(t * s.driftFreq + s.phase) * 0.25;
      const cross = s.cross + crossDrift;

      const worldX = WIND_DIR.x * along - WIND_DIR.y * cross;
      const worldZ = WIND_DIR.y * along + WIND_DIR.x * cross;

      mesh.position.set(worldX, s.y, worldZ);
      mesh.rotation.y = -windAngle;

      const burst = 1 + bassPulseRef.current * (s.near ? 0.9 : 0.5);
      const stretch = s.length * (1 + gust * 0.4 + audioBoost * 0.6) * burst;
      mesh.scale.set(stretch, s.thickness * (1 + bassPulseRef.current * 0.4), 1);

      const mat = mesh.material as THREE.MeshBasicMaterial;
      const fadeEdge = 1 - Math.min(1, Math.abs(along) / (GROUND_SIZE * 0.65));
      const depthDim = s.near ? 1 : 0.55;
      mat.opacity =
        (0.28 + gust * 0.32 + audioBoost * 0.4 + bassPulseRef.current * 0.35) *
        Math.max(0, fadeEdge) *
        depthDim;
      mat.color.copy(themeColor).lerp(new THREE.Color('#fff4d6'), 0.6 + bassPulseRef.current * 0.2);
    }
  });

  return (
    <group>
      {seeds.map((_, i) => (
        <mesh key={i} ref={(el) => { meshRefs.current[i] = el; }} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={texture} transparent depthWrite={false} side={THREE.DoubleSide} toneMapped={false} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------- */
/* The gramophone itself                                                */
/* -------------------------------------------------------------------- */

function GramophoneModel({
  tracks,
  uiTrackIndex,
  activeTrackIndex,
  isPlaying,
  onSwapComplete,
  analyserRef,        // + thêm
  dataArrayRef,       // + thêm
}: {
  tracks: Track[];
  uiTrackIndex: number;
  activeTrackIndex: number;
  isPlaying: boolean;
  onSwapComplete: () => void;
  analyserRef: React.RefObject<AnalyserNode | null>;   // + thêm
  dataArrayRef: React.RefObject<Uint8Array>;     
}) {
  const gradientMap = useToonGradientMap(4);
  const woodTexture = useWoodTexture();
  const baseWoodMap = useTiledTexture(woodTexture, 2.6, 1.1);
  const platterWoodMap = useTiledTexture(woodTexture, 3, 3);

  const bodyRef = useRef<THREE.Group>(null);
  const platterRef = useRef<THREE.Group>(null);
  const spinSpeedRef = useRef(0);
  const hornLightRef = useRef<THREE.PointLight>(null);
  const bassPulseRef = useRef(0);

  const isSwapping = uiTrackIndex !== activeTrackIndex;

  useFrame((state, delta) => {
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.005;
    }
    const target = isPlaying && !isSwapping ? PLATTER_SPEED : 0;
    const lambda = target > spinSpeedRef.current ? PLATTER_SPINUP_LAMBDA : PLATTER_SPINDOWN_LAMBDA;
    spinSpeedRef.current = THREE.MathUtils.damp(spinSpeedRef.current, target, lambda, delta);
    if (platterRef.current) {
      platterRef.current.rotation.y += spinSpeedRef.current * delta;
    }

    // Đèn ở loa kèn "thở" theo nhịp bass — âm thanh tương tác trực tiếp
    // với ánh sáng môi trường, không chỉ với sàn/lá.
    const { bass } = sampleAudioLevels(analyserRef, dataArrayRef);
    bassPulseRef.current = THREE.MathUtils.damp(bassPulseRef.current, isPlaying ? bass : 0, 5, delta);
    if (hornLightRef.current) {
      hornLightRef.current.intensity = 0.12 + hornGlow.get() * 0.4 + bassPulseRef.current * 0.5;
    }
  });

  const transitions = useTransition(activeTrackIndex, {
    from: { posX: -3.2, posY: 0.55, posZ: 1.9, rotX: 0.32, rotY: -0.45, rotZ: 0.75, scale: 0.9 },
    enter: { posX: 0, posY: 0, posZ: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1 },
    leave: { posX: 3.4, posY: 0.65, posZ: -1.7, rotX: -0.28, rotY: 0.4, rotZ: -0.85, scale: 0.85 },
    config: { tension: 190, friction: 24, mass: 1.1 },
  });

  const { hornGlow } = useSpring({
    hornGlow: isPlaying ? 1 : 0,
    config: { tension: 10, friction: 26 },
  });

  const feet: [number, number][] = [
    [-1.3, -1.05], [1.3, -1.05], [-1.3, 1.05], [1.3, 1.05],
  ];

  const currentColor = tracks[uiTrackIndex]?.color ?? tracks[0].color; 

  return (
    <>
      <group ref={bodyRef}>
        <StylizedPart geo={{ type: 'box', args: [3.0, 0.55, 2.6] }} color={WOOD_BASE_COLOR} map={baseWoodMap} gradientMap={gradientMap} position={[0, -0.85, 0]} />
        <StylizedPart geo={{ type: 'torus', args: [1.15, 0.045, 8, 48] }} color={BRASS_MID} gradientMap={gradientMap} position={[0, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]} />
        <StylizedPart geo={{ type: 'torus', args: [1.15, 0.03, 8, 40] }} color={BRASS_DARK} gradientMap={gradientMap} position={[0, -1.05, 0]} rotation={[Math.PI / 2, 0, 0]} />
        
        {feet.map(([fx, fz], i) => (
          <StylizedPart key={i} geo={{ type: 'cylinder', args: [0.09, 0.07, 0.5, 12] }} color={BRASS_DARK} gradientMap={gradientMap} position={[fx, -1.18, fz]} />
        ))}
        
        <group position={[1.5, -0.72, 0.5]}>
          <StylizedPart geo={{ type: 'cylinder', args: [0.045, 0.045, 0.3, 12] }} color={BRASS_MID} gradientMap={gradientMap} position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]} />
          <StylizedPart geo={{ type: 'cylinder', args: [0.04, 0.04, 0.22, 12] }} color={BRASS_MID} gradientMap={gradientMap} position={[0.25, 0.1, 0]} rotation={[0, 0, 0.3]} />
          <StylizedPart geo={{ type: 'sphere', args: [0.065, 16, 16] }} color={BRASS_LIGHT} gradientMap={gradientMap} position={[0.34, 0.2, 0]} />
        </group>

        <group ref={platterRef} position={[0, -0.55, 0]}>
          <StylizedPart geo={{ type: 'cylinder', args: [1.05, 1.05, 0.15, 48] }} color={WOOD_DARK_COLOR} map={platterWoodMap} gradientMap={gradientMap} />
          <StylizedPart geo={{ type: 'cylinder', args: [0.95, 0.95, 0.02, 48] }} color={FELT_GREEN} gradientMap={gradientMap} position={[0, 0.08, 0]} />
          <StylizedPart geo={{ type: 'cylinder', args: [0.055, 0.075, 0.32, 16] }} color={BRASS_MID} gradientMap={gradientMap} position={[0, 0.16, 0]} />
          
          <group position={[0, 0.09, 0]}>
            {transitions((style, item) => (
              <Suspense key={item} fallback={null}>
                <VinylDisc track={tracks[item] ?? tracks[0]} style={style} gradientMap={gradientMap} />
              </Suspense>
            ))}
          </group>
        </group>

        <ArmRest gradientMap={gradientMap} />
        
        <Tonearm 
          gradientMap={gradientMap} 
          isPlaying={isPlaying} 
          uiTrackIndex={uiTrackIndex} 
          onSwapComplete={onSwapComplete} 
        />

        <SwanNeckHorn gradientMap={gradientMap} isPlaying={isPlaying} />

        <pointLight
          ref={hornLightRef}
          position={[-1.75, 0.55, 0.35]}
          intensity={0.12}
          color="#ffdca0"
          distance={3.2}
        />
      </group>
      <SpeakerConeGround color={currentColor} isPlaying={isPlaying} analyserRef={analyserRef} dataArrayRef={dataArrayRef} />
      <AudioVisualizer color={currentColor} isPlaying={isPlaying} analyserRef={analyserRef} dataArrayRef={dataArrayRef} />
    </>
    
  );
}

/* -------------------------------------------------------------------- */
/* 2D transport controls                                                */
/* -------------------------------------------------------------------- */

function PrevIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#241623]"><path d="M6 6h2v12H6zM20 6L9 12l11 6z" /></svg>;
}
function NextIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#241623]"><path d="M16 6h2v12h-2zM4 6l11 6-11 6z" /></svg>;
}
function PlayIcon() {
  return <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white"><path d="M8 5v14l11-7z" /></svg>;
}
function PauseIcon() {
  return <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>;
}

/* -------------------------------------------------------------------- */
/* Web Audio analyser — feeds the visualizer & ground wave              */
/* -------------------------------------------------------------------- */

function useAudioAnalyser() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const dataArrayRef = useRef<Uint8Array>(new Uint8Array(64));

  // Must only be called ONCE per <audio> element (browser restriction)
  const connect = useCallback((audioEl: HTMLAudioElement) => {
    if (sourceRef.current) return;
    try {
      const AudioCtxClass: typeof AudioContext =
        (window as any).AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtxClass();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.82;

      const source = ctx.createMediaElementSource(audioEl);
      source.connect(analyser);
      analyser.connect(ctx.destination); // keep audio audible

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    } catch (err) {
      console.log('Audio analyser unavailable:', err);
    }
  }, []);

  // AudioContext starts 'suspended' until a real user gesture resumes it
  const resume = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }, []);

  return { analyserRef, dataArrayRef, connect, resume };
}

function sampleFrequencyLevel(
  analyserRef: React.MutableRefObject<AnalyserNode | null>,
  dataArrayRef: React.MutableRefObject<Uint8Array>
) {
  const analyser = analyserRef.current;
  const data = dataArrayRef.current;
  if (!analyser) {
    data.fill(0);
    return 0;
  }
  analyser.getByteFrequencyData(data as Uint8Array<ArrayBuffer>);
  let sum = 0;
  for (let i = 0; i < data.length; i++) sum += data[i];
  return sum / data.length / 255;
}

// Combined overall + bass-only reading in a single analyser fetch, used
// by every environment effect (ground bands, dust bursts, leaf gusts,
// horn light pulses) so audio visibly "pushes" the whole scene, not just
// the equalizer bars.
function sampleAudioLevels(
  analyserRef: React.MutableRefObject<AnalyserNode | null>,
  dataArrayRef: React.MutableRefObject<Uint8Array>
) {
  const analyser = analyserRef.current;
  const data = dataArrayRef.current;
  if (!analyser) return { overall: 0, bass: 0 };
  analyser.getByteFrequencyData(data as Uint8Array<ArrayBuffer>);
  const bassBins = Math.max(1, Math.floor(data.length * 0.18));
  let sum = 0;
  let bassSum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i];
    if (i < bassBins) bassSum += data[i];
  }
  return { overall: sum / data.length / 255, bass: bassSum / bassBins / 255 };
}

/* -------------------------------------------------------------------- */
/* Main export                                                          */
/* -------------------------------------------------------------------- */

interface GramophonePlayerProps {
  tracks?: Track[];
}

export default function GramophonePlayer({ tracks = DEFAULT_TRACKS }: GramophonePlayerProps) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // States cho Audio thực tế
  const [progress, setProgress] = useState(0); // Tính bằng % (0-100)
  const [duration, setDuration] = useState(0); // Tính bằng giây
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio analyser cho visualizer + ground wave
  const analyser = useAudioAnalyser();

  const track = tracks[trackIndex];

  // Thêm state quản lý âm lượng (từ 0.0 đến 1.0)
  const [volume, setVolume] = useState(80);

  // Cập nhật âm lượng cho thẻ audio mỗi khi state thay đổi
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(1, Math.max(0, volume / 100));
    }
  }, [volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value); // 0-100
    setVolume(v);
  };

  const handleTrackEnded = useCallback(() => {
    setTrackIndex((i) => {
      if (i + 1 >= tracks.length) {
        setIsPlaying(false); // list finished — stop instead of looping
        return i;
      }
      return i + 1; // otherwise advance and keep playing (isPlaying stays true)
    });
  }, [tracks.length]);

  // 1. Khởi tạo Audio khi component được mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Guard: chỉ tạo Audio element MỘT LẦN DUY NHẤT, kể cả khi
    // React 18 Strict Mode (dev) chạy effect mount → cleanup → mount lại.
    if (!audioRef.current) {
      audioRef.current = new Audio(tracks[0].audio);
      audioRef.current.crossOrigin = 'anonymous';
      analyser.connect(audioRef.current); // chỉ chạy đúng 1 lần, gắn đúng với audio element thật
    }

    const audioEl = audioRef.current;

    const updateProgress = () => {
      if (audioEl.duration) {
        setProgress((audioEl.currentTime / audioEl.duration) * 100);
      }
    };

    const setAudioData = () => {
      setDuration(audioEl.duration);
    };

    audioEl.addEventListener('timeupdate', updateProgress);
    audioEl.addEventListener('loadedmetadata', setAudioData);
    audioEl.addEventListener('ended', handleTrackEnded);

    return () => {
      // Chỉ gỡ listener — KHÔNG pause / KHÔNG set audioRef.current = null ở đây.
      // Nếu null hoá, Strict Mode double-invoke sẽ buộc phải tạo lại Audio element
      // mới ở lần mount thứ 2, và MediaElementSourceNode cũ (đã gắn analyser)
      // sẽ vĩnh viễn "điếc" với element mới đó.
      audioEl.removeEventListener('timeupdate', updateProgress);
      audioEl.removeEventListener('loadedmetadata', setAudioData);
      audioEl.removeEventListener('ended', handleTrackEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks]);

  // Ref theo dõi trạng thái isPlaying mới nhất cho các effect khác dùng
  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Effect xử lý khi đổi track (src, load, seek start_time, autoplay nếu đang playing)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[trackIndex].audio;
      audioRef.current.load();
      audioRef.current.currentTime = tracks[trackIndex].start_time;

      if (isPlayingRef.current) {
        audioRef.current.play().catch((err) => console.log("Autoplay prevented:", err));
      }
    }
  }, [trackIndex, tracks]);

  // Effect chỉ xử lý pause khi isPlaying=false
  // play() luôn được gọi trực tiếp trong onClick handler để tránh bị chặn autoplay
  useEffect(() => {
    if (!audioRef.current) return;

    if (!isPlaying) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Pause playback when this component unmounts (e.g. navigating to another page/component)
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleNext = useCallback(() => {
    setTrackIndex((i) => (i + 1) % tracks.length);
  }, [tracks.length]);

  const handlePrev = useCallback(() => {
    setTrackIndex((i) => (i - 1 + tracks.length) % tracks.length);
  }, [tracks.length]);

  const handlePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      analyser.resume(); // resume AudioContext ngay trong user gesture
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log("Play prevented:", err);
          setIsPlaying(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  const selectTrack = (index: number) => {
    setTrackIndex(index);
    // Don't auto-play — just switch the track, preserve current playing state.
    // If already playing, the existing useEffect on [trackIndex] will load
    // the new src and call play() because isPlayingRef.current is true.
    // If paused, it just loads the new track silently.
  };

  const handleSwapComplete = useCallback(() => {
    setActiveTrackIndex(trackIndex);
  }, [trackIndex]);

  // Hàm xử lý khi user kéo thanh tiến trình (Seek)
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercent = Number(e.target.value);
    setProgress(newPercent);
    if (audioRef.current && duration) {
      audioRef.current.currentTime = (newPercent / 100) * duration;
    }
  };

  // Format giây thành MM:SS
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full h-[800px] lg:h-[640px] flex flex-col lg:flex-row rounded-[2.5rem] overflow-hidden border-[6px] border-black/80 bg-[#fdf6e3] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

      {/* ============================================================== */}
      {/* LEFT HALF: 3D Scene */}
      {/* ============================================================== */}
      <div className="relative w-full h-[350px] lg:h-full lg:w-1/2] bg-gradient-to-br from-[#c9773a] via-[#b85c28] to-[#8b3e1a] border-b-[6px] lg:border-b-0 lg:border-r-[6px] border-black/80">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1.6, 7.2], fov: 38 }}>
          <color attach="background" args={['#f5ede0']} />
          <ambientLight intensity={0.7} color="#fff8f0" />
          <directionalLight position={[5, 8, 4]} intensity={0.9} castShadow shadow-mapSize={[1024, 1024]} color="#fff5e6" />
          <directionalLight position={[-6, 3, -4]} intensity={0.3} color="#ffe9b8" />

          {/* Warm afternoon sunlight from the left — like sunlight through a window */}
          <pointLight position={[-5, 3, 2]} intensity={1.2} color="#ffb347" distance={12} decay={2} />
          {/* Soft fill from the right to keep shadows from going too dark */}
          <pointLight position={[5, 2, 3]} intensity={0.5} color="#fff3e0" distance={10} decay={2} />

          <Suspense fallback={null}>
            <Environment files="/hdri/lebombo_1k.hdr" background={false} />
            <FloatingLeaves
              isPlaying={isPlaying}
              analyserRef={analyser.analyserRef}
              dataArrayRef={analyser.dataArrayRef}
            />
          </Suspense>

          <PresentationControls global snap={true} polar={[-0.25, 0.35]} azimuth={[-Infinity, Infinity]} rotation={[0.04, -0.55, 0]}>
            <Suspense fallback={null}>
              <group position={[0, -0.3, 0]}>
                <RoomDecor />   
                <GramophoneModel
                  tracks={tracks}
                  uiTrackIndex={trackIndex}
                  activeTrackIndex={activeTrackIndex}
                  isPlaying={isPlaying}
                  onSwapComplete={handleSwapComplete}
                  analyserRef={analyser.analyserRef}
                  dataArrayRef={analyser.dataArrayRef}
                />
              </group>
            </Suspense>
          </PresentationControls>

          <ContactShadows position={[0, -1.55, 0]} opacity={0.35} scale={13} blur={3.2} far={2.2} color="#8b5e3c" />
        </Canvas>

        {/* Vintage Badge */}
        <div className="absolute top-5 left-5">
          <div className="pointer-events-auto select-none rounded-xl border-[3px] border-black bg-[#fdf6e3] px-3 py-1 text-xs font-black tracking-wide text-[#4a2f18] shadow-[3px_3px_0px_rgba(0,0,0,0.85)]">
            📀 GRAMOPHONE
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* RIGHT HALF: UI & Controls (Vintage Album Browser) */}
      {/* ============================================================== */}
      <div className="flex w-full lg:w-1/2 flex-1 min-h-0 lg:h-full lg:flex-none flex-col p-3 lg:p-10 bg-gradient-to-br from-[#F4EBE0] to-[#E9DFD0]">

        {/* Header */}
        <div className="flex w-full flex-col items-center text-center px-4 lg:px-8">
          <p className="text-[10px] lg:text-[12px] font-bold uppercase tracking-[0.3em] text-[#8C7A6B]">
            On Air
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={trackIndex}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-[90%] mx-auto overflow-hidden"
            >
              <h2 className="font-serif text-xl lg:text-3xl italic text-[#2C241B] whitespace-nowrap overflow-hidden text-ellipsis md:whitespace-normal md:overflow-visible mt-1">
                {track.title}
              </h2>
              <p className="font-['IBM_Plex_Mono'] text-base lg:text-2xl font-bold uppercase tracking-widest text-[#2C241B]/70 whitespace-nowrap overflow-hidden text-ellipsis md:whitespace-normal md:overflow-visible mt-1">
                {track.artist}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Album Cover Carousel */}
        <div className="flex-1 min-h-0 flex items-center justify-center perspective-[1200px] min-h-[200px] lg:min-h-[300px]">
          <div className="relative flex items-center justify-center w-full h-full">
            {tracks.map((t, i) => {
              const distance = i - trackIndex;
              if (Math.abs(distance) > 2) return null;

              const isActive = distance === 0;
              const xOffset = distance * 140;
              const scale = isActive ? 1.15 : 1 - Math.abs(distance) * 0.15;
              const zIndex = 10 - Math.abs(distance);
              const opacity = isActive ? 1 : 1 - Math.abs(distance) * 0.4;
              const rotateY = distance * -20;

              return (
                <motion.button
                  key={t.id}
                  onClick={() => selectTrack(i)}
                  initial={false}
                  animate={{
                    x: xOffset,
                    scale: scale,
                    opacity: opacity,
                    rotateY: rotateY,
                    zIndex: zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 25,
                    mass: 1.2
                  }}
                  className={`absolute origin-center w-40 h-40 lg:w-56 lg:h-56 transition-shadow duration-300 ${
                    isActive ? "shadow-[0_20px_40px_rgba(0,0,0,0.4)]" : "shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                  }`}
                >
                  <div className="group relative w-full h-full">
                    {/* Vinyl disc peeking out from behind the sleeve */}
                    <div
                      className="absolute top-1/2 -right-[6%] -translate-y-1/2 w-[92%] aspect-square rounded-full pointer-events-none transition-transform duration-500 ease-out group-hover:translate-x-[12%]"
                      style={{
                        background:
                          'repeating-radial-gradient(circle at center, #0a0a0a 0px, #1a1a1a 2px, #0a0a0a 3px, #161616 4px)',
                        boxShadow: 'inset 0 0 24px rgba(0,0,0,0.85), 0 4px 12px rgba(0,0,0,0.6)',
                      }}
                    >
                      <div className="absolute top-1/2 left-1/2 w-[32%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900" />
                      <div className="absolute top-1/2 left-1/2 w-[6%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
                    </div>

                    <div className="relative w-full h-full overflow-hidden rounded-sm bg-[#111] shadow-[4px_8px_18px_rgba(0,0,0,0.55)]">
                      <img
                        src={t.cover}
                        alt={t.title}
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                      <div className="absolute inset-0 border-[2px] border-white/10 mix-blend-overlay pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20 pointer-events-none" />
                      <div className="absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-black/55 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 shadow-[inset_0_0_28px_rgba(0,0,0,0.4)] pointer-events-none" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Footer (Pagination & Controls) */}
        <div className="flex flex-col items-center gap-2 lg:gap-4 mt-auto pb-1 lg:pb-4">

          {/* Pagination Dots */}
          <div className="flex gap-2.5">
            {tracks.map((t, i) => (
              <button
                key={`dot-${t.id}`}
                onClick={() => selectTrack(i)}
                className="relative h-2 w-2"
                aria-label={`Go to track ${i + 1}`}
              >
                <span className={`absolute inset-0 rounded-full transition-all duration-300 ${i === trackIndex ? 'bg-[#2C241B] scale-125' : 'bg-[#2C241B]/20 hover:bg-[#2C241B]/40'}`} />
              </button>
            ))}
          </div>

          {/* Progress Bar (Draggable) */}
          <div className="flex w-[85%] max-w-[350px] flex-col gap-2 mt-2">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress || 0}
              onChange={handleSeek}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#8C7A6B] focus:outline-none transition-all
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3.5
                [&::-webkit-slider-thumb]:h-3.5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[#8C7A6B]
                [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(140,122,107,0.5)]
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-[#FDFBF7]
                [&::-webkit-slider-thumb]:transition-transform
                [&::-webkit-slider-thumb]:duration-150
                hover:[&::-webkit-slider-thumb]:scale-125
                active:[&::-webkit-slider-thumb]:scale-110
                [&::-moz-range-thumb]:w-3.5
                [&::-moz-range-thumb]:h-3.5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-[#8C7A6B]
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-[#FDFBF7]
                [&::-moz-range-thumb]:shadow-[0_1px_4px_rgba(140,122,107,0.5)]"
              style={{
                background: `linear-gradient(to right, #8C7A6B ${progress}%, #D9CDBF ${progress}%)`,
                boxShadow: "inset 0 1px 2px rgba(140,122,107,0.15)"
              }}
            />

            <div className="flex items-center justify-between font-mono font-bold text-[17px] text-[#8C7A6B] mt-1">
              <div className="flex gap-1">
                <span>{formatTime((progress / 100) * duration)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>

              <div className="flex items-center gap-2 group">
                <VolumeIcon muted={volume === 0} />
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 rounded-full appearance-none cursor-pointer accent-[#8C7A6B] focus:outline-none transition-all
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-2.5
                    [&::-webkit-slider-thumb]:h-2.5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-[#8C7A6B]
                    [&::-webkit-slider-thumb]:border
                    [&::-webkit-slider-thumb]:border-[#FDFBF7]
                    [&::-webkit-slider-thumb]:shadow-[0_1px_3px_rgba(140,122,107,0.5)]
                    [&::-webkit-slider-thumb]:transition-transform
                    [&::-webkit-slider-thumb]:duration-150
                    hover:[&::-webkit-slider-thumb]:scale-125
                    [&::-moz-range-thumb]:w-2.5
                    [&::-moz-range-thumb]:h-2.5
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-[#8C7A6B]
                    [&::-moz-range-thumb]:border
                    [&::-moz-range-thumb]:border-[#FDFBF7]"
                  style={{
                    background: `linear-gradient(to right, #8C7A6B ${volume}%, #D9CDBF ${volume}%)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Transport Controls */}
          <div className="flex items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.15, rotate: -8 }}
              whileTap={{ scale: 0.85 }}
              onClick={handlePrev}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-black bg-white shadow-[3px_3px_0px_rgba(0,0,0,0.85)]"
            >
              <PrevIcon />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.88 }}
              animate={isPlaying ? { scale: [1, 1.08, 1] } : { scale: 1 }}
              transition={isPlaying ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
              onClick={handlePlayPause}
              className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full border-[4px] border-black shadow-[4px_4px_0px_rgba(0,0,0,0.85)] transition-colors"
              style={{ backgroundColor: track.color }}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.15, rotate: 8 }}
              whileTap={{ scale: 0.85 }}
              onClick={handleNext}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-black bg-white shadow-[3px_3px_0px_rgba(0,0,0,0.85)]"
            >
              <NextIcon />
            </motion.button>

          </div>
        </div>
      </div>
    </div>
  );
}