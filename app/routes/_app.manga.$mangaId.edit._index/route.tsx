import { parseWithZod } from '@conform-to/zod';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
import { Form, useNavigation, useParams } from "react-router"; // Keep Form and useNavigation from react-router-dom
import { z } from "zod";
import { mangaLogs } from '~/database/schema';
import { getAuth } from '~/lib/auth/auth.server';
import type { Route } from './+types/route';
import { MangaForm } from "./components/manga-form";
import { mangaLogSchema } from './hooks/use-manga-form';

export async function loader({ context, params }: Route.LoaderArgs) {
  const manga = await context.db.query.mangaLogs.findFirst({
    where: (mangaLogs, { eq }) => eq(mangaLogs.id, params.mangaId),
    columns: {
      id: true,
      title: true,
      score: true,
      is_completed: true,
      volume_progress: true,
      chapter_progress: true,
      note: true,
      user_id: true,
    },
  });

  return { manga };
}

export async function action({ request, context }: Route.ActionArgs) {
  const auth = getAuth(context);
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return { error: "Unauthorized", status: 401 };
  }

  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: mangaLogSchema });

  if (submission.status !== 'success') {
    return {
      success: false,
      message: 'error!',
      submission: submission.reply(),
    };
  }

  const data = Object.fromEntries(formData.entries());

  try {
    const validatedData = mangaLogSchema.parse(data);

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
          id: randomUUID(),
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

export default function MangaRoute({ actionData, loaderData }: Route.ComponentProps) {
  const { mangaId } = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const manga = loaderData?.manga;
  const errors = actionData?.error;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Manga Log</h1>
      <Form method="post">
        <MangaForm
          mangaId={mangaId || ""}
          defaultValues={manga}
          isSubmitting={isSubmitting}
        />
      </Form>
      {errors && <div className="text-red-500 mt-2">{errors}</div>}
    </div>
  );
}
