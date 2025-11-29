import type { Waveform } from '@/stores/waveStore';
import { closePath } from '@/tools/closePath';
import type { Line, Point, WavePaths } from '@/types/geometric';

const distanceToCoords = (wave: Waveform, value: number, index: number, steps: number) => {
  const distance = (wave.offset / 100) + (value * wave.scale / 10000);
  const angle = index / steps * 360;
  const radians = Math.PI / 180 * angle;

  const x = distance * Math.cos(radians);
  const y = distance * Math.sin(radians);

  return { x, y };
};

const perpendicularDistancePoint = ([{ x: x1, y: y1 }, { x: x2, y: y2 }]: Line, distance: number): Point => {
  if (x2 === x1) {
    return {
      x: x1 + distance,
      y: (y1 + y2) / 2,
    };
  }

  const center: Point = {
    x: (x1 + x2) / 2,
    y: (y1 + y2) / 2,
  };

  const slope = (y2 - y1) / (x2 - x1);
  const angle = Math.atan(slope) + (Math.PI / 2 * Math.sign(x2 - x1));

  const final: Point = {
    x: center.x + (distance * Math.cos(angle)),
    y: center.y + (distance * Math.sin(angle)),
  };

  return final;
};

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

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '-44 -44 88 88');
  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', closePath(points).map(({ x, y }) => `${x},${y}`).join(' '));
  polyline.setAttribute('stroke', '#fff');
  polyline.setAttribute('stroke-width', '1px');
  svg.appendChild(polyline);
  document.body.appendChild(svg);

  const lineLength = polyline.getTotalLength();
  const precision = Math.round(polyline.getTotalLength() * 4);

  const interlacedPoints: Point[] = Array(precision).fill('').map((_, index) => {
    const lineOffset = lineLength / precision * index;
    return polyline.getPointAtLength(lineOffset);
  });

  document.body.removeChild(svg);

  const pointsInner = interlacedPoints.reduce((
    acc: Point[],
    point: Point,
    index: number,
    collection: Point[],
  ): Point[] => {
    if (index === 0) {
      return acc;
    }

    const prevPoint = collection[index - 1];
    const line: Line = [prevPoint, point];

    return [
      ...acc,
      perpendicularDistancePoint(line, distance),
    ];
  }, []);

  const pointsOuter = interlacedPoints.reduce((
    acc: Point[],
    point: Point,
    index: number,
    collection: Point[],
  ): Point[] => {
    if (index === 0) {
      return acc;
    }

    const prevPoint = collection[index - 1];
    const line: Line = [prevPoint, point];

    return [
      ...acc,
      perpendicularDistancePoint(line, -distance),
    ];
  }, []);

  // console.log({ points, pointsInner });

  return {
    points: closePath(points),
    pointsInner: closePath(pointsInner),
    pointsOuter: closePath(pointsOuter).reverse(),
  };
};
