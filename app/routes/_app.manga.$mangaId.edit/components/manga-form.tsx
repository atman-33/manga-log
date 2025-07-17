import { getFormProps } from '@conform-to/react';
import { type InferSelectModel } from 'drizzle-orm';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  FileText,
  Save,
  Star,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFetcher, useNavigate } from 'react-router';
import { ConformInput } from '~/components/conform/conform-input';
import { ConformSwitch } from '~/components/conform/conform-switch';
import { ConformTextarea } from '~/components/conform/conform-textarea';
import { showToast } from '~/components/custom-sonner';
import { Button } from "~/components/ui/button";
import { Label } from '~/components/ui/label';
import { Progress } from '~/components/ui/progress';
import { StarRating } from '~/components/ui/star-rating';
import type { mangaLogs } from '~/database/schema';
import { useMangaForm } from '../hooks/use-manga-form';

type MangaLog = InferSelectModel<typeof mangaLogs>;

interface MangaFormProps {
  mangaId: string;
  defaultValues?: MangaLog | undefined;
}

const STEPS = [
  { id: 1, title: 'Basic Info', icon: BookOpen, description: 'Title and basic details' },
  { id: 2, title: 'Rating & Status', icon: Star, description: 'Score and completion status' },
  { id: 3, title: 'Progress', icon: CheckCircle, description: 'Reading progress tracking' },
  { id: 4, title: 'Notes', icon: FileText, description: 'Personal notes and thoughts' },
];

export function MangaForm({ defaultValues }: MangaFormProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, { title, score, is_completed, volume_progress, chapter_progress, note }] = useMangaForm(defaultValues);

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = () => {
    navigate('/manga');
  };

  const isLoading = fetcher.state === 'submitting' || fetcher.state === 'loading';

  // Handle form submission results
  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.status === 200) {
        showToast('success', `${defaultValues ? 'Updated' : 'Added'} "${fetcher.data.data?.title}" successfully!`);
        setTimeout(() => navigate('/manga'), 1500);
      } else if (fetcher.data.status === 201) {
        showToast('success', `Added "${fetcher.data.data?.title}" to your collection!`);
        setTimeout(() => navigate('/manga'), 1500);
      } else if (fetcher.data.error) {
        showToast('error', fetcher.data.error);
      }
    }
  }, [fetcher.data, navigate, defaultValues]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              {defaultValues ? 'Edit Manga' : 'Add New Manga'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {defaultValues ? 'Update your manga details' : 'Add a new manga to your collection'}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${currentStep >= step.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-transparent text-white'
                    : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                    }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${currentStep > step.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                      : 'bg-gray-300 dark:bg-gray-600'
                      }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {STEPS[currentStep - 1].title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {STEPS[currentStep - 1].description}
              </p>
            </div>
            <Progress value={(currentStep / STEPS.length) * 100} className="mt-4" />
          </div>

          {/* Form */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8">
            <fetcher.Form {...getFormProps(form)} method='post'>
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in-50 duration-300">
                  <div>
                    <Label htmlFor="title" className="text-lg font-medium text-gray-900 dark:text-white mb-2 block">
                      Manga Title *
                    </Label>
                    <ConformInput
                      metadata={title}
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
              )}

              {/* Step 2: Rating & Status */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in-50 duration-300">
                  <div>
                    <Label className="text-lg font-medium text-gray-900 dark:text-white mb-4 block">
                      Your Rating
                    </Label>
                    <div className="space-y-4">
                      <ConformInput
                        metadata={score}
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
                        metadata={is_completed}
                        id="is_completed"
                        className="hover:cursor-pointer"
                        label='Mark as Completed'
                      />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Toggle this when you've finished reading the entire series
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Progress */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in-50 duration-300">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="volume_progress" className="text-lg font-medium text-gray-900 dark:text-white mb-2 block">
                        Volume Progress
                      </Label>
                      <ConformInput
                        metadata={volume_progress}
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
                        metadata={chapter_progress}
                        type="number"
                        id="chapter_progress"
                        name="chapter_progress"
                        placeholder="Last chapter read"
                        className="w-full text-lg p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 transition-colors bg-white/50 dark:bg-gray-700/50"
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Progress Tracking Tips:</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Track either volumes, chapters, or both</li>
                      <li>• Leave blank if you're not sure about your progress</li>
                      <li>• You can update this anytime as you read</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 4: Notes */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in-50 duration-300">
                  <div>
                    <Label htmlFor="note" className="text-lg font-medium text-gray-900 dark:text-white mb-2 block">
                      Personal Notes
                    </Label>
                    <ConformTextarea
                      metadata={note}
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
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-3">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleCancel}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </div>

                <div className="flex gap-3">
                  {currentStep < STEPS.length ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex items-center gap-2"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Manga
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

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
    </div>
  );
}
