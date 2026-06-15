import { getChapterAndVerse, relevantDailyShlokaIds } from "../utils";

const gita = require("../public/gita_english.json");
export const shloka = {
  getDailyShloka: () => {
    try {
      let today = new Date();
      let startOfYear = new Date(today.getFullYear(), 0, 0);
      const diff = today.getTime() - startOfYear.getTime();
      let oneDay = 1000 * 60 * 60 * 24;
      let dayOfYear = Math.floor(diff / oneDay);
      let todaysIndex = dayOfYear % relevantDailyShlokaIds.length;
      const globalVerseId = relevantDailyShlokaIds[todaysIndex]!;
      const location = getChapterAndVerse(globalVerseId);

      const chapterNumber = location?.chapter?.toString()!;
      const verseNumber = location?.verse?.toString()!;

      const shloka = gita.verses[chapterNumber][verseNumber];

      return shloka;
    } catch (e) {
      console.log(e);
    }
  },
};
