
import React, { createContext, useContext, useState, useEffect } from 'react';
import { serverConfig } from '@/config/serverConfig';

type Theme = 'golden' | 'war';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  heroBackground: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(serverConfig.theme.current as Theme);

  const toggleTheme = () => {
    // Theme is controlled by config only
    return;
  };

  const heroBackground = serverConfig.theme.heroBackground[theme];

  useEffect(() => {
    // Apply theme classes to document
    document.documentElement.className = theme === 'war' ? 'theme-war' : 'theme-golden';
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, heroBackground }}>
      {children}
    </ThemeContext.Provider>
  );
};
