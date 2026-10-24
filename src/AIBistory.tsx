import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {C, FONT} from './theme';
import {Backdrop} from './graphics-v2';
import {TimelineAxis} from './TimelineAxis';
import {
  Chapter1,
  Chapter2,
  Chapter3,
  Chapter4,
  Chapter5,
  Intro,
  Outro,
} from './scenes-v2';

// 配乐：把 music.mp3 放入 public/ 后取消下面两行的注释
// import {Audio, staticFile} from 'remotion';

export const AIBistory: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: C.bg, fontFamily: FONT}}>
      {/* 配乐淡入淡出：volume 回调按帧控制
          <Audio src={staticFile('music.mp3')} volume={(f) =>
            f < 30 ? f / 30 : f > 3480 ? Math.max(0, (3600 - f) / 120) : 0.9
          } /> */}
      <Backdrop drift={0} />
      <TimelineAxis />
      <Sequence from={0} durationInFrames={150}>
        <Intro />
      </Sequence>
      <Sequence from={150} durationInFrames={600}>
        <Chapter1 />
      </Sequence>
      <Sequence from={750} durationInFrames={660}>
        <Chapter2 />
      </Sequence>
      <Sequence from={1410} durationInFrames={600}>
        <Chapter3 />
      </Sequence>
      <Sequence from={2010} durationInFrames={810}>
        <Chapter4 />
      </Sequence>
      <Sequence from={2820} durationInFrames={720}>
        <Chapter5 />
      </Sequence>
      <Sequence from={3540} durationInFrames={60}>
        <Outro />
      </Sequence>
      {/* 暗角：让注意力集中在中央信息图 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(1250px 780px at 50% 44%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.42) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

