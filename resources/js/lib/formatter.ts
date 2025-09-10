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

export function FormatShortDate(dateString: string): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return '';
    }

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

export function FormatPercentage(value: number | string | null | undefined, decimals = 2, fallback = '-'): string {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (numericValue == null || isNaN(numericValue)) {
        return fallback;
    }

    return numericValue.toFixed(decimals) + '%';
}

export function CapitalizeFirstLetter(str: string): string {
    if (!str) return '';

    return str.charAt(0).toUpperCase() + str.slice(1);
}
