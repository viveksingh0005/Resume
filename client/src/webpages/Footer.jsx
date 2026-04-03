import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Copyright Message */}
          <div className="text-gray-400 text-sm md:text-base text-center md:text-left">
            © {new Date().getFullYear()} R3 All rights reserved.
          </div>

          {/* Made by / Company Credit */}
         

        
        </div>
      </div>
    </footer>
  );
};

export default Footer;