import React, { createContext, useContext, useState, useEffect } from 'react';
import officialLogoImg from '../assets/images/wingwatchers_official_logo_1791614837114.jpg';

interface LogoContextType {
  logoUrl: string;
}

const STORAGE_KEY = 'wingwatchers_custom_club_logo';

const LogoContext = createContext<LogoContextType>({
  logoUrl: officialLogoImg,
});

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoUrl, setLogoUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved.startsWith('data:image/') || saved.startsWith('blob:'))) {
        return saved;
      }
    } catch {
      // ignore
    }
    return officialLogoImg;
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved.startsWith('data:image/') || saved.startsWith('blob:'))) {
        setLogoUrl(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <LogoContext.Provider value={{ logoUrl }}>
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = (): LogoContextType => {
  return useContext(LogoContext);
};
