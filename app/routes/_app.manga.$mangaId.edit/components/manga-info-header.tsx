import { Book, Edit3 } from 'lucide-react';

interface MangaInfoHeaderProps {
  title: string;
  thumbnail?: string;
  isEditing: boolean;
}

export function MangaInfoHeader({ title, thumbnail, isEditing }: MangaInfoHeaderProps) {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={`${title} cover`}
              className="w-12 h-16 object-cover rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
            />
          ) : (
            <div className="w-12 h-16 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center">
              <Book className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          )}
        </div>

        {/* Title and Status */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Edit3 className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {isEditing ? 'Editing' : 'Adding'}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {title || 'New Manga Entry'}
          </h2>
        </div>
      </div>
    </div>
  );
}