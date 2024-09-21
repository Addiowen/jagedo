import { Toaster } from 'react-hot-toast';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import AuthProvider from '@/app/api/auth/[...nextauth]/auth-provider';
import GlobalDrawer from '@/app/shared/drawer-views/container';
import GlobalModal from '@/app/shared/modal-views/container';
import { ThemeProvider } from '@/app/shared/commons/theme-provider';
import { siteConfig } from '@/config/site.config';
import { inter, lexendDeca } from '@/app/fonts';
import cn from '@/utils/class-names';
import NextProgress from '@/components/next-progress';

// styles
import '@/app/globals.css';
import { UrlsProvider } from './context/urlsContext';
import { TransactionProvider } from './context/transactionContext';
import { BillsProvider } from './context/billsContext';

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(session, 'the session');

  return (
    <html
      lang="en"
      dir="ltr"
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
      >
        <AuthProvider session={session}>
          <TransactionProvider>
            <BillsProvider>
            <UrlsProvider>
              <ThemeProvider>
                <NextProgress />
                {children}
                <Toaster />
                <GlobalDrawer />
                <GlobalModal />
              </ThemeProvider>
            </UrlsProvider>
            </BillsProvider>
          </TransactionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
