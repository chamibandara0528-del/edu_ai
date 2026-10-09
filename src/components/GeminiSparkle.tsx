import React from 'react';

interface GeminiSparkleProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export const GeminiSparkle: React.FC<GeminiSparkleProps> = ({ 
  size = 22, 
  className = '',
  animate = false
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${animate ? 'animate-pulse' : ''} ${className}`}
    >
      <defs>
        <linearGradient id="geminiSparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="40%" stopColor="#9B72CB" />
          <stop offset="85%" stopColor="#D96570" />
          <stop offset="100%" stopColor="#F4B400" />
        </linearGradient>
      </defs>
      <path 
        d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z" 
        fill="url(#geminiSparkleGrad)" 
      />
    </svg>
  );
};
