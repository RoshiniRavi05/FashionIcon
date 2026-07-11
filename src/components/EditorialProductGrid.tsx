"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DEFAULT_PRODUCTS } from '@/data/products';

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
  const products = DEFAULT_PRODUCTS.slice(0, 3);

  return (
    <section className="relative w-full bg-[#050505] py-32 overflow-hidden border-t border-white/5">
      
      {/* Background Campaign Image (Flipo aesthetic) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/denim_jacket_2.jpg"
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

      {/* Huge Faded Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2] overflow-hidden">
        <h2 className="font-hero text-[16vw] leading-[0.8] tracking-tighter text-white opacity-[0.02] uppercase text-center flex flex-col whitespace-nowrap select-none">
          <span>ARCHIVE</span>
          <span>CRAFTED</span>
          <span>CAPSULE</span>
          <span>CAMPAIGN</span>
        </h2>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black">
              LATEST ARRIVALS
            </span>
            <h2 className="font-hero text-2xl md:text-4xl tracking-wide uppercase text-white">
              EDITORIAL REGISTRY
            </h2>
          </div>
          <Link 
            href="/shop"
            className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-brand-red transition-colors flex items-center space-x-2"
          >
            <span>View Full Registry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Flipo-Inspired Nested Asymmetrical Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-[2fr_1.3fr] gap-7"
        >
          
          {/* LEFT COLUMN (2fr) */}
          <div className="flex flex-col gap-7">
            {/* Top Inner Grid for Card 1 & Card 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {/* Product 1: Portrait */}
              <motion.div variants={itemVariants} className="w-full">
                <ProductCard product={products[0]} aspectClass="min-h-[520px]" collection="DROP 002" />
              </motion.div>

              {/* Product 2: Portrait (slightly taller) */}
              <motion.div variants={itemVariants} className="w-full">
                <ProductCard product={products[1]} aspectClass="min-h-[580px]" collection="COLLECTION 01" />
              </motion.div>
            </div>

            {/* Bottom: Editorial Story Card */}
            <motion.div variants={itemVariants} className="w-full">
              <Link href="/collections" className="group block relative w-full h-full min-h-[340px] rounded-[32px] overflow-hidden bg-[#0A0A0A] border border-white/[0.05] flex items-center p-12 transition-all duration-700 ease-out hover:-translate-y-[6px] rotate-[-1deg] hover:scale-[1.02] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col items-start text-left space-y-6">
                  <div className="w-12 h-px bg-brand-red mb-2" />
                  <h3 className="font-hero text-3xl lg:text-5xl uppercase tracking-wider text-white">
                    ARC OPUS
                  </h3>
                  <p className="font-heading text-lg lg:text-xl tracking-[0.15em] text-white/80 uppercase">
                    Crafted Beyond Ordinary.
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-white/60 max-w-[400px] leading-relaxed mt-2">
                    An exploration of architectural silhouettes,<br />technical tailoring,<br />and material experimentation.
                  </p>
                  <div className="pt-4">
                    <span className="font-caption text-[10px] tracking-[0.2em] uppercase bg-white text-black px-6 py-3 font-bold flex items-center space-x-2 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                      <span>View Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (1.3fr) */}
          <div className="flex flex-col gap-7">
            {/* Product 3: Hero (visually dominant) */}
            <motion.div variants={itemVariants} className="w-full">
              <ProductCard product={products[2]} aspectClass="min-h-[750px]" collection="LIMITED EDITION" isHero />
            </motion.div>

            {/* Bottom: Technical Manifest Card */}
            <motion.div variants={itemVariants} className="w-full">
              <div className="group block relative w-full h-full min-h-[320px] rounded-[32px] overflow-hidden bg-[#0A0A0A] border border-white/[0.05] flex flex-col items-center justify-center p-8 transition-all duration-700 ease-out hover:-translate-y-[6px] rotate-[1deg] hover:scale-[1.02] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                 <div className="absolute top-8 left-8 right-8 flex justify-between">
                    <span className="w-3 h-3 border-t border-l border-white/20" />
                    <span className="w-3 h-3 border-t border-r border-white/20" />
                 </div>
                 <div className="absolute bottom-8 left-8 right-8 flex justify-between">
                    <span className="w-3 h-3 border-b border-l border-white/20" />
                    <span className="w-3 h-3 border-b border-r border-white/20" />
                 </div>
                 <div className="w-full h-full flex flex-col justify-center items-center text-center space-y-4">
                    <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black border-b border-brand-red/30 pb-2 mb-2">
                      EDITION 001
                    </span>
                    <ul className="font-heading text-xs tracking-[0.2em] text-white/70 uppercase space-y-3">
                      <li>360GSM</li>
                      <li>DOUBLE-YARN</li>
                      <li>MINERAL DYE</li>
                      <li>ARCHITECTURAL FIT</li>
                      <li>TECHNICAL TAILORING</li>
                    </ul>
                 </div>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product, aspectClass, collection, isHero = false }: { product: any; aspectClass: string; collection: string; isHero?: boolean }) {
  return (
    <Link 
      href={`/product/${product.id}`}
      className={`group block relative w-full h-full rounded-[32px] overflow-hidden bg-[#0A0A0A] border border-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-700 ease-out hover:-translate-y-[6px] hover:scale-[1.02] ${aspectClass}`}
    >
      <div className="absolute inset-0 p-7 flex items-center justify-center z-[10]">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      </div>

      <div className={`absolute p-6 z-[20] ${isHero ? 'bottom-0 left-0' : 'top-0 right-0'}`}>
        <div className="bg-[rgba(0,0,0,0.55)] backdrop-blur-[12px] border border-white/[0.08] rounded-xl py-2.5 px-4 flex flex-col items-start transition-colors duration-500 group-hover:bg-[rgba(0,0,0,0.7)] shadow-lg">
          <p className="font-caption text-[9px] tracking-widest text-white/50 uppercase">
            {product.category}
          </p>
          <p className="font-heading text-[11px] font-bold tracking-[0.15em] text-brand-red uppercase pt-0.5">
            {collection}
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center space-x-2 z-[20]">
        <span className="font-sans text-[12px] tracking-[0.06em] text-white uppercase max-w-[140px] text-right truncate">
          {product.name}
        </span>
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
          <ArrowRight className="w-3 h-3 text-black" />
        </div>
      </div>
    </Link>
  );
}
