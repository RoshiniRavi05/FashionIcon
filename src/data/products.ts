export interface Product {
  id: number;
  category: string;
  subcat: string;
  name: string;
  price: string;
  image: string;
  hoverImage?: string;
  tag: string;
  stock: number;
  description?: string;
  details?: string[];
}

export const DEFAULT_PRODUCTS: Product[] = [
  // T-SHIRTS - Oversized (5 products)
  {
    id: 1,
    category: 't-shirts',
    subcat: 'oversized',
    name: "Cream Drop-Shoulder Heavyweight",
    price: "$45",
    image: "/oversized_tee_hero.png",
    hoverImage: "/tops-gemini/top-11.png",
    tag: "Best Seller",
    stock: 12,
    description: "An oversized luxury streetwear silhouette crafted from 360gsm double-yarn combed cotton. Drop-shoulder styling with a rigid mock-neck collar and minimalist design aesthetics.",
    details: ["100% Organic Heavyweight Cotton", "360gsm Double-Yarn Knit", "Preshrunk & Pigment Dyed", "Made in Portugal"]
  },
  {
    id: 2,
    category: 't-shirts',
    subcat: 'oversized',
    name: "Washed Sage Oversized Tee",
    price: "$50",
    image: "/tshirts/tshirt_oversized_sage.png",
    hoverImage: "/tops-gemini/top-14.png",
    tag: "",
    stock: 20,
    description: "An architectural garment featuring a signature vintage stone-wash treatment. The custom boxy fit drapes elegantly over the frame, adding structural character to minimal layers.",
    details: ["100% Combed Cotton", "280gsm Custom Weave", "Enzyme Washed for Softness", "Architectural Panel Seams"]
  },
  {
    id: 3,
    category: 't-shirts',
    subcat: 'oversized',
    name: "Acid Wash Boxy Fit",
    price: "$48",
    image: "/tshirts/tshirt_06_grunge.png",
    hoverImage: "/mens_acid.png",
    tag: "Trending",
    stock: 3,
    description: "A textured boxy tee featuring high-contrast acid wash patterns. This piece represents the raw energy of urban fashion grids combined with modern pattern craftsmanship.",
    details: ["100% Ring-Spun Cotton", "320gsm Heavyweight Jersey", "Individually Dyed (Unique Pattern)", "Ribbed Collar detailing"]
  },
  {
    id: 30,
    category: 't-shirts',
    subcat: 'oversized',
    name: "Lavender Cloud Oversized",
    price: "$42",
    image: "/tshirts/tshirt_05_cartoon.png",
    hoverImage: "/tshirts/tshirt_04_y2k.png",
    tag: "New Drop",
    stock: 15,
    description: "A pastel cloud-dyed oversized tee. Tailored to represent the playful futuristic mood of the brand, blending bold colors with elegant streetwear outlines.",
    details: ["100% Organic Cotton", "240gsm Lightweight Comfort", "Digital Print Details", "Silicone Washed"]
  },
  {
    id: 31,
    category: 't-shirts',
    subcat: 'oversized',
    name: "Minimal Cream Essential Tee",
    price: "$40",
    image: "/tshirts/tshirt_02_minimal.png",
    tag: "",
    stock: 25,
    description: "A foundational piece for any editorial outfit wardrobe. This minimal tee focuses strictly on luxury texture, pure cream hue, and clean neck seam finishing.",
    details: ["100% Premium Cotton", "220gsm French Terry Jersey", "Blind-Stitch Hems", "Reinforced Neckline"]
  },

  // T-SHIRTS - Graphic (5 products)
  {
    id: 4,
    category: 't-shirts',
    subcat: 'graphic',
    name: "Glitch Cyberpunk Tee",
    price: "$55",
    image: "/tshirts/tshirt_01_glitch.png",
    tag: "Hot",
    stock: 12,
    description: "A futuristic graphic tee utilizing complex digital distortion printing. Reflects the technological side of the ARC OPUS design house.",
    details: ["100% Combed Cotton", "300gsm Heavy Jersey", "Premium Screen Print", "Durable Double-Needle Stitching"]
  },
  {
    id: 5,
    category: 't-shirts',
    subcat: 'graphic',
    name: "Anime Panel Street Tee",
    price: "$52",
    image: "/tshirts/tshirt_03_anime.png",
    tag: "New Drop",
    stock: 8,
    description: "Designed for subculture integration, this shirt showcases conceptual anime layouts printed on premium midnight-black cotton blanks.",
    details: ["100% Organic Jersey Cotton", "260gsm Mid-Weight", "High-Resolution Graphic Print", "Side-Seam Construction"]
  },
  {
    id: 6,
    category: 't-shirts',
    subcat: 'graphic',
    name: "Y2K Flame Retro Tee",
    price: "$50",
    image: "/tshirts/tshirt_04_y2k.png",
    tag: "",
    stock: 20,
    description: "Evokes early digital nostalgia with chrome typography and flame highlights. Crafted for loose editorial draping.",
    details: ["100% Ringspun Cotton", "240gsm Knit", "High-Density Gel Print", "Distressed Details"]
  },
  {
    id: 7,
    category: 't-shirts',
    subcat: 'graphic',
    name: "Members Punk Club Graphic",
    price: "$48",
    image: "/graphic_tee_hero.jpg",
    tag: "Trending",
    stock: 14,
    description: "A vintage-inspired band silhouette. Features complex graphics across the chest and back representing architectural design theories.",
    details: ["100% Cotton", "300gsm Vintage Heavy Knit", "Plastisol Graphic Print", "Frayed Collar Trim"]
  },
  {
    id: 32,
    category: 't-shirts',
    subcat: 'graphic',
    name: "Dark Grunge Statement Tee",
    price: "$50",
    image: "/tshirts/tshirt_06_grunge.png",
    tag: "",
    stock: 10,
    description: "A distressed look graphic tee with subtle paint splatter details and raw edge construction.",
    details: ["100% Cotton French Terry", "280gsm Custom Wash", "Hand-Finished Distressing", "Breathable Material"]
  },

  // T-SHIRTS - Minimal (5 products)
  {
    id: 8,
    category: 't-shirts',
    subcat: 'minimal',
    name: "404 Error Tech Tee",
    price: "$45",
    image: "/tshirts/tshirt_07_tech.png",
    tag: "Essential",
    stock: 30,
    description: "A clean futuristic design with a minimal front barcode detail and coordinate tracking numbers printed on the reverse.",
    details: ["95% Cotton, 5% Elastane Blend", "280gsm Technical Knit", "Stretch Recovery Technology", "Heat-Pressed Detail"]
  },
  {
    id: 9,
    category: 't-shirts',
    subcat: 'minimal',
    name: "Heavyweight Blank White",
    price: "$35",
    image: "/tops-gemini/top-11.png",
    tag: "",
    stock: 40,
    description: "Pure, uninterrupted cotton structure. Provides the ideal clean background layer for complex trench coats or varsity jackets.",
    details: ["100% Organic Pima Cotton", "340gsm Rigid Fit", "Zero Branding", "Ribbed Crewneck"]
  },
  {
    id: 10,
    category: 't-shirts',
    subcat: 'minimal',
    name: "Relaxed Fit Basic Black",
    price: "$30",
    image: "/tops-gemini/top-8.png",
    tag: "",
    stock: 50,
    description: "A luxurious everyday classic. Refined over hundreds of iterations to achieve the perfect collar width and shoulder drop.",
    details: ["100% Combed Cotton", "200gsm Everyday Knit", "Ultra-Soft Touch Finish", "Interlock Seams"]
  },
  {
    id: 33,
    category: 't-shirts',
    subcat: 'minimal',
    name: "Monochrome Minimalist Tee",
    price: "$38",
    image: "/tops-gemini/top-9.png",
    tag: "",
    stock: 18,
    description: "Slightly cropped technical drape with structural side vents. Designed to align with tactical cargo systems.",
    details: ["90% Cotton, 10% Spandex", "250gsm Technical Jersey", "Side Ventilation Slits", "Ergonomic Shoulder Seams"]
  },
  {
    id: 34,
    category: 't-shirts',
    subcat: 'minimal',
    name: "Clean Sage Premium Tee",
    price: "$42",
    image: "/tops-gemini/top-14.png",
    tag: "Essential",
    stock: 22,
    description: "A premium solid sage green tee designed as an organic contrast item to offset dark graphite coordinates.",
    details: ["100% Pima Cotton", "260gsm Luxury Fabric", "Fade-Resistant Eco-Dyes", "Handmade Hem Stitching"]
  },

  // JACKETS - Denim
  {
    id: 11,
    category: 'jackets',
    subcat: 'denim-jackets',
    name: "Stay Positive Denim Trucker",
    price: "$120",
    image: "/denim_jacket_hero.jpg",
    tag: "Hot",
    stock: 12,
    description: "A bold denim statement piece featuring vintage hand-painted editorial lettering across the back panel and custom silver buttons.",
    details: ["14oz Selvedge Denim", "100% Rigid Indigo Cotton", "Hand-Splattered details", "Embossed Silver Hardware"]
  },
  {
    id: 12,
    category: 'jackets',
    subcat: 'denim-jackets',
    name: "Minimal Raw Denim Trucker",
    price: "$110",
    image: "/shirts/denim_trucker.png",
    tag: "",
    stock: 5,
    description: "Architectural raw selvedge denim jacket focusing on clean geometrical pocket flaps and contrasting orange stitching details.",
    details: ["13.5oz Raw Japanese Selvedge", "Unwashed (Breaks in uniquely)", "Geometrical Hidden Pockets", "Reinforced Rivets"]
  },
  {
    id: 13,
    category: 'jackets',
    subcat: 'denim-jackets',
    name: "Archive Vintage Denim Jacket",
    price: "$140",
    image: "/denim_jacket_2.jpg",
    tag: "Best Seller",
    stock: 8,
    description: "A heavily washed, distressed denim trucker reminiscent of runway archival pieces. Features frayed hems and custom repairs.",
    details: ["12oz Washed Cotton Denim", "Intricate Distress & Repairs", "Warm Blanket Lining", "Side Waist Adjusters"]
  },

  // JACKETS - Printed/Other
  {
    id: 14,
    category: 'jackets',
    subcat: 'printed-jackets',
    name: "Oversized Bomber Jacket",
    price: "$120",
    image: "/shirts/bomber_jacket.png",
    tag: "",
    stock: 15,
    description: "A classic technical flight jacket. Features a water-repellent shell, safety orange lining, and a utility sleeve pocket system.",
    details: ["100% Water-Resistant Nylon", "Heavyweight Thermolite Padding", "Utility Flight Pocket on Sleeve", "Thick Ribbed Cuffs and Collar"]
  },
  {
    id: 15,
    category: 'jackets',
    subcat: 'printed-jackets',
    name: "Cropped Puffer Shell",
    price: "$155",
    image: "/shirts/puffer_jacket.png",
    tag: "New Drop",
    stock: 4,
    description: "A high-loft cropped down puffer with custom silver zip pulls and an architectural high-neck collar design.",
    details: ["Recycled Poly-Shell", "90/10 Premium Goose Down Fill", "Cropped, Cord-Adjustable Hem", "Waterproof Aquaguard Zips"]
  },
  {
    id: 16,
    category: 'jackets',
    subcat: 'printed-jackets',
    name: "Satin Varsity Jacket",
    price: "$165",
    image: "/shirts/varsity.png",
    tag: "",
    stock: 10,
    description: "Luxury collegiate varsity jacket constructed with premium satin shell panels and custom micro-embroidered brand iconography.",
    details: ["High-Gloss Premium Satin", "Quilted Inner Satin Lining", "Snap Button Closure", "Wool-Blend Ribbed Trims"]
  },
  {
    id: 17,
    category: 'jackets',
    subcat: 'printed-jackets',
    name: "Mountain Fleece Zip-Up",
    price: "$130",
    image: "/shirts/fleece_jacket.png",
    tag: "Hot",
    stock: 6,
    description: "Thick sherpa fleece designed for layering in extreme climates. Features black contrast nylon panels and zip chest compartments.",
    details: ["400gsm Sherpa Fleece", "Nylon Tactel Ripstop Panels", "YKK Vislon Zippers", "Drawcord Waist Configurator"]
  },
  {
    id: 18,
    category: 'jackets',
    subcat: 'printed-jackets',
    name: "Utility Field Jacket",
    price: "$140",
    image: "/shirts/utility_field.png",
    tag: "Trending",
    stock: 9,
    description: "A multi-pocket technical tactical field coat inspired by modular ACRONYM design systems. Features a detachable hood and stowaway straps.",
    details: ["Nylon Ripstop 3L Shell", "DWR Water-Repellent Treatment", "4 Cargo Storage Compartments", "Articulated Sleeves"]
  },

  // BOTTOMS (Cargo Pants, Jeans, Trousers)
  {
    id: 40,
    category: 'bottoms',
    subcat: 'cargo-pants',
    name: "Beige Utility Cargo Pants",
    price: "$140",
    image: "/bottoms/c1.png",
    tag: "Must Have",
    stock: 15,
    description: "Architectural cargo pants with 3D expandable utility pockets and adjustable ankle straps for a tapered or straight drape.",
    details: ["100% Cotton Ripstop", "Modular Ankle Adjusters", "Reinforced Knee Panels", "Dual Cargo Compartments"]
  },
  {
    id: 41,
    category: 'bottoms',
    subcat: 'cargo-pants',
    name: "Midnight Black Cargo Pants",
    price: "$140",
    image: "/bottoms/c3.png",
    tag: "",
    stock: 22,
    description: "Deep black technical trousers featuring stealth matte hardware and hidden modular security compartments.",
    details: ["Tactical Stretch Cotton", "Stealth Black Oxide Buckles", "Articulated Knees", "Zippered Side Pockets"]
  },
  {
    id: 42,
    category: 'bottoms',
    subcat: 'jeans',
    name: "Washed Blue Denim Jeans",
    price: "$110",
    image: "/jeans_501.png",
    tag: "Best Seller",
    stock: 18,
    description: "A vintage-cut washed denim with classic straight leg drape and customized hand-distressed details.",
    details: ["13oz Cotton Denim", "Classic 5-Pocket Setup", "Premium Leather Waist Patch", "Washed Indigo Hue"]
  },
  {
    id: 43,
    category: 'bottoms',
    subcat: 'jeans',
    name: "Washed Gray Straight Jeans",
    price: "$115",
    image: "/oversized_jeans.png",
    tag: "New",
    stock: 14,
    description: "Muted gray wash straight-fit jeans, designed to pair with graphic vintage tops and thick chelsea boots.",
    details: ["12.5oz Midweight Denim", "Stone Wash Finish", "Raw Edges", "Silver Rivets"]
  },
  {
    id: 44,
    category: 'bottoms',
    subcat: 'trousers',
    name: "Straight Fit Black Trousers",
    price: "$125",
    image: "/xx_chinos.png",
    tag: "",
    stock: 20,
    description: "Clean pleated trousers with a relaxed fit. Pairs beautifully with minimal tees and luxury bomber overlays.",
    details: ["Wool Blend Suiting Fabric", "Double Pleat Detail", "Welt Back Pockets", "Belt Loops"]
  },

  // FOOTWEAR (Sneakers, Boots)
  {
    id: 50,
    category: 'shoes',
    subcat: 'sneakers',
    name: "Arc Opus Classic Sneakers",
    price: "$180",
    image: "/acid_wash_sneakers.png",
    tag: "Essential",
    stock: 25,
    description: "Minimalist low-top sneakers constructed with Italian premium leather panels and a hand-stitched cupsole.",
    details: ["Full-Grain Calfskin Leather", "Italian Margom Rubber Sole", "Waxed Flat Cotton Laces", "Gold Foil Logo Details"]
  },
  {
    id: 51,
    category: 'shoes',
    subcat: 'boots',
    name: "Premium Leather Boots",
    price: "$240",
    image: "/bottoms/s2.png",
    tag: "Premium",
    stock: 10,
    description: "High-end black leather Chelsea boots featuring a thick architectural tread sole and premium elastic side panels.",
    details: ["Premium Nappa Leather Upper", "Lugged Commando Sole", "Elastic Side Gores", "Pull Tabs on Shaft"]
  },

  // COLLECTIONS (Streetwear Drops)
  {
    id: 19,
    category: 'collections',
    subcat: 'streetwear-drops',
    name: "Drop-Shoulder Flannel Shacket",
    price: "$90",
    image: "/shirts/flannel_shacket.png",
    tag: "Limited",
    stock: 20,
    description: "A heavyweight flannel shirt-jacket hybrid featuring premium buffalo plaid wool blends and deep chest pockets.",
    details: ["Wool-Cotton Blend Flannel", "Heavyweight Warmth layer", "Custom Horn Buttons", "Chest Patch Pockets"]
  },
  {
    id: 20,
    category: 'collections',
    subcat: 'streetwear-drops',
    name: "Glitch System Override Tee",
    price: "$55",
    image: "/tshirts/tshirt_01_glitch.png",
    tag: "Exclusive",
    stock: 5,
    description: "Exclusive limited run cyberpunk graphic tee featuring glowing green glitch patterns.",
    details: ["100% Heavyweight Cotton", "Luminous Ink detailing", "Special Edition packaging", "Reinforced seams"]
  },
  {
    id: 21,
    category: 'collections',
    subcat: 'streetwear-drops',
    name: "Y2K Flame Drop Tee",
    price: "$50",
    image: "/tshirts/tshirt_04_y2k.png",
    tag: "",
    stock: 15,
    description: "Archival drop edition of the classic flame aesthetic, representing modern luxury skate designs.",
    details: ["100% Combed Cotton", "Relaxed fit", "Embossed print", "Custom collar tag"]
  },

  // NEW DROP (Trending)
  {
    id: 22,
    category: 'new drop',
    subcat: 'trending',
    name: "Dark Grunge Chaos Tee",
    price: "$50",
    image: "/tshirts/tshirt_06_grunge.png",
    tag: "Just Dropped",
    stock: 12,
    description: "A raw wash graphic top that represents the underground techno culture, blending raw hems with luxury fabrics.",
    details: ["100% Organic Cotton", "Heavy distressed wash", "Hand-finished edge details", "Made in Italy"]
  },
  {
    id: 23,
    category: 'new drop',
    subcat: 'trending',
    name: "Anime Warrior Panel Tee",
    price: "$52",
    image: "/tshirts/tshirt_03_anime.png",
    tag: "New Drop",
    stock: 8,
    description: "A collector graphic tee featuring intricate line-art detailing inspired by archival manga panels.",
    details: ["100% Combed Cotton", "High density print", "Ultra-breathable feel", "Silicone pre-washed"]
  },
  {
    id: 24,
    category: 'new drop',
    subcat: 'trending',
    name: "Oversized Bomber Jacket",
    price: "$120",
    image: "/shirts/bomber_jacket.png",
    tag: "Hot",
    stock: 5,
    description: "Our signature oversized flight bomber jacket now available in limited slate grey colorways.",
    details: ["Military-Grade Satin Shell", "Dual Cargo Waist Pockets", "Lined Interior pocketing", "Double zippers"]
  }
];

