"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DEFAULT_PRODUCTS, Product } from '@/data/products';

function ShopProductCard({ 
  prod, 
  inWishlist, 
  toggleWishlist, 
  addToCart 
}: { 
  prod: Product; 
  inWishlist: boolean; 
  toggleWishlist: (p: Product) => void; 
  addToCart: (p: Product, size: string) => void; 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mockGallery = [prod.image, prod.image, prod.image];
  const transforms = ["", "scale-x-[-1]", "scale-[1.25] object-center"];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col space-y-4 border border-white/5 p-4 bg-[#050505] rounded-sm hover:border-brand-red/20 transition-colors duration-500 w-full"
    >
      {/* Product Image */}
      <div className="relative h-[340px] w-full bg-[#121212] overflow-hidden">
        <Link href={`/product/${prod.id}`}>
          <Image
            src={mockGallery[currentIndex]}
            alt={prod.name}
            fill
            className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${transforms[currentIndex]}`}
          />
        </Link>

        {/* Top tags overlay */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 pointer-events-none">
          {prod.tag ? (
            <span className="bg-brand-red text-white text-[8px] font-caption tracking-widest uppercase px-3 py-1 font-black">
              {prod.tag}
            </span>
          ) : <span />}

          <button
            onClick={() => toggleWishlist(prod)}
            className="bg-black/60 border border-white/10 hover:border-brand-red p-2 hover:bg-brand-red/10 text-white transition-colors duration-300 pointer-events-auto"
            title="Save to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-brand-red text-brand-red' : 'text-white'}`} />
          </button>
        </div>
      </div>

      {/* Inline Thumbnails */}
      <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-1">
        {mockGallery.map((img, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.preventDefault(); setCurrentIndex(idx); }}
            className={`relative flex-none w-12 h-16 bg-[#0c0c0e] overflow-hidden snap-center transition-all duration-300 rounded-sm ${
              currentIndex === idx 
                ? 'border border-[#C10E1D] brightness-100' 
                : 'border border-white/5 brightness-50 hover:brightness-90'
            }`}
          >
            <Image
              src={img}
              alt={`${prod.name} thumb ${idx + 1}`}
              fill
              className={`object-cover absolute inset-0 z-0 ${transforms[idx]}`}
            />
          </button>
        ))}
      </div>

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

      {/* Action buttons */}
      <div className="pt-2">
        <button
          onClick={() => addToCart(prod, 'M')}
          className="w-full bg-[#F5F5F5] hover:bg-brand-red text-[#050505] hover:text-[#F5F5F5] font-heading text-[9px] tracking-widest py-3 uppercase transition-all duration-300 font-bold"
        >
          ADD TO BAG
        </button>
      </div>
    </motion.div>
  );
}

export default function ShopPage() {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const categories = ['all', 't-shirts', 'jackets', 'bottoms', 'shoes'];

  // Filter
  let filtered = DEFAULT_PRODUCTS.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.subcat.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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

  return (
    <div className="bg-[#050505] min-h-screen py-20 px-6 md:px-12 max-w-[1600px] mx-auto space-y-12">
      
      {/* Title */}
      <div className="space-y-4 pt-10">
        <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black">
          ARC OPUS CATALOGUE
        </span>
        <h1 className="font-hero text-3xl sm:text-5xl tracking-wide uppercase text-white">
          THE MAIN REGISTRY
        </h1>
        <p className="font-sans text-xs text-white/50 max-w-[520px] leading-relaxed">
          Examine the total inventory of technical elements. Search by code name or filter by item classification.
        </p>
      </div>

      {/* Filters Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-white/5 pb-8">
        
        {/* Search */}
        <div className="md:col-span-4 relative flex items-center bg-black/40 border border-white/10 px-4 py-2.5">
          <input
            type="text"
            placeholder="SEARCH REGISTRY..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs tracking-widest text-[#F5F5F5] placeholder-white/20 focus:outline-none w-full uppercase font-caption"
          />
          <Search className="w-4 h-4 text-white/20" />
        </div>

        {/* Category Tabs */}
        <div className="md:col-span-5 flex overflow-x-auto scrollbar-none space-x-2 p-1 font-heading text-[10px] tracking-widest uppercase">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 border transition-all duration-300 ${activeCategory === cat ? 'border-brand-red bg-brand-red text-white' : 'border-white/10 text-white/40 hover:text-white'}`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="md:col-span-3 flex items-center justify-end space-x-3 font-heading text-[10px] tracking-widest text-white/50 uppercase">
          <span>Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-black/60 border border-white/10 p-2.5 text-white focus:outline-none focus:border-brand-red uppercase font-caption text-[9px] tracking-wider cursor-pointer"
          >
            <option value="default">Registry Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="h-[300px] flex flex-col items-center justify-center space-y-4 text-center">
          <p className="font-caption text-xs tracking-wider text-white/30 uppercase">No elements matched your filter parameters</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="text-brand-red font-heading text-[10px] tracking-widest uppercase hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start w-full">
          <AnimatePresence>
            {filtered.map((prod) => {
              const inWishlist = wishlist.some(w => w.id === prod.id);
              return (
                <ShopProductCard 
                  key={prod.id} 
                  prod={prod} 
                  inWishlist={inWishlist} 
                  toggleWishlist={toggleWishlist} 
                  addToCart={addToCart} 
                />
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
