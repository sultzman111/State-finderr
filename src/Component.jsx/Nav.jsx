import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = ({ user, onLogout, searchQuery, setSearchQuery, cartCount, favoriteCount }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdown or mobile menu if user clicks anywhere else on the screen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getUserInitials = () => {
    if (!user) return '';
    const first = user.firstName || user.Name || '';
    const last = user.lastName || '';
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
    }
    return first.charAt(0).toUpperCase() || 'U';
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    setShowDropdown(false);
    setIsMobileMenuOpen(false);
    onLogout();
    navigate('/signin');
  };

  const handleMobileNav = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="bg-white border-b border-neutral-200/80 sticky top-0 z-50 font-sans" ref={mobileMenuRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-20 items-center">
          
          {/* LEFT: BRAND LOGO */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black tracking-tight text-neutral-900">
              Rent<span className="text-emerald-600">.</span>
            </Link>
          </div>

          {/* MIDDLE AREA: DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-8">
            {!user ? (
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-sm font-bold text-neutral-600 hover:text-emerald-700 transition-colors">Home</Link>
                <Link to="/services" className="text-sm font-bold text-neutral-600 hover:text-emerald-700 transition-colors">Services</Link>
                <Link to="/about" className="text-sm font-bold text-neutral-600 hover:text-emerald-700 transition-colors">About</Link>
              </div>
            ) : (
              <div className="flex items-center space-x-7 text-neutral-600">
                {/* HOME BUTTON */}
                <button 
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex flex-col items-center gap-1 text-[11px] font-bold hover:text-emerald-700 transition-colors cursor-pointer group"
                >
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </button>

                {/* SERVICES BUTTON */}
                <button 
                  type="button"
                  onClick={() => navigate('/services')}
                  className="flex flex-col items-center gap-1 text-[11px] font-bold hover:text-emerald-700 transition-colors cursor-pointer group"
                >
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Services
                </button>

                {/* ABOUT BUTTON */}
                <button 
                  type="button"
                  onClick={() => navigate('/about')}
                  className="flex flex-col items-center gap-1 text-[11px] font-bold hover:text-emerald-700 transition-colors cursor-pointer group"
                >
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About
                </button>

                {/* SHOW ADD PROPERTY & MY LISTENING IF USER IS A SELLER */}
                {user.role === 'seller' && (
                  <>
                    {/* ADD PROPERTY BUTTON */}
                    <button 
                      type="button"
                      onClick={() => navigate('/AddProperty')}
                      className="flex flex-col items-center gap-1 text-[11px] font-bold hover:text-emerald-700 transition-colors cursor-pointer group"
                    >
                      <svg className="w-5 h-5 text-neutral-400 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      Add Property
                    </button>

                    {/* MY LISTENING BUTTON */}
                    <button 
                      type="button"
                      onClick={() => navigate('/mylistening')}
                      className="flex flex-col items-center gap-1 text-[11px] font-bold hover:text-emerald-700 transition-colors cursor-pointer group"
                    >
                      <svg className="w-5 h-5 text-neutral-400 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      My Listening
                    </button>
                  </>
                )}

                {/* SEARCH FEATURE */}
                <div className="flex items-center gap-2 relative">
                  {isSearchOpen && (
                    <input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if(window.location.pathname !== '/services') navigate('/services');
                      }}
                      placeholder="Filter properties..."
                      className="px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600 w-40 transition-all"
                    />
                  )}
                  <button 
                    type="button"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="flex flex-col items-center gap-1 text-[11px] font-bold hover:text-emerald-700 transition-colors cursor-pointer group"
                  >
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </button>
                </div>

                {/* ONLY SHOW FAVORITES AND CART IF NOT A SELLER */}
                {user.role !== 'seller' && (
                  <>
                    {/* FAVORITES BUTTON */}
                    <button 
                      type="button"
                      onClick={() => navigate('/favorites')}
                      className="flex flex-col items-center gap-1 text-[11px] font-bold hover:text-emerald-700 transition-colors cursor-pointer group relative"
                    >
                      {favoriteCount > 0 && (
                        <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                          {favoriteCount}
                        </span>
                      )}
                      <svg className="w-5 h-5 text-neutral-400 group-hover:text-rose-500 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Favorites
                    </button>

                    {/* CART BUTTON */}
                    <button 
                      type="button"
                      onClick={() => navigate('/cart')}
                      className="flex flex-col items-center gap-1 text-[11px] font-bold hover:text-emerald-700 transition-colors cursor-pointer group relative"
                    >
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                          {cartCount}
                        </span>
                      )}
                      <svg className="w-5 h-5 text-neutral-400 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Cart
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDE: PROFILE & DESKTOP DROPDOWN / MOBILE TOGGLE */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                
                {/* TRANSACTION HISTORY BUTTON (Desktop Only) */}
                <button 
                  type="button"
                  onClick={() => navigate('/payment')}
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-emerald-50 hover:border-emerald-200 text-xs font-bold text-neutral-600 hover:text-emerald-700 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span>History</span>
                </button>

                <span className="hidden lg:inline text-xs font-semibold text-neutral-500">
                  Welcome, <strong className="text-neutral-900 font-extrabold">{user.firstName || user.Name || 'User'}</strong> 👋
                </span>
                
                {/* Profile Trigger Button */}
                <button 
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setShowDropdown(!showDropdown);
                  }}
                  className="hidden md:flex w-10 h-10 rounded-full bg-neutral-900 text-white font-black text-xs items-center justify-center border border-neutral-200 shadow-sm hover:bg-emerald-700 transition-all cursor-pointer focus:outline-none"
                >
                  {getUserInitials()}
                </button>

                {/* Dropdown Menu Box (Desktop) */}
                {showDropdown && (
                  <div className="absolute right-0 top-14 w-56 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-neutral-100 py-3 z-50">
                    <div className="px-4 py-2 border-b border-neutral-100">
                      <p className="text-[9px] text-neutral-400 font-extrabold uppercase tracking-wider">Active Profile</p>
                      <p className="text-xs font-bold text-neutral-800 truncate mt-0.5">
                        {user.firstName || 'User'} {user.lastName || ''}
                      </p>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {user.email || user.identifier || 'Logged In'}
                      </p>
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full text-left block px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50/60 font-bold transition-colors cursor-pointer mt-1"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3 text-xs font-bold">
                <Link to="/signin" className="text-neutral-600 hover:text-emerald-700 px-3 py-2">Sign In</Link>
                <Link to="/signup" className="bg-neutral-900 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-sm transition-all">Sign Up</Link>
              </div>
            )}

            {/* MOBILE HAMBURGER BUTTON STRUCTURE */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 active:scale-95 transition-all"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE COLLAPSIBLE COLUMN DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-6 py-4 space-y-4 shadow-xl animate-fadeIn">
          
          {user && (
            <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-200/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-neutral-900 text-white font-black text-xs flex items-center justify-center">
                {getUserInitials()}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-neutral-800">
                  {user.firstName || 'User'} ({user.email ? 'Client' : 'Account'})
                </p>
                <p className="text-[10px] text-neutral-400 truncate">{user.email || 'Welcome back'}</p>
              </div>
            </div>
          )}

          <div className="relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if(window.location.pathname !== '/services') navigate('/services');
              }}
              placeholder="Search properties layout..."
              className="w-full px-3 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <button 
              type="button"
              onClick={() => handleMobileNav('/')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-50 hover:text-emerald-700 transition-all"
            >
              🏠 Home Dashboard
            </button>
            <button 
              type="button"
              onClick={() => handleMobileNav('/services')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-50 hover:text-emerald-700 transition-all"
            >
              🏢 Explore Services Catalogue
            </button>
            <button 
              type="button"
              onClick={() => handleMobileNav('/about')}
              className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-50 hover:text-emerald-700 transition-all"
            >
              ℹ️ About Company System
            </button>

            {user && (
              <>
                {/* SELLER SPECIFIC MOBILE BUTTONS */}
                {user.role === 'seller' && (
                  <>
                    <button 
                      type="button"
                      onClick={() => handleMobileNav('/AddProperty')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-50 hover:text-emerald-700 transition-all"
                    >
                      ➕ Add Property Layout
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleMobileNav('/mylistening')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-50 hover:text-emerald-700 transition-all"
                    >
                      📋 View My Listening
                    </button>
                  </>
                )}

                {/* ONLY SHOW FAVORITES AND CART IF NOT A SELLER */}
                {user.role !== 'seller' && (
                  <>
                    <button 
                      type="button"
                      onClick={() => handleMobileNav('/favorites')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-50 hover:text-rose-600 transition-all flex items-center justify-between"
                    >
                      <span>❤️ Saved Favorites</span>
                      {favoriteCount > 0 && <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black">{favoriteCount}</span>}
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleMobileNav('/cart')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-50 hover:text-emerald-700 transition-all flex items-center justify-between"
                    >
                      <span>🛒 Checkout Cart</span>
                      {cartCount > 0 && <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-black">{cartCount}</span>}
                    </button>
                  </>
                )}

                <button 
                  type="button"
                  onClick={() => handleMobileNav('/payment')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-50 hover:text-emerald-700 transition-all"
                >
                  📑 Transaction Payment History
                </button>
              </>
            )}
          </div>

          <div className="pt-2 border-t border-neutral-100">
            {user ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold py-3 rounded-xl transition-colors"
              >
                Sign Out Account
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleMobileNav('/signin')}
                  className="w-full border border-neutral-200 text-neutral-600 text-xs font-bold py-3 rounded-xl text-center hover:bg-neutral-50"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => handleMobileNav('/signup')}
                  className="w-full bg-neutral-900 text-white text-xs font-bold py-3 rounded-xl text-center hover:bg-emerald-700"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

        </div>
      )}
    </nav>
  );
};

export default Nav;