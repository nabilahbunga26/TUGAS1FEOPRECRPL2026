import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Film, Review, User, FilmList } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, Star, ThumbsUp, ThumbsDown, Calendar, Clock, User as UserIcon, Plus, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';

const getEmbedUrl = (url?: string) => {
  if (!url) return '';
  if (url.includes('youtube.com/watch?v=')) {
    return url.replace('youtube.com/watch?v=', 'youtube.com/embed/').split('&')[0];
  }
  if (url.includes('youtu.be/')) {
    return url.replace('youtu.be/', 'youtube.com/embed/').split('?')[0];
  }
  return url;
};

export default function FilmDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [reviewContent, setReviewContent] = React.useState('');
  const [reviewRating, setReviewRating] = React.useState(5);

  const { data: film, isLoading: isFilmLoading } = useQuery<Film>({
    queryKey: ['film', id],
    queryFn: async () => {
      const { data } = await api.get(`/films/${id}`);
      return data.data;
    },
  });

  const { data: reviews, isLoading: isReviewsLoading } = useQuery<Review[]>({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const { data } = await api.get(`/films/${id}/reviews`);
      return data.data;
    },
  });

  const addReviewMutation = useMutation({
    mutationFn: async (newReview: { content: string; rating: number }) => {
      const { data } = await api.post(`/reviews`, {
        film_id: id,
        ...newReview,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', id] });
      setReviewContent('');
      toast.success('Ulasan berhasil ditambahkan!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Gagal menambahkan ulasan');
    },
  });

  const { data: watchlists } = useQuery<FilmList[]>({
    queryKey: ['watchlists'],
    queryFn: async () => {
      const { data } = await api.get('/film-lists');
      return data.data;
    },
    enabled: !!user,
  });

  const addToWatchlistMutation = useMutation({
    mutationFn: async (listId: string) => {
      const { data } = await api.post(`/film-lists/${listId}/films`, { film_id: id });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlists'] });
      toast.success('Film berhasil ditambahkan ke daftar tonton!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Gagal menambahkan ke daftar tonton');
    },
  });

  const handleReaction = async (reviewId: string, type: 'like' | 'dislike') => {
    if (!user) {
      toast.error('Silakan masuk untuk menanggapi ulasan');
      return;
    }
    try {
      await api.post(`/reactions`, { review_id: reviewId, type });
      queryClient.invalidateQueries({ queryKey: ['reviews', id] });
      toast.success('Tanggapan diperbarui');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gagal menanggapi');
    }
  };

  if (isFilmLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!film) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black tracking-tighter mb-8">FILM TIDAK DITEMUKAN</h1>
        <Button asChild className="h-14 px-8 rounded-2xl bg-accent text-black hover:bg-accent/90 duo-border border-black font-black uppercase tracking-widest">
          <Link to="/films">Kembali ke Film</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Helmet>
        <title>{film.title} | CinePlay</title>
        <meta name="description" content={film.description.substring(0, 160)} />
      </Helmet>
      {/* Cinematic Header */}
      <div className="relative h-[70vh] w-full overflow-hidden bg-black">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={film.poster_url || 'https://picsum.photos/seed/movie/1920/1080'}
            alt={film.title}
            className="h-full w-full object-cover blur-3xl scale-110"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <div className="container mx-auto px-6 h-full flex items-end pb-16 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-end w-full">
            <motion.div
              initial={{ opacity: 0, y: 60, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="hidden md:block w-72 aspect-[2/3] rounded-[2.5rem] overflow-hidden duo-border border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] group"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src={film.poster_url || 'https://picsum.photos/seed/movie/400/600'}
                alt={film.title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <div className="flex-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <Button 
                  onClick={() => navigate(-1)} 
                  variant="outline" 
                  className="bg-white/10 text-white hover:bg-white/20 border-white/20 rounded-xl font-black uppercase tracking-widest text-xs h-10 px-4 backdrop-blur-md"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Kembali
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <Badge className="bg-accent text-black font-black rounded-xl px-6 py-2 duo-border border-black text-xs uppercase tracking-widest">
                  {film.genre?.name || 'CINEMA'}
                </Badge>
                <div className="bg-white/10 backdrop-blur-md text-white font-black rounded-xl px-6 py-2 duo-border border-white/20 flex items-center gap-2 text-xs uppercase tracking-widest">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  {film.rating || '8.5'} / 10
                </div>
              </motion.div>
              
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter text-white"
                >
                  {film.title.toUpperCase()}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-8 text-white/60 font-black uppercase tracking-[0.2em] text-xs pt-4"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-accent" />
                    {new Date(film.release_date).getFullYear()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" />
                    {film.duration ? `${film.duration} MENIT` : '142 MENIT'}
                  </div>
                  <div className="flex items-center gap-2">
                    {(film.format || ['4K', 'HDR']).map((fmt) => (
                      <Badge key={fmt} variant="outline" className="border-white/20 text-white/60 rounded-md font-black">{fmt}</Badge>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-20">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black mb-8 flex items-center gap-4">
                <div className="w-3 h-10 bg-accent rounded-full" />
                CERITA
              </h2>
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-muted rounded-full" />
                <p className="text-2xl text-muted-foreground font-bold leading-relaxed pl-8 italic">
                  {film.description}
                </p>
              </div>
            </motion.section>

            {film.trailer_url && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-black mb-8 flex items-center gap-4">
                  <div className="w-3 h-10 bg-accent rounded-full" />
                  TRAILER
                </h2>
                <div className="aspect-video rounded-[2.5rem] overflow-hidden duo-border border-black shadow-xl bg-black">
                  <iframe
                    src={getEmbedUrl(film.trailer_url)}
                    title={`${film.title} Trailer`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </motion.section>
            )}

            <section>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-black flex items-center gap-4">
                  <div className="w-3 h-10 bg-primary rounded-full" />
                  KRITIKUS & PENGGEMAR
                </h2>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-muted-foreground uppercase tracking-widest">
                    {reviews?.length || 0} ULASAN
                  </span>
                </div>
              </div>

              {user ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <Card className="mb-16 rounded-[2.5rem] duo-border border-primary/20 overflow-hidden bg-white shadow-xl">
                    <CardHeader className="bg-primary/5 border-b-2 border-primary/10 p-8">
                      <CardTitle className="text-2xl font-black text-primary uppercase tracking-tighter">BAGIKAN PENDAPAT ANDA</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <motion.button
                                key={star}
                                onClick={() => setReviewRating(star * 2)}
                                whileTap={{ scale: 0.8 }}
                                animate={{ scale: reviewRating >= star * 2 ? 1.1 : 1 }}
                                className={`p-1 transition-all hover:scale-125 ${reviewRating >= star * 2 ? 'text-accent' : 'text-muted'}`}
                              >
                                <Star className={`h-10 w-10 ${reviewRating >= star * 2 ? 'fill-current' : ''}`} />
                              </motion.button>
                            ))}
                          </div>
                          <div className="h-12 w-[2px] bg-muted hidden md:block" />
                          <span className="font-black text-4xl text-primary tracking-tighter">{reviewRating} <span className="text-muted-foreground text-xl">/ 10</span></span>
                        </div>
                        <Textarea
                          placeholder="Tulis ulasan sinematik..."
                          className="min-h-[160px] rounded-3xl duo-border border-muted focus-visible:ring-primary text-xl font-bold p-6 bg-muted/20"
                          value={reviewContent}
                          onChange={(e) => setReviewContent(e.target.value)}
                        />
                        <div className="flex justify-end">
                          <Button
                            onClick={() => addReviewMutation.mutate({ content: reviewContent, rating: reviewRating })}
                            disabled={addReviewMutation.isPending || !reviewContent.trim()}
                            className="rounded-2xl bg-primary text-white hover:bg-primary/90 duo-border border-black px-12 h-16 font-black uppercase tracking-widest text-sm shadow-lg active:scale-95 transition-all"
                          >
                            {addReviewMutation.isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'KIRIM ULASAN'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <div className="mb-16 p-12 rounded-[2.5rem] bg-muted/30 border-4 border-dashed border-muted flex flex-col items-center justify-center text-center">
                  <p className="text-2xl font-black text-muted-foreground mb-6">BERGABUNGLAH DALAM PERCAKAPAN</p>
                  <Button asChild className="rounded-2xl bg-accent text-black hover:bg-accent/90 duo-border border-black font-black px-10 h-14 uppercase tracking-widest">
                    <Link to="/login">MASUK UNTUK MENGULAS</Link>
                  </Button>
                </div>
              )}

              <div className="space-y-8">
                {isReviewsLoading ? (
                  <div className="flex justify-center py-20">
                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                  </div>
                ) : reviews?.length === 0 ? (
                  <div className="text-center py-20 bg-muted/10 rounded-[2.5rem] duo-border border-muted border-dashed">
                    <p className="text-xl text-muted-foreground font-black uppercase tracking-widest">Belum ada ulasan. Jadilah kritikus pertama!</p>
                  </div>
                ) : (
                  reviews?.map((review, idx) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Card className="rounded-[2.5rem] duo-border border-muted overflow-hidden bg-white hover:border-primary transition-all group shadow-md">
                        <CardContent className="p-10">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                            <div className="flex items-center gap-5">
                              <div className="h-16 w-16 rounded-2xl bg-accent flex items-center justify-center duo-border border-black group-hover:rotate-6 transition-transform">
                                <UserIcon className="h-8 w-8 text-black" />
                              </div>
                              <div>
                                <Link to={`/users/${review.user_id}`} className="font-black text-2xl hover:text-accent transition-colors tracking-tighter">
                                  {review.user?.name || 'KRITIKUS ANONIM'}
                                </Link>
                                <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mt-1">
                                  {new Date(review.created_at).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                              </div>
                            </div>
                            <div className="bg-primary text-white font-black text-2xl px-6 py-2 rounded-2xl duo-border border-black flex items-center gap-2">
                              <Star className="h-5 w-5 fill-current text-accent" />
                              {review.rating}
                            </div>
                          </div>
                          
                          <p className="text-xl font-bold text-muted-foreground leading-relaxed mb-10 pl-4 border-l-4 border-accent/30">
                            "{review.content}"
                          </p>
                          
                          <div className="flex items-center gap-4 pt-8 border-t-2 border-muted/50">
                            <Button
                              variant="ghost"
                              className={`rounded-xl font-black gap-3 h-12 px-6 transition-all ${review.reactions?.some(r => r.user_id === user?.id && r.type === 'like') ? 'bg-primary text-white' : 'hover:bg-primary/10'}`}
                              onClick={() => handleReaction(review.id, 'like')}
                            >
                              <ThumbsUp className="h-5 w-5" />
                              <span className="text-lg">{review.reactions?.filter(r => r.type === 'like').length || 0}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              className={`rounded-xl font-black gap-3 h-12 px-6 transition-all ${review.reactions?.some(r => r.user_id === user?.id && r.type === 'dislike') ? 'bg-destructive text-white' : 'hover:bg-destructive/10'}`}
                              onClick={() => handleReaction(review.id, 'dislike')}
                            >
                              <ThumbsDown className="h-5 w-5" />
                              <span className="text-lg">{review.reactions?.filter(r => r.type === 'dislike').length || 0}</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-28"
            >
              <Card className="rounded-[2.5rem] duo-border border-muted overflow-hidden bg-white shadow-xl mb-8">
                <CardHeader className="bg-muted/30 p-8 border-b-2 border-muted">
                  <CardTitle className="text-xl font-black tracking-widest uppercase">INFO FILM</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-2">
                    <span className="font-black text-muted-foreground uppercase text-[10px] tracking-[0.3em]">Kategori</span>
                    <div className="text-xl font-black text-primary">{film.genre?.name || 'SINEMA'}</div>
                  </div>
                  <div className="space-y-2">
                    <span className="font-black text-muted-foreground uppercase text-[10px] tracking-[0.3em]">Sutradara</span>
                    <div className="text-xl font-black text-primary">{film.director || 'TIDAK DIKETAHUI'}</div>
                  </div>
                  <div className="space-y-2">
                    <span className="font-black text-muted-foreground uppercase text-[10px] tracking-[0.3em]">Pemeran Utama</span>
                    <div className="text-sm font-bold leading-relaxed">
                      {film.cast?.join(', ') || 'TIDAK DIKETAHUI'}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="font-black text-muted-foreground uppercase text-[10px] tracking-[0.3em]">Bahasa</span>
                    <div className="text-xl font-black">{film.language || 'ENGLISH'}</div>
                  </div>
                  <div className="space-y-2">
                    <span className="font-black text-muted-foreground uppercase text-[10px] tracking-[0.3em]">Rating Global</span>
                    <div className="text-3xl font-black text-accent flex items-center gap-2">
                      ★ {film.rating || '8.5'}
                      <span className="text-sm text-muted-foreground font-bold">/ 10</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="font-black text-muted-foreground uppercase text-[10px] tracking-[0.3em]">Waktu Rilis</span>
                    <div className="text-xl font-black">{new Date(film.release_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}</div>
                  </div>
                  <div className="space-y-2">
                    <span className="font-black text-muted-foreground uppercase text-[10px] tracking-[0.3em]">Format</span>
                    <div className="flex flex-wrap gap-2">
                      {(film.format || ['DOLBY', 'IMAX']).map((fmt) => (
                        <Badge key={fmt} className="bg-muted text-muted-foreground font-black rounded-lg">{fmt}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full h-20 rounded-[2rem] bg-primary text-white hover:bg-primary/90 duo-border border-black font-black text-xl uppercase tracking-widest shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] active:scale-95 transition-all group">
                    <Plus className="mr-3 h-6 w-6 group-hover:rotate-90 transition-transform" />
                    TAMBAH KE DAFTAR TONTON
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-3xl duo-border border-muted p-8">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-black tracking-tighter">PILIH DAFTAR TONTON</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-6">
                    {!user ? (
                      <div className="text-center py-4">
                        <p className="font-bold mb-4">Silakan masuk untuk mengelola daftar tonton</p>
                        <Button asChild className="w-full rounded-xl bg-accent text-black font-black uppercase tracking-widest">
                          <Link to="/login">Masuk Sekarang</Link>
                        </Button>
                      </div>
                    ) : watchlists?.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="font-bold mb-4">Anda belum memiliki daftar tonton</p>
                        <Button asChild className="w-full rounded-xl bg-accent text-black font-black uppercase tracking-widest">
                          <Link to="/dashboard">Buat Daftar Baru</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="grid gap-3">
                        {watchlists?.map((list) => (
                          <Button
                            key={list.id}
                            variant="outline"
                            className="h-16 rounded-xl duo-border border-muted hover:border-primary justify-between px-6 group"
                            onClick={() => addToWatchlistMutation.mutate(list.id)}
                            disabled={addToWatchlistMutation.isPending}
                          >
                            <span className="font-black text-lg">{list.name}</span>
                            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" />
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              
              <div className="mt-8 p-10 rounded-[2.5rem] bg-accent/10 border-4 border-accent/20 text-center relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                <p className="font-black text-accent-foreground text-2xl mb-3 tracking-tighter">TIPS KRITIKUS PRO</p>
                <p className="text-sm font-bold text-accent-foreground/70 leading-relaxed uppercase tracking-wider">
                  Ulasan mendetail memberi Anda lencana "Kritikus Elit" dan meningkatkan visibilitas profil Anda!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}