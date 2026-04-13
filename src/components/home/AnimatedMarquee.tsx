import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const images = [
  'https://m.media-amazon.com/images/M/MV5BMTM0MjUzNjkwMl5BMl5BanBnXkFtZTcwNjY0OTk1Mw@@._V1_.jpg',
  'https://play-lh.googleusercontent.com/R17n61if6c2Wc7TLcR43Fe7BV3n8JA1kJG8Gmvaa0-wK-rfoVn9jdP-apKeeHnsUNqDz=w240-h480-rw',
  'https://m.media-amazon.com/images/S/pv-target-images/22b7552b329aa7d1718ef2be6f046637d3dfebc9e1f972c38b90abc1fb1ef489.jpg',
  'https://upload.wikimedia.org/wikipedia/id/8/81/ShawshankRedemptionMoviePoster.jpg',
  'http://www.blackxperience.com/assets/content/blackattitude/blackstyle/poster-film-the-matrix-1999.jpg',
  'https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_.jpg',
  'https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg',
  'https://awsimages.detik.net.id/community/media/visual/2024/11/12/poster-film-gladiator-2_34.jpeg?w=650&q=90',
  'https://asset.kompas.com/crops/DjmyQWcXltOoA--p664iWhFHkjU=/182x94:1834x1195/1200x800/data/photo/2019/03/18/2127080686.jpg'
];

const AnimatedImage = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[12vw] h-[16vw] md:w-[10vw] md:h-[14vw] mx-[2vw] overflow-hidden rounded-2xl duo-border border-black bg-zinc-900 shrink-0">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
    </div>
  );
};

export const AnimatedMarquee = () => {
  return (
    <section className="py-12 bg-accent overflow-hidden border-y-4 border-black">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex items-center"
        >
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-[12vw] md:text-[10vw] font-black tracking-tighter text-black leading-none">
                CINE
              </span>
              <AnimatedImage />
              <span className="text-[12vw] md:text-[10vw] font-black tracking-tighter text-black leading-none">
                PLAY
              </span>
              <AnimatedImage />
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
