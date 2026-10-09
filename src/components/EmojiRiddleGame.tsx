import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, HelpCircle, Trophy, RotateCcw, X, Loader2, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateEmojiRiddles, EmojiRiddle } from '../services/gemini';

interface EmojiRiddleGameProps {
  grade: string;
  subject: string;
  language: string;
  term: string;
  onClose: () => void;
}

export const EmojiRiddleGame = ({ grade, subject, language, term, onClose }: EmojiRiddleGameProps) => {
  const [riddles, setRiddles] = useState<EmojiRiddle[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    loadRiddles();
  }, []);

  const loadRiddles = async () => {
    setIsLoading(true);
    const data = await generateEmojiRiddles(grade, subject, language, term);
    setRiddles(data);
    setIsLoading(false);
  };

  const handleCheck = () => {
    if (!riddles[currentIdx]) return;

    const correct = riddles[currentIdx].answer.toLowerCase().trim();
    const user = userInput.toLowerCase().trim();

    if (user === correct || correct.includes(user) && user.length > 3) {
      setScore(score + 1);
      setFeedback('correct');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4A90E2', '#FF2D55', '#FFD700']
      });
      
      setTimeout(() => {
        if (currentIdx < riddles.length - 1) {
          setCurrentIdx(currentIdx + 1);
          setUserInput('');
          setShowHint(false);
          setFeedback(null);
        } else {
          setIsFinished(true);
        }
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-6">
        <div className="relative">
          <Loader2 className="animate-spin text-primary" size={64} />
          <div className="absolute inset-0 flex items-center justify-center">
             <Sparkles className="text-amber-400 animate-pulse" size={24} />
          </div>
        </div>
        <p className="font-black text-slate-500 animate-bounce tracking-widest text-center">
          හිනා යන ප්‍රශ්න ටිකක් ලෑස්ති කරනවා... <br/>
          (Preparing Fun Emoji Riddles...)
        </p>
      </div>
    );
  }

  if (riddles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center">
        <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-500">
          <X size={40} />
        </div>
        <p className="font-bold text-slate-600 dark:text-slate-300">
          ප්‍රශ්න ලබා ගැනීමට අපහසු වුණා. කරුණාකර නැවත උත්සාහ කරන්න. <br/>
          (Could not load riddles. Please try again.)
        </p>
        <button 
          onClick={loadRiddles}
          className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg"
        >
          නැවත උත්සාහ කරන්න (Retry)
        </button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center gap-6 text-center p-8 bg-white/20 dark:bg-slate-900/40 rounded-[40px] border-4 border-amber-400/30">
        <div className="w-24 h-24 bg-amber-100 rounded-[32px] flex items-center justify-center text-amber-500 shadow-inner">
          <Trophy size={64} fill="currentColor" className="opacity-40" />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-slate-800 dark:text-white">විශිෂ්ඨයි!</h2>
          <p className="text-xl font-bold text-slate-500 dark:text-slate-400">ඔබේ ලකුණු සංඛ්‍යාව: {score} / {riddles.length}</p>
        </div>
        <div className="flex flex-col w-full gap-3">
          <button 
            onClick={loadRiddles}
            className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} /> නැවත සෙල්ලම් කරන්න
          </button>
          <button 
            onClick={onClose}
            className="w-full bg-white dark:bg-slate-800 py-4 rounded-2xl font-black border-2 border-slate-200 dark:border-slate-700 transition-all"
          >
            ඉවත් වන්න (Back)
          </button>
        </div>
      </div>
    );
  }

  const currentRiddle = riddles ? riddles[currentIdx] : null;

  return (
    <div className="w-full max-w-xl space-y-8 p-4">
      <div className="flex items-center justify-between bg-white/40 dark:bg-slate-800/40 p-4 rounded-3xl backdrop-blur-md border border-white/40">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-400 text-white rounded-xl">
             <HelpCircle size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Riddle</p>
            <p className="font-bold text-slate-700 dark:text-slate-100">{currentIdx + 1} of {riddles?.length || 0}</p>
          </div>
        </div>
        <div className="text-right">
           <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">Score</p>
           <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{score}</p>
        </div>
      </div>

      <motion.div 
        key={currentIdx}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="liquid-glass p-10 rounded-[48px] border-4 border-amber-400/30 shadow-2xl relative overflow-hidden flex flex-col items-center text-center space-y-8"
      >
        <div className="text-7xl mb-4 drop-shadow-xl animate-bounce">
          {currentRiddle && currentRiddle?.emojis && (
             <span>{currentRiddle?.emojis}</span>
          )}
        </div>
        
        <div className="w-full space-y-4">
          <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
             මේ ඉමෝජි වලින් කියවෙන්නේ මොකක්ද?
             <span className="block text-sm font-bold text-slate-500 dark:text-slate-400 mt-2 italic">(What do these emojis represent?)</span>
          </h3>

          <div className="relative group">
            <input 
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="පිළිතුර මෙතන ලියන්න..."
              className={`w-full px-6 py-5 bg-white/50 dark:bg-slate-900/50 rounded-3xl border-4 text-center text-xl font-black transition-all outline-none ${
                feedback === 'correct' ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 
                feedback === 'wrong' ? 'border-rose-400 shake bg-rose-50 dark:bg-rose-900/20' : 
                'border-white/40 focus:border-primary/50'
              }`}
            />
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setShowHint(!showHint)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold transition-all border-2 ${
                showHint ? 'bg-amber-100 border-amber-400 text-amber-600' : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-500'
              }`}
            >
              <Lightbulb size={18} /> {showHint ? currentRiddle?.hint : 'ඉඟියක් (Hint)'}
            </button>
            <button 
              onClick={handleCheck}
              disabled={!userInput.trim() || feedback === 'correct'}
              className="px-10 bg-primary text-white rounded-2xl font-black shadow-lg hover:bg-blue-600 disabled:opacity-50 transition-all"
            >
              OK
            </button>
          </div>
        </div>
      </motion.div>

      <button 
        onClick={onClose}
        className="w-full py-4 text-slate-400 dark:text-slate-500 font-bold hover:text-rose-500 transition-colors flex items-center justify-center gap-2"
      >
        <X size={16} /> නවත්වන්න (Quit Game)
      </button>
    </div>
  );
};
