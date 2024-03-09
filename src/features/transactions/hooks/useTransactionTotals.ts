import { ITransactionDetail, ITransactionRecord } from '@features/transactions';
import { useEffect, useState } from 'react';
import { UseFormReturn, useWatch } from "react-hook-form";

export const useTransactionTotals = (form: UseFormReturn<ITransactionRecord>) => {
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalDebit, setTotalDebit] = useState(0);

    const transactionDetails: ITransactionDetail[] = useWatch({
        control: form.control,
        name: 'transactionDetails',
    });

    useEffect(() => {
        let totalDebitAmount = 0;
        let totalCreditAmount = 0;

        transactionDetails.forEach((item) => {
            if (item.transaction_type === 'debit') {
                totalDebitAmount += Number(item.transaction_amount);
            } else if (item.transaction_type === 'credit') {
                totalCreditAmount += Number(item.transaction_amount);
            }
        });

        setTotalCredit(totalCreditAmount);
        setTotalDebit(totalDebitAmount);

        if (totalDebitAmount == totalCreditAmount && totalCredit !== 0 && totalDebit !== 0) {
            form.setValue('transaction.total_amount', totalDebit);
        }

    }, [transactionDetails, totalCredit, totalDebit]);

    return { totalCredit, totalDebit };
}

