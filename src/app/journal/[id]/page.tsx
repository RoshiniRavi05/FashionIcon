"use client";

import React, { use, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound, useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { journals, JournalArticle } from '@/data/journals';

// ─── ANIMATION WRAPPER ───
const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const RevealText = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── PARALLAX & BLOOM IMAGE ───
const ParallaxImage = ({ src, alt, className = "", imgClassName = "", priority = false }: { src: string, alt: string, className?: string, imgClassName?: string, priority?: boolean }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  // Extremely subtle parallax so it doesn't break Rectangles.fm calm aesthetic
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div ref={ref} className={`w-full overflow-hidden flex justify-center group ${className}`}>
      <motion.div style={{ y }} className="w-full relative flex justify-center">
        <Image 
          src={src} 
          alt={alt} 
          width={2000} 
          height={2000} 
          className={`w-full h-auto object-contain transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] grayscale-[30%] brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.01] ${imgClassName}`} 
          sizes="(max-width: 768px) 100vw, 80vw"
          priority={priority}
        />
      </motion.div>
    </div>
  );
};

// ─── ADAPTIVE UNCROPPED IMAGE ───
const UncroppedImage = ({ src, alt, className = "" }: { src: string, alt: string, className?: string }) => (
  <div className={`py-[80px] ${className}`}>
    <ParallaxImage src={src} alt={alt} imgClassName="max-h-[90vh]" priority />
  </div>
);

// ─── IMAGE LAYOUTS ───

// Section 2: Two-column gallery
const TwoColumnGallery = ({ images }: { images: [string, string] }) => (
  <div className="w-full max-w-[1400px] mx-auto pt-[120px] pb-[120px] md:pt-[180px] md:pb-[180px]">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px] items-center">
      <Reveal className="w-full">
        <ParallaxImage src={images[0]} alt="Gallery Left" imgClassName="max-h-[85vh]" />
      </Reveal>
      <Reveal className="w-full md:mt-[120px]" delay={0.2}>
        <ParallaxImage src={images[1]} alt="Gallery Right" imgClassName="max-h-[85vh]" />
      </Reveal>
    </div>
  </div>
);

// Section 3: Portrait image
const PortraitImage = ({ src, alt }: { src: string, alt: string }) => (
  <div className="w-full max-w-[1400px] mx-auto pt-[120px] pb-[120px] md:pt-[180px] md:pb-[180px] flex justify-center relative">
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10"></div>
    <Reveal className="w-full max-w-[600px] bg-[#050505] p-8">
      <ParallaxImage src={src} alt={alt} imgClassName="max-h-[90vh]" />
    </Reveal>
  </div>
);

// Section 4: Three-image grid
const ThreeColumnGrid = ({ image1, image2, image3 }: { image1: string, image2: string, image3: string }) => (
  <div className="w-full max-w-[1400px] mx-auto pt-[120px] pb-[120px] md:pt-[180px] md:pb-[180px]">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px] items-center">
      <Reveal><ParallaxImage src={image1} alt="Grid 1" imgClassName="max-h-[70vh]" /></Reveal>
      <Reveal delay={0.15}><ParallaxImage src={image2} alt="Grid 2" imgClassName="max-h-[70vh]" /></Reveal>
      <Reveal delay={0.3}><ParallaxImage src={image3} alt="Grid 3" imgClassName="max-h-[70vh]" /></Reveal>
    </div>
  </div>
);

// Section 5: Wide campaign image
const WideCampaign = ({ src, alt }: { src: string, alt: string }) => (
  <div className="w-full max-w-[1600px] mx-auto pt-[120px] pb-[120px] md:pt-[180px] md:pb-[180px]">
    <Reveal className="w-full relative">
      <ParallaxImage src={src} alt={alt} imgClassName="max-h-[90vh]" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-red/50"></div>
    </Reveal>
  </div>
);

