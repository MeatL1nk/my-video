import React from 'react';
import {Composition} from 'remotion';
import {AIBistory} from './AIBistory';
import {FPS, TOTAL_FRAMES} from './data';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AI-History"
      component={AIBistory}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};

