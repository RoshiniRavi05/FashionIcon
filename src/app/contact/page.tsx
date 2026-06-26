"use client";

import React, { useState } from 'react';
import { ArrowRight, HelpCircle } from 'lucide-react';
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
    <div className="bg-[#050505] min-h-screen py-20 px-6 md:px-12 max-w-[1600px] mx-auto space-y-20">
      
      {/* Title */}
      <div className="space-y-4 pt-10 text-center max-w-[800px] mx-auto">
        <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black">
          ARC OPUS LOGISTICS
        </span>
        <h1 className="font-hero text-3xl sm:text-5xl tracking-wide uppercase text-white leading-tight">
          CONNECT
        </h1>
        <p className="font-sans text-xs text-white/50 leading-relaxed uppercase tracking-wider">
          Support // Press // Wholesale Inquiries
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 border border-white/5 bg-black/30 p-8 md:p-12 rounded-sm space-y-8">
          <h2 className="font-hero text-sm tracking-widest uppercase text-white">COMMUNICATION REGISTRY</h2>
          
          {sent ? (
            <motion.div 
              className="py-12 text-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-12 h-12 rounded-full border border-brand-red/35 flex items-center justify-center bg-brand-red/5 text-brand-red text-xl mx-auto">
                ✓
              </div>
              <h3 className="font-heading text-sm tracking-widest uppercase">TRANSMISSION RECEIVED</h3>
              <p className="font-sans text-xs text-white/50 max-w-[320px] mx-auto leading-relaxed">
                Thank you for reaching out. A studio representative will establish connection within 24 standard business hours.
              </p>
              <button 
                onClick={() => setSent(false)}
                className="font-heading text-[9px] tracking-widest uppercase text-brand-red hover:underline"
              >
                Send New Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col space-y-2">
                  <label className="font-caption text-[9px] tracking-widest text-white/40 uppercase">Identity</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="ENTER NAME"
                    className="bg-black/50 border border-white/10 p-3 text-xs tracking-wider text-white uppercase placeholder-white/20 focus:outline-none focus:border-brand-red font-caption"
                  />
                </div>
                
                {/* Email */}
                <div className="flex flex-col space-y-2">
                  <label className="font-caption text-[9px] tracking-widest text-white/40 uppercase">Channel / Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ENTER EMAIL"
                    className="bg-black/50 border border-white/10 p-3 text-xs tracking-wider text-white uppercase placeholder-white/20 focus:outline-none focus:border-brand-red font-caption"
                  />
                </div>
              </div>

              {/* Department */}
              <div className="flex flex-col space-y-2">
                <label className="font-caption text-[9px] tracking-widest text-white/40 uppercase">Classification</label>
                <select
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="bg-black/50 border border-white/10 p-3 text-xs tracking-widest text-white uppercase focus:outline-none focus:border-brand-red font-caption cursor-pointer"
                >
                  <option value="general">PR & Editorial Support</option>
                  <option value="orders">Registry Order Logistics</option>
                  <option value="wholesale">Wholesale & Partnership</option>
                  <option value="design">Technical Careers</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col space-y-2">
                <label className="font-caption text-[9px] tracking-widest text-white/40 uppercase">Details / Message</label>
                <textarea
                  rows={6}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="ENTER DISPATCH DETAILS..."
                  className="bg-black/50 border border-white/10 p-3 text-xs tracking-wider text-white placeholder-white/20 focus:outline-none focus:border-brand-red font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#F5F5F5] hover:bg-brand-red text-[#050505] hover:text-white font-heading text-xs tracking-[0.2em] uppercase py-4 transition-all duration-500 font-bold flex items-center justify-center space-x-2"
              >
                <span>TRANSMIT DISPATCH</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Studio Info Info Panel */}
        <div className="lg:col-span-5 space-y-8 lg:pl-6">
          <div className="space-y-4">
            <h2 className="font-hero text-sm tracking-widest uppercase text-white">STUDIO HEADQUARTERS</h2>
            <div className="h-[1px] w-12 bg-brand-red" />
          </div>

          <div className="space-y-6 font-sans text-xs text-white/60 leading-relaxed uppercase tracking-wider font-caption">
            <div>
              <p className="text-white/30 font-sans tracking-widest text-[9px]">PHYSICAL LOCATIONS</p>
              <p className="text-white mt-1">404 TECHNICAL GRID WAY</p>
              <p>SUITE 900 // SHIBUYA, TOKYO</p>
            </div>
            <div>
              <p className="text-white/30 font-sans tracking-widest text-[9px]">DIGITAL DISPATCHES</p>
              <p className="text-white mt-1 hover:text-brand-red cursor-pointer">STUDIO@ARCOPUS.FASHION</p>
              <p className="hover:text-brand-red cursor-pointer">LOGISTICS@ARCOPUS.FASHION</p>
            </div>
            <div>
              <p className="text-white/30 font-sans tracking-widest text-[9px]">COMMUNICATION HOURS</p>
              <p className="text-white mt-1">10:00 - 18:00 JST // MON - FRI</p>
            </div>
          </div>

          <div className="border border-white/5 bg-black/30 p-6 rounded-sm space-y-3">
            <div className="flex items-center space-x-2 text-brand-red">
              <HelpCircle className="w-4 h-4" />
              <span className="font-heading text-[10px] tracking-widest uppercase">Wholesale Terms</span>
            </div>
            <p className="font-sans text-[11px] text-white/40 leading-relaxed">
              Wholesale accounts are reviewed individually against aesthetic positioning benchmarks. Expect 5-10 business days for review logs.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
