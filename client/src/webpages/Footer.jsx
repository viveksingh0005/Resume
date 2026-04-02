import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright Message */}
          <div className="text-gray-400 text-sm md:text-base text-center md:text-left">
            © {new Date().getFullYear()} YourStudio. All rights reserved.
          </div>

          {/* Made by / Company Credit */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Made with</span>
            <span className="text-red-500">❤️</span>
            <span>by</span>
            <a 
              href="https://yourcompany.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              Your Creative Company
            </a>
          </div>

          {/* Optional subtle link (kept minimal as requested) */}
          <div className="text-xs text-gray-600 tracking-widest">
            CRAFTED IN INDIA
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;