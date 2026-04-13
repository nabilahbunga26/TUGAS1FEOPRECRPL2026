import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { User, FilmList } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, User as UserIcon, Film as FilmIcon, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

export default function UserProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: profile, isLoading: isProfileLoading } = useQuery<User>({
    queryKey: ['user-profile', id],
    queryFn: async () => {
      const { data } = await api.get(`/users/${id}`);
      return data.data;
    },
  });

  const { data: publicLists, isLoading: isListsLoading } = useQuery<FilmList[]>({
    queryKey: ['user-lists', id],
    queryFn: async () => {
      const { data } = await api.get(`/users/${id}/film-lists`);
      return data.data;
    },
  });

  if (isProfileLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black tracking-tighter">PENGGUNA TIDAK DITEMUKAN</h1>
      </div>
    );
  }

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
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-[2rem] bg-accent duo-border border-black shadow-xl">
            <UserIcon className="h-16 w-16 text-black" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter mb-2">{profile.name.toUpperCase()}</h1>
          <Badge className="bg-muted text-muted-foreground font-black uppercase tracking-[0.2em] text-xs px-6 py-2 rounded-xl">
            {profile.role}
          </Badge>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-3 h-10 bg-primary rounded-full" />
            <h2 className="text-4xl font-black tracking-tighter">DAFTAR TONTON PUBLIK</h2>
          </div>
          
          {isListsLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : publicLists?.length === 0 ? (
            <div className="text-center py-20 bg-muted/10 rounded-[2.5rem] duo-border border-muted border-dashed">
              <p className="text-xl text-muted-foreground font-black uppercase tracking-widest">
                Pengguna ini belum membagikan daftar tonton publik.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {publicLists?.map((list) => (
                <Card key={list.id} className="rounded-[2.5rem] duo-border border-muted overflow-hidden bg-white hover:border-primary transition-all group shadow-md">
                  <CardHeader className="p-8 border-b-2 border-muted bg-muted/20">
                    <CardTitle className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{list.name}</CardTitle>
                    <CardDescription className="font-bold uppercase tracking-widest text-xs">{list.films?.length || 0} film</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="flex flex-wrap gap-3">
                      {list.films?.slice(0, 3).map((film) => (
                        <div key={film.id} className="flex items-center gap-2 rounded-xl bg-muted/50 p-3 text-xs font-bold duo-border border-muted">
                          <FilmIcon className="h-4 w-4 text-primary" />
                          <span className="line-clamp-1">{film.title}</span>
                        </div>
                      ))}
                      {(list.films?.length || 0) > 3 && (
                        <div className="flex items-center justify-center px-4 rounded-xl bg-primary/10 text-primary font-black text-xs duo-border border-primary/20">
                          +{(list.films?.length || 0) - 3} lagi
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
