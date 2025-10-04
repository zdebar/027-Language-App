import { getUserItemsListRepository } from "@/scripts/repositories/oveview.repository";
import { addAudioSuffixToItems } from "@/scripts/utils/items.utils";
import { Item } from "@/types/data.types";
import * as SQLite from "expo-sqlite";

/**
 * Gets a list of words for a given user and language ID from the database.
 */
export async function getItemsListService(
  db: SQLite.SQLiteDatabase,
  uid: string
): Promise<Item[]> {
  const word: Item[] = await getUserItemsListRepository(db, uid);
  return addAudioSuffixToItems(word);
}
