"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import FadeIn from "./FadeIn";

export default function KontaktClient(props: {
  data: any;
  query: string;
  variables: any;
  settings: any;
}) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data?.kontakt || {};
  const settings = props.settings || {};

  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const body = new URLSearchParams();
    formData.forEach((value, key) => {
      body.append(key, value as string);
    });
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    })
      .then(() => setFormState("success"))
      .catch((error) => {
        console.error("Form submission error:", error);
        alert("Es gab ein Problem beim Senden. Bitte versuche es später noch einmal.");
        setFormState("idle");
      });
  };

  return (
    <div className="w-full bg-background min-h-screen">
      {/* --- HERO --- */}
      <section className="relative w-full h-[50vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#1c211e]">
        <div className="absolute inset-0 z-0">
          {content.heroVideo ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 ">
              <source src={content.heroVideo} type="video/mp4" />
            </video>
          ) : content.heroImage ? (
            <img src={content.heroImage} alt={content.heroImageAlt || "Hero"} className="w-full h-full object-cover opacity-40 " />
          ) : (
            <img src="/hero-forest-blurred.png" alt="Forest Background" className="w-full h-full object-cover opacity-40 " />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#1c211e] z-10" />
        </div>
        
        <FadeIn 
          className="relative z-20 max-w-5xl mx-auto space-y-6 pt-16"
        >
          <div 
            className="text-[16px] md:text-[20px] font-sans font-bold uppercase tracking-[0.3em] text-pink mb-2"
            data-tina-field={tinaField(content, "heroLabel")}
          >
            {content.heroLabel || "Gefährten · Kontakt"}
          </div>
          <h1 
            className="text-4xl md:text-6xl lg:text-[7rem] font-serif italic text-[#F5F2EB] leading-tight md:leading-none tracking-tight"
            data-tina-field={tinaField(content, "heroTitle")}
          >
             {content.heroTitle || "Kontakt"}
          </h1>
        </FadeIn>
      </section>

      {/* --- MAIN CONTENT AREA --- */}
      <section className="max-w-[1400px] mx-auto py-16 md:py-32 px-2 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* Contact Details */}
          <FadeIn 
            className="lg:col-span-5 space-y-16"
          >
            <div className="space-y-8">
              <h2 className="text-2xl font-serif italic text-foreground/90" data-tina-field={tinaField(content, "introHeadline")}>
                {content.introHeadline && typeof content.introHeadline === 'object' && content.introHeadline.children ? (
                  <TinaMarkdown content={content.introHeadline} />
                ) : (
                  typeof content.introHeadline === 'string' ? content.introHeadline : "Lass uns in Kontakt treten."
                )}
              </h2>
              <div className="text-base font-sans font-light opacity-85 leading-relaxed rich-text" data-tina-field={tinaField(content, "introText")}>
                {content.introText && typeof content.introText === 'object' && content.introText.children ? (
                  <TinaMarkdown content={content.introText} />
                ) : (
                  typeof content.introText === 'string' ? content.introText : "Hast du Fragen zum Training oder möchtest ein Erstgespräch vereinbaren? Wir freuen uns auf deine Nachricht."
                )}
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <div className="text-[14px] md:text-[16px] font-serif italic capitalize tracking-widest text-pink font-bold" data-tina-field={tinaField(content.details, "addressHeadline")}>
                  {content.details?.addressHeadline?.toLowerCase() || "Anschrift"}
                </div>
                <div className="text-base font-sans font-light opacity-80 leading-relaxed space-y-6">
                  <div data-tina-field={tinaField(content.details, "address1")}>
                    {content.details?.address1 ? (
                      <TinaMarkdown content={content.details.address1} />
                    ) : (
                      <>
                        {settings.address?.name || "Traumainstitut Gefährten"}<br />
                        {settings.address?.street || "Musterstraße 123"}<br />
                        {settings.address?.city || "50667 Köln"}
                      </>
                    )}
                  </div>
                  {content.details?.address2 && (
                    <div data-tina-field={tinaField(content.details, "address2")}>
                      <TinaMarkdown content={content.details.address2} />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[14px] md:text-[16px] font-serif italic capitalize tracking-widest text-pink font-bold" data-tina-field={tinaField(content.details, "directHeadline")}>
                  {content.details?.directHeadline?.toLowerCase() || "Direkt"}
                </div>
                <div className="text-base font-sans font-light opacity-80 leading-relaxed" data-tina-field={tinaField(content.details, "directText")}>
                  {content.details?.directText ? (
                    <TinaMarkdown content={content.details.directText} />
                  ) : (
                    <>
                      <a href={`mailto:${settings.contactEmail}`} className="hover:text-pink transition-colors">{settings.contactEmail || "kontakt@gefaehrten-trauma.de"}</a><br />
                      <a href={`tel:${settings.contactPhone}`} className="hover:text-pink transition-colors">{settings.contactPhone || "+49 (0) 221 1234567"}</a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn 
            delay={0.2}
            className="lg:col-span-7"
          >
            {formState === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/40 border border-foreground/5 rounded-lg md:rounded-2xl p-8 md:p-16 text-center space-y-6"
              >
                <div className="text-5xl text-pink">✓</div>
                <h3 className="text-3xl font-serif italic">Vielen Dank!</h3>
                <p className="text-base font-sans font-light opacity-85">
                  Deine Nachricht ist bei uns eingegangen. Wir melden uns zeitnah bei dir.
                </p>
                <button 
                  onClick={() => setFormState("idle")}
                  className="text-[14px] uppercase tracking-widest font-bold border-b border-pink pb-1"
                >
                  Neue Nachricht
                </button>
              </motion.div>
            ) : (
              <form 
                onSubmit={handleSubmit} 
                className="space-y-12 bg-[#f0ede4]/30 p-6 md:p-16 rounded-lg md:rounded-[1.5rem] border border-foreground/5 shadow-sm"
                data-netlify="true"
                netlify-honeypot="bot-field"
                name="kontakt"
                method="POST"
              >
                <input type="hidden" name="form-name" value="kontakt" />
                <p className="hidden">
                  <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="relative group">
                    <input 
                      type="text" 
                      name="name"
                      required 
                      className="w-full bg-transparent border-b border-foreground/10 py-4 outline-none focus:border-pink transition-colors peer text-base font-sans font-light"
                      placeholder=" "
                    />
                    <label className="absolute left-0 top-4 text-foreground/40 text-base font-sans font-light pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                      Dein Name
                    </label>
                  </div>
                  
                  <div className="relative group">
                    <input 
                      type="email" 
                      name="email"
                      required 
                      className="w-full bg-transparent border-b border-foreground/10 py-4 outline-none focus:border-pink transition-colors peer text-base font-sans font-light"
                      placeholder=" "
                    />
                    <label className="absolute left-0 top-4 text-foreground/40 text-base font-sans font-light pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                      Deine E-Mail
                    </label>
                  </div>
                </div>

                <div className="relative group">
                  <select name="anliegen" className="w-full bg-transparent border-b border-foreground/10 py-4 outline-none focus:border-pink transition-colors peer text-base font-sans font-light appearance-none">
                    <option value="traumatraining">Traumatraining</option>
                    <option value="vertiefungsseminare">Vertiefungsseminare</option>
                    <option value="tanzkomplizen">Tanzkomplizen</option>
                    <option value="allgemein">Allgemeine Anfrage</option>
                  </select>
                  <label className="absolute left-0 -top-4 text-xs text-pink font-sans font-light">
                    Anliegen
                  </label>
                  <div className="absolute right-0 top-4 pointer-events-none opacity-40 italic">▼</div>
                </div>

                <div className="relative group">
                  <textarea 
                    name="nachricht"
                    required 
                    rows={4}
                    className="w-full bg-transparent border-b border-foreground/10 py-4 outline-none focus:border-pink transition-colors peer text-base font-sans font-light resize-none"
                    placeholder=" "
                  />
                  <label className="absolute left-0 top-4 text-foreground/40 text-base font-sans font-light pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                    Deine Nachricht
                  </label>
                </div>

                <div className="pt-8">
                  <button 
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full md:w-auto px-16 py-5 bg-[#1c211e] text-[#F5F2EB] rounded-full text-[14px] md:text-[16px] uppercase tracking-[0.3em] font-bold hover:bg-pink hover:text-white transition-all shadow-xl disabled:opacity-50"
                  >
                    {formState === "submitting" ? "WIRD GESENDET..." : "NACHRICHT ABSCHICKEN"}
                  </button>
                </div>
              </form>
            )}
          </FadeIn>

        </div>
      </section>
    </div>
  );
}
