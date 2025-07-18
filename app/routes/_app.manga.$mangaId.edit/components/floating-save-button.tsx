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
          group relative w-16 h-16 
          bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800
          hover:from-emerald-500 hover:via-green-600 hover:to-teal-700
          active:from-emerald-600 active:via-green-600 active:to-teal-700
          disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600
          text-white rounded-full 
          shadow-lg shadow-green-500/15 
          hover:shadow-xl hover:shadow-green-500/20 
          hover:scale-105 active:scale-95
          transition-all duration-300 ease-out
          flex items-center justify-center
          backdrop-blur-sm
          ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1'}
        `}
        title={isLoading ? "Saving..." : "Save Manga"}
      >
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/10 to-teal-400/10 blur-lg group-hover:blur-xl transition-all duration-300" />

        {/* Button content */}
        <div className="relative z-10">
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-6 h-6 drop-shadow-sm" />
          )}
        </div>

        {/* Ripple effect on hover */}
        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 group-active:opacity-20 transition-opacity duration-200" />
      </button>
    </div>
  );
}