import { isPasswordValid } from "@/scripts/utils/crypto.utils";
import { UserInfo, UserScore } from "@/types/data.types";
import * as Crypto from "expo-crypto";
import * as SQLite from "expo-sqlite";
import { v4 as uuidv4 } from "uuid";

import {
  createUserRepository,
  getUserScoreRepository,
  loginUserRepository,
} from "@/scripts/repositories/user.repository";

export async function createUserService(
  db: SQLite.SQLiteDatabase,
  username: string,
  password: string
): Promise<{ userInfo: UserInfo; userScore: UserScore }> {
  const uid: string = uuidv4();

  const hashedPassword = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );

  const userInfo: UserInfo = await createUserRepository(
    db,
    uid,
    username,
    hashedPassword
  );

  const userScore = await getUserScoreRepository(db, userInfo.id);
  return { userInfo, userScore };
}

/**
 * Retrieves the user information and score for a given user ID from the database.
 */
export async function loginUserService(
  db: SQLite.SQLiteDatabase,
  username: string,
  password: string
): Promise<UserInfo | null> {
  const user = await loginUserRepository(db, username);

  if (!user) {
    throw new Error("User not found");
  }

  const isVerified = await isPasswordValid(password, user.password);

  if (!isVerified) {
    throw new Error("Invalid password");
  }

  return user.userInfo;
}
