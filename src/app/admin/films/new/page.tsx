import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Genre } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminNewFilmPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const { data: genres } = useQuery<Genre[]>({
    queryKey: ['genres'],
    queryFn: async () => {
      const { data } = await api.get('/genres');
      return data.data;
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const filmData = {
      title: formData.get('title'),
      description: formData.get('description'),
      release_date: formData.get('release_date'),
      poster_url: formData.get('poster_url'),
      genre_id: formData.get('genre_id'),
    };

    try {
      await api.post('/films', filmData);
      toast.success('Film berhasil ditambahkan!');
      navigate('/films');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gagal menambahkan film');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto max-w-3xl px-6">
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
        <Card className="rounded-[2.5rem] duo-border border-muted overflow-hidden bg-white shadow-2xl">
          <CardHeader className="bg-muted/30 p-10 border-b-2 border-muted">
            <CardTitle className="text-4xl font-black tracking-tighter">TAMBAH FILM BARU</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-8 p-10">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-black uppercase tracking-widest text-xs">Judul</Label>
                <Input id="title" name="title" placeholder="Judul film" required className="h-14 rounded-xl duo-border border-muted focus:border-primary font-bold text-lg" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genre_id" className="font-black uppercase tracking-widest text-xs">Kategori</Label>
                <Select name="genre_id" required>
                  <SelectTrigger className="h-14 rounded-xl duo-border border-muted focus:border-primary font-bold text-lg">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl duo-border border-muted">
                    {genres?.map((genre) => (
                      <SelectItem key={genre.id} value={genre.id} className="font-bold">
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="release_date" className="font-black uppercase tracking-widest text-xs">Tanggal Rilis</Label>
                  <Input id="release_date" name="release_date" type="date" required className="h-14 rounded-xl duo-border border-muted focus:border-primary font-bold" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="poster_url" className="font-black uppercase tracking-widest text-xs">URL Poster</Label>
                  <Input id="poster_url" name="poster_url" type="url" placeholder="https://..." required className="h-14 rounded-xl duo-border border-muted focus:border-primary font-bold" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="font-black uppercase tracking-widest text-xs">Deskripsi</Label>
                <Textarea id="description" name="description" placeholder="Sinopsis film..." className="min-h-[200px] rounded-xl duo-border border-muted focus:border-primary font-bold text-lg p-6" required />
              </div>
            </CardContent>
            <div className="p-10 pt-0">
              <Button type="submit" className="w-full h-16 rounded-2xl bg-accent text-black hover:bg-accent/90 duo-border border-black font-black uppercase tracking-widest text-lg" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Tambah Film'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
