import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { Ticket as TicketIcon, Film, ScanBarcode } from 'lucide-react';

import { CinePlaySvgAnimation } from './CinePlaySvgAnimation';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),  // Logo
      setTimeout(() => setStep(2), 1500), // SVG Animation starts
      setTimeout(() => setStep(4), 5000), // Ticket appears
      setTimeout(() => setStep(5), 6000), // Hand appears
      setTimeout(() => setStep(6), 7000)  // Tear!
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={`fixed inset-0 z-[100] ${step >= 4 ? 'bg-white' : 'bg-black'} flex flex-col items-center justify-center overflow-hidden px-4 transition-colors duration-1000`}>
      
      {/* VINTAGE CINEMA IMAGE BACKGROUND */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 4 ? 0.4 : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img 
          src="https://unair.ac.id/wp-content/uploads/2022/12/Foto-by-CNN-Indonesia-2.jpeg" 
          alt="Vintage Cinema" 
          className="w-full h-full object-cover sepia-[.2] contrast-100 brightness-[1.1] grayscale-[.1]"
          referrerPolicy="no-referrer"
        />
        {/* Vignette effect */}
        <div className={`absolute inset-0 ${step >= 4 ? 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)]' : 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]'}`} />
      </motion.div>

      {/* INTRO SEQUENCE (LOGO & SVG ANIMATION) */}
      <AnimatePresence mode="wait">
        {step < 4 && (
          <motion.div 
            key="intro"
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center absolute inset-0 z-50 bg-black p-8"
          >
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  initial={{ scale: 0, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 100 }}
                  className="mb-12"
                >
                  <Logo size={100} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-full max-w-lg">
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <CinePlaySvgAnimation />
                    
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.5 }}
                      className="text-accent font-black uppercase tracking-[0.4em] text-xs md:text-sm mt-8 text-center"
                    >
                      The Cinematic Playground
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE TICKET & TEARING ANIMATION */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            key="ticket-container"
            initial={{ y: "100vh", rotate: 5 }}
            animate={{ y: "-5vh", rotate: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 60 }}
            className="relative w-full max-w-md z-40 flex flex-col items-center"
          >
            {/* TOP TICKET */}
            <motion.div 
              animate={step >= 6 ? { y: 100, scale: 1.05 } : { y: 0, scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="bg-[#FDFBF7] w-full rounded-t-[2rem] border-4 border-black border-b-0 flex flex-col relative z-20"
              style={{ 
                boxShadow: step >= 6 ? "16px 16px 0px 0px rgba(0,0,0,1)" : "16px 0px 0px 0px rgba(0,0,0,1)" 
              }}
            >
              <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none rounded-t-[2rem]" />
              
              <div className="p-8 md:p-10 text-center relative z-20 pb-12">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <TicketIcon className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black mb-4 uppercase">
                  Selamat Datang!
                </h2>
                <div className="space-y-4 text-zinc-600 font-bold text-sm md:text-base leading-relaxed mb-8">
                  <p>Siapkan popcornmu! Kamu baru saja memasuki dunia di mana setiap opini film sangat berharga.</p>
                  <p>Jelajahi ribuan judul, baca ulasan jujur dari komunitas, dan temukan teman nobar virtual yang sefrekuensi.</p>
                </div>
                
                {/* SIAP MENONTON BUTTON */}
                <motion.div
                  animate={step >= 6 ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-50"
                >
                  <Button 
                    onClick={onComplete}
                    className="w-full h-16 rounded-2xl bg-primary text-white hover:bg-primary/90 border-4 border-black font-black uppercase tracking-widest text-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1),0_0_30px_rgba(250,204,21,0.8)] hover:-translate-y-1 transition-all group relative overflow-hidden"
                  >
                    <span className="relative z-10">SIAP MENONTON!</span>
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                  </Button>
                </motion.div>
              </div>
              
              {/* Dashed line at the very bottom of the top part */}
              <div className="absolute bottom-0 left-4 right-4 border-b-4 border-dashed border-zinc-300 z-20" />
              
              {/* Cutouts */}
              <div className={`absolute bottom-[-20px] left-[-20px] w-10 h-10 ${step >= 4 ? 'bg-white' : 'bg-black'} rounded-full border-4 border-black z-30`} />
              <div className={`absolute bottom-[-20px] right-[-20px] w-10 h-10 ${step >= 4 ? 'bg-white' : 'bg-black'} rounded-full border-4 border-black z-30`} />
            </motion.div>

            {/* BOTTOM STUB */}
            <motion.div 
              animate={step >= 6 ? { y: 1000, rotate: -20, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
              transition={step >= 6 ? { duration: 1, ease: "easeIn" } : { duration: 0 }}
              className="bg-zinc-100 w-full rounded-b-[2rem] border-4 border-black border-t-0 flex flex-col relative z-10"
              style={{ 
                boxShadow: "16px 16px 0px 0px rgba(0,0,0,1)",
                marginTop: "-4px" // overlap the borders to hide the gap
              }}
            >
              <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none rounded-b-[2rem]" />
              
              <div className="p-8 pt-8 text-center relative z-20">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Film className="w-4 h-4 text-zinc-400" />
                  <p className="text-black font-black uppercase tracking-widest text-xs bg-accent/20 inline-block px-4 py-2 rounded-full border border-accent/30">
                    Admit One • VIP Access
                  </p>
                  <Film className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="flex justify-center opacity-40">
                  <ScanBarcode className="w-32 h-12 text-black" />
                </div>
              </div>

              {/* Cutouts */}
              <div className={`absolute top-[-20px] left-[-20px] w-10 h-10 ${step >= 4 ? 'bg-white' : 'bg-black'} rounded-full border-4 border-black z-30`} />
              <div className={`absolute top-[-20px] right-[-20px] w-10 h-10 ${step >= 4 ? 'bg-white' : 'bg-black'} rounded-full border-4 border-black z-30`} />

              {/* THE TEARING HAND */}
              <AnimatePresence>
                {step >= 5 && (
                  <motion.div
                    initial={{ x: 200, y: 100, opacity: 0 }}
                    animate={{ x: 60, y: -20, opacity: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 80 }}
                    className="absolute right-0 top-1/2 z-50 text-7xl md:text-8xl"
                    style={{ filter: "drop-shadow(0px 20px 10px rgba(0,0,0,0.5))" }}
                  >
                    🤏
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
