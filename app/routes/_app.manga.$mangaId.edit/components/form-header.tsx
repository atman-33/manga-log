import { X } from 'lucide-react';
import { Button } from '~/components/ui/button';

interface FormHeaderProps {
  isEditing: boolean;
  onCancel?: () => void;
}

export function FormHeader({ isEditing, onCancel }: FormHeaderProps) {
  return (
    <div className="relative text-center mb-8">
      {/* Cancel button in top-right corner */}
      {onCancel && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="キャンセル"
        >
          <X className="w-5 h-5" />
        </Button>
      )}

      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
        {isEditing ? 'Edit Manga' : 'Add New Manga'}
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        {isEditing ? 'Update your manga details' : 'Add a new manga to your collection'}
      </p>
    </div>
  );
}