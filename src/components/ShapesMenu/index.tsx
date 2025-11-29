import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useState } from 'react';
import FileInput from '@/components/FileInput';
import type { WaveType } from '@/consts/waveTypes';
import useWavesStore from '@/stores/waveStore';

interface AddButton {
  translationKey: string,
  type: WaveType,
}

const buttons: AddButton[] = [
  { translationKey: 'addSine', type: 'sine' },
  { translationKey: 'addSaw', type: 'saw' },
  { translationKey: 'addSquare', type: 'square' },
  { translationKey: 'addTriangle', type: 'triangle' },
  { translationKey: 'addSilence', type: 'silence' },
];

export const ShapesMenu: React.FC = () => {
  const t = useTranslations('ShapesMenu');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const { addRawFile, addWave } = useWavesStore();
  const onFileInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const target = ev.target;

    if (target.files?.length) {
      addRawFile(target.files);
    }

    target.value = '';
  };

  return (
    <Stack direction="row" gap={1}>
      <ButtonGroup
        size="small"
        variant="contained"
        fullWidth
      >
        {
          buttons.map(({ translationKey, type }) => (
            <Button
              key={type}
              onClick={() => addWave(type)}
              title={t(translationKey)}
            >
              {t(translationKey)}
            </Button>
          ))
        }
        <FileInput
          onFileInputChange={onFileInputChange}
          label="Add from file"
          multiple
        />
      </ButtonGroup>
      <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
        <Tooltip
          onClose={() => setTooltipOpen(false)}
          open={tooltipOpen}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={t('infoPopup')}
          slotProps={{
            popper: {
              disablePortal: true,
            },
          }}
        >
          <IconButton
            onClick={() => setTooltipOpen((current) => (!current))}
          >
            <InfoOutlineIcon/>
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
    </Stack>
  );
};
