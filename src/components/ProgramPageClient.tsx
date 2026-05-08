"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Program } from "@/data/programs";
import Financing from "@/components/Financing";
import SuitableFor from "@/components/SuitableFor";

import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function ProgramPageClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data?.seminars || props.data?.seminars || {};
  const containerRef = useRef(null);
  const [openWeekend, setOpenWeekend] = useState<number | null>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="w-full bg-background min-h-screen" ref={containerRef}>
      {/* --- HERO --- */}
      <section className="relative w-full min-h-[50vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#1c211e] py-32">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          {content.videoSrc ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50 scale-110">
              <source src={content.videoSrc} type="video/mp4" />
            </video>
          ) : content.heroImage ? (
            <img
              src={content.heroImage}
              alt={content.heroImageAlt || content.title || "Hero Background"}
              className="w-full h-full object-cover opacity-50 scale-110"
            />
          ) : (
            <div className="w-full h-full bg-[#1c211e]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#1c211e] z-10" />
          {/* Ambient Pink Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[20%] bg-pink/20 blur-[120px] rounded-full z-10" />
        </motion.div>

        {/* Title Block - Perfectly Centered */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] as any }}
          className="relative z-20 max-w-5xl mx-auto space-y-4"
        >
          <motion.div style={{ opacity }}>
            <div className="text-[16px] md:text-[20px] font-sans font-bold uppercase tracking-[0.3em] text-pink mb-2">{content.label}</div>
            <h1 className="text-7xl md:text-6xl lg:text-[7rem] font-serif italic text-[#F5F2EB] leading-tight md:leading-none tracking-tight">
              {content.title}
            </h1>
            <h2
              className="text-xl md:text-2xl text-pink/80 font-sans font-light italic pt-2 tracking-widest"
              data-tina-field={tinaField(content, "datesSubline")}
            >
              {content.datesSubline}
            </h2>
          </motion.div>
        </motion.div>
      </section>

      {/* --- MAIN CONTENT AREA --- */}
      <section className="max-w-[1400px] mx-auto py-20 md:py-32 px-6">

        {/* Header Intro - Now below the Hero */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as any }}
          className="max-w-4xl mx-auto mb-20 md:mb-32 space-y-8 md:space-y-12 text-center border-b border-black/5 pb-20 md:pb-32"
        >
          <h3 className="text-3xl md:text-4xl font-serif italic text-foreground/90 leading-tight">
            {content.headerIntro?.headline}
          </h3>
          <div className="text-sm md:text-xl text-foreground/70 font-sans font-light leading-relaxed space-y-6 md:space-y-8 max-w-3xl mx-auto" data-tina-field={tinaField(content.headerIntro, "text")}>
            <TinaMarkdown content={content.headerIntro?.text} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          <div className="lg:col-span-8 space-y-20 md:space-y-32">

            {/* Detailed Intro Section */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as any }}
              className="space-y-8 md:space-y-12"
            >
              <div className="space-y-4">
                <h3 className="text-3xl md:text-3xl font-serif italic leading-tight text-foreground/90" data-tina-field={tinaField(content.intro, "headline")}>{content.intro?.headline}</h3>
                {content.intro?.summary && (
                  <p className="text-xl md:text-2xl font-serif italic text-pink leading-relaxed border-l-4 border-pink/20 pl-8 my-12" data-tina-field={tinaField(content.intro, "summary")}>
                    {content.intro.summary}
                  </p>
                )}
                <div className="text-sm md:text-lg text-foreground/85 font-sans font-light leading-relaxed space-y-8 rich-text">
                  <div data-tina-field={tinaField(content.intro, "text1")}><TinaMarkdown content={content.intro?.text1} /></div>
                  <div data-tina-field={tinaField(content.intro, "text2")}><TinaMarkdown content={content.intro?.text2} /></div>
                  <div data-tina-field={tinaField(content.intro, "text3")}><TinaMarkdown content={content.intro?.text3} /></div>
                </div>
              </div>
            </motion.div>



            {/* Weekends / Accordion Section */}
            {content.showWeekends && (
              <div className="space-y-12">
                <div className="space-y-2">
                  <h3 className="text-5xl md:text-4xl font-serif italic">Module</h3>
                  <p className="text-xs md:text-sm tracking-widest opacity-40 font-bold">Die Reise im Detail</p>
                </div>

                <div className="space-y-4">
                  {content.weekends?.map((we: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="border border-foreground/5 rounded-2xl overflow-hidden bg-foreground/[0.01]"
                    >
                      <button
                        onClick={() => setOpenWeekend(openWeekend === i ? null : i)}
                        className="w-full px-8 py-10 flex flex-col md:flex-row md:items-center text-left hover:bg-pink/[0.02] transition-colors gap-4 md:gap-12"
                      >
                        <div className="text-pink text-xs uppercase tracking-widest font-bold whitespace-nowrap min-w-[120px]">{we.title}</div>
                        <div className="text-sm md:text-lg font-serif italic flex-1">{we.subtitle}</div>
                        <div className={`text-pink text-2xl transition-transform duration-300 ${openWeekend === i ? 'rotate-180' : ''}`}>↓</div>
                      </button>
                      <AnimatePresence>
                        {openWeekend === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <div className="px-8 pb-12 space-y-8">
                              <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
                                {/* Duration and Items */}
                                {(we.duration || (we.items && we.items.length > 0)) && (
                                  <div className="space-y-6 min-w-[240px]">
                                    {we.duration && (
                                      <div className="text-[12px] uppercase tracking-widest text-pink font-bold" data-tina-field={tinaField(we, "duration")}>
                                        {we.duration}
                                      </div>
                                    )}
                                    {we.items && we.items.length > 0 && (
                                      <ul className="space-y-3" data-tina-field={tinaField(we, "items")}>
                                        {we.items.map((item: string, idx: number) => (
                                          <li key={idx} className="flex gap-4 text-sm font-sans font-light opacity-85 leading-snug">
                                            <span className="text-pink">•</span>
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                )}

                                {/* Description */}
                                <div className="text-sm md:text-base font-sans font-light opacity-85 leading-relaxed border-l-2 border-pink/20 pl-8 flex-grow rich-text" data-tina-field={tinaField(we, "text")}>
                                  <TinaMarkdown content={we.text} />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum Grid Section */}
            {content.showCurriculum && (
              <div className="space-y-12 pt-20 md:pt-32 border-t border-foreground/10">
                {/* Header Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-start">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="space-y-2"
                  >
                    {content.curriculumLabel && (
                      <div
                        className="text-[12px] md:text-[14px] font-serif italic capitalize tracking-[0.2em] text-pink font-bold"
                        data-tina-field={tinaField(content, "curriculumLabel")}
                      >
                        {content.curriculumLabel}
                      </div>
                    )}
                    <h3 className="text-5xl md:text-4xl font-serif italic leading-tight">
                      {content.curriculumHeadline || "Module im Überblick."}
                    </h3>
                  </motion.div>
                  {content.curriculumIntro && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 }}
                      className="text-sm font-sans font-light opacity-85 leading-relaxed md:pt-8"
                    >
                      {content.curriculumIntro}
                    </motion.div>
                  )}
                </div>

                {/* Full Width Row Section */}
                <div className="grid grid-cols-1 gap-4">
                  {content.curriculum?.map((item: any, idx: number) => {
                    const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
                    return (
                      <ModuleCard
                        key={idx}
                        item={item}
                        index={idx}
                        roman={romanNumerals[idx] || (idx + 1).toString()}
                      />
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex-col order-2 lg:order-none">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-[#f0ede4] p-8 md:p-12 rounded-[2rem] sticky top-32 space-y-8 md:space-y-12 shadow-md border border-foreground/5 relative"
            >
              {/* Category & Title Header */}
              <div className="space-y-2 border-b border-foreground/5 pb-8">
                <div 
                  className="text-[11px] uppercase tracking-[0.2em] text-pink font-bold"
                  data-tina-field={tinaField(content, "category")}
                >
                  {content.category}
                </div>
                <h4 
                  className="text-3xl font-serif italic text-foreground"
                  data-tina-field={tinaField(content, "title")}
                >
                  {content.title}
                </h4>
              </div>

              {/* Discount Badge */}
              {content.discountPrice && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink text-white text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg z-20 whitespace-nowrap">
                  Aktionspreis
                </div>
              )}
              <div className="space-y-8">
              {/* Date Groups */}
              <div className="space-y-12">
                {content.dateGroups?.map((group: any, gIdx: number) => {
                  const datesCount = group.dates?.length || 0;
                  const isLongList = datesCount > 3;
                  
                  return (
                    <DateGroupAccordion 
                      key={gIdx} 
                      group={group} 
                      isLongList={isLongList} 
                    />
                  );
                })}
              </div>
              </div>

              {/* Ablauf Section (Option 1) */}
              {content.highlight?.text && (
                <div className="space-y-4 pt-8 border-t border-foreground/10">
                  <div className="text-[14px] uppercase tracking-[0.2em] text-pink font-bold" data-tina-field={tinaField(content.highlight, "headline")}>
                    {content.highlight.headline || "Ablauf"}
                  </div>
                  <div className="text-sm font-sans font-light opacity-85 leading-relaxed rich-text prose-sm prose-p:my-1" data-tina-field={tinaField(content.highlight, "text")}>
                    <TinaMarkdown content={content.highlight.text} />
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-8 border-t border-foreground/10">
                <div className="text-[14px] uppercase tracking-[0.2em] opacity-40 font-bold">Investition</div>
                {content.discountPrice ? (
                  <div className="space-y-1">
                    <div className="text-sm opacity-40 line-through font-sans" data-tina-field={tinaField(content, "price")}>
                      {content.price}
                    </div>
                    <div className="text-4xl md:text-5xl font-serif italic text-pink" data-tina-field={tinaField(content, "discountPrice")}>
                      {content.discountPrice}
                    </div>
                  </div>
                ) : (
                  <div className="text-4xl font-serif italic text-foreground" data-tina-field={tinaField(content, "price")}>
                    {content.price}
                  </div>
                )}
              </div>

              <Link
                href={`/anmelden?seminar=${data?.seminars?._sys?.filename || ''}`}
                className={`w-full block py-4 text-center rounded-full text-[12px] uppercase tracking-[0.3em] font-bold transition-all shadow-xl ${content.isFull ? 'bg-pink text-white hover:bg-pink/80' : 'bg-[#1c211e] text-[#F5F2EB] hover:bg-pink hover:text-white'}`}
              >
                {content.isFull ? "AUF WARTELISTE" : "JETZT BUCHEN"}
              </Link>
            </motion.div>
          </div>

          {/* Shared Content Sections (Mobile: Order 3, Desktop: Below Main Content) */}
          <div className="lg:col-span-8 order-3 lg:order-none space-y-24 pt-12 md:pt-32 border-t border-foreground/10">
            <Financing />
            <SuitableFor />
          </div>

        </div>

      </section>
    </div>
  );
}

function DateGroupAccordion({ group, isLongList }: { group: any; isLongList: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/40 border border-foreground/5 rounded-2xl p-6 space-y-6">
      <div className="space-y-1">
        <div
          className="text-[14px] uppercase tracking-[0.2em] opacity-40 font-bold"
          data-tina-field={tinaField(group, "headline")}
        >
          {group.headline || "Termine"}
        </div>
        {group.subline && (
          <div
            className="text-[11px] uppercase tracking-widest text-pink font-bold"
            data-tina-field={tinaField(group, "subline")}
          >
            {group.subline}
          </div>
        )}
      </div>

      {isLongList ? (
        <div className="space-y-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1c211e]/40 hover:text-pink transition-colors group/toggle"
          >
            <span>Alle {group.dates?.length} Termine {isOpen ? 'ausblenden' : 'anzeigen'}</span>
            <svg 
              width="12" height="12" viewBox="0 0 12 12" fill="none" 
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            >
              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.ul 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-4 overflow-hidden pt-2"
              >
                {group.dates?.map((d: any, i: number) => (
                  <li key={i} className="flex flex-col border-b border-foreground/5 pb-3 last:border-0 group relative">
                    {(d.status || d.isFull) && (
                      <span className={`absolute -top-3 -right-2 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest shadow-sm z-10 ${d.isFull ? 'bg-pink text-white' : 'bg-pink/10 text-pink border border-pink/20 backdrop-blur-sm'}`}>
                        {d.isFull ? "WARTELISTE" : d.status}
                      </span>
                    )}
                    <span className="text-sm font-medium group-hover:text-pink transition-colors">{d.date}</span>
                    <span className="text-[12px] opacity-40 uppercase tracking-widest">{d.location}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <ul className="space-y-4">
          {group.dates?.map((d: any, i: number) => (
            <li key={i} className="flex flex-col border-b border-foreground/5 pb-3 last:border-0 group relative">
              {(d.status || d.isFull) && (
                <span className={`absolute -top-3 -right-2 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest shadow-sm z-10 ${d.isFull ? 'bg-pink text-white' : 'bg-pink/10 text-pink border border-pink/20 backdrop-blur-sm'}`}>
                  {d.isFull ? "WARTELISTE" : d.status}
                </span>
              )}
              <span className="text-sm font-medium group-hover:text-pink transition-colors">{d.date}</span>
              <span className="text-[12px] opacity-40 uppercase tracking-widest">{d.location}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ModuleCard({ item, index, roman }: { item: any; index: number; roman: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const hasTextNode = (node: any): boolean => {
    if (!node) return false;
    if (typeof node.text === 'string' && node.text.trim() !== '') return true;
    if (Array.isArray(node.children)) return node.children.some(hasTextNode);
    return false;
  };

  const isDescriptionEmpty = !item.description || !hasTextNode(item.description);

  const hasContent = (item.items && item.items.length > 0) || !isDescriptionEmpty;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 1.2, ease: "easeOut" }}
      className={`bg-white shadow-sm border border-foreground/5 group hover:border-pink/20 transition-all duration-500 ${hasContent ? 'p-6 md:px-12 md:py-10 rounded-xl md:rounded-[2rem]' : 'p-4 md:px-12 md:py-6 rounded-lg md:rounded-full'
        }`}
    >
      <div
        className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 cursor-pointer md:cursor-default"
        onClick={() => {
          if (window.innerWidth < 768 && hasContent) setIsOpen(!isOpen);
        }}
      >
        {/* Left Side: Index & Title */}
        <div className={`flex items-center gap-8 ${hasContent ? 'md:min-w-[400px]' : 'flex-1'}`}>
          <span className="text-xl md:text-2xl font-serif italic opacity-30 w-8">{roman}</span>
          <div className="space-y-1">
            <h4 className="text-xl md:text-2xl font-serif italic text-foreground leading-tight group-hover:text-pink transition-colors">
              {item.title}
            </h4>
            {item.duration && (
              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-pink/60 font-bold">
                {item.duration}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Content Points */}
        {hasContent && (
          <div className="hidden md:flex flex-1 items-center gap-12">
            <div className="flex flex-wrap gap-x-12 gap-y-2">
              {item.items?.map((bullet: string, bIdx: number) => (
                <div key={bIdx} className="flex gap-3 items-center group/item">
                  <div className="w-4 h-[1px] bg-pink/30 group-hover/item:w-6 transition-all" />
                  <span className="text-sm md:text-base font-serif italic text-foreground/70 group-hover/item:text-foreground transition-colors">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {item.description && (
              <div className="ml-auto text-xs font-sans font-light opacity-40 italic max-w-[200px] line-clamp-2">
                <TinaMarkdown content={item.description} />
              </div>
            )}
          </div>
        )}

        {/* Mobile Toggle Icon */}
        {hasContent && (
          <div className="md:hidden flex justify-end">
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              className="text-pink opacity-40 text-xs"
            >
              ▼
            </motion.div>
          </div>
        )}
      </div>

      {/* Mobile Content */}
      <AnimatePresence>
        {isOpen && hasContent && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-6 border-t border-foreground/5 mt-6 space-y-4">
              {item.items?.map((bullet: string, bIdx: number) => (
                <div key={bIdx} className="flex gap-3 items-center">
                  <div className="w-3 h-[1px] bg-pink shrink-0" />
                  <span className="text-base font-serif italic text-foreground/80">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


