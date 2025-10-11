import { Grammar, PracticeItem } from "@/types/data.types";
import * as SQLite from "expo-sqlite";

/**
 * Gets a list of items started by the user.
 */
export async function getUserItemsListRepository(
  db: SQLite.SQLiteDatabase,
  userId: number
): Promise<PracticeItem[]> {
  return await db.getAllAsync<PracticeItem>(
    `
    SELECT  
      i.id,
      i.czech,
      i.english,
      i.pronunciation,
      i.audio,
      COALESCE(ui.progress, 0) AS progress,
      b.grammar_id AS grammarId
    FROM items i
    JOIN user_items ui ON i.id = ui.item_id
    JOIN blocks b ON i.block_id = b.id
    WHERE ui.user_id = $1
      AND b.grammar_id IS NULL
    ORDER BY i.czech ASC
    `,
    [userId]
  );
}

/**
 * Gets a list of grammar topics from items started by the user.
 */
export async function getGrammarListRepository(
  db: SQLite.SQLiteDatabase,
  userId: number
): Promise<Grammar[]> {
  return await db.getAllAsync<Grammar>(
    `
    SELECT  
      g.id,
      g.name,
      g.note
    FROM grammar g
    JOIN blocks b ON b.grammar_id = g.id
    JOIN items i ON i.block_id = b.id
    JOIN user_items ui ON i.id = ui.item_id
    WHERE ui.user_id = $1
    GROUP BY g.id, g.name, g.note
    ORDER BY g.id ASC
    `,
    [userId]
  );
}

/**
 * Resets user_items.progress to 0 for given user_id and item_id.
 */
export async function resetItemRepository(
  db: SQLite.SQLiteDatabase,
  userId: number,
  itemId: number
): Promise<void> {
  await db.runAsync(
    `
    UPDATE user_items
    SET progress = 0
    WHERE user_id = $1
      AND item_id = $2;
    `,
    [userId, itemId]
  );
}

/**
 * Resets all user_items.progress to 0 for given user_id and all items linked to given grammar_id.
 */
export async function resetGrammarItemsRepository(
  db: SQLite.SQLiteDatabase,
  userId: number,
  grammarId: number
): Promise<void> {
  await db.runAsync(
    `
    UPDATE user_items AS ui
    SET progress = 0
    FROM users u
    INNER JOIN items i ON ui.item_id = i.id
    INNER JOIN blocks b ON i.block_id = b.id
    WHERE ui.user_id = u.id
      AND u.uid = $1
      AND b.grammar_id = $2;
    `,
    [userId, grammarId]
  );
}

/**
 * Resets all user_items.progress to 0 for given user_id.
 */
export async function resetUserRepository(
  db: SQLite.SQLiteDatabase,
  userId: number
): Promise<void> {
  await db.runAsync(
    `
    UPDATE user_items
    SET progress = 0
    WHERE user_id = (SELECT id FROM users WHERE uid = $1);
    `,
    [userId]
  );
}
