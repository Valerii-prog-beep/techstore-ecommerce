// src/hooks/useProductSearch.ts
import { useState, useCallback, useEffect } from 'react';
import type{ Product } from '../types';
import { mockApi } from '../api/mockApi';

export const useProductSearch = () => {
  const [results, setResults] = useState<Product[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = useCallback((query: string) => {
    if (!query.trim()) return;

    setRecentSearches(prev => {
      const filtered = prev.filter(search => search !== query);
      const updated = [query, ...filtered].slice(0, 5); // Keep last 5 searches
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  }, []);

  // Main search function
  const searchProducts = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setSearchError(null);
      return;
    }

    try {
      setSearchLoading(true);
      setSearchError(null);
      
      const data = await mockApi.searchProducts(query);
      setResults(data);
      
      // Save successful search to recent searches
      if (data.length > 0) {
        saveRecentSearch(query);
      }
    } catch (err) {
      setSearchError('Failed to search products');
      setResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, [saveRecentSearch]);

  // Quick search by category
  const searchByCategory = useCallback(async (category: string) => {
    try {
      setSearchLoading(true);
      setSearchError(null);
      
      const data = await mockApi.getProductsByCategory(category);
      setResults(data);
    } catch (err) {
      setSearchError('Failed to filter by category');
      setResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // Get popular products (for search suggestions)
  const getPopularProducts = useCallback(async () => {
    try {
      const allProducts = await mockApi.getProducts();
      // Simulate popularity based on rating and price
      const popular = allProducts
        .filter(product => product.rating >= 4.5 || product.price > 800)
        .slice(0, 6);
      return popular;
    } catch (err) {
      return [];
    }
  }, []);

  // Clear search results
  const clearSearch = useCallback(() => {
    setResults([]);
    setSearchError(null);
  }, []);

  // Get search suggestions based on current query
  const getSearchSuggestions = useCallback(async (query: string): Promise<string[]> => {
    if (!query.trim()) {
      // Return recent searches and popular categories when query is empty
      return [
        ...recentSearches,
        'smartphones',
        'laptops', 
        'audio',
        'gaming'
      ];
    }

    try {
      const allProducts = await mockApi.getProducts();
      const suggestions = allProducts
        .filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        )
        .map(product => product.name)
        .slice(0, 5);

      return [...new Set(suggestions)]; // Remove duplicates
    } catch (err) {
      return [];
    }
  }, [recentSearches]);

  return {
    // State
    results,
    searchLoading,
    searchError,
    recentSearches,
    
    // Actions
    searchProducts,
    searchByCategory,
    clearSearch,
    clearRecentSearches,
    getSearchSuggestions,
    getPopularProducts
  };
};

// Extended version with debouncing for better performance
export const useDebouncedProductSearch = (delay: number = 300) => {
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const search = useProductSearch();

  useEffect(() => {
    const timer = setTimeout(() => {
      search.searchProducts(debouncedQuery);
    }, delay);

    return () => clearTimeout(timer);
  }, [debouncedQuery, delay, search]);

  const setQuery = useCallback((query: string) => {
    setDebouncedQuery(query);
  }, []);

  return {
    ...search,
    setQuery,
    query: debouncedQuery
  };
};