import React, { useState } from "react";
import { X, CheckCircle, Calendar, User, Phone, Mail, Award, Smile, ArrowRight, ArrowLeft } from "lucide-react";
import { Costume, BookingInquiry } from "../types";
import { COSTUMES, BUSINESS_DETAILS } from "../data";

interface BookingFormProps {
  initialCostume?: Costume | null;
  onClose: () => void;
  onSuccess: (newInquiry: BookingInquiry) => void;
}

export default function BookingForm({ initialCostume, onClose, onSuccess }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [costumeId, setCostumeId] = useState(initialCostume?.id || "");
  const [inquiryType, setInquiryType] = useState<'rental' | 'purchase'>(initialCostume ? 'rental' : 'rental');
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [childAge, setChildAge] = useState<number>(5);
  const [childHeight, setChildHeight] = useState<string>("");
  const [rentalDate, setRentalDate] = useState("");
  const [durationDays, setDurationDays] = useState<number>(2);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedInquiry, setSubmittedInquiry] = useState<BookingInquiry | null>(null);

  const selectedCostumeObj = COSTUMES.find(c => c.id === costumeId);

  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};
    if (!costumeId) errs.costumeId = "Please select a costume or General Inquiry.";
    if (!rentalDate) errs.rentalDate = "Please choose a tentative date.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: { [key: string]: string } = {};
    if (!customerName.trim()) errs.customerName = "Full Name is required.";
    if (!phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (!/^[0-9+\s-]{8,15}$/.test(phone)) {
      errs.phone = "Please enter a valid phone number.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    const costumeName = selectedCostumeObj ? selectedCostumeObj.name : "General / Custom Costume Inquiry";
    
    const newInquiry: BookingInquiry = {
      id: "inq_" + Math.random().toString(36).substr(2, 9),
      customerName,
      phone,
      email: email || "Not Provided",
      costumeId,
      costumeName,
      rentalDate,
      durationDays,
      inquiryType,
      childAge,
      childHeightCm: childHeight ? parseInt(childHeight) : undefined,
      message,
      status: 'Pending',
      createdAt: new Date().toLocaleDateString()
    };

    // Save in LocalStorage to persist inquiry history
    try {
      const stored = localStorage.getItem("kumkum_inquiries");
      const currentInquiries = stored ? JSON.parse(stored) : [];
      currentInquiries.unshift(newInquiry);
      localStorage.setItem("kumkum_inquiries", JSON.stringify(currentInquiries));
    } catch (e) {
      console.error("Local storage writing failed", e);
    }

    setSubmittedInquiry(newInquiry);
    onSuccess(newInquiry);
  };

  // Prepares the WhatsApp API deep link pre-filled message
  const triggerWhatsAppRedirect = () => {
    if (!submittedInquiry) return;
    const itemLabel = submittedInquiry.inquiryType === 'rental' ? 'Rent' : 'Buy';
    const msg = `*NEW BOOKING INQUIRY - KUMKUM FANCY DRESS*\n` +
                `----------------------------------------\n` +
                `👤 *Parent Name:* ${submittedInquiry.customerName}\n` +
                `📞 *Phone:* ${submittedInquiry.phone}\n` +
                `👗 *Costume:* ${submittedInquiry.costumeName}\n` +
                `🏷️ *Type:* ${itemLabel}\n` +
                `📅 *Tentative Date:* ${submittedInquiry.rentalDate}\n` +
                `⏳ *Duration:* ${submittedInquiry.durationDays} Days\n` +
                `🧒 *Child Age:* ${submittedInquiry.childAge} Years Old\n` +
                `📏 *Child Height:* ${submittedInquiry.childHeightCm ? submittedInquiry.childHeightCm + ' cm' : 'Not specified'}\n` +
                `💬 *Notes:* ${submittedInquiry.message || "None"}\n\n` +
                `Please confirm booking availability!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${BUSINESS_DETAILS.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] animate-slideUp z-10">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-amber-400 via-pink-400 to-amber-400 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-1.5 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-2">
            <Smile className="h-6 w-6 text-white animate-bounce" />
            <h3 className="font-sans font-bold text-lg sm:text-xl">
              {submittedInquiry ? "Inquiry Confirmed!" : "Costume Booking & Inquiry"}
            </h3>
          </div>
          <p className="text-xs text-white/90 mt-1">
            {submittedInquiry 
              ? "Your request has been filed locally. Tap below to send directly to us on WhatsApp!"
              : "Easy 2-step inquiry to check availability and reserve costumes for your kids."}
          </p>
        </div>

        {/* Progress Tracker (hidden on success) */}
        {!submittedInquiry && (
          <div className="flex bg-slate-50 border-b border-slate-100 py-3 px-6 justify-between items-center text-xs font-semibold">
            <span className={`flex items-center space-x-1.5 ${step === 1 ? "text-amber-500 font-bold" : "text-slate-400"}`}>
              <span className={`h-5 w-5 rounded-full flex items-center justify-center ${step === 1 ? "bg-amber-400 text-white" : "bg-slate-200 text-slate-500"}`}>1</span>
              <span>Costume & Date</span>
            </span>
            <div className="flex-grow h-[1px] bg-slate-200 mx-4" />
            <span className={`flex items-center space-x-1.5 ${step === 2 ? "text-pink-500 font-bold" : "text-slate-400"}`}>
              <span className={`h-5 w-5 rounded-full flex items-center justify-center ${step === 2 ? "bg-pink-500 text-white" : "bg-slate-200 text-slate-500"}`}>2</span>
              <span>Parent Details</span>
            </span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow">
          {submittedInquiry ? (
            /* SUCCESS VIEW */
            <div className="text-center py-6">
              <div className="inline-flex bg-emerald-50 p-4 rounded-full border border-emerald-100 text-emerald-500 animate-pulse mb-4">
                <CheckCircle className="h-14 w-14" />
              </div>
              <h4 className="font-sans font-bold text-xl text-slate-800">Inquiry Saved Locally!</h4>
              <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{submittedInquiry.customerName}</strong>! Your inquiry for <strong>{submittedInquiry.costumeName}</strong> is stored safely on your browser.
              </p>

              <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100/60 mt-6 max-w-md mx-auto text-left text-xs text-slate-600 space-y-1.5">
                <p>📌 <strong>Inquiry ID:</strong> {submittedInquiry.id}</p>
                <p>👗 <strong>Costume:</strong> {submittedInquiry.costumeName} ({submittedInquiry.inquiryType})</p>
                <p>📅 <strong>Requested Date:</strong> {submittedInquiry.rentalDate}</p>
                <p>🧒 <strong>Child Age:</strong> {submittedInquiry.childAge} Years</p>
              </div>

              {/* CRITICAL INSTANT WHATSAPP HANDOFF */}
              <div className="mt-8 flex flex-col space-y-3">
                <button
                  onClick={triggerWhatsAppRedirect}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Phone className="h-5 w-5 fill-white" />
                  <span>Send WhatsApp Message Now</span>
                </button>
                <button
                  onClick={onClose}
                  className="text-slate-500 hover:text-slate-700 text-xs font-semibold cursor-pointer underline"
                >
                  Keep browsing website
                </button>
              </div>
            </div>
          ) : (
            /* MULTI STEP FORM */
            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 && (
                /* STEP 1: COSTUME & DATES */
                <div className="space-y-4 animate-fadeIn">
                  {/* Costume Picker */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Choose Costume
                    </label>
                    <select
                      value={costumeId}
                      onChange={(e) => {
                        setCostumeId(e.target.value);
                        if (errors.costumeId) setErrors(prev => ({ ...prev, costumeId: "" }));
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-amber-400 focus:outline-none transition-all text-slate-700 font-medium"
                    >
                      <option value="">-- Choose Costume / Accessory --</option>
                      <option value="general_custom">General Costume Inquiry / Not in List</option>
                      {COSTUMES.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} (Rent: ₹{c.priceRent} / Buy: ₹{c.priceBuy})
                        </option>
                      ))}
                    </select>
                    {errors.costumeId && <p className="text-xs text-rose-500 mt-1">{errors.costumeId}</p>}
                  </div>

                  {/* Rental or Purchase Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Inquiry Option
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setInquiryType('rental')}
                        className={`py-3 px-4 rounded-xl font-bold text-xs border text-center transition-all cursor-pointer ${
                          inquiryType === 'rental'
                            ? "bg-amber-400/10 text-amber-600 border-amber-300"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        Rent Costume (Affordable)
                      </button>
                      <button
                        type="button"
                        onClick={() => setInquiryType('purchase')}
                        className={`py-3 px-4 rounded-xl font-bold text-xs border text-center transition-all cursor-pointer ${
                          inquiryType === 'purchase'
                            ? "bg-pink-50 text-pink-600 border-pink-200"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        Buy Brand New
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Event Date */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Tentative Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="date"
                          value={rentalDate}
                          onChange={(e) => {
                            setRentalDate(e.target.value);
                            if (errors.rentalDate) setErrors(prev => ({ ...prev, rentalDate: "" }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs focus:border-amber-400 focus:outline-none transition-all text-slate-700 font-medium"
                        />
                      </div>
                      {errors.rentalDate && <p className="text-xs text-rose-500 mt-1">{errors.rentalDate}</p>}
                    </div>

                    {/* Rental Duration */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Duration
                      </label>
                      <select
                        value={durationDays}
                        onChange={(e) => setDurationDays(parseInt(e.target.value))}
                        disabled={inquiryType === 'purchase'}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:border-amber-400 focus:outline-none transition-all text-slate-700 font-medium disabled:opacity-50"
                      >
                        <option value={1}>1 Day</option>
                        <option value={2}>2 Days (Recommended)</option>
                        <option value={3}>3 Days</option>
                        <option value={5}>5 Days</option>
                        <option value={7}>1 Week</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Child's Age */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Child's Age (Years)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={16}
                        value={childAge}
                        onChange={(e) => setChildAge(parseInt(e.target.value) || 5)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:border-amber-400 focus:outline-none transition-all text-slate-700 font-medium"
                      />
                    </div>

                    {/* Child's Height */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Approx Height (cm)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 110"
                        value={childHeight}
                        onChange={(e) => setChildHeight(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:border-amber-400 focus:outline-none transition-all text-slate-700 font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                /* STEP 2: PARENT DETAILS */
                <div className="space-y-4 animate-fadeIn">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Parent's Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          if (errors.customerName) setErrors(prev => ({ ...prev, customerName: "" }));
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs focus:border-amber-400 focus:outline-none transition-all text-slate-700 font-medium"
                      />
                    </div>
                    {errors.customerName && <p className="text-xs text-rose-500 mt-1">{errors.customerName}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs focus:border-amber-400 focus:outline-none transition-all text-slate-700 font-medium"
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs focus:border-amber-400 focus:outline-none transition-all text-slate-700 font-medium"
                      />
                    </div>
                  </div>

                  {/* Message/Special Instructions */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Special Requirements or Specific Costume Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g., I need a sword that is not too sharp, or specific fitting concerns..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:border-amber-400 focus:outline-none transition-all text-slate-700 font-medium"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex pt-4 border-t border-slate-100 justify-between items-center">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center space-x-1.5 px-4 py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div /> // Spacer
                )}

                {step === 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center space-x-1.5 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-white rounded-xl text-xs font-extrabold transition-all shadow-md cursor-pointer ml-auto"
                  >
                    <span>Next Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center space-x-1.5 px-6 py-3 bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white rounded-xl text-xs font-extrabold transition-all shadow-md cursor-pointer"
                  >
                    <Award className="h-4 w-4" />
                    <span>Submit & WhatsApp</span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
