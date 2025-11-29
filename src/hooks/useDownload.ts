import { saveAs } from 'file-saver';
import { useCallback } from 'react';
import useBoardStore from '@/stores/boardStore.ts';
import useWavesStore, { Waveform } from '@/stores/waveStore.ts';
import { createBoard } from '@/tools/createBoard.ts';
import sortBy from '@/tools/sortBy';
import { toCircularPath } from '@/tools/toCircularPath.ts';
import type { WavePaths } from '@/types/geometric.ts';

interface UseDownload {
  downloadBoard: () => void;
  downloadSVG: () => void;
}

const sortByOffset = sortBy<Waveform>('offset');

export const useDownload = (): UseDownload => {

  const { waves } = useWavesStore();
  const { width, height, gap, holeDiameter, holeToEdge } = useBoardStore();
  const gapSize = gap / 200;

  const downloadBoard = useCallback(() => {
    const wavePaths = sortByOffset(waves).reduce((acc: WavePaths[], waveForm: Waveform): WavePaths[] => {
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
  }, [gapSize, height, holeDiameter, holeToEdge, waves, width]);

  const downloadSVG = useCallback(() => {
    const previewElement = [...document.getElementsByClassName('board-preview__svg')][0];
    if (!previewElement) {
      return;
    }

    saveAs(new Blob([previewElement.outerHTML]), 'board.svg');
  }, []);

  return {
    downloadBoard,
    downloadSVG,
  };
};
