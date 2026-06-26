"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JournalPage() {
  const articles = [
    {
      id: 1,
      title: 'CAPSULE 01: BLUEPRINT DESIGN NOTES',
      category: 'Campaigns',
      date: 'JUNE 2026',
      image: '/oversized_tee_hero.png',
      excerpt: 'Detailing the structural drafting, mock-neck ribbing dimensions, and fabric selection processes behind our heavyweight tee releases.'
    },
    {
      id: 2,
      title: 'TACTICAL LAYERING STYLE GUIDE',
      category: 'Style Guide',
      date: 'MAY 2026',
      image: '/denim_jacket_hero.jpg',
      excerpt: 'Explore how to combine oversized organic tees, tactical utility cargo bottoms, and heavy denim truckers to achieve sleek architectural silhouettes.'
    },
    {
      id: 3,
      title: 'PORTUGAL MILL VISIT: TRACEABLE SOURCING',
      category: 'Ethos',
      date: 'APRIL 2026',
      image: '/denim_jacket_2.jpg',
      excerpt: 'A behind-the-scenes logging of our manufacturing trip to the family-owned mills weaving our signature 360gsm double-yarn combed cotton.'
    },
    {
      id: 4,
      title: 'THE GEOMETRIC AVATAR: STYLE SIMULATORS',
      category: 'Innovation',
      date: 'MARCH 2026',
      image: '/acid_wash_sneakers.png',
      excerpt: 'A look into how WebGL and Three.js skeleton rigging is bringing physical high-end showroom configurators directly to browsers.'
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen py-20 px-6 md:px-12 max-w-[1600px] mx-auto space-y-20">
      
      {/* Title */}
      <div className="space-y-4 pt-10">
        <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black">
          EDITORIAL ARCHIVES
        </span>
        <h1 className="font-hero text-3xl sm:text-5xl tracking-wide uppercase text-white">
          THE JOURNAL
        </h1>
        <p className="font-sans text-xs text-white/50 max-w-[520px] leading-relaxed">
          Deep-dives into styling theory, technical material log files, and behind-the-scenes production runs at ARC OPUS.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {articles.map((art, idx) => (
          <motion.article 
            key={art.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group flex flex-col space-y-6"
          >
            {/* Image Box */}
            <div className="relative h-[360px] bg-[#121212] overflow-hidden border border-white/5">
              <Image
                src={art.image}
                alt={art.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-75 group-hover:brightness-50"
              />
              <span className="absolute top-6 left-6 font-caption text-[9px] tracking-[0.2em] text-white/80 bg-[#050505] border border-white/10 px-3 py-1.5 uppercase font-bold">
                {art.category}
              </span>
            </div>

            {/* Content Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center font-caption text-[9px] tracking-widest text-white/40 uppercase">
                <span>POSTED BY ARC OPUS EDITORIAL</span>
                <span>{art.date}</span>
              </div>
              <h2 className="font-heading text-lg tracking-wider text-white uppercase group-hover:text-brand-red transition-colors duration-300">
                {art.title}
              </h2>
              <p className="font-sans text-xs text-white/50 leading-relaxed">
                {art.excerpt}
              </p>

              <div className="pt-2">
                <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-brand-red transition-colors flex items-center space-x-2 w-fit">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
