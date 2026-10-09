import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Home, GraduationCap, Gamepad2, Settings, FileText, Bot, Edit3 } from 'lucide-react';

interface NavigationProps {
  appView: 'home' | 'subjects' | 'game' | 'profile' | 'learning' | 'pastpapers' | 'robot' | 'notes';
  navigateTo: (view: any) => void;
  onBack?: () => void;
  isStudyMode?: boolean;
}

export const Navigation = ({ appView, navigateTo, onBack, isStudyMode }: NavigationProps) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'මුල' },
    { id: 'subjects', icon: GraduationCap, label: 'පාඩම්' },
    { id: 'notes', icon: Edit3, label: 'සටහන්' },
    { id: 'pastpapers', icon: FileText, label: 'ප්‍රශ්න' },
    { id: 'robot', icon: Bot, label: 'රොබෝ' },
    { id: 'game', icon: Gamepad2, label: 'ක්‍රීඩා', hideInStudy: true },
    { id: 'profile', icon: Settings, label: 'සැකසුම්' }
  ];

  return (
    <motion.div 
      initial={{ y: 50, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      exit={{ y: 50, x: '-50%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed bottom-2.5 left-1/2 z-[100] w-[96%] max-w-md -translate-x-1/2 px-0.5 md:hidden"
    >
      <div className={`flex backdrop-blur-2xl border p-1 rounded-[22px] justify-between items-center transition-all duration-300 ${
        isStudyMode 
          ? 'bg-white/85 dark:bg-slate-950/90 border-slate-300 shadow-none' 
          : 'bg-white/95 dark:bg-slate-900/90 border-slate-200 dark:border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
      }`}>
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex flex-col items-center gap-0.5 px-1.5 sm:px-2 py-1 rounded-xl text-slate-500 dark:text-slate-400 hover:text-primary transition-all shrink-0"
          title="Back"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider">පසුපස</span>
        </button>

        <div className="w-[1px] h-6 bg-slate-200 dark:bg-white/10 mx-0.5" />

        {/* Regular Nav Items */}
        <div className="flex flex-1 justify-around items-center min-w-0 gap-0.5">
          {navItems.filter(item => !isStudyMode || !item.hideInStudy).map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id as any)}
              className={`flex flex-col items-center gap-0.5 px-1 sm:px-2 py-1 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                appView === item.id 
                  ? 'bg-primary text-white shadow-sm scale-105' 
                  : 'text-slate-700 dark:text-slate-400 hover:text-primary transition-all'
              }`}
            >
              <item.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${appView === item.id ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[7.5px] sm:text-[9px] font-black uppercase tracking-tight truncate w-full text-center">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
