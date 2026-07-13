"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Activity } from 'lucide-react';

import { useApp } from '../context/AppContext';

// Randomly generate some "active" nodes on a 2D plane to simulate global orders
const generateNodes = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    id: Math.random(),
    x: Math.random() * 100, // percentage x
    y: Math.random() * 100, // percentage y
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 3,
  }));
};

export const NetworkMap = () => {
  const { orders } = useApp();
  const [nodes, setNodes] = useState<{id: number, x: number, y: number, delay: number, duration: number}[]>([]);

  // Initial load
  useEffect(() => {
    setNodes(generateNodes(15));
  }, []);

  // Listen to new orders
  useEffect(() => {
    if (orders.length > 0) {
      setNodes(prev => [...prev, ...generateNodes(1)]);
    }
  }, [orders.length]);

  return (
    <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden relative group">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex justify-between items-center relative z-10 bg-black/50 backdrop-blur-md">
        <h3 className="font-syne text-xl text-white tracking-widest uppercase flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-red" /> Global Network
        </h3>
        <span className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-brand-red uppercase">
          <Activity className="w-3 h-3 animate-pulse" /> Live Orders
        </span>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[300px] bg-[#0A0A0A] overflow-hidden">
        {/* SVG World Map Base (Abstract grid lines) */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2,2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Animated Nodes */}
        {nodes.map(node => (
          <motion.div
            key={node.id}
            className="absolute w-2 h-2 bg-brand-red rounded-full"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 1, 1],
              opacity: [0, 1, 0.8, 0],
              boxShadow: [
                "0 0 0px 0px rgba(193,14,29,0)",
                "0 0 20px 5px rgba(193,14,29,0.5)",
                "0 0 10px 2px rgba(193,14,29,0.3)",
                "0 0 0px 0px rgba(193,14,29,0)"
              ]
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              delay: node.delay,
              ease: "easeInOut"
            }}
          >
            {/* Ping ring */}
            <motion.div
              className="absolute inset-0 border border-brand-red rounded-full"
              animate={{
                scale: [1, 4],
                opacity: [1, 0]
              }}
              transition={{
                duration: node.duration,
                repeat: Infinity,
                delay: node.delay,
                ease: "easeOut"
              }}
            />
          </motion.div>
        ))}

        {/* Scanline Effect */}
        <motion.div 
          className="absolute left-0 right-0 h-1 bg-brand-red/20 blur-sm z-20 pointer-events-none"
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] pointer-events-none z-10" />
      </div>
    </div>
  );
};
