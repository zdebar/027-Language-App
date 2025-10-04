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
    uid: string;
    username: string;
    password: string;
  }>(
    `
    SELECT 
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
      uid: result.uid,
      username: result.username,
    },
    password: result.password,
  };
}

export async function getUserScoreRepository(
  db: SQLite.SQLiteDatabase,
  uid: string
): Promise<UserScore> {
  const result = await db.getFirstAsync<{
    learnedCountToday: number;
    learnedCountNotToday: number;
    practiceCountToday: number;
  }>(
    `
    SELECT 
      -- Count of items learned today
      (SELECT COUNT(*) 
      FROM user_items 
      WHERE user_id = u.id 
        AND DATE(learned_at) = DATE('now', 'localtime')) AS learnedCountToday,

      -- Count of items learned before today
      (SELECT COUNT(*) 
      FROM user_items 
      WHERE user_id = u.id 
        AND learned_at IS NOT NULL 
        AND DATE(learned_at) < DATE('now', 'localtime')) AS learnedCountNotToday,

      -- Practice count for today from user_score
      (SELECT item_count 
      FROM user_score 
      WHERE user_id = u.id 
        AND "date" = DATE('now', 'localtime')) AS practiceCountToday
    FROM users u
    WHERE u.uid = $1;
    `,
    [uid]
  );

  return {
    learnedCountToday: result?.learnedCountToday ?? 0,
    learnedCountNotToday: result?.learnedCountNotToday ?? 0,
    practiceCountToday: result?.practiceCountToday ?? 0,
  };
}
