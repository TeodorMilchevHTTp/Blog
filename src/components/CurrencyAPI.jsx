import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const CurrencyAPI = () => {
  const [rates, setRates] = useState({ usd: {}, bgn: {} });
  const [prevRates, setPrevRates] = useState({ usd: {}, bgn: {} });
  const [rateHistory, setRateHistory] = useState({ usd: {}, bgn: {} });
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef();

  const fetchRates = async () => {
  try {
    // Fetch from your backend API endpoint
    const res = await fetch('/api/rates');
    if (!res.ok) throw new Error('Network response was not ok');

    const data = await res.json();

    const newRates = {
      usd: data.usd || {},
      bgn: data.bgn || {}
    };

    setPrevRates(rates); // store previous before setting new
    setRates(newRates);

    // Update history for sparklines
    setRateHistory((prev) => {
      const updated = { usd: { ...prev.usd }, bgn: { ...prev.bgn } };

      Object.entries(newRates.usd).forEach(([currency, rate]) => {
        if (!updated.usd[currency]) updated.usd[currency] = [];
        updated.usd[currency] = [...updated.usd[currency].slice(-19), rate];
      });

      Object.entries(newRates.bgn).forEach(([currency, rate]) => {
        if (!updated.bgn[currency]) updated.bgn[currency] = [];
        updated.bgn[currency] = [...updated.bgn[currency].slice(-19), rate];
      });

      return updated;
    });

    setLoading(false);
  } catch (err) {
    console.error("Failed to fetch exchange rates", err);
  }
};


  useEffect(() => {
    fetchRates();
    intervalRef.current = setInterval(fetchRates, 10000); // refresh every 10 sec
    return () => clearInterval(intervalRef.current);
  }, []);

  if (loading) return <p className="text-slate-400">Loading exchange rates...</p>;

  const currencies = Object.keys(rates.usd);

  const getRateChange = (base, currency) => {
    const current = rates[base]?.[currency];
    const previous = prevRates[base]?.[currency];

    if (previous === undefined) return 'neutral';
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'neutral';
  };

  const getColor = (change) => {
    return change === 'up' ? 'text-green-600 dark:text-green-400' :
           change === 'down' ? 'text-green-600 dark:text-green-400' :
           'text-gray-800 dark:text-slate-300';
  };

  return (
    <motion.section
      className="bg-light-card dark:bg-white/10 backdrop-blur rounded-xl shadow-soft p-8 transition-colors duration-500"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold text-primary-100 text-center mb-4">Live Exchange Rates</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm bg-gray-50 dark:bg-transparent transition-colors duration-300">
          <thead className="text-gray-700 dark:text-slate-300 border-b border-slate-600">
            <tr>
              <th className="py-2 px-4">Currency</th>
              <th className="py-2 px-4">USD →</th>
              <th className="py-2 px-4">Trend (USD)</th>
              <th className="py-2 px-4">BGN →</th>
              <th className="py-2 px-4">Trend (BGN)</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => {
              const usdChange = getRateChange("usd", currency);
              const bgnChange = getRateChange("bgn", currency);

              return (
                <tr key={currency} className="border-b border-gray-300 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-800/50 transition">
                  <td className="py-2 px-4 font-medium text-gray-900 dark:text-white">{currency}</td>

                  {/* USD Rate with animation */}
                  <td className={`py-2 px-4 font-semibold ${getColor(usdChange)}`}>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={rates.usd[currency]}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {rates.usd[currency]?.toFixed(4)}
                      </motion.span>
                    </AnimatePresence>
                  </td>

                  {/* USD Sparkline */}
                  <td className="py-2 px-4">
                    <Sparklines data={rateHistory.usd[currency] || []} width={100} height={20}>
                      <SparklinesLine color={usdChange === 'up' ? 'green' : usdChange === 'down' ? 'red' : 'gray'} />
                    </Sparklines>
                  </td>

                  {/* BGN Rate with animation */}
                  <td className={`py-2 px-4 font-semibold ${getColor(bgnChange)}`}>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={rates.bgn[currency]}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {rates.bgn[currency]?.toFixed(4)}
                      </motion.span>
                    </AnimatePresence>
                  </td>

                  {/* BGN Sparkline */}
                  <td className="py-2 px-4">
                    <Sparklines data={rateHistory.bgn[currency] || []} width={100} height={20}>
                      <SparklinesLine color={bgnChange === 'up' ? 'green' : bgnChange === 'down' ? 'red' : 'gray'} />
                    </Sparklines>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
};

export default CurrencyAPI;
