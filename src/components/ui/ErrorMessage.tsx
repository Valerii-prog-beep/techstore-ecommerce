interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-center text-red-600 text-lg mb-3">
        <span className="mr-2">⚠️</span>
        Error
      </div>
      <p className="text-red-700 text-center mb-4">{message}</p>
      {onRetry && (
        <div className="flex justify-center gap-3">
          <button
            onClick={onRetry}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Reload Page
          </button>
        </div>
      )}
    </div>
  );
};