import SectionMain from '@components/SectionMain';
import LayoutAuthenticated from '@layouts/Authenticated';
import Head from 'next/head';
import { ReactElement } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { getPageTitle } from '@config';
import { SaleDatatable } from '@features/sales';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ProductPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Products')}</title>
      </Head>

      <SectionMain>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight">Sales Management</CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage master data for sales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SaleDatatable />
          </CardContent>
        </Card>
      </SectionMain>
    </>
  );
};

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default ProductPage;

export const getStaticProps: GetStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
