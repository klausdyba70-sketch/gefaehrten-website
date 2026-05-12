"use client";

import FadeIn from "./FadeIn";
import { sharedContent } from "@/data/shared";

export default function Financing() {
  const { financing } = sharedContent;
  
  return (
    <FadeIn 
      className="space-y-12 bg-[#f0ede4]/50 p-6 md:px-10 md:py-16 rounded-lg md:rounded-[2.5rem] shadow-sm border border-foreground/5"
    >
      <div className="space-y-6">
        <h4 className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-pink">{financing.headline}</h4>
        <h3 className="text-2xl md:text-5xl font-serif italic text-foreground/90 leading-tight">{financing.title}</h3>
        <p className="text-sm md:text-xl font-sans font-light opacity-80 leading-relaxed max-w-3xl">
          {financing.text}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-foreground/10">
        {financing.details.map((detail, idx) => (
          <div key={idx} className="space-y-4">
            <h5 className="text-[11px] uppercase tracking-widest text-pink font-bold">{detail.label}</h5>
            <p className="text-sm font-sans font-light opacity-70 leading-relaxed">
              {detail.content}
            </p>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

