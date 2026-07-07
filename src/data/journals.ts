export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: {
    inspiration: string[];
    designProcess: string[];
    materials: string[];
    stylingGuide: string[];
    behindTheCollection: string[];
    finalThoughts: string[];
  };
  pullQuote: string;
  images: {
    largeLeft: string;
    twoSideBySide: [string, string];
    fullscreen: string;
    portraitRight: string;
    fabricMacro: string;
    campaignWide: string;
  };
}

export const journals: JournalArticle[] = [
  {
    id: "1",
    title: 'CAPSULE 01: BLUEPRINT DESIGN NOTES',
    category: 'Campaigns',
    date: 'JUNE 2026',
    readTime: '5 MIN READ',
    image: '/oversized_tee_hero.png',
    excerpt: 'Detailing the structural drafting, mock-neck ribbing dimensions, and fabric selection processes behind our heavyweight tee releases.',
    content: {
      inspiration: [
        "The inception of Capsule 01 was born not from a desire to create another t-shirt, but to architect a garment that interacts structurally with the human form. We observed how traditional cotton drapes—often collapsing under its own weight or losing shape after minimal wear. We sought to defy this.",
        "Drawing inspiration from brutalist architecture and mid-century industrial design, we approached the oversized tee as a geometric space rather than a simple piece of clothing. The goal was to engineer a silhouette that maintains its rigid, bold posture while offering complete fluidity in motion."
      ],
      designProcess: [
        "Every seam was drafted using proprietary skeleton mapping. We spent weeks calculating the exact drop-shoulder angle required to create an imposing, structured top block without bunching under the arm.",
        "The mock-neck ribbing underwent twelve iterations. We needed a collar that sat high and tight, refusing to warp or stretch over time, acting as the structural anchor for the entire piece."
      ],
      materials: [
        "Material sourcing was our longest phase. We bypassed standard jersey in favor of a bespoke 360gsm double-yarn combed cotton. This fabric is significantly heavier than industry standards, providing the necessary density to hold our architectural shape.",
        "The cotton is treated with a specialized bio-wash, softening the rigid structure just enough to feel luxurious against the skin while maintaining its imposing drape."
      ],
      stylingGuide: [
        "Capsule 01 is designed to be the foundational layer of a technical wardrobe. Pair it with structured cargo trousers to balance the heavy top block, or layer it under a cropped jacket to let the elongated hem and mock-neck shine.",
        "For a minimalist approach, the tee stands entirely on its own—its stark geometry doing the heavy lifting for your silhouette."
      ],
      behindTheCollection: [
        "Our studio walls were covered in architectural blueprints, not fashion sketches. We wanted the wearer to feel enclosed in a perfectly measured space.",
        "There were moments of frustration when the heavy fabric fought against our intricate seam work, but the final garment—with its flawless, crisp lines—justified every late night."
      ],
      finalThoughts: [
        "Capsule 01 is not a seasonal release; it is a permanent installation in our permanent collection. It represents our commitment to clothing as structural design.",
        "We invite you to experience the weight, the cut, and the deliberate geometry of a garment engineered for perpetuity."
      ]
    },
    pullQuote: "We don't chase trends.\nWe engineer timeless garments.",
    images: {
      largeLeft: "/denim_jacket_2.jpg",
      twoSideBySide: ["/oversized_tee_hero.png", "/acid_wash_sneakers.png"],
      fullscreen: "/denim_jacket_hero.jpg",
      portraitRight: "/denim_jacket_2.jpg",
      fabricMacro: "/acid_wash_sneakers.png", // reusing existing assets for now
      campaignWide: "/oversized_tee_hero.png"
    }
  },
  {
    id: "2",
    title: 'TACTICAL LAYERING STYLE GUIDE',
    category: 'Style Guide',
    date: 'MAY 2026',
    readTime: '4 MIN READ',
    image: '/denim_jacket_hero.jpg',
    excerpt: 'Explore how to combine oversized organic tees, tactical utility cargo bottoms, and heavy denim truckers to achieve sleek architectural silhouettes.',
    content: {
      inspiration: [
        "Layering is often approached haphazardly, resulting in bulky, undefined silhouettes. We wanted to redefine layering as a tactical exercise in proportion and geometry.",
        "Inspired by urban utility and military precision, this guide explores how disparate elements—heavy denim, structured cotton, and technical fabrics—can be integrated into a cohesive, sleek armor."
      ],
      designProcess: [
        "We analyzed the interaction points between our core garments. How does the cropped hem of the denim trucker sit against the elongated tail of the oversized tee? How do the pocket placements on the cargo pants align with the natural resting position of the hands?",
        "By mapping these interaction zones, we developed a layering system that is both visually striking and ergonomically flawless."
      ],
      materials: [
        "The key to tactical layering lies in contrasting textures and weights. Combining the rough, structured rigidity of 14oz selvedge denim with the smooth, dense drape of 360gsm cotton creates a dynamic visual tension.",
        "We also explored the use of lightweight, breathable technical fabrics as base layers to regulate temperature without adding unnecessary bulk."
      ],
      stylingGuide: [
        "Start with the foundation: our structured mock-neck tee. Its high collar provides a sharp focal point. Layer the heavy denim trucker over top, allowing the tee's hem to extend past the jacket for a tiered effect.",
        "Complete the look with our utility cargo bottoms. The loose, articulated fit of the pants balances the heavy top block, creating a grounded, architectural silhouette."
      ],
      behindTheCollection: [
        "Our editorial team spent days in the studio styling and re-styling the same five garments. We were obsessed with finding the perfect balance of overlap and exposure.",
        "The breakthrough came when we stopped looking at the clothes individually and started treating them as modular components of a single, unified structure."
      ],
      finalThoughts: [
        "Mastering tactical layering is about understanding the geometry of your garments. It’s an exercise in deliberate assembly.",
        "We hope this guide inspires you to approach your wardrobe with a renewed sense of architectural purpose."
      ]
    },
    pullQuote: "Layering is not about adding bulk.\nIt's about assembling architecture.",
    images: {
      largeLeft: "/oversized_tee_hero.png",
      twoSideBySide: ["/denim_jacket_hero.jpg", "/denim_jacket_2.jpg"],
      fullscreen: "/acid_wash_sneakers.png",
      portraitRight: "/oversized_tee_hero.png",
      fabricMacro: "/denim_jacket_hero.jpg",
      campaignWide: "/denim_jacket_2.jpg"
    }
  },
  {
    id: "3",
    title: 'PORTUGAL MILL VISIT: TRACEABLE SOURCING',
    category: 'Ethos',
    date: 'APRIL 2026',
    readTime: '6 MIN READ',
    image: '/denim_jacket_2.jpg',
    excerpt: 'A behind-the-scenes logging of our manufacturing trip to the family-owned mills weaving our signature 360gsm double-yarn combed cotton.',
    content: {
      inspiration: [
        "True luxury cannot exist without transparency. We embarked on a journey to Portugal, not just to source fabric, but to build relationships with the artisans who share our obsession with structural integrity.",
        "This trip was driven by a desire to trace our materials back to their very origin, ensuring that every thread aligns with our rigorous standards of quality and ethics."
      ],
      designProcess: [
        "We spent weeks researching historical textile regions before selecting a family-owned mill nestled in the Portuguese hills. Their decades of experience in heavy-weight cotton weaving were exactly what our structural designs demanded.",
        "The process involved testing countless yarn twists and dye formulations to achieve the specific density and color depth required for our core collection."
      ],
      materials: [
        "The mill specializes in a double-yarn weaving technique. By twisting two fine yarns together before weaving, they create a fabric that is exceptionally dense, durable, and resistant to stretching or warping.",
        "We also finalized our custom bio-wash process during this visit, ensuring the fabric achieves a luxurious hand-feel without compromising its rigid drape."
      ],
      stylingGuide: [
        "While this journal focuses on sourcing, the resulting garments are designed for effortless, everyday wear. The superior fabric quality means these pieces require minimal styling—they command attention on their own.",
        "Let the texture and structure of the heavy cotton be the focal point. Pair these foundational pieces with simple, well-cut denim or tailored trousers."
      ],
      behindTheCollection: [
        "Walking the factory floor, the rhythmic clatter of the looms was intoxicating. We were humbled by the generational knowledge possessed by the technicians.",
        "Seeing the raw cotton transform into our precise 360gsm fabric was a visceral reminder of the human effort woven into every ARC OPUS garment."
      ],
      finalThoughts: [
        "Our commitment to traceable sourcing is unwavering. We will continue to seek out and partner with the finest artisans globally.",
        "When you wear our garments, you are not just wearing a design; you are wearing a piece of textile history."
      ]
    },
    pullQuote: "True luxury is transparent.\nIt is woven with intent and integrity.",
    images: {
      largeLeft: "/denim_jacket_hero.jpg",
      twoSideBySide: ["/denim_jacket_2.jpg", "/oversized_tee_hero.png"],
      fullscreen: "/denim_jacket_hero.jpg",
      portraitRight: "/acid_wash_sneakers.png",
      fabricMacro: "/denim_jacket_2.jpg",
      campaignWide: "/oversized_tee_hero.png"
    }
  },
  {
    id: "4",
    title: 'THE GEOMETRIC AVATAR: STYLE SIMULATORS',
    category: 'Innovation',
    date: 'MARCH 2026',
    readTime: '7 MIN READ',
    image: '/acid_wash_sneakers.png',
    excerpt: 'A look into how WebGL and Three.js skeleton rigging is bringing physical high-end showroom configurators directly to browsers.',
    content: {
      inspiration: [
        "The traditional online shopping experience is flat, static, and fundamentally flawed. We wanted to bridge the gap between digital convenience and physical showroom tactility.",
        "Inspired by advanced gaming engines and architectural visualization software, we set out to create a digital avatar that truly represents the structural geometry of our garments."
      ],
      designProcess: [
        "Our development team utilized WebGL and Three.js to construct a real-time, browser-based physics engine. We mapped the specific drape, weight, and tension of our 360gsm cotton onto a digital skeleton.",
        "The rigging process was incredibly complex. We had to ensure that when the digital avatar moved, the virtual fabric reacted exactly as its physical counterpart would—creasing, folding, and maintaining its boxy silhouette."
      ],
      materials: [
        "In the digital realm, 'materials' refer to textures and shaders. We captured ultra-high-resolution photogrammetry scans of our fabrics to create accurate normal and displacement maps.",
        "This allows the digital configurator to realistically simulate the interplay of light and shadow across the heavy cotton and rigid denim, revealing the true texture of the garments."
      ],
      stylingGuide: [
        "The simulator is designed to be an interactive styling tool. Users can mix and match garments, adjusting layers and viewing the silhouette from any angle.",
        "We encourage users to experiment with contrasting proportions in the simulator—pairing an oversized top with fitted bottoms, or vice versa—before making a physical purchase."
      ],
      behindTheCollection: [
        "Merging high-fashion design with complex software engineering was a unique challenge. Our fashion designers had to learn to speak the language of 3D modelers and physics programmers.",
        "The turning point came when we successfully simulated the rigid drape of our mock-neck tee. Seeing the digital fabric hold its shape perfectly was a moment of true validation."
      ],
      finalThoughts: [
        "The Geometric Avatar is just the beginning. We envision a future where digital and physical fashion are seamlessly integrated.",
        "By allowing our community to interact with the structural physics of our designs online, we are fostering a deeper understanding and appreciation of true garment architecture."
      ]
    },
    pullQuote: "Bridging the physical and digital.\nEngineering fashion for a new reality.",
    images: {
      largeLeft: "/acid_wash_sneakers.png",
      twoSideBySide: ["/denim_jacket_hero.jpg", "/oversized_tee_hero.png"],
      fullscreen: "/oversized_tee_hero.png",
      portraitRight: "/denim_jacket_2.jpg",
      fabricMacro: "/denim_jacket_hero.jpg",
      campaignWide: "/denim_jacket_2.jpg"
    }
  }
];
