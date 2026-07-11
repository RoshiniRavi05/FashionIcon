"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Heart, Star, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { DEFAULT_PRODUCTS } from '@/data/products';
import { LuxuryLoader } from '@/components/LuxuryLoader';
import Carousel from '@/components/Carousel';
import TiltedCard from '@/components/TiltedCard';
import EditorialProductGrid from '@/components/EditorialProductGrid';

const capsuleDetails = [
  {
    name: 'Tees & Tops',
    image: '/oversized_tee_hero.png',
    path: '/collections/t-shirts',
    code: '001/01',
    heading: 'GEOMETRIC OVERSIZED SILHOUETTES',
    description: 'Engineered from 360gsm double-yarn combed cotton. Drafted with dropped shoulders, raw blind hems, and custom mineral-oxide dye wells for a structured, architectural drape.',
    specs: [
      { label: 'Weight', value: '360gsm' },
      { label: 'Fabric', value: '100% Combed Cotton' },
      { label: 'Fit', value: 'Geometric Oversized' }
    ]
  },
  {
    name: 'Outerwear',
    image: '/denim_jacket_hero.jpg',
    path: '/collections/jackets',
    code: '001/02',
    heading: 'STRUCTURED TECHNICAL CANVASES',
    description: 'Heavyweight denim canvases overlaid with custom red stay-positive canvas patches. Designed with storm-guard double flaps, hand-distressed seams, and industrial-grade steel button enclosures.',
    specs: [
      { label: 'Weight', value: '550gsm' },
      { label: 'Fabric', value: 'Raw Canvas Denim' },
      { label: 'Enclosure', value: 'Industrial Steel Buttons' }
    ]
  },
  {
    name: 'Pants & Denim',
    image: '/bottoms/c1.png',
    path: '/collections/bottoms',
    code: '001/03',
    heading: 'ANATOMICAL DRILL CHINOS',
    description: 'Drafted from high-tension military drill cotton. Engineered with knee dart articulations, deep side utility slits, and tapered hems designed to drape cleanly over footwear.',
    specs: [
      { label: 'Weight', value: '420gsm' },
      { label: 'Fabric', value: 'High-Tension Drill Cotton' },
      { label: 'Joints', value: 'Anatomical Knee Darts' }
    ]
  },
  {
    name: 'Footwear',
    image: '/acid_wash_sneakers.png',
    path: '/collections/shoes',
    code: '001/04',
    heading: 'VULCANIZED SPEED SNEAKERS',
    description: 'Handmade runway sneakers combining layered vulcanized rubber treads, memory-foam insoles, speed-lace metal eyelets, and hand-aged distressed canvas uppers.',
    specs: [
      { label: 'Type', value: 'Speed Runner' },
      { label: 'Sole', value: 'Vulcanized Rubber' },
      { label: 'Upper', value: 'Distressed Canvas' }
    ]
  }
];

