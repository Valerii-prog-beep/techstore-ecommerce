import { useState, useEffect, useCallback } from 'react';
import type { CartItem, Product } from '../types';
import { mockApi } from '../api/mockApi';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка корзины при монтировании
  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        const cartData = await mockApi.getCart();
        setCart(cartData);
      } catch (err) {
        setError('Failed to load cart');
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const addToCart = useCallback(async (product: Product, quantity: number = 1) => {
    try {
      setError(null);
      const success = await mockApi.addToCart(product.id, quantity);
      
      if (success) {
        setCart(prev => {
          const existingItem = prev.find(item => item.product.id === product.id);
          if (existingItem) {
            return prev.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [...prev, { product, quantity }];
        });
      }
    } catch (err) {
      setError('Failed to add item to cart');
    }
  }, []);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    try {
      setError(null);
      const success = await mockApi.updateCartItem(productId, quantity);
      
      if (success) {
        if (quantity <= 0) {
          setCart(prev => prev.filter(item => item.product.id !== productId));
        } else {
          setCart(prev =>
            prev.map(item =>
              item.product.id === productId
                ? { ...item, quantity }
                : item
            )
          );
        }
      }
    } catch (err) {
      setError('Failed to update cart item');
    }
  }, []);

  const removeFromCart = useCallback(async (productId: string) => {
    await updateQuantity(productId, 0);
  }, [updateQuantity]);

  const clearCart = useCallback(async () => {
    try {
      setError(null);
      const success = await mockApi.clearCart();
      
      if (success) {
        setCart([]);
      }
    } catch (err) {
      setError('Failed to clear cart');
    }
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + (item.product.price * item.quantity),
    0
  );

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems
  };
};