import { Plus } from 'lucide-react';
import { Form } from 'react-router';
import { Button } from '~/components/ui/button';

export function PageHeader() {
  return (
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
    </div>
  );
}