import { parseWithZod } from '@conform-to/zod';
import { eq } from 'drizzle-orm';
import { useParams } from "react-router";
import { mangaLogs } from '~/database/schema';
import { getAuth } from '~/lib/auth/auth.server';
import { generateMeta } from '~/lib/meta';
import type { Route } from './+types/route';

import { MangaForm } from "./components/manga-form";
import { mangaLogSchema } from './hooks/use-manga-form';

export function meta({ data }: Route.MetaArgs) {
  const mangaTitle = data?.manga?.title;

  if (mangaTitle) {
    return generateMeta({
      title: `Edit ${mangaTitle}`,
      description: `Edit your reading progress and details for ${mangaTitle}. Update scores, progress, and personal notes.`,
      keywords: ["edit manga", "manga progress", "update manga"],
    });
  }

  return generateMeta({
    title: "Add New Manga",
    description: "Add a new manga to your collection and start tracking your reading progress.",
    keywords: ["add manga", "new manga", "manga tracking"],
  });
}

export async function loader({ context, params }: Route.LoaderArgs) {
  const manga = await context.db.query.mangaLogs.findFirst({
    where: (mangaLogs, { eq }) => eq(mangaLogs.id, params.mangaId),
    columns: {
      id: true,
      title: true,
      thumbnail: true,
      score: true,
      is_completed: true,
      volume_progress: true,
      chapter_progress: true,
      note: true,
      user_id: true,
      created_at: true,
      updated_at: true
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

  const validatedData = {
    ...submission.value,
    note: submission.value.note ?? '',
  };

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
          updated_at: new Date().toISOString(),
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
      const now = new Date().toISOString();
      const newLog = await context.db
        .insert(mangaLogs)
        .values({
          ...validatedData,
          id: params.mangaId, // Use mangaId from params as the ID
          user_id: session.user.id,
          created_at: now,
          updated_at: now,
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
    <MangaForm
      mangaId={mangaId || ""}
      defaultValues={manga}
    />
  );
}
