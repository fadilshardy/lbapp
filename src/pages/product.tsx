import SectionMain from '@components/SectionMain';
import LayoutAuthenticated from '@layouts/Authenticated';
import Head from 'next/head';
import { ReactElement } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { getPageTitle } from '@config';
import { ProductDatatable } from '@features/products';
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
            <CardTitle className="text-2xl font-bold tracking-tight">Product Management</CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage master data for product
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductDatatable />
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
