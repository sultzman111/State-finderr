import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Connects directly to your Firebase configuration file

// 1. ADD onLogin HERE AS A COMPONENT PROP
const Signin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  
  // States for Security, Loading, & UX
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setLoading(true);

    try {
      console.log("Attempting login for:", { identifier, password });

      // Add a small delay to simulate network response time
      await new Promise((resolve) => setTimeout(resolve, 600)); 

      // ----------------------------------------------------------------
      // LIVE FIREBASE AUTHENTICATION (Replaces your localDb check)
      // ----------------------------------------------------------------
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        identifier.trim().toLowerCase(), 
        password
      );
      const firebaseUser = userCredential.user;
      // ----------------------------------------------------------------

      // 2. ADD THIS LOGIC RIGHT HERE: Pass the matched account object into your state framework
      if (onLogin) {
        onLogin({
          firstName: firebaseUser.displayName || "Kareem", // Pulls dynamically from signup records
          lastName: "Alameen",
          email: firebaseUser.email
        });
      }

      // SUCCESS: Route them directly to the portfolio grid view!
      navigate('/services');

    } catch (err) {
      console.error("Firebase Signin error context code:", err.code);
      if (
        err.code === 'auth/user-not-found' || 
        err.code === 'auth/wrong-password' || 
        err.code === 'auth/invalid-credential'
      ) {
        setError("Invalid credentials. Account not found or wrong password.");
      } else {
        setError(err.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-white">
      
      {/* LEFT SIDE: Brand / Blue Accent Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden flex-col justify-between p-12 text-white">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Top: Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md">
            <div className="w-4 h-4 bg-blue-600 rounded-sm transform rotate-45"></div>
          </div>
          <span className="font-bold text-xl tracking-tight">S-CUBE Inc</span>
        </div>

        {/* Middle: Brand Copy */}
        <div className="relative z-10 max-w-md my-auto">
          <h1 className="text-4xl font-extrabold tracking-tight leading-none mb-4">
            Simplify your workflow today.
          </h1>
          <p className="text-blue-100 text-lg">
            Join thousands of developers managing their projects seamlessly with our modern infrastructure.
          </p>
          
          <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-white/30"></div>
              <div className="w-3 h-3 rounded-full bg-white/30"></div>
              <div className="w-3 h-3 rounded-full bg-white/30"></div>
            </div>
            <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-1/2"></div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="relative z-10 text-sm text-blue-200">
          &copy; 2026 S-CUBE Inc. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE: Clean Sign-In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md">
          
          {/* Mobile-only Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">S-CUBE Inc</span>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Welcome back</h2>
            <p className="text-sm text-gray-500">Please enter your details to sign in to your account.</p>
          </div>

          {/* Error Banner Notification */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-sm text-red-600">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email or Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                Phone Number or Email
              </label>
              <input 
                type="text" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all text-sm" 
                placeholder="name@example.com" 
                disabled={loading}
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all text-sm" 
                  placeholder="••••••••" 
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm font-semibold text-gray-400 hover:text-blue-600 transition-colors cursor-pointer select-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold py-3 px-4 rounded-xl shadow-sm transition-all duration-150 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? ( 
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Verifying...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Signin;