import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import type { InferSelectModel } from 'drizzle-orm';
import { z } from 'zod';
import type { mangaLogs } from '~/database/schema';

type MangaLog = InferSelectModel<typeof mangaLogs>;

const mangaLogSchema = z.object({
  id: z.string().uuid().optional(), // Add optional id field
  title: z.string().min(1, 'Title is required'),
  score: z.preprocess(
    (a) => (a === undefined || a === '' ? 0 : parseFloat(z.string().parse(a))),
    z.number().min(0).max(5),
  ),
  is_completed: z.preprocess((a) => a === 'true' || a === true, z.boolean()),
  volume_progress: z.preprocess(
    (a) =>
      a === undefined || a === '' ? 0 : parseInt(z.string().parse(a), 10),
    z.number().int().min(0),
  ),
  chapter_progress: z.preprocess(
    (a) =>
      a === undefined || a === '' ? 0 : parseInt(z.string().parse(a), 10),
    z.number().int().min(0),
  ),
  note: z.preprocess(
    (a) => (a === undefined || a === '' ? '' : z.string().parse(a)),
    z.string().optional(),
  ),
});

const useMangaForm = (defaultValues?: MangaLog) => {
  const form = useForm({
    defaultValue: defaultValues
      ? {
          id: defaultValues.id,
          title: defaultValues.title,
          score: defaultValues.score?.toString(),
          is_completed: defaultValues.is_completed?.toString(),
          volume_progress: defaultValues.volume_progress?.toString(),
          chapter_progress: defaultValues.chapter_progress?.toString(),
          note: defaultValues.note || '',
        }
      : undefined,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: mangaLogSchema });
    },
    shouldValidate: 'onInput',
  });

  return form;
};

export { mangaLogSchema, useMangaForm };
