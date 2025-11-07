import { motion } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;        // Добавьте эту строку
  onBlur?: () => void;         // И эту строку
  placeholder?: string;
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onFocus,                    // Добавьте в деструктуризацию
  onBlur,                     // И эту тоже
  placeholder = "Search...",
  loading = false
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}      // Передайте в input
        onBlur={onBlur}        // И это тоже
        placeholder={placeholder}
        className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
          />
        ) : (
          '🔍'
        )}
      </div>
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
};