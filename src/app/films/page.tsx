import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Film } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Loader2, ChevronLeft, ChevronRight, Star, ArrowLeft } from 'lucide-react';
import { FilmGrid } from '@/components/films/FilmGrid';
import { useDebounce } from '@/hooks/useDebounce';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';

import { useSearchParams, useNavigate } from 'react-router-dom';

export default function FilmsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialGenre = searchParams.get('genre') || 'all';
  
  const [search, setSearch] = React.useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = React.useState(1);
  const [genreId, setGenreId] = React.useState<string>(initialGenre);
  const limit = 12;

  const { data: genresData } = useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const { data } = await api.get('/genres');
      return data.data;
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['films', debouncedSearch, page, genreId],
    queryFn: async () => {
      const { data } = await api.get('/films', {
        params: {
          search: debouncedSearch,
          genre_id: genreId === 'all' ? undefined : genreId,
          page,
          limit,
        },
      });
      return data;
    },
  });

  const films = data?.data || [];
  const totalPages = data?.meta?.[0]?.total_page || 1;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Katalog Film | CinePlay</title>
        <meta name="description" content="Jelajahi katalog film terbaru dan terbaik di CinePlay. Temukan berbagai genre mulai dari Aksi, Drama, hingga Sci-Fi." />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
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
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="text-5xl font-black tracking-tighter">
                {search ? `CARI: ${search.toUpperCase()}` : 'SEMUA FILM'}
              </h1>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Cari film..."
                    className="pl-10 h-12 rounded-xl duo-border border-muted focus:border-primary transition-all font-bold"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>
                <Select value={genreId} onValueChange={(val) => { setGenreId(val); setPage(1); }}>
                  <SelectTrigger className="w-full md:w-48 h-12 rounded-xl duo-border border-muted font-bold">
                    <SelectValue placeholder="Semua Kategori" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl duo-border border-muted">
                    <SelectItem value="all" className="font-bold">Semua Kategori</SelectItem>
                    {genresData?.map((genre: any) => (
                      <SelectItem key={genre.id} value={genre.id} className="font-bold">
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Genre Pill Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={genreId === 'all' ? 'default' : 'outline'}
                className={`rounded-full font-bold px-6 ${genreId === 'all' ? 'bg-primary text-white duo-border border-black' : 'bg-white text-muted-foreground duo-border border-muted hover:border-primary hover:text-primary'}`}
                onClick={() => { setGenreId('all'); setPage(1); }}
              >
                Semua Kategori
              </Button>
              {genresData?.map((genre: any) => (
                <Button
                  key={genre.id}
                  variant={genreId === genre.id ? 'default' : 'outline'}
                  className={`rounded-full font-bold px-6 ${genreId === genre.id ? 'bg-accent text-black duo-border border-black' : 'bg-white text-muted-foreground duo-border border-muted hover:border-accent hover:text-black'}`}
                  onClick={() => { setGenreId(genre.id); setPage(1); }}
                >
                  {genre.name}
                </Button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <p className="text-destructive font-bold">Error loading films.</p>
            </div>
          ) : (
            <>
              <FilmGrid films={films} />
              
              {/* Pagination */}
              <div className="mt-12 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl duo-border border-muted disabled:opacity-50"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="font-black px-4 py-2 bg-accent rounded-xl duo-border border-black">
                      {page}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl duo-border border-muted disabled:opacity-50"
                    onClick={() => setPage(p => p + 1)}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  Halaman {page} dari {totalPages}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
