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
import { formatCurrency } from '@lib/format';
import * as React from 'react';
import Barcode from 'react-barcode';
import { IGeneralLedger } from '../interfaces/generalLedger';

interface ITransactionDetailProps {
  ledgerRecord?: IGeneralLedger;
  isLoading: boolean;
}

export const ViewLedgerDetail: React.FunctionComponent<ITransactionDetailProps> = ({
  ledgerRecord,
  isLoading,
}) => {
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <div className='flex items-center justify-center text-sm'>
        <div className=' w-full'>
          <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
            <p className='text-gray-600 font-medium'>Name</p>
            <p>{ledgerRecord?.account.name}</p>
          </div>
          <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
            <p className='text-gray-600 font-medium'>Code</p>
            <p>{ledgerRecord?.account.code}</p>
          </div>
          <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
            <p className='text-gray-600 font-medium'>Type</p>
            <p>{ledgerRecord?.account.type}</p>
          </div>
          <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
            <p className='text-gray-600 font-medium'>Balance</p>
            <p>{formatCurrency(ledgerRecord?.account.balance)}</p>
          </div>
          {ledgerRecord?.account.description && (
            <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
              <p className='text-gray-600 font-medium'>Note</p>
              <p className='text-xs'>{ledgerRecord?.account.description}</p>
            </div>
          )}
        </div>
      </div>

      <Table className='text-xs'>
        <TableCaption>
          <Barcode
            value={ledgerRecord?.account.code ?? ''}
            lineColor='black'
            fontSize={10}
            width={1}
            height={70}
          />
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Debit</TableHead>
            <TableHead>Credit</TableHead>
            <TableHead className='text-right'>Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='text-xs'>
          {ledgerRecord?.transactions.map((item, id) => {
            return (
              <TableRow key={id}>
                <TableCell className='font-medium text-gray-900 whitespace-nowrap'>
                  {item?.date
                    ? new Date(item?.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'N/A'}
                </TableCell>
                <TableCell className='text-gray-900 whitespace-nowrap'>{item?.code}</TableCell>
                <TableCell className='text-gray-900 whitespace-nowrap'>
                  {item?.note ? item?.note : '-'}
                </TableCell>
                <TableCell className='text-gray-900 whitespace-nowrap'>
                  {item?.transaction_type == 'debit' ? formatCurrency(item?.total_amount) : ''}
                </TableCell>
                <TableCell className='text-gray-900 whitespace-nowrap'>
                  {item?.transaction_type == 'credit' ? formatCurrency(item?.total_amount) : ''}
                </TableCell>
                <TableCell className='text-gray-900 whitespace-nowrap text-right'>
                  {formatCurrency(item?.running_balance)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className='font-bold'>
              Total
            </TableCell>
            <TableCell className='text-right'>
              {formatCurrency(ledgerRecord?.account.balance)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
