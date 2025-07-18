import { Search } from 'lucide-react';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
}

export function SearchAndFilters({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  statusFilter,
  setStatusFilter,
}: SearchAndFiltersProps) {
  return (
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
  );
}