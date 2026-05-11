"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface NavbarProps {
  navLinks: any[];
  settings: any;
}

export default function Navbar({ navLinks, settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[120] transition-all duration-500 py-4 md:py-6 px-4 md:px-12 flex justify-between items-center ${scrolled ? 'bg-[#1c211e]/80 backdrop-blur-md border-b border-white/5 py-3 md:py-4' : 'bg-transparent'}`}>
        <Link href="/" className="flex flex-col items-start hover:opacity-80 transition-opacity z-[110]">
          <span className="text-lg font-sans font-bold tracking-[0.2em] text-white">GEFÄHRTEN</span>
          <span className="text-[10px] font-serif italic tracking-[0.25em] text-white/60 -mt-1 uppercase">Traumainstitut</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex gap-8 text-[13px] font-medium uppercase tracking-[0.15em] text-white/90 items-center">
          {navLinks.map((link, idx) => (
            <div key={idx} className="relative group h-full flex items-center">
              {link.subLinks && link.subLinks.length > 0 ? (
                <div className="hover:text-pink transition-colors flex items-center gap-1 cursor-default">
                  {link.label}
                  <span className="text-[7px] opacity-40">▼</span>
                </div>
              ) : (
                <Link href={link.url} className="hover:text-pink transition-colors flex items-center gap-1">
                  {link.label}
                </Link>
              )}
              
              {link.subLinks && link.subLinks.length > 0 && (
                <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-[#1c211e]/95 backdrop-blur-xl py-6 px-2 space-y-4 w-max min-w-[200px] shadow-2xl border border-white/5 rounded-xl">
                    {link.subLinks.map((sub: any, sIdx: number) => (
                      <Link 
                        key={sIdx} 
                        href={sub.url} 
                        className="block hover:text-pink transition-colors px-4 text-[12px] tracking-widest border-l border-transparent hover:border-pink"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <span className="w-px h-4 bg-white/20 mx-2" />
          
          <Link href="/anmelden" className="px-6 py-2 border border-white/30 hover:bg-pink hover:border-pink hover:text-white transition-all rounded-full text-[11px] font-bold">
            JETZT ANMELDEN
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="xl:hidden relative z-[110] w-12 h-12 flex flex-col items-center justify-center gap-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <motion.span 
            animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-[2px] bg-white rounded-full block" 
          />
          <motion.span 
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-8 h-[2px] bg-white rounded-full block" 
          />
          <motion.span 
            animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-[2px] bg-white rounded-full block" 
          />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-[#1c211e] z-[105] flex flex-col pt-24 md:pt-32 px-6 md:px-10 overflow-y-auto"
          >
            <div className="flex flex-col space-y-8">
              {navLinks.map((link, idx) => {
                const label = link.label.toLowerCase();
                const isSecondary = label.includes("haltung") || 
                                   label.includes("ansatz") || 
                                   label.includes("kontakt") || 
                                   label.includes("über");
                
                const isVertiefungs = label.includes("vertiefungsseminare");
                
                return (
                  <div key={idx} className={isSecondary ? "space-y-4 pt-6 border-t border-white/5" : "space-y-4"}>
                    {link.subLinks && link.subLinks.length > 0 ? (
                      <div className={`${isSecondary ? "text-lg md:text-xl" : "text-3xl md:text-5xl"} font-serif italic text-white/90 hover:text-pink transition-colors block cursor-default`}>
                        {link.label}
                      </div>
                    ) : (
                      <Link 
                        href={link.url}
                        className={`${isSecondary ? "text-lg md:text-xl" : "text-3xl md:text-5xl"} font-serif italic text-white/90 hover:text-pink transition-colors block`}
                      >
                        {link.label}
                      </Link>
                    )}
                    
                    {link.subLinks && link.subLinks.length > 0 && (
                      <div className={`pl-6 ${isSecondary ? "space-y-3" : "space-y-5"} border-l border-white/5`}>
                        {link.subLinks.map((sub: any, sIdx: number) => (
                          <Link 
                            key={sIdx} 
                            href={sub.url} 
                            className={`${isSecondary ? "text-xs md:text-sm font-light text-white/40" : (isVertiefungs ? "text-lg md:text-2xl font-sans" : "text-lg md:text-2xl font-serif italic")} text-white/90 hover:text-pink transition-colors block`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              
              <div className="pt-12 pb-20">
                <Link 
                  href="/anmelden" 
                  className="w-full block py-5 bg-pink text-white text-center rounded-xl text-xs font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-pink transition-all shadow-lg"
                >
                  JETZT ANMELDEN
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
