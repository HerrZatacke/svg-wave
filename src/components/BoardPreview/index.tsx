import './index.scss';
import { Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import useBoardStore from '@/stores/boardStore';
import useWavesStore from '@/stores/waveStore';
import { boardDrill } from '@/tools/boardDrill';
import { pointsToPath } from '@/tools/pointsToPath.ts';
import { toBoardOutline } from '@/tools/toBoardOutline';
import { toCircularPath } from '@/tools/toCircularPath';

const strokeColors = {
  board: '#229922',
  inner: '#005555',
  outer: '#550055',
};

export const BoardPreview: React.FC = () => {
  const t = useTranslations('BoardPreview');
  const { waves } = useWavesStore();
  const { width, height, gap, holeDiameter, holeToEdge } = useBoardStore();

  const gapSize = gap / 200;

  const holes = boardDrill(width, height, holeDiameter, holeToEdge);

  return (
    <Stack
      className="board-preview"
      direction="column"
      gap={1}
    >
      <Typography variant="body2">
        {t('title')}
      </Typography>
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={10}
        limitToBounds
        centerZoomedOut
        centerOnInit
      >
        <TransformComponent>
          <svg
            className="board-preview__svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`${Math.floor(width * -0.55)} ${Math.floor(height * -0.55)} ${Math.ceil(width * 1.1)} ${Math.ceil(height * 1.1)}`}
          >
            <g
              fill="none"
              strokeWidth="0.125px"
              stroke={strokeColors.board}
            >
              <polyline
                points={toBoardOutline(width, height).map(({ x, y }) => `${x.toFixed(3)},${y.toFixed(3)}`).join(' ')}
              />
              {
                holes.map(({ x, y, radius }, index) => (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r={radius}
                  />
                ))
              }
            </g>
            {
              waves.map((wave) => {
                const wavePaths = toCircularPath(wave, gapSize);

                return wavePaths ? (
                  <g
                    key={wave.id}
                    id={wave.id}
                    fill="none"
                    strokeWidth="0.125px"
                  >
                    <path
                      className="board-preview__path board-preview__path--inner"
                      d={pointsToPath(wavePaths.pointsInner || [])}
                      stroke={strokeColors.inner}
                    />
                    <path
                      className="board-preview__path board-preview__path--outer"
                      d={pointsToPath(wavePaths.pointsOuter || [])}
                      stroke={strokeColors.outer}
                    />
                  </g>
                ) : null;
              })
            }
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </Stack>
  );
};
