import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductFilters } from '../components/ProductFilter';
import { Header } from '../components/layout/Header';
import { QuickView } from '../components/QuickView';
import { Cart } from '../components/cart/Cart';
import { SearchBar } from '../components/SearchBar';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { useDebouncedProductSearch } from '../hooks/useProductSearch';
import { mockCategories } from '../data/mockProducts';
import type { Product } from '../types';

export const HomePage: React.FC = () => {
  // State management
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalPrice, 
    totalItems,
    loading: cartLoading,
    error: cartError
  } = useCart();
  
  const { products, loading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts();
  const { 
    results, 
    searchLoading, 
    searchError, 
    setQuery,
    recentSearches,
    clearRecentSearches,
    searchByCategory 
  } = useDebouncedProductSearch(300);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  // Load featured products
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      // Simulate getting featured products (top rated)
      const featured = products
        .filter(product => product.rating >= 4.5)
        .slice(0, 4);
      setFeaturedProducts(featured);
    };

    if (products.length > 0) {
      loadFeaturedProducts();
    }
  }, [products]);

  // Handle search with debouncing
  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery, setQuery]);

  // Filter products based on category and search
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const displayProducts = searchQuery ? results : filteredProducts;

  // Handle adding to cart with loading state
  const handleAddToCart = async (product: Product) => {
    setAddingProductId(product.id);
    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAddingProductId(null);
    }
  };

  // Handle category change
  const handleCategoryChange = useCallback((categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    setSearchQuery(''); // Clear search when changing category
    setShowSearchSuggestions(false);
  }, []);

  // Handle search input focus
  const handleSearchFocus = () => {
    setShowSearchSuggestions(true);
  };

  // Handle search input blur
  const handleSearchBlur = () => {
    setTimeout(() => setShowSearchSuggestions(false), 200);
  };

  // Handle recent search click
  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    setShowSearchSuggestions(false);
  };

  // Handle category search
  const handleCategorySearch = (category: string) => {
    searchByCategory(category);
    setSearchQuery('');
    setSelectedCategory(category);
    setShowSearchSuggestions(false);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setShowSearchSuggestions(false);
  };

  // Loading state
  const isLoading = productsLoading || searchLoading;
  
  // Error state
  const hasError = productsError || searchError;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        cartItemsCount={totalItems} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to <span className="text-blue-600">TechStore</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Discover the latest gadgets and electronics with 
            <span className="font-semibold text-green-600"> free shipping </span>
            on orders over $100
          </motion.p>
          
          {/* Search Bar with Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto relative"
          >
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              placeholder="Search products, brands, or categories..."
              loading={searchLoading}
            />

            {/* Search Suggestions */}
            <AnimatePresence>
              {showSearchSuggestions && (searchQuery === '' || recentSearches.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-10"
                >
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="p-3 border-b border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Recent Searches</span>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleRecentSearchClick(search)}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Categories */}
                  <div className="p-3">
                    <span className="text-sm font-medium text-gray-700 mb-2 block">Popular Categories</span>
                    <div className="grid grid-cols-2 gap-2">
                      {mockCategories.slice(0, 4).map(category => (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySearch(category.slug)}
                          className="px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-blue-700 font-medium transition-colors text-left"
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* Featured Products Banner */}
        {featuredProducts.length > 0 && !searchQuery && !selectedCategory && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">🔥 Featured Products</h2>
                  <p className="text-purple-100">Top-rated gadgets loved by our customers</p>
                </div>
                <div className="hidden md:flex gap-2">
                  {featuredProducts.slice(0, 3).map(product => (
                    <img
                      key={product.id}
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover border-2 border-white"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Filters and Results Header */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchQuery 
                  ? `Search Results for "${searchQuery}"`
                  : selectedCategory 
                    ? mockCategories.find(cat => cat.slug === selectedCategory)?.name
                    : 'All Products'
                }
              </h2>
              
              {(searchQuery || selectedCategory) && (
                <button
                  onClick={handleResetFilters}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    Loading...
                  </span>
                ) : (
                  `${displayProducts.length} ${displayProducts.length === 1 ? 'product' : 'products'}`
                )}
              </span>
              <ProductFilters
                categories={mockCategories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>
        </motion.section>

        {/* Loading State */}
        {isLoading && !hasError && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-20"
          >
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="text-gray-600 mt-4">
                {searchLoading ? 'Searching products...' : 'Loading products...'}
              </p>
            </div>
          </motion.section>
        )}

        {/* Error State */}
        {hasError && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <ErrorMessage 
              message={productsError || searchError || 'Something went wrong'}
              onRetry={refetchProducts}
            />
          </motion.section>
        )}

        {/* Products Grid */}
        {!isLoading && !hasError && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {displayProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchQuery ? 'No products found' : 'No products available'}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  {searchQuery 
                    ? `We couldn't find any products matching "${searchQuery}". Try adjusting your search terms.`
                    : 'Check back later for new arrivals!'
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={handleResetFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    View All Products
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <ProductCard
                      product={product}
                      onQuickView={setSelectedProduct}
                      onAddToCart={handleAddToCart}
                      isAddingToCart={addingProductId === product.id}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        )}

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Why Choose TechStore?</h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                We're committed to providing the best shopping experience for tech enthusiasts worldwide
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                className="text-center p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-3">🚚</div>
                <h3 className="font-semibold text-lg mb-2">Fast Shipping</h3>
                <p className="text-blue-100 text-sm">Free 2-day delivery on orders over $100</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
                <p className="text-blue-100 text-sm">Bank-level encryption for all transactions</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-3">⭐</div>
                <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
                <p className="text-blue-100 text-sm">All products are brand new & 100% authentic</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-3">💬</div>
                <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
                <p className="text-blue-100 text-sm">Expert help available around the clock</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-12 bg-white rounded-2xl p-8 shadow-sm border text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h2>
          <p className="text-gray-600 mb-6">Get the latest deals, new arrivals, and exclusive offers</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium">
              Subscribe
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-3">No spam, unsubscribe at any time</p>
        </motion.section>
      </main>

      {/* Quick View Modal */}
      <QuickView
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        totalPrice={totalPrice}
        totalItems={totalItems}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="mr-2">🛍️</span>
                TechStore
              </h3>
              <p className="text-gray-400 text-sm">
                Your trusted partner for the latest technology and electronics since 2024.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                {mockCategories.map(category => (
                  <li key={category.id}>
                    <button 
                      onClick={() => handleCategorySearch(category.slug)}
                      className="hover:text-white transition-colors"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 TechStore. All rights reserved. | Built with ❤️ for tech enthusiasts</p>
          </div>
        </div>
      </footer>
    </div>
  );
};