"use client";

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: 'general',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSent(true);
      setForm({ name: '', email: '', department: 'general', message: '' });
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen relative overflow-hidden selection:bg-brand-red selection:text-white pb-32">
      
      {/* Background Textures */}
      <div className="film-grain" />
      <div className="paper-texture" />
      
      {/* Faint Architectural Blueprint Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-0" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* Floating Annotations */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="hidden xl:block absolute top-[25vh] left-[4vw] font-mono text-[9px] text-white/30 tracking-widest uppercase -rotate-90 origin-left z-0"
      >
        EDITION 07 // EST. 2026
      </motion.div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-32 relative z-10">
        
        {/* Editorial Hero */}
        <div className="mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black block">
              ARC OPUS LOGISTICS
            </span>
            <h1 className="font-hero text-4xl sm:text-6xl md:text-7xl tracking-widest uppercase text-white leading-[0.9]">
              CONNECT
            </h1>
            
            <div className="pt-4 max-w-[420px]">
              <p className="font-sans text-[11px] md:text-xs text-white/50 leading-[1.8] uppercase tracking-wider">
                Private communication channels for:
                <br />
                <span className="text-white/80">Editorial // Wholesale // Collaborations // Custom Projects</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">
          
          {/* Left: Communication Registry (Form) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2 className="font-hero text-xs sm:text-sm tracking-[0.2em] uppercase text-white mb-10 pb-4 border-b border-white/10">
                COMMUNICATION REGISTRY
              </h2>

              {sent ? (
                <motion.div 
                  className="py-16 space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-10 h-10 border border-brand-red flex items-center justify-center text-brand-red text-lg mb-8">
                    ✓
                  </div>
                  <h3 className="font-heading text-lg tracking-widest uppercase text-white">TRANSMISSION LOGGED</h3>
                  <p className="font-sans text-xs text-white/50 max-w-[400px] leading-relaxed">
                    Your dispatch has been successfully recorded in the studio registry. A representative will review your inquiry and establish contact within standard operating hours.
                  </p>
                  <button 
                    onClick={() => setSent(false)}
                    className="font-caption text-[10px] tracking-[0.2em] uppercase text-brand-red hover:text-white transition-colors duration-300 mt-4 block border-b border-brand-red pb-1"
                  >
                    Submit Additional Dispatch
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    
                    {/* Name */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="group relative"
                    >
                      <label className="font-caption text-[9px] tracking-widest text-white/40 uppercase block mb-3">Identity / Alias</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="ENTER DISPATCHER NAME"
                        className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-xs tracking-wider text-white uppercase placeholder-white/10 focus:outline-none focus:border-brand-red focus:ring-0 font-sans transition-colors duration-300"
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="group relative"
                    >
                      <label className="font-caption text-[9px] tracking-widest text-white/40 uppercase block mb-3">Channel / Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="ENTER CONTACT VECTOR"
                        className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-xs tracking-wider text-white uppercase placeholder-white/10 focus:outline-none focus:border-brand-red focus:ring-0 font-sans transition-colors duration-300"
                      />
                    </motion.div>
                  </div>

                  {/* Department */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="group relative"
                  >
                    <label className="font-caption text-[9px] tracking-widest text-white/40 uppercase block mb-3">Classification</label>
                    <div className="relative">
                      <select
                        value={form.department}
                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                        className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-xs tracking-widest text-white uppercase focus:outline-none focus:border-brand-red focus:ring-0 font-sans cursor-pointer appearance-none transition-colors duration-300"
                      >
                        <option value="general" className="bg-[#0c0c0c]">PR & Editorial Support</option>
                        <option value="orders" className="bg-[#0c0c0c]">Registry Order Logistics</option>
                        <option value="wholesale" className="bg-[#0c0c0c]">Wholesale & Partnership</option>
                        <option value="design" className="bg-[#0c0c0c]">Technical Projects</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none pb-3 text-white/40 text-xs">▼</div>
                    </div>
                  </motion.div>

                  {/* Message */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="group relative"
                  >
                    <label className="font-caption text-[9px] tracking-widest text-white/40 uppercase block mb-3">Dispatch Details</label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="ENTER LOG NOTES..."
                      className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-xs tracking-wider text-white placeholder-white/10 focus:outline-none focus:border-brand-red focus:ring-0 font-sans resize-none transition-colors duration-300"
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="pt-6"
                  >
                    <button
                      type="submit"
                      className="group flex items-center space-x-4 bg-transparent hover:bg-[#F5F5F5] text-[#F5F5F5] hover:text-[#050505] font-heading text-[10px] tracking-[0.2em] uppercase py-4 px-8 border border-white/20 hover:border-transparent transition-all duration-500 font-bold"
                    >
                      <span>TRANSMIT DISPATCH</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </motion.div>
                </form>
              )}
            </motion.div>
          </div>

          {/* Right: Studio Headquarters Information Sheet */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="lg:pl-12 space-y-16"
            >
              
              {/* Studio Info Block */}
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <h2 className="font-hero text-xs sm:text-sm tracking-[0.2em] uppercase text-white">
                    STUDIO HEADQUARTERS
                  </h2>
                  <div className="h-[1px] w-8 bg-brand-red" />
                </div>

                <div className="space-y-4">
                  <p className="font-sans tracking-widest text-white uppercase text-xs md:text-sm">TOKYO, JAPAN</p>
                  <p className="font-mono text-white/50 text-xs tracking-wider">
                    35.6764° N<br />
                    139.6500° E
                  </p>
                </div>

                {/* Online Status */}
                <div className="flex items-center space-x-3 font-caption text-[10px] tracking-[0.2em] uppercase pt-2">
                  <span className="text-white/40">STATUS</span>
                  <div className="flex items-center space-x-2 border border-brand-red/30 bg-brand-red/5 px-3 py-1 rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                    <span className="text-brand-red font-bold">ONLINE</span>
                  </div>
                </div>

                {/* Logistics Info */}
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                  <div className="space-y-2">
                    <p className="font-caption text-[8px] text-white/30 tracking-widest uppercase">Communication Hours</p>
                    <p className="font-sans text-[10px] text-white/80 tracking-widest uppercase">10:00 - 18:00</p>
                    <p className="font-sans text-[10px] text-white/50 tracking-widest uppercase">MON - FRI</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-caption text-[8px] text-white/30 tracking-widest uppercase">Timezone Info</p>
                    <p className="font-sans text-[10px] text-white/80 tracking-widest uppercase">JAPAN STD TIME</p>
                    <p className="font-sans text-[10px] text-white/50 tracking-widest uppercase">UTC +9</p>
                  </div>
                </div>
              </div>

              {/* Magazine Clipping Card */}
              <motion.div
                initial={{ opacity: 0, rotate: -2, x: 20 }}
                animate={{ opacity: 1, rotate: 2, x: 0 }}
                transition={{ delay: 0.9, duration: 1 }}
                whileHover={{ rotate: 0, y: -5, scale: 1.02 }}
                className="relative bg-[#e0e0e0] p-6 max-w-[280px] shadow-2xl cursor-pointer ml-auto lg:mr-8 xl:mr-16"
              >
                {/* Tape detail */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm shadow-sm rotate-2" />
                
                <h3 className="font-caption text-[9px] tracking-[0.2em] uppercase text-brand-red mb-4 font-bold border-b border-black/10 pb-2">
                  CURRENT STATUS
                </h3>
                <p className="font-sans text-[10px] text-black/50 uppercase tracking-widest mb-3">Accepting:</p>
                <ul className="font-hero text-sm leading-relaxed text-[#111] uppercase space-y-1">
                  <li>• Wholesale Partnerships</li>
                  <li>• Editorial Collaborations</li>
                  <li>• Creative Projects</li>
                </ul>
              </motion.div>

            </motion.div>
          </div>

        </div>

        {/* Floating Bottom Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 right-6 md:right-12 font-mono text-[9px] text-white/20 tracking-widest uppercase text-right pointer-events-none"
        >
          ARC OPUS STUDIO<br />
          COMMUNICATIONS OPEN
        </motion.div>
      </div>
    </div>
  );
}
