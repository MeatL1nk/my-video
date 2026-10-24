import React from 'react';
import {interpolate, Easing} from 'remotion';
import {C} from './theme';

// ================= 动效工具 =================

export const seg = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

export const segBack = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.7)),
  });

export const dash = (p: number) => ({
  pathLength: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1 - p,
});

// 通用发光滤镜（组件内以唯一 id 使用）
const Glow: React.FC<{id: string; std?: number}> = ({id, std = 7}) => (
  <filter id={id} x="-70%" y="-70%" width="240%" height="240%">
    <feGaussianBlur stdDeviation={std} result="blur" />
    <feMerge>
      <feMergeNode in="blur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
);

// ================= 背景：径向渐变 + 极淡网格 =================

export const Backdrop: React.FC<{drift: number}> = ({drift}) => (
  <div style={{position: 'absolute', inset: 0}}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(1300px 760px at 50% 36%, #123055 0%, ${C.bg} 55%, ${C.bgDeep} 100%)`,
      }}
    />
    <svg
      width={1920}
      height={1180}
      style={{position: 'absolute', top: -50, left: 0, opacity: 0.14}}
    >
      {Array.from({length: 25}, (_, i) => (
        <line key={`v${i}`} x1={i * 80} y1={0} x2={i * 80} y2={1180} stroke={C.gray} strokeWidth={1} />
      ))}
      {Array.from({length: 15}, (_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 80 + drift} x2={1920} y2={i * 80 + drift} stroke={C.gray} strokeWidth={1} />
      ))}
    </svg>
  </div>
);

// ================= S1 神经元网络 =================

export const NeuronNet: React.FC<{p: number; t: number}> = ({p, t}) => {
  const nodes: Array<[number, number]> = [
    [70, 130],
    [210, 60],
    [210, 205],
    [360, 110],
    [360, 220],
    [510, 165],
  ];
  const edges: Array<[number, number]> = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [3, 5],
    [4, 5],
  ];
  return (
    <svg width={620} height={280} viewBox="0 0 620 280">
      <defs>
        <Glow id="nn-glow" std={5} />
      </defs>
      <g filter="url(#nn-glow)">
        {edges.map(([a, b], i) => {
          const [x1, y1] = nodes[a];
          const [x2, y2] = nodes[b];
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={C.blue}
              strokeWidth={4}
              strokeLinecap="round"
              opacity={0.85}
              {...dash(seg(p, i * 0.08, i * 0.08 + 0.5))}
            />
          );
        })}
        {[0, 1, 2].map((i) => {
          const e = edges[(i * 3) % edges.length];
          const [x1, y1] = nodes[e[0]];
          const [x2, y2] = nodes[e[1]];
          const k = (t * 0.42 + i * 0.33) % 1;
          return (
            <circle
              key={`pulse-${i}`}
              cx={x1 + (x2 - x1) * k}
              cy={y1 + (y2 - y1) * k}
              r={7}
              fill={C.orange}
              opacity={0.95 * seg(p, 0.45, 0.8)}
            />
          );
        })}
        {nodes.map(([x, y], i) => (
          <g key={i} opacity={seg(p, i * 0.08, i * 0.08 + 0.3)}>
            <circle cx={x} cy={y} r={(i === 0 ? 20 : 15) * segBack(p, i * 0.08, i * 0.08 + 0.35)} fill={i === 0 ? C.orange : C.white} />
            {i === 0 ? <circle cx={x} cy={y} r={30} fill={C.orange} opacity={0.18} /> : null}
          </g>
        ))}
      </g>
    </svg>
  );
};

// ================= S2 打字机与纸带 =================

export const PaperStrip: React.FC<{p: number; t: number}> = ({p, t}) => {
  const caret = Math.sin(t * 7) > 0 ? 1 : 0;
  return (
    <svg width={820} height={320} viewBox="0 0 820 320">
      <defs>
        <linearGradient id="ps-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={C.blue} />
        </linearGradient>
      </defs>
      {/* 纸带 */}
      <rect x={285} y={28} width={250} height={110} rx={8} fill={C.white} opacity={0.92} />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={300 + i * 55} cy={40} r={4} fill={C.bg} opacity={0.35} />
      ))}
      <rect x={305} y={72} width={180 * seg(p, 0, 0.9)} height={12} rx={6} fill={C.gray} />
      <rect x={305} y={98} width={120 * seg(p, 0.3, 1)} height={12} rx={6} fill={C.orange} />
      {/* 机身 */}
      <rect x={260} y={130} width={300} height={140} rx={16} fill="url(#ps-body)" />
      <rect x={288} y={152} width={244} height={8} rx={4} fill={C.bg} opacity={0.25} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={292 + i * 48}
          y={196 + Math.sin(t * 9 + i * 1.7) * 1.5}
          w
