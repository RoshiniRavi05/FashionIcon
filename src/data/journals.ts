export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string; // Card image, corresponds to images.hero
  excerpt: string;
  content: {
    intro: string;
    story: string;
    materialNotes: string;
    behindTheCollection: string;
  };
  pullQuote: string;
  images: {
    hero: string;
    midShot: string;
    closeUps: [string, string];
    lifestyle: string;
    wideCampaign: string;
  };
}

export const journals: JournalArticle[] = [
  {
    id: "1",
    title: 'CAPSULE 01: BLUEPRINT DESIGN NOTES',
    category: 'Campaigns',
    date: 'JUNE 2026',
    readTime: '3 MIN READ',
    image: '/oversized_tee_hero.png',
    excerpt: 'An exploration of oversized silhouettes, heavyweight cotton, and timeless garment construction.',
    content: {
      intro: "Capsule 01 was born not from a desire to create another t-shirt, but to architect a garment that interacts structurally with the human form. Drawing inspiration from brutalist architecture, we approached the oversized tee as a geometric space.",
      story: "Every seam was drafted using proprietary skeleton mapping to create an imposing, structured top block without bunching. The mock-neck ribbing underwent twelve iterations to serve as a rigid anchor for the entire piece.",
      materialNotes: "We bypassed standard jersey in favor of a bespoke 360gsm double-yarn combed cotton. Significantly heavier than industry standards, this fabric provides the necessary density to hold its architectural shape while softening luxuriously against the skin.",
      behindTheCollection: "Our studio walls were covered in architectural blueprints, not fashion sketches. We wanted the wearer to feel enclosed in a perfectly measured space. Capsule 01 represents our unwavering commitment to clothing as structural design."
    },
    pullQuote: "We don't chase trends.\nWe engineer timeless garments.",
    images: {
      hero: "/oversized_tee_hero.png",
      midShot: "/denim_jacket_2.jpg",
      closeUps: ["/acid_wash_sneakers.png", "/denim_jacket_hero.jpg"],
      lifestyle: "/denim_jacket_2.jpg",
      wideCampaign: "/oversized_tee_hero.png"
    }
  },
  {
    id: "2",
    title: 'TACTICAL LAYERING STYLE GUIDE',
    category: 'Style Guide',
    date: 'MAY 2026',
    readTime: '2 MIN READ',
    image: '/denim_jacket_hero.jpg',
    excerpt: 'Redefining layering as a tactical exercise in proportion, geometry, and contrasting weight.',
    content: {
      intro: "Layering is often approached haphazardly, resulting in undefined silhouettes. Inspired by urban utility, this guide explores how heavy denim and structured cotton can be integrated into cohesive, sleek armor.",
      story: "We mapped the interaction zones between garments. How the cropped hem of a trucker jacket sits against an elongated tee dictated our modular layering system, turning disparate pieces into a unified structure.",
      materialNotes: "The key lies in contrasting textures. Combining the rough rigidity of 14oz selvedge denim with the dense drape of 360gsm cotton creates a striking visual tension without adding unnecessary bulk.",
      behindTheCollection: "Our editorial team spent days styling the same five garments, obsessed with finding the perfect balance of overlap and exposure. Mastering tactical layering is an exercise in deliberate assembly."
    },
    pullQuote: "Layering is not adding bulk.\nIt's assembling architecture.",
    images: {
      hero: "/denim_jacket_hero.jpg",
      midShot: "/oversized_tee_hero.png",
      closeUps: ["/denim_jacket_2.jpg", "/acid_wash_sneakers.png"],
      lifestyle: "/denim_jacket_hero.jpg",
      wideCampaign: "/denim_jacket_2.jpg"
    }
  },
  {
    id: "3",
    title: 'PORTUGAL MILL VISIT: TRACEABLE SOURCING',
    category: 'Ethos',
    date: 'APRIL 2026',
    readTime: '3 MIN READ',
    image: '/denim_jacket_2.jpg',
    excerpt: 'A visual diary of our journey to the historic family-owned mills weaving our signature cotton.',
    content: {
      intro: "True luxury cannot exist without transparency. We traveled to Portugal to build relationships with the artisans who share our obsession with structural integrity and material perfection.",
      story: "We partnered with a family-owned mill nestled in the hills, utilizing their decades of experience to weave a fabric that resists warping. The rhythmic clatter of the looms was intoxicating.",
      materialNotes: "The mill specializes in a double-yarn weaving technique. By twisting two fine yarns together before weaving, they engineer a fabric that is exceptionally dense and durable, finished with our custom bio-wash.",
      behindTheCollection: "Seeing raw cotton transform into our precise 360gsm fabric was a visceral reminder of the human effort woven into every piece. When you wear ARC OPUS, you wear a piece of textile history."
    },
    pullQuote: "True luxury is transparent.\nIt is woven with intent.",
    images: {
      hero: "/denim_jacket_2.jpg",
      midShot: "/acid_wash_sneakers.png",
      closeUps: ["/oversized_tee_hero.png", "/denim_jacket_hero.jpg"],
      lifestyle: "/denim_jacket_2.jpg",
      wideCampaign: "/oversized_tee_hero.png"
    }
  },
  {
    id: "4",
    title: 'THE GEOMETRIC AVATAR: STYLE SIMULATORS',
    category: 'Innovation',
    date: 'MARCH 2026',
    readTime: '4 MIN READ',
    image: '/acid_wash_sneakers.png',
    excerpt: 'Bridging the physical and digital with real-time WebGL configurators and structural rigging.',
    content: {
      intro: "The traditional online shopping experience is flat. We sought to bridge the gap between digital convenience and physical showroom tactility by creating a real-time, browser-based physics engine.",
      story: "Utilizing Three.js, we mapped the specific drape, weight, and tension of our 360gsm cotton onto a digital skeleton. When the avatar moves, the virtual fabric creases and folds exactly as its physical counterpart would.",
      materialNotes: "We captured ultra-high-resolution photogrammetry scans to create accurate normal maps. This allows the simulator to realistically render the interplay of light and shadow across heavy cotton and rigid denim.",
      behindTheCollection: "Merging high-fashion design with complex software engineering was a unique challenge. Seeing the digital fabric hold its boxy silhouette perfectly was a moment of true validation for our digital and physical teams."
    },
    pullQuote: "Bridging the physical and digital.\nEngineering a new reality.",
    images: {
      hero: "/acid_wash_sneakers.png",
      midShot: "/denim_jacket_hero.jpg",
      closeUps: ["/denim_jacket_2.jpg", "/oversized_tee_hero.png"],
      lifestyle: "/acid_wash_sneakers.png",
      wideCampaign: "/denim_jacket_hero.jpg"
    }
  }
];
