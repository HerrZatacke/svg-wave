import type { Point } from '@/types/geometric';

export const closePath = (points: Point[]): Point[] => {
  if (points.length < 3) {
    return [];
  }

  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];

  if (
    firstPoint.x === lastPoint.x &&
    firstPoint.y === lastPoint.y
  ) {
    return points;
  }

  return [
    ...points,
    firstPoint,
  ];
};
