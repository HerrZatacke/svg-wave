import DownloadIcon from '@mui/icons-material/Download';
import { Button, ButtonGroup } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useDownload } from '@/hooks/useDownload.ts';

export const GetBoard: React.FC = () => {
  const t = useTranslations('GetBoard');
  const { downloadBoard, downloadSVG } = useDownload();

  return (
    <ButtonGroup
      variant="contained"
      size="large"
      fullWidth
    >
      <Button
        startIcon={<DownloadIcon />}
        title={t('longBoardTitle')}
        onClick={downloadBoard}
      >
        {t('boardTitle')}
      </Button>
      <Button
        startIcon={<DownloadIcon />}
        title={t('longSVGTitle')}
        onClick={downloadSVG}
      >
        {t('svgTitle')}
      </Button>
    </ButtonGroup>
  );
};
