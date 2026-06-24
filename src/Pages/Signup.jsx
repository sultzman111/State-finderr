import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase'; // Import your firebase initialization configuration

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    identifier: '', // This serves as the Email field for Firebase Authentication
    dob: '',
    password: '', 
  });

  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Create the authenticated user container in your Firebase Dashboard
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.identifier.trim(), 
        formData.password
      );

      // 2. Attach the user's first name to their Firebase Profile metadata display details
      await updateProfile(userCredential.user, {
        displayName: formData.firstName.trim()
      });

      // 3. Optional: Store additional structural records like DoB locally if needed
      const metadataProfile = {
        firstName: formData.firstName,
        surname: formData.surname,
        dob: formData.dob
      };
      localStorage.setItem('user_metadata', JSON.stringify(metadataProfile));

      setLoading(false);
      alert("Account created successfully with Firebase Auth!");
      navigate('/'); // Routes smoothly directly home where your App.jsx layout listener triggers
    } catch (err) {
      setLoading(false);
      console.error("Firebase registration failure code: ", err.code);
      
      // Clean up messy developer logs into clean client statements
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('An account with this email already exists!');
          break;
        case 'auth/invalid-email':
          setError('Please provide a valid email format.');
          break;
        case 'auth/weak-password':
          setError('Password must be at least 6 characters long.');
          break;
        default:
          setError(err.message);
      }
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
          <span className="font-bold text-xl tracking-tight">Acme Inc</span>
        </div>

        {/* Middle: Brand Copy */}
        <div className="relative z-10 max-w-md my-auto">
          <h1 className="text-4xl font-extrabold tracking-tight leading-none mb-4">
            Find your next perfect space.
          </h1>
          <p className="text-blue-100 text-lg">
            Whether you are looking to list a property or find your dream home, we've got you covered with premium listings.
          </p>
          
          <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <div className="h-4 bg-white/30 rounded w-1/3"></div>
              <div className="px-2 py-0.5 bg-white/20 text-xs rounded-full">New Option</div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-white/20 rounded w-full"></div>
              <div className="h-3 bg-white/10 rounded w-5/6"></div>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="relative z-10 text-sm text-blue-200">
          &copy; 2026 Acme Inc. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE: Clean Sign-Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md">
          
          {/* Mobile-only Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Acme Inc</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Create an account</h2>
            <p className="text-sm text-gray-500">Get started today by filling in your basic info.</p>
          </div>

          {/* Error Banner System Hook */}
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-medium break-words">
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Firstname & Surname Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Firstname
                </label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all text-sm" 
                  placeholder="John" 
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Surname
                </label>
                <input 
                  type="text" 
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all text-sm" 
                  placeholder="Doe" 
                  required
                />
              </div>
            </div>

            {/* Email Identification Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input 
                type="email" 
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all text-sm" 
                placeholder="name@example.com" 
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                Date of Birth
              </label>
              <input 
                type="date" 
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all text-sm cursor-pointer text-gray-500 focus:text-gray-900" 
                required
              />
            </div>

            {/* Password Input Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={6}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all text-sm" 
                  placeholder="••••••••" 
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
              className={`w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 px-4 rounded-xl shadow-sm transition-all duration-150 active:scale-[0.99] cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? "Verifying..." : "Sign Up"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Signup;