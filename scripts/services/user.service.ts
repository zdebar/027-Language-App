import { isPasswordValid } from "@/scripts/utils/crypto.utils";
import { UserError, UserInfo, UserScore } from "@/types/data.types";
import * as Crypto from "expo-crypto";
import * as SQLite from "expo-sqlite";
import { v4 as uuidv4 } from "uuid";

import {
  createUserRepository,
  getUserInfoRepository,
  getUserScoreRepository,
  loginUserRepository,
} from "@/scripts/repositories/user.repository";

/**
 * Creates a new user in the database and returns the user information, and user score. TODO: handle duplicate usernames.
 */
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

  const userId: number = await createUserRepository(
    db,
    uid,
    username,
    hashedPassword
  );

  const userInfo: UserInfo = await getUserInfoRepository(db, userId);
  const userScore = await getUserScoreRepository(db, userId);
  return { userInfo, userScore };
}

/**
 * Logs in a user by verifying the username and password. Returns user information if successful, otherwise throws an error.
 */
export async function loginUserService(
  db: SQLite.SQLiteDatabase,
  username: string,
  password: string
): Promise<UserInfo> {
  const user = await loginUserRepository(db, username);

  const isVerified = await isPasswordValid(password, user.hashedPassword);

  if (!isVerified) {
    throw new UserError("Neplatné heslo!");
  }

  return user.userInfo;
}
