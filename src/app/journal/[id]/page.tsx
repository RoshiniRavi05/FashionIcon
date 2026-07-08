"use client";

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { journals, JournalArticle } from '@/data/journals';

// ─── ANIMATION WRAPPER ───
const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── ADAPTIVE UNCROPPED IMAGE ───
// This component ensures the image is never cropped by using its natural aspect ratio.
// width/height serve as aspect ratio hints for Next.js, CSS makes it fluid.
const UncroppedImage = ({ src, alt, className = "" }: { src: string, alt: string, className?: string }) => (
  <div className={`w-full overflow-hidden flex justify-center ${className}`}>
    <Image 
      src={src} 
      alt={alt} 
      width={2000} // High res bounding box
      height={2000} 
      className="w-full h-auto object-contain max-h-[90vh]" 
      sizes="(max-width: 768px) 100vw, 80vw"
      priority // Hero images usually need priority, but Next.js will warn if we use it everywhere. It's fine for our layout.
    />
  </div>
);

// ─── EDITORIAL SPLIT COMPONENT ───
const EditorialSplit = ({ text, image, reverse = false }: { text: string, image: string, reverse?: boolean }) => (
  <div className="w-full max-w-[1400px] mx-auto px-6 py-20 md:py-32">
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}>
      <div className="w-full md:w-1/2 flex justify-center">
        <Reveal className="w-full">
          <UncroppedImage src={image} alt="Editorial Split" />
        </Reveal>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center max-w-[500px]">
        <Reveal>
          <p className="font-sans text-[18px] md:text-[20px] text-white/80 leading-[1.8] tracking-wide">
            {text}
          </p>
        </Reveal>
      </div>
    </div>
  </div>
);

// ─── TWO COLUMN GALLERY ───
const TwoColumnGallery = ({ images }: { images: [string, string] }) => (
  <div className="w-full max-w-[1400px] mx-auto px-6 py-20 md:py-32">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
      <Reveal className="w-full">
        <UncroppedImage src={images[0]} alt="Gallery Left" />
      </Reveal>
      <Reveal className="w-full md:mt-32">
        <UncroppedImage src={images[1]} alt="Gallery Right" />
      </Reveal>
    </div>
  </div>
);

// ─── THREE COLUMN DETAILS ───
const ThreeColumnDetails = ({ image1, image2, image3 }: { image1: string, image2: string, image3: string }) => (
  <div className="w-full max-w-[1400px] mx-auto px-6 py-20 md:py-32">
    <Reveal>
      <h3 className="font-heading text-xs tracking-[0.2em] uppercase text-brand-red mb-16 text-center">
        Construction Details
      </h3>
    </Reveal>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
      <Reveal><UncroppedImage src={image1} alt="Detail 1" /></Reveal>
      <Reveal delay={0.1}><UncroppedImage src={image2} alt="Detail 2" /></Reveal>
      <Reveal delay={0.2}><UncroppedImage src={image3} alt="Detail 3" /></Reveal>
    </div>
  </div>
);

