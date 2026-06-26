"use client";

import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

export const CustomCursor: React.FC = () => {
  const { cursorType } = useApp();
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  
  // Track mouse coordinates
  const mouseRef = useRef({ x: 0, y: 0 });
  const circleRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    // Check if device supports hover (is not mobile)
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      
      // Update inner dot immediately
      if (innerRef.current) {
        innerRef.current.style.left = `${e.clientX}px`;
        innerRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseDown = () => {
      if (cursorRef.current) cursorRef.current.classList.add('click');
    };

    const handleMouseUp = () => {
      if (cursorRef.current) cursorRef.current.classList.remove('click');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth interpolation for the outer ring using RAF
    let animationFrameId: number;
    
    const updatePosition = () => {
      // Lerp (Linear Interpolation) calculation: target + (current - target) * ease
      const ease = 0.15; // Lower = smoother/slower lag
      circleRef.current.x += (mouseRef.current.x - circleRef.current.x) * ease;
      circleRef.current.y += (mouseRef.current.y - circleRef.current.y) * ease;
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${circleRef.current.x}px`;
        cursorRef.current.style.top = `${circleRef.current.y}px`;
      }
      
      animationFrameId = requestAnimationFrame(updatePosition);
    };
    
    updatePosition();

    // Attach hover listener to all buttons/links dynamically
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, select, input, [role="button"], .dock-item, [data-hover]');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.classList.add('hovered');
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.classList.remove('hovered');
    };

    // Watch DOM changes to bind new elements
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    addHoverListeners();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      
      const hoverables = document.querySelectorAll('a, button, select, input, [role="button"], .dock-item, [data-hover]');
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div 
        ref={cursorRef} 
        className="custom-cursor hidden lg:block"
        style={{ left: '-100px', top: '-100px' }}
      />
      {/* Inner dot */}
      <div 
        ref={innerRef} 
        className="custom-cursor-inner hidden lg:block"
        style={{ left: '-100px', top: '-100px' }}
      />
    </>
  );
};
