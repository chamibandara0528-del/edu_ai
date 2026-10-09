import React from 'react';

interface WatermarkProps {
  text?: string;
  variant?: 'background' | 'badge' | 'banner';
  className?: string;
}

export const WATERMARK_TEXT = "EDU.AI.DY.AI.EDUEDUCATION WITH AI";

export const Watermark: React.FC<WatermarkProps> = ({
  text = WATERMARK_TEXT,
  variant = 'background',
  className = ''
}) => {
  if (variant === 'badge') {
    return (
      <div 
        className={`w-full py-2.5 px-4 rounded-2xl border border-primary/30 bg-primary/5 flex items-center justify-between select-none pointer-events-none shadow-sm ${className}`}
        style={{ opacity: 0.3 }}
      >
        <span className="font-mono text-[10px] md:text-xs font-black tracking-widest text-primary uppercase">
          {text}
        </span>
        <span className="text-[9px] font-black text-slate-500 tracking-wider uppercase">
          VERIFIED EDU.AI
        </span>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div 
        className={`w-full overflow-hidden select-none pointer-events-none py-2 flex items-center justify-center ${className}`}
        style={{ opacity: 0.3 }}
      >
        <div className="font-mono text-[9px] md:text-[11px] font-black tracking-[0.25em] text-slate-600 dark:text-slate-300 uppercase whitespace-nowrap">
          {text} • {text}
        </div>
      </div>
    );
  }

  // Clean, non-intrusive bottom watermark (Only at the bottom of the page, NOT covering the screen)
  return (
    <footer 
      className={`w-full py-3 px-4 flex items-center justify-center select-none pointer-events-none z-10 mt-auto ${className}`}
      style={{ opacity: 0.3 }}
      aria-label="Application Watermark"
    >
      <div className="inline-flex items-center gap-2 md:gap-3 px-4 py-1.5 rounded-full border border-slate-300/40 dark:border-white/10 bg-slate-200/30 dark:bg-white/5 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span className="font-mono text-[9px] md:text-[11px] font-black tracking-[0.25em] text-slate-700 dark:text-slate-300 uppercase text-center">
          {text}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      </div>
    </footer>
  );
};
