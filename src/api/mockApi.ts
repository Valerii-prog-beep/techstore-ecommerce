// src/api/mockApi.ts
import type{ Product, CartItem } from '../types';
import { mockProducts } from '../data/mockProducts';

// Имитация задержки сети
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Имитация случайных ошибок (для тестирования)
const simulateError = (errorRate: number = 0.1): boolean => {
  return Math.random() < errorRate;
};

export const mockApi = {
  // === PRODUCTS API ===

  // Получить все товары
  getProducts: async (): Promise<Product[]> => {
    await delay(600);
    
    if (simulateError(0.05)) {
      throw new Error('Failed to fetch products');
    }
    
    return [...mockProducts];
  },

  // Получить товары по категории
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    await delay(300);
    
    if (simulateError(0.05)) {
      throw new Error('Failed to fetch products by category');
    }
    
    return mockProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  },

  // Получить товары по нескольким категориям
  getProductsByCategories: async (categories: string[]): Promise<Product[]> => {
    await delay(400);
    
    if (simulateError(0.05)) {
      throw new Error('Failed to fetch products by categories');
    }
    
    return mockProducts.filter(product => 
      categories.includes(product.category)
    );
  },

  // Поиск товаров
  searchProducts: async (query: string): Promise<Product[]> => {
    await delay(400);
    
    if (simulateError(0.05)) {
      throw new Error('Search failed');
    }
    
    if (!query.trim()) {
      return [];
    }
    
    const lowerQuery = query.toLowerCase();
    
    return mockProducts.filter(product => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.features?.some(feature => 
        feature.toLowerCase().includes(lowerQuery)
      )
    );
  },

  // Получить товар по ID
  getProductById: async (id: string): Promise<Product | null> => {
    await delay(200);
    
    if (simulateError(0.05)) {
      throw new Error('Failed to fetch product');
    }
    
    return mockProducts.find(product => product.id === id) || null;
  },

  // Получить рекомендуемые товары
  getFeaturedProducts: async (): Promise<Product[]> => {
    await delay(300);
    
    if (simulateError(0.05)) {
      throw new Error('Failed to fetch featured products');
    }
    
    return mockProducts
      .filter(product => product.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  },

  // Получить популярные товары
  getPopularProducts: async (): Promise<Product[]> => {
    await delay(350);
    
    if (simulateError(0.05)) {
      throw new Error('Failed to fetch popular products');
    }
    
    // Симуляция популярности на основе рейтинга и цены
    return mockProducts
      .filter(product => product.rating >= 4.0 || product.price > 500)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  },

  // Получить связанные товары
  getRelatedProducts: async (productId: string, limit: number = 4): Promise<Product[]> => {
    await delay(250);
    
    if (simulateError(0.05)) {
      throw new Error('Failed to fetch related products');
    }
    
    const product = mockProducts.find(p => p.id === productId);
    if (!product) return [];
    
    return mockProducts
      .filter(p => 
        p.id !== productId && 
        (p.category === product.category || 
         p.features?.some(f => product.features?.includes(f)))
      )
      .slice(0, limit);
  },

  // === CART API ===

  // Получить корзину
  getCart: async (): Promise<CartItem[]> => {
    await delay(200);
    
    if (simulateError(0.02)) {
      throw new Error('Failed to load cart');
    }
    
    try {
      const cartData = localStorage.getItem('techstore_cart');
      return cartData ? JSON.parse(cartData) : [];
    } catch {
      return [];
    }
  },

  // Добавить товар в корзину
  addToCart: async (productId: string, quantity: number = 1): Promise<boolean> => {
    await delay(300);
    
    if (simulateError(0.03)) {
      throw new Error('Failed to add item to cart');
    }
    
    try {
      const cart = await mockApi.getCart();
      const product = mockProducts.find(p => p.id === productId);
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      const existingItem = cart.find(item => item.product.id === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ product, quantity });
      }
      
      localStorage.setItem('techstore_cart', JSON.stringify(cart));
      return true;
    } catch {
      return false;
    }
  },

  // Обновить количество товара в корзине
  updateCartItem: async (productId: string, quantity: number): Promise<boolean> => {
    await delay(250);
    
    if (simulateError(0.03)) {
      throw new Error('Failed to update cart item');
    }
    
    try {
      const cart = await mockApi.getCart();
      
      if (quantity <= 0) {
        // Удалить товар
        const updatedCart = cart.filter(item => item.product.id !== productId);
        localStorage.setItem('techstore_cart', JSON.stringify(updatedCart));
      } else {
        // Обновить количество
        const updatedCart = cart.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        );
        localStorage.setItem('techstore_cart', JSON.stringify(updatedCart));
      }
      
      return true;
    } catch {
      return false;
    }
  },

  // Удалить товар из корзины
  removeFromCart: async (productId: string): Promise<boolean> => {
    await delay(200);
    
    if (simulateError(0.03)) {
      throw new Error('Failed to remove item from cart');
    }
    
    try {
      const cart = await mockApi.getCart();
      const updatedCart = cart.filter(item => item.product.id !== productId);
      localStorage.setItem('techstore_cart', JSON.stringify(updatedCart));
      return true;
    } catch {
      return false;
    }
  },

  // Очистить корзину
  clearCart: async (): Promise<boolean> => {
    await delay(150);
    
    if (simulateError(0.02)) {
      throw new Error('Failed to clear cart');
    }
    
    try {
      localStorage.removeItem('techstore_cart');
      return true;
    } catch {
      return false;
    }
  },

  // === CATEGORIES API ===

  // Получить все категории
  getCategories: async (): Promise<string[]> => {
    await delay(200);
    
    if (simulateError(0.05)) {
      throw new Error('Failed to fetch categories');
    }
    
    const categories = [...new Set(mockProducts.map(product => product.category))];
    return categories;
  },

  // Получить категории с количеством товаров
  getCategoriesWithCounts: async (): Promise<{name: string; count: number; slug: string}[]> => {
    await delay(300);
    
    if (simulateError(0.05)) {
      throw new Error('Failed to fetch categories with counts');
    }
    
    const categoryCounts = mockProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase()
    }));
  },

  // === ORDERS API (имитация) ===

  // Создать заказ
  createOrder: async (cartItems: CartItem[], customerInfo: any): Promise<{ success: boolean; orderId?: string; error?: string }> => {
    await delay(1500);
    
    if (simulateError(0.1)) {
      return {
        success: false,
        error: 'Payment processing failed. Please try again.'
      };
    }
    
    // Генерация ID заказа
    const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();
    
    // Сохранение заказа в localStorage
    try {
      const orders = JSON.parse(localStorage.getItem('techstore_orders') || '[]');
      const newOrder = {
        id: orderId,
        items: cartItems,
        customerInfo,
        total: cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
        status: 'processing',
        createdAt: new Date().toISOString()
      };
      
      orders.push(newOrder);
      localStorage.setItem('techstore_orders', JSON.stringify(orders));
      
      // Очистка корзины после успешного заказа
      await mockApi.clearCart();
      
      return {
        success: true,
        orderId
      };
    } catch {
      return {
        success: false,
        error: 'Failed to create order'
      };
    }
  },

  // Получить историю заказов
  getOrderHistory: async (): Promise<any[]> => {
    await delay(500);
    
    if (simulateError(0.05)) {
      throw new Error('Failed to fetch order history');
    }
    
    try {
      return JSON.parse(localStorage.getItem('techstore_orders') || '[]');
    } catch {
      return [];
    }
  },

  // === WISHLIST API (имитация) ===

  // Получить избранное
  getWishlist: async (): Promise<Product[]> => {
    await delay(300);
    
    try {
      const wishlistData = localStorage.getItem('techstore_wishlist');
      const productIds = wishlistData ? JSON.parse(wishlistData) : [];
      return mockProducts.filter(product => productIds.includes(product.id));
    } catch {
      return [];
    }
  },

  // Добавить в избранное
  addToWishlist: async (productId: string): Promise<boolean> => {
    await delay(200);
    
    try {
      const wishlistData = localStorage.getItem('techstore_wishlist');
      const productIds = wishlistData ? JSON.parse(wishlistData) : [];
      
      if (!productIds.includes(productId)) {
        productIds.push(productId);
        localStorage.setItem('techstore_wishlist', JSON.stringify(productIds));
      }
      
      return true;
    } catch {
      return false;
    }
  },

  // Удалить из избранного
  removeFromWishlist: async (productId: string): Promise<boolean> => {
    await delay(200);
    
    try {
      const wishlistData = localStorage.getItem('techstore_wishlist');
      const productIds = wishlistData ? JSON.parse(wishlistData) : [];
      
      const updatedIds = productIds.filter((id: string) => id !== productId);
      localStorage.setItem('techstore_wishlist', JSON.stringify(updatedIds));
      
      return true;
    } catch {
      return false;
    }
  },

  // === UTILITY FUNCTIONS ===

  // Проверить доступность товара
  checkProductAvailability: async (productId: string, quantity: number = 1): Promise<{ available: boolean; stock: number }> => {
    await delay(150);
    
    // Имитация проверки склада
    const stock = Math.floor(Math.random() * 50) + 1; // Случайное количество от 1 до 50
    const available = stock >= quantity;
    
    return {
      available,
      stock
    };
  },

  // Получить отзывы товара
  getProductReviews: async (_productId: string): Promise<any[]> => {
    await delay(400);
    
    // Имитация отзывов
    const reviews = [
      {
        id: 1,
        user: 'Alex Johnson',
        rating: 5,
        comment: 'Excellent product! Fast delivery and great quality.',
        date: '2024-01-15'
      },
      {
        id: 2,
        user: 'Sarah Miller',
        rating: 4,
        comment: 'Good value for money. Would recommend!',
        date: '2024-01-10'
      }
    ];
    
    return reviews;
  }
};

// Вспомогательные функции для работы с API
export const apiUtils = {
  // Повторный запрос с экспоненциальной задержкой
  retry: async <T>(
    fn: () => Promise<T>,
    retries: number = 3,
    delayMs: number = 1000
  ): Promise<T> => {
    try {
      return await fn();
    } catch (error) {
      if (retries === 0) throw error;
      
      await delay(delayMs);
      return apiUtils.retry(fn, retries - 1, delayMs * 2);
    }
  },

  // Пакетные запросы
  batch: async <T>(requests: (() => Promise<T>)[]): Promise<T[]> => {
    return Promise.all(requests.map(fn => fn()));
  },

  // Таймаут для запросов
  withTimeout: <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
      )
    ]);
  }
};

// Типы для API responses
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

// Обертка для стандартизации ответов API
export const createApiResponse = <T>(data: T, success: boolean = true, message?: string): ApiResponse<T> => ({
  data,
  success,
  message,
  timestamp: new Date().toISOString()
});