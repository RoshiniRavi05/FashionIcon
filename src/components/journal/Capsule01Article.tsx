import React from 'react';
import { JournalArticle } from '@/data/journals';
import { Reveal, RevealText, ParallaxImage, RelatedJournals } from './ArticleShared';

export default function Capsule01Article({ article }: { article: JournalArticle }) {
  return (
    <main className="w-full max-w-[1600px] mx-auto px-6 md:px-20 pt-[200px] pb-[100px] relative">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-between z-[-1]">
        <div className="w-[1px] h-full bg-white/10"></div>
        <div className="w-[1px] h-full bg-white/10"></div>
        <div className="w-[1px] h-full bg-white/10 hidden md:block"></div>
        <div className="w-[1px] h-full bg-white/10 hidden lg:block"></div>
      </div>

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center text-center pb-[120px] md:pb-[180px] relative border-b border-white/10">
        <RevealText>
          <span className="font-caption text-[11px] md:text-[12px] tracking-[0.3em] text-white/50 uppercase block mb-[24px]">
            {article.category}
          </span>
        </RevealText>
        <RevealText delay={0.1}>
          <div className="flex justify-center items-center space-x-3 font-caption text-[11px] tracking-[0.2em] text-white/40 uppercase mb-[60px]">
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-brand-red/50"></span>
            <span>{article.readTime} read</span>
          </div>
        </RevealText>
        <RevealText delay={0.2}>
          <h1 className="font-hero text-[48px] md:text-[60px] lg:text-[72px] tracking-tight uppercase text-white leading-[1.1] max-w-[900px] mb-[60px] mx-auto relative group">
            {article.title}
          </h1>
        </RevealText>
        <RevealText delay={0.3}>
          <p className="font-sans text-[18px] text-white/70 leading-[1.7] tracking-wide max-w-[700px] mx-auto mt-[40px]">
            {article.content.intro}
          </p>
        </RevealText>
        
        <div className="w-full mt-[120px] relative">
           <ParallaxImage src={article.images.hero} alt={article.title} imgClassName="max-h-[90vh]" priority />
           {/* Blueprint measurement accent */}
           <div className="absolute top-[80px] -left-4 font-caption text-[10px] text-brand-red rotate-90 origin-left">H-90vh</div>
        </div>
      </section>

      {/* Inspiration (Layout C: 70% image, 30% text) */}
      <section className="w-full py-[120px] md:py-[180px] flex flex-col md:flex-row items-center gap-[80px] border-b border-white/10">
        <div className="w-full md:w-[70%]">
          <Reveal>
            <ParallaxImage src={article.images.lifestyle} alt="Inspiration" imgClassName="max-h-[85vh]" />
          </Reveal>
        </div>
        <div className="w-full md:w-[30%] border-l border-white/20 pl-8">
          <RevealText>
            <h3 className="font-heading text-[12px] tracking-[0.25em] uppercase text-brand-red mb-[20px]">Inspiration</h3>
            <p className="font-sans text-[18px] text-white/80 leading-[1.7] tracking-wide">
              {article.content.inspiration}
            </p>
          </RevealText>
        </div>
      </section>

      {/* Quote Block */}
      <section className="py-[120px] md:py-[180px] flex justify-center border-b border-white/10">
         <RevealText>
            <blockquote className="font-hero text-[32px] md:text-[40px] text-center leading-[1.4] uppercase tracking-wide text-white max-w-[900px] mx-auto bg-transparent border border-white/10 p-12 relative">
              <span className="text-brand-red block mb-6 text-4xl">blueprint_v1</span>
              "{article.pullQuote}"
            </blockquote>
         </RevealText>
      </section>

      {/* Construction (Grid) */}
      <section className="w-full py-[120px] md:py-[180px] border-b border-white/10">
         <RevealText>
            <h3 className="font-heading text-[12px] tracking-[0.25em] uppercase text-brand-red mb-[40px] text-center">Construction</h3>
            <p className="font-sans text-[18px] text-white/80 leading-[1.7] tracking-wide max-w-[700px] mx-auto text-center mb-[80px]">
              {article.content.fabric}
            </p>
         </RevealText>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
            <Reveal><ParallaxImage src={article.images.midShot} alt="Construction 1" imgClassName="max-h-[60vh]" /></Reveal>
            <Reveal delay={0.2}><ParallaxImage src={article.images.closeUps[0]} alt="Construction 2" imgClassName="max-h-[60vh]" /></Reveal>
         </div>
      </section>

      {/* Behind the Collection */}
      <section className="py-[120px] md:py-[180px] text-center">
         <RevealText>
           <h3 className="font-heading text-[12px] tracking-[0.25em] uppercase text-brand-red mb-[40px]">Designer Commentary</h3>
           <p className="font-sans text-[18px] text-white/80 leading-[1.7] tracking-wide max-w-[700px] mx-auto">
             {article.content.designerCommentary}
           </p>
         </RevealText>
      </section>

      <RelatedJournals currentId={article.id} />
    </main>
  );
}
