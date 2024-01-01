import SectionMain from '@components/SectionMain';
import LayoutAuthenticated from '@layouts/Authenticated';
import Head from 'next/head';
import { ReactElement } from 'react';

import BaseIcon from '@components/BaseIcon';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { getPageTitle } from '@config';
import { Cart, PaymentInfo } from '@features/pos/cart';
import { ProductCatalog } from '@features/pos/product-catalog';
import { mdiCartVariant } from '@mdi/js';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';



const PosPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Point of Sale')}</title>
      </Head>

      <SectionMain>
        <div className="grid grid-cols-6 w-full space-y-4 sm:space-y-0">
          <div className="col-span-6 sm:col-span-4">
            <ProductCatalog />
          </div>
          <div className="col-span-6 sm:col-span-2">
            <Card>
              <CardHeader>
                <div className='w-full flex justify-between'>
                  <span className='text-2xl font-semibold'>Carts</span>
                  <BaseIcon
                    path={mdiCartVariant}
                    className="h-8 w-8 text-gray-600"
                  />
                </div>
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
