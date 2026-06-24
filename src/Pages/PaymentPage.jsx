import React, { useState, useEffect } from 'react';

const PaymentPage = ({ totalAmount = "$0", itemCount = 0, onPaymentComplete }) => {
  const [transactions, setTransactions] = useState(() => {
    const savedTx = localStorage.getItem('acme_ledger_records');
    return savedTx ? JSON.parse(savedTx) : [];
  });

  // Create a new record that drops directly into 'pending' with no secondary load states
  useEffect(() => {
    if (totalAmount !== "$0" && itemCount > 0) {
      const isDuplicate = transactions.some(
        tx => tx.amount === totalAmount && (Date.now() - tx.timestamp) < 2000
      );

      if (!isDuplicate) {
        const newTransaction = {
          id: `TX-ACME-${Math.floor(100000 + Math.random() * 900000)}`,
          amount: totalAmount,
          items: itemCount,
          timestamp: Date.now(),
          stage: 'pending' // Enters with pending status straight away
        };
        
        const updatedList = [newTransaction, ...transactions];
        setTransactions(updatedList);
        localStorage.setItem('acme_ledger_records', JSON.stringify(updatedList));

        // Wipe the temporary transfer props in App.jsx so refreshes don't re-trigger imports
        if (onPaymentComplete) {
          onPaymentComplete();
        }
      }
    }
  }, [totalAmount, itemCount]);

  // Track the exact 5-minute (300 seconds) countdown countdown
  useEffect(() => {
    const timerInterval = setInterval(() => {
      let changeDetected = false;
      
      const advancedTransactions = transactions.map((tx) => {
        const elapsedSeconds = Math.floor((Date.now() - tx.timestamp) / 1000);
        
        let targetStage = tx.stage;
        if (elapsedSeconds >= 300) {
          targetStage = 'successful';
        }

        if (tx.stage !== targetStage) {
          changeDetected = true;
          return { ...tx, stage: targetStage };
        }
        return tx;
      });

      if (changeDetected) {
        setTransactions(advancedTransactions);
        localStorage.setItem('acme_ledger_records', JSON.stringify(advancedTransactions));
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [transactions]);

  const clearLedgerHistory = () => {
    setTransactions([]);
    localStorage.removeItem('acme_ledger_records');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Transaction History</h1>
            <p className="text-gray-500 text-xs mt-1">Review active pipeline verifications and completed structural allocations.</p>
          </div>
          {transactions.length > 0 && (
            <button
              onClick={clearLedgerHistory}
              className="px-3 py-1.5 bg-gray-200/60 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100 text-gray-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Clear Logs
            </button>
          )}
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-16 text-gray-450 border border-dashed border-gray-200 rounded-2xl bg-white shadow-sm">
            📄 No dynamic transactions recorded in current history ledger session.
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => {
              const ageInSeconds = Math.floor((Date.now() - tx.timestamp) / 1000);
              const remainingSeconds = Math.max(300 - ageInSeconds, 0);
              const minutesLeft = Math.floor(remainingSeconds / 60);
              const secondsLeft = remainingSeconds % 60;

              return (
                <div 
                  key={tx.id} 
                  className={`bg-white border rounded-2xl p-6 shadow-sm transition-all duration-300 ${
                    tx.stage === 'successful' ? 'border-emerald-100 bg-emerald-50/10' : 'border-amber-100 bg-amber-50/5'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black text-gray-800">{tx.id}</span>
                        <span className="text-gray-300 text-xs">•</span>
                        <p className="text-xs font-medium text-gray-500">
                          {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-gray-900 mt-1.5">
                        Acquisition Payload: <span className="text-gray-600">{tx.items} Commodity Elements</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-lg font-black text-gray-900">{tx.amount}</span>
                      
                      {tx.stage === 'pending' ? (
                        <span className="px-3 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1.5 animate-pulse">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
                          Pending ({minutesLeft}m {secondsLeft}s)
                        </span>
                      ) : (
                        <span className="px-3 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1">
                          ✓ Successful
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;