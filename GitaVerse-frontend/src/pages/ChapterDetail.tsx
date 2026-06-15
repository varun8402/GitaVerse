import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, type Variants } from 'motion/react';
import { IconArrowLeft, IconArrowRight, IconChevronLeft } from '@tabler/icons-react';
import type { GitaData, Chapter } from '../types/gita';
import { gitaChapterImages } from '../utils';
import Footer from '../components/Footer';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

const ChapterDetail = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const [gitaData, setGitaData] = useState<GitaData | null>(null);

  useEffect(() => {
    fetch('/dataset_english.json')
      .then((r) => r.json())
      .then((data: GitaData) => setGitaData(data))
      .catch(console.error);
  }, []);

  if (!gitaData) {
    return (
      <div className="min-h-screen flex flex-col gap-6 px-6 md:px-20 pt-32">
        <div className="flex gap-8">
          <div className="flex-1 flex flex-col gap-4">
            <div className="h-5 w-24 rounded bg-gray-100 animate-pulse" />
            <div className="h-10 w-64 rounded-xl bg-gray-100 animate-pulse" />
            <div className="h-4 w-40 rounded bg-gray-100 animate-pulse" />
            <div className="h-24 w-full rounded-xl bg-gray-100 animate-pulse" />
          </div>
          <div className="w-72 h-80 rounded-2xl bg-gray-100 animate-pulse hidden md:block" />
        </div>
      </div>
    );
  }

  const chapter: Chapter | undefined = gitaData.chapters[chapterId!];
  if (!chapter) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 font-[Hind]">Chapter not found.</p>
        <Link to="/browse" className="text-amber-500 text-sm font-[Hind] underline underline-offset-2">
          Back to Browse
        </Link>
      </div>
    );
  }

  const chapterImg = gitaChapterImages[(chapter.chapter_number - 1) % gitaChapterImages.length];
  const prevChapter = chapter.chapter_number > 1 ? chapter.chapter_number - 1 : null;
  const nextChapter = chapter.chapter_number < 18 ? chapter.chapter_number + 1 : null;

  return (
    <motion.div
      className="min-h-screen w-full bg-white dark:bg-zinc-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 pt-24 pb-16 flex flex-col gap-12">

        {/* ── Breadcrumb + chapter nav ── */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => navigate('/browse')}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-[Hind] cursor-pointer"
          >
            <IconChevronLeft size={15} />
            All Chapters
          </button>
          <div className="flex items-center gap-4">
            {prevChapter && (
              <button
                onClick={() => navigate(`/browse/chapter/${prevChapter}`)}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-amber-600 transition-colors font-[Hind] cursor-pointer"
              >
                <IconArrowLeft size={13} /> Ch. {prevChapter}
              </button>
            )}
            <span className="text-xs text-gray-300 font-[Hind]">{chapter.chapter_number} / 18</span>
            {nextChapter && (
              <button
                onClick={() => navigate(`/browse/chapter/${nextChapter}`)}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-amber-600 transition-colors font-[Hind] cursor-pointer"
              >
                Ch. {nextChapter} <IconArrowRight size={13} />
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Hero: info left + image right ── */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Left — chapter info */}
          <motion.div
            className="flex-1 flex flex-col gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.span variants={fadeUp} className="text-xs text-amber-600 font-[Hind] uppercase tracking-widest">
              Chapter {chapter.chapter_number}
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl font-semibold font-[Hind] leading-tight text-gray-900 dark:text-white">
              {chapter.name}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base text-gray-400 dark:text-zinc-400 font-[Hind]">
              {chapter.name_meaning}
            </motion.p>
            <motion.div variants={fadeUp} className="w-10 h-0.5 bg-amber-500/50" />
            <motion.p variants={fadeUp} className="text-sm text-gray-500 dark:text-zinc-400 font-[Hind] leading-relaxed">
              {chapter.chapter_summary}
            </motion.p>
            <motion.span variants={fadeUp} className="text-xs text-gray-300 dark:text-zinc-500 font-[Hind]">
              {chapter.verses_count} verses
            </motion.span>
          </motion.div>

          {/* Right — chapter image */}
          <motion.div
            className="w-full md:w-72 shrink-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          >
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-zinc-700">
              <motion.img
                src={chapterImg}
                alt={`Chapter ${chapter.chapter_number} — ${chapter.name}`}
                className="w-full h-72 object-cover"
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        </div>

        {/* ── Verse number grid ── */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-baseline gap-3 border-b border-gray-100 dark:border-zinc-700 pb-3">
            <h2 className="text-lg font-semibold font-[Hind] text-gray-800 dark:text-white">Verses</h2>
            <span className="text-xs text-gray-400 dark:text-zinc-500 font-[Hind]">{chapter.verses_count} total</span>
          </div>
          <motion.div
            className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {chapter.verse_numbers.map((vNum) => (
              <motion.button
                key={vNum}
                variants={staggerItem}
                whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.94 }}
                onClick={() => navigate(`/browse/chapter/${chapter.chapter_number}/verse/${vNum}`)}
                className="aspect-square flex items-center justify-center rounded-lg border border-gray-100 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 hover:border-amber-500/40 hover:bg-amber-500/8 text-sm font-medium font-[Hind] text-gray-500 dark:text-zinc-400 hover:text-amber-700 transition-colors duration-150 cursor-pointer"
              >
                {vNum}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Verse list ── */}
        <motion.div
          className="flex flex-col gap-3 pb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold font-[Hind] text-gray-800 dark:text-white border-b border-gray-100 dark:border-zinc-700 pb-3">
            All Verses
          </h2>
          <motion.div
            className="flex flex-col gap-2"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {chapter.verse_numbers.map((vNum) => {
              const verse = gitaData.verses[String(chapter.chapter_number)]?.[vNum];
              if (!verse) return null;
              return (
                <motion.div key={vNum} variants={staggerItem}>
                  <Link
                    to={`/browse/chapter/${chapter.chapter_number}/verse/${vNum}`}
                    className="group flex items-start gap-4 px-5 py-4 rounded-xl border border-gray-100 dark:border-zinc-700 hover:border-amber-500/30 hover:bg-amber-500/5 dark:hover:bg-amber-500/10 transition-all duration-200"
                  >
                    <span className="shrink-0 mt-0.5 text-xs font-medium text-amber-500/70 font-[Hind] tabular-nums w-10">
                      {chapter.chapter_number}.{vNum}
                    </span>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <p className="text-xs text-gray-400 dark:text-zinc-500 font-[Hind] leading-relaxed line-clamp-1">
                        {verse.text}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-zinc-300 font-[Hind] leading-relaxed line-clamp-2 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {verse.meaning}
                      </p>
                    </div>
                    <IconArrowRight
                      size={14}
                      className="shrink-0 mt-1 text-gray-200 group-hover:text-amber-400 transition-colors ml-auto"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

      </div>
    <Footer />
    </motion.div>
    
  );
};

export default ChapterDetail;
