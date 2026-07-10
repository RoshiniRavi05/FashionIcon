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
        className="hidden xl:block absolute top-[25vh] left-[2vw] font-mono text-[9px] text-white/30 tracking-widest uppercase -rotate-90 origin-left z-0"
      >
        EDITION 07 // EST. 2026
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 relative z-10">
        
        {/* Editorial Hero */}
        <div className="mb-16 border-b border-white/10 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black block">
              ARC OPUS LOGISTICS
            </span>
            <h1 className="font-hero text-4xl sm:text-5xl md:text-6xl tracking-widest uppercase text-white leading-[0.9]">
              CONNECT
            </h1>
            
            <div className="pt-4 max-w-[500px]">
              <p className="font-sans text-[11px] md:text-xs text-white/50 leading-[1.8] uppercase tracking-wider">
                Private communication channels for:<br />
                <span className="text-white/80 mt-1 block">Editorial // Wholesale // Collaborations // Custom Projects</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* 60/40 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left (60%): Communication Registry (Form) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-black/20 border border-white/5 p-8 md:p-12 rounded-sm"
            >
              <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/10">
                <h2 className="font-hero text-sm tracking-[0.2em] uppercase text-white">
                  COMMUNICATION REGISTRY
                </h2>
                <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase">INTAKE LOG</span>
              </div>

              {sent ? (
                <motion.div 
                  className="py-16 space-y-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-12 h-12 rounded-full border border-brand-red/30 flex items-center justify-center text-brand-red text-xl mx-auto bg-brand-red/5">
                    ✓
                  </div>
                  <h3 className="font-heading text-sm tracking-widest uppercase text-white">TRANSMISSION LOGGED</h3>
                  <p className="font-sans text-xs text-white/50 max-w-[400px] mx-auto leading-relaxed">
                    Your dispatch has been successfully recorded in the studio registry. A representative will review your inquiry and establish contact within standard operating hours.
                  </p>
                  <button 
                    onClick={() => setSent(false)}
                    className="font-caption text-[10px] tracking-[0.2em] uppercase text-brand-red hover:text-white transition-colors duration-300 mt-4 inline-block border-b border-brand-red pb-1"
                  >
                    Submit Additional Dispatch
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    
                    {/* Name */}
                    <div className="group relative">
                      <label className="font-caption text-[9px] tracking-widest text-white/40 uppercase block mb-3">Identity / Alias</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="ENTER DISPATCHER NAME"
                        className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-xs tracking-wider text-white uppercase placeholder-white/10 focus:outline-none focus:border-brand-red focus:ring-0 font-sans transition-colors duration-300"
                      />
                    </div>

                    {/* Email */}
                    <div className="group relative">
                      <label className="font-caption text-[9px] tracking-widest text-white/40 uppercase block mb-3">Channel / Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="ENTER CONTACT VECTOR"
                        className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-xs tracking-wider text-white uppercase placeholder-white/10 focus:outline-none focus:border-brand-red focus:ring-0 font-sans transition-colors duration-300"
                      />
                    </div>
                  </div>

                  {/* Department */}
                  <div className="group relative">
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
                  </div>

                  {/* Message */}
                  <div className="group relative">
                    <label className="font-caption text-[9px] tracking-widest text-white/40 uppercase block mb-3">Dispatch Details</label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="ENTER LOG NOTES..."
                      className="w-full bg-transparent border-0 border-b border-white/20 pb-3 text-xs tracking-wider text-white placeholder-white/10 focus:outline-none focus:border-brand-red focus:ring-0 font-sans resize-none transition-colors duration-300"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="group flex items-center justify-center space-x-4 w-full bg-[#F5F5F5] hover:bg-brand-red text-[#050505] hover:text-white font-heading text-xs tracking-[0.2em] uppercase py-4 transition-all duration-500 font-bold"
                    >
                      <span>TRANSMIT DISPATCH</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

          {/* Right (40%): Studio Headquarters Information Sheet */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-black/20 border border-white/5 p-8 md:p-10 rounded-sm h-full flex flex-col space-y-12 relative"
            >
              
              {/* Studio Info Block */}
              <div className="space-y-10 flex-grow">
                
                {/* Section Header */}
                <div className="flex items-center justify-between mb-2 pb-4 border-b border-white/10">
                  <h2 className="font-hero text-sm tracking-[0.2em] uppercase text-white">
                    STUDIO HQ
                  </h2>
                  <div className="flex items-center space-x-2 bg-brand-red/10 border border-brand-red/30 px-3 py-1 rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                    <span className="text-brand-red font-bold font-caption text-[9px] tracking-widest uppercase">ONLINE</span>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <p className="font-sans tracking-widest text-white uppercase text-xs md:text-sm">TOKYO, JAPAN</p>
                  <p className="font-mono text-white/50 text-xs tracking-wider">
                    35.6764° N<br />
                    139.6500° E
                  </p>
                </div>

                {/* Logistics Info */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="font-caption text-[8px] text-white/30 tracking-widest uppercase">Communication Hours</p>
                    <p className="font-sans text-[10px] text-white/80 tracking-widest uppercase">10:00 - 18:00 JST</p>
                    <p className="font-sans text-[10px] text-white/50 tracking-widest uppercase">MON - FRI</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-caption text-[8px] text-white/30 tracking-widest uppercase">Timezone Info</p>
                    <p className="font-sans text-[10px] text-white/80 tracking-widest uppercase">UTC +9</p>
                    <p className="font-sans text-[10px] text-white/50 tracking-widest uppercase">JAPAN STD TIME</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="font-caption text-[8px] text-white/30 tracking-widest uppercase">Digital Dispatches</p>
                  <p className="font-sans text-[10px] text-white/80 tracking-widest uppercase hover:text-brand-red cursor-pointer transition-colors">STUDIO@ARCOPUS.FASHION</p>
                  <p className="font-sans text-[10px] text-white/80 tracking-widest uppercase hover:text-brand-red cursor-pointer transition-colors">LOGISTICS@ARCOPUS.FASHION</p>
                </div>

              </div>

              {/* Integrated Magazine Clipping Card */}
              <motion.div
                initial={{ opacity: 0, rotate: -1, y: 10 }}
                animate={{ opacity: 1, rotate: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                whileHover={{ rotate: 0, y: -2, scale: 1.01 }}
                className="relative bg-[#e0e0e0] p-6 shadow-xl cursor-pointer mt-auto border border-black/10"
              >
                {/* Tape detail */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm shadow-sm rotate-1" />
                
                <h3 className="font-caption text-[9px] tracking-[0.2em] uppercase text-brand-red mb-3 font-bold border-b border-black/10 pb-2">
                  CURRENT STATUS
                </h3>
                <p className="font-sans text-[10px] text-black/50 uppercase tracking-widest mb-2">Accepting:</p>
                <ul className="font-hero text-[13px] leading-relaxed text-[#111] uppercase space-y-1">
                  <li>• Wholesale Partnerships</li>
                  <li>• Editorial Collaborations</li>
                  <li>• Creative Projects</li>
                </ul>
              </motion.div>

            </motion.div>
          </div>

        </div>

        {/* Floating Bottom Label */}
        <div className="flex justify-between items-center mt-12 font-mono text-[9px] text-white/20 tracking-widest uppercase pb-6">
          <span>ARC OPUS STUDIO</span>
          <span>COMMUNICATIONS OPEN</span>
        </div>
      </div>
    </div>
  );
}
