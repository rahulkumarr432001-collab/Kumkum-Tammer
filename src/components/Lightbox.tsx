import React from "react";
import { X, ChevronLeft, ChevronRight, MessageSquareCode } from "lucide-react";
import { GalleryItem } from "../types";
import { BUSINESS_DETAILS } from "../data";

interface LightboxProps {
  item: GalleryItem;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ item, onClose, onNext, onPrev }: LightboxProps) {
  const whatsappGalleryMessage = `Hi Kumkum Fancy Dress, I saw the photo of "${item.title}" in your website gallery. I'm interested in renting/buying a similar costume for my child. Could you share pricing details?`;

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      {/* Dark backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
        onClick={onClose}
      />

      {/* Lightbox Content Container */}
      <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 z-10 flex flex-col md:flex-row max-h-[90vh] animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 bg-black/60 hover:bg-black text-white hover:text-rose-400 p-2.5 rounded-full cursor-pointer transition-all border border-white/10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Previous Button (Float on mobile or side on desktop) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-amber-400 text-white hover:text-slate-950 p-3 rounded-full cursor-pointer transition-all border border-white/5 shadow-lg hover:scale-110"
          title="Previous Image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-amber-400 text-white hover:text-slate-950 p-3 rounded-full cursor-pointer transition-all border border-white/5 shadow-lg hover:scale-110"
          title="Next Image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Left Side: Image Display */}
        <div className="relative w-full md:w-2/3 bg-slate-950 flex items-center justify-center min-h-[300px] md:min-h-[500px]">
          <img
            src={item.image}
            alt={item.title}
            className="max-w-full max-h-[50vh] md:max-h-[70vh] object-contain select-none"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right Side: Details Pane */}
        <div className="w-full md:w-1/3 p-6 sm:p-8 bg-slate-900 text-white flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full inline-block">
              {item.category}
            </span>
            <h3 className="font-sans font-bold text-xl sm:text-2xl mt-4 text-slate-100 leading-snug">
              {item.title}
            </h3>
            <p className="text-sm text-slate-400 mt-3 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="text-slate-400 text-xs mb-3 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for immediate booking</span>
            </div>
            <a
              href={`https://wa.me/${BUSINESS_DETAILS.whatsappNumber}?text=${encodeURIComponent(whatsappGalleryMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all text-sm cursor-pointer"
            >
              <MessageSquareCode className="h-4.5 w-4.5" />
              <span>Inquire This Costume</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
