import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, CheckCircle2, XCircle, HelpCircle, Trophy, Sparkles, ArrowRight, Delete } from 'lucide-react';
import { GameWord, generateGameWords, getGraphemes } from '../../services/gemini';
import confetti from 'canvas-confetti';

interface WordScrambleProps {
  grade: string;
  subject: string;
  language: string;
  term: string;
  onClose: () => void;
}

const WordScramble: React.FC<WordScrambleProps> = ({ grade, subject, language, term, onClose }) => {
  const [words, setWords] = useState<GameWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [scrambledList, setScrambledList] = useState<{ id: number; char: string; used: boolean }[]>([]);
  const [status, setStatus] = useState<'playing' | 'correct' | 'wrong' | 'loading' | 'finished'>('loading');
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    loadNewGame();
  }, []);

  useEffect(() => {
    if (status === 'finished') {
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EC4899']
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EC4899']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [status]);

  const loadNewGame = async () => {
    setStatus('loading');
    const data = await generateGameWords(grade, subject, language, term);
    if (data.length > 0) {
      setWords(data);
      setCurrentIndex(0);
      prepareWord(data[0].word);
      setStatus('playing');
    } else {
      onClose();
    }
  };

  const prepareWord = (word: string) => {
    const rawGraphemes = getGraphemes(word.trim()).filter(g => g !== ' ');
    const arr = rawGraphemes.map((char, idx) => ({ id: idx, char, used: false }));
    
    // Fisher-Yates shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setScrambledList(arr);
    setUserInput('');
    setStatus('playing');
    setShowHint(false);
  };

  const handleTileClick = (tile: { id: number; char: string; used: boolean }) => {
    if (tile.used || status !== 'playing') return;
    setUserInput(prev => prev + tile.char);
    setScrambledList(prev => prev.map(t => t.id === tile.id ? { ...t, used: true } : t));
  };

  const handleBackspace = () => {
    if (!userInput || status !== 'playing') return;
    const userGraphemes = getGraphemes(userInput);
    if (userGraphemes.length === 0) return;
    const lastChar = userGraphemes[userGraphemes.length - 1];
    
    // Find last used tile with this char and mark as unused
    let marked = false;
    setScrambledList(prev => {
      const copy = [...prev];
      for (let i = copy.length - 1; i >= 0; i--) {
        if (copy[i].used && copy[i].char === lastChar) {
          copy[i] = { ...copy[i], used: false };
          marked = true;
          break;
        }
      }
      return copy;
    });

    setUserInput(userGraphemes.slice(0, -1).join(''));
  };

  const handleClear = () => {
    setUserInput('');
    setScrambledList(prev => prev.map(t => ({ ...t, used: false })));
  };

  const checkAnswer = () => {
    if (!words[currentIndex]) return;
    const correctWord = words[currentIndex].word.replace(/\s+/g, '').toLowerCase().normalize('NFC');
    const cleanInput = userInput.replace(/\s+/g, '').toLowerCase().normalize('NFC');

    if (cleanInput === correctWord) {
      setStatus('correct');
      setScore(s => s + 10);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#3B82F6', '#10B981', '#F59E0B']
      });
    } else {
      setStatus('wrong');
      setTimeout(() => setStatus('playing'), 1500);
    }
  };

  const nextWord = () => {
    if (currentIndex + 1 < words.length) {
      setCurrentIndex(currentIndex + 1);
      prepareWord(words[currentIndex + 1].word);
    } else {
      setStatus('finished');
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <RefreshCw className="w-12 h-12 text-primary animate-spin" />
        <p className="font-bold text-slate-500 animate-pulse">වචන සකස් කරමින්... (Loading Game...)</p>
      </div>
    );
  }

  if (status === 'finished') {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-6">
        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 shadow-lg">
          <Trophy size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-800 dark:text-white">විශිෂ්ටයි! (Excellent!)</h2>
          <p className="text-slate-500 dark:text-slate-400">ඔබ සාර්ථකව ක්‍රීඩාව නිමා කළා.</p>
        </div>
        <div className="text-5xl font-black text-primary drop-shadow-sm">{score} ✨</div>
        <button 
          onClick={onClose}
          className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-600 transition-all"
        >
          නැවත යන්න (Go Back)
        </button>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  return (
    <div className="space-y-8 p-6 lg:p-10 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-bold">
          <Sparkles size={16} />
          <span>ප්‍රශ්නය {currentIndex + 1}/{words.length}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full text-amber-600 font-bold">
          <Trophy size={16} />
          <span>Score: {score}</span>
        </div>
      </div>

      <div className="space-y-6 text-center">
        <div className="flex flex-wrap justify-center gap-2.5">
          {scrambledList.map((tile) => (
            <motion.button
              key={`${currentIndex}-${tile.id}`}
              onClick={() => handleTileClick(tile)}
              disabled={tile.used || status !== 'playing'}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: tile.used ? 0.8 : 1, rotate: 0, opacity: tile.used ? 0.3 : 1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: tile.id * 0.05, type: 'spring' }}
              className={`px-3 py-2 min-w-[3.25rem] h-12 md:h-14 rounded-xl border-2 shadow-sm flex items-center justify-center text-xl md:text-2xl font-black transition-all select-none ${
                tile.used 
                  ? 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400' 
                  : 'bg-white dark:bg-slate-800 border-primary/40 text-primary hover:border-primary shadow-md'
              }`}
            >
              {tile.char}
            </motion.button>
          ))}
        </div>

        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
          අකුරු මත ඔබන්න හෝ ටයිප් කරන්න (Tap letters or type answer)
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && status === 'playing' && checkAnswer()}
            disabled={status !== 'playing'}
            className={`w-full p-4 md:p-6 bg-white dark:bg-slate-900 border-4 rounded-[24px] text-center text-2xl font-bold outline-none transition-all shadow-inner ${
              status === 'correct' ? 'border-emerald-500 text-emerald-600' :
              status === 'wrong' ? 'border-rose-500 text-rose-600' :
              'border-slate-100 dark:border-slate-800 focus:border-primary'
            }`}
            placeholder="..."
          />
          {userInput && (
            <button
              type="button"
              onClick={handleBackspace}
              className="p-4 bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950 text-slate-600 rounded-2xl transition-all"
              title="Delete character"
            >
              <Delete size={20} />
            </button>
          )}
          <AnimatePresence>
            {status === 'correct' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -right-4 -top-4 bg-emerald-500 text-white p-2 rounded-full shadow-lg"
              >
                <CheckCircle2 size={24} />
              </motion.div>
            )}
            {status === 'wrong' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -right-4 -top-4 bg-rose-500 text-white p-2 rounded-full shadow-lg"
              >
                <XCircle size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex-1 p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <HelpCircle size={18} />
            <span>උදව් (Hint)</span>
          </button>
          
          {status === 'correct' ? (
            <button
              onClick={nextWord}
              className="flex-1 bg-emerald-500 text-white p-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 dark:shadow-none"
            >
              <span>මීළඟ එක (Next)</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={checkAnswer}
              disabled={!userInput || status !== 'playing'}
              className="flex-1 bg-primary text-white p-4 rounded-2xl font-bold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 dark:shadow-none"
            >
              පරීක්ෂා කරන්න (Check)
            </button>
          )}
        </div>

        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 rounded-2xl"
            >
              <div className="flex gap-3 text-amber-700 dark:text-amber-400 italic text-sm">
                <HelpCircle size={16} className="shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p>{currentWord.hint}</p>
                  {currentWord.technicalTerm && (
                    <p className="font-bold opacity-75">English Term: {currentWord.technicalTerm}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WordScramble;
