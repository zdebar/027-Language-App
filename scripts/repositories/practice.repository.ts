import { Grammar, PracticeItem } from "@/types/data.types";
import { type SQLiteDatabase } from "expo-sqlite";

/**
 * Gets a practice item for the user from the database.
 */
export async function getPracticeItemRepository(
  db: SQLiteDatabase,
  userId: number
): Promise<PracticeItem | null> {
  return await db.getFirstAsync(
    `
    SELECT  
      i.id,
      i.czech,
      i.english,
      i.pronunciation,
      i.audio,
      COALESCE(ui.progress, 0) AS progress,
      g.id AS grammarId
    FROM user_items ui 
    LEFT JOIN items i ON ui.item_id = i.id
    LEFT JOIN blocks b ON i.block_id = b.id
    LEFT JOIN grammar g ON b.grammar_id = g.id
    WHERE ui.user_id = $1
      AND ui.mastered_at IS NULL
      AND (ui.next_at IS NULL OR ui.next_at < datetime('now'))
    ORDER BY 
      ui.progress % 2 DESC,
      ui.next_at ASC NULLS LAST,
      COALESCE(b.sequence, i.sequence) ASC NULLS LAST,
      i.sequence ASC NULLS LAST
    `,
    [userId]
  );
}

/**
 * Updates the user_item in database.
 */
export async function updateUserItemRepository(
  db: SQLiteDatabase,
  userId: number,
  itemId: number,
  progress: number,
  nextAt: string | null,
  learnedAt: string | null,
  masteredAt: string | null
): Promise<void> {
  const updatedAt = new Date().toISOString();
  await db.runAsync(
    `
    INSERT INTO user_items (user_id, item_id, progress, next_at, learned_at, mastered_at)
    VALUES (
      (SELECT id FROM users WHERE uid = $1),
      $2, -- item_id
      $3, -- progress
      $4, -- updated_at
      $5, -- next_at
      $6, -- learned_at
      $7  -- mastered_at
    )
    ON CONFLICT(user_id, item_id) DO UPDATE SET 
      progress = EXCLUDED.progress, 
      next_at = EXCLUDED.next_at, 
      learned_at = CASE 
        WHEN user_items.learned_at IS NULL AND EXCLUDED.learned_at IS NOT NULL 
        THEN EXCLUDED.learned_at 
        ELSE user_items.learned_at 
      END,
      mastered_at = CASE 
        WHEN user_items.mastered_at IS NULL AND EXCLUDED.mastered_at IS NOT NULL 
        THEN EXCLUDED.mastered_at 
        ELSE user_items.mastered_at 
      END;
    `,
    [userId, itemId, progress, updatedAt, nextAt, learnedAt, masteredAt]
  );
}

/**
 * Gets grammar for given grammar_id.
 */
export async function getGrammarRepository(
  db: SQLiteDatabase,
  grammarId: number
): Promise<Grammar> {
  const result = await db.getFirstAsync<Grammar>(
    `
    SELECT  
      id,
      name,
      note
    FROM grammar
    WHERE id = $1
    `,
    [grammarId]
  );

  if (!result) {
    throw new Error(`Grammar with ID ${grammarId} not found.`);
  }

  return result;
}
