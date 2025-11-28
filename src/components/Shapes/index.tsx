import { Button, Stack } from '@mui/material';
import { WavePreview } from '@/components/WavePreview';
import NumberField from '@/lib/NumberField';
import useWavesStore from '@/stores/waveStore';

export const Shapes: React.FC = () => {
  const { waves, updateWave, deleteWave } = useWavesStore();

  return (
    <Stack
      direction="column"
      gap={2}
    >
      {
        waves.map(({ offset, scale, repeats, waveData, id }) => (
          <Stack
            key={id}
            direction="row"
            gap={2}
            alignItems="center"
          >
            <WavePreview waveData={waveData} />

            <NumberField
              label="Repeats"
              value={repeats}
              min={2}
              max={80}
              step={1}
              onValueChange={(value) => {
                updateWave(id, {
                  repeats: value || 2,
                });
              }}
            />

            <NumberField
              label="Offset"
              value={offset}
              min={0}
              max={10000}
              step={25}
              onValueChange={(value) => {
                updateWave(id, {
                  offset: value || 0,
                });
              }}
            />

            <NumberField
              label="Scale"
              value={scale}
              min={0}
              max={10000}
              step={25}
              onValueChange={(value) => {
                updateWave(id, {
                  scale: value || 0,
                });
              }}
            />

            <Button
              onClick={() => deleteWave(id)}
              variant="contained"
              size="medium"
            >
              Delete
            </Button>
          </Stack>
        ))
      }
    </Stack>
  );
};
