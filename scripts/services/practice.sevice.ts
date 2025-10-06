import practiceConstants from "@/constants/practice";
import { Grammar, Item, UserScore } from "@/types/data.types";
import * as SQLite from "expo-sqlite";

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
 * Gets deck of practices items.
 */
export async function getPracticeItemService(
  db: SQLite.SQLiteDatabase,
  id: number
): Promise<Item | null> {
  const item: Item | null = await getPracticeItemRepository(db, id);

  if (item) {
    item.audio = addOpusSuffix(item.audio);
  }

  return item;
}

/**
 * Updates the user's word progress in the PostgreSQL database and returns the updated score.
 */
export async function updateUserItemService(
  db: SQLite.SQLiteDatabase,
  id: number,
  item: Item
): Promise<UserScore> {
  await updateUserItemRepository(
    db,
    id,
    item.id,
    item.progress,
    getNextAt(item.progress),
    getThresholdDate(item.progress, practiceConstants.learnedProgress),
    getThresholdDate(item.progress, practiceConstants.SRS.length)
  );

  return await getUserScoreRepository(db, id);
}

/**
 * Gets ItemInfo for given item ID from the database.
 */
export async function getGrammarService(
  db: SQLite.SQLiteDatabase,
  itemId: number
): Promise<Grammar> {
  return await getGrammarRepository(db, itemId);
}
