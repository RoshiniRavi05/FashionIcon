"use client";

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, LogOut, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isSaved, setIsSaved] = useState(false);

  // Form State (Mocking local state for now, no database backend required yet)
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    address: '',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!session) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
        <p className="text-white/60 font-mono tracking-widest text-sm text-center">PLEASE SIGN IN TO VIEW PROFILE.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-12"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-brand-red/30 shadow-[0_0_40px_rgba(193,14,29,0.15)]">
            <Image
              src={session.user?.image || "/arc_opus_logo.jpeg"}
              alt="Profile Picture"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="font-syne text-3xl md:text-4xl font-bold tracking-wide text-white mb-2">
              CLIENT PROFILE
            </h1>
            <p className="font-mono text-sm tracking-widest text-white/50 uppercase">
              Manage your ARC OPUS account
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-10 backdrop-blur-sm">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center text-xs font-mono tracking-widest text-white/50 uppercase">
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

              {/* Email Field (Disabled) */}
              <div className="space-y-2">
                <label className="flex items-center text-xs font-mono tracking-widest text-white/50 uppercase">
                  <Mail className="w-3.5 h-3.5 mr-2" /> Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white/50 cursor-not-allowed"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="flex items-center text-xs font-mono tracking-widest text-white/50 uppercase">
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

              {/* Shipping Address */}
              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center text-xs font-mono tracking-widest text-white/50 uppercase">
                  <MapPin className="w-3.5 h-3.5 mr-2" /> Shipping Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red/50 transition-colors placeholder-white/20 min-h-[100px] resize-y"
                  placeholder="Enter your primary shipping address"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                type="submit"
                className="bg-brand-red text-white font-mono text-xs tracking-widest py-3 px-8 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
              >
                {isSaved ? "SAVED ✓" : "SAVE CHANGES"}
              </button>
              
              {isSaved && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center text-green-500 text-xs font-mono tracking-widest"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  UPDATED
                </motion.div>
              )}
            </div>
          </form>
        </div>

        {/* Sign Out Section */}
        <div className="pt-12 flex justify-center">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="group flex items-center justify-center gap-3 w-full md:w-auto border border-brand-red/50 text-brand-red hover:bg-brand-red hover:text-white transition-all duration-300 rounded-full py-4 px-12 font-mono tracking-widest text-sm uppercase"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Sign Out
          </button>
        </div>

      </motion.div>
    </div>
  );
}
