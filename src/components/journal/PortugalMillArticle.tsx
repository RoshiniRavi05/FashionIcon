import React from 'react';
import { JournalArticle } from '@/data/journals';
import { Reveal, RevealText, ParallaxImage, RelatedJournals } from './ArticleShared';

export default function PortugalMillArticle({ article }: { article: JournalArticle }) {
  return (
    <main className="w-full max-w-[1600px] mx-auto px-6 md:px-20 pt-[200px] pb-[100px]">
      
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
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>{article.readTime} read</span>
          </div>
        </RevealText>
        <RevealText delay={0.2}>
          <h1 className="font-hero text-[48px] md:text-[60px] lg:text-[72px] tracking-tight uppercase text-[#F2EFE9] leading-[1.1] max-w-[900px] mb-[60px] mx-auto">
            {article.title}
          </h1>
        </RevealText>
        <RevealText delay={0.3}>
          <p className="font-sans text-[18px] text-white/70 leading-[1.7] tracking-wide max-w-[700px] mx-auto mt-[40px]">
            {article.content.intro}
          </p>
        </RevealText>
        
        <div className="w-full mt-[120px]">
           <ParallaxImage src={article.images.hero} alt={article.title} imgClassName="max-h-[95vh]" priority />
        </div>
      </section>

      {/* Offset Grid (Layout E: Image shifted down, text shifted up) */}
      <section className="w-full py-[120px] md:py-[180px] grid grid-cols-1 md:grid-cols-2 gap-[80px]">
         <div className="md:mt-[-100px]">
            <RevealText>
              <h3 className="font-heading text-[12px] tracking-[0.25em] uppercase text-white/40 mb-[40px]">01 / Raw Material</h3>
              <p className="font-sans text-[18px] text-white/80 leading-[1.7] tracking-wide max-w-[500px]">
                {article.content.inspiration}
              </p>
            </RevealText>
         </div>
         <div className="md:mt-[100px]">
            <Reveal>
              <ParallaxImage src={article.images.lifestyle} alt="Raw Material" imgClassName="max-h-[85vh]" />
            </Reveal>
         </div>
      </section>

      {/* Quote */}
      <section className="py-[120px] md:py-[180px] flex justify-center">
         <RevealText>
            <blockquote className="font-hero text-[32px] md:text-[40px] text-center leading-[1.4] uppercase tracking-wide text-[#F2EFE9] max-w-[900px] mx-auto">
              "{article.pullQuote}"
            </blockquote>
         </RevealText>
      </section>

      {/* Texture Closeups (massive full width bleed) */}
      <section className="w-full py-[120px] md:py-[180px] flex flex-col items-center">
         <Reveal className="w-full max-w-[1400px]">
           <ParallaxImage src={article.images.closeUps[0]} alt="Texture Close Up" imgClassName="w-full max-h-[100vh] object-cover scale-[1.1] grayscale-0" />
         </Reveal>
         <RevealText className="mt-[80px]">
            <p className="font-sans text-[18px] text-white/70 leading-[1.7] tracking-wide max-w-[700px] mx-auto text-center">
              {article.content.fabric}
            </p>
         </RevealText>
      </section>

      {/* Designer Commentary */}
      <section className="py-[120px] md:py-[180px]">
         <RevealText>
            <h3 className="font-heading text-[12px] tracking-[0.25em] uppercase text-white/40 mb-[40px] text-center">Technical Notes</h3>
            <p className="font-sans text-[18px] text-white/80 leading-[1.7] tracking-wide max-w-[700px] mx-auto text-center">
              {article.content.designerCommentary}
            </p>
         </RevealText>
      </section>

      <RelatedJournals currentId={article.id} />
    </main>
  );
}
