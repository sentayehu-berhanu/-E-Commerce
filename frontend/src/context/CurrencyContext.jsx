import { createContext, useState, useEffect } from 'react';

export const CurrencyContext = createContext();

const exchangeRates = {
  USD: { rate: 1, symbol: '$' },
  EUR: { rate: 0.93, symbol: '€' },
  GBP: { rate: 0.79, symbol: '£' },
  ETB: { rate: 57.0, symbol: 'Br ' }
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency') || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const formatPrice = (priceInUSD) => {
    const rateInfo = exchangeRates[currency] || exchangeRates.USD;
    const convertedPrice = priceInUSD * rateInfo.rate;
    
    // For ETB, we might not want decimals if they are small, but let's keep 2 for consistency
    return `${rateInfo.symbol}${convertedPrice.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, exchangeRates }}>
      {children}
    </CurrencyContext.Provider>
  );
};
