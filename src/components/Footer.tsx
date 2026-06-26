"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-12 mt-auto">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        
        {/* Brand column */}
        <div className="flex flex-col space-y-6">
          <Link href="/" className="font-logo text-2xl tracking-[0.3em] font-black text-[#F5F5F5]">
            ARC OPUS
          </Link>
          <p className="font-caption text-xs tracking-widest text-[#F5F5F5]/40 leading-relaxed uppercase">
            Crafted Beyond Ordinary
          </p>
          <p className="font-sans text-xs text-[#F5F5F5]/50 leading-relaxed max-w-[280px]">
            Exploring the intersection of architectural structure, technical material engineering, and luxury high-fashion campaigns.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-heading text-[10px] tracking-[0.25em] text-[#F5F5F5] uppercase">Navigation</h4>
          <div className="flex flex-col space-y-2 font-sans text-xs text-[#F5F5F5]/60">
            <Link href="/shop" className="hover:text-brand-red transition-colors duration-300 w-fit">Catalog</Link>
            <Link href="/collections" className="hover:text-brand-red transition-colors duration-300 w-fit">Collections</Link>
            <Link href="/story" className="hover:text-brand-red transition-colors duration-300 w-fit">Our Story</Link>
            <Link href="/journal" className="hover:text-brand-red transition-colors duration-300 w-fit">Editorial Journal</Link>
          </div>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-heading text-[10px] tracking-[0.25em] text-[#F5F5F5] uppercase">Support</h4>
          <div className="flex flex-col space-y-2 font-sans text-xs text-[#F5F5F5]/60">
            <Link href="/contact" className="hover:text-brand-red transition-colors duration-300 w-fit">Contact</Link>
            <a href="#" className="hover:text-brand-red transition-colors duration-300 w-fit">Shipping & Returns</a>
            <a href="#" className="hover:text-brand-red transition-colors duration-300 w-fit">Size Guide</a>
            <a href="#" className="hover:text-brand-red transition-colors duration-300 w-fit">Privacy Policy</a>
          </div>
        </div>

        {/* Newsletter column */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-heading text-[10px] tracking-[0.25em] text-[#F5F5F5] uppercase">Newsletter</h4>
          <p className="font-sans text-xs text-[#F5F5F5]/50 leading-relaxed">
            Subscribe to receive exclusive access to capsule collection releases and editorial drop notifications.
          </p>
          
          {subscribed ? (
            <span className="font-caption text-xs tracking-wider text-brand-red">
              Welcome to the inner circle.
            </span>
          ) : (
            <form onSubmit={handleSubscribe} className="relative flex items-center border-b border-white/20 pb-1">
              <input
                type="email"
                placeholder="ENTER EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-xs tracking-widest text-[#F5F5F5] placeholder-[#F5F5F5]/30 focus:outline-none w-full py-1 uppercase"
                required
              />
              <button 
                type="submit" 
                className="text-[#F5F5F5]/70 hover:text-brand-red transition-colors duration-300 pl-2"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
        <p className="font-caption text-[10px] tracking-widest text-[#F5F5F5]/30 uppercase">
          © {new Date().getFullYear()} ARC OPUS. ALL RIGHTS RESERVED.
        </p>
        <div className="flex space-x-8 font-caption text-[10px] tracking-widest text-[#F5F5F5]/30 uppercase">
          <a href="#" className="hover:text-brand-red transition-colors duration-300">Instagram</a>
          <a href="#" className="hover:text-brand-red transition-colors duration-300">Pinterest</a>
          <a href="#" className="hover:text-brand-red transition-colors duration-300">Soundcloud</a>
        </div>
      </div>
    </footer>
  );
};
