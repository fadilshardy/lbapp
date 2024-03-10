import { TransactionRecord } from "@features/transactions";

export const processTransactionDetails = (transactionRecord: TransactionRecord) => {
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


    let transactionRows = [];

    if (creditTransactions && debitTransactions) {
        const maxLength = Math.max(creditTransactions.length, debitTransactions.length);

        for (let i = 0; i < maxLength; i++) {
            transactionRows.push({
                credit: creditTransactions[i] || null,
                debit: debitTransactions[i] || null,
            });
        }
    }

    return {
        totalCreditAmount,
        totalDebitAmount,
        transactionRows
    };
};
