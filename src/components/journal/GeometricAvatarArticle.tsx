import React from 'react';
import { JournalArticle } from '@/data/journals';
import { Reveal, RevealText, ParallaxImage, RelatedJournals } from './ArticleShared';

export default function GeometricAvatarArticle({ article }: { article: JournalArticle }) {
  return (
    <main className="w-full max-w-[1600px] mx-auto px-6 md:px-20 pt-[200px] pb-[100px]">
      
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center text-center pb-[120px] md:pb-[180px]">
        <RevealText>
          <span className="font-caption text-[11px] md:text-[12px] tracking-[0.3em] text-[#00FF41]/80 uppercase block mb-[24px]">
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
          <h1 className="font-hero text-[48px] md:text-[60px] lg:text-[72px] tracking-tight uppercase text-white leading-[1.1] max-w-[1000px] mb-[60px] mx-auto">
            {article.title}
          </h1>
        </RevealText>
        <RevealText delay={0.3}>
          <p className="font-sans text-[18px] text-white/70 leading-[1.7] tracking-wide max-w-[700px] mx-auto mt-[40px]">
            {article.content.intro}
          </p>
        </RevealText>
        
        <div className="w-full mt-[120px]">
           {/* Wide Campaign Layout D */}
           <Reveal className="w-full">
             <ParallaxImage src={article.images.hero} alt={article.title} imgClassName="max-h-[90vh] border border-[#00FF41]/20" priority />
           </Reveal>
        </div>
      </section>

      {/* Two smaller detail images underneath (Layout D continued) */}
      <section className="w-full pb-[120px] md:pb-[180px] grid grid-cols-1 md:grid-cols-2 gap-[40px]">
         <Reveal>
           <ParallaxImage src={article.images.closeUps[0]} alt="Detail 1" imgClassName="max-h-[60vh] border border-[#00FF41]/10" />
         </Reveal>
         <Reveal delay={0.2}>
           <ParallaxImage src={article.images.closeUps[1]} alt="Detail 2" imgClassName="max-h-[60vh] border border-[#00FF41]/10" />
         </Reveal>
      </section>

      {/* Quote */}
      <section className="py-[120px] md:py-[180px] flex justify-center border-y border-[#00FF41]/20">
         <RevealText>
            <blockquote className="font-hero text-[32px] md:text-[40px] text-center leading-[1.4] uppercase tracking-wide text-[#00FF41] max-w-[900px] mx-auto drop-shadow-[0_0_15px_rgba(0,255,65,0.3)]">
              "{article.pullQuote}"
            </blockquote>
         </RevealText>
      </section>

      {/* Styling Notes */}
      <section className="w-full py-[120px] md:py-[180px] grid grid-cols-1 md:grid-cols-2 gap-[80px] items-center">
         <div>
            <Reveal>
              <ParallaxImage src={article.images.lifestyle} alt="Styling" imgClassName="max-h-[85vh] border border-white/10" />
            </Reveal>
         </div>
         <div>
            <RevealText>
              <h3 className="font-heading text-[12px] tracking-[0.25em] uppercase text-[#00FF41] mb-[40px]">Simulated Styling</h3>
              <p className="font-sans text-[18px] text-white/80 leading-[1.7] tracking-wide">
                {article.content.stylingNotes}
              </p>
            </RevealText>
         </div>
      </section>

      {/* Designer Commentary */}
      <section className="py-[120px] md:py-[180px]">
         <RevealText>
            <h3 className="font-heading text-[12px] tracking-[0.25em] uppercase text-white/40 mb-[40px] text-center">Engine Room</h3>
            <p className="font-sans text-[18px] text-white/80 leading-[1.7] tracking-wide max-w-[700px] mx-auto text-center font-mono">
              {article.content.designerCommentary}
            </p>
         </RevealText>
      </section>

      <RelatedJournals currentId={article.id} />
    </main>
  );
}
