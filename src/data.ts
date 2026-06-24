import { Category, Costume, GalleryItem, Testimonial, FAQItem } from './types';

export const BUSINESS_DETAILS = {
  name: "Kumkum Fancy Dress",
  tagline: "Your One-Stop Destination for Beautiful Fancy Dress Costumes",
  phone: "+91 93549 88422", // Updated with user's mobile number
  email: "info@kumkumfancydress.com",
  address: "Shop No. 12, Rainbow Kids Plaza, Sector 15, Near Sunshine High School, Mumbai, Maharashtra 400001",
  whatsappNumber: "919354988422", // Updated with user's mobile number (with country code, no +)
};

export const CATEGORIES: Category[] = [
  {
    id: "freedom-fighters",
    name: "Freedom Fighters Costumes",
    description: "Patriotic costumes of legendary heroes who shaped the nation. Perfect for Independence Day and Republic Day school functions.",
    image: "/src/assets/images/category_freedom_bose_1782282833016.jpg",
    icon: "ShieldAlert"
  },
  {
    id: "mythological",
    name: "Mythological Costumes",
    description: "Devotional and majestic costumes of Gods and Goddesses for Janmashtami, Diwali, Dusshera, and epic school acts.",
    image: "/src/assets/images/category_mythology_krishna_1782282817578.jpg",
    icon: "Sparkles"
  },
  {
    id: "animal-bird",
    name: "Animal & Bird Costumes",
    description: "Adorable, soft, and fluffy plush costumes of wildlife, farm animals, and colorful birds for kindergarten plays.",
    image: "/src/assets/images/category_animal_lion_1782282846999.jpg",
    icon: "PawPrint"
  },
  {
    id: "cartoon",
    name: "Cartoon Character Costumes",
    description: "Bring your favorite animated characters to life! Vibrant costumes of beloved superstars, superheroes, and princesses.",
    image: "https://picsum.photos/seed/cartoondress/600/450",
    icon: "Smile"
  },
  {
    id: "historical",
    name: "Historical Character Costumes",
    description: "Step back in time as noble kings, fierce queens, ancient philosophers, and emperors with authentic traditional royal garments.",
    image: "https://picsum.photos/seed/historicaldress/600/450",
    icon: "Crown"
  },
  {
    id: "festival-cultural",
    name: "Festival & Cultural Costumes",
    description: "Celebrate diversity with traditional folk dance costumes, festive wear, and regional attire from across the country.",
    image: "https://picsum.photos/seed/festivaldress/600/450",
    icon: "Music"
  },
  {
    id: "accessories",
    name: "Fancy Dress Accessories",
    description: "Add the perfect finishing touch with high-quality props, crowns, swords, masks, wings, and custom hand accessories.",
    image: "https://picsum.photos/seed/accessoriesdress/600/450",
    icon: "Wand2"
  }
];

