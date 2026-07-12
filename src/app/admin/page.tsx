"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, TrendingUp, Package, DollarSign, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { AdminGuard } from '@/components/AdminGuard';
import { NetworkMap } from '@/components/NetworkMap';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminDashboard() {
  const { products, addProduct, deleteProduct, updateProductPrice, orders } = useApp();
  
  // Modals and state
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingPriceId, setEditingPriceId] = useState<number | null>(null);
  const [newPriceValue, setNewPriceValue] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "t-shirts",
    subcat: "oversized",
    image: "/arc_opus_logo.jpeg",
    tag: "",
    stock: 10,
    description: "",
  });

  // Analytics Mock Data (combining real orders with mock historical data)
  const totalRevenue = useMemo(() => {
    const historical = 24500;
    const recent = orders.reduce((acc, order) => acc + (order.total || 0), 0);
    return historical + recent;
  }, [orders]);

  const totalSalesCount = 142 + orders.length;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    
    addProduct({
      ...newProduct,
      price: newProduct.price.startsWith('$') ? newProduct.price : `$${newProduct.price}`,
    });
    setIsAddingProduct(false);
    setNewProduct({ ...newProduct, name: "", price: "", description: "" });
  };

  const handleSavePrice = (id: number) => {
    if (newPriceValue) {
      updateProductPrice(id, newPriceValue.startsWith('$') ? newPriceValue : `$${newPriceValue}`);
    }
    setEditingPriceId(null);
  };

  return (
    <AdminGuard>
      <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 w-full mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-caption text-[10px] tracking-[0.3em] text-brand-red uppercase font-black block mb-2">
              SYSTEM CONTROL
            </span>
            <h1 className="font-syne text-3xl md:text-5xl font-bold tracking-wide uppercase text-white">
              ADMIN DASHBOARD
            </h1>
          </div>
          <button 
            onClick={() => setIsAddingProduct(true)}
            className="flex items-center justify-center gap-2 bg-brand-red text-white px-6 py-3 rounded-full font-mono text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <DollarSign className="w-24 h-24 text-brand-red" />
            </div>
            <div className="relative z-10 space-y-4">
              <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase block">Total Revenue</span>
              <h2 className="font-syne text-4xl text-white font-bold">${totalRevenue.toLocaleString()}</h2>
              <div className="flex items-center text-green-500 text-xs font-mono">
                <TrendingUp className="w-3 h-3 mr-1" /> +12.5% from last month
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Package className="w-24 h-24 text-white" />
            </div>
            <div className="relative z-10 space-y-4">
              <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase block">Total Sales</span>
              <h2 className="font-syne text-4xl text-white font-bold">{totalSalesCount}</h2>
              <div className="flex items-center text-green-500 text-xs font-mono">
                <TrendingUp className="w-3 h-3 mr-1" /> +8.2% from last month
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Package className="w-24 h-24 text-brand-red" />
            </div>
            <div className="relative z-10 space-y-4">
              <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase block">Active Inventory</span>
              <h2 className="font-syne text-4xl text-white font-bold">{products.length} Items</h2>
              <div className="flex items-center text-white/40 text-xs font-mono">
                Across {new Set(products.map(p => p.category)).size} Categories
              </div>
            </div>
          </div>
        </div>

        {/* Network Map */}
        <NetworkMap />

        {/* Inventory Table */}
        <div className="bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="p-6 border-b border-white/10">
            <h3 className="font-syne text-xl text-white tracking-widest uppercase">Inventory Management</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 font-mono text-[10px] tracking-widest text-white/40 uppercase">Product</th>
                  <th className="px-6 py-4 font-mono text-[10px] tracking-widest text-white/40 uppercase">Category</th>
                  <th className="px-6 py-4 font-mono text-[10px] tracking-widest text-white/40 uppercase">Price</th>
                  <th className="px-6 py-4 font-mono text-[10px] tracking-widest text-white/40 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence mode="popLayout">
                  {paginatedProducts.map(product => (
                    <motion.tr 
                      key={product.id} 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="hover:bg-brand-red/5 hover:shadow-[inset_0_0_20px_rgba(193,14,29,0.1)] transition-all duration-300 group/row"
                    >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-sans text-sm text-white">{product.name}</p>
                          {product.tag && (
                            <span className="inline-block mt-1 text-[8px] font-mono tracking-widest px-2 py-0.5 rounded-full bg-brand-red/20 text-brand-red border border-brand-red/30">
                              {product.tag}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-[10px] tracking-widest text-white/60 uppercase">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      {editingPriceId === product.id ? (
                        <div className="flex items-center gap-2">
                          <input 
                            type="text" 
                            autoFocus
                            defaultValue={product.price}
                            onChange={(e) => setNewPriceValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSavePrice(product.id)}
                            className="w-20 bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-brand-red"
                          />
                          <button onClick={() => handleSavePrice(product.id)} className="text-[10px] font-mono text-green-400 hover:text-green-300">SAVE</button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 group/price cursor-pointer" onClick={() => { setEditingPriceId(product.id); setNewPriceValue(product.price); }}>
                          <span className="font-mono text-xs text-white/90">{product.price}</span>
                          <Edit3 className="w-3 h-3 text-white/20 group-hover/price:text-brand-red transition-colors" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-white/30 hover:text-brand-red hover:bg-brand-red/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {/* Table Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-white/10 flex items-center justify-between bg-black/40">
              <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                Showing page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-brand-red/20 hover:border-brand-red/50 hover:text-brand-red disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg font-mono text-[10px] tracking-widest transition-all ${
                        currentPage === i + 1 
                          ? 'bg-brand-red text-white shadow-[0_0_15px_rgba(193,14,29,0.4)]' 
                          : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-brand-red/20 hover:border-brand-red/50 hover:text-brand-red disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isAddingProduct && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#050505]/90 backdrop-blur-sm"
              onClick={() => setIsAddingProduct(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-syne text-xl text-white tracking-widest uppercase">Add New Garment</h3>
                <button onClick={() => setIsAddingProduct(false)} className="text-white/50 hover:text-brand-red"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase">Garment Name</label>
                  <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-red/50 transition-colors" placeholder="e.g. Tactical Cargo Pants" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase">Price</label>
                    <input required type="text" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-red/50 transition-colors" placeholder="$120" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase">Category</label>
                    <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-red/50 transition-colors outline-none appearance-none">
                      <option value="t-shirts">T-Shirts</option>
                      <option value="hoodies">Hoodies</option>
                      <option value="bottoms">Bottoms</option>
                      <option value="outerwear">Outerwear</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase">Image URL (Optional)</label>
                  <input type="text" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-red/50 transition-colors" placeholder="/arc_opus_logo.jpeg" />
                </div>
                <div className="pt-4">
                  <button type="submit" className="w-full bg-brand-red text-white py-4 rounded-xl font-mono text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
                    Add To Inventory
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminGuard>
  );
}
