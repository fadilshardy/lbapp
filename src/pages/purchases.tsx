import SectionMain from '@components/SectionMain';
import LayoutAuthenticated from '@layouts/Authenticated';
import Head from 'next/head';
import { ReactElement } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { getPageTitle } from '@config';
import { PurchaseDatatable } from '@features/purchases';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const PurchasePage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Purchases')}</title>
      </Head>

      <SectionMain>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight">Purchase Management</CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage master data for Purchases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PurchaseDatatable />
          </CardContent>
        </Card>
      </SectionMain>
    </>
  );
};

PurchasePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default PurchasePage;

export const getStaticProps: GetStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
