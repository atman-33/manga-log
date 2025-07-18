import { useMemo, useState } from 'react';
import { KeyboardShortcutsHelp } from '~/components/keyboard-shortcuts-help';
import { AlertDialog } from '~/components/react-call/alert-dialog';
import { useCommonShortcuts } from '~/hooks/use-keyboard-shortcuts';
import { getAuth } from '~/lib/auth/auth.server';
import { generateMeta } from '~/lib/meta';
import type { Route } from './+types/route';
import { MangaGrid } from './components/manga-grid';
import { PageHeader } from './components/page-header';
import { SearchAndFilters } from './components/search-and-filters';
import { StatsCards } from './components/stats-cards';

export function meta(_: Route.MetaArgs) {
  return generateMeta({
    title: "My Manga Collection",
    description: "View and manage your personal manga collection. Track reading progress, scores, and notes for all your favorite series.",
    keywords: ["manga collection", "reading progress", "manga library", "personal collection"],
  });
}

export const loader = async ({ context, request }: Route.LoaderArgs) => {
  const auth = getAuth(context);
  const session = await auth.api.getSession({ headers: request.headers });
  const user = session?.user;

  if (!user) {
    return { mangaLogs: [] };
  }

  const mangaLogs = await context.db.query.mangaLogs.findMany({
    where: (mangaLogs, { eq }) => eq(mangaLogs.user_id, user.id),
    orderBy: (mangaLogs, { desc }) => [desc(mangaLogs.updated_at)],
  });

  return { mangaLogs };
};

const App = ({ loaderData }: Route.ComponentProps) => {
  const { mangaLogs } = loaderData;
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('updated');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  // Initialize keyboard shortcuts
  const shortcuts = useCommonShortcuts(() => setShowKeyboardHelp(!showKeyboardHelp));

  const handleDeleteConfirmation = async (
    event: React.FormEvent<HTMLFormElement>,
    logId: string,
    logTitle: string,
  ) => {
    event.preventDefault();
    const formElement = event.currentTarget;

    const result = await AlertDialog.call({
      title: 'Delete Confirmation',
      message: `Are you sure you want to delete "${logTitle}"? This action cannot be undone.`,
    });

    if (result === 'action') {
      formElement.submit();
    }
  };

  const filteredMangaLogs = useMemo(() => {
    let logs = [...mangaLogs];

    // Filter by search term
    if (searchTerm) {
      logs = logs.filter((log) =>
        log.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      logs = logs.filter((log) =>
        statusFilter === 'completed' ? log.is_completed : !log.is_completed
      );
    }

    // Sort logs
    logs.sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return (b.score ?? 0) - (a.score ?? 0);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'updated':
        default:
          return new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime();
      }
    });

    return logs;
  }, [mangaLogs, searchTerm, sortBy, statusFilter]);

  const stats = useMemo(() => {
    const total = mangaLogs.length;
    const completed = mangaLogs.filter(log => log.is_completed).length;
    const inProgress = total - completed;
    const avgScore = mangaLogs.length > 0
      ? mangaLogs.reduce((sum, log) => sum + (log.score || 0), 0) / mangaLogs.filter(log => log.score).length
      : 0;

    return { total, completed, inProgress, avgScore };
  }, [mangaLogs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        <PageHeader />
        <StatsCards stats={stats} />
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <MangaGrid
          mangaLogs={filteredMangaLogs}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onDelete={handleDeleteConfirmation}
        />
      </div>

      {/* Keyboard Shortcuts Help */}
      <KeyboardShortcutsHelp shortcuts={shortcuts} />
    </div>
  );
};

export default App;

