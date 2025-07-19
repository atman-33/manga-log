import type { FieldMetadata } from '@conform-to/react';
import type { InferSelectModel } from 'drizzle-orm';
import { useState, useEffect } from 'react';
import { ConformInput } from '~/components/conform/conform-input';
import { ConformSwitch } from '~/components/conform/conform-switch';
import { Label } from '~/components/ui/label';
import { Slider } from '~/components/ui/slider';
import { StarRating } from '~/components/star-rating';
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
  const [sliderValue, setSliderValue] = useState<number[]>([defaultValues?.score || 3]);
  const [inputValue, setInputValue] = useState<string>(defaultValues?.score?.toString() || '');

  // スライダーの値が変更されたときに入力フィールドを更新
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    setInputValue(value[0].toString());
  };

  // 入力フィールドの値が変更されたときにスライダーを更新
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 5) {
      setSliderValue([numValue]);
    }
  };

  // デフォルト値が変更されたときに状態を更新
  useEffect(() => {
    if (defaultValues?.score !== undefined) {
      setSliderValue([defaultValues.score]);
      setInputValue(defaultValues.score.toString());
    }
  }, [defaultValues?.score]);

  return (
    <div className={`space-y-6 ${isVisible ? 'animate-in fade-in-50 duration-300' : 'hidden'}`}>
      <div>
        <Label className="text-lg font-medium text-gray-900 dark:text-white mb-4 block">
          Your Rating
        </Label>
        <div className="space-y-6">
          {/* スライダー */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Use slider:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {sliderValue[0].toFixed(1)} / 5.0
              </span>
            </div>
            <Slider
              value={sliderValue}
              onValueChange={handleSliderChange}
              min={0}
              max={5}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>0.0</span>
              <span>1.0</span>
              <span>2.0</span>
              <span>3.0</span>
              <span>4.0</span>
              <span>5.0</span>
            </div>
          </div>

          {/* 直接入力 */}
          <div className="space-y-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Or enter directly:</span>
            <ConformInput
              metadata={scoreField}
              type="number"
              id="score"
              name="score"
              step="0.1"
              min="1"
              max="5"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Rate from 1.0 to 5.0 (optional)"
              className="w-full text-lg p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 transition-colors bg-white/50 dark:bg-gray-700/50"
            />
          </div>

          {/* 星評価表示 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Current rating:</span>
            <StarRating rating={sliderValue[0]} showValue />
          </div>
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