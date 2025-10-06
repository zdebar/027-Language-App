import { Grammar, Item } from "@/types/data.types";
import * as SQLite from "expo-sqlite";

export async function getUserItemsListRepository(
  db: SQLite.SQLiteDatabase,
  id: number
): Promise<Item[]> {
  return await db.getAllAsync<Item>(
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
    [id]
  );
}

export async function getGrammarListRepository(
  db: SQLite.SQLiteDatabase,
  id: number
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
    [id]
  );
}

export async function resetItemRepository(
  db: SQLite.SQLiteDatabase,
  id: number,
  itemId: number
): Promise<void> {
  await db.runAsync(
    `
    UPDATE user_items
    SET progress = 0
    WHERE user_id = $1
      AND item_id = $2;
    `,
    [id, itemId]
  );
}

export async function resetGrammarItemsRepository(
  db: SQLite.SQLiteDatabase,
  id: number,
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
    [id, grammarId]
  );
}

export async function resetUserRepository(
  db: SQLite.SQLiteDatabase,
  id: number
): Promise<void> {
  await db.runAsync(
    `
    UPDATE user_items
    SET progress = 0
    WHERE user_id = (SELECT id FROM users WHERE uid = $1);
    `,
    [id]
  );
}
