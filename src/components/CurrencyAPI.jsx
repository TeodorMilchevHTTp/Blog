import React, { useEffect, useState } from 'react';

const CurrencyAPI = () => {
  const [rates, setRates] = useState({ usd: {}, bgn: {} });
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.REACT_APP_FAST_FOREX_API_KEY;

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const [resUSD, resBGN] = await Promise.all([
          fetch(`https://api.fastforex.io/fetch-multi?from=USD&to=EUR,GBP,JPY&api_key=${apiKey}`),
          fetch(`https://api.fastforex.io/fetch-multi?from=BGN&to=EUR,GBP,JPY&api_key=${apiKey}`)
        ]);

        const dataUSD = await resUSD.json();
        const dataBGN = await resBGN.json();

        console.log('Fetched USD rates:', dataUSD);
        console.log('Fetched BGN rates:', dataBGN);

        setRates({
          usd: dataUSD.results || {},
          bgn: dataBGN.results || {}
        });

      } catch (err) {
        console.error('Error fetching exchange rates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [apiKey]);

  if (loading) {
    return <p className="text-slate-400">Loading exchange rates...</p>;
  }

  const currencies = Object.keys(rates.usd);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="text-slate-300 border-b border-slate-600">
          <tr>
            <th className="py-2 px-4">Currency</th>
            <th className="py-2 px-4">Exchange Rate (USD →)</th>
            <th className="py-2 px-4">Exchange Rate (BGN →)</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => (
            <tr key={currency} className="border-b border-slate-700 hover:bg-slate-800/50 transition">
              <td className="py-2 px-4 font-medium text-white">{currency}</td>
              <td className="py-2 px-4 text-green-400">{rates.usd[currency]}</td>
              <td className="py-2 px-4 text-green-400">
                {rates.bgn[currency] !== undefined ? rates.bgn[currency] : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyAPI;
