import { Item } from "@/types/data.types";
import * as SQLite from "expo-sqlite";

export async function getUserItemsListRepository(
  db: SQLite.SQLiteDatabase,
  uid: string
): Promise<Item[]> {
  return await db.getAllAsync(
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
    JOIN items i ON i.id = ui.item_id 
    LEFT JOIN blocks b ON i.block_id = b.id
    LEFT JOIN grammar g ON b.grammar_id = g.id
    WHERE u.uid = $1
    ORDER BY i.czech ASC
    `,
    [uid]
  );
}
