import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Localized Nigerian sample property recommendations matching your service array structures
  const recommendedOffers = [
    { id: 1, title: 'Premium 3-Bedroom Serviced Apartment', price: '₦8,500,000/yr', location: 'Ikoyi, Lagos', beds: 3, baths: 3.5 },
    { id: 2, title: 'Luxury 4-Bedroom Fully Detached Duplex', price: '₦180,000,000', location: 'Lekki Phase 1, Lagos', beds: 4, baths: 4.5 },
    { id: 3, title: 'Luxury 4-Bedroom Terrace Mansionette', price: '₦9,000,000/yr', location: 'Maitama, Abuja', beds: 4, baths: 4.5 },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800">
      
      {/* 1. HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-16">
        <div className="bg-neutral-900 rounded-3xl overflow-hidden shadow-xl lg:flex relative min-h-[550px]">
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]"></div>

          <div className="relative z-10 lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-white">
            <div className="flex items-center gap-2 mb-8 lg:mb-0">
              <div className="w-6 h-6 bg-emerald-600 rounded-md flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">Premium Estate Network</span>
            </div>

            <div className="my-auto max-w-md space-y-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-none text-white">
                The world's #1 estate finder.
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
                Discover curated residential properties, premium state listings, and commercial developments across major Nigerian locations. Simple, clean, verified infrastructure.
              </p>
              <div className="flex items-center gap-4 pt-4">
                {/* Fixed path navigation pointer to service marketplace portfolio directly */}
                <Link to="/Service" className="bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-emerald-700 transition-all active:scale-[0.98]">Get Started</Link>
                <a href="#offers" className="text-sm font-medium text-white border border-neutral-700 bg-neutral-800/40 hover:bg-neutral-800 px-6 py-3 rounded-xl transition-all">Explore Offers</a>
              </div>
            </div>
            <div className="text-xs text-neutral-500 mt-8 lg:mt-0">Over 20+ verified custom assets listed across states.</div>
          </div>

          <div className="lg:w-1/2 bg-cover bg-center min-h-[300px] lg:min-h-full relative shadow-inner" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')` }}>
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-900 via-transparent to-black/10"></div>
          </div>
        </div>
      </div>

      {/* 2. OFFERS SECTION */}
      <div id="offers" className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-neutral-900">Our top recommended offers</h2>
            <p className="text-sm text-neutral-500 mt-1">Handpicked properties verified by global estate experts.</p>
          </div>
          {/* LINK ROUTE MODIFIED: Clicking this takes the user cleanly to the Service component route */}
          <Link to="/Service" className="text-sm font-bold text-emerald-700 hover:text-emerald-600 transition-colors hidden sm:block">
            View all properties &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedOffers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:border-neutral-300 transition-all duration-300 flex flex-col group cursor-pointer">
              <div className="h-48 bg-neutral-100 w-full relative overflow-hidden">
                <div className="absolute top-4 left-4 bg-neutral-900/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg z-10">{offer.price}</div>
                <div className="w-full h-full bg-emerald-50 group-hover:scale-105 transition-transform duration-300 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80')` }}></div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors line-clamp-1">{offer.title}</h3>
                  <p className="text-xs text-neutral-400 flex items-center gap-1 mt-1.5 font-medium">
                    📍 {offer.location}
                  </p>
                </div>
                
                <div className="flex gap-4 border-t border-neutral-100 pt-4 mt-4 text-xs font-semibold text-neutral-500">
                  <span className="flex items-center gap-1">🛌 {offer.beds} Beds</span>
                  <span className="flex items-center gap-1">🛁 {offer.baths} Baths</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. ABOUT US SECTION */}
      <div className="bg-white border-y border-neutral-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:flex lg:items-center lg:gap-12">
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 mb-8 lg:mb-0">
            <div className="h-64 bg-neutral-100 rounded-2xl bg-cover bg-center shadow-sm" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500&q=80')` }}></div>
            <div className="h-64 bg-neutral-100 rounded-2xl bg-cover bg-center shadow-sm mt-6" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=500&q=80')` }}></div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-md">Our Story</span>
            <h2 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
              Redefining premium real estate navigation.
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed font-medium">
              Founded with the vision to bridge transparency and structural security, our network has grown into a world-renowned infrastructure portal. We connect independent brokers and verified clients to simplify property management, outright acquisitions, and shortlet rentals within Nigeria.
            </p>
            <div className="pt-2">
              {/* LINK ROUTE MODIFIED: Clicking this takes the user cleanly to the About page location */}
              <Link 
                to="/About" 
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-600 group transition-colors"
              >
                View More About Us 
                <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;