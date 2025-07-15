import { eq } from "drizzle-orm";
import { redirect } from "react-router";
import { mangaLogs } from "~/database/schema";
import type { Route } from "./+types/route";

export const action = async ({
  request,
  params,
  context,
}: Route.ActionArgs) => {
  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  switch (_action) {
    case "delete": {
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
