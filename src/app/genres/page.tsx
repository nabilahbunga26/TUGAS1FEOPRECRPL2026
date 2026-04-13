import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Genre } from '@/types';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Film, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function GenresPage() {
  const navigate = useNavigate();
  const { data: genres, isLoading, isError } = useQuery<Genre[]>({
    queryKey: ['genres'],
    queryFn: async () => {
      const { data } = await api.get('/genres');
      return data.data;
    },
  });

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="group hover:bg-accent rounded-full px-6 py-6 duo-border border-transparent hover:border-black transition-all"
          >
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-black uppercase tracking-widest text-xs">Kembali</span>
          </Button>
        </motion.div>
        <div className="max-w-2xl mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black text-[#4B4B4B] leading-none mb-6"
          >
            JELAJAHI <br />
            <span className="text-primary">KATEGORI</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground font-medium"
          >
            Temukan apa yang Anda inginkan. Dari aksi yang memacu adrenalin hingga drama yang menyentuh hati.
          </motion.p>
        </div>

        {isLoading ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="font-black text-muted-foreground uppercase tracking-widest">Memuat Kategori...</p>
          </div>
        ) : isError ? (
          <div className="flex h-64 items-center justify-center text-destructive font-black text-xl">
            Gagal memuat kategori. Silakan coba lagi.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {genres?.map((genre, index) => (
              <motion.div
                key={genre.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.05,
                  rotateZ: index % 2 === 0 ? 2 : -2,
                  transition: { duration: 0.2 }
                }}
              >
                <Card 
                  className="h-48 rounded-3xl duo-border border-muted overflow-hidden group cursor-pointer bg-white shadow-md hover:shadow-xl transition-all relative"
                  onClick={() => navigate(`/genres/${genre.id}`)}
                >
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={`https://picsum.photos/seed/${genre.name.toLowerCase()}/400/300`} 
                      alt={genre.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
                  </div>
                  <CardHeader className="h-full flex flex-col items-center justify-center text-center p-6 relative z-10">
                    <CardTitle className="text-3xl font-black text-white tracking-tighter drop-shadow-lg group-hover:scale-110 transition-transform">
                      {genre.name.toUpperCase()}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
