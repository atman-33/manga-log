import { getFormProps } from '@conform-to/react';
import { type InferSelectModel } from 'drizzle-orm';
import { Form } from 'react-router';
import { ConformInput } from '~/components/conform/conform-input';
import { ConformTextarea } from '~/components/conform/conform-textarea';
import { Button } from "~/components/ui/button";
import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';
import type { mangaLogs } from '~/database/schema';
import { useMangaForm } from '../hooks/use-manga-form';

type MangaLog = InferSelectModel<typeof mangaLogs>;

interface MangaFormProps {
  defaultValues?: MangaLog | undefined;
  isSubmitting: boolean;
}

export function MangaForm({ defaultValues, isSubmitting }: MangaFormProps) {
  const [form, { title, score, is_completed, volume_progress, chapter_progress, note }] = useMangaForm();
  return (
    <Form {...getFormProps(form)} className="space-y-4"> {/* Changed back to form from div */}
      <div>
        <Label htmlFor="title" className="block text-sm font-medium">
          Title
        </Label>
        <ConformInput
          metadata={title}
          type="text"
          id="title"
          name="title"
          defaultValue={defaultValues?.title}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <Label htmlFor="score" className="block text-sm font-medium">
          Score
        </Label>
        <ConformInput
          metadata={score}
          type="number"
          id="score"
          name="score"
          step="0.1"
          min="1"
          max="5"
          defaultValue={defaultValues?.score ?? undefined}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <Label htmlFor="status" className="block text-sm font-medium">
          Status
        </Label>
        <div className="flex items-center space-x-2">
          {/* TODO: need to link conform */}
          <Switch
            id="is_completed"
            checked={is_completed.value === true}
            className="hover:cursor-pointer"
          />
          <Label htmlFor="is_completed">Completed</Label>
        </div>
      </div>
      <div>
        <Label htmlFor="volume_progress" className="block text-sm font-medium">
          Volume Progress
        </Label>
        <ConformInput
          metadata={volume_progress}
          type="number"
          id="volume_progress"
          name="volume_progress"
          defaultValue={defaultValues?.volume_progress ?? undefined}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <Label htmlFor="chapter_progress" className="block text-sm font-medium">
          Chapter Progress
        </Label>
        <ConformInput
          metadata={chapter_progress}
          type="number"
          id="chapter_progress"
          name="chapter_progress"
          defaultValue={defaultValues?.chapter_progress ?? undefined}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <Label htmlFor="note" className="block text-sm font-medium">
          Note
        </Label>
        <ConformTextarea
          metadata={note}
          id="note"
          name="note"
          rows={3}
          defaultValue={defaultValues?.note ?? ''}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </Form>
  );
}
