"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  useSpring,
  useMotionValue,
  MotionValue,
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
    let animationFrameId: number;
    const startTime = performance.now();
    const update = (now: number) => {
      const progress = Math.min((now - startTime) / 800, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(numericValue * eased));
      if (progress < 1) animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [active, numericValue]);

  return <span>${displayValue}</span>;
};

// ─── Per-Card Cinematic DOF Hook ──────────────────────────────────────────────
// Returns live MotionValues for blur, scale, opacity, brightness based on
// how close this card's center is to viewport center during horizontal scroll.
function useCardDOF(
  scrollYProgress: MotionValue<number>,
  cardIndex: number,    // 0-based among product cards
  totalCards: number,   // total product cards (not counting billboard)
) {
  // Card 0 is perfectly sharp at scroll=0.
  // Cards are spaced evenly across 80% of the scroll range [0, 0.8],
  // leaving the last 20% for the billboard panel.
  // cardCenter for card i = i * (0.8 / (totalCards - 1))
  const scrollBand = 0.80; // product cards occupy 0–80% of scroll
  const cardCenter = totalCards === 1
    ? 0
    : cardIndex * (scrollBand / (totalCards - 1));

  // Transition window: each card fades in/out across ±half of its spacing
  const spacing = scrollBand / Math.max(totalCards - 1, 1);
  const half = spacing * 1.1; // slightly wider than spacing so adjacent card is softly blurred

  // Clamp input range so values before/after window stay at the edge output
  const lo = Math.max(cardCenter - half, 0);
  const hi = Math.min(cardCenter + half, 1);
  const loSoft = cardCenter - half * 0.35;
  const hiSoft = cardCenter + half * 0.35;

  const blurRaw = useTransform(
    scrollYProgress,
    [lo, loSoft, cardCenter, hiSoft, hi],
    [12, 6, 0, 6, 12]
  );
  const opacityRaw = useTransform(
    scrollYProgress,
    [lo, loSoft, cardCenter, hiSoft, hi],
    [0.35, 0.55, 1, 0.55, 0.35]
  );
  const scaleRaw = useTransform(
    scrollYProgress,
    [lo, loSoft, cardCenter, hiSoft, hi],
    [0.88, 0.94, 1.0, 0.94, 0.88]
  );
  const brightnessRaw = useTransform(
    scrollYProgress,
    [lo, loSoft, cardCenter, hiSoft, hi],
    [0.65, 0.80, 1.0, 0.80, 0.65]
  );
  const glowOpacityRaw = useTransform(
    scrollYProgress,
    [Math.max(cardCenter - half * 0.6, 0), cardCenter, Math.min(cardCenter + half * 0.6, 1)],
    [0, 1, 0]
  );

  // Spring-smooth all values for silky interpolation
  const blur = useSpring(blurRaw, { stiffness: 80, damping: 20 });
  const opacity = useSpring(opacityRaw, { stiffness: 80, damping: 20 });
  const scale = useSpring(scaleRaw, { stiffness: 80, damping: 20 });
  const brightness = useSpring(brightnessRaw, { stiffness: 80, damping: 20 });
  const glowOpacity = useSpring(glowOpacityRaw, { stiffness: 70, damping: 22 });

  // isActive threshold for discrete UI changes (price counter, etc.)
  const isActive = cardIndex === Math.round(scrollYProgress.get() / (scrollBand / Math.max(totalCards - 1, 1)));

  return { blur, opacity, scale, brightness, glowOpacity };
}

