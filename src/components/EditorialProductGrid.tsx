"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function EditorialProductGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  
  const transitionConfig = { duration: 1.6, ease: [0.16, 1, 0.3, 1] as const };
  const hoverConfig = { duration: 1, ease: [0.22, 1, 0.36, 1] as const };

  const subtleTornMaskMain = "polygon(1% 0%, 4% 1.5%, 8% 0%, 12% 1%, 17% 0%, 22% 1.5%, 26% 0%, 31% 1%, 36% 0.5%, 41% 1.5%, 45% 0%, 50% 1%, 55% 0.5%, 60% 1.5%, 64% 0%, 68% 1%, 73% 0.5%, 78% 1.5%, 82% 0%, 87% 1%, 91% 0.5%, 96% 1.5%, 99% 0%, 100% 4%, 98.5% 8%, 100% 13%, 99% 18%, 100% 23%, 98.5% 28%, 100% 33%, 99% 38%, 100% 43%, 98.5% 48%, 100% 53%, 99% 58%, 100% 63%, 98.5% 68%, 100% 73%, 99% 78%, 100% 83%, 98.5% 88%, 100% 93%, 99% 97%, 98% 100%, 94% 98.5%, 89% 100%, 84% 99%, 79% 100%, 74% 98.5%, 69% 100%, 64% 99%, 59% 100%, 54% 98.5%, 49% 100%, 44% 99%, 39% 100%, 34% 98.5%, 29% 100%, 24% 99%, 19% 100%, 14% 98.5%, 9% 100%, 4% 99%, 1% 100%, 0% 96%, 1.5% 91%, 0% 86%, 1% 81%, 0% 76%, 1.5% 71%, 0% 66%, 1% 61%, 0% 56%, 1.5% 51%, 0% 46%, 1% 41%, 0% 36%, 1.5% 31%, 0% 26%, 1% 21%, 0% 16%, 1.5% 11%, 0% 6%)";
  const subtleTornMaskSecondary = "polygon(0% 1%, 5% 0%, 9% 1.5%, 14% 0%, 19% 1%, 23% 0.5%, 28% 1.5%, 33% 0%, 38% 1%, 43% 0.5%, 48% 1.5%, 52% 0%, 57% 1%, 62% 0.5%, 67% 1.5%, 72% 0%, 77% 1%, 82% 0.5%, 86% 1.5%, 91% 0%, 96% 1%, 100% 0%, 98.5% 5%, 100% 10%, 99% 15%, 100% 20%, 98.5% 25%, 100% 30%, 99% 35%, 100% 40%, 98.5% 45%, 100% 50%, 99% 55%, 100% 60%, 98.5% 65%, 100% 70%, 99% 75%, 100% 80%, 98.5% 85%, 100% 90%, 99% 95%, 100% 99%, 95% 100%, 90% 98.5%, 85% 100%, 80% 99%, 75% 100%, 70% 98.5%, 65% 100%, 60% 99%, 55% 100%, 50% 98.5%, 45% 100%, 40% 99%, 35% 100%, 30% 98.5%, 25% 100%, 20% 99%, 15% 100%, 10% 98.5%, 5% 100%, 1% 99%, 0% 94%, 1.5% 89%, 0% 84%, 1% 79%, 0% 74%, 1.5% 69%, 0% 64%, 1% 59%, 0% 54%, 1.5% 49%, 0% 44%, 1% 39%, 0% 34%, 1.5% 29%, 0% 24%, 1% 19%, 0% 14%, 1.5% 9%, 0% 4%)";

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[#000000] z-10 border-t border-white/5 py-32 md:py-48"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
          
          {/* LEFT COLUMN: 45% (col-span-5) */}
          <div className="md:col-span-5 flex flex-col justify-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0, transition: { ...transitionConfig, delay: 0.1 } }}
              viewport={{ once: true, margin: "-10%" }}
            >
              <h3 
                className="font-hero text-white uppercase flex flex-col mb-10"
                style={{ fontSize: 'clamp(2rem, 3.8vw, 4.4rem)', lineHeight: 0.9, letterSpacing: '-0.04em' }}
              >
                <span className="block opacity-90">EDITORIAL</span>
                <span className="block opacity-90">STUDY</span>
                <span className="block opacity-90 text-brand-red">VOL.01</span>
              </h3>

              <div className="space-y-6 max-w-[420px]">
                <h4 className="font-heading text-xs tracking-[0.3em] uppercase text-white/50 border-b border-white/10 pb-4">
                  DESIGN ARCHIVE
                </h4>
                <p className="font-sans text-[13px] md:text-[14px] leading-relaxed text-[#F4F1EC]/70">
                  Exploring unconventional silhouettes, material innovation, and timeless construction techniques. A precise study in architectural draping.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { ...transitionConfig, delay: 0.3 } }}
              viewport={{ once: true, margin: "-10%" }}
            >
              <Link
                href="/journal"
                className="group font-heading text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[#F4F1EC] inline-flex flex-col relative pb-3 w-fit"
              >
                <span className="relative z-10 flex items-center gap-4 transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:tracking-[0.3em]">
                  EXPLORE JOURNAL <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-3 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                </span>
                <div className="absolute bottom-0 left-0 h-[1px] bg-white/20 w-full" />
                <div className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-700 ease-[0.16,1,0.3,1]" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: 55% (col-span-7) */}
          <div className="md:col-span-7 relative flex justify-end mt-12 md:mt-0 md:-ml-[160px]">
            
            <div className="relative w-full max-w-[850px] h-[70vh] md:h-[90vh]">
              
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, clipPath: 'inset(10% 10% 10% 10%)' }}
                whileInView={{ opacity: 1, clipPath: subtleTornMaskMain, transition: { ...transitionConfig, delay: 0.2 } }}
                viewport={{ once: true, margin: "-20%" }}
                className="absolute top-[5%] right-0 w-[75%] h-[85%] z-20 origin-center bg-[#111111] overflow-hidden"
              >
                <motion.div style={{ y: imgY, width: '100%', height: '115%' }} className="absolute -top-[10%] left-0">
                  <Image
                    src="/oversized_tee_hero.png"
                    alt="Editorial Main Study"
                    fill
                    className="object-cover object-center grayscale-[15%] hover:grayscale-0 hover:scale-[1.02] transition-all duration-1000 ease-[0.16,1,0.3,1]"
                    priority
                  />
                </motion.div>
              </motion.div>

              {/* Secondary Image - Peeks under bottom-left corner with 2deg rotation and torn edge */}
              <motion.div
                initial={{ opacity: 0, clipPath: 'inset(10% 10% 10% 10%)', y: 30, rotate: -10 }}
                whileInView={{ opacity: 1, clipPath: subtleTornMaskSecondary, y: 0, rotate: 2, transition: { ...transitionConfig, delay: 0.4 } }}
                viewport={{ once: true, margin: "-20%" }}
                className="absolute bottom-[5%] left-[10%] w-[40%] h-[48%] z-30 origin-center bg-[#0A0A0A] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/graphic_tee_hero.jpg"
                    alt="Editorial Secondary Study"
                    fill
                    className="object-cover object-center grayscale-[40%] hover:grayscale-0 hover:scale-[1.02] transition-all duration-1000 ease-[0.16,1,0.3,1]"
                  />
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
