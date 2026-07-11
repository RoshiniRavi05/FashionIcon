"use client";

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X } from 'lucide-react';
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAuthModalOpen(false)}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-[90%] max-w-[420px] bg-[#111] border border-white/10 rounded-none shadow-2xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="relative h-32 flex items-center justify-center overflow-hidden bg-[#050505]">
              <div className="absolute inset-0 opacity-40">
                <Image src="/oversized_tee_hero.png" alt="ARC OPUS Background" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
              <button 
                onClick={() => setAuthModalOpen(false)}
                className="absolute top-4 right-4 text-[#F5F5F5]/60 hover:text-brand-red p-2 transition-colors z-10"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
              
              <div className="relative z-10 flex items-center space-x-3 mt-4">
                <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/20">
                  <Image src="/arc_opus_logo.jpeg" alt="ARC OPUS Logo" fill className="object-cover" />
                </div>
                <span className="font-logo text-xl tracking-[0.35em] text-brand-red font-black">
                  ARC OPUS
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 text-center space-y-8">
              <div className="space-y-3">
                <h2 className="font-heading text-lg tracking-[0.1em] text-white uppercase">Client Access</h2>
                <p className="font-sans text-xs text-white/50 tracking-wider">
                  Sign in to your ARC OPUS dossier to complete your acquisition and track your bespoke orders.
                </p>
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-4 bg-white text-black py-4 px-6 hover:bg-gray-200 transition-colors duration-300 group disabled:opacity-50"
              >
                {loading ? (
                  <span className="font-heading text-xs tracking-[0.1em] uppercase animate-pulse">Authenticating...</span>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="font-heading text-[11px] tracking-[0.1em] uppercase font-bold">Continue with Google</span>
                  </>
                )}
              </button>

              <div className="pt-2">
                <p className="text-[10px] text-white/30 tracking-widest uppercase">
                  By continuing, you agree to our <a href="#" className="underline hover:text-white transition-colors">Terms of Service</a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
