"use client";

import React, { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Heart, ShoppingBag, Sparkles, Ruler } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DEFAULT_PRODUCTS } from '@/data/products';
import ProductGallery from '@/components/ProductGallery';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const [selectedSize, setSelectedSize] = useState('M');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const productId = parseInt(id);
  const product = DEFAULT_PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="bg-[#050505] min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="font-caption text-xs tracking-wider text-white/30 uppercase">Garment not registered in archive</p>
        <Link href="/shop" className="text-brand-red font-heading text-[10px] tracking-widest uppercase hover:underline">Return to Shop</Link>
      </div>
    );
  }

  const isLiked = wishlist.some(w => w.id === product.id);

  // Recommendations (similar category items)
  const recommendations = DEFAULT_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="bg-[#050505] min-h-screen py-20 px-6 md:px-12 max-w-[1600px] mx-auto space-y-24">
      
      {/* Back button */}
      <div className="pt-10">
        <Link 
          href="/shop"
          className="font-heading text-[10px] tracking-[0.25em] text-white/50 hover:text-brand-red uppercase flex items-center space-x-2 w-fit transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Registry</span>
        </Link>
      </div>

      {/* Main Apple-style Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery 
            images={[product.image, product.hoverImage || product.image, product.image]} 
            productName={product.name} 
          />
        </div>

        {/* Right Column: Purchasing Panel */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] tracking-[0.3em] font-caption text-brand-red uppercase font-black">
              <span>{product.category} // SUBCAT_{product.subcat.toUpperCase()}</span>
              {product.stock === 0 && <span className="text-white/40">Out of Stock</span>}
            </div>

            <h1 className="font-hero text-2xl sm:text-3xl tracking-wide uppercase text-white leading-tight">
              {product.name}
            </h1>

            <p className="font-caption text-lg text-white font-bold">{product.price}</p>
          </div>

          <div className="w-12 h-[1px] bg-brand-red" />

          {/* Description */}
          <p className="font-sans text-xs text-white/60 leading-relaxed">
            {product.description || "A luxury streetwear staple, refined through extensive geometric draping trials. Crafted from technical fabrics, this piece is built with signature ARC OPUS tailored paneling, blind-stitch hems, and reinforced collars."}
          </p>

          {/* Size Selectors */}
          <div className="space-y-3">
            <div className="flex justify-between items-center font-caption text-[9px] tracking-widest text-white/40 uppercase">
              <span>Select Size</span>
              <button 
                onClick={() => setShowSizeGuide(true)}
                className="hover:text-white flex items-center space-x-1.5 transition-colors"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>

            <div className="flex space-x-2">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-3.5 border text-xs font-caption tracking-widest uppercase transition-all duration-300 ${
                    selectedSize === size
                      ? 'border-brand-red bg-brand-red/10 text-white'
                      : 'border-white/10 text-white/40 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => addToCart(product, selectedSize)}
              className="w-full bg-[#F5F5F5] hover:bg-brand-red text-[#050505] hover:text-white font-heading text-xs tracking-[0.2em] uppercase py-4.5 transition-all duration-500 font-bold flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO SHOPPING BAG</span>
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`w-full border py-3.5 text-[10px] font-heading tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 ${
                isLiked 
                  ? 'border-brand-red bg-brand-red/5 text-brand-red' 
                  : 'border-white/10 text-white/70 hover:border-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-brand-red' : ''}`} />
              <span>{isLiked ? 'FAVORITED' : 'WISHLIST'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Technical Specifications / Materials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-16">
        <div className="space-y-6">
          <h3 className="font-hero text-sm tracking-widest uppercase text-white">TEXTILE ENGINEERING</h3>
          <p className="font-sans text-xs text-white/50 leading-relaxed">
            The fabric undergoes custom eco-wash dyes and enzyme washes to reach its matte shade. Designed to withstand extensive wear and drape rigidly, forming structured folds.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="font-hero text-sm tracking-widest uppercase text-white">SPECIFICATIONS</h3>
          <ul className="font-caption text-xs tracking-wider text-white/70 space-y-2 uppercase">
            {product.details?.map((detail, idx) => (
              <li key={idx} className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/40">Detail 0{idx+1}</span>
                <span>{detail}</span>
              </li>
            )) || (
              <>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">Fabric</span>
                  <span>100% Organic Combed Cotton</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">Weight</span>
                  <span>360gsm Knit Heavyweight</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/40">Origin</span>
                  <span>Made in Portugal</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Sizing Guide Modal overlay */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setShowSizeGuide(false)} />
          <div className="relative w-full max-w-lg bg-[#0c0c0e] border border-white/10 p-8 space-y-6 z-10 rounded-sm">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className="font-hero text-sm tracking-wider uppercase">GARMENT BLUEPRINT GUIDE</h3>
              <button onClick={() => setShowSizeGuide(false)} className="text-white/50 hover:text-white">✕</button>
            </div>
            <table className="w-full text-left font-caption text-xs tracking-wider uppercase text-white/70">
              <thead>
                <tr className="border-b border-white/10 pb-2 text-white/30">
                  <th className="py-2">SIZE</th>
                  <th className="py-2">CHEST (IN)</th>
                  <th className="py-2">LENGTH (IN)</th>
                  <th className="py-2">SLEEVE (IN)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3 font-bold text-brand-red">S</td>
                  <td className="py-3">44 - 46</td>
                  <td className="py-3">28.5</td>
                  <td className="py-3">9.0</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 font-bold text-brand-red">M</td>
                  <td className="py-3">46 - 48</td>
                  <td className="py-3">29.5</td>
                  <td className="py-3">9.5</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 font-bold text-brand-red">L</td>
                  <td className="py-3">48 - 50</td>
                  <td className="py-3">30.5</td>
                  <td className="py-3">10.0</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-brand-red">XL</td>
                  <td className="py-3">50 - 52</td>
                  <td className="py-3">31.5</td>
                  <td className="py-3">10.5</td>
                </tr>
              </tbody>
            </table>
            <p className="font-sans text-[10px] text-white/40 leading-relaxed text-center">
              Values refer to flat garment dimensions. For boxy fits, choose your standard chest size.
            </p>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-8 border-t border-white/5 pt-16">
          <h3 className="font-hero text-sm tracking-widest uppercase text-white">COORDINATE CONFIGURATIONS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((prod) => (
              <div 
                key={prod.id}
                className="group flex flex-col space-y-4 border border-white/5 p-4 bg-[#050505] rounded-sm hover:border-brand-red/20 transition-colors"
              >
                <Link href={`/product/${prod.id}`} className="relative h-[280px] bg-[#121212] overflow-hidden">
                  <Image src={prod.image} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>
                <div className="flex justify-between items-start font-caption text-xs tracking-wider">
                  <Link href={`/product/${prod.id}`} className="font-heading text-xs tracking-wider text-white uppercase hover:text-brand-red transition-colors block line-clamp-1">
                    {prod.name}
                  </Link>
                  <span>{prod.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
