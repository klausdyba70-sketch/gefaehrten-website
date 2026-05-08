"use client";

import { motion } from "framer-motion";
import { sharedContent } from "@/data/shared";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8 }
};

export default function Financing() {
  const { financing } = sharedContent;
  
  return (
    <motion.div 
      {...fadeInUp}
      className="space-y-12 bg-[#f0ede4]/50 p-12 rounded-2xl md:rounded-[1.5rem] shadow-sm border border-foreground/5"
    >
      <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-pink">{financing.headline}</h4>
      <div className="space-y-8">
        <p className="text-xl font-sans font-light opacity-90">{financing.text}</p>
        <div className="grid grid-cols-1 gap-10 pt-4">
          {financing.details.map((item, idx) => (
            <div key={idx} className="space-y-3">
              <div className="font-medium text-lg">{item.label}</div>
              <p className="text-base opacity-85 leading-relaxed font-light">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
