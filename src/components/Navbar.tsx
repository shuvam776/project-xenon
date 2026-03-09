"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  User,
  X,
  MapPin,
  Home,
  UserCircle,
  Info,
  Mail,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import AuthModal from "./AuthModal";
import { checkAuth, logout } from "@/lib/fetchWithAuth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check for authentication via cookie (with auto-refresh)
    const loadUser = async () => {
      const { authenticated, user: userData } = await checkAuth();
      if (authenticated && userData) {
        setUser(userData);
      }
    };
    loadUser();
  }, [isAuthOpen]); // Re-check when auth modal closes

  const handleLogout = async () => {
    await logout();
    setUser(null);
    window.location.reload();
  };

  const topCities = [
    { name: "Mumbai", value: "Mumbai" },
    { name: "Delhi NCR", value: "Delhi" },
    { name: "Bengaluru", value: "Bangalore" },
    { name: "Hyderabad", value: "Hyderabad" },
    { name: "Chennai", value: "Chennai" },
    { name: "Kolkata", value: "Kolkata" },
    { name: "Pune", value: "Pune" },
    { name: "Ahmedabad", value: "Ahmedabad" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full z-50">
        <nav className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white shadow-sm transition-all duration-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-4 md:h-20">
              {/* Left: Mobile Menu & Logo */}
              <div className="flex items-center gap-4">
                <button
                  className="lg:hidden p-2 hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Menu size={24} />
                </button>
                <button
                  className="hidden lg:block p-2 hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Menu size={24} />
                </button>

                <Link href="/" className="flex items-center gap-2 group">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-white/10 group-hover:bg-white/20 transition-colors">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-[10px] tracking-widest font-semibold text-white/80">
                      THE
                    </span>
                    <span className="text-lg font-bold tracking-wide">
                      HOARDSPACE
                    </span>
                  </div>
                </Link>
              </div>

              {/* Center: Empty space for better balance */}
              <div className="flex-1"></div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 sm:gap-6">
                <Link
                  href="/contact"
                  className="hidden lg:block text-sm font-medium hover:text-white/80 transition-colors"
                >
                  Contact Us
                </Link>

                {user ? (
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-lg py-2 px-3 hover:bg-white/10 transition-colors"
                  >
                    <User size={18} />
                    <span className="hidden sm:inline text-sm font-medium">
                      Profile
                    </span>
                  </Link>
                ) : (
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="flex items-center gap-2 rounded-lg py-2 px-3 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <User size={18} />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">
                      Login
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Secondary Strip - Top Cities */}
        <div className="bg-[#1a1a1a] text-white/90 shadow-md border-b border-white/10 hidden md:block">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-8 h-12 text-sm font-medium overflow-x-auto no-scrollbar">
              {topCities.map((city) => (
                <Link
                  key={city.value}
                  href={`/search?city=${city.value}`}
                  className="hover:text-white transition-colors flex items-center gap-2 group whitespace-nowrap"
                >
                  <MapPin
                    size={14}
                    className="text-[#2563eb] group-hover:scale-110 transition-transform"
                  />
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Desktop Sidebar Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-[#2563eb] to-[#1d4ed8] shadow-2xl transition-transform">
            {/* Header with Welcome */}
            <div className="relative bg-white/10 backdrop-blur-md p-6 border-b border-white/20">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">
                    {user ? `Hello, ${user.name}` : "Hello & Welcome"}
                  </h3>
                  <p className="text-white/70 text-xs">
                    {user ? user.email : "Sign in to continue"}
                  </p>
                </div>
              </div>

              {!user && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsAuthOpen(true);
                  }}
                  className="w-full bg-white text-[#2563eb] py-2 px-4 rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
                >
                  Login / Register
                </button>
              )}
            </div>

            {/* Navigation Menu */}
            <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 text-white transition-all group"
              >
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                  <Home size={20} />
                </div>
                <span className="font-medium">Home</span>
              </Link>

              {user && (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 text-white transition-all group"
                  >
                    <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      <UserCircle size={20} />
                    </div>
                    <span className="font-medium">My Profile</span>
                  </Link>

                  {user.role === "buyer" && (
                    <Link
                      href="/buyer/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 text-white transition-all group"
                    >
                      <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                        <LayoutDashboard size={20} />
                      </div>
                      <span className="font-medium">My Dashboard</span>
                    </Link>
                  )}

                  {user.role === "vendor" && (
                    <Link
                      href="/vendor/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 text-white transition-all group"
                    >
                      <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                        <LayoutDashboard size={20} />
                      </div>
                      <span className="font-medium">My Dashboard</span>
                    </Link>
                  )}

                  {user.role === "admin" && (
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 text-white transition-all group border-2 border-yellow-400/30"
                    >
                      <div className="p-2 bg-yellow-400/20 rounded-lg group-hover:bg-yellow-400/30 transition-colors">
                        <LayoutDashboard
                          size={20}
                          className="text-yellow-300"
                        />
                      </div>
                      <span className="font-medium">Admin Dashboard</span>
                    </Link>
                  )}
                </>
              )}

              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 text-white transition-all group"
              >
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                  <Info size={20} />
                </div>
                <span className="font-medium">About Us</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 text-white transition-all group"
              >
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                  <Mail size={20} />
                </div>
                <span className="font-medium">Contact Us</span>
              </Link>
            </nav>

            {/* Logout Button (if logged in) */}
            {user && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/10 backdrop-blur-md border-t border-white/20">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-xl font-medium transition-colors"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
