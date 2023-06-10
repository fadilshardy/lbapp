import { mdiCashRegister, mdiChartBar, mdiCogs, mdiFinance, mdiMonitor, mdiPointOfSale, mdiStore, mdiTextBoxPlus, mdiWarehouse } from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    href: '/cashier',
    label: 'Cashier',
    icon: mdiPointOfSale,
  },
  {
    href: '/sales',
    label: 'Sales',
    icon: mdiCashRegister,
  },
  {
    href: '/purchases',
    label: 'Purchases',
    icon: mdiTextBoxPlus,
  },
  {
    label: 'Accountant',
    icon: mdiFinance,
    menu: [
      {
        label: 'Chart of Accounts', // Daftar Akun
      },
      {
        label: 'Journal Entry', // Entri Jurnal
      },
      {
        label: 'General Ledger', // Buku Besar
      },
      {
        label: 'General Journal', // Jurnal Umum
      },
      {
        label: 'Trial Balance', // Neraca Percobaan
      },
    ],
  },
  {
    label: 'Inventory',
    icon: mdiWarehouse,
    menu: [
      {
        label: 'Stock',
      },
      {
        label: 'Products',
      },
      {
        label: 'Categories',
      },
    ],
  },
  {
    label: 'Reports',
    icon: mdiChartBar,
    menu: [
      {
        label: 'Sales Reports',
      },
      {
        label: 'Purchase Reports',
      },
      {
        label: 'Financial reports',
      },
      {
        label: 'Profit and Loss',
      },
    ],
  },
  {
    href: '/vendors',
    label: 'Vendors',
    icon: mdiStore,
  },
  {
    label: 'Settings',
    icon: mdiCogs,
    menu: [
      {
        label: 'Company Information',
      },
      {
        label: 'Currency Settings',
      },
      {
        label: 'User Management',
      },
    ],
  },
];

export default menuAside;
