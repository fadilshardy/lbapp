import BaseIcon from '@components/BaseIcon';
import { Button } from '@components/ui/button';
import { DataTables } from '@components/ui/datatables/DataTables';
import {
  getSaleColumns,
  saleApi,
} from '@features/sales';
import { mdiPlusBox } from '@mdi/js';
import Link from 'next/link';
interface ProductDataTableProps { }

export const SaleDatatable: React.FC<ProductDataTableProps> = () => {
  const saleApiQuery = saleApi.useGetSalesQuery;
  const saleColumns = getSaleColumns();

  const ActionButtons = () => {
    return (
      <Link href={'/pos'}>
        <Button size="default" >
          <BaseIcon path={mdiPlusBox} className="w-4 h-4 flex mr-2" />
          Sale
        </Button>
      </Link>
    );
  };

  return (
    <div className="space-y-4 w-full">
      <DataTables
        apiQuery={saleApiQuery}
        columns={saleColumns}
        ActionMenu={<ActionButtons />}
      />
    </div>
  );
};
