import './index.scss';
import useBoardStore from '@/stores/boardStore';

export const BoardDimensions: React.FC = () => {

  const {
    width,
    height,
    gap,
    holeToEdge,
    holeDiameter,
    setWidth,
    setHeight,
    setGap,
    setHoleToEdge,
    setHoleDiameter,
} = useBoardStore();

  return (
    <div className="board-dimensions">
      <label className="board-dimensions__label">
        <span className="board-dimensions__label-text">Width (mm)</span>
        <input
          type="number"
          title="offset"
          className="board-dimensions__input"
          value={width}
          min={10}
          max={200}
          step={1}
          onChange={(event) => {
            const newWidth = parseInt(event.target.value, 10);
            setWidth(isNaN(newWidth) ? 0 : newWidth);
          }}
        />
      </label>
      <label className="board-dimensions__label">
        <span className="board-dimensions__label-text">Height (mm)</span>
        <input
          type="number"
          title="offset"
          className="board-dimensions__input"
          value={height}
          min={10}
          max={200}
          step={1}
          onChange={(event) => {
            const newHeight = parseInt(event.target.value, 10);
            setHeight(isNaN(newHeight) ? 0 : newHeight);
          }}
        />
      </label>
      <label className="board-dimensions__label">
        <span className="board-dimensions__label-text">Gap (mm/100)</span>
        <input
          type="number"
          title="offset"
          className="board-dimensions__input"
          value={gap}
          min={0}
          max={500}
          step={10}
          onChange={(event) => {
            const newGap = parseInt(event.target.value, 10);
            setGap(isNaN(newGap) ? 0 : newGap);
          }}
        />
      </label>

      <label className="board-dimensions__label">
        <span className="board-dimensions__label-text">Hole-to-edge (mm)</span>
        <input
          type="number"
          title="offset"
          className="board-dimensions__input"
          value={holeToEdge}
          min={0}
          max={60}
          step={1}
          onChange={(event) => {
            const newHoleToEdge = parseInt(event.target.value, 10);
            setHoleToEdge(isNaN(newHoleToEdge) ? 0 : newHoleToEdge);
          }}
        />
      </label>
      <label className="board-dimensions__label">
        <span className="board-dimensions__label-text">Hole ⌀ (mm)</span>
        <input
          type="number"
          title="offset"
          className="board-dimensions__input"
          value={holeDiameter}
          min={0}
          max={15}
          step={1}
          onChange={(event) => {
            const newHoleDiameter = parseInt(event.target.value, 10);
            setHoleDiameter(isNaN(newHoleDiameter) ? 0 : newHoleDiameter);
          }}
        />
      </label>
    </div>
  );
};
