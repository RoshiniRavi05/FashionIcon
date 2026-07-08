"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { journals, JournalArticle } from '@/data/journals';

// ─── FAQ COMPONENT ───
const faqs = [
  { q: 'How do I choose the right size?', a: 'Our garments are designed with deliberate, architectural proportions. We recommend selecting your true size for our signature oversized, boxy fit.' },
  { q: 'What materials are used in your garments?', a: 'We exclusively source premium 360gsm double-yarn combed cottons, selvedge denim from heritage mills in Japan, and technical performance blends.' },
  { q: 'How long does shipping take?', a: 'Domestic orders are typically delivered within 3-5 business days. International shipping requires 7-10 business days.' },
  { q: 'Can I exchange or return my order?', a: 'Yes. We accept returns and exchanges on unworn, unwashed items with original tags attached within 14 days of delivery.' }
];

const springConfig = { type: "spring" as const, stiffness: 400, damping: 30 };

const FAQItem = ({ faq, isOpen, onClick }: { faq: { q: string, a: string }, isOpen: boolean, onClick: () => void }) => {
  return (
    <motion.div 
      layout
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -2 }}
      className={`border border-white/5 hover:border-white/20 transition-all duration-300 px-8 rounded-sm mb-4 cursor-pointer group ${isOpen ? 'bg-[#0a0a0a] shadow-[0_10px_40px_rgba(0,0,0,0.6)] border-white/20' : 'bg-[#121212]'}`}
      onClick={onClick}
    >
      <motion.div layout="position" className="w-full py-6 flex justify-between items-center text-left">
        <motion.span 
          layout="position"
          animate={{ letterSpacing: isOpen ? "0.06em" : "0.03em" }}
          transition={springConfig}
          className="font-heading text-sm sm:text-base text-white uppercase group-hover:text-brand-red transition-colors duration-300"
        >
          {faq.q}
        </motion.span>
        <motion.div 
          layout="position"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={springConfig}
          className="relative w-4 h-4 ml-4 flex-shrink-0 text-white/50 group-hover:text-brand-red transition-colors"
        >
          <div className="w-full h-full group-hover:translate-x-[2px] transition-transform duration-300">
             <ArrowDown className="w-full h-full stroke-[1.5]" />
          </div>
        </motion.div>
      </motion.div>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div layout initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={springConfig} className="overflow-hidden">
            <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} exit={{ width: "0%" }} transition={{ duration: 0.4 }} className="h-[1px] bg-white/10 mb-6" />
            <motion.p initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.4, delay: 0.05 }} className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed pb-8 max-w-[800px]">
              {faq.a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── IMAGE PRESENTATION COMPONENTS ───
const ImageReveal = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 1.05 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const EditorialImage = ({ src, alt, className = "", objectPosition = "center center" }: { src: string, alt: string, className?: string, objectPosition?: string }) => (
  <div className={`relative overflow-hidden rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] group ${className}`}>
    <Image 
      src={src} 
      alt={alt} 
      fill 
      className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
      style={{ objectPosition }}
      sizes="(max-width: 768px) 100vw, 80vw"
    />
  </div>
);

// ─── EDITORIAL SPLIT COMPONENT ───
const EditorialSplit = ({ text, image, reverse = false }: { text: string, image: string, reverse?: boolean }) => (
  <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}>
      <div className="w-full md:w-1/2 flex justify-center">
        <ImageReveal className="w-full">
          {/* Portrait constraint: max-height 650px */}
          <EditorialImage src={image} alt="Editorial Split" className="w-full h-[60vh] max-h-[650px]" objectPosition="center center" />
        </ImageReveal>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center max-w-[500px]">
        <motion.p 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8 }}
          className="font-sans text-base md:text-lg text-white/80 leading-[2.2] tracking-wide"
        >
          {text}
        </motion.p>
      </div>
    </div>
  </div>
);

// ─── FABRIC DETAILS GRID ───
const FabricDetails = ({ images }: { images: [string, string] }) => (
  <div className="max-w-[1000px] mx-auto px-6 py-24 md:py-32">
    <motion.h3 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
      className="font-heading text-xs tracking-[0.2em] uppercase text-brand-red mb-16 text-center"
    >
      Fabric & Construction
    </motion.h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
      {images.map((src, idx) => (
        <ImageReveal key={idx} className={idx === 1 ? "md:mt-32" : ""}>
          {/* Gallery constraint: 400-500px */}
          <EditorialImage src={src} alt={`Fabric Detail ${idx}`} className="w-full h-[40vh] max-h-[500px]" objectPosition="center center" />
        </ImageReveal>
      ))}
    </div>
  </div>
);

