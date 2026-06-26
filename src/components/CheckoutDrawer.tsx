"use client";

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CreditCard, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const CheckoutDrawer: React.FC = () => {
  const { 
    cart, 
    checkoutOpen, 
    setCheckoutOpen, 
    clearCart, 
    addOrder 
  } = useApp();

  const [form, setForm] = useState({
    name: '',
    cardNum: '',
    expiry: '',
    cvc: '',
  });

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const subtotal = cart.reduce((sum, item) => {
    const priceNum = parseInt(item.product.price.replace('$', ''));
    return sum + (priceNum * item.quantity);
  }, 0);

  const shipping = subtotal > 150 ? 0 : 20;
  const tax = Math.round(subtotal * 0.08);
  const grandTotal = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate luxury transaction processing
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      
      // Save order
      const newOrder = {
        id: Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString(),
        items: cart.map(item => ({
          name: item.product.name,
          size: item.size,
          quantity: item.quantity,
          price: item.product.price
        })),
        total: `$${grandTotal}.00`,
      };
      addOrder(newOrder);

      // Trigger Confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C10E1D', '#F5F5F5', '#1A1A1A'],
      });

      // Clear Cart
      setTimeout(() => {
        clearCart();
      }, 500);
      
    }, 2800);
  };

  const handleClose = () => {
    setCheckoutOpen(false);
    // Reset state after transition
    setTimeout(() => {
      setSuccess(false);
    }, 400);
  };

  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\s?/g, '').replace(/\D/g, '');
    let matches = val.match(/.{1,4}/g);
    let newVal = matches ? matches.join(' ') : '';
    setForm({ ...form, cardNum: newVal.substring(0, 19) });
  };

  const handleExpiryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setForm({ ...form, expiry: val.substring(0, 5) });
  };

  const handleCvcInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    setForm({ ...form, cvc: val.substring(0, 3) });
  };

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={processing ? undefined : handleClose}
          />

          {/* Checkout Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-[540px] z-50 premium-glass flex flex-col justify-between"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-brand-red stroke-[1.5]" />
                <h3 className="font-heading text-sm tracking-[0.2em] uppercase">Checkout</h3>
              </div>
              {!processing && (
                <button 
                  onClick={handleClose}
                  className="text-[#F5F5F5]/60 hover:text-brand-red p-2 transition-colors duration-300"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              )}
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {success ? (
                <motion.div 
                  className="h-full flex flex-col items-center justify-center space-y-6 text-center py-20"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="w-16 h-16 rounded-full border border-brand-red/40 flex items-center justify-center bg-brand-red/10 text-brand-red text-2xl">
                    ✓
                  </div>
                  <h4 className="font-hero text-lg tracking-[0.1em] uppercase">Order Confirmed</h4>
                  <p className="font-sans text-xs text-[#F5F5F5]/50 leading-relaxed max-w-[320px]">
                    Thank you for your acquisition. A confirmation email with logistics tracking has been dispatched. Your items will arrive in signature ARC OPUS casing.
                  </p>
                  <button 
                    onClick={handleClose}
                    className="font-heading text-[10px] tracking-[0.2em] uppercase bg-[#F5F5F5] text-[#050505] px-8 py-3.5 hover:bg-brand-red hover:text-[#F5F5F5] transition-all duration-300 font-bold"
                  >
                    Continue Journey
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Order summary card */}
                  <div className="border border-white/5 bg-black/30 p-6 rounded-sm space-y-4">
                    <h4 className="font-heading text-[10px] tracking-[0.2em] text-[#F5F5F5]/50 uppercase">Order Summary</h4>
                    <div className="space-y-2 font-caption text-xs tracking-wider">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span>${subtotal}.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Technical Shipping</span>
                        <span>{shipping === 0 ? 'FREE' : `$${shipping}.00`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Tax (8%)</span>
                        <span>${tax}.00</span>
                      </div>
                      <div className="flex justify-between border-t border-white/10 pt-3 text-white font-bold text-sm">
                        <span>GRAND TOTAL</span>
                        <span>${grandTotal}.00</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h4 className="font-heading text-[10px] tracking-[0.2em] text-[#F5F5F5]/50 uppercase">Secure Payment Gateway</h4>

                    <div className="space-y-4 font-sans text-xs">
                      {/* Name */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] tracking-widest text-[#F5F5F5]/40 uppercase font-caption">Cardholder Name</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value.toUpperCase() })}
                          className="bg-black/50 border border-white/10 p-3 text-[#F5F5F5] focus:outline-none focus:border-brand-red placeholder-white/20 tracking-wider uppercase font-caption"
                          placeholder="JOHN DOE"
                          disabled={processing}
                        />
                      </div>

                      {/* Card Number */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] tracking-widest text-[#F5F5F5]/40 uppercase font-caption">Card Number</label>
                        <div className="relative flex items-center">
                          <input
                            type="text"
                            required
                            value={form.cardNum}
                            onChange={handleCardInput}
                            className="bg-black/50 border border-white/10 p-3 pl-11 text-[#F5F5F5] focus:outline-none focus:border-brand-red placeholder-white/20 tracking-widest w-full font-caption"
                            placeholder="0000 0000 0000 0000"
                            disabled={processing}
                          />
                          <CreditCard className="w-4 h-4 text-white/30 absolute left-4" />
                        </div>
                      </div>

                      {/* Expiry & CVC */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[10px] tracking-widest text-[#F5F5F5]/40 uppercase font-caption">Expiration</label>
                          <input
                            type="text"
                            required
                            value={form.expiry}
                            onChange={handleExpiryInput}
                            className="bg-black/50 border border-white/10 p-3 text-[#F5F5F5] focus:outline-none focus:border-brand-red placeholder-white/20 tracking-wider font-caption"
                            placeholder="MM/YY"
                            disabled={processing}
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[10px] tracking-widest text-[#F5F5F5]/40 uppercase font-caption">CVC / CVV</label>
                          <input
                            type="text"
                            required
                            value={form.cvc}
                            onChange={handleCvcInput}
                            className="bg-black/50 border border-white/10 p-3 text-[#F5F5F5] focus:outline-none focus:border-brand-red placeholder-white/20 tracking-wider font-caption"
                            placeholder="000"
                            disabled={processing}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Security Seals */}
                    <div className="flex items-center space-x-4 border-t border-white/5 pt-6 text-[10px] tracking-widest text-[#F5F5F5]/40 uppercase font-caption">
                      <div className="flex items-center space-x-1.5">
                        <ShieldCheck className="w-4 h-4 text-brand-red" />
                        <span>SSL Secure Protocol</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <HelpCircle className="w-4 h-4 text-white/30" />
                        <span>Stripe Commerce Core</span>
                      </div>
                    </div>

                    {/* Pay Button */}
                    <button
                      type="submit"
                      disabled={processing}
                      className="w-full bg-[#F5F5F5] text-[#050505] hover:bg-brand-red hover:text-white font-heading text-xs tracking-[0.2em] uppercase py-4 transition-all duration-500 font-bold flex items-center justify-center relative overflow-hidden"
                    >
                      {processing ? (
                        <div className="flex items-center space-x-3">
                          <svg className="animate-spin h-4 w-4 text-[#050505]" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>PROCESSING TRANSACTION...</span>
                        </div>
                      ) : (
                        <span>ACQUIRE PIECES (${grandTotal}.00)</span>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
