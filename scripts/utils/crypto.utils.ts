import * as Crypto from "expo-crypto";

/**
 * Hash the given password using SHA-256.
 */
export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  return hashedPassword;
}

/**
 * Compare the input password with the stored hash to verify if they match.
 */
export async function isPasswordValid(
  inputPassword: string,
  storedHash: string
): Promise<boolean> {
  const hashedInput = await hashPassword(inputPassword);
  return hashedInput === storedHash;
}
