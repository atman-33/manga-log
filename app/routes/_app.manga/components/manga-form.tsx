import { Button } from "~/components/ui/button";

export function MangaForm() {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          name="status"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option>Reading</option>
          <option>Completed</option>
          <option>On-Hold</option>
          <option>Dropped</option>
          <option>Plan to Read</option>
        </select>
      </div>
      <div>
        <label htmlFor="volume_progress" className="block text-sm font-medium">
          Volume Progress
        </label>
        <input
          type="number"
          id="volume_progress"
          name="volume_progress"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="chapter_progress" className="block text-sm font-medium">
          Chapter Progress
        </label>
        <input
          type="number"
          id="chapter_progress"
          name="chapter_progress"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="note" className="block text-sm font-medium">
          Note
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
