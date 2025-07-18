import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { STEPS } from './step-indicator';

interface NavigationButtonsProps {
  currentStep: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  onCancel: () => void;
}

export function NavigationButtons({
  currentStep,
  onPrevStep,
  onNextStep,
  onCancel
}: NavigationButtonsProps) {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      {/* Mobile Layout - Stack buttons vertically */}
      <div className="flex flex-col gap-3 sm:hidden">
        {/* Navigation Actions */}
        <div className="flex gap-2">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={onPrevStep}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
          )}

          {currentStep < STEPS.length && (
            <Button
              type="button"
              onClick={onNextStep}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex items-center justify-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex justify-between items-center">
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={onPrevStep}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
        </div>

        <div className="flex gap-3">
          {currentStep < STEPS.length && (
            <Button
              type="button"
              onClick={onNextStep}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}