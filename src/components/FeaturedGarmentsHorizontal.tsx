"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DEFAULT_PRODUCTS, Product } from '@/data/products';
import './FeaturedGarmentsHorizontal.css';

// Exponential Ease Out Helper for price rolling
const PriceCounter = ({ priceStr, active }: { priceStr: string; active: boolean }) => {
  const numericValue = parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setDisplayValue(0);
      return;
    }

    let start = 0;
    const end = numericValue;
    const duration = 800; // ms
    const startTime = performance.now();
    let animationFrameId: number;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(start + (end - start) * easeProgress);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(update);
      }
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [active, numericValue]);

  return <span>${displayValue}</span>;
};

// Subcomponent: Individual Editorial Product Card
interface EditorialCardProps {
  product: Product;
  isActive: boolean;
  addToCart: (product: Product, size: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
  onHoverCard: (hovered: boolean) => void;
  onHoverAction: (action: boolean) => void;
}

const EditorialProductCard = ({
  product,
  isActive,
  addToCart,
  toggleWishlist,
  isInWishlist,
  onHoverCard,
  onHoverAction
}: EditorialCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Sizing State
  const sizes = product.category === 'shoes' ? ['8', '9', '10', '11'] : ['S', 'M', 'L', 'XL'];
  const [selectedSize, setSelectedSize] = useState(sizes[1]); // Default to 'M' or '9'

  // Framer Motion values for 3D cursor-tracking card tilt
  const rotateX = useSpring(0, { stiffness: 120, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 25 });
  const cardScale = useSpring(isActive ? 1.08 : 0.94, { stiffness: 120, damping: 25 });

  // Update card scale when active state shifts
  useEffect(() => {
    cardScale.set(isActive ? 1.08 : 0.94);
  }, [isActive, cardScale]);

  // Handle Card Mouse Move for 3D Tilt
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position inside element
    const y = e.clientY - rect.top;  // y position inside element
    
    const rotateAmplitude = 10;
    const rX = ((y / rect.height) - 0.5) * -rotateAmplitude;
    const rY = ((x / rect.width) - 0.5) * rotateAmplitude;
    
    rotateX.set(rX);
    rotateY.set(rY);

    // Set custom CSS variables for pointer spotlight on card faces
    cardRef.current.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    cardRef.current.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    onHoverCard(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHoverCard(true)}
      onMouseLeave={handleMouseLeave}
      className={`editorial-product-card ${isActive ? 'is-active' : ''}`}
      style={{
        rotateX,
        rotateY,
        scale: cardScale,
        opacity: isActive ? 1 : 0.45,
        filter: isActive ? 'blur(0px)' : 'blur(3px)',
      }}
      transition={{ duration: 0.6 }}
    >
      {/* 3D Spotlight Reflect Overlay */}
      <div className="card-spotlight-overlay" />

      {/* Product Tag Overlay */}
      {product.tag && (
        <div className="card-tag">
          {product.tag}
        </div>
      )}

      {/* Wishlist Button Overlay */}
      <button
        onClick={() => toggleWishlist(product)}
        onMouseEnter={() => onHoverAction(true)}
        onMouseLeave={() => onHoverAction(false)}
        className="wishlist-btn-overlay rounded-sm"
        title="Add to Wishlist"
      >
        <Heart className={`w-3.5 h-3.5 transition-transform active:scale-90 ${
          isInWishlist ? 'fill-[#C10E1D] text-[#C10E1D]' : 'text-white/60'
        }`} />
      </button>

      {/* Image Container with 3D perspective */}
      <div className="card-image-frame rounded-sm">
        {/* Main Image */}
        <motion.div 
          className="w-full h-full relative"
          animate={{ scale: isActive ? 1.04 : 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="card-image-element"
            priority={product.id === 1}
          />
          {/* Secondary Hover Image (Crossfades on hover) */}
          {product.hoverImage && (
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={product.hoverImage}
                alt={`${product.name} alternate view`}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="card-image-hover"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Reflection sweep */}
        <div className="reflection-sweep" />

        {/* Sizing slide up panel */}
        <div className="card-sizing-panel">
          <span className="sizing-title">Select Size</span>
          <div className="sizing-options-grid">
            {sizes.map((sz) => (
              <button
                key={sz}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(sz);
                }}
                onMouseEnter={() => onHoverAction(true)}
                onMouseLeave={() => onHoverAction(false)}
                className={`size-chip-btn rounded-sm ${selectedSize === sz ? 'is-active' : ''}`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Card Info Section */}
      <div className="card-details-info">
        <div className="card-title-price-row">
          <div className="flex-grow">
            <Link 
              href={`/product/${product.id}`}
              onMouseEnter={() => onHoverAction(true)}
              onMouseLeave={() => onHoverAction(false)}
              className="card-product-title hover:text-[#C10E1D] transition-colors line-clamp-2 block"
            >
              {product.name}
            </Link>
            <div className="card-product-category">{product.subcat}</div>
          </div>
          <div className="card-product-price">
            <PriceCounter priceStr={product.price} active={isActive} />
          </div>
        </div>

        {/* Action Button Container */}
        <div className="card-action-btn-container">
          <div className="card-action-btn-line" />
          <button
            onClick={() => addToCart(product, selectedSize)}
            onMouseEnter={() => onHoverAction(true)}
            onMouseLeave={() => onHoverAction(false)}
            className="card-add-to-bag-btn"
          >
            Add to Bag ({selectedSize})
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function FeaturedGarmentsHorizontal() {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const products = DEFAULT_PRODUCTS.slice(0, 4);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [scrollRange, setScrollRange] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Custom Cursor coordinates
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorType, setLocalCursorType] = useState<'default' | 'explore' | 'action'>('default');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorSpringX = useSpring(mouseX, { stiffness: 350, damping: 30 });
  const cursorSpringY = useSpring(mouseY, { stiffness: 350, damping: 30 });

  // Calculate horizontal bounds dynamically on resize
  useEffect(() => {
    const calculateRange = () => {
      if (trackRef.current) {
        setScrollRange(trackRef.current.scrollWidth - window.innerWidth);
      }
    };
    calculateRange();
    
    // Add brief timeout to catch finished layouts
    const timer = setTimeout(calculateRange, 200);

    window.addEventListener('resize', calculateRange);
    return () => {
      window.removeEventListener('resize', calculateRange);
      clearTimeout(timer);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth transform for the track positioning
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  // Parallax background typography transforms (moves at ~30% track speed)
  const bgX = useTransform(scrollYProgress, [0, 1], ["0vw", "-45vw"]);

  // Listen to progress updates to update the active focused product index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = 0;
    if (latest < 0.22) index = 0;
    else if (latest < 0.44) index = 1;
    else if (latest < 0.66) index = 2;
    else if (latest < 0.88) index = 3;
    else index = 4; // Discover Panel
    
    setActiveIndex(index);
  });

  // Track cursor position inside section
  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseEnterSection = () => {
    setCursorVisible(true);
    document.body.classList.add('featured-horizontal-active');
  };

  const handleMouseLeaveSection = () => {
    setCursorVisible(false);
    document.body.classList.remove('featured-horizontal-active');
  };

  // Clean up global class on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('featured-horizontal-active');
    };
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnterSection}
      onMouseLeave={handleMouseLeaveSection}
      className={`featured-horizontal-section ${cursorVisible ? 'featured-horizontal-section-active' : ''}`}
      style={{ height: '350vh' }} // Pinned scroll track height
    >
      <div className="sticky-wrapper">
        {/* Subtle Background Lighting spotlights */}
        <motion.div
          className="bg-spotlight-active"
          animate={{
            x: `${activeIndex * 20}vw`,
            y: activeIndex % 2 === 0 ? '-10vh' : '10vh'
          }}
          transition={{ type: 'spring', stiffness: 40, damping: 20 }}
          style={{ left: '15vw', top: '20vh' }}
        />
        <div className="bg-radial-soft" />
        <div className="noise-overlay" />

        {/* Oversized Background Parallax Typography */}
        <div className="bg-parallax-typography select-none">
          <motion.div className="parallax-text-line" style={{ x: bgX }}>
            featured featured featured
          </motion.div>
          <motion.div className="parallax-text-line text-right" style={{ x: useTransform(scrollYProgress, [0, 1], ["0vw", "30vw"]) }}>
            garments garments garments
          </motion.div>
          <motion.div className="parallax-text-line text-[#C10E1D]/10" style={{ x: bgX }}>
            arc opus system edition
          </motion.div>
        </div>

        {/* Scroll Viewport Track */}
        <div className="horizontal-scroll-viewport">
          <motion.div 
            ref={trackRef}
            className="horizontal-track" 
            style={{ x }}
          >
            {/* Products cards */}
            {products.map((prod, idx) => {
              const isInWish = wishlist.some((w) => w.id === prod.id);
              return (
                <div key={prod.id} className="card-perspective-wrapper">
                  <EditorialProductCard
                    product={prod}
                    isActive={idx === activeIndex}
                    addToCart={addToCart}
                    toggleWishlist={toggleWishlist}
                    isInWishlist={isInWish}
                    onHoverCard={(hovered) => {
                      setLocalCursorType(hovered ? 'explore' : 'default');
                    }}
                    onHoverAction={(action) => {
                      setLocalCursorType(action ? 'action' : 'explore');
                    }}
                  />
                </div>
              );
            })}

            {/* Discover Full Collection Billboard panel */}
            <div className="discover-billboard-wrapper">
              <div className={`discover-billboard-card rounded-sm ${activeIndex === 4 ? 'is-active' : ''}`}>
                <div className="discover-text-content">
                  <span className="discover-subtitle">Registry 001</span>
                  <h2 className="discover-title">Crafted Beyond Ordinary</h2>
                  <div className="discover-cta-wrapper">
                    <Link
                      href="/shop"
                      onMouseEnter={() => setLocalCursorType('action')}
                      onMouseLeave={() => setLocalCursorType('default')}
                      className="discover-cta-link"
                    >
                      <span>Explore Full Collection</span>
                      <ArrowRight className="w-4 h-4 text-[#C10E1D]" />
                    </Link>
                  </div>
                </div>
                
                <div className="discover-image-frame rounded-sm">
                  <Image
                    src="/denim_jacket_hero.jpg"
                    alt="ARC OPUS Editorial campaign"
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="discover-image"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Bottom Editorial Control indicators */}
        <div className="bottom-editorial-controls select-none">
          {/* Progress Indicator line */}
          <div className="progress-indicator-track rounded-full">
            <motion.div 
              className="progress-indicator-glow"
              style={{ scaleX: scrollYProgress, originX: 0 }}
            />
          </div>

          {/* Page Counter numbers */}
          <div className="editorial-product-counter">
            <AnimatePresence mode="wait">
              <motion.span 
                key={activeIndex}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="counter-active-num"
              >
                {activeIndex < 4 ? `0${activeIndex + 1}` : "04"}
              </motion.span>
            </AnimatePresence>
            <span className="counter-separator">/</span>
            <span className="counter-total-num">04</span>
          </div>
        </div>
      </div>

      {/* Circular Luxury Tracking Cursor */}
      {cursorVisible && (
        <motion.div
          className={`horizontal-luxury-cursor ${
            cursorType === 'explore' ? 'is-hovered' : cursorType === 'action' ? 'is-clickable' : ''
          }`}
          style={{
            left: cursorSpringX,
            top: cursorSpringY
          }}
        >
          {cursorType === 'explore' && "Explore"}
          <div className="horizontal-luxury-cursor-dot" />
        </motion.div>
      )}
    </section>
  );
}
