const memoryStore = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const current = memoryStore.get(key);

  if (!current || current.resetAt < now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count += 1;
  return true;
}

export function getClientKey(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ua = request.headers.get("user-agent")?.trim() ?? "ua";
  const ip = cfIp || realIp || forwarded || "anonymous";
  return `${ip}:${ua.slice(0, 40)}`;
}
