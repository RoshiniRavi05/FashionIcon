"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const capsuleDetails = [
  {
    name: 'Geometric Oversized',
    imageHero: '/oversized_tee_hero.png',
    imageDetail: '/graphic_tee_hero.jpg',
    imageDetail2: '/mens_vintage.png',
    heading: 'GEOMETRIC',
    headingLine2: 'OVERSIZED',
    headingLine3: 'T-SHIRT.',
    description: 'A study in volume. 420gsm cotton drop-shoulder silhouette designed for architectural drape and maximum airflow.',
    note2Title: 'STRUCTURAL INTEGRITY',
    note2Text: 'Heavyweight loopback cotton construction ensures the garment retains its architectural form over time.',
    path: '/category/tops'
  },
  {
    name: 'Brutalist Jackets',
    imageHero: '/denim_jacket_hero.jpg',
    imageDetail: '/denim_jacket_2.jpg',
    imageDetail2: '/garment_architecture_1783773242237.png',
    heading: 'BRUTALIST',
    headingLine2: 'DENIM',
    headingLine3: 'JACKET.',
    description: 'Handmade runway jackets combining layered distressed fabrics, brutalist metal hardware, and hand-aged distressed canvas.',
    note2Title: 'HARDWARE SPECS',
    note2Text: 'Industrial-grade brutalist zippers and custom oxidized metal buttons provide enduring mechanical contrast.',
    path: '/category/outerwear'
  }
];

