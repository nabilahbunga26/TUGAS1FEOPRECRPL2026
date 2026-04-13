import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Film, 
  MessageSquare, 
  Star, 
  ChevronDown, 
  TrendingUp, 
  Award, 
  Sparkles,
  ArrowRight,
  Tv,
  Video,
  Armchair
} from 'lucide-react';

// const Player = ReactPlayer as any;

import { AnimatedMarquee } from '@/components/home/AnimatedMarquee';
import { SugarCubeAnimation } from '@/components/home/SugarCubeAnimation';
import { HandwrittenText } from '@/components/home/HandwrittenText';

import { Helmet } from 'react-helmet-async';

export default function HomePage() {
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>CinePlay | Temukan Film Yang Mengubah Hidup Anda</title>
        <meta name="description" content="CinePlay adalah platform manajemen film terbaik untuk menemukan, mengulas, dan mengelola daftar tontonan film favorit Anda." />
        <meta name="keywords" content="film, movie, review film, daftar tontonan, watchlist, bioskop, cineplay" />
      </Helmet>
      {/* Hero Section */}
      <section id="utama" className="relative h-screen flex items-center justify-center bg-black">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://image.jpnn.com/resize/570x380-80/arsip/normal/2023/01/04/sebanyak-30-film-terbaik-tayang-di-klikfilm-sepanjang-januar-cokq.jpg" 
            alt="Cinema Community Background" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-black uppercase tracking-[0.4em] text-sm mb-6"
          >
            Lebih Dari Sekadar Menonton
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-8"
          >
            RUMAH BAGI PARA<br />
            <span className="text-accent">PECINTA SINEMA</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-xl text-white/60 font-bold leading-relaxed mb-12"
          >
            CinePlay hadir untuk mengubah cara Anda menemukan, menilai, dan membagikan film favorit. Kami membangun ruang di mana setiap opini berharga dan setiap film menemukan penontonnya.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="animate-bounce mt-12">
              <ChevronDown className="h-8 w-8 text-accent" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Jelajahi</span>
          </motion.div>
        </div>
      </section>

      <AnimatedMarquee />

      {/* Philosophy Section */}
      <section id="visi" className="py-32 bg-background relative overflow-hidden">
        {/* Floating Background Elements (Monochrome) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ y: [0, -80, 0], x: [0, 30, 0], rotate: [0, 25, 0], scale: [1, 1.15, 1] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[5%] text-black/5"
          >
            <Tv className="w-32 h-32" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 90, 0], x: [0, -40, 0], rotate: [0, -20, 0], scale: [1, 1.2, 1] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] right-[10%] text-black/5"
          >
            <Video className="w-40 h-40" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -60, 0], x: [0, -20, 0], rotate: [0, 15, 0], scale: [1, 1.1, 1] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[40%] right-[5%] text-black/5"
          >
            <Armchair className="w-24 h-24" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 70, 0], x: [0, 25, 0], rotate: [0, -15, 0], scale: [1, 1.15, 1] }} 
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-[10%] left-[15%] text-black/5"
          >
            <Users className="w-28 h-28" />
          </motion.div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-accent font-black uppercase tracking-[0.3em] text-sm mb-8">Visi Kami</h2>
              <div className="space-y-4">
                {["Film", "adalah", "seni", "yang", "harus", "dirayakan", "bersama."].map((word, i) => (
                  <motion.span 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="inline-block text-4xl md:text-7xl font-black mr-4 tracking-tighter"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <p className="mt-12 text-xl text-muted-foreground font-bold leading-relaxed max-w-xl">
                Kami percaya bahwa pengalaman menonton tidak berhenti ketika credits bergulir. Diskusi, perdebatan, dan rekomendasi dari sesama penggemar adalah inti dari budaya sinema yang sejati.
              </p>
            </div>
            <div className="relative w-full max-w-lg mx-auto lg:ml-auto mt-12 lg:mt-0">
              {/* Antennas */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-12 z-0">
                <div className="w-1.5 h-16 bg-zinc-400 rotate-[-25deg] origin-bottom rounded-full" />
                <div className="w-1.5 h-20 bg-zinc-400 rotate-[15deg] origin-bottom rounded-full" />
              </div>
              
              {/* TV Body */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-800 p-4 md:p-6 rounded-[3rem] border-8 border-zinc-900 shadow-2xl relative z-10 flex gap-4"
              >
                {/* TV Screen */}
                <div className="flex-1 bg-black rounded-[2rem] p-6 relative overflow-hidden border-4 border-zinc-700 shadow-inner">
                  {/* CRT Effects */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] z-10" />
                  <div className="absolute inset-0 bg-accent/5 pointer-events-none z-10" />
                  <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-10 pointer-events-none" />

                  {/* Content */}
                  <div className="grid grid-cols-2 gap-8 relative z-20 h-full place-content-center">
                    {[
                      { label: "Ulasan Ditulis", value: "2.5M+", sub: "opini jujur", icon: MessageSquare },
                      { label: "Database Film", value: "100K+", sub: "judul tersedia", icon: Film },
                      { label: "Kritikus Aktif", value: "500K+", sub: "berbagi ulasan", icon: Users },
                      { label: "Rating Rata-rata", value: "4.8", sub: "kepuasan pengguna", icon: Star },
                    ].map((stat, i) => (
                      <div key={i} className="flex flex-col items-center text-center">
                        <stat.icon className="h-6 w-6 text-accent mb-3 animate-pulse" />
                        <div className="text-3xl font-black mb-1 text-white font-mono">{stat.value}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/70">{stat.label}</div>
                        <div className="text-[8px] font-bold text-white/40 mt-1">{stat.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TV Controls Panel */}
                <div className="w-12 flex flex-col items-center justify-between py-4 hidden sm:flex">
                  <div className="space-y-4">
                    <div className="w-8 h-8 rounded-full bg-zinc-700 border-2 border-zinc-900 shadow-sm" />
                    <div className="w-8 h-8 rounded-full bg-zinc-700 border-2 border-zinc-900 shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <div className="w-6 h-2 rounded-full bg-zinc-900" />
                    <div className="w-6 h-2 rounded-full bg-zinc-900" />
                    <div className="w-6 h-2 rounded-full bg-zinc-900" />
                  </div>
                  <div className="w-4 h-4 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Experience Section */}
      <section id="komunitas" className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-accent/5 blur-[120px] rounded-full" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Cassette Player */}
            <div className="flex-shrink-0 w-96 h-96 -mt-12 rounded-full overflow-hidden border-4 border-white/20 animate-[spin_20s_linear_infinite] relative bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000"
                  alt="Cinematic Film Reel"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Hole in the center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-black rounded-full border-4 border-white/20 z-10"></div>
                {/* Glass effect over the image */}
                <div className="absolute inset-0 bg-black/30 pointer-events-none z-20"></div>
              </div>
            
            {/* Text Content */}
            <div className="max-w-4xl text-right">
              <h2 className="text-accent font-black uppercase tracking-[0.3em] text-sm mb-8">Koneksi Melalui Layar</h2>
              <div className="text-4xl md:text-6xl font-handwriting leading-tight mb-12 text-white flex flex-col items-end">
                <HandwrittenText text={"Temukan Film Yang Mengubah Hidup Anda.\nDan Temukan Mereka Yang Merasakan Hal Yang Sama."} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="h-12 w-12 rounded-2xl bg-accent flex items-center justify-center duo-border border-black">
                  <Award className="h-6 w-6 text-black" />
                </div>
                <h4 className="text-2xl font-black tracking-tighter">Rekomendasi dari Manusia, Bukan Algoritma.</h4>
                <p className="text-white/60 font-bold leading-relaxed">
                  Lupakan algoritma yang hanya menyarankan film berdasarkan apa yang baru saja Anda tonton. Di CinePlay, Anda mendapatkan rekomendasi dari kritikus dan teman yang memiliki selera serupa. Kurasi yang nyata, dari hati ke hati.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center duo-border border-white/20">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <h4 className="text-2xl font-black tracking-tighter">Bangun Reputasi Anda.</h4>
                <p className="text-white/60 font-bold leading-relaxed">
                  Tulis ulasan mendalam, berikan rating yang jujur, dan buat daftar tontonan yang menginspirasi orang lain. Jadilah suara yang dipercaya dalam komunitas dan raih lencana "Kritikus Elit" seiring berkembangnya profil Anda.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Journey Section - Ular Tangga Style */}
      <section id="sejarah" className="py-32 overflow-hidden relative bg-black text-white">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop" 
            alt="Cinema Background" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <h2 className="text-accent font-black uppercase tracking-[0.3em] text-sm mb-6">Sejarah Kami</h2>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-white">DARI IDE SEDERHANA,<br />MENJADI KOMUNITAS BESAR.</h3>
            </div>
            <p className="text-white/60 font-bold max-w-xs uppercase text-xs tracking-widest leading-relaxed">
              Jejak langkah kami dalam membangun platform ulasan film paling interaktif.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto mt-24">
            {/* Desktop Winding Path Line (Ular Tangga) */}
            <div className="hidden md:block absolute top-[20%] left-[16.66%] right-[16.66%] bottom-[20%] border-t-4 border-r-4 border-b-4 border-dashed border-accent/40 rounded-r-[4rem] z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-24 relative z-10">
              {[
                { year: "2021", title: "Langkah Awal", desc: "Berawal dari forum kecil pecinta film indie yang frustrasi dengan sistem rating tradisional.", step: "01 / 06", col: "md:col-start-1", row: "md:row-start-1" },
                { year: "2022", title: "Peluncuran Platform", desc: "CinePlay v1.0 rilis. Fokus pada ulasan panjang dan diskusi mendalam antar pengguna.", step: "02 / 06", col: "md:col-start-2", row: "md:row-start-1" },
                { year: "2023", title: "Fitur Kurasi", desc: "Memperkenalkan 'Daftar Tontonan' khusus, memungkinkan pengguna menjadi kurator bagi komunitas.", step: "03 / 06", col: "md:col-start-3", row: "md:row-start-1" },
                { year: "2024", title: "Ledakan Pengguna", desc: "Mencapai 1 juta ulasan pertama. CinePlay mulai diakui sebagai referensi utama sebelum menonton film.", step: "04 / 06", col: "md:col-start-3", row: "md:row-start-2" },
                { year: "2025", title: "Integrasi Global", desc: "Menambahkan database film internasional dan dukungan multi-bahasa untuk komunitas global.", step: "05 / 06", col: "md:col-start-2", row: "md:row-start-2" },
                { year: "Sekarang", title: "Era Baru", desc: "Terus berinovasi dengan fitur sosial baru, memastikan setiap suara penggemar film didengar.", step: "06 / 06", col: "md:col-start-1", row: "md:row-start-2" },
              ].map((milestone, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
                  className={`relative group ${milestone.col} ${milestone.row}`}
                >
                  {/* Mobile connecting line */}
                  {i !== 5 && (
                    <div className="absolute left-1/2 top-full w-0 h-24 -translate-x-1/2 md:hidden border-l-4 border-dashed border-accent/40 z-0" />
                  )}
                  
                  <div className="bg-white p-8 rounded-3xl duo-border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 h-full flex flex-col relative z-10">
                    {i === 0 && (
                      <div className="absolute -top-4 -left-4 bg-primary text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest duo-border border-black rotate-[-10deg]">
                        Start
                      </div>
                    )}
                    {i === 5 && (
                      <div className="absolute -top-4 -left-4 bg-black text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest duo-border border-black rotate-[-10deg]">
                        Finish
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-full bg-accent text-black flex items-center justify-center font-black text-xl duo-border border-black shrink-0">
                        {i + 1}
                      </div>
                      <div className="text-right">
                        <div className="text-accent font-black text-2xl">{milestone.year}</div>
                        <div className="text-[10px] font-black text-muted-foreground tracking-widest">{milestone.step}</div>
                      </div>
                    </div>
                    <h5 className="text-xl font-black tracking-tighter mb-3">{milestone.title}</h5>
                    <p className="text-sm text-muted-foreground font-bold leading-relaxed flex-grow">{milestone.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section id="nilai" className="py-32 bg-muted/20 relative overflow-hidden">
        {/* Floating Background Elements (Monochrome) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ y: [0, -90, 0], x: [0, -35, 0], rotate: [0, -25, 0], scale: [1, 1.2, 1] }} 
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[10%] text-black/5"
          >
            <Film className="w-32 h-32" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 80, 0], x: [0, 40, 0], rotate: [0, 20, 0], scale: [1, 1.15, 1] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[10%] left-[5%] text-black/5"
          >
            <Tv className="w-40 h-40" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -70, 0], x: [0, 25, 0], rotate: [0, -15, 0], scale: [1, 1.1, 1] }} 
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[50%] left-[10%] text-black/5"
          >
            <Armchair className="w-24 h-24" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 85, 0], x: [0, -30, 0], rotate: [0, 15, 0], scale: [1, 1.2, 1] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-[30%] right-[15%] text-black/5"
          >
            <Users className="w-28 h-28" />
          </motion.div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-accent font-black uppercase tracking-[0.3em] text-sm mb-6">Nilai Inti</h2>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter">FONDASI<br />KOMUNITAS KAMI.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: "01", title: "Kebebasan Berpendapat", desc: "Setiap ulasan, baik positif maupun negatif, memiliki tempat di sini. Kami menghargai kritik yang membangun dan opini yang jujur." },
              { id: "02", title: "Tanpa Algoritma Bias", desc: "Kami tidak memanipulasi rating atau menyembunyikan ulasan demi kepentingan studio. Suara komunitas adalah satu-satunya metrik yang valid." },
              { id: "03", title: "Fokus pada Kualitas", desc: "Mendorong diskusi yang bermakna daripada sekadar 'like' atau 'dislike'. Kami menghargai kedalaman analisis." },
              { id: "04", title: "Ruang Aman", desc: "Moderasi komunitas yang ketat terhadap spoiler yang tidak ditandai, ujaran kebencian, dan toksisitas. Debat sehat selalu didukung." },
              { id: "05", title: "Apresiasi Sinema", desc: "Dari blockbuster Hollywood hingga film arthouse Eropa, kami merayakan segala bentuk penceritaan visual tanpa diskriminasi." },
            ].map((principle, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-white duo-border border-muted hover:border-primary transition-all group"
              >
                <div className="text-4xl font-black text-muted/30 mb-6 group-hover:text-accent transition-colors">{principle.id}</div>
                <h5 className="text-2xl font-black tracking-tighter mb-4">{principle.title}</h5>
                <p className="text-muted-foreground font-bold leading-relaxed">{principle.desc}</p>
              </motion.div>
            ))}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] bg-accent flex flex-col items-center justify-center text-center duo-border border-black"
            >
              <Sparkles className="h-12 w-12 text-black mb-6 animate-pulse" />
              <h5 className="text-2xl font-black tracking-tighter text-black mb-4">Jadilah Bagian Dari Kami</h5>
              <p className="text-black/70 font-bold leading-relaxed">Suara Anda penting untuk melengkapi database ulasan kami.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop" 
            alt="CTA Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <SugarCubeAnimation />

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-accent font-black uppercase tracking-[0.3em] text-sm mb-8">Kursi Sutradara Ada di Tangan Anda</h2>
          <h3 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-12">
            MULAI TULIS<br />ULASAN ANDA.
          </h3>
          <p className="max-w-xl mx-auto text-xl text-white/60 font-bold mb-12">
            Bergabunglah dengan ratusan ribu kritikus lainnya dan bantu penonton lain menemukan mahakarya berikutnya.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Button asChild className="h-20 px-12 rounded-2xl bg-accent text-black hover:bg-accent/90 duo-border border-black font-black text-lg uppercase tracking-widest shadow-xl">
              <Link to="/register">Buat Akun Gratis</Link>
            </Button>
            <Button asChild variant="outline" className="h-20 px-12 rounded-2xl border-white/20 hover:bg-white/10 font-black text-lg uppercase tracking-widest">
              <Link to="/films" className="flex items-center gap-3">
                Lihat Film Trending <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
