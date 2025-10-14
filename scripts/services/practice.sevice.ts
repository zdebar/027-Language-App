import practiceConstants from "@/constants/practice";
import { PracticeItem, UserScore } from "@/types/data.types";
import { SQLiteDatabase } from "expo-sqlite";

import {
  getPracticeItemRepository,
  updateUserItemRepository,
} from "@/scripts/repositories/practice.repository";
import { getUserScoreRepository } from "@/scripts/repositories/user.repository";
import {
  addOpusSuffix,
  getNextAt,
  getThresholdDate,
} from "@/scripts/utils/items.utils";

/**
 * Gets a practice item for the user from the database.
 */
export async function getPracticeItemService(
  db: SQLiteDatabase,
  userId: number
): Promise<PracticeItem> {
  const item: PracticeItem = await getPracticeItemRepository(db, userId);
  console.log("Item", item);
  item.audio = addOpusSuffix(item.audio);
  return item;
}

/**
 * Updates the user_items.progress in database. Returns updated user score.
 */
export async function updateUserItemService(
  db: SQLiteDatabase,
  userId: number,
  itemId: number,
  progress: number
): Promise<UserScore> {
  await updateUserItemRepository(
    db,
    userId,
    itemId,
    progress,
    getNextAt(progress),
    new Date().toISOString(),
    getThresholdDate(progress, practiceConstants.learnedProgress),
    getThresholdDate(progress, practiceConstants.SRS.length)
  );

  return await getUserScoreRepository(db, userId);
}
