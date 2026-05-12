"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  [key: string]: any;
}

export default function FadeIn({ children, delay = 0, className = '', ...props }: FadeInProps) {
  // Use consistent values for SSR to avoid hydration mismatch
  // The subtle difference between mobile/desktop timing can be handled after mount
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const baseDuration = isMobile ? 1.5 : 1.2; 
  const baseY = 40; // Standardized for both to avoid layout jumps and hydration errors

  const transition: any = { 
    duration: baseDuration, 
    delay, 
    ease: [0.22, 1, 0.36, 1] 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: baseY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
