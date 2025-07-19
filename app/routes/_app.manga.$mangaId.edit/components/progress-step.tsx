import type { FieldMetadata } from '@conform-to/react';
import { ConformInput } from '~/components/conform/conform-input';
import { Label } from '~/components/ui/label';

interface ProgressStepProps {
  volumeProgressField: FieldMetadata<unknown>;
  chapterProgressField: FieldMetadata<unknown>;
  isVisible: boolean;
}

export function ProgressStep({
  volumeProgressField,
  chapterProgressField,
  isVisible
}: ProgressStepProps) {
  return (
    <div className={`space-y-6 ${isVisible ? 'animate-in fade-in-50 duration-300' : 'hidden'}`}>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="volume_progress" className="text-lg font-medium text-gray-900 dark:text-white mb-2 block">
            Volume Progress
          </Label>
          <ConformInput
            metadata={volumeProgressField}
            type="number"
            id="volume_progress"
            name="volume_progress"
            placeholder="Last volume read"
            className="w-full text-lg p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 transition-colors bg-white/50 dark:bg-gray-700/50"
          />
        </div>

        <div>
          <Label htmlFor="chapter_progress" className="text-lg font-medium text-gray-900 dark:text-white mb-2 block">
            Chapter Progress
          </Label>
          <ConformInput
            metadata={chapterProgressField}
            type="number"
            step="0.1"
            id="chapter_progress"
            name="chapter_progress"
            placeholder="Last chapter read (e.g., 15.5)"
            className="w-full text-lg p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 transition-colors bg-white/50 dark:bg-gray-700/50"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Progress Tracking Tips:</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li>• Track either volumes, chapters, or both</li>
          <li>• Chapter progress supports decimals (e.g., 15.5 for halfway through chapter 15)</li>
          <li>• Leave blank if you're not sure about your progress</li>
          <li>• You can update this anytime as you read</li>
        </ul>
      </div>
    </div>
  );
}