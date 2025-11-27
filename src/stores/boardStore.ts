import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface BoardStoreState {
  width: number
  height: number,
  gap: number,
  holeToEdge: number,
  holeDiameter: number,
  setWidth: (width: number) => void,
  setHeight: (height: number) => void,
  setGap: (gap: number) => void,
  setHoleToEdge: (holeToEdge: number) => void,
  setHoleDiameter: (holeDiameter: number) => void,
}

const useBoardStore = create(
  persist<BoardStoreState>(
    (set) => ({
      width: 100,
      height: 100,
      holeToEdge: 10,
      holeDiameter: 4,
      gap: 30,
      setWidth: (width: number) => {
        set({ width });
      },
      setHeight: (height: number) => {
        set({ height });
      },
      setGap: (gap: number) => {
        set({ gap });
      },
      setHoleToEdge: (holeToEdge: number) => {
        set({ holeToEdge });
      },
      setHoleDiameter: (holeDiameter: number) => {
        set({ holeDiameter });
      },
    }),
    {
      name: 'svg-wave-board',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useBoardStore;
