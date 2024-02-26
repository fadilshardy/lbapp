import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import LoadingSpinner from '@components/LoadingSpinner';
import { SaleRecord } from '@features/sales';
import { formatCurrency } from '@lib/format';
import * as React from 'react';
import Barcode from 'react-barcode';

interface ISaleDetailProps {
  handleModalToggle(open: boolean): void;
  saleRecord?: SaleRecord;
  isLoading: boolean;
}

const ViewSaleDetail: React.FunctionComponent<ISaleDetailProps> = ({ saleRecord, isLoading }) => {
  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className='flex items-center justify-center text-sm'>
        <div className=' w-full'>
          <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
            <p className='text-gray-600 font-medium'>No Reciept</p>
            <p>{saleRecord?.sale.no_receipt}</p>
          </div>
          <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
            <p className='text-gray-600 font-medium'>Date</p>
            <p>
              {saleRecord
                ? new Date(saleRecord.sale.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'N/A'}
            </p>
          </div>

          <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
            <p className='text-gray-600 font-medium'>Total</p>
            <p>{formatCurrency(saleRecord?.sale.total_amount)}</p>
          </div>
          {saleRecord?.sale.note && (
            <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
              <p className='text-gray-600 font-medium'>Note</p>
              <p className='text-xs'>{saleRecord?.sale.note}</p>
            </div>
          )}
        </div>
      </div>
      <Table>
        <TableCaption>
          <Barcode
            value={saleRecord ? saleRecord.sale.no_receipt : ''}
            lineColor='black'
            fontSize={10}
            width={1}
            height={70}
          />
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>QTY</TableHead>
            <TableHead className='text-right'>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='text-xs'>
          {saleRecord?.details.map((item, id) => {
            return (
              <TableRow>
                <TableCell className='font-medium text-gray-900 whitespace-nowrap'>
                  {item.product_name}
                </TableCell>
                <TableCell> {formatCurrency(item.unit_price)}</TableCell>
                <TableCell>{item.sale_quantity}</TableCell>
                <TableCell className='text-right'>{formatCurrency(item.total_price)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className='text-right'>
              {formatCurrency(saleRecord?.sale.total_amount)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ViewSaleDetail;
