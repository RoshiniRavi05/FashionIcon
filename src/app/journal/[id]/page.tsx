"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { journals } from '@/data/journals';

// ─── PULL QUOTE COMPONENT ───
const PullQuote = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="py-16 md:py-24"
    >
      <motion.p
        initial={{ letterSpacing: "0.15em" }}
        whileInView={{ letterSpacing: "normal" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-hero text-2xl sm:text-4xl md:text-5xl text-center leading-relaxed uppercase tracking-wide text-white"
      >
        {children}
      </motion.p>
    </motion.div>
  );
};

// ─── TEXT BLOCK COMPONENT ───
const TextBlock = ({ title, paragraphs }: { title?: string, paragraphs: string[] }) => (
  <div className="max-w-[700px] mx-auto px-6 py-12 md:py-20 space-y-10">
    {title && (
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="font-heading text-lg tracking-[0.2em] uppercase text-brand-red text-center"
      >
        {title}
      </motion.h3>
    )}
    <div className="space-y-8">
      {paragraphs.map((p, idx) => (
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: idx * 0.1 }}
          className="font-sans text-sm sm:text-base text-white/70 leading-[2.2] tracking-wide"
        >
          {p}
        </motion.p>
      ))}
    </div>
  </div>
);

// ─── IMAGE LAYOUT COMPONENTS ───
const FullscreenImage = ({ src }: { src: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1 }}
    className="w-full h-[60vh] md:h-[80vh] relative my-12 md:my-24"
  >
    <Image src={src} alt="Editorial Fullscreen" fill className="object-cover" />
  </motion.div>
);

const SideBySideImages = ({ images }: { images: [string, string] }) => (
  <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 my-12 md:my-24">
    {images.map((src, idx) => (
      <motion.div 
        key={idx}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: idx * 0.1 }}
        className="w-full h-[50vh] md:h-[70vh] relative"
      >
        <Image src={src} alt="Editorial Detail" fill className="object-cover" />
      </motion.div>
    ))}
  </div>
);

const AsymmetricImage = ({ src, align }: { src: string, align: 'left' | 'right' }) => (
  <div className={`max-w-[1400px] mx-auto px-6 my-12 md:my-24 flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="w-full md:w-[60%] h-[50vh] md:h-[80vh] relative"
    >
      <Image src={src} alt="Editorial Asymmetric" fill className="object-cover" />
    </motion.div>
  </div>
);

export default function ArticlePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const article = journals.find(j => j.id === params.id);
  const related = journals.filter(j => j.id !== params.id).slice(0, 3);
  
  // Custom back transition state
  const [isLeaving, setIsLeaving] = useState(false);
  const [leavingHref, setLeavingHref] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const readingProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [progressVal, setProgressVal] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setProgressVal(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  if (!article) return notFound();

  const handleCustomNavigate = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    setLeavingHref(href);
    setIsLeaving(true);
    setTimeout(() => {
      router.push(href);
    }, 500); // Wait for blackout overlay
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white relative selection:bg-brand-red selection:text-white">
      
      {/* ─── ENTRANCE BLACKOUT REVEAL ─── */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed inset-0 bg-[#000000] z-[9999] pointer-events-none"
      />

      {/* ─── EXIT BLACKOUT TRANSITION ─── */}
      <AnimatePresence>
        {isLeaving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 bg-[#000000] z-[9999] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* ─── PROGRESS BAR ─── */}
      <motion.div 
        className="fixed top-0 left-0 h-[2px] bg-brand-red z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ─── BACK NAVIGATION ─── */}
      <div className="fixed top-8 left-6 md:left-12 z-50 mix-blend-difference text-white">
        <a 
          href="/journal"
          onClick={(e) => handleCustomNavigate(e, '/journal')}
          className="group flex items-center space-x-3 font-heading text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-70 cursor-pointer"
        >
          <motion.div className="group-hover:-translate-x-1 transition-transform duration-300">
            <ArrowLeft className="w-4 h-4" />
          </motion.div>
          <span>Back to Journal</span>
        </a>
      </div>

      <div className="fixed top-8 right-6 md:right-12 z-50 mix-blend-difference text-white pointer-events-none hidden md:block">
        <span className="font-heading text-[10px] tracking-[0.2em] uppercase">
          Reading {progressVal}%
        </span>
      </div>

      {/* ─── CINEMATIC HERO ─── */}
      <section className="relative w-full h-[70vh] md:h-[85vh] flex items-end overflow-hidden">
        {/* Scaling Image */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image src={article.image} alt={article.title} fill className="object-cover brightness-50" priority />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-12 pb-16 md:pb-24 max-w-[1400px] mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-hero text-4xl sm:text-6xl md:text-8xl tracking-wide uppercase text-white leading-[0.9] max-w-[1000px]"
          >
            {article.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-6 font-caption text-[10px] tracking-widest text-white/60 uppercase"
          >
            <span>POSTED BY ARC OPUS EDITORIAL</span>
            <span>{article.date}</span>
            <span>{article.readTime}</span>
            <span className="text-brand-red">{article.category}</span>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-white/40 mix-blend-difference"
        >
          <span className="font-caption text-[8px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-current opacity-50" />
        </motion.div>
      </section>

      {/* ─── EDITORIAL CONTENT ─── */}
      <article className="pb-32">
        <TextBlock paragraphs={article.content.inspiration} />

        <AsymmetricImage src={article.images.largeLeft} align="left" />
        
        <PullQuote>{article.pullQuote}</PullQuote>

        <TextBlock title="DESIGN PROCESS" paragraphs={article.content.designProcess} />

        <SideBySideImages images={article.images.twoSideBySide} />

        <TextBlock title="MATERIALS" paragraphs={article.content.materials} />

        <FullscreenImage src={article.images.fullscreen} />

        <TextBlock title="STYLING GUIDE" paragraphs={article.content.stylingGuide} />

        <AsymmetricImage src={article.images.portraitRight} align="right" />

        <TextBlock title="BEHIND THE COLLECTION" paragraphs={article.content.behindTheCollection} />

        {/* Macro & Wide alternating */}
        <div className="max-w-[1000px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-6 my-12 md:my-24 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="md:col-span-5 h-[400px] relative"
          >
            <Image src={article.images.fabricMacro} alt="Fabric Detail" fill className="object-cover" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-7 h-[600px] relative"
          >
            <Image src={article.images.campaignWide} alt="Campaign Wide" fill className="object-cover" />
          </motion.div>
        </div>

        <TextBlock title="FINAL THOUGHTS" paragraphs={article.content.finalThoughts} />
      </article>

      {/* ─── RELATED JOURNALS ─── */}
      <section className="border-t border-white/10 pt-24 pb-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="text-center mb-16">
          <h3 className="font-hero text-2xl sm:text-4xl tracking-wide uppercase text-white">
            FURTHER READING
          </h3>
          <div className="w-12 h-[1px] bg-brand-red mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {related.map((rel, idx) => (
            <motion.article 
              key={rel.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group cursor-pointer flex flex-col space-y-4"
              onClick={(e) => handleCustomNavigate(e, `/journal/${rel.id}`)}
            >
              <div className="relative h-[250px] overflow-hidden bg-[#121212] border border-white/5">
                <Image
                  src={rel.image}
                  alt={rel.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-75 group-hover:brightness-50"
                />
              </div>
              <h4 className="font-heading text-sm tracking-wider uppercase text-white/70 group-hover:text-brand-red transition-colors">
                {rel.title}
              </h4>
              <div className="flex items-center space-x-2 text-brand-red">
                <span className="font-caption text-[9px] tracking-widest uppercase">Explore</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

    </div>
  );
}