export const COSTUMES: Costume[] = [
  // Freedom Fighters
  {
    id: "ff-bose",
    name: "Netaji Subhas Chandra Bose Costume",
    category: "freedom-fighters",
    image: "/src/assets/images/category_freedom_bose_1782282833016.jpg",
    priceRent: 350,
    priceBuy: 1200,
    sizes: ["S (3-5 Years)", "M (5-8 Years)", "L (8-12 Years)"],
    description: "Premium khaki freedom fighter military costume with standard polished buttons, shoulder badges, and cross belt.",
    accessoriesIncluded: ["Khaki Cap", "Round Spectacles Frame", "Khaki Belt"],
    materials: "Comfortable Breathable Cotton-Poly Blend",
    popularity: 5
  },
  {
    id: "ff-jhansi",
    name: "Rani Laxmi Bai (Jhansi Ki Rani) Costume",
    category: "freedom-fighters",
    image: "https://picsum.photos/seed/ranilaxmi/600/450",
    priceRent: 400,
    priceBuy: 1500,
    sizes: ["M (5-8 Years)", "L (8-12 Years)", "XL (12-15 Years)"],
    description: "Majestic warrior queen costume including custom pre-stitched Maharashtrian Nauvari saree, armor chest-piece, and traditional headgear.",
    accessoriesIncluded: ["Pre-stitched Saree", "Metallic Sword Prop", "Shield Prop", "Pearl Nose-ring"],
    materials: "Premium Art Silk & Polyester",
    popularity: 5
  },
  {
    id: "ff-gandhi",
    name: "Mahatma Gandhi Costume",
    category: "freedom-fighters",
    image: "https://picsum.photos/seed/gandhidress/600/450",
    priceRent: 250,
    priceBuy: 800,
    sizes: ["S (3-5 Years)", "M (5-8 Years)", "L (8-12 Years)"],
    description: "Simple, highly authentic, child-friendly cotton dhoti and shawl set to represent the Father of the Nation.",
    accessoriesIncluded: ["White Cotton Dhoti", "Sash / Shawl", "Round Wireframe Spectacles", "Wooden Walking Stick"],
    materials: "100% Pure Organic Khadi Cotton",
    popularity: 4
  },

  // Mythological
  {
    id: "myth-krishna",
    name: "Bal Krishna Premium Costume",
    category: "mythological",
    image: "/src/assets/images/category_mythology_krishna_1782282817578.jpg",
    priceRent: 450,
    priceBuy: 1600,
    sizes: ["S (2-4 Years)", "M (4-7 Years)", "L (7-10 Years)"],
    description: "Gorgeous yellow silk dhoti costume set with shimmering blue or yellow dupatta, decorated with pearls and gems.",
    accessoriesIncluded: ["Yellow Silk Dhoti", "Embellished Crown (Mukut)", "Real Peacock Feather", "Golden Bamboo Flute (Bansuri)", "Pearl Necklaces & Armlets"],
    materials: "Soft Silk & Brocade with Cotton Lining",
    popularity: 5
  },
  {
    id: "myth-hanuman",
    name: "Little Hanuman Warrior Costume",
    category: "mythological",
    image: "https://picsum.photos/seed/hanumandress/600/450",
    priceRent: 380,
    priceBuy: 1300,
    sizes: ["S (3-5 Years)", "M (5-8 Years)", "L (8-12 Years)"],
    description: "Vibrant red and orange dhotis with velvet chest cover piece, featuring printed motifs and soft attachable plush tail.",
    accessoriesIncluded: ["Red Dhoti", "Printed Chest Guard", "Golden Mace Prop (Gada)", "Hanuman Face Mask", "Plush Tail"],
    materials: "Breathable Satin & Soft Velvet",
    popularity: 5
  },

  // Animal & Bird
  {
    id: "ani-lion",
    name: "Fluffy Baby Lion Jumpsuit",
    category: "animal-bird",
    image: "/src/assets/images/category_animal_lion_1782282846999.jpg",
    priceRent: 300,
    priceBuy: 1100,
    sizes: ["XS (1.5-3 Years)", "S (3-5 Years)", "M (5-7 Years)"],
    description: "Ultra-cozy premium fleece plush jumpsuit featuring a detailed soft mane hood and velcro tail.",
    accessoriesIncluded: ["Full Lion Jumpsuit with Hood", "Attached Soft Tail"],
    materials: "Super Soft Hypoallergenic Fleece",
    popularity: 5
  },
  {
    id: "ani-peacock",
    name: "Majestic Indian Peacock Costume",
    category: "animal-bird",
    image: "https://picsum.photos/seed/peacockdress/600/450",
    priceRent: 350,
    priceBuy: 1400,
    sizes: ["S (3-5 Years)", "M (5-8 Years)", "L (8-12 Years)"],
    description: "Colorful blue and green costume representing the national bird, featuring fan-out lightweight feather wings.",
    accessoriesIncluded: ["Blue Velvet Top", "Green Feather Wing Cape", "Bird Head-cap"],
    materials: "Satin & Soft Organza",
    popularity: 4
  },

  // Cartoon Characters
  {
    id: "cart-spiderman",
    name: "Classic Superhero Spider Jumpsuit",
    category: "cartoon",
    image: "https://picsum.photos/seed/spidermandress/600/450",
    priceRent: 350,
    priceBuy: 1200,
    sizes: ["S (3-5 Years)", "M (5-8 Years)", "L (8-12 Years)"],
    description: "Perfect replica superhero suit with high-definition web patterns and breathable lightweight mask.",
    accessoriesIncluded: ["Full Jumpsuit with muscle padding", "Removable breathable face mask"],
    materials: "Vibrant Stretchable Lycra Spandex",
    popularity: 5
  },
  {
    id: "cart-fairy",
    name: "Sparkling Magical Fairy / Princess Gown",
    category: "cartoon",
    image: "https://picsum.photos/seed/fairydress/600/450",
    priceRent: 380,
    priceBuy: 1400,
    sizes: ["S (3-5 Years)", "M (5-8 Years)", "L (8-12 Years)"],
    description: "Layered tulle glitter pink gown featuring twinkling LED starry-lights inside the skirt.",
    accessoriesIncluded: ["Pink Starry Dress", "Detachable Butterfly Wings", "Silver Tiara", "Glowing Magic Wand"],
    materials: "Sparkly Mesh, Tulle & Smooth Satin Lining",
    popularity: 5
  },

  // Historical
  {
    id: "hist-shivaji",
    name: "Chhatrapati Shivaji Maharaj Costume",
    category: "historical",
    image: "https://picsum.photos/seed/shivajidress/600/450",
    priceRent: 450,
    priceBuy: 1800,
    sizes: ["M (5-8 Years)", "L (8-12 Years)", "XL (12-15 Years)"],
    description: "Grand Maratha warrior king attire featuring heavy brocade angrakha, pearl necklaces, and velvet turban (pagdi).",
    accessoriesIncluded: ["Brocade Royal Angrakha", "Churidar Pyjama", "Royal Velvet Pagdi", "Toy Maratha Talwar (Sword)", "Pearl Layered Malas"],
    materials: "Rich Brocade, Satin & Velvet",
    popularity: 5
  },

  // Festival & Cultural
  {
    id: "fest-kathakali",
    name: "Traditional Kathakali Dance Costume",
    category: "festival-cultural",
    image: "https://picsum.photos/seed/kathakalidress/600/450",
    priceRent: 500,
    priceBuy: 2200,
    sizes: ["M (5-8 Years)", "L (8-12 Years)"],
    description: "Stunning, authentic Kerala dance drama costume featuring the characteristic layered white/red skirt and intricate velvet crown.",
    accessoriesIncluded: ["Intricately Painted Headgear", "Layered Dance Skirt", "Heavy Ornaments set", "Ghungroo ankle bells"],
    materials: "Cotton, Velvet, Cardboard Crafts",
    popularity: 4
  },

  // Accessories
  {
    id: "acc-sword",
    name: "Kids Safe Imperial Sword & Shield Set",
    category: "accessories",
    image: "https://picsum.photos/seed/swordprop/600/450",
    priceRent: 100,
    priceBuy: 350,
    sizes: ["One Size"],
    description: "Highly detailed foam and plastic sword with medieval crest round shield. 100% lightweight and rounded for kid-safe play.",
    accessoriesIncluded: ["Gold-painted Sword", "Dragon-crest Shield with arm-loops"],
    materials: "Durable Lightweight Kid-Safe EVA Foam",
    popularity: 4
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Netaji Subhas Chandra Bose School Performance",
    category: "Freedom Fighters",
    image: "/src/assets/images/category_freedom_bose_1782282833016.jpg",
    description: "A proud moment from Sunshine High School's Annual Day parade."
  },
  {
    id: "g2",
    title: "Bal Krishna Janmashtami Celebrations",
    category: "Mythological",
    image: "/src/assets/images/category_mythology_krishna_1782282817578.jpg",
    description: "Cute little Kanha posing beautifully during the festival display."
  },
  {
    id: "g3",
    title: "The Jungle Book Kindergarten Act",
    category: "Animal & Bird",
    image: "/src/assets/images/category_animal_lion_1782282846999.jpg",
    description: "A happy little lion ready to roar on the school stage play."
  },
  {
    id: "g4",
    title: "Rani Laxmi Bai Stage Monologue",
    category: "Freedom Fighters",
    image: "https://picsum.photos/seed/gal4/800/600",
    description: "Fierce representation of the warrior queen in a local talent show."
  },
  {
    id: "g5",
    title: "Sparkling Fairy Princess Theme Birthday Party",
    category: "Cartoon & Fantasy",
    image: "https://picsum.photos/seed/gal5/800/600",
    description: "Smiles and magic wings on our cute clients during a magical theme birthday event."
  },
  {
    id: "g6",
    title: "Royal Chhatrapati Shivaji Coronation Reenactment",
    category: "Historical",
    image: "https://picsum.photos/seed/gal6/800/600",
    description: "Authentic royal attire for historical skits and cultural days."
  },
  {
    id: "g7",
    title: "Traditional Kashmiri Folk Costume",
    category: "Festival & Cultural",
    image: "https://picsum.photos/seed/gal7/800/600",
    description: "National integration themed group dance costume."
  },
  {
    id: "g8",
    title: "Magical Light-up Angel Wings and Tiara Set",
    category: "Accessories",
    image: "https://picsum.photos/seed/gal8/800/600",
    description: "Close-up of premium, glowing custom accessories for stage events."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Priya Sharma",
    role: "Mother of 6-year-old Aarav",
    content: "We were looking for a high-quality Subhas Chandra Bose costume last-minute for Aarav's school monologue. Kumkum Fancy Dress had the perfect fitting, clean ironed uniform, and extremely friendly service. Highly recommended!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    date: "August 14, 2025"
  },
  {
    id: "t2",
    name: "Rajesh Kulkarni",
    role: "School Annual Day Coordinator",
    content: "As a school event manager, renting costumes in bulk is always stressful. The team at Kumkum Fancy Dress provided custom sizes, hygienic materials, and marked each costume with labels for our entire class dance play. Fantastic support!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    date: "December 20, 2025"
  },
  {
    id: "t3",
    name: "Anjali Gupta",
    role: "Mother of 4-year-old Diya",
    content: "Diya wore the little lion costume for her fancy dress competition and won 1st prize! The plush fabric was super soft and didn't cause any itching. The rental pricing is incredibly reasonable and booking is hassle-free.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    date: "January 28, 2026"
  },
  {
    id: "t4",
    name: "Vikram Rathore",
    role: "Parent of 9-year-old Kabir",
    content: "The Chhatrapati Shivaji Maharaj outfit is simply majestic. The brocade fabric and velvet turban looked completely royal. Very clean, neatly packaged, and included all authentic accessories like the pearl necklaces and safe toy sword.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    date: "February 19, 2026"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Do you offer dry-cleaned and hygienic costumes?",
    answer: "Yes, hygiene is our absolute priority. Every single costume is thoroughly dry-cleaned, sanitized, and steam-ironed before it is handed over to the next customer."
  },
  {
    question: "What are the rules and duration for costume rentals?",
    answer: "Our standard rental period is 2 days (48 hours) - you pick it up the day before the function and return it the day after. Extended rentals can be arranged upon request at nominal charges."
  },
  {
    question: "Do you charge a security deposit for rentals?",
    answer: "Yes, a fully refundable nominal security deposit is collected at the time of pickup/delivery. This is returned to you instantly once the costume is returned in good condition."
  },
  {
    question: "Can we buy costumes permanently instead of renting?",
    answer: "Absolutely! We provide options to both rent and purchase brand-new costumes. You can check the purchase price listed alongside the rental price."
  },
  {
    question: "Do you provide customized fitting or alterations?",
    answer: "Yes, minor adjustments can be made by our in-house tailors at the time of trial to ensure the costume fits your child perfectly."
  }
];
