import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, RotateCcw, X, Loader2, Lightbulb, CheckCircle2, XCircle, HelpCircle, ArrowRight, Brain } from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  generateFactOrFiction, FactOrFiction,
  generateSortingGame, SortCategory,
  generateFillBlanks, FillBlank,
  generateOddOneOut, OddOneOut,
  generateGameWords, GameWord,
  generateRiddles, Riddle,
  generateEmojiRiddles, EmojiRiddle,
  generateMathWiz, MathWizQuestion,
  generateSequenceMaster, SequenceMasterQuestion,
  getGraphemes
} from '../services/gemini';

const normalizedCompare = (a: string, b: string) => {
  if (!a || !b) return false;
  return a.trim().toLowerCase().normalize('NFC') === b.trim().toLowerCase().normalize('NFC');
};

// --- RIDDLE GAME (ප්‍රහේලිකා) ---
export const RiddleGame = ({ grade, subject, language, term, onClose }: any) => {
    const [data, setData] = useState<Riddle[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
  
    useEffect(() => { loadData(); }, []);
    const loadData = async () => {
      setIsLoading(true);
      const result = await generateRiddles(grade, subject, language, term);
      // Safety: Ensure answer is in options
      const fixed = result.map(q => {
          if (!q.options.some(o => normalizedCompare(o, q.answer))) {
              q.options[Math.floor(Math.random() * q.options.length)] = q.answer;
          }
          return q;
      });
      setData(fixed);
      setCurrentIdx(0);
      setScore(0);
      setSelected(null);
      setIsFinished(false);
      setIsLoading(false);
    };

    const handleContinue = async () => {
      setIsLoading(true);
      const result = await generateRiddles(grade, subject, language, term);
      const fixed = result.map(q => {
          if (!q.options.some(o => normalizedCompare(o, q.answer))) {
              q.options[Math.floor(Math.random() * q.options.length)] = q.answer;
          }
          return q;
      });
      setData(prev => [...prev, ...fixed]);
      setCurrentIdx(data.length);
      setSelected(null);
      setIsFinished(false);
      setIsLoading(false);
    };
  
    const handleChoice = (choice: string) => {
      if (selected !== null) return;
      setSelected(choice);
      if (normalizedCompare(choice, data[currentIdx].answer)) {
        setScore(score + 1);
        confetti({ particleCount: 50 });
      }
    };
  
    if (isLoading) return <LoadingScreen message="ප්‍රහේලිකා විසඳන්න සූදානම් වෙන්න..." />;
    if (isFinished) return <CongratsScreen score={score} total={data.length} onRetry={loadData} onClose={onClose} onContinue={handleContinue} />;

    if (data.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center">
            <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-500">
              <X size={40} />
            </div>
            <p className="font-bold text-slate-600 dark:text-slate-300">
              ප්‍රහේලිකා ලබා ගැනීමට අපහසු වුණා. <br/>
              (Could not load riddles.)
            </p>
            <button onClick={loadData} className="bg-primary text-white px-8 py-3 rounded-2xl font-bold">නැවත උත්සාහ කරන්න (Retry)</button>
          </div>
        );
    }

    const currentRiddle = data ? data[currentIdx] : null;
  
    return (
      <div className="w-full max-w-xl space-y-6">
        <GameHeader current={currentIdx + 1} total={data?.length || 0} score={score} title="Riddle Master" />
        <motion.div key={currentIdx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="liquid-glass p-8 rounded-[40px] border-4 border-accent/30 space-y-8">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent mx-auto mb-4 border-4 border-dashed border-accent/20">
             <Lightbulb size={32} />
          </div>
          <div className="text-xl font-black dark:text-white leading-relaxed text-center italic">
            {currentRiddle && <span>"{currentRiddle?.question}"</span>}
          </div>
          <div className="grid gap-3">
            {currentRiddle?.options?.map((opt, i) => (
              <button key={i} onClick={() => handleChoice(opt)} className={`p-4 rounded-2xl font-bold text-sm transition-all border-2 ${selected === opt ? (normalizedCompare(opt, currentRiddle?.answer || '') ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-rose-500 text-white border-rose-600') : 'bg-white/50 dark:bg-white/5 border-white/20 hover:border-accent/50 text-slate-700 dark:text-white'}`}>
                {opt}
              </button>
            ))}
          </div>
          {selected && currentRiddle && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="p-4 bg-accent/5 dark:bg-accent/10 rounded-2xl text-xs font-bold text-accent text-center">{currentRiddle?.explanation}</div>
                <button onClick={() => { if (currentIdx < data.length - 1) { setCurrentIdx(currentIdx + 1); setSelected(null); } else { setIsFinished(true); } }} className="w-full bg-accent text-white py-4 rounded-2xl font-black">මීළඟ ප්‍රහේලිකාව (Next)</button>
             </motion.div>
          )}
        </motion.div>
      </div>
    );
};

