export function FormatMoney(number: number | null | undefined): string {
    if (number === null || number === undefined || isNaN(number)) {
        return '₱0.00';
    }

    if (number === 0) {
        number = Math.abs(number);
    }

    const formatter = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    });
    const formattedCurrency = formatter.format(number);

    return formattedCurrency;
}

export function FormatNumber(number: number | null | undefined): string {
    if (number === null || number === undefined || isNaN(number)) {
        return '0';
    }

    return number.toLocaleString();
}

export function FormatLongDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-PH', options);
    const formattedLongDate = formatter.format(date);

    return formattedLongDate;
}
