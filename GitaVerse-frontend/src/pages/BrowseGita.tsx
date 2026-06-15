import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ThreeDCardDemo } from '../components/3dCard';
import Footer from '../components/Footer';
import type { Chapter, GitaData } from '../types/gita';
import { gitaChapterImages } from '../utils';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

const BrowseGita = () => {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    fetch('/dataset_english.json')
      .then((r) => r.json())
      .then((data: GitaData) => {
        const sorted = Object.values(data.chapters).sort(
          (a, b) => a.chapter_number - b.chapter_number
        );
        setChapters(sorted);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col dark:bg-zinc-900">

      {/* ── Hero header ── */}
      <motion.div
        className="flex flex-col gap-4 px-20 pt-28 pb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h1 className="text-4xl font-bold dark:text-white">Explore the Bhagavad Gita</h1>
        <p className="text-lg text-gray-500 dark:text-zinc-400">
          Dive into the spiritual wisdom of the Bhagavad Gita through our curated collection.
        </p>
      </motion.div>

      {/* ── Chapters grid ── */}
      <div className="px-8 md:px-20 pb-20 pt-12 flex flex-col gap-6">

        <motion.div
          className="flex flex-col gap-1"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <span className="text-xs text-amber-600 font-[Hind] uppercase tracking-widest">
            18 Chapters
          </span>
          <h2 className="text-2xl font-semibold font-[Hind] dark:text-white">Browse by Chapter</h2>
          <p className="text-sm text-gray-400 font-[Hind]">
            Select a chapter to explore its verses.
          </p>
        </motion.div>

        {chapters.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {chapters.map((ch) => (
              <motion.button
                key={ch.chapter_number}
                variants={cardItem}
                whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(`/browse/chapter/${ch.chapter_number}`)}
                className="group flex flex-col items-start gap-1 p-4 rounded-xl border border-gray-100 dark:border-zinc-700 bg-white/5 dark:bg-zinc-800 hover:border-amber-500/40 hover:bg-amber-500/5 text-left transition-colors duration-200 cursor-pointer"
              >
                <span className="text-xs font-medium font-[Hind] text-gray-400">
                  Ch. {ch.chapter_number}
                </span>
                <span className="text-sm font-semibold font-[Hind] leading-tight text-gray-700 dark:text-zinc-200 group-hover:text-amber-700 transition-colors">
                  {ch.name}
                </span>
                <span className="text-[11px] font-[Hind] text-gray-400">
                  {ch.verses_count} verses
                </span>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-xl border border-gray-200/10 bg-gray-100/5 animate-pulse"
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Image swiper ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Swiper
          loop
          centeredSlides
          slidesPerView={1.4}
          spaceBetween={10}
          navigation
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            1024: { slidesPerView: 2.3, spaceBetween: 12 },
          }}
          edgeSwipeDetection
          speed={800}
          className="w-full h-[700px] [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white mb-20"
        >
          {gitaChapterImages.map((link, index) => (
            <SwiperSlide key={index} className="h-[500px]">
              <ThreeDCardDemo link={link} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
      <Footer />
    </div>
  );
};

export default BrowseGita;
