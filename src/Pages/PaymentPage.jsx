import React from 'react';
import { Link } from 'react-router-dom';

const PaymentPage = ({ transactions, user }) => {
  // Filter transactions to show ONLY history belonging to this logged-in buyer
  const myHistory = transactions.filter((tx) => tx.buyerEmail === user?.email);

  // Grab the very latest transaction to show as the "Current Order" on top
  const latestTx = myHistory[0]; 

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen font-sans bg-white">
      
      {/* SUCCESS CONFIRMATION HEADER */}
      <div className="text-center mb-12 bg-blue-50/50 border border-blue-100 rounded-3xl p-8 shadow-sm">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-md animate-bounce">
          ✓
        </div>
        <h1 className="text-2xl font-black text-gray-950 tracking-tight">Request Broadcasted Successfully!</h1>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          Your asset acquisition offer has been routed directly into the seller's secure dashboard stream. 
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to="/services" className="text-xs font-bold bg-white border border-gray-200 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
            ← Browse More Properties
          </Link>
        </div>
      </div>

      {/* TWO-COLUMN STATUS INTERFACE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: CURRENT BROADCAST ALERT (Takes 1 col) */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-wider">Current Pipeline</h2>
          
          {latestTx ? (
            <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm space-y-3">
              <span className="text-[9px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">LATEST BROADCAST</span>
              <h3 className="font-extrabold text-gray-900 text-sm line-clamp-2">{latestTx.title}</h3>
              <p className="text-lg font-black text-gray-950">₦{Number(latestTx.price).toLocaleString()}</p>
              
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">Live Status:</span>
                {latestTx.status === 'PENDING' && <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-full animate-pulse">Pending ⏳</span>}
                {latestTx.status === 'SUCCESSFUL' && <span className="text-xs font-bold px-2.5 py-1 bg-emerald-600 text-white rounded-full shadow-md">Successful ✅</span>}
                {latestTx.status === 'UNSUCCESSFUL' && <span className="text-xs font-bold px-2.5 py-1 bg-rose-600 text-white rounded-full shadow-md">Unsuccessful ❌</span>}
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No active requests floating in network pipelines.</p>
          )}
        </div>

        {/* RIGHT COLUMN: PERMANENT PURCHASE HISTORY LEDGER (Takes 2 cols) */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-wider">Your Historical Ledger ({myHistory.length})</h2>

          {myHistory.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
              <p className="text-gray-400 text-xs">No recorded logs found under account: {user?.email}</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
              {myHistory.map((tx) => (
                <div 
                  key={tx.txId} 
                  className={`p-4 border rounded-2xl bg-white shadow-sm flex items-center justify-between gap-4 transition-all duration-300 ${
                    tx.status === 'SUCCESSFUL' ? 'border-emerald-200 bg-emerald-50/5 shadow-emerald-50/20' : 
                    tx.status === 'UNSUCCESSFUL' ? 'border-rose-200 bg-rose-50/5 shadow-rose-50/20' : 
                    'border-gray-100'
                  }`}
                >
                  <div className="space-y-1 w-2/3">
                    <h4 className="font-extrabold text-gray-900 text-xs line-clamp-1">{tx.title}</h4>
                    <p className="text-[10px] text-gray-400 truncate">Seller ID: {tx.sellerId}</p>
                    <span className="text-[9px] font-mono text-gray-300 block">ID: {tx.txId}</span>
                  </div>

                  <div className="text-right space-y-2 flex flex-col items-end flex-shrink-0">
                    <p className="text-sm font-black text-gray-950">₦{Number(tx.price).toLocaleString()}</p>
                    
                    {/* SELLER ACTION RESPONSE BADGES */}
                    {tx.status === 'PENDING' && (
                      <span className="text-[9px] font-extrabold px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-full animate-pulse">
                        Awaiting Review ⏳
                      </span>
                    )}
                    {tx.status === 'SUCCESSFUL' && (
                      <span className="text-[9px] font-extrabold px-2 py-0.5 bg-emerald-600 text-white rounded-full shadow-sm">
                        Successful ✅
                      </span>
                    )}
                    {tx.status === 'UNSUCCESSFUL' && (
                      <span className="text-[9px] font-extrabold px-2 py-0.5 bg-rose-600 text-white rounded-full shadow-sm">
                        Unsuccessful ❌
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;