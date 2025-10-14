/**
 * Returns true if the practice direction is Czech to English based on the progress number.
 * @param progress
 * @returns
 */
export function isCzechToEnglish(progress: number): boolean {
  return progress % 2 === 0;
}
