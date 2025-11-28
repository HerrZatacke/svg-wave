'use client';

import { Container, Stack, Typography } from '@mui/material';
import { BoardDimensions } from '@/components/BoardDimensions';
import { BoardPreview } from '@/components/BoardPreview';
import { GetBoard } from '@/components/GetBoard';
import { Shapes } from '@/components/Shapes';
import { ShapesMenu } from '@/components/ShapesMenu';

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ pt: 4 }}>
      <Stack direction="column" gap={4}>
        <Typography variant="h4" component="h1">Wave Thingy</Typography>
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
