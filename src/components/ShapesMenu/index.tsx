import { Button, ButtonGroup } from '@mui/material';
import type { ChangeEvent } from 'react';
import FileInput from '@/components/FileInput';
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

export const ShapesMenu: React.FC = () => {
  const { addRawFile, addWave } = useWavesStore();

  const onFileInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const target = ev.target;

    if (target.files?.length) {
      addRawFile(target.files);
    }

    target.value = '';
  };

  return (
    <ButtonGroup
      size="large"
      variant="contained"
    >
      {
        buttons.map(({ label, type }) => (
          <Button
            key={type}
            onClick={() => addWave(type)}
            title={label}
          >
            { label }
          </Button>
        ))
      }
      <FileInput
        onFileInputChange={onFileInputChange}
        label="Add from file"
        title="Must be raw signed 8-bit"
        multiple
      />
    </ButtonGroup>
  );
};
