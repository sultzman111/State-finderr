import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // A collection of dummy premium property offers
  const recommendedOffers = [
    { id: 1, title: 'Skyline Modern Apartment', price: '$4,500/mo', location: 'New York, NY', beds: 2, baths: 2 },
    { id: 2, title: 'Pacific Vista Villa', price: '$1,250,000', location: 'Malibu, CA', beds: 4, baths: 3.5 },
    { id: 3, title: 'The Urban Loft', price: '$3,200/mo', location: 'Chicago, IL', beds: 1, baths: 1.5 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* 1. HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="bg-blue-700 rounded-3xl overflow-hidden shadow-xl lg:flex relative min-h-[550px]">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]"></div>

          <div className="relative z-10 lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-white">
            <div className="flex items-center gap-2 mb-8 lg:mb-0">
              <div className="w-6 h-6 bg-white/20 rounded-md backdrop-blur-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-blue-200">Premium Estate Network</span>
            </div>

            <div className="my-auto max-w-md space-y-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-none text-white">
                The world's #1 state finder.
              </h1>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-light">
                Discover curated residential properties, premium state listings, and commercial developments across major global locations. Simple, clean, verified infrastructure.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Link to="/signin" className="bg-white text-blue-700 text-sm font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-50 transition-all active:scale-[0.98]">Get Started</Link>
                <a href="#offers" className="text-sm font-medium text-white border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-xl transition-all">Explore Offers</a>
              </div>
            </div>
            <div className="text-xs text-blue-200/60 mt-8 lg:mt-0">Over 240,000+ premium properties listed worldwide.</div>
          </div>

          <div className="lg:w-1/2 bg-cover bg-center min-h-[300px] lg:min-h-full relative shadow-inner" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')` }}>
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-blue-700/40 via-transparent to-black/10"></div>
          </div>
        </div>
      </div>

      {/* 2. OFFERS SECTION */}
      <div id="offers" className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our top recommended offers</h2>
            <p className="text-sm text-gray-500 mt-1">Handpicked properties verified by global estate experts.</p>
          </div>
          <Link to="/Service" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors hidden sm:block">
            View all properties &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedOffers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group cursor-pointer">
              <div className="h-48 bg-gray-200 w-full relative overflow-hidden">
                <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">{offer.price}</div>
                <div className="w-full h-full bg-blue-100 group-hover:scale-105 transition-transform duration-300 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80')` }}></div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{offer.title}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    {offer.location}
                  </p>
                </div>
                
                <div className="flex gap-4 border-t border-gray-50 pt-4 mt-4 text-xs font-medium text-gray-600">
                  <span className="flex items-center gap-1">🛌 {offer.beds} Beds</span>
                  <span className="flex items-center gap-1">🛁 {offer.baths} Baths</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. ABOUT US SECTION */}
      <div className="bg-white border-y border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:flex lg:items-center lg:gap-12">
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 mb-8 lg:mb-0">
            <div className="h-64 bg-gray-100 rounded-2xl bg-cover bg-center shadow-sm" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500&q=80')` }}></div>
            <div className="h-64 bg-gray-100 rounded-2xl bg-cover bg-center shadow-sm mt-6" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=500&q=80')` }}></div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Our Story</span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Redefining premium real estate navigation.
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Founded with the vision to bridge transparency and structural security, Acme Inc has grown into a world-renowned infrastructure network. We connect institutional partners, premium independent brokers, and verified clients to simplify property management, acquisitions, and listings globally.
            </p>
            <div className="pt-2">
              <Link 
                to="/About" 
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 group transition-colors"
              >
                View More About Us 
                <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* 4. IMPORTED FOOTER COMPONENT */}
      

    </div>
  );
};

export default Home;