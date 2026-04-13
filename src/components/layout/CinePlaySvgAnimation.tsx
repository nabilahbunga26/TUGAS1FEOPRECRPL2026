import React from 'react';
import { motion } from 'motion/react';

export const CinePlaySvgAnimation = () => {
  return (
    <div className="w-full max-w-2xl mx-auto flex justify-center items-center">
      <svg 
        viewBox="0 0 550 120" 
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* CINE - White */}
        <motion.text
          x="40"
          y="85"
          className="text-8xl font-black italic tracking-tight"
          style={{ 
            fill: 'none', 
            stroke: '#FFFFFF', 
            strokeWidth: '1.5',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            filter: 'url(#glow)'
          }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          CINE
        </motion.text>

        {/* PLAY - Green (#89E219) */}
        <motion.text
          x="260"
          y="85"
          className="text-8xl font-black italic tracking-tight"
          style={{ 
            fill: 'none', 
            stroke: '#89E219', 
            strokeWidth: '1.5',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            filter: 'url(#glow)'
          }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        >
          PLAY
        </motion.text>

        {/* Fill Animation */}
        <motion.text
          x="40"
          y="85"
          className="text-8xl font-black italic tracking-tight"
          style={{ 
            fill: '#FFFFFF',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          CINE
        </motion.text>

        <motion.text
          x="260"
          y="85"
          className="text-8xl font-black italic tracking-tight"
          style={{ 
            fill: '#89E219',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          PLAY
        </motion.text>
      </svg>
    </div>
  );
};
