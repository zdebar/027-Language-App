import {
  getGrammarListRepository,
  getUserItemsListRepository,
  resetGrammarItemsRepository,
  resetItemRepository,
  resetUserRepository,
} from "@/scripts/repositories/overview.repository";
import { getUserScoreRepository } from "@/scripts/repositories/user.repository";
import { addAudioSuffixToItems } from "@/scripts/utils/items.utils";
import { Grammar, PracticeItem, UserScore } from "@/types/data.types";
import { type SQLiteDatabase } from "expo-sqlite";

/**
 * Gets a list of items started by the user.
 */
export async function getUserItemsListService(
  db: SQLiteDatabase,
  userId: number
): Promise<PracticeItem[]> {
  const item: PracticeItem[] = await getUserItemsListRepository(db, userId);
  return addAudioSuffixToItems(item);
}

/**
 * Gets a list of grammar topics from items started by the user.
 */
export async function getGrammarListService(
  db: SQLiteDatabase,
  userId: number
): Promise<Grammar[]> {
  return getGrammarListRepository(db, userId);
}

/**
 * Resets user_items.progress to 0 for given user_id and item_id. Returns updated user score.
 */
export async function resetItem(
  db: SQLiteDatabase,
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
  db: SQLiteDatabase,
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
  db: SQLiteDatabase,
  userId: number
): Promise<UserScore> {
  await resetUserRepository(db, userId);
  return await getUserScoreRepository(db, userId);
}
