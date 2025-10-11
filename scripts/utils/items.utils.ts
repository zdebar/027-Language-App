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
  return new Date(Date.now() + randomizedInterval * 1000).toISOString();
}

/**
 * Returns the now date if the progress is equal to the argument threshold.
 */
export function getThresholdDate(
  progress: number,
  threshold: number
): string | null {
  if (progress >= threshold) {
    return new Date(Date.now()).toISOString();
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
