import CryptoJS from "crypto-js";

export function hashPassword(password: string): string {
  const iterations = 150000;
  const salt = CryptoJS.lib.WordArray.random(16);
  const key = CryptoJS.PBKDF2(String(password), salt, {
    keySize: 64 / 4,
    iterations,
    hasher: CryptoJS.algo.SHA256,
  });

  return `pbkdf2$${iterations}$${salt.toString(CryptoJS.enc.Hex)}$${key.toString(
    CryptoJS.enc.Hex,
  )}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const parts = String(storedHash || "").split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;

  const iterations = Number(parts[1]);
  const saltHex = parts[2];
  const expectedHex = parts[3];
  if (!Number.isFinite(iterations) || iterations <= 0) return false;

  const salt = CryptoJS.enc.Hex.parse(saltHex);
  const key = CryptoJS.PBKDF2(String(password), salt, {
    keySize: 64 / 4,
    iterations,
    hasher: CryptoJS.algo.SHA256,
  });

  return key.toString(CryptoJS.enc.Hex) === expectedHex;
}
