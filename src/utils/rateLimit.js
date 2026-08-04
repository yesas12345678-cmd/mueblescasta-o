const rateLimitMap = new Map();

/**
 * Basic in-memory rate limiter.
 * @param {string} ip Client IP address
 * @param {number} limit Maximum number of requests allowed in the window (default: 10)
 * @param {number} windowMs Time window in milliseconds (default: 1 minute)
 * @returns {boolean} True if the request is within the limit, false otherwise
 */
export function rateLimit(ip, limit = 10, windowMs = 60000) {
  const now = Date.now();
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const requests = rateLimitMap.get(ip).filter((timestamp) => now - timestamp < windowMs);
  requests.push(now);
  rateLimitMap.set(ip, requests);

  // Periodic cleanup to prevent memory growth (if Map size grows too large)
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      const active = value.filter((timestamp) => now - timestamp < windowMs);
      if (active.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, active);
      }
    }
  }

  return requests.length <= limit;
}
