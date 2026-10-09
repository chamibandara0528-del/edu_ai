import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Star, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SparkleOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  points?: number;
  type?: 'study' | 'game' | 'break';
}

export const SparkleOverlay = ({
  isVisible,
  onClose,
  title,
  subtitle,
  points,
  type = 'game',
}: SparkleOverlayProps) => {
  useEffect(() => {
    if (isVisible) {
      // Trigger canvas-confetti bursts
      const duration = 1.5 * 1000;
      const end = Date.now() + duration;
      const colors = type === 'study' ? ['#6366F1', '#A855F7', '#EC4899'] : ['#10B981', '#3B82F6', '#F59E0B'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [isVisible, type]);

  // Generate some random positions for sparkles
  const sparkleParticles = React.useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      scale: Math.random() * 1.2 + 0.4,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 2,
    }));
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/60"
        >
          {/* Sparkles Particle Layer */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {sparkleParticles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0, y: 10 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0.5, p.scale, 0.5],
                  y: [-20, -100, -180],
                }}
                transition={{
                  repeat: Infinity,
                  duration: p.duration,
                  delay: p.delay,
                  ease: "easeInOut",
                }}
                className="absolute text-yellow-400 dark:text-yellow-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]"
                style={{ left: p.left, top: p.top }}
              >
                {p.id % 2 === 0 ? <Sparkles size={20} /> : <Star size={16} fill="currentColor" />}
              </motion.div>
            ))}
          </div>

          {/* Central Reward Card */}
          <motion.div
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[40px] p-8 border-4 border-yellow-400/40 shadow-[0_0_50px_rgba(250,204,21,0.25)] text-center relative overflow-hidden"
          >
            {/* Glowing background halo */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />

            {/* Glowing Icon Wrapper */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-[32px] flex items-center justify-center text-white shadow-xl shadow-amber-500/20 relative"
            >
              <div className="absolute inset-0 rounded-[32px] border-4 border-white/30 animate-pulse" />
              {type === 'study' ? (
                <Zap size={44} className="animate-pulse" fill="currentColor" />
              ) : (
                <Trophy size={44} className="animate-bounce" fill="currentColor" />
              )}
            </motion.div>

            {/* Content */}
            <h2 className="text-3xl font-black text-slate-800 dark:text-white leading-tight mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {subtitle}
              </p>
            )}

            {/* Points Reward Box */}
            {points !== undefined && points > 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400/10 dark:bg-yellow-400/5 border-2 border-yellow-400/30 rounded-2xl text-yellow-600 dark:text-yellow-400 font-black text-lg mb-8 shadow-inner"
              >
                <Star size={20} fill="currentColor" />
                <span>+{points} Points ලැබුණා!</span>
              </motion.div>
            )}

            {/* Action Button */}
            <button
              onClick={onClose}
              className="w-full py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-amber-500/30 active:scale-95"
            >
              නියමයි, ස්තූතියි! (Awesome, Thanks!)
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
