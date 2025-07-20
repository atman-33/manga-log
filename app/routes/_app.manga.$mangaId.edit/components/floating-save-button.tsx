import { Save } from 'lucide-react';

interface FloatingSaveButtonProps {
  formId: string;
  isLoading: boolean;
}

export function FloatingSaveButton({ formId, isLoading }: FloatingSaveButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="submit"
        form={formId}
        disabled={isLoading}
        className={`
          h-14 w-14 rounded-full 
          ${isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 cursor-pointer'
          }
          text-white shadow-lg hover:shadow-xl 
          transition-all duration-300 transform hover:scale-110 active:scale-95 
          flex justify-center items-center
        `}
        title={isLoading ? "Saving..." : "Save Manga"}
        aria-label={isLoading ? "Saving..." : "Save Manga"}
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Save className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}