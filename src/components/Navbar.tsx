"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import TextDock from './TextDock';
import { useSession, signOut } from 'next-auth/react';

export const Navbar: React.FC = () => {
  const { cart, wishlist, setCartOpen, setWishlistOpen, setProfileOpen, setAuthModalOpen } = useApp();
  const { data: session } = useSession();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { href: '/collections', label: 'Collections' },
    { href: '/shop', label: 'Shop' },
    { href: '/story', label: 'Story' },
    { href: '/journal', label: 'Journal' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b ${
          scrolled
            ? 'bg-[#050505]/85 backdrop-blur-xl border-white/5 py-4'
            : 'bg-transparent border-transparent py-6'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center select-none space-x-3">
            <div className="relative overflow-visible pb-1">
              <span className="font-logo text-xl md:text-2xl tracking-[0.35em] text-brand-red font-black transition-colors duration-500 block">
                ARC OPUS
              </span>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </div>
          </Link>

          {/* Center Navigation Links - Desktop with Dock Magnification Animation */}
          <div className="hidden lg:block select-none pointer-events-auto">
            <TextDock items={navLinks} />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-6">
            {/* Join the Fam CTA */}
            {!session && !pathname.startsWith('/admin') && (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="font-heading text-[10px] tracking-[0.2em] uppercase bg-[#F5F5F5] text-[#050505] px-6 py-2.5 hover:bg-brand-red hover:text-white transition-all duration-300 font-bold hidden md:block"
              >
                Join the Fam
              </button>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => setWishlistOpen(true)}
              className="relative text-[#F5F5F5]/70 hover:text-brand-red transition-colors duration-300"
            >
              <Heart className="w-[18px] h-[18px] stroke-[1.5]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-red text-white text-[9px] font-sans w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-[#F5F5F5]/70 hover:text-brand-red transition-colors duration-300 cart-icon-wrapper"
            >
              <ShoppingBag className="w-[18px] h-[18px] stroke-[1.5]" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#F5F5F5] text-[#050505] text-[9px] font-sans w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* User Profile */}
            {session?.user && (
              <button onClick={() => setProfileOpen(true)} className="relative group/profile flex items-center justify-center w-9 h-9 rounded-full hover:ring-2 hover:ring-brand-red/50 transition-all bg-white/5 backdrop-blur-md">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
                  <Image 
                    src={session.user.image || "/arc_opus_logo.jpeg"} 
                    alt="Profile" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex flex-col justify-between w-5 h-4 text-[#F5F5F5]/70 hover:text-[#F5F5F5]"
            >
              <span className="w-full h-[1px] bg-current" />
              <span className="w-2/3 h-[1px] bg-current align-self-end" />
              <span className="w-full h-[1px] bg-current" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#050505] flex flex-col justify-between p-8"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between">
              <span className="font-logo text-xl tracking-[0.3em] font-black">ARC OPUS</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#F5F5F5] p-2"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 mt-16">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-hero text-2xl tracking-[0.1em] uppercase hover:text-brand-red transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-white/10 pt-8 flex flex-col space-y-4 font-caption text-xs tracking-wider text-[#F5F5F5]/50">
              <p>Crafted Beyond Ordinary</p>
              <div className="flex space-x-6 text-[#F5F5F5]/70">
                <a href="#" className="hover:text-brand-red transition-colors">Instagram</a>
                <a href="#" className="hover:text-brand-red transition-colors">Pinterest</a>
                <a href="#" className="hover:text-brand-red transition-colors">Journal</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
