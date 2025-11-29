import { Point } from '@/types/geometric.ts';

const svgPoint = (lm: 'L'|'M', x: number, y: number): string => {
  return `${lm}${x.toFixed(2)} ${y.toFixed(2)}`;
};

export const pointsToPath = (points: Point[]): string => (
  points.map((point: Point, index: number) => {
    const lm = index ? 'L' : 'M';
    return svgPoint(lm, point.x, point.y);
  }).join(' ')
);
