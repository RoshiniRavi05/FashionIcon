"use client";

import React from 'react';
import { JournalArticle } from '@/data/journals';
import { Reveal, RevealText, ParallaxImage, RelatedJournals } from './ArticleShared';

export default function TacticalLayeringArticle({ article }: { article: JournalArticle }) {
  return (
    <main className="w-full max-w-[1600px] mx-auto px-6 md:px-20 pt-[200px] pb-[100px] bg-[#0A0A0A]">
      
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center text-center pb-[120px] md:pb-[180px]">
        <RevealText>
          <span className="font-caption text-[11px] md:text-[12px] tracking-[0.3em] text-white/50 uppercase block mb-[24px]">
            {article.category}
          </span>
        </RevealText>
        <RevealText delay={0.1}>
          <div className="flex justify-center items-center space-x-3 font-caption text-[11px] tracking-[0.2em] text-white/40 uppercase mb-[60px]">
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-sm bg-brand-red"></span>
            <span>{article.readTime} read</span>
          </div>
        </RevealText>
        <RevealText delay={0.2}>
          <h1 className="font-hero text-[48px] md:text-[60px] lg:text-[72px] tracking-tight uppercase text-white leading-[1.1] max-w-[900px] mb-[60px] mx-auto">
            {article.title}
          </h1>
        </RevealText>
        <RevealText delay={0.3}>
          <p className="font-sans text-[18px] text-white/70 leading-[1.7] tracking-wide max-w-[700px] mx-auto mt-[40px]">
            {article.content.intro}
          </p>
        </RevealText>
        
        <div className="w-full mt-[120px]">
           <ParallaxImage src={article.images.hero} alt={article.title} imgClassName="max-h-[90vh] shadow-2xl" priority />
        </div>
      </section>

      {/* Layering Layout (Layout B: small top, large below overlapping) */}
      <section className="w-full py-[120px] md:py-[180px] relative flex flex-col items-center">
         <RevealText className="z-20 mb-[-100px] md:mb-[-150px] relative ml-auto mr-[10%] bg-[#111] p-8 max-w-[400px] border border-white/5 shadow-2xl">
            <h3 className="font-heading text-[12px] tracking-[0.25em] uppercase text-brand-red mb-[20px]">Layer 01</h3>
            <p className="font-sans text-[16px] text-white/80 leading-[1.7] tracking-wide">
              {article.content.fabric}
            </p>
         </RevealText>
         <Reveal className="w-full max-w-[1000px] z-10 relative">
            <ParallaxImage src={article.images.midShot} alt="Layer 1" imgClassName="max-h-[80vh] shadow-2xl" />
         </Reveal>
      </section>

      {/* Quote Box sliding under */}
      <section className="py-[120px] md:py-[180px] flex justify-center w-full">
         <RevealText className="w-full max-w-[1200px]">
            <blockquote className="font-hero text-[32px] md:text-[40px] text-center leading-[1.4] uppercase tracking-wide text-white bg-[#050505] p-16 md:p-24 shadow-2xl border-t border-brand-red">
              "{article.pullQuote}"
            </blockquote>
         </RevealText>
      </section>

      {/* Behind the Collection */}
      <section className="w-full py-[120px] md:py-[180px] grid grid-cols-1 md:grid-cols-2 gap-[80px] items-center">
         <div className="order-2 md:order-1">
            <RevealText>
              <h3 className="font-heading text-[12px] tracking-[0.25em] uppercase text-brand-red mb-[40px]">Integration</h3>
              <p className="font-sans text-[18px] text-white/80 leading-[1.7] tracking-wide">
                {article.content.behindTheCollection}
              </p>
            </RevealText>
         </div>
         <div className="order-1 md:order-2">
            <Reveal>
              <ParallaxImage src={article.images.lifestyle} alt="Integration" imgClassName="max-h-[70vh]" />
            </Reveal>
         </div>
      </section>

      {/* Campaign Image */}
      <section className="w-full py-[120px] md:py-[180px]">
         <Reveal>
           <ParallaxImage src={article.images.wideCampaign} alt="Campaign" imgClassName="w-full max-h-[85vh] object-cover" />
         </Reveal>
      </section>

      <RelatedJournals currentId={article.id} />
    </main>
  );
}
