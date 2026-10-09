import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Send, 
  Calculator, 
  FlaskConical, 
  History as HistoryIcon, 
  Cpu, 
  Type, 
  Languages,
  ChevronRight,
  User,
  Bot,
  Loader2,
  Trash2,
  HelpCircle,
  Menu,
  X,
  ArrowLeft,
  ArrowRight,
  Play,
  Music,
  Palette,
  Theater,
  Wind,
  Globe2,
  Users,
  Lightbulb,
  BarChart3,
  Home,
  Radio,
  Sprout,
  Library,
  GraduationCap,
  Gamepad2,
  Trophy,
  Flame,
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon,
  Sparkles,
  Brain,
  RotateCcw,
  Star,
  Zap,
  Layout,
  Settings,
  MessageCircle,
  Download,
  FileText,
  Timer,
  Apple,
  Monitor,
  Smartphone,
  Boxes,
  Eye,
  Volume2,
  Edit3,
  SmilePlus,
  Smile,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Search,
  Copy,
  Check,
  Mic
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import confetti from 'canvas-confetti';
import { 
  chatWithAssistant, 
  getSyllabusSummary, 
  generateQuiz, 
  QuizQuestion, 
  generateGameWords, 
  chatWithRobot, 
  analyzeExamAndPredict, 
  getEduModResponse,
  generateDeepSyllabusLesson,
  DeepSyllabusLessonResult
} from './services/gemini';
import { exportToPDF } from './utils/pdfExport';
import { 
  FactOrFictionGame, 
  FillBlanksGame, 
  OddOneOutGame, 
  WordHeroGame, 
  SortingGame,
  RiddleGame,
  EmojiRiddleGame,
  MathWizGame,
  SequenceMasterGame
} from './components/NewGames';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeToggle } from './components/ThemeToggle';
import { Navigation } from './components/Navigation';
import WordScramble from './components/games/WordScramble';
import MatchMaster from './components/games/MatchMaster';
import { StudyTimer } from './components/StudyTimer';
import { SparkleOverlay } from './components/SparkleOverlay';
import { QuickNotes } from './components/QuickNotes';
import { SystemSoftwareCenter } from './components/SystemSoftwareCenter';
import { Watermark } from './components/Watermark';
import { DailyBrainSpark } from './components/DailyBrainSpark';
import { Leaderboard } from './components/Leaderboard';
import { GeminiSparkle } from './components/GeminiSparkle';
import { speakAloud, playRoboSound } from './components/AIEyePet';
import { 
  SUBJECT_CATEGORIES, 
  ALL_SUBJECTS, 
  SUBJECT_THEMES, 
  SUBJECT_RESOURCES, 
  SYLLABUS_DATA,
  SUGGESTIONS,
  getSyllabusForSubject 
} from './constants';

interface Message {
  role: 'user' | 'model';
  parts: string;
}

export interface EduModMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  reactions?: Record<string, string[]>;
}

export const EDU_MOD_REACTIONS = [
  { emoji: '👍', label: 'එකඟයි (Agree)', meaning: 'Agreement', category: 'agreement' },
  { emoji: '🎯', label: 'හරියටම හරි (Spot on)', meaning: 'Agreement', category: 'agreement' },
  { emoji: '🤔', label: 'හිතන්න ඕනේ (Wondering)', meaning: 'Confusion', category: 'confusion' },
  { emoji: '❓', label: 'තේරුණේ නෑ (Confused)', meaning: 'Confusion', category: 'confusion' },
  { emoji: '👏', label: 'සුපිරි! (Encouragement)', meaning: 'Encouragement', category: 'encouragement' },
  { emoji: '💡', label: 'හොඳ අදහසක් (Insightful)', meaning: 'Encouragement', category: 'encouragement' },
  { emoji: '❤️', label: 'ආදරෙයි (Love it)', meaning: 'Encouragement', category: 'encouragement' },
  { emoji: '🚀', label: 'ජයවේවා! (Keep going)', meaning: 'Encouragement', category: 'encouragement' },
];

