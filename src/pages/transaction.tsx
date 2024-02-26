import SectionMain from '@components/SectionMain';
import LayoutAuthenticated from '@layouts/Authenticated';
import Head from 'next/head';
import { ReactElement } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { getPageTitle } from '@config';

import { TransactionDatatable } from '@features/transactions';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const TransactionPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Transanctions')}</title>
      </Head>

      <SectionMain>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl font-bold tracking-tight'>
              Transaction Management
            </CardTitle>
            <CardDescription className='text-muted-foreground'>
              Manage master data for transaction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TransactionDatatable />
          </CardContent>
        </Card>
      </SectionMain>
    </>
  );
};

TransactionPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default TransactionPage;

export const getStaticProps: GetStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
