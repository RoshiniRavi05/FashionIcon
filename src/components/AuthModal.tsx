"use client";

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Zap, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen } = useApp();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signIn('google', { callbackUrl: window.location.href });
  };

  return (
    <AnimatePresence>
      {authModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="absolute inset-0 bg-[#050505]/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAuthModalOpen(false)}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-[900px] h-[550px] bg-[#0A0A0A] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Close Button (Absolute Top Right) */}
            <button 
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#F5F5F5]/60 hover:text-white hover:border-white/30 transition-all z-50 bg-[#0A0A0A]/50 backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Section */}
            <div className="relative w-full md:w-1/2 h-64 md:h-full bg-[#111] overflow-hidden rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl">
              <Image 
                src="/yellow_tracksuit_model.png" 
                alt="Streetwear Model" 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Image Overlay Text */}
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="font-heading text-3xl leading-none text-white uppercase font-bold drop-shadow-lg">
                  "THE STREETS<br/>ARE YOUR<br/>RUNWAY."
                </h3>
              </div>
            </div>

            {/* Right Content Section */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-10 md:p-14 relative">
              <div className="space-y-6">
                
                {/* Header Titles */}
                <div className="space-y-2">
                  <p className="font-logo text-xs tracking-[0.5em] text-brand-red font-bold">
                    A R C O P U S
                  </p>
                  <h2 className="font-heading text-5xl md:text-6xl text-white uppercase leading-[0.9] font-black">
                    JOIN THE<br/>NETWORK
                  </h2>
                </div>

                {/* Subtext */}
                <p className="font-sans text-sm text-[#F5F5F5]/60 leading-relaxed max-w-sm">
                  Unlock exclusive streetwear drops, track your orders, and sync your shopping bag across all devices.
                </p>

                {/* Google Button */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full max-w-sm flex items-center p-1.5 pr-6 bg-[#1A1A1A] hover:bg-[#252525] border border-white/5 rounded-full transition-all duration-300 disabled:opacity-50 mt-4"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <span className="flex-1 text-center font-sans text-[13px] font-medium text-white">
                    {loading ? "Authenticating..." : "Continue with Google"}
                  </span>
                </button>

                {/* Perks List */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-4 h-4 text-brand-red" strokeWidth={2.5} />
                    <span className="font-sans text-xs text-[#F5F5F5]/70 font-medium">Priority access to limited drops.</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="w-4 h-4 text-brand-red" strokeWidth={2.5} />
                    <span className="font-sans text-xs text-[#F5F5F5]/70 font-medium">Persistent shopping bag.</span>
                  </div>
                </div>

                {/* Footer terms */}
                <div className="pt-6">
                  <p className="font-sans text-[10px] text-[#F5F5F5]/40 tracking-wider uppercase">
                    BY CONTINUING, YOU AGREE TO OUR <a href="#" className="underline hover:text-white transition-colors">TERMS OF USE</a>.
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
