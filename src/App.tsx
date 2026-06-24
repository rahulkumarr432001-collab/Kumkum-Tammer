import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Star,
  Filter,
  Search,
  Send,
  Heart,
  Eye,
  BookOpen,
  Award,
  CheckCircle,
  MessageSquare,
  Shield,
  Clock,
  Shirt,
  User,
  ThumbsUp
} from "lucide-react";

// Types & Data
import { Costume, Category, GalleryItem, Testimonial, BookingInquiry } from "./types";
import { CATEGORIES, COSTUMES, GALLERY_ITEMS, TESTIMONIALS, FAQS, BUSINESS_DETAILS } from "./data";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import CostumeCard from "./components/CostumeCard";
import CostumeDetailModal from "./components/CostumeDetailModal";
import Lightbox from "./components/Lightbox";
import BookingForm from "./components/BookingForm";
import SizeGuideCalculator from "./components/SizeGuideCalculator";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  
  // Modal states
  const [selectedCostume, setSelectedCostume] = useState<Costume | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingCostume, setBookingCostume] = useState<Costume | null>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  
  // Costume filter & search states
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Contact Form states
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState("");

  // FAQ accordion states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // local persistence history for submissions
  const [myInquiries, setMyInquiries] = useState<BookingInquiry[]>([]);

  useEffect(() => {
    // Load local inquiries
    try {
      const stored = localStorage.getItem("kumkum_inquiries");
      if (stored) {
        setMyInquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Local storage retrieval failed", e);
    }
  }, []);

  // Scroll spy to update header active link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "categories", "gallery", "why-choose-us", "testimonials", "faq", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offsetTop = el.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  const handleCostumeSelect = (costume: Costume) => {
    setSelectedCostume(costume);
  };

  const handleOpenBooking = (costume?: Costume | null) => {
    setBookingCostume(costume || null);
    setIsBookingOpen(true);
  };

  const handleInquirySuccess = (newInquiry: BookingInquiry) => {
    setMyInquiries(prev => [newInquiry, ...prev]);
  };

  // Filter costumes based on search & active category
  const filteredCostumes = COSTUMES.filter((costume) => {
    const matchesCategory = selectedCategory === "all" || costume.category === selectedCategory;
    const matchesSearch = costume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          costume.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          costume.materials.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          costume.accessoriesIncluded.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Handle Contact Form Submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim() || !contactMessage.trim()) {
      setContactError("Please fill out all required fields marked with *");
      return;
    }

    // Save locally
    const contactObj = {
      id: "cnt_" + Math.random().toString(36).substr(2, 9),
      name: contactName,
      phone: contactPhone,
      email: contactEmail || "Not Provided",
      message: contactMessage,
      submittedAt: new Date().toLocaleString()
    };

    try {
      const current = localStorage.getItem("kumkum_contact_messages");
      const list = current ? JSON.parse(current) : [];
      list.unshift(contactObj);
      localStorage.setItem("kumkum_contact_messages", JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }

    setContactSuccess(true);
    setContactError("");

    // Prepare direct WhatsApp handoff for contact message
    const waMsg = `*WEBSITE CONTACT FORM - KUMKUM FANCY DRESS*\n` +
                  `----------------------------------------\n` +
                  `👤 *Name:* ${contactName}\n` +
                  `📞 *Phone:* ${contactPhone}\n` +
                  `✉️ *Email:* ${contactEmail || 'Not specified'}\n` +
                  `💬 *Message:* ${contactMessage}`;
    
    const url = `https://wa.me/${BUSINESS_DETAILS.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;
    
    // Auto trigger WhatsApp redirect in new tab
    setTimeout(() => {
      window.open(url, "_blank");
    }, 1500);
  };

  // Reset Contact Form
  const resetContactForm = () => {
    setContactName("");
    setContactPhone("");
    setContactEmail("");
    setContactMessage("");
    setContactSuccess(false);
  };

  // Lightbox navigation
  const handleLightboxNext = () => {
    if (!lightboxItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex(item => item.id === lightboxItem.id);
    const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
    setLightboxItem(GALLERY_ITEMS[nextIndex] || null);
  };

  const handleLightboxPrev = () => {
    if (!lightboxItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex(item => item.id === lightboxItem.id);
    const prevIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setLightboxItem(GALLERY_ITEMS[prevIndex] || null);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-700 antialiased font-sans">
      
      {/* Header component */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking(null)}
      />

      {/* Main Sections Wrapper */}
      <main className="pt-20">

        {/* SECTION 1: HOME (HERO) */}
        <section id="home" className="relative bg-gradient-to-b from-amber-300/10 via-pink-400/5 to-white py-16 sm:py-24 overflow-hidden border-b border-slate-100">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column Text */}
              <div className="space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-200/40 text-amber-800 px-4 py-1.5 rounded-full text-xs font-extrabold shadow-xs">
                  <Sparkles className="h-4 w-4 text-amber-500 animate-spin" />
                  <span>Dressing Up Little Dreams Since 2012!</span>
                </div>
                
                <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-slate-800 tracking-tight leading-[1.1] text-balance">
                  Let Your Child <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-amber-500 via-pink-500 to-amber-600 bg-clip-text text-transparent">
                    Shine on Stage!
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed text-balance">
                  Welcome to <strong className="text-amber-500">{BUSINESS_DETAILS.name}</strong>, {BUSINESS_DETAILS.tagline}. We provide high-quality, dry-cleaned, and colorful fancy dress costumes for school annual functions, national celebrations, competitions, and themed parties.
                </p>

                {/* Key USP Badges in Hero */}
                <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-100">
                    ✨ 100% Hygienic & Dry-Cleaned
                  </span>
                  <span className="bg-pink-50 text-pink-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-pink-100">
                    👑 Premium Props Included
                  </span>
                  <span className="bg-sky-50 text-sky-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-sky-100">
                    🛍️ Affordable Rentals & Purchases
                  </span>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <button
                    onClick={() => handleNavigate("categories")}
                    className="w-full sm:w-auto bg-gradient-to-r from-pink-500 via-amber-400 to-pink-500 hover:from-pink-600 hover:to-amber-500 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer text-sm tracking-wide text-center"
                  >
                    Browse Costume Collection
                  </button>
                  <button
                    onClick={() => handleNavigate("contact")}
                    className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-bold px-8 py-4 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm transition-all text-sm cursor-pointer text-center"
                  >
                    Contact Store
                  </button>
                </div>
              </div>

              {/* Right Column Custom Generated Banner Image */}
              <div className="relative mx-auto lg:ml-auto max-w-lg lg:max-w-none w-full">
                {/* Visual decoration frames */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 to-pink-500 rounded-3xl rotate-3 scale-102 opacity-40 blur-xs" />
                <div className="relative bg-white p-3 rounded-3xl shadow-2xl border border-slate-100 transform -rotate-1 hover:rotate-0 transition-transform duration-500 overflow-hidden">
                  <img
                    src="/src/assets/images/hero_fancy_dress_1782282801688.jpg"
                    alt="Kumkum Fancy Dress costumes exhibition"
                    className="w-full h-auto rounded-2xl object-cover aspect-[4/3] sm:aspect-[16/10]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-xs py-2.5 px-4 rounded-2xl shadow-lg border border-slate-50 flex items-center space-x-2 animate-bounce">
                    <span className="h-3 w-3 bg-green-500 rounded-full" />
                    <span className="text-xs font-extrabold text-slate-800">Booking Open for 2026!</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* SECTION 2: ABOUT US */}
        <section id="about" className="py-20 bg-white border-b border-slate-100 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
              
              {/* Left Column Illustration / Decorative List */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-amber-100/40 p-4 rounded-3xl border border-amber-200/20 text-center">
                    <Shirt className="h-10 w-10 text-amber-500 mx-auto mb-2" />
                    <h4 className="font-bold text-slate-800 text-sm">Wide Size Range</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Costumes for boys & girls aged 1.5 to 15 years.</p>
                  </div>
                  <div className="bg-sky-100/40 p-4 rounded-3xl border border-sky-200/20 text-center">
                    <Shield className="h-10 w-10 text-sky-500 mx-auto mb-2" />
                    <h4 className="font-bold text-slate-800 text-sm">Strictly Hygienic</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Sanitized, dry-cleaned and steam ironed always.</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-pink-100/40 p-4 rounded-3xl border border-pink-200/20 text-center">
                    <Clock className="h-10 w-10 text-pink-500 mx-auto mb-2" />
                    <h4 className="font-bold text-slate-800 text-sm">Hassle-Free</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Easy pickup and timely returns process.</p>
                  </div>
                  <div className="bg-emerald-100/40 p-4 rounded-3xl border border-emerald-200/20 text-center">
                    <ThumbsUp className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
                    <h4 className="font-bold text-slate-800 text-sm">Affordable Price</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Budget rental structures & brand-new purchases.</p>
                  </div>
                </div>
              </div>

              {/* Right Column Text */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">Our Story</span>
                  <h2 className="font-sans font-black text-3xl sm:text-4xl text-slate-800 tracking-tight leading-tight">
                    Your Trusted Costume Rental Partner
                  </h2>
                </div>
                
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  At <strong>Kumkum Fancy Dress</strong>, we believe every child has a unique spark. Since our inception, we have been dedicated to crafting and providing high-quality fancy dress costumes that help children express themselves confidently on stage.
                </p>
                
                <p className="text-sm text-slate-600 leading-relaxed">
                  Whether it is representational costumes of legendary Indian <strong>Freedom Fighters</strong>, beautiful <strong>Mythological Costumes</strong>, playful <strong>Animals & Birds</strong>, or vibrant <strong>Cartoon Characters</strong>, we provide complete, fully accessorized packages with swords, crowns, shields, and detailed props.
                </p>

                {/* bullet lists */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-pink-500" />
                    <span>Annual Day & School plays</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span>Janmashtami & Festival acts</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Kids Theme Parties</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-sky-500" />
                    <span>Inter-school Competitions</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleNavigate("categories")}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer text-xs"
                  >
                    Explore Categories
                  </button>
                  <a
                    href={`https://wa.me/${BUSINESS_DETAILS.whatsappNumber}?text=Hi Kumkum Fancy Dress, I'd like to check costume availability for school functions.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center space-x-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold px-6 py-3 rounded-xl transition-colors text-xs"
                  >
                    <Phone className="h-4 w-4 text-green-500" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* SECTION 3: CATEGORIES & COSTUMES CATALOG */}
        <section id="categories" className="py-20 bg-slate-50 border-b border-slate-100 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold text-pink-500 uppercase tracking-widest block mb-1">Our Collection</span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-slate-800 tracking-tight leading-tight">
                Browse Costume Categories
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Click a category below to filter our extensive catalog, or search for your favorite costume character!
              </p>
            </div>

            {/* Quick Search & Filters Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 bg-white p-4 rounded-3xl border border-slate-100 shadow-xs">
              {/* Category buttons horizontally scrollable on mobile */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex-shrink-0 transition-all cursor-pointer ${
                    selectedCategory === "all"
                      ? "bg-amber-400 text-white shadow-xs"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  All Costumes
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold flex-shrink-0 transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-amber-400 text-white shadow-xs"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {cat.name.split(" ")[0]} {cat.name.split(" ")[1] || ""}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative min-w-[240px]">
                <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search costume, prop, size..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:border-amber-400 focus:outline-none transition-all text-slate-700 font-medium"
                />
              </div>
            </div>

            {/* Costume Cards Grid */}
            {filteredCostumes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCostumes.map((costume) => (
                  <CostumeCard
                    key={costume.id}
                    costume={costume}
                    onSelect={handleCostumeSelect}
                    onQuickBook={(costume) => handleOpenBooking(costume)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-xs max-w-md mx-auto p-6">
                <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800 text-sm">No costumes found</h4>
                <p className="text-xs text-slate-400 mt-1">
                  We might still have it in stock! Try searching something else or contact us directly on WhatsApp to inquire.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-4 py-2 bg-amber-400 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Sizing Interactive Calculator Callout */}
            <div className="mt-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                  <span className="text-xs font-bold text-pink-500 uppercase tracking-widest block">Interactive Sizer</span>
                  <h3 className="font-sans font-black text-2xl sm:text-3xl text-slate-800 tracking-tight leading-snug">
                    Worried about child's fitting?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Don't worry! Our costumes come with flexible elastic borders and adjustable belts to guarantee a comfortable fit. Use our interactive slider tool to estimate the recommended costume size.
                  </p>
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs space-y-3">
                    <h5 className="text-xs font-bold text-slate-800">📌 Trial Policy:</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Parents are welcome to bring their kids to our store for a free Trial Session up to 3 days prior to the school event date. Minor fitting adjustments can be made immediately by our tailor.
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <SizeGuideCalculator />
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* SECTION 4: GALLERY */}
        <section id="gallery" className="py-20 bg-white border-b border-slate-100 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">Our Showcase</span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-slate-800 tracking-tight leading-tight">
                Client Performance Gallery
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Real photos of our beautiful little superstars wearing Kumkum costumes during their annual day school functions and competitions.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {GALLERY_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxItem(item)}
                  className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-100 aspect-square cursor-pointer transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />
                  
                  {/* Static visual indicator */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs p-1.5 rounded-full shadow-xs text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="h-4 w-4" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-amber-300 block">
                      {item.category}
                    </span>
                    <h4 className="font-sans font-bold text-sm text-slate-100 leading-tight mt-0.5 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-300 line-clamp-1 mt-1 leading-none">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Lightbox Trigger display instruction */}
            <div className="text-center mt-6 text-xs text-slate-400">
              💡 Tip: Click any photo above to open the full-screen interactive slideshow lightbox and directly inquire.
            </div>

          </div>
        </section>


        {/* SECTION 5: WHY CHOOSE US */}
        <section id="why-choose-us" className="py-20 bg-gradient-to-b from-white to-amber-500/5 border-b border-slate-100 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-xs font-bold text-pink-500 uppercase tracking-widest block mb-1">Our Standards</span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-slate-800 tracking-tight leading-tight">
                Why Choose Kumkum Fancy Dress
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                We are committed to providing an exceptional and reliable customer experience.
              </p>
            </div>

            {/* Bento-like USP Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4">
                <div className="inline-flex bg-amber-50 p-3 rounded-2xl border border-amber-100 text-amber-500">
                  <Shirt className="h-6 w-6" />
                </div>
                <h4 className="font-sans font-extrabold text-lg text-slate-800">
                  Large Costume Collection
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Over 500+ designs ranging from traditional freedom fighters, mythological characters, animals, cartoons, and accessories to choose from.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4">
                <div className="inline-flex bg-pink-50 p-3 rounded-2xl border border-pink-100 text-pink-500">
                  <Shield className="h-6 w-6" />
                </div>
                <h4 className="font-sans font-extrabold text-lg text-slate-800">
                  100% Hygienic Materials
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Skin sensitivity is critical for young children. We strictly dry-clean and steam-sanitize every dress after each rental cycle to ensure it remains clean.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4">
                <div className="inline-flex bg-emerald-50 p-3 rounded-2xl border border-emerald-100 text-emerald-500">
                  <Calendar className="h-6 w-6" />
                </div>
                <h4 className="font-sans font-extrabold text-lg text-slate-800">
                  Easy Booking & Pickup
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Pre-book costumes online weeks before the performance to secure sizes. Take up to 2 full days of rental duration without penalty.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* SECTION 6: TESTIMONIALS */}
        <section id="testimonials" className="py-20 bg-white border-b border-slate-100 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-14">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">Parent Reviews</span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-slate-800 tracking-tight leading-tight">
                Loved by Parents & Teachers
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Don't take our word for it. Here is what other parents have to say about their Kumkum experience.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {TESTIMONIALS.map((test) => (
                <div
                  key={test.id}
                  className="bg-slate-50/50 p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-2xs relative flex flex-col justify-between"
                >
                  <span className="absolute top-6 right-6 text-6xl text-amber-200/50 font-serif leading-none select-none">“</span>
                  
                  <div>
                    {/* Stars */}
                    <div className="flex space-x-1 mb-4">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed relative z-10 italic">
                      "{test.content}"
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center space-x-3.5">
                    <img
                      src={test.avatar}
                      alt={test.name}
                      className="w-10 h-10 rounded-full object-cover shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-sans font-bold text-xs sm:text-sm text-slate-800">{test.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{test.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* HISTORIC LOG OF LOCAL INQUIRIES (HIDDEN IF NONE) */}
        {myInquiries.length > 0 && (
          <section className="py-12 bg-slate-50 border-b border-slate-100">
            <div className="max-w-3xl mx-auto px-4">
              <div className="flex items-center space-x-2.5 mb-5 justify-center">
                <BookOpen className="h-5 w-5 text-pink-500" />
                <h4 className="font-sans font-bold text-sm text-slate-800 uppercase tracking-widest">
                  Your Booking Inquiry History ({myInquiries.length})
                </h4>
              </div>
              <p className="text-center text-xs text-slate-400 -mt-3 mb-6">
                Stored safely on this browser. Open and click to re-send to Kumkum on WhatsApp at any time.
              </p>
              
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {myInquiries.map((inq) => (
                  <div key={inq.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-3xs flex justify-between items-center text-xs">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-800">{inq.costumeName}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          inq.inquiryType === 'rental' ? "bg-amber-100 text-amber-800" : "bg-pink-100 text-pink-800"
                        }`}>
                          {inq.inquiryType.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[10px] mt-1">
                        Tentative: <strong>{inq.rentalDate}</strong> • Child Age: {inq.childAge} years • Status: <span className="text-emerald-500 font-bold">{inq.status}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        // Triggers the same WhatsApp handoff for this selected inquiry
                        const itemLabel = inq.inquiryType === 'rental' ? 'Rent' : 'Buy';
                        const msg = `*RE-SEND BOOKING INQUIRY - KUMKUM FANCY DRESS*\n` +
                                    `----------------------------------------\n` +
                                    `👤 *Parent Name:* ${inq.customerName}\n` +
                                    `📞 *Phone:* ${inq.phone}\n` +
                                    `👗 *Costume:* ${inq.costumeName}\n` +
                                    `🏷️ *Type:* ${itemLabel}\n` +
                                    `📅 *Tentative Date:* ${inq.rentalDate}\n` +
                                    `⏳ *Duration:* ${inq.durationDays} Days\n` +
                                    `🧒 *Child Age:* ${inq.childAge} Years Old\n\n` +
                                    `Please confirm booking!`;
                        window.open(`https://wa.me/${BUSINESS_DETAILS.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-500 hover:text-white rounded-lg text-[10px] font-bold text-slate-600 transition-colors cursor-pointer"
                    >
                      WhatsApp Check
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}


        {/* SECTION 7: FAQ (Accordion style) */}
        <section id="faq" className="py-20 bg-white border-b border-slate-100 scroll-mt-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold text-pink-500 uppercase tracking-widest block mb-1">Got Questions?</span>
              <h2 className="font-sans font-black text-3xl text-slate-800 tracking-tight leading-tight">
                Frequently Asked Questions
              </h2>
            </div>

            {/* Accordion FAQ Items */}
            <div className="space-y-4">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-100 rounded-2xl overflow-hidden shadow-3xs bg-slate-50/50"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-xs sm:text-sm text-slate-800 cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-amber-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      )}
                    </button>
                    
                    {isOpen && (
                      <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 border-t border-slate-100/60 leading-relaxed bg-white animate-fadeIn">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>


        {/* SECTION 8: CONTACT US */}
        <section id="contact" className="py-20 bg-slate-50 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Left Column Information */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                <div>
                  <span className="text-xs font-bold text-pink-500 uppercase tracking-widest block mb-1">Get In Touch</span>
                  <h2 className="font-sans font-black text-3xl sm:text-4xl text-slate-800 tracking-tight leading-tight">
                    Visit Our Costume Store
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                    Drop by our store in Mumbai to feel the fabrics, check costume sizing physically, and explore props in person. We are open all days from 10:00 AM to 8:30 PM.
                  </p>
                </div>

                {/* Contact Coordinates */}
                <div className="space-y-5">
                  <div className="flex items-start space-x-3.5 bg-white p-4 rounded-2xl border border-slate-100 shadow-3xs">
                    <MapPin className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-sans font-bold text-xs text-slate-800 uppercase tracking-wider">Our Store Address</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{BUSINESS_DETAILS.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3.5 bg-white p-4 rounded-2xl border border-slate-100 shadow-3xs">
                    <Phone className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-sans font-bold text-xs text-slate-800 uppercase tracking-wider">Call or WhatsApp Mobile</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        <a href={`tel:${BUSINESS_DETAILS.phone}`} className="hover:text-amber-500 font-bold">
                          {BUSINESS_DETAILS.phone}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3.5 bg-white p-4 rounded-2xl border border-slate-100 shadow-3xs">
                    <Mail className="h-5 w-5 text-sky-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-sans font-bold text-xs text-slate-800 uppercase tracking-wider">Email Address</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        <a href={`mailto:${BUSINESS_DETAILS.email}`} className="hover:text-amber-500 font-medium">
                          {BUSINESS_DETAILS.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instant WhatsApp Quick Button */}
                <div className="bg-emerald-50/50 p-5 rounded-3xl border border-emerald-100 flex items-center space-x-4">
                  <div className="bg-emerald-500 text-white p-2.5 rounded-full shadow-md">
                    <Phone className="h-5 w-5 fill-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-xs">Need instant assistance?</h5>
                    <p className="text-[10px] text-slate-500 leading-tight">Chat with our store manager on WhatsApp now for live photos and pricing.</p>
                    <a
                      href={`https://wa.me/${BUSINESS_DETAILS.whatsappNumber}?text=Hi Kumkum Fancy Dress, I need quick support with finding a costume.`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-emerald-600 font-bold inline-block mt-1 underline hover:text-emerald-700"
                    >
                      Connect on WhatsApp →
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column Interactive Form */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="font-sans font-bold text-lg text-slate-800 mb-2 flex items-center gap-1.5">
                  <span>Send a Message</span>
                  <Award className="h-4.5 w-4.5 text-amber-500 animate-pulse" />
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Fill out this form and we'll instantly generate a direct WhatsApp action link for you!
                </p>

                {contactSuccess ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="inline-flex bg-emerald-50 p-3 rounded-full text-emerald-500">
                      <CheckCircle className="h-10 w-10 animate-bounce" />
                    </div>
                    <h4 className="font-bold text-slate-800 text-base">Message Sent Successfully!</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      We have logged your query locally. Redirecting you to WhatsApp so you can send it directly to our store manager.
                    </p>
                    <button
                      onClick={resetContactForm}
                      className="text-xs text-amber-500 hover:text-amber-600 font-bold underline mt-4"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    {contactError && (
                      <p className="text-xs text-rose-500 bg-rose-50 p-2.5 rounded-lg border border-rose-100 font-medium">
                        ⚠️ {contactError}
                      </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:border-amber-400 focus:outline-none text-slate-700 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          WhatsApp Mobile Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g., 9876543210"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:border-amber-400 focus:outline-none text-slate-700 font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:border-amber-400 focus:outline-none text-slate-700 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Your Message / Custom Requirement *
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Please describe the costume character you are looking for, sizes needed, and event dates."
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:border-amber-400 focus:outline-none text-slate-700 font-semibold"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all text-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>Send to WhatsApp</span>
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER Component */}
      <Footer onNavigate={handleNavigate} />

      {/* MODAL 1: COSTUME DETAIL POPUP */}
      {selectedCostume && (
        <CostumeDetailModal
          costume={selectedCostume}
          onClose={() => setSelectedCostume(null)}
          onBook={(costume) => {
            setSelectedCostume(null);
            handleOpenBooking(costume);
          }}
        />
      )}

      {/* MODAL 2: BOOKING / INQUIRY FORM */}
      {isBookingOpen && (
        <BookingForm
          initialCostume={bookingCostume}
          onClose={() => setIsBookingOpen(false)}
          onSuccess={(newInq) => {
            handleInquirySuccess(newInq);
          }}
        />
      )}

      {/* MODAL 3: GALLERY PHOTO LIGHTBOX */}
      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
          onNext={handleLightboxNext}
          onPrev={handleLightboxPrev}
        />
      )}

    </div>
  );
}
