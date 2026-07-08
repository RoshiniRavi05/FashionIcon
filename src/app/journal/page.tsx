"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { journals } from '@/data/journals';

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

// ─── MAIN JOURNAL PAGE ───
export default function JournalPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
          <Link href={`/journal/${art.id}`} key={art.id} className="block">
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
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
                  <div className="w-full h-full relative">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 brightness-90 group-hover:brightness-100"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectPosition: "center top" }}
                    />
                  </div>
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
                    <h2 
                      className="font-heading text-lg sm:text-xl tracking-wider uppercase text-white group-hover:text-brand-red transition-colors duration-300"
                    >
                      {art.title}
                    </h2>
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
          </Link>
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
    </div>
  );
}
