"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DEFAULT_PRODUCTS, Product } from '@/data/products';
import './FeaturedGarmentsHorizontal.css';

// ─── Price Roll-Up Counter ────────────────────────────────────────────────────
const PriceCounter = ({ priceStr, active }: { priceStr: string; active: boolean }) => {
  const numericValue = parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    if (!active) { setDisplayValue(0); return; }
    let rafId: number;
    const startTime = performance.now();
    const update = (now: number) => {
      const progress = Math.min((now - startTime) / 800, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(numericValue * eased));
      if (progress < 1) rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [active, numericValue]);
  return <span>${displayValue}</span>;
};

// ─── Editorial Product Card ───────────────────────────────────────────────────
interface EditorialCardProps {
  product: Product;
  isActive: boolean;
  // rAF targets this DOM ref directly — no Framer Motion intermediary for DOF
  dofLayerRefCallback: (el: HTMLDivElement | null) => void;
  wrapperRefCallback: (el: HTMLDivElement | null) => void;
  addToCart: (product: Product, size: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
  onHoverCard: (hovered: boolean) => void;
  onHoverAction: (action: boolean) => void;
}

const EditorialProductCard = ({
  product,
  isActive,
  dofLayerRefCallback,
  wrapperRefCallback,
  addToCart,
  toggleWishlist,
  isInWishlist,
  onHoverCard,
  onHoverAction,
}: EditorialCardProps) => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const sizes = product.category === 'shoes' ? ['8', '9', '10', '11'] : ['S', 'M', 'L', 'XL'];
  const [selectedSize, setSelectedSize] = useState(sizes[1]);

