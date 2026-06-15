import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { IconArrowLeft, IconArrowRight, IconChevronLeft } from '@tabler/icons-react';
import type { GitaData, Chapter, Verse } from '../types/gita';

const parseWordMeanings = (raw: string): { word: string; meaning: string }[] => {
  return raw
    .split(';')
    .map((entry) => {
      const dashIdx = entry.indexOf('—');
      if (dashIdx === -1) return null;
      return {
        word: entry.slice(0, dashIdx).trim(),
        meaning: entry.slice(dashIdx + 1).trim(),
      };
    })
    .filter(Boolean) as { word: string; meaning: string }[];
};

const VerseDetail = () => {
  const { chapterId, verseId } = useParams<{ chapterId: string; verseId: string }>();
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
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="flex flex-col gap-4 w-full max-w-2xl px-6">
          <div className="h-8 w-48 rounded-lg bg-gray-100 animate-pulse" />
          <div className="h-32 w-full rounded-xl bg-gray-100 animate-pulse" />
          <div className="h-24 w-full rounded-xl bg-gray-100 animate-pulse" />
        </div>
      </div>
    );
  }

  const chapter: Chapter | undefined = gitaData.chapters[chapterId!];
  const verse: Verse | undefined = gitaData.verses[chapterId!]?.[verseId!];

  if (!chapter || !verse) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 font-[Hind]">Verse not found.</p>
        <Link to={`/browse/chapter/${chapterId}`} className="text-amber-500 text-sm font-[Hind] underline underline-offset-2">
          Back to Chapter
        </Link>
      </div>
    );
  }

  const verseNums = chapter.verse_numbers;
  const currentIndex = verseNums.indexOf(verseId!);
  const prevVerse = currentIndex > 0 ? verseNums[currentIndex - 1] : null;
  const nextVerse = currentIndex < verseNums.length - 1 ? verseNums[currentIndex + 1] : null;

  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${chapterId}-${verseId}`}
          className="max-w-2xl mx-auto px-6 pt-24 pb-16 flex flex-col gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* ── Breadcrumb + prev/next inline ── */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => navigate(`/browse/chapter/${chapterId}`)}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-[Hind] cursor-pointer"
            >
              <IconChevronLeft size={15} />
              Chapter {chapterId}
            </button>
            <div className="flex items-center gap-4">
              {prevVerse && (
                <button
                  onClick={() => navigate(`/browse/chapter/${chapterId}/verse/${prevVerse}`)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-amber-600 transition-colors font-[Hind] cursor-pointer"
                >
                  <IconArrowLeft size={13} /> {chapterId}.{prevVerse}
                </button>
              )}
              <span className="text-xs text-gray-300 font-[Hind]">{currentIndex + 1} / {verseNums.length}</span>
              {nextVerse && (
                <button
                  onClick={() => navigate(`/browse/chapter/${chapterId}/verse/${nextVerse}`)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-amber-600 transition-colors font-[Hind] cursor-pointer"
                >
                  {chapterId}.{nextVerse} <IconArrowRight size={13} />
                </button>
              )}
            </div>
          </motion.div>

          {/* ── Verse badge ── */}
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.35 }}
          >
            <span className="text-xs text-amber-600 border border-amber-500/30 bg-amber-500/8 px-3 py-1 rounded-full font-[Hind] w-fit">
              Chapter {chapterId} · Verse {verseId}
            </span>
            <p className="text-sm text-gray-400 dark:text-zinc-500 font-[Hind]">
              {chapter.name} — {chapter.name_meaning}
            </p>
          </motion.div>

          {/* ── Sanskrit ── */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
          >
            <span className="text-xs text-gray-300 dark:text-zinc-500 font-[Hind] uppercase tracking-widest">Sanskrit</span>
            <div className="border-l-2 border-amber-500/30 pl-5">
              <p className="text-xl text-gray-800 dark:text-zinc-100 font-[Hind] leading-relaxed whitespace-pre-line">
                {verse.text}
              </p>
            </div>
          </motion.div>

          {/* ── Divider ── */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, scaleX: 0.4 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.22, duration: 0.5, ease: 'easeOut' }}
          >
            <div className="flex-1 h-px bg-gray-100 dark:bg-zinc-700" />
            <span className="text-amber-400 text-lg">✦</span>
            <div className="flex-1 h-px bg-gray-100 dark:bg-zinc-700" />
          </motion.div>

          {/* ── Translation ── */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.4 }}
          >
            <span className="text-xs text-gray-300 dark:text-zinc-500 font-[Hind] uppercase tracking-widest">Translation</span>
            <p className="text-base text-gray-700 dark:text-zinc-300 font-[Hind] leading-relaxed">{verse.meaning}</p>
          </motion.div>

          {/* ── Word meanings ── */}
          {verse.word_meanings && (() => {
            const words = parseWordMeanings(verse.word_meanings);
            if (!words.length) return null;
            const mid = Math.ceil(words.length / 2);
            const left = words.slice(0, mid);
            const right = words.slice(mid);
            return (
              <motion.div
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.4 }}
              >
                <span className="text-xs text-gray-300 dark:text-zinc-500 font-[Hind] uppercase tracking-widest">Word Meanings</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
                  <div>
                    {left.map((w, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 py-3 border-b border-gray-50 dark:border-zinc-800 last:border-0"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.36 + i * 0.04, duration: 0.3 }}
                      >
                        <span className="text-sm italic text-amber-700/80 dark:text-amber-400/80 font-[Hind] shrink-0 min-w-[100px]">{w.word}</span>
                        <span className="text-gray-300 dark:text-zinc-600 text-sm shrink-0 mt-0.5">—</span>
                        <span className="text-sm text-gray-500 dark:text-zinc-400 font-[Hind] leading-relaxed">{w.meaning}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div>
                    {right.map((w, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0 dark:border-zinc-800 "
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.36 + i * 0.04, duration: 0.3 }}
                      >
                        <span className="text-sm italic text-amber-700/80 dark:text-amber-400/80 font-[Hind] shrink-0 min-w-[100px]">{w.word}</span>
                        <span className="text-gray-300 text-sm shrink-0 mt-0.5 ">—</span>
                        <span className="text-sm text-gray-500 font-[Hind] leading-relaxed dark:text-zinc-400">{w.meaning}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {/* ── Bottom nav ── */}
          <motion.div
            className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-zinc-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38, duration: 0.4 }}
          >
            {prevVerse ? (
              <motion.button whileHover={{ x: -3 }}
                onClick={() => navigate(`/browse/chapter/${chapterId}/verse/${prevVerse}`)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-[Hind] cursor-pointer transition-colors"
              >
                <IconArrowLeft size={15} /> Verse {chapterId}.{prevVerse}
              </motion.button>
            ) : (
              <motion.button whileHover={{ x: -3 }}
                onClick={() => navigate(`/browse/chapter/${chapterId}`)}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-amber-600 font-[Hind] cursor-pointer transition-colors"
              >
                <IconChevronLeft size={15} /> Back to chapter
              </motion.button>
            )}
            {nextVerse ? (
              <motion.button whileHover={{ x: 3 }}
                onClick={() => navigate(`/browse/chapter/${chapterId}/verse/${nextVerse}`)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-[Hind] cursor-pointer transition-colors"
              >
                Verse {chapterId}.{nextVerse} <IconArrowRight size={15} />
              </motion.button>
            ) : (
              <motion.button whileHover={{ x: 3 }}
                onClick={() => navigate(`/browse/chapter/${Number(chapterId) + 1 <= 18 ? Number(chapterId) + 1 : chapterId}`)}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-amber-600 font-[Hind] cursor-pointer transition-colors"
              >
                Next chapter <IconArrowRight size={15} />
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default VerseDetail;
