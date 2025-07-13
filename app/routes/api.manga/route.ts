import { mangaLogs } from "database/schema";
import { getAuth } from "~/lib/auth/auth.server";
import type { Route } from "./+types/route";

export async function action({ request, context }: Route.ActionArgs) {
  const auth = getAuth(context);
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return {
      error: "Unauthorized",
      status: 401,
    };
  }

  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries()) as any;

  const newLog = await context.db
    .insert(mangaLogs)
    .values({
      ...data,
      user_id: session.user.id,
    })
    .returning();

  return newLog;
}
