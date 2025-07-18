import type { FieldMetadata } from '@conform-to/react';
import type { InferSelectModel } from 'drizzle-orm';
import { ConformInput } from '~/components/conform/conform-input';
import { ConformSwitch } from '~/components/conform/conform-switch';
import { Label } from '~/components/ui/label';
import { StarRating } from '~/components/ui/star-rating';
import type { mangaLogs } from '~/database/schema';

type MangaLog = InferSelectModel<typeof mangaLogs>;

interface RatingStatusStepProps {
  scoreField: FieldMetadata<unknown>;
  isCompletedField: FieldMetadata<unknown>;
  defaultValues?: MangaLog;
  isVisible: boolean;
}

export function RatingStatusStep({
  scoreField,
  isCompletedField,
  defaultValues,
  isVisible
}: RatingStatusStepProps) {
  return (
    <div className={`space-y-6 ${isVisible ? 'animate-in fade-in-50 duration-300' : 'hidden'}`}>
      <div>
        <Label className="text-lg font-medium text-gray-900 dark:text-white mb-4 block">
          Your Rating
        </Label>
        <div className="space-y-4">
          <ConformInput
            metadata={scoreField}
            type="number"
            id="score"
            name="score"
            step="0.1"
            min="1"
            max="5"
            placeholder="Rate from 1.0 to 5.0"
            className="w-full text-lg p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 transition-colors bg-white/50 dark:bg-gray-700/50"
          />
          {defaultValues?.score && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Current rating:</span>
              <StarRating rating={defaultValues.score} showValue />
            </div>
          )}
        </div>
      </div>

      <div>
        <Label className="text-lg font-medium text-gray-900 dark:text-white mb-4 block">
          Reading Status
        </Label>
        <div className="bg-white/50 dark:bg-gray-700/50 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600">
          <ConformSwitch
            metadata={isCompletedField}
            id="is_completed"
            className="hover:cursor-pointer"
            label="Mark as Completed"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Toggle this when you've finished reading the entire series
          </p>
        </div>
      </div>
    </div>
  );
}