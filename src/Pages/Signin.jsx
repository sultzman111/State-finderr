import React from 'react';
import { Link } from 'react-router-dom';

const Signin = () => {
  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-lg border border-blue-600 rounded-lg p-6 font-sans">
      <div className="flex flex-col items-center">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>

        {/* Form Container */}
        <div className="w-full flex flex-col gap-4">
          {/* Phone Number or Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number or Email</label>
            <input 
              type="text" 
              className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 transition-colors" 
              placeholder="Type your Phone number or email here" 
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 transition-colors" 
              placeholder="Type your Password here" 
            />
          </div>
          
          {/* Forgot Password Link */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 mt-6 w-full">
          <button 
            type="submit" 
            className="w-full text-[15px] font-medium text-blue-600 border border-blue-600 rounded px-4 py-2 hover:bg-blue-600 hover:text-white transition-all duration-200 cursor-pointer"
          >
            Sign In
          </button>
          
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;