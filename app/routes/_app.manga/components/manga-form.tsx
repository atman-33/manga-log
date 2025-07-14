import { Button } from "~/components/ui/button";

// Define a custom type for the errors to match Zod's flattened error structure
type MangaFormErrors = {
  title?: string[];
  score?: string[];
  status?: string[];
  volume_progress?: string[];
  chapter_progress?: string[];
  note?: string[];
};

interface MangaFormProps {
  defaultValues?: {
    title?: string;
    score?: number;
    status?: string;
    volume_progress?: number;
    chapter_progress?: number;
    note?: string;
  };
  errors?: MangaFormErrors; // Use the custom type for errors
  isSubmitting: boolean;
}

export function MangaForm({ defaultValues, errors, isSubmitting }: MangaFormProps) {
  return (
    <form className="space-y-4"> {/* Changed back to form from div */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={defaultValues?.title}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors?.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="score" className="block text-sm font-medium">
          Score
        </label>
        <input
          type="number"
          id="score"
          name="score"
          step="0.1"
          min="1"
          max="5"
          defaultValue={defaultValues?.score}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors?.score && (
          <p className="text-red-500 text-sm mt-1">{errors.score[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={defaultValues?.status}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Status</option> {/* Added a default empty option */}
          <option>Reading</option>
          <option>Completed</option>
          <option>On-Hold</option>
          <option>Dropped</option>
          <option>Plan to Read</option>
        </select>
        {errors?.status && (
          <p className="text-red-500 text-sm mt-1">{errors.status[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="volume_progress" className="block text-sm font-medium">
          Volume Progress
        </label>
        <input
          type="number"
          id="volume_progress"
          name="volume_progress"
          defaultValue={defaultValues?.volume_progress}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors?.volume_progress && (
          <p className="text-red-500 text-sm mt-1">{errors.volume_progress[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="chapter_progress" className="block text-sm font-medium">
          Chapter Progress
        </label>
        <input
          type="number"
          id="chapter_progress"
          name="chapter_progress"
          defaultValue={defaultValues?.chapter_progress}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors?.chapter_progress && (
          <p className="text-red-500 text-sm mt-1">{errors.chapter_progress[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="note" className="block text-sm font-medium">
          Note
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          defaultValue={defaultValues?.note}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors?.note && (
          <p className="text-red-500 text-sm mt-1">{errors.note[0]}</p>
        )}
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
