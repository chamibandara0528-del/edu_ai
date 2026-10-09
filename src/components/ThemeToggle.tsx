import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const ThemeToggle = ({ theme, setTheme }: ThemeToggleProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="fixed top-6 right-6 z-[60] p-3 rounded-2xl liquid-glass border border-white/40 shadow-lg text-primary"
      title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </motion.button>
  );
};
