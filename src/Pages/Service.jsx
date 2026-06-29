import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Service = ({ 
  user,
  searchQuery, 
  onAddToCart, 
  onRemoveFromCart, 
  cartItems = [], 
  onToggleFavorite, 
  favoriteItems = [] 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Local UI states for tab-filtering
  const [activeTab, setActiveTab] = useState('ALL'); // Options: 'ALL', 'BUY', 'RENT'
  const [rentalMonths, setRentalMonths] = useState({});

  const allOffers = [
    // --- 10 FOR RENT ---
    { id: 1, title: 'Premium 3-Bedroom Serviced Apartment', basePrice: 8500000, isRental: true, location: 'Ikoyi, Lagos', beds: 3, tag: 'FOR RENT', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'Waterfront 3-Bedroom Penthouse Suite', basePrice: 15000000, isRental: true, location: 'Victoria Island, Lagos', beds: 3, tag: 'FOR RENT', image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'Luxury Mini Flat Apartment', basePrice: 2500000, isRental: true, location: 'Yaba, Lagos', beds: 1, tag: 'HOT DEAL', image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=600&q=80' },
    { id: 4, title: 'Elegant 3-Bedroom Apartment', basePrice: 4500000, isRental: true, location: 'Ikeja GRA, Lagos', beds: 3, tag: 'FOR RENT', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
    { id: 5, title: 'Cosy 2-Bedroom Serviced Shortlet', basePrice: 1200000, isRental: true, location: 'Lekki Phase 1, Lagos', beds: 2, tag: 'FOR RENT', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },
    { id: 6, title: 'Executive 1-Bedroom Studio Apartment', basePrice: 1800000, isRental: true, location: 'Surulere, Lagos', beds: 1, tag: 'FOR RENT', image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=600&q=80' },
    { id: 7, title: 'Luxury 4-Bedroom Terrace Mansionette', basePrice: 9000000, isRental: true, location: 'Maitama, Abuja', beds: 4, tag: 'FOR RENT', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
    { id: 8, title: 'Modern 3-Bedroom Flat', basePrice: 3500000, isRental: true, location: 'Gwarinpa, Abuja', beds: 3, tag: 'FOR RENT', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80' },
    { id: 9, title: 'Serviced 2-Bedroom Apartment', basePrice: 5000000, isRental: true, location: 'Asokoro, Abuja', beds: 2, tag: 'FOR RENT', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
    { id: 10, title: 'Premium 4-Bedroom Semi-Detached Duplex', basePrice: 11000000, isRental: true, location: 'Wuse 2, Abuja', beds: 4, tag: 'FOR RENT', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },

    // --- 10 FOR SALE ---
    { id: 11, title: 'Luxury 4-Bedroom Fully Detached Duplex', basePrice: 180000000, isRental: false, location: 'Lekki Phase 1, Lagos', beds: 4, tag: 'FOR SALE', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
    { id: 12, title: 'Contemporary 5-Bedroom Mansion', basePrice: 450000000, isRental: false, location: 'Maitama, Abuja', beds: 5, tag: 'FOR SALE', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
    { id: 13, title: 'Modern 4-Bedroom Terrace Duplex', basePrice: 120000000, isRental: false, location: 'Chevron, Lekki, Lagos', beds: 4, tag: 'FOR SALE', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80' },
    { id: 14, title: 'Automated Smart Home Mansion', basePrice: 350000000, isRental: false, location: 'Guzape, Abuja', beds: 5, tag: 'FOR SALE', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
    { id: 15, title: 'Newly Built 4-Bedroom Semi-Detached Duplex', basePrice: 95000000, isRental: false, location: 'Gwarinpa, Abuja', beds: 4, tag: 'FOR SALE', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },
    { id: 16, title: 'Luxury 5-Bedroom Waterfront Estate', basePrice: 650000000, isRental: false, location: 'Banana Island, Lagos', beds: 5, tag: 'FOR SALE', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80' },
    { id: 17, title: 'Premium 3-Bedroom Penthouse Condominium', basePrice: 220000000, isRental: false, location: 'Ikoyi, Lagos', beds: 3, tag: 'FOR SALE', image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=600&q=80' },
    { id: 18, title: '4-Bedroom Family Duplex + BQ', basePrice: 85000000, isRental: false, location: 'Ajah, Lagos', beds: 4, tag: 'FOR SALE', image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=600&q=80' },
    { id: 19, title: 'Modernist 5-Bedroom Smart Duplex', basePrice: 280000000, isRental: false, location: 'Magodo Phase 2, Lagos', beds: 5, tag: 'FOR SALE', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
    { id: 20, title: 'Minimalist 4-Bedroom Detached House', basePrice: 160000000, isRental: false, location: 'Lifecamp, Abuja', beds: 4, tag: 'FOR SALE', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' }
  ];

  const handleMonthChange = (id, months) => {
    setRentalMonths(prev => ({
      ...prev,
      [id]: parseInt(months, 10) || 1
    }));
  };

  const formatCurrency = (value) => {
    return '₦' + value.toLocaleString('en-NG');
  };

  const filteredOffers = allOffers.filter((offer) => {
    const query = searchQuery ? searchQuery.toLowerCase() : '';
    const matchesSearch = offer.title.toLowerCase().includes(query) || offer.location.toLowerCase().includes(query);
    
    if (activeTab === 'BUY') return matchesSearch && !offer.isRental;
    if (activeTab === 'RENT') return matchesSearch && offer.isRental;
    return matchesSearch;
  });

  const handleProtectedAction = (actionType, offerData) => {
    if (!user) {
      navigate('/signin', { state: { from: location } });
      return;
    }

    if (actionType === 'favorite') {
      if (onToggleFavorite) onToggleFavorite(offerData);
    } else if (actionType === 'cart') {
      const isAdded = cartItems ? cartItems.some((item) => item.id === offerData.id) : false;
      if (isAdded) {
        if (onRemoveFromCart) onRemoveFromCart(offerData.id);
      } else {
        const selectedDuration = rentalMonths[offerData.id] || 1;
        const computedPrice = offerData.isRental ? offerData.basePrice * selectedDuration : offerData.basePrice;
        
        if (onAddToCart) {
          onAddToCart({
            ...offerData,
            calculatedPrice: computedPrice,
            durationSelected: offerData.isRental ? selectedDuration : null
          });
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
      <div className="flex-1 flex flex-col">
        
        {/* HEADER SECTION */}
        <header className="max-w-7xl mx-auto px-6 pt-24 pb-8 text-center w-full">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Verified Listings Portal
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 mt-5 mb-3 transition-all">
            Find Your Next Property
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm sm:text-base font-medium leading-relaxed">
            Browse our updated catalog of premium properties available for sale and fully customizable short-term or long-term rentals.
          </p>

          {/* NAVIGATION FILTER TABS */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {['ALL', 'BUY', 'RENT'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold tracking-wide px-5 py-2.5 rounded-xl transition-all border duration-300 ${
                  activeTab === tab 
                    ? 'bg-neutral-900 border-neutral-900 text-white shadow-md shadow-neutral-900/10 scale-105' 
                    : 'bg-white border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-300'
                }`}
              >
                {tab === 'ALL' ? 'Show All' : tab === 'BUY' ? 'For Sale' : 'For Rent'}
              </button>
            ))}
          </div>
        </header>

        {/* MAIN DISPLAY PORT */}
        <main className="max-w-7xl mx-auto px-6 py-4 w-full mb-24 flex-1">
          {filteredOffers.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200/60 max-w-md mx-auto p-8 shadow-sm">
              <h3 className="text-lg font-bold text-neutral-800">No properties found</h3>
              <p className="text-sm text-neutral-400 mt-1 max-w-xs mx-auto font-medium">
                We couldn't find any results matching your criteria. Try adjusting your search query or changing tabs.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredOffers.map((offer) => {
                const isAdded = cartItems ? cartItems.some((item) => item.id === offer.id) : false;
                const isFavorite = favoriteItems ? favoriteItems.some((item) => item.id === offer.id) : false;
                const selectedDuration = rentalMonths[offer.id] || 1;
                const computedPrice = offer.isRental ? offer.basePrice * selectedDuration : offer.basePrice;

                return (
                  <div 
                    key={offer.id}
                    className="group bg-white rounded-2xl border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:border-neutral-300/90 transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
                  >
                    {/* Image Frame */}
                    <div className="h-52 w-full overflow-hidden relative bg-neutral-100">
                      <img 
                        src={offer.image} 
                        alt={offer.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />
                      
                      {/* Floating Badges Layer */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                        <span className={`text-[10px] font-extrabold tracking-wider px-3 py-1 rounded-lg text-white shadow-sm pointer-events-auto transition-transform ${offer.isRental ? 'bg-amber-600' : 'bg-emerald-700'}`}>
                          {offer.tag}
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => handleProtectedAction('favorite', offer)}
                          className={`p-2.5 rounded-xl border backdrop-blur-md transition-all duration-200 pointer-events-auto shadow-sm active:scale-90 ${
                            isFavorite 
                              ? 'bg-rose-500 border-rose-500 text-white scale-105' 
                              : 'bg-white/95 border-neutral-200/80 text-neutral-500 hover:text-rose-500 hover:bg-white'
                          }`}
                          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Card Content Core */}
                    <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                      <div>
                        {/* Calculated Live Pricing Segment */}
                        <div className="mb-2">
                          <span className="text-2xl font-black text-neutral-900 block tracking-tight transition-colors group-hover:text-neutral-950">
                            {formatCurrency(computedPrice)}
                          </span>
                          {offer.isRental ? (
                            <span className="text-[11px] font-bold text-emerald-700 block mt-0.5 bg-emerald-50 border border-emerald-100/50 rounded-md px-2 py-0.5 w-max">
                              Rate breakdown: {formatCurrency(offer.basePrice)} × {selectedDuration} {selectedDuration === 1 ? 'Month' : 'Months'}
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-neutral-400 block mt-0.5">
                              One-time property purchase
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-neutral-800 tracking-tight group-hover:text-emerald-800 transition-colors duration-200 line-clamp-1">{offer.title}</h3>
                        <p className="text-xs text-neutral-500 mt-1 font-medium">{offer.location}</p>
                      </div>

                      {/* Interactive Lease Duration Selector Box (Rentals Only) */}
                      {offer.isRental && (
                        <div className="bg-neutral-50/80 p-3 rounded-xl border border-neutral-100 space-y-2 transition-all">
                          <label className="block text-[10px] font-extrabold text-neutral-500 uppercase tracking-wider">
                            Select Rental Duration:
                          </label>
                          <select
                            disabled={isAdded}
                            value={selectedDuration}
                            onChange={(e) => handleMonthChange(offer.id, e.target.value)}
                            className="w-full bg-white border border-neutral-200/80 rounded-lg p-2 text-xs font-semibold text-neutral-700 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 disabled:opacity-50 disabled:bg-neutral-100 transition-all cursor-pointer"
                          >
                            <option value="1">1 Month</option>
                            <option value="3">3 Months (Quarterly)</option>
                            <option value="6">6 Months (Half-Year)</option>
                            <option value="12">12 Months (Annual)</option>
                          </select>
                        </div>
                      )}

                      {/* Lower Utility Control Block */}
                      <div className="border-t border-neutral-100 pt-4 flex items-center justify-between gap-4">
                        <div className="flex gap-3 text-xs text-neutral-500 font-bold">
                          <span className="flex items-center gap-1">{offer.beds} Bedrooms</span>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => handleProtectedAction('cart', offer)}
                          className={`text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all duration-300 border shadow-sm active:scale-95 ${
                            isAdded 
                              ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-600 hover:border-rose-600 hover:text-white' 
                              : 'bg-neutral-900 border-neutral-900 text-white hover:bg-emerald-700 hover:border-emerald-700 shadow-neutral-900/5'
                          }`}
                        >
                          {isAdded ? 'Remove Space' : offer.isRental ? 'Rent Space' : 'Buy Estate'}
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