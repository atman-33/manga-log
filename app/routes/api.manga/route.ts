import { mangaLogs } from "database/schema";
import { eq } from "drizzle-orm"; // Import eq for update operations
import { z } from "zod"; // Import z for ZodError
import { getAuth } from "~/lib/auth/auth.server";
import { MangaLogSchema } from "~/lib/schemas"; // Import MangaLogSchema
import type { Route } from "./+types/route";

export async function action({ request, context }: Route.ActionArgs) {
  const auth = getAuth(context);
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return { error: "Unauthorized", status: 401 };
  }

  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  try {
    const validatedData = MangaLogSchema.parse(data);

    const { id, ...rest } = validatedData; // Extract id if present

    if (id) {
      // Update existing manga log
      const updatedLog = await context.db
        .update(mangaLogs)
        .set({
          ...rest,
          user_id: session.user.id, // Ensure user_id is set/updated
        })
        .where(eq(mangaLogs.id, id))
        .returning();

      if (updatedLog.length === 0) {
        return { error: "Manga log not found or unauthorized", status: 404 };
      }
      return {
        data: updatedLog[0],
        status: 200,
      };
    } else {
      // Insert new manga log
      const newLog = await context.db
        .insert(mangaLogs)
        .values({
          ...rest,
          user_id: session.user.id,
        })
        .returning();
      return {
        data: newLog[0],
        status: 201,
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.flatten().fieldErrors;
      return {
        errors,
        status: 400,
      };
    }
    return {
      error: "An unexpected error occurred",
      status: 500,
    };
  }
}
