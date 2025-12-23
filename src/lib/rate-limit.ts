// Rate limiting using Cloudflare KV
// Requires RATE_LIMIT_KV binding in wrangler.toml

export type RateLimitConfig = {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

/**
 * Check and update rate limit for an IP address
 * Uses Cloudflare KV for persistence across worker instances
 */
export async function checkRateLimit(
  kv: KVNamespace | undefined,
  ip: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const now = Date.now();
  const key = `rate-limit:${ip}`;

  // Fallback to in-memory if KV is not available (dev mode)
  if (!kv) {
    return checkRateLimitInMemory(ip, now, config);
  }

  try {
    const stored = await kv.get<RateLimitEntry>(key, "json");
    let entry: RateLimitEntry;

    if (!stored || now >= stored.resetAt) {
      // Start new window
      entry = {
        count: 1,
        resetAt: now + config.windowMs,
      };
    } else {
      // Increment existing window
      entry = {
        count: stored.count + 1,
        resetAt: stored.resetAt,
      };
    }

    const allowed = entry.count <= config.maxRequests;
    const remaining = Math.max(0, config.maxRequests - entry.count);

    // Store updated entry with TTL
    const ttlSeconds = Math.ceil((entry.resetAt - now) / 1000);
    await kv.put(key, JSON.stringify(entry), {
      expirationTtl: Math.max(ttlSeconds, 60),
    });

    return { allowed, remaining, resetAt: entry.resetAt };
  } catch (error) {
    // If KV fails, allow the request but log the error
    console.error("Rate limit KV error:", error);
    return { allowed: true, remaining: config.maxRequests, resetAt: now + config.windowMs };
  }
}

// In-memory fallback for development
const memoryStore = new Map<string, RateLimitEntry>();
const MAX_IN_MEMORY_SIZE = 5000;
const CLEANUP_INTERVAL_MS = 60000; // 1 minute
let lastCleanup = Date.now();

function checkRateLimitInMemory(ip: string, now: number, config: RateLimitConfig): RateLimitResult {
  const stored = memoryStore.get(ip);
  let entry: RateLimitEntry;

  if (!stored || now >= stored.resetAt) {
    entry = {
      count: 1,
      resetAt: now + config.windowMs,
    };
  } else {
    entry = {
      count: stored.count + 1,
      resetAt: stored.resetAt,
    };
  }

  // Update entry and move to end (LRU behavior)
  memoryStore.delete(ip);
  memoryStore.set(ip, entry);

  // Enforce hard limit to prevent memory leaks
  if (memoryStore.size > MAX_IN_MEMORY_SIZE) {
    // Delete the oldest entry (first key)
    const oldestKey = memoryStore.keys().next().value;
    if (oldestKey) {
      memoryStore.delete(oldestKey);
    }
  }

  // Cleanup expired entries periodically
  if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
    lastCleanup = now;
    for (const [key, value] of memoryStore.entries()) {
      if (now >= value.resetAt) {
        memoryStore.delete(key);
      }
    }
  }

  const allowed = entry.count <= config.maxRequests;
  const remaining = Math.max(0, config.maxRequests - entry.count);

  return { allowed, remaining, resetAt: entry.resetAt };
}

/**
 * Get client IP from Cloudflare headers
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
