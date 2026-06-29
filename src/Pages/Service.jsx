import React from 'react';

// Make sure to accept the correct prop names coming from App.js
const Service = ({ 
  user, 
  customProperties, 
  cartItems, 
  favoriteItems, 
  onAddToCart, 
  onRemoveFromCart, 
  onToggleFavorite, 
  searchQuery 
}) => {

  // ⚡ CRITICAL: Filter directly from the prop array so it updates instantly when Firebase fires
  const filteredMarketplace = customProperties.filter((property) => {
    const titleMatch = property.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const locationMatch = property.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || locationMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-black text-gray-950 tracking-tight">Public Property Marketplace</h1>
        <p className="text-sm text-gray-400 mt-1">Showing all live properties broadcasted across the network.</p>
      </div>

      {filteredMarketplace.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-sm">No properties match your search or no listings are currently live.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMarketplace.map((property) => {
            // Check if this specific item is already added to cart or favorites
            const isInCart = cartItems.some((c) => c.id === property.id);
            const isFav = favoriteItems.some((f) => f.id === property.id);

            return (
              <div key={property.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
                
                {/* Image & Badge Container */}
                <div className="relative overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title} 
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-4 left-4 text-[10px] font-black tracking-wider px-3 py-1 rounded-full text-white shadow-sm ${
                    property.isRental ? 'bg-amber-600' : 'bg-emerald-600'
                  }`}>
                    {property.tag}
                  </span>
                  
                  {/* Favorite Toggle Button */}
                  {user && (
                    <button 
                      onClick={() => onToggleFavorite(property)}
                      className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-md text-gray-400 hover:text-rose-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 ${isFav ? 'text-rose-600' : ''}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Details Meta Block */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-gray-950 text-base line-clamp-1">{property.title}</h3>
                    <p className="text-xs text-gray-400 font-medium mt-1 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      {property.location}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Price</span>
                      <p className="text-lg font-black text-neutral-950">
                        ₦{Number(property.basePrice).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Cart Action Buttons */}
                  {user ? (
                    <div className="mt-6">
                      {isInCart ? (
                        <button
                          onClick={() => onRemoveFromCart(property.id)}
                          className="w-full bg-rose-50 text-rose-600 font-bold py-3 rounded-xl text-xs hover:bg-rose-100 transition-all"
                        >
                          Remove from Cart
                        </button>
                      ) : (
                        <button
                          onClick={() => onAddToCart(property)}
                          className="w-full bg-neutral-950 text-white font-bold py-3 rounded-xl text-xs hover:bg-neutral-900 transition-all shadow-sm"
                        >
                          Acquire Asset / Add to Cart
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="mt-6 text-center text-xs text-gray-400 bg-gray-50 py-3 rounded-xl border border-dashed">
                      Please sign in to make an offer on this asset.
                    </p>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Service;