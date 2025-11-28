import { Button } from '@mui/material';
import { saveAs } from 'file-saver';
import useBoardStore from '@/stores/boardStore';
import type { Waveform } from '@/stores/waveStore';
import useWavesStore from '@/stores/waveStore';
import { createBoard } from '@/tools/createBoard';
import { toCircularPath } from '@/tools/toCircularPath';
import type { WavePaths } from '@/types/geometric';

export const GetBoard: React.FC = () => {

  const { waves } = useWavesStore();
  const { width, height, gap, holeDiameter, holeToEdge } = useBoardStore();
  const gapSize = gap / 200;

  return (
    <Button
      variant="contained"
      size="large"
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
    </Button>
  );
};
