import React from 'react';

const Service = ({ 
  searchQuery, 
  onAddToCart, 
  onRemoveFromCart, 
  cartItems = [], 
  onToggleFavorite, 
  favoriteItems = [] 
}) => {
  const allOffers = [
    { id: 1, title: 'Skyline Modern Apartment', price: '$4,500/mo', location: 'New York, NY', beds: 2, baths: 2, tag: 'FOR RENT', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'Pacific Vista Villa', price: '$1,250,000', location: 'Malibu, CA', beds: 4, baths: 3.5, tag: 'FOR SALE', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'The Urban Loft', price: '$3,200/mo', location: 'Chicago, IL', beds: 1, baths: 1.5, tag: 'FOR RENT', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80' },
    { id: 4, title: 'Serene Suburb Mansion', price: '$2,450,000', location: 'Austin, TX', beds: 5, baths: 5, tag: 'FOR SALE', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
    { id: 5, title: 'Minimalist Glass Complex', price: '$8,900/mo', location: 'Los Angeles, CA', beds: 3, baths: 3, tag: 'HOT DEAL', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
    { id: 6, title: 'Elite Waterfront Penthouse', price: '$3,800,000', location: 'Miami, FL', beds: 4, baths: 4.5, tag: 'PREMIUM', image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=600&q=80' },
    { id: 7, title: 'Nordic Forest Cabin', price: '$650,000', location: 'Aspen, CO', beds: 3, baths: 2, tag: 'FOR SALE', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80' },
    { id: 8, title: 'Industrial Brick Studio', price: '$2,800/mo', location: 'Brooklyn, NY', beds: 1, baths: 1, tag: 'FOR RENT', image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=600&q=80' },
    { id: 9, title: 'Sunset Ridge Estate', price: '$5,100,000', location: 'Las Vegas, NV', beds: 6, baths: 7, tag: 'PREMIUM', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80' },
    { id: 10, title: 'Metropolitan High-Rise', price: '$5,200/mo', location: 'Seattle, WA', beds: 2, baths: 2.5, tag: 'HOT DEAL', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
    { id: 11, title: 'Coastal Oasis Bungalow', price: '$920,000', location: 'San Diego, CA', beds: 3, baths: 2.5, tag: 'FOR SALE', image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=600&q=80' },
    { id: 12, title: 'Eco-Luxury Smart Home', price: '$1,850,000', location: 'Portland, OR', beds: 4, baths: 4, tag: 'FOR SALE', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' }
  ];

  const filteredOffers = allOffers.filter((offer) => {
    const query = searchQuery ? searchQuery.toLowerCase() : '';
    return (
      offer.title.toLowerCase().includes(query) ||
      offer.location.toLowerCase().includes(query) ||
      offer.price.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800 flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-900">
      <div className="flex-1 flex flex-col">
        
        {/* HEADER */}
        <header className="max-w-7xl mx-auto px-6 pt-24 pb-12 text-center w-full">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
            Welcome to Your Next Chapter
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 mt-5 mb-3">
            Find a space that feels like home
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm font-medium leading-relaxed">
            Explore our curated collection of beautiful homes, properties, and modern retreats tailored for premium comfort.
          </p>
        </header>

        {/* LISTINGS GRID */}
        <main className="max-w-7xl mx-auto px-6 py-2 w-full mb-24 flex-1">
          {filteredOffers.length === 0 ? (
            <div className="text-center py-16 border border-neutral-200 rounded-2xl bg-white max-w-sm mx-auto shadow-sm p-6">
              <span className="text-3xl mb-3 block">✨</span>
              <p className="text-sm font-bold text-neutral-800">No matching spaces found</p>
              <p className="text-xs text-neutral-400 mt-1">Try refining your search keyword for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredOffers.map((offer) => {
                const isAdded = cartItems ? cartItems.some((item) => item.id === offer.id) : false;
                const isFavorite = favoriteItems ? favoriteItems.some((item) => item.id === offer.id) : false;

                return (
                  <div 
                    key={offer.id}
                    className="group bg-white rounded-2xl border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-neutral-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Dynamic Image Wrapper Frame */}
                    <div className="h-48 w-full overflow-hidden relative bg-neutral-100">
                      <img 
                        src={offer.image} 
                        alt={offer.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Top Action Tags Overlay */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                        <span className="bg-white/90 backdrop-blur-md border border-neutral-200/40 text-neutral-800 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                          {offer.tag}
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => onToggleFavorite && onToggleFavorite(offer)}
                          className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer active:scale-90 ${
                            isFavorite 
                              ? 'bg-rose-500 border-rose-500 text-white shadow-md' 
                              : 'bg-white/90 backdrop-blur-md border-neutral-200/60 text-neutral-600 hover:text-rose-500 hover:bg-white'
                          }`}
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${isFavorite ? 'fill-current' : 'fill-none'}`}
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Content Frame */}
                    <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <span className="text-2xl font-black text-neutral-900 group-hover:text-indigo-600 transition-colors duration-200 tracking-tight block">
                          {offer.price}
                        </span>
                        <h3 className="text-base font-bold tracking-tight text-neutral-800 mt-2 line-clamp-1">
                          {offer.title}
                        </h3>
                        <span className="text-xs text-neutral-400 flex items-center gap-1 mt-1.5 font-medium">
                          <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                          </svg>
                          {offer.location}
                        </span>
                      </div>

                      {/* Footer Utilities Block */}
                      <div className="border-t border-neutral-100 pt-4 flex items-center justify-between gap-4">
                        <div className="flex gap-2.5 text-xs text-neutral-500 font-semibold">
                          <span className="bg-neutral-50 px-2 py-1 rounded-md border border-neutral-200/50">
                            🛌 <strong className="text-neutral-700">{offer.beds}</strong> Beds
                          </span>
                          <span className="bg-neutral-50 px-2 py-1 rounded-md border border-neutral-200/50">
                            🛁 <strong className="text-neutral-700">{offer.baths}</strong> Baths
                          </span>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => {
                            if (isAdded) {
                              onRemoveFromCart && onRemoveFromCart(offer.id);
                            } else {
                              onAddToCart && onAddToCart(offer);
                            }
                          }}
                          className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer border ${
                            isAdded 
                              ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white' 
                              : 'bg-neutral-900 border-transparent text-white hover:bg-indigo-600 shadow-sm'
                          }`}
                        >
                          {isAdded ? 'Remove' : 'Reserve'}
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Service;