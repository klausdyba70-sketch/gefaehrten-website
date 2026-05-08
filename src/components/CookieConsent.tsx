"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-8 right-8 md:left-auto md:max-w-md z-[100]"
        >
          <div className="bg-[#1c211e] border border-white/10 p-8 rounded-xl shadow-2xl space-y-6">
            <div className="space-y-2">
              <h4 className="text-white font-serif italic text-xl">Datenschutz & Cookies</h4>
              <p className="text-white/60 text-xs leading-relaxed font-sans font-light">
                Wir nutzen Cookies, um die Website-Nutzung zu analysieren und dein Erlebnis zu verbessern. 
                Weitere Informationen findest du in unserer <Link href="/datenschutz" className="underline hover:text-pink transition-colors">Datenschutzerklärung</Link>.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={accept}
                className="flex-1 py-3 bg-[#F5F2EB] text-[#1c211e] text-[14px] uppercase tracking-widest font-bold rounded-full hover:bg-pink hover:text-white transition-all"
              >
                Akzeptieren
              </button>
              <button
                onClick={decline}
                className="flex-1 py-3 border border-white/20 text-white/60 text-[14px] uppercase tracking-widest font-bold rounded-full hover:bg-white/5 transition-all"
              >
                Ablehnen
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
