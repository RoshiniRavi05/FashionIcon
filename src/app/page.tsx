"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Heart, Star, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Product } from '@/data/products';
import { LuxuryLoader } from '@/components/LuxuryLoader';
import Carousel from '@/components/Carousel';
import EditorialProductGrid from '@/components/EditorialProductGrid';
import EditorialScrollSection from '@/components/EditorialScrollSection';

// Removed capsuleDetails array (moved to EditorialScrollSection)

export default function Home() {
  const { 
    addToCart, 
    toggleWishlist, 
    wishlist,
    setCursorType,
    products
  } = useApp();

  const [loading, setLoading] = useState(true);
  const [skipIntro, setSkipIntro] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('arcopus-intro');
    if (hasSeenIntro) {
      setSkipIntro(true);
      setLoading(false);
    } else {
      sessionStorage.setItem('arcopus-intro', 'true');
    }
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const [heroScale, setHeroScale] = useState(1);



  // Design Philosophy Section states & springs
  const [philosophyHovered, setPhilosophyHovered] = useState(false);
  const philosophyImageX = useSpring(0, { stiffness: 100, damping: 22 });
  const philosophyImageY = useSpring(0, { stiffness: 100, damping: 22 });
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  // Editorial Capsules Parallax states
  const capsuleMouseX = useSpring(0, { stiffness: 50, damping: 30 });
  const capsuleMouseY = useSpring(0, { stiffness: 50, damping: 30 });
  const handleCapsuleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    capsuleMouseX.set(x);
    capsuleMouseY.set(y);
  };
  const handleCapsuleMouseLeave = () => {
    capsuleMouseX.set(0);
    capsuleMouseY.set(0);
  };
  const imageX = useTransform(capsuleMouseX, [-0.5, 0.5], [-10, 10]);
  const imageY = useTransform(capsuleMouseY, [-0.5, 0.5], [-10, 10]);
  const typeX = useTransform(capsuleMouseX, [-0.5, 0.5], [-5, 5]);
  const typeY = useTransform(capsuleMouseY, [-0.5, 0.5], [-5, 5]);
  const metaX = useTransform(capsuleMouseX, [-0.5, 0.5], [-15, 15]);
  const metaY = useTransform(capsuleMouseY, [-0.5, 0.5], [-15, 15]);

  // Removing horizontal scroll parallax from background type to keep layout stable
  const bgTypeX = "0px";
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

  const featuredProducts = useMemo(() => {
    return [...products]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, [products]);

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
      {!skipIntro && <LuxuryLoader onComplete={() => setLoading(false)} />}

      <div className={`transition-opacity ${skipIntro ? 'duration-0' : 'duration-1000'} ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
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
              initial={skipIntro ? false : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={skipIntro ? { duration: 0 } : { duration: 1.0, delay: 0.8 }}
            >
              CAPSULE RELEASE 001 / EDITIONS
            </motion.p>

            <motion.h1
              className="font-hero text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#F5F5F5] uppercase max-w-[1100px] leading-[1.05]"
              initial={skipIntro ? false : { y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={skipIntro ? { duration: 0 } : { duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              CRAFTED BEYOND ORDINARY
            </motion.h1>

            <motion.p
              className="font-sans text-xs sm:text-sm tracking-widest text-[#F5F5F5]/60 max-w-[500px]"
              initial={skipIntro ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={skipIntro ? { duration: 0 } : { duration: 1.2, delay: 1.2 }}
            >
              A high-end designer showroom catalog. Melding technical clothing geometries with premium organic fibers.
            </motion.p>

            <motion.div
              initial={skipIntro ? false : { y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={skipIntro ? { duration: 0 } : { duration: 1.0, delay: 1.4 }}
              className="pt-6"
            >
              <Link
                href="/shop"
                className="font-heading text-[10px] tracking-[0.2em] uppercase bg-[#F5F5F5] text-[#050505] px-10 py-4 hover:bg-brand-red hover:text-white transition-all duration-500 font-bold inline-flex items-center space-x-3 group"
              >
                <span>EXPLORE REGISTRY</span>
                <ArrowRight className="w-4 h-4 group-hover:text-white transition-colors duration-500" />
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



        {/* EDITORIAL GSAP SCROLL SECTION */}
        <EditorialScrollSection />

        {/* CINEMATIC EDITORIAL PRODUCT GRID SHOWCASE */}
        <EditorialProductGrid />

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
