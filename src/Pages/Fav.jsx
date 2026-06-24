import React from 'react';

const Fav = ({ favoriteItems = [], onToggleFavorite, onAddToCart }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black mb-2 text-white">Your Saved Favorites</h1>
        <p className="text-slate-400 mb-8 text-sm">Review your curated luxury asset configurations.</p>

        {favoriteItems.length === 0 ? (
          <div className="text-center py-16 text-slate-500 border border-dashed border-slate-800 rounded-2xl bg-slate-900/10">
            ❤️ No properties saved to favorites yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteItems.map((offer) => (
              <div 
                key={offer.id} 
                className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/60 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xl font-black text-blue-400 tracking-tight block">{offer.price}</span>
                      <span className="text-xs text-slate-400 font-medium">📍 {offer.location}</span>
                    </div>
                    <button
                      onClick={() => onToggleFavorite(offer)}
                      className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer text-xs font-bold"
                    >
                      Remove
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-4">{offer.title}</h3>
                </div>

                {/* NEW ADD TO CART BUTTON BELOW THE ITEM CONTENT */}
                <div className="mt-6">
                  <button
                    onClick={() => onAddToCart && onAddToCart(offer)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer shadow-lg"
                  >
                    Add to Cart
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