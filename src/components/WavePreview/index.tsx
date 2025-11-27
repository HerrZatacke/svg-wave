import './index.scss';

interface Props {
  waveData: number[],
}

const xScale = 6;

export const WavePreview: React.FC<Props> = ({ waveData }) => {

  const pathD = waveData.reduce((acc: string, value: number, index: number) => {
    return (
      `${acc} ${(0.5 + index) * xScale},${value}`
    );
  }, '');

  return (
    <div className="wave-preview">
      <svg
        className="wave-preview__svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${waveData.length * xScale} 256`}
      >
        <polyline
          className="wave-preview__path"
          points={pathD}
        />
      </svg>
    </div>
  );
};
