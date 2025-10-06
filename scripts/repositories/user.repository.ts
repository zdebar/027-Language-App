import { UserInfo, UserScore } from "@/types/data.types";
import * as SQLite from "expo-sqlite";

export async function createUserRepository(
  db: SQLite.SQLiteDatabase,
  uid: string,
  username: string,
  password: string
): Promise<UserInfo> {
  const insertResult = await db.runAsync(
    `INSERT INTO users (uid, username, password) VALUES (?, ?, ?)`,
    [uid, username, password]
  );

  const user = await db.getFirstAsync<UserInfo>(
    `SELECT id, uid, username FROM users WHERE id = ?`,
    [insertResult.lastInsertRowId]
  );

  if (!user) {
    throw new Error("Failed to create user");
  }

  return user;
}

export async function loginUserRepository(
  db: SQLite.SQLiteDatabase,
  username: string
): Promise<{ userInfo: UserInfo; password: string } | null> {
  const result = await db.getFirstAsync<{
    id: number;
    uid: string;
    username: string;
    password: string;
  }>(
    `
    SELECT 
      id,
      uid,
      username,
      password
    FROM users u
    WHERE u.username = $1;
    `,
    [username]
  );

  if (!result) {
    return null;
  }

  return {
    userInfo: {
      id: result.id,
      uid: result.uid,
      username: result.username,
    },
    password: result.password,
  };
}

export async function getUserScoreRepository(
  db: SQLite.SQLiteDatabase,
  id: number
): Promise<UserScore> {
  const result = await db.getFirstAsync<UserScore>(
    `
    SELECT 
      -- Count of items learned today
      (SELECT COUNT(*) 
      FROM user_items 
      WHERE user_id = $1 
        AND DATE(learned_at) = DATE('now', 'localtime')) AS learnedCountToday,

      -- Count of items learned before today
      (SELECT COUNT(*) 
      FROM user_items 
      WHERE user_id = $1 
        AND learned_at IS NOT NULL 
        AND DATE(learned_at) < DATE('now', 'localtime')) AS learnedCountNotToday,

      -- Practice count for today from user_score
      (SELECT item_count 
      FROM user_score 
      WHERE user_id = $1 
        AND "date" = DATE('now', 'localtime')) AS practiceCountToday
    FROM user_items ui
    WHERE ui.user_id = $1;
    `,
    [id]
  );

  return {
    learnedCountToday: result?.learnedCountToday ?? 0,
    learnedCountNotToday: result?.learnedCountNotToday ?? 0,
    practiceCountToday: result?.practiceCountToday ?? 0,
  };
}
