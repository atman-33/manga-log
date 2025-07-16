import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";

const mangaLogSchema = z.object({
  id: z.string().uuid().optional(), // Add optional id field
  title: z.string().min(1, "Title is required"),
  score: z.preprocess(
    (a) =>
      a === undefined || a === "" ? undefined : parseFloat(z.string().parse(a)),
    z.number().min(1).max(5).optional(),
  ),
  is_completed: z.preprocess((a) => a === "true" || a === true, z.boolean()),
  volume_progress: z.preprocess(
    (a) =>
      a === undefined || a === ""
        ? undefined
        : parseInt(z.string().parse(a), 10),
    z.number().int().min(0).optional(),
  ),

  chapter_progress: z.preprocess(
    (a) =>
      a === undefined || a === ""
        ? undefined
        : parseInt(z.string().parse(a), 10),
    z.number().int().min(0).optional(),
  ),
  note: z.string().optional(),
});

const useMangaForm = () => {
  const form = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: mangaLogSchema });
    },
  });

  return form;
};

export { mangaLogSchema, useMangaForm };
