import './index.scss';
import type { ChangeEvent } from 'react';
import { WavePreview } from '@/components/WavePreview';
import type { WaveType } from '@/consts/waveTypes';
import useWavesStore from '@/stores/waveStore';

interface AddButton {
  label: string,
  type: WaveType,
}

const buttons: AddButton[] = [
  { label: 'Add Sine', type: 'sine' },
  { label: 'Add Saw', type: 'saw' },
  { label: 'Add Square', type: 'square' },
  { label: 'Add Triangle', type: 'triangle' },
  // { label: 'Add Silence', type: 'silence' },
];

export const Shapes: React.FC = () => {
  const { waves, addRawFile, addWave, updateWave, deleteWave } = useWavesStore();

  const onFileInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const target = ev.target;

    if (target.files?.length) {
      addRawFile(target.files);
    }

    target.value = '';
  };

  return (
    <div className="waves">
      <div className="waves__buttons">
        {
          buttons.map(({ label, type }) => (
            <button
              key={type}
              type="button"
              className="waves__button"
              onClick={() => addWave(type)}
              title={label}
            >
              { label }
            </button>
          ))
        }
        <label
          className="waves__add-file waves__button"
          htmlFor="add-file"
          title="Must be raw signed 8-bit"
        >
          <span>
            Add from file
          </span>
          <input
            type="file"
            id="add-file"
            multiple
            onChange={onFileInputChange}
          />
        </label>
      </div>
      <ul className="waves__list">
        {
          waves.map(({ offset, scale, repeats, waveData, id }) => (
            <div
              key={id}
              className="waves__list-item"
            >
              <WavePreview
                waveData={waveData}
              />
              <label className="waves__label">
                <span>Repeats</span>
                <input
                  type="number"
                  title="repeats"
                  value={repeats}
                  onChange={(event) => {
                    const newRepeats = parseInt(event.target.value, 10);
                    updateWave(id, {
                      repeats: isNaN(newRepeats) ? 0 : newRepeats,
                    });
                  }}
                />
              </label>
              <label className="waves__label">
                <span>Offset</span>
                <input
                  type="number"
                  title="offset"
                  value={offset}
                  min={0}
                  max={10000}
                  step={25}
                  onChange={(event) => {
                    const newOffset = parseInt(event.target.value, 10);
                    updateWave(id, {
                      offset: isNaN(newOffset) ? 0 : newOffset,
                    });
                  }}
                />
              </label>
              <label className="waves__label">
                <span>Scale</span>
                <input
                  type="number"
                  title="scale"
                  value={scale}
                  min={0}
                  max={10000}
                  step={25}
                  onChange={(event) => {
                    const newScale = parseInt(event.target.value, 10);
                    updateWave(id, {
                      scale: isNaN(newScale) ? 0 : newScale,
                    });
                  }}
                />
              </label>
              <button
                type="button"
                onClick={() => deleteWave(id)}
              >
                Delete
              </button>
            </div>
          ))
        }
      </ul>
    </div>
  );
};
