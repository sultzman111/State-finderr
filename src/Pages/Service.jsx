import React from 'react';

const Service = ({ searchQuery, onAddToCart, cartItems }) => {
  // Your structure objects matching your application display layout
  const allOffers = [
    { id: 1, title: 'Skyline Modern Apartment', price: '$4,500/mo', location: 'New York, NY', beds: 2, baths: 2, tag: 'FOR RENT' },
    { id: 2, title: 'Pacific Vista Villa', price: '$1,250,000', location: 'Malibu, CA', beds: 4, baths: 3.5, tag: 'FOR SALE' },
    { id: 3, title: 'The Urban Loft', price: '$3,200/mo', location: 'Chicago, IL', beds: 1, baths: 1.5, tag: 'FOR RENT' },
    { id: 4, title: 'Serene Suburb Mansion', price: '$2,450,000', location: 'Austin, TX', beds: 5, baths: 5, tag: 'FOR SALE' },
    { id: 5, title: 'Minimalist Glass Complex', price: '$8,900/mo', location: 'Los Angeles, CA', beds: 3, baths: 3, tag: 'HOT DEAL' },
    { id: 6, title: 'Elite Waterfront Penthouse', price: '$3,800,000', location: 'Miami, FL', beds: 4, baths: 4.5, tag: 'PREMIUM' }
  ];

  // REAL-TIME SEARCH FILTER ENGINE
  const filteredOffers = allOffers.filter((offer) => {
    const query = searchQuery ? searchQuery.toLowerCase() : '';
    return (
      offer.title.toLowerCase().includes(query) ||
      offer.location.toLowerCase().includes(query) ||
      offer.price.toLowerCase().includes(query)
    );
  });

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed font-sans text-slate-100 flex flex-col justify-between relative"
      style={{ backgroundImage: `url('/service.jpg')` }}
    >
      {/* Background Overlay Layer */}
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[6px] z-0"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header Branding Container */}
        <header className="max-w-7xl mx-auto px-4 pt-20 pb-10 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
            Enterprise Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-4 mb-3">
            Our Services
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-medium">
            Verify luxury configurations and commercial vectors engineered for robust portfolio operations globally.
          </p>
        </header>

        {/* Dynamic Cards Grid */}
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 w-full mb-16">
          {filteredOffers.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-sm border border-dashed border-slate-800 rounded-2xl bg-slate-900/20 max-w-md mx-auto">
              🔍 No property structures match "{searchQuery}"
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredOffers.map((offer) => {
                // Safeguard against missing array instances
                const isAdded = cartItems ? cartItems.some((item) => item.id === offer.id) : false;

                return (
                  <div 
                    key={offer.id}
                    className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/60 shadow-2xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between h-[280px] group animate-in fade-in zoom-in-95 duration-200"
                  >
                    {/* Top Stats Band */}
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-2xl font-black text-blue-400 tracking-tight block">{offer.price}</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1 mt-1.5 font-medium">📍 {offer.location}</span>
                      </div>
                      <span className="bg-blue-600/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                        {offer.tag}
                      </span>
                    </div>
                    
                    {/* Property Title Area */}
                    <div className="my-auto">
                      <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors duration-200">
                        {offer.title}
                      </h3>
                    </div>

                    {/* Bottom Action Section */}
                    <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between gap-4">
                      <div className="flex gap-4 text-xs text-slate-400 font-semibold tracking-wide">
                        <span className="flex items-center gap-1">🛌 {offer.beds} Bds</span>
                        <span className="flex items-center gap-1">🛁 {offer.baths} Ba</span>
                      </div>
                      
                      <button
                        onClick={() => onAddToCart && onAddToCart(offer)}
                        disabled={isAdded}
                        className={`text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
                          isAdded 
                            ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20'
                        }`}
                      >
                        {isAdded ? '✓ Added' : 'Review Structure →'}
                      </button>
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