// --- EMOJI RIDDLES ---
export const EmojiRiddleGame = ({ grade, subject, language, term, onClose }: any) => {
    const [data, setData] = useState<EmojiRiddle[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [guess, setGuess] = useState("");
    const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
    useEffect(() => { loadData(); }, []);
    const loadData = async () => {
      setIsLoading(true);
      const result = await generateEmojiRiddles(grade, subject, language, term);
      setData(result);
      setCurrentIdx(0);
      setScore(0);
      setGuess("");
      setSelectedOpt(null);
      setIsCorrect(null);
      setShowHint(false);
      setIsFinished(false);
      setIsLoading(false);
    };

    const handleContinue = async () => {
      setIsLoading(true);
      const result = await generateEmojiRiddles(grade, subject, language, term);
      setData(prev => [...prev, ...result]);
      setCurrentIdx(data.length);
      setGuess("");
      setSelectedOpt(null);
      setIsCorrect(null);
      setShowHint(false);
      setIsFinished(false);
      setIsLoading(false);
    };

    const handleChoice = (opt: string) => {
      if (selectedOpt !== null || isCorrect !== null) return;
      setSelectedOpt(opt);
      if (normalizedCompare(opt, data[currentIdx]?.answer)) {
        setIsCorrect(true);
        setScore(s => s + 1);
        confetti();
      } else {
        setIsCorrect(false);
      }
    };
 
    const handleCheck = () => {
        if (!data || !data[currentIdx]) return;
        if (normalizedCompare(guess, data[currentIdx]?.answer)) {
            setIsCorrect(true);
            setScore(s => s + 1);
            confetti();
        } else {
            setIsCorrect(false);
        }
    };
  
    if (isLoading) return <LoadingScreen message="Emoji ප්‍රහේලිකා හොයනවා..." />;
    if (isFinished) return <CongratsScreen score={score} total={data?.length || 0} onRetry={loadData} onClose={onClose} onContinue={handleContinue} />;
    
    if (!data || data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center">
          <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-500">
            <X size={40} />
          </div>
          <p className="font-bold text-slate-600 dark:text-slate-300">
            ප්‍රශ්න ලබා ගැනීමට අපහසු වුණා. කරුණාකර නැවත උත්සාහ කරන්න. <br/>
            (Could not load riddles. Please try again.)
          </p>
          <button onClick={loadData} className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg">නැවත උත්සාහ කරන්න (Retry)</button>
        </div>
      );
    }
  
    const currentRiddle = data ? data[currentIdx] : null;

    return (
      <div className="w-full max-w-xl space-y-6">
        <GameHeader current={currentIdx + 1} total={data?.length || 0} score={score} title="Emoji Riddle" />
        <motion.div key={currentIdx} className="liquid-glass p-8 rounded-[40px] border-4 border-amber-400/30 text-center space-y-8">
            <div className="text-6xl animate-bounce">
              {currentRiddle && currentRiddle?.emojis && (
                <span>{currentRiddle?.emojis}</span>
              )}
            </div>

            {currentRiddle?.options && currentRiddle.options.length > 0 ? (
              <div className="grid gap-3">
                {currentRiddle.options.map((opt, i) => {
                  const isSelected = selectedOpt === opt;
                  const isAnswer = normalizedCompare(opt, currentRiddle.answer);
                  let btnStyle = "bg-white/50 dark:bg-white/5 border-white/20 hover:border-amber-400/50 text-slate-700 dark:text-white";
                  if (selectedOpt !== null) {
                    if (isAnswer) btnStyle = "bg-emerald-500 text-white border-emerald-600 font-bold";
                    else if (isSelected) btnStyle = "bg-rose-500 text-white border-rose-600 font-bold";
                  }
                  return (
                    <button key={i} onClick={() => handleChoice(opt)} className={`p-4 rounded-2xl text-base transition-all border-2 ${btnStyle}`}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                  <input 
                      type="text" 
                      value={guess} 
                      onChange={(e) => setGuess(e.target.value)}
                      placeholder="ඔබේ පිළිතුර..."
                      className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-black/20 text-center font-black text-xl outline-none focus:border-amber-400 transition-all"
                  />
                  <button 
                    onClick={handleCheck} 
                    disabled={!guess.trim() || isCorrect === true}
                    className="w-full bg-amber-500 text-white py-4 rounded-2xl font-black shadow-lg disabled:opacity-50"
                  >Check Answer</button>
              </div>
            )}

            {isCorrect === false && (
                <button onClick={() => setShowHint(true)} className="text-amber-600 font-bold text-sm">Hint එකක් ඕනෙද?</button>
            )}
            {showHint && currentRiddle && <div className="p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl text-xs font-bold text-amber-600 italic">"{currentRiddle?.hint}"</div>}
            {isCorrect !== null && currentRiddle && (
                <div className="space-y-4 pt-2">
                    <div className={`font-black text-lg ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {isCorrect ? 'නිවැරදියි! 🌟' : `වැරදියි! පිළිතුර: ${currentRiddle?.answer}`}
                    </div>
                    <button onClick={() => { if (currentIdx < data.length - 1) { setCurrentIdx(currentIdx + 1); setGuess(""); setSelectedOpt(null); setIsCorrect(null); setShowHint(false); } else { setIsFinished(true); } }} className="w-full bg-slate-900 dark:bg-slate-800 text-white py-4 rounded-2xl font-black shadow-lg">මීළඟ එක (Next)</button>
                </div>
            )}
        </motion.div>
      </div>
    );
};
export const FactOrFictionGame = ({ grade, subject, language, term, onClose }: any) => {
  const [data, setData] = useState<FactOrFiction[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [answered, setAnswered] = useState<boolean | null>(null);

  useEffect(() => { loadData(); }, []);
  const loadData = async () => {
    setIsLoading(true);
    const result = await generateFactOrFiction(grade, subject, language, term);
    setData(result);
    setCurrentIdx(0);
    setScore(0);
    setAnswered(null);
    setIsFinished(false);
    setIsLoading(false);
  };

  const handleContinue = async () => {
    setIsLoading(true);
    const result = await generateFactOrFiction(grade, subject, language, term);
    setData(prev => [...prev, ...result]);
    setCurrentIdx(data.length);
    setAnswered(null);
    setIsFinished(false);
    setIsLoading(false);
  };

  const handleChoice = (choice: boolean) => {
    if (answered !== null || !data || !data[currentIdx]) return;
    setAnswered(choice);
    if (choice === data[currentIdx]?.isTrue) {
      setScore(score + 1);
      confetti({ particleCount: 50 });
    }
  };

  const next = () => {
    if (currentIdx < (data?.length || 0) - 1) {
      setCurrentIdx(currentIdx + 1);
      setAnswered(null);
    } else {
      setIsFinished(true);
    }
  };

  if (isLoading) return <LoadingScreen message="විස්මිත තොරතුරු ලෑස්ති කරනවා..." />;
  if (isFinished) return <CongratsScreen score={score} total={data?.length || 0} onRetry={loadData} onClose={onClose} onContinue={handleContinue} />;

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center">
        <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-500">
          <X size={40} />
        </div>
        <p className="font-bold text-slate-600 dark:text-slate-300">
            තොරතුරු ලබා ගැනීමට අපහසු වුණා. <br/>
            (Could not load facts.)
        </p>
        <button onClick={loadData} className="bg-primary text-white px-8 py-3 rounded-2xl font-bold">නැවත උත්සාහ කරන්න (Retry)</button>
      </div>
    );
  }

  const currentItem = data ? data[currentIdx] : null;

  return (
    <div className="w-full max-w-xl space-y-6">
      <GameHeader current={currentIdx + 1} total={data?.length || 0} score={score} title="Fact or Fiction?" />
      <motion.div key={currentIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="liquid-glass p-8 rounded-[40px] border-4 border-amber-400/30 text-center space-y-8">
        <div className="text-xl font-black dark:text-white leading-relaxed">{currentItem?.statement && <span>{currentItem?.statement}</span>}</div>
        <div className="flex gap-4">
          <button onClick={() => handleChoice(true)} className={`flex-1 py-6 rounded-3xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-2 ${answered !== null ? (currentItem?.isTrue ? 'bg-emerald-500 text-white' : 'bg-rose-500/20 text-rose-500 opacity-50') : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 border-b-8 border-emerald-300 dark:border-emerald-800'}`}>
             <CheckCircle2 /> Fact
          </button>
          <button onClick={() => handleChoice(false)} className={`flex-1 py-6 rounded-3xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-2 ${answered !== null ? (!currentItem?.isTrue ? 'bg-emerald-500 text-white' : 'bg-rose-500/20 text-rose-500 opacity-50') : 'bg-rose-100 dark:bg-rose-950 text-rose-600 border-b-8 border-rose-300 dark:border-rose-800'}`}>
             <XCircle /> Fiction
          </button>
        </div>
        {answered !== null && currentItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-white/50 dark:bg-white/5 rounded-2xl text-sm font-bold text-slate-500 dark:text-slate-400">
            {currentItem?.explanation}
            <button onClick={next} className="w-full mt-4 bg-primary text-white py-3 rounded-xl font-black">Next Question</button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// --- FILL IN THE BLANKS ---
export const FillBlanksGame = ({ grade, subject, language, term, onClose }: any) => {
    const [data, setData] = useState<FillBlank[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
  
    useEffect(() => { loadData(); }, []);
    const loadData = async () => {
      setIsLoading(true);
      const result = await generateFillBlanks(grade, subject, language, term);
      // Safety: Ensure answer is in options
      const fixed = result.map(q => {
          if (!q.options.some(o => normalizedCompare(o, q.answer))) {
              q.options[Math.floor(Math.random() * q.options.length)] = q.answer;
          }
          return q;
      });
      setData(fixed);
      setCurrentIdx(0);
      setScore(0);
      setSelected(null);
      setIsFinished(false);
      setIsLoading(false);
    };

    const handleContinue = async () => {
      setIsLoading(true);
      const result = await generateFillBlanks(grade, subject, language, term);
      const fixed = result.map(q => {
          if (!q.options.some(o => normalizedCompare(o, q.answer))) {
              q.options[Math.floor(Math.random() * q.options.length)] = q.answer;
          }
          return q;
      });
      setData(prev => [...prev, ...fixed]);
      setCurrentIdx(data.length);
      setSelected(null);
      setIsFinished(false);
      setIsLoading(false);
    };
  
    const handleChoice = (choice: string) => {
      if (selected !== null || !data || !data[currentIdx]) return;
      setSelected(choice);
      if (normalizedCompare(choice, data[currentIdx]?.answer)) {
        setScore(score + 1);
        confetti({ particleCount: 50 });
      }
    };
  
    if (isLoading) return <LoadingScreen message="හිස්තැන් පුරවන්න ලෑස්ති වෙන්න..." />;
    if (isFinished) return <CongratsScreen score={score} total={data?.length || 0} onRetry={loadData} onClose={onClose} onContinue={handleContinue} />;
  
    if (!data || data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center">
          <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-500">
            <X size={40} />
          </div>
          <p className="font-bold text-slate-600 dark:text-slate-300">
            හිස්තැන් පිරවීම ලබා ගැනීමට අපහසු වුණා. <br/>
            (Could not load questions.)
          </p>
          <button onClick={loadData} className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg">නැවත උත්සාහ කරන්න (Retry)</button>
        </div>
      );
    }

    const currentItem = data ? data[currentIdx] : null;

    return (
      <div className="w-full max-w-xl space-y-6">
        <GameHeader current={currentIdx + 1} total={data?.length || 0} score={score} title="Fill the Blank" />
        <motion.div key={currentIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="liquid-glass p-8 rounded-[40px] border-4 border-primary/30 space-y-8">
          <div className="text-xl font-bold dark:text-white leading-relaxed text-center px-4">
            {currentItem?.sentence?.split('____')?.map((part, i) => (
              <span key={i}>
                {part}
                {i === 0 && (
                  <span className={`inline-block min-w-20 px-3 border-b-4 mx-1 ${selected ? 'text-emerald-500 border-emerald-500 font-black' : 'border-slate-300'}`}>
                    {selected || '....'}
                  </span>
                )}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {currentItem?.options?.map((opt, i) => (
              <button key={i} onClick={() => handleChoice(opt)} className={`p-4 rounded-2xl font-bold text-sm transition-all border-2 ${selected === opt ? (normalizedCompare(opt, currentItem?.answer || '') ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-rose-500 text-white border-rose-600') : 'bg-white/50 dark:bg-white/5 border-white/20 hover:border-accent/50 text-slate-700 dark:text-white'}`}>
                {opt}
              </button>
            ))}
          </div>
          {selected && (
            <button onClick={() => { if (currentIdx < data.length - 1) { setCurrentIdx(currentIdx + 1); setSelected(null); } else { setIsFinished(true); } }} className="w-full bg-primary text-white py-4 rounded-2xl font-black">Next Question</button>
          )}
        </motion.div>
      </div>
    );
};

// --- ODD ONE OUT ---
export const OddOneOutGame = ({ grade, subject, language, term, onClose }: any) => {
    const [data, setData] = useState<OddOneOut[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  
    useEffect(() => { loadData(); }, []);
    const loadData = async () => {
      setIsLoading(true);
      const result = await generateOddOneOut(grade, subject, language, term);
      // Safety: Ensure correctIndex is valid
      const fixed = result.map(q => {
        if (q.correctIndex < 0 || q.correctIndex >= q.items.length) {
            q.correctIndex = Math.floor(Math.random() * q.items.length);
        }
        return q;
      });
      setData(fixed);
      setCurrentIdx(0);
      setScore(0);
      setSelectedIdx(null);
      setIsFinished(false);
      setIsLoading(false);
    };

    const handleContinue = async () => {
      setIsLoading(true);
      const result = await generateOddOneOut(grade, subject, language, term);
      const fixed = result.map(q => {
        if (q.correctIndex < 0 || q.correctIndex >= q.items.length) {
            q.correctIndex = Math.floor(Math.random() * q.items.length);
        }
        return q;
      });
      setData(prev => [...prev, ...fixed]);
      setCurrentIdx(data.length);
      setSelectedIdx(null);
      setIsFinished(false);
      setIsLoading(false);
    };
  
    if (isLoading) return <LoadingScreen message="වෙනස් එකා හොයාගන්න ලෑස්තිද?..." />;
    if (isFinished) return <CongratsScreen score={score} total={data?.length || 0} onRetry={loadData} onClose={onClose} onContinue={handleContinue} />;
  
    if (!data || data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center">
          <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-500">
            <X size={40} />
          </div>
          <p className="font-bold text-slate-600 dark:text-slate-300">
             ප්‍රහේලිකා ලබා ගැනීමට අපහසු වුණා. <br/>
             (Could not load puzzles.)
          </p>
          <button onClick={loadData} className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg">නැවත උත්සාහ කරන්න (Retry)</button>
        </div>
      );
    }

    const currentItem = data ? data[currentIdx] : null;

    return (
      <div className="w-full max-w-xl space-y-6">
        <GameHeader current={currentIdx + 1} total={data?.length || 0} score={score} title="Odd One Out" />
        <motion.div key={currentIdx} className="liquid-glass p-8 rounded-[40px] border-4 border-rose-400/30 space-y-8">
          <h3 className="text-center font-black text-xl dark:text-white">මෙහි වෙන්ව පෙනෙන එක කුමක්ද?</h3>
          <div className="grid grid-cols-2 gap-4">
            {currentItem?.items?.map((item, i) => (
              <button key={i} onClick={() => { if (selectedIdx === null && currentItem) { setSelectedIdx(i); if (i === currentItem?.correctIndex) { setScore(score + 1); confetti(); } } }} className={`p-6 rounded-3xl font-black text-sm transition-all border-4 ${selectedIdx === i ? (i === currentItem?.correctIndex ? 'bg-emerald-500 text-white border-emerald-600 scale-105' : 'bg-rose-500 text-white border-rose-600 scale-95') : 'bg-white/50 dark:bg-white/5 border-white/20 hover:border-rose-400/50 text-slate-700 dark:text-white'}`}>
                {item}
              </button>
            ))}
          </div>
          {selectedIdx !== null && currentItem && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
               <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400">{currentItem?.explanation}</div>
               <button onClick={() => { if (currentIdx < data.length - 1) { setCurrentIdx(currentIdx + 1); setSelectedIdx(null); } else { setIsFinished(true); } }} className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-lg">Next Puzzle</button>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
};

// --- HANGMAN (WORD HERO) ---
export const WordHeroGame = ({ grade, subject, language, term, onClose }: any) => {
    const [words, setWords] = useState<GameWord[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [guessed, setGuessed] = useState<string[]>([]);
    const [lives, setLives] = useState(6);
    const [isLoading, setIsLoading] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [keyboardKeys, setKeyboardKeys] = useState<string[]>([]);

    useEffect(() => { loadData(); }, []);

    const setupKeyboard = (rawWord: string) => {
        const graphemes = getGraphemes(rawWord.trim()).filter(g => g !== ' ' && g !== '-');
        const isEnglish = /^[a-zA-Z\s]+$/.test(rawWord);
        
        if (isEnglish) {
            setKeyboardKeys("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''));
        } else {
            const uniqueGraphemes = Array.from(new Set(graphemes));
            const pool = ['අ', 'ආ', 'ඉ', 'ක', 'ග', 'ච', 'ජ', 'ට', 'ඩ', 'ත', 'ද', 'න', 'ප', 'බ', 'ම', 'ය', 'ර', 'ල', 'ව', 'ස', 'හ', 'ළ', 'ණ'];
            const distractors = pool.filter(p => !uniqueGraphemes.some(u => normalizedCompare(u, p)));
            const shuffledDistractors = distractors.sort(() => Math.random() - 0.5).slice(0, 8);
            const combined = Array.from(new Set([...uniqueGraphemes, ...shuffledDistractors])).sort(() => Math.random() - 0.5);
            setKeyboardKeys(combined);
        }
        setGuessed([]);
        setLives(6);
    };

    const loadData = async () => {
        setIsLoading(true);
        const result = await generateGameWords(grade, subject, language, term);
        setWords(result);
        setCurrentIdx(0);
        setScore(0);
        setGuessed([]);
        setLives(6);
        setIsFinished(false);
        if (result.length > 0) {
            setupKeyboard(result[0].word);
        }
        setIsLoading(false);
    };

    const handleContinue = async () => {
        setIsLoading(true);
        const result = await generateGameWords(grade, subject, language, term);
        setWords(prev => [...prev, ...result]);
        const nextIdx = words.length;
        setCurrentIdx(nextIdx);
        if (result.length > 0) {
            setupKeyboard(result[0].word);
        }
        setIsFinished(false);
        setIsLoading(false);
    };

    const currentWord = words[currentIdx]?.word || "";
    const wordGraphemes = getGraphemes(currentWord);

    const handleGuess = (letter: string) => {
        if (guessed.some(g => normalizedCompare(g, letter)) || lives <= 0 || isFinished) return;
        setGuessed(prev => [...prev, letter]);
        
        const isMatch = wordGraphemes.some(g => normalizedCompare(g, letter));
        if (!isMatch) {
            setLives(l => l - 1);
        }
    };

    useEffect(() => {
        if (wordGraphemes.length > 0) {
            const allGuessed = wordGraphemes.every(g => g === ' ' || g === '-' || guessed.some(u => normalizedCompare(u, g)));
            if (allGuessed) {
                setScore(s => s + 1);
                confetti();
                setTimeout(() => {
                    if (currentIdx < words.length - 1) {
                        const nextIdx = currentIdx + 1;
                        setCurrentIdx(nextIdx);
                        setupKeyboard(words[nextIdx].word);
                    } else {
                        setIsFinished(true);
                    }
                }, 1500);
            } else if (lives <= 0) {
                setIsFinished(true);
            }
        }
    }, [guessed, lives]);

    if (isLoading) return <LoadingScreen message="වචන වීරයා සටනට සේන්දුවෙනවා..." />;
    if (isFinished) return <CongratsScreen score={score} total={words.length} onRetry={loadData} onClose={onClose} onContinue={handleContinue} />;

    if (words.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center">
          <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-500">
            <X size={40} />
          </div>
          <p className="font-bold text-slate-600 dark:text-slate-300">
             වචන ලබා ගැනීමට අපහසු වුණා. <br/>
             (Could not load words.)
          </p>
          <button onClick={loadData} className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg">නැවත උත්සාහ කරන්න (Retry)</button>
        </div>
      );
    }

    return (
        <div className="w-full max-w-xl space-y-6">
            <GameHeader current={currentIdx + 1} total={words.length} score={score} title="Word Hero" />
            <motion.div className="liquid-glass p-8 rounded-[40px] border-4 border-primary/30 flex flex-col items-center space-y-8">
                <div className="flex gap-2">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full ${i < lives ? 'bg-rose-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
                    ))}
                </div>
                <div className="flex flex-wrap justify-center gap-2 my-2">
                    {wordGraphemes.map((char, idx) => {
                        if (char === ' ') return <span key={idx} className="w-4"></span>;
                        const isRevealed = guessed.some(g => normalizedCompare(g, char)) || lives <= 0;
                        return (
                            <div 
                                key={idx} 
                                className={`px-2 py-1 min-w-[2.5rem] h-12 border-b-4 flex items-center justify-center text-2xl font-black transition-all ${
                                    isRevealed ? 'border-primary text-primary' : 'border-slate-300 dark:border-slate-700 text-transparent'
                                }`}
                            >
                                {isRevealed ? char : '_'}
                            </div>
                        );
                    })}
                </div>
                <div className="font-bold text-slate-500 text-sm text-center italic">"{words[currentIdx]?.hint}"</div>
                <div className="flex flex-wrap justify-center gap-2 w-full">
                    {keyboardKeys.map(l => {
                        const isGuessed = guessed.some(g => normalizedCompare(g, l));
                        return (
                            <button 
                                key={l} 
                                onClick={() => handleGuess(l)} 
                                disabled={isGuessed} 
                                className={`px-3 py-2 rounded-xl font-black text-sm transition-all ${
                                    isGuessed 
                                        ? 'opacity-30 bg-slate-100 dark:bg-slate-800 text-slate-400' 
                                        : 'bg-white/80 dark:bg-slate-800/80 border border-primary/30 hover:border-primary text-slate-800 dark:text-white shadow-sm'
                                }`}
                            >
                                {l}
                            </button>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
};

// --- SORTING CHALLENGE ---
export const SortingGame = ({ grade, subject, language, term, onClose }: any) => {
    const [categories, setCategories] = useState<SortCategory[]>([]);
    const [allItems, setAllItems] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [wrongItems, setWrongItems] = useState<number[]>([]);

    useEffect(() => { loadData(); }, []);
    const loadData = async () => {
        setIsLoading(true);
        const data = await generateSortingGame(grade, subject, language, term);
        setCategories(data);
        const shuffled = data.flatMap((c, ci) => c.items.map(item => ({ item, categoryIndex: ci }))).sort(() => Math.random() - 0.5);
        setAllItems(shuffled);
        setCurrentIndex(0);
        setScore(0);
        setWrongItems([]);
        setIsFinished(false);
        setIsLoading(false);
    };

    const handleContinue = async () => {
        setIsLoading(true);
        const moreCategories = await generateSortingGame(grade, subject, language, term);
        const offset = categories.length;
        setCategories(prev => [...prev, ...moreCategories]);
        const shuffled = moreCategories.flatMap((c, ci) => c.items.map(item => ({ item, categoryIndex: offset + ci }))).sort(() => Math.random() - 0.5);
        setAllItems(prev => [...prev, ...shuffled]);
        setCurrentIndex(allItems.length);
        setIsFinished(false);
        setIsLoading(false);
    };

    const handleSort = (targetCategoryIndex: number) => {
        if (!allItems || !allItems[currentIndex]) return;
        if (targetCategoryIndex === allItems[currentIndex]?.categoryIndex) {
            setScore(score + 1);
            confetti({ particleCount: 20 });
            if (currentIndex < allItems.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                setIsFinished(true);
            }
        } else {
            setWrongItems([...wrongItems, currentIndex]);
            setTimeout(() => {
              if (currentIndex < allItems.length - 1) {
                setCurrentIndex(currentIndex + 1);
              } else {
                setIsFinished(true);
              }
            }, 500);
        }
    };

    if (isLoading) return <LoadingScreen message="වර්ගීකරණය කරන්න සූදානම් වෙන්න..." />;
    if (isFinished) return <CongratsScreen score={score} total={allItems?.length || 0} onRetry={loadData} onClose={onClose} onContinue={handleContinue} />;

    if (!allItems || allItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center">
          <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-500">
            <X size={40} />
          </div>
          <p className="font-bold text-slate-600 dark:text-slate-300">
             අයිතම ලබා ගැනීමට අපහසු වුණා. <br/>
             (Could not load items.)
          </p>
          <button onClick={loadData} className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg">නැවත උත්සාහ කරන්න (Retry)</button>
        </div>
      );
    }

    const currentItem = allItems ? allItems[currentIndex] : null;

    return (
        <div className="w-full max-w-xl space-y-8">
            <GameHeader current={currentIndex + 1} total={allItems?.length || 0} score={score} title="Sorting Race" />
            <motion.div key={currentIndex} initial={{ scale: 0.8, rotate: -5 }} animate={{ scale: 1, rotate: 0 }} className={`liquid-glass p-12 rounded-[50px] border-8 text-center text-3xl font-black transition-all ${wrongItems.includes(currentIndex) ? 'border-rose-500 text-rose-500 shake' : 'border-emerald-400/30'}`}>
                {currentItem?.item}
            </motion.div>
            <div className="grid grid-cols-2 gap-6">
                {categories?.map((c, i) => (
                    <button key={i} onClick={() => handleSort(i)} className="bg-white/40 dark:bg-white/5 border-4 border-dashed border-white/40 p-8 rounded-[40px] hover:border-primary transition-all space-y-4 group">
                        <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform">
                             <Brain size={32} />
                        </div>
                        <p className="font-black text-slate-700 dark:text-white leading-tight">{c?.categoryName}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- MATH WIZ GAME (වේගවත් ගණිතය) ---
export const MathWizGame = ({ grade, subject, language, term, onClose }: any) => {
    const [data, setData] = useState<MathWizQuestion[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => { loadData(); }, []);
    const loadData = async () => {
      setIsLoading(true);
      const result = await generateMathWiz(grade, subject, language, term);
      const fixed = result.map(q => {
          if (!q.options.some(o => normalizedCompare(o, q.answer))) {
              q.options[Math.floor(Math.random() * q.options.length)] = q.answer;
          }
          return q;
      });
      setData(fixed);
      setCurrentIdx(0);
      setScore(0);
      setSelected(null);
      setIsFinished(false);
      setIsLoading(false);
    };

    const handleContinue = async () => {
      setIsLoading(true);
      const result = await generateMathWiz(grade, subject, language, term);
      const fixed = result.map(q => {
          if (!q.options.some(o => normalizedCompare(o, q.answer))) {
              q.options[Math.floor(Math.random() * q.options.length)] = q.answer;
          }
          return q;
      });
      setData(prev => [...prev, ...fixed]);
      setCurrentIdx(data.length);
      setSelected(null);
      setIsFinished(false);
      setIsLoading(false);
    };

    const handleChoice = (choice: string) => {
      if (selected !== null) return;
      setSelected(choice);
      if (normalizedCompare(choice, data[currentIdx].answer)) {
        setScore(score + 1);
        confetti({ particleCount: 50 });
      }
    };

    if (isLoading) return <LoadingScreen message="වේගවත් ගණිත අභියෝගය සූදානම් කරමින්..." />;
    if (isFinished) return <CongratsScreen score={score} total={data.length} onRetry={loadData} onClose={onClose} onContinue={handleContinue} />;

    if (data.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center">
            <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-500">
              <X size={40} />
            </div>
            <p className="font-bold text-slate-600 dark:text-slate-300">
              ගණිත ගැටලු ලබා ගැනීමට අපහසු වුණා. <br/>
              (Could not load math puzzles.)
            </p>
            <button onClick={loadData} className="bg-primary text-white px-8 py-3 rounded-2xl font-bold">නැවත උත්සාහ කරන්න (Retry)</button>
          </div>
        );
    }

    const currentQuestion = data[currentIdx];

    return (
      <div className="w-full max-w-xl space-y-6">
        <GameHeader current={currentIdx + 1} total={data.length} score={score} title="Math Wiz" />
        <motion.div key={currentIdx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="liquid-glass p-8 rounded-[40px] border-4 border-emerald-400/30 space-y-8">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-4 border-4 border-dashed border-emerald-500/20">
             <Brain size={32} />
          </div>
          <div className="text-xl font-black dark:text-white leading-relaxed text-center px-4">
            {currentQuestion?.question}
          </div>
          <div className="grid gap-3">
            {currentQuestion?.options?.map((opt, i) => (
              <button key={i} onClick={() => handleChoice(opt)} className={`p-4 rounded-2xl font-bold text-sm transition-all border-2 ${selected === opt ? (normalizedCompare(opt, currentQuestion?.answer || '') ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-rose-500 text-white border-rose-600') : 'bg-white/50 dark:bg-white/5 border-white/20 hover:border-emerald-500/50 text-slate-700 dark:text-white'}`}>
                {opt}
              </button>
            ))}
          </div>
          {selected && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl text-xs font-bold text-emerald-600 dark:text-emerald-400 text-center">{currentQuestion?.explanation}</div>
                <button onClick={() => { if (currentIdx < data.length - 1) { setCurrentIdx(currentIdx + 1); setSelected(null); } else { setIsFinished(true); } }} className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black shadow-lg">මීළඟ ප්‍රශ්නය (Next)</button>
             </motion.div>
          )}
        </motion.div>
      </div>
    );
};

// --- SEQUENCE MASTER GAME (අනුපිළිවෙල ගලපන්න) ---
export const SequenceMasterGame = ({ grade, subject, language, term, onClose }: any) => {
    const [data, setData] = useState<SequenceMasterQuestion[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [scrambledSteps, setScrambledSteps] = useState<string[]>([]);
    const [userOrdered, setUserOrdered] = useState<string[]>([]);
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => { loadData(); }, []);
    const loadData = async () => {
      setIsLoading(true);
      const result = await generateSequenceMaster(grade, subject, language, term);
      setData(result);
      setCurrentIdx(0);
      setScore(0);
      setIsFinished(false);
      if (result.length > 0) {
        prepareQuestion(result[0]);
      }
      setIsLoading(false);
    };

    const handleContinue = async () => {
      setIsLoading(true);
      const result = await generateSequenceMaster(grade, subject, language, term);
      setData(prev => [...prev, ...result]);
      setCurrentIdx(data.length);
      setIsFinished(false);
      if (result.length > 0) {
        prepareQuestion(result[0]);
      }
      setIsLoading(false);
    };

    const prepareQuestion = (q: SequenceMasterQuestion) => {
      const stepsCopy = [...q.steps];
      let attempts = 0;
      while (attempts < 10) {
        stepsCopy.sort(() => Math.random() - 0.5);
        if (stepsCopy.join('|') !== q.steps.join('|')) break;
        attempts++;
      }
      setScrambledSteps(stepsCopy);
      setUserOrdered([]);
      setIsChecked(false);
      setIsCorrect(false);
    };

    const selectStep = (step: string) => {
      if (isChecked) return;
      if (userOrdered.includes(step)) {
        setUserOrdered(prev => prev.filter(s => s !== step));
      } else {
        setUserOrdered(prev => [...prev, step]);
      }
    };

    const checkOrder = () => {
      if (!data || !data[currentIdx]) return;
      const q = data[currentIdx];
      const correct = userOrdered.join('|') === q.steps.join('|');
      setIsCorrect(correct);
      setIsChecked(true);
      if (correct) {
        setScore(prev => prev + 1);
        confetti();
      }
    };

    const next = () => {
      if (currentIdx < data.length - 1) {
        setCurrentIdx(prev => prev + 1);
        prepareQuestion(data[currentIdx + 1]);
      } else {
        setIsFinished(true);
      }
    };

    if (isLoading) return <LoadingScreen message="අනුපිළිවෙල ගලපන්න සූදානම් කරමින්..." />;
    if (isFinished) return <CongratsScreen score={score} total={data.length} onRetry={loadData} onClose={onClose} onContinue={handleContinue} />;

    if (data.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center">
            <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center text-rose-500">
              <X size={40} />
            </div>
            <p className="font-bold text-slate-600 dark:text-slate-300">
              අනුපිළිවෙල ගැටලු ලබා ගැනීමට අපහසු වුණා. <br/>
              (Could not load sequencing puzzles.)
            </p>
            <button onClick={loadData} className="bg-primary text-white px-8 py-3 rounded-2xl font-bold">නැවත උත්සාහ කරන්න (Retry)</button>
          </div>
        );
    }

    const currentQuestion = data[currentIdx];

    return (
      <div className="w-full max-w-xl space-y-6">
        <GameHeader current={currentIdx + 1} total={data.length} score={score} title="Sequence Master" />
        <motion.div key={currentIdx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="liquid-glass p-8 rounded-[40px] border-4 border-amber-400/30 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-black text-xl dark:text-white leading-tight">අනුපිළිවෙලට සකසන්න:</h3>
            <p className="text-lg font-bold text-slate-600 dark:text-slate-300 italic">"{currentQuestion?.concept}"</p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">පහත පියවර තෝරන්න (Select steps in correct order):</p>
            <div className="grid gap-2">
              {scrambledSteps.map((step, idx) => {
                const selectedIndex = userOrdered.indexOf(step);
                const isSelected = selectedIndex !== -1;
                return (
                  <button key={idx} onClick={() => selectStep(step)} disabled={isChecked} className={`p-4 rounded-2xl border-2 text-left font-bold text-sm transition-all flex items-center justify-between ${isSelected ? 'bg-primary/10 border-primary text-primary shadow-md shadow-primary/5' : 'bg-white/50 dark:bg-white/5 border-white/20 hover:border-primary/50 text-slate-700 dark:text-white'}`}>
                    <span>{step}</span>
                    {isSelected && (
                      <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-black text-xs shadow-md">
                        {selectedIndex + 1}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {userOrdered.length > 0 && !isChecked && (
            <div className="space-y-3">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">ඔබ තේරූ අනුපිළිවෙල (Your Sequence):</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {userOrdered.map((step, idx) => (
                  <div key={idx} className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                    <span className="opacity-70 font-black">{idx + 1}.</span> {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            {!isChecked ? (
              <button onClick={checkOrder} disabled={userOrdered.length !== currentQuestion.steps.length} className="w-full bg-amber-500 text-white py-4 rounded-2xl font-black shadow-lg disabled:opacity-50 transition-all active:scale-95">
                පිළිතුර පරීක්ෂා කරන්න (Check Sequence)
              </button>
            ) : (
              <div className="space-y-4">
                <div className={`p-5 rounded-3xl border-4 text-center font-black text-lg ${isCorrect ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600' : 'bg-rose-500/10 border-rose-500 text-rose-600'}`}>
                  {isCorrect ? 'නිවැරදියි! සුපිරි වැඩක් 🌟' : 'වැරදියි! නිවැරදි අනුපිළිවෙල මෙන්න:'}
                </div>

                {!isCorrect && (
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 space-y-2">
                    {currentQuestion.steps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3 font-bold text-sm text-slate-700 dark:text-slate-300">
                        <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center font-black text-xs">{idx + 1}</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl text-xs font-bold text-amber-700 dark:text-amber-400 leading-relaxed">
                  {currentQuestion.explanation}
                </div>

                <button onClick={next} className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-lg hover:bg-primary-dark active:scale-95 transition-all">
                  මීළඟ අභියෝගය (Next)
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
};

// --- HELPER COMPONENTS ---
const LoadingScreen = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center">
      <Loader2 className="animate-spin text-primary" size={64} />
      <p className="font-black text-slate-500 animate-pulse">{message}</p>
    </div>
);

const GameHeader = ({ current, total, score, title }: any) => (
    <div className="flex items-center justify-between bg-white/40 dark:bg-slate-800/40 p-5 rounded-3xl backdrop-blur-md border border-white/40">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/20"><HelpCircle size={20} /></div>
          <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p><p className="font-bold">{current} / {total}</p></div>
        </div>
        <div className="text-right"><p className="text-[10px] font-black text-secondary uppercase">ලකුණු (Score)</p><p className="text-xl font-black text-secondary leading-none">{score}</p></div>
    </div>
);

const CongratsScreen = ({ score, total, onRetry, onClose, onContinue }: any) => {
  useEffect(() => {
    // Continuous lovely confetti bursts for a rich reward feel!
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
  }, []);

  // Generate some sparkle positions to float inside the congrats screen itself!
  const sparkles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    top: `${10 + Math.random() * 80}%`,
    delay: Math.random() * 1.5,
  }));

  return (
    <div className="relative flex flex-col items-center gap-8 p-10 bg-gradient-to-b from-secondary/10 to-primary/5 dark:from-secondary/15 dark:to-primary/10 rounded-[50px] border-4 border-secondary/30 text-center overflow-hidden shadow-2xl max-w-md w-full">
      {/* Sparkles Particle Layer inside the Card */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], y: [10, -30, -70] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: s.delay }}
            className="absolute text-yellow-400 dark:text-yellow-300"
            style={{ left: s.left, top: s.top }}
          >
            <Sparkles size={16} />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ scale: 0.8, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="w-32 h-32 bg-secondary/10 dark:bg-secondary/20 rounded-[40px] flex items-center justify-center text-secondary relative"
      >
        <Trophy size={80} fill="currentColor" className="opacity-70 animate-pulse" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 rounded-[40px] border-4 border-dashed border-secondary/40" 
        />
      </motion.div>
      <div className="space-y-2 relative z-10">
        <h2 className="text-4xl font-black text-slate-800 dark:text-white">සුපිරි වැඩක්! 🎉</h2>
        <p className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Super Job!</p>
        <p className="text-2xl font-black text-secondary">ලකුණු මට්ටම: {score} / {total}</p>
      </div>
      <div className="flex flex-col w-full gap-3 relative z-10">
        {onContinue && (
          <button onClick={onContinue} className="bg-amber-500 hover:bg-amber-600 text-white py-5 rounded-[24px] font-black shadow-xl hover:shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
            <Sparkles size={18} fill="white" /> දිගටම සෙල්ලම් කරන්න (Unlimited Play)
          </button>
        )}
        <button onClick={onRetry} className="bg-emerald-500 hover:bg-emerald-600 text-white py-5 rounded-[24px] font-black shadow-xl hover:shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
          <RotateCcw size={18} /> නැවත සෙල්ලම් කරන්න (Retry)
        </button>
        <button onClick={onClose} className="bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 py-4 rounded-[24px] font-black border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white transition-all active:scale-95">
          ඉවත්වන්න (Back)
        </button>
      </div>
    </div>
  );
};
