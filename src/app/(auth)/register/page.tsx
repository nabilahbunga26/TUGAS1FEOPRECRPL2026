import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const display_name = formData.get('display_name');
    const bio = formData.get('bio');

    try {
      await api.post('/auth/register', { username, email, password, display_name, bio });
      toast.success('Pendaftaran berhasil! Silakan masuk.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Pendaftaran gagal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md rounded-3xl duo-border border-muted shadow-xl overflow-hidden">
        <CardHeader className="space-y-1 bg-muted/30 p-6 border-b-2 border-muted">
          <CardTitle className="text-3xl font-black tracking-tighter">DAFTAR</CardTitle>
          <CardDescription className="font-bold">Buat akun untuk mulai mengelola film Anda</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-1">
              <Label htmlFor="username" className="font-black uppercase tracking-widest text-xs">Username</Label>
              <Input id="username" name="username" placeholder="Masukkan username Anda" required className="rounded-xl duo-border border-muted focus:border-primary font-bold" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="font-black uppercase tracking-widest text-xs">Email</Label>
              <Input id="email" name="email" type="email" placeholder="contoh@email.com" required className="rounded-xl duo-border border-muted focus:border-primary font-bold" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="font-black uppercase tracking-widest text-xs">Kata Sandi</Label>
              <Input id="password" name="password" type="password" placeholder="Minimal 8 karakter" required minLength={8} className="rounded-xl duo-border border-muted focus:border-primary font-bold" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="display_name" className="font-black uppercase tracking-widest text-xs">Display Name</Label>
              <Input id="display_name" name="display_name" placeholder="Nama tampilan Anda" required className="rounded-xl duo-border border-muted focus:border-primary font-bold" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="bio" className="font-black uppercase tracking-widest text-xs">Bio</Label>
              <Input id="bio" name="bio" placeholder="Ceritakan sedikit tentang Anda" required className="rounded-xl duo-border border-muted focus:border-primary font-bold" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 p-6 pt-0">
            <Button type="submit" className="w-full h-12 rounded-xl bg-accent text-black hover:bg-accent/90 duo-border border-black font-black uppercase tracking-widest" disabled={isLoading}>
              {isLoading ? 'Sedang membuat akun...' : 'Daftar'}
            </Button>
            <p className="text-center text-sm font-bold text-muted-foreground">
              Sudah punya akun?{' '}
              <Button variant="link" className="p-0 font-black text-primary" onClick={() => navigate('/login')}>
                Masuk
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
