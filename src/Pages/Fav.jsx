import React from 'react';

const Fav = ({ favoriteItems = [], onToggleFavorite, onAddToCart }) => {
  
  // Helper to safely display the customized calculated price or fall back gracefully
  const formatItemPrice = (offer) => {
    if (offer.calculatedPrice) {
      return '₦' + offer.calculatedPrice.toLocaleString('en-NG');
    }
    if (offer.basePrice) {
      return '₦' + offer.basePrice.toLocaleString('en-NG');
    }
    return offer.price || 'Contact for Price';
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight">Your Saved Spaces</h1>
          <p className="text-neutral-500 text-sm mt-1">Review and manage your shortlisted premium Nigerian properties.</p>
        </div>

        {favoriteItems.length === 0 ? (
          <div className="text-center py-16 text-neutral-400 border border-dashed border-neutral-300 rounded-2xl bg-white shadow-sm max-w-xl mx-auto p-8">
            <span className="text-3xl mb-2 block">❤️</span>
            <p className="font-bold text-neutral-700 text-sm">Your shortlist is empty</p>
            <p className="text-xs text-neutral-400 mt-1">Save properties while browsing to track them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteItems.map((offer) => (
              <div 
                key={offer.id} 
                className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-2xl font-black text-neutral-900 tracking-tight block">
                        {formatItemPrice(offer)}
                      </span>
                      {offer.isRental && (
                        <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md inline-block mt-1 uppercase">
                          Lease Space
                        </span>
                      )}
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => onToggleFavorite(offer)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white text-xs font-bold transition-all cursor-pointer active:scale-95"
                    >
                      Remove
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-neutral-800 tracking-tight mt-5 line-clamp-2">
                    {offer.title}
                  </h3>
                  
                  <span className="text-xs text-neutral-400 flex items-center gap-1 mt-2 font-medium">
                    📍 {offer.location}
                  </span>
                  
                  {/* Display specs if they exist on data object */}
                  {(offer.beds || offer.baths) && (
                    <div className="flex gap-2.5 text-xs text-neutral-500 font-semibold mt-4">
                      <span className="bg-neutral-50 px-2 py-1 rounded-md border border-neutral-200/50">🛌 {offer.beds} Beds</span>
                      <span className="bg-neutral-50 px-2 py-1 rounded-md border border-neutral-200/50">🛁 {offer.baths} Baths</span>
                    </div>
                  )}
                </div>

                {/* Primary Action Call to Action */}
                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => onAddToCart && onAddToCart(offer)}
                    className="w-full bg-neutral-900 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-sm active:scale-98 text-center"
                  >
                    {offer.isRental ? 'Add Lease to Portfolio' : 'Buy Estate Asset'}
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fav;