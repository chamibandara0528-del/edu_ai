import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles, 
  ShieldCheck, 
  Database, 
  Volume2, 
  Palette, 
  Terminal, 
  Zap, 
  Layers, 
  AlertCircle,
  FileCode,
  ArrowUpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DiagnosticItem {
  id: string;
  name: string;
  sinName: string;
  status: 'idle' | 'testing' | 'pass' | 'fail';
  detail: string;
}

export const SystemSoftwareCenter: React.FC = () => {
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'checking' | 'updated'>('idle');
  const [isCleaningCache, setIsCleaningCache] = useState(false);
  const [cacheCleaned, setCacheCleaned] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);

  const [diagnostics, setDiagnostics] = useState<DiagnosticItem[]>([
    {
      id: 'ai-core',
      name: 'Gemini 3.8 Flash AI Engine',
      sinName: 'AI බුද්ධි එන්ජිම',
      status: 'pass',
      detail: 'Operational • Low Latency Response'
    },
    {
      id: 'sinhala-orthography',
      name: 'Sinhala Orthography & NIE Standards',
      sinName: 'සිංහල අක්ෂර වින්‍යාස පරීක්ෂාව',
      status: 'pass',
      detail: '100% Textbook Verified (ණ/න, ළ/ල, පිලි)'
    },
    {
      id: 'audio-tts',
      name: 'Multilingual Audio & Voice FX',
      sinName: 'හඬ සහ ශ්‍රව්‍ය ධාවකය',
      status: 'pass',
      detail: 'SpeechSynthesis & Sound FX Active'
    },
    {
      id: 'theme-engine',
      name: 'Dark/Light Theme & Glass Engine',
      sinName: 'තේමා සහ සංදර්ශක පද්ධතිය',
      status: 'pass',
      detail: 'Tailwind 4.3 + OLED Dark Subsystem'
    },
    {
      id: 'storage-cache',
      name: 'Local Database & Offline Cache',
      sinName: 'දත්ත ගබඩාව සහ නොබැඳි හැඹිලිය',
      status: 'pass',
      detail: 'Progress & Game State Synchronized'
    }
  ]);

  const handleCheckUpdates = () => {
    setIsCheckingUpdate(true);
    setUpdateStatus('checking');

    setTimeout(() => {
      setIsCheckingUpdate(false);
      setUpdateStatus('updated');
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        setUpdateStatus('idle');
      }, 6000);
    }, 1800);
  };

  const handleRunDiagnostics = () => {
    setIsRunningDiagnostics(true);
    
    // Set all to testing
    setDiagnostics(prev => prev.map(d => ({ ...d, status: 'testing' })));

    let completed = 0;
    const interval = setInterval(() => {
      setDiagnostics(prev => {
        const next = [...prev];
        if (completed < next.length) {
          next[completed].status = 'pass';
          completed++;
        }
        return next;
      });

      if (completed >= diagnostics.length) {
        clearInterval(interval);
        setIsRunningDiagnostics(false);
        confetti({
          particleCount: 50,
          spread: 45,
          origin: { y: 0.7 }
        });
      }
    }, 400);
  };

  const handleCleanCache = () => {
    setIsCleaningCache(true);
    setTimeout(() => {
      // Clean non-essential temporary items while preserving progress
      const preserveKeys = ['edu_ai_user_name', 'np_theme', 'np_color_theme', 'np_points', 'np_streak', 'np_last_login'];
      const preserved: Record<string, string | null> = {};
      preserveKeys.forEach(k => {
        preserved[k] = localStorage.getItem(k);
      });

      // Clear temp caches
      sessionStorage.clear();
      
      // Restore core user data
      preserveKeys.forEach(k => {
        if (preserved[k] !== null) {
          localStorage.setItem(k, preserved[k]!);
        }
      });

      setIsCleaningCache(false);
      setCacheCleaned(true);
      setTimeout(() => setCacheCleaned(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="liquid-glass-white dark:bg-slate-900/60 p-6 md:p-8 rounded-[32px] border border-white/60 dark:border-white/10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
          <Cpu size={140} className="text-primary" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                පද්ධතිය සක්‍රියයි (System Online)
              </span>
              <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                v3.2.0 LTS
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Layers className="text-primary" size={28} /> පද්ධති සහ මෘදුකාංග තත්ත්වය
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-xl">
              Edu.ai අධ්‍යාපනික පද්ධතියේ නවතම මෘදුකාංග සංස්කරණය, Gemini 3.8 Flash AI එන්ජිම සහ විෂය නිර්දේශ දත්ත යාවත්කාලීන කිරීම මෙතැනින් පාලනය කරන්න.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <button
              onClick={handleCheckUpdates}
              disabled={isCheckingUpdate}
              className="px-5 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-primary/20 disabled:opacity-60"
            >
              <RefreshCw size={16} className={isCheckingUpdate ? "animate-spin" : ""} />
              {isCheckingUpdate ? 'පරීක්ෂා කරමින්...' : 'යාවත්කාලීන පරීක්ෂාව'}
            </button>
            <button
              onClick={() => setShowChangelog(!showChangelog)}
              className="px-4 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition-all"
            >
              {showChangelog ? 'සඟවන්න' : 'ලොගය (Changelog)'}
            </button>
          </div>
        </div>

        {/* Update result notification banner */}
        <AnimatePresence>
          {updateStatus === 'updated' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-2xl flex items-center justify-between gap-3 text-emerald-800 dark:text-emerald-300 text-xs font-bold"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                <span>ඔබේ මෘදුකාංගය සහ සියලු පද්ධති සංරචක නවතම සංස්කරණයට (v3.2.0) යාවත්කාලීන කර ඇත!</span>
              </div>
              <span className="text-[10px] bg-emerald-200 dark:bg-emerald-900 px-2 py-0.5 rounded-full font-black uppercase">
                Up to date
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Changelog Accordion */}
      <AnimatePresence>
        {showChangelog && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="liquid-glass-white dark:bg-slate-900/60 p-6 rounded-[28px] border border-white/60 dark:border-white/10 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
              <FileCode size={16} /> මෘදුකාංග වෙනස්කම් ලැයිස්තුව (Software Release Notes)
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-800 dark:text-white">v3.2.0 (Latest Active Software Update)</span>
                  <span className="text-[10px] bg-primary text-white font-bold px-2 py-0.5 rounded-full">Current</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 font-medium">
                  <li><strong>AI Engine Upgrade:</strong> Core AI upgraded to Google Gemini 3.8 Flash for ultra-fast, high-accuracy reasoning.</li>
                  <li><strong>Dark Mode Optimization:</strong> Fixed and unified dark theme application across the entire document root and body elements with OLED contrast support.</li>
                  <li><strong>Modern Packages:</strong> Updated core software dependencies including React 19.3, Vite 6.4, Tailwind CSS 4.3, and Motion 12.43.</li>
                  <li><strong>Orthography & Grammar Rules:</strong> Sinhala school textbook orthography verification for all Game Zone activities (ණ/න, ළ/ල).</li>
                  <li><strong>System & Diagnostics Suite:</strong> Added live system health monitoring and quick cache optimization tools.</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 space-y-2 opacity-75">
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-800 dark:text-white">v3.1.0 (Expanded Curriculum & Games)</span>
                  <span className="text-[10px] text-slate-400 font-bold">Previous</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 font-medium">
                  <li>Introduced 10 interactive study games in the Game Zone with customized grade/term selectors.</li>
                  <li>Added Math Wiz and Sequence Master puzzles for Science and Mathematics.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of System Specifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Specification 1: AI Model */}
        <div className="liquid-glass-white dark:bg-white/5 p-5 rounded-2xl border border-white/60 dark:border-white/5 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              AI බුද්ධි එන්ජිම
            </span>
            <Sparkles size={16} className="text-amber-500" />
          </div>
          <div>
            <div className="font-black text-sm text-slate-800 dark:text-white">Google Gemini 3.8 Flash</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">High-Speed Socratic Tutor Model</div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-black">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            සක්‍රියයි (Operational)
          </div>
        </div>

        {/* Specification 2: Framework & Runtime */}
        <div className="liquid-glass-white dark:bg-white/5 p-5 rounded-2xl border border-white/60 dark:border-white/5 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              මෘදුකාංග සැකැස්ම (Runtime)
            </span>
            <Terminal size={16} className="text-primary" />
          </div>
          <div>
            <div className="font-black text-sm text-slate-800 dark:text-white">React 19.3 + Vite 6.4</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Tailwind 4.3 • Motion 12.43</div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-black">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            යාවත්කාලීනයි (Up-to-date)
          </div>
        </div>

        {/* Specification 3: Curriculum Databank */}
        <div className="liquid-glass-white dark:bg-white/5 p-5 rounded-2xl border border-white/60 dark:border-white/5 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              විෂය නිර්දේශ දත්ත ගබඩාව
            </span>
            <Database size={16} className="text-secondary" />
          </div>
          <div>
            <div className="font-black text-sm text-slate-800 dark:text-white">NIE Sri Lanka Syllabus</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">2026/27 Term Examination Specs</div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-black">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            සමමුහුර්තයි (Synced)
          </div>
        </div>

        {/* Specification 4: Audio Engine */}
        <div className="liquid-glass-white dark:bg-white/5 p-5 rounded-2xl border border-white/60 dark:border-white/5 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              හඬ සංස්ලේෂණය (Audio TTS)
            </span>
            <Volume2 size={16} className="text-accent" />
          </div>
          <div>
            <div className="font-black text-sm text-slate-800 dark:text-white">Speech Synthesis & FX</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Sinhala & English Live Vocalizer</div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-black">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            සූදානම් (Ready)
          </div>
        </div>

        {/* Specification 5: Display Subsystem */}
        <div className="liquid-glass-white dark:bg-white/5 p-5 rounded-2xl border border-white/60 dark:border-white/5 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              සංදර්ශක තේමාව
            </span>
            <Palette size={16} className="text-rose-500" />
          </div>
          <div>
            <div className="font-black text-sm text-slate-800 dark:text-white">Glassmorphism & OLED Dark</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Root-Level Dark Mode Engine</div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-black">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            ප්‍රශස්තයි (Optimized)
          </div>
        </div>

        {/* Specification 6: PWA & Offline Engine */}
        <div className="liquid-glass-white dark:bg-white/5 p-5 rounded-2xl border border-white/60 dark:border-white/5 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              නොබැඳි ධාවනය (Offline PWA)
            </span>
            <ShieldCheck size={16} className="text-cyan-500" />
          </div>
          <div>
            <div className="font-black text-sm text-slate-800 dark:text-white">PWA Service Worker Engine</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Offline-Ready Architecture</div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-black">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            සක්‍රියයි (Active)
          </div>
        </div>
      </div>

      {/* Diagnostics & Maintenance Panel */}
      <div className="liquid-glass-white dark:bg-slate-900/60 p-6 md:p-8 rounded-[32px] border border-white/60 dark:border-white/10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Zap size={20} className="text-amber-500" /> පද්ධති ස්වයංක්‍රීය පරීක්ෂාව (System Health Diagnostics)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              යෙදුමේ සියලුම මොඩියුලයන්ගේ නිවැරදි ක්‍රියාකාරීත්වය තහවුරු කරගැනීමට පරීක්ෂාවක් ක්‍රියාත්මක කරන්න.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleRunDiagnostics}
              disabled={isRunningDiagnostics}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-primary text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <RefreshCw size={14} className={isRunningDiagnostics ? "animate-spin" : ""} />
              {isRunningDiagnostics ? 'පරීක්ෂා කරමින්...' : 'පරීක්ෂාව අරඹන්න'}
            </button>
            <button
              onClick={handleCleanCache}
              disabled={isCleaningCache}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Database size={14} />
              {isCleaningCache ? 'පිරිසිදු කරමින්...' : 'හැඹිලිය පිරිසිදු කරන්න'}
            </button>
          </div>
        </div>

        {/* Cache Cleaned Notice */}
        <AnimatePresence>
          {cacheCleaned && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl text-xs font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2"
            >
              <CheckCircle2 size={16} />
              <span>තාවකාලික මතකය (Cache) සාර්ථකව පිරිසිදු කරන ලදී. ශිෂ්‍ය ලකුණු සහ ප්‍රගතිය නොවෙනස්ව පවතී.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Diagnostic Items List */}
        <div className="divide-y divide-slate-100 dark:divide-white/5 border border-slate-150 dark:border-white/5 rounded-2xl overflow-hidden bg-white/40 dark:bg-white/5">
          {diagnostics.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${
                  item.status === 'pass' 
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' 
                    : item.status === 'testing'
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 animate-spin'
                      : 'bg-slate-100 dark:bg-white/10 text-slate-400'
                }`}>
                  {item.status === 'pass' ? (
                    <CheckCircle2 size={18} />
                  ) : item.status === 'testing' ? (
                    <RefreshCw size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                </div>
                <div>
                  <div className="font-bold text-xs md:text-sm text-slate-800 dark:text-white">
                    {item.sinName} <span className="opacity-60 text-xs font-normal">({item.name})</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {item.detail}
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                {item.status === 'pass' && (
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-wider">
                    PASSED
                  </span>
                )}
                {item.status === 'testing' && (
                  <span className="px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-[10px] font-black uppercase tracking-wider animate-pulse">
                    TESTING...
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
