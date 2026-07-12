"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, MapPin, LogOut, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useSession, signOut } from 'next-auth/react';

export const ProfileDrawer: React.FC = () => {
  const { profileOpen, setProfileOpen } = useApp();
  const { data: session } = useSession();
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    address: '',
  });

  // Update formData when session changes
  React.useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user?.name || '',
        email: session.user?.email || '',
      }));
    }
  }, [session]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <AnimatePresence>
      {profileOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#050505]/80 backdrop-blur-sm z-[100]"
            onClick={() => setProfileOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] md:w-[450px] bg-[#0A0A0A] border-l border-white/10 z-[101] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-syne text-xl font-bold tracking-widest text-white">CLIENT PROFILE</h2>
              <button
                onClick={() => setProfileOpen(false)}
                className="p-2 text-white/50 hover:text-brand-red transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
              <div className="p-6 space-y-8">
                
                {/* Profile Image */}
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-brand-red/30 shadow-[0_0_30px_rgba(193,14,29,0.15)]">
                    <Image
                      src={session?.user?.image || "/arc_opus_logo.jpeg"}
                      alt="Profile Picture"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-mono text-[10px] tracking-widest text-white/50 uppercase text-center px-4">
                    Manage your ARC OPUS account settings and preferences.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSave} className="space-y-5">
                  <div className="space-y-2">
                    <label className="flex items-center text-[10px] font-mono tracking-widest text-white/50 uppercase">
                      <User className="w-3.5 h-3.5 mr-2" /> Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red/50 transition-colors placeholder-white/20"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-[10px] font-mono tracking-widest text-white/50 uppercase">
                      <Mail className="w-3.5 h-3.5 mr-2" /> Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white/50 cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-[10px] font-mono tracking-widest text-white/50 uppercase">
                      <Phone className="w-3.5 h-3.5 mr-2" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red/50 transition-colors placeholder-white/20"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-[10px] font-mono tracking-widest text-white/50 uppercase">
                      <MapPin className="w-3.5 h-3.5 mr-2" /> Shipping Address
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red/50 transition-colors placeholder-white/20 min-h-[80px] resize-y"
                      placeholder="Enter your primary shipping address"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      className="bg-brand-red text-white font-mono text-[10px] tracking-widest py-2.5 px-6 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
                    >
                      {isSaved ? "SAVED ✓" : "SAVE CHANGES"}
                    </button>
                    
                    {isSaved && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center text-green-500 text-[10px] font-mono tracking-widest"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        UPDATED
                      </motion.div>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Footer with Sign Out */}
            <div className="p-6 border-t border-white/10 bg-[#0A0A0A] mt-auto">
              <button
                onClick={() => {
                  setProfileOpen(false);
                  signOut({ callbackUrl: '/' });
                }}
                className="group flex items-center justify-center gap-3 w-full border border-brand-red/50 text-brand-red hover:bg-brand-red hover:text-white transition-all duration-300 rounded-full py-3.5 font-mono tracking-widest text-[10px] uppercase"
              >
                <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                SIGN OUT
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
