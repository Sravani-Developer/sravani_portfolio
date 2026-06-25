import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { config } from "./config.js";

function base64Url(input) {
  return Buffer.from(JSON.stringify(input)).toString("base64url");
}

function sign(value) {
  return createHmac("sha256", config.jwtSecret).update(value).digest("base64url");
}

export function createToken(email) {
  const header = base64Url({ alg: "HS256", typ: "JWT" });
  const payload = base64Url({
    sub: email,
    role: "admin",
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8,
  });
  const unsignedToken = `${header}.${payload}`;

  return `${unsignedToken}.${sign(unsignedToken)}`;
}

export function verifyToken(token) {
  if (!token) {
    return null;
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    return null;
  }

  const unsignedToken = `${parts[0]}.${parts[1]}`;
  const expectedSignature = sign(unsignedToken);
  const receivedSignature = parts[2];
  const expectedBuffer = Buffer.from(expectedSignature);
  const receivedBuffer = Buffer.from(receivedSignature);

  if (
    expectedBuffer.length !== receivedBuffer.length ||
    !timingSafeEqual(expectedBuffer, receivedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));

    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function validateLogin(email, password) {
  if (!config.adminEmail || email !== config.adminEmail) {
    return false;
  }

  if (config.adminPasswordHash) {
    return verifyPasswordHash(password, config.adminPasswordHash);
  }

  if (!config.adminPassword) {
    return false;
  }

  const received = Buffer.from(password);
  const expected = Buffer.from(config.adminPassword);
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

function verifyPasswordHash(password, storedHash) {
  const [algorithm, salt, hash] = storedHash.split(":");

  if (algorithm !== "scrypt" || !salt || !hash) {
    return false;
  }

  const expected = Buffer.from(hash, "hex");
  const received = Buffer.from(scryptSync(password, salt, expected.length).toString("hex"), "hex");

  return expected.length === received.length && timingSafeEqual(expected, received);
}
