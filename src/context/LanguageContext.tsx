import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import enTranslations from '../locales/en.json';
import siTranslations from '../locales/si.json';

type Language = 'en' | 'si';
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: { returnObjects?: boolean }) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const translations: Record<Language, any> = {
    en: enTranslations,
    si: siTranslations,
  };

  const t = (key: string, _options?: { returnObjects?: boolean }): any => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value === undefined) return key; // Fallback to key if part of chain is missing
      value = value[k];
    }
    return value || key; // Return resolved text or fallback to key if completely not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'si' ? 'font-sinhala' : 'font-english'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
