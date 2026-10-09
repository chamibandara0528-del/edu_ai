import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Clock, RefreshCw, Sparkles, Brain } from 'lucide-react';
import { GameWord, generateGameWords, getGraphemes } from '../../services/gemini';
import confetti from 'canvas-confetti';

interface Card {
  id: number;
  content: string;
  isMatched: boolean;
  type: 'word' | 'meaning';
  pairId: number;
}

interface MatchMasterProps {
  grade: string;
  subject: string;
  language: string;
  term: string;
  onClose: () => void;
}

const MatchMaster: React.FC<MatchMasterProps> = ({ grade, subject, language, term, onClose }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [status, setStatus] = useState<'loading' | 'playing' | 'finished'>('loading');
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    loadGame();
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
          colors: ['#10B981', '#3B82F6', '#F59E0B', '#EC4899']
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#10B981', '#3B82F6', '#F59E0B', '#EC4899']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [status]);

  useEffect(() => {
    let interval: any;
    if (status === 'playing') {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const loadGame = async () => {
    setStatus('loading');
    const data = await generateGameWords(grade, subject, language, term);
    // Use first 6 terms for 12 cards
    const slice = data.slice(0, 6);
    const gameCards: Card[] = [];
    
    slice.forEach((item, idx) => {
      // Add the word card
      gameCards.push({
        id: idx * 2,
        content: item.word,
        isMatched: false,
        type: 'word',
        pairId: idx
      });

      const truncatedHint = getGraphemes(item.hint).length > 25 
        ? getGraphemes(item.hint).slice(0, 25).join('') + '...' 
        : item.hint;

      // Add the meaning/hint card
      gameCards.push({
        id: idx * 2 + 1,
        content: item.technicalTerm || truncatedHint,
        isMatched: false,
        type: 'meaning',
        pairId: idx
      });
    });

    // Shuffle
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setStatus('playing');
    setMoves(0);
    setTime(0);
  };

  const handleCardClick = (id: number) => {
    if (status !== 'playing' || flipped.length === 2 || cards.find(c => c.id === id)?.isMatched || flipped.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const first = cards.find(c => c.id === newFlipped[0]);
      const second = cards.find(c => c.id === newFlipped[1]);

      if (first && second && first.pairId === second.pairId) {
        // Match!
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.pairId === first.pairId ? { ...c, isMatched: true } : c
          ));
          setFlipped([]);
          
          // Check win
          if (cards.every(c => c.isMatched || c.pairId === first.pairId)) {
            setStatus('finished');
            confetti({
              particleCount: 200,
              spread: 70,
              origin: { y: 0.6 }
            });
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <RefreshCw className="w-12 h-12 text-primary animate-spin" />
        <p className="font-bold text-slate-500 animate-pulse">කාඩ්පත් සකස් කරමින්... (Preparing Game...)</p>
      </div>
    );
  }

  if (status === 'finished') {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-6">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 shadow-lg">
          <Sparkles size={48} />
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-800 dark:text-white">සියල්ල හරි! 🎉</h2>
          <p className="text-slate-500 dark:text-slate-400">ඔබේ මතකය ඉතා හොඳයි.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Moves</p>
            <p className="text-2xl font-black text-primary">{moves}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Time</p>
            <p className="text-2xl font-black text-secondary">{formatTime(time)}</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-600 transition-all flex items-center gap-2"
        >
          <ArrowRight size={18} />
          <span>තවත් ඉගෙන ගන්න (Continue Learning)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-primary font-black">
            <Brain size={18} />
            <span>Moves: {moves}</span>
          </div>
          <div className="flex items-center gap-2 text-secondary font-black">
            <Clock size={18} />
            <span>Time: {formatTime(time)}</span>
          </div>
        </div>
        <button onClick={loadGame} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500">
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || card.isMatched;
          return (
            <motion.div
              key={card.id}
              whileHover={!isFlipped ? { scale: 1.05 } : {}}
              whileTap={!isFlipped ? { scale: 0.95 } : {}}
              onClick={() => handleCardClick(card.id)}
              className="relative aspect-square cursor-pointer perspective-1000"
            >
              <div 
                className={`w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s' }}
              >
                {/* Front (Back of card) */}
                <div 
                  className="absolute inset-0 bg-primary rounded-xl md:rounded-2xl flex items-center justify-center border-4 border-white/20 shadow-md backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <Sparkles className="text-white/40" size={32} />
                </div>
                
                {/* Back (Front of card) */}
                <div 
                  className={`absolute inset-0 rounded-xl md:rounded-2xl flex items-center justify-center p-2 text-center text-[10px] md:text-sm font-bold border-2 shadow-inner backface-hidden rotate-y-180 ${
                    card.isMatched 
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400' 
                      : 'bg-white dark:bg-slate-800 border-primary text-slate-800 dark:text-white'
                  }`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  {card.content}
                  {card.isMatched && (
                    <div className="absolute top-1 right-1">
                      <CheckCircle2 size={12} className="text-emerald-500" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-widest">
        මතකයෙන් වචනය සහ එහි අර්ථය සම්බන්ධ කරන්න (Match pairs to win)
      </p>
    </div>
  );
};

const ArrowRight = ({ size, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const CheckCircle2 = ({ size, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default MatchMaster;
