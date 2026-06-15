export interface Chapter {
  chapter_number: number;
  name: string;
  name_meaning: string;
  chapter_summary: string;
  verses_count: number;
  verse_numbers: string[];
}

export interface Verse {
  text: string;           // Sanskrit
  meaning: string;        // English translation
  word_meanings?: string; // "word—meaning; word2—meaning2" format
  transliteration?: string;
  verse_number?: string;
}

export interface GitaData {
  chapters: Record<string, Chapter>;
  verses: Record<string, Record<string, Verse>>;
}
