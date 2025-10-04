import practiceConstants from "@/constants/practice";
import { Grammar, Item, UserScore } from "@/types/data.types";
import * as SQLite from "expo-sqlite";

import { getGrammarRepository } from "@/scripts/repositories/grammar.repository";
import {
  getPracticeItemRepository,
  updateUserItemRepository,
} from "@/scripts/repositories/practice.repository";
import { getUserScoreRepository } from "@/scripts/repositories/user.repository";
import {
  addOpusSuffix,
  getNextAt,
  getThresholdDate,
} from "../utils/items.utils";

/**
 * Gets deck of practices items.
 */
export async function getPracticeItem(
  db: SQLite.SQLiteDatabase,
  uid: string
): Promise<Item | null> {
  const item: Item | null = await getPracticeItemRepository(db, uid);

  if (item) {
    item.audio = addOpusSuffix(item.audio);
  }

  return item;
}

/**
 * Updates the user's word progress in the PostgreSQL database and returns the updated score.
 */
export async function updateUserItem(
  db: SQLite.SQLiteDatabase,
  uid: string,
  item: Item
): Promise<UserScore> {
  await updateUserItemRepository(
    db,
    uid,
    item.id,
    item.progress,
    getNextAt(item.progress),
    getThresholdDate(item.progress, practiceConstants.learnedProgress),
    getThresholdDate(item.progress, practiceConstants.SRS.length)
  );

  return await getUserScoreRepository(db, uid);
}

/**
 * Gets ItemInfo for given item ID from the database.
 */
export async function getGrammar(
  db: SQLite.SQLiteDatabase,
  itemId: number
): Promise<Grammar> {
  return await getGrammarRepository(db, itemId);
}
