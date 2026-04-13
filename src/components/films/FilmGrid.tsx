import React from 'react';
import { Film } from '../../types';
import { FilmCard } from './FilmCard';

interface FilmGridProps {
  films: Film[];
}

import { motion } from 'motion/react';

export const FilmGrid: React.FC<FilmGridProps> = ({ films }) => {
  return (
    <motion.div 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {films.map((film, index) => (
        <FilmCard key={film.id} film={film} index={index} />
      ))}
    </motion.div>
  );
};
