"use client";

import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    cartOpen, 
    setCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    setCheckoutOpen,
    setAuthModalOpen
  } = useApp();
  
  const { status } = useSession();

  const total = cart.reduce((sum, item) => {
    const priceNum = parseInt(item.product.price.replace('$', ''));
    return sum + (priceNum * item.quantity);
  }, 0);

  const handleCheckoutClick = () => {
    setCartOpen(false);
    if (status !== 'authenticated') {
      setAuthModalOpen(true);
    } else {
      setCheckoutOpen(true);
    }
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />

          {/* Cart Panel Drawer */}
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
                <ShoppingBag className="w-5 h-5 text-brand-red stroke-[1.5]" />
                <h3 className="font-heading text-sm tracking-[0.2em] uppercase">Shopping Cart</h3>
              </div>
              <button 
                onClick={() => setCartOpen(false)}
                className="text-[#F5F5F5]/60 hover:text-brand-red p-2 transition-colors duration-300"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
                  <ShoppingBag className="w-12 h-12 text-white/10 stroke-[1]" />
                  <p className="font-sans text-xs tracking-widest text-[#F5F5F5]/40 uppercase">Your bag is empty</p>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="font-heading text-[10px] tracking-[0.2em] uppercase text-brand-red border border-brand-red/20 px-6 py-3 bg-brand-red/5 hover:bg-brand-red/10 transition-all duration-300"
                  >
                    Return to Shop
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    key={`${item.product.id}-${item.size}`}
                    className="flex space-x-4 border-b border-white/5 pb-6 last:border-b-0 last:pb-0"
                    layout
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-24 bg-[#121212] overflow-hidden flex-shrink-0 group">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-heading text-xs tracking-[0.1em] text-[#F5F5F5] uppercase line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="flex space-x-4 mt-1 font-caption text-[10px] tracking-wider text-[#F5F5F5]/40 uppercase">
                          <span>Size: {item.size}</span>
                          <span>Category: {item.product.category}</span>
                        </div>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-white/10 bg-black/40">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="p-2 text-[#F5F5F5]/50 hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 font-caption text-xs tracking-widest">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="p-2 text-[#F5F5F5]/50 hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center space-x-4">
                          <span className="font-caption text-xs tracking-wider">
                            ${parseInt(item.product.price.replace('$', '')) * item.quantity}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-[#F5F5F5]/30 hover:text-brand-red p-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-[#0a0a0a]/50">
                <div className="flex items-center justify-between mb-6 font-caption text-xs tracking-[0.15em] uppercase">
                  <span className="text-[#F5F5F5]/50">Subtotal</span>
                  <span className="text-white font-bold">${total}.00</span>
                </div>

                <p className="font-sans text-[10px] text-[#F5F5F5]/40 leading-relaxed mb-6">
                  Shipping, taxes, and duties calculated at checkout. Refined garments packaged in signature ARC OPUS boxes.
                </p>

                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-[#F5F5F5] hover:bg-brand-red text-[#050505] hover:text-[#F5F5F5] font-heading text-xs tracking-[0.2em] uppercase py-4 transition-all duration-500 font-bold"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
