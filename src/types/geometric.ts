export interface Point {
  x: number;
  y: number;
}

export type Line = [Point, Point];

export interface WavePaths {
  points: Point[];
  pointsInner: Point[];
  pointsOuter: Point[];
  radiusInner: number;
  radiusOuter: number;
}

export interface CopperPaths {
  pointsInner: Point[];
  pointsOuter: Point[];
}

export interface DrillHole extends Point {
  radius: number;
}