// ─── RELATED JOURNALS ───
const RelatedJournals = ({ currentId }: { currentId: string }) => {
  const router = useRouter();
  const related = journals.filter(j => j.id !== currentId).slice(0, 3);
  
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-32 mt-32 border-t border-white/10">
      <h3 className="font-heading text-xl md:text-2xl tracking-[0.2em] uppercase text-white mb-20 text-center">
        Further Reading
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {related.map((art, idx) => (
          <Reveal key={art.id} delay={idx * 0.1}>
            <Link href={`/journal/${art.id}`} className="group cursor-pointer flex flex-col">
              <div className="w-full mb-8">
                 <UncroppedImage src={art.image} alt={art.title} className="transition-transform duration-1000 group-hover:scale-[1.02] opacity-90 group-hover:opacity-100" />
              </div>
              <div className="mb-4 relative inline-block self-start">
                <h4 className="font-heading text-base md:text-lg tracking-wider uppercase text-white group-hover:text-brand-red transition-colors duration-300">
                  {art.title}
                </h4>
              </div>
              <p className="font-caption text-[10px] tracking-[0.2em] text-white/50 uppercase">{art.readTime}</p>
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
  // Next.js 15+ async params handling
  const unwrappedParams = use(params);
  const article = journals.find((j) => j.id === unwrappedParams.id);
  const router = useRouter();

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-brand-red selection:text-white">
      
      {/* ─── BACK BUTTON ─── */}
      <div className="fixed top-8 left-6 md:left-12 z-50 mix-blend-difference text-white">
        <button 
          onClick={() => router.push('/journal')}
          className="group flex items-center space-x-3 font-heading text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-70 focus:outline-none"
        >
          <div className="group-hover:-translate-x-2 transition-transform duration-300">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span>Back</span>
        </button>
      </div>

      {/* ─── PAGE CONTAINER ─── */}
      <main className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-32 pb-32">
        
        {/* ─── HERO SEQUENCE ─── */}
        <section className="w-full flex flex-col items-center text-center pb-20 md:pb-32">
          {/* Label */}
          <Reveal>
            <span className="font-caption text-[10px] md:text-xs tracking-[0.3em] text-brand-red uppercase font-bold mb-8 block">
              {article.category}
            </span>
          </Reveal>

          {/* Title: 48-72px limits */}
          <Reveal delay={0.1}>
            <h1 className="font-hero text-5xl md:text-6xl lg:text-[72px] tracking-tight uppercase text-white leading-[1.1] max-w-[1100px] mb-8">
              {article.title}
            </h1>
          </Reveal>

          {/* Metadata */}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-caption text-[10px] md:text-xs tracking-[0.2em] text-white/50 uppercase mb-16">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime} read</span>
            </div>
          </Reveal>

          {/* Intro Paragraph (Max 700px reading width) */}
          <Reveal delay={0.3}>
            <p className="font-sans text-[18px] md:text-[20px] text-white/90 leading-[1.8] tracking-wide max-w-[700px] mx-auto mb-20 md:mb-32">
              {article.content.intro}
            </p>
          </Reveal>

          {/* Large Hero Image (Uncropped) */}
          <Reveal delay={0.4} className="w-full max-w-[1400px]">
            <UncroppedImage src={article.images.hero} alt={article.title} />
          </Reveal>
        </section>

        {/* ─── EDITORIAL RHYTHM ─── */}

        {/* Short Paragraph */}
        <section className="py-20 md:py-32 px-6">
          <Reveal>
            <p className="font-sans text-[18px] md:text-[20px] text-white/80 leading-[1.8] tracking-wide max-w-[700px] mx-auto text-center">
              {article.content.story}
            </p>
          </Reveal>
        </section>

        {/* Two-Column Gallery */}
        <TwoColumnGallery images={[article.images.midShot, article.images.lifestyle]} />

        {/* Large Quote */}
        <section className="py-24 md:py-48 px-6">
          <Reveal>
            <p className="font-hero text-3xl md:text-[40px] text-center leading-[1.4] uppercase tracking-wide text-brand-red max-w-[1000px] mx-auto">
              {article.pullQuote}
            </p>
          </Reveal>
        </section>

        {/* Image Left + Text Right Split */}
        <EditorialSplit text={article.content.behindTheCollection} image={article.images.wideCampaign} />

        {/* Three-Image Grid Details */}
        <ThreeColumnDetails 
          image1={article.images.closeUps[0]} 
          image2={article.images.closeUps[1]} 
          image3={article.images.hero} // Reusing for demo purposes as we only have 2 closeups
        />

        {/* Designer Notes */}
        <section className="py-20 md:py-32 px-6">
          <Reveal>
             <h3 className="font-heading text-xs md:text-sm tracking-[0.2em] uppercase text-white mb-10 text-center">
               Designer Notes
             </h3>
             <p className="font-sans text-[18px] md:text-[20px] text-white/70 leading-[1.8] tracking-wide max-w-[700px] mx-auto text-center">
               {article.content.materialNotes}
             </p>
          </Reveal>
        </section>

        {/* Related Journals */}
        <RelatedJournals currentId={article.id} />

      </main>
    </div>
  );
}
