"use client";

import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export const WishlistDrawer: React.FC = () => {
  const { 
    wishlist, 
    wishlistOpen, 
    setWishlistOpen, 
    toggleWishlist,
    addToCart,
    setCartOpen
  } = useApp();

  const handleMoveToBag = (product: any) => {
    // Add to cart with default size 'M'
    addToCart(product, 'M');
    // Remove from wishlist
    toggleWishlist(product);
    // Switch drawers
    setWishlistOpen(false);
    setCartOpen(true);
  };

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistOpen(false)}
          />

          {/* Wishlist Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-[480px] z-50 premium-glass flex flex-col justify-between"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-brand-red stroke-[1.5]" />
                <h3 className="font-heading text-sm tracking-[0.2em] uppercase">Wishlist</h3>
              </div>
              <button 
                onClick={() => setWishlistOpen(false)}
                className="text-[#F5F5F5]/60 hover:text-brand-red p-2 transition-colors duration-300"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Wishlist Items list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
                  <Heart className="w-12 h-12 text-white/10 stroke-[1]" />
                  <p className="font-sans text-xs tracking-widest text-[#F5F5F5]/40 uppercase">Your wishlist is empty</p>
                  <button 
                    onClick={() => setWishlistOpen(false)}
                    className="font-heading text-[10px] tracking-[0.2em] uppercase text-brand-red border border-brand-red/20 px-6 py-3 bg-brand-red/5 hover:bg-brand-red/10 transition-all duration-300"
                  >
                    View Products
                  </button>
                </div>
              ) : (
                wishlist.map((product) => (
                  <motion.div 
                    key={product.id}
                    className="flex space-x-4 border-b border-white/5 pb-6 last:border-b-0 last:pb-0"
                    layout
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-24 bg-[#121212] overflow-hidden flex-shrink-0 group">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-heading text-xs tracking-[0.1em] text-[#F5F5F5] uppercase line-clamp-1">
                          {product.name}
                        </h4>
                        <div className="flex space-x-4 mt-1 font-caption text-[10px] tracking-wider text-[#F5F5F5]/40 uppercase">
                          <span>{product.category}</span>
                          <span className="text-[#F5F5F5]/70">{product.price}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-4">
                        <button
                          onClick={() => handleMoveToBag(product)}
                          className="flex items-center space-x-2 border border-white/10 hover:border-brand-red bg-black/40 hover:bg-brand-red/5 px-4 py-2 transition-all duration-300"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#F5F5F5]/70" />
                          <span className="font-heading text-[9px] tracking-widest uppercase">Add To Bag</span>
                        </button>

                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-[#F5F5F5]/30 hover:text-brand-red p-2 transition-colors duration-300"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer info */}
            <div className="p-6 border-t border-white/5 bg-[#0a0a0a]/50 text-center font-caption text-[9px] tracking-widest text-[#F5F5F5]/30 uppercase">
              Curate your unique aesthetic wardrobe.
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
