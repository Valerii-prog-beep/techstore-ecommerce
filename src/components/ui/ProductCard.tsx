import { motion } from 'framer-motion';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isAddingToCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isAddingToCart = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      {/* Product Image */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative h-48 overflow-hidden cursor-pointer bg-gray-100"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
            {product.category}
          </span>
        </div>
        
        {/* Quick View Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center"
        >
          <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
            Quick View
          </span>
        </motion.div>
      </motion.div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">
            ({product.rating})
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Features (if available) */}
        {product.features && product.features.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <span 
                  key={index}
                  className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium"
                >
                  {feature}
                </span>
              ))}
              {product.features.length > 2 && (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                  +{product.features.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-auto">
          <div>
            <span className="text-2xl font-bold text-gray-900 block">
              ${product.price.toLocaleString()}
            </span>
            {product.price > 500 && (
              <span className="text-green-600 text-sm font-medium">
                Free Shipping ✓
              </span>
            )}
          </div>
          <motion.button
            whileHover={!isAddingToCart ? { scale: 1.05 } : {}}
            whileTap={!isAddingToCart ? { scale: 0.95 } : {}}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={isAddingToCart}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${isAddingToCart 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }
            `}
          >
            {isAddingToCart ? (
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Adding...</span>
              </div>
            ) : (
              'Add to Cart'
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};