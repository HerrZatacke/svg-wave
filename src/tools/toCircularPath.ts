import ClipperLib, { type IntPoint } from 'clipper-lib';
import type { Waveform } from '@/stores/waveStore';
import { closePath } from '@/tools/closePath';
import type { Point, WavePaths } from '@/types/geometric';

const distanceToCoords = (wave: Waveform, value: number, index: number, steps: number) => {
  const distance = (wave.offset / 100) + (value * wave.scale / 10000);
  const angle = index / steps * 360;
  const radians = Math.PI / 180 * angle;

  const x = distance * Math.cos(radians);
  const y = distance * Math.sin(radians);

  return { x, y };
};

const clipperScale = 1000;

const scaleUp = (p: Point): IntPoint => ({
  X: p.x * clipperScale,
  Y: p.y * clipperScale,
});

const scaleDown = (p: IntPoint): Point => ({
  x: p.X / clipperScale,
  y: p.Y / clipperScale,
});

export const toCircularPath = (wave: Waveform, distance: number): WavePaths | null => {
  if (
    (wave.offset <= 0) ||
    (wave.scale < 0) ||
    (wave.scale >= 10000) ||
    (wave.repeats <= 1)
  ) {
    return null;
  }

  const rawData: number[] = Array(wave.repeats).fill([...wave.waveData]).flat();

  const points = rawData.reduce((acc: Point[], value: number, index: number): Point[] => {
    const waveFormCoords = distanceToCoords(wave, value, index, rawData.length);

    return [
      ...acc,
      waveFormCoords,
    ];
  }, []);


  const scaledPath = points.map(scaleUp);

  const clipperOffset = new ClipperLib.ClipperOffset();

  clipperOffset.AddPath(
    scaledPath,
    ClipperLib.JoinType.jtRound,
    ClipperLib.EndType.etClosedPolygon,
  );

  const resultOuter: { X: number; Y: number }[][] = [];
  const resultInner: { X: number; Y: number }[][] = [];
  clipperOffset.Execute(resultOuter, distance * clipperScale);
  clipperOffset.Execute(resultInner, distance * -clipperScale);

  if (resultOuter.length === 1 && resultInner.length === 1) {
    const pointsOuter = resultOuter[0].reverse().map(scaleDown);
    const pointsInner = resultInner[0].map(scaleDown);

    return {
      points,
      pointsInner: closePath(pointsInner),
      pointsOuter: closePath(pointsOuter),
    };
  }

  return {
    points,
    pointsInner: [],
    pointsOuter: [],
  };
};