const ThemeBackground = ({ subject }: { subject: string }) => {
  const theme = SUBJECT_THEMES[subject] || SUBJECT_THEMES['default'];
  
  if (!subject || !theme) return null;

  const renderAnimationItems = () => {
    switch (theme.animation) {
      case 'bubbles':
        return Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white/20 blur-[2px] animate-bubble"
            style={{ 
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              '--left': `${Math.random() * 100}%`,
              '--duration': `${Math.random() * 15 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            } as any}
          />
        ));
      case 'math':
        const mathSymbols = ['+', '−', '×', '÷', '=', 'π', '√', 'Σ', '∫', '∞', '∆', '1', '0', 'x', 'y'];
        return Array.from({ length: 25 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute font-mono text-2xl font-black text-secondary/15 animate-fall"
            style={{ 
              '--left': `${Math.random() * 100}%`,
              '--duration': `${Math.random() * 15 + 20}s`,
              animationDelay: `${Math.random() * 10}s`
            } as any}
          >
            {mathSymbols[Math.floor(Math.random() * mathSymbols.length)]}
          </div>
        ));
      case 'matrix':
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/?!@#$%^&*()_+';
        return Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute top-0 font-mono text-xs font-bold text-emerald-400/20 whitespace-pre animate-matrix leading-none"
            style={{ 
              '--left': `${Math.random() * 100}%`,
              '--duration': `${Math.random() * 5 + 3}s`,
              animationDelay: `${Math.random() * 5}s`
            } as any}
          >
            {Array.from({ length: 15 }).map(() => characters[Math.floor(Math.random() * characters.length)]).join('\n')}
          </div>
        ));
      case 'aesthetic':
        return (
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <motion.path
                d="M0,500 C200,400 300,600 500,500 C700,400 800,600 1000,500 L1000,1000 L0,1000 Z"
                fill={`url(#grad-${subject})`}
                animate={{
                  d: [
                    "M0,500 C200,400 300,600 500,500 C700,400 800,600 1000,500 L1000,1000 L0,1000 Z",
                    "M0,500 C200,600 300,400 500,500 C700,600 800,400 1000,500 L1000,1000 L0,1000 Z",
                    "M0,500 C200,400 300,600 500,500 C700,400 800,600 1000,500 L1000,1000 L0,1000 Z"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id={`grad-${subject}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={theme.glowColor} stopOpacity="0.4" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );
      case 'ancient':
        return (
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
             <BookOpen className="w-[80vw] h-[80vw] animate-spin-slow" />
          </div>
        );
      case 'nature':
        return Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20, rotate: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              y: '110vh',
              x: [0, 50, -50, 0],
              rotate: 360
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute text-emerald-500/20"
            style={{ left: `${Math.random() * 100}%` }}
          >
            <Sprout size={Math.random() * 30 + 20} />
          </motion.div>
        ));
      case 'language':
        const chars = subject === 'sinhala' ? ['අ', 'ක', 'ම', 'ත', 'ල', 'හ', 'ස', 'න'] : ['A', 'B', 'C', 'Word', 'Verb', 'Noun'];
        return Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0, 0.2, 0],
              scale: [0.5, 1.2, 0.5],
              y: [0, -100, 0],
              x: [0, 30, -30, 0]
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            className="absolute font-black text-primary/10 select-none pointer-events-none"
            style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 20}px`
            }}
          >
            {chars[Math.floor(Math.random() * chars.length)]}
          </motion.div>
        ));
      case 'geometric':
        return Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.15, 0.05],
              x: [0, 100, 0],
              y: [0, -100, 0]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute rounded-xl border-2 border-${theme.color}-500/20`}
            style={{ 
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ));
      default:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <motion.div 
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="w-[100vw] h-[100vw] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl"
            />
          </div>
        );
    }
  };

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-1000 ${theme.animation === 'ancient' ? 'parchment-texture' : ''}`}>
      {renderAnimationItems()}
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-${theme.color}-500/10`} />
    </div>
  );
};

const BackgroundOrbs = ({ theme, subjectTheme }: { theme: 'light' | 'dark', subjectTheme?: string }) => {
  const subTheme = subjectTheme ? (SUBJECT_THEMES[subjectTheme] || SUBJECT_THEMES['default']) : null;
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-orb transition-all duration-1000`}
        style={{ 
          backgroundColor: subTheme ? `${subTheme.glowColor}33` : (theme === 'light' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(6, 182, 212, 0.3)')
        }}
      />
      <div 
        className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-orb transition-all duration-1000`}
        style={{ 
          animationDelay: '-5s',
          backgroundColor: subTheme ? `${subTheme.glowColor}1a` : (theme === 'light' ? 'rgba(244, 63, 94, 0.2)' : 'rgba(168, 85, 247, 0.3)')
        }}
      />
    </div>
  );
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "සුභ උදෑසනක්"; // Good Morning
  if (hour < 17) return "සුභ පස්වරුවක්"; // Good Afternoon
  return "සුභ සන්ධ්‍යාවක්"; // Good Evening
};

const getEnglishGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

export default function App() {
  const [userName, setUserName] = useState(() => localStorage.getItem('edu_ai_user_name') || '');
  const [step, setStep] = useState<'welcome' | 'register' | 'language' | 'subject' | 'term' | 'details' | 'chat'>(
    userName ? 'welcome' : 'register'
  );
  const [appView, setAppView] = useState<'home' | 'subjects' | 'game' | 'profile' | 'learning' | 'pastpapers' | 'robot' | 'notes'>('home');
  const [userLang, setUserLang] = useState('Sinhala');
  const [userGrade, setUserGrade] = useState('Grade 10');
  const [selectedSubject, setSelectedSubject] = useState('sinhala');
  const [selectedTerm, setSelectedTerm] = useState<'1st Term' | '2nd Term' | '3rd Term'>('1st Term');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('np_theme') as any) || 'dark');
  const [colorTheme, setColorTheme] = useState(() => localStorage.getItem('np_color_theme') || 'royal');
  const [showSunglasses, setShowSunglasses] = useState(false);
  const [syllabusSummary, setSyllabusSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([]);
  
  const [showInstallSuccess, setShowInstallSuccess] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const [eyeComfort, setEyeComfort] = useState(() => localStorage.getItem('np_eye_comfort') === 'true');
  const [isStudyMode, setIsStudyMode] = useState(() => localStorage.getItem('np_study_mode') === 'true');

  useEffect(() => {
    localStorage.setItem('np_eye_comfort', eyeComfort.toString());
  }, [eyeComfort]);

  useEffect(() => {
    localStorage.setItem('np_study_mode', isStudyMode.toString());
  }, [isStudyMode]);
  
  useEffect(() => {
    // Initial boot sequence to prevent "Launch Problem"
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setDeferredPrompt(null);
      setShowInstallSuccess(true);
      confetti();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if app is already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsAppInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallApp = async (os: 'ios' | 'android' | 'windows') => {
    // For Android and Windows, if prompt is available, trigger it
    if ((os === 'android' || os === 'windows') && deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (os === 'ios') {
      alert('iOS සඳහා: Safari මෙනුවේ "Add to Home Screen" තෝරන්න. (For iOS: Select "Add to Home Screen" in Safari menu)');
    } else {
      alert('Browser මෙනුවේ (⋮) "Install App" තෝරන්න. (Select "Install App" in Browser menu)');
    }
    
    confetti();
  };
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Game/Rewards State
  const [points, setPoints] = useState(() => Number(localStorage.getItem('np_points')) || 0);
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('np_streak')) || 1);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [activeGame, setActiveGame] = useState<'quiz' | 'scramble' | 'match' | 'emojiriddle' | 'factfiction' | 'sorting' | 'fillblank' | 'oddoneout' | 'hangman' | 'riddle' | 'mathwiz' | 'sequencemaster' | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [companionMood, setCompanionMood] = useState<'happy' | 'cool' | 'smart'>('happy');
  const [robotMood, setRobotMood] = useState<'happy' | 'thinking' | 'idle' | 'smart' | 'cool'>('happy');
  const [robotSpeech, setRobotSpeech] = useState<string>('හෙලෝ යාළුවා! මම ඔයාගේ AI සහකරු එඩියුබොට්. අද මොනවද අපි ඉගෙන ගන්නේ? 🤖✨');
  const [robotInput, setRobotInput] = useState<string>('');
  const [isRobotLoading, setIsRobotLoading] = useState<boolean>(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  
  // PDF & Predictor & Edu-Mod States
  const [pastPapersTab, setPastPapersTab] = useState<'library' | 'predictor'>('library');
  const [predictorData, setPredictorData] = useState<string>('');
  const [predictionResult, setPredictionResult] = useState<string>('');
  const [isPredicting, setIsPredicting] = useState<boolean>(false);

  const [eduModMessages, setEduModMessages] = useState<EduModMessage[]>([]);
  const [activeReactionPickerMessageId, setActiveReactionPickerMessageId] = useState<string | null>(null);
  const eduModEndRef = useRef<HTMLDivElement>(null);
  const [eduModInput, setEduModInput] = useState<string>('');
  const [isEduModLoading, setIsEduModLoading] = useState<boolean>(false);
  const [eduModTopic, setEduModTopic] = useState<string>('භෞතික විද්‍යාව (Physics)');
  const [eduModStarted, setEduModStarted] = useState<boolean>(false);
  const [robotTab, setRobotTab] = useState<'bot' | 'mod'>('bot');

  const [sparkleOverlay, setSparkleOverlay] = useState<{
    isVisible: boolean;
    title: string;
    subtitle?: string;
    points?: number;
    type?: 'study' | 'game' | 'break';
  }>({
    isVisible: false,
    title: '',
    subtitle: '',
    points: 0,
    type: 'game',
  });

  // Game Zone Configuration
  const [gameGrade, setGameGrade] = useState('All');
  const [gameSubject, setGameSubject] = useState('All');
  const [gameTerm, setGameTerm] = useState('All');
  const [showGameSettings, setShowGameSettings] = useState(true);
  const [gameTab, setGameTab] = useState<'games' | 'leaderboard'>('games');

  // Gemini Chat UI States
  const [copiedMessageIdx, setCopiedMessageIdx] = useState<number | null>(null);
  const [thumbsFeedback, setThumbsFeedback] = useState<Record<number, 'up' | 'down'>>({});

  // Deep Research Lesson States
  const [deepResearchLoading, setDeepResearchLoading] = useState<boolean>(false);
  const [deepResearchLesson, setDeepResearchLesson] = useState<DeepSyllabusLessonResult | null>(null);
  const [selectedUnitForResearch, setSelectedUnitForResearch] = useState<string | null>(null);
  const [deepQuizAnswers, setDeepQuizAnswers] = useState<Record<number, number>>({});
  const [deepQuizSubmitted, setDeepQuizSubmitted] = useState<boolean>(false);
  const [syllabusSearchTerm, setSyllabusSearchTerm] = useState<string>('');
  const [syllabusGradeFilter, setSyllabusGradeFilter] = useState<string>(() => localStorage.getItem('edu_ai_user_grade') || 'Grade 10');
  const [sinhalaBookFilter, setSinhalaBookFilter] = useState<'all' | 'book1' | 'book2' | 'poetry' | 'prose' | 'stories' | 'drama'>('all');

  const colorModels = React.useMemo(() => [
     { id: 'royal', name: 'Royal (Imperial Gold & Royal Sapphire)', primary: '#D97706', secondary: '#2563EB', accent: '#F59E0B' },
     { id: 'default', name: 'Default Indigo', primary: '#6366F1', secondary: '#06B6D4', accent: '#8B5CF6' },
     { id: 'sunset', name: 'Sunset Crimson', primary: '#F43F5E', secondary: '#F59E0B', accent: '#FB7185' },
     { id: 'emerald', name: 'Forest Emerald', primary: '#059669', secondary: '#10B981', accent: '#34D399' },
     { id: 'sweet', name: 'Sweet Fuchsia', primary: '#D946EF', secondary: '#8B5CF6', accent: '#E879F9' },
     { id: 'ocean', name: 'Ocean Cyan', primary: '#0891B2', secondary: '#0EA5E9', accent: '#38BDF8' }
  ], []);

  useEffect(() => {
    localStorage.setItem('np_color_theme', colorTheme);
    const selected = colorModels.find(m => m.id === colorTheme) || colorModels[0];
    document.documentElement.style.setProperty('--color-primary', selected.primary);
    document.documentElement.style.setProperty('--color-secondary', selected.secondary);
    if ((selected as any).accent) {
      document.documentElement.style.setProperty('--color-accent', (selected as any).accent);
    }
  }, [colorTheme, colorModels]);

  useEffect(() => {
    localStorage.setItem('np_theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark');
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.body.classList.remove('dark');
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [theme]);

  // Sync with local storage
  useEffect(() => {
    localStorage.setItem('np_points', points.toString());
  }, [points]);

  useEffect(() => {
    // Check daily streak
    const lastLogin = localStorage.getItem('np_last_login');
    const today = new Date().toDateString();
    
    if (lastLogin && lastLogin !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastLogin === yesterday.toDateString()) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem('np_streak', newStreak.toString());
      } else {
        setStreak(1);
        localStorage.setItem('np_streak', '1');
      }
    }
    localStorage.setItem('np_last_login', today);
  }, []);

  useEffect(() => {
    if (step === 'chat' && messages.length === 0) {
      const subjectName = ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name || selectedSubject;
      const sinhalaSubject = selectedSubject === 'maths' ? 'ගණිතය' : selectedSubject === 'science' ? 'විද්‍යාව' : subjectName;
      const termName = selectedTerm === '1st Term' ? 'පළමු' : selectedTerm === '2nd Term' ? 'දෙවන' : 'තෙවන';
      
      setMessages([{ 
        role: 'model', 
        parts: `ආයුබෝවන්! මම Edu.ai. හොඳයි, අපි එහෙනම් ${termName} වාරයේ ${sinhalaSubject} පාඩම් ටික පටන් ගමුද? (Hello! I'm Edu.ai. Shall we start the ${selectedTerm} ${subjectName} lessons then?)` 
      }]);
    }
  }, [step]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    eduModEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [eduModMessages, isEduModLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = [...messages, userMessage];
      const response = await chatWithAssistant(history, { 
        grade: userGrade, 
        language: userLang, 
        subject: selectedSubject,
        term: selectedTerm,
        userName: userName || 'යාළුවා'
      });
      setMessages(prev => [...prev, { role: 'model', parts: response }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        parts: "සමාවෙන්න, මට දැන් පිළිතුරු දෙන්න අපහසුයි. (Sorry, I'm having trouble responding right now. Please check your connection.)" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRobotChat = async (text: string) => {
    if (!text.trim() || isRobotLoading) return;
    setIsRobotLoading(true);
    setRobotMood('thinking');
    setRobotSpeech('හිතමින් පවතිනවා... 🤖💭');
    playRoboSound('thinking');
    try {
      const response = await chatWithRobot(text, robotMood, userName, userGrade, userLang);
      setRobotSpeech(response);
      
      const moods: ('happy' | 'cool' | 'smart')[] = ['happy', 'cool', 'smart'];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      setRobotMood(randomMood);
      
      // Auto speak response for extreme realism
      speakAloud(response);
      playRoboSound('success');
    } catch (e) {
      const errMsg = "බීප්... සිග්නල් දෝෂයක්. පස්සේ කතා කරමු! 🤖🔌";
      setRobotSpeech(errMsg);
      setRobotMood('idle');
      speakAloud(errMsg);
    } finally {
      setIsRobotLoading(false);
    }
  };

  const handleFeedRobot = () => {
    if (points >= 20) {
      setPoints(prev => prev - 20);
      setRobotMood('happy');
      const speech = "යාම් යාම්! ⚡ රසවත් එනර්ජි එකක් ලැබුණා! දැන් මම ගොඩක් ශක්තිමත්! 🤖💖 තෑන්ක්ස් යාළුවා!";
      setRobotSpeech(speech);
      speakAloud(speech);
      playRoboSound('feed');
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      setRobotMood('cool');
      const speech = "බීප්... ඔයාට ප්‍රමාණවත් ලකුණු නෑ. පාඩම් කරලා, ප්‍රශ්න පත්තර කරලා ලකුණු එකතු කරන් එන්න! 🏆";
      setRobotSpeech(speech);
      speakAloud(speech);
      playRoboSound('click');
    }
  };

  const clearChat = () => {
    const subjectName = ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name || selectedSubject;
    setMessages([{ 
      role: 'model', 
      parts: `ආයුබෝවන්! මම ඔබේ EDU.AI සහකරු. මම දන්නවා ඔබ ${userGrade} ශ්‍රේණියේ ${subjectName} හදාරන බව. (Hello! I'm your EDU.AI. I know you're in ${userGrade} studying ${subjectName}.)` 
    }]);
  };

  const fetchSummary = async (termOverride?: '1st Term' | '2nd Term' | '3rd Term') => {
    if (!selectedSubject) return;
    const termToUse = termOverride || selectedTerm;
    setIsSummarizing(true);
    setStep('details');
    try {
      const subjectName = ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name || selectedSubject;
      const summary = await getSyllabusSummary(userGrade, subjectName, userLang, termToUse);
      setSyllabusSummary(summary);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handlePredictExams = async () => {
    if (!predictorData.trim()) return;
    setIsPredicting(true);
    try {
      const subjectName = ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name || selectedSubject;
      const res = await analyzeExamAndPredict(predictorData, subjectName, userGrade, userLang);
      setPredictionResult(res);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleExportSummaryPDF = async () => {
    if (!syllabusSummary) return;
    try {
      const subjectName = ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name || selectedSubject;
      await exportToPDF(
        `${subjectName} Syllabus Summary`,
        syllabusSummary,
        {
          userName: userName || 'යාළුවා',
          grade: userGrade,
          subject: subjectName,
          term: selectedTerm,
          language: userLang
        }
      );
    } catch (err) {
      console.error(err);
      alert('PDF එක සෑදීමේදී ගැටලුවක් මතු විය. කරුණාකර නැවත උත්සාහ කරන්න.');
    }
  };

  const handleExportPredictorPDF = async () => {
    if (!predictionResult) return;
    try {
      const subjectName = ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name || selectedSubject;
      await exportToPDF(
        `${subjectName} Exam Predictions`,
        predictionResult,
        {
          userName: userName || 'යාළුවා',
          grade: userGrade,
          subject: subjectName,
          term: selectedTerm,
          language: userLang
        }
      );
    } catch (err) {
      console.error(err);
      alert('PDF එක සෑදීමේදී ගැටලුවක් මතු විය. කරුණාකර නැවත උත්සාහ කරන්න.');
    }
  };

  const handleEnterLessons = (customSubject?: string) => {
    if (!userName.trim() || !userGrade) return;
    localStorage.setItem('edu_ai_user_name', userName);
    localStorage.setItem('edu_ai_user_grade', userGrade);
    const sub = customSubject || selectedSubject || 'sinhala';
    setSelectedSubject(sub);
    setSyllabusGradeFilter(userGrade);
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.6 }
    });
    setStep('chat');
    setAppView('subjects');
  };

  const handleDeepResearchLesson = async (unitTopic: string, gradeToUse?: string, subjectToUse?: string) => {
    const targetGrade = gradeToUse || syllabusGradeFilter || userGrade;
    const targetSubject = subjectToUse || selectedSubject || 'sinhala';
    setSelectedUnitForResearch(unitTopic);
    setDeepResearchLoading(true);
    setDeepQuizAnswers({});
    setDeepQuizSubmitted(false);
    playRoboSound('thinking');
    
    try {
      const subjectName = ALL_SUBJECTS.find(s => s.id === targetSubject)?.name || targetSubject;
      const result = await generateDeepSyllabusLesson({
        grade: targetGrade,
        subject: subjectName,
        unitTopic: unitTopic,
        term: selectedTerm,
        language: userLang
      });
      setDeepResearchLesson(result);
      playRoboSound('success');
    } catch (err) {
      console.error("Deep Research Lesson Error:", err);
    } finally {
      setDeepResearchLoading(false);
    }
  };

  const handleExportDeepLessonPDF = async () => {
    if (!deepResearchLesson) return;
    try {
      const subjectName = ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name || selectedSubject;
      const mdContent = `
# ${deepResearchLesson.lessonTitle}
**ශ්‍රී ලංකා ජාතික අධ්‍යාපන ආයතනය (NIE) විෂය නිර්දේශ ගැඹුරු පර්යේෂණ පාඩම**

- **ශ්‍රේණිය (Grade):** ${deepResearchLesson.grade}
- **විෂය (Subject):** ${deepResearchLesson.subject}
- **වාරය (Academic Term):** ${deepResearchLesson.term}

---

## 🎯 නිපුණතා හා අපේක්ෂිත ඉගෙනුම් ඵල (Competencies)
${deepResearchLesson.competencies.map(c => `- ${c}`).join('\n')}

---

## 📖 ගැඹුරු විෂය කරුණු විවරණය (In-Depth Syllabus Guide)
${deepResearchLesson.markdownContent}

---

## 📐 ප්‍රධාන සූත්‍ර, අර්ථ දැක්වීම් හා නීති (Key Formulas & Laws)
${deepResearchLesson.keyFormulasOrTerms.map(f => `- **${f.term}:** ${f.explanation}`).join('\n')}

---

## 💡 විභාග රහස් හා උපදෙස් (Exam Master Tips)
${deepResearchLesson.examTips.map(t => `- 📌 ${t}`).join('\n')}

---

## ❓ ස්වයං ඇගයීම් ප්‍රශ්නාවලිය (Self-Assessment Quiz)
${deepResearchLesson.quickQuiz.map((q, idx) => `
**ප්‍රශ්නය ${idx + 1}:** ${q.question}
${q.options.map((opt, optIdx) => `  ${optIdx === q.answerIndex ? '✅' : '⚪'} ${opt}`).join('\n')}
*විවරණය:* ${q.explanation}
`).join('\n')}
      `;

      await exportToPDF(
        `${deepResearchLesson.lessonTitle} - Deep Syllabus Guide`,
        mdContent,
        {
          userName: userName || 'ශිෂ්‍යයා',
          grade: deepResearchLesson.grade,
          subject: subjectName,
          term: deepResearchLesson.term,
          language: userLang
        }
      );
      confetti();
    } catch (err) {
      console.error(err);
      alert('PDF එක සෑදීමේදී ගැටලුවක් මතු විය.');
    }
  };

  const handleStartLearningUnitInChat = (unitTopic: string, subId?: string) => {
    const targetSubject = subId || selectedSubject || 'sinhala';
    setSelectedSubject(targetSubject);
    setAppView('learning');
    setDeepResearchLesson(null);
    setSelectedUnitForResearch(null);
    const subjectName = ALL_SUBJECTS.find(s => s.id === targetSubject)?.name || targetSubject;
    const initialPrompt = `මට ${userGrade} ශ්‍රේණියේ ${subjectName} විෂය නිර්දේශයේ "${unitTopic}" පාඩම පියවරෙන් පියවර, ඉතා පැහැදිලිව සහ ආසාවෙන් ඉගෙන ගන්න ඕනෙ. මූලික සංකල්ප වලින් පටන් අරන් මට සරල ප්‍රශ්නයක් අහන්න. 📚✨`;
    
    setMessages([
      { role: 'user', parts: initialPrompt }
    ]);
    setIsLoading(true);
    chatWithAssistant([{ role: 'user', parts: initialPrompt }], {
      grade: userGrade,
      language: userLang,
      subject: targetSubject,
      term: selectedTerm,
      userName: userName || 'ශිෂ්‍යයා'
    }).then(res => {
      setMessages(prev => [...prev, { role: 'model', parts: res }]);
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  };

  const handleCopyMessage = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageIdx(idx);
    setTimeout(() => setCopiedMessageIdx(null), 2000);
  };

  const handleFeedback = (idx: number, type: 'up' | 'down') => {
    setThumbsFeedback(prev => ({ ...prev, [idx]: type }));
    if (type === 'up') {
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.8 } });
    }
  };

  const handleExportEduModPDF = async () => {
    if (eduModMessages.length === 0) return;
    try {
      const subjectName = ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name || selectedSubject;
      const chatMd = eduModMessages
        .map(m => {
          const reactionsSummary = m.reactions && Object.keys(m.reactions).length > 0
            ? '\n*ප්‍රතිචාර (Reactions): ' + Object.entries(m.reactions).map(([emoji, users]) => `${emoji} ${users.length} (${users.join(', ')})`).join('  ') + '*'
            : '';
          return `### **${m.sender}**\n${m.text}${reactionsSummary}`;
        })
        .join('\n\n---\n\n');
      
      await exportToPDF(
        `${eduModTopic} - Study Group Transcript`,
        `## Live Study Session Report\nTopic: ${eduModTopic}\n\n${chatMd}`,
        {
          userName: userName || 'යාළුවා',
          grade: userGrade,
          subject: subjectName,
          term: selectedTerm,
          language: userLang
        }
      );
      confetti();
    } catch (err) {
      console.error(err);
      alert('PDF එක සෑදීමේදී ගැටලුවක් මතු විය. කරුණාකර නැවත උත්සාහ කරන්න.');
    }
  };

  const handleExportChatPDF = async () => {
    if (messages.length === 0) return;
    try {
      const subjectName = ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name || selectedSubject;
      const chatMd = messages.map(m => {
        const sender = m.role === 'user' ? (userName || 'ශිෂ්‍යයා (Student)') : 'Gemini Academic AI Tutor';
        return `### **${sender}**\n\n${m.parts}`;
      }).join('\n\n---\n\n');

      await exportToPDF(
        `Gemini Tutor - ${subjectName} Study Notes`,
        `# Gemini Academic AI Study Session\n**Subject:** ${subjectName} | **Grade:** ${userGrade} | **Term:** ${selectedTerm}\n\n---\n\n${chatMd}`,
        {
          userName: userName || 'ශිෂ්‍යයා',
          grade: userGrade,
          subject: subjectName,
          term: selectedTerm,
          language: userLang
        }
      );
      confetti();
    } catch (err) {
      console.error(err);
      alert('PDF එක සෑදීමේදී ගැටලුවක් මතු විය. කරුණාකර නැවත උත්සාහ කරන්න.');
    }
  };

  const handleStartStudyGroup = async () => {
    setEduModStarted(true);
    setIsEduModLoading(true);
    
    const initialWelcome = `ආයුබෝවන් කට්ටියම! 👋 මම තමයි අද ඔයාලගේ සජීවී Study Group Moderator "Edu-Mod" (එඩියු-මොඩ්). අපි අද සාකච්ඡා කරන්න ලෑස්ති වෙන්නේ "${eduModTopic}" ගැනයි.

Saman, Priya, Thisal සහ ${userName || 'යාළුවා'} අද මේ සෙෂන් එකට එකතු වෙලා ඉන්නවා. 

අපි මුලින්ම සරල ප්‍රශ්නයකින් පටන් ගමුද? කවුද මට කියන්නේ මේ මාතෘකාවට අදාළව ඔයාලා දැනටමත් දන්න වැදගත්ම සිද්ධාන්තය හෝ කරුණ මොකක්ද කියලා? 🤔🚀`;

    const initialHistory: EduModMessage[] = [{ 
      id: `mod-init-${Date.now()}`,
      sender: 'Edu-Mod', 
      text: initialWelcome, 
      timestamp: new Date(),
      reactions: {
        '👍': ['Priya', 'Saman'],
        '🚀': ['Thisal']
      }
    }];
    setEduModMessages(initialHistory);
    setIsEduModLoading(false);
  };

  const handleToggleEduModReaction = (msgId: string, emoji: string) => {
    const currentUserName = userName || 'ඔබ';
    setEduModMessages(prev => prev.map(msg => {
      if (msg.id !== msgId) return msg;

      const currentReactions = msg.reactions || {};
      const usersForEmoji = currentReactions[emoji] || [];
      const hasReacted = usersForEmoji.includes(currentUserName);

      let updatedUsers: string[];
      if (hasReacted) {
        updatedUsers = usersForEmoji.filter(u => u !== currentUserName);
      } else {
        updatedUsers = [...usersForEmoji, currentUserName];

        // Confetti for encouragement / spot on
        if (['👏', '🎯', '❤️', '🚀', '💡'].includes(emoji)) {
          confetti({
            particleCount: 16,
            spread: 45,
            origin: { y: 0.75 }
          });
        }
      }

      const nextReactions = { ...currentReactions };
      if (updatedUsers.length > 0) {
        nextReactions[emoji] = updatedUsers;
      } else {
        delete nextReactions[emoji];
      }

      return {
        ...msg,
        reactions: nextReactions
      };
    }));
  };

  const handleEduModSend = async (text: string = eduModInput) => {
    if (!text.trim() || isEduModLoading) return;

    const userMsgId = `user-msg-${Date.now()}`;
    const userMsg: EduModMessage = { 
      id: userMsgId,
      sender: userName || 'යාළුවා', 
      text, 
      timestamp: new Date(),
      reactions: {}
    };
    const updatedMessages = [...eduModMessages, userMsg];
    setEduModMessages(updatedMessages);
    setEduModInput('');
    setIsEduModLoading(true);

    try {
      // Simulate classmate Saman or Priya typing/replying first for supreme immersion
      await new Promise(r => setTimeout(r, 1200));
      
      const classmates = ['Saman', 'Priya', 'Thisal'];
      const selectedClassmate = classmates[Math.floor(Math.random() * classmates.length)];
      
      let classmateText = '';
      let classmateReaction = '👍';
      if (selectedClassmate === 'Saman') {
        classmateText = `නියමයි ${userName || 'යාළුවා'}! මම හිතන්නේ ඒක ගොඩක් වැදගත්. හැබැයි මට පොඩි සැකයක් තියෙනවා ඒක හැමවෙලේම හරිද කියලා... 🤔`;
        classmateReaction = Math.random() > 0.5 ? '🤔' : '👍';
      } else if (selectedClassmate === 'Priya') {
        classmateText = `ඔව්, ඒක හරිම නිවැරදි උත්තරයක්. මම ඒකට තව පොඩි කරුණක් එකතු කරන්නම්. මේ සිද්ධාන්තයට අනුව අපිට ගොඩක් ප්‍රායෝගික උදාහරණ බලාගන්න පුළුවන්. 📚✨`;
        classmateReaction = Math.random() > 0.5 ? '💡' : '👏';
      } else {
        classmateText = `අයියෝ කට්ටිය, මට නම් මේ පාඩම හරිම අමාරුයි. ඊයේ රෑ ක්‍රිකට් මැච් එක බලලා මට නින්ද ගියානේ! 🏏😂`;
        classmateReaction = '❓';
      }

      const classmateMsgId = `classmate-msg-${Date.now()}`;
      const classmateMsg: EduModMessage = { 
        id: classmateMsgId,
        sender: selectedClassmate, 
        text: classmateText, 
        timestamp: new Date(),
        reactions: {}
      };

      // Classmate reacts to student's response (expressing agreement, confusion, or encouragement)
      const withClassmate = updatedMessages.map(m => {
        if (m.id === userMsgId) {
          return {
            ...m,
            reactions: {
              ...(m.reactions || {}),
              [classmateReaction]: [selectedClassmate]
            }
          };
        }
        return m;
      }).concat(classmateMsg);

      setEduModMessages(withClassmate);

      // Now get the Moderator's guidance response!
      const historyForAPI = withClassmate.map(m => ({ sender: m.sender, text: m.text }));
      const modReply = await getEduModResponse(historyForAPI, {
        grade: userGrade,
        subject: ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name || 'General Academic Curriculum',
        term: selectedTerm,
        language: userLang,
        userName: userName || 'යාළුවා'
      });

      const modMsgId = `mod-msg-${Date.now()}`;
      setEduModMessages(prev => [
        ...prev, 
        { 
          id: modMsgId,
          sender: 'Edu-Mod', 
          text: modReply, 
          timestamp: new Date(),
          reactions: {
            '👍': ['Priya']
          }
        }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEduModLoading(false);
    }
  };

  const startQuiz = async () => {
    setActiveGame('quiz');
    setQuizLoading(true);
    setQuizActive(false);
    setCurrentQuizIdx(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);

    try {
      const g = gameGrade === 'All' ? userGrade : gameGrade;
      const s = gameSubject === 'All' ? 'General Academic Topics' : gameSubject;
      const t = gameTerm === 'All' ? 'All Terms' : gameTerm;
      const quiz = await generateQuiz(g, s, userLang, t, 5);
      // Safety: Ensure correctIndex is valid
      const fixed = quiz.map(q => {
          if (q.correctIndex < 0 || q.correctIndex >= q.options.length) {
              q.correctIndex = Math.floor(Math.random() * q.options.length);
          }
          return q;
      });
      setQuizQuestions(fixed);
      setQuizActive(true);
    } catch (error) {
      console.error(error);
      setActiveGame(null);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleAnswerSelection = (idx: number) => {
    if (selectedAnswer !== null || !quizQuestions[currentQuizIdx]) return;
    
    setSelectedAnswer(idx);
    const correct = idx === quizQuestions[currentQuizIdx]?.correctIndex;
    
    if (correct) {
      setQuizScore(prev => prev + 1);
      setPoints(prev => prev + 50);
      playRoboSound('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4A90E2', '#FF6B6B', '#FFD93D']
      });
    } else {
      playRoboSound('thinking');
    }
    
    setShowExplanation(true);
  };

  const nextQuestion = async () => {
    playRoboSound('click');
    if (currentQuizIdx < quizQuestions.length - 1) {
      setCurrentQuizIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // UNLIMITED: Fetch more questions
      setQuizLoading(true);
      try {
        const g = gameGrade === 'All' ? userGrade : gameGrade;
        const s = gameSubject === 'All' ? 'General Academic Topics' : gameSubject;
        const t = gameTerm === 'All' ? 'All Terms' : gameTerm;
        const moreQuiz = await generateQuiz(g, s, userLang, t, 5);
        // Safety: Ensure correctIndex is valid
        const fixed = moreQuiz.map(q => {
            if (q.correctIndex < 0 || q.correctIndex >= q.options.length) {
                q.correctIndex = Math.floor(Math.random() * q.options.length);
            }
            return q;
        });
        setQuizQuestions(prev => [...prev, ...fixed]);
        setCurrentQuizIdx(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } catch (error) {
        console.error(error);
        setQuizActive(false);
      } finally {
        setQuizLoading(false);
      }
    }
  };

  const isOL = userGrade === 'Grade 10' || userGrade === 'Grade 11';
  const filteredCategories = SUBJECT_CATEGORIES.filter(cat => {
    if (isOL) {
      return cat.name.includes('Core') || cat.name.includes('Basket');
    }
    return cat.name.includes('Core') || cat.name.includes('Aesthetic');
  });

  const navigateTo = (view: typeof appView) => {
    setAppView(view);
    setStep('chat');
    if (view === 'home' && step !== 'chat') {
      setStep('chat');
    }
  };

  const handleBack = () => {
    if (activeGame) {
      setActiveGame(null);
      setQuizActive(false);
      return;
    }

    if (step === 'chat') {
      if (appView !== 'home') {
        setAppView('home');
      } else {
        setStep('welcome');
      }
    } else if (step === 'details') {
      setStep('term');
    } else {
      const steps = ['register', 'welcome', 'language', 'subject', 'term', 'details', 'chat'] as const;
      const currentIdx = steps.indexOf(step as any);
      if (currentIdx > 0) {
        setStep(steps[currentIdx - 1] as any);
      }
    }
  };

  // Step Renders
  if (!isAppReady) {
    return (
      <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center z-[9999] p-6 text-center">
         <div className="relative">
            <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-12 h-12 bg-primary rounded-2xl animate-pulse flex items-center justify-center shadow-lg shadow-primary/30">
                  <GraduationCap className="text-white" size={24} />
               </div>
            </div>
         </div>
         <div className="mt-8 space-y-2">
            <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Edu.ai</h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">සූදානම් වෙමින්... (Initializing...)</p>
            <button 
              onClick={() => setIsAppReady(true)}
              className="mt-4 text-[10px] font-black text-primary/40 uppercase tracking-widest hover:text-primary transition-colors"
            >
              අතින් බලය පවරන්න (Force Launch)
            </button>
         </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      {eyeComfort && (
        <div className="fixed inset-0 bg-amber-500/5 mix-blend-multiply pointer-events-none z-[10000] backdrop-sepia-[0.15]" />
      )}
      <div className={`relative min-h-screen min-h-[100dvh] w-full max-w-full overflow-x-hidden flex flex-col ${isStudyMode ? (theme === 'dark' ? 'bg-slate-950 text-slate-300' : 'bg-white text-slate-700') : (theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-bg-app text-text-dark')} font-sans transition-colors duration-500`}>
      {!isStudyMode && <BackgroundOrbs theme={theme} subjectTheme={selectedSubject} />}
      
      {!isStudyMode && (step === 'chat' || step === 'details') && <ThemeBackground subject={selectedSubject} />}

      <ThemeToggle theme={theme} setTheme={setTheme} />

      {/* Study Timer Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsTimerOpen(!isTimerOpen)}
        className="fixed top-20 md:top-24 right-4 md:right-6 z-[60] p-2.5 md:p-3 rounded-2xl liquid-glass border border-white/40 shadow-lg text-primary"
        title="Study Timer"
      >
        <Timer size={18} />
      </motion.button>

      <StudyTimer 
        isOpen={isTimerOpen} 
        onClose={() => setIsTimerOpen(false)} 
        onSessionComplete={(type) => {
          if (type === 'study') {
            setPoints(prev => prev + 100);
            setSparkleOverlay({
              isVisible: true,
              title: 'නියමයි! (Awesome!) 🎉',
              subtitle: 'ඔබේ පාඩම් කිරීමේ වාරය සාර්ථකව අවසන් කළා! දැන් පොඩි විවේකයක් ගෙන මනස සැහැල්ලු කරගන්න.',
              points: 100,
              type: 'study'
            });
          } else {
            setPoints(prev => prev + 20);
            setSparkleOverlay({
              isVisible: true,
              title: 'විවේකය අවසන්! (Break Over!) ☕',
              subtitle: 'විවේක කාලය සාර්ථකව අවසන්. අපි නැවත උද්‍යෝගයෙන් ඉගෙනීම පටන් ගමු!',
              points: 20,
              type: 'break'
            });
          }
        }}
      />

      <SparkleOverlay 
        isVisible={sparkleOverlay.isVisible} 
        onClose={() => setSparkleOverlay(prev => ({ ...prev, isVisible: false }))}
        title={sparkleOverlay.title}
        subtitle={sparkleOverlay.subtitle}
        points={sparkleOverlay.points}
        type={sparkleOverlay.type}
      />
      
      {isMusicOn && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-24 left-6 z-[60] flex items-center gap-3 bg-white/40 backdrop-blur-3xl border border-white/40 p-2 pr-4 rounded-2xl shadow-lg ring-1 ring-primary/20"
        >
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary relative overflow-hidden">
             <Music size={20} className="relative z-10 animate-spin-slow" />
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent animate-pulse" />
          </div>
          <div>
             <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter leading-none">Relaxing Mode</p>
             <p className="text-xs font-bold text-slate-700 dark:text-white capitalize">Lofi Study Beats</p>
          </div>
          <div className="flex gap-1 h-3 items-end">
             {[1,2,3,4].map(i => (
               <motion.div 
                 key={i}
                 animate={{ height: [4, 12, 6, 12, 4] }}
                 transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.1 }}
                 className="w-1 bg-primary/40 rounded-full"
               />
             ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {step === 'register' && (
          <motion.div 
            key="register"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full flex items-center justify-center min-h-screen px-4 py-6 md:p-6 overflow-y-auto pb-28"
          >
            <div className="max-w-xl w-full liquid-glass rounded-[24px] md:rounded-[36px] p-5 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] space-y-4 md:space-y-8 border-2 md:border-4 border-white dark:border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-primary/20 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full blur-3xl -ml-12 -mb-12 group-hover:bg-secondary/20 transition-all duration-700" />
              
              <div className="text-center space-y-2 md:space-y-4 relative z-10">
                <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-primary to-secondary rounded-xl md:rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-primary/20 rotate-3 group-hover:rotate-6 transition-transform">
                  <User size={24} className="text-white md:hidden" />
                  <User size={40} className="text-white hidden md:block" />
                </div>
                <div className="space-y-0.5">
                   <h1 className="text-xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tight uppercase">Registration</h1>
                   <p className="text-slate-500 dark:text-slate-400 font-bold tracking-tight uppercase text-[8px] md:text-[9px]">ඔබව සාදරයෙන් පිළිගනිමු!</p>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8 relative z-10">
                <div className="space-y-3 md:space-y-4">
                  <div className="relative group/input">
                    <User className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-primary transition-colors w-4 h-4 md:w-5 md:h-5" />
                    <input 
                      type="text" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && userName.trim() && userGrade) {
                          handleEnterLessons();
                        }
                      }}
                      placeholder="ඔබේ නම (Full Name)"
                      className="w-full pl-11 md:pl-14 pr-4 md:pr-6 py-3.5 md:py-5 rounded-2xl md:rounded-[24px] border-2 border-slate-100 dark:border-white/5 dark:bg-white/5 focus:border-primary outline-none font-bold text-base md:text-lg transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">Select Grade</p>
                    <div className="grid grid-cols-4 gap-1.5 md:gap-2">
                       {Array.from({ length: 8 }, (_, i) => i + 6).map((g) => (
                         <button
                           key={g}
                           onClick={() => setUserGrade(`Grade ${g}`)}
                           className={`py-2 md:py-3 rounded-lg md:rounded-xl font-black text-[10px] md:text-xs border-2 transition-all ${
                             userGrade === `Grade ${g}` 
                               ? 'border-primary bg-primary text-white shadow-md scale-105' 
                               : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-slate-500 hover:border-primary/50'
                           }`}
                         >
                           G-{g}
                         </button>
                       ))}
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, translateY: -1 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!userName.trim() || !userGrade}
                  onClick={() => handleEnterLessons()}
                  className={`w-full py-4 md:py-5 rounded-2xl md:rounded-[24px] font-black text-lg md:text-xl flex items-center justify-center gap-2 md:gap-3 shadow-xl transition-all relative overflow-hidden group/btn ${
                    (userName.trim() && userGrade) ? 'bg-primary text-white shadow-primary/30' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_100%] animate-gradient opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative z-10">පාඩම් වලට ඇතුල් වන්න (Enter Lessons) 📚</span>
                  <ArrowRight size={18} className="relative z-10 group-hover/btn:translate-x-2 transition-transform" />
                </motion.button>
              </div>

              <p className="text-center text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pt-2">EDU.AI - Smart Learning Hub 🚀</p>
              
              {/* Clean bottom watermark */}
              <div className="pt-2">
                <Watermark text="EDU.AI.DY.AI.EDUEDUCATION WITH AI" />
              </div>
            </div>
          </motion.div>
        )}

        {step === 'welcome' && (
          <motion.div 
             key="welcome"
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 1.1 }}
             className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-8 md:p-6 space-y-6 md:space-y-8 z-10 overflow-y-auto pb-28"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="inline-block py-1 px-3 bg-secondary/10 text-secondary text-[10px] font-black rounded-full uppercase tracking-tighter">
                Educational Innovation
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight leading-none uppercase px-4">
                EDU.AI
              </h1>
              <p className="text-lg md:text-xl font-bold text-text-dark/80 tracking-tight uppercase dark:text-white/80">
                EDU.AI Smart Tutor
              </p>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
              <p className="text-text-muted font-medium tracking-tight text-sm dark:text-slate-400">
                ශ්‍රී ලංකාවේ විෂය නිර්දේශයට අනුව ඉගෙනීම අරඹන්න. <br/>
                <span className="text-accent font-bold">අධ්‍යාපනයේ නව යුගය!</span>
              </p>
            </motion.div>

            {/* Dynamic Grade & Name Inputs on 1st Page */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-md liquid-glass border border-white/40 dark:border-white/10 rounded-[24px] p-6 shadow-xl space-y-4 text-left backdrop-blur-md"
            >
              <div className="flex items-center gap-2 border-b border-slate-200/50 dark:border-slate-800/50 pb-2">
                <User size={18} className="text-primary" />
                <h3 className="font-black text-xs uppercase text-slate-800 dark:text-white tracking-wider">
                  Student Profile / ශිෂ්‍ය තොරතුරු
                </h3>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Your Name / ඔබේ නම
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => {
                      const newName = e.target.value;
                      setUserName(newName);
                      localStorage.setItem('edu_ai_user_name', newName);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && userName.trim()) {
                        handleEnterLessons();
                      }
                    }}
                    placeholder="Enter full name..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 dark:bg-white/5 font-bold text-sm text-slate-800 dark:text-white outline-none focus:border-primary transition-all shadow-inner"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Select Grade / ශ්‍රේණිය
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {Array.from({ length: 8 }, (_, i) => i + 6).map((g) => (
                      <button
                        key={g}
                        onClick={() => {
                          const newGrade = `Grade ${g}`;
                          setUserGrade(newGrade);
                          localStorage.setItem('edu_ai_user_grade', newGrade);
                        }}
                        className={`py-1.5 rounded-lg font-black text-[10px] border transition-all ${
                          userGrade === `Grade ${g}`
                            ? 'border-primary bg-primary text-white shadow-sm scale-105'
                            : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-slate-500 hover:border-primary/50'
                        }`}
                      >
                        G-{g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: userName.trim() ? 1.05 : 1, boxShadow: userName.trim() ? "0px 20px 40px rgba(74, 144, 226, 0.4)" : "none" }}
              whileTap={{ scale: userName.trim() ? 0.95 : 1 }}
              disabled={!userName.trim()}
              onClick={() => handleEnterLessons()}
              className={`w-full max-w-sm relative group ${!userName.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="absolute inset-0 bg-primary blur-lg opacity-30 group-hover:opacity-50 transition-opacity rounded-2xl" />
              <div className="relative flex items-center justify-center gap-3 bg-primary text-white py-5 rounded-2xl font-black text-xl shadow-xl group-hover:bg-blue-600 transition-colors">
                පාඩම් වලට ඇතුල් වන්න (Enter Lessons) 📚
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.button>
            
            <Watermark text="EDU.AI.DY.AI.EDUEDUCATION WITH AI" />

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]"
            >
              V 1.0.2 Stable
            </motion.p>
          </motion.div>
        )}

        {step === 'language' && (
          <motion.div 
            key="language"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full flex items-center justify-center min-h-screen px-4 py-6 md:p-8 overflow-y-auto pb-28 z-10"
          >
            <div className="max-w-lg w-full liquid-glass rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-xl space-y-6 md:space-y-10">
              <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-dark dark:text-white flex items-center gap-3">
                <Languages className="text-secondary" /> භාෂාව තෝරන්න / Select Language
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {['Sinhala', 'English', 'Singlish'].map((lang, i) => (
                  <motion.button
                    key={lang}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.01, x: 5 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setUserLang(lang)}
                    className={`py-4 px-6 rounded-2xl font-bold text-left border-2 transition-all flex justify-between items-center ${
                      userLang === lang 
                        ? 'border-primary bg-primary/10 text-primary shadow-sm' 
                        : 'border-slate-300 liquid-glass-accent text-slate-600 dark:text-slate-400 hover:border-primary/50'
                    }`}
                  >
                    <span>{lang}</span>
                    {userLang === lang && (
                      <motion.div 
                        layoutId="lang-active"
                        className="w-4 h-4 rounded-full bg-primary" 
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
            <button 
              onClick={() => setStep('subject')}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg shadow-primary/20"
            >
              Confirm ✅
            </button>
            </div>
          </motion.div>
        )}

        {step === 'subject' && (
          <motion.div 
            key="subject"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full flex items-center justify-center min-h-screen px-4 py-6 md:p-8 overflow-y-auto pb-28 z-10"
          >
            <div className="max-w-2xl w-full liquid-glass rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-xl space-y-6 md:space-y-10">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-text-dark dark:text-white flex items-center gap-3">
                  <BookOpen className="text-secondary" /> විෂය තෝරන්න (Select Subject)
                </h2>
                <div className="space-y-8 max-h-[45vh] overflow-y-auto pr-4 scrollbar-hide">
                {filteredCategories.map((cat, catIdx) => (
                  <div key={catIdx} className="space-y-4">
                    <h3 className="text-xs font-black text-text-muted dark:text-slate-400 uppercase tracking-widest border-l-4 border-secondary pl-3">
                      {cat.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {cat.subjects.map((sub, i) => (
                        <motion.button
                          key={sub.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedSubject(sub.id)}
                          className={`flex items-center gap-4 p-4 rounded-2xl font-bold text-sm border-2 transition-all ${
                            selectedSubject === sub.id 
                              ? 'border-primary bg-primary/10 text-primary' 
                              : 'border-slate-300 liquid-glass-accent text-slate-600 dark:text-slate-400 hover:border-primary/50'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${selectedSubject === sub.id ? 'bg-primary text-white shadow-md' : 'bg-white shadow-sm'}`}>
                            <sub.icon size={20} />
                          </div>
                          <span style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>{sub.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
               <button onClick={() => setStep('language')} className="px-6 py-4 rounded-2xl border-2 border-white/20 liquid-glass-accent font-bold hover:border-primary/50 transition-all">Back</button>
               <button 
                onClick={() => setStep('term')}
                disabled={!selectedSubject}
                className={`flex-1 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${
                  selectedSubject ? 'bg-primary hover:bg-blue-600 shadow-primary/20' : 'bg-slate-300 cursor-not-allowed shadow-none'
                }`}
              >
                Next Step 🕒
              </button>
            </div>
            </div>
          </motion.div>
        )}

        {step === 'term' && (
          <motion.div 
            key="term"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full flex items-center justify-center min-h-screen px-4 py-6 md:p-8 overflow-y-auto pb-28 z-10"
          >
            <div className="max-w-md w-full liquid-glass rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-2xl border border-white/50 space-y-6 md:space-y-10">
              <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                 <Radio className="text-secondary animate-pulse" size={40} />
              </div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">පාසල් වාරය තෝරන්න</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">ඉගෙනීමට අවශ්‍ය නිශ්චිත වාරය තෝරාගන්න.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { id: '1st Term', name: '1st Term (පළමු වාරය)' },
                { id: '2nd Term', name: '2nd Term (දෙවන වාරය)' },
                { id: '3rd Term', name: '3rd Term (තෙවන වාරය)' }
              ].map((term, i) => (
                <motion.button
                  key={term.id}
                  whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(99,102,241,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedTerm(term.id as any);
                    fetchSummary(term.id as any);
                  }}
                  className={`w-full py-5 px-6 rounded-2xl font-black text-left border-2 transition-all flex items-center justify-between ${
                    selectedTerm === term.id 
                      ? 'border-primary bg-primary/10 text-primary shadow-lg' 
                      : 'border-white/40 liquid-glass-accent text-slate-500 dark:text-slate-400 hover:border-primary/50'
                  }`}
                >
                  <span>{term.name}</span>
                  <ChevronRight size={20} className={selectedTerm === term.id ? 'text-primary' : 'text-slate-300'} />
                </motion.button>
              ))}
            </div>

            <button onClick={() => setStep('subject')} className="w-full py-4 rounded-2xl border-2 border-white/20 liquid-glass-accent font-bold text-slate-400 hover:text-primary transition-all">Back to Subjects</button>
            </div>
          </motion.div>
        )}

        {step === 'details' && (
          <motion.div 
            key="details"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full flex items-center justify-center min-h-screen px-4 py-6 md:p-8 overflow-y-auto pb-28 z-10"
          >
            <div className="max-w-4xl w-full liquid-glass rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-2xl border border-white/50 flex flex-col gap-4 md:gap-6 h-auto md:h-[80vh] md:min-h-[500px]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div className="space-y-1">
                  <h2 className="text-3xl font-extrabold text-primary dark:text-indigo-400 flex items-center gap-3 capitalize">
                    <BookOpen className="text-secondary dark:text-rose-400" /> {ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name} - විස්තර
                  </h2>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                    <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-700 dark:text-slate-300">{userGrade}</span>
                    <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-700 dark:text-slate-300">{userLang}</span>
                    <span className="bg-primary/10 text-primary dark:text-indigo-400 px-3 py-1 rounded-full">{selectedTerm}</span>
                  </div>
                </div>
                {isSummarizing && (
                  <div className="flex items-center gap-3 text-primary animate-pulse font-bold">
                    <Loader2 className="animate-spin" />
                    පාඩම් මාලාව සකස් කරමින්...
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Left Column: AI Summary */}
                <div className="flex-1 flex flex-col min-h-[250px] md:min-h-0 md:overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Bot size={14} className="text-primary" /> AI විසින් සකස් කරන ලද කෙටි සටහන
                    </div>
                    {syllabusSummary && !isSummarizing && (
                      <button
                        onClick={handleExportSummaryPDF}
                        className="px-3 py-1 bg-primary hover:bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <Download size={10} /> PDF බාගත කරන්න (Download)
                      </button>
                    )}
                  </div>
                  <div className="flex-1 overflow-y-auto liquid-glass-white dark:bg-white/5 rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-inner scrollbar-hide">
                    <div className="markdown-content">
                      {isSummarizing ? (
                        <div className="space-y-4 py-8">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className="h-4 bg-white/40 rounded-full w-full animate-pulse" style={{ width: `${100 - (i * 10)}%` }} />
                          ))}
                        </div>
                      ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {syllabusSummary}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Official Resources */}
                <div className="w-full md:w-80 flex flex-col gap-6 shrink-0 md:overflow-hidden">
                {/* Official Syllabus Units */}
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <FileText size={14} className="text-secondary" /> විෂය මාලාවේ ඒකක (Units)
                  </div>
                  <div className="flex-1 overflow-y-auto liquid-glass-white dark:bg-white/5 rounded-3xl p-5 border border-white/40 shadow-sm scrollbar-hide space-y-3">
                    {SYLLABUS_DATA[userGrade]?.[selectedSubject] ? (
                      SYLLABUS_DATA[userGrade][selectedSubject].units.map((unit, i) => (
                        <div key={i} className="flex gap-3 items-start p-3 bg-white/40 dark:bg-white/5 rounded-2xl border border-white/40 text-xs font-bold text-slate-700 dark:text-slate-200">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-[10px] border border-secondary/10">{i + 1}</span>
                          {unit}
                        </div>
                      ))
                    ) : (
                      <div className="p-4 bg-white/20 rounded-2xl border border-dashed border-white/40 text-[10px] font-bold text-slate-400 text-center italic">
                        මෙම විෂයට අදාළ ඒකක දැනට ඇතුළත් කර නැත. විෂය නිර්දේශයේ සියලුම කරුණු AI වෙතින් අසා දැනගත හැක.
                      </div>
                    )}
                  </div>
                </div>

                {/* Textbooks Section */}
                <div>
                  <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <BookOpen size={14} className="text-accent" /> අච්චු පොත් (Textbooks)
                  </div>
                  <div className="liquid-glass-white dark:bg-white/10 p-5 rounded-[28px] border border-white/40 shadow-sm text-center space-y-4">
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">ඔබේ වසරට අදාළ නිල අච්චු පොත් PDF ලෙස ලබාගන්න.</p>
                    <a 
                      href={SYLLABUS_DATA[userGrade]?.[selectedSubject]?.textbookUrl || 'http://www.edupub.gov.lk/BooksDownload.php'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white rounded-2xl text-xs font-black hover:scale-[1.02] transition-transform shadow-lg shadow-accent/20"
                    >
                      <Download size={14} /> Download PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { navigateTo('learning'); }}
                className="bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-3"
              >
                <span>සජීවී Edu.ai හමුවන්න 🤖</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep('welcome')}
                className="border-2 border-white/20 liquid-glass-accent text-text-dark dark:text-white py-4 rounded-2xl font-bold text-lg hover:bg-white/40 transition-all flex items-center justify-center gap-3 shadow-sm"
              >
                <span>මුලට යන්න 🏠</span>
              </motion.button>
            </div>
            </div>
          </motion.div>
        )}

        {step === 'chat' && (
          <motion.div 
            key="chat"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="h-screen flex flex-row relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white"
          >
            {/* Elegant Left Sidebar Navigation for Desktop */}
            <motion.aside 
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="hidden md:flex flex-col w-64 border-r border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md p-6 shrink-0 h-full z-20 select-none"
            >
              {/* App Logo */}
              <div className="flex flex-col mb-8 text-primary">
                <div className="flex items-center gap-3 text-xl font-black uppercase tracking-tighter">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <BookOpen size={20} className="text-primary" />
                  </div>
                  <span className="text-primary tracking-widest">EDU.AI</span>
                </div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-50">SMART STUDY HUB</p>
              </div>

              {/* Navigation Menu */}
              <nav className="flex-1 space-y-2">
                {[
                  { id: 'home', icon: Home, label: 'Home / මුල', desc: 'Dashboard & Progress' },
                  { id: 'subjects', icon: GraduationCap, label: 'Lessons / විෂයන්', desc: 'Syllabus & Summaries' },
                  { id: 'game', icon: Gamepad2, label: 'Game Zone / ක්‍රීඩා', desc: 'Educational Mind Games' },
                  { id: 'pastpapers', icon: FileText, label: 'Progress / ප්‍රශ්න පත්‍ර', desc: 'Exam Analyst & Papers' },
                  { id: 'notes', icon: Edit3, label: 'Notes / සටහන්', desc: 'Quick Study Notes' },
                  { id: 'robot', icon: Bot, label: 'AI Robot / රොබෝ', desc: 'Interact & Study Group' },
                  { id: 'profile', icon: Settings, label: 'Settings / සැකසුම්', desc: 'Theme & Customization' }
                ].map((item) => {
                  const isActive = appView === item.id || (item.id === 'subjects' && appView === 'learning');
                  return (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setAppView(item.id as any)}
                      className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all text-left group ${
                        isActive 
                          ? 'bg-primary text-white shadow-md shadow-primary/20' 
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <item.icon size={18} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary transition-colors'} />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold leading-tight">{item.label}</span>
                        <span className={`text-[9px] font-medium leading-none mt-0.5 truncate opacity-70 ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                          {item.desc}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Student Profile Footer in Sidebar */}
              <div className="mt-auto border-t border-slate-150 dark:border-white/10 pt-4 space-y-3">
                <div className="flex items-center gap-3 p-2 bg-slate-100/50 dark:bg-white/5 rounded-2xl border border-slate-200/50 dark:border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-sm">
                    {userName ? userName.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-slate-800 dark:text-white truncate">{userName || 'Student'}</span>
                    <span className="text-[10px] font-medium text-slate-400">{userGrade}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase px-1">
                  <span>Streak: {streak}d</span>
                  <span>XP: {points}</span>
                </div>
              </div>
            </motion.aside>

            {/* Main Content Area */}
            <div className="flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden relative">
              {/* Content Render Based on appView */}
              {/* Installation Success Overlay */}
          <AnimatePresence>
            {showInstallSuccess && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-xl"
              >
                <motion.div 
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="max-w-md w-full liquid-glass rounded-[40px] p-10 text-center space-y-8 border-2 border-primary/30 shadow-[0_0_50px_-12px_rgba(99,102,241,0.5)]"
                >
                  <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto relative">
                     <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping" />
                     <CheckCircle2 className="text-emerald-500" size={48} />
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">සම්පූර්ණයි! Edu.ai සූදානම්. ✨</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                      ඇප් එක සාර්ථකව Install වුණා. දැන් ඔබගේ <span className="text-primary font-black uppercase">Home Screen</span> එකෙන් Edu.ai ඕපන් කර ඉගෙනීම අරඹන්න! 🚀
                    </p>
                  </div>

                  <button 
                    onClick={() => setShowInstallSuccess(false)}
                    className="w-full py-5 rounded-[24px] bg-primary text-white font-black text-lg shadow-xl shadow-primary/30 hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
                  >
                    මම දන්නවා (Got it!) <Sparkles size={20} />
                  </button>
                  
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pt-2">EDU.AI - Smart Learning Hub</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Existing Content */}
          <AnimatePresence mode="wait">
              {appView === 'home' && (
                <motion.div 
                  key="home"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex-1 p-6 md:p-10 pb-28 md:pb-32 overflow-y-auto z-10"
                >
                  <div className="max-w-5xl mx-auto space-y-8">
                    
                    {/* Top Header Row with Status Indicator */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/50 dark:border-white/5">
                      <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                          Dashboard <span className="text-primary italic">/ මුල් පිටුව</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-tight">Your daily learning dashboard</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <ThemeToggle theme={theme} setTheme={setTheme} />
                        <div className="px-4 py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/15 rounded-full text-xs font-black flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Sinhala Mode</span>
                        </div>
                      </div>
                    </div>

                    {/* Prominent Profile Section featuring Student Details & Welcome Panel */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 rounded-[32px] border border-slate-200/60 dark:border-white/5 shadow-sm">
                      
                      {/* Prominent Circular Profile Card featuring Student Initials & Status */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center bg-slate-50/55 dark:bg-slate-950/40 border border-slate-150 dark:border-white/5 p-6 rounded-[28px]">
                        <div className="relative p-1 rounded-full bg-gradient-to-tr from-primary via-blue-500 to-indigo-400 dark:from-indigo-600 dark:via-blue-500 dark:to-indigo-400 shadow-xl shadow-primary/5">
                          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-indigo-500/10 to-primary/10 dark:from-indigo-500/20 dark:to-blue-500/20 flex items-center justify-center overflow-hidden border-2 border-white dark:border-slate-900 backdrop-blur-sm">
                            <span className="text-3xl font-black text-primary dark:text-indigo-400 tracking-tighter">
                              {(userName || 'Y').substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          
                          {/* Active learning indicator */}
                          <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          </div>
                        </div>
                        
                        <div className="text-center mt-4">
                          <span className="text-[9px] font-black tracking-widest uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full">
                            {userGrade || 'Grade 11'} Student
                          </span>
                          <h3 className="font-black text-slate-800 dark:text-white text-lg leading-tight mt-1.5">{userName || 'යාළුවා'}</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Active Academic Account</p>
                        </div>
                      </div>

                      {/* Conversational Welcome Panel */}
                      <div className="md:col-span-8 flex flex-col justify-center">
                        <div className="bg-white/90 dark:bg-slate-900/95 p-6 rounded-3xl border border-slate-100 dark:border-white/10 shadow-md h-full flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] font-black tracking-widest uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full">AI Smart Tutor</span>
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-snug mt-3">
                              {userLang === 'Sinhala' 
                                ? "ආයුබෝවන්! අද අපි මොනවාද ඉගෙන ගන්නේ?" 
                                : "Hello! What are we learning today?"}
                            </h2>
                            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                              {userLang === 'Sinhala'
                                ? `සාදරයෙන් පිළිගනිමු, ${userName || 'යාළුවා'}! අද ඔබේ ඉලක්ක සම්පූර්ණ කර ලකුණු ලබා ගනිමු. මම ඔබට උදව් කිරීමට සූදානම්!`
                                : `Welcome back, ${userName || 'friend'}! Let's conquer your daily goals and earn XP. I'm ready to guide you step-by-step!`}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-5">
                            <button 
                              onClick={() => setAppView('subjects')} 
                              className="px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-xl text-xs font-black transition-colors shadow-sm shadow-primary/20 flex items-center gap-1.5"
                            >
                              Explore Lessons <BookOpen size={13} />
                            </button>
                            <button 
                              onClick={() => setAppView('robot')} 
                              className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                            >
                              Talk to AI Tutor <Sparkles size={13} className="text-amber-500" />
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Interactive Daily Brain Spark */}
                    <DailyBrainSpark 
                      userLang={userLang}
                      onEarnPoints={(pts) => setPoints(prev => prev + pts)}
                    />

                    {/* Modular 'Daily Progress' Card Section */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      
                      <div className="md:col-span-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 rounded-[32px] border border-slate-200/60 dark:border-white/5 shadow-sm space-y-5">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-2">
                            <Zap className="text-primary animate-pulse" size={20} /> Daily Progress <span className="text-slate-400 font-medium">/ දෛනික ප්‍රගතිය</span>
                          </h3>
                          <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-black border border-emerald-500/20">75% Complete</span>
                        </div>

                        {/* Progress bar inside Daily Progress Card */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-black text-slate-500">
                            <span>පැය 2ක අධ්‍යයනය (2h Daily Study Target)</span>
                            <span className="text-primary">1.5 hours / 2.0 hours</span>
                          </div>
                          <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-1 border border-white/10 shadow-inner">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "75%" }}
                              className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                            />
                          </div>
                        </div>

                        {/* Staggered progress checkpoints inside Daily Progress Card */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                          <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-500 flex items-center justify-center">
                              <Trophy size={16} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">XP Points</span>
                              <span className="text-xs font-black text-slate-800 dark:text-white mt-1">{points} XP</span>
                            </div>
                          </div>

                          <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-500 flex items-center justify-center">
                              <Flame size={16} className="animate-pulse" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Study Streak</span>
                              <span className="text-xs font-black text-slate-800 dark:text-white mt-1">{streak} Days</span>
                            </div>
                          </div>

                          <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-500 flex items-center justify-center">
                              <CheckCircle2 size={16} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</span>
                              <span className="text-xs font-black text-slate-800 dark:text-white mt-1">On Track</span>
                            </div>
                          </div>
                        </div>

                        {/* Accomplished subject categories today */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {['ගණිතය', 'විද්‍යාව', 'සිංහල'].map((tag, i) => (
                            <div key={i} className="flex items-center gap-1.5 px-3 py-1 bg-slate-100/70 dark:bg-white/5 rounded-full border border-slate-200/50 dark:border-white/5 text-[9px] font-black text-slate-500">
                              <CheckCircle2 size={11} className="text-emerald-500" /> {tag}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Game Zone Bento Grid Card */}
                      <div className="md:col-span-4">
                        <motion.div 
                          whileHover={{ y: -5 }}
                          onClick={() => setAppView('game')}
                          className="h-full bg-gradient-to-br from-primary to-blue-600 p-6 rounded-[32px] border border-white/20 shadow-sm text-white cursor-pointer group flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-2 shadow-inner">
                              <Gamepad2 size={24} className="group-hover:rotate-12 transition-transform" />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight">Game Zone</h3>
                            <p className="text-white/80 font-semibold text-xs">Play educational interactive mini-games to make learning addictive and fun.</p>
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
                            <span className="text-[10px] font-black tracking-widest uppercase">7 active games</span>
                            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center group-hover:translate-x-1 transition-transform">
                              <ArrowRight size={14} />
                            </div>
                          </div>
                        </motion.div>
                      </div>

                    </div>

                    {/* Continue Learning Section with subtle glassmorphism effects */}
                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-widest flex items-center gap-2">
                          <BookOpen className="text-secondary" size={18} /> Continue Learning <span className="text-slate-400 font-medium">/ විෂයයන්</span>
                        </h2>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredCategories.flatMap(c => c.subjects).map((sub, i) => (
                          <motion.button
                            key={sub.id}
                            whileHover={{ y: -6 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setSelectedSubject(sub.id);
                              setAppView('learning');
                            }}
                            className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/60 dark:border-white/5 p-5 rounded-[28px] flex flex-col items-center text-center gap-3 transition-all shadow-sm group hover:border-primary/50"
                          >
                            <div className={`w-12 h-12 rounded-xl ${sub.color.split(' ')[0]} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
                               <sub.icon size={22} className="animate-float text-white" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-black text-xs text-slate-800 dark:text-white line-clamp-1 leading-tight">{sub.name}</span>
                              <span className="text-[9px] font-semibold text-slate-400 mt-1 uppercase">Continue →</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </section>

                    {/* Study Notes Promotion Banner */}
                    <section>
                      <motion.div 
                        whileHover={{ y: -4 }}
                        onClick={() => setAppView('notes')}
                        className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 p-6 rounded-[32px] text-white cursor-pointer shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-4xl p-3 bg-white/10 rounded-2xl">📝</span>
                          <div>
                            <h3 className="text-xl font-black uppercase tracking-tight">Quick Study Notes</h3>
                            <p className="text-emerald-50/80 font-bold text-xs mt-1">Keep track of your formulas, revision notes and key exam summaries in one organized space.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-white/30 transition-all self-start md:self-auto group-hover:scale-105">
                          සටහන් ලියන්න (Open Notes) →
                        </div>
                      </motion.div>
                    </section>

                    {/* Bottom Watermark (30% opacity) */}
                    <div className="pt-4">
                      <Watermark text="EDU.AI.DY.AI.EDUEDUCATION WITH AI" />
                    </div>
                  </div>
                </motion.div>
              )}

          {appView === 'learning' && (
            <motion.div 
              key="learning"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-1 flex-col h-full overflow-hidden z-10 w-full max-w-full relative"
            >
              {/* Gemini Sleek Header */}
              <header className="h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shrink-0 z-20">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setAppView('subjects')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all"
                  >
                    <ArrowLeft size={14} />
                    <span className="hidden sm:inline">පාඩම් (Lessons)</span>
                  </button>

                  <div className="flex items-center gap-2.5">
                    <GeminiSparkle size={24} animate />
                    <div>
                      <h2 className="font-black text-sm sm:text-base tracking-tight bg-gradient-to-r from-blue-500 via-indigo-500 to-rose-500 bg-clip-text text-transparent flex items-center gap-2">
                        Gemini Academic
                        <span className="hidden md:inline-block text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                          2.5 Flash
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    <BookOpen size={12} className="text-primary" />
                    {ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name || 'පාඩම්'} · {userGrade}
                  </span>

                  <button 
                    onClick={() => setIsStudyMode(!isStudyMode)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                      isStudyMode 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title="Focus Study Mode"
                  >
                    <Brain size={14} className={isStudyMode ? 'animate-pulse' : ''} />
                    <span className="hidden sm:inline">{isStudyMode ? 'Focus On' : 'Focus'}</span>
                  </button>

                  <button 
                    onClick={handleExportChatPDF}
                    disabled={messages.length === 0}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-300 transition-all disabled:opacity-40"
                    title="Download chat notes as PDF"
                  >
                    <Download size={15} />
                  </button>

                  <button 
                    onClick={clearChat}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-white/10 dark:hover:bg-rose-500/20 text-slate-500 hover:text-rose-600 transition-all"
                    title="Clear Chat History"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </header>

              {/* Gemini Chat Scroll Stream */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6 space-y-6 scrollbar-hide">
                <div className="max-w-3xl mx-auto space-y-6 pb-28">
                  {/* Gemini Hero Banner when chat has few messages */}
                  {messages.length <= 1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-6 md:py-10 space-y-6 text-left"
                    >
                      <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight flex items-center gap-3">
                          <GeminiSparkle size={36} animate />
                          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-rose-500 bg-clip-text text-transparent">
                            Hello, {userName || 'Student'}
                          </span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl font-bold text-slate-400 dark:text-slate-500">
                          How can I help you master your {ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name || 'lessons'} today?
                        </p>
                      </div>

                      {/* Gemini 4 Suggestion Prompt Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                        {(() => {
                          const currSubName = ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name || 'විෂය';
                          return [
                            { 
                              title: 'මූලික සංකල්ප පැහැදිලි කරන්න', 
                              desc: 'Syllabus එකේ අද පාඩම සරල උදාහරණ සහිතව විස්තර කරන්න', 
                              prompt: `මට ${userGrade} ${currSubName} විෂය නිර්දේශයේ මූලික සංකල්ප සරලව හා උදාහරණ සහිතව පැහැදිලි කරන්න.` 
                            },
                            { 
                              title: 'කෙටි සටහන් සහ සූත්‍ර (Summary & Formulas)', 
                              desc: 'විභාගයට අත්‍යවශ්‍ය කරුණු සහ සූත්‍ර ලැයිස්තුව', 
                              prompt: `මට ${userGrade} ${currSubName} සඳහා වැදගත් කෙටි සටහන් සහ අත්‍යවශ්‍ය කරුණු ලැයිස්තුවක් ලබා දෙන්න.` 
                            },
                            { 
                              title: 'විභාග ප්‍රශ්න 3ක් සහ පිළිතුරු (Quiz)', 
                              desc: 'දැනුම මැන බැලීමට NIE විභාග මට්ටමේ අභ්‍යාස', 
                              prompt: `මට ${userGrade} ${currSubName} විභාග ආදර්ශ ප්‍රශ්න 3ක් අසා පිළිතුරු විවරණය කරන්න.` 
                            },
                            { 
                              title: 'විභාග උපදෙස් සහ ලකුණු කපාගන්නා තැන්', 
                              desc: 'A සාමාර්ථයක් ගැනීමට විශේෂ උපදෙස් සහ Common Mistakes', 
                              prompt: `මට ${userGrade} ${currSubName} විභාගයේදී ළමුන් නිතර වැරදි කරගන්නා තැන් සහ A එකක් ගැනීමට රහස් කියා දෙන්න.` 
                            }
                          ];
                        })().map((card, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(card.prompt)}
                            className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 hover:border-primary/50 dark:hover:border-primary/50 text-left transition-all hover:scale-[1.01] hover:shadow-md group flex flex-col justify-between space-y-2"
                          >
                            <span className="font-bold text-sm text-slate-800 dark:text-white group-hover:text-primary transition-colors">
                              {card.title}
                            </span>
                            <span className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                              {card.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Messages Flow */}
                  {messages.map((message, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      {message.role === 'user' ? (
                        <div className="flex justify-end items-end gap-2.5 my-3">
                          <div className="max-w-[85%] sm:max-w-[78%] rounded-[24px] rounded-br-[6px] bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white px-5 py-3.5 text-sm md:text-base font-medium shadow-xs">
                            {message.parts}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                            {userName ? userName.charAt(0).toUpperCase() : 'U'}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-3.5 my-5">
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm mt-1">
                            <GeminiSparkle size={18} />
                          </div>
                          <div className="flex-1 min-w-0 space-y-2.5">
                            <div className="flex items-center gap-2">
                              <span className="font-black text-xs text-slate-800 dark:text-white">Gemini Academic</span>
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                                NIE Syllabus Grounded
                              </span>
                            </div>

                            <div className="markdown-content text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed select-text">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.parts}
                              </ReactMarkdown>
                            </div>

                            {/* Gemini Action Footer */}
                            <div className="flex flex-wrap items-center gap-2 pt-1 text-slate-400">
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(message.parts);
                                  setCopiedMessageIdx(idx);
                                  setTimeout(() => setCopiedMessageIdx(null), 2000);
                                }}
                                className="p-1.5 px-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-colors flex items-center gap-1.5 text-xs"
                                title="Copy response"
                              >
                                {copiedMessageIdx === idx ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                <span>{copiedMessageIdx === idx ? 'Copied' : 'Copy'}</span>
                              </button>

                              <button
                                onClick={() => speakAloud(message.parts.replace(/[#*`_]/g, ''))}
                                className="p-1.5 px-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-colors flex items-center gap-1.5 text-xs"
                                title="Listen to response"
                              >
                                <Volume2 size={14} />
                                <span>Listen</span>
                              </button>

                              <button
                                onClick={() => setThumbsFeedback(prev => ({ ...prev, [idx]: prev[idx] === 'up' ? undefined : 'up' }))}
                                className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors ${
                                  thumbsFeedback[idx] === 'up' ? 'text-primary' : 'text-slate-500 dark:text-slate-400'
                                }`}
                                title="Helpful"
                              >
                                <ThumbsUp size={14} />
                              </button>

                              <button
                                onClick={() => setThumbsFeedback(prev => ({ ...prev, [idx]: prev[idx] === 'down' ? undefined : 'down' }))}
                                className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors ${
                                  thumbsFeedback[idx] === 'down' ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'
                                }`}
                                title="Not helpful"
                              >
                                <ThumbsDown size={14} />
                              </button>

                              <button
                                onClick={() => handleExportChatPDF()}
                                className="p-1.5 px-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-colors flex items-center gap-1.5 text-xs ml-auto"
                                title="Download chat notes as PDF"
                              >
                                <Download size={14} />
                                <span className="hidden sm:inline">PDF</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {/* Gemini Thinking / Loading Animation */}
                  {isLoading && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-start gap-3.5 my-4"
                    >
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm mt-1">
                        <GeminiSparkle size={18} animate />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-primary animate-pulse flex items-center gap-1.5">
                            <Loader2 size={13} className="animate-spin" /> Gemini is formulating syllabus response...
                          </span>
                        </div>
                        <div className="space-y-1.5 py-1">
                          <div className="h-3.5 bg-gradient-to-r from-blue-500/25 via-indigo-500/25 to-pink-500/25 rounded-full w-4/5 animate-pulse" />
                          <div className="h-3.5 bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-pink-500/15 rounded-full w-3/5 animate-pulse" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={chatEndRef} />
                </div>
              </div>

              {/* Gemini Floating Prompt Capsule Bar */}
              <div className="p-3 sm:p-6 pb-24 md:pb-6 z-20 shrink-0 w-full">
                <div className="max-w-3xl mx-auto space-y-2">
                  <div className="liquid-glass dark:bg-slate-900/90 rounded-[28px] md:rounded-[32px] p-2 md:p-2.5 border-2 border-slate-200/90 dark:border-white/15 shadow-xl flex items-center gap-2 transition-all focus-within:border-primary/70 focus-within:ring-4 focus-within:ring-primary/10">
                    {/* Subject switch button */}
                    <button
                      onClick={() => setAppView('subjects')}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all shrink-0"
                      title="Select Subject or Lesson"
                    >
                      <BookOpen size={13} className="text-primary" />
                      <span className="truncate max-w-[120px]">
                        {ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name.split(' (')[0] || 'විෂය'}
                      </span>
                    </button>

                    {/* Input Field */}
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask Gemini anything about your syllabus... (ඕනෑම විෂය ගැටලුවක් විමසන්න)"
                      className="flex-1 bg-transparent px-3 py-2 outline-none text-sm md:text-base font-medium text-slate-800 dark:text-white placeholder:text-slate-400 min-w-0"
                    />

                    {/* Voice / Example Prompt Helper */}
                    <button
                      onClick={() => {
                        const subjectObj = ALL_SUBJECTS.find(s => s.id === selectedSubject);
                        const sName = subjectObj?.name || 'විෂය';
                        let subjectPrompts: string[] = [];

                        if (selectedSubject === 'music' || selectedSubject === 'music_ol') {
                          subjectPrompts = [
                            "සංගීත සප්තකයේ මූලික ස්වර සත සහ කෝමල/තීව්‍ර ස්වර පැහැදිලි කරන්න.",
                            "බිලාවල් රාගයේ සහ කල්‍යාණ රාගයේ ආරෝහණ හා අවරෝහණ විස්තර කරන්න.",
                            "තීන්තාලයේ මාත්‍රා 16 ගණනය කරන ආකාරය හා තාල ලක්ෂණ කියාදෙන්න.",
                            "ශ්‍රී ලාංකීය නූර්ති හා නාඩගම් සංගීත සම්ප්‍රදායන්ගේ වෙනස කුමක්ද?",
                            "දේශීය තූර්ය භාණ්ඩ වර්ග හතර (තත, සුසිර, ඝන, අවනද්ධ) උදාහරණ සහිතව පහදන්න."
                          ];
                        } else if (selectedSubject === 'sinhala') {
                          subjectPrompts = [
                            "මිශ්‍ර සිංහල හෝඩිය සහ ව්‍යවහාරික හෝඩිය අතර වෙනස කුමක්ද?",
                            "න/ණ සහ ල/ළ භාවිතයේ නිවැරදි අක්ෂර වින්‍යාස රීති පහදන්න.",
                            "සැළලිහිණි සන්දේශයේ එන අවවාද කවි විවරණය කර පෙන්වන්න.",
                            "කර්තෘකාරක සහ කර්මකාරක වාක්‍ය රීති උදාහරණ සහිතව පැහැදිලි කරන්න.",
                            "ගුත්තිල කාව්‍යයේ ගුත්තිල-මූසිල වාදය විචාරය කරන්න."
                          ];
                        } else if (selectedSubject === 'maths') {
                          subjectPrompts = [
                            "වර්ගජ සමීකරණ විසඳන සූත්‍රය උදාහරණ සහිතව පැහැදිලි කරන්න.",
                            "ත්‍රිකෝණමිතියේ මූලික අනුපාත (sin, cos, tan) සරලව කියාදෙන්න.",
                            "පරිමිත ගණිත ශ්‍රේණිවල n වන පදය හා මුල් පද n වල ඓක්‍යය සෙවීම පහදන්න."
                          ];
                        } else if (selectedSubject === 'science') {
                          subjectPrompts = [
                            "සෛලයේ ප්‍රධාන ඉන්ද්‍රිකා සහ ඒවායේ ජීව විද්‍යාත්මක කාර්යයන් මොනවාද?",
                            "ප්‍රභාසංස්ලේෂණ ක්‍රියාවලියට අවශ්‍ය සාධක හා රසායනික ප්‍රතික්‍රියාව පහදන්න.",
                            "නිව්ටන්ගේ චලිත නියම තුන සහ ඒවායේ දෛනික යෙදීම් විස්තර කරන්න."
                          ];
                        } else {
                          subjectPrompts = [
                            `මට ${userGrade} ${sName} විෂය නිර්දේශයේ ප්‍රධානම සංකල්ප පැහැදිලි කරන්න.`,
                            `විභාගයට ${sName} විෂයෙන් අනිවාර්යයෙන්ම එන ප්‍රධාන ප්‍රශ්න 3ක් සහ පිළිතුරු කියාදෙන්න.`,
                            `${sName} විෂය සඳහා කෙටි සටහන් සහ මතක තබාගැනීමේ ක්‍රම ලබාදෙන්න.`
                          ];
                        }

                        const randomPrompt = subjectPrompts[Math.floor(Math.random() * subjectPrompts.length)];
                        setInput(randomPrompt);
                      }}
                      className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 hover:text-primary transition-colors shrink-0"
                      title="Subject-Specific Curriculum Prompt"
                    >
                      <Sparkles size={18} className="text-amber-500" />
                    </button>

                    {/* Gemini Gradient Send Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSend()}
                      disabled={isLoading || !input.trim()}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-500 hover:opacity-95 text-white flex items-center justify-center shadow-md disabled:opacity-40 transition-all shrink-0"
                      title="Send message"
                    >
                      <Send size={16} />
                    </motion.button>
                  </div>

                  {/* Gemini Disclaimer & Bottom Watermark */}
                  <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 font-medium">
                    Gemini can make mistakes. Verify important syllabus facts with official NIE Sri Lanka textbooks.
                  </p>
                  
                  {/* Non-intrusive bottom watermark */}
                  <Watermark text="EDU.AI.DY.AI.EDUEDUCATION WITH AI" />
                </div>
              </div>
            </motion.div>
          )}

          {appView === 'subjects' && (
            <motion.div 
              key="subjects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 p-3 sm:p-6 md:p-10 pb-32 md:pb-36 overflow-y-auto z-10 w-full max-w-full min-h-0"
            >
              <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 w-full min-w-0">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-wider">
                      <GraduationCap size={14} /> Official NIE Syllabus & Deep Research
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                      විෂය නිර්දේශ <span className="text-primary italic">පාඩම් මාලාව</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                      ශ්‍රී ලංකා ජාතික අධ්‍යාපන ආයතනයේ (NIE) විෂය නිර්දේශයට අනුව ගැඹුරු පර්යේෂණ සහිත නිල පාඩම් සහ විවරණ.
                    </p>
                  </div>

                  {/* Grade Switcher Pills */}
                  <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
                    <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                      ශ්‍රේණිය තෝරන්න (Select Grade)
                    </span>
                    <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-2xl border border-slate-200 dark:border-white/10">
                      {Array.from({ length: 8 }, (_, i) => i + 6).map((g) => {
                        const gradeStr = `Grade ${g}`;
                        const isSelected = syllabusGradeFilter === gradeStr;
                        return (
                          <button
                            key={g}
                            onClick={() => {
                              setSyllabusGradeFilter(gradeStr);
                              setUserGrade(gradeStr);
                              localStorage.setItem('edu_ai_user_grade', gradeStr);
                            }}
                            className={`px-2.5 py-1 rounded-xl text-[10px] font-black transition-all ${
                              isSelected
                                ? 'bg-primary text-white shadow-sm scale-105'
                                : 'text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-white/60 dark:hover:bg-white/10'
                            }`}
                          >
                            G-{g}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </header>

                {/* Subject Selector Bar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                      විෂය තෝරන්න (Select Subject)
                    </h3>
                    <span className="text-[10px] font-bold text-primary">
                      {ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name || 'සිංහල (Sinhala)'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 overflow-x-auto pb-3 scrollbar-hide w-full max-w-full">
                    {ALL_SUBJECTS.map((sub) => {
                      const isSelected = selectedSubject === sub.id;
                      return (
                        <motion.button
                          key={sub.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setSelectedSubject(sub.id);
                            setSinhalaBookFilter('all');
                            const subjName = sub.name.split(' (')[0];
                            setGameSubject(subjName);

                            // If this subject doesn't have theory units for current grade, enter directly into Game Zone
                            const sData = getSyllabusForSubject(syllabusGradeFilter, sub.id);
                            if (!sData || !sData.units || sData.units.length === 0) {
                              setGameSubject(subjName);
                              setGameGrade(syllabusGradeFilter);
                              setActiveGame(null);
                              setAppView('game');
                            }
                          }}
                          className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs border transition-all ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-md shadow-primary/20 scale-105'
                              : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-primary/40'
                          }`}
                        >
                          <sub.icon size={16} className={isSelected ? 'text-white' : 'text-primary'} />
                          <span className="whitespace-nowrap">{sub.name.split(' (')[0]}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Search & Term Filter Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1 min-w-0">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input 
                      type="text"
                      value={syllabusSearchTerm}
                      onChange={(e) => setSyllabusSearchTerm(e.target.value)}
                      placeholder="පාඩම හෝ ඒකකය සොයන්න (Search syllabus topic)..."
                      className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/40 transition-all shadow-inner"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto pb-1 sm:pb-0">
                    {['All', '1st Term', '2nd Term', '3rd Term'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTerm(t === 'All' ? '1st Term' : t as any)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                          (t === 'All' || selectedTerm === t)
                            ? 'bg-secondary text-white border-secondary shadow-sm'
                            : 'bg-white/60 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-secondary/40'
                        }`}
                      >
                        {t === 'All' ? 'සියලු වාර' : t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sinhala Dual-Textbooks Special Categorizer */}
                {selectedSubject === 'sinhala' && (syllabusGradeFilter === 'Grade 10' || syllabusGradeFilter === 'Grade 11') && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-3xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/25 space-y-4 shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                          <BookOpen size={12} /> නිල පෙළපොත් ද්විත්වය (Official NIE 2-Textbooks)
                        </div>
                        <h3 className="text-base font-black text-slate-800 dark:text-white">
                          {syllabusGradeFilter} සිංහල විෂය නිර්දේශයේ පොත් 2ම සම්පූර්ණයෙන්
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          1 වන පොත (භාෂාව හා ව්‍යාකරණ) සහ 2 වන පොත (සාහිත්‍ය සංග්‍රහය) වෙන් වෙන්ව පහසුවෙන් ඉගෙන ගන්න.
                        </p>
                      </div>

                      {/* Both Official Textbook Download Buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href="http://www.edupub.gov.lk/BooksDownload.php"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-xs transition-all"
                        >
                          <Download size={13} />
                          <span>1 වන පොත (භාෂාව) PDF</span>
                        </a>
                        <a
                          href="http://www.edupub.gov.lk/BooksDownload.php"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-xs transition-all"
                        >
                          <Download size={13} />
                          <span>2 වන පොත (සාහිත්‍යය) PDF</span>
                        </a>
                      </div>
                    </div>

                    {/* Book Filter Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-amber-500/15">
                      {[
                        { id: 'all', label: 'සියලු පාඩම් (All Lessons)' },
                        { id: 'book1', label: '📖 1 වන පොත: භාෂාව හා ව්‍යාකරණ' },
                        { id: 'book2', label: '📜 2 වන පොත: සාහිත්‍ය සංග්‍රහය' },
                        { id: 'poetry', label: '🌸 පද්‍ය (Poetry)' },
                        { id: 'prose', label: '🏛️ ගද්‍ය (Classical Prose)' },
                        { id: 'stories', label: '✍️ කෙටිකතා හා නවකතා' },
                        { id: 'drama', label: '🎭 නාට්‍ය සාහිත්‍යය' }
                      ].map((bTab) => (
                        <button
                          key={bTab.id}
                          onClick={() => setSinhalaBookFilter(bTab.id as any)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                            sinhalaBookFilter === bTab.id
                              ? 'bg-amber-500 text-white border-amber-500 shadow-xs scale-102 font-black'
                              : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-amber-500/40'
                          }`}
                        >
                          {bTab.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Units List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm md:text-base font-black text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <BookOpen size={16} className="text-primary" /> 
                      {syllabusGradeFilter} • {ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name || selectedSubject} විෂය ඒකක
                    </h2>
                    
                    {/* Official Textbook Download Link (single or standard) */}
                    {selectedSubject !== 'sinhala' && (
                      <a
                        href={getSyllabusForSubject(syllabusGradeFilter, selectedSubject)?.textbookUrl || 'http://www.edupub.gov.lk/BooksDownload.php'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent font-bold text-xs transition-all border border-accent/20"
                      >
                        <Download size={13} />
                        <span className="hidden sm:inline">නිල අච්චු පොත</span>
                        <span>PDF</span>
                      </a>
                    )}
                  </div>

                  {(() => {
                    const currentSubjectObj = ALL_SUBJECTS.find(s => s.id === selectedSubject);
                    const subjectData = getSyllabusForSubject(syllabusGradeFilter, selectedSubject);

                    // If no syllabus units exist for this subject, provide direct Game Zone entry & AI learning
                    if (!subjectData || !subjectData.units || subjectData.units.length === 0) {
                      return (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="liquid-glass dark:bg-slate-900/80 p-8 sm:p-10 rounded-[36px] text-center space-y-6 border-2 border-primary/20 shadow-xl max-w-xl mx-auto my-6"
                        >
                          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center">
                            <Gamepad2 size={36} className="animate-bounce" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">
                              {currentSubjectObj?.name || 'මෙම විෂය'} සඳහා සජීවී ක්‍රීඩා සහ අභ්‍යාස
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed font-medium">
                              මෙම විෂය සඳහා න්‍යායාත්මක පාඩම් මාලාවට අමතරව Game Zone එකෙන් ලකුණු (XP) උපයා ගැනීමට හෝ AI Tutor සමඟින් කෙලින්ම ඉගෙන ගැනීමට ඇතුල් වන්න!
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                            <button
                              onClick={() => {
                                setGameSubject(currentSubjectObj?.name || selectedSubject);
                                setGameGrade(syllabusGradeFilter);
                                setActiveGame(null);
                                setAppView('game');
                                confetti();
                              }}
                              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-105"
                            >
                              <Gamepad2 size={18} />
                              <span>කෙලින්ම Game Zone එකට යන්න 🎮</span>
                            </button>

                            <button
                              onClick={() => {
                                setAppView('learning');
                                handleSend(`මට ${syllabusGradeFilter} ${currentSubjectObj?.name || selectedSubject} විෂය නිර්දේශයේ ප්‍රධාන පාඩම් සහ විභාගයට වැදගත් කරුණු සරලව කියා දෙන්න.`);
                              }}
                              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-primary text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all hover:bg-blue-600"
                            >
                              <Sparkles size={16} />
                              <span>AI Tutor සමඟ ඉගෙන ගන්න</span>
                            </button>
                          </div>
                        </motion.div>
                      );
                    }

                    const units = subjectData.units;
                    let filteredUnits = units.filter(u => 
                      !syllabusSearchTerm.trim() || u.toLowerCase().includes(syllabusSearchTerm.toLowerCase())
                    );

                    // If Sinhala Grade 10 / 11 and book filter is active
                    if (selectedSubject === 'sinhala' && (syllabusGradeFilter === 'Grade 10' || syllabusGradeFilter === 'Grade 11') && sinhalaBookFilter !== 'all') {
                      if (sinhalaBookFilter === 'book1') {
                        filteredUnits = filteredUnits.filter(u => u.includes('1 වන පොත'));
                      } else if (sinhalaBookFilter === 'book2') {
                        filteredUnits = filteredUnits.filter(u => u.includes('2 වන පොත'));
                      } else if (sinhalaBookFilter === 'poetry') {
                        filteredUnits = filteredUnits.filter(u => u.includes('පද්‍ය'));
                      } else if (sinhalaBookFilter === 'prose') {
                        filteredUnits = filteredUnits.filter(u => u.includes('ගද්‍ය'));
                      } else if (sinhalaBookFilter === 'stories') {
                        filteredUnits = filteredUnits.filter(u => u.includes('කෙටිකතා') || u.includes('නවකතා'));
                      } else if (sinhalaBookFilter === 'drama') {
                        filteredUnits = filteredUnits.filter(u => u.includes('නාට්‍ය'));
                      }
                    }

                    if (filteredUnits.length === 0) {
                      return (
                        <div className="liquid-glass p-8 rounded-3xl text-center space-y-4 border border-slate-200 dark:border-white/10 max-w-lg mx-auto">
                          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                            මෙම සෙවුමට ගැලපෙන පාඩමක් හමු නොවීය. ඔබට ඕනෑම මාතෘකාවක් AI වෙතින් අසා දැනගත හැක.
                          </p>
                          <div className="flex flex-wrap items-center justify-center gap-2">
                            <button
                              onClick={() => handleStartLearningUnitInChat(syllabusSearchTerm || 'විෂය නිර්දේශයේ මූලික කරුණු')}
                              className="px-4 py-2.5 bg-primary text-white rounded-xl text-xs font-black shadow-md hover:bg-blue-600 transition-all"
                            >
                              AI සමඟ "${syllabusSearchTerm || 'පාඩම'}" ඉගෙන ගන්න 🤖
                            </button>
                            <button
                              onClick={() => {
                                setGameSubject(currentSubjectObj?.name || selectedSubject);
                                setAppView('game');
                              }}
                              className="px-4 py-2.5 bg-secondary text-white rounded-xl text-xs font-black shadow-md hover:opacity-90 transition-all flex items-center gap-1.5"
                            >
                              <Gamepad2 size={14} />
                              <span>Game Zone එකට යන්න</span>
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {filteredUnits.map((unit, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            className="liquid-glass-white dark:bg-slate-900/60 p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[10px] font-black tracking-wider uppercase">
                                  ඒකකය {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400">
                                  NIE Syllabus
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-snug">
                                {unit}
                              </h4>
                            </div>

                            <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center gap-2">
                              {/* Deep Research Button */}
                              <button
                                onClick={() => handleDeepResearchLesson(unit)}
                                className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-black shadow-sm transition-all"
                              >
                                <Sparkles size={13} className="animate-pulse" />
                                <span>ගැඹුරු පර්යේෂණ පාඩම 🔬</span>
                              </button>

                              {/* Live Classroom Button */}
                              <button
                                onClick={() => handleStartLearningUnitInChat(unit)}
                                className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all"
                                title="AI සමඟ සජීවීව ඉගෙන ගන්න"
                              >
                                <Bot size={14} className="text-primary" />
                                <span className="hidden sm:inline">සජීවීව</span>
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* Deep Research Lesson Modal/Overlay */}
                <AnimatePresence>
                  {(deepResearchLoading || deepResearchLesson) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto"
                      onClick={() => {
                        if (!deepResearchLoading) {
                          setDeepResearchLesson(null);
                          setSelectedUnitForResearch(null);
                        }
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-3xl w-full max-h-[90vh] flex flex-col liquid-glass-white dark:bg-slate-900 rounded-[32px] border border-white/80 dark:border-white/20 shadow-2xl overflow-hidden my-auto"
                      >
                        {/* Modal Header */}
                        <div className="p-4 sm:p-6 border-b border-slate-150 dark:border-white/10 flex items-center justify-between shrink-0 bg-primary/5">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
                              <Sparkles size={20} />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-md bg-secondary/10 text-secondary text-[10px] font-black uppercase">
                                  NIE Deep Research Guide
                                </span>
                                <span className="text-[10px] font-bold text-slate-400">
                                  {deepResearchLesson?.grade || syllabusGradeFilter} • {deepResearchLesson?.subject || selectedSubject}
                                </span>
                              </div>
                              <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white truncate">
                                {deepResearchLoading ? (selectedUnitForResearch || 'විෂය නිර්දේශ පර්යේෂණය...') : deepResearchLesson?.lessonTitle}
                              </h3>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {deepResearchLesson && !deepResearchLoading && (
                              <button
                                onClick={handleExportDeepLessonPDF}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-blue-600 text-white rounded-xl text-xs font-black shadow-sm transition-all"
                                title="Download complete lesson PDF"
                              >
                                <Download size={13} />
                                <span className="hidden sm:inline">PDF බාගන්න</span>
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setDeepResearchLesson(null);
                                setSelectedUnitForResearch(null);
                              }}
                              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                          {deepResearchLoading ? (
                            <div className="py-16 flex flex-col items-center justify-center space-y-4 text-center">
                              <div className="relative">
                                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                                <Sparkles className="absolute inset-0 m-auto text-primary animate-pulse" size={24} />
                              </div>
                              <div className="space-y-1">
                                <h4 className="text-base font-black text-slate-800 dark:text-white">
                                  ජාතික අධ්‍යාපන ආයතන (NIE) විෂය නිර්දේශය ගැඹුරින් පර්යේෂණය කරමින් පවතී... 🔬
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                                  නියමිත ඒකකයේ මූලික සංකල්ප, සූත්‍ර, විභාග රහස් සහ ස්වයං ඇගයීම් ප්‍රශ්න සකස් වෙමින් පවතී.
                                </p>
                              </div>
                            </div>
                          ) : deepResearchLesson && (
                            <>
                              {/* 1. Competencies */}
                              {deepResearchLesson.competencies && deepResearchLesson.competencies.length > 0 && (
                                <div className="liquid-glass dark:bg-white/5 p-4 rounded-2xl border border-secondary/20 space-y-2">
                                  <h4 className="text-xs font-black uppercase text-secondary tracking-wider flex items-center gap-1.5">
                                    <CheckCircle2 size={14} /> නිපුණතා හා අපේක්ෂිත ඉගෙනුම් ඵල (Competencies)
                                  </h4>
                                  <ul className="space-y-1">
                                    {deepResearchLesson.competencies.map((c, i) => (
                                      <li key={i} className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                        <span className="text-secondary">•</span> {c}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* 2. Markdown Syllabus Lesson Content */}
                              <div className="space-y-2">
                                <h4 className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5">
                                  <BookOpen size={14} className="text-primary" /> ගැඹුරු විෂය කරුණු විවරණය (Comprehensive Syllabus Content)
                                </h4>
                                <div className="liquid-glass-white dark:bg-slate-900/50 p-5 rounded-3xl border border-slate-200 dark:border-white/10 markdown-content text-xs sm:text-sm leading-relaxed">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {deepResearchLesson.markdownContent}
                                  </ReactMarkdown>
                                </div>
                              </div>

                              {/* 3. Key Formulas / Terms */}
                              {deepResearchLesson.keyFormulasOrTerms && deepResearchLesson.keyFormulasOrTerms.length > 0 && (
                                <div className="space-y-2">
                                  <h4 className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5">
                                    <Calculator size={14} className="text-accent" /> ප්‍රධාන සූත්‍ර, අර්ථ දැක්වීම් හා නීති (Key Formulas & Laws)
                                  </h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {deepResearchLesson.keyFormulasOrTerms.map((f, i) => (
                                      <div key={i} className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                                        <span className="font-black text-amber-700 dark:text-amber-300 block">{f.term}</span>
                                        <p className="text-slate-600 dark:text-slate-300 font-medium">{f.explanation}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* 4. Exam Master Tips */}
                              {deepResearchLesson.examTips && deepResearchLesson.examTips.length > 0 && (
                                <div className="space-y-2">
                                  <h4 className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5">
                                    <Lightbulb size={14} className="text-rose-500" /> විභාග රහස් හා උපදෙස් (Exam Master Tips)
                                  </h4>
                                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2">
                                    {deepResearchLesson.examTips.map((tip, i) => (
                                      <div key={i} className="text-xs font-bold text-rose-900 dark:text-rose-200 flex items-start gap-2">
                                        <span>📌</span>
                                        <span>{tip}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* 5. Self-Assessment Quiz */}
                              {deepResearchLesson.quickQuiz && deepResearchLesson.quickQuiz.length > 0 && (
                                <div className="space-y-3 pt-2">
                                  <h4 className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider flex items-center gap-1.5">
                                    <HelpCircle size={14} className="text-primary" /> ස්වයං ඇගයීම් ප්‍රශ්නාවලිය (Self-Assessment Quiz)
                                  </h4>
                                  <div className="space-y-3">
                                    {deepResearchLesson.quickQuiz.map((q, qIdx) => {
                                      const selectedAns = deepQuizAnswers[qIdx];
                                      return (
                                        <div key={qIdx} className="liquid-glass dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10 space-y-2.5">
                                          <p className="text-xs font-bold text-slate-800 dark:text-white">
                                            {qIdx + 1}. {q.question}
                                          </p>
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {q.options.map((opt, optIdx) => {
                                              const isChosen = selectedAns === optIdx;
                                              const isCorrect = optIdx === q.answerIndex;
                                              let btnClass = 'border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 text-slate-700 dark:text-slate-300';
                                              if (deepQuizSubmitted) {
                                                if (isCorrect) btnClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-black';
                                                else if (isChosen && !isCorrect) btnClass = 'bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-300';
                                              } else if (isChosen) {
                                                btnClass = 'bg-primary text-white border-primary shadow-sm';
                                              }

                                              return (
                                                <button
                                                  key={optIdx}
                                                  disabled={deepQuizSubmitted}
                                                  onClick={() => {
                                                    setDeepQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
                                                  }}
                                                  className={`p-2.5 rounded-xl text-xs text-left border transition-all ${btnClass}`}
                                                >
                                                  {opt}
                                                </button>
                                              );
                                            })}
                                          </div>
                                          {deepQuizSubmitted && (
                                            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 p-2 rounded-xl">
                                              💡 <strong>විවරණය:</strong> {q.explanation}
                                            </p>
                                          )}
                                        </div>
                                      );
                                    })}
                                    
                                    {!deepQuizSubmitted ? (
                                      <button
                                        onClick={() => {
                                          setDeepQuizSubmitted(true);
                                          confetti();
                                        }}
                                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md transition-all"
                                      >
                                        පිළිතුරු පරීක්ෂා කරන්න (Check Quiz Answers) ✅
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          setDeepQuizSubmitted(false);
                                          setDeepQuizAnswers({});
                                        }}
                                        className="w-full py-2 bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all"
                                      >
                                        නැවත උත්සාහ කරන්න (Retry Quiz) 🔄
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        {/* Modal Footer */}
                        {deepResearchLesson && !deepResearchLoading && (
                          <div className="p-4 border-t border-slate-150 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase">
                              EDU.AI NIE Curriculum Research Edition
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleStartLearningUnitInChat(deepResearchLesson.lessonTitle)}
                                className="px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-1.5"
                              >
                                <Bot size={14} /> මෙම පාඩම සජීවීව ඉගෙන ගන්න 🤖
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Clean Bottom Watermark (30% opacity, bottom of page only) */}
                <div className="pt-6">
                  <Watermark text="EDU.AI.DY.AI.EDUEDUCATION WITH AI" />
                </div>
              </div>
            </motion.div>
          )}

          {appView === 'game' && (
            <motion.div 
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 p-6 md:p-10 pb-28 md:pb-32 overflow-y-auto z-10"
            >
              <div className="max-w-4xl mx-auto space-y-10">
                {!activeGame ? (
                  <>
                    <header className="text-center space-y-4">
                      <div className="w-20 h-20 bg-secondary/10 rounded-[32px] flex items-center justify-center mx-auto border border-secondary/20 text-secondary shadow-xl shadow-secondary/5">
                        <Gamepad2 size={40} className="animate-pulse" />
                      </div>
                      <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white">Game <span className="text-secondary italic">Zone</span></h1>
                      <p className="text-slate-500 dark:text-slate-400 font-medium">විනෝදයෙන් යුතුව දැනුම මැන බලමු! 🏆</p>

                      {/* Top Tab Switcher: Games vs Leaderboard */}
                      <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 max-w-md mx-auto shadow-sm">
                        <button
                          onClick={() => setGameTab('games')}
                          className={`flex-1 py-2.5 px-4 rounded-xl font-black text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
                            gameTab === 'games'
                              ? 'bg-secondary text-white shadow-md'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <Gamepad2 size={16} />
                          <span>ක්‍රීඩා (Games)</span>
                        </button>
                        <button
                          onClick={() => {
                            setGameTab('leaderboard');
                            confetti({ particleCount: 30, spread: 50, origin: { y: 0.5 } });
                          }}
                          className={`flex-1 py-2.5 px-4 rounded-xl font-black text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
                            gameTab === 'leaderboard'
                              ? 'bg-amber-500 text-white shadow-md'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <Trophy size={16} />
                          <span>ලකුණු පුවරුව (Leaderboard)</span>
                        </button>
                      </div>
                    </header>

                    {gameTab === 'leaderboard' ? (
                      <div className="space-y-6">
                        <Leaderboard
                          currentStudentPoints={points}
                          currentStudentName={userName}
                          currentStudentGrade={userGrade}
                          streakDays={streak}
                          onPlayGame={() => setGameTab('games')}
                        />
                      </div>
                    ) : showGameSettings ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="liquid-glass p-8 rounded-[40px] border-4 border-secondary/20 space-y-8"
                      >
                         <div className="text-center space-y-2">
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white">ඔබේ ශ්‍රේණිය, විෂය හා වාරය ඇතුළත් කරන්න</h2>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Select your Level, Subject & Term</p>
                         </div>

                         <div className="space-y-6">
                            <div className="space-y-3">
                               <label className="text-xs font-black text-slate-400 uppercase ml-2 flex items-center gap-2">
                                  <GraduationCap size={14} /> ශ්‍රේණිය (Grade)
                               </label>
                               <div className="flex flex-wrap gap-2">
                                  {['6', '7', '8', '9', '10', '11', '12', '13', 'All'].map(g => (
                                    <button 
                                      key={g} 
                                      onClick={() => setGameGrade(g === 'All' ? 'All' : `Grade ${g}`)}
                                      className={`px-4 py-2 rounded-xl font-bold transition-all border-2 ${
                                        (g === 'All' && gameGrade === 'All') || (gameGrade === `Grade ${g}`)
                                          ? 'bg-primary text-white border-primary shadow-lg scale-105' 
                                          : 'bg-white/50 border-white/20 text-slate-600 dark:text-white dark:bg-white/5'
                                      }`}
                                    >
                                      {g === 'All' ? 'සියල්ල (All)' : g}
                                    </button>
                                  ))}
                               </div>
                            </div>

                            <div className="space-y-3">
                               <label className="text-xs font-black text-slate-400 uppercase ml-2 flex items-center gap-2">
                                  <BookOpen size={14} /> විෂය (Subject)
                               </label>
                               <div className="flex flex-wrap gap-2">
                                  {['Science', 'Mathematics', 'Sinhala', 'English', 'History', 'Buddhism', 'Geography', 'ICT', 'Health & Phys. Ed', 'Civic Education', 'Commerce', 'Agriculture', 'Art', 'Music', 'Dancing', 'Drama', 'All'].map(s => (
                                    <button 
                                      key={s} 
                                      onClick={() => setGameSubject(s)}
                                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                                        gameSubject === s
                                          ? 'bg-secondary text-white border-secondary shadow-lg scale-105' 
                                          : 'bg-white/50 border-white/20 text-slate-600 dark:text-white dark:bg-white/5'
                                      }`}
                                    >
                                      {s === 'All' ? 'සියල්ල (All)' : s}
                                    </button>
                                  ))}
                               </div>
                            </div>

                            <div className="space-y-3">
                               <label className="text-xs font-black text-slate-400 uppercase ml-2 flex items-center gap-2">
                                  <Timer size={14} /> වාරය (Term)
                               </label>
                               <div className="flex flex-wrap gap-2">
                                  {[
                                    { id: '1st Term', name: '1st Term', sin: '1 වාරය' },
                                    { id: '2nd Term', name: '2nd Term', sin: '2 වාරය' },
                                    { id: '3rd Term', name: '3rd Term', sin: '3 වාරය' },
                                    { id: 'All', name: 'All Terms', sin: 'සියලු වාරයන් (All)' }
                                  ].map(t => (
                                    <button 
                                      key={t.id} 
                                      onClick={() => setGameTerm(t.id)}
                                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                                        gameTerm === t.id
                                          ? 'bg-amber-500 text-white border-amber-500 shadow-lg scale-105' 
                                          : 'bg-white/50 border-white/20 text-slate-600 dark:text-white dark:bg-white/5'
                                      }`}
                                    >
                                      {t.sin} ({t.name})
                                    </button>
                                  ))}
                               </div>
                            </div>

                            <button 
                              onClick={() => { setShowGameSettings(false); confetti(); }}
                              className="w-full bg-slate-900 text-white dark:bg-primary py-5 rounded-[24px] font-black text-lg shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                            >
                               අපි සෙල්ලම් කරමු! (Let's Go!) <ArrowRight />
                            </button>
                         </div>
                      </motion.div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center bg-white/40 dark:bg-white/5 p-4 rounded-3xl border border-white/40 mb-6">
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black text-slate-400 uppercase">සැකසුම:</span>
                              <div className="flex flex-wrap gap-2">
                                 <span className="bg-primary/10 text-primary text-[10px] font-black px-2.5 py-1 rounded-full">{gameGrade}</span>
                                 <span className="bg-secondary/10 text-secondary text-[10px] font-black px-2.5 py-1 rounded-full">{gameSubject}</span>
                                 <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black px-2.5 py-1 rounded-full">{gameTerm === 'All' ? 'All Terms' : gameTerm}</span>
                              </div>
                           </div>
                           <button onClick={() => setShowGameSettings(true)} className="text-[10px] font-black text-primary uppercase border-b border-primary border-dashed">වෙනස් කරන්න (Edit)</button>
                        </div>
                        
                        <motion.div 
                          variants={{
                            hidden: { opacity: 0 },
                            show: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.1
                              }
                            }
                          }}
                          initial="hidden"
                          animate="show"
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                      {/* Full Quiz */}
                      <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        className="liquid-glass p-6 rounded-[32px] space-y-5 border border-white/40 shadow-xl flex flex-col group hover:scale-[1.02] transition-transform"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                          <GraduationCap size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black dark:text-white">ප්‍රශ්නාවලිය (Quiz)</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">දැනට උගත් කොටස් වලින් ප්‍රශ්න වලට උත්තර දෙමුද?</p>
                        </div>
                        <button 
                          onClick={startQuiz}
                          className="w-full bg-primary text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                        >
                          ඇරඹීමට (Start) <Play size={16} fill="white" />
                        </button>
                      </motion.div>

                      {/* Word Scramble */}
                      <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        className="liquid-glass p-6 rounded-[32px] space-y-5 border border-white/40 shadow-xl flex flex-col group hover:scale-[1.02] transition-transform"
                      >
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:rotate-12 transition-transform">
                          <Type size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black dark:text-white">අකුරු ගැටලුව (Scramble)</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">අකුරු එහා මෙහා කරලා හරි වචනය හොයමු!</p>
                        </div>
                        <button 
                          onClick={() => setActiveGame('scramble')}
                          className="w-full bg-emerald-500 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
                        >
                          ඇරඹීමට (Start) <Play size={16} fill="white" />
                        </button>
                      </motion.div>

                      {/* Emoji Riddle */}
                      <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        className="liquid-glass p-6 rounded-[32px] space-y-5 border border-amber-400/30 shadow-xl flex flex-col border-2 group hover:scale-[1.02] transition-transform"
                      >
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bounce transition-transform">
                           <Sparkles size={24} />
                        </div>
                        <div className="flex-1">
                           <div className="flex items-center gap-2">
                             <h3 className="font-black dark:text-white">ඉමෝජි අභියෝගය</h3>
                           </div>
                           <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">ඉමෝජි ගැටලු විසඳමු.</p>
                        </div>
                        <button 
                          onClick={() => setActiveGame('emojiriddle')}
                          className="w-full bg-amber-500 text-white py-3 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors"
                        >
                          ඇරඹීමට (Start) <Play size={16} fill="white" />
                        </button>
                      </motion.div>

                      {/* Match Master */}
                      <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        className="liquid-glass p-6 rounded-[32px] space-y-5 border border-indigo-400/30 shadow-xl flex flex-col border-2 group hover:scale-[1.02] transition-transform"
                      >
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:rotate-12 transition-transform">
                           <Boxes size={24} />
                        </div>
                        <div className="flex-1">
                           <h3 className="font-black dark:text-white">මතක ක්‍රීඩාව (Match)</h3>
                           <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">සමාන රූප සොයා ගලපමු!</p>
                        </div>
                        <button 
                          onClick={() => setActiveGame('match')}
                          className="w-full bg-indigo-500 text-white py-3 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors"
                        >
                          ඇරඹීමට (Start) <Play size={16} fill="white" />
                        </button>
                      </motion.div>

                      {/* Fact or Fiction */}
                      <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        className="liquid-glass p-6 rounded-[32px] space-y-5 border border-emerald-400/30 shadow-xl flex flex-col group hover:scale-[1.02] transition-transform"
                      >
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:rotate-6 transition-transform">
                           <CheckCircle2 size={24} />
                        </div>
                        <div className="flex-1">
                           <h3 className="font-black dark:text-white">සත්‍ය අසත්‍ය</h3>
                           <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">ඇත්තද බොරුද කියලා බලමුද?</p>
                        </div>
                        <button 
                          onClick={() => setActiveGame('factfiction')}
                          className="w-full bg-emerald-500 text-white py-3 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
                        >
                          ඇරඹීමට (Start) <Play size={16} fill="white" />
                        </button>
                      </motion.div>

                      {/* Fill in the Blanks */}
                      <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        className="liquid-glass p-6 rounded-[32px] space-y-5 border border-primary/30 shadow-xl flex flex-col group hover:scale-[1.02] transition-transform"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:-rotate-6 transition-transform">
                           <Layout size={24} />
                        </div>
                        <div className="flex-1">
                           <h3 className="font-black dark:text-white">හිස්තැන් පුරවන්න</h3>
                           <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">හරි වචනයෙන් හිස්තැන් පුරවමු.</p>
                        </div>
                        <button 
                          onClick={() => setActiveGame('fillblank')}
                          className="w-full bg-primary text-white py-2 md:py-3 rounded-xl md:rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                        >
                          ඇරඹීමට (Start) <Play size={14} fill="white" />
                        </button>
                      </motion.div>

                      {/* Word Hero (Hangman) */}
                      <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        className="liquid-glass p-4 md:p-6 rounded-2xl md:rounded-[32px] space-y-3 md:space-y-5 border border-rose-400/30 shadow-xl flex flex-col group hover:scale-[1.02] transition-transform"
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 group-hover:bounce transition-transform">
                           <Star className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div className="flex-1">
                           <h3 className="text-sm md:text-base font-black dark:text-white">වචන වීරයා (Hero)</h3>
                           <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">අනුමාන කර වීරයෙක් වෙන්න!</p>
                        </div>
                        <button 
                          onClick={() => setActiveGame('hangman')}
                          className="w-full bg-rose-500 text-white py-2 md:py-3 rounded-xl md:rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-rose-600 transition-colors"
                        >
                          ඇරඹීමට (Start) <Play size={14} fill="white" />
                        </button>
                      </motion.div>

                      {/* Odd One Out */}
                      <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        className="liquid-glass p-6 rounded-[32px] space-y-5 border border-indigo-400/30 shadow-xl flex flex-col group hover:scale-[1.02] transition-transform"
                      >
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                           <HelpCircle size={24} />
                        </div>
                        <div className="flex-1">
                           <h3 className="font-black dark:text-white">වෙන්ව පෙනෙන එක</h3>
                           <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">නොගැලපෙන එක කුමක්ද?</p>
                        </div>
                        <button 
                          onClick={() => setActiveGame('oddoneout')}
                          className="w-full bg-indigo-500 text-white py-3 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors"
                        >
                          ඇරඹීමට (Start) <Play size={16} fill="white" />
                        </button>
                      </motion.div>

                      {/* Sorting Race */}
                      <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        className="liquid-glass p-6 rounded-[32px] space-y-5 border border-cyan-400/30 shadow-xl flex flex-col group hover:scale-[1.02] transition-transform"
                      >
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 group-hover:-rotate-12 transition-transform">
                           <Zap size={24} />
                        </div>
                        <div className="flex-1">
                           <h3 className="font-black dark:text-white">වර්ගීකරණ අභියෝගය</h3>
                           <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">බඳුන් වලට හරි දේවල් දමමු.</p>
                        </div>
                        <button 
                          onClick={() => setActiveGame('sorting')}
                          className="w-full bg-cyan-500 text-white py-3 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-cyan-600 transition-colors"
                        >
                          ඇරඹීමට (Start) <Play size={16} fill="white" />
                        </button>
                      </motion.div>

                      {/* Riddle Master */}
                      <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        className="liquid-glass p-6 rounded-[32px] space-y-5 border border-accent/30 shadow-xl flex flex-col group hover:scale-[1.02] transition-transform"
                      >
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:rotate-12 transition-transform">
                           <Lightbulb size={24} />
                        </div>
                        <div className="flex-1">
                           <h3 className="font-black dark:text-white">ප්‍රහේලිකා (Riddles)</h3>
                           <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">බුද්ධිය මෙහෙයවා ප්‍රහේලිකා විසඳමු.</p>
                        </div>
                        <button 
                          onClick={() => setActiveGame('riddle')}
                          className="w-full bg-accent text-white py-3 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-violet-600 transition-colors"
                        >
                          ඇරඹීමට (Start) <Play size={16} fill="white" />
                        </button>
                      </motion.div>

                      {/* Math Wiz */}
                      <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        className="liquid-glass p-6 rounded-[32px] space-y-5 border border-emerald-400/30 shadow-xl flex flex-col group hover:scale-[1.02] transition-transform"
                      >
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                           <Brain size={24} />
                        </div>
                        <div className="flex-1">
                           <h3 className="font-black dark:text-white">ගණිත දක්ෂයා (Math Wiz)</h3>
                           <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">වේගවත් ගණිත අභියෝග ජයගන්න.</p>
                        </div>
                        <button 
                          onClick={() => setActiveGame('mathwiz')}
                          className="w-full bg-emerald-500 text-white py-3 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
                        >
                          ඇරඹීමට (Start) <Play size={16} fill="white" />
                        </button>
                      </motion.div>

                      {/* Sequence Master */}
                      <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        className="liquid-glass p-6 rounded-[32px] space-y-5 border border-amber-400/30 shadow-xl flex flex-col group hover:scale-[1.02] transition-transform"
                      >
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:-rotate-12 transition-transform">
                           <Zap size={24} />
                        </div>
                        <div className="flex-1">
                           <h3 className="font-black dark:text-white">අනුපිළිවෙල (Sequence)</h3>
                           <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">සිදුවීම් සහ පියවර නිවැරදිව පෙළගස්වන්න.</p>
                        </div>
                        <button 
                          onClick={() => setActiveGame('sequencemaster')}
                          className="w-full bg-amber-500 text-white py-3 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors"
                        >
                          ඇරඹීමට (Start) <Play size={16} fill="white" />
                        </button>
                      </motion.div>
                    </motion.div>

                    {/* Leaderboard Teaser Banner */}
                    <div className="liquid-glass-white dark:bg-slate-900/60 p-6 rounded-3xl border border-amber-400/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                          <Trophy size={26} />
                        </div>
                        <div>
                          <h3 className="font-black text-sm sm:text-base text-slate-800 dark:text-white">
                            Academic Champions Leaderboard 🏆
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            ඔබගේ ශ්‍රේණියේ මිතුරන් සමඟ ලකුණු ({points} XP) සංසන්දනය කරන්න!
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setGameTab('leaderboard');
                          confetti({ particleCount: 30, spread: 50, origin: { y: 0.5 } });
                        }}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs flex items-center gap-2 shadow-sm transition-all shrink-0"
                      >
                        <span>ලකුණු පුවරුව බලන්න (View Leaderboard)</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    {/* Non-intrusive bottom watermark */}
                    <div className="pt-4">
                      <Watermark text="EDU.AI.DY.AI.EDUEDUCATION WITH AI" />
                    </div>
                  </>
                )}
              </>
            ) : (
                  <div className="liquid-glass p-6 rounded-[40px] border border-white/40 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => {
                            setActiveGame(null);
                            setQuizActive(false);
                          }}
                          className="p-2 hover:bg-white/20 rounded-xl transition-all"
                        >
                          <ArrowLeft size={20} />
                        </button>
                        <h2 className="font-black text-xl text-slate-800 dark:text-white uppercase tracking-tight">
                          {activeGame === 'quiz' ? 'Quiz Session' : 
                           activeGame === 'scramble' ? 'Term Scramble' : 
                           activeGame === 'match' ? 'Match Master' : 
                           activeGame === 'emojiriddle' ? 'Emoji Riddle' : 
                           activeGame === 'factfiction' ? 'Fact or Fiction' : 
                           activeGame === 'sorting' ? 'Sorting Race' : 
                           activeGame === 'fillblank' ? 'Fill in the Blanks' : 
                           activeGame === 'oddoneout' ? 'Odd One Out' : 
                           activeGame === 'hangman' ? 'Word Hero' : 
                           activeGame === 'riddle' ? 'Riddle Master' : 
                           activeGame === 'mathwiz' ? 'Math Wiz' : 
                           activeGame === 'sequencemaster' ? 'Sequence Master' : 'Game'}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-white/40 dark:bg-white/5 rounded-full border border-white/20 text-[10px] font-black uppercase text-slate-500">
                        {selectedSubject} • {userGrade}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                      {activeGame === 'quiz' && (
                        <>
                          {quizLoading && quizQuestions.length === 0 ? (
                            <div className="flex flex-col items-center gap-4">
                              <Loader2 className="animate-spin text-primary" size={40} />
                              <p className="font-bold text-slate-500 animate-pulse">ප්‍රශ්න සකස් කරමින්... (Loading Quiz...)</p>
                            </div>
                          ) : quizActive && quizQuestions.length > 0 ? (
                            <div className="w-full max-w-2xl space-y-8">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-100 dark:bg-amber-950 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-900">
                                  {currentQuizIdx + 1} / {quizQuestions?.length > 0 ? 'Unlimited' : '...'}
                                </span>
                                <div className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">ප්‍රතිඵලය: {quizScore}</div>
                              </div>

                              <h4 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
                                {quizQuestions[currentQuizIdx]?.question || 'Problem loading question...'}
                              </h4>

                              <div className="grid gap-3">
                                {quizQuestions[currentQuizIdx]?.options?.map((opt, i) => (
                                  <motion.button
                                    key={i}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => handleAnswerSelection(i)}
                                    className={`p-3 md:p-5 rounded-xl md:rounded-2xl text-left font-bold transition-all border-2 text-sm md:text-base ${
                                      selectedAnswer === null 
                                        ? 'border-white/40 bg-white/40 hover:border-primary/50 text-slate-600 dark:text-slate-200 dark:bg-slate-800/40' 
                                        : i === quizQuestions[currentQuizIdx]?.correctIndex
                                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-inner'
                                          : i === selectedAnswer
                                            ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                            : 'border-slate-100 dark:border-slate-800 opacity-50 bg-white dark:bg-slate-900 shadow-sm'
                                    }`}
                                  >
                                    <div className="flex items-center gap-4">
                                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${
                                         selectedAnswer === null ? 'border-slate-200' : i === quizQuestions[currentQuizIdx]?.correctIndex ? 'border-emerald-500' : 'border-rose-500'
                                       }`}>
                                         {String.fromCharCode(65 + i)}
                                       </div>
                                       {opt}
                                    </div>
                                  </motion.button>
                                ))}
                              </div>

                              <AnimatePresence>
                                {showExplanation && (
                                  <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-3xl"
                                  >
                                    <h5 className="font-black text-blue-700 dark:text-blue-400 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                                       {quizLoading ? <Loader2 size={14} className="animate-spin" /> : <Bot size={14} />} 
                                       පැහැදිලි කිරීම (Explanation)
                                    </h5>
                                    <p className="text-sm text-blue-800 dark:text-blue-300 font-medium leading-relaxed italic">
                                      {quizQuestions[currentQuizIdx]?.explanation || 'No explanation available.'}
                                    </p>
                                    <button 
                                      disabled={quizLoading}
                                      onClick={nextQuestion}
                                      className="mt-4 w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                      {quizLoading ? 'මීළඟ ප්‍රශ්නය සකසමින්...' : <>මීළඟ ප්‍රශ්නය <ArrowRight size={16} /></>}
                                    </button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-4 text-center">
                              <Loader2 className="animate-spin text-primary" size={40} />
                            </div>
                          )}
                        </>
                      )}

                      {activeGame === 'scramble' && (
                        <WordScramble 
                          grade={gameGrade}
                          subject={gameSubject === 'All' ? 'General Academic Topics' : gameSubject}
                          language={userLang}
                          term={gameTerm === 'All' ? 'All Terms' : gameTerm}
                          onClose={() => setActiveGame(null)}
                        />
                      )}

                      {activeGame === 'match' && (
                        <MatchMaster 
                          grade={gameGrade}
                          subject={gameSubject === 'All' ? 'General Academic Topics' : gameSubject}
                          language={userLang}
                          term={gameTerm === 'All' ? 'All Terms' : gameTerm}
                          onClose={() => setActiveGame(null)}
                        />
                      )}

                      {activeGame === 'emojiriddle' && (
                        <EmojiRiddleGame
                          grade={gameGrade}
                          subject={gameSubject === 'All' ? 'General Academic Topics' : gameSubject}
                          language={userLang}
                          term={gameTerm === 'All' ? 'All Terms' : gameTerm}
                          onClose={() => setActiveGame(null)}
                        />
                      )}

                      {activeGame === 'factfiction' && (
                        <FactOrFictionGame
                          grade={gameGrade}
                          subject={gameSubject === 'All' ? 'General Academic Topics' : gameSubject}
                          language={userLang}
                          term={gameTerm === 'All' ? 'All Terms' : gameTerm}
                          onClose={() => setActiveGame(null)}
                        />
                      )}

                      {activeGame === 'fillblank' && (
                        <FillBlanksGame
                          grade={gameGrade}
                          subject={gameSubject === 'All' ? 'General Academic Topics' : gameSubject}
                          language={userLang}
                          term={gameTerm === 'All' ? 'All Terms' : gameTerm}
                          onClose={() => setActiveGame(null)}
                        />
                      )}

                      {activeGame === 'oddoneout' && (
                        <OddOneOutGame
                          grade={gameGrade}
                          subject={gameSubject === 'All' ? 'General Academic Topics' : gameSubject}
                          language={userLang}
                          term={gameTerm === 'All' ? 'All Terms' : gameTerm}
                          onClose={() => setActiveGame(null)}
                        />
                      )}

                      {activeGame === 'hangman' && (
                        <WordHeroGame
                          grade={gameGrade}
                          subject={gameSubject === 'All' ? 'General Academic Topics' : gameSubject}
                          language={userLang}
                          term={gameTerm === 'All' ? 'All Terms' : gameTerm}
                          onClose={() => setActiveGame(null)}
                        />
                      )}

                      {activeGame === 'sorting' && (
                        <SortingGame
                          grade={gameGrade}
                          subject={gameSubject === 'All' ? 'General Academic Topics' : gameSubject}
                          language={userLang}
                          term={gameTerm === 'All' ? 'All Terms' : gameTerm}
                          onClose={() => setActiveGame(null)}
                        />
                      )}

                      {activeGame === 'riddle' && (
                        <RiddleGame
                          grade={gameGrade}
                          subject={gameSubject === 'All' ? 'General Academic Topics' : gameSubject}
                          language={userLang}
                          term={gameTerm === 'All' ? 'All Terms' : gameTerm}
                          onClose={() => setActiveGame(null)}
                        />
                      )}

                      {activeGame === 'mathwiz' && (
                        <MathWizGame
                          grade={gameGrade}
                          subject={gameSubject === 'All' ? 'General Academic Topics' : gameSubject}
                          language={userLang}
                          term={gameTerm === 'All' ? 'All Terms' : gameTerm}
                          onClose={() => setActiveGame(null)}
                        />
                      )}

                      {activeGame === 'sequencemaster' && (
                        <SequenceMasterGame
                          grade={gameGrade}
                          subject={gameSubject === 'All' ? 'General Academic Topics' : gameSubject}
                          language={userLang}
                          term={gameTerm === 'All' ? 'All Terms' : gameTerm}
                          onClose={() => setActiveGame(null)}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {appView === 'profile' && (
             <motion.div 
                key="profile"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 p-6 md:p-10 pb-28 md:pb-32 overflow-y-auto z-10"
             >
                <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
                    <div className="flex items-center gap-4 md:gap-6 bg-white/40 dark:bg-slate-900/40 p-5 rounded-3xl border border-white/50 dark:border-white/5 shadow-sm">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-tr from-primary to-indigo-400 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-primary/10 shrink-0">
                        {(userName || 'Y').substring(0, 2).toUpperCase()}
                      </div>
                      <div className="space-y-1">
                         <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                           {userName || 'යාළුවා'} <span className="text-primary italic text-sm md:text-base">(Profile)</span>
                         </h2>
                         <p className="text-xs md:text-slate-500 dark:text-slate-400 font-bold">{userGrade} සිසුවෙක්</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="liquid-glass-white dark:bg-white/10 p-6 rounded-3xl border border-white/80 shadow-sm flex items-center justify-between">
                         <div>
                            <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">නම සහ ශ්‍රේණිය (Student)</div>
                            <div className="font-bold text-slate-700 dark:text-white">{userName} ({userGrade})</div>
                         </div>
                         <button onClick={() => setStep('register')} className="p-2 bg-amber-100 text-amber-600 rounded-xl hover:bg-amber-200 transition-colors"><Palette size={16} /></button>
                       </div>

                       <div className="liquid-glass-white dark:bg-white/10 p-6 rounded-3xl border border-white/80 shadow-sm flex items-center justify-between">
                         <div>
                            <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">භාෂාව (Language)</div>
                            <div className="font-bold text-slate-700 dark:text-white">{userLang}</div>
                         </div>
                         <button onClick={() => setStep('language')} className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"><Settings size={16} /></button>
                       </div>

                       {/* Official Watermark Under My Details (Opacity 30%) */}
                       <div className="col-span-1 md:col-span-2">
                         <Watermark text="EDU.AI.DY.AI.EDUEDUCATION WITH AI" variant="badge" />
                       </div>

                       <div className="liquid-glass-white dark:bg-white/10 p-6 rounded-3xl border border-white/80 shadow-sm col-span-2">
                          <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Color Models (වර්ණ තෝරාගැනීම)</div>
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                              {colorModels.map(model => (
                                <button 
                                  key={model.id}
                                  onClick={() => { setColorTheme(model.id); confetti(); }}
                                  className={`p-2 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${colorTheme === model.id ? 'border-primary bg-primary/5 scale-105' : 'border-transparent bg-slate-50 dark:bg-white/5 opacity-60'}`}
                                >
                                   <div className="flex gap-1">
                                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: model.primary }} />
                                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: model.secondary }} />
                                   </div>
                                   <span className="text-[8px] font-black uppercase text-slate-500 dark:text-slate-400 line-clamp-1">{model.name}</span>
                                </button>
                              ))}
                           </div>
                        </div>

                        {!isAppInstalled && (
                          <div className="liquid-glass-white dark:bg-white/10 p-6 rounded-3xl border border-white/80 shadow-sm col-span-2">
                            <div className="space-y-3 mb-4">
                              <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 text-center">ඇප් එක Install කරගන්න (Get App)</div>
                              <div className="grid grid-cols-3 gap-2">
                                {[
                                  { id: 'ios' as const, name: 'iOS', icon: Apple, color: 'hover:border-slate-800 hover:bg-slate-50' },
                                  { id: 'android' as const, name: 'Android', icon: Smartphone, color: 'hover:border-green-500 hover:bg-green-50' },
                                  { id: 'windows' as const, name: 'Windows', icon: Monitor, color: 'hover:border-blue-500 hover:bg-blue-50' }
                                ].map(os => (
                                  <button
                                    key={os.id}
                                    onClick={() => handleInstallApp(os.id)}
                                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-slate-500 ${os.color}`}
                                  >
                                    <os.icon size={24} />
                                    <span className="font-bold text-[10px]">{os.name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Installation guide removed - now direct */}
                          </div>
                        )}

                        <div className="liquid-glass-white dark:bg-white/10 p-6 rounded-3xl border border-white/80 shadow-sm col-span-2">
                          <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">අමතර සැකසුම් (Extra Settings)</div>
                          <div className="space-y-4">
                             <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-700 dark:text-white flex items-center gap-2"><Sparkles size={16} className="text-amber-500" /> EDU.AI Mood</span>
                                <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
                                   {(['happy', 'cool', 'smart'] as const).map(mood => (
                                     <button 
                                       key={mood}
                                       onClick={() => setCompanionMood(mood)}
                                       className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${companionMood === mood ? 'bg-white dark:bg-slate-800 text-primary shadow-sm scale-110' : 'text-slate-400'}`}
                                     >
                                       {mood}
                                     </button>
                                   ))}
                                </div>
                             </div>
                             <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-700 dark:text-white flex items-center gap-2"><Music size={16} className="text-secondary" /> Study Music</span>
                                <button 
                                  onClick={() => setIsMusicOn(!isMusicOn)}
                                  className={`w-12 h-6 rounded-full transition-all relative ${isMusicOn ? 'bg-primary' : 'bg-slate-300'}`}
                                >
                                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isMusicOn ? 'left-7' : 'left-1'}`} />
                                </button>
                             </div>
                             <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-700 dark:text-white flex items-center gap-2"><Eye size={16} className="text-amber-600" /> Eye Comfort (ඇසට පහසුව)</span>
                                <button 
                                  onClick={() => setEyeComfort(!eyeComfort)}
                                  className={`w-12 h-6 rounded-full transition-all relative ${eyeComfort ? 'bg-amber-500' : 'bg-slate-300'}`}
                                >
                                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${eyeComfort ? 'left-7' : 'left-1'}`} />
                                </button>
                             </div>
                             <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-700 dark:text-white flex items-center gap-2"><Brain size={16} className="text-primary" /> Study Mode (Focus)</span>
                                <button 
                                  onClick={() => setIsStudyMode(!isStudyMode)}
                                  className={`w-12 h-6 rounded-full transition-all relative ${isStudyMode ? 'bg-primary' : 'bg-slate-300'}`}
                                >
                                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isStudyMode ? 'left-7' : 'left-1'}`} />
                                </button>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* System & Software Update Section */}
                    <SystemSoftwareCenter />

                    <button 
                      onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                      }} 
                      className="w-full py-4 border-2 border-primary/20 bg-primary/5 rounded-2xl font-black text-primary hover:bg-primary/10 transition-all shadow-sm"
                    >
                      සියලු සැකසුම් අලුත් කරන්න (Reset All)
                    </button>
                </div>
             </motion.div>
          )}

          {appView === 'notes' && (
             <motion.div 
                key="notes"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 p-6 md:p-10 pb-28 md:pb-32 overflow-y-auto z-10"
             >
                <QuickNotes />
             </motion.div>
          )}

          {appView === 'pastpapers' && (
            <motion.div 
              key="pastpapers"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 p-6 md:p-10 pb-28 md:pb-32 overflow-y-auto z-10"
            >
              <div className="max-w-5xl mx-auto space-y-6 md:space-y-10">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">ප්‍රශ්න <span className="text-primary italic">පත්‍ර</span></h1>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium tracking-tight">විභාග පුස්තකාලය සහ AI විශ්ලේෂක එකතුව (Exam Library & AI Analyst)</p>
                  </div>
                  
                  {/* Selector Tab Switcher */}
                  <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl w-full md:w-auto shrink-0 border border-slate-200 dark:border-white/5">
                    <button
                      onClick={() => setPastPapersTab('library')}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 ${
                        pastPapersTab === 'library'
                          ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      <Library size={15} /> පුස්තකාලය (Library)
                    </button>
                    <button
                      onClick={() => setPastPapersTab('predictor')}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 ${
                        pastPapersTab === 'predictor'
                          ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      <Sparkles size={15} className="text-amber-500 animate-pulse" /> AI අනාවැකිකරු (Predictor)
                    </button>
                  </div>
                </header>

                {pastPapersTab === 'library' ? (
                  <div className="liquid-glass p-4 md:p-6 rounded-[32px] border border-white/40 shadow-xl space-y-6">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-400 uppercase ml-2 flex items-center gap-2">
                        <GraduationCap size={14} /> ශ්‍රේණිය (Select Grade)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['6', '7', '8', '9', '10', '11', '12', '13'].map(g => (
                          <button 
                            key={g} 
                            onClick={() => setUserGrade(`Grade ${g}`)}
                            className={`px-4 py-2 rounded-xl font-bold transition-all border-2 ${
                              userGrade === `Grade ${g}`
                                ? 'bg-primary text-white border-primary shadow-md scale-105' 
                                : 'bg-white/50 border-white/20 text-slate-600 dark:text-white dark:bg-white/5 hover:border-primary/30'
                            }`}
                          >
                            Grade {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                      {ALL_SUBJECTS.filter(s => {
                        return ['sinhala', 'maths', 'science', 'english', 'history', 'ict', 'buddhism'].includes(s.id);
                      }).map((sub, i) => (
                        <motion.div 
                          key={sub.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="liquid-glass-white p-5 rounded-2xl border border-white/60 shadow-sm flex flex-col gap-4 group hover:border-primary transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-xl ${sub.color}`}>
                              <sub.icon size={20} />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-800 dark:text-white">{sub.name}</span>
                              <span className="text-[10px] text-slate-400 font-bold uppercase">{userGrade}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {[2023, 2022, 2021].map(year => (
                              <button 
                                key={year}
                                onClick={() => {
                                  const url = `https://www.google.com/search?q=${sub.name}+${userGrade}+${year}+past+paper+sri+lanka`;
                                  window.open(url, '_blank');
                                }}
                                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-primary/10 hover:text-primary transition-all group/item"
                              >
                                <div className="flex items-center gap-2 font-bold text-xs">
                                  <FileText size={14} className="text-slate-400 group-hover/item:text-primary" />
                                  {year} Paper
                                </div>
                                <Download size={14} className="text-slate-300 group-hover/item:text-primary" />
                              </button>
                            ))}
                          </div>

                          <button 
                            onClick={() => window.open(`https://www.ethaksalawa.moe.gov.lk/`, '_blank')}
                            className="w-full mt-2 py-2.5 rounded-xl border-2 border-primary/20 text-primary font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
                          >
                            සියල්ල බලන්න (View All) <ArrowRight size={12} />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="liquid-glass p-6 md:p-8 rounded-[32px] border border-white/40 shadow-xl space-y-6">
                      <div className="flex items-center gap-4 border-b border-slate-150 dark:border-white/10 pb-4">
                        <div className="w-14 h-14 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center border border-amber-500/20">
                          <Brain size={28} />
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-black text-slate-850 dark:text-white">AI විභාග අනාවැකිකරු (AI Exam Analyst)</h2>
                          <p className="text-xs md:text-sm text-slate-500 font-bold">පසුගිය ප්‍රශ්න පත්‍රවල දත්ත ඇතුළත් කර මීළඟ විභාගයට ඉහළම ඉල්ලුමක් ඇති පාඩම් සහ අනුමාන ප්‍රශ්න ලබාගන්න.</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase ml-2 flex items-center gap-2">
                          <FileText size={14} /> විභාග දත්ත හෝ මාතෘකා ලැයිස්තුව ඇතුළත් කරන්න (Input Past Exam Data)
                        </label>
                        <textarea
                          value={predictorData}
                          onChange={(e) => setPredictorData(e.target.value)}
                          placeholder="උදාහරණ: 2023 - සෛලීය ශ්වසනය (ලකුණු 15), 2022 - පටක (ලකුණු 20), 2021 - ප්‍රභාසංස්ලේෂණය (ලකුණු 10)..."
                          className="w-full h-44 p-5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl text-sm font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all scrollbar-hide"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={handlePredictExams}
                          disabled={isPredicting || !predictorData.trim()}
                          className="flex-1 py-4 bg-primary hover:bg-blue-600 text-white rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-lg shadow-primary/25 transition-all disabled:opacity-50"
                        >
                          {isPredicting ? (
                            <>
                              <Loader2 className="animate-spin" /> දත්ත විශ්ලේෂණය කරමින්... (Analyzing Data...)
                            </>
                          ) : (
                            <>
                              විශ්ලේෂණය කර අනාවැකි සකසන්න 🚀 (Analyze & Predict)
                            </>
                          )}
                        </button>
                        {predictionResult && (
                          <button
                            onClick={handleExportPredictorPDF}
                            className="py-4 px-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20"
                          >
                            <Download size={16} /> PDF බාගන්න (Download PDF)
                          </button>
                        )}
                      </div>
                    </div>

                    {predictionResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="liquid-glass p-6 md:p-8 rounded-[32px] border border-white/40 shadow-xl space-y-6"
                      >
                        <div className="flex items-center justify-between border-b border-slate-150 dark:border-white/10 pb-4">
                          <h3 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
                            <Sparkles className="text-amber-500" size={20} /> අනාවැකි ප්‍රතිඵලය (Exam Prediction Report)
                          </h3>
                          <button
                            onClick={handleExportPredictorPDF}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm"
                          >
                            <Download size={14} /> PDF බාගන්න
                          </button>
                        </div>

                        <div className="markdown-content max-h-[500px] overflow-y-auto pr-2 scrollbar-hide text-slate-850 dark:text-slate-100">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {predictionResult}
                          </ReactMarkdown>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                <div className="liquid-glass-white p-6 rounded-3xl border border-primary/20 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <Sparkles size={32} />
                  </div>
                  <div className="text-center md:text-left space-y-1">
                    <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-tight">විශේෂ උපදෙස් (Exam Tips)</h3>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">ඔබේ විභාගය සාර්ථක කර ගැනීමට පෙර වසරවල ප්‍රශ්න පත්‍ර අවම වශයෙන් දිනකට එක බැගින් සාදා බලන්න.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {appView === 'robot' && (
            <motion.div 
              key="robot"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 p-4 md:p-10 pb-28 md:pb-32 overflow-y-auto z-10"
            >
              <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
                {/* Header with Switcher Tab */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-4">
                  <div className="space-y-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-3">
                      <Sparkles className="text-primary animate-pulse" size={32} /> AI <span className="text-primary italic">උපදේශක</span> සහකරු
                    </h1>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-bold">
                      ඕනෑම අධ්‍යයන ප්‍රශ්නයක් අසන්න, වැදගත් කරුණු සාකච්ඡා කරන්න, සහ සාකච්ඡා සෙෂන් එකකට එකතු වන්න!
                    </p>
                  </div>

                  {/* Switcher Tabs */}
                  <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl w-full md:w-auto border border-slate-200 dark:border-white/5">
                    <button
                      onClick={() => setRobotTab('bot')}
                      className={`flex-1 md:flex-none px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                        robotTab === 'bot'
                          ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      <Sparkles size={14} className="text-indigo-500" /> AI Academic Tutor
                    </button>
                    <button
                      onClick={() => setRobotTab('mod')}
                      className={`flex-1 md:flex-none px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                        robotTab === 'mod'
                          ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      <Users size={14} className="text-amber-500" /> Study Group (Edu-Mod)
                    </button>
                  </div>
                </header>

                {robotTab === 'bot' ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Left Column: AI Tutor Response Display & Action shortcuts */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center p-6 md:p-8 liquid-glass rounded-[32px] border border-white/40 shadow-xl space-y-6">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full">
                        AI Tutor Active Terminal
                      </div>
                      
                      {/* Premium AI Status Light Circle */}
                      <div className="relative w-28 h-28 mx-auto flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500/10 via-primary/15 to-blue-400/10 dark:from-indigo-600/20 dark:to-indigo-400/20 border border-primary/20 shadow-inner">
                        <motion.div
                          animate={isRobotLoading ? { scale: [1, 1.15, 1] } : { scale: [1, 1.05, 1] }}
                          transition={{ repeat: Infinity, duration: isRobotLoading ? 1.5 : 3, ease: "easeInOut" }}
                          className="p-5 bg-gradient-to-tr from-primary to-indigo-500 text-white rounded-full shadow-lg"
                        >
                          <Sparkles size={32} className={isRobotLoading ? "animate-spin" : "animate-pulse"} />
                        </motion.div>
                      </div>

                      {/* Speech Bubble / Current Speech Display */}
                      <div className="w-full relative bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 p-5 rounded-2xl shadow-inner text-center animate-fade-in flex flex-col items-center justify-center gap-3">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                          TUTOR RESPONSE
                        </div>
                        <p className="text-sm font-bold text-slate-800 dark:text-white leading-relaxed mt-2 select-text">
                          {robotSpeech}
                        </p>
                        
                        {/* Read Aloud Button & Sound Indicator */}
                        <div className="flex gap-2 items-center justify-center mt-1">
                          <button
                            onClick={() => {
                              speakAloud(robotSpeech);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
                            title="හඬ නඟා අසන්න (Hear Out Loud)"
                          >
                            <Volume2 size={12} /> සජීවී හඬින් අසන්න (Speak Aloud)
                          </button>
                        </div>

                        {isRobotLoading && (
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        )}
                      </div>

                      {/* System Status Tracker */}
                      <div className="w-full space-y-2 bg-white/40 dark:bg-white/5 p-4 rounded-2xl border border-slate-150 dark:border-white/5 text-center">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          SYSTEM PERFORMANCE STATUS
                        </div>
                        <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          <span>Gemini 3.8 Flash AI Core Online (v3.2.0)</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Interactive Commands & Chat Controls */}
                    <div className="md:col-span-7 flex flex-col gap-6">
                      {/* Chat Station */}
                      <div className="liquid-glass p-6 rounded-[32px] border border-white/40 shadow-xl space-y-4">
                        <h2 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                          <MessageCircle size={20} className="text-primary" /> උපදේශක සමඟ කතාබස් (Active Chat Station)
                        </h2>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={robotInput}
                            onChange={(e) => setRobotInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleRobotChat(robotInput);
                                setRobotInput('');
                              }
                            }}
                            placeholder="අධ්‍යයන ගැටළුව මෙහි සටහන් කරන්න... (Ask any school question)"
                            className="flex-1 px-4 py-3 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl text-sm font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/50"
                          />
                          <button
                            onClick={() => {
                              handleRobotChat(robotInput);
                              setRobotInput('');
                            }}
                            disabled={isRobotLoading || !robotInput.trim()}
                            className="px-5 bg-primary hover:bg-primary-hover text-white rounded-2xl font-black text-sm flex items-center gap-1.5 transition-all shadow-md shadow-primary/20 disabled:opacity-50"
                          >
                            යවන්න <Send size={14} />
                          </button>
                        </div>

                        {/* Quick Talk Options */}
                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            පහසු විධාන (Quick Academic Shortcuts)
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { text: "විහිළුවක් කියන්න 😜", prompt: "Tell me a short funny school joke in Sinhala with English terms." },
                              { text: "පාඩම් කරන්න උනන්දුවක් 💪", prompt: "Give me an awesome motivational study tip for Sri Lankan exams." },
                              { text: "ගණිත කෙටි ක්‍රමයක් 📐", prompt: "Give me a super handy short trick or mental shortcut for mathematics in Sinhala." },
                              { text: "මගේ ලකුණු කියන්න 🏆", prompt: `Greet me with my score: I currently have ${points} points and ${streak} days study streak! Give me a high five!` }
                            ].map((cmd, i) => (
                              <button
                                key={i}
                                onClick={() => handleRobotChat(cmd.prompt)}
                                disabled={isRobotLoading}
                                className="text-left p-3 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white/40 border border-slate-200/50 dark:border-white/5 dark:bg-white/5 rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all truncate"
                              >
                                {cmd.text}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Study Ambient Beats Station */}
                      <div className="liquid-glass p-6 rounded-[32px] border border-white/40 shadow-xl space-y-4">
                        <h2 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
                          <Radio size={20} className="text-amber-500 animate-pulse" /> ධ්‍යාන සංගීතය (Study Ambient Beats)
                        </h2>
                        
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                          පාඩම් කරන අතරතුර අවධානය රඳවා ගැනීමට සහ මනස සැහැල්ලු කර ගැනීමට ලෝෆයි (Lofi) සංගීතය සක්‍රිය කරන්න.
                        </p>

                        <button
                          onClick={() => {
                            setIsMusicOn(!isMusicOn);
                            setRobotSpeech(!isMusicOn 
                              ? 'මාරු! ලෝෆයි සින්දු දාලා අපි එකතු වෙලා පාඩම් කරමු! 🎧✨'
                              : 'සංගීතය නතර කළා! අපි දැන් නිහඬව පාඩම් කරමු. 🤫📖'
                            );
                          }}
                          className={`w-full py-3.5 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
                            isMusicOn 
                              ? 'bg-primary text-white hover:bg-primary-hover animate-pulse' 
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700'
                          }`}
                        >
                          {isMusicOn ? 'AMBIENT MUSIC IS PLAYING ⏸️' : 'PLAY STUDY LOFI BEATS ▶️'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Edu-Mod Study Group Layout */
                  <div className="space-y-6">
                    {!eduModStarted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="liquid-glass p-8 rounded-[32px] border border-white/40 shadow-xl space-y-6"
                      >
                        <div className="flex items-center gap-4 border-b border-slate-150 dark:border-white/10 pb-4">
                          <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center border border-primary/20">
                            <Users size={28} />
                          </div>
                          <div>
                            <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">Edu-Mod සජීවී සාකච්ඡා මණ්ඩපය</h2>
                            <p className="text-xs md:text-sm text-slate-500 font-bold">ඔබේ පන්තියේ මිතුරන් සමඟ එකතු වී AI උපදේශක Edu-Mod යටතේ සජීවීව සාකච්ඡා කර පාඩම් කරන්න.</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase ml-2">සාකච්ඡා කරන මාතෘකාව (Choose Study Topic)</label>
                            <input
                              type="text"
                              value={eduModTopic}
                              onChange={(e) => setEduModTopic(e.target.value)}
                              placeholder="උදා: නිව්ටන්ගේ නියම, සෛලීය ශ්වසනය, රසායනික බන්ධන..."
                              className="w-full p-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl text-sm font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/40"
                            />
                          </div>

                          <div className="space-y-2">
                            <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase ml-2 block">ජනප්‍රිය මාතෘකා (Suggested Topics)</span>
                            <div className="flex flex-wrap gap-2">
                              {['නිව්ටන්ගේ නියම (Newton Laws)', 'සෛලීය ව්‍යුහය (Cell Structure)', 'භාග (Fractions)', 'පටක වර්ග (Tissues)', 'ආලෝකය පරාවර්තනය (Light Reflection)'].map(t => (
                                <button
                                  key={t}
                                  onClick={() => setEduModTopic(t)}
                                  className="px-3.5 py-2 bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:border-primary/40 hover:bg-primary/5 transition-all"
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={handleStartStudyGroup}
                          disabled={!eduModTopic.trim()}
                          className="w-full py-4 bg-primary hover:bg-blue-600 text-white font-black text-base rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                        >
                          සාකච්ඡා සෙෂන් එක අරඹන්න 👥🚀 (Start Live Study Group)
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch"
                      >
                        {/* Session Left Column: Details & Participants */}
                        <div className="md:col-span-4 flex flex-col p-6 liquid-glass rounded-[32px] border border-white/40 shadow-xl space-y-6">
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> LIVE Study Session
                            </span>
                            <h3 className="text-lg font-black text-slate-800 dark:text-white line-clamp-2">{eduModTopic}</h3>
                          </div>

                          {/* Member List */}
                          <div className="space-y-3 flex-1">
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block border-b border-slate-100 dark:border-white/10 pb-1.5">
                              සහභාගිවන්නන් (Active Group Members)
                            </span>
                            <div className="space-y-2.5">
                              {[
                                { name: 'Edu-Mod (Moderator)', role: 'AI Moderator', active: true, color: 'bg-indigo-500 text-white' },
                                { name: 'Saman (පන්තියේ මිතුරා)', role: 'Online', active: true, color: 'bg-emerald-500 text-white' },
                                { name: 'Priya (පන්තියේ මිතුරිය)', role: 'Online', active: true, color: 'bg-pink-500 text-white' },
                                { name: 'Thisal (පන්තියේ මිතුරා)', role: 'Online', active: true, color: 'bg-amber-500 text-white' },
                                { name: `${userName || 'යාළුවා'} (ඔබ)`, role: 'Active', active: true, color: 'bg-primary text-white font-bold border border-white' },
                              ].map((m, i) => (
                                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white/40 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                  <div className="flex items-center gap-2.5">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${m.color}`}>
                                      {m.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-xs font-black text-slate-800 dark:text-white leading-tight">{m.name}</span>
                                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{m.role}</span>
                                    </div>
                                  </div>
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1" />
                                </div>
                              ))}
                            </div>
                          </div>

                          <button
                            onClick={() => setEduModStarted(false)}
                            className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-rose-500/10"
                          >
                            සාකච්ඡාව නවත්වන්න (End Session) 🚪
                          </button>
                        </div>

                        {/* Session Right Column: Group Live Chat */}
                        <div className="md:col-span-8 flex flex-col p-5 md:p-6 liquid-glass rounded-[32px] border border-white/40 shadow-xl h-[550px] min-h-[400px]">
                          {/* Chat Messages */}
                          <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4 scrollbar-hide">
                            {eduModMessages.map((msg, idx) => {
                              const isMe = msg.sender === (userName || 'යාළුවා');
                              const isMod = msg.sender === 'Edu-Mod';
                              
                              let nameBadgeColor = 'text-primary';
                              let bubbleBg = 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100';
                              
                              if (isMe) {
                                nameBadgeColor = 'text-primary';
                                bubbleBg = 'bg-primary text-white self-end ml-auto';
                              } else if (isMod) {
                                nameBadgeColor = 'text-indigo-500';
                                bubbleBg = 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-950 dark:text-indigo-100';
                              } else if (msg.sender === 'Saman') {
                                nameBadgeColor = 'text-emerald-500';
                                bubbleBg = 'bg-emerald-500/10 border border-emerald-500/20 text-slate-850 dark:text-emerald-100';
                              } else if (msg.sender === 'Priya') {
                                nameBadgeColor = 'text-pink-500';
                                bubbleBg = 'bg-pink-500/10 border border-pink-500/20 text-slate-850 dark:text-pink-100';
                              } else if (msg.sender === 'Thisal') {
                                nameBadgeColor = 'text-amber-500';
                                bubbleBg = 'bg-amber-500/10 border border-amber-500/20 text-slate-850 dark:text-amber-100';
                              }

                              const isPickerOpen = activeReactionPickerMessageId === msg.id;

                              return (
                                <div key={msg.id || idx} className={`flex flex-col max-w-[88%] relative group ${isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                                  {/* Sender Header & Reaction Trigger */}
                                  <div className={`flex items-center gap-1.5 mb-1 px-1 w-full ${isMe ? 'justify-end' : 'justify-between'}`}>
                                    <div className="flex items-center gap-1.5">
                                      <span className={`text-[10px] font-black uppercase tracking-wider ${nameBadgeColor}`}>
                                        {msg.sender}
                                      </span>
                                      {isMod && (
                                        <span className="text-[9px] bg-indigo-500 text-white px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                                          <CheckCircle2 size={8} /> Mod
                                        </span>
                                      )}
                                    </div>

                                    {/* Quick Reaction Trigger Button on header */}
                                    <button
                                      onClick={() => setActiveReactionPickerMessageId(isPickerOpen ? null : msg.id)}
                                      className="opacity-70 group-hover:opacity-100 hover:opacity-100 px-1.5 py-0.5 rounded-lg text-slate-400 hover:text-primary hover:bg-black/5 dark:hover:bg-white/10 transition-all flex items-center gap-1"
                                      title="ප්‍රතිචාරයක් දක්වන්න (React to message)"
                                    >
                                      <SmilePlus size={13} />
                                      <span className="text-[8px] font-bold hidden sm:inline uppercase">React</span>
                                    </button>
                                  </div>

                                  {/* Message Bubble Container with Relative Anchor */}
                                  <div className="relative">
                                    <div className={`p-4 rounded-2xl text-xs md:text-sm font-bold leading-relaxed shadow-sm ${bubbleBg}`}>
                                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {msg.text}
                                      </ReactMarkdown>
                                    </div>

                                    {/* Floating Emoji Reaction Selector Popup */}
                                    <AnimatePresence>
                                      {isPickerOpen && (
                                        <>
                                          {/* Backdrop for click-outside */}
                                          <div 
                                            className="fixed inset-0 z-40" 
                                            onClick={() => setActiveReactionPickerMessageId(null)} 
                                          />

                                          <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 5 }}
                                            className={`absolute z-50 bottom-full mb-2 ${isMe ? 'right-0' : 'left-0'} liquid-glass-white dark:bg-slate-900/95 p-3 rounded-2xl border border-white/80 dark:border-white/20 shadow-2xl backdrop-blur-2xl flex flex-col gap-2 min-w-[270px] max-w-[320px]`}
                                          >
                                            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-white/10">
                                              <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                <Sparkles size={11} className="text-amber-500" /> ප්‍රතිචාරයක් දක්වන්න (React)
                                              </span>
                                              <button 
                                                onClick={() => setActiveReactionPickerMessageId(null)} 
                                                className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs font-bold"
                                              >
                                                ✕
                                              </button>
                                            </div>

                                            {/* Categorized reaction groups */}
                                            <div className="space-y-2">
                                              {/* Category: Agreement */}
                                              <div>
                                                <span className="text-[8px] font-black text-blue-500 uppercase tracking-wider block mb-1">
                                                  එකඟතාවය (Agreement)
                                                </span>
                                                <div className="grid grid-cols-2 gap-1.5">
                                                  {EDU_MOD_REACTIONS.filter(r => r.category === 'agreement').map(r => {
                                                    const users = (msg.reactions || {})[r.emoji] || [];
                                                    const isSelected = users.includes(userName || 'ඔබ');
                                                    return (
                                                      <button
                                                        key={r.emoji}
                                                        onClick={() => {
                                                          handleToggleEduModReaction(msg.id, r.emoji);
                                                          setActiveReactionPickerMessageId(null);
                                                        }}
                                                        className={`flex items-center gap-2 p-1.5 rounded-xl text-left transition-all ${
                                                          isSelected 
                                                            ? 'bg-primary/15 border border-primary/40 text-primary font-bold' 
                                                            : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200'
                                                        }`}
                                                      >
                                                        <span className="text-lg">{r.emoji}</span>
                                                        <span className="text-[10px] font-bold leading-tight line-clamp-1">{r.label}</span>
                                                      </button>
                                                    );
                                                  })}
                                                </div>
                                              </div>

                                              {/* Category: Confusion */}
                                              <div>
                                                <span className="text-[8px] font-black text-amber-500 uppercase tracking-wider block mb-1">
                                                  නොතේරීම / සැකය (Confusion)
                                                </span>
                                                <div className="grid grid-cols-2 gap-1.5">
                                                  {EDU_MOD_REACTIONS.filter(r => r.category === 'confusion').map(r => {
                                                    const users = (msg.reactions || {})[r.emoji] || [];
                                                    const isSelected = users.includes(userName || 'ඔබ');
                                                    return (
                                                      <button
                                                        key={r.emoji}
                                                        onClick={() => {
                                                          handleToggleEduModReaction(msg.id, r.emoji);
                                                          setActiveReactionPickerMessageId(null);
                                                        }}
                                                        className={`flex items-center gap-2 p-1.5 rounded-xl text-left transition-all ${
                                                          isSelected 
                                                            ? 'bg-primary/15 border border-primary/40 text-primary font-bold' 
                                                            : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200'
                                                        }`}
                                                      >
                                                        <span className="text-lg">{r.emoji}</span>
                                                        <span className="text-[10px] font-bold leading-tight line-clamp-1">{r.label}</span>
                                                      </button>
                                                    );
                                                  })}
                                                </div>
                                              </div>

                                              {/* Category: Encouragement */}
                                              <div>
                                                <span className="text-[8px] font-black text-emerald-500 uppercase tracking-wider block mb-1">
                                                  දිරිගැන්වීම (Encouragement)
                                                </span>
                                                <div className="grid grid-cols-2 gap-1.5">
                                                  {EDU_MOD_REACTIONS.filter(r => r.category === 'encouragement').map(r => {
                                                    const users = (msg.reactions || {})[r.emoji] || [];
                                                    const isSelected = users.includes(userName || 'ඔබ');
                                                    return (
                                                      <button
                                                        key={r.emoji}
                                                        onClick={() => {
                                                          handleToggleEduModReaction(msg.id, r.emoji);
                                                          setActiveReactionPickerMessageId(null);
                                                        }}
                                                        className={`flex items-center gap-2 p-1.5 rounded-xl text-left transition-all ${
                                                          isSelected 
                                                            ? 'bg-primary/15 border border-primary/40 text-primary font-bold' 
                                                            : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200'
                                                        }`}
                                                      >
                                                        <span className="text-lg">{r.emoji}</span>
                                                        <span className="text-[10px] font-bold leading-tight line-clamp-1">{r.label}</span>
                                                      </button>
                                                    );
                                                  })}
                                                </div>
                                              </div>
                                            </div>
                                          </motion.div>
                                        </>
                                      )}
                                    </AnimatePresence>
                                  </div>

                                  {/* Reactions Tray & Timestamp */}
                                  <div className={`flex flex-wrap items-center gap-1.5 mt-1.5 px-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                                    {msg.reactions && Object.entries(msg.reactions).map(([emoji, users]) => {
                                      if (!users || users.length === 0) return null;
                                      const hasReacted = users.includes(userName || 'ඔබ');
                                      return (
                                        <motion.button
                                          key={emoji}
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.92 }}
                                          onClick={() => handleToggleEduModReaction(msg.id, emoji)}
                                          title={`ප්‍රතිචාර දැක්වූවන්: ${users.join(', ')}`}
                                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black transition-all border shadow-xs ${
                                            hasReacted
                                              ? 'bg-primary/20 border-primary text-primary dark:text-indigo-300 ring-2 ring-primary/20'
                                              : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-primary/40'
                                          }`}
                                        >
                                          <span className="text-sm">{emoji}</span>
                                          <span className="text-[10px]">{users.length}</span>
                                        </motion.button>
                                      );
                                    })}

                                    {/* Inline Add Reaction button */}
                                    <button
                                      onClick={() => setActiveReactionPickerMessageId(isPickerOpen ? null : msg.id)}
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-400 hover:text-primary hover:bg-white/60 dark:hover:bg-white/10 transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                                      title="ප්‍රතිචාරයක් එක් කරන්න (Add reaction)"
                                    >
                                      <SmilePlus size={12} />
                                      <span>+</span>
                                    </button>

                                    <span className="text-[9px] text-slate-400 font-bold px-1 ml-1">
                                      {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                            <div ref={eduModEndRef} />
                            
                            {isEduModLoading && (
                              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold pl-2">
                                <Loader2 size={12} className="animate-spin text-primary" />
                                <span>Edu-Mod හෝ යහළුවෙකු පිළිතුරක් සකසමින්...</span>
                              </div>
                            )}
                          </div>

                          {/* Chat Input */}
                          <div className="flex gap-2 shrink-0 border-t border-slate-100 dark:border-white/5 pt-4">
                            <input
                              type="text"
                              value={eduModInput}
                              onChange={(e) => setEduModInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleEduModSend();
                              }}
                              placeholder="මිතුරන්ට හෝ Moderator ට පිළිතුරක් ලියන්න..."
                              className="flex-1 px-4 py-3 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl text-sm font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                            />
                            <button
                              onClick={() => handleEduModSend()}
                              disabled={isEduModLoading || !eduModInput.trim()}
                              className="px-5 bg-primary hover:bg-blue-600 text-white rounded-2xl font-black text-sm flex items-center gap-1.5 transition-all shadow-md disabled:opacity-50"
                            >
                              යවන්න <Send size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>

        <Navigation appView={appView} navigateTo={navigateTo} onBack={handleBack} isStudyMode={isStudyMode} />
      </motion.div>
    )}
  </AnimatePresence>
</div>
</ErrorBoundary>
);
}
