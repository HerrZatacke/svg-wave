import { Stack } from '@mui/material';
import NumberField from '@/lib/NumberField';
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
    <Stack direction="column" gap={3}>
      <NumberField
        label="Width"
        unitLabel="mm"
        value={width}
        min={10}
        max={200}
        step={1}
        onValueChange={(value) => setWidth(value || 10)}
      />
      <NumberField
        label="Height"
        unitLabel="mm"
        value={height}
        min={10}
        max={200}
        step={1}
        onValueChange={(value) => setHeight(value || 10)}
      />
      <NumberField
        label="Gap"
        unitLabel="mm/100"
        value={gap}
        min={0}
        max={500}
        step={10}
        onValueChange={(value) => setGap(value || 0)}
      />
      <NumberField
        label="Hole-to-edge"
        unitLabel="mm"
        value={holeToEdge}
        min={0}
        max={60}
        step={1}
        onValueChange={(value) => setHoleToEdge(value || 0)}
      />
      <NumberField
        label="Hole ⌀"
        unitLabel="mm"
        value={holeDiameter}
        min={0}
        max={15}
        step={1}
        onValueChange={(value) => setHoleDiameter(value || 0)}
      />
    </Stack>
  );
};
