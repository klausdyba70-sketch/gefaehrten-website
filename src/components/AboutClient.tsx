"use client";

import { motion } from "framer-motion";
import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function AboutClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.ueberuns;

  const fadeInUp = {
    initial: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as any }
  };

  return (
    <div className="w-full bg-background min-h-screen">
      {/* --- HERO --- */}
      <section className="relative w-full min-h-[50vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#0f110e] py-32">
        <div className="absolute inset-0 z-0">
          {content.heroVideo ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 ">
              <source src={content.heroVideo} type="video/mp4" />
            </video>
          ) : content.heroImage ? (
            <img src={content.heroImage} alt={content.heroImageAlt || "Hero"} className="w-full h-full object-cover opacity-60 " />
          ) : (
            <img src="/hero-forest-blurred.png" alt="Forest Background" className="w-full h-full object-cover opacity-60 " />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0f110e] z-10" />
          {/* Ambient Pink Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[20%] bg-pink/20 blur-[120px] rounded-full z-10" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] as any }}
          className="relative z-20 max-w-5xl mx-auto space-y-4 pt-16"
        >
          <div 
            className="text-[16px] md:text-[20px] font-sans font-bold uppercase tracking-[0.3em] text-pink mb-2"
            data-tina-field={tinaField(content, "heroLabel")}
          >
            {content.heroLabel || "Dariusz Kurz"}
          </div>
          <h1 
            className="text-4xl md:text-6xl lg:text-[7rem] font-serif italic text-[#F5F2EB] leading-tight md:leading-none tracking-tight"
            data-tina-field={tinaField(content, "heroTitle")}
          >
             {content.heroTitle || "Über mich"}
          </h1>
          {content.heroSubline && (
            <h2 
              className="text-base md:text-2xl text-pink/80 font-sans font-light italic pt-2 tracking-widest"
              data-tina-field={tinaField(content, "heroSubline")}
            >
              {content.heroSubline}
            </h2>
          )}
        </motion.div>
      </section>

      {/* --- CONTENT SECTIONS --- */}
      <div className="w-full space-y-32 py-32">
        {content.sections?.map((section: any, idx: number) => (
          <section key={idx} className="max-w-[1400px] mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center ${section.imageRight ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Image Column */}
              <motion.div 
                {...fadeInUp}
                className={`${section.imageRight ? 'lg:order-2' : 'lg:order-1'} flex justify-center`}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-[#1c211e]/5">
                  {section.image ? (
                    <img 
                      src={section.image} 
                      alt={section.imageAlt || section.title || "Portrait"} 
                      className="w-full h-full object-cover  hover:-0 transition-all duration-1000"
                      data-tina-field={tinaField(section, "image")}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-foreground/20 italic">
                      Portrait Bild
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Text Column */}
              <motion.div 
                {...fadeInUp}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] as any }}
                className={`space-y-10 ${section.imageRight ? 'lg:order-1' : 'lg:order-2'}`}
              >
                <div className="space-y-6">
                  {section.label && (
                    <div 
                      className="text-[14px] md:text-[18px] font-serif italic capitalize tracking-[0.2em] text-pink font-bold"
                      data-tina-field={tinaField(section, "label")}
                    >
                      {section.label.toLowerCase()}
                    </div>
                  )}
                  <h2 
                    className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-foreground/90 leading-tight"
                    data-tina-field={tinaField(section, "title")}
                  >
                    {section.title}
                  </h2>
                </div>

                <div 
                  className="text-base md:text-lg font-sans font-light opacity-90 leading-relaxed space-y-6 max-w-2xl rich-text"
                  data-tina-field={tinaField(section, "content")}
                >
                  <TinaMarkdown content={section.content} />
                </div>

                {/* CTA Button placed underneath the text in the last section */}
                {idx === content.sections.length - 1 && content.cta && content.cta.label && (
                  <div className="pt-8">
                    <a 
                      href={content.cta.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-12 py-4 bg-[#1c211e] text-[#F5F2EB] rounded-full text-[14px] md:text-[16px] uppercase tracking-[0.4em] font-bold hover:bg-pink hover:text-white transition-all shadow-xl"
                      data-tina-field={tinaField(content.cta, "label")}
                    >
                      {content.cta.label}
                    </a>
                  </div>
                )}
              </motion.div>

            </div>
          </section>
        ))}
      </div>

      {/* --- QUOTE SECTION --- */}
      {content.quote && (
        <section className="w-full bg-[#1c211e] py-32 md:py-48 px-6 text-center relative overflow-hidden">
          {/* Background Image/Texture */}
          <div className="absolute inset-0 opacity-10">
             <img src="/images/leaves.png" alt="Texture" className="w-full h-full object-cover opacity-20" />
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10 space-y-12 md:space-y-16">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2 }}
              className="text-pink text-3xl md:text-4xl mb-4 md:mb-8"
            >
              "
            </motion.div>
            <motion.blockquote 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-lg md:text-3xl font-serif italic leading-relaxed text-[#F5F2EB]/90"
              data-tina-field={tinaField(content.quote, "text")}
            >
              {content.quote.text}
            </motion.blockquote>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="space-y-4"
            >
              <div className="w-12 h-px bg-pink mx-auto mb-8" />
              <p 
                className="text-[12px] md:text-[14px] uppercase tracking-[0.4em] text-pink font-bold"
                data-tina-field={tinaField(content.quote, "label")}
              >
                {content.quote.label}
              </p>
              <p 
                className="text-sm md:text-2xl text-[#F5F2EB]/60 font-serif italic"
                data-tina-field={tinaField(content.quote, "subline")}
              >
                {content.quote.subline}
              </p>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
