import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { mockApi } from '../api/mockApi';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await mockApi.getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};

export const useProductSearch = () => {
  const [results, setResults] = useState<Product[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      const data = await mockApi.searchProducts(query);
      setResults(data);
    } catch (err) {
      setResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  return { results, searchLoading, searchProducts };
};