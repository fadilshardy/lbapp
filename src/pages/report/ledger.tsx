import SectionMain from '@components/SectionMain';
import LayoutAuthenticated from '@layouts/Authenticated';
import Head from 'next/head';
import { ReactElement } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { getPageTitle } from '@config';
import { LedgerDatatable } from '@features/reports';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const LedgerPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('General Ledger')}</title>
      </Head>

      <SectionMain>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl font-bold tracking-tight'>General Ledger</CardTitle>
            <CardDescription className='text-muted-foreground'>
              General Ledger Report
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LedgerDatatable />
          </CardContent>
        </Card>
      </SectionMain>
    </>
  );
};

LedgerPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default LedgerPage;

export const getStaticProps: GetStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
