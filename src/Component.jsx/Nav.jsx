import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = ({ user, onLogout, searchQuery, setSearchQuery, cartCount }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const getUserInitials = () => {
    if (!user) return '';
    const first = user.firstName || user.Name || '';
    const last = user.lastName || '';
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
    }
    return first.charAt(0).toUpperCase() || 'U';
  };

  const handleSignOut = () => {
    setShowDropdown(false);
    onLogout();
    navigate('/signin');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LEFT: BRAND LOGO */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-black tracking-tight text-gray-900">
              ACME<span className="text-blue-600">.</span>
            </Link>
          </div>

          {/* MIDDLE AREA: CLEAN APP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-8">
            {!user ? (
              /* --- GUEST USER LINKS --- */
              <>
                <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/services" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Services</Link>
                <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">About</Link>
              </>
            ) : (
              /* --- LOGGED IN USER INTERFACE --- */
              <div className="flex items-center space-x-7 text-gray-600">
                
                {/* HOME BUTTON */}
                <button 
                  onClick={() => navigate('/')}
                  className="flex flex-col items-center gap-1 text-xs font-semibold hover:text-blue-600 transition-colors cursor-pointer group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </button>

                {/* SERVICES BUTTON */}
                <button 
                  onClick={() => navigate('/services')}
                  className="flex flex-col items-center gap-1 text-xs font-semibold hover:text-blue-600 transition-colors cursor-pointer group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Services
                </button>

                {/* ABOUT BUTTON */}
                <button 
                  onClick={() => navigate('/about')}
                  className="flex flex-col items-center gap-1 text-xs font-semibold hover:text-blue-600 transition-colors cursor-pointer group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About
                </button>

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
                      className="px-3 py-1 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  )}
                  <button 
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="flex flex-col items-center gap-1 text-xs font-semibold hover:text-blue-600 transition-colors cursor-pointer group"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </button>
                </div>

                {/* FAVORITES */}
                <button className="flex flex-col items-center gap-1 text-xs font-semibold hover:text-blue-600 transition-colors cursor-pointer group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Favorites
                </button>

                {/* CART */}
                <button className="flex flex-col items-center gap-1 text-xs font-semibold hover:text-blue-600 transition-colors cursor-pointer group relative">
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                      {cartCount}
                    </span>
                  )}
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Cart
                </button>

              </div>
            )}
          </div>

          {/* RIGHT SIDE: PROFILE DRILLDOWN DROPDOWN */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 relative">
                <span className="hidden sm:inline text-sm font-medium text-gray-600">
                  Welcome, <strong className="text-gray-900">{user.firstName || user.Name || 'User'}</strong> 👋
                </span>
                
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center border-2 border-blue-100 shadow-sm hover:bg-blue-700 transition-all cursor-pointer focus:outline-none"
                >
                  {getUserInitials()}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-14 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Active Profile</p>
                      <p className="text-sm font-bold text-gray-800 truncate mt-0.5">
                        {user.firstName || 'User'} {user.lastName || ''}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {user.email || user.identifier || 'Logged In'}
                      </p>
                    </div>
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left block px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 font-bold transition-colors mt-1 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 text-sm font-semibold">
                <Link to="/signin" className="text-gray-700 hover:text-blue-600 px-3 py-2">Sign In</Link>
                <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-xl">Sign Up</Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Nav;