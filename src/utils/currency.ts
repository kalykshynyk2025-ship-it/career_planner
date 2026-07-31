export type CurrencyType = 'RUB' | 'USD' | 'EUR';

export const getCurrencySymbol = (currency?: CurrencyType): string => {
  switch (currency) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'RUB':
    default:
      return '₽';
  }
};

export const getCurrencyName = (currency?: CurrencyType): string => {
  switch (currency) {
    case 'USD':
      return 'Доллары ($)';
    case 'EUR':
      return 'Евро (€)';
    case 'RUB':
    default:
      return 'Рубли (₽)';
  }
};

// Converts salary string between currencies based on rough rate (e.g. 1 USD = 90 RUB, 1 EUR = 98 RUB)
export const formatSalaryWithCurrency = (salaryStr: string, currency: CurrencyType = 'RUB'): string => {
  if (!salaryStr) return '';

  // If salaryStr already contains currency symbols or custom text, format or replace appropriately
  const currSymbol = getCurrencySymbol(currency);
  
  // Replace $, €, ₽ if switching
  let formatted = salaryStr;
  if (currency === 'USD') {
    formatted = formatted.replace(/₽|руб|рублей|EUR|€/gi, '$');
  } else if (currency === 'EUR') {
    formatted = formatted.replace(/₽|руб|рублей|USD|\$/gi, '€');
  } else {
    formatted = formatted.replace(/\$|EUR|€|USD/gi, '₽');
  }

  return formatted;
};
