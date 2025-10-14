import { handleError } from "@/scripts/utils/error.utils";
import { UserError, UserInfo, UserScore } from "@/types/data.types";
import { type SQLiteDatabase } from "expo-sqlite";

/**
 * Creates a new user in the database.
 */
export async function createUserRepository(
  db: SQLiteDatabase,
  uid: string,
  username: string,
  hashedPassword: string
): Promise<number> {
  try {
    if (!uid || !username || !hashedPassword) {
      throw new Error("Input values must not be empty.");
    }

    const result = await db.runAsync(
      `INSERT INTO users (uid, username, password) VALUES (?, ?, ?)`,
      [uid, username, hashedPassword]
    );

    return Number(result.lastInsertRowId);
  } catch (error: unknown) {
    handleError(error, "createUserRepository", { uid, username });
  }
}

/**
 * Logs in a user by username.
 */
export async function loginUserRepository(
  db: SQLiteDatabase,
  username: string
): Promise<{ userInfo: UserInfo; hashedPassword: string }> {
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
  } catch (error: unknown) {
    handleError(error, "loginUserRepository", { username });
  }
}

/**
 * Gets user score including learned counts and practice count for today. Throws an error if the user is not found.
 */
export async function getUserScoreRepository(
  db: SQLiteDatabase,
  userId: number
): Promise<UserScore> {
  try {
    const result = await db.getFirstAsync<UserScore>(
      `
      SELECT 
        -- Count of items learned today
        COALESCE(
          (SELECT COUNT(*) 
          FROM user_items 
          WHERE user_id = $1 
            AND DATE(learned_at) = DATE('now', 'localtime')), 
          0
        ) AS learnedCountToday,
        -- Count of items learned before today
        COALESCE(
          (SELECT COUNT(*) 
          FROM user_items 
          WHERE user_id = $1 
            AND learned_at IS NOT NULL 
            AND DATE(learned_at) < DATE('now', 'localtime')), 
          0
        ) AS learnedCountNotToday,
        -- Practice count for today from user_score
        COALESCE(
          (SELECT item_count 
          FROM user_score 
          WHERE user_id = $1 
            AND "date" = DATE('now', 'localtime')), 
          0
        ) AS practiceCountToday;
      `,
      [userId]
    );

    if (!result) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    return result;
  } catch (error: unknown) {
    handleError(error, "getUserScoreRepository", { userId });
  }
}

/**
 * Gets user information by user ID. Throws an error if the user is not found.
 */
export async function getUserInfoRepository(
  db: SQLiteDatabase,
  userId: number
): Promise<UserInfo> {
  try {
    const result = await db.getFirstAsync<UserInfo>(
      `SELECT id, uid, username FROM users WHERE id = ?`,
      [userId]
    );

    if (!result) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    return result;
  } catch (error: unknown) {
    handleError(error, "getUserInfoRepository", { userId });
  }
}
