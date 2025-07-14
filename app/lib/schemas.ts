import { z } from "zod";

export const MangaLogSchema = z.object({
  id: z.number().int().optional(), // Add optional id field
  title: z.string().min(1, "Title is required"),
  score: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(1).max(5).optional(),
  ),
  status: z
    .enum(["Reading", "Completed", "On-Hold", "Dropped", "Plan to Read"])
    .optional(),
  volume_progress: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().int().min(0).optional(),
  ),
  chapter_progress: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().int().min(0).optional(),
  ),
  note: z.string().optional(),
});
