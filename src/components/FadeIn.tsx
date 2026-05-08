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
  // Slower, more cinematic fade on smaller screens (The "Butterfly" effect)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const baseDuration = isMobile ? 1.5 : 0.8; // 2.5 might be too slow for this project, let's try 1.5 first
  const baseY = isMobile ? 40 : 60;

  const transition: any = { 
    duration: baseDuration, 
    delay, 
    ease: [0.22, 1, 0.36, 1] 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: baseY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? '0px 0px -50px 0px' : '0px 0px -100px 0px' }}
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
