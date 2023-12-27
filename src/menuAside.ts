import { mdiCashRegister, mdiChartBar, mdiCogs, mdiFinance, mdiMonitor, mdiPointOfSale, mdiStore, mdiTextBoxPlus, mdiWarehouse } from '@mdi/js';
import { useTranslation } from 'next-i18next';
import { MenuAsideItem } from './interfaces';

const MenuAside = () => {
  const { t } = useTranslation("common");

  const menuAside: MenuAsideItem[] = [
    {
      href: '/dashboard',
      icon: mdiMonitor,
      label: t('dashboard'),
    },
    {
      href: '/pos',
      label: t('cashier'),
      icon: mdiPointOfSale,
    },
    {
      href: '/sales',
      label: t('sales'),
      icon: mdiCashRegister,
    },
    {
      href: '/purchases',
      label: t('purchases'),
      icon: mdiTextBoxPlus,
    },
    {
      label: t('accountant'),
      icon: mdiFinance,
      menu: [
        {
          label: t('chart_of_accounts'),
          href: '/account',

        },
        {
          label: t('journal_entry'),
        },
        {
          label: t('general_ledger'),
        },
        {
          label: t('general_journal'),
        },
        {
          label: t('trial_balance'),
        },
      ],
    },
    {
      label: t('inventory'),
      icon: mdiWarehouse,
      menu: [
        {
          label: t('stock'),
        },
        {
          label: t('products'),
          href: '/product',

        },
        {
          label: t('categories'),
        },
      ],
    },
    {
      label: t('reports'),
      icon: mdiChartBar,
      menu: [
        {
          label: t('sales_reports'),
        },
        {
          label: t('purchase_reports'),
        },
        {
          label: t('financial_reports'),
        },
        {
          label: t('profit_and_loss'),
        },
      ],
    },
    {
      href: '/vendors',
      label: t('vendors'),
      icon: mdiStore,
    },
    {
      label: t('settings'),
      icon: mdiCogs,
      menu: [
        {
          label: t('company_information'),
        },
        {
          label: t('currency_settings'),
        },
        {
          label: t('user_management'),
        },
      ],
    },
  ];

  return menuAside;
};

export default MenuAside;
