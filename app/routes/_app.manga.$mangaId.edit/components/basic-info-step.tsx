import type { FieldMetadata } from '@conform-to/react';
import { ConformInput } from '~/components/conform/conform-input';
import { Label } from '~/components/ui/label';

interface BasicInfoStepProps {
  titleField: FieldMetadata<unknown>;
  isVisible: boolean;
}

export function BasicInfoStep({ titleField, isVisible }: BasicInfoStepProps) {
  return (
    <div className={`space-y-6 ${isVisible ? 'animate-in fade-in-50 duration-300' : 'hidden'}`}>
      <div>
        <Label htmlFor="title" className="text-lg font-medium text-gray-900 dark:text-white mb-2 block">
          Manga Title *
        </Label>
        <ConformInput
          metadata={titleField}
          type="text"
          id="title"
          name="title"
          placeholder="Enter the manga title..."
          className="w-full text-lg p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 transition-colors bg-white/50 dark:bg-gray-700/50"
        />
      </div>
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Tips for adding manga:</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li>• Use the official English title when possible</li>
          <li>• Include subtitle if it's part of the official name</li>
          <li>• You can always edit this information later</li>
        </ul>
      </div>
    </div>
  );
}