import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  // State to track if they are registering as a Buyer or Seller
  const [signUpAs, setSignUpAs] = useState('buyer');

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-lg border border-blue-600 rounded-lg p-6 font-sans">
      <div className="flex flex-col items-center">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h2>

        {/* Form Container */}
        <div className="w-full flex flex-col gap-4">
          {/* Firstname */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Firstname</label>
            <input 
              type="text" 
              className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 transition-colors" 
              placeholder="Type your Firstname here" 
            />
          </div>

          {/* Surname */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Surname</label>
            <input 
              type="text" 
              className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 transition-colors" 
              placeholder="Type your Surname here" 
            />
          </div>

          {/* Phone Number or Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number or Email</label>
            <input 
              type="text" 
              className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 transition-colors" 
              placeholder="Type your Phone number or email here" 
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input 
              type="text" 
              className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 transition-colors" 
              placeholder="DD/MM/YYYY" 
            />
          </div>

          {/* Sign Up For (Buyer / Seller Dropdown) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sign Up For</label>
            <select 
              value={signUpAs}
              onChange={(e) => setSignUpAs(e.target.value)}
              className="w-full border-b-2 border-gray-300 py-2 bg-white text-gray-800 focus:outline-none focus:border-blue-600 transition-colors cursor-pointer"
            >
              <option value="buyer">Buyer (Looking for property)</option>
              <option value="seller">Seller (Listing a property)</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 mt-6 w-full">
          <button 
            type="submit" 
            className="w-full text-[15px] font-medium text-blue-600 border border-blue-600 rounded px-4 py-2 hover:bg-blue-600 hover:text-white transition-all duration-200 cursor-pointer"
          >
            Sign Up
          </button>
          
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;