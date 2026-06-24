import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 text-slate-400 text-sm mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* TOP INTERFACE: BRAND & VECTOR LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Identity */}
          <div className="space-y-3">
            <Link to="/" className="text-xl font-black tracking-tight text-white block">
              S-CUBE<span className="text-blue-600">.</span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Providing premium structural configurations and verified real estate assets built for modern reliability.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-3">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-3">Legals</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-blue-400 transition-colors">Terms of Execution</a></li>
              <li><a href="#security" className="hover:text-blue-400 transition-colors">Security Guardrails</a></li>
            </ul>
          </div>

          {/* Column 4: Communication Vector */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-3">Contact</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light mb-2">
              Have architectural questions? Reach out directly.
            </p>
            <span className="text-xs font-semibold text-blue-400 block">
              support@s-cube-structural.com
            </span>
          </div>

        </div>

        {/* BOTTOM METRIC: COPYRIGHT DISCLAIMER */}
        <div className="border-t border-slate-900/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} S-CUBE Inc. All structural rights reserved.</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-blue-400 transition-colors">Twitter</span>
            <span className="cursor-pointer hover:text-blue-400 transition-colors">LinkedIn</span>
            <span className="cursor-pointer hover:text-blue-400 transition-colors">GitHub</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;