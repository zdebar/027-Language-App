import practiceConstants from "@/constants/practice";
import { Grammar, PracticeItem, UserScore } from "@/types/data.types";
import { SQLiteDatabase } from "expo-sqlite";

import {
  getGrammarRepository,
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
): Promise<PracticeItem | null> {
  const item: PracticeItem | null = await getPracticeItemRepository(db, userId);

  if (item) {
    item.audio = addOpusSuffix(item.audio);
  }

  return item;
}

/**
 * Updates the user_items.progress in database. Returns updated user score.
 */
export async function updateUserItemService(
  db: SQLiteDatabase,
  userId: number,
  item: PracticeItem
): Promise<UserScore> {
  await updateUserItemRepository(
    db,
    userId,
    item.id,
    item.progress,
    getNextAt(item.progress),
    getThresholdDate(item.progress, practiceConstants.learnedProgress),
    getThresholdDate(item.progress, practiceConstants.SRS.length)
  );

  return await getUserScoreRepository(db, userId);
}

/**
 * Gets grammar for given item_id.
 */
export async function getGrammarService(
  db: SQLiteDatabase,
  itemId: number
): Promise<Grammar> {
  return await getGrammarRepository(db, itemId);
}
