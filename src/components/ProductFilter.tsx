import { motion } from 'framer-motion';
import type { Category } from '../types';

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categorySlug: string | null) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-full border ${
          selectedCategory === null
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
        }`}
      >
        All Products
      </motion.button>
      
      {categories.map(category => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.slug)}
          className={`px-4 py-2 rounded-full border ${
            selectedCategory === category.slug
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
          }`}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
};