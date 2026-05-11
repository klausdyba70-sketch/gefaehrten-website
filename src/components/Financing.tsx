"use client";

import FadeIn from "./FadeIn";
import { sharedContent } from "@/data/shared";

export default function Financing() {
  const { financing } = sharedContent;
  
  return (
    <FadeIn 
      className="space-y-12 bg-[#f0ede4]/50 p-4 md:p-12 rounded-lg md:rounded-[1.5rem] shadow-sm border border-foreground/5"
    >
      <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-pink">{financing.headline}</h4>
      <div className="space-y-8">
        <h3 className="text-xl md:text-3xl font-serif italic text-foreground/90">{financing.title}</h3>
        <p className="text-sm md:text-lg font-sans font-light opacity-80 leading-relaxed">
          {financing.text}
        </p>
      </div>
    </FadeIn>
  );
}
