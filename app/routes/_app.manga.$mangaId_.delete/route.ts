import { and, eq } from "drizzle-orm";
import { redirect } from "react-router";
import { mangaLogs } from "~/database/schema";
import { getAuth } from "~/lib/auth/auth.server";
import type { Route } from "./+types/route";

export const action = async ({
  request,
  params,
  context,
}: Route.ActionArgs) => {
  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  const auth = getAuth(context);
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  switch (_action) {
    case "delete": {
      const existingManga = await context.db.query.mangaLogs.findFirst({
        where: and(
          eq(mangaLogs.id, params.mangaId),
          eq(mangaLogs.user_id, session.user.id),
        ),
      });

      if (!existingManga) {
        return new Response("Forbidden", { status: 403 });
      }

      await context.db
        .delete(mangaLogs)
        .where(eq(mangaLogs.id, params.mangaId));
      return redirect("/");
    }

    default: {
      return null;
    }
  }
};