export const NAV_MENUS = {
  't-shirts': [
    { title: 'Tees & Tops', links: [{ id: 'oversized', label: 'Oversized T-Shirts' }, { id: 'graphic', label: 'Graphic Tees' }, { id: 'minimal', label: 'Minimal Tees' }] }
  ],
  'jackets': [
    { title: 'Outerwear', links: [{ id: 'denim-jackets', label: 'Denim Jackets' }, { id: 'printed-jackets', label: 'Printed & Varsity' }] }
  ],
  'bottoms': [
    { title: 'Pants & Denim', links: [{ id: 'cargo-pants', label: 'Cargo Pants' }, { id: 'jeans', label: 'Jeans & Denim' }, { id: 'trousers', label: 'Trousers' }] }
  ],
  'shoes': [
    { title: 'Footwear', links: [{ id: 'sneakers', label: 'Sneakers' }, { id: 'boots', label: 'Boots' }] }
  ],
  'collections': [
    { title: 'Curated', links: [{ id: 'streetwear-drops', label: 'Streetwear Drops' }] }
  ],
  'new drop': [
    { title: 'Latest', links: [{ id: 'trending', label: 'Trending Now' }] }
  ]
};

export const parseProductFor3D = (product: Product | null) => {
  if (!product) return null;
  const name = product.name.toLowerCase();
  
  let type = 'tshirt';
  if (name.includes('oversized') || name.includes('drop-shoulder') || name.includes('boxy')) {
    type = 'oversizedTee';
  } else if (name.includes('hoodie')) {
    type = 'hoodie';
  } else if (name.includes('jacket') || name.includes('trucker') || name.includes('shacket') || name.includes('puffer') || name.includes('varsity') || name.includes('zip-up') || name.includes('fleece') || name.includes('bomber')) {
    type = 'jacket';
  } else if (name.includes('cargo') || name.includes('pants')) {
    type = 'cargoPants';
  } else if (name.includes('jeans')) {
    type = 'jeans';
  } else if (name.includes('trousers') || name.includes('chinos')) {
    type = 'trousers';
  } else if (name.includes('sneakers')) {
    type = 'sneakers';
  } else if (name.includes('boots')) {
    type = 'boots';
  } else if (product.category === 't-shirts') {
    type = 'tshirt';
  } else if (product.category === 'jackets') {
    type = 'jacket';
  } else if (product.category === 'bottoms') {
    type = 'cargoPants';
  } else if (product.category === 'shoes') {
    type = 'sneakers';
  }
  
  // Detect color
  let color = 'black';
  if (name.includes('cream') || name.includes('white') || name.includes('blank')) {
    color = 'cream';
  } else if (name.includes('sage') || name.includes('olive') || name.includes('green')) {
    color = 'sage';
  } else if (name.includes('lavender') || name.includes('purple')) {
    color = 'lavender';
  } else if (name.includes('beige') || name.includes('sand') || name.includes('tan')) {
    color = 'beige';
  } else if (name.includes('gray') || name.includes('grey') || name.includes('acid') || name.includes('washed')) {
    color = 'washedGray';
  } else if (name.includes('blue') || name.includes('navy')) {
    color = 'navy';
  }
  
  return { type, color };
};

