import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Helper function to safely extract and format the user's initials
  const getUserInitials = () => {
    if (!user) return '';
    
    // Fallback if your database/state uses a single 'name' string instead of firstName/lastName
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    } else if (user.name) {
      const parts = user.name.trim().split(' ');
      if (parts.length > 1) {
        return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
      }
      return user.name.charAt(0).toUpperCase();
    }
    return 'U'; // Default fallback token
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
          
          {/* Logo Brand Link */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-black tracking-tight text-gray-900">
              ACME<span className="text-blue-600">.</span>
            </Link>
          </div>

          {/* Core Navigation Vectors */}
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/Services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
           
          </div>

          {/* Conditional Identity Authentication Interface Area */}
          <div className="flex items-center gap-4">
            {user ? (
              /* IF LOGGED IN: Render initials profile token instead of access forms */
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center border-2 border-blue-100 shadow-sm hover:bg-blue-700 transition-all cursor-pointer focus:outline-none"
                >
                  {getUserInitials()}
                </button>

                {/* Micro-profile Dropdown Container */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-50">
                      <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-gray-800 truncate">
                        {user.firstName ? `${user.firstName} ${user.lastName}` : user.email}
                      </p>
                    </div>
                    <Link 
                      to="/dashboard" 
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium border-t border-gray-50 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* IF GUEST: Show static entry routes */
              <div className="flex items-center gap-3 text-sm font-semibold">
                <Link to="/signin" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2">
                  Sign In
                </Link>
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-sm transition-all">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Nav;