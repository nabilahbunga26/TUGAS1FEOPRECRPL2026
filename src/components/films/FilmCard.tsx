import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

interface FilmCardProps {
  film: Film;
  index?: number;
}

export const FilmCard: React.FC<FilmCardProps> = ({ film, index = 0 }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ scale: 1.02 }}
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden duo-border border-muted hover:border-accent hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/films/${film.id}`} className="flex flex-col h-full">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={film.poster_url || 'https://picsum.photos/seed/movie/400/600'}
            alt={film.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4">
            <div className="bg-accent text-black px-2 py-1 rounded-lg font-black text-xs duo-border border-black flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              {film.rating}
            </div>
          </div>
        </div>

        <div className="p-5 space-y-2 flex-grow">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-lg font-black text-[10px] uppercase tracking-widest">
              {film.genre?.name}
            </Badge>
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              {new Date(film.release_date).getFullYear()}
            </span>
          </div>
          <h3 className="text-xl font-black leading-tight group-hover:text-accent transition-colors">
            {film.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 font-bold">
            {film.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};
