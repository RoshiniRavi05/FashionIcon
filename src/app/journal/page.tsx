"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { journals } from '@/data/journals';

const faqs = [
  { q: 'How do I choose the right size?', a: 'Our garments are designed with deliberate, architectural proportions. We recommend selecting your true size for our signature oversized, boxy fit. Detailed measurements are provided on each product page for precise tailoring insights.' },
  { q: 'What materials are used in your garments?', a: 'We exclusively source premium 360gsm double-yarn combed cottons, selvedge denim from heritage mills in Japan, and technical performance blends. Every fabric is chosen for structural integrity and long-term durability.' },
  { q: 'How long does shipping take?', a: 'Each piece undergoes a final quality inspection before dispatch. Domestic orders are typically delivered within 3-5 business days. International shipping requires 7-10 business days. Expedited options are available at checkout.' },
  { q: 'Can I exchange or return my order?', a: 'Yes. We accept returns and exchanges on unworn, unwashed items with original tags attached within 14 days of delivery. Custom configurator pieces are final sale due to their personalized nature.' },
  { q: 'How should I care for my clothing?', a: 'To preserve the premium fabrics and garment structure, we recommend machine washing cold on a gentle cycle and laying flat to dry. Avoid high heat and harsh chemical detergents.' },
  { q: 'Do you restock sold-out collections?', a: 'Our capsule collections are strictly limited to prevent mass-production excess. However, core architectural silhouettes in standard colorways are occasionally replenished based on studio capacity.' },
  { q: 'Are your garments ethically produced?', a: 'Absolutely. We maintain a transparent supply chain, partnering exclusively with family-owned mills and production facilities in Portugal and Japan that ensure fair wages, safe conditions, and minimal environmental impact.' },
  { q: 'How can I contact customer support?', a: 'Our studio team is available via email at support@arcopus.studio. We aim to respond to all inquiries within 24 hours regarding sizing, orders, or styling guidance.' }
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
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      aria-expanded={isOpen}
    >
      <motion.div 
        layout="position"
        className="w-full py-6 flex justify-between items-center text-left outline-none"
      >
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
          className="relative w-4 h-4 ml-4 flex-shrink-0 text-white/50 group-hover:text-brand-red transition-colors duration-300"
        >
          <div className="w-full h-full group-hover:translate-x-[2px] transition-transform duration-300">
             <ArrowDown className="w-full h-full stroke-[1.5]" />
          </div>
        </motion.div>
      </motion.div>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springConfig}
            className="overflow-hidden"
          >
            {/* Editorial Divider */}
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              exit={{ width: "0%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] bg-white/10 mb-6"
            />
            {/* Answer */}
            <motion.p 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed pb-8 max-w-[800px]"
            >
              {faq.a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function JournalPage() {
  const router = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Custom Page Transition State
  const [transitioningId, setTransitioningId] = useState<string | null>(null);
  const [overlayPos, setOverlayPos] = useState({ top: 0, left: 0, width: 0, height: 0 });

  const handleArticleClick = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    if (transitioningId) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setOverlayPos({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    });
    setTransitioningId(id);

    // Wait 250ms for card animation, then 500ms for overlay expansion, then route
    setTimeout(() => {
      router.push(`/journal/${id}`);
    }, 850); 
  };

  return (
    <div className="bg-[#050505] min-h-screen py-20 px-6 md:px-12 max-w-[1600px] mx-auto space-y-20">
      
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        {journals.map((art, idx) => {
          const isTransitioning = transitioningId === art.id;
          return (
            <motion.article 
              key={art.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={(e) => handleArticleClick(e, art.id)}
              className="group flex flex-col space-y-6 cursor-pointer"
            >
              <motion.div 
                animate={{ y: isTransitioning ? -10 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full flex flex-col space-y-6"
              >
                {/* Image Box */}
                <div className="relative h-[360px] bg-[#121212] overflow-hidden border border-white/5">
                  <motion.div
                    className="w-full h-full relative"
                    animate={{ scale: isTransitioning ? 1.05 : 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-75 group-hover:brightness-50"
                    />
                  </motion.div>
                  <span className="absolute top-6 left-6 font-caption text-[9px] tracking-[0.2em] text-white/80 bg-[#050505] border border-white/10 px-3 py-1.5 uppercase font-bold">
                    {art.category}
                  </span>
                </div>

                {/* Content Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center font-caption text-[9px] tracking-widest text-white/40 uppercase">
                    <span>POSTED BY ARC OPUS EDITORIAL</span>
                    <span>{art.date}</span>
                  </div>
                  <motion.h2 
                    animate={{ color: isTransitioning ? "#C10E1D" : "#FFFFFF" }}
                    transition={{ duration: 0.25 }}
                    className="font-heading text-lg tracking-wider uppercase group-hover:text-brand-red transition-colors duration-300"
                  >
                    {art.title}
                  </motion.h2>
                  <p className="font-sans text-xs text-white/50 leading-relaxed">
                    {art.excerpt}
                  </p>

                  <div className="pt-2">
                    <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/70 flex items-center space-x-2 w-fit">
                      <motion.span 
                        animate={{ color: isTransitioning ? "#C10E1D" : "rgba(255,255,255,0.7)" }}
                        transition={{ duration: 0.25 }}
                        className="group-hover:text-brand-red transition-colors duration-300"
                      >
                        Read Article
                      </motion.span>
                      <motion.div
                        animate={{ x: isTransitioning ? 10 : 0, color: isTransitioning ? "#C10E1D" : "rgba(255,255,255,0.7)" }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="group-hover:text-brand-red transition-colors duration-300"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.div>
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          );
        })}
      </div>

      {/* ═══════════════════ FAQ SECTION ═══════════════════ */}
      <section className="pt-32 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[800px] mx-auto space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="font-hero text-2xl sm:text-4xl tracking-wide uppercase text-white">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="w-12 h-[1px] bg-brand-red mx-auto" />
            <p className="font-sans text-xs sm:text-sm text-white/50 leading-relaxed">
              Everything you need to know before choosing your next wardrobe essential.
            </p>
          </div>

          {/* Accordion Cards */}
          <motion.div 
            layout
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="flex flex-col"
          >
            {faqs.map((faq, idx) => (
              <FAQItem 
                key={idx} 
                faq={faq} 
                isOpen={openFaqIndex === idx} 
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)} 
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════ BLACKOUT TRANSITION OVERLAY ═══════════════════ */}
      {transitioningId && (
        <motion.div
          initial={{
            position: 'fixed',
            top: overlayPos.top,
            left: overlayPos.left,
            width: overlayPos.width,
            height: overlayPos.height,
            backgroundColor: '#000000',
            opacity: 0,
            zIndex: 9999
          }}
          animate={{
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            opacity: 1
          }}
          transition={{
            delay: 0.25, // Wait for the 250ms card animation to finish
            duration: 0.5,
            ease: [0.65, 0, 0.35, 1] // Elegant easeInOut
          }}
          className="pointer-events-none"
        />
      )}
    </div>
  );
}
