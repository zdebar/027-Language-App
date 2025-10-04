import * as Crypto from "expo-crypto";

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  return hashedPassword;
}

export async function isPasswordValid(
  inputPassword: string,
  storedHash: string
): Promise<boolean> {
  const hashedInput = await hashPassword(inputPassword);
  return hashedInput === storedHash;
}
