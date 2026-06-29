import React from 'react';

const Cart = ({ cartItems, onRemoveFromCart, onClearCart, onNavigateToPayment, transactions, user }) => {
  // Calculate total price of items currently in the cart
  const totalBasketValue = cartItems.reduce((acc, item) => acc + Number(item.basePrice), 0);

  // Filter transactions to show ONLY history belonging to this logged-in buyer
  const myHistory = transactions.filter((tx) => tx.buyerEmail === user?.email);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen font-sans bg-white">
      
      {/* Page Title */}
      <div className="mb-10 border-b border-gray-100 pb-5">
        <h1 className="text-3xl font-black text-gray-950 tracking-tight">Buyer Dashboard</h1>
        <p className="text-sm text-gray-500">Manage your current selections and view your order history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN: ACTIVE SHOPPING CART */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Your Selections ({cartItems.length})</h2>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
              <p className="text-gray-400 text-sm">Your cart is empty. Browse properties to add them here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-2xl items-center justify-between bg-white shadow-sm">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-xl" />
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-gray-400">{item.location}</p>
                      <p className="text-sm font-black text-gray-950 mt-1">₦{Number(item.basePrice).toLocaleString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="text-xs font-bold text-rose-600 hover:underline cursor-pointer px-3 py-1"
                  >
                    Remove
                  </button>
                </div>
              ))}

              {/* Total Calculation Row */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button onClick={onClearCart} className="text-xs text-gray-400 font-bold hover:text-gray-600 cursor-pointer">
                  Clear All Items
                </button>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-medium">Total Price</p>
                  <p className="text-xl font-black text-gray-950">₦{totalBasketValue.toLocaleString()}</p>
                </div>
              </div>

              {/* Broadcast Button */}
              <button
                onClick={() => onNavigateToPayment(totalBasketValue)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer text-center block"
              >
                Broadcast Purchase Request to Network
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: PERMANENT PURCHASE HISTORY LOG */}
        <div className="space-y-6">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Purchase History Ledger</h2>
          <p className="text-xs text-gray-400 -mt-4">Real-time status updates from asset sellers.</p>

          {myHistory.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
              <p className="text-gray-400 text-sm">No transaction logs or past orders found.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
              {myHistory.map((tx) => (
                <div 
                  key={tx.txId} 
                  className={`p-4 border rounded-2xl bg-white shadow-sm flex flex-col gap-2 transition-all duration-300 ${
                    tx.status === 'SUCCESSFUL' ? 'border-emerald-200 bg-emerald-50/10' : 
                    tx.status === 'UNSUCCESSFUL' ? 'border-rose-200 bg-rose-50/10' : 
                    'border-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs line-clamp-1">{tx.title}</h4>
                      <span className="text-[9px] font-mono text-gray-400 block mt-0.5">ID: {tx.txId.substring(0, 8)}...</span>
                    </div>
                    
                    {/* DYNAMIC LIVE BADGES CHANGES INSTANTLY */}
                    {tx.status === 'PENDING' && (
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-full animate-pulse whitespace-nowrap">
                        Pending ⏳
                      </span>
                    )}
                    {tx.status === 'SUCCESSFUL' && (
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-600 text-white rounded-full shadow-sm whitespace-nowrap">
                        Successful ✅
                      </span>
                    )}
                    {tx.status === 'UNSUCCESSFUL' && (
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-rose-600 text-white rounded-full shadow-sm whitespace-nowrap">
                        Unsuccessful ❌
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-50 text-[11px]">
                    <span className="text-gray-400 truncate max-w-[120px]">Seller: {tx.sellerId}</span>
                    <span className="text-sm font-black text-gray-950">₦{Number(tx.price).toLocaleString()}</span>
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

export default Cart;