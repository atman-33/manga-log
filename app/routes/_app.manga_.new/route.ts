import { randomUUID } from "node:crypto";
import { redirect } from "react-router";
import type { Route } from "./+types/route";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  switch (_action) {
    case "new": {
      const newMangaId = randomUUID();
      return redirect(`/manga/${newMangaId}/edit`);
    }

    default: {
      return null;
    }
  }
};
