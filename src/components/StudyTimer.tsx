import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Pause, Play, RotateCcw, X, Coffee, Brain, Settings as SettingsIcon, Check } from 'lucide-react';

interface StudyTimerProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionComplete?: (type: 'study' | 'break') => void;
}

export const StudyTimer = ({ isOpen, onClose, onSessionComplete }: StudyTimerProps) => {
  const [studyDuration, setStudyDuration] = useState(() => Number(localStorage.getItem('np_timer_study')) || 25);
  const [breakDuration, setBreakDuration] = useState(() => Number(localStorage.getItem('np_timer_break')) || 5);
  
  const [mode, setMode] = useState<'study' | 'break'>('study');
  const [timeLeft, setTimeLeft] = useState((mode === 'study' ? studyDuration : breakDuration) * 60);
  const [isActive, setIsActive] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('np_timer_study', studyDuration.toString());
    localStorage.setItem('np_timer_break', breakDuration.toString());
  }, [studyDuration, breakDuration]);

  // Handle mode change effect when settings are saved or mode is toggled
  useEffect(() => {
    if (!isActive && !isSettingsOpen) {
      setTimeLeft((mode === 'study' ? studyDuration : breakDuration) * 60);
    }
  }, [studyDuration, breakDuration, mode, isSettingsOpen]);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      
      // Play notification sound
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(e => console.error("Sound play failed:", e));

      if (onSessionComplete) {
        onSessionComplete(mode);
      } else {
        if (mode === 'study') {
          alert('කාලය අවසන්! කුඩා විවේකයක් ගන්න. (Time is up! Take a short break.)');
        } else {
          alert('විවේකය අවසන්! නැවත ඉගෙනීම අරඹමු. (Break is over! Let\'s start studying again.)');
        }
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, onSessionComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft((mode === 'study' ? studyDuration : breakDuration) * 60);
  };

  const switchMode = (newMode: 'study' | 'break') => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft((newMode === 'study' ? studyDuration : breakDuration) * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalTime = (mode === 'study' ? studyDuration : breakDuration) * 60;
  const progress = timeLeft / totalTime;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed top-24 right-6 z-[70] w-80 liquid-glass rounded-[32px] p-6 shadow-2xl border border-white/40"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Timer className="text-primary" size={20} />
              <span className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-400">Study Timer</span>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`p-1.5 rounded-full transition-colors ${isSettingsOpen ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400'}`}
              >
                <SettingsIcon size={16} />
              </button>
              <button onClick={onClose} className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors">
                <X size={16} className="text-slate-400" />
              </button>
            </div>
          </div>

          {isSettingsOpen ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 mb-4"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Study Duration (Minutes)</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="range" 
                      min="1" 
                      max="120" 
                      value={studyDuration} 
                      onChange={(e) => setStudyDuration(Number(e.target.value))}
                      className="flex-1 accent-primary h-1.5 bg-slate-100 dark:bg-white/10 rounded-full appearance-none cursor-pointer"
                    />
                    <span className="w-8 text-center text-sm font-black text-primary">{studyDuration}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Break Duration (Minutes)</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="range" 
                      min="1" 
                      max="60" 
                      value={breakDuration} 
                      onChange={(e) => setBreakDuration(Number(e.target.value))}
                      className="flex-1 accent-secondary h-1.5 bg-slate-100 dark:bg-white/10 rounded-full appearance-none cursor-pointer"
                    />
                    <span className="w-8 text-center text-sm font-black text-secondary">{breakDuration}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="w-full py-3 bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-700 transition-all"
              >
                <Check size={16} /> Save & Return
              </button>
            </motion.div>
          ) : (
            <>
              <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-2xl mb-8">
                <button
                  onClick={() => switchMode('study')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                    mode === 'study' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Brain size={14} /> Study
                </button>
                <button
                  onClick={() => switchMode('break')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                    mode === 'break' ? 'bg-white dark:bg-slate-800 text-secondary shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Coffee size={14} /> Break
                </button>
              </div>

              <div className="relative flex flex-col items-center justify-center mb-8">
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="68"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-slate-100 dark:text-white/5"
                  />
                  <motion.circle
                    cx="72"
                    cy="72"
                    r="68"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 68}
                    animate={{ strokeDashoffset: 2 * Math.PI * 68 * (1 - progress) }}
                    className={mode === 'study' ? 'text-primary' : 'text-secondary'}
                    style={{ strokeLinecap: 'round' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-slate-800 dark:text-white tabular-nums tracking-tighter">
                    {formatTime(timeLeft)}
                  </span>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">
                    {mode === 'study' ? 'Studying' : 'Resting'}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={toggleTimer}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg ${
                    isActive 
                      ? 'bg-amber-100 text-amber-600 shadow-amber-200/50' 
                      : 'bg-primary text-white shadow-primary/30 active:scale-95'
                  }`}
                >
                  {isActive ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                  {isActive ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={resetTimer}
                  className="px-5 py-4 bg-slate-100 dark:bg-white/10 text-slate-500 rounded-2xl hover:bg-slate-200 transition-all active:scale-90"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
