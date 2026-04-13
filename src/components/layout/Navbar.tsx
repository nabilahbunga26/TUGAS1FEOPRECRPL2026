import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Film, LogOut, User, LayoutDashboard, Settings, Search, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Genre } from '@/types';

import { motion } from 'motion/react';

import { Logo } from './Logo';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { data: genres } = useQuery<Genre[]>({
    queryKey: ['genres'],
    queryFn: async () => {
      const { data } = await api.get('/genres');
      return data.data;
    },
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      navigate(`/#${id}`);
      // The scroll will happen after navigation due to the hash
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b-2 border-muted">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <Logo size={48} className="group-hover:rotate-6 transition-transform" />
            <span className="text-2xl font-black tracking-tight pr-1">CINEPLAY</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <ul className="hList">
              <li>
                <div className="menu" onClick={() => navigate('/')}>
                  <h2 className="menu-title">Beranda</h2>
                  <ul className="menu-dropdown">
                    <li onClick={(e) => { e.stopPropagation(); scrollToSection('utama'); }}>Utama</li>
                    <li onClick={(e) => { e.stopPropagation(); scrollToSection('visi'); }}>Visi Kami</li>
                    <li onClick={(e) => { e.stopPropagation(); scrollToSection('komunitas'); }}>Komunitas</li>
                    <li onClick={(e) => { e.stopPropagation(); scrollToSection('sejarah'); }}>Sejarah</li>
                    <li onClick={(e) => { e.stopPropagation(); scrollToSection('nilai'); }}>Nilai Inti</li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="menu" onClick={() => navigate('/films')}>
                  <h2 className="menu-title menu-title_2nd">Film</h2>
                  <ul className="menu-dropdown">
                    <li onClick={(e) => { e.stopPropagation(); navigate('/films'); }}>Semua Film</li>
                    <li onClick={(e) => { e.stopPropagation(); navigate('/films?sort=trending'); }}>Trending</li>
                    <li onClick={(e) => { e.stopPropagation(); navigate('/films?sort=newest'); }}>Terbaru</li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="menu" onClick={() => navigate('/genres')}>
                  <h2 className="menu-title menu-title_3rd">Kategori</h2>
                  <ul className="menu-dropdown">
                    <li onClick={(e) => { e.stopPropagation(); navigate('/genres'); }}>Semua Kategori</li>
                    {genres?.slice(0, 8).map((genre) => (
                      <li key={genre.id} onClick={(e) => { e.stopPropagation(); navigate(`/genres/${genre.id}`); }}>
                        {genre.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="relative h-12 w-12 rounded-xl duo-border border-muted hover:border-primary p-0">
                    <User className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 p-2 rounded-xl duo-border border-muted" align="end">
                  <DropdownMenuLabel className="font-black px-4 py-2">
                    <p className="text-sm leading-none">{user.name}</p>
                    <p className="text-xs font-bold text-muted-foreground mt-1">{user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                      <Link to={`/users/${user.id}`} className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span className="font-bold">Profil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                      <Link to="/dashboard" className="flex items-center w-full">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span className="font-bold">Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    {user.role === 'Admin' && (
                      <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                        <Link to="/admin/genres" className="flex items-center w-full">
                          <Settings className="mr-2 h-4 w-4" />
                          <span className="font-bold">Panel Admin</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="rounded-lg cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="font-bold">Keluar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild className="font-black uppercase tracking-widest text-xs">
                <Link to="/login">Masuk</Link>
              </Button>
              <Button asChild className="bg-accent text-black hover:bg-accent/90 duo-border border-black font-black uppercase tracking-widest text-xs rounded-xl px-6">
                <Link to="/register">Daftar</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
