import React from 'react';
import { Link } from 'react-router-dom';

const Service = () => {
  // Your premium property data array
  const allOffers = [
    { id: 1, title: 'Skyline Modern Apartment', price: '$4,500/mo', location: 'New York, NY', beds: 2, baths: 2, tag: 'For Rent' },
    { id: 2, title: 'Pacific Vista Villa', price: '$1,250,000', location: 'Malibu, CA', beds: 4, baths: 3.5, tag: 'For Sale' },
    { id: 3, title: 'The Urban Loft', price: '$3,200/mo', location: 'Chicago, IL', beds: 1, baths: 1.5, tag: 'For Rent' },
    { id: 4, title: 'Serene Suburb Mansion', price: '$2,450,000', location: 'Austin, TX', beds: 5, baths: 5, tag: 'For Sale' },
    { id: 5, title: 'Minimalist Glass Complex', price: '$8,900/mo', location: 'Los Angeles, CA', beds: 3, baths: 3, tag: 'Hot Deal' },
    { id: 6, title: 'Elite Waterfront Penthouse', price: '$3,800,000', location: 'Miami, FL', beds: 4, baths: 4.5, tag: 'Premium' }
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed font-sans text-slate-100 flex flex-col justify-between relative"
      style={{ backgroundImage: `url('/service.jpg')` }} // References your public asset directly
    >
      
      {/* BACKGROUND TINTOVERLAY — makes your glass cards and text perfectly readable */}
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[6px] z-0"></div>

      {/* CORE LAYER CONTENT */}
      <div className="relative z-10 flex-1 flex flex-col">
        
        {/* HEADER SECTION */}
        <header className="max-w-7xl mx-auto px-4 pt-20 pb-10 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
            Enterprise Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-4 mb-4">
            Our Services
          </h1>
          <p className="max-w-xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed font-normal">
            Verify luxury configurations and commercial vectors engineered for robust portfolio operations globally.
          </p>
        </header>

        {/* GLASSMORPHIC PROPERTY GRID */}
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 w-full mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allOffers.map((offer) => (
              <div 
                key={offer.id}
                className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/60 shadow-2xl hover:bg-slate-900/60 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between h-[280px] group cursor-pointer"
              >
                {/* CARD MODULE TOP */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-2xl font-black text-blue-400 tracking-tight block">
                      {offer.price}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 mt-1.5 font-medium">
                      📍 {offer.location}
                    </span>
                  </div>
                  <span className="bg-blue-600/20 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {offer.tag}
                  </span>
                </div>

                {/* CARD MODULE MIDDLE */}
                <div className="my-auto">
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors duration-200">
                    {offer.title}
                  </h3>
                </div>

                {/* CARD MODULE FOOTER */}
                <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between gap-4">
                  <div className="flex gap-4 text-xs text-slate-400 font-semibold tracking-wide">
                    <span>🛌 {offer.beds} Bds</span>
                    <span>🛁 {offer.baths} Ba</span>
                  </div>
                  
                  <span className="text-xs font-bold text-blue-400 group-hover:text-blue-300 flex items-center gap-1 transition-colors duration-200">
                    Review Structure &rarr;
                  </span>
                </div>

              </div>
            ))}
          </div>
        </main>

      </div>

  
    </div>
  );
};

export default Service;