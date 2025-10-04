import * as SQLite from "expo-sqlite";

export async function resetItemRepository(
  db: SQLite.SQLiteDatabase,
  uid: string,
  itemId: number
): Promise<void> {
  const query = await db.prepareAsync(
    `
    UPDATE user_items
    SET progress = 0
    WHERE user_id = (SELECT id FROM users WHERE uid = $1)
      AND item_id = $2;
    `
  );

  try {
    await query.executeAsync({
      uid,
      itemId,
    });
  } finally {
    await query.finalizeAsync();
  }
}

export async function resetGrammarItemsRepository(
  db: SQLite.SQLiteDatabase,
  uid: string,
  grammarId: number
): Promise<void> {
  const query = await db.prepareAsync(
    `
    UPDATE user_items AS ui
    SET progress = 0
    FROM users u
    INNER JOIN items i ON ui.item_id = i.id
    INNER JOIN blocks b ON i.block_id = b.id
    WHERE ui.user_id = u.id
      AND u.uid = $1
      AND b.grammar_id = $2;
    `
  );

  try {
    await query.executeAsync({
      uid,
      grammarId,
    });
  } finally {
    await query.finalizeAsync();
  }
}

export async function resetUserRepository(
  db: SQLite.SQLiteDatabase,
  uid: string
): Promise<void> {
  const query = await db.prepareAsync(
    `
    UPDATE user_items
    SET progress = 0
    WHERE user_id = (SELECT id FROM users WHERE uid = $1);
    `
  );

  try {
    await query.executeAsync({
      uid,
    });
  } finally {
    await query.finalizeAsync();
  }
}
