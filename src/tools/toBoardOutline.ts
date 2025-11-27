import { closePath } from '@/tools/closePath';
import type { Point } from '@/types/geometric';

export const toBoardOutline = (width: number, height: number): Point[] => {
  const chamfer = Math.min(10, (width * height) / 1000);

  const x = width / 2;
  const y = height / 2;

  const points: Point[] = [
    { x, y: 0 },
    { x, y: y - chamfer },
    { x: x - chamfer, y },
    { x: chamfer - x, y },
    { x: -x, y: y - chamfer },
    { x: -x, y: chamfer - y },
    { x: chamfer - x, y: -y },
    { x: x - chamfer, y: -y },
    { x, y: chamfer - y },
  ];

  return closePath(points);
};
