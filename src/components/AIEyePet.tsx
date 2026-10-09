import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Heart, Zap, Brain, Sparkles, Volume2, Cpu, Eye, Activity, Shield } from 'lucide-react';

interface AIEyePetProps {
  mood: 'happy' | 'thinking' | 'idle' | 'smart' | 'cool';
  message?: string;
  className?: string;
  isStudyMode?: boolean;
}

// Custom Synthesizer using Web Audio API for realistic retro robotic beep boops
export const playRoboSound = (type: 'happy' | 'thinking' | 'click' | 'tickle' | 'feed' | 'success') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'happy') {
      // Happy cute melody arpeggio
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.12);
      });
    } else if (type === 'thinking') {
      // Interactive robotic computing pitch whir
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(550, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'tickle') {
      // Adorably fast giggle beeps
      const notes = [987.77, 1174.66, 987.77, 1174.66, 1318.51]; 
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.04);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.04 + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.04);
        osc.stop(ctx.currentTime + idx * 0.04 + 0.06);
      });
    } else if (type === 'feed') {
      // Power charging surge
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.45);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } else if (type === 'success') {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);
        gain.gain.setValueAtTime(0.07, ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.05 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.05);
        osc.stop(ctx.currentTime + idx * 0.05 + 0.2);
      });
    }
  } catch (e) {
    console.warn("Audio Synthesizer is not supported/initialized:", e);
  }
};

// Procedural text to speech for Sinhalese / English with crystal-clear Google Translate TTS support
let currentAudio: HTMLAudioElement | null = null;
let currentSentenceIndex = 0;
let ttsSentences: string[] = [];

export const stopSpeaking = () => {
  if (currentAudio) {
    try {
      currentAudio.pause();
    } catch (e) {}
    currentAudio = null;
  }
  ttsSentences = [];
  currentSentenceIndex = 0;
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
};

export const speakAloud = (text: string) => {
  // Speech disabled for the robot
  return;
};

const fallbackToNative = (sentence: string) => {
  if (!('speechSynthesis' in window)) return;
  try {
    const utterance = new SpeechSynthesisUtterance(sentence);
    const voices = window.speechSynthesis.getVoices();
    // Try to find a Sinhala or high quality female/child voice
    const sinhalaVoice = voices.find(v => v.lang.includes('si') || v.lang.includes('SI'));
    if (sinhalaVoice) {
      utterance.voice = sinhalaVoice;
    } else {
      const englishVoice = voices.find(v => v.lang.includes('en-GB') || v.lang.includes('en-US'));
      if (englishVoice) utterance.voice = englishVoice;
    }
    
    utterance.pitch = 1.35; // Cute friendly pitch
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn("Native speech synthesis failed:", err);
  }
};