export interface WornOutfit {
  top: Product | null;
  bottom: Product | null;
  outer: Product | null;
  shoes: Product | null;
}

/* Custom AI Outfit Compatibility Engine for Style Lab */
export const getAICompatibilityInfo = (gender: 'male' | 'female', wornOutfit: WornOutfit) => {
  const topProduct = parseProductFor3D(wornOutfit.top);
  const bottomProduct = parseProductFor3D(wornOutfit.bottom);
  const outerProduct = parseProductFor3D(wornOutfit.outer);
  const shoesProduct = parseProductFor3D(wornOutfit.shoes);
  
  const top = topProduct ? topProduct.type : 'none';
  const topCol = topProduct ? topProduct.color : 'none';
  const bottom = bottomProduct ? bottomProduct.type : 'none';
  const bottomCol = bottomProduct ? bottomProduct.color : 'none';
  const outer = outerProduct ? outerProduct.type : 'none';
  const shoes = shoesProduct ? shoesProduct.type : 'none';

  let score = 88;
  let colorHarmonyText = "Very Good";
  let styleMatchText = "Modern Casual";
  let recommended: any[] = [];

  // Color harmony logic
  if (topCol === 'cream' && bottomCol === 'beige') {
    score += 8;
    colorHarmonyText = "Excellent";
  } else if (topCol === 'black' || bottomCol === 'black') {
    score += 6;
    colorHarmonyText = "Sleek Contrast";
  } else if (topCol === 'sage' && bottomCol === 'beige') {
    score += 7;
    colorHarmonyText = "Organic Tones";
  } else if (topCol === 'lavender' && bottomCol === 'washedGray') {
    score += 8;
    colorHarmonyText = "Cyber Pastel";
  } else if (topCol === bottomCol && topCol !== 'black' && topCol !== 'none') {
    score -= 12;
    colorHarmonyText = "Flat Monochrome";
  }

  // Style match logic
  if (top === 'oversizedTee' && bottom === 'cargoPants') {
    score += 8;
    styleMatchText = "Street Luxury";
  } else if (top === 'shirt' && bottom === 'trousers') {
    score += 7;
    styleMatchText = "Classic Minimal";
  } else if (top === 'hoodie' && outer === 'jacket') {
    score += 6;
    styleMatchText = "Techwear Layered";
  } else if (shoes === 'sneakers' && top === 'oversizedTee') {
    score += 4;
  }

  score = Math.min(98, Math.max(45, score));

  // Determine dynamic recommendations based on selection
  if (top === 'oversizedTee' || top === 'tshirt') {
    recommended = [
      { id: 40, name: "Beige Utility Cargo Pants", price: "$140", image: "/bottoms/c1.png", category: "bottoms" },
      { id: 50, name: "Arc Opus Classic Sneakers", price: "$180", image: "/acid_wash_sneakers.png", category: "shoes" },
      { id: 41, name: "Midnight Black Cargo Pants", price: "$140", image: "/bottoms/c3.png", category: "bottoms" }
    ];
  } else if (top === 'hoodie') {
    recommended = [
      { id: 14, name: "Oversized Bomber Jacket", price: "$120", image: "/shirts/bomber_jacket.png", category: "jackets" },
      { id: 42, name: "Washed Blue Denim Jeans", price: "$110", image: "/jeans_501.png", category: "bottoms" },
      { id: 50, name: "Arc Opus Classic Sneakers", price: "$180", image: "/acid_wash_sneakers.png", category: "shoes" }
    ];
  } else if (top === 'shirt') {
    recommended = [
      { id: 44, name: "Straight Fit Black Trousers", price: "$125", image: "/xx_chinos.png", category: "bottoms" },
      { id: 51, name: "Premium Leather Boots", price: "$240", image: "/bottoms/s2.png", category: "shoes" }
    ];
  } else {
    recommended = [
      { id: 42, name: "Washed Blue Denim Jeans", price: "$110", image: "/jeans_501.png", category: "bottoms" },
      { id: 50, name: "Arc Opus Classic Sneakers", price: "$180", image: "/acid_wash_sneakers.png", category: "shoes" },
      { id: 1, name: "Cream Drop-Shoulder Heavyweight", price: "$45", image: "/oversized_tee_hero.png", category: "t-shirts" }
    ];
  }

  return {
    score,
    colorHarmony: colorHarmonyText,
    styleMatch: styleMatchText,
    recommendations: recommended
  };
};
