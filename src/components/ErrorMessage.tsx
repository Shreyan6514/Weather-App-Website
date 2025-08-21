import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-8">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-6">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h3>
          <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">{message}</p>
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg"
          >
            <RefreshCw className="w-6 h-6" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};