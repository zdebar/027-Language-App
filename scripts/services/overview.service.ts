import {
  getGrammarListRepository,
  getUserItemsListRepository,
  resetGrammarItemsRepository,
  resetItemRepository,
  resetUserRepository,
} from "@/scripts/repositories/overview.repository";
import { getUserScoreRepository } from "@/scripts/repositories/user.repository";
import { addAudioSuffixToItems } from "@/scripts/utils/items.utils";
import { Grammar, Item, UserScore } from "@/types/data.types";
import * as SQLite from "expo-sqlite";

/**
 * Gets a list of items started by the user.
 */
export async function getUserItemsListService(
  db: SQLite.SQLiteDatabase,
  userId: number
): Promise<Item[]> {
  const item: Item[] = await getUserItemsListRepository(db, userId);
  return addAudioSuffixToItems(item);
}

/**
 * Gets a list of grammar topics from items started by the user.
 */
export async function getGrammarListService(
  db: SQLite.SQLiteDatabase,
  userId: number
): Promise<Grammar[]> {
  return getGrammarListRepository(db, userId);
}

/**
 * Resets user_items.progress to 0 for given user_id and item_id. Returns updated user score.
 */
export async function resetItem(
  db: SQLite.SQLiteDatabase,
  userId: number,
  itemId: number
): Promise<UserScore> {
  await resetItemRepository(db, userId, itemId);
  return await getUserScoreRepository(db, userId);
}

/**
 * Resets all user_items.progress to 0 for given user_id and all items linked to argument grammar_id. Returns updated user score.
 */
export async function resetGrammarItems(
  db: SQLite.SQLiteDatabase,
  userId: number,
  grammarId: number
): Promise<UserScore> {
  await resetGrammarItemsRepository(db, userId, grammarId);
  return await getUserScoreRepository(db, userId);
}

/**
 * Resets all user_items.progress to 0 for given user_id. Returns updated user score.
 */
export async function resetUserService(
  db: SQLite.SQLiteDatabase,
  userId: number
): Promise<UserScore> {
  await resetUserRepository(db, userId);
  return await getUserScoreRepository(db, userId);
}
