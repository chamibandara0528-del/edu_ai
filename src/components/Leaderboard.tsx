import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Flame, 
  Star, 
  Zap, 
  Users, 
  ChevronUp, 
  Sparkles, 
  Award,
  CheckCircle2,
  Gamepad2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface LeaderboardEntry {
  id: string;
  name: string;
  grade: string;
  school: string;
  points: number;
  streak: number;
  avatarColor: string;
  badge: 'diamond' | 'gold' | 'silver' | 'bronze' | 'rising';
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  currentStudentPoints: number;
  currentStudentName: string;
  currentStudentGrade: string;
  streakDays?: number;
  onPlayGame?: () => void;
  className?: string;
}

const BASE_PEER_STUDENTS: LeaderboardEntry[] = [
  {
    id: 'p1',
    name: 'Dilitha Sandeep',
    grade: 'Grade 10',
    school: 'Ananda College, Colombo',
    points: 1850,
    streak: 14,
    avatarColor: 'from-amber-400 to-amber-600',
    badge: 'diamond',
    isCurrentUser: false
  },
  {
    id: 'p2',
    name: 'Tharushi Nethmini',
    grade: 'Grade 11',
    school: 'Visakha Vidyalaya, Colombo',
    points: 1620,
    streak: 11,
    avatarColor: 'from-violet-400 to-purple-600',
    badge: 'gold',
    isCurrentUser: false
  },
  {
    id: 'p3',
    name: 'Thisal Kavinda',
    grade: 'Grade 10',
    school: 'Dharmaraja College, Kandy',
    points: 1480,
    streak: 9,
    avatarColor: 'from-blue-400 to-indigo-600',
    badge: 'silver',
    isCurrentUser: false
  },
  {
    id: 'p4',
    name: 'Senuri Wickramasinghe',
    grade: 'Grade 9',
    school: 'Mahamaya Girls\' College, Kandy',
    points: 1210,
    streak: 7,
    avatarColor: 'from-emerald-400 to-teal-600',
    badge: 'bronze',
    isCurrentUser: false
  },
  {
    id: 'p5',
    name: 'Kaveen Fernando',
    grade: 'Grade 10',
    school: 'St. Joseph\'s College, Colombo',
    points: 980,
    streak: 6,
    avatarColor: 'from-rose-400 to-pink-600',
    badge: 'rising',
    isCurrentUser: false
  },
  {
    id: 'p6',
    name: 'Priya De Silva',
    grade: 'Grade 8',
    school: 'Southlands College, Galle',
    points: 840,
    streak: 5,
    avatarColor: 'from-cyan-400 to-blue-600',
    badge: 'rising',
    isCurrentUser: false
  },
  {
    id: 'p7',
    name: 'Saman Kumara',
    grade: 'Grade 11',
    school: 'Maliyadeva College, Kurunegala',
    points: 710,
    streak: 4,
    avatarColor: 'from-orange-400 to-amber-600',
    badge: 'rising',
    isCurrentUser: false
  },
  {
    id: 'p8',
    name: 'Minoli Perera',
    grade: 'Grade 10',
    school: 'Musaeus College, Colombo',
    points: 590,
    streak: 3,
    avatarColor: 'from-fuchsia-400 to-pink-600',
    badge: 'rising',
    isCurrentUser: false
  }
];

