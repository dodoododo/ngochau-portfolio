import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en } from "./en";
import { ja } from "./ja";
import { tr } from "./tr"; 
import { vi } from "./vi"; 

export type Locale = "en" | "ja" | "tr" | "vi";
export type Dict = typeof en;

const dicts: Record<Locale, Dict> = { en, ja, tr, vi };

interface Ctx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
}

const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("locale") : null;
    const initialLocale = (stored === "en" || stored === "ja" || stored === "tr" || stored === "vi") 
      ? (stored as Locale) 
      : "en";
      
    setLocaleState(initialLocale);
    
    // THÊM DÒNG NÀY: Cập nhật lang cho thẻ html khi load trang ban đầu
    if (typeof document !== "undefined") {
      document.documentElement.lang = initialLocale;
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", l);
      // THÊM DÒNG NÀY: Cập nhật lang cho thẻ html mỗi khi đổi ngôn ngữ
      document.documentElement.lang = l;
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: dicts[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}