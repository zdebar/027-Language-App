import { Grammar } from "@/types/data.types";
import * as SQLite from "expo-sqlite";

export async function getGrammarRepository(
  db: SQLite.SQLiteDatabase,
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
