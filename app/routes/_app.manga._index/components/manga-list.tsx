import { EmptyState } from './empty-state';
import { MangaListItem } from '~/routes/_app.manga._index/components/manga-list-item';

interface MangaListProps {
  mangaLogs: any[];
  searchTerm: string;
  statusFilter: string;
  onDelete: (event: React.FormEvent<HTMLFormElement>, logId: string, logTitle: string) => Promise<void>;
}

export function MangaList({ mangaLogs, searchTerm, statusFilter, onDelete }: MangaListProps) {
  if (mangaLogs.length === 0) {
    return <EmptyState searchTerm={searchTerm} statusFilter={statusFilter} />;
  }

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
      {/* Header */}
      <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/50 dark:bg-gray-700/50 border-b border-gray-200/50 dark:border-gray-600/50 text-sm font-medium text-gray-600 dark:text-gray-300">
        <div className="col-span-4">Title</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-2 text-center">Score</div>
        <div className="col-span-2 text-center">Progress</div>
        <div className="col-span-2 text-center">Actions</div>
      </div>

      {/* List Items */}
      <div className="divide-y divide-gray-200/50 dark:divide-gray-600/50">
        {mangaLogs.map((log) => (
          <MangaListItem
            key={log.id}
            log={log}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
