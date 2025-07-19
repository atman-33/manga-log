import type { FieldMetadata, FormMetadata } from '@conform-to/react';
import { useState } from 'react';
import { X } from 'lucide-react';
import { ConformInput } from '~/components/conform/conform-input';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import { GoogleBooksSearch } from './google-books-search';

interface BasicInfoStepProps {
  titleField: FieldMetadata<unknown>;
  thumbnailField: FieldMetadata<unknown>;
  form: FormMetadata<any>;
  isVisible: boolean;
}

export function BasicInfoStep({ titleField, thumbnailField, form, isVisible }: BasicInfoStepProps) {
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(
    (thumbnailField.initialValue as string) || null
  );

  const handleSelectBook = (title: string, thumbnail?: string) => {
    // Update form fields using Conform's update method
    form.update({
      name: titleField.name,
      value: title,
    });

    form.update({
      name: thumbnailField.name,
      value: thumbnail || '',
    });

    setSelectedThumbnail(thumbnail || null);
  };

  const handleRemoveThumbnail = () => {
    // Clear the thumbnail field using Conform's update method
    form.update({
      name: thumbnailField.name,
      value: '',
    });

    setSelectedThumbnail(null);
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
        <div className="relative flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
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
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemoveThumbnail}
            className="absolute top-2 right-2 h-6 w-6 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900/50 dark:hover:bg-red-900/70 text-red-600 dark:text-red-400"
            title="Remove cover image"
          >
            <X className="h-3 w-3" />
          </Button>
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