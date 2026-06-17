import React from 'react'
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <div>
<header className="flex justify-between items-center px-10 py-4 bg-white border-b border-gray-200 font-sans">
      {/* Left side: Navigation links (Marked Red) */}
      <nav className="hidden md:block">
        <ul className="flex items-center gap-6 m-0 p-0 list-none">
          <li>
            <Link to="/home" className="text-[15px] font-medium text-gray-800 no-underline hover:text-blue-600 transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-[15px] font-medium text-gray-800 no-underline hover:text-blue-600 transition-colors duration-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-[15px] font-medium text-gray-800 no-underline hover:text-blue-600 transition-colors duration-200">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Middle: Brand Logo Title */}
      <div className="text-2xl font-extrabold tracking-tight">
        <Link to="/" className="text-blue-600 no-underline">
          State Finder
        </Link>
      </div>

      {/* Right side: Authentication links (Marked Yellow) */}
      <div className="flex items-center">
        <ul className="flex items-center gap-6 m-0 p-0 list-none">
          <li>
            <Link to="/Signin" className="text-[15px] font-medium text-gray-800 no-underline hover:text-blue-600 transition-colors duration-200">
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/signup" className="text-[15px] font-medium text-blue-600 no-underline border border-blue-600 rounded px-4 py-2 hover:bg-blue-600 hover:text-white transition-all duration-200">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </header>
        
    </div>
  )
}

export default Nav 

