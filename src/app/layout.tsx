import './style.scss';
import CssBaseline from '@mui/material/CssBaseline';
import { NextIntlClientProvider } from 'next-intl';
import { PropsWithChildren } from 'react';
import Footer from '@/components/Footer';
import MuiThemeProvider from '@/components/MuiThemeProvider';

const locale = 'en';

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang={locale}>
      <body className="layout">
        <MuiThemeProvider>
          <CssBaseline />
          <NextIntlClientProvider>
            {children}
            <Footer />
          </NextIntlClientProvider>
        </MuiThemeProvider>
      </body>
    </html>
  );
}
