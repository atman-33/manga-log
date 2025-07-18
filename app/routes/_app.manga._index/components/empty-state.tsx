import { BookOpen, Plus } from 'lucide-react';
import { Form } from 'react-router';
import { Button } from '~/components/ui/button';

interface EmptyStateProps {
  searchTerm: string;
  statusFilter: string;
}

export function EmptyState({ searchTerm, statusFilter }: EmptyStateProps) {
  const hasFilters = searchTerm || statusFilter !== 'all';

  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <BookOpen className="w-12 h-12 text-white" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
        {hasFilters ? 'No manga found' : 'Start your manga journey'}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {hasFilters
          ? 'Try adjusting your search or filters'
          : 'Add your first manga to begin tracking your reading progress'
        }
      </p>
      {!hasFilters && (
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
  );
}