// ─── RELATED JOURNALS ───
const RelatedJournals = ({ currentId }: { currentId: string }) => {
  const router = useRouter();
  const related = journals.filter(j => j.id !== currentId).slice(0, 3);
  
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-[180px] mt-[120px] border-t border-white/10 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[40px] bg-brand-red/50"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[80px]">
        {related.map((art, idx) => (
          <Reveal key={art.id} delay={idx * 0.1}>
            <Link href={`/journal/${art.id}`} className="group cursor-pointer flex flex-col items-center text-center">
              <div className="w-full mb-[40px] flex justify-center">
                 <Image src={art.image} alt={art.title} width={800} height={1000} className="w-full h-auto object-contain max-h-[50vh] transition-all duration-[1200ms] opacity-60 grayscale-[50%] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-[1.02]" />
              </div>
              <h4 className="font-heading text-[18px] md:text-[20px] tracking-widest uppercase text-white mb-4 group-hover:text-brand-red transition-colors duration-500">
                {art.title}
              </h4>
              <p className="font-caption text-[11px] tracking-[0.2em] text-white/40 uppercase relative overflow-hidden">
                <span className="block group-hover:-translate-y-full transition-transform duration-500">{art.readTime}</span>
                <span className="absolute top-full left-0 block text-brand-red group-hover:-translate-y-full transition-transform duration-500">READ ARTICLE</span>
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  return journals.map((article) => ({
    id: article.id,
  }));
}

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const article = journals.find((j) => j.id === unwrappedParams.id);
  const router = useRouter();

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-brand-red selection:text-white font-sans text-white">
      
      {/* ─── HEADER ─── */}
      <div className="fixed top-8 left-8 md:left-12 z-50 mix-blend-difference text-white">
        <button 
          onClick={() => router.push('/journal')}
          className="group flex items-center space-x-4 font-heading text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-60 focus:outline-none"
        >
          <div className="group-hover:-translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-brand-red">
            <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
          </div>
          <span>Back to Journal</span>
        </button>
      </div>

      {/* ─── PAGE CONTAINER ─── */}
      <main className="w-full max-w-[1600px] mx-auto px-6 md:px-20 pt-[200px] pb-[100px]">
        
        {/* ─── HERO SECTION ─── */}
        <section className="w-full flex flex-col items-center text-center pb-[120px] md:pb-[180px] relative">
          
          <RevealText>
            <span className="font-caption text-[11px] md:text-[12px] tracking-[0.3em] text-white/50 uppercase block mb-[24px]">
              {article.category}
            </span>
          </RevealText>

          <RevealText delay={0.1}>
            <div className="flex justify-center items-center space-x-3 font-caption text-[11px] tracking-[0.2em] text-white/40 uppercase mb-[60px]">
              <span>{article.date}</span>
              <span className="w-1 h-1 rounded-full bg-brand-red/50"></span>
              <span>{article.readTime} read</span>
            </div>
          </RevealText>

          <RevealText delay={0.2}>
            <h1 className="font-hero text-[48px] md:text-[60px] lg:text-[72px] tracking-tight uppercase text-white leading-[1.1] max-w-[900px] mb-[60px] mx-auto relative group">
              {article.title}
              <div className="absolute -bottom-[30px] left-1/2 -translate-x-1/2 w-[1px] h-[40px] bg-brand-red/50 scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top"></div>
            </h1>
          </RevealText>

          <RevealText delay={0.3}>
            <p className="font-sans text-[18px] text-white/70 leading-[1.7] tracking-wide max-w-[700px] mx-auto mt-[40px]">
              {article.content.intro}
            </p>
          </RevealText>

          <div className="w-full mt-[120px]">
             {/* Section 1: Large Image */}
             <UncroppedImage src={article.images.hero} alt={article.title} />
          </div>
        </section>

        {/* ─── EDITORIAL RHYTHM ─── */}

        {/* Text Block */}
        <section className="py-[60px] px-6 relative">
          <RevealText>
            <p className="font-sans text-[18px] text-white/80 leading-[1.7] tracking-wide max-w-[700px] mx-auto text-center">
              {article.content.story}
            </p>
          </RevealText>
        </section>

        {/* Section 2: Two-column gallery */}
        <TwoColumnGallery images={[article.images.midShot, article.images.lifestyle]} />

        {/* Large Quote */}
        <section className="py-[120px] md:py-[180px] px-6 flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10"></div>
          <RevealText>
            <blockquote className="font-hero text-[32px] md:text-[40px] text-center leading-[1.4] uppercase tracking-wide text-white max-w-[900px] mx-auto bg-[#050505] p-8 shadow-2xl relative">
              <span className="text-brand-red block mb-6 text-6xl leading-[0]">"</span>
              {article.pullQuote}
            </blockquote>
          </RevealText>
        </section>

        {/* Section 3: Portrait image */}
        <PortraitImage src={article.images.closeUps[0]} alt="Detail Portrait" />

        {/* Text Block */}
        <section className="py-[60px] px-6">
          <RevealText>
             <p className="font-sans text-[18px] text-white/70 leading-[1.7] tracking-wide max-w-[700px] mx-auto text-center">
               {article.content.behindTheCollection}
             </p>
          </RevealText>
        </section>

        {/* Section 4: Three-image grid */}
        <ThreeColumnGrid 
          image1={article.images.closeUps[1]} 
          image2={article.images.midShot} 
          image3={article.images.lifestyle} 
        />

        {/* Section 5: Wide campaign image */}
        <WideCampaign src={article.images.wideCampaign} alt="Wide Campaign" />

        {/* Final Text Block */}
        <section className="py-[60px] px-6 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40px] h-[1px] bg-brand-red/50"></div>
          <RevealText>
             <h3 className="font-heading text-[12px] tracking-[0.25em] uppercase text-brand-red mb-[40px] text-center pt-8">
               Designer Notes
             </h3>
             <p className="font-sans text-[18px] text-white/60 leading-[1.7] tracking-wide max-w-[700px] mx-auto text-center">
               {article.content.materialNotes}
             </p>
          </RevealText>
        </section>

        {/* Related Journals */}
        <RelatedJournals currentId={article.id} />

      </main>
    </div>
  );
}
