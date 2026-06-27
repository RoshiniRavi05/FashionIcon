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
  motionValue,
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

// ─── DOF MotionValues bundle per card ────────────────────────────────────────
interface CardDOF {
  blur: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  brightness: MotionValue<number>;
  glowOpacity: MotionValue<number>;
}

// Create outside component so motionValue() (non-hook) is not inside render
function createCardDOF(isFirst: boolean): CardDOF {
  return {
    blur:        motionValue(isFirst ? 0  : 11),
    opacity:     motionValue(isFirst ? 1  : 0.42),
    scale:       motionValue(isFirst ? 1  : 0.91),
    brightness:  motionValue(isFirst ? 1  : 0.70),
    glowOpacity: motionValue(isFirst ? 1  : 0),
  };
}

// ─── Editorial Product Card ───────────────────────────────────────────────────
interface EditorialCardProps {
  product: Product;
  isActive: boolean;
  dof: CardDOF;
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
  dof,
  wrapperRefCallback,
  addToCart,
  toggleWishlist,
  isInWishlist,
  onHoverCard,
  onHoverAction,
}: EditorialCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const sizes = product.category === 'shoes' ? ['8', '9', '10', '11'] : ['S', 'M', 'L', 'XL'];
  const [selectedSize, setSelectedSize] = useState(sizes[1]);

  // 3D tilt on mouse
  const rotateX = useSpring(0, { stiffness: 120, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rotateX.set(((e.clientY - rect.top) / rect.height - 0.5) * -10);
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
    cardRef.current.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    cardRef.current.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    onHoverCard(false);
  };

  // Compose filter string from live DOF MotionValues every frame
  const filterStr = useTransform(
    () => `blur(${dof.blur.get().toFixed(1)}px) brightness(${dof.brightness.get().toFixed(3)})`
  );

  return (
    // Outer wrapper: rAF loop measures this element's bounding rect
    <div
      ref={wrapperRefCallback}
      className="card-perspective-wrapper"
      style={{ willChange: 'transform' }}
    >
      {/* Cinematic spotlight halo — fades in only when card is centered */}
      <motion.div
        className="card-dof-spotlight"
        style={{ opacity: dof.glowOpacity }}
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
          scale: dof.scale,
          opacity: dof.opacity,
          filter: filterStr,
          willChange: 'transform, filter, opacity',
          boxShadow: isActive
            ? '0 20px 80px rgba(255,255,255,0.06), 0 0 40px rgba(255,255,255,0.03)'
            : 'none',
        }}
      >
        <div className="card-spotlight-overlay" />

        {product.tag && <div className="card-tag">{product.tag}</div>}

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

  // Per-card rAF-driven DOF MotionValues (created once, never recreated)
  const dofValues = useRef<CardDOF[]>([]);
  if (dofValues.current.length === 0) {
    for (let i = 0; i < totalCards; i++) {
      dofValues.current.push(createCardDOF(i === 0));
    }
  }

  // Card wrapper DOM refs — rAF loop reads their getBoundingClientRect()
  const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>(
    Array(totalCards).fill(null)
  );

  const [scrollRange, setScrollRange] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorType, setLocalCursorType] = useState<'default' | 'explore' | 'action'>('default');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorSpringX = useSpring(mouseX, { stiffness: 350, damping: 30 });
  const cursorSpringY = useSpring(mouseY, { stiffness: 350, damping: 30 });

  // ── Measure horizontal scroll range ──
  useEffect(() => {
    const calc = () => {
      if (trackRef.current) {
        setScrollRange(trackRef.current.scrollWidth - window.innerWidth);
      }
    };
    calc();
    const t = setTimeout(calc, 200);
    window.addEventListener('resize', calc);
    return () => { window.removeEventListener('resize', calc); clearTimeout(t); };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const bgX = useTransform(scrollYProgress, [0, 1], ['0vw', '-45vw']);

  // Discrete active index for counter / price roll-up
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const sliceSize = 1 / (totalCards + 1);
    const idx = Math.min(Math.floor(latest / sliceSize), totalCards);
    setActiveIndex(idx);
  });

  // ── rAF DOF loop — measures actual card positions every frame ──
  useEffect(() => {
    let rafId: number;

    const update = () => {
      const vCenter = window.innerWidth / 2;

      cardWrapperRefs.current.forEach((wrapper, i) => {
        if (!wrapper) return;
        const dof = dofValues.current[i];
        if (!dof) return;

        const rect = wrapper.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - vCenter);

        // Normalize: 0 = card perfectly centered, 1 = one card-width away
        // Using 1.1× card width as the full-blur distance feels natural
        const t = Math.min(distance / (rect.width * 1.1), 1);

        // Ease the transition: smooth cubic so center snaps sharp cleanly
        const eased = t * t * (3 - 2 * t); // smoothstep

        dof.blur.set(eased * 11);             // 0 → 11px
        dof.opacity.set(1 - eased * 0.58);   // 1 → 0.42
        dof.scale.set(1 - eased * 0.09);     // 1 → 0.91
        dof.brightness.set(1 - eased * 0.30);// 1 → 0.70
        dof.glowOpacity.set(Math.max(0, 1 - eased * 2.5)); // sharp drop-off
      });

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  dof={dofValues.current[idx]}
                  wrapperRefCallback={(el) => { cardWrapperRefs.current[idx] = el; }}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  isInWishlist={isInWish}
                  onHoverCard={(hovered) => setLocalCursorType(hovered ? 'explore' : 'default')}
                  onHoverAction={(action) => setLocalCursorType(action ? 'action' : 'explore')}
                />
              );
            })}

            {/* Billboard */}
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
