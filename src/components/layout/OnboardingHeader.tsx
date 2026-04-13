import React from 'react';
import { motion } from 'motion/react';
import { Film, List, Star, Play } from 'lucide-react';

export const OnboardingHeader: React.FC = () => {
  return (
    <section className="w-full bg-black text-white py-20 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-accent text-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest"
            >
              <Play className="h-3 w-3 fill-current" />
              Selamat Datang di CinePlay
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black leading-none tracking-tighter"
            >
              TAMAN BERMAIN <span className="text-accent">SINEMATIK</span><br />
              ANDA.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 font-bold max-w-lg leading-relaxed"
            >
              CinePlay lebih dari sekadar daftar film. Ini adalah tempat para pecinta film terhubung, 
              menemukan permata tersembunyi, dan mengkurasi perjalanan sinematik mereka sendiri.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="p-8 bg-white/5 rounded-3xl duo-border border-white/10 hover:border-accent transition-colors group"
            >
              <div className="bg-accent p-3 rounded-2xl w-fit mb-6 group-hover:rotate-6 transition-transform">
                <Film className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-black mb-2">TEMUKAN</h3>
              <p className="text-sm text-white/40 font-bold">Jelajahi ribuan film di setiap kategori yang bisa dibayangkan.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="p-8 bg-white/5 rounded-3xl duo-border border-white/10 hover:border-accent transition-colors group"
            >
              <div className="bg-white p-3 rounded-2xl w-fit mb-6 group-hover:rotate-6 transition-transform">
                <List className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-black mb-2">KURASI</h3>
              <p className="text-sm text-white/40 font-bold">Bangun daftar tonton pribadi dan atur malam nonton Anda.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="p-8 bg-white/5 rounded-3xl duo-border border-white/10 hover:border-accent transition-colors group md:col-span-2"
            >
              <div className="flex items-center gap-6">
                <div className="bg-accent p-3 rounded-2xl w-fit group-hover:rotate-6 transition-transform">
                  <Star className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-1">ULAS & BAGIKAN</h3>
                  <p className="text-sm text-white/40 font-bold">Bagikan pemikiran Anda dan lihat apa yang sedang ditonton komunitas.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
