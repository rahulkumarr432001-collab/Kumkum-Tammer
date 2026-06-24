import React, { useState } from "react";
import { Sparkles, HelpCircle, Info, CheckCircle } from "lucide-react";

interface SizeRecommendation {
  size: string;
  ageRange: string;
  heightRange: string;
  description: string;
}

export default function SizeGuideCalculator() {
  const [age, setAge] = useState<number>(6);
  const [height, setHeight] = useState<number>(115);
  const [activeUnit, setActiveUnit] = useState<'age' | 'height'>('age');

  const sizeChart: SizeRecommendation[] = [
    { size: "XS (Toddler)", ageRange: "1.5 - 3 Years", heightRange: "80cm - 95cm", description: "Soft jumpsuits, romper dresses, or easy-wear animal suits. Features soft elastics." },
    { size: "S (Small)", ageRange: "3 - 5 Years", heightRange: "95cm - 110cm", description: "Standard kindergarten plays. Easy velcro fastenings and lightweight accessories." },
    { size: "M (Medium)", ageRange: "5 - 8 Years", heightRange: "110cm - 125cm", description: "Most popular size for primary school scripts, freedom fighters, and traditional folk dances." },
    { size: "L (Large)", ageRange: "8 - 12 Years", heightRange: "125cm - 145cm", description: "Perfect for historical dramas, kings, queens, and elaborate mythological costumes." },
    { size: "XL (Extra Large)", ageRange: "12 - 15 Years", heightRange: "145cm - 160cm", description: "For senior school dramas, heavy dance costumes, and fully-accessorized uniforms." },
  ];

  const getRecommendation = (): SizeRecommendation => {
    if (activeUnit === 'age') {
      if (age < 3) return sizeChart[0];
      if (age >= 3 && age <= 5) return sizeChart[1];
      if (age > 5 && age <= 8) return sizeChart[2];
      if (age > 8 && age <= 12) return sizeChart[3];
      return sizeChart[4];
    } else {
      if (height < 95) return sizeChart[0];
      if (height >= 95 && height < 110) return sizeChart[1];
      if (height >= 110 && height < 125) return sizeChart[2];
      if (height >= 125 && height < 145) return sizeChart[3];
      return sizeChart[4];
    }
  };

  const currentRec = getRecommendation();

  return (
    <div className="bg-gradient-to-br from-amber-400/5 to-pink-500/5 rounded-3xl p-6 sm:p-8 border border-amber-200/50 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-pink-300/10 rounded-full blur-xl" />
      <div className="absolute bottom-0 left-0 -ml-6 -mb-6 w-24 h-24 bg-amber-400/10 rounded-full blur-xl" />

      <div className="flex items-center space-x-2.5 mb-5">
        <div className="bg-gradient-to-tr from-amber-400 to-pink-500 p-2 rounded-2xl shadow-sm text-white">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-sans font-black text-lg text-slate-800 leading-tight">
            Kids Size Calculator
          </h3>
          <p className="text-xs text-slate-500">
            Find the perfect fitting costume in under 5 seconds!
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
        <button
          onClick={() => setActiveUnit('age')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeUnit === 'age'
              ? "bg-white text-slate-800 shadow-xs"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          By Child's Age
        </button>
        <button
          onClick={() => setActiveUnit('height')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeUnit === 'height'
              ? "bg-white text-slate-800 shadow-xs"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          By Height (cm)
        </button>
      </div>

      {/* Calculator Slider */}
      <div className="mb-8">
        {activeUnit === 'age' ? (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Child's Age</span>
              <span className="text-lg font-black text-amber-500 bg-amber-50 px-3 py-1 rounded-xl border border-amber-100">
                {age} Years Old
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={0.5}
              value={age}
              onChange={(e) => setAge(parseFloat(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5 px-1">
              <span>Toddler (1 Yr)</span>
              <span>Primary (7 Yrs)</span>
              <span>Senior (15 Yrs)</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Child's Height</span>
              <span className="text-lg font-black text-pink-500 bg-pink-50 px-3 py-1 rounded-xl border border-pink-100">
                {height} cm
              </span>
            </div>
            <input
              type="range"
              min={70}
              max={165}
              step={1}
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              className="w-full accent-pink-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5 px-1">
              <span>70 cm</span>
              <span>120 cm</span>
              <span>165 cm</span>
            </div>
          </div>
        )}
      </div>

      {/* Result Card */}
      <div className="bg-white rounded-2xl p-5 border border-amber-200/40 shadow-sm animate-scaleIn">
        <span className="text-[10px] uppercase font-bold tracking-wider text-pink-500">Recommended Size</span>
        <h4 className="text-xl sm:text-2xl font-black text-slate-800 mt-1 flex items-center gap-1.5">
          {currentRec.size}
        </h4>

        <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-50 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Fit Age Range</span>
            <span className="font-semibold text-slate-700">{currentRec.ageRange}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Fit Height Range</span>
            <span className="font-semibold text-slate-700">{currentRec.heightRange}</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 mt-3.5 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
          <Info className="h-3.5 w-3.5 inline text-amber-500 mr-1.5 -mt-0.5" />
          {currentRec.description}
        </p>
      </div>

      {/* Sizing Tips */}
      <div className="mt-6 space-y-2">
        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Useful Trial Tips:</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-start space-x-2 text-xs text-slate-600">
            <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span>If child is between sizes, always rent <strong>one size larger</strong> for comfort.</span>
          </div>
          <div className="flex items-start space-x-2 text-xs text-slate-600">
            <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span>Bring child to our shop 1-2 days before the event for a <strong>free trial fitting</strong>.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
