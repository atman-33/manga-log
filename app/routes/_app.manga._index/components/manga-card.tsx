import type { InferSelectModel } from 'drizzle-orm';
import { BookOpen, Edit3, Trash2 } from 'lucide-react';
import { Form, Link } from 'react-router';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Progress } from '~/components/ui/progress';
import { StarRating } from '~/components/star-rating';
import type { mangaLogs } from '~/database/schema';
import { getReadingProgress, getReadingAchievement } from '~/lib/volume-progress';

interface MangaCardProps {
  log: InferSelectModel<typeof mangaLogs>;
  onDelete: (event: React.FormEvent<HTMLFormElement>, logId: string, logTitle: string) => Promise<void>;
}

export function MangaCard({ log, onDelete }: MangaCardProps) {
  const readingProgress = getReadingProgress(log.volume_progress, log.chapter_progress);
  const achievement = getReadingAchievement(log.volume_progress, log.chapter_progress);

  return (
    <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 overflow-hidden">
      {/* Thumbnail Section */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100 dark:bg-gray-700">
        {log.thumbnail ? (
          <>
            <img
              src={log.thumbnail}
              alt={`Cover of ${log.title}`}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
            <div className="text-center">
              <BookOpen className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-2 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300" />
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">No Cover</p>
            </div>
          </div>
        )}
      </div>

      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <Link
            to={`/manga/${log.id}/edit`}
            className="flex-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
          >
            <h3 className={`text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 ${!log.thumbnail ? 'mt-0' : ''}`}>
              {log.title}
            </h3>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2 ml-2 sm:ml-4">
            <Link to={`/manga/${log.id}/edit`}>
              <Button
                variant="ghost"
                size="icon"
                className="sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-purple-100 dark:hover:bg-purple-900/20 h-8 w-8 sm:h-10 sm:w-10"
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
                className="sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 h-8 w-8 sm:h-10 sm:w-10"
                title="Delete manga"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </Form>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-4">
          <Badge
            variant={log.is_completed ? "success" : "secondary"}
            className="text-xs"
          >
            {log.is_completed ? "Completed" : "In Progress"}
          </Badge>

          <div className="flex items-center gap-1">
            <StarRating rating={log.score} size="sm" showValue />
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-3 mb-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white font-medium">
                  {readingProgress.volumeText}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {readingProgress.label}
                </span>
                <span className="text-xs">{achievement.emoji}</span>
              </div>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${readingProgress.color}`}
                style={{ width: `${readingProgress.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Note Preview */}
        {log.note && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {log.note}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <span>
            {log.created_at ? new Date(log.created_at).toLocaleDateString() : 'Recently added'}
          </span>
          {log.updated_at && log.updated_at !== log.created_at && (
            <span>Updated {new Date(log.updated_at).toLocaleDateString()}</span>
          )}
        </div>
      </div>

      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}