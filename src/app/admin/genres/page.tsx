import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Genre } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, Plus, Edit2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function AdminGenresPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [editingGenre, setEditingGenre] = React.useState<Genre | null>(null);
  const [newGenreName, setNewGenreName] = React.useState('');

  const [page, setPage] = React.useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery<{ data: Genre[], total: number }>({
    queryKey: ['genres-admin', page],
    queryFn: async () => {
      const { data } = await api.get(`/genres/admin?page=${page}&limit=${limit}`);
      return data;
    },
  });

  const genres = data?.data;
  const totalPages = Math.ceil((data?.total || 0) / limit);

  const addGenreMutation = useMutation({
    mutationFn: async (name: string) => {
      const { data } = await api.post('/genres', { name });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres-admin'] });
      setIsAddOpen(false);
      setNewGenreName('');
      toast.success('Kategori berhasil ditambahkan!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Gagal menambahkan kategori');
    },
  });

  const updateGenreMutation = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const { data } = await api.put(`/genres/${id}`, { name });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres-admin'] });
      setEditingGenre(null);
      toast.success('Kategori berhasil diperbarui!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Gagal memperbarui kategori');
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
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h1 className="text-5xl font-black tracking-tighter mb-2">KELOLA KATEGORI</h1>
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Tambah dan edit kategori film</p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="h-14 px-8 rounded-2xl bg-accent text-black hover:bg-accent/90 duo-border border-black font-black uppercase tracking-widest gap-3">
                <Plus className="h-5 w-5" />
                Tambah Kategori
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2rem] duo-border border-muted p-8">
              <DialogHeader>
                <DialogTitle className="text-3xl font-black tracking-tighter">TAMBAH KATEGORI BARU</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-6">
                <div className="space-y-2">
                  <Input
                    placeholder="Nama kategori (misal: Sci-Fi)"
                    className="h-14 rounded-xl duo-border border-muted focus:border-primary font-bold text-lg"
                    value={newGenreName}
                    onChange={(e) => setNewGenreName(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full h-14 rounded-xl bg-primary text-white hover:bg-primary/90 duo-border border-black font-black uppercase tracking-widest"
                  onClick={() => addGenreMutation.mutate(newGenreName)}
                  disabled={addGenreMutation.isPending || !newGenreName.trim()}
                >
                  {addGenreMutation.isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Tambah Kategori'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="rounded-[2.5rem] duo-border border-muted overflow-hidden bg-white shadow-xl">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-b-2 border-muted hover:bg-transparent">
                  <TableHead className="font-black uppercase tracking-widest text-[10px] h-16 px-8">ID</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px] h-16 px-8">Nama</TableHead>
                  <TableHead className="text-right font-black uppercase tracking-widest text-[10px] h-16 px-8">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {genres?.map((genre) => (
                  <TableRow key={genre.id} className="border-b-2 border-muted hover:bg-muted/5 transition-colors">
                    <TableCell className="font-mono text-[10px] text-muted-foreground px-8 py-6">{genre.id}</TableCell>
                    <TableCell className="px-8 py-6">
                      {editingGenre?.id === genre.id ? (
                        <Input
                          value={editingGenre.name}
                          onChange={(e) => setEditingGenre({ ...editingGenre, name: e.target.value })}
                          className="h-12 w-full max-w-[300px] rounded-xl duo-border border-primary font-bold"
                          autoFocus
                        />
                      ) : (
                        <span className="text-xl font-black tracking-tight">{genre.name}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right px-8 py-6">
                      {editingGenre?.id === genre.id ? (
                        <div className="flex justify-end gap-3">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="rounded-xl font-black uppercase tracking-widest text-[10px]"
                            onClick={() => setEditingGenre(null)}
                          >
                            Batal
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-xl bg-primary text-white font-black uppercase tracking-widest text-[10px] px-6"
                            onClick={() => updateGenreMutation.mutate(editingGenre)}
                            disabled={updateGenreMutation.isPending}
                          >
                            {updateGenreMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Simpan'}
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-12 w-12 rounded-xl hover:bg-accent transition-colors"
                          onClick={() => setEditingGenre(genre)}
                        >
                          <Edit2 className="h-5 w-5" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 p-8 border-t-2 border-muted bg-muted/10">
                <Button
                  variant="outline"
                  className="rounded-xl duo-border border-black font-black uppercase tracking-widest text-xs h-10 px-6"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Sebelumnya
                </Button>
                <span className="font-black text-sm uppercase tracking-widest">
                  Halaman {page} dari {totalPages}
                </span>
                <Button
                  variant="outline"
                  className="rounded-xl duo-border border-black font-black uppercase tracking-widest text-xs h-10 px-6"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Selanjutnya
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
