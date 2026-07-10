export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: {
    intro: string;
    story: string;
    materialNotes: string;
    behindTheCollection: string;
  };
  pullQuote: string;
  images: {
    campaignBleed: string;
    gallery: [string, string];
  };
  metadata?: {
    coordinates?: string;
    edition?: string;
    location?: string;
  };
}

export const journals: JournalArticle[] = [
  {
    id: "1",
    title: 'CAPSULE 01',
    category: 'Campaigns',
    date: 'JUNE 2026',
    readTime: '01',
    image: '/oversized_tee_hero.png',
    excerpt: 'An exploration of oversized silhouettes and timeless garment construction.',
    content: {
      intro: "BLUEPRINT DESIGN NOTES\n\nArchitecture over fashion.\n\nStructure over drape.\n\nWe engineered a space for the human form.",
      story: "OBSERVATION\n\nConstruction before decoration.\n\nTwelve mock-neck iterations.\nZero compromises.",
      materialNotes: "360gsm Combed Cotton\n\nDouble-Yarn Construction\n\nRigid Structure\n\nBuilt to age beautifully.",
      behindTheCollection: "Not fashion sketches.\nArchitectural blueprints."
    },
    pullQuote: "We don't follow trends.\nWe engineer permanence.",
    images: {
      campaignBleed: "/denim_jacket_2.jpg",
      gallery: ["/oversized_tee_hero.png", "/acid_wash_sneakers.png"]
    },
    metadata: {
      coordinates: "40.7128° N, 74.0060° W",
      edition: "EDITION 01",
      location: "NEW YORK STUDIO"
    }
  },
  {
    id: "2",
    title: 'TACTICAL LAYERING',
    category: 'Style Guide',
    date: 'MAY 2026',
    readTime: '02',
    image: '/denim_jacket_hero.jpg',
    excerpt: 'Redefining layering as a tactical exercise in proportion and geometry.',
    content: {
      intro: "PROPORTION AND GEOMETRY\n\nModular systems.\n\nContrasting weights.\n\nAssembling architecture on the body.",
      story: "OBSERVATION\n\nTension between rigidity and drape.\n\nCropped hems against elongated lines.\n\nDeliberate assembly.",
      materialNotes: "14oz Selvedge Denim\n\nHeavyweight Cotton\n\nIndustrial Hardware\n\nMaximum durability.",
      behindTheCollection: "Layering is not adding bulk.\nIt's creating armor."
    },
    pullQuote: "Construction is\nour signature.",
    images: {
      campaignBleed: "/acid_wash_sneakers.png",
      gallery: ["/denim_jacket_hero.jpg", "/denim_jacket_2.jpg"]
    },
    metadata: {
      coordinates: "51.5074° N, 0.1278° W",
      edition: "EDITION 02",
      location: "LONDON STREETS"
    }
  },
  {
    id: "3",
    title: 'TRACEABLE SOURCING',
    category: 'Ethos',
    date: 'APRIL 2026',
    readTime: '03',
    image: '/denim_jacket_2.jpg',
    excerpt: 'A visual diary of our journey to the historic family-owned mills in Portugal.',
    content: {
      intro: "PORTUGAL, APRIL 2026\n\nLuxury begins at the source.\n\nEvery yarn.\nEvery stitch.\nEvery hand involved.",
      story: "OBSERVATION\n\nTexture before color.\n\nWe don't manufacture garments.\n\nWe build relationships with materials.",
      materialNotes: "14oz Selvedge Denim\n\n360gsm Cotton\n\nDouble-Yarn Construction\n\nBio-Washed Finish\n\nMade to age beautifully.",
      behindTheCollection: "The fabric remembers\nevery hand that touched it."
    },
    pullQuote: "Luxury is woven\nwith intention.",
    images: {
      campaignBleed: "/denim_jacket_hero.jpg",
      gallery: ["/denim_jacket_2.jpg", "/oversized_tee_hero.png"]
    },
    metadata: {
      coordinates: "41.1579° N, 8.6291° W",
      edition: "EDITION 03",
      location: "PORTO, PORTUGAL"
    }
  },
  {
    id: "4",
    title: 'THE GEOMETRIC AVATAR',
    category: 'Innovation',
    date: 'MARCH 2026',
    readTime: '04',
    image: '/acid_wash_sneakers.png',
    excerpt: 'Bridging the physical and digital with real-time WebGL configurators.',
    content: {
      intro: "DIGITAL PHYSICS\n\nBeyond flat imagery.\n\nReal-time tension.\n\nStructural rigging for the web.",
      story: "OBSERVATION\n\nWeight simulation.\n\nPhotogrammetry scans.\n\nThe tactile made virtual.",
      materialNotes: "WebGL Rendered\n\n3D Normal Mapping\n\nPhysics Engine\n\nDigital permanence.",
      behindTheCollection: "Bridging the physical\nand digital space."
    },
    pullQuote: "Engineering\na new reality.",
    images: {
      campaignBleed: "/oversized_tee_hero.png",
      gallery: ["/denim_jacket_hero.jpg", "/acid_wash_sneakers.png"]
    },
    metadata: {
      coordinates: "37.7749° N, 122.4194° W",
      edition: "EDITION 04",
      location: "SAN FRANCISCO R&D"
    }
  }
];
