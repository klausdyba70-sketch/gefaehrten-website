"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo, useState } from "react";

import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import NewsletterSection from "./NewsletterSection";
import FadeIn from "./FadeIn";
import SuitableFor from "./SuitableFor";
import Financing from "./Financing";

interface HomeClientProps {
  programs: any[];
  homepageData: any;
}

export default function HomeClient(props: HomeClientProps) {
  const initialData = useMemo(() => ({ 
    homepage: props.homepageData,
    seminarsConnection: { 
      edges: props.programs.map(p => ({ 
        __typename: "SeminarsConnectionEdge",
        node: p 
      })) 
    }
  }), [props.homepageData, props.programs]);

  const data = initialData;

  const content = data.homepage;
  const programs = data.seminarsConnection.edges?.map((e: any) => e.node) || [];

  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const fadeInUp = {
    initial: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as any }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-background" ref={containerRef}>
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[100svh] md:h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#1c211e] py-20 md:py-0">
        <motion.div 
          style={{ y }} 
          className="absolute inset-0 z-0"
        >
          {content.hero?.video ? (
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover opacity-50 scale-110"
              data-tina-field={tinaField(content.hero, "video")}
            >
              <source src={content.hero.video} type="video/mp4" />
            </video>
          ) : content.hero?.image ? (
            <img 
              src={content.hero.image} 
              alt={content.hero.imageAlt || content.hero.title || "Hero Background"} 
              className="w-full h-full object-cover opacity-50 scale-110" 
              data-tina-field={tinaField(content.hero, "image")}
            />
          ) : (
            <div className="w-full h-full bg-[#1c211e]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#1c211e] z-10" />
        </motion.div>
        
        <div className="relative z-20 w-full max-w-[1400px] mx-auto flex flex-col items-center">
          {/* Centered Headline Unit (100vh focus) */}
          <div className="min-h-[100svh] flex flex-col items-center justify-center space-y-4 md:space-y-6 px-4 md:px-0 py-20 md:py-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[14px] md:text-[18px] uppercase tracking-[0.3em] md:tracking-[0.6em] text-pink font-sans font-bold" 
              data-tina-field={tinaField(content.hero, "label")}
            >
              {content.hero?.label || "Traumainstitut · Gefährten"}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-[14vw] md:text-8xl lg:text-[10rem] font-serif italic text-[#F5F2EB] leading-[0.8] md:leading-[0.85] tracking-tighter px-2" 
              data-tina-field={tinaField(content.hero, "title")}
            >
               {content.hero?.title || "Gefährten"}
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-3xl text-pink/80 font-serif font-bold italic pt-2 md:pt-4 tracking-[0.2em] md:tracking-widest" 
              data-tina-field={tinaField(content.hero, "subtitle")}
            >
              {content.hero?.subtitle}
            </motion.h2>

            {/* Intro Text (Now part of the centered unit on mobile) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-8 md:pt-16 max-w-3xl mx-auto space-y-8"
            >
              <p className="text-lg md:text-3xl text-[#F5F2EB]/70 font-serif italic leading-relaxed" data-tina-field={tinaField(content.hero, "text")}>
                {content.hero?.text}
              </p>
            </motion.div>

            {/* Discover Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="pt-12 md:pt-16"
            >
              <Link 
                href="#angebot"
                className="group relative flex flex-col items-center gap-4 transition-all"
              >
                <span className="text-[14px] uppercase tracking-[0.4em] font-bold text-[#F5F2EB]/40 group-hover:text-pink transition-colors">
                  Entdecken
                </span>
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-10 h-10 rounded-full border border-[#F5F2EB]/10 flex items-center justify-center text-[#F5F2EB]/40 group-hover:border-pink group-hover:text-pink transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 7.5L9 12L13.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </Link>
            </motion.div>

            {/* Visual Hint */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
              <div className="w-px h-12 bg-gradient-to-b from-transparent to-pink/40" />
            </div>
          </div>
        </div>
      </section>
      {/* --- DAS ANGEBOT INTRO --- */}
      <section id="angebot" className="w-full bg-[#f5f2eb] py-16 md:py-48 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Top: Headline & Intro — Two Column Layout */}
          <FadeIn 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start"
          >
            {/* Left: Headline + Image */}
            <div className="space-y-10">
              {content.offer?.label && (
                <div 
                  className="text-sm md:text-base uppercase tracking-[0.3em] font-bold text-pink"
                  data-tina-field={tinaField(content.offer, "label")}
                >
                  {content.offer.label}
                </div>
              )}
              <h2 
                className="text-[10vw] md:text-6xl lg:text-7xl font-serif italic leading-[1.1] text-foreground/90 tracking-tight"
                data-tina-field={tinaField(content.offer, "headline")}
              >
                {content.offer?.headline?.type ? (
                  <TinaMarkdown 
                    content={content.offer.headline} 
                    components={{
                      p: (props: any) => <>{props.children}</>,
                    }}
                  />
                ) : (
                  content.offer?.headline || "Die Zukunft beginnt nicht, weil etwas völlig Neues dazukommt. Sondern weil sich das Vorhandene neu ordnet."
                )}
              </h2>

              {/* Offer Image */}
              {content.offer?.offerImage && (
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden group">
                  <img 
                    src={content.offer.offerImage}
                    alt={content.offer.offerImageAlt || "Das Angebot"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-tina-field={tinaField(content.offer, "offerImage")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              )}
            </div>

            {/* Right: Intro Text */}
            <div className="space-y-8 lg:pt-16">
              <div className="w-12 h-1 bg-pink rounded-full" />
              <div 
                className="text-base md:text-xl text-foreground/85 font-sans font-light leading-relaxed prose prose-p:text-base md:prose-p:text-xl prose-p:font-sans prose-p:font-light prose-p:leading-relaxed prose-strong:text-pink prose-strong:font-normal"
                data-tina-field={tinaField(content.offer, "text")}
              >
                {content.offer?.text?.type ? (
                  <TinaMarkdown content={content.offer.text} />
                ) : (
                  content.offer?.text
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- ANGEBOT LINKS SECTION --- */}
      <section className="w-full bg-[#fcfbf8] py-16 md:py-48 px-4 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Bottom: Formats List (Reverted to Rows) */}
          <h3 
            className="text-5xl md:text-6xl font-serif italic text-foreground/90 pb-6"
            data-tina-field={tinaField(content.offer, "formatsHeadline")}
          >
            {content.offer?.formatsHeadline || "Training / Seminare / Praxiskreis"}
          </h3>
          {content.offer?.formatsIntro && (
            <div 
              className="max-w-3xl text-lg md:text-xl text-foreground/60 font-sans font-light leading-relaxed pb-12 prose prose-p:text-lg md:prose-p:text-xl prose-p:font-sans prose-p:font-light prose-p:leading-relaxed prose-strong:text-pink prose-strong:font-normal"
              data-tina-field={tinaField(content.offer, "formatsIntro")}
            >
              <TinaMarkdown content={content.offer.formatsIntro} />
            </div>
          )}
          <div className="mt-12 space-y-12">
            {["Training", "Seminar", "Praxiskreis"].map((cat, catIdx) => {
              const catPrograms = programs.filter(p => p.category === cat);
              if (catPrograms.length === 0) return null;

              const isSeminarCat = cat === "Seminar";

              const formatData: Record<string, { title: string; label: string; image: any; summary: any; imageField: string; summaryField: string }> = {
                "Training": {
                  title: "Traumatraining",
                  label: "Trauma verstehen & begleiten",
                  image: content.offer?.trainingImage || "/images/hero-forest.png",
                  summary: content.offer?.trainingSummary || (catPrograms[0]?.intro?.summary || catPrograms[0]?.datesSubline),
                  imageField: "trainingImage",
                  summaryField: "trainingSummary"
                },
                "Seminar": {
                  title: "Vertiefungsseminare",
                  label: catPrograms.map((p: any) => p.title).join(" · "),
                  image: content.offer?.seminarImage || "/images/hero-forest.png",
                  summary: content.offer?.seminarSummary || "Dort, wo Themen mehr Raum und Sorgfalt brauchen. Wie entsteht Sicherheit aus Ohnmacht, Kontrolle oder Zwang?",
                  imageField: "seminarImage",
                  summaryField: "seminarSummary"
                },
                "Praxiskreis": {
                  title: "Tanzkomplizen",
                  label: "Praxiskreis · monatlich",
                  image: content.offer?.praxiskreisImage || "/images/hero-forest.png",
                  summary: content.offer?.praxiskreisSummary || (catPrograms[0]?.intro?.summary || catPrograms[0]?.datesSubline),
                  imageField: "praxiskreisImage",
                  summaryField: "praxiskreisSummary"
                }
              };
              const formatInfo = formatData[cat] || formatData["Training"];

              return (
                <FadeIn 
                  key={cat}
                  delay={catIdx * 0.1}
                  className="bg-[#f2efe4]/60 rounded-2xl border border-foreground/10 p-6 md:p-16 shadow-sm hover:shadow-md transition-all duration-500 will-change-transform"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-12 md:gap-20">
                    <div className="text-[14px] md:text-[18px] uppercase tracking-widest opacity-20 font-bold w-12 hidden lg:block">
                      0{catIdx + 1}
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center gap-10 md:gap-20 flex-grow">
                      {/* Larger Thumbnail */}
                      <div className="w-full lg:w-[450px] aspect-video bg-[#1c211e] rounded-lg overflow-hidden relative group/img">
                        <img 
                          src={formatInfo.image}
                          alt={formatInfo.title}
                          className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-700"
                          data-tina-field={tinaField(content.offer, formatInfo.imageField as any)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700" />
                      </div>

                      <div className="space-y-8 flex-grow">
                        <div className="space-y-2">
                          <h3 className="text-[8.2vw] md:text-5xl font-serif italic text-foreground/90 leading-tight tracking-tight">
                            {formatInfo.title}
                          </h3>
                          <div className="text-sm md:text-base uppercase tracking-[0.3em] font-bold text-pink">
                            {formatInfo.label}
                          </div>
                        </div>
                        
                        <p 
                          className="text-base md:text-lg opacity-80 leading-relaxed font-sans font-light max-w-2xl"
                          data-tina-field={tinaField(content.offer, formatInfo.summaryField as any)}
                        >
                          {formatInfo.summary}
                        </p>

                        {/* Individual Buttons for Seminars */}
                        <div className="flex flex-wrap gap-4 pt-6">
                          {catPrograms.map((p, pIdx) => (
                            <Link 
                              key={pIdx}
                              href={`/${p._sys.filename}`}
                              className="px-6 py-3 bg-[#1c211e] text-[#F5F2EB] rounded-full text-[12px] md:text-[14px] uppercase tracking-widest font-bold hover:bg-pink hover:text-white transition-all shadow-lg"
                            >
                              {isSeminarCat ? p.title : "Mehr erfahren"}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- ÜBER MICH SECTION --- */}
      <section className="w-full bg-[#f2efe4] py-16 md:py-48 px-4 md:px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <FadeIn 
            className="relative flex justify-center"
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl w-full">
              <img 
                src={content.about?.image || "/images/dariusz_portrait.png"} 
                alt={content.about?.imageAlt || content.about?.title || "Dariusz Portrait"} 
                className="w-full h-full object-cover  hover:-0 transition-all duration-1000 scale-105 hover:scale-100" 
                data-tina-field={tinaField(content.about, "image")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c211e]/40 to-transparent" />
            </div>
          </FadeIn>
          
          <FadeIn 
            delay={0.2}
            className="space-y-12"
          >
            <div className="space-y-4">
              <div 
                className="text-sm md:text-base uppercase tracking-[0.3em] font-bold text-pink"
                data-tina-field={tinaField(content.about, "label")}
              >
                {content.about?.label || "Wer ich bin... unter anderem"}
              </div>
              <h2 
                className="text-6xl md:text-6xl font-serif italic leading-tight text-foreground/90"
                data-tina-field={tinaField(content.about, "title")}
              >
                {content.about?.title}
              </h2>
            </div>
            
            <div 
              className="space-y-8 text-base md:text-xl text-foreground/85 font-sans font-light leading-relaxed prose prose-p:text-base md:prose-p:text-xl prose-p:font-sans prose-p:font-light prose-p:leading-relaxed prose-strong:text-pink prose-strong:font-normal"
              data-tina-field={tinaField(content.about, "content")}
            >
              {content.about?.content?.type ? (
                <TinaMarkdown content={content.about.content} />
              ) : (
                content.about?.content || (
                  <p>Ich wurde 1970 in Polen im Zeichen des Wassermanns geboren. Meine Eltern gaben mir den Namen Dariusz – nach dem persischen König. Sein Name bedeutet: <strong>das Gute bewahren und weitergeben.</strong></p>
                )
              )}
            </div>
            
            <div className="pt-8">
              <Link 
                href="/ueber-uns" 
                className="inline-flex items-center gap-6 group"
              >
                <span className="text-[12px] md:text-[14px] uppercase tracking-widest font-bold border-b border-foreground/10 pb-2 group-hover:border-pink transition-colors">
                  {content.about?.buttonLabel || "Mehr erfahren"}
                </span>
                <span className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-pink group-hover:text-white group-hover:border-pink transition-all text-sm">
                  →
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- QUOTE SECTION --- */}
      <section className="w-full bg-[#1c211e] py-24 md:py-48 px-4 md:px-6 text-center relative overflow-hidden">
        {/* Background Image/Texture */}
        <div className="absolute inset-0 opacity-10">
           <img src="/images/leaves.png" alt="Texture" className="w-full h-full object-cover opacity-20" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 space-y-12 md:space-y-16">
          <FadeIn 
            className="text-pink text-3xl md:text-4xl mb-4 md:mb-8"
          >
            "
          </FadeIn>
          <FadeIn 
            delay={0.2}
            className="text-lg md:text-3xl font-serif italic leading-relaxed text-[#F5F2EB]/90 px-4"
          >
            {content.quote?.text}
          </FadeIn>
          
          <FadeIn 
            delay={0.4}
            className="space-y-4"
          >
            <div className="w-12 h-px bg-pink mx-auto mb-8" />
            <p 
              className="text-[12px] md:text-[18px] uppercase tracking-[0.4em] text-pink font-bold"
              data-tina-field={tinaField(content.quote, "label")}
            >
              {content.quote?.label}
            </p>
            <p 
              className="text-sm md:text-2xl text-[#F5F2EB]/60 font-serif italic"
              data-tina-field={tinaField(content.quote, "subline")}
            >
              {content.quote?.subline}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      {content.testimonials && content.testimonials.length > 0 && (
        <section className="w-full py-24 md:py-48 bg-[#f5f2eb]">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="space-y-4">
                <div className="text-[16px] md:text-[20px] font-serif italic capitalize tracking-[0.3em] text-pink font-bold">Resonanz</div>
                <h2 className="text-5xl md:text-6xl font-serif italic text-[#1c211e]">Stimmen der Gefährten.</h2>
              </div>
            </div>

            <TestimonialSlider testimonials={content.testimonials} />
          </div>
        </section>
      )}
    </div>
  );
}

function TestimonialSlider({ testimonials }: { testimonials: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { scrollLeft } = containerRef.current;
      const firstCard = containerRef.current.querySelector('[class*="snap-center"]');
      if (firstCard) {
        const cardWidth = firstCard.clientWidth;
        const gap = 32; // gap-8 = 2rem = 32px
        const scrollAmount = cardWidth + gap;
        const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
        containerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      } else {
        // Fallback if no card found
        const scrollAmount = containerRef.current.clientWidth * 0.8;
        const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
        containerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative group">
      {/* Slider Controls - Positioned relatively to avoid overlap */}
      <div className="flex gap-4 justify-end mb-8">
        <button 
          onClick={() => scroll('left')}
          className="w-12 h-12 rounded-full border border-[#1c211e]/10 flex items-center justify-center hover:border-pink hover:text-pink transition-all bg-[#f5f2eb] shadow-sm"
        >
          ←
        </button>
        <button 
          onClick={() => scroll('right')}
          className="w-12 h-12 rounded-full border border-[#1c211e]/10 flex items-center justify-center hover:border-pink hover:text-pink transition-all bg-[#f5f2eb] shadow-sm"
        >
          →
        </button>
      </div>

      <div 
        ref={containerRef}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((t, i) => (
          <div 
            key={i}
            className="min-w-[92vw] md:min-w-[600px] snap-center flex flex-col md:flex-row gap-6 p-4 md:p-8 bg-white/40 rounded-xl md:rounded-2xl border border-foreground/5 hover:border-pink/20 transition-all group/card"
          >
            {/* Small Avatar/Image on left */}
            <div className="w-full md:w-48 aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shrink-0">
              <img 
                src={t.image || "/images/portrait-placeholder.png"} 
                alt={t.name}
                className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700"
              />
            </div>

            <div className="flex flex-col justify-between py-2">
              <div className="space-y-4">
                <div className="text-pink text-3xl font-serif leading-none">“</div>
                <p className="text-sm md:text-base font-serif italic leading-relaxed text-[#1c211e]/80">
                  {t.quote}
                </p>
              </div>
              
              <div className="pt-6 border-t border-foreground/5 mt-auto">
                <div className="text-sm font-sans font-bold text-[#1c211e]">{t.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-pink font-medium">{t.training}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
