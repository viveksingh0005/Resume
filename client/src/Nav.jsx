import React, { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./features/auth/hooks/useAuth";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, handleLogout } = useAuth();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setOpen(false);
  };

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "Services", id: "services" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-950/90 to-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Brand
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8 text-sm font-medium text-gray-300">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="hover:text-white transition-all duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-400 w-0 group-hover:w-full transition-all duration-300" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-white/5 border border-white/20 px-4 py-2 rounded-2xl">
                <div>
                  <p className="text-sm font-medium text-white">{user?.username}</p>
                  <p className="text-xs text-gray-500">Welcome</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-4 text-sm text-white font-medium border bg-white/5 border-white/20 hover:border-red-500/50 hover:text-red-400 rounded-2xl transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink
                to="/login"
                className="px-6 py-3 text-sm font-medium text-gray-300 hover:text-white transition-all"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="px-6 py-3 text-sm font-semibold bg-white text-black rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                Get Started
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-3 text-white hover:bg-white/10 rounded-2xl transition-all"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-2xl md:hidden">
          
          {/* ✅ Close button inside overlay */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-6 p-3 text-white hover:bg-white/10 rounded-2xl transition-all"
          >
            <X size={28} />
          </button>

          <div className="flex flex-col h-full px-6 pt-20">

            {/* Mobile Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tighter text-white">Brand</h1>
            </div>

            {/* ✅ Mobile Links — fixed to use scrollToSection */}
            <div className="flex flex-col gap-6 text-2xl font-medium">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-gray-300 hover:text-white py-3 border-b border-white/10 transition-all active:scale-95"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Mobile Auth Section — unchanged */}
            <div className="mt-auto pb-12">
              {isAuthenticated ? (
                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <p className="text-gray-400 text-sm">Signed in as</p>
                    <p className="text-xl font-semibold text-white mt-1">{user?.username}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full py-4 bg-red-600/80 hover:bg-red-600 text-white rounded-2xl font-medium transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="w-full py-4 text-center border border-white/30 hover:bg-white/10 rounded-2xl font-medium transition-all"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="w-full py-4 text-center bg-white text-black rounded-2xl font-semibold hover:bg-purple-400 transition-all"
                  >
                    Create Account
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}