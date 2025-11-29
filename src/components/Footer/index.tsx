import { Container, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const release = process.env.NEXT_PUBLIC_RELEASE_VERSION || 'local-dev';
  return (
    <Container
      component="footer"
      maxWidth="xl"
      sx={{ py: 2 }}
    >
      <Typography
        variant="caption"
        component="div"
        align="right"
      >
        <a
          href="https://github.com/HerrZatacke/svg-wave"
          target="_blank"
        >
          {t('linkText', { release })}
        </a>
      </Typography>
    </Container>
  );
}
