import { BookOpen, Edit3, Plus, Search, Star, Trash2, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Form, Link } from 'react-router';
import { AlertDialog } from '~/components/react-call/alert-dialog';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Progress } from '~/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { StarRating } from '~/components/ui/star-rating';
import { getAuth } from '~/lib/auth/auth.server';
import type { Route } from './+types/route';

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
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                My Manga Collection
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Track your reading journey and discover new favorites
              </p>
            </div>

            <Form action="/manga/new" method="post">
              <Button
                type="submit"
                name="_action"
                value="new"
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Manga
              </Button>
            </Form>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Manga</p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.avgScore > 0 ? stats.avgScore.toFixed(1) : '—'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search your manga collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-[180px] bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-[180px] bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Recently Updated</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="score">Highest Score</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Manga Grid */}
        {filteredMangaLogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm || statusFilter !== 'all' ? 'No manga found' : 'Start your manga journey'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Add your first manga to begin tracking your reading progress'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Form action="/manga/new" method="post">
                <Button
                  type="submit"
                  name="_action"
                  value="new"
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Manga
                </Button>
              </Form>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMangaLogs.map((log) => (
              <MangaCard
                key={log.id}
                log={log}
                onDelete={handleDeleteConfirmation}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

// MangaCard Component
interface MangaCardProps {
  log: any;
  onDelete: (event: React.FormEvent<HTMLFormElement>, logId: string, logTitle: string) => Promise<void>;
}

function MangaCard({ log, onDelete }: MangaCardProps) {
  const progressPercentage = log.volume_progress ? Math.min((log.volume_progress / 50) * 100, 100) : 0;

  return (
    <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 overflow-hidden">
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <Link
            to={`/manga/${log.id}/edit`}
            className="flex-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">
              {log.title}
            </h3>
          </Link>

          <div className="flex items-center gap-2 ml-4">
            <Link to={`/manga/${log.id}/edit`}>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-100 dark:hover:bg-purple-900/20"
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
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
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

          {log.score && (
            <div className="flex items-center gap-1">
              <StarRating rating={log.score} size="sm" showValue />
            </div>
          )}
        </div>

        {/* Progress Section */}
        {(log.volume_progress || log.chapter_progress) && (
          <div className="space-y-2 mb-4">
            {log.volume_progress && (
              <div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Volume Progress</span>
                  <span>{log.volume_progress}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            )}

            {log.chapter_progress && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  Chapter {log.chapter_progress}
                </span>
              </div>
            )}
          </div>
        )}

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