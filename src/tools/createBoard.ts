import { kicadHeader } from '@/consts/kicad';
import { boardDrill } from '@/tools/boardDrill';
import { toBoardOutline } from '@/tools/toBoardOutline';
import type { CopperPaths, Point, WavePaths } from '@/types/geometric';

const board = (width: number, height: number, offsetX: number, offsetY: number) => {
  const outlinePoints = toBoardOutline(width, height);

  return (`
      (gr_poly
        (pts
          ${outlinePoints.map(({
      x,
      y,
    }) => `          (xy ${x + offsetX} ${y + offsetY})`)
      .join('\n')}
        ) (layer "Edge.Cuts") (width 0) (fill none))

      (dimension (type aligned) (layer "Dwgs.User")
        (pts (xy ${(width / -2) + offsetX} ${(height / -2) + offsetY}) (xy ${(width / 2) + offsetX} ${(height / -2) + offsetY}))
        (height -15)
        (format (units 3) (units_format 1) (precision 4))
        (style (thickness 0.2) (arrow_length 1.27) (text_position_mode 0) (extension_height 0.58642) (extension_offset 0.5) keep_text_aligned)
      )

      (dimension (type aligned) (layer "Dwgs.User")
        (pts (xy ${(width / -2) + offsetX} ${(height / -2) + offsetY}) (xy ${(width / -2) + offsetX} ${(height / 2) + offsetY}))
        (height 15)
        (format (units 3) (units_format 1) (precision 4))
        (style (thickness 0.2) (arrow_length 1.27) (text_position_mode 0) (extension_height 0.58642) (extension_offset 0.5) keep_text_aligned)
      )

  `);
};

const boardShapes = (offsetX: number, offsetY: number) => ({ pointsInner, pointsOuter }: CopperPaths): string => {
  const allPoints = [...pointsInner, ...pointsOuter];
  return `
(zone (net 0) (net_name "") (layer "F.Cu") (hatch edge 0.508)
      (connect_pads (clearance 0.1))
      (min_thickness 0.254) (filled_areas_thickness no)
      (fill yes (thermal_gap 0.1) (thermal_bridge_width 0.1))
      (polygon
        (pts
          ${allPoints.map(({
    x,
    y,
  }) => `        (xy ${x + offsetX} ${y + offsetY})`)
    .join('\n')}
        )
      )
    )
`;
};

export const createBoard = (
  wavePathss: WavePaths[],
  width: number,
  height: number,
  holeDiameter: number,
  holeToEdge: number,
): string => {

  const combinedPoints: CopperPaths[] = wavePathss.reduce((
    acc: CopperPaths[],
    wavePaths: WavePaths,
    index: number,
    allPathss: WavePaths[],
  ): CopperPaths[] => {

    if (index === 0) {
      return [
        ...acc,
        {
          pointsInner: [],
          pointsOuter: wavePaths.pointsInner,
        },
      ];
    }

    const prevWavePaths = allPathss[index - 1];

    return [
      ...acc,
      {
        pointsInner: prevWavePaths.pointsOuter,
        pointsOuter: wavePaths.pointsInner,
      },
    ];

  }, []);

  combinedPoints.push({
    pointsInner: wavePathss[wavePathss.length - 1].pointsOuter,
    pointsOuter: toBoardOutline(width, height),
  });

  const offsetX = Math.round(width * 1.2);
  const offsetY = Math.round(height * 1.2);

  const origin: Point = {
    x: offsetX,
    y: offsetY,
  };

  const holes = boardDrill(width, height, holeDiameter, holeToEdge);


  return (
    `${kicadHeader(origin)}${board(width, height, offsetX, offsetY)}

    ${holes.map(({ x, y, radius }) => (
      `(gr_circle (center ${x + offsetX} ${y + offsetY}) (end ${x + offsetX} ${y + radius + offsetY}) (layer "Edge.Cuts") (width 0.05) (fill none))`
    ))
      .join('\n')}

    ${combinedPoints.map(boardShapes(offsetX, offsetY)).join('\n\n')}

)
`
  );
};
