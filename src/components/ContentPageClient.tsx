"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ContentPage } from "@/data/pages";

import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import BackgroundVideo from "./BackgroundVideo";

export default function ContentPageClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data?.page || props.data?.page || {};
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fadeInUp = {
    initial: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as any }
  };

  return (
    <div className="w-full bg-background min-h-screen" ref={containerRef}>
      {/* --- HERO --- */}
      <section className="relative w-full min-h-[50vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#1c211e] py-32">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <BackgroundVideo 
            videoMp4={content.heroVideo}
            externalVideoUrl={content.externalVideoUrl}
            fallbackImage={content.heroImage}
            imageAlt={content.heroImageAlt || content.title}
            opacity={40}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#1c211e] z-10" />
          {/* Ambient Pink Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[20%] bg-pink/20 blur-[120px] rounded-full z-10" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] as any }}
          className="relative z-20 max-w-5xl mx-auto space-y-4"
        >
          <motion.div style={{ opacity }}>
            {content.heroLabel && (
              <div className="text-[16px] md:text-[20px] font-sans font-bold uppercase tracking-[0.3em] text-pink mb-2">{content.heroLabel}</div>
            )}
            <h1 className="text-3xl md:text-6xl lg:text-[7rem] font-serif italic text-[#F5F2EB] leading-tight md:leading-none tracking-tight">
               {content.title}
            </h1>
            {content.heroSubline && (
              <h2 className="text-base md:text-2xl text-pink/80 font-sans font-light italic pt-2 tracking-widest">
                {content.heroSubline}
              </h2>
            )}

            {/* Header Intro */}
            {content.headerIntro && (
              <div className="max-w-3xl mx-auto pt-16 space-y-10">
                <h3 className="text-2xl md:text-3xl font-serif italic text-[#F5F2EB]/90 leading-tight">
                  {content.headerIntro.headline}
                </h3>
                <div className="text-sm md:text-lg text-[#F5F2EB]/85 font-sans font-light leading-relaxed">
                  <p>{content.headerIntro.text}</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* --- CONTENT --- */}
      <section className="max-w-4xl mx-auto py-16 md:py-32 px-2 md:px-6">
        <div className="space-y-32">
          {content.sections?.map((section: any, idx: number) => {
            if (section.type === "text") {
              return (
                <motion.div key={idx} {...fadeInUp} className="space-y-8">
                  <div className="space-y-2">
                    {section.headline && (
                      <h2 className="text-2xl md:text-5xl font-serif italic text-foreground/90 leading-tight">
                        {section.headline}
                      </h2>
                    )}
                    {section.subtitle && (
                      <p className="text-xs uppercase tracking-[0.3em] opacity-40 font-bold">{section.subtitle}</p>
                    )}
                  </div>
                  <div className="text-sm md:text-lg text-foreground/85 font-sans font-light leading-relaxed space-y-8 rich-text">
                    {typeof section.content === 'string' ? (
                      <p>{section.content}</p>
                    ) : (
                      <TinaMarkdown content={section.content} />
                    )}
                  </div>
                  {section.button && (
                    <div className="pt-8">
                      <a 
                        href={section.button.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 bg-[#1c211e] text-[#F5F2EB] rounded-full text-[12px] md:text-[14px] uppercase tracking-[0.3em] font-bold hover:bg-pink hover:text-white transition-all shadow-xl"
                      >
                        {section.button.label}
                      </a>
                    </div>
                  )}
                </motion.div>
              );
            }
            if (section.type === "image" && section.image) {
              return (
                <motion.div key={idx} {...fadeInUp} className="relative aspect-[4/5] md:aspect-[16/9] w-full overflow-hidden rounded-lg md:rounded-[3rem]">
                  <img 
                    src={section.image} 
                    alt={section.imageAlt || section.headline || "Image"} 
                    className="w-full h-full object-cover  hover:-0 transition-all duration-1000"
                  />
                </motion.div>
              );
            }
            if (section.type === "highlight") {
              return (
                <motion.div 
                  key={idx} 
                  {...fadeInUp}
                  className="space-y-10 bg-pink/5 p-4 md:p-12 rounded-lg md:rounded-[1.5rem] border border-pink/10 shadow-sm"
                >
                   <div className="space-y-2">
                     <h4 className="text-3xl md:text-5xl font-serif italic text-pink">{section.headline}</h4>
                     <p className="text-sm uppercase tracking-[0.3em] opacity-40 font-bold">{section.subtitle}</p>
                   </div>
                   <div className="text-base md:text-lg font-sans font-light opacity-80 leading-relaxed rich-text prose prose-headings:font-serif prose-headings:italic prose-headings:text-foreground/90 prose-h2:text-2xl prose-h2:md:text-4xl prose-h3:text-xl prose-h3:md:text-3xl prose-headings:mt-10 prose-headings:mb-4 prose-headings:font-normal prose-strong:text-pink prose-strong:font-normal">
                     {typeof section.content === 'string' ? (
                       <p>{section.content}</p>
                     ) : (
                       <TinaMarkdown content={section.content} />
                     )}
                   </div>
                </motion.div>
              );
            }
            if (section.type === "quote") {
              return (
                <motion.div key={idx} {...fadeInUp} className="py-16 border-y border-foreground/5 text-center">
                  <blockquote className="text-xl md:text-3xl font-serif italic text-pink leading-relaxed max-w-3xl mx-auto rich-text">
                    {typeof section.content === 'string' ? (
                      `"${section.content}"`
                    ) : (
                      <TinaMarkdown content={section.content} />
                    )}
                  </blockquote>
                </motion.div>
              );
            }
            return null;
          })}
        </div>
      </section>
    </div>
  );
}
