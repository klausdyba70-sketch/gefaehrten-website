"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useSearchParams } from "next/navigation";
import BackgroundVideo from "./BackgroundVideo";

interface AnmeldenClientProps {
  programs: any[];
  query?: string;
  variables?: any;
  data?: any;
}

export default function AnmeldenClient({ programs, query, variables, data }: AnmeldenClientProps) {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [openDates, setOpenDates] = useState<Record<string, boolean>>({});
  const searchParams = useSearchParams();
  const preselectedSeminar = searchParams.get("seminar");

  const tina = query ? useTina({ query, variables, data }) : { data };
  const pageData = tina.data?.anmelden || data?.anmelden || {};

  useEffect(() => {
    if (preselectedSeminar && programs.length > 0 && selectedOptions.length === 0) {
      const program = programs.find((p: any) => p._sys.filename === preselectedSeminar);
      if (program) {
        setSelectedOptions([`${program._sys.filename}-0`]);
      }
    }
  }, [preselectedSeminar, programs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const body = new URLSearchParams();
    
    // Group multiple selections (like auswahl) into a single readable string
    const selections: string[] = [];
    formData.forEach((value, key) => {
      if (key === "auswahl") {
        selections.push(value as string);
      } else if (key !== "form-name" && key !== "bot-field") {
        body.append(key, value as string);
      }
    });
    
    // Add the joined selections
    if (selections.length > 0) {
      body.append("auswahl", selections.join(", "));
    }

    // Re-add hidden fields
    body.append("form-name", "anmeldung");
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    })
      .then(() => {
        setFormState("success");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        alert("Es gab ein Problem beim Senden. Bitte versuche es später noch einmal.");
        setFormState("idle");
      });
  };

  const toggleOption = (id: string) => {
    setSelectedOptions(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleDates = (id: string) => {
    setOpenDates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories: Record<string, any[]> = {
    "TRAINING": programs.filter(p => p.category === "Training"),
    "PRAXISVERTIEFUNG-SEMINAR": programs.filter(p => p.category === "Seminar"),
    "PRAXISKREIS": programs.filter(p => p.category === "Praxiskreis")
  };

  return (
    <div className="w-full bg-[#f5f2eb] min-h-screen font-sans">
      {/* --- HERO --- */}
      <section className="relative w-full min-h-[50vh] md:h-[40vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#1c211e] py-20 md:py-0">
        <div className="absolute inset-0 z-0">
          <BackgroundVideo 
            videoMp4={pageData.heroVideo}
            externalVideoUrl={pageData.externalVideoUrl}
            fallbackImage={pageData.heroImage || "/images/leaves.png"}
            imageAlt={pageData.heroImageAlt || "Hero"}
            opacity={20}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#1c211e] z-10" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="relative z-20 max-w-5xl mx-auto space-y-6 md:space-y-8 pt-10"
        >
          <div className="text-[clamp(14px,1.5vw,20px)] font-sans font-bold uppercase tracking-[0.3em] text-pink">Gefährten · Anmeldeformular</div>
          <h1 className="text-[clamp(36px,8vw,100px)] font-serif italic text-[#F5F2EB] leading-none tracking-tight">
             Anmeldung
          </h1>
          <p className="text-[clamp(16px,1.8vw,24px)] font-sans font-light opacity-80 text-white max-w-2xl mx-auto leading-relaxed px-4">
            {pageData.pageIntro || "Bitte füllen Sie das Formular vollständig aus."}
          </p>
        </motion.div>
      </section>

      {/* --- FORM SECTION --- */}
      <section className="max-w-4xl mx-auto py-16 md:py-24 px-6 md:px-12">
        {formState === "success" ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-pink/5 border border-pink/20 p-16 rounded-2xl md:rounded-[2rem] text-center space-y-6 shadow-sm"
          >
            <div className="text-5xl text-pink">✓</div>
            <h3 className="text-4xl font-serif italic text-[#1c211e]">Anfrage erfolgreich gesendet.</h3>
            <p className="text-xl font-sans font-light opacity-70 text-[#1c211e]/80">
              Vielen Dank für Ihre Anmeldung. Wir haben Ihre Daten erhalten und melden uns in Kürze.
            </p>
            <button 
              onClick={() => { setFormState("idle"); setSelectedOptions([]); }}
              className="px-12 py-4 bg-[#1c211e] text-[#F5F2EB] rounded-full text-[14px] uppercase tracking-widest font-bold hover:bg-pink transition-all"
            >
              Neue Anmeldung
            </button>
          </motion.div>
        ) : (
          <form 
            onSubmit={handleSubmit} 
            className="space-y-12 md:space-y-16"
            data-netlify="true"
            netlify-honeypot="bot-field"
            name="anmeldung"
            method="POST"
          >
            <input type="hidden" name="form-name" value="anmeldung" />
            <p className="hidden">
              <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
            </p>
            
            {/* --- BOX 1: SEMINAR SELECTION --- */}
            <div className="bg-white/50 p-6 md:p-12 rounded-2xl md:rounded-[1.5rem] border border-[#1c211e]/5 shadow-sm space-y-16">
              <div className="space-y-16">
                <h3 
                  className="text-2xl font-serif italic text-[#1c211e]/90 border-b border-[#1c211e]/10 pb-4"
                  data-tina-field={tinaField(pageData, "seminarLabel")}
                >
                  {pageData.seminarLabel || "Seminar Auswählen"}
                </h3>
                {Object.entries(categories).map(([catName, catPrograms]) => {
                  if (catPrograms.length === 0) return null;
                  
                  // Get intro text for category
                  const introField = catName === "TRAINING" ? pageData.introTraining : 
                                    catName === "PRAXISVERTIEFUNG-SEMINAR" ? pageData.introSeminar : 
                                    pageData.introPraxiskreis;

                  return (
                    <div key={catName} className="space-y-8 pb-12 border-b border-[#1c211e]/5 last:border-0">
                      <div className="space-y-4">
                          <h4 className="text-3xl md:text-4xl font-serif italic capitalize text-pink tracking-wide">
                            {catName.toLowerCase()}
                          </h4>
                          {introField && (
                            <div className="text-sm md:text-base font-sans font-light opacity-70 leading-relaxed max-w-2xl rich-text">
                              <TinaMarkdown content={introField} />
                            </div>
                          )}
                      </div>

                      <div className="grid grid-cols-1 gap-8">
                        {catPrograms.map((program: any) => {
                          const hasInstallment = program.installment?.available;
                          
                          // If program has dateGroups, we might want to split it into multiple selectable items
                          // or handle it as one item with a group selector. 
                          // The user said: "it needs to show up as 2 products"
                          const groups = program.dateGroups && program.dateGroups.length > 0 
                            ? program.dateGroups 
                            : [{ headline: "Termine", dates: program.dates || [] }];

                          return groups.map((group: any, gIdx: number) => {
                            const optionId = groups.length > 1 ? `${program._sys.filename}-group-${gIdx}` : program._sys.filename;
                            const displayTitle = groups.length > 1 ? `${program.title} (${group.headline || `Gruppe ${gIdx + 1}`})` : program.title;
                            const hasDates = group.dates && group.dates.length > 0;
                            const displayPrice = program.discountPrice ? `${program.discountPrice} (statt ${program.price})` : program.price;

                            return (
                              <div key={optionId} className="space-y-6 pb-12 border-b border-[#1c211e]/10 last:border-0">
                                <div className="space-y-6">
                                  <div className="space-y-4">
                                    <label className="flex items-start gap-4 md:gap-6 cursor-pointer group">
                                      <div className="pt-1">
                                        <input 
                                          type="checkbox" 
                                          name="auswahl"
                                          value={`${program.category ? `[${program.category}] ` : ""}${displayTitle}${program.isFull ? " (WARTELISTE)" : ""}`}
                                          checked={selectedOptions.includes(optionId)}
                                          onChange={() => toggleOption(optionId)}
                                          className="w-6 h-6 accent-pink mt-1"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                                          <div className="text-xl font-sans font-bold text-[#1c211e] group-hover:text-pink transition-colors">
                                            {displayTitle} {program.isFull && <span className="text-pink font-bold ml-2 text-xs uppercase tracking-widest">(WARTELISTE)</span>}
                                          </div>
                                          <div className="text-lg font-sans font-bold text-[#1c211e]/80">
                                            {displayPrice}
                                          </div>
                                        </div>
                                        
                                        <div className="text-xs text-pink uppercase tracking-widest font-medium mt-1">
                                          {group.subline || program.datesSubline}
                                        </div>
                                      </div>
                                    </label>
                                  </div>

                                  {/* ALL DATES LIST (ACCORDION) */}
                                  {hasDates && (
                                    <div className="ml-10 md:ml-12 mt-2 overflow-hidden">
                                      <button 
                                        type="button"
                                        onClick={() => toggleDates(optionId)}
                                        className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1c211e]/40 hover:text-pink transition-colors group/toggle"
                                      >
                                        <span>Termine & Module {openDates[optionId] ? 'ausblenden' : 'anzeigen'}</span>
                                        <svg 
                                          width="12" height="12" viewBox="0 0 12 12" fill="none" 
                                          className={`transition-transform duration-300 ${openDates[optionId] ? 'rotate-180' : ''}`}
                                        >
                                          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                      </button>

                                      <motion.div 
                                        initial={false}
                                        animate={{ 
                                          height: openDates[optionId] ? "auto" : 0,
                                          opacity: openDates[optionId] ? 1 : 0
                                        }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                      >
                                        <div className="mt-4 bg-white/30 p-6 rounded-2xl border border-[#1c211e]/5">
                                          <div className="grid grid-cols-1 gap-y-2">
                                            {group.dates.map((d: any, idx: number) => (
                                              <div key={idx} className="grid grid-cols-[auto_1fr] items-center text-sm font-sans font-light group/date border-b border-[#1c211e]/5 last:border-0 py-2 gap-6">
                                                <span className="font-medium text-[#1c211e]/80 whitespace-nowrap min-w-[120px]">{d.date}</span>
                                                <span className="opacity-60 group-hover/date:opacity-100 transition-opacity text-right">
                                                  {(d.location || `Modul ${idx + 1}`).replace(/Wochenende/g, "WE")}
                                                </span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </motion.div>
                                    </div>
                                  )}

                                  {/* INSTALLMENT OPTION */}
                                  {hasInstallment && gIdx === 0 && (
                                    <div className="ml-10 md:ml-12">
                                      <label className="flex items-start gap-4 cursor-pointer group bg-pink/5 p-4 rounded-2xl border border-pink/10 hover:bg-pink/10 transition-colors">
                                        <div className="pt-0.5">
                                          <input 
                                            type="checkbox" 
                                            name="ratenzahlung" 
                                            value={`Ratenzahlung erwünscht für ${program.title}`}
                                            className="w-5 h-5 accent-pink" 
                                          />
                                        </div>
                                        <div className="flex-1">
                                          <div className="text-xs font-sans font-bold text-pink uppercase tracking-widest">Zusatzoption</div>
                                          <div className="text-sm font-sans font-bold text-[#1c211e] mt-0.5">
                                            {program.installment.text || "Individuelle Ratenzahlung nach Absprache möglich."}
                                          </div>
                                        </div>
                                      </label>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          });
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* --- BOX 2: PERSONAL DETAILS & MESSAGE --- */}
            <div className="bg-[#1c211e]/5 p-6 md:p-12 rounded-2xl md:rounded-[1.5rem] border border-[#1c211e]/5 shadow-sm space-y-16">
              {/* 1. MITTEILUNG */}
              <div className="space-y-8">
                <h3 className="text-2xl font-serif italic text-[#1c211e]/90 border-b border-[#1c211e]/10 pb-4">Mitteilung</h3>
                <div className="relative group">
                  <textarea 
                    name="mitteilung" 
                    rows={4} 
                    className="w-full bg-transparent border-b border-[#1c211e]/10 py-4 outline-none focus:border-pink transition-colors peer text-lg font-sans font-light resize-none" 
                    placeholder=" "
                  />
                  <label className="absolute left-0 top-4 text-[#1c211e]/40 text-lg font-sans font-light pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                    Noch Fragen?
                  </label>
                </div>
              </div>

            {/* 2. TEILNEHMERINFORMATIONEN */}
            <div className="space-y-12">
              <h3 className="text-2xl font-serif italic text-[#1c211e]/90">Teilnehmerinformationen</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative group">
                  <input type="text" name="vorname" required className="w-full bg-transparent border-b border-[#1c211e]/10 py-4 outline-none focus:border-pink transition-colors peer text-lg font-sans font-light" placeholder=" " />
                  <label className="absolute left-0 top-4 text-[#1c211e]/40 text-lg font-sans font-light pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Vorname <span className="text-pink">*</span></label>
                </div>
                <div className="relative group">
                  <input type="text" name="nachname" required className="w-full bg-transparent border-b border-[#1c211e]/10 py-4 outline-none focus:border-pink transition-colors peer text-lg font-sans font-light" placeholder=" " />
                  <label className="absolute left-0 top-4 text-[#1c211e]/40 text-lg font-sans font-light pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Nachname <span className="text-pink">*</span></label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4 relative group">
                  <input type="text" name="vorwahl" className="w-full bg-transparent border-b border-[#1c211e]/10 py-4 outline-none focus:border-pink transition-colors peer text-lg font-sans font-light" placeholder=" " />
                  <label className="absolute left-0 top-4 text-[#1c211e]/40 text-lg font-sans font-light pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Vorwahl</label>
                </div>
                <div className="md:col-span-8 relative group">
                  <input type="text" name="telefonnummer" className="w-full bg-transparent border-b border-[#1c211e]/10 py-4 outline-none focus:border-pink transition-colors peer text-lg font-sans font-light" placeholder=" " />
                  <label className="absolute left-0 top-4 text-[#1c211e]/40 text-lg font-sans font-light pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Telefonnummer</label>
                </div>
              </div>

              <div className="relative group w-full md:w-1/2">
                <input type="email" name="email" required className="w-full bg-transparent border-b border-[#1c211e]/10 py-4 outline-none focus:border-pink transition-colors peer text-lg font-sans font-light" placeholder=" " />
                <label className="absolute left-0 top-4 text-[#1c211e]/40 text-lg font-sans font-light pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">E-Mail Adresse <span className="text-pink">*</span></label>
              </div>
            </div>

            {/* 3. RECHNUNGSADRESSE */}
            <div className="space-y-12">
              <h3 className="text-2xl font-serif italic text-[#1c211e]/90">Rechnungsadresse</h3>
              <div className="space-y-12">
                <div className="relative group">
                  <input type="text" name="firmenname" className="w-full bg-transparent border-b border-[#1c211e]/10 py-4 outline-none focus:border-pink transition-colors peer text-lg font-sans font-light" placeholder=" " />
                  <label className="absolute left-0 top-4 text-[#1c211e]/40 text-lg font-sans font-light pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Firmenname</label>
                </div>
                <div className="relative group">
                  <input type="text" name="strasse" className="w-full bg-transparent border-b border-[#1c211e]/10 py-4 outline-none focus:border-pink transition-colors peer text-lg font-sans font-light" placeholder=" " />
                  <label className="absolute left-0 top-4 text-[#1c211e]/40 text-lg font-sans font-light pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Straße</label>
                </div>
                <div className="relative group">
                  <input type="text" name="stadt" className="w-full bg-transparent border-b border-[#1c211e]/10 py-4 outline-none focus:border-pink transition-colors peer text-lg font-sans font-light" placeholder=" " />
                  <label className="absolute left-0 top-4 text-[#1c211e]/40 text-lg font-sans font-light pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Stadt</label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="relative group">
                    <input type="text" name="plz" className="w-full bg-transparent border-b border-[#1c211e]/10 py-4 outline-none focus:border-pink transition-colors peer text-lg font-sans font-light" placeholder=" " />
                    <label className="absolute left-0 top-4 text-[#1c211e]/40 text-lg font-sans font-light pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">PLZ</label>
                  </div>
                  <div className="relative group">
                    <select name="land" className="w-full bg-transparent border-b border-[#1c211e]/10 py-4 outline-none focus:border-pink transition-colors peer text-lg font-sans font-light appearance-none text-[#1c211e]">
                      <option value="Deutschland">Deutschland</option>
                      <option value="Österreich">Österreich</option>
                      <option value="Schweiz">Schweiz</option>
                      <option value="Anderes">Anderes</option>
                    </select>
                    <label className="absolute left-0 -top-4 text-xs text-pink font-sans font-light">Land</label>
                    <div className="absolute right-0 top-4 pointer-events-none opacity-40 italic">▼</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. RECHTLICHES */}
            <div className="space-y-12">
              <h3 className="text-2xl font-serif italic text-[#1c211e]/90">Rechtliches</h3>
              
              <div className="space-y-10">
                {[
                  { id: "datenschutz_akzeptiert", label: "Datenschutzerklärung", content: pageData.legalDatenschutz },
                  { id: "teilnahme_akzeptiert", label: "Teilnahmebedingungen", content: pageData.legalTeilnahme },
                  { id: "verschwiegenheit_akzeptiert", label: "Verschwiegenheit", content: pageData.legalVerschwiegenheit },
                  { id: "ruecktritt_akzeptiert", label: "Rücktrittsbedingungen", content: pageData.legalRuecktritt }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="pt-1">
                      <input 
                        type="checkbox" 
                        required 
                        name={item.id} 
                        className="w-5 h-5 accent-pink cursor-pointer" 
                      />
                    </div>
                    <div>
                      <label className="text-[14px] font-serif italic capitalize tracking-widest text-pink font-bold block mb-2">{item.label} <span className="text-pink">*</span></label>
                      <div className="text-sm text-[#1c211e]/70 font-sans font-light leading-relaxed prose prose-sm prose-p:my-1">
                        {item.content && typeof item.content === 'object' ? (
                          <TinaMarkdown content={item.content} />
                        ) : (
                          <p>{typeof item.content === 'string' ? item.content : "Bitte im CMS eintragen."}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-[#f5f2eb]/50 border border-foreground/5 p-8 rounded-2xl md:rounded-[1.5rem] text-sm text-[#1c211e]/80 leading-relaxed font-sans font-light prose prose-sm prose-p:my-1 prose-strong:font-bold prose-strong:text-pink">
                  {pageData.bankDetails && typeof pageData.bankDetails === 'object' ? (
                    <TinaMarkdown content={pageData.bankDetails} />
                  ) : (
                    <p>{typeof pageData.bankDetails === 'string' ? pageData.bankDetails : "Bankdaten bitte im CMS eintragen."}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
              <button 
                type="submit"
                disabled={formState === "submitting" || selectedOptions.length === 0}
                className="w-full md:w-auto px-16 py-5 bg-[#1c211e] text-[#F5F2EB] rounded-full text-[14px] uppercase tracking-[0.3em] font-bold hover:bg-pink hover:text-white transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === "submitting" ? "WIRD GESENDET..." : "JETZT VERBINDLICH ANMELDEN"}
              </button>
              {selectedOptions.length === 0 && (
                <p className="text-[14px] text-pink mt-4 uppercase tracking-widest font-bold">Bitte wählen Sie oben mindestens ein Seminar aus.</p>
              )}
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