export const Leaderboard: React.FC<LeaderboardProps> = ({
  currentStudentPoints,
  currentStudentName,
  currentStudentGrade,
  streakDays = 1,
  onPlayGame,
  className = ''
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'grade' | 'weekly'>('all');
  const [cheeredIds, setCheeredIds] = useState<Record<string, boolean>>({});

  // Dynamically assemble leaderboard with current student
  const leaderboardData = useMemo(() => {
    const studentEntry: LeaderboardEntry = {
      id: 'current_user',
      name: currentStudentName.trim() || 'ඔබ (You)',
      grade: currentStudentGrade || 'Grade 10',
      school: 'Sri Lanka Learning Hub',
      points: currentStudentPoints,
      streak: streakDays,
      avatarColor: 'from-primary to-indigo-600',
      badge: currentStudentPoints >= 1800 ? 'diamond' : currentStudentPoints >= 1400 ? 'gold' : currentStudentPoints >= 1000 ? 'silver' : currentStudentPoints >= 500 ? 'bronze' : 'rising',
      isCurrentUser: true
    };

    // Filter peers if matching current grade only
    let peers = BASE_PEER_STUDENTS;
    if (filterTab === 'grade') {
      peers = peers.filter(p => p.grade.toLowerCase() === currentStudentGrade.toLowerCase());
    } else if (filterTab === 'weekly') {
      peers = peers.map(p => ({ ...p, points: Math.round(p.points * 0.45) }));
    }

    // Combine peers + current student, sorting descending by points
    const combined = [...peers, studentEntry].sort((a, b) => b.points - a.points);
    return combined;
  }, [currentStudentPoints, currentStudentName, currentStudentGrade, streakDays, filterTab]);

  // Current student rank
  const currentUserIndex = leaderboardData.findIndex(u => u.isCurrentUser);
  const currentUserRank = currentUserIndex !== -1 ? currentUserIndex + 1 : 1;
  const nextUserAbove = currentUserIndex > 0 ? leaderboardData[currentUserIndex - 1] : null;
  const pointsToOvertake = nextUserAbove ? nextUserAbove.points - currentStudentPoints + 10 : 0;

  // Podium top 3
  const top1 = leaderboardData[0];
  const top2 = leaderboardData[1];
  const top3 = leaderboardData[2];
  const remainingList = leaderboardData.slice(3);

  const handleCheer = (id: string) => {
    setCheeredIds(prev => ({ ...prev, [id]: true }));
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className={`space-y-6 md:space-y-8 ${className}`}>
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider mb-1">
            <Trophy size={13} /> Sri Lanka Academic Champions League
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight">
            Game Zone <span className="text-amber-500 italic">Leaderboard</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            ක්‍රීඩා සහ පාඩම් වලින් ලකුණු (XP) උපයා මිතුරන් අතර පෙරමුණ ගන්න! 🏆
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 shrink-0 self-start sm:self-auto">
          {[
            { id: 'all', label: 'සමස්තය (All Time)' },
            { id: 'grade', label: `${currentStudentGrade || 'Grade'}` },
            { id: 'weekly', label: 'මේ සතිය (Weekly)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                filterTab === tab.id
                  ? 'bg-amber-500 text-white shadow-sm scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Current Student Sticky Performance Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="liquid-glass dark:bg-slate-900/80 p-4 sm:p-5 rounded-3xl border-2 border-primary/40 shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                {currentStudentName.trim() ? currentStudentName.charAt(0).toUpperCase() : 'S'}
              </div>
              <div className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-md bg-amber-500 text-white font-black text-[9px] shadow-sm">
                #{currentUserRank}
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-black text-base text-slate-800 dark:text-white">
                  {currentStudentName || 'ඔබ (You)'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                  {currentStudentGrade}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-3">
                <span>⚡ {currentStudentPoints} XP Points</span>
                <span>🔥 {streakDays} Days Streak</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {nextUserAbove ? (
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-bold text-slate-400 block">ඊළඟ ස්ථානය (#{currentUserRank - 1}):</span>
                <span className="text-xs font-black text-amber-600 dark:text-amber-400">
                  තව +{pointsToOvertake} XP අවශ්‍යයි! 🚀
                </span>
              </div>
            ) : (
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block">👑 CHAMPION</span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">ඔබ 1 වන ස්ථානයේ පසුවේ!</span>
              </div>
            )}

            {onPlayGame && (
              <button
                onClick={onPlayGame}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs shadow-md hover:scale-105 transition-transform flex items-center gap-1.5"
              >
                <Gamepad2 size={15} />
                <span>Play & Score</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 items-end pt-4">
        {/* 2nd Place */}
        {top2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`order-2 md:order-1 liquid-glass-white dark:bg-slate-900/60 p-5 rounded-3xl border ${
              top2.isCurrentUser ? 'border-primary ring-2 ring-primary/30' : 'border-slate-200/80 dark:border-white/10'
            } text-center space-y-3 relative`}
          >
            <div className="w-12 h-12 rounded-2xl mx-auto bg-gradient-to-br from-slate-300 to-slate-500 text-white flex items-center justify-center font-black text-lg shadow-md relative">
              <Medal size={24} className="text-white" />
              <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-slate-600 text-white font-black text-[9px]">
                2nd
              </span>
            </div>

            <div>
              <h4 className="font-black text-sm text-slate-800 dark:text-white truncate">
                {top2.name}
              </h4>
              <p className="text-[11px] text-slate-400 font-medium truncate">{top2.school}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-around text-xs">
              <span className="font-black text-primary">{top2.points} XP</span>
              <span className="text-slate-400 text-[11px]">🔥 {top2.streak}d</span>
            </div>
          </motion.div>
        )}

        {/* 1st Place (Crown) */}
        {top1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`order-1 md:order-2 liquid-glass-white dark:bg-slate-900/90 p-6 rounded-3xl border-2 ${
              top1.isCurrentUser ? 'border-primary ring-2 ring-primary/40' : 'border-amber-400 dark:border-amber-500/40'
            } text-center space-y-3.5 relative shadow-xl shadow-amber-500/10 -mt-2 md:-mt-4`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Crown size={28} className="text-amber-500 fill-amber-400 animate-bounce" />
            </div>

            <div className="w-16 h-16 rounded-2xl mx-auto bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center font-black text-2xl shadow-lg relative mt-1">
              {top1.name.charAt(0)}
              <span className="absolute -bottom-2.5 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-black text-[10px] shadow-sm">
                1st 🥇
              </span>
            </div>

            <div>
              <h4 className="font-black text-base text-slate-800 dark:text-white truncate">
                {top1.name}
              </h4>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-bold truncate">{top1.school}</p>
            </div>

            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-around text-xs font-black">
              <span className="text-amber-700 dark:text-amber-300">🏆 {top1.points} XP</span>
              <span className="text-rose-500">🔥 {top1.streak} Days</span>
            </div>
          </motion.div>
        )}

        {/* 3rd Place */}
        {top3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`order-3 liquid-glass-white dark:bg-slate-900/60 p-5 rounded-3xl border ${
              top3.isCurrentUser ? 'border-primary ring-2 ring-primary/30' : 'border-slate-200/80 dark:border-white/10'
            } text-center space-y-3 relative`}
          >
            <div className="w-12 h-12 rounded-2xl mx-auto bg-gradient-to-br from-amber-700 to-amber-900 text-white flex items-center justify-center font-black text-lg shadow-md relative">
              <Medal size={24} className="text-amber-300" />
              <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-amber-800 text-white font-black text-[9px]">
                3rd
              </span>
            </div>

            <div>
              <h4 className="font-black text-sm text-slate-800 dark:text-white truncate">
                {top3.name}
              </h4>
              <p className="text-[11px] text-slate-400 font-medium truncate">{top3.school}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-around text-xs">
              <span className="font-black text-primary">{top3.points} XP</span>
              <span className="text-slate-400 text-[11px]">🔥 {top3.streak}d</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Ranks 4+ List */}
      <div className="liquid-glass-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden divide-y divide-slate-100 dark:divide-white/5">
        <div className="p-4 bg-slate-50/50 dark:bg-white/5 flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-wider">
          <span>Rank & Student</span>
          <div className="flex items-center gap-6 pr-2">
            <span>Points</span>
            <span className="hidden sm:inline">Cheer</span>
          </div>
        </div>

        {remainingList.map((entry, idx) => {
          const rankNum = idx + 4;
          const isCheered = cheeredIds[entry.id];

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-3.5 sm:p-4 flex items-center justify-between transition-colors ${
                entry.isCurrentUser 
                  ? 'bg-primary/10 dark:bg-primary/20 border-l-4 border-primary font-bold' 
                  : 'hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-7 text-center font-black text-xs ${
                  entry.isCurrentUser ? 'text-primary' : 'text-slate-400'
                }`}>
                  #{rankNum}
                </span>

                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${entry.avatarColor} text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm`}>
                  {entry.name.charAt(0)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs sm:text-sm font-bold truncate ${
                      entry.isCurrentUser ? 'text-primary' : 'text-slate-800 dark:text-white'
                    }`}>
                      {entry.name} {entry.isCurrentUser && '(You)'}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-slate-100 dark:bg-white/10 text-slate-500 font-medium">
                      {entry.grade}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 truncate block">
                    {entry.school}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white block">
                    {entry.points} XP
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    🔥 {entry.streak} Days
                  </span>
                </div>

                <button
                  onClick={() => handleCheer(entry.id)}
                  className={`p-2 rounded-xl text-xs transition-all ${
                    isCheered
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 scale-110'
                      : 'hover:bg-amber-500/10 text-slate-400 hover:text-amber-500'
                  }`}
                  title="Cheer classmate"
                >
                  {isCheered ? '👏' : '🙌'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
