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
  id: number
): Promise<Item[]> {
  const word: Item[] = await getUserItemsListRepository(db, id);
  return addAudioSuffixToItems(word);
}

/**
 * Gets a list of grammar topics started by the user.
 */
export async function getGrammarListService(
  db: SQLite.SQLiteDatabase,
  id: number
): Promise<Grammar[]> {
  return getGrammarListRepository(db, id);
}

/**
 * Updates the user's word progress in the PostgreSQL database and returns the updated score.
 */
export async function resetItem(
  db: SQLite.SQLiteDatabase,
  id: number,
  itemId: number
): Promise<UserScore> {
  await resetItemRepository(db, id, itemId);
  return await getUserScoreRepository(db, id);
}

/**
 * Updates the user's word progress in the PostgreSQL database and returns the updated score.
 */
export async function resetGrammarItems(
  db: SQLite.SQLiteDatabase,
  id: number,
  grammarId: number
): Promise<UserScore> {
  await resetGrammarItemsRepository(db, id, grammarId);
  return await getUserScoreRepository(db, id);
}

/**
 * Erase all items connnected to given user and language from user_items table. Returns the updated score.
 */
export async function resetUserService(
  db: SQLite.SQLiteDatabase,
  id: number
): Promise<UserScore> {
  await resetUserRepository(db, id);
  return await getUserScoreRepository(db, id);
}
