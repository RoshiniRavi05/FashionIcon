"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LuxuryLoaderProps {
  onComplete: () => void;
}

export const LuxuryLoader: React.FC<LuxuryLoaderProps> = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 1600;
    const incrementTime = Math.floor(duration / end);

    const timer = setInterval(() => {
      start += 1;
      setCounter(start);
      if (start === end) {
        clearInterval(timer);
        setTimeout(() => {
          setShouldRender(false);
          onComplete();
        }, 300);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col justify-between p-12 select-none"
          initial={{ y: 0 }}
          exit={{ y: '-100vh' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Label */}
          <div className="flex justify-between items-center text-[10px] tracking-[0.25em] text-[#F5F5F5]/30 uppercase font-caption">
            <span>ARC OPUS STUDIO</span>
            <span>CAPSULE COLLECTION 01</span>
          </div>

          {/* Logo Center */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              className="font-logo text-3xl md:text-5xl lg:text-6xl tracking-[0.45em] text-[#F5F5F5] font-black"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              ARC OPUS
            </motion.div>
          </div>

          {/* Progress Bar & Counter */}
          <div className="space-y-4">
            <div className="w-full h-[1px] bg-white/5 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-brand-red transition-all duration-[50ms]"
                style={{ width: `${counter}%` }}
              />
            </div>
            <div className="flex justify-between items-center font-caption text-xs tracking-widest text-[#F5F5F5]/40 uppercase">
              <span>CRAFTED BEYOND ORDINARY</span>
              <span className="font-bold text-white">{counter}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
