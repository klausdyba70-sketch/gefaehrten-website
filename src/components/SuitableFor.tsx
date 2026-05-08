"use client";

import { motion } from "framer-motion";
import { sharedContent } from "@/data/shared";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8 }
};

export default function SuitableFor() {
  const { suitable } = sharedContent;

  return (
    <motion.div {...fadeInUp} className="space-y-12 p-6">
      <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-pink">{suitable.headline}</h4>
      <p className="text-xl font-sans font-light opacity-80 leading-relaxed">
        {suitable.text}
      </p>
      <div className="pt-12 border-t border-foreground/10">
        <div className="text-[11px] uppercase tracking-[0.2em] opacity-50 font-bold leading-loose max-w-xl">
          {suitable.recognition}
        </div>
      </div>
    </motion.div>
  );
}
