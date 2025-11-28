'use client';

import { BoardDimensions } from '@/components/BoardDimensions';
import { BoardPreview } from '@/components/BoardPreview';
import { GetBoard } from '@/components/GetBoard';
import { Shapes } from '@/components/Shapes';
import { ShapesMenu } from '@/components/ShapesMenu';

export default function Home() {
  return (
    <div className="app">
      <h2 className="app__title">SVG-Wave</h2>
      <ShapesMenu />
      <Shapes />
      <div className="app__cols">
        <BoardPreview />
        <BoardDimensions />
      </div>
      <GetBoard />
    </div>
  );
}
