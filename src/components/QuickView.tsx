import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../types';

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const CloseIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className="w-6 h-6"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M6 18L18 6M6 6l12 12" 
    />
  </svg>
);

export const QuickView: React.FC<QuickViewProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {product.name}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <CloseIcon />
                </motion.button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Image */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Features */}
                      {product.features && product.features.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">
                            Key Features:
                          </h3>
                          <div className="grid grid-cols-2 gap-2">
                            {product.features.map((feature, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="flex items-center text-sm text-gray-600"
                              >
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                                {feature}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>

                    {/* Details */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Rating */}
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-gray-600">
                          {product.rating}/5
                        </span>
                      </div>

                      {/* Description */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Description
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Category */}
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2">Category:</span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
                          {product.category}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="border-t border-gray-200 pt-6">
                        <div className="text-3xl font-bold text-gray-900 mb-6">
                          ${product.price.toLocaleString()}
                        </div>

                        {/* Add to Cart Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleAddToCart}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg"
                        >
                          Add to Cart
                        </motion.button>

                        {/* Additional Info */}
                        <div className="mt-4 text-center text-sm text-gray-500">
                          Free shipping • 14-day return policy • 1-year warranty
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};