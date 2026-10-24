import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {C} from './theme';
import {
  AttentionWords,
  CardFeed,
  ChessBadge,
  DualLines,
  GrowthCurve,
  LayerStack,
  MeetingTable,
  MergeLines,
  NeuronNet,
  PaperStrip,
  RuleBook,
  Snow,
  ThreeWires,
  seg,
  segBack,
} from './graphics-v2';

// ================= 通用版式 =================

const Shot: React.FC<{
  from: number;
  duration: number;
  children: React.ReactNode;
}> = ({from, duration, children}) => (
  <Sequence from={from} durationInFrames={duration}>
    {children}
  </Sequence>
);

// 舞台：轻微推镜 + 统一淡入淡出
const Stage: React.FC<{dur: number; children: React.ReactNode}> = ({
  dur,
  children,
}) => {
  const f = useCurrentFrame();
  const z = seg(f, 0, 45);
  const opacity = seg(f, 0, 8) * (1 - seg(f, dur - 10, dur));
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 210,
        opacity,
        transform: `scale(${1.055 - 0.055 * z}) translateY(${(1 - z) * 18}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// 章节标题卡：幽灵编号 + 标题 + 年份胶囊
const ChapterTag: React.FC<{num: string; title: string; year: string}> = ({
  num,
  title,
  year,
}) => {
  const f = useCurrentFrame();
  const inP = segBack(f, 4, 28);
  const outP = 1 - seg(f, 120, 152);
  const o = inP * outP;
  return (
    <div
      style={{
        position: 'absolute',
        left: 140,
        top: 84,
        display: 'flex',
        alignItems: 'baseline',
        gap: 30,
        opacity: o,
        transform: `translateY(${(1 - inP) * 28}px)`,
      }}
    >
      <div
        style={{
          fontSize: 128,
          fontWeight: 900,
          color: C.orange,
          opacity: 0.26,
          lineHeight: 1,
        }}
      >
        {num}
      </div>
      <div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: C.white,
            letterSpacing: 5,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 12,
            display: 'inline-block',
            background: C.orange,
            color: C.bg,
            fontSize: 24,
            fontWeight: 700,
            padding: '7px 20px',
            borderRadius: 999,
            letterSpacing: 2,
          }}
        >
          {year}
        </div>
      </div>
    </div>
  );
};

// 屏幕文案：橙色竖条 + 标题 + 橙色小字（绝不整段上屏）
const Caption: React.FC<{title: string; sub?: string}> = ({title, sub}) => {
  const f = useCurrentFrame();
  const p = seg(f, 4, 18);
  return (
    <div
      style={{
        position: 'absolute',
        left: 140,
        bottom: 232,
        opacity: p,
        transform: `translateY(${(1 - p) * 22}px)`,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
        <div
          style={{
            width: 8,
            height: 56,
            borderRadius: 4,
            background: C.orange,
          }}
        />
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: C.white,
            letterSpacing: 2,
          }}
        >
          {title}
        </div>
      </div>
      {sub ? (
        <div
          style={{
            marginLeft: 30,
            marginTop: 12,
            fontSize: 26,
            color: C.orange,
            letterSpacing: 2,
            opacity: seg(f, 12, 30),
          }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
};

// ================= 开场（150f / 5s） =================

export const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const lineP = seg(f, 0, 32);
  const q = segBack(f, 16, 50);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div
        style={{
          fontSize: 70,
          fontWeight: 800,
          color: C.white,
          letterSpacing: 4,
          opacity: q,
          transform: `scale(${0.9 + q * 0.1})`,
        }}
      >
        机器，能像人一样思考吗？
      </div>
      <div
        style={{
          marginTop: 34,
          fontSize: 56,
          fontWeight: 900,
          color: C.orange,
          opacity: q,
          transform: `scale(${1 + 0.06 * Math.sin(t * 3)})`,
        }}
      >
        ?
      </div>
      <svg width={1200} height={60} style={{marginTop: 26}}>
        <line
          x1={600 - 520 * lineP}
          y1={30}
          x2={600 + 520 * lineP}
          y2={30}
          stroke={C.orange}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <circle cx={600 + 520 * lineP} cy={30} r={7} fill={C.orange} opacity={lineP > 0.98 ? 1 : 0} />
      </svg>
    </AbsoluteFill>
  );
};

// ================= 第 1 章（600f / 20s） =================

const S1: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Stage dur={150}>
        <NeuronNet p={seg
