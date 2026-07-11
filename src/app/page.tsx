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



        {/* EDITORIAL CAPSULES - INTERACTIVE ZINE SHOWCASE */}
        <section ref={sectionRef} className="relative py-28 overflow-hidden border-t border-white/5 bg-[#050505] z-10 flex flex-col justify-center">
          {/* Scroll-Responsive Horizontal Background Text (Tubik / R.D.E Style) */}
          <motion.div 
            style={{ x: xText }} 
            className="absolute left-0 right-0 top-[40%] -translate-y-1/2 select-none pointer-events-none opacity-[0.03] text-[13vw] font-hero font-black whitespace-nowrap text-stroke-white z-0"
          >
            ARC OPUS SYSTEM CAPSULE 001 ARCHIVES
          </motion.div>

          <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 w-full space-y-16">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black">
                  CURATED CAMPAIGN
                </span>
                <h2 className="font-hero text-2xl md:text-4xl tracking-wide uppercase text-white">
                  EDITORIAL CAPSULES
                </h2>
              </div>
              <Link 
                href="/collections"
                className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-brand-red transition-colors flex items-center space-x-2"
              >
                <span>View All Campaigns</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Interactive Showcase Block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Column: Active Image Viewer with TiltedCard Hover Effect */}
              <div className="lg:col-span-5 relative h-[500px] md:h-[600px] w-full bg-[#121212] overflow-hidden border border-white/5 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCapsule}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.5}
                    onDragEnd={(_, info) => {
                      const swipeThreshold = 50;
                      if (info.offset.x < -swipeThreshold) {
                        // Swipe left -> next capsule
                        setActiveCapsule((prev) => (prev + 1) % capsuleDetails.length);
                      } else if (info.offset.x > swipeThreshold) {
                        // Swipe right -> previous capsule
                        setActiveCapsule((prev) => (prev - 1 + capsuleDetails.length) % capsuleDetails.length);
                      }
                    }}
                  >
                    <TiltedCard
                      imageSrc={capsuleDetails[activeCapsule].image}
                      altText={capsuleDetails[activeCapsule].name}
                      captionText={capsuleDetails[activeCapsule].name}
                      containerHeight="100%"
                      containerWidth="100%"
                      imageHeight="100%"
                      imageWidth="100%"
                      scaleOnHover={1.03}
                      rotateAmplitude={10}
                      showMobileWarning={false}
                      showTooltip={true}
                      displayOverlayContent={true}
                      overlayContent={
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-10 pointer-events-none" />
                          <span className="absolute bottom-6 left-6 font-hero text-[10px] text-[#F5F5F5]/40 tracking-widest uppercase z-20">
                            CODE: {capsuleDetails[activeCapsule].code}
                          </span>
                        </>
                      }
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: Active Text Info & Selector */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full py-2 space-y-8">
                <div className="space-y-6">
                  {/* Category Title */}
                  <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black block">
                    CAPSULE EDITION {capsuleDetails[activeCapsule].code}
                  </span>
                  
                  {/* Heading */}
                  <h3 className="font-hero text-xl sm:text-3xl lg:text-4xl tracking-wide uppercase text-white leading-tight">
                    {capsuleDetails[activeCapsule].heading}
                  </h3>
                  
                  <div className="w-12 h-[1px] bg-brand-red" />
                  
                  {/* Description */}
                  <p className="font-sans text-sm text-[#F5F5F5]/60 leading-relaxed max-w-[600px]">
                    {capsuleDetails[activeCapsule].description}
                  </p>

                  {/* Technical Specifications Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                    {capsuleDetails[activeCapsule].specs.map((spec) => (
                      <div key={spec.label} className="space-y-1">
                        <p className="font-caption text-[9px] tracking-widest text-[#F5F5F5]/40 uppercase">{spec.label}</p>
                        <p className="font-heading text-xs tracking-wider text-[#F5F5F5] uppercase font-bold">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Selector Thumbnails & CTA */}
                <div className="space-y-8 pt-6 border-t border-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
                    
                    {/* Horizontal Thumbnails Selector */}
                    <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none select-none">
                      {capsuleDetails.map((cap, idx) => (
                        <button
                          key={cap.name}
                          onClick={() => setActiveCapsule(idx)}
                          className={`flex-shrink-0 text-left transition-all duration-500 ease-out focus:outline-none`}
                        >
                          <div className={`relative w-[60px] h-[80px] bg-[#121212] overflow-hidden border transition-all duration-500 ${
                            activeCapsule === idx 
                              ? 'border-brand-red scale-105 opacity-100 shadow-[0_0_15px_rgba(193,14,29,0.25)]' 
                              : 'border-white/10 opacity-40 hover:opacity-80 hover:scale-[1.02]'
                          }`}>
                            <Image
                              src={cap.image}
                              alt={cap.name}
                              fill
                              className="object-cover"
                              sizes="60px"
                            />
                          </div>
                          <span className={`block text-[8px] font-caption tracking-widest uppercase mt-2 text-center transition-colors duration-300 ${
                            activeCapsule === idx ? 'text-[#F5F5F5] font-black' : 'text-[#F5F5F5]/40'
                          }`}>
                            {cap.name.split(' ')[0]}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="flex-shrink-0">
                      <Link
                        href={capsuleDetails[activeCapsule].path}
                        className="font-heading text-[10px] tracking-[0.2em] uppercase bg-[#F5F5F5] text-[#050505] hover:bg-brand-red hover:text-white px-8 py-4 transition-all duration-500 font-bold inline-flex items-center space-x-2 shadow-lg"
                      >
                        <span>EXPLORE CAPSULE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>
                </div>

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
