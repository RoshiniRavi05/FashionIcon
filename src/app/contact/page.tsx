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
    <div className="bg-[#0B0B0B] min-h-screen relative overflow-hidden selection:bg-brand-red selection:text-white pb-32">
      
      {/* Background Textures */}
      <div className="film-grain opacity-[0.05]" />
      <div className="paper-texture" />
      <div className="absolute inset-0 pointer-events-none z-0" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-20 py-24 relative z-10">
        
        {/* Editorial Hero */}
        <div className="min-h-[30vh] flex flex-col items-center justify-center text-center mb-16 border-b border-white/10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 max-w-[600px]"
          >
            <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black block">
              ARC OPUS LOGISTICS
            </span>
            <h1 className="font-hero text-4xl sm:text-5xl md:text-6xl tracking-widest uppercase text-[#F5F5F5] leading-[0.9]">
              CONNECT
            </h1>
            
            <p className="font-sans text-[11px] md:text-xs text-[rgba(255,255,255,0.65)] leading-[1.8] uppercase tracking-wider pt-4">
              Private communication channels for:<br />
              <span className="text-[rgba(255,255,255,0.75)] mt-1 block">Editorial // Wholesale // Creative Projects</span>
            </p>
          </motion.div>
        </div>

        {/* 1.2fr / 0.8fr Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16">
          
          {/* Left: Communication Registry (Form) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-[#111111] border border-[rgba(255,255,255,0.08)] p-8 md:p-12 rounded-[20px]"
          >
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-[rgba(255,255,255,0.08)]">
              <h2 className="font-hero text-sm tracking-[0.2em] uppercase text-[#F5F5F5]">
                COMMUNICATION REGISTRY
              </h2>
              <span className="font-mono text-[9px] text-[rgba(255,255,255,0.35)] tracking-widest uppercase">INTAKE LOG</span>
            </div>

            {sent ? (
              <motion.div 
                className="py-16 space-y-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-12 h-12 rounded-full border border-brand-red/30 flex items-center justify-center text-brand-red text-xl mx-auto bg-[rgba(184,18,27,0.12)]">
                  ✓
                </div>
                <h3 className="font-heading text-sm tracking-widest uppercase text-[#F5F5F5]">TRANSMISSION LOGGED</h3>
                <p className="font-sans text-xs text-[rgba(255,255,255,0.65)] max-w-[400px] mx-auto leading-relaxed">
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
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  
                  {/* Name */}
                  <div className="relative">
                    <label className="font-caption text-[9px] tracking-widest text-[rgba(255,255,255,0.45)] uppercase block mb-4">Identity / Alias</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="ENTER NAME"
                      className="w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.18)] pb-4 text-xs tracking-wider text-[#F5F5F5] uppercase placeholder-[rgba(255,255,255,0.35)] focus:outline-none focus:border-[#B8121B] focus:ring-0 font-sans transition-colors duration-300 focus:shadow-[0_0_20px_rgba(184,18,27,0.15)]"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label className="font-caption text-[9px] tracking-widest text-[rgba(255,255,255,0.45)] uppercase block mb-4">Channel / Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ENTER EMAIL"
                      className="w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.18)] pb-4 text-xs tracking-wider text-[#F5F5F5] uppercase placeholder-[rgba(255,255,255,0.35)] focus:outline-none focus:border-[#B8121B] focus:ring-0 font-sans transition-colors duration-300 focus:shadow-[0_0_20px_rgba(184,18,27,0.15)]"
                    />
                  </div>
                </div>

                {/* Department */}
                <div className="relative">
                  <label className="font-caption text-[9px] tracking-widest text-[rgba(255,255,255,0.45)] uppercase block mb-4">Inquiry Type</label>
                  <div className="relative">
                    <select
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      className="w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.18)] pb-4 text-xs tracking-widest text-[#F5F5F5] uppercase focus:outline-none focus:border-[#B8121B] focus:ring-0 font-sans cursor-pointer appearance-none transition-colors duration-300 focus:shadow-[0_0_20px_rgba(184,18,27,0.15)]"
                    >
                      <option value="general" className="bg-[#111111] text-[#F5F5F5]">PR & Editorial Support</option>
                      <option value="orders" className="bg-[#111111] text-[#F5F5F5]">Registry Order Logistics</option>
                      <option value="wholesale" className="bg-[#111111] text-[#F5F5F5]">Wholesale & Partnership</option>
                      <option value="design" className="bg-[#111111] text-[#F5F5F5]">Creative Projects</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none pb-4 text-[rgba(255,255,255,0.35)] text-xs">▼</div>
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <label className="font-caption text-[9px] tracking-widest text-[rgba(255,255,255,0.45)] uppercase block mb-4">Dispatch Details</label>
                  <textarea
                    rows={6}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="ENTER LOG NOTES..."
                    className="w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.18)] pb-4 text-xs tracking-wider text-[#F5F5F5] placeholder-[rgba(255,255,255,0.35)] focus:outline-none focus:border-[#B8121B] focus:ring-0 font-sans resize-none transition-colors duration-300 focus:shadow-[0_0_20px_rgba(184,18,27,0.15)]"
                  />
                </div>

                <div className="pt-6">
                  <button type="submit" className="group relative w-full bg-[#F5F5F5] hover:bg-brand-red text-[#050505] hover:text-white py-5 flex items-center justify-center space-x-3 transition-all duration-300 overflow-hidden">
                    <span className="font-heading text-xs tracking-[0.2em] uppercase font-bold relative z-10">Send Message</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-white group-hover:fill-white transition-all duration-300 relative z-10" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right: Studio Headquarters Information Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-[rgba(255,255,255,0.02)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.08)] p-8 md:p-10 flex flex-col space-y-12 relative rounded-[20px]"
          >
            {/* Studio Info Block */}
            <div className="space-y-10 flex-grow">
              
              {/* Section Header */}
              <div className="flex items-center justify-between mb-2 pb-4 border-b border-[rgba(255,255,255,0.08)]">
                <h2 className="font-hero text-sm tracking-[0.2em] uppercase text-[#F5F5F5]">
                  STUDIO HQ
                </h2>
                <div className="flex items-center space-x-2 bg-[rgba(184,18,27,0.12)] border border-[rgba(184,18,27,0.2)] px-3 py-1 rounded-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] animate-pulse" />
                  <span className="text-[#E63946] font-bold font-caption text-[9px] tracking-widest uppercase">ONLINE</span>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <p className="font-sans tracking-widest text-[rgba(255,255,255,0.75)] uppercase text-xs md:text-sm">TOKYO, JAPAN</p>
                <p className="font-mono text-[rgba(255,255,255,0.45)] text-xs tracking-wider">
                  35.6764° N<br />
                  139.6500° E
                </p>
              </div>

              {/* Logistics Info */}
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <p className="font-caption text-[8px] text-[rgba(255,255,255,0.35)] tracking-widest uppercase">Communication Hours</p>
                  <p className="font-sans text-[10px] text-[rgba(255,255,255,0.75)] tracking-widest uppercase">10:00 - 18:00 JST</p>
                  <p className="font-sans text-[10px] text-[rgba(255,255,255,0.45)] tracking-widest uppercase">MON - FRI</p>
                </div>
                <div className="space-y-2">
                  <p className="font-caption text-[8px] text-[rgba(255,255,255,0.35)] tracking-widest uppercase">Timezone Info</p>
                  <p className="font-sans text-[10px] text-[rgba(255,255,255,0.75)] tracking-widest uppercase">UTC +9</p>
                  <p className="font-sans text-[10px] text-[rgba(255,255,255,0.45)] tracking-widest uppercase">JAPAN STD TIME</p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <p className="font-caption text-[8px] text-[rgba(255,255,255,0.35)] tracking-widest uppercase">Digital Dispatches</p>
                <p className="font-sans text-[10px] text-[rgba(255,255,255,0.65)] tracking-widest uppercase hover:text-brand-red cursor-pointer transition-colors">STUDIO@ARCOPUS.FASHION</p>
              </div>

            </div>

            {/* Integrated Magazine Clipping Card */}
            <motion.div
              initial={{ opacity: 0, rotate: 0, y: 10 }}
              animate={{ opacity: 1, rotate: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              whileHover={{ rotate: 0, y: -2, scale: 1.01 }}
              className="relative bg-[#ECE8E2] text-[#111111] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] cursor-pointer mt-auto border border-black/10 mx-4 rotate-1 paper-texture"
            >
              {/* Tape detail */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm shadow-sm rotate-1" />
              
              <h3 className="font-caption text-[9px] tracking-[0.2em] uppercase text-brand-red mb-3 font-bold border-b border-black/10 pb-2">
                CURRENT STATUS
              </h3>
              <p className="font-sans text-[10px] text-black/60 uppercase tracking-widest mb-2">Accepting:</p>
              <ul className="font-hero text-[13px] leading-relaxed text-[#111111] uppercase space-y-1">
                <li>• Wholesale Partnerships</li>
                <li>• Editorial Collaborations</li>
                <li>• Creative Projects</li>
              </ul>
            </motion.div>

          </motion.div>
        </div>

        {/* Floating Bottom Labels */}
        <div className="flex justify-between items-center mt-16 font-mono text-[9px] text-[rgba(255,255,255,0.35)] tracking-widest uppercase border-t border-[rgba(255,255,255,0.08)] pt-6">
          <span>ARC OPUS STUDIO</span>
          <div className="flex space-x-6">
            <span>EDITION 07</span>
            <span>EST. 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
