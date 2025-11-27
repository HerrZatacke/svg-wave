import './index.scss';
import useBoardStore from '@/stores/boardStore';
import useWavesStore from '@/stores/waveStore';
import { boardDrill } from '@/tools/boardDrill';
import { toBoardOutline } from '@/tools/toBoardOutline';
import { toCircularPath } from '@/tools/toCircularPath';

export const BoardPreview: React.FC = () => {

  const { waves } = useWavesStore();
  const { width, height, gap, holeDiameter, holeToEdge } = useBoardStore();

  const paths = true;
  const gapSize = gap / 200;

  const holes = boardDrill(width, height, holeDiameter, holeToEdge);

  return (
    <div className="board-preview">
      <svg
        className="board-preview__svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`${Math.floor(width * -0.55)} ${Math.floor(height * -0.55)} ${Math.ceil(width * 1.1)} ${Math.ceil(height * 1.1)}`}
      >
        <polyline
          className="board-preview__path board-preview__path--board"
          points={toBoardOutline(width, height).map(({ x, y }) => `${x.toFixed(3)},${y.toFixed(3)}`).join(' ')}
        />
        {
          holes.map(({ x, y, radius }, index) => (
            <circle
              className="board-preview__circle"
              key={index}
              cx={x}
              cy={y}
              r={radius}
            />
          ))
        }
        {
          waves.map((wave) => {
            const wavePaths = toCircularPath(wave, gapSize);

            return wavePaths ? (
              <g key={wave.id} id={wave.id}>
                { paths ? (
                  <>
                    <polyline
                      className="board-preview__path board-preview__path--inner"
                      points={(wavePaths.pointsInner || []).map(({ x, y }) => `${x.toFixed(3)},${y.toFixed(3)}`).join(' ')}
                    />
                    <polyline
                      className="board-preview__path board-preview__path--outer"
                      points={(wavePaths.pointsOuter || []).map(({ x, y }) => `${x.toFixed(3)},${y.toFixed(3)}`).join(' ')}
                    />
                  </>
                ) : (
                  wavePaths.points.map(({ x, y }, index) => (
                    <circle
                      // className="board-preview__path board-preview__circle"
                      key={index}
                      cx={x.toFixed(3)}
                      cy={y.toFixed(3)}
                      r="0.5"
                    />
                  ))
                )}
              </g>
            ) : null;
          })
        }
      </svg>
    </div>
  );
};
