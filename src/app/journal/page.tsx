"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { journals } from '@/data/journals';
import SmoothScrollProvider from '@/components/journal/SmoothScrollProvider';
import { ParallaxImage, Reveal, RevealText } from '@/components/journal/ArticleShared';

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
      className={`border border-white/5 hover:border-white/20 transition-all duration-300 px-8 rounded-sm mb-4 cursor-pointer group ${isOpen ? 'bg-[#0a0a0a] shadow-[0_10px_40px_rgba(0,0,0,0.6)] border-white/20' : 'bg-transparent'}`}
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

// ─── ASYMMETRICAL INDEX LAYOUT ───
export default function JournalPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // We assign specific layouts and images to each index item to create the asymmetrical editorial feel
  const articleLayouts = [
    {
      // 0: Massive Hero
      image: journals[0].images.hero,
      containerClasses: "w-full flex flex-col items-center max-w-[1400px] mx-auto",
      imageClasses: "w-full max-h-[85vh]",
      textClasses: "w-full text-center mt-12",
      parallaxOffset: 3
    },
    {
      // 1: Shifted Right Portrait
      image: journals[1].images.closeUps[0],
      containerClasses: "w-full flex flex-col items-end max-w-[1200px] mx-auto mt-[180px]",
      imageClasses: "w-[80%] md:w-[50%] max-h-[80vh]",
      textClasses: "w-[80%] md:w-[50%] text-left mt-12 pl-8 border-l border-brand-red",
      parallaxOffset: 8
    },
    {
      // 2: Shifted Left Landscape
      image: journals[2].images.midShot,
      containerClasses: "w-full flex flex-col items-start max-w-[1200px] mx-auto mt-[180px]",
      imageClasses: "w-[90%] md:w-[65%] max-h-[75vh]",
      textClasses: "w-[90%] md:w-[65%] text-left mt-12 pr-8",
      parallaxOffset: 5
    },
    {
      // 3: Centered Clinical
      image: journals[3].images.lifestyle,
      containerClasses: "w-full flex flex-col items-center max-w-[900px] mx-auto mt-[180px]",
      imageClasses: "w-full max-h-[90vh] border border-white/10",
      textClasses: "w-full text-center mt-12 border-t border-white/10 pt-8",
      parallaxOffset: 4
    }
  ];

  return (
    <SmoothScrollProvider>
      <div className="bg-[#050505] min-h-screen pb-32 selection:bg-brand-red selection:text-white font-sans text-white">
        
        {/* HEADER */}
        <section className="w-full flex flex-col items-center text-center pt-[180px] pb-[120px] px-6">
          <RevealText>
            <span className="font-caption text-[11px] md:text-[12px] tracking-[0.3em] text-brand-red uppercase block mb-[24px]">
              EDITORIAL ARCHIVES
            </span>
          </RevealText>
          <RevealText delay={0.1}>
            <h1 className="font-hero text-[48px] md:text-[60px] lg:text-[72px] tracking-tight uppercase text-white leading-[1.1] max-w-[900px] mb-[40px] mx-auto">
              THE JOURNAL
            </h1>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="font-sans text-[18px] text-white/50 leading-[1.7] tracking-wide max-w-[600px] mx-auto">
              Deep-dives into styling theory, technical material log files, and behind-the-scenes production runs at ARC OPUS.
            </p>
          </RevealText>
        </section>

        {/* ASYMMETRICAL EDITORIAL FEED */}
        <section className="w-full px-6 md:px-12 pb-[120px]">
          {journals.map((art, idx) => {
            const layout = articleLayouts[idx];
            return (
              <div key={art.id} className={layout.containerClasses}>
                <Reveal className="w-full relative">
                  <Link href={`/journal/${art.id}`} className="group block w-full relative">
                    {/* Abstract Line Connector between articles (skip first) */}
                    {idx > 0 && (
                      <div className="absolute -top-[180px] left-1/2 w-[1px] h-[100px] bg-white/10 -translate-x-1/2"></div>
                    )}
                    
                    <div className="relative w-full overflow-hidden">
                      <ParallaxImage 
                        src={layout.image} 
                        alt={art.title} 
                        className="w-full" 
                        imgClassName={layout.imageClasses} 
                        yOffset={layout.parallaxOffset}
                        priority={idx === 0}
                      />
                      {/* Overlay label */}
                      <div className="absolute top-8 left-8 mix-blend-difference z-10 pointer-events-none">
                        <span className="font-caption text-[10px] tracking-[0.2em] text-white/90 uppercase font-bold">
                          {art.category}
                        </span>
                      </div>
                    </div>

                    <div className={layout.textClasses}>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex-1">
                          <h2 className="font-heading text-[24px] md:text-[32px] tracking-widest uppercase text-white group-hover:text-brand-red transition-colors duration-500 mb-4">
                            {art.title}
                          </h2>
                          <div className="flex items-center space-x-3 font-caption text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4">
                            <span>{art.date}</span>
                            <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-brand-red transition-colors duration-500"></span>
                            <span>{art.readTime} read</span>
                          </div>
                        </div>
                        <div className="md:w-[40%] flex flex-col justify-between">
                          <p className="font-sans text-[14px] text-white/50 leading-[1.6] mb-6 md:mb-0">
                            {art.excerpt}
                          </p>
                          <div className="flex items-center space-x-2 text-brand-red font-caption text-[10px] tracking-[0.2em] uppercase mt-4 md:mt-0 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                            <span>Read Article</span>
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </div>
            );
          })}
        </section>

        {/* FAQ SECTION */}
        <section className="pt-[120px] pb-16 px-6 md:px-12 border-t border-white/10">
          <RevealText className="max-w-[800px] mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="font-hero text-[32px] md:text-[40px] tracking-wide uppercase text-white">
                Frequently Asked Questions
              </h2>
              <div className="w-12 h-[1px] bg-brand-red mx-auto" />
            </div>
            <div className="flex flex-col">
              {faqs.map((faq, idx) => (
                <FAQItem key={idx} faq={faq} isOpen={openFaqIndex === idx} onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)} />
              ))}
            </div>
          </RevealText>
        </section>
        
      </div>
    </SmoothScrollProvider>
  );
}
