"use client";

import { motion } from "framer-motion";
import { siteSettings } from "@/data/settings";

export default function NewsletterSection() {
  return (
    <section className="w-full py-24 bg-[#1c211e] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-pink/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 max-w-2xl"
        >
          <div className="text-pink text-[14px] uppercase tracking-[0.6em] font-bold">bleib verbunden</div>
          <h2 className="text-4xl md:text-5xl font-serif italic text-[#F5F2EB]">Newsletter</h2>
          <p className="text-lg font-sans font-light text-white/60 leading-relaxed">
            Melde dich für unseren Newsletter an und erhalte regelmäßig Impulse zu traumasicherer Begleitung, Haltung und neuen Terminen.
          </p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          action={siteSettings.mailchimpUrl}
          method="POST"
          target="_blank"
          className="mt-12 w-full max-w-md flex flex-col sm:flex-row gap-4"
        >
          <input 
            type="email" 
            name="EMAIL"
            placeholder="Deine E-Mail Adresse"
            required
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-4 text-white text-lg font-sans font-light outline-none focus:border-pink transition-all"
          />
          <button 
            type="submit"
            className="px-10 py-4 bg-pink text-white rounded-full text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-[#1c211e] transition-all shadow-xl"
          >
            ANMELDEN
          </button>
        </motion.form>
        
        <p className="mt-8 text-[14px] uppercase tracking-widest text-white/20">
          Abmeldung jederzeit möglich. <a href="/datenschutz" className="underline hover:text-pink">Datenschutz</a>
        </p>
      </div>
    </section>
  );
}
