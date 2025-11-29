import { Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import NumberField from '@/lib/NumberField';
import useBoardStore from '@/stores/boardStore';

export const BoardDimensions: React.FC = () => {
  const t = useTranslations('BoardDimensions');
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
        label={t('width')}
        unitLabel={t('unitMM')}
        value={width}
        min={10}
        max={200}
        step={1}
        onValueChange={(value) => setWidth(value || 10)}
      />
      <NumberField
        label={t('height')}
        unitLabel={t('unitMM')}
        value={height}
        min={10}
        max={200}
        step={1}
        onValueChange={(value) => setHeight(value || 10)}
      />
      <NumberField
        label={t('gap')}
        unitLabel={t('unitMMPer100')}
        value={gap}
        min={0}
        max={500}
        step={10}
        onValueChange={(value) => setGap(value || 0)}
      />
      <NumberField
        label={t('holeToEdge')}
        unitLabel={t('unitMM')}
        value={holeToEdge}
        min={0}
        max={60}
        step={1}
        onValueChange={(value) => setHoleToEdge(value || 0)}
      />
      <NumberField
        label={t('holeDiameter')}
        unitLabel={t('unitMM')}
        value={holeDiameter}
        min={0}
        max={15}
        step={1}
        onValueChange={(value) => setHoleDiameter(value || 0)}
      />
    </Stack>
  );
};
