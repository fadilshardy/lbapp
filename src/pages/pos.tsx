import SectionMain from '@components/SectionMain';
import LayoutAuthenticated from '@layouts/Authenticated';
import Head from 'next/head';
import { ReactElement } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { getPageTitle } from '@config';
import { Cart, PaymentInfo } from '@features/pos/cart';
import { ProductCatalog } from '@features/pos/product-catalog';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const PosPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Point of Sale')}</title>
      </Head>

      <SectionMain>
        <div className="grid grid-cols-6 w-full">
          <div className="col-span-4 ">
            <ProductCatalog />
          </div>
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Carts</CardTitle>
              </CardHeader>
              <CardContent>
                <Cart />
                <PaymentInfo />
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionMain>
    </>
  );
};

PosPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default PosPage;

export const getStaticProps: GetStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
