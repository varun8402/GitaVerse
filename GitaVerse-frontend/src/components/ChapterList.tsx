import type { Chapter } from '../types/gita';

interface ChapterListProps {
  chapters: Chapter[];
  onSelect: (chapter: Chapter) => void;
  selectedId: number | null;
}

const ChapterList = ({ chapters, onSelect, selectedId }: ChapterListProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {chapters.map((ch) => {
        const isSelected = selectedId === ch.chapter_number;
        return (
          <button
            key={ch.chapter_number}
            onClick={() => onSelect(ch)}
            className={`group flex flex-col items-start gap-1 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'border-amber-500/60 bg-amber-500/10 text-amber-400'
                : 'border-gray-200/20 bg-white/5 hover:border-amber-500/30 hover:bg-amber-500/5 text-gray-800'
            }`}
          >
            <span
              className={`text-xs font-medium font-[Hind] ${
                isSelected ? 'text-amber-400' : 'text-gray-400'
              }`}
            >
              Ch. {ch.chapter_number}
            </span>
            <span
              className={`text-sm font-semibold font-[Hind] leading-tight ${
                isSelected ? 'text-amber-300' : 'text-gray-700'
              }`}
            >
              {ch.name}
            </span>
            <span
              className={`text-[11px] font-[Hind] ${
                isSelected ? 'text-amber-400/60' : 'text-gray-400'
              }`}
            >
              {ch.verses_count} verses
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ChapterList;
