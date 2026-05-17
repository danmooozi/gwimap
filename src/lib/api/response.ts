export function ok<T>(data: T, init?: ResponseInit): Response {
  return Response.json(
    {
      data,
      meta: { timestamp: new Date().toISOString() },
      error: null,
    },
    init,
  );
}

export function fail(message: string, status = 400): Response {
  return Response.json(
    {
      data: null,
      meta: { timestamp: new Date().toISOString() },
      error: { message, status },
    },
    { status },
  );
}
