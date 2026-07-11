"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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

// ─── MAGAZINE SPREAD OVERLAY COMPONENT ───
const ArticleOverlay = ({ article, onClose }: { article: JournalArticle, onClose: () => void }) => {
  useEffect(() => {
    // Lock body scroll while overlay is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#0c0c0c] overflow-y-auto lg:overflow-hidden selection:bg-brand-red selection:text-white"
    >
      <div className="film-grain" />
      <div className="paper-texture" />

      {/* Decorative Oversized Title (Background Graphic Layer - Z: 10) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1.5 }}
        className="hidden lg:block absolute top-[15vh] left-[2vw] z-10 pointer-events-none w-[90vw]"
      >
        <h1 className="font-hero text-[8vw] xl:text-[9vw] leading-[0.85] tracking-tight uppercase text-stroke-white opacity-20">
          {article.title}
        </h1>
      </motion.div>

      {/* Back Button & Navigation (Top Layer - Z: 60) */}
      <div className="fixed top-8 left-6 md:left-12 z-[60] text-white/70 hover:text-white transition-colors">
        <button 
          onClick={onClose}
          className="group flex items-center space-x-3 font-caption text-[10px] tracking-[0.2em] uppercase focus:outline-none"
        >
          <motion.div className="group-hover:-translate-x-1 transition-transform duration-300">
            <ArrowLeft className="w-4 h-4" />
          </motion.div>
          <span>Back to Journal</span>
        </button>
      </div>

      {/* Magazine Layout Container */}
      <div className="relative w-full min-h-screen lg:h-screen pt-24 pb-20 lg:p-0 flex flex-col lg:block">
        
        {/* Metadata & Intro (Foreground Layer - Z: 50) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative lg:absolute lg:top-[20vh] lg:left-[5vw] z-50 px-6 lg:px-0 max-w-[520px] pointer-events-auto"
        >
          {/* Mobile Title (Hidden on Desktop) */}
          <h1 className="lg:hidden font-hero text-4xl sm:text-5xl uppercase text-white leading-none mb-8">
            {article.title}
          </h1>
          
          <div className="flex flex-col gap-3 mb-10">
            <div className="font-caption text-[10px] tracking-[0.2em] text-white/70 uppercase flex gap-4">
              <span className="text-brand-red">{article.category}</span>
              <span>{article.date}</span>
            </div>
            {article.content.introTitle && (
              <span className="font-caption text-[10px] tracking-[0.2em] text-white uppercase font-bold">
                {article.content.introTitle}
              </span>
            )}
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="font-sans text-[16px] lg:text-[18px] leading-[1.8] font-normal tracking-[-0.01em] text-[rgba(255,255,255,0.88)] max-w-[520px] bg-[#0c0c0c]/60 p-6 lg:bg-transparent lg:p-0 backdrop-blur-md lg:backdrop-blur-none border border-white/5 lg:border-none rounded-sm"
          >
            {article.content.intro}
          </motion.p>
        </motion.div>

        {/* Main Editorial Image (Mid Layer - Z: 20) */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: -1 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.02, rotate: 0, y: -5, zIndex: 55 }}
          className="relative z-20 mx-6 lg:mx-0 lg:absolute lg:top-1/2 lg:left-[50%] lg:transform lg:-translate-y-1/2 lg:-translate-x-[30%] w-full max-w-lg lg:max-w-2xl xl:max-w-[40vw] aspect-[3/4] mt-10 lg:mt-0 p-3 bg-[#e0e0e0] shadow-2xl cursor-pointer"
        >
          <div className="tape-top-left" />
          <div className="tape-bottom-right" />
          <motion.div layoutId={`journal-image-${article.id}`} className="relative w-full h-full overflow-hidden border border-black/10">
            <Image src={article.image} alt={article.title} fill className="object-contain bg-[#111]" sizes="50vw" priority />
          </motion.div>
        </motion.div>

        {/* Pull Quote Card (Foreground Layer - Z: 40) */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 50 }}
          whileHover={{ y: -5, rotate: -1, zIndex: 55 }}
          className="magazine-card relative z-40 mx-6 lg:mx-0 lg:absolute lg:bottom-[8vh] lg:left-[5vw] xl:left-[8vw] p-8 max-w-[280px] md:max-w-[320px] mt-10 lg:mt-0 cursor-pointer"
        >
          <div className="tape-top-right" />
          <p className="font-hero text-base xl:text-lg uppercase leading-tight text-[#111] whitespace-pre-wrap">
            {article.pullQuote}
          </p>
        </motion.div>

        {/* Material Notes (Foreground Layer - Z: 40) */}
        <motion.div
          initial={{ opacity: 0, x: -20, rotate: 3 }}
          animate={{ opacity: 1, x: 0, rotate: 2 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          whileHover={{ y: -5, rotate: 0, zIndex: 55 }}
          className="magazine-card relative z-40 mx-6 lg:mx-0 lg:absolute lg:top-[12vh] lg:right-[6vw] p-6 max-w-[280px] mt-10 lg:mt-0 cursor-pointer"
        >
          <div className="tape-top-left" />
          <h3 className="font-caption text-[10px] tracking-[0.2em] uppercase text-brand-red mb-3 font-bold">Fabric & Spec</h3>
          <p className="font-sans text-[11px] leading-[1.8] text-[#333] whitespace-pre-wrap">
            {article.content.materialNotes}
          </p>
        </motion.div>

        {/* Small Gallery Photo (Mid Layer - Z: 30) */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: 6 }}
          animate={{ opacity: 1, y: 0, rotate: 4 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          whileHover={{ scale: 1.05, rotate: 2, zIndex: 55 }}
          className="relative z-30 mx-6 lg:mx-0 lg:absolute lg:bottom-[15vh] lg:right-[10vw] w-40 xl:w-48 aspect-[3/4] mt-10 lg:mt-0 p-2 bg-[#f0f0f0] shadow-xl cursor-pointer"
        >
          <div className="tape-bottom-left" />
          <div className="relative w-full h-full">
            <Image src={article.images.gallery[1] || article.images.campaignBleed} alt="Gallery Note" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" sizes="20vw" />
          </div>
        </motion.div>

        {/* Designer Commentary Snippet (Foreground Layer - Z: 50) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="relative z-50 mx-6 lg:mx-0 lg:absolute lg:bottom-[28vh] lg:right-[38vw] max-w-[220px] mt-10 lg:mt-0"
        >
          <p className="font-sans text-[13px] xl:text-sm text-white/90 leading-[1.8] drop-shadow-md whitespace-pre-wrap bg-black/40 lg:bg-transparent p-4 lg:p-0 rounded-sm">
            {article.content.behindTheCollection}
          </p>
        </motion.div>

        {/* Stamped Metadata Labels (Foreground Layer - Z: 40) */}
        {article.metadata && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="hidden lg:flex absolute top-[20vh] left-[45vw] z-40 gap-3 font-mono text-[9px] text-white/50 tracking-widest uppercase"
          >
            {article.metadata.edition && (
              <div className="px-2 py-1 border border-white/20 rounded-sm bg-black/20 backdrop-blur-md">
                {article.metadata.edition}
              </div>
            )}
            {article.metadata.location && (
              <div className="px-2 py-1 border border-white/20 rounded-sm bg-black/20 backdrop-blur-md">
                {article.metadata.location}
              </div>
            )}
            {article.metadata.coordinates && (
              <div className="px-2 py-1 border border-white/20 rounded-sm bg-black/20 backdrop-blur-md">
                {article.metadata.coordinates}
              </div>
            )}
          </motion.div>
        )}

      </div>
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
    <div className="bg-[#050505] min-h-screen py-20 flex flex-col overflow-y-scroll selection:bg-brand-red selection:text-white">
      
      {/* 1. Fixed Header Section */}
      <section className="w-full flex-shrink-0">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 space-y-4 pt-10">
          <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black block">
            EDITORIAL ARCHIVES
          </span>
          <h1 className="font-hero text-3xl sm:text-5xl tracking-wide uppercase text-white m-0">
            THE JOURNAL
          </h1>
          <p className="font-sans text-xs text-white/50 max-w-[520px] leading-relaxed m-0">
            Deep-dives into styling theory, technical material log files, and behind-the-scenes production runs at ARC OPUS.
          </p>
        </div>
        
        {/* Invisible spacer to match the exact height of the Shop filters (155px) */}
        <div className="w-full h-[155px] pointer-events-none" />
      </section>

      {/* 2. Journal Grid Section */}
      <section className="w-full flex-grow">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 min-h-[600px]">
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
                  <div className="relative h-[400px] bg-[#121212] overflow-hidden">
                    <motion.div 
                      layoutId={`journal-image-${art.id}`}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={art.image}
                        alt={art.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-90 group-hover:brightness-100"
                        sizes="(max-width: 768px) 100vw, 50vw"
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
        </div>
      </section>

      {/* ARTICLE OVERLAY RENDERING */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleOverlay key="overlay" article={selectedArticle} onClose={closeArticle} />
        )}
      </AnimatePresence>
    </div>
  );
}
