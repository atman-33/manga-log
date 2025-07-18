import { BookOpen, CheckCircle, FileText, Star } from 'lucide-react';
import { Progress } from '~/components/ui/progress';

const STEPS = [
  { id: 1, title: 'Basic Info', icon: BookOpen, description: 'Title and basic details' },
  { id: 2, title: 'Rating & Status', icon: Star, description: 'Score and completion status' },
  { id: 3, title: 'Progress', icon: CheckCircle, description: 'Reading progress tracking' },
  { id: 4, title: 'Notes', icon: FileText, description: 'Personal notes and thoughts' },
];

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (stepNumber: number) => void;
}

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Mobile-first Progress Indicator */}
      <div className="flex items-center justify-center mb-4 overflow-x-auto px-2">
        <div className="flex items-center min-w-max py-2">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                type="button"
                onClick={() => onStepClick(step.id)}
                className={`group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer ${currentStep === step.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-transparent text-white shadow-lg'
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-purple-400 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                title={`Go to ${step.title}`}
              >
                <step.icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${currentStep >= step.id ? '' : 'group-hover:scale-110'
                    }`}
                />
              </button>
              {index < STEPS.length - 1 && (
                <div
                  className={`w-8 sm:w-12 h-0.5 mx-1 sm:mx-2 transition-all duration-300 ${currentStep > step.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                      : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Labels - Mobile Responsive */}
      <div className="hidden sm:flex items-center justify-between mb-4 px-1">
        {STEPS.map((step) => (
          <div key={`label-${step.id}`} className="flex flex-col items-center text-center max-w-[120px]">
            <span
              className={`text-sm font-medium transition-colors duration-200 ${currentStep >= step.id
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-gray-500 dark:text-gray-400'
                }`}
            >
              {step.title}
            </span>
            <span
              className={`text-xs mt-1 transition-colors duration-200 ${currentStep === step.id
                  ? 'text-gray-700 dark:text-gray-300'
                  : 'text-gray-400 dark:text-gray-500'
                }`}
            >
              {step.description}
            </span>
          </div>
        ))}
      </div>

      {/* Current Step Info */}
      <div className="text-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          {STEPS[currentStep - 1].title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].description}
        </p>
      </div>
      <Progress value={(currentStep / STEPS.length) * 100} className="mt-4" />
    </div>
  );
}

export { STEPS };