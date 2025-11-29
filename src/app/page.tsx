'use client';

import { Container, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { BoardDimensions } from '@/components/BoardDimensions';
import { BoardPreview } from '@/components/BoardPreview';
import { GetBoard } from '@/components/GetBoard';
import { Shapes } from '@/components/Shapes';
import { ShapesMenu } from '@/components/ShapesMenu';

export default function Home() {
 const t = useTranslations('Home');
  return (
    <Container maxWidth="xl" sx={{ pt: 4 }}>
      <Stack direction="column" gap={4}>
        <Typography variant="h5" component="h1">{t('title')}</Typography>
        <ShapesMenu />
        <Shapes />
        <Stack direction="row" gap={4}>
          <BoardPreview />
          <BoardDimensions />
        </Stack>
        <GetBoard />
      </Stack>
    </Container>
  );
}
