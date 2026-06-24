import React from "react";
import { Star, Eye, Calendar } from "lucide-react";
import { Costume } from "../types";

interface CostumeCardProps {
  key?: string;
  costume: Costume;
  onSelect: (costume: Costume) => void;
  onQuickBook: (costume: Costume) => void;
}

export default function CostumeCard({ costume, onSelect, onQuickBook }: CostumeCardProps) {
  // Map category to playful color badge
  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case "freedom-fighters":
        return "bg-orange-50 text-orange-600 border-orange-100";
      case "mythological":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "animal-bird":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "cartoon":
        return "bg-pink-50 text-pink-600 border-pink-100";
      case "historical":
        return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case "festival-cultural":
        return "bg-purple-50 text-purple-600 border-purple-100";
      default:
        return "bg-sky-50 text-sky-600 border-sky-100";
    }
  };

  const formattedCategoryName = costume.category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full">
      {/* Image and badges */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={costume.image}
          alt={costume.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryBadgeClass(costume.category)} shadow-sm`}>
            {formattedCategoryName}
          </span>
        </div>

        {/* Popularity Star Rating */}
        <div className="absolute top-3 right-3 flex bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs items-center space-x-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-slate-700">{costume.popularity}.0</span>
        </div>

        {/* Action icons on hover */}
        <div className="absolute inset-0 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 backdrop-blur-2xs">
          <button
            onClick={() => onSelect(costume)}
            className="p-3 bg-white hover:bg-amber-400 hover:text-white text-slate-800 rounded-full shadow-md hover:scale-110 transition-all cursor-pointer"
            title="View Details"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={() => onQuickBook(costume)}
            className="p-3 bg-white hover:bg-pink-500 hover:text-white text-slate-800 rounded-full shadow-md hover:scale-110 transition-all cursor-pointer"
            title="Quick Rent"
          >
            <Calendar className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-sans font-bold text-lg text-slate-800 line-clamp-1 group-hover:text-amber-500 transition-colors duration-200">
          {costume.name}
        </h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed flex-grow">
          {costume.description}
        </p>

        {/* Sizes banner */}
        <div className="mt-3.5 pt-3 border-t border-slate-50 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sizes:</span>
          <div className="flex space-x-1">
            {costume.sizes.map((sz, index) => {
              // Extract letter code
              const letter = sz.split(" ")[0] || "XS";
              return (
                <span key={index} className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-50 text-slate-600 rounded-md border border-slate-100" title={sz}>
                  {letter}
                </span>
              );
            })}
          </div>
        </div>

        {/* Prices and buttons */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-end justify-between">
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Rental Price</div>
            <div className="flex items-baseline space-x-1">
              <span className="font-bold text-lg text-pink-500">₹{costume.priceRent}</span>
              <span className="text-slate-400 text-xs">/ 2 Days</span>
            </div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] text-right uppercase font-bold tracking-wider">Buy New</div>
            <div className="font-bold text-slate-700 text-right">₹{costume.priceBuy}</div>
          </div>
        </div>

        {/* Interactive CTA buttons inside card */}
        <div className="grid grid-cols-2 gap-2 mt-4.5">
          <button
            onClick={() => onSelect(costume)}
            className="py-2 px-3 border border-amber-300 text-amber-600 hover:bg-amber-50 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
          >
            Details
          </button>
          <button
            onClick={() => onQuickBook(costume)}
            className="py-2 px-3 bg-amber-400 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer text-center"
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
}
