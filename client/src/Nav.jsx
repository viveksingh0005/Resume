import { useState } from "react";
import { Menu, X, Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./features/auth/hooks/useAuth";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const { user, isAuthenticated,handleLogout } = useAuth();

  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200">
      
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 cursor-pointer">
          🚀 Brand
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-gray-700 font-medium">
          
          {["Home", "Services", "About", "Contact"].map((item) => (
            <li key={item} className="relative group cursor-pointer">
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}

          {/* Auth Section */}
          <li className="relative group cursor-pointer">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm">
                  Welcome, {user?.username} 👋
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a href="/login">Sign In</a>
            )}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </li>
        </ul>

        {/* Right Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <NavLink to="/login">
            <button className="px-4 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition">
              Login
            </button>
          </NavLink>

          <NavLink to="/register">
            <button className="px-4 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition">
              Signup
            </button>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setOpen(!open)} className="p-2">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-5 py-5 space-y-5 shadow-lg">
          
          {/* Menu Items */}
          <div className="flex flex-col gap-4 text-gray-700 font-medium">
            {["Home", "Explore", "Services", "About", "Contact"].map((item) => (
              <div
                key={item}
                className="cursor-pointer hover:text-black transition"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Auth Section Mobile */}
          <div className="border-t pt-4">
            {isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium">
                  Welcome, {user?.username} 👋
                </span>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <NavLink to="/login">
                  <button className="w-full py-2 rounded-full bg-black text-white hover:bg-gray-800 transition">
                    Login
                  </button>
                </NavLink>

                <NavLink to="/register">
                  <button className="w-full mt-3 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition">
                    Register
                  </button>
                </NavLink>
              </>
            )}
          </div>

          {/* Icons */}
          <div className="flex justify-center gap-6 pt-4 border-t">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Search size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <User size={20} />
            </button>
          </div>

        </div>
      )}
    </nav>
  );
}