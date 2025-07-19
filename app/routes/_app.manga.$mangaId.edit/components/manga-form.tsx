import { getFormProps } from '@conform-to/react';
import { type InferSelectModel } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import { useFetcher, useNavigate } from 'react-router';
import { showToast } from '~/components/custom-sonner';
import type { mangaLogs } from '~/database/schema';
import { useMangaForm } from '../hooks/use-manga-form';
import { BasicInfoStep } from './basic-info-step';
import { FloatingSaveButton } from './floating-save-button';
import { FormHeader } from './form-header';
import { NavigationButtons } from './navigation-buttons';
import { NotesStep } from './notes-step';
import { ProgressStep } from './progress-step';
import { RatingStatusStep } from './rating-status-step';
import { StepIndicator } from './step-indicator';

type MangaLog = InferSelectModel<typeof mangaLogs>;

interface MangaFormProps {
  mangaId: string;
  defaultValues?: MangaLog | undefined;
}

export function MangaForm({ defaultValues }: MangaFormProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, { title, score, is_completed, volume_progress, chapter_progress, note, thumbnail }] = useMangaForm(defaultValues);

  const validateCurrentStep = () => {
    // Step 1 validation: Title is required
    if (currentStep === 1) {
      const titleValue = title.value || '';
      if (!titleValue.trim()) {
        form.validate();
        return false;
      }
    }

    // Step 2 validation: Score must be within valid range if provided
    if (currentStep === 2) {
      const scoreValue = score.value;
      if (scoreValue !== undefined && scoreValue !== null && scoreValue !== '') {
        const numScore = Number(scoreValue);
        if (isNaN(numScore) || numScore < 0 || numScore > 5) {
          form.validate();
          return false;
        }
      }
    }

    // Step 3 validation: Progress values must be positive integers if provided
    if (currentStep === 3) {
      const volumeValue = volume_progress.value;
      const chapterValue = chapter_progress.value;

      if (volumeValue !== undefined && volumeValue !== null && volumeValue !== '') {
        const numVolume = Number(volumeValue);
        if (isNaN(numVolume) || numVolume < 0 || !Number.isInteger(numVolume)) {
          form.validate();
          return false;
        }
      }

      if (chapterValue !== undefined && chapterValue !== null && chapterValue !== '') {
        const numChapter = Number(chapterValue);
        if (isNaN(numChapter) || numChapter < 0) {
          form.validate();
          return false;
        }
      }
    }

    // Step 4 validation: No specific validation needed for notes
    return true;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepNumber: number) => {
    // If clicking on the same step, do nothing
    if (stepNumber === currentStep) {
      return;
    }

    // Always validate current step before moving to any other step
    if (!validateCurrentStep()) {
      return;
    }

    // Move to the selected step
    setCurrentStep(stepNumber);
  };

  const handleCancel = () => {
    navigate('/manga');
  };

  const isLoading = fetcher.state === 'submitting' || fetcher.state === 'loading';

  // Handle form submission results
  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.status === 200) {
        showToast('success', `Updated "${fetcher.data.data?.title}" successfully!`);
        setTimeout(() => navigate('/manga'), 1500);
      } else if (fetcher.data.status === 201) {
        showToast('success', `Added "${fetcher.data.data?.title}" to your collection!`);
        setTimeout(() => navigate('/manga'), 1500);
      } else if (fetcher.data.error) {
        showToast('error', fetcher.data.error);
      }
    }
  }, [fetcher.data, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <FormHeader isEditing={!!defaultValues} />
          <StepIndicator currentStep={currentStep} onStepClick={goToStep} />

          {/* Form */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8">
            <fetcher.Form {...getFormProps(form)} method='post'>
              <BasicInfoStep
                titleField={title}
                thumbnailField={thumbnail}
                form={form}
                isVisible={currentStep === 1}
              />

              <RatingStatusStep
                scoreField={score}
                isCompletedField={is_completed}
                defaultValues={defaultValues}
                isVisible={currentStep === 2}
              />

              <ProgressStep
                volumeProgressField={volume_progress}
                chapterProgressField={chapter_progress}
                isVisible={currentStep === 3}
              />

              <NotesStep
                noteField={note}
                isVisible={currentStep === 4}
              />

              <NavigationButtons
                currentStep={currentStep}
                onPrevStep={prevStep}
                onNextStep={nextStep}
                onCancel={handleCancel}
              />

              {/* Error Display */}
              {fetcher.data?.error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-red-600 dark:text-red-400">{fetcher.data.error}</p>
                </div>
              )}
            </fetcher.Form>
          </div>
        </div>
      </div>

      <FloatingSaveButton formId={form.id} isLoading={isLoading} />
    </div>
  );
}
