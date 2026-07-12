"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CollectionsPage() {
  const collections = [
    {
      id: 't-shirts',
      name: 'TEES & BASES',
      desc: 'Oversized heavy cotton mock-necks, graphic panel prints, and minimal base layers.',
      image: '/oversized_tee_hero.png',
      tagline: 'Blueprints of Layering',
      code: 'CAPSULE_001_TEES'
    },
    {
      id: 'jackets',
      name: 'OUTERWEAR SHELLS',
      desc: 'Rigid selvedge denim, technical puffers, collegiate varsity models, and tactical flight bombers.',
      image: '/denim_jacket_hero.jpg',
      tagline: 'Technical Shields',
      code: 'CAPSULE_001_OUTER'
    },
    {
      id: 'bottoms',
      name: 'PANTS & BLUEPRINTS',
      desc: 'Modular tactical cargo systems, stone-washed straight jeans, and double-pleated wool trousers.',
      image: '/bottoms/c1.png',
      tagline: 'Structural Outlines',
      code: 'CAPSULE_001_BOTTOMS'
    },
    {
      id: 'shoes',
      name: 'ACQUISITION FOOTWEAR',
      desc: 'Cupsole full-grain leather sneakers and lugged commando elastic Chelsea boots.',
      image: '/acid_wash_sneakers.png',
      tagline: 'Substance Anchors',
      code: 'CAPSULE_001_FOOTWEAR'
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen py-20 flex flex-col overflow-y-scroll selection:bg-brand-red selection:text-white">
      
      {/* 1. Fixed Header Section */}
      <section className="w-full flex-shrink-0">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 space-y-4 pt-10">
          <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black block">
            ARC OPUS CAMPAIGNS
          </span>
          <h1 className="font-hero text-3xl sm:text-5xl tracking-wide uppercase text-white m-0">
            CAPSULE RELEASES
          </h1>
          <p className="font-sans text-xs text-white/50 max-w-[520px] leading-relaxed m-0">
            Explore the technical classifications of ARC OPUS. Every capsule group represents a focused exploration of geometric silhouettes and unique fabric washes.
          </p>
        </div>
        
        {/* Invisible spacer to match the exact height of the Shop filters (155px) */}
        <div className="w-full h-[155px] pointer-events-none" />
      </section>

      {/* 2. Grid Section */}
      <section className="w-full flex-grow">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 min-h-[600px]">
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((coll, idx) => (
              <motion.div
                key={coll.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group relative h-[600px] bg-[#121212] overflow-hidden flex flex-col justify-between p-12 border border-white/5"
              >
                {/* Image */}
                <div className="absolute inset-0 z-0 brightness-[0.6] group-hover:brightness-[0.4] transition-all duration-700 ease-out group-hover:scale-105">
                  <Image
                    src={coll.image}
                    alt={coll.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Top Info */}
                <div className="relative z-10 flex justify-between items-start font-caption text-[9px] tracking-[0.25em] text-white/50 uppercase">
                  <span>{coll.code}</span>
                  <span className="text-brand-red font-black">EDITION 01</span>
                </div>

                {/* Bottom info & actions */}
                <div className="relative z-10 space-y-6">
                  <span className="font-caption text-[10px] tracking-[0.25em] text-brand-red uppercase font-bold block">
                    {coll.tagline}
                  </span>
                  <h2 className="font-hero text-2xl tracking-wide text-white uppercase">
                    {coll.name}
                  </h2>
                  <p className="font-sans text-xs text-white/60 leading-relaxed max-w-[400px]">
                    {coll.desc}
                  </p>
                  
                  <Link
                    href={`/collections/${coll.id}`}
                    className="group font-heading text-[10px] tracking-[0.2em] uppercase bg-[#F5F5F5] text-[#050505] hover:bg-brand-red hover:text-white px-8 py-3.5 transition-all duration-300 font-bold inline-flex items-center space-x-2"
                  >
                    <span>DISCOVER ITEMS</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:text-white transition-colors duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