  // Only Framer Motion handles 3D tilt — DOF (filter/opacity/scale) handled by rAF on dofLayerRef
  const rotateX = useSpring(0, { stiffness: 120, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rotateX.set(((e.clientY - rect.top) / rect.height - 0.5) * -8);
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
    cardRef.current.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    cardRef.current.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    onHoverCard(false);
  };

  return (
    // Outer wrapper: rAF reads its getBoundingClientRect() every frame
    <div ref={wrapperRefCallback} className="card-perspective-wrapper">

      {/* Cinematic spotlight halo — rAF writes to spotlight.style.opacity */}
      <div className="card-dof-spotlight" aria-hidden />

      {/* DOF layer: rAF writes filter/opacity/transform here — completely separate from Framer Motion */}
      <div ref={dofLayerRefCallback} className="card-dof-layer">

        {/* Framer Motion only owns rotateX + rotateY (hover tilt) */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => onHoverCard(true)}
          onMouseLeave={handleMouseLeave}
          className={`editorial-product-card ${isActive ? 'is-active' : ''}`}
          style={{ rotateX, rotateY }}
        >
          {/* Native link overlay for reliable navigation */}
          <Link href={`/product/${product.id}`} className="absolute inset-0 z-[5]" />

          <div className="card-spotlight-overlay" />

          {product.tag && <div className="card-tag z-10 relative">{product.tag}</div>}

          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
            onMouseEnter={() => onHoverAction(true)}
            onMouseLeave={() => onHoverAction(false)}
            className="wishlist-btn-overlay rounded-sm"
            title="Add to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 transition-transform active:scale-90 ${
              isInWishlist ? 'fill-[#C10E1D] text-[#C10E1D]' : 'text-white/60'
            }`} />
          </button>

          <div className="card-image-frame rounded-sm">
            <motion.div
              className="w-full h-full relative"
              animate={{ scale: isActive ? 1.04 : 1 }}
              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="card-image-element"
                priority={product.id === 1}
              />
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
            <div className="reflection-sweep" />
            <div className="card-sizing-panel z-10 relative">
              <span className="sizing-title">Select Size</span>
              <div className="sizing-options-grid">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={(e) => { e.stopPropagation(); setSelectedSize(sz); }}
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

          <div className="card-details-info">
            <div className="card-title-price-row">
              <div className="flex-grow">
                <Link
                  href={`/product/${product.id}`}
                  onClick={(e) => e.stopPropagation()}
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
      </div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function FeaturedGarmentsHorizontal() {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const products = DEFAULT_PRODUCTS.slice(0, 4);
  const totalCards = products.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // DOM refs for rAF loop — one per card
  const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>(Array(totalCards).fill(null));
  const dofLayerRefs = useRef<(HTMLDivElement | null)[]>(Array(totalCards).fill(null));

  const [initialX, setInitialX] = useState(0);
  const [scrollRange, setScrollRange] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorType, setLocalCursorType] = useState<'default' | 'explore' | 'action'>('default');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorSpringX = useSpring(mouseX, { stiffness: 350, damping: 30 });
  const cursorSpringY = useSpring(mouseY, { stiffness: 350, damping: 30 });

  // ── Measure scroll range and compute initial X offset to center card 0 ──
  useEffect(() => {
    const calculateLayout = () => {
      if (!trackRef.current) return;

      // Compute card width from CSS constraints: width=25vw, min=320, max=440
      const vw = window.innerWidth;
      const cssCardWidth = Math.min(Math.max(vw * 0.25, 320), 440);
      // padding-left in CSS is 20vw
      const cssPaddingLeft = vw * 0.20;
      // Offset needed to center card 0
      const offset = vw * 0.5 - cssPaddingLeft - cssCardWidth * 0.5;
      setInitialX(offset);

      // Total track scroll range (unchanged — track still travels same distance)
      setScrollRange(trackRef.current.scrollWidth - vw);
    };

    calculateLayout();
    const timer = setTimeout(calculateLayout, 300);
    window.addEventListener('resize', calculateLayout);
    return () => { window.removeEventListener('resize', calculateLayout); clearTimeout(timer); };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // x now starts at initialX so card 0 is centered at scroll=0
  const x = useTransform(scrollYProgress, [0, 1], [initialX, -(scrollRange - initialX)]);
  const bgX = useTransform(scrollYProgress, [0, 1], ['0vw', '-45vw']);

  // Discrete active index for counter / price roll-up
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const sliceSize = 1 / (totalCards + 1);
    const idx = Math.min(Math.floor(latest / sliceSize), totalCards);
    setActiveIndex(idx);
  });

  // ── rAF DOF loop ──────────────────────────────────────────────────────────
  // Reads each card's actual DOM position every frame.
  // Writes filter/opacity/transform directly to the .card-dof-layer div
  // (completely separate from Framer Motion's motion.div).
  useEffect(() => {
    let rafId: number;

    const applyDOF = () => {
      const vCenter = window.innerWidth / 2;

      // Batch reads (avoids layout thrashing)
      const rects = cardWrapperRefs.current.map(w =>
        w ? w.getBoundingClientRect() : null
      );

      // Find which card is closest to center (for spotlight glow)
      let minDist = Infinity;
      rects.forEach(rect => {
        if (!rect) return;
        const d = Math.abs(rect.left + rect.width / 2 - vCenter);
        if (d < minDist) minDist = d;
      });

      // Batch writes
      rects.forEach((rect, i) => {
        const dofLayer = dofLayerRefs.current[i];
        const wrapper = cardWrapperRefs.current[i];
        if (!rect || !dofLayer || !wrapper) return;

        const cardCenter = rect.left + rect.width / 2;
        const signedDist = cardCenter - vCenter;
        
        // Normalize distance: 1 unit = 1.2x card width
        const t = Math.max(-1.5, Math.min(1.5, signedDist / (rect.width * 1.2)));

        // Dramatic Arch / Wheel style
        const translateY = (Math.pow(Math.abs(t), 2) * 120).toFixed(2); // Cards drop in a smooth arc
        const rotateZ = (t * 12).toFixed(2); // Cards fan out like a deck
        const scale = (1 - Math.abs(t) * 0.1).toFixed(3);
        const opacity = (1 - Math.abs(t) * 0.4).toFixed(3);
        const brightness = (1 - Math.abs(t) * 0.2).toFixed(3);

        // Write to DOF layer (bypasses Framer Motion)
        dofLayer.style.filter = `brightness(${brightness})`;
        dofLayer.style.opacity = opacity;
        dofLayer.style.transform = `translateY(${translateY}px) rotateZ(${rotateZ}deg) scale(${scale})`;

        // Spotlight glow (separate element in wrapper)
        const spotlight = wrapper.querySelector<HTMLElement>('.card-dof-spotlight');
        if (spotlight) {
          const glowT = Math.min(Math.abs(signedDist) / (rect.width * 0.6), 1);
          spotlight.style.opacity = (Math.max(0, 1 - glowT * glowT * 3)).toFixed(3);
        }
      });

      rafId = requestAnimationFrame(applyDOF);
    };

    rafId = requestAnimationFrame(applyDOF);
    return () => cancelAnimationFrame(rafId);
  }, []);

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

  useEffect(() => {
    return () => { document.body.classList.remove('featured-horizontal-active'); };
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnterSection}
      onMouseLeave={handleMouseLeaveSection}
      className={`featured-horizontal-section ${cursorVisible ? 'featured-horizontal-section-active' : ''}`}
      style={{ height: '350vh' }}
    >
      <div className="sticky-wrapper">
        <motion.div
          className="bg-spotlight-active"
          animate={{
            x: `${activeIndex * 20}vw`,
            y: activeIndex % 2 === 0 ? '-10vh' : '10vh',
          }}
          transition={{ type: 'spring', stiffness: 40, damping: 20 }}
          style={{ left: '15vw', top: '20vh' }}
        />
        <div className="bg-radial-soft" />
        <div className="noise-overlay" />

        <div className="bg-parallax-typography select-none">
          <motion.div className="parallax-text-line" style={{ x: bgX }}>
            featured featured featured
          </motion.div>
          <motion.div
            className="parallax-text-line text-right"
            style={{ x: useTransform(scrollYProgress, [0, 1], ['0vw', '30vw']) }}
          >
            garments garments garments
          </motion.div>
          <motion.div className="parallax-text-line text-[#C10E1D]/10" style={{ x: bgX }}>
            arc opus system edition
          </motion.div>
        </div>

        <div className="horizontal-scroll-viewport">
          <motion.div ref={trackRef} className="horizontal-track" style={{ x }}>
            {products.map((prod, idx) => {
              const isInWish = wishlist.some((w) => w.id === prod.id);
              return (
                <EditorialProductCard
                  key={prod.id}
                  product={prod}
                  isActive={idx === activeIndex}
                  dofLayerRefCallback={(el) => { dofLayerRefs.current[idx] = el; }}
                  wrapperRefCallback={(el) => {
                    cardWrapperRefs.current[idx] = el;
                  }}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  isInWishlist={isInWish}
                  onHoverCard={(hovered) => setLocalCursorType(hovered ? 'explore' : 'default')}
                  onHoverAction={(action) => setLocalCursorType(action ? 'action' : 'explore')}
                />
              );
            })}

            {/* Discovery Billboard */}
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

        {/* Bottom controls */}
        <div className="bottom-editorial-controls select-none">
          <div className="progress-indicator-track rounded-full">
            <motion.div
              className="progress-indicator-glow"
              style={{ scaleX: scrollYProgress, originX: 0 }}
            />
          </div>
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
                {activeIndex < 4 ? `0${activeIndex + 1}` : '04'}
              </motion.span>
            </AnimatePresence>
            <span className="counter-separator">/</span>
            <span className="counter-total-num">04</span>
          </div>
        </div>
      </div>

      {/* Luxury tracking cursor */}
      {cursorVisible && (
        <motion.div
          className={`horizontal-luxury-cursor ${
            cursorType === 'explore' ? 'is-hovered' : cursorType === 'action' ? 'is-clickable' : ''
          }`}
          style={{ left: cursorSpringX, top: cursorSpringY }}
        >
          {cursorType === 'explore' && 'Explore'}
          <div className="horizontal-luxury-cursor-dot" />
        </motion.div>
      )}
    </section>
  );
}