// ─── Editorial Product Card ───────────────────────────────────────────────────
interface EditorialCardProps {
  product: Product;
  cardIndex: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
  activeIndex: number;
  addToCart: (product: Product, size: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
  onHoverCard: (hovered: boolean) => void;
  onHoverAction: (action: boolean) => void;
}

const EditorialProductCard = ({
  product,
  cardIndex,
  totalCards,
  scrollYProgress,
  activeIndex,
  addToCart,
  toggleWishlist,
  isInWishlist,
  onHoverCard,
  onHoverAction,
}: EditorialCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isActive = cardIndex === activeIndex;

  const sizes = product.category === 'shoes' ? ['8', '9', '10', '11'] : ['S', 'M', 'L', 'XL'];
  const [selectedSize, setSelectedSize] = useState(sizes[1]);

  // ── Continuous DOF values from scroll ──
  const { blur, opacity, scale, brightness, glowOpacity } = useCardDOF(
    scrollYProgress, cardIndex, totalCards
  );

  // ── 3D tilt on mouse move ──
  const rotateX = useSpring(0, { stiffness: 120, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rotateX.set(((y / rect.height) - 0.5) * -10);
    rotateY.set(((x / rect.width) - 0.5) * 10);
    cardRef.current.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    cardRef.current.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    onHoverCard(false);
  };

  // Compose filter string from live motion values
  const filterStr = useTransform(
    [blur, brightness],
    ([b, br]: number[]) => `blur(${b.toFixed(2)}px) brightness(${br.toFixed(3)})`
  );

  return (
    <div className="card-perspective-wrapper" style={{ willChange: 'transform' }}>
      {/* Cinematic spotlight glow behind active card */}
      <motion.div
        className="card-dof-spotlight"
        style={{ opacity: glowOpacity }}
        aria-hidden
      />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => onHoverCard(true)}
        onMouseLeave={handleMouseLeave}
        className={`editorial-product-card ${isActive ? 'is-active' : ''}`}
        style={{
          rotateX,
          rotateY,
          scale,
          opacity,
          filter: filterStr,
          willChange: 'transform, filter, opacity',
          boxShadow: isActive
            ? '0 20px 80px rgba(255,255,255,0.06), 0 0 40px rgba(255,255,255,0.03)'
            : 'none',
        }}
      >
        {/* Spotlight shimmer overlay */}
        <div className="card-spotlight-overlay" />

        {/* Badge */}
        {product.tag && <div className="card-tag">{product.tag}</div>}

        {/* Wishlist */}
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

        {/* Image */}
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

          {/* Size panel */}
          <div className="card-sizing-panel">
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

        {/* Card info */}
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
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function FeaturedGarmentsHorizontal() {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const products = DEFAULT_PRODUCTS.slice(0, 4);
  const totalCards = products.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [scrollRange, setScrollRange] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorType, setLocalCursorType] = useState<'default' | 'explore' | 'action'>('default');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorSpringX = useSpring(mouseX, { stiffness: 350, damping: 30 });
  const cursorSpringY = useSpring(mouseY, { stiffness: 350, damping: 30 });

  useEffect(() => {
    const calculateRange = () => {
      if (trackRef.current) {
        setScrollRange(trackRef.current.scrollWidth - window.innerWidth);
      }
    };
    calculateRange();
    const timer = setTimeout(calculateRange, 200);
    window.addEventListener('resize', calculateRange);
    return () => { window.removeEventListener('resize', calculateRange); clearTimeout(timer); };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const bgX = useTransform(scrollYProgress, [0, 1], ['0vw', '-45vw']);

  // Update discrete activeIndex for counter / price roll-up
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const scrollBand = 0.80;
    const spacing = scrollBand / Math.max(totalCards - 1, 1);
    const idx = latest >= 0.88
      ? totalCards // billboard
      : Math.min(Math.round(latest / spacing), totalCards - 1);
    setActiveIndex(idx);
  });

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
        {/* Animated spotlight */}
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

        {/* Background parallax text */}
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

        {/* Scroll track */}
        <div className="horizontal-scroll-viewport">
          <motion.div ref={trackRef} className="horizontal-track" style={{ x }}>
            {/* Product cards — each gets its own DOF stream */}
            {products.map((prod, idx) => {
              const isInWish = wishlist.some((w) => w.id === prod.id);
              return (
                <EditorialProductCard
                  key={prod.id}
                  product={prod}
                  cardIndex={idx}
                  totalCards={totalCards}
                  scrollYProgress={scrollYProgress}
                  activeIndex={activeIndex}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  isInWishlist={isInWish}
                  onHoverCard={(hovered) => setLocalCursorType(hovered ? 'explore' : 'default')}
                  onHoverAction={(action) => setLocalCursorType(action ? 'action' : 'explore')}
                />
              );
            })}

            {/* Discover billboard */}
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

        {/* Bottom editorial controls */}
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
