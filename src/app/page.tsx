'use client';

import { BoardDimensions } from '@/components/BoardDimensions';
import { BoardPreview } from '@/components/BoardPreview';
import { GetBoard } from '@/components/GetBoard';
import { Shapes } from '@/components/Shapes';

export default function Home() {
  return (
    <div className="app">
      <h2 className="app__title">SVG-Wave</h2>
      <Shapes />
      <div className="app__cols">
        <BoardPreview />
        <BoardDimensions />
      </div>
      <GetBoard />
    </div>
  );
}
