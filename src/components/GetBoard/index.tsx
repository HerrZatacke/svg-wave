import './index.scss';
import { saveAs } from 'file-saver';
import useBoardStore from '@/stores/boardStore';
import type { Waveform } from '@/stores/waveStore';
import useWavesStore from '@/stores/waveStore';
import { createBoard } from '@/tools/createBoard';
import { toCircularPath } from '@/tools/toCircularPath';
import type { WavePaths } from '@/types/geometric';

// localStorage.setItem('svg-wave-waves', JSON.stringify({
//   'state': {
//     'waves': [{
//       'id': '97a1f69e-f9f4-4e4d-a55c-f33a937a80f0',
//       'repeats': 8,
//       'offset': 600,
//       'scale': 200,
//       'waveData': [128, 136, 144, 153, 161, 169, 178, 186, 194, 203, 211, 219, 228, 130, 31, 40, 48, 56, 65, 73, 82, 90, 98, 107, 115, 123]
//     }, {
//       'id': '76dbd05a-ba49-48a1-8c37-fba3b1d0ac23',
//       'repeats': 16,
//       'offset': 1700,
//       'scale': 200,
//       'waveData': [128, 136, 144, 153, 161, 169, 178, 186, 194, 203, 211, 219, 228, 130, 31, 40, 48, 56, 65, 73, 82, 90, 98, 107, 115, 123]
//     }, {
//       'id': 'a99d31f8-1eb5-48a6-bf83-17d497a7cb37',
//       'repeats': 32,
//       'offset': 2700,
//       'scale': 200,
//       'waveData': [128, 136, 144, 153, 161, 169, 178, 186, 194, 203, 211, 219, 228, 130, 31, 40, 48, 56, 65, 73, 82, 90, 98, 107, 115, 123]
//     }, {
//       'id': 'ca241161-e155-417b-95c8-aaa75ad72594',
//       'repeats': 64,
//       'offset': 3700,
//       'scale': 200,
//       'waveData': [128, 136, 144, 153, 161, 169, 178, 186, 194, 203, 211, 219, 228, 130, 31, 40, 48, 56, 65, 73, 82, 90, 98, 107, 115, 123]
//     }]
//   },
//   'version': 0
// }));

export const GetBoard: React.FC = () => {

  const { waves } = useWavesStore();
  const { width, height, gap, holeDiameter, holeToEdge } = useBoardStore();
  const gapSize = gap / 200;

  return (
    <div className="get-board">
      <button
        type="button"
        className="get-board__button"
        onClick={() => {
          const wavePaths = waves.reduce((acc: WavePaths[], waveForm: Waveform): WavePaths[] => {
            const result = toCircularPath(waveForm, gapSize);

            if (!result) {
              return acc;
            }

            return [...acc, result];
          }, []);

          if (!wavePaths.length) {
            return;
          }

          saveAs(new Blob([...createBoard(wavePaths, width, height, holeDiameter, holeToEdge)]), 'board.kicad_pcb');
        }}
      >
        Get Board!
      </button>
    </div>
  );
};
