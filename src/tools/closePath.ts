import type { Point } from '@/types/geometric';

export const closePath = (points: Point[]): Point[] => {
  if (points.length < 1) {
    return [];
  }

  return [
    ...points,
    points[0],
  ];
};
