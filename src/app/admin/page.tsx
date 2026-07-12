"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, TrendingUp, Package, DollarSign, X, Search } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { AdminGuard } from '@/components/AdminGuard';
import { NetworkMap } from '@/components/NetworkMap';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminDashboard() {
  const { products, addProduct, deleteProduct, updateProductPrice, updateProductStock, orders } = useApp();
  
  // Modals and state
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingPriceId, setEditingPriceId] = useState<number | null>(null);
  const [newPriceValue, setNewPriceValue] = useState("");
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const generateProductId = (category: string, id: number) => {
    const prefixMap: Record<string, string> = {
      't-shirts': 'TS',
      'jackets': 'JK',
      'bottoms': 'BT',
      'shoes': 'SH',
      'hoodies': 'HD',
      'outerwear': 'OW',
      'collections': 'CL',
      'new drop': 'ND'
    };
    const prefix = prefixMap[category.toLowerCase()] || category.substring(0, 2).toUpperCase();
    return `${prefix}${String(id).padStart(3, '0')}`;
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
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
    sizes: "",
    sizeChart: "",
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
      sizes: newProduct.sizes ? newProduct.sizes.split(',').map(s => s.trim()) : undefined,
    });
    setIsAddingProduct(false);
    setNewProduct({ ...newProduct, name: "", price: "", description: "", sizes: "", sizeChart: "" });
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
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <DollarSign className="w-24 h-24 text-brand-red" />
            </div>
            {/* Dummy Sparkline Graph */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 pointer-events-none">
              <svg viewBox="0 0 100 30" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <path d="M0,30 L10,25 L20,28 L30,15 L40,18 L50,8 L60,12 L70,5 L80,10 L90,2 L100,0 L100,30 Z" fill="url(#gradRed)" />
                <polyline points="0,30 10,25 20,28 30,15 40,18 50,8 60,12 70,5 80,10 90,2 100,0" fill="none" stroke="#C10E1D" strokeWidth="1" />
                <defs>
                  <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C10E1D" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#C10E1D" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
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
            {/* Dummy Sparkline Graph */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 pointer-events-none">
              <svg viewBox="0 0 100 30" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <path d="M0,30 L15,22 L30,26 L45,15 L60,19 L75,10 L90,12 L100,5 L100,30 Z" fill="url(#gradWhite)" />
                <polyline points="0,30 15,22 30,26 45,15 60,19 75,10 90,12 100,5" fill="none" stroke="#FFFFFF" strokeWidth="1" />
                <defs>
                  <linearGradient id="gradWhite" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
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
          <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-8 w-full md:w-auto">
              <h3 className="font-syne text-xl text-white tracking-widest uppercase whitespace-nowrap">Inventory Management</h3>
              
              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <input 
                  type="text" 
                  placeholder="Search inventory..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to page 1 on search
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-xs font-mono text-white focus:outline-none focus:border-brand-red/50 transition-colors placeholder:text-white/30"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              </div>
            </div>
            
            {/* Add Product Button */}
            <button 
              onClick={() => setIsAddingProduct(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-red text-white px-6 py-2.5 rounded-full font-mono text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-colors flex-shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 font-mono text-[10px] tracking-widest text-white/40 uppercase">Product ID</th>
                  <th className="px-6 py-4 font-mono text-[10px] tracking-widest text-white/40 uppercase">Product</th>
                  <th className="px-6 py-4 font-mono text-[10px] tracking-widest text-white/40 uppercase">Category</th>
                  <th className="px-6 py-4 font-mono text-[10px] tracking-widest text-white/40 uppercase">Stock</th>
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
                      <span className="font-mono text-xs text-brand-red/80 bg-brand-red/10 px-2 py-1 rounded border border-brand-red/20">{generateProductId(product.category, product.id)}</span>
                    </td>
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
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-white/90 w-6">{product.stock}</span>
                        <button
                          onClick={() => updateProductStock(product.id, (product.stock || 0) + 1)}
                          className="bg-brand-red/20 hover:bg-brand-red border border-brand-red/30 hover:border-brand-red text-brand-red hover:text-white rounded px-1.5 py-0.5 transition-colors"
                          title="Add Stock"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
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
              <form onSubmit={handleAddSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase">Garment Name</label>
                  <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-red/50 transition-colors outline-none" placeholder="e.g. Tactical Cargo Pants" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase">Description</label>
                  <textarea value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-red/50 transition-colors outline-none h-20 resize-none" placeholder="Detailed product description..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase">Price</label>
                    <input required type="text" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-red/50 transition-colors outline-none" placeholder="$120" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase">Category</label>
                    <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-red/50 transition-colors outline-none appearance-none">
                      <option value="t-shirts" className="bg-[#0A0A0A]">T-Shirts</option>
                      <option value="hoodies" className="bg-[#0A0A0A]">Hoodies</option>
                      <option value="bottoms" className="bg-[#0A0A0A]">Bottoms</option>
                      <option value="outerwear" className="bg-[#0A0A0A]">Outerwear</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase">Sizes (comma separated)</label>
                    <input type="text" value={newProduct.sizes} onChange={e => setNewProduct({...newProduct, sizes: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-red/50 transition-colors outline-none" placeholder="S, M, L, XL" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase">Size Chart URL</label>
                    <input type="text" value={newProduct.sizeChart} onChange={e => setNewProduct({...newProduct, sizeChart: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-red/50 transition-colors outline-none" placeholder="/size-charts/tshirt.png" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-white/50 uppercase">Image URL (Optional)</label>
                  <input type="text" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-brand-red/50 transition-colors outline-none" placeholder="/arc_opus_logo.jpeg" />
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
