import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { journals } from '@/data/journals';

// ─── ANIMATION WRAPPERS ───
export const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const RevealText = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── PARALLAX IMAGE ───
export const ParallaxImage = ({ src, alt, className = "", imgClassName = "", priority = false, yOffset = 5 }: { src: string, alt: string, className?: string, imgClassName?: string, priority?: boolean, yOffset?: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${yOffset}%`, `${yOffset}%`]);

  return (
    <div ref={ref} className={`w-full overflow-hidden flex justify-center group ${className}`}>
      <motion.div style={{ y }} className="w-full relative flex justify-center">
        <Image 
          src={src} 
          alt={alt} 
          width={2000} 
          height={2000} 
          className={`w-full h-auto object-contain transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] grayscale-[30%] brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.01] ${imgClassName}`} 
          sizes="(max-width: 768px) 100vw, 80vw"
          priority={priority}
        />
      </motion.div>
    </div>
  );
};

// ─── RELATED JOURNALS ───
export const RelatedJournals = ({ currentId }: { currentId: string }) => {
  const related = journals.filter(j => j.id !== currentId).slice(0, 3);
  
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-[180px] mt-[120px] border-t border-white/10 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[40px] bg-brand-red/50"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[80px]">
        {related.map((art, idx) => (
          <Reveal key={art.id} delay={idx * 0.1}>
            <Link href={`/journal/${art.id}`} className="group cursor-pointer flex flex-col items-center text-center">
              <div className="w-full mb-[40px] flex justify-center">
                 <Image src={art.image} alt={art.title} width={800} height={1000} className="w-full h-auto object-contain max-h-[50vh] transition-all duration-[1200ms] opacity-60 grayscale-[50%] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-[1.02]" />
              </div>
              <h4 className="font-heading text-[18px] md:text-[20px] tracking-widest uppercase text-white mb-4 group-hover:text-brand-red transition-colors duration-500">
                {art.title}
              </h4>
              <p className="font-caption text-[11px] tracking-[0.2em] text-white/40 uppercase relative overflow-hidden">
                <span className="block group-hover:-translate-y-full transition-transform duration-500">{art.readTime}</span>
                <span className="absolute top-full left-0 block text-brand-red group-hover:-translate-y-full transition-transform duration-500">READ ARTICLE</span>
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
};
