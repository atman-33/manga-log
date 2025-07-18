import { EmptyState } from './empty-state';
import { MangaCard } from './manga-card';

interface MangaGridProps {
  mangaLogs: any[];
  searchTerm: string;
  statusFilter: string;
  onDelete: (event: React.FormEvent<HTMLFormElement>, logId: string, logTitle: string) => Promise<void>;
}

export function MangaGrid({ mangaLogs, searchTerm, statusFilter, onDelete }: MangaGridProps) {
  if (mangaLogs.length === 0) {
    return <EmptyState searchTerm={searchTerm} statusFilter={statusFilter} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mangaLogs.map((log) => (
        <MangaCard
          key={log.id}
          log={log}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}