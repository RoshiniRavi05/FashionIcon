"use client";

import React, { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DEFAULT_PRODUCTS, Product } from '@/data/products';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = use(params);
  const { addToCart } = useApp();
  const [subFilter, setSubFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  // Find products matching this category
  const decodedCategory = decodeURIComponent(category);
  const allCategoryProducts = DEFAULT_PRODUCTS.filter(
    (p) => p.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  // Get unique subcategories
  const subcats = Array.from(new Set(allCategoryProducts.map((p) => p.subcat)));

  // Filter
  let filtered = allCategoryProducts;
  if (subFilter !== 'all') {
    filtered = allCategoryProducts.filter((p) => p.subcat === subFilter);
  }

  // Sort
  if (sortBy === 'price-asc') {
    filtered = [...filtered].sort((a, b) => {
      const pA = parseInt(a.price.replace('$', ''));
      const pB = parseInt(b.price.replace('$', ''));
      return pA - pB;
    });
  } else if (sortBy === 'price-desc') {
    filtered = [...filtered].sort((a, b) => {
      const pA = parseInt(a.price.replace('$', ''));
      const pB = parseInt(b.price.replace('$', ''));
      return pB - pA;
    });
  }

  // Get printable title
  const displayTitle = decodedCategory.replace('-', ' ').toUpperCase();

  return (
    <div className="bg-[#050505] min-h-screen py-20 px-6 md:px-12 max-w-[1600px] mx-auto space-y-12">
      
      {/* Back button & Title */}
      <div className="space-y-6 pt-10">
        <Link 
          href="/collections"
          className="font-heading text-[10px] tracking-[0.25em] text-white/50 hover:text-brand-red uppercase flex items-center space-x-2 w-fit transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Campaigns</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black">
              ARC OPUS CLASSIFICATION
            </span>
            <h1 className="font-hero text-3xl sm:text-5xl tracking-wide uppercase text-white">
              {displayTitle}
            </h1>
          </div>

          {/* Sort Controller */}
          <div className="flex items-center space-x-4 font-heading text-[10px] tracking-widest text-[#F5F5F5]/60 uppercase">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black/60 border border-white/10 p-2 text-white focus:outline-none focus:border-brand-red uppercase font-caption text-[9px] tracking-wider cursor-pointer"
            >
              <option value="default">Release Date</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subcategory filter tags */}
      {subcats.length > 0 && (
        <div className="flex flex-wrap gap-3 border-b border-white/5 pb-6 font-heading text-[10px] tracking-widest uppercase">
          <button
            onClick={() => setSubFilter('all')}
            className={`px-4 py-2 border transition-colors ${subFilter === 'all' ? 'border-brand-red bg-brand-red text-white' : 'border-white/10 text-white/40 hover:text-white'}`}
          >
            All Items
          </button>
          {subcats.map((sub) => (
            <button
              key={sub}
              onClick={() => setSubFilter(sub)}
              className={`px-4 py-2 border transition-colors ${subFilter === sub ? 'border-brand-red bg-brand-red text-white' : 'border-white/10 text-white/40 hover:text-white'}`}
            >
              {sub.replace('-', ' ')}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="h-[300px] flex flex-col items-center justify-center space-y-4">
          <p className="font-caption text-xs tracking-wider text-white/30 uppercase">No garments registered in this category</p>
          <Link href="/shop" className="text-brand-red font-heading text-[10px] tracking-widest uppercase hover:underline">Browse Main Shop</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((prod) => (
            <div 
              key={prod.id}
              className="group flex flex-col space-y-4 border border-white/5 p-4 bg-[#050505] rounded-sm hover:border-brand-red/20 transition-all duration-500"
            >
              {/* Product Image */}
              <Link href={`/product/${prod.id}`} className="relative h-[340px] bg-[#121212] overflow-hidden">
                <Image
                  src={prod.image}
                  alt={prod.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {prod.tag && (
                  <span className="absolute top-4 left-4 bg-brand-red text-white text-[8px] font-caption tracking-widest uppercase px-3 py-1 font-black">
                    {prod.tag}
                  </span>
                )}
              </Link>

              {/* Product Info */}
              <div className="flex justify-between items-start">
                <div className="space-y-1 flex-1 pr-2">
                  <Link href={`/product/${prod.id}`} className="font-heading text-xs tracking-wider text-white uppercase hover:text-brand-red transition-colors block line-clamp-1">
                    {prod.name}
                  </Link>
                  <p className="font-caption text-[10px] text-white/40 uppercase tracking-widest">{prod.subcat}</p>
                </div>
                <span className="font-caption text-xs tracking-wider text-white">{prod.price}</span>
              </div>

              {/* Actions */}
              <div className="pt-2">
                <button
                  onClick={() => addToCart(prod, 'M')}
                  className="w-full bg-[#F5F5F5] hover:bg-brand-red text-[#050505] hover:text-[#F5F5F5] font-heading text-[9px] tracking-widest py-3 uppercase transition-all duration-300 font-bold"
                >
                  ADD TO BAG
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
