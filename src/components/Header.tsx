import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X, Phone, ShoppingBag } from "lucide-react";
import { BUSINESS_DETAILS } from "../data";

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export default function Header({ activeSection, onNavigate, onOpenBooking }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "categories", label: "Categories" },
    { id: "gallery", label: "Gallery" },
    { id: "why-choose-us", label: "Why Choose" },
    { id: "testimonials", label: "Reviews" },
    { id: "faq", label: "FAQs" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-gradient-to-b from-amber-500/10 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center space-x-2 text-left focus:outline-none cursor-pointer group"
          >
            <div className="bg-amber-400 p-2 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-sans font-bold text-xl sm:text-2xl text-amber-600 tracking-tight leading-none block">
                Kumkum
              </span>
              <span className="font-sans font-semibold text-xs tracking-wider text-pink-500 uppercase block">
                Fancy Dress
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? "bg-amber-400 text-white shadow-sm"
                    : "text-slate-600 hover:text-amber-500 hover:bg-amber-50/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Quick Booking Call-to-Action */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={`https://wa.me/${BUSINESS_DETAILS.whatsappNumber}?text=Hi Kumkum Fancy Dress, I am interested in costumes for my child.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 text-slate-600 hover:text-pink-500 font-medium text-sm transition-colors mr-2"
            >
              <Phone className="h-4 w-4 text-green-500" />
              <span>Inquire Quick</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-semibold px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Book / Rent Now</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onOpenBooking}
              className="sm:hidden flex items-center bg-amber-500 text-white p-2 rounded-full shadow-md hover:bg-amber-600 transition-colors"
              title="Book Costume"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-amber-500 hover:bg-amber-50 focus:outline-none cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md shadow-xl border-t border-slate-100 py-4 px-6 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                  activeSection === item.id
                    ? "bg-amber-400 text-white"
                    : "text-slate-600 hover:bg-amber-50 hover:text-amber-500"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-4 flex flex-col space-y-3">
            <a
              href={`https://wa.me/${BUSINESS_DETAILS.whatsappNumber}?text=Hi Kumkum Fancy Dress, I am looking for costumes.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all text-sm"
            >
              <Phone className="h-4 w-4 text-green-500" />
              <span>Call / WhatsApp Inquire</span>
            </a>
            <button
              onClick={() => {
                onOpenBooking();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-pink-500 to-amber-500 text-white font-bold py-3 rounded-xl shadow-md text-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Book / Rent Costume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
