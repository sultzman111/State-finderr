import React, { useState } from 'react';

const Cart = ({ cartItems = [], onRemoveFromCart, onClearCart, onNavigateToPayment }) => {
  const [isInitializing, setIsInitializing] = useState(false);

  // Helper to cleanly format numbers into local Currency currency layout
  const formatCurrency = (value) => {
    return '₦' + value.toLocaleString('en-NG');
  };

  // Calculates total price dynamically using the multiplied property values
  const calculateTotalRaw = () => {
    return cartItems.reduce((accumulator, item) => {
      if (!item) return accumulator;
      // Use calculatedPrice if available from custom rental choice; fallback to basePrice
      const targetPrice = item.calculatedPrice !== undefined ? item.calculatedPrice : (item.basePrice || 0);
      return accumulator + targetPrice;
    }, 0);
  };

  const handleCheckoutClick = () => {
    if (isInitializing) return;
    
    setIsInitializing(true);

    // Wait exactly 3 seconds before moving to the next route page
    setTimeout(() => {
      onNavigateToPayment(formatCurrency(calculateTotalRaw()));
      setIsInitializing(false);
    }, 3000);
  };

  // --- PROCESSING LOADING SCREEN OVERLAY ---
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col items-center justify-center font-sans">
        <div className="text-center space-y-4 max-w-sm px-4 animate-pulse">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
          <h2 className="text-xl font-black text-white tracking-tight">Initializing Transaction...</h2>
          <p className="text-neutral-400 text-xs leading-relaxed">
            Securing safe local checkout gateways and compiling rental metadata matrix. Please wait.
          </p>
        </div>
      </div>
    );
  }

  // --- MAIN DISPLAY SURFACE ---
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 py-16 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-neutral-900 tracking-tight">Your Portfolio Cart</h1>
            <p className="text-neutral-500 text-sm mt-1">Review your selected properties and lease acquisitions.</p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={onClearCart}
              className="px-4 py-2 bg-rose-50 border border-rose-200 text-rose-600 font-bold text-xs rounded-xl hover:bg-rose-600 hover:text-white transition-all cursor-pointer"
            >
              Clear Entire Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 text-neutral-400 border border-dashed border-neutral-300 rounded-2xl bg-white shadow-sm">
            🇳🇬 Your structural portfolio cart is empty.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {cartItems.map((item) => {
                const currentItemPrice = item.calculatedPrice !== undefined ? item.calculatedPrice : item.basePrice;
                
                return (
                  <div key={item.id} className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-neutral-300 transition-all">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
                        {item.isRental && (
                          <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                            Lease: {item.durationSelected || 1} Mos
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 mt-1.5 font-medium">📍 {item.location} • 🛌 {item.beds} Beds • 🛁 {item.baths} Baths</p>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-xl font-black text-neutral-900 tracking-tight">
                        {formatCurrency(currentItemPrice)}
                      </span>
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="text-xs font-bold text-rose-500 hover:text-rose-700 transition-colors cursor-pointer px-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* OVERALL PORTFOLIO SUMMARY CARD */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
              <div>
                <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Acquisition Summary</p>
                <p className="text-sm text-neutral-500 mt-0.5">Combined financial total for {cartItems.length} selected items.</p>
              </div>
              <button
                onClick={handleCheckoutClick}
                className="w-full sm:w-auto bg-neutral-900 hover:bg-emerald-700 text-white font-black text-xs px-6 py-4 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer text-center whitespace-nowrap uppercase tracking-wider"
              >
                Secure Portfolio: {formatCurrency(calculateTotalRaw())} →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;