import type { InferSelectModel } from 'drizzle-orm';
import { BookOpen, Edit3, Trash2 } from 'lucide-react';
import { Form, Link } from 'react-router';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { StarRating } from '~/components/star-rating';
import type { mangaLogs } from '~/database/schema';
import { getReadingProgress } from '~/lib/volume-progress';

interface MangaListItemProps {
  log: InferSelectModel<typeof mangaLogs>;
  onDelete: (event: React.FormEvent<HTMLFormElement>, logId: string, logTitle: string) => Promise<void>;
}

export function MangaListItem({ log, onDelete }: MangaListItemProps) {
  const readingProgress = getReadingProgress(log.volume_progress, log.chapter_progress);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors group">
      {/* Title with thumbnail and actions */}
      <div className="col-span-1 sm:col-span-4 flex items-center gap-3">
        <div className="flex-shrink-0 w-12 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
          {log.thumbnail ? (
            <img
              src={log.thumbnail}
              alt={`Cover of ${log.title}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-gray-400 dark:text-gray-500" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <Link
              to={`/manga/${log.id}/edit`}
              className="block hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {log.title}
              </h3>
            </Link>
            {log.note && (
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                {log.note}
              </p>
            )}
          </div>
          {/* Actions buttons - Mobile only */}
          <div className="flex gap-1 flex-shrink-0 sm:hidden">
            <Link to={`/manga/${log.id}/edit`}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-purple-100 dark:hover:bg-purple-900/20"
                title="Edit manga"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </Link>
            <Form
              action={`/manga/${log.id}/delete`}
              method="post"
              className="contents"
              onSubmit={(event) => onDelete(event, log.id, log.title)}
            >
              <input type="hidden" name="_action" value="delete" />
              <Button
                variant="ghost"
                size="icon"
                type="submit"
                className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                title="Delete manga"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </Form>
          </div>
        </div>
      </div>

      {/* Mobile: Status, Score, Progress in one row */}
      <div className="col-span-1 sm:hidden flex items-center justify-between gap-4 mt-2">
        <div className="flex items-center gap-2">
          <Badge
            variant={log.is_completed ? "success" : "secondary"}
            className="text-xs"
          >
            {log.is_completed ? "Complete" : "Reading"}
          </Badge>
          <StarRating rating={log.score} size="sm" showValue={false} />
          {log.score && (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {log.score.toFixed(1)}
            </span>
          )}
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {readingProgress.volumeText}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {readingProgress.label}
          </div>
        </div>
      </div>

      {/* Desktop: Status */}
      <div className="hidden sm:flex col-span-2 items-center justify-center">
        <Badge
          variant={log.is_completed ? "success" : "secondary"}
          className="text-xs"
        >
          {log.is_completed ? "Complete" : "Reading"}
        </Badge>
      </div>

      {/* Desktop: Score */}
      <div className="hidden sm:flex col-span-2 items-center justify-center">
        <StarRating rating={log.score} size="sm" showValue={false} />
        {log.score && (
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            {log.score.toFixed(1)}
          </span>
        )}
      </div>

      {/* Desktop: Progress */}
      <div className="hidden sm:flex col-span-2 items-center justify-center">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {readingProgress.volumeText}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {readingProgress.label}
          </div>
        </div>
      </div>

      {/* Desktop: Actions */}
      <div className="hidden sm:flex col-span-2 items-center justify-center gap-1">
        <Link to={`/manga/${log.id}/edit`}>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-purple-100 dark:hover:bg-purple-900/20"
            title="Edit manga"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </Link>

        <Form
          action={`/manga/${log.id}/delete`}
          method="post"
          className="contents"
          onSubmit={(event) => onDelete(event, log.id, log.title)}
        >
          <input type="hidden" name="_action" value="delete" />
          <Button
            variant="ghost"
            size="icon"
            type="submit"
            className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
            title="Delete manga"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </Form>
      </div>
    </div>
  );
}