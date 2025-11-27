import type { DrillHole } from '@/types/geometric';

export const boardDrill = (width: number, height: number, holeDiameter: number, holeToEdge: number): DrillHole[] => {

  const x = (width / 2) - holeToEdge;
  const y = (height / 2) - holeToEdge;

  return [
    {
      x,
      y,
      radius: holeDiameter / 2,
    },
    {
      x: -x,
      y,
      radius: holeDiameter / 2,
    },
    {
      x: -x,
      y: -y,
      radius: holeDiameter / 2,
    },
    {
      x,
      y: -y,
      radius: holeDiameter / 2,
    },
  ];
};
