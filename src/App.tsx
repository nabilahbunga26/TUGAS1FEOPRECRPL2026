import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SplashScreen } from '@/components/layout/SplashScreen';
import { Toaster } from '@/components/ui/sonner';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

// Lazy load pages
const HomePage = React.lazy(() => import('@/app/page'));
const FilmsPage = React.lazy(() => import('@/app/films/page'));
const FilmDetailPage = React.lazy(() => import('@/app/films/[id]/page'));
const GenresPage = React.lazy(() => import('@/app/genres/page'));
const GenreDetailPage = React.lazy(() => import('@/app/genres/[id]/page'));
const LoginPage = React.lazy(() => import('@/app/(auth)/login/page'));
const RegisterPage = React.lazy(() => import('@/app/(auth)/register/page'));
const UserProfilePage = React.lazy(() => import('@/app/users/[id]/page'));
const DashboardPage = React.lazy(() => import('@/app/dashboard/page'));
const AdminGenresPage = React.lazy(() => import('@/app/admin/genres/page'));
const AdminNewFilmPage = React.lazy(() => import('@/app/admin/films/new/page'));

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: string }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return <>{children}</>;
};

function AppContent() {
  const location = useLocation();
  const [showSplash, setShowSplash] = React.useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <React.Suspense fallback={<div className="flex h-96 items-center justify-center">Loading...</div>}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/films" element={<FilmsPage />} />
                <Route path="/films/:id" element={<FilmDetailPage />} />
                <Route path="/genres" element={<GenresPage />} />
                <Route path="/genres/:id" element={<GenreDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/users/:id" element={<UserProfilePage />} />
                
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                
                <Route path="/admin/genres" element={
                  <ProtectedRoute role="Admin">
                    <AdminGenresPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/films/new" element={
                  <ProtectedRoute role="Admin">
                    <AdminNewFilmPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </React.Suspense>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <QueryProvider>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </QueryProvider>
    </HelmetProvider>
  );
}
