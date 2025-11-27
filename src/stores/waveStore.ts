import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { waveTypes } from '@/consts/waveTypes';
import type { WaveType } from '@/consts/waveTypes';
import { createRandomId } from '@/hooks/useRandomId';

export type Waveform = {
  id: string,
  repeats: number,
  offset: number,
  scale: number,
  waveData: number[],
};

export interface WavesStoreState {
  waves: Waveform[],
  addRawFile: (files: FileList) => void,
  addWave: (type: WaveType) => void,
  updateWave: (id: string, update: Partial<Omit<Waveform, 'id' | 'waveData'>>) => void,
  deleteWave: (id: string) => void,
}

const newWaveformForPosition = (position: number, type?: WaveType): Waveform => ({
  id: createRandomId(),
  repeats: 2 ** position,
  offset: (position * 600) - 200,
  scale: type !== 'silence' ? 200 : 1,
  waveData: [],
});

const toUnsigned = (rawData: ArrayBuffer | number[]) => [...new Int8Array(rawData)].map((v) => (v + 128) % 256);

const useWavesStore = create(
  persist<WavesStoreState>(
    (set, getState) => ({
      waves: [],
      addRawFile: async (files: FileList) => {
        const { waves } = getState();
        const newWaves = await Promise.all([...files].map(async (file: File): Promise<Waveform> => {

          // converts the "signed" waveform to "unsigned" (maybe use an option to toggle this?)
          const waveData = toUnsigned(await file.arrayBuffer());

          return ({
            ...newWaveformForPosition(waves.length + 1),
            waveData,
          });
        }));

        set({
          waves: [
            ...waves,
            ...newWaves,
          ],
        });
      },
      addWave: (type) => {
        const { waves } = getState();
        const wave: Waveform = {
          ...newWaveformForPosition(waves.length + 1, type),
          waveData: toUnsigned(waveTypes[type]),
        };

        set({
          waves: [
            ...waves,
            wave,
          ],
        });
      },
      updateWave: (id: string, update: Partial<Omit<Waveform, 'id' | 'waveData'>>) => {
        set(({ waves }) => ({
          waves: waves.map((wave) => {
            if (wave.id !== id) {
              return wave;
            }

            return {
              ...wave,
              ...update,
            };
          }),
        }));
      },
      deleteWave: (id: string) => {
        set(({ waves }) => ({
          waves: waves.filter((wave) => wave.id !== id),
        }));
      },
    }),
    {
      name: 'svg-wave-waves',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useWavesStore;
