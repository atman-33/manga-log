import { parseWithZod } from '@conform-to/zod';
import { eq } from 'drizzle-orm';
import { useParams } from "react-router";
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

export async function action({ request, context, params }: Route.ActionArgs) {
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

  const validatedData = submission.value;

  try {
    const existingLog = await context.db.query.mangaLogs.findFirst({
      where: eq(mangaLogs.id, params.mangaId),
    });

    if (existingLog) {
      // Update existing manga log
      const updatedLog = await context.db
        .update(mangaLogs)
        .set({
          ...validatedData,
          user_id: session.user.id,
        })
        .where(eq(mangaLogs.id, params.mangaId))
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
          ...validatedData,
          id: params.mangaId, // Use mangaId from params as the ID
          user_id: session.user.id,
        })
        .returning();
      return {
        data: newLog[0],
        status: 201,
      };
    }
  } catch (error) {
    return {
      error: "An unexpected error occurred",
      status: 500,
    };
  }
}

export default function MangaRoute({ loaderData }: Route.ComponentProps) {
  const { mangaId } = useParams();

  const manga = loaderData?.manga;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Manga Log</h1>
      <MangaForm
        mangaId={mangaId || ""}
        defaultValues={manga}
      />
    </div>
  );
}
