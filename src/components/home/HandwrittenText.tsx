import React from 'react';
import { motion } from 'motion/react';

interface HandwrittenTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const HandwrittenText: React.FC<HandwrittenTextProps> = ({ text, className, delay = 0 }) => {
  const lines = text.split('\n');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  } as const;

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  } as const;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {lines.map((line, lineIndex) => (
        <div 
          key={lineIndex} 
          style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            justifyContent: "flex-end", 
            gap: "0.4em 0",
            marginBottom: lineIndex < lines.length - 1 ? "0.5em" : "0"
          }}
        >
          {line.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} style={{ display: "inline-flex", whiteSpace: "nowrap", marginRight: "0.3em" }}>
              {word.split('').map((char, charIndex) => (
                <motion.span
                  variants={child}
                  key={charIndex}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </div>
      ))}
    </motion.div>
  );
};
