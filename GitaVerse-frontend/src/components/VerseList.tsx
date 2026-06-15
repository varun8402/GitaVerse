import { useState } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import type { Chapter, Verse } from '../types/gita';

interface VerseListProps {
  chapter: Chapter;
  verses: Record<string, Verse>;
}

const VerseItem = ({
  verseNumber,
  chapterNumber,
  verse,
}: {
  verseNumber: string;
  chapterNumber: number;
  verse: Verse;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`border rounded-xl transition-all duration-200 ${
        expanded
          ? 'border-amber-500/30 bg-amber-500/5'
          : 'border-gray-200/10 bg-white/3 hover:border-gray-200/20'
      }`}
    >
      {/* Header row — always visible */}
      <button
        className="w-full flex items-center justify-between px-5 py-4 cursor-pointer text-left"
        onClick={() => setExpanded((p) => !p)}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs text-amber-500/70 font-[Hind] font-medium tabular-nums w-14 shrink-0">
            {chapterNumber}.{verseNumber}
          </span>
          <p className="text-sm text-gray-600 font-[Hind] line-clamp-1 leading-snug">
            {verse.meaning}
          </p>
        </div>
        <span className="ml-4 shrink-0 text-gray-400">
          {expanded ? <IconChevronUp size={15} /> : <IconChevronDown size={15} />}
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 flex flex-col gap-4 border-t border-gray-200/10 pt-4">
          {/* Sanskrit */}
          <p className="text-base text-gray-700 font-[Hind] leading-relaxed whitespace-pre-line">
            {verse.text}
          </p>
          {/* Divider */}
          <div className="w-8 h-px bg-amber-500/30" />
          {/* Meaning */}
          <p className="text-sm text-gray-500 font-[Hind] leading-relaxed">
            {verse.meaning}
          </p>
        </div>
      )}
    </div>
  );
};

const VerseList = ({ chapter, verses }: VerseListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Chapter header */}
      <div className="flex flex-col gap-1 pb-4 border-b border-gray-200/10">
        <div className="flex items-baseline gap-3">
          <span className="text-xs text-amber-500/60 font-[Hind] uppercase tracking-widest">
            Chapter {chapter.chapter_number}
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 font-[Hind]">
          {chapter.name}
          <span className="ml-2 text-base font-normal text-gray-400">— {chapter.name_meaning}</span>
        </h2>
        <p className="text-sm text-gray-400 font-[Hind] leading-relaxed mt-1 line-clamp-3">
          {chapter.chapter_summary}
        </p>
        <span className="text-xs text-gray-400 font-[Hind] mt-1">
          {chapter.verses_count} verses
        </span>
      </div>

      {/* Verses */}
      <div className="flex flex-col gap-2">
        {chapter.verse_numbers.map((vNum) => {
          const verse = verses[vNum];
          if (!verse) return null;
          return (
            <VerseItem
              key={vNum}
              verseNumber={vNum}
              chapterNumber={chapter.chapter_number}
              verse={verse}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VerseList;
