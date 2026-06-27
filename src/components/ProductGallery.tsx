"use client";

import React, { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const labels = ["Front", "Back", "Side"];

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div 
        ref={containerRef}
        className="relative h-[500px] sm:h-[650px] bg-[#0c0c0e] border border-white/5 overflow-hidden flex items-center justify-center cursor-crosshair group rounded-sm"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {/* The base image that scales slightly on entrance */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={images[currentIndex]}
                alt={`${productName} view ${currentIndex + 1}`}
                fill
                className={`object-contain object-center transition-opacity duration-300 ${isZooming ? 'opacity-0' : 'opacity-100'}`}
                priority
              />
            </motion.div>

            {/* The zoomed image layer */}
            <div 
              className={`absolute inset-0 w-full h-full transition-opacity duration-300 pointer-events-none ${isZooming ? 'opacity-100' : 'opacity-0'}`}
              style={{
                backgroundImage: `url(${images[currentIndex]})`,
                backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                backgroundSize: '200%',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-none w-24 h-32 sm:w-28 sm:h-36 bg-[#0c0c0e] overflow-hidden snap-center transition-all duration-300 rounded-sm group flex items-end justify-center pb-2 ${
                currentIndex === idx 
                  ? 'border border-[#C10E1D] brightness-100' 
                  : 'border border-white/5 brightness-50 hover:brightness-90'
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-contain object-center absolute inset-0 z-0"
              />
              <span className="relative z-10 text-[9px] font-heading tracking-widest uppercase text-white/80 bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                {labels[idx] || `View ${idx + 1}`}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
