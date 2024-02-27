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
import { TransactionRecord } from '@features/transactions';
import { formatCurrency, formatCurrencyWithoutSymbol } from '@lib/format';
import * as React from 'react';
import Barcode from 'react-barcode';

interface ITransactionDetailProps {
  handleModalToggle(open: boolean): void;
  transactionRecord?: TransactionRecord;
  isLoading: boolean;
}

const ViewTransactionDetail: React.FunctionComponent<ITransactionDetailProps> = ({
  transactionRecord,
  isLoading,
}) => {
  if (isLoading) return <LoadingSpinner />;

  const creditTransactions = transactionRecord?.transactionDetails.filter(
    (item) => item.transaction_type === 'credit'
  );
  const debitTransactions = transactionRecord?.transactionDetails.filter(
    (item) => item.transaction_type === 'debit'
  );

  const totalCreditAmount = creditTransactions?.reduce(
    (total, item) => total + Number(item.transaction_amount),
    0
  );

  const totalDebitAmount = debitTransactions?.reduce(
    (total, item) => total + Number(item.transaction_amount),
    0
  );

  const generateTransactionRows = () => {
    const transactionRows = [];

    if (creditTransactions && debitTransactions) {
      const maxLength = Math.max(creditTransactions.length, debitTransactions.length);

      for (let i = 0; i < maxLength; i++) {
        transactionRows.push({
          credit: creditTransactions[i] || null,
          debit: debitTransactions[i] || null,
        });
      }
    }

    return transactionRows;
  };

  return (
    <div>
      <div className='flex items-center justify-center text-sm'>
        <div className=' w-full'>
          <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
            <p className='text-gray-600 font-medium'>No Reciept</p>
            <p>{transactionRecord?.transaction.code}</p>
          </div>
          <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
            <p className='text-gray-600 font-medium'>Date</p>
            <p>
              {transactionRecord?.transaction?.date
                ? new Date(transactionRecord.transaction.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'N/A'}
            </p>
          </div>

          <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
            <p className='text-gray-600 font-medium'>Total</p>
            <p>{formatCurrency(transactionRecord?.transaction.total_amount)}</p>
          </div>
          {transactionRecord?.transaction.note && (
            <div className='md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b'>
              <p className='text-gray-600 font-medium'>Note</p>
              <p className='text-xs'>{transactionRecord?.transaction.note}</p>
            </div>
          )}
        </div>
      </div>
      <Table className='text-xs'>
        <TableCaption>
          <Barcode
            value={transactionRecord?.transaction.code ?? ''}
            lineColor='black'
            fontSize={10}
            width={1}
            height={70}
          />
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Account Name</TableHead>
            <TableHead> Type</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
            <TableHead className='border-l' />
            <TableHead>Account Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='text-xs'>
          {transactionRecord &&
            generateTransactionRows().map((row, id) => (
              <TableRow key={id}>
                {row.credit ? (
                  <>
                    <TableCell className='font-medium text-gray-900 whitespace-nowrap'>
                      {row.credit.account_name}
                    </TableCell>
                    <TableCell>{row.credit.transaction_type}</TableCell>
                    <TableCell className='text-right'>
                      {formatCurrencyWithoutSymbol(row.credit.transaction_amount)}
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                  </>
                )}

                <TableCell className='border-l' />

                {row.debit ? (
                  <>
                    <TableCell className='font-medium text-gray-900 whitespace-nowrap'>
                      {row.debit.account_name}
                    </TableCell>
                    <TableCell>{row.debit.transaction_type}</TableCell>
                    <TableCell className='text-right'>
                      {formatCurrencyWithoutSymbol(row.debit.transaction_amount)}
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                  </>
                )}
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className='font-bold'>
              Total
            </TableCell>
            <TableCell className='text-right'>{formatCurrency(totalCreditAmount)}</TableCell>
            <TableCell colSpan={3} className='border-l' />
            <TableCell className='text-right'>{formatCurrency(totalDebitAmount)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ViewTransactionDetail;
