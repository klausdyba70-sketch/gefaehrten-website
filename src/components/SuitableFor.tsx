"use client";

import FadeIn from "./FadeIn";
import { sharedContent } from "@/data/shared";

export default function SuitableFor() {
  const { suitable } = sharedContent;

  return (
    <FadeIn className="space-y-12 p-4 md:p-6">
      <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-pink">{suitable.headline}</h4>
      <p className="text-xl font-sans font-light opacity-80 leading-relaxed">
        {suitable.text}
      </p>
      <div className="pt-12 border-t border-foreground/10">
        <div className="text-[11px] uppercase tracking-[0.2em] opacity-50 font-bold leading-loose max-w-xl">
          {suitable.recognition}
        </div>
      </div>
    </FadeIn>
  );
}
