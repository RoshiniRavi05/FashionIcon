"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './story.css';

// Floating stats card details
const statsCards = [
  { id: 1, label: 'FOUNDED', value: '2026', desc: 'Born as an archival project', x: '12%', y: '18%', rot: -1.2 },
  { id: 2, label: 'MATERIALS', value: 'PREMIUM FABRICS', desc: 'Double-yarn 360gsm cottons', x: '55%', y: '14%', rot: 0.8 },
  { id: 3, label: 'LIMITATION', value: 'LIMITED COLLECTIONS', desc: 'Strict capsule drops only', x: '15%', y: '55%', rot: 0.5 },
  { id: 4, label: 'TAILORING', value: 'TECHNICAL CUTS', desc: 'Anatomical skeleton mapping', x: '58%', y: '52%', rot: -1.5 },
  { id: 5, label: 'PHILOSOPHY', value: 'ZERO MASS PRODUCTION', desc: 'Engineered structural longevity', x: '35%', y: '36%', rot: -0.4 }
];

export default function StoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress across the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring for scroll mapping
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.001 });

  // Mouse tracking for parallax
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const parallaxX = useSpring(mX, { stiffness: 120, damping: 22 });
  const parallaxY = useSpring(mY, { stiffness: 120, damping: 22 });

  // Right-side progress bar height
  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // ─── CHAPTER 1 (0.0 → 0.20) ───
  const ch1Opacity = useTransform(smoothProgress, [0, 0.14, 0.20], [1, 1, 0]);
  const ch1Y = useTransform(smoothProgress, [0, 0.14, 0.20], [0, 0, -80]);
  const ch1LineLength = useTransform(smoothProgress, [0.02, 0.12], [0, 1]);

  // ─── CHAPTER 2: MALE STORY (0.20 → 0.40) ───
  const ch2Opacity = useTransform(smoothProgress, [0.16, 0.22, 0.34, 0.40], [0, 1, 1, 0]);
  const ch2Y = useTransform(smoothProgress, [0.16, 0.22, 0.34, 0.40], [80, 0, 0, -80]);
  const ch2ImageScale = useTransform(smoothProgress, [0.22, 0.34], [1.0, 1.08]);
  const ch2LineLength = useTransform(smoothProgress, [0.22, 0.32], [0, 1]);

  // ─── CHAPTER 3: FEMALE STORY (0.40 → 0.60) ───
  const ch3Opacity = useTransform(smoothProgress, [0.36, 0.42, 0.54, 0.60], [0, 1, 1, 0]);
  const ch3Y = useTransform(smoothProgress, [0.36, 0.42, 0.54, 0.60], [80, 0, 0, -80]);
  const ch3ImageScale = useTransform(smoothProgress, [0.42, 0.54], [1.0, 1.08]);

  // ─── CHAPTER 4: STATS BLUEPRINT (0.60 → 0.80) ───
  const ch4Opacity = useTransform(smoothProgress, [0.56, 0.62, 0.74, 0.80], [0, 1, 1, 0]);
  const ch4Y = useTransform(smoothProgress, [0.56, 0.62, 0.74, 0.80], [80, 0, 0, -80]);
  const ch4LineLength = useTransform(smoothProgress, [0.62, 0.74], [0, 1]);
  const cardOpacities = [
    useTransform(smoothProgress, [0.62, 0.64], [0, 1]),
    useTransform(smoothProgress, [0.64, 0.66], [0, 1]),
    useTransform(smoothProgress, [0.66, 0.68], [0, 1]),
    useTransform(smoothProgress, [0.68, 0.70], [0, 1]),
    useTransform(smoothProgress, [0.70, 0.72], [0, 1]),
  ];

  // ─── CHAPTER 5: MANIFESTO (0.80 → 1.0) ───
  const ch5Opacity = useTransform(smoothProgress, [0.76, 0.82, 1.0], [0, 1, 1]);
  const ch5Y = useTransform(smoothProgress, [0.76, 0.82, 1.0], [80, 0, 0]);
  const ch5Scale = useTransform(smoothProgress, [0.82, 1.0], [1.0, 1.15]); // Uniform scale, no distortion
  const ch5GlowOpacity = useTransform(smoothProgress, [0.82, 0.94], [0, 0.6]);
  const ch5Bg = useTransform(smoothProgress, [0.78, 0.88], ["#050505", "#020202"]);

  // Blueprint background
  const blueprintOpacity = useTransform(smoothProgress, [0, 1], [0.03, 0.05]);
  const blueprintDraw = useTransform(smoothProgress, [0, 0.9], [0, 1]);

  // Mouse handler
  const handleMouseMove = (e: React.MouseEvent) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    mX.set((e.clientX / w - 0.5) * 16);
    mY.set((e.clientY / h - 0.5) * 16);
  };

  const handleMouseLeave = () => {
    mX.set(0);
    mY.set(0);
  };

  // Magnetic CTA button
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  const handleBtnMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setBtnOffset({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.18,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.18
    });
  };

  const handleBtnMouseLeave = () => setBtnOffset({ x: 0, y: 0 });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="story-outer-container"
      style={{ height: '800vh' }}
    >
      <motion.div
        className="story-sticky-viewport"
        style={{ backgroundColor: ch5Bg }}
      >
        {/* ── Progress Indicator ── */}
        <div className="story-vertical-progress select-none hidden md:flex">
          <motion.div
            className="story-progress-line-filled"
            style={{ height: progressHeight }}
          >
            <div className="story-progress-indicator-dot" />
          </motion.div>
        </div>

        {/* ── Blueprint Background ── */}
        <motion.div className="blueprint-background" style={{ opacity: blueprintOpacity }}>
          <div className="blueprint-grid-mesh" />
          <div className="blueprint-dot-grid" />
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <motion.circle cx="50%" cy="50%" r="240" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="4 8" className="blueprint-compass-rotation" />
            <motion.circle cx="50%" cy="50%" r="120" fill="none" stroke="#fff" strokeWidth="0.5" />
            <motion.line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#fff" strokeWidth="0.5" strokeDasharray="2 4" style={{ pathLength: blueprintDraw }} />
            <motion.line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#fff" strokeWidth="0.5" strokeDasharray="2 4" style={{ pathLength: blueprintDraw }} />
            <motion.line x1="5%" y1="5%" x2="95%" y2="95%" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.25" style={{ pathLength: blueprintDraw }} />
            <motion.line x1="95%" y1="5%" x2="5%" y2="95%" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.25" style={{ pathLength: blueprintDraw }} />
          </svg>
        </motion.div>

        {/* ═══════════════════ CHAPTER 1: INTRO ═══════════════════ */}
        <motion.div
          className="story-chapter flex-col text-center z-10"
          style={{ opacity: ch1Opacity, y: ch1Y }}
        >
          <motion.div
            className="flex flex-col items-center justify-center w-full h-full"
            style={{ x: parallaxX, y: parallaxY }}
          >
            <div className="space-y-5 max-w-[800px] mx-auto px-4 relative">
              {/* Animated border */}
              <svg className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <motion.rect x="5%" y="5%" width="90%" height="90%" fill="none" stroke="#C10E1D" strokeWidth="1" strokeOpacity="0.35" style={{ pathLength: ch1LineLength }} />
              </svg>

              <motion.span
                className="font-caption text-[10px] sm:text-xs tracking-[0.4em] text-brand-red uppercase font-black block"
                initial={{ filter: 'blur(4px)', opacity: 0 }}
                animate={{ filter: 'blur(0px)', opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.3 }}
              >
                OUR STORY
              </motion.span>

              <motion.h1
                className="font-hero text-2xl sm:text-5xl md:text-6xl tracking-wide uppercase text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                ARCHITECTURE OF<br />MODERN CLOTHING
              </motion.h1>

              <motion.p
                className="font-sans text-xs text-white/50 leading-relaxed uppercase tracking-widest pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.8 }}
              >
                Crafted Beyond Ordinary // Establishing Modern Fashion Geometries
              </motion.p>
            </div>

            {/* Scroll hint */}
            <motion.div
              className="story-scroll-down-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <span>Scroll to Unfold</span>
              <div className="story-scroll-hint-bar" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ═══════════════════ CHAPTER 2: MALE STORY ═══════════════════ */}
        <motion.div
          className="story-chapter z-10"
          style={{ opacity: ch2Opacity, y: ch2Y }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center w-full max-w-[1400px] mx-auto">
            {/* Animated blueprint lines behind */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
              <motion.line x1="42%" y1="0" x2="42%" y2="100%" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.1" style={{ pathLength: ch2LineLength }} />
              <motion.line x1="0" y1="70%" x2="100%" y2="70%" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.1" style={{ pathLength: ch2LineLength }} />
            </svg>

            {/* Image */}
            <motion.div
              className="md:col-span-5 relative h-[300px] sm:h-[420px] md:h-[520px] w-full bg-[#121212] overflow-hidden border border-white/5 rounded-sm"
              style={{ x: parallaxX, y: parallaxY }}
            >
              <motion.div className="w-full h-full relative" style={{ scale: ch2ImageScale }}>
                <Image
                  src="/oversized_tee_hero.png"
                  alt="ARC OPUS Style Lab Silhouette"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain object-center bg-[#121212]"
                  priority
                />
              </motion.div>
              <span className="absolute bottom-4 left-4 font-caption text-[8px] tracking-widest text-white/25 uppercase">
                GRID REF: 001/01
              </span>
            </motion.div>

            {/* Text */}
            <div className="md:col-span-7 space-y-6 relative z-10">
              <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black block">
                01 / GEOMETRIC TAILORING
              </span>
              <h2 className="font-hero text-2xl sm:text-4xl md:text-5xl tracking-wide uppercase text-white leading-tight">
                EVERY STITCH<br />HAS PURPOSE.
              </h2>
              <div className="w-12 h-[1px] bg-brand-red" />
              <p className="font-sans text-xs sm:text-sm text-white/55 leading-relaxed max-w-[550px]">
                At ARC OPUS, we reject the notion of fast fashion and generic templates. Every garment in our registry is designed relative to the human form as an architectural space. We map fabric tensions, drape weights, and movement paths using proprietary skeleton calculations.
              </p>
              <p className="font-sans text-xs sm:text-sm text-white/55 leading-relaxed max-w-[550px]">
                The results are garments that hold their shape rigidly while floating comfortably over joints. Mock neck lines, drop-shoulders, and boxy fits are engineered to construct a bold, structured posture.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════ CHAPTER 3: FEMALE STORY (Moved Here) ═══════════════════ */}
        <motion.div
          className="story-chapter z-10"
          style={{ opacity: ch3Opacity, y: ch3Y }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center w-full max-w-[1400px] mx-auto">
            {/* Image */}
            <motion.div
              className="md:col-span-5 relative h-[300px] sm:h-[420px] md:h-[520px] w-full bg-[#121212] overflow-hidden border border-white/5 rounded-sm"
              style={{ x: parallaxX, y: parallaxY }}
            >
              <motion.div className="w-full h-full relative" style={{ scale: ch3ImageScale }}>
                <Image
                  src="/denim_jacket_2.jpg"
                  alt="ARC OPUS Craftsmanship jacket detail"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain object-center bg-[#121212]"
                />
              </motion.div>
              <span className="absolute bottom-4 left-4 font-caption text-[8px] tracking-widest text-white/25 uppercase">
                STUDIO REF: 001/02
              </span>
            </motion.div>

            {/* Text & CTA */}
            <div className="md:col-span-7 space-y-8 relative z-10">
              <div className="space-y-4">
                <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black block">
                  02 / THE FUTURE
                </span>
                <h2 className="font-hero text-2xl sm:text-4xl md:text-5xl tracking-wide uppercase text-white leading-tight">
                  CRAFTING VALUE<br />IN PERPETUITY.
                </h2>
              </div>

              <div className="w-12 h-[1px] bg-brand-red" />

              <div className="space-y-5 font-sans text-xs sm:text-sm text-white/55 leading-relaxed max-w-[550px]">
                <p>
                  Every fabric roll is sourced from select heritage mills across Japan and Portugal. By integrating high-precision textile mapping with slow, deliberate manual assembly, we ensure each item withstands wear for a lifetime.
                </p>
                <p>
                  The digital configurator lab represents our step towards a cleaner, more deliberate consumption cycle: previewing structural drape blueprints, custom fitting profiles, and shipping on-demand without producing seasonal excess.
                </p>
              </div>

            </div>
          </div>
        </motion.div>

        {/* ═══════════════════ CHAPTER 4: STATS BLUEPRINT ═══════════════════ */}
        <motion.div
          className="story-chapter flex-col z-10"
          style={{ opacity: ch4Opacity, y: ch4Y }}
        >
          {/* Title */}
          <div className="text-center space-y-2 mb-8 select-none relative z-10">
            <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black block">
              TECHNICAL SPECIFICATIONS
            </span>
            <h3 className="font-hero text-xl sm:text-2xl text-white uppercase">
              MATERIAL CORE &amp; VALUES
            </h3>
          </div>

          {/* Blueprint connector SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M 250 180 L 520 130 L 780 180 L 780 450 L 250 480 Z"
              fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" strokeDasharray="4 6"
              style={{ pathLength: ch4LineLength }}
            />
            <motion.path
              d="M 250 180 L 520 130 L 780 180 L 780 450 L 250 480 Z"
              fill="none" stroke="#C10E1D" strokeWidth="1"
              style={{ pathLength: ch4LineLength }}
            />
          </svg>

          {/* Cards */}
          <div className="relative w-full h-[55vh] flex flex-col md:block items-center">
            {statsCards.map((card, i) => (
              <motion.div
                key={card.id}
                className="blueprint-card rounded-sm"
                style={{
                  left: card.x,
                  top: card.y,
                  rotate: card.rot,
                  opacity: cardOpacities[i],
                }}
              >
                <div className="blueprint-card-corner blueprint-card-corner-tl" />
                <div className="blueprint-card-corner blueprint-card-corner-tr" />
                <div className="blueprint-card-corner blueprint-card-corner-bl" />
                <div className="blueprint-card-corner blueprint-card-corner-br" />
                <div className="space-y-2 relative select-none">
                  <span className="font-caption text-[8px] tracking-[0.2em] text-brand-red uppercase font-black">{card.label}</span>
                  <h4 className="font-hero text-sm tracking-wide text-[#F5F5F5] uppercase">{card.value}</h4>
                  <p className="font-sans text-[10px] text-white/50">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══════════════════ CHAPTER 5: MANIFESTO ═══════════════════ */}
        <motion.div
          className="story-chapter flex-col text-center z-10"
          style={{ opacity: ch5Opacity, y: ch5Y }}
        >
          {/* Glow overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: ch5GlowOpacity,
              background: 'radial-gradient(ellipse at center, rgba(193, 14, 29, 0.06) 0%, transparent 70%)'
            }}
          />

          <div className="space-y-6 max-w-[1000px] mx-auto px-6 relative z-10 text-manifesto-glow">
            <motion.p
              className="font-hero text-2xl sm:text-4xl md:text-5xl text-white tracking-wide uppercase leading-normal"
              style={{ scale: ch5Scale }}
            >
              WE DON&apos;T <span className="word-glow-red font-black">FOLLOW</span> TRENDS.<br />
              WE ENGINEER <span className="font-black text-[#F5F5F5]">GARMENTS</span>.
            </motion.p>

            <div className="w-12 h-[1px] bg-brand-red mx-auto" />

            <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black block pb-8">
              ARC OPUS MANIFESTO
            </span>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <Link
                href="/shop"
                className="group font-heading text-[10px] tracking-[0.2em] uppercase bg-[#F5F5F5] text-[#050505] px-10 py-5 hover:bg-brand-red hover:text-white transition-all duration-500 font-bold inline-flex items-center space-x-3 rounded-sm"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:text-white group-hover:fill-white transition-colors duration-500" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
