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
import { PurchaseRecord } from '@features/purchases';
import { formatCurrency, formatCurrencyWithoutSymbol } from '@lib/format';
import * as React from 'react';
import Barcode from 'react-barcode';

interface IPurchaseDetailProps {
  handleModalToggle(open: boolean): void;
  purchaseRecord?: PurchaseRecord;
  isLoading: boolean;
}

const ViewPurchaseDetail: React.FunctionComponent<IPurchaseDetailProps> = ({
  purchaseRecord,
  isLoading,
}) => {
  if (isLoading) return <LoadingSpinner />;
  let totalNetPrice = 0;
  let totalSalePrice = 0;

  return (
    <div>
      <div className='flex items-center justify-center text-sm'>
        <div className=' w-full'>
          <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
            <p className='text-gray-600 font-medium'>No Reciept</p>
            <p>{purchaseRecord?.purchase.no_receipt}</p>
          </div>
          <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
            <p className='text-gray-600 font-medium'>Date</p>
            <p>
              {purchaseRecord?.purchase?.date
                ? new Date(purchaseRecord.purchase.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'N/A'}
            </p>
          </div>

          <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
            <p className='text-gray-600 font-medium'>Total</p>
            <p>{formatCurrency(purchaseRecord?.purchase.total_amount)}</p>
          </div>
          {purchaseRecord?.purchase.note && (
            <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
              <p className='text-gray-600 font-medium'>Note</p>
              <p className='text-xs'>{purchaseRecord?.purchase.note}</p>
            </div>
          )}
        </div>
      </div>
      <Table className='text-xs'>
        <TableCaption>
          <Barcode
            value={purchaseRecord?.purchase.no_receipt ?? ''}
            lineColor='black'
            fontSize={10}
            width={1}
            height={70}
          />
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Name</TableHead>
            <TableHead>Initial QTY</TableHead>
            <TableHead>Net Price</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
            <TableHead className='border-l' />

            <TableHead>Current QTY</TableHead>
            <TableHead>Sale Price</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='text-xs'>
          {purchaseRecord?.purchaseDetails.map((item, id) => {
            const itemNetPrice =
              item.initial_quantity && item.net_price ? item.initial_quantity * item.net_price : 0;

            const itemSalePrice =
              item.quantity && item.quantity ? item.quantity * item.sale_price : 0;

            totalNetPrice += itemNetPrice;
            totalSalePrice += itemSalePrice;
            return (
              <TableRow key={id}>
                <TableCell className='font-medium text-gray-900 whitespace-nowrap '>
                  {item.product_name}
                </TableCell>
                <TableCell>{item.initial_quantity}</TableCell>
                <TableCell>{formatCurrencyWithoutSymbol(item.net_price)}</TableCell>
                <TableCell className='text-right'>
                  {formatCurrencyWithoutSymbol(itemNetPrice)}
                </TableCell>
                <TableCell className='border-l' />
                <TableCell>{item.quantity}</TableCell>
                <TableCell className='text-right'>
                  {formatCurrencyWithoutSymbol(item.sale_price)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatCurrencyWithoutSymbol(itemSalePrice)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className='font-bold'>
              Total
            </TableCell>
            <TableCell className='text-right'>{formatCurrency(totalNetPrice)}</TableCell>
            <TableCell colSpan={3} className='border-l' />
            <TableCell className='text-right'>{formatCurrency(totalSalePrice)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ViewPurchaseDetail;
