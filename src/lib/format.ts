export function formatDateToString(initialDate: any) {
    const date = new Date(initialDate);

    const formattedDate = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(date);

    return formattedDate;
}
export function formatCurrency(number: any) {

    const numberFormatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    const formattedNumber = numberFormatter.format(number);

    return formattedNumber;
}

export function formatCurrencyWithoutSymbol(number: any) {

    const numberFormatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    })

    const formattedNumber = numberFormatter.format(number).replace('Rp', '');

    return formattedNumber;
}