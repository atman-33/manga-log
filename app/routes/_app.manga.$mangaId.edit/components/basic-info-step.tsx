import type { FieldMetadata } from '@conform-to/react';
import { useState } from 'react';
import { ConformInput } from '~/components/conform/conform-input';
import { Label } from '~/components/ui/label';
import { GoogleBooksSearch } from './google-books-search';

interface BasicInfoStepProps {
  titleField: FieldMetadata<unknown>;
  thumbnailField: FieldMetadata<unknown>;
  isVisible: boolean;
}

export function BasicInfoStep({ titleField, thumbnailField, isVisible }: BasicInfoStepProps) {
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(
    (thumbnailField.initialValue as string) || null
  );

  const handleSelectBook = (title: string, thumbnail?: string) => {
    // Update the title field value
    const titleInput = document.getElementById('title') as HTMLInputElement;
    if (titleInput) {
      titleInput.value = title;
      titleInput.dispatchEvent(new Event('input', { bubbles: true }));
      titleInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Update the thumbnail field value
    const thumbnailInput = document.getElementById('thumbnail') as HTMLInputElement;
    if (thumbnailInput) {
      thumbnailInput.value = thumbnail || '';
      thumbnailInput.dispatchEvent(new Event('input', { bubbles: true }));
      thumbnailInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    setSelectedThumbnail(thumbnail || null);
  };

  return (
    <div className={`space-y-6 ${isVisible ? 'animate-in fade-in-50 duration-300' : 'hidden'}`}>
      {/* Title Input */}
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

      {/* Hidden Thumbnail Field */}
      <ConformInput
        metadata={thumbnailField}
        type="hidden"
        id="thumbnail"
        name="thumbnail"
      />

      {/* Selected Thumbnail Preview */}
      {selectedThumbnail && (
        <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <img
            src={selectedThumbnail}
            alt="Selected manga cover"
            className="w-12 h-16 object-cover rounded shadow-sm"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              Cover image selected
            </p>
            <p className="text-xs text-green-600 dark:text-green-300">
              This will be used as the manga thumbnail
            </p>
          </div>
        </div>
      )}

      {/* Google Books Search */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <GoogleBooksSearch onSelectBook={handleSelectBook} />
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Tips for adding manga:</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li>• Search above to auto-fill title and get cover image</li>
          <li>• Use the official English title when possible</li>
          <li>• Include subtitle if it's part of the official name</li>
          <li>• You can always edit this information later</li>
        </ul>
      </div>
    </div>
  );
}