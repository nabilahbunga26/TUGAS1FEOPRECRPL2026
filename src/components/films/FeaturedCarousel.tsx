import React from 'react';
import { Film } from '@/types';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeaturedCarouselProps {
  films: Film[];
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ films }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-black text-[#4B4B4B] flex items-center gap-3">
          <div className="w-2 h-8 bg-accent rounded-full" />
          SINEMA UNGGULAN
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl h-12 w-12 duo-border border-muted hover:border-primary transition-all"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl h-12 w-12 duo-border border-muted hover:border-primary transition-all"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {films.map((film, index) => (
          <motion.div
            key={film.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-[300px] md:w-[400px] snap-start"
          >
            <Link to={`/films/${film.id}`}>
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden duo-border border-muted group/card">
                <img
                  src={film.poster_url || 'https://picsum.photos/seed/movie/800/450'}
                  alt={film.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-accent text-accent-foreground px-2 py-0.5 rounded-lg font-black text-xs flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      {film.rating}
                    </div>
                    <span className="text-white/80 text-xs font-bold uppercase tracking-widest">
                      {film.genre?.name}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white leading-tight mb-1">
                    {film.title.toUpperCase()}
                  </h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
