import { BookOpen, CircleCheck, Star, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    avgScore: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 mb-8">
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
            <CircleCheck className="w-5 h-5 text-white" />
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
            <TrendingUp className="w-5 h-5 text-white" />
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
  );
}