export const AIEyePet: React.FC<AIEyePetProps> = ({ mood, message, className = "", isStudyMode = false }) => {
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [batteryLevel, setBatteryLevel] = useState(99);

  // Mouse cursor gaze tracking to make the robot's eyes follow the cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8; // max 4px offset
      const y = (e.clientY / window.innerHeight - 0.5) * 6; // max 3px offset
      setGaze({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Trigger synthesizer beep automatically when mood changes
  useEffect(() => {
    if (mood === 'happy') playRoboSound('happy');
    else if (mood === 'thinking') playRoboSound('thinking');
    else playRoboSound('click');
    
    setBatteryLevel(prev => Math.max(85, prev - 1 + Math.floor(Math.random() * 2)));
  }, [mood]);

  const handlePetClick = () => {
    playRoboSound('tickle');
    const newSparkles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100
    }));
    setSparkles(prev => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
    }, 1000);
  };

  const getThemeColorClass = () => {
    if (isStudyMode) return 'bg-cyan-400 shadow-cyan-400/50 text-cyan-400';
    switch (mood) {
      case 'happy': return 'bg-cyan-400 shadow-cyan-500/50 text-cyan-400';
      case 'thinking': return 'bg-indigo-400 shadow-indigo-500/50 text-indigo-400';
      case 'smart': return 'bg-teal-400 shadow-teal-500/50 text-teal-400';
      case 'cool': return 'bg-sky-400 shadow-sky-500/50 text-sky-400';
      case 'idle':
      default:
        return 'bg-cyan-400 shadow-cyan-500/50 text-cyan-400';
    }
  };

  const getThemeHex = () => {
    if (isStudyMode) return '#22d3ee'; // cyan
    switch (mood) {
      case 'happy': return '#22d3ee'; // cyan
      case 'thinking': return '#818cf8'; // indigo
      case 'smart': return '#14b8a6'; // teal
      case 'cool': return '#38bdf8'; // sky blue
      case 'idle':
      default:
        return '#06b6d4'; // cyan-500
    }
  };

  // 3D Expressive Left Eye Shape
  const getLeftEyeAnimate = () => {
    switch (mood) {
      case 'happy':
        return {
          height: 12,
          width: 24,
          borderRadius: "24px 24px 4px 4px",
          rotate: -6,
          scaleY: [1, 0.7, 1.1, 1],
          y: [0, -1, 1, 0]
        };
      case 'thinking':
        return {
          height: [18, 3, 18],
          width: 18,
          borderRadius: "8px",
          rotate: 0,
          scaleY: 1,
          y: 2
        };
      case 'smart':
        return {
          height: 24,
          width: 24,
          borderRadius: "50%",
          rotate: 0,
          scaleY: [1, 1.1, 1],
          y: 0
        };
      case 'cool':
        return {
          height: 10,
          width: 26,
          borderRadius: "4px",
          rotate: 6,
          scaleY: 1,
          y: 1
        };
      case 'idle':
      default:
        return {
          height: 18,
          width: 18,
          borderRadius: "50%",
          rotate: 0,
          scaleY: [1, 0.1, 1, 1], // Blink cycle
          y: 0
        };
    }
  };

  // 3D Expressive Right Eye Shape
  const getRightEyeAnimate = () => {
    switch (mood) {
      case 'happy':
        return {
          height: 12,
          width: 24,
          borderRadius: "24px 24px 4px 4px",
          rotate: 6,
          scaleY: [1, 0.7, 1.1, 1],
          y: [0, -1, 1, 0]
        };
      case 'thinking':
        return {
          height: [18, 3, 18],
          width: 18,
          borderRadius: "8px",
          rotate: 0,
          scaleY: 1,
          y: 2
        };
      case 'smart':
        return {
          height: 24,
          width: 24,
          borderRadius: "50%",
          rotate: 0,
          scaleY: [1, 1.1, 1],
          y: 0
        };
      case 'cool':
        return {
          height: 10,
          width: 26,
          borderRadius: "4px",
          rotate: -6,
          scaleY: 1,
          y: 1
        };
      case 'idle':
      default:
        return {
          height: 18,
          width: 18,
          borderRadius: "50%",
          rotate: 0,
          scaleY: [1, 0.1, 1, 1], // Blink cycle
          y: 0
        };
    }
  };

  // Cute futuristic mouth styling
  const getMouthAnimate = () => {
    switch (mood) {
      case 'happy':
        return {
          width: 24,
          height: 10,
          borderRadius: "0px 0px 16px 16px",
          borderWidth: "0px 0px 3px 0px",
          borderColor: getThemeHex(),
          backgroundColor: `${getThemeHex()}20`,
          scale: [1, 1.1, 1],
        };
      case 'thinking':
        return {
          width: 12,
          height: 3,
          borderRadius: "9999px",
          borderWidth: "0px",
          backgroundColor: getThemeHex(),
          scale: 1,
        };
      case 'smart':
        return {
          width: 16,
          height: 10,
          borderRadius: "50%",
          borderWidth: "2px",
          borderColor: getThemeHex(),
          backgroundColor: `${getThemeHex()}15`,
          scale: [1, 1.05, 1],
        };
      case 'cool':
        return {
          width: 20,
          height: 6,
          borderRadius: "0px 0px 12px 1px",
          borderWidth: "0px 0px 3px 0.5px",
          borderColor: getThemeHex(),
          scale: 1,
        };
      case 'idle':
      default:
        return {
          width: 16,
          height: 3,
          borderRadius: "9999px",
          borderWidth: "0px",
          backgroundColor: getThemeHex(),
          scale: 1,
        };
    }
  };

  return (
    <div className={`relative flex flex-col items-center group ${className}`}>
      {/* Sparkle Particles on Interaction */}
      <AnimatePresence>
        {sparkles.map(sp => (
          <motion.div
            key={sp.id}
            initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1.6, x: sp.x, y: sp.y - 70 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute pointer-events-none z-30 text-teal-400"
          >
            <Sparkles size={18} className="fill-teal-300" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating Dialogue Bubble */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            className="absolute bottom-full mb-8 z-30"
          >
            <div className="relative bg-slate-900/90 dark:bg-slate-950/95 p-4 rounded-3xl shadow-2xl border border-teal-500/30 max-w-[220px] backdrop-blur-md">
              <p className="text-xs font-bold text-teal-100 leading-relaxed text-center">
                {message}
              </p>
              {/* Triangle pointer */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-slate-900/90 dark:border-t-slate-950/95" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Realistically floating spherical robot body */}
      <motion.div 
        animate={{ 
          y: mood === 'thinking' ? [0, -3, 0] : [0, -10, 0],
          rotate: mood === 'happy' ? [-4, -2, -6, -4] : [-4, -5, -3, -4] // Adorable slight head tilt requested!
        }}
        transition={{ 
          repeat: Infinity, 
          duration: mood === 'thinking' ? 2.0 : 3.2,
          ease: "easeInOut" 
        }}
        className="relative cursor-pointer select-none"
        onClick={handlePetClick}
      >
        {/* Soft Ambient Inner Glow */}
        <div className={`absolute inset-4 blur-2xl rounded-full opacity-30 transition-all duration-500 ${
          isStudyMode ? 'bg-cyan-400' : (mood === 'thinking' ? 'bg-indigo-500' : mood === 'happy' ? 'bg-teal-400' : 'bg-cyan-400')
        }`} />

        {/* 3D Sleek Antenna */}
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-0">
          {/* Tapered metallic stem */}
          <div className="w-[4px] h-10 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 rounded-full shadow-inner" />
          {/* Glowing LED Tip */}
          <motion.div 
            animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-3 h-3 rounded-full bg-cyan-400 absolute -top-2.5 shadow-[0_0_14px_rgba(34,211,238,1)]" 
          />
        </div>

        {/* Left Side Trim / Join Pod (Matte Pastel Blue & Teal Accents) */}
        <div className="absolute top-[40%] -left-3 w-4 h-12 rounded-l-full bg-gradient-to-b from-teal-400 via-sky-400 to-indigo-500 shadow-md border-r border-teal-500/20" />

        {/* Left Floating Hand Pod */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          className="absolute top-[45%] -left-10 w-6 h-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-300 shadow-lg border border-white/50 flex items-center justify-center"
        >
          <div className="w-2 h-2 rounded-full bg-teal-400 shadow-inner" />
        </motion.div>

        {/* Right Side Trim / Join Pod (Matte Pastel Blue & Teal Accents) */}
        <div className="absolute top-[40%] -right-3 w-4 h-12 rounded-r-full bg-gradient-to-b from-teal-400 via-sky-400 to-indigo-500 shadow-md border-l border-teal-500/20" />

        {/* Welcoming Waving Arm (Welcoming "hello" gesture) */}
        <motion.div
          animate={{ 
            rotate: [12, 38, 12, 38, 12],
            y: [0, -2, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2.5, 
            ease: "easeInOut" 
          }}
          className="absolute top-[35%] -right-11 origin-left pointer-events-none z-10"
        >
          {/* Forearm and cute hand waving hello */}
          <div className="w-9 h-4.5 rounded-full bg-gradient-to-r from-teal-400 to-sky-400 border border-white/20 shadow-lg flex items-center justify-end px-1 relative">
            <div className="w-3 h-3 rounded-full bg-white shadow-inner flex items-center justify-center">
              <span className="text-[6px]">👋</span>
            </div>
          </div>
        </motion.div>

        {/* Main Spherical Body: Pearlescent White Material */}
        <div className="relative w-44 h-44 rounded-full bg-gradient-to-tr from-slate-200 via-white to-slate-50 border border-white/60 flex flex-col items-center justify-center p-4 overflow-hidden shadow-[0_20px_45px_rgba(15,23,42,0.18),inset_0_-8px_20px_rgba(15,23,42,0.08),inset_0_10px_20px_rgba(255,255,255,0.95)]">
          
          {/* Pearlescent Gloss Highlight Arc */}
          <div className="absolute top-2 inset-x-4 h-12 bg-gradient-to-b from-white/80 via-white/20 to-transparent rounded-t-full pointer-events-none" />
          
          {/* High-Tech Sub-trim overlay line */}
          <div className="absolute bottom-5 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />

          {/* Realistic Visor Faceplate Screen */}
          <div className="relative w-32 h-22 rounded-[36px] bg-slate-950 border-[3px] border-slate-800/80 flex flex-col items-center justify-between py-3 px-3 overflow-hidden shadow-[inset_0_5px_15px_rgba(0,0,0,0.9),0_2px_4px_rgba(255,255,255,0.1)]">
            
            {/* Gloss Reflection overlay */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/8 to-transparent pointer-events-none rounded-t-[30px]" />
            
            {/* High-tech Grid Background */}
            <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:8px_8px]" />

            {/* Top HUD Stats Panel */}
            <div className="w-full flex items-center justify-between text-[7px] font-mono font-bold text-teal-400/80 px-1 relative z-10 select-none">
              <div className="flex items-center gap-0.5">
                <span className="w-1 h-1 rounded-full bg-teal-400 animate-ping mr-1" />
                <span>{mood.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-1 bg-white/5 px-1 py-0.2 rounded-xs">
                <span>{batteryLevel}%</span>
                <div className="w-3.5 h-1.5 border border-teal-500/40 rounded-2xs relative flex items-center">
                  <div 
                    className="h-full bg-teal-400 rounded-3xs" 
                    style={{ width: `${(batteryLevel / 100) * 100}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Glowing Expressive Eyes */}
            <div className="flex items-center justify-center gap-6 mt-1 flex-1 w-full relative z-10">
              {/* LEFT EYE */}
              <div className="relative">
                <motion.div 
                  animate={getLeftEyeAnimate()}
                  style={{
                    boxShadow: `0 0 16px ${getThemeHex()}`
                  }}
                  className={`relative flex items-center justify-center p-[2px] transition-all duration-500 ${getThemeColorClass()}`}
                >
                  <motion.div 
                    animate={{ x: gaze.x, y: gaze.y }}
                    transition={{ type: 'spring', damping: 15, stiffness: 180 }}
                    className="w-full h-full bg-slate-950 border border-white/20 rounded-inherit overflow-hidden relative flex items-center justify-center"
                  >
                     <motion.div 
                        animate={{ opacity: [0.15, 0.35, 0.15] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-white"
                     />
                     <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full blur-[0.1px] z-10" />
                  </motion.div>
                </motion.div>
              </div>

              {/* RIGHT EYE */}
              <div className="relative">
                <motion.div 
                  animate={getRightEyeAnimate()}
                  style={{
                    boxShadow: `0 0 16px ${getThemeHex()}`
                  }}
                  className={`relative flex items-center justify-center p-[2px] transition-all duration-500 ${getThemeColorClass()}`}
                >
                  <motion.div 
                    animate={{ x: gaze.x, y: gaze.y }}
                    transition={{ type: 'spring', damping: 15, stiffness: 180 }}
                    className="w-full h-full bg-slate-950 border border-white/20 rounded-inherit overflow-hidden relative flex items-center justify-center"
                  >
                     <motion.div 
                        animate={{ opacity: [0.15, 0.35, 0.15] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                        className="absolute inset-0 bg-white"
                     />
                     <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full blur-[0.1px] z-10" />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Glowing cheek blushes */}
            <div className="absolute inset-x-4 top-13 flex justify-between pointer-events-none z-10 opacity-50">
              <div className="w-3.5 h-2 bg-teal-400 rounded-full blur-[2.5px]" />
              <div className="w-3.5 h-2 bg-teal-400 rounded-full blur-[2.5px]" />
            </div>

            {/* Neon Smiling mouth */}
            <div className="h-5 flex items-center justify-center mb-0.5 shrink-0 z-10">
              <motion.div
                animate={getMouthAnimate()}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut"
                }}
                style={{
                  borderStyle: "solid",
                  boxShadow: `0 0 10px ${getThemeHex()}50`
                }}
                className="transition-colors duration-500"
              />
            </div>

          </div>
        </div>
      </motion.div>

      {/* Realistic Interactive 3D Ground Drop Shadow */}
      <motion.div 
        animate={{ 
          scale: mood === 'thinking' ? [1, 1.05, 1] : [1, 1.15, 1],
          opacity: mood === 'thinking' ? [0.3, 0.2, 0.3] : [0.3, 0.16, 0.3]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: mood === 'thinking' ? 2.0 : 3.2,
          ease: "easeInOut" 
        }}
        className="w-28 h-2.5 bg-slate-950/45 blur-[5px] rounded-full mt-3 mx-auto pointer-events-none"
      />

      {/* Decorative Interactive Micro LEDs */}
      <div className="mt-3 flex gap-1.5 bg-slate-900/30 px-3 py-1.5 rounded-full border border-white/5 shadow-inner">
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }} 
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_6px_#14b8a6]" 
        />
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }} 
          transition={{ repeat: Infinity, duration: 1.6, delay: 0.5 }}
          className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] opacity-80" 
        />
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }} 
          transition={{ repeat: Infinity, duration: 1.6, delay: 1.0 }}
          className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_#818cf8] opacity-60" 
        />
      </div>
    </div>
  );
};

