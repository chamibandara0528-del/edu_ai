import React from 'react';
import { motion } from 'motion/react';

interface TeacherAvatarProps {
  type: 'sir' | 'miss';
  className?: string;
  showSunglasses?: boolean;
  glowColor?: string;
}

export const TeacherAvatar = ({ type, className, showSunglasses = false, glowColor }: TeacherAvatarProps) => {
  const Sunglasses = () => (
    <g transform="translate(30, 38)">
      <path d="M0 0H15L18 8H2L0 0Z" fill="#1A202C" />
      <path d="M22 0H37L40 8H24L22 0Z" fill="#1A202C" />
      <path d="M15 2H22M0 0L-5 5M40 0L45 5" stroke="#1A202C" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 3H10" stroke="white" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
      <path d="M25 3H32" stroke="white" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
    </g>
  );

  return (
    <motion.div
      animate={{ 
        y: [0, -6, 0],
        rotate: [0, 1, -1, 0]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className={`${className} relative`}
    >
      {glowColor && (
        <div 
          className="absolute inset-4 rounded-full blur-3xl opacity-40 animate-pulse pointer-events-none" 
          style={{ backgroundColor: glowColor, filter: 'blur(40px)' }}
        />
      )}
      {type === 'sir' ? (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="50" cy="50" r="50" fill="#EBF8FF"/>
          <path d="M50 85C67.5 85 82 72 85 55H15C18 72 32.5 85 50 85Z" fill="#3182CE"/>
          <circle cx="50" cy="40" r="20" fill="#3182CE"/>
          <path d="M45 55L50 68L55 55H45Z" fill="#EBF8FF" opacity="0.3"/>
          <circle cx="50" cy="50" r="48" stroke="#3182CE" strokeWidth="2" strokeOpacity="0.1"/>
          {showSunglasses && <Sunglasses />}
        </svg>
      ) : (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="50" cy="50" r="50" fill="#FFF5F5"/>
          <path d="M30 45C30 30 40 20 50 20C60 20 70 30 70 45V55H30V45Z" fill="#E53E3E"/>
          <path d="M50 85C67.5 85 82 72 85 55H15C18 72 32.5 85 50 85Z" fill="#E53E3E"/>
          <circle cx="50" cy="42" r="18" fill="#E53E3E"/>
          <circle cx="50" cy="50" r="48" stroke="#E53E3E" strokeWidth="2" strokeOpacity="0.1"/>
          {showSunglasses && <Sunglasses />}
        </svg>
      )}
    </motion.div>
  );
};
