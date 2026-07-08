export interface JournalArticle {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  content: {
    intro: string;
    story: string;
    behindTheCollection: string;
    materialNotes: string;
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
    id: '1',
    category: 'Campaigns',
    date: 'June 2026',
    readTime: '3 min',
    title: 'CAPSULE 01: BLUEPRINT DESIGN NOTES',
    excerpt: 'An exploration of oversized silhouettes, heavyweight cotton, and timeless garment construction.',
    image: '/oversized_tee_hero.png',
    content: {
      intro: 'Capsule 01 was born to architect a garment that interacts structurally with the human form. Drawing inspiration from brutalist architecture, we approached the oversized tee as a geometric space.',
      story: 'Every seam was drafted using proprietary skeleton mapping to create an imposing, structured top block without bunching.',
      behindTheCollection: 'Our studio walls were covered in architectural blueprints, not fashion sketches. Capsule 01 represents our unwavering commitment to clothing as structural design.',
      materialNotes: 'We bypassed standard jersey in favor of a bespoke 360gsm double-yarn combed cotton. Extremely heavy, incredibly soft.',
    },
    pullQuote: 'We don\'t chase trends. We engineer timeless garments.',
    images: {
      hero: '/oversized_tee_hero.png',
      midShot: '/oversized_tee_back.png',
      closeUps: ['/denim_jacket_2.jpg', '/oversized_tee_hero.png'],
      lifestyle: '/black_hoodie_2.png',
      wideCampaign: '/acid_wash_sneakers.png'
    }
  },
  {
    id: '2',
    category: 'Style Guide',
    date: 'May 2026',
    readTime: '2 min',
    title: 'TACTICAL LAYERING STYLE GUIDE',
    excerpt: 'Redefining layering as a tactical exercise in proportion, geometry, and contrasting weight.',
    image: '/denim_jacket_hero.jpg',
    content: {
      intro: 'True layering is an exercise in proportion and geometry. It requires a foundational understanding of how fabrics interact, stack, and drape over one another.',
      story: 'By mixing structured outer shells with flowing internal layers, you create dynamic tension. The silhouette becomes three-dimensional.',
      behindTheCollection: 'We designed the collection as an ecosystem. The heavyweight selvedge jacket was cut precisely to expose the elongated hem of the inner jersey.',
      materialNotes: 'Contrasting weights are critical. Pairing rigid denim over a micro-modal creates a structured exterior with a fluid, breathable interior.',
    },
    pullQuote: 'Layering is not about warmth. It is about architectural depth.',
    images: {
      hero: '/denim_jacket_hero.jpg',
      midShot: '/denim_jacket_2.jpg',
      closeUps: ['/black_hoodie_2.png', '/acid_wash_sneakers.png'],
      lifestyle: '/oversized_tee_back.png',
      wideCampaign: '/oversized_tee_hero.png'
    }
  },
  {
    id: '3',
    category: 'Ethos',
    date: 'April 2026',
    readTime: '3 min',
    title: 'PORTUGAL MILL VISIT: TRACEABLE SOURCING',
    excerpt: 'A visual diary of our journey to the historic family-owned mills weaving our signature cotton.',
    image: '/denim_jacket_2.jpg',
    content: {
      intro: 'Traceability is not a buzzword; it is a prerequisite. We traveled to Guimarães, Portugal to document the entire lifecycle of our 360gsm cotton.',
      story: 'Generations of weaving expertise cannot be replicated. The loom tension here creates a fabric dense enough to hold structure yet soft enough to drape.',
      behindTheCollection: 'Sitting with the master weavers, we realized true luxury fashion is built in these noisy, dusty rooms.',
      materialNotes: 'The cotton undergoes a proprietary double-combing process, removing impurities and creating a smooth, pill-resistant surface.',
    },
    pullQuote: 'True luxury is built in dusty, noisy rooms.',
    images: {
      hero: '/denim_jacket_2.jpg',
      midShot: '/oversized_tee_hero.png',
      closeUps: ['/acid_wash_sneakers.png', '/black_hoodie_2.png'],
      lifestyle: '/denim_jacket_hero.jpg',
      wideCampaign: '/oversized_tee_back.png'
    }
  },
  {
    id: '4',
    category: 'Innovation',
    date: 'March 2026',
    readTime: '4 min',
    title: 'THE GEOMETRIC AVATAR: STYLE SIMULATORS',
    excerpt: 'Bridging the physical and digital with real-time WebGL configurators and structural rigging.',
    image: '/acid_wash_sneakers.png',
    content: {
      intro: 'Digital fashion should not be a gimmick. It should be a functional extension of physical styling. Our new 3D configurator brings the fitting room to the browser.',
      story: 'We spent months rigging the drape of our heavyweight cotton in WebGL. The physics had to mirror reality.',
      behindTheCollection: 'The goal was never to replace physical clothing, but to allow users to experiment with tactical layering before purchasing.',
      materialNotes: 'Rendering rigid denim versus soft modal required entirely different mathematical physics models.',
    },
    pullQuote: 'Digital fashion is a functional extension of physical styling.',
    images: {
      hero: '/acid_wash_sneakers.png',
      midShot: '/denim_jacket_hero.jpg',
      closeUps: ['/oversized_tee_hero.png', '/denim_jacket_2.jpg'],
      lifestyle: '/oversized_tee_back.png',
      wideCampaign: '/black_hoodie_2.png'
    }
  }
];
