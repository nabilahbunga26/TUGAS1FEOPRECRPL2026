import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-[#89E219] text-black py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <span className="text-3xl font-black tracking-tight pr-1">CINEPLAY</span>
            <p className="text-black/80 font-bold leading-relaxed max-w-sm">
              Platform streaming terbaik dengan koleksi drama dan film terlengkap. Nikmati pengalaman menonton kualitas HD di semua perangkat Anda.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-black/60">Jelajahi</h4>
            <ul className="space-y-4">
              <li><a href="/" className="text-sm font-bold hover:text-white transition-colors">Beranda</a></li>
              <li><a href="/genres" className="text-sm font-bold hover:text-white transition-colors">Kategori</a></li>
              <li><a href="/films" className="text-sm font-bold hover:text-white transition-colors">Film & Drama</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-black/60">Dukungan</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm font-bold hover:text-white transition-colors">System Health</a></li>
              <li><a href="#" className="text-sm font-bold hover:text-white transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="text-sm font-bold hover:text-white transition-colors">Kebijakan Privasi</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t-2 border-black/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black text-black/60 uppercase tracking-widest">
            Copyright © 2026 CinePlay. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Karir</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Hubungi Kami</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
