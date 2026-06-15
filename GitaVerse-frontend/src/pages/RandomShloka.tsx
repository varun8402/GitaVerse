import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { IconRefresh, IconSparkles, IconArrowRight } from '@tabler/icons-react';
import type { GitaData } from '../types/gita';

interface PickedVerse {
  chapterNumber: number;
  chapterName: string;
  chapterNameMeaning: string;
  verseNumber: string;
  text: string;
  meaning: string;
}

const pickRandom = (gitaData: GitaData): PickedVerse => {
  const chapterKeys = Object.keys(gitaData.chapters);
  const chapterKey = chapterKeys[Math.floor(Math.random() * chapterKeys.length)];
  const chapter = gitaData.chapters[chapterKey];
  const verseKeys = Object.keys(gitaData.verses[chapterKey] ?? {});
  const verseKey = verseKeys[Math.floor(Math.random() * verseKeys.length)];
  const verse = gitaData.verses[chapterKey][verseKey];
  return {
    chapterNumber: chapter.chapter_number,
    chapterName: chapter.name,
    chapterNameMeaning: chapter.name_meaning,
    verseNumber: verseKey,
    text: verse.text,
    meaning: verse.meaning,
  };
};

const RandomShloka = () => {
  const navigate = useNavigate();
  const [gitaData, setGitaData] = useState<GitaData | null>(null);
  const [shloka, setShloka] = useState<PickedVerse | null>(null);
  const [key, setKey] = useState(0); // forces AnimatePresence to re-animate

  useEffect(() => {
    fetch('/dataset_english.json')
      .then((r) => r.json())
      .then((data: GitaData) => setGitaData(data))
      .catch(console.error);
  }, []);

  const reveal = useCallback(() => {
    if (!gitaData) return;
    setShloka(pickRandom(gitaData));
    setKey((k) => k + 1);
  }, [gitaData]);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative bg-no-repeat bg-cover bg-center bg-[url('https://res.cloudinary.com/dwdsw96fy/image/upload/v1756488860/fd99f5c4-af20-41ca-bcf4-66a0f148a118.png')] dark:bg-[url('https://res.cloudinary.com/dwdsw96fy/image/upload/v1781519684/c619d388-aaa6-40c1-a8c2-9b34af25d6d9_ayohqg.png')]"
    >
      <div className="absolute inset-0 bg-black/65 z-0" />

      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full px-6 py-24 gap-8">

        {/* Title */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2  animated fadeInUp duration-300">
            <IconSparkles size={22} className="text-amber-400" />
            <h1 className="text-3xl font-semibold text-white font-[Hind]">Unfold a Shloka</h1>
            <IconSparkles size={22} className="text-amber-400" />
          </div>
          <p className="text-white/50 text-sm font-[Hind  animated fadeInUp duration-500">
            Let destiny guide you to a verse. Timeless wisdom awaits.
          </p>
        </div>

        {/* Card */}
        <div className="w-full min-h-[240px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {shloka ? (
              <motion.div
                key={key}
                className="w-full bg-black/40 backdrop-blur-md border border-amber-500/20 rounded-2xl p-8 flex flex-col gap-6"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="text-xs text-amber-400 border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded-full font-[Hind]">
                    Chapter {shloka.chapterNumber} · Verse {shloka.verseNumber}
                  </span>
                  <p className="text-white/30 text-xs font-[Hind] mt-1">
                    {shloka.chapterName} — {shloka.chapterNameMeaning}
                  </p>
                </motion.div>

                {/* Sanskrit */}
                <motion.div
                  className="border-l-2 border-amber-500/40 pl-4"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18, duration: 0.4 }}
                >
                  <p className="text-white/90 text-lg leading-relaxed font-[Hind] italic whitespace-pre-line">
                    {shloka.text}
                  </p>
                </motion.div>

                {/* Divider */}
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, scaleX: 0.3 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.28, duration: 0.4 }}
                >
                  <div className="flex-1 h-px bg-amber-500/15" />
                  <span className="text-amber-500/40 text-sm">✦</span>
                  <div className="flex-1 h-px bg-amber-500/15" />
                </motion.div>

                {/* Translation */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34, duration: 0.4 }}
                >
                  <h3 className="text-amber-400/60 text-xs uppercase tracking-widest mb-2 font-[Hind]">
                    Translation
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed font-[Hind]">
                    {shloka.meaning}
                  </p>
                </motion.div>

                {/* Read verse link */}
                <motion.button
                  onClick={() => navigate(`/browse/chapter/${shloka.chapterNumber}/verse/${shloka.verseNumber}`)}
                  className="flex items-center gap-1.5 text-xs text-amber-400/70 hover:text-amber-400 font-[Hind] transition-colors cursor-pointer w-fit mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.42 }}
                  whileHover={{ x: 3 }}
                >
                  Read full verse <IconArrowRight size={13} />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                className="w-full border border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center gap-3 text-white/25"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <IconSparkles size={32} className="text-amber-500/20" />
                <p className="text-sm font-[Hind]">
                  {gitaData ? 'Click the button below to reveal a shloka' : 'Loading…'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Button */}
        <motion.button
          onClick={reveal}
          disabled={!gitaData}
          className="flex items-center gap-2 px-8 py-3 rounded-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/30 text-white font-[Hind] font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-amber-500/20"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <IconRefresh size={17} className={!gitaData ? 'animate-spin' : ''} />
          {shloka ? 'Another Shloka' : 'Reveal a Shloka'}
        </motion.button>

      </div>
    </div>
  );
};

export default RandomShloka;
