import { useState, useEffect, useRef } from "react";
import { useLocale } from "@/content/i18n";
import { motion, AnimatePresence } from "framer-motion";

export function Header({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const { t, locale, setLocale } = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 1. Khởi tạo ref để bắt sự kiện click bên ngoài
  const headerRef = useRef<HTMLElement>(null);

  // Khai báo lại mảng navItems bị thiếu
  const navItems = [
    { id: "intro", label: t.nav.introduction },
    { id: "personal", label: t.nav.personal },
    { id: "projects", label: t.nav.projects },
    { id: "skills", label: t.nav.skills },
    { id: "achievements", label: t.nav.achievements },
    { id: "contact", label: t.nav.contact },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false); 
  };

  // 2. Lắng nghe sự kiện click bên ngoài Header
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header 
      ref={headerRef} 
      className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b border-card-border/60 bg-white/50 px-6 backdrop-blur-3xl md:h-20 md:px-10"
    >
      
      {/* Wordmark */}
      <button 
        onClick={() => handleTabClick("intro")} 
        className="font-display md:text-2xl text-2xl font-extrabold tracking-tighter hover:text-ink z-10"
      >
        {t.meta.wordmark}
        <span className="text-accent">.</span>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-7 text-[18px] uppercase tracking-[0.18em] lg:flex">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`relative py-2 transition-colors duration-300 ${
              activeTab === item.id
                ? "text-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            <span>{item.label}</span>

            {activeTab === item.id && (
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-accent" />
            )}
          </button>
        ))}
      </nav>
      
      {/* Right Side: Lang Switcher & Mobile Menu Toggle */}
      <div className="flex items-center gap-3 z-10">
        
        {/* Language Switcher */}
        <div className="relative flex items-center gap-1 md:gap-1 rounded-full border border-slate-600/40 p-1 bg-bg-base text-[10px] sm:text-[12px] md:text-[13px] font-bold shrink min-w-0">
          {[
            { id: "en", label: "EN" },
            { id: "ja", label: "日本語" },
            { id: "tr", label: "Türkçe" },
            { id: "vi", label: "VI" },
          ].map((lang) => (
            <button
              key={lang.id}
              onClick={() => setLocale(lang.id as "en" | "ja" | "tr" | "vi")}
              className={`relative flex flex-1 items-center justify-center rounded-full py-1.5 px-2 sm:px-3 md:px-4 transition-colors duration-300 min-w-0 ${
                locale === lang.id ? "text-bg-base" : "text-ink/50 hover:text-ink"
              }`}
            >
              {locale === lang.id && (
                <motion.div
                  layoutId="active-locale-pill"
                  className="absolute inset-0 rounded-full bg-ink shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              
              <span className="relative z-10 whitespace-nowrap">{lang.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button 
          className=" text-ink lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full w-full border-b border-card-border/60 bg-bg-base px-6 py-6 shadow-lg lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`text-left text-sm uppercase tracking-[0.18em] transition-colors duration-300 ${
                    activeTab === item.id ? "font-bold text-black" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}