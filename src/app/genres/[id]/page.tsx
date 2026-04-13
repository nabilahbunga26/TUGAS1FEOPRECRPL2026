import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Film, Genre } from '@/types';
import { FilmGrid } from '@/components/films/FilmGrid';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Film as FilmIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function GenreDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: genre, isLoading: isLoadingGenre } = useQuery<Genre>({
    queryKey: ['genre', id],
    queryFn: async () => {
      const { data } = await api.get('/genres');
      const genres = data.data as Genre[];
      return genres.find(g => g.id === id) || { id: id || '', name: 'Unknown' };
    },
  });

  const { data: filmsData, isLoading: isLoadingFilms } = useQuery({
    queryKey: ['films', 'genre', id],
    queryFn: async () => {
      const { data } = await api.get('/films', {
        params: {
          genre_id: id,
          limit: 100,
        },
      });
      return data.data as Film[];
    },
  });

  const isLoading = isLoadingGenre || isLoadingFilms;

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate('/genres')}
            className="group hover:bg-accent rounded-full px-6 py-6 duo-border border-transparent hover:border-black transition-all"
          >
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-black uppercase tracking-widest">Kembali ke Kategori</span>
          </Button>
        </motion.div>

        {isLoading ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="font-black text-muted-foreground uppercase tracking-widest">Memuat Film...</p>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="w-12 h-1 bg-accent rounded-full" />
                <span className="text-accent font-black uppercase tracking-[0.3em] text-sm">Kategori Film</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-black text-[#4B4B4B] leading-none tracking-tighter"
              >
                {genre?.name.toUpperCase()}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-xl text-muted-foreground font-medium max-w-2xl"
              >
                Menampilkan semua koleksi film terbaik dalam kategori {genre?.name}. Temukan cerita yang Anda sukai di sini.
              </motion.p>
            </div>

            {filmsData && filmsData.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FilmGrid films={filmsData} />
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 bg-zinc-50 rounded-[3rem] border-4 border-dashed border-zinc-200"
              >
                <FilmIcon className="h-16 w-16 text-zinc-300 mb-4" />
                <p className="text-xl font-black text-zinc-400 uppercase tracking-widest">Belum ada film di kategori ini</p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
