import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Main Frame */}
        <rect
          x="5"
          y="5"
          width="90"
          height="90"
          rx="20"
          className="fill-accent stroke-black"
          strokeWidth="8"
        />
        
        {/* Film Strip Holes - Left */}
        <rect x="15" y="20" width="10" height="10" rx="2" fill="black" />
        <rect x="15" y="45" width="10" height="10" rx="2" fill="black" />
        <rect x="15" y="70" width="10" height="10" rx="2" fill="black" />
        
        {/* Film Strip Holes - Right */}
        <rect x="75" y="20" width="10" height="10" rx="2" fill="black" />
        <rect x="75" y="45" width="10" height="10" rx="2" fill="black" />
        <rect x="75" y="70" width="10" height="10" rx="2" fill="black" />

        {/* Play Triangle */}
        <path
          d="M40 35L65 50L40 65V35Z"
          fill="black"
          stroke="black"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
