import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { journals } from '@/data/journals';
import Capsule01Article from '@/components/journal/Capsule01Article';
import TacticalLayeringArticle from '@/components/journal/TacticalLayeringArticle';
import PortugalMillArticle from '@/components/journal/PortugalMillArticle';
import GeometricAvatarArticle from '@/components/journal/GeometricAvatarArticle';
import SmoothScrollProvider from '@/components/journal/SmoothScrollProvider';

export async function generateStaticParams() {
  return journals.map((article) => ({
    id: article.id,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = journals.find((j) => j.id === id);

  if (!article) {
    notFound();
  }

  // Determine which bespoke layout to render
  const renderBespokeArticle = () => {
    switch (article.id) {
      case '1':
        return <Capsule01Article article={article} />;
      case '2':
        return <TacticalLayeringArticle article={article} />;
      case '3':
        return <PortugalMillArticle article={article} />;
      case '4':
        return <GeometricAvatarArticle article={article} />;
      default:
        return <Capsule01Article article={article} />;
    }
  };

  return (
    <SmoothScrollProvider>
      <div className="bg-[#050505] min-h-screen selection:bg-brand-red selection:text-white font-sans text-white">
        {/* Global Journal Header */}
        <div className="fixed top-8 left-8 md:left-12 z-50 mix-blend-difference text-white">
          <Link 
            href="/journal"
            className="group flex items-center space-x-4 font-heading text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-60 focus:outline-none"
          >
            <div className="group-hover:-translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-brand-red">
              <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
            </div>
            <span>Back to Journal</span>
          </Link>
        </div>

        {/* Render Bespoke Experience */}
        {renderBespokeArticle()}
      </div>
    </SmoothScrollProvider>
  );
}
