import { getUserScoreRepository } from "@/scripts/repositories/user.repository";
import { UserScore } from "@/types/data.types";
import * as SQLite from "expo-sqlite";
import {
  resetGrammarItemsRepository,
  resetItemRepository,
} from "../repositories/reset.repository";

/**
 * Updates the user's word progress in the PostgreSQL database and returns the updated score.
 */
export async function resetItem(
  db: SQLite.SQLiteDatabase,
  uid: string,
  itemId: number
): Promise<UserScore> {
  await resetItemRepository(db, uid, itemId);
  return await getUserScoreRepository(db, uid);
}

/**
 * Updates the user's word progress in the PostgreSQL database and returns the updated score.
 */
export async function resetGrammarItems(
  db: SQLite.SQLiteDatabase,
  uid: string,
  grammarId: number
): Promise<UserScore> {
  await resetGrammarItemsRepository(db, uid, grammarId);
  return await getUserScoreRepository(db, uid);
}
