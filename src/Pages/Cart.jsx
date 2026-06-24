import React, { useState } from 'react';

const Cart = ({ cartItems = [], onRemoveFromCart, onClearCart, onNavigateToPayment }) => {
  const [isInitializing, setIsInitializing] = useState(false);

  const calculateTotal = () => {
    const rawSum = cartItems.reduce((accumulator, item) => {
      if (!item || !item.price) return accumulator;
      const cleanPrice = parseInt(String(item.price).replace(/[$,\s]|(\/mo)/g, ''), 10);
      return accumulator + (isNaN(cleanPrice) ? 0 : cleanPrice);
    }, 0);
    return `$${rawSum.toLocaleString()}`;
  };

  const handleCheckoutClick = () => {
    if (isInitializing) return;
    
    // Turn on the full page initializing screen overlay layout state
    setIsInitializing(true);

    // Wait exactly 3 seconds before moving to the next route page
    setTimeout(() => {
      onNavigateToPayment(calculateTotal());
      setIsInitializing(false);
    }, 3000);
  };

  // --- FULL SCREEN INITIALIZING LOADING STATE (STAYS ON CART PATH FOR 3s) ---
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-sans">
        <div className="text-center space-y-4 max-w-sm px-4 animate-pulse">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          <h2 className="text-xl font-black text-white tracking-tight">Initializing Transaction Pipeline...</h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            Securing handshake gateways and preparing payment metadata structures. Please wait.
          </p>
        </div>
      </div>
    );
  }

  // --- REGULAR CART SURFACE DISPLAY ---
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Your Structural Cart</h1>
            <p className="text-slate-400 text-sm mt-1">Manage your selected property configuration acquisitions.</p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={onClearCart}
              className="px-4 py-2 bg-rose-600/20 border border-rose-500/30 text-rose-400 font-bold text-xs rounded-xl hover:bg-rose-600 hover:text-white transition-all cursor-pointer"
            >
              Clear Entire Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 text-slate-500 border border-dashed border-slate-800 rounded-2xl bg-slate-900/10">
            🛒 Your structural portfolio cart is currently empty.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">📍 {item.location} • 🛌 {item.beds} Bds • 🛁 {item.baths} Ba</p>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-xl font-black text-blue-400">{item.price}</span>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer px-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {cartItems.length >= 2 && (
              <div className="bg-slate-900/80 backdrop-blur-2xl border border-blue-500/30 rounded-2xl p-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-2xl">
                <div>
                  <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">Commodities Summary</p>
                  <p className="text-sm text-slate-300 mt-0.5">Combined total for {cartItems.length} selected property portfolios.</p>
                </div>
                <button
                  onClick={handleCheckoutClick}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-6 py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer text-center whitespace-nowrap uppercase tracking-wider"
                >
                  Pay {calculateTotal()} For Their Commodities →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;