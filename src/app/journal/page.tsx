"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const articles = [
    {
      id: 1,
      title: 'CAPSULE 01: BLUEPRINT DESIGN NOTES',
      category: 'Campaigns',
      date: 'JUNE 2026',
      image: '/oversized_tee_hero.png',
      excerpt: 'Detailing the structural drafting, mock-neck ribbing dimensions, and fabric selection processes behind our heavyweight tee releases.'
    },
    {
      id: 2,
      title: 'TACTICAL LAYERING STYLE GUIDE',
      category: 'Style Guide',
      date: 'MAY 2026',
      image: '/denim_jacket_hero.jpg',
      excerpt: 'Explore how to combine oversized organic tees, tactical utility cargo bottoms, and heavy denim truckers to achieve sleek architectural silhouettes.'
    },
    {
      id: 3,
      title: 'PORTUGAL MILL VISIT: TRACEABLE SOURCING',
      category: 'Ethos',
      date: 'APRIL 2026',
      image: '/denim_jacket_2.jpg',
      excerpt: 'A behind-the-scenes logging of our manufacturing trip to the family-owned mills weaving our signature 360gsm double-yarn combed cotton.'
    },
    {
      id: 4,
      title: 'THE GEOMETRIC AVATAR: STYLE SIMULATORS',
      category: 'Innovation',
      date: 'MARCH 2026',
      image: '/acid_wash_sneakers.png',
      excerpt: 'A look into how WebGL and Three.js skeleton rigging is bringing physical high-end showroom configurators directly to browsers.'
    }
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {articles.map((art, idx) => (
          <motion.article 
            key={art.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group flex flex-col space-y-6"
          >
            {/* Image Box */}
            <div className="relative h-[360px] bg-[#121212] overflow-hidden border border-white/5">
              <Image
                src={art.image}
                alt={art.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-75 group-hover:brightness-50"
              />
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
              <h2 className="font-heading text-lg tracking-wider text-white uppercase group-hover:text-brand-red transition-colors duration-300">
                {art.title}
              </h2>
              <p className="font-sans text-xs text-white/50 leading-relaxed">
                {art.excerpt}
              </p>

              <div className="pt-2">
                <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-brand-red transition-colors flex items-center space-x-2 w-fit">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </motion.article>
        ))}
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

    </div>
  );
}
