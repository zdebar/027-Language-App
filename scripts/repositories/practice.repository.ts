import { Item } from "@/types/data.types";
import * as SQLite from "expo-sqlite";

export async function getPracticeItemRepository(
  db: SQLite.SQLiteDatabase,
  uid: string
): Promise<Item | null> {
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
    JOIN users u ON u.id = ui.user_id 
    LEFT JOIN items i ON ui.item_id = i.id
    LEFT JOIN blocks b ON i.block_id = b.id
    LEFT JOIN grammar g ON b.grammar_id = g.id
    WHERE u.uid = $1
      AND ui.mastered_at IS NULL
      AND (ui.next_at IS NULL OR ui.next_at < NOW())
    ORDER BY 
      ui.progress % 2 DESC, -- Odd progress first (1 for odd, 0 for even)
      ui.next_at ASC NULLS LAST,
      COALESCE(b.sequence, i.sequence) ASC NULLS LAST,
      i.sequence ASC NULLS LAST
    `,
    [uid]
  );
}

export async function updateUserItemRepository(
  db: SQLite.SQLiteDatabase,
  uid: string,
  itemId: number,
  progress: number,
  nextAt: string | null,
  learnedAt: string | null,
  masteredAt: string | null
): Promise<void> {
  const query = await db.prepareAsync(
    `
    INSERT INTO user_items (user_id, item_id, progress, next_at, learned_at, mastered_at)
    VALUES (
      (SELECT id FROM users WHERE uid = $1),
      $2, -- item_id
      $3, -- progress
      $4, -- next_at
      $5, -- learned_at
      $6  -- mastered_at
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
    `
  );

  try {
    await query.executeAsync({
      uid,
      itemId,
      progress,
      nextAt,
      learnedAt,
      masteredAt,
    });
  } finally {
    await query.finalizeAsync();
  }
}
