import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain, Lightbulb, Volume2, Award, ArrowRight, RefreshCw, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playRoboSound, speakAloud } from './AIEyePet';

interface DailyBrainSparkProps {
  onEarnPoints?: (pts: number) => void;
  userLang?: string;
}

const FACTS = [
  {
    topic: 'විද්‍යාව (Science)',
    title: 'සෛලයක ඇති DNA වල දිග',
    englishTitle: 'Length of DNA in a single cell',
    fact: 'මිනිස් සිරුරේ එක සෛලයක ඇති සියලුම DNA දිගහැරියහොත් එය මීටර් 2ක් පමණ දිගු වේ! සිරුරේ ඇති සියලු සෛල වල DNA එකතු කළහොත් සූර්යයා සහ පෘථිවිය අතර දුර මෙන් 600 ගුණයකි.',
    englishFact: 'If uncoiled, the DNA in all the cells in your body would stretch about 10 billion miles, from here to Pluto and back!',
    category: 'science',
    icon: '🧬'
  },
  {
    topic: 'ගණිතය (Mathematics)',
    title: 'ෆිබොනාච්චි අනුක්‍රමය සහ සොබාදහම',
    englishTitle: 'Fibonacci Sequence in Nature',
    fact: 'සූරියකාන්ත මලක පෙති සහ ඇට සැකසී ඇත්තේ ෆිබොනාච්චි (Fibonacci) ගණිතමය අනුක්‍රමයට අනුවය (1, 1, 2, 3, 5, 8, 13, 21...). මෙය සොබාදහමේ ඇති විශ්මිත ජ්‍යාමිතික නීතියකි.',
    englishFact: 'Sunflowers, pinecones, and spiral galaxies naturally follow the golden ratio and the Fibonacci sequence to maximize space efficiency!',
    category: 'maths',
    icon: '🌻'
  },
  {
    topic: 'ඉතිහාසය (History & Heritage)',
    title: 'සීගිරියේ ජල තාක්ෂණය',
    englishTitle: 'Ancient Hydraulic Engineering of Sigiriya',
    fact: 'ක්‍රි.ව. 5 වන සියවසේ කාශ්‍යප රජු ඉදිකළ සීගිරියේ ජල උද්‍යානයේ ඇති දියමල් (Fountains) ස්වභාවික ගුරුත්වාකර්ෂණය සහ පීඩන තාක්ෂණය භාවිතයෙන් වැසි දිනවල අදටත් ක්‍රියාත්මක වේ!',
    englishFact: 'The subterranean water fountains at Sigiriya water gardens operate solely on gravitational force and hydraulic pressure, working to this day!',
    category: 'history',
    icon: '🏛️'
  },
  {
    topic: 'තාරකා විද්‍යාව (Astronomy)',
    title: 'සූර්යයාගේ ආලෝකය පෘථිවියට ඒමට ගතවන කාලය',
    englishTitle: 'Sunlight travel time to Earth',
    fact: 'සූර්යයාගේ සිට පිටවන ආලෝකය තත්පරයට කිලෝමීටර 300,000 ක වේගයෙන් ගමන් කර පෘථිවියට ළඟා වීමට විනාඩි 8 යි තත්පර 20 ක් (තත්පර 500ක්) ගතවේ.',
    englishFact: 'The light leaving the Sun takes approximately 8 minutes and 20 seconds to reach Earth, traveling at 300,000 km per second!',
    category: 'astronomy',
    icon: '☀️'
  },
  {
    topic: 'තොරතුරු තාක්ෂණය (ICT)',
    title: 'ලොව පළමු පරිගණක වැඩසටහන්කාරිය',
    englishTitle: 'The First Computer Programmer',
    fact: 'ලොව ප්‍රථම පරිගණක ක්‍රමලේඛිකාව (First Programmer) වූයේ 1843 දී චාල්ස් බැබේජ්ගේ ඇනලිටිකල් එන්ජිම සඳහා ඇල්ගොරිතමයක් ලියූ අගතා ඒඩා ලව්ලේස් (Ada Lovelace) මැතිණියයි.',
    englishFact: 'Ada Lovelace is regarded as the world\'s first computer programmer, writing the first algorithm intended for Charles Babbage\'s Analytical Engine in 1843.',
    category: 'ict',
    icon: '💻'
  }
];

export const DailyBrainSpark: React.FC<DailyBrainSparkProps> = ({ onEarnPoints, userLang = 'Sinhala' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasClaimedToday, setHasClaimedToday] = useState(() => {
    return localStorage.getItem('np_brain_spark_claimed') === new Date().toDateString();
  });
  const [isRotating, setIsRotating] = useState(false);

  const currentFact = FACTS[currentIndex];

  const handleNextFact = () => {
    setIsRotating(true);
    playRoboSound('click');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % FACTS.length);
      setIsRotating(false);
    }, 200);
  };

  const handleClaimPoints = () => {
    if (hasClaimedToday) return;
    setHasClaimedToday(true);
    localStorage.setItem('np_brain_spark_claimed', new Date().toDateString());
    if (onEarnPoints) {
      onEarnPoints(25);
    }
    playRoboSound('success');
    confetti({
      particleCount: 60,
      spread: 55,
      origin: { y: 0.7 }
    });
  };

  const handleSpeak = () => {
    const textToSpeak = userLang === 'Sinhala' ? currentFact.fact : currentFact.englishFact;
    speakAloud(textToSpeak);
  };

  return (
    <div className="liquid-glass-white dark:bg-slate-900/60 p-6 rounded-[32px] border border-white/60 dark:border-white/10 shadow-md relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-150 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 text-lg">
            {currentFact.icon}
          </div>
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Sparkles size={11} /> දවසේ මොළය උත්තේජනය (Daily Brain Spark)
            </span>
            <h4 className="font-black text-sm md:text-base text-slate-800 dark:text-white leading-tight">
              {userLang === 'Sinhala' ? currentFact.title : currentFact.englishTitle}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-xs flex items-center gap-1.5"
            title="හඬින් අසන්න (Speak aloud)"
          >
            <Volume2 size={15} />
            <span className="text-[10px] font-bold hidden sm:inline">අසන්න</span>
          </button>

          <button
            onClick={handleNextFact}
            className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-xs flex items-center gap-1.5"
            title="ඊළඟ කරුණ (Next fact)"
          >
            <RefreshCw size={14} className={isRotating ? 'animate-spin' : ''} />
            <span className="text-[10px] font-bold">තවත්</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="pt-4 space-y-3"
        >
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
              {currentFact.topic}
            </span>
          </div>

          <p className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed">
            {userLang === 'Sinhala' ? currentFact.fact : currentFact.englishFact}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-[10px] font-bold text-slate-400 italic">
              {userLang === 'Sinhala' ? `💡 ${currentFact.englishFact}` : `💡 ${currentFact.fact}`}
            </span>

            <button
              onClick={handleClaimPoints}
              disabled={hasClaimedToday}
              className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs ${
                hasClaimedToday
                  ? 'bg-slate-100 dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/5'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-500/20 scale-105'
              }`}
            >
              <Zap size={13} />
              {hasClaimedToday ? 'දවසේ XP ලකුණු ලබාගත්තා ✓' : 'දවසේ +25 XP ලබාගන්න!'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