export default function Home() {
  const { 
    addToCart, 
    toggleWishlist, 
    wishlist,
    setCursorType 
  } = useApp();

  const [loading, setLoading] = useState(true);
  const [activeCapsule, setActiveCapsule] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const [heroScale, setHeroScale] = useState(1);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const xText = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  // Design Philosophy Section states & springs
  const [philosophyHovered, setPhilosophyHovered] = useState(false);
  const philosophyImageX = useSpring(0, { stiffness: 100, damping: 22 });
  const philosophyImageY = useSpring(0, { stiffness: 100, damping: 22 });
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const philosophyBtnRef = useRef<HTMLAnchorElement>(null);

  const handlePhilosophyMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    philosophyImageX.set(relX * 16); // max 8px translation
    philosophyImageY.set(relY * 12); // max 6px translation
  };

  const handlePhilosophyMouseLeave = () => {
    setPhilosophyHovered(false);
    philosophyImageX.set(0);
    philosophyImageY.set(0);
  };

  const handleBtnMouseMove = (e: React.MouseEvent) => {
    if (!philosophyBtnRef.current) return;
    const rect = philosophyBtnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setBtnOffset({
      x: x * 0.15,
      y: y * 0.15
    });
  };

  const handleBtnMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  // Variants for Design Philosophy reveals
  const philosophyHeaderVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(4px)" 
    },
    visible: (customDelay: number) => ({
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        delay: customDelay,
        ease: [0.16, 1, 0.3, 1] as const
      }
    })
  };

  const philosophyParagraphVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: customDelay,
        ease: [0.16, 1, 0.3, 1] as const
      }
    })
  };


  // Parallax zoom scroll on hero section
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const height = heroRef.current.clientHeight;
      if (scrollY <= height) {
        const factor = 1 + (scrollY / height) * 0.15;
        setHeroScale(factor);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <LuxuryLoader onComplete={() => setLoading(false)} />

      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* HERO SECTION */}
        <section 
          ref={heroRef}
          className="relative h-[95vh] w-full bg-[#050505] overflow-hidden flex items-center justify-center"
        >
          {/* Parallax Background Image */}
          <div 
            className="absolute inset-0 z-0 transition-transform duration-100 ease-out brightness-[0.7]"
            style={{ transform: `scale(${heroScale})` }}
          >
            <Image
              src="/oversized_tee_hero.png"
              alt="ARC OPUS Campaign"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 z-10" />

          {/* Content Overlay */}
          <div className="relative z-20 max-w-[1600px] w-full px-6 md:px-12 text-center flex flex-col items-center space-y-6">
            <motion.p
              className="font-caption text-[10px] md:text-xs tracking-[0.4em] text-brand-red uppercase font-black"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.8 }}
            >
              CAPSULE RELEASE 001 / EDITIONS
            </motion.p>

            <motion.h1
              className="font-hero text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#F5F5F5] uppercase max-w-[1100px] leading-[1.05]"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              CRAFTED BEYOND ORDINARY
            </motion.h1>

            <motion.p
              className="font-sans text-xs sm:text-sm tracking-widest text-[#F5F5F5]/60 max-w-[500px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.2 }}
            >
              A high-end designer showroom catalog. Melding technical clothing geometries with premium organic fibers.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 1.4 }}
              className="pt-6"
            >
              <Link
                href="/shop"
                className="font-heading text-[10px] tracking-[0.2em] uppercase bg-[#F5F5F5] text-[#050505] px-10 py-4.5 hover:bg-brand-red hover:text-white transition-all duration-500 font-bold inline-flex items-center space-x-3"
              >
                <span>EXPLORE REGISTRY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* BRANDS / STATS */}
        <section className="bg-[#050505] border-y border-white/5 py-12">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="font-hero text-xl text-brand-red">01</p>
              <p className="font-caption text-[10px] tracking-widest text-white/40 uppercase">Archival Fits</p>
            </div>
            <div className="space-y-1">
              <p className="font-hero text-xl text-white">360gsm</p>
              <p className="font-caption text-[10px] tracking-widest text-white/40 uppercase">Double-Yarn Combed</p>
            </div>
            <div className="space-y-1">
              <p className="font-hero text-xl text-white">100%</p>
              <p className="font-caption text-[10px] tracking-widest text-white/40 uppercase">Traceable Sourcing</p>
            </div>
            <div className="space-y-1">
              <p className="font-hero text-xl text-brand-red">001</p>
              <p className="font-caption text-[10px] tracking-widest text-white/40 uppercase">Capsule Edition</p>
            </div>
          </div>
        </section>



        {/* EDITORIAL CAPSULES - FLIPO CAMPAIGN SPREAD */}
        <section ref={sectionRef} className="relative py-32 overflow-hidden border-t border-white/5 bg-[#050505] z-10 flex flex-col justify-center min-h-[900px]">
          
          {/* Background Campaign Image */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="/oversized_tee_hero.png"
              alt="Campaign Backdrop"
              fill
              className="object-cover object-center opacity-[0.15] blur-[2px]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/40 z-[1]" />
            {/* Subtle Textures */}
            <div className="absolute inset-0 opacity-[0.05] z-[1]" style={{ backgroundImage: 'url(/blueprint-texture.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="absolute inset-0 opacity-[0.03] z-[1]" style={{ backgroundImage: 'url(/film-grain.png)' }} />
          </div>

          {/* Background Typography */}
          <div className="absolute inset-0 flex flex-col justify-between items-center pointer-events-none z-[2] overflow-hidden py-10 opacity-[0.02]">
            <span className="font-hero text-[20vw] leading-[0.8] tracking-tighter text-white uppercase select-none">ARCHIVE</span>
            <span className="font-hero text-[20vw] leading-[0.8] tracking-tighter text-white uppercase select-none">CAPSULE</span>
          </div>

          <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 w-full h-full flex flex-col">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="space-y-4">
                <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black">
                  CURATED CAMPAIGN
                </span>
                <h2 className="font-hero text-2xl md:text-4xl tracking-wide uppercase text-white">
                  EDITORIAL CAPSULES
                </h2>
              </div>
              
              {/* Controls */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setActiveCapsule((prev) => (prev - 1 + capsuleDetails.length) % capsuleDetails.length)}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-brand-red transition-all"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                <span className="font-heading text-xs tracking-[0.2em] text-white/60">
                  0{activeCapsule + 1} / 0{capsuleDetails.length}
                </span>
                <button 
                  onClick={() => setActiveCapsule((prev) => (prev + 1) % capsuleDetails.length)}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-brand-red transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Layout Spread */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start h-full">
              
              {/* Left: Large Hero Campaign Image */}
              <motion.div 
                key={`img-${activeCapsule}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-8 h-[600px] lg:h-[750px] relative rounded-[32px] overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.45)] border border-white/[0.05] z-10"
              >
                <Image
                  src={capsuleDetails[activeCapsule].image}
                  alt={capsuleDetails[activeCapsule].name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                />
                {/* Floating Tag */}
                <div className="absolute top-6 left-6 bg-[rgba(0,0,0,0.55)] backdrop-blur-[12px] border border-white/[0.08] rounded-xl py-2.5 px-4 z-[20] shadow-lg">
                  <p className="font-caption text-[9px] tracking-widest text-white/50 uppercase">
                    CODE
                  </p>
                  <p className="font-heading text-[11px] font-bold tracking-[0.15em] text-white uppercase pt-0.5">
                    {capsuleDetails[activeCapsule].code}
                  </p>
                </div>
              </motion.div>

              {/* Right: Floating Information Pinned Cards */}
              <div className="lg:col-span-4 relative flex flex-col space-y-4 lg:-ml-20 pt-8 lg:pt-24 z-20">
                
                {/* Title Card */}
                <motion.div
                  key={`title-${activeCapsule}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#0A0A0A] border border-white/[0.05] rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-[6px] hover:scale-[1.02] rotate-[-0.5deg]"
                >
                  <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black block mb-3">
                    CAPSULE EDITION
                  </span>
                  <h3 className="font-hero text-2xl lg:text-3xl uppercase text-white leading-tight">
                    {capsuleDetails[activeCapsule].heading}
                  </h3>
                </motion.div>

                {/* Description Card */}
                <motion.div
                  key={`desc-${activeCapsule}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#0A0A0A] border border-white/[0.05] rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] ml-0 lg:ml-8 -mt-6 lg:-mt-10 transition-all duration-500 hover:-translate-y-[6px] hover:scale-[1.02] rotate-[1.5deg] z-10 relative"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                    <span className="font-heading text-[10px] tracking-widest text-white/50 uppercase">Material Notes</span>
                  </div>
                  <p className="font-sans text-sm text-[#F5F5F5]/70 leading-relaxed">
                    {capsuleDetails[activeCapsule].description}
                  </p>
                </motion.div>

                {/* Specs Card */}
                <motion.div
                  key={`specs-${activeCapsule}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#0A0A0A] border border-white/[0.05] rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] lg:-ml-6 -mt-6 lg:-mt-8 transition-all duration-500 hover:-translate-y-[6px] hover:scale-[1.02] rotate-[-1deg] z-20 relative"
                >
                  <div className="grid grid-cols-2 gap-y-6">
                    {capsuleDetails[activeCapsule].specs.map((spec) => (
                      <div key={spec.label} className="space-y-1.5">
                        <p className="font-caption text-[9px] tracking-widest text-[#F5F5F5]/40 uppercase">{spec.label}</p>
                        <p className="font-heading text-xs tracking-wider text-[#F5F5F5] uppercase font-bold">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Explore CTA Card */}
                <motion.div
                  key={`cta-${activeCapsule}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
                  className="flex justify-end pt-2 lg:pt-4 lg:-mr-12 -mt-4 lg:-mt-8 z-30 relative"
                >
                  <Link
                    href={capsuleDetails[activeCapsule].path}
                    className="font-heading text-[11px] tracking-[0.2em] uppercase bg-brand-red text-white hover:bg-white hover:text-black px-10 py-5 rounded-[24px] transition-all duration-500 font-bold inline-flex items-center space-x-3 shadow-lg hover:shadow-[0_20px_40px_rgba(200,16,46,0.3)] hover:-translate-y-1 rotate-[-1deg]"
                  >
                    <span>Explore Capsule</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* CINEMATIC EDITORIAL PRODUCT GRID SHOWCASE */}
        <EditorialProductGrid />

        {/* CAROUSEL BRAND SPECIFICATIONS */}
        <section className="material-architecture-section relative py-24 border-t border-white/5 overflow-hidden flex flex-col items-center justify-center">
          <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col items-center text-center space-y-12 w-full">
            {/* Header Content */}
            <div className="space-y-4 max-w-[600px] flex flex-col items-center">
              <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black">
                SYSTEM SPECIFICATIONS
              </span>
              <h2 className="font-hero text-2xl sm:text-4xl tracking-wide uppercase text-white leading-tight">
                MATERIAL ARCHITECTURE
              </h2>
              <div className="w-12 h-[1px] bg-brand-red my-2" />
              <p className="font-sans text-xs tracking-widest text-[#F5F5F5]/60 leading-relaxed">
                Drag to explore the structural dimensions, technical fabrics, and modular elements that define our capsule editions.
              </p>
            </div>

            {/* Center Carousel */}
            <div className="w-full flex justify-center">
              <div className="relative w-full max-w-[500px] h-[340px] flex items-center justify-center">
                <Carousel
                  baseWidth={400}
                  autoplay={true}
                  autoplayDelay={4000}
                  pauseOnHover={true}
                  loop={true}
                  round={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* BRAND STORY PREVIEW */}
        <section 
          onMouseMove={handlePhilosophyMouseMove}
          onMouseLeave={handlePhilosophyMouseLeave}
          className="design-philosophy-section py-32 max-w-[1600px] mx-auto px-6 md:px-12 relative"
        >
          {/* Subtle animated drifting radial gradient background */}
          <div className="philosophy-bg-gradient" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center w-full relative z-10">
            <motion.div 
              className="md:col-span-5 relative h-[400px] md:h-[500px] lg:h-[600px] w-full bg-[#121212] overflow-hidden border border-white/5 rounded-sm"
              initial={{ opacity: 0, y: 20, scale: 1.05 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                className="w-full h-full relative"
                style={{ x: philosophyImageX, y: philosophyImageY }}
                whileHover={{ scale: 1.03, filter: "brightness(1.05) contrast(1.03)" }}
                transition={{ duration: 0.7 }}
              >
                <Image
                  src="/denim_jacket_2.jpg"
                  alt="ARC OPUS Craftsmanship"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 35vw"
                  className="object-contain object-center bg-[#121212] transition-all duration-700"
                  priority
                />
              </motion.div>
            </motion.div>

            <div 
              className="md:col-span-7 space-y-8 relative z-10"
              onMouseEnter={() => setPhilosophyHovered(true)}
              onMouseLeave={() => setPhilosophyHovered(false)}
            >
              <motion.span 
                className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black block"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                DESIGN PHILOSOPHY
              </motion.span>
              
              <h2 
                className="font-hero text-2xl sm:text-4xl tracking-wide uppercase text-white leading-tight"
                style={{
                  textShadow: philosophyHovered ? "0 0 15px rgba(255, 255, 255, 0.12)" : "none",
                  transition: "text-shadow 0.6s ease"
                }}
              >
                <motion.span 
                  className="block"
                  variants={philosophyHeaderVariants}
                  custom={0.24}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  ARCHITECTURAL INTEGRITY.
                </motion.span>
                <motion.span 
                  className="block"
                  variants={philosophyHeaderVariants}
                  custom={0.42}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  TECHNICAL CRAFTSMANSHIP.
                </motion.span>
              </h2>
              
              <motion.div 
                className="h-[1px] bg-brand-red"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="space-y-6 font-sans text-sm text-white/60 leading-relaxed max-w-[620px]">
                <motion.p
                  variants={philosophyParagraphVariants}
                  custom={0.66}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  ARC OPUS is not a retail store. It is a designer showroom dedicated to technical textile research, spatial geometries, and minimalist silhouette construction.
                </motion.p>
                <motion.p
                  variants={philosophyParagraphVariants}
                  custom={0.78}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Every pattern is drafted from structural blueprints. Every seam is engineered to enhance movement while retaining rigid silhouettes. We dye our threads in small, certified batches to capture deep black ink-wells and natural oxide hues.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <Link
                  ref={philosophyBtnRef}
                  href="/story"
                  onMouseMove={handleBtnMouseMove}
                  onMouseLeave={handleBtnMouseLeave}
                  className="story-cta-btn font-heading text-[10px] tracking-[0.2em] uppercase bg-white/5 border border-white/10 text-white hover:border-brand-red px-8 py-4 transition-all duration-500 font-bold inline-flex items-center space-x-2 rounded-sm"
                  style={{
                    transform: `translate(${btnOffset.x}px, ${btnOffset.y}px)`,
                    transition: btnOffset.x === 0 ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
                  }}
                >
                  <span>Explore Our Story</span>
                  <ArrowRight className="story-cta-arrow w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
