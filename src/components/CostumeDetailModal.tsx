import React from "react";
import { X, ShieldCheck, Heart, Sparkles, CheckCircle2, Phone } from "lucide-react";
import { Costume } from "../types";
import { BUSINESS_DETAILS } from "../data";

interface CostumeDetailModalProps {
  costume: Costume;
  onClose: () => void;
  onBook: (costume: Costume) => void;
}

export default function CostumeDetailModal({ costume, onClose, onBook }: CostumeDetailModalProps) {
  const whatsappInquiryMessage = `Hi Kumkum Fancy Dress, I am interested in inquiring about the "${costume.name}" costume. Is it available for rental/purchase?`;

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] animate-slideUp z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500 p-2 rounded-full shadow-md backdrop-blur-xs cursor-pointer transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Costume Image Section */}
        <div className="relative w-full md:w-1/2 bg-slate-50 min-h-[250px] md:min-h-full">
          <img
            src={costume.image}
            alt={costume.name}
            className="w-full h-full object-cover absolute inset-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden" />
          <div className="absolute bottom-4 left-4 md:hidden">
            <span className="bg-amber-400 text-white px-3 py-1 rounded-full text-xs font-extrabold shadow-md">
              ₹{costume.priceRent} / Rent
            </span>
          </div>
        </div>

        {/* Costume Details Content */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Category */}
            <span className="text-xs font-bold text-pink-500 tracking-wider uppercase bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100 inline-block">
              {costume.category.replace("-", " ")}
            </span>

            {/* Title */}
            <h2 className="font-sans font-bold text-2xl text-slate-800 mt-3 flex items-center gap-1.5">
              <span>{costume.name}</span>
              <Sparkles className="h-5 w-5 text-amber-500 flex-shrink-0 animate-pulse" />
            </h2>

            {/* Price Tags */}
            <div className="grid grid-cols-2 gap-4 mt-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="border-r border-slate-200 pr-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Rental Charge</span>
                <span className="text-xl font-black text-pink-500">₹{costume.priceRent}</span>
                <span className="text-xs text-slate-500 font-medium"> / 2 Days</span>
              </div>
              <div className="pl-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Outright Buy</span>
                <span className="text-xl font-black text-slate-700">₹{costume.priceBuy}</span>
                <span className="text-xs text-slate-500 font-medium"> (New Outfit)</span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">About Costume</h4>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {costume.description}
              </p>
            </div>

            {/* Sizes Available */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sizes Available</h4>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {costume.sizes.map((sz, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-2.5 py-1 bg-amber-50 border border-amber-100 text-amber-700 rounded-lg"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>

            {/* Accessories Included */}
            <div className="mt-5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Accessories Included (FREE)</h4>
              <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {costume.accessoriesIncluded.map((acc, idx) => (
                  <li key={idx} className="flex items-center space-x-1.5 text-xs text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>{acc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fabric Material */}
            <div className="mt-5 flex items-center space-x-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/40">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span className="text-xs text-slate-700">
                <strong className="text-emerald-800">Hygienic Material:</strong> {costume.materials}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${BUSINESS_DETAILS.whatsappNumber}?text=${encodeURIComponent(whatsappInquiryMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold py-3 px-4 rounded-xl cursor-pointer text-sm transition-all"
            >
              <Phone className="h-4 w-4 text-green-500" />
              <span>Inquire WhatsApp</span>
            </a>
            <button
              onClick={() => onBook(costume)}
              className="flex-1 bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-bold py-3 px-4 rounded-xl cursor-pointer text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-center"
            >
              Rent or Buy Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
