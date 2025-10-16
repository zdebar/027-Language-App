import practiceConstants from "@/constants/practice";
import { PracticeItem } from "@/types/data.types";

/**
 * Returns the next review date based on the progress and SRS intervals.
 */
export function getNextAt(progress: number): string | null {
  const interval = practiceConstants.SRS[progress];
  if (interval === undefined) return null;

  const randomFactor =
    1 + practiceConstants.srsRandomness * (Math.random() * 2 - 1);
  const randomizedInterval = Math.round(interval * randomFactor);
  const nextDate = new Date(Date.now() + randomizedInterval * 1000);
  return formatDateToSQLite(nextDate);
}

export function getNowDate(): string {
  return formatDateToSQLite(new Date(Date.now()));
}

/**
 * Returns the now date if the progress is equal to the argument threshold.
 */
export function getThresholdDate(
  progress: number,
  threshold: number
): string | null {
  if (progress >= threshold) {
    return formatDateToSQLite(new Date(Date.now()));
  }
  return null;
}

/**
 * Adds an audio file suffix (.opus) to a word object.
 */
export function addOpusSuffix(audio: string | null): string | null {
  return audio ? `${audio}.opus` : null;
}

/**
 * Adds audio paths to a list of words.
 */
export function addAudioSuffixToItems(items: PracticeItem[]): PracticeItem[] {
  return items.map((item) => ({
    ...item,
    audio: addOpusSuffix(item.audio),
  }));
}

/**
 * Formats a Date object into "YYYY-MM-DD HH:MM:SS" format.
 */
export function formatDateToSQLite(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
