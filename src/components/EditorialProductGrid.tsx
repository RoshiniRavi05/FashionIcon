"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function EditorialProductGrid() {
  return (
    <section className="relative w-full bg-[#050505] py-32 overflow-hidden border-t border-white/5 min-h-[1000px] flex items-center">
      
      {/* Background Campaign Image & Overlays */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/denim_jacket_2.jpg"
          alt="Campaign Backdrop"
          fill
          className="object-cover object-center opacity-[0.12] blur-[1px]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-[1]" />
        
        {/* Soft Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#050505_120%)] z-[1]" />

        {/* Textures */}
        <div className="absolute inset-0 opacity-[0.05] z-[1]" style={{ backgroundImage: 'url(/blueprint-texture.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 opacity-[0.03] z-[1]" style={{ backgroundImage: 'url(/film-grain.png)' }} />
      </div>

      {/* Huge Faded Typography */}
      <div className="absolute inset-0 flex flex-col justify-between items-center pointer-events-none z-[2] overflow-hidden py-20">
        <span className="font-hero text-[22vw] leading-[0.75] tracking-tighter text-white uppercase select-none opacity-[0.01]">CRAFTED</span>
        <span className="font-hero text-[22vw] leading-[0.75] tracking-tighter text-white uppercase select-none opacity-[0.01]">CAMPAIGN</span>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 lg:mb-24 relative z-30">
          <div className="space-y-4">
            <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black block">
              LATEST ARRIVALS
            </span>
            <h2 className="font-hero text-[clamp(42px,5vw,82px)] leading-[0.95] tracking-[-0.05em] uppercase text-white">
              EDITORIAL REGISTRY
            </h2>
          </div>
          <div className="flex items-center space-x-6">
            <span className="font-heading text-[9px] tracking-widest uppercase text-white/40 text-right">
              SHOT IN STUDIO 04<br/>JUNE 2026
            </span>
          </div>
        </div>

        {/* FL!PØ-Inspired Editorial Collage (12 Column Grid) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start"
        >
          
          {/* ANCHOR: Large Hero Campaign Image */}
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 relative h-[600px] lg:h-[800px] max-w-[700px] w-full mx-auto z-10 group rounded-none md:rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/[0.05]"
          >
            <div className="absolute inset-0 opacity-[0.03] z-[15] pointer-events-none" style={{ backgroundImage: 'url(/film-grain.png)' }} />
            <Image
              src="/denim_jacket_2.jpg"
              alt="Campaign Hero"
              fill
              className="object-contain object-center bg-[#080808] transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              style={{ filter: 'contrast(1.05) brightness(0.95) saturate(0.92)' }}
            />
            {/* Pinned Object - Tiny Meta Tag */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="bg-white px-3 py-1.5 flex items-center space-x-2 shadow-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                <span className="font-caption text-[8px] tracking-[0.2em] text-black uppercase font-black">
                  EDITION 001 &nbsp;|&nbsp; JUNE 2026 &nbsp;|&nbsp; STUDIO 04
                </span>
              </div>
            </div>
            {/* Small Information Tag on Hero */}
            <div className="absolute bottom-6 left-6 z-20 flex items-center space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
              <span className="font-heading text-[10px] tracking-widest text-white uppercase font-bold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                ARCHIVE 01
              </span>
            </div>
          </motion.div>

          {/* FLOATING BLOCK 1: Frosted Glass Campaign Card */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-5 lg:col-span-3 md:col-start-1 md:row-start-1 lg:mt-32 z-20 transform translate-y-[20px] hover:-translate-y-[6px] hover:scale-[1.02] transition-all duration-700 ease-out"
          >
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] flex flex-col justify-between min-h-[300px]">
              <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black border-b border-white/10 pb-4">
                THE CAMPAIGN
              </span>
              <h3 className="font-hero text-3xl lg:text-4xl text-white uppercase mt-6 leading-tight">
                Structured<br/>Fluidity
              </h3>
              <p className="font-sans text-xs text-white/50 mt-4 leading-relaxed">
                A study in contrasting forms, merging rigid tailoring with natural drape.
              </p>
            </div>
          </motion.div>

          {/* FLOATING BLOCK 2: Paper Texture Manifesto Card */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-5 lg:col-span-4 md:col-start-8 lg:col-start-9 md:row-start-1 lg:mt-16 z-20 transform translate-y-[-16px] hover:-translate-y-[22px] hover:scale-[1.02] transition-all duration-700 ease-out md:-ml-8"
          >
            <div className="bg-[#111111] border border-white/5 rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] min-h-[360px] relative overflow-hidden flex flex-col items-center justify-center text-center">
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url(/film-grain.png)' }} />
              
              <span className="font-heading text-[9px] tracking-widest text-white/40 uppercase mb-6">
                TECHNICAL MANIFESTO
              </span>
              
              <ul className="font-heading text-xs lg:text-sm tracking-[0.2em] text-white/80 uppercase space-y-4">
                <li>360GSM HEAVYWEIGHT</li>
                <li className="w-12 h-px bg-white/20 mx-auto" />
                <li>DOUBLE-YARN KNIT</li>
                <li className="w-12 h-px bg-white/20 mx-auto" />
                <li>MINERAL WASH DYE</li>
                <li className="w-12 h-px bg-white/20 mx-auto" />
                <li>ARCHITECTURAL FIT</li>
              </ul>
            </div>
          </motion.div>

          {/* FLOATING BLOCK 3: Matte Black Story Card */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-6 lg:col-span-4 md:col-start-2 lg:col-start-2 md:row-start-2 lg:-mt-32 z-30 transform translate-y-[0px] hover:-translate-y-[6px] hover:scale-[1.02] transition-all duration-700 ease-out"
          >
            <Link href="/story" className="block bg-[#0A0A0A] border border-white/5 rounded-[32px] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] group relative overflow-hidden min-h-[320px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />
              
              <h3 className="font-hero text-4xl lg:text-5xl uppercase tracking-wider text-white">
                ARC OPUS
              </h3>
              <p className="font-heading text-sm lg:text-base tracking-[0.15em] text-white/80 uppercase mt-2">
                Crafted Beyond Ordinary.
              </p>
              
              <p className="font-sans text-xs text-white/50 mt-6 leading-relaxed max-w-[280px]">
                Redefining the modern silhouette through relentless material experimentation and brutalist design principles.
              </p>

              <div className="absolute bottom-10 right-10 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-500">
                <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
              </div>
            </Link>
          </motion.div>

          {/* FLOATING BLOCK 4: Blueprint Collection Card */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-4 lg:col-span-3 md:col-start-8 lg:col-start-8 md:row-start-2 lg:-mt-16 z-20 transform translate-y-[12px] hover:-translate-y-[0px] hover:scale-[1.02] transition-all duration-700 ease-out"
          >
            <div className="bg-[#050505] border border-brand-red/20 rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] relative overflow-hidden min-h-[240px] flex flex-col justify-end">
              <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'url(/blueprint-texture.png)', backgroundSize: 'cover' }} />
              
              <div className="relative z-10">
                <span className="font-caption text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2 block">
                  CAPSULE 001
                </span>
                <span className="font-heading text-lg tracking-widest text-brand-red uppercase font-black">
                  EDITION 001
                </span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
