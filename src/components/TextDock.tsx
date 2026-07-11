'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

interface TextDockItemProps {
  label: string;
  href: string;
  mouseX: MotionValue<number>;
  distance: number;
  isActive: boolean;
  spring: { mass: number; stiffness: number; damping: number };
}

function TextDockItem({
  label,
  href,
  mouseX,
  distance,
  isActive,
  spring
}: TextDockItemProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const mouseDistance = useTransform(mouseX, (val: number) => {
    if (val === Infinity || !ref.current) return distance;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    return val - centerX;
  });

  // Scale animation: 1.0 to 1.25
  const targetScale = useTransform(mouseDistance, [-distance, 0, distance], [1, 1.25, 1], { clamp: true });
  const scale = useSpring(targetScale, spring);

  // Vertical lift: 0 to -6px
  const targetY = useTransform(mouseDistance, [-distance, 0, distance], [0, -6, 0], { clamp: true });
  const y = useSpring(targetY, spring);

  // Opacity: 0.6 to 1.0
  const targetOpacity = useTransform(mouseDistance, [-distance, 0, distance], [0.6, 1, 0.6], { clamp: true });
  const opacity = useSpring(targetOpacity, spring);

  return (
    <Link
      ref={ref}
      href={href}
      className="group relative py-3 px-4 font-heading text-xs tracking-[0.2em] uppercase text-[#F5F5F5] block select-none"
    >
      <motion.span
        style={{
          display: 'block',
          scale,
          y,
          opacity,
          transformOrigin: 'center bottom'
        }}
        className="transition-colors duration-300 group-hover:text-brand-red"
      >
        {label}
      </motion.span>
      {!isActive && (
        <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-brand-red origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
      )}
      {isActive && (
        <motion.span
          layoutId="activeNavUnderline"
          className="absolute bottom-0 left-4 right-4 h-[1px] bg-brand-red"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

interface TextDockProps {
  items: { label: string; href: string }[];
  distance?: number;
  spring?: { mass: number; stiffness: number; damping: number };
}

export default function TextDock({
  items,
  distance = 150,
  spring = { mass: 0.1, stiffness: 150, damping: 12 }
}: TextDockProps) {
  const mouseX = useMotionValue(Infinity);
  const pathname = usePathname();

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-center space-x-4"
    >
      {items.map((item) => (
        <TextDockItem
          key={item.href}
          label={item.label}
          href={item.href}
          mouseX={mouseX}
          distance={distance}
          isActive={pathname === item.href}
          spring={spring}
        />
      ))}
    </div>
  );
}
