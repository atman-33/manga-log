import type { FieldMetadata } from '@conform-to/react';
import { ConformTextarea } from '~/components/conform/conform-textarea';
import { Label } from '~/components/ui/label';

interface NotesStepProps {
  noteField: FieldMetadata<unknown>;
  isVisible: boolean;
}

export function NotesStep({ noteField, isVisible }: NotesStepProps) {
  return (
    <div className={`space-y-6 ${isVisible ? 'animate-in fade-in-50 duration-300' : 'hidden'}`}>
      <div>
        <Label htmlFor="note" className="text-lg font-medium text-gray-900 dark:text-white mb-2 block">
          Personal Notes
        </Label>
        <ConformTextarea
          metadata={noteField}
          id="note"
          name="note"
          rows={6}
          placeholder="Share your thoughts, favorite moments, or anything you'd like to remember about this manga..."
          className="w-full text-lg p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 transition-colors bg-white/50 dark:bg-gray-700/50 resize-none"
        />
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Note Ideas:</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li>• What did you love about this manga?</li>
          <li>• Favorite characters or story arcs</li>
          <li>• Would you recommend it to others?</li>
          <li>• Any memorable quotes or scenes</li>
        </ul>
      </div>
    </div>
  );
}