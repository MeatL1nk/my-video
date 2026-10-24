import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {C} from './theme';
import {CHAPTERS} from './data';
import {seg, segBack} from './graphics-v2';

// 贯穿全片的时间轴：发光进度、节点脉冲、当前章节标题胶囊
export const TimelineAxis: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const x0 = 120;
  const x1 = 1800;
  const y = 940;
  const progress = interpolate(f, [0, 3540], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const markerX = x0 + (x1 - x0) * progress;

  return (
    <svg
      width={1920}
      height={1080}
      style={{position: 'absolute', top: 0, left: 0}}
    >
      <defs>
        <linearGradient id="axis-progress" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={C.orange} stopOpacity={0.5} />
          <stop offset="100%" stopColor={C.orange} />
        </linearGradient>
        <filter id="axis-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 刻度 */}
      {Array.from({length: 17}, (_, i) => {
        const x = x0 + ((x1 - x0) / 16) * i;
        return (
          <line
            key={i}
            x1={x}
            y1={y - 8}
            x2={x}
            y2={y + 8}
            stroke={C.gray}
            strokeWidth={2}
            opacity={0.45}
          />
        );
      })}

      <line x1={x0} y1={y} x2={x1} y2={y} stroke={C.gray} strokeWidth={3} opacity={0.7} />
      <line
        x1={x0}
        y1={y}
        x2={markerX}
        y2={y}
        stroke="url(#axis-progress)"
        strokeWidth={5}
        strokeLinecap="round"
      />

      {CHAPTERS.map((c) => {
        const cx = x0 + (x1 - x0) * (c.from / 3540);
        const since = f - c.from;
        const on = since >= 0;
        const ring = on ? 15 + 3.5 * Math.sin(t * 2.6 + c.id) : 9;
        const labelP =
          segBack(since, 0, 16) * (1 - seg(since, c.duration - 18, c.duration));
        return (
          <g key={c.id}>
            {on ? (
              <circle cx={cx} cy={y} r={ring + 11} fill={C.orange} opacity={0.15} />
            ) : null}
            <circle
              cx={cx}
              cy={y}
              r={ring}
              fill={on ? C.orange : C.bgDeep}
              stroke={on ? C.orange : C.gray}
              strokeWidth={3}
            />
            <text
              x={cx}
              y={y + 52}
              textAnchor="middle"
              fill={on ? C.white : C.gray}
              fontSize={22}
              stroke={C.bg}
              strokeWidth={5}
              paintOrder="stroke"
            >
              {c.year}
            </text>
            <g
              opacity={labelP}
              transform={`translate(${cx} ${y - 62}) scale(${0.82 + labelP * 0.18})`}
            >
              <rect x={-100} y={-32} width={200} height={46} rx={23} fill={C.orange} opacity={0.93} />
              <text
                x={0}
                y={2}
                textAnchor="middle"
                fill={C.bg}
                fontSize={24}
                fontWeight={700}
              >
                {c.title}
              </text>
            </g>
          </g>
        );
      })}

      {/* 播放头 */}
      <g filter="url(#axis-glow)">
        <circle cx={markerX} cy={y} r={9} fill={C.white} />
      </g>
      <circle
        cx={markerX}
        cy={y}
        r={16 + 4 * Math.sin(t * 4)}
        fill="none"
        stroke={C.white}
        strokeWidth={2}
        opacity={0.5}
      />
    </svg>
  );
};

