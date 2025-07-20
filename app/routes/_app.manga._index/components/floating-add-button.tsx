import { Plus } from 'lucide-react';
import { Form } from 'react-router';
import { Button } from '~/components/ui/button';

export function FloatingAddButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Form action="/manga/new" method="post">
        <button
          type="submit"
          name="_action"
          value="new"
          // size="lg"
          className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 flex justify-center items-center cursor-pointer"
          aria-label="Add New Manga"
        >
          <Plus className="w-6 h-6" />
        </button>
      </Form>
    </div>
  );
}