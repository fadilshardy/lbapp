import Head from 'next/head';
import { ReactElement } from 'react';
import SectionMain from '../components/SectionMain';
import LayoutAuthenticated from '../layouts/Authenticated';

import { Cart, PaymentInfo } from '@features/pos-cart';
import { ProductCatalog } from '@features/pos-product-catalog';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getPageTitle } from '../config';

const PosPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Point of Sale')}</title>
      </Head>

      <SectionMain>
        <div className="grid grid-cols-6 w-full border bg-white">
          <ProductCatalog />
          <div className="col-span-2 bg-white">
            <Cart />

            <PaymentInfo />
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
