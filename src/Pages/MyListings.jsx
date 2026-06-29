import React from 'react';

const MyListings = ({ listings, currentUser, onDeleteListing, transactions, onUpdateTxStatus }) => {
  // 1. Filter out only the properties belonging to this seller
  const myProperties = listings.filter((item) => item.sellerId === currentUser?.email);

  // 2. Filter out transactions/offers targeted at this seller's properties
  const myIncomingOffers = transactions.filter((tx) => tx.sellerId === currentUser?.email);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen font-sans bg-white">
      
      {/* HEADER SECTION */}
      <div className="mb-12 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-black text-gray-950 tracking-tight">Seller Control Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Logged in as: <span className="font-semibold text-blue-600">{currentUser?.email}</span></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT/CENTER COLUMN: LISTINGS MANAGEMENT (Takes up 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Your Active Assets ({myProperties.length})</h2>
          
          {myProperties.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
              <p className="text-gray-400 text-sm">You haven't uploaded any property listings yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myProperties.map((property) => (
                <div key={property.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col bg-white">
                  <img src={property.image} alt={property.title} className="w-full h-40 object-cover" />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-1 text-sm">{property.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{property.location}</p>
                      <p className="text-sm font-black text-gray-900 mt-2">₦{Number(property.basePrice).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => onDeleteListing(property.id)}
                      className="w-full mt-4 bg-red-50 text-red-600 hover:bg-red-100 font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Remove Listing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: INCOMING BUYER OFFERS NOTIFICATIONS (Takes up 1 col) */}
        <div className="space-y-6">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Live Notifications & Offers</h2>
          
          {myIncomingOffers.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
              <p className="text-gray-400 text-sm">No incoming purchase alerts at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myIncomingOffers.map((tx) => (
                <div key={tx.txId} className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-bold">OFFER ID: {tx.txId.substring(0, 8)}...</span>
                      
                      {/* STATUS BADGES */}
                      {tx.status === 'PENDING' && <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-full">Awaiting Review</span>}
                      {tx.status === 'SUCCESSFUL' && <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full">Successful ✅</span>}
                      {tx.status === 'UNSUCCESSFUL' && <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-full">Unsuccessful ❌</span>}
                    </div>

                    <h4 className="font-extrabold text-gray-900 text-sm">{tx.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">Buyer: <span className="font-medium text-gray-900">{tx.buyerEmail}</span></p>
                    <p className="text-sm font-black text-blue-600 mt-2">Offer Price: ₦{Number(tx.price).toLocaleString()}</p>
                  </div>

                  {/* INTERACTIVE OK / NO BUTTON ACTION SECTION */}
                  {tx.status === 'PENDING' ? (
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-50">
                      <button
                        onClick={() => onUpdateTxStatus(tx.txId, 'SUCCESSFUL')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs shadow-sm cursor-pointer transition-all active:scale-95"
                      >
                        Accept (OK)
                      </button>
                      <button
                        onClick={() => onUpdateTxStatus(tx.txId, 'UNSUCCESSFUL')}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded-xl text-xs shadow-sm cursor-pointer transition-all active:scale-95"
                      >
                        Decline (No)
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 pt-3 border-t border-gray-50 text-center">
                      <p className="text-xs text-gray-400 italic">This transaction request has been closed.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MyListings;