// ─── RELATED JOURNALS ───
const RelatedJournals = ({ currentId, onOpenArticle }: { currentId: string, onOpenArticle: (id: string) => void }) => {
  const related = journals.filter(j => j.id !== currentId).slice(0, 3);
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-32 border-t border-white/10 mt-32">
      <h3 className="font-heading text-lg tracking-[0.2em] uppercase text-white mb-16 text-center">Related Reading</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((art, idx) => (
          <motion.article 
            key={art.id}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.1 }}
            onClick={() => onOpenArticle(art.id)}
            whileHover="hover"
            className="group cursor-pointer flex flex-col"
          >
            <div className="relative h-[400px] mb-6 overflow-hidden rounded-sm bg-[#121212]">
               <Image src={art.image} alt={art.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105 brightness-90 group-hover:brightness-100" style={{ objectPosition: "center center" }} />
            </div>
            <div className="mb-3 relative inline-block self-start">
              <h4 className="font-heading text-sm tracking-wider uppercase text-white group-hover:text-brand-red transition-colors duration-300">
                {art.title}
              </h4>
              <motion.div variants={{ rest: { scaleX: 0, originX: 0 }, hover: { scaleX: 1, originX: 0 } }} initial="rest" transition={{ duration: 0.4 }} className="absolute -bottom-1 left-0 w-full h-[1px] bg-brand-red" />
            </div>
            <p className="font-caption text-[10px] tracking-[0.2em] text-white/50 uppercase">{art.readTime}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

// ─── ARTICLE OVERLAY COMPONENT ───
const ArticleOverlay = ({ article, onClose, onOpenArticle }: { article: JournalArticle, onClose: () => void, onOpenArticle: (id: string) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-[#050505] overflow-y-auto overflow-x-hidden selection:bg-brand-red selection:text-white"
      ref={containerRef}
    >
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-[2px] bg-brand-red z-[110] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Back Button */}
      <div className="fixed top-8 left-6 md:left-12 z-[110] mix-blend-difference text-white">
        <button 
          onClick={onClose}
          className="group flex items-center space-x-3 font-heading text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-70 focus:outline-none"
        >
          <motion.div className="group-hover:-translate-x-2 transition-transform duration-300">
            <ArrowLeft className="w-4 h-4" />
          </motion.div>
          <span className="group-hover:opacity-50 transition-opacity duration-300">Back to Journal</span>
        </button>
      </div>

      {/* Morphing Cinematic Hero */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          layoutId={`journal-image-${article.id}`}
          className="absolute inset-0 z-0"
        >
          {/* Constrained hero: 80vh, center center focal point */}
          <motion.div initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} className="w-full h-full relative">
            <Image src={article.images.hero} alt={article.title} fill className="object-cover brightness-[0.4]" style={{ objectPosition: "center center" }} priority sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
          </motion.div>
        </motion.div>
        
        {/* Text Container: Max width 1100px */}
        <div className="relative z-10 w-full px-6 md:px-12 max-w-[1100px] mx-auto text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8 flex flex-wrap justify-center gap-6 font-caption text-[10px] tracking-[0.3em] text-white/90 uppercase font-bold"
          >
            <span className="text-brand-red">{article.category}</span>
            <span>{article.date}</span>
            <span>{article.readTime}</span>
          </motion.div>

          <motion.h1 
            layoutId={`journal-title-${article.id}`}
            className="font-hero tracking-tight uppercase text-white leading-[0.95] mb-12 whitespace-pre-wrap break-words"
            style={{ fontSize: "clamp(2.5rem, 12vw, 4rem)" }}
            // We use inline style for base, and tailwind classes for md/lg breakpoints to achieve the requested clamps
          >
            <span className="text-[clamp(2.5rem,12vw,4rem)] md:text-[clamp(4rem,8vw,7rem)] lg:text-[clamp(5rem,10vw,9rem)]">
              {article.title}
            </span>
          </motion.h1>

          <motion.p
             initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
             className="font-sans text-lg md:text-xl text-white/90 leading-[2] tracking-wide max-w-[600px] mx-auto"
          >
            {article.content.intro}
          </motion.p>
        </div>
      </section>

      {/* Editorial Content */}
      <article className="pb-32 bg-[#050505] relative z-10">

        {/* Text + Image Split Layout */}
        <EditorialSplit text={article.content.story} image={article.images.midShot} />

        {/* Animated Pull Quote */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="py-24 md:py-32 px-6 max-w-[1000px] mx-auto"
        >
          <motion.p
            initial={{ letterSpacing: "0.1em" }}
            whileInView={{ letterSpacing: "normal" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="font-hero text-3xl sm:text-5xl md:text-6xl text-center leading-[1.3] uppercase tracking-wide text-brand-red"
          >
            {article.pullQuote}
          </motion.p>
        </motion.div>

        {/* Fabric Details Grid */}
        <FabricDetails images={article.images.closeUps} />

        {/* Designer Notes (Second Text + Image Split, Reversed) */}
        <EditorialSplit text={article.content.behindTheCollection} image={article.images.lifestyle} reverse />

        {/* Final Wide Campaign Bleed */}
        <ImageReveal className="w-full mt-24 md:mt-32 max-w-[1600px] mx-auto px-6">
           {/* Large constraint: max-height 700px */}
           <div className="relative w-full h-[60vh] max-h-[700px]">
             <Image src={article.images.wideCampaign} alt="Wide Campaign" fill className="object-cover rounded-sm" sizes="100vw" style={{ objectPosition: "center center" }} />
           </div>
        </ImageReveal>

        {/* Related Journals Footer */}
        <RelatedJournals currentId={article.id} onOpenArticle={onOpenArticle} />

      </article>
    </motion.div>
  );
};

// ─── MAIN JOURNAL PAGE ───
export default function JournalPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Sync state with URL without triggering Next.js router reload
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/journal/')) {
        setSelectedId(path.replace('/journal/', ''));
      } else {
        setSelectedId(null);
      }
    };
    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openArticle = (id: string) => {
    setSelectedId(id);
    window.history.pushState({}, '', `/journal/${id}`);
  };

  const closeArticle = () => {
    setSelectedId(null);
    window.history.pushState({}, '', `/journal`);
  };

  const selectedArticle = journals.find(j => j.id === selectedId);

  return (
    <div className="bg-[#050505] min-h-screen py-20 px-6 md:px-12 max-w-[1600px] mx-auto space-y-20 relative selection:bg-brand-red selection:text-white">
      
      {/* Title */}
      <div className="space-y-4 pt-10">
        <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black">
          EDITORIAL ARCHIVES
        </span>
        <h1 className="font-hero text-3xl sm:text-5xl tracking-wide uppercase text-white">
          THE JOURNAL
        </h1>
        <p className="font-sans text-xs text-white/50 max-w-[520px] leading-relaxed">
          Deep-dives into styling theory, technical material log files, and behind-the-scenes production runs at ARC OPUS.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
        {journals.map((art, idx) => (
          <motion.article 
            key={art.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            onClick={() => openArticle(art.id)}
            whileHover="hover"
            className="group flex flex-col cursor-pointer"
          >
            {/* Card Lift Wrapper */}
            <motion.div 
              variants={{ hover: { y: -3 } }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col h-full"
            >
              {/* Image Box */}
              <div className="relative h-[400px] md:h-[500px] bg-[#121212] overflow-hidden rounded-sm">
                <motion.div 
                  layoutId={`journal-image-${art.id}`}
                  className="w-full h-full relative"
                >
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 brightness-90 group-hover:brightness-100"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectPosition: "center top" }}
                  />
                </motion.div>
                <span className="absolute top-6 left-6 font-caption text-[9px] tracking-[0.2em] text-white/90 bg-[#050505] px-3 py-1.5 uppercase font-bold z-10">
                  {art.category}
                </span>
              </div>

              {/* Content Details aligned to grid */}
              <div className="pt-8 flex flex-col flex-grow">
                <motion.div 
                  variants={{ hover: { opacity: 0.5 } }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center font-caption text-[9px] tracking-[0.2em] text-white/50 uppercase mb-4"
                >
                  <span>{art.date}</span>
                  <span>{art.readTime}</span>
                </motion.div>
                
                <div className="mb-4 relative inline-block self-start">
                  <motion.h2 
                    layoutId={`journal-title-${art.id}`}
                    className="font-heading text-lg sm:text-xl tracking-wider uppercase text-white group-hover:text-brand-red transition-colors duration-300"
                  >
                    {art.title}
                  </motion.h2>
                  {/* Animated Underline */}
                  <motion.div 
                    variants={{
                      rest: { scaleX: 0, originX: 0 },
                      hover: { scaleX: 1, originX: 0 }
                    }}
                    initial="rest"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -bottom-2 left-0 w-full h-[1px] bg-brand-red"
                  />
                </div>
                
                <p className="font-sans text-xs sm:text-sm text-white/50 leading-relaxed max-w-[450px] mt-2">
                  {art.excerpt}
                </p>
              </div>
            </motion.div>
          </motion.article>
        ))}
      </div>

      {/* FAQ SECTION */}
      <section className="pt-32 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-[800px] mx-auto space-y-16"
        >
          <div className="text-center space-y-4">
            <h2 className="font-hero text-2xl sm:text-4xl tracking-wide uppercase text-white">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="w-12 h-[1px] bg-brand-red mx-auto" />
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="flex flex-col">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} faq={faq} isOpen={openFaqIndex === idx} onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)} />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ARTICLE OVERLAY RENDERING */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleOverlay key="overlay" article={selectedArticle} onClose={closeArticle} onOpenArticle={openArticle} />
        )}
      </AnimatePresence>
    </div>
  );
}
