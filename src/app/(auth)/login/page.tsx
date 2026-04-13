import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.data.token, data.data);
      toast.success('Masuk berhasil!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Gagal masuk');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md rounded-3xl duo-border border-muted shadow-xl overflow-hidden">
        <CardHeader className="space-y-1 bg-muted/30 p-8 border-b-2 border-muted">
          <CardTitle className="text-3xl font-black tracking-tighter">MASUK</CardTitle>
          <CardDescription className="font-bold">Masukkan email dan kata sandi Anda untuk mengakses akun</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-black uppercase tracking-widest text-xs">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required className="rounded-xl duo-border border-muted focus:border-primary font-bold" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-black uppercase tracking-widest text-xs">Kata Sandi</Label>
              <Input id="password" name="password" type="password" required className="rounded-xl duo-border border-muted focus:border-primary font-bold" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-8 pt-0">
            <Button type="submit" className="w-full h-14 rounded-xl bg-accent text-black hover:bg-accent/90 duo-border border-black font-black uppercase tracking-widest" disabled={isLoading}>
              {isLoading ? 'Sedang masuk...' : 'Masuk'}
            </Button>
            <p className="text-center text-sm font-bold text-muted-foreground">
              Belum punya akun?{' '}
              <Button variant="link" className="p-0 font-black text-primary" onClick={() => navigate('/register')}>
                Daftar
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