export default function EditorialScrollSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < capsuleDetails.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <section 
      className="relative w-full bg-[#050505] overflow-hidden z-10 border-t border-white/5 md:h-screen flex flex-col"
    >
      <div 
        className="w-full flex h-[120vh] md:h-full relative z-10 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {capsuleDetails.map((capsule, index) => (
          <div 
            key={index}
            className="capsule-panel relative w-full h-full flex-shrink-0 border-b md:border-b-0 border-white/5"
          >
            {/* Subtle Atmosphere Layer */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: 'url(/film-grain.png)' }} />
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.01]">
                <span className="font-hero text-[30vw] tracking-tighter text-white uppercase whitespace-nowrap">ARC OPUS</span>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div 
              data-parallax="y:-60"
              className="hero-image absolute top-[10vh] right-[5vw] z-20 w-[80vw] h-[50vh] md:w-[42vw] md:h-[75vh]"
            >
              <Image
                src={capsule.imageHero}
                alt="Hero Portrait"
                fill
                className="object-contain object-right drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                priority={index === 0}
              />
            </div>

            {/* TITLE - Moved higher and sized carefully to avoid overlaps */}
            <div
              data-parallax="y:-20"
              className="absolute top-[12vh] left-[5vw] z-30 pointer-events-none mix-blend-difference w-[90vw] md:w-[50vw]"
            >
              <h3 className="font-hero text-white uppercase flex flex-col" style={{ fontSize: 'clamp(44px, 5.5vw, 82px)', lineHeight: 0.95, letterSpacing: '-0.04em' }}>
                <span className="title-line block">{capsule.heading}</span>
                <span className="title-line block ml-[4vw]">{capsule.headingLine2}</span>
                <span className="title-line block ml-[8vw]">{capsule.headingLine3}</span>
              </h3>
            </div>

            {/* PRIMARY PAPER NOTE */}
            <div
              className="paper-note absolute z-40 bg-[#F3EFE9] text-[#050505] p-[24px] md:p-[28px] rounded-[20px] w-[260px] md:w-[320px] shadow-[0_30px_80px_rgba(0,0,0,0.6)] hover:scale-105 hover:-rotate-3 transition-all duration-700 ease-[0.16,1,0.3,1] cursor-pointer bottom-[50vh] right-[5vw] md:bottom-[40vh] md:left-[34vw] md:right-auto"
              style={{ transform: 'rotate(-2deg)' }}
            >
              <span className="font-heading text-[9px] tracking-[0.25em] uppercase font-bold block mb-4 border-b border-black/10 pb-3">
                MATERIAL STUDY
              </span>
              <p className="font-sans text-[12px] leading-relaxed opacity-85">
                {capsule.description}
              </p>
            </div>

            {/* SECONDARY PAPER NOTE (Fills the blank space) */}
            <div
              className="paper-note-2 absolute z-30 bg-[#111111] border border-white/10 text-[#F3EFE9] p-[24px] md:p-[28px] rounded-[20px] w-[240px] md:w-[280px] shadow-[0_30px_80px_rgba(0,0,0,0.8)] hover:scale-105 hover:rotate-3 transition-all duration-700 ease-[0.16,1,0.3,1] cursor-pointer bottom-[30vh] right-[5vw] md:bottom-[12vh] md:left-[34vw] md:right-auto"
              style={{ transform: 'rotate(2deg)' }}
            >
              <span className="font-heading text-[9px] tracking-[0.25em] uppercase font-bold block mb-4 border-b border-white/10 pb-3 text-white/50">
                {capsule.note2Title}
              </span>
              <p className="font-sans text-[11px] md:text-[12px] leading-relaxed opacity-75">
                {capsule.note2Text}
              </p>
            </div>

            {/* DETAIL IMAGE 1 */}
            <div
              className="detail-image absolute bottom-[10vh] left-[5vw] z-20 w-[24vw] md:w-[12vw] aspect-[3/4] hover:scale-105 hover:-rotate-2 transition-transform duration-700 ease-out cursor-pointer"
            >
              <Image
                src={capsule.imageDetail}
                alt="Campaign Detail"
                fill
                className="object-cover object-center rounded-[8px] opacity-90 shadow-2xl"
              />
            </div>

            {/* DETAIL IMAGE 2 (Fills the blank space) */}
            <div
              className="detail-image-2 absolute bottom-[10vh] left-[20vw] z-10 w-[20vw] md:w-[10vw] aspect-square hover:scale-110 hover:rotate-2 transition-transform duration-700 ease-out cursor-pointer"
            >
              <Image
                src={capsule.imageDetail2}
                alt="Campaign Detail 2"
                fill
                className="object-cover object-center rounded-[8px] opacity-70 shadow-2xl mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
              />
            </div>

            {/* METADATA */}
            <div className="absolute top-[5vh] left-[5vw] z-20 mix-blend-difference">
              <span className="font-heading text-[10px] tracking-[0.4em] text-white/50 uppercase">ARCHIVE 0{index + 1}</span>
            </div>

            {/* CTA - ONLY VISIBLE ON THE LAST PANEL */}
            {index === capsuleDetails.length - 1 && (
              <div className="absolute bottom-[8vh] right-[30vw] z-50 bg-[#0a0a0a]/80 p-4 px-6 rounded-[12px] backdrop-blur-md border border-white/20 shadow-2xl">
                <Link
                  href={capsule.path}
                  className="group font-heading text-[12px] tracking-[0.3em] uppercase text-white inline-block relative"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    EXPLORE SERIES <ArrowRight className="w-4 h-4 group-hover:translate-x-2 group-hover:text-white group-hover:fill-white transition-all duration-500" />
                  </span>
                  <div className="absolute bottom-[-6px] left-0 h-[2px] bg-white w-0 group-hover:w-full transition-all duration-700 ease-[0.19,1,0.22,1]" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-[5vh] right-[5vw] z-50 flex gap-4">
        <button 
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={`p-4 rounded-full border border-white/20 backdrop-blur-md transition-all duration-300 ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed text-white/50' : 'hover:bg-white hover:text-black hover:scale-110 text-white shadow-[0_10px_30px_rgba(255,255,255,0.1)]'}`}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentIndex === capsuleDetails.length - 1}
          className={`p-4 rounded-full border border-white/20 backdrop-blur-md transition-all duration-300 ${currentIndex === capsuleDetails.length - 1 ? 'opacity-30 cursor-not-allowed text-white/50' : 'hover:bg-white hover:text-black hover:scale-110 text-white shadow-[0_10px_30px_rgba(255,255,255,0.1)]'}`}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
