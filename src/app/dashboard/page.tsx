import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { FilmList, Film } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, Plus, Film as FilmIcon, Eye, EyeOff, Trash2, User as UserIcon, Settings, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [newListName, setNewListName] = React.useState('');

  const { data: watchlists, isLoading } = useQuery<FilmList[]>({
    queryKey: ['watchlists'],
    queryFn: async () => {
      const { data } = await api.get('/film-lists');
      return data.data;
    },
  });

  const createListMutation = useMutation({
    mutationFn: async (name: string) => {
      const { data } = await api.post('/film-lists', { name, is_public: false });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlists'] });
      setIsAddOpen(false);
      setNewListName('');
      toast.success('Daftar tonton berhasil dibuat!');
    },
  });

  const toggleVisibilityMutation = useMutation({
    mutationFn: async ({ id, is_public }: { id: string; is_public: boolean }) => {
      const { data } = await api.patch(`/film-lists/${id}`, { is_public });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlists'] });
      toast.success('Visibilitas diperbarui');
    },
  });

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
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
            <span className="font-black uppercase tracking-widest">Kembali</span>
          </Button>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="rounded-3xl duo-border border-muted overflow-hidden bg-white">
              <div className="h-24 bg-accent border-b-2 border-black flex items-center justify-center">
                <div className="h-20 w-20 rounded-2xl bg-white duo-border border-black flex items-center justify-center translate-y-8">
                  <UserIcon className="h-10 w-10" />
                </div>
              </div>
              <CardContent className="pt-12 pb-6 text-center">
                <h2 className="text-2xl font-black mb-1">{user?.name}</h2>
                <p className="text-sm font-bold text-muted-foreground mb-4">{user?.email}</p>
                <Badge className="bg-accent text-black hover:bg-accent/90 duo-border border-black font-black uppercase tracking-widest text-[10px]">
                  {user?.role}
                </Badge>
              </CardContent>
            </Card>

            {user?.role === 'Admin' && (
              <Card className="rounded-3xl duo-border border-muted overflow-hidden bg-white">
                <CardHeader className="bg-muted p-4 border-b-2 border-muted">
                  <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Aksi Admin
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <Button asChild variant="ghost" className="w-full justify-start rounded-xl font-bold hover:bg-accent transition-all">
                    <Link to="/admin/genres">Kelola Kategori</Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-start rounded-xl font-bold hover:bg-accent transition-all">
                    <Link to="/admin/films/new">Tambah Film Baru</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content: Watchlists */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-black tracking-tighter">DAFTAR TONTON SAYA</h2>
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-accent text-black hover:bg-accent/90 duo-border border-black font-black uppercase tracking-widest text-xs rounded-xl px-6 h-12">
                    <Plus className="mr-2 h-4 w-4" />
                    Daftar Baru
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl duo-border border-muted">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black">BUAT DAFTAR TONTON</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label className="font-black uppercase tracking-widest text-xs">Nama Daftar</Label>
                      <Input
                        placeholder="misal: Favorit Akhir Pekan"
                        className="rounded-xl duo-border border-muted focus:border-primary font-bold"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                      />
                    </div>
                    <Button
                      className="w-full bg-accent text-black hover:bg-accent/90 duo-border border-black font-black uppercase tracking-widest rounded-xl h-12"
                      onClick={() => createListMutation.mutate(newListName)}
                      disabled={createListMutation.isPending || !newListName.trim()}
                    >
                      {createListMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Buat Daftar'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {isLoading ? (
              <div className="flex h-64 items-center justify-center bg-white rounded-3xl duo-border border-muted">
                <Loader2 className="h-12 w-12 animate-spin text-accent" />
              </div>
            ) : watchlists?.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl duo-border border-muted border-dashed">
                <FilmIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <p className="text-lg font-bold text-muted-foreground mb-4">Koleksi daftar tonton Anda kosong.</p>
                <Button onClick={() => setIsAddOpen(true)} variant="outline" className="rounded-xl duo-border border-muted font-black uppercase tracking-widest text-xs px-6">
                  Buat Daftar Pertama Anda
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {watchlists?.map((list) => (
                  <Card key={list.id} className="rounded-3xl duo-border border-muted overflow-hidden bg-white hover:border-primary transition-all">
                    <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0 border-b-2 border-muted">
                      <div>
                        <CardTitle className="text-xl font-black tracking-tight">
                          {list.name}
                        </CardTitle>
                        <CardDescription className="font-bold text-xs uppercase tracking-widest flex items-center gap-2 mt-1">
                          {list.is_public ? (
                            <span className="flex items-center gap-1 text-accent"><Eye className="h-3 w-3" /> Publik</span>
                          ) : (
                            <span className="flex items-center gap-1 text-destructive"><EyeOff className="h-3 w-3" /> Privat</span>
                          )}
                          • {list.films?.length || 0} Film
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 mr-4">
                          <Label className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Publik</Label>
                          <Switch
                            checked={list.is_public}
                            onCheckedChange={(checked) => toggleVisibilityMutation.mutate({ id: list.id, is_public: checked })}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 bg-muted/30">
                      {(list.films?.length || 0) === 0 ? (
                        <p className="text-xs font-bold text-muted-foreground italic">Belum ada film yang ditambahkan ke daftar ini.</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {list.films?.map((film) => (
                            <Link
                              key={film.id}
                              to={`/films/${film.id}`}
                              className="group relative h-24 w-16 rounded-lg overflow-hidden duo-border border-muted hover:border-primary transition-all"
                            >
                              <img
                                src={film.poster_url || 'https://picsum.photos/seed/movie/100/150'}
                                alt={film.title}
                                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Eye className="h-4 w-4 text-white" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
