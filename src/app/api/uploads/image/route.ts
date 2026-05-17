import { fail, ok } from "../../../../../lib/api/response";
import { checkRateLimit, getClientKey } from "../../../../../lib/server/rate-limit";
import { createSupabaseAdminClient } from "../../../../../lib/supabase/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_CONTENT_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request): Promise<Response> {
  try {
    const clientKey = getClientKey(request);
    if (!checkRateLimit(`uploads:${clientKey}`, 10, 60_000)) {
      return fail("Too many requests", 429);
    }

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return fail("file is required", 400);
    }

    if (!ALLOWED_CONTENT_TYPES.has(file.type)) {
      return fail("Unsupported file type", 413);
    }
    if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
      return fail("File too large", 413);
    }

    const supabase = createSupabaseAdminClient();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const objectPath = `reports/${Date.now()}-${safeName}`;
    const arrayBuffer = await file.arrayBuffer();

    const { error } = await supabase.storage
      .from("gwimap-images")
      .upload(objectPath, arrayBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) return fail(error.message, 500);

    return ok({
      path: objectPath,
      bucket: "gwimap-images",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to upload image";
    return fail(message, 500);
  }
}
