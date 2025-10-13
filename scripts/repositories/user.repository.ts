import { UserError, UserInfo, UserScore } from "@/types/data.types";
import * as SQLite from "expo-sqlite";

/**
 * Creates a new user in the database and returns the user information.
 */
export async function createUserRepository(
  db: SQLite.SQLiteDatabase,
  uid: string,
  username: string,
  password: string
): Promise<number> {
  try {
    // const result = await db.runAsync(
    //   `INSERT INTO users (uid, username, password) VALUES (?, ?, ?)`,
    //   ["test", "test", "test"]
    // );

    // return Number(result.lastInsertRowId);
    console.log("Inserting user into database:", uid, username, password);

    return 1;
  } catch (error: any) {
    if (error.message.includes("UNIQUE constraint failed: users.username")) {
      throw new UserError(`Uživatel "${username}" již existuje.`);
    }

    throw error;
  }
}

/**
 * Logs in a user by username. Returns user information and hashed password if found, otherwise null.
 */
export async function loginUserRepository(
  db: SQLite.SQLiteDatabase,
  username: string
): Promise<{ userInfo: UserInfo; hashedPassword: string }> {
  console.log("Querying user by username:", username);

  try {
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
      throw new UserError(`Uživatel "${username}" neexistuje.`);
    }
    return {
      userInfo: {
        id: result.id,
        uid: result.uid,
        username: result.username,
      },
      hashedPassword: result.password,
    };
  } catch (error) {
    console.log("Database query error:", error);
    throw error instanceof UserError
      ? error
      : new Error("Failed to login user.");
  }
}

/**
 * Gets user score including learned counts and practice count for today. Throws an error if the user is not found.
 */
export async function getUserScoreRepository(
  db: SQLite.SQLiteDatabase,
  userId: number
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
    [userId]
  );

  if (!result) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  return result;
}

/**
 * Gets user information by user ID. Throws an error if the user is not found.
 */
export async function getUserInfoRepository(
  db: SQLite.SQLiteDatabase,
  userId: number
): Promise<UserInfo> {
  const result = await db.getFirstAsync<UserInfo>(
    `SELECT id, uid, username FROM users WHERE id = ?`,
    [userId]
  );

  if (!result) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  return result;
}
