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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function EditorialProductGrid() {
  // Use first 4 products for the grid
  const products = DEFAULT_PRODUCTS.slice(0, 4);

  return (
    <section className="relative w-full bg-[#050505] py-32 overflow-hidden border-t border-white/5">
      {/* Background Textures */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'url(/blueprint-texture.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
        {/* Subtle Film Grain */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url(/film-grain.png)' }} />
      </div>

      {/* Huge Faded Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <h2 className="font-hero text-[18vw] leading-[0.8] tracking-tighter text-white opacity-[0.025] uppercase text-center flex flex-col whitespace-nowrap select-none">
          <span>CRAFTED</span>
          <span>BEYOND</span>
          <span>ORDINARY</span>
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

        {/* Masonry Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.3fr] gap-6"
        >
          
          {/* Top Row */}
          {/* Product 1: Portrait */}
          <motion.div variants={itemVariants} className="h-full float-anim">
            <ProductCard product={products[0]} aspectClass="min-h-[520px] rotate-[-1deg]" collection="COLLECTION 01" />
          </motion.div>

          {/* Product 2: Portrait */}
          <motion.div variants={itemVariants} className="h-full float-anim-delayed">
            <ProductCard product={products[1]} aspectClass="min-h-[580px]" collection="DROP 002" />
          </motion.div>

          {/* Product 3: Hero (Landscape / Tall) */}
          <motion.div variants={itemVariants} className="h-full lg:col-start-3 lg:row-span-2 float-anim z-10 lg:-mb-12">
            <ProductCard product={products[2]} aspectClass="min-h-[720px] rotate-[1deg]" collection="LIMITED EDITION" />
          </motion.div>

          {/* Bottom Row */}
          {/* Editorial Card: Spans 2 columns */}
          <motion.div variants={itemVariants} className="lg:col-span-2 h-full float-anim-delayed">
            <Link href="/collections" className="group block relative w-full h-full min-h-[340px] rounded-[28px] overflow-hidden bg-[#0A0A0A] border border-white/[0.06] flex items-center justify-center p-12 transition-all duration-700 ease-out hover:-translate-y-[6px] hover:rotate-0 rotate-[-0.5deg] hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              {/* Animated Blueprint Background */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-700 group-hover:opacity-40"
                style={{
                  backgroundImage: 'url(/blueprint-texture.png)',
                  backgroundSize: '200%',
                  animation: 'blueprintPan 20s linear infinite',
                }}
              />
              {/* Radial Gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                <div className="w-px h-12 bg-brand-red mb-2" />
                <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black">
                  COLLECTION 01
                </span>
                <h3 className="font-hero text-4xl lg:text-5xl uppercase tracking-wider text-white">
                  ARC OPUS
                </h3>
                <p className="font-heading text-lg lg:text-xl tracking-[0.15em] text-white/80 uppercase">
                  Crafted Beyond Ordinary
                </p>
                <p className="font-sans text-xs sm:text-sm text-white/60 max-w-[400px] mx-auto leading-relaxed mt-2">
                  An exploration of architectural silhouettes, material experimentation and technical tailoring.
                </p>
                <div className="pt-4">
                  <span className="font-caption text-[10px] tracking-[0.2em] uppercase bg-white text-black px-6 py-3 font-bold flex items-center space-x-2 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                    <span>View Collection 01</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              <style dangerouslySetInnerHTML={{__html: `
                @keyframes blueprintPan {
                  0% { background-position: 0% 0%; }
                  50% { background-position: 100% 100%; }
                  100% { background-position: 0% 0%; }
                }
                @keyframes floatAmbient {
                  0% { transform: translateY(0px); }
                  50% { transform: translateY(-4px); }
                  100% { transform: translateY(0px); }
                }
                .float-anim {
                  animation: floatAmbient 16s ease-in-out infinite;
                }
                .float-anim-delayed {
                  animation: floatAmbient 18s ease-in-out infinite 2s;
                }
              `}} />
            </Link>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}

function ProductCard({ product, aspectClass, collection }: { product: any; aspectClass: string; collection: string }) {
  return (
    <Link 
      href={`/product/${product.id}`}
      className={`group block relative w-full h-full rounded-[28px] overflow-hidden bg-[#0A0A0A] border border-white/[0.06] transition-all duration-700 ease-out hover:-translate-y-[6px] hover:rotate-0 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${aspectClass}`}
    >
      {/* Image Container with Padding */}
      <div className="absolute inset-0 p-6 flex items-center justify-center">
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

      {/* Glass Overlay Details */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center">
        <div className="w-full max-w-[90%] bg-[rgba(0,0,0,0.55)] backdrop-blur-[12px] border border-white/[0.08] rounded-[20px] py-4 px-6 flex flex-col items-center text-center space-y-1.5 transition-colors duration-500 group-hover:bg-[rgba(0,0,0,0.65)]">
          <p className="font-caption text-[11px] tracking-widest text-white/60 uppercase">
            {product.category}
          </p>
          <h3 className="font-sans text-[18px] font-medium tracking-[0.06em] leading-[1.2] text-white uppercase max-w-[180px]">
            {product.name}
          </h3>
          <p className="font-heading text-[16px] font-semibold tracking-wider text-brand-red pt-1">
            {collection}
          </p>
          {/* Hover CTA */}
          <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:pt-3 transition-all duration-500">
            <span className="font-caption text-[10px] tracking-[0.2em] uppercase text-white/80 font-bold flex items-center space-x-1.5 group-hover:text-white">
              <span>VIEW PRODUCT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
