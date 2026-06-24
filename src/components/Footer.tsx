import React from "react";
import { Sparkles, Phone, Mail, MapPin, MessageSquareCode, Facebook, Instagram, Twitter, Heart } from "lucide-react";
import { BUSINESS_DETAILS, CATEGORIES } from "../data";

interface FooterProps {
  onNavigate: (id: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-900 text-white relative pt-16 pb-8 overflow-hidden border-t border-slate-800">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center space-x-2 text-left focus:outline-none cursor-pointer group"
            >
              <div className="bg-amber-400 p-1.5 rounded-full shadow-md group-hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-sans font-extrabold text-lg text-amber-400 tracking-tight leading-none block">
                  Kumkum
                </span>
                <span className="font-sans font-bold text-[10px] tracking-widest text-pink-400 uppercase block">
                  Fancy Dress
                </span>
              </div>
            </button>
            <p className="text-slate-400 text-xs leading-relaxed">
              Your premium destination for colorful, dry-cleaned, and highly authentic children fancy dress costumes. Bringing joy to every school stage, festival, and performance.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-300 rounded-full transition-colors cursor-pointer border border-slate-700/60"
                title="Facebook"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-800 hover:bg-pink-500 hover:text-white text-slate-300 rounded-full transition-colors cursor-pointer border border-slate-700/60"
                title="Instagram"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-800 hover:bg-sky-400 hover:text-slate-950 text-slate-300 rounded-full transition-colors cursor-pointer border border-slate-700/60"
                title="Twitter"
              >
                <Twitter className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-amber-400 mb-4">
              Our Costumes
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate("categories")}
                    className="hover:text-pink-400 transition-colors cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Sitemap */}
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-amber-400 mb-4">
              Sitemap
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {[
                { id: "home", label: "Home Base" },
                { id: "about", label: "About Our Story" },
                { id: "categories", label: "Costume Categories" },
                { id: "gallery", label: "Client Performance Gallery" },
                { id: "why-choose-us", label: "Our Standards" },
                { id: "testimonials", label: "Client Love & Testimonials" },
                { id: "contact", label: "Get In Touch" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-pink-400 transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Address & Contact */}
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-amber-400 mb-4">
              Visit Store
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4.5 w-4.5 text-pink-500 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{BUSINESS_DETAILS.address}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${BUSINESS_DETAILS.phone}`} className="hover:text-white transition-colors">
                  {BUSINESS_DETAILS.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-sky-400 flex-shrink-0" />
                <a href={`mailto:${BUSINESS_DETAILS.email}`} className="hover:text-white transition-colors">
                  {BUSINESS_DETAILS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <p>© {currentYear} Kumkum Fancy Dress. All Rights Reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>for little stars</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
