import { config } from "./config.js";

const buckets = new Map();

function getIp(request) {
  return (
    request.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    request.socket.remoteAddress ||
    "unknown"
  );
}

export function rateLimit(request, response, key, limit) {
  const now = Date.now();
  const bucketKey = `${key}:${getIp(request)}`;
  const currentBucket = buckets.get(bucketKey);

  if (!currentBucket || now > currentBucket.resetAt) {
    buckets.set(bucketKey, {
      count: 1,
      resetAt: now + config.rateLimitWindowMs,
    });
    return false;
  }

  currentBucket.count += 1;

  if (currentBucket.count > limit) {
    response.writeHead(429, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": config.allowedOrigin,
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
    });
    response.end(JSON.stringify({ error: "Too many requests. Please try again later." }));
    return true;
  }

  return false;
}
