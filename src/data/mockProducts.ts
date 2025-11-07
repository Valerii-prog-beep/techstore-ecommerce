import type { Product, Category } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 999,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&q=80',
    description: 'A17 Pro chip, 256GB storage, titanium design',
    category: 'smartphones',
    rating: 4.5,
    features: ['A17 Pro Chip', '256GB Storage', 'Titanium Design', '48MP Camera']
  },
  {
    id: '2',
    name: 'MacBook Air Pro',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80',
    description: 'M2 chip, 13.6" Retina display, 8GB RAM, 512GB SSD',
    category: 'laptops',
    rating: 4.8,
    features: ['M2 Chip', 'Retina Display', '18h Battery', 'Touch ID']
  },
  {
    id: '3',
    name: 'AirPods Pro',
    price: 249,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=80',
    description: 'Active noise cancellation, up to 30 hours battery life',
    category: 'audio',
    rating: 4.3,
    features: ['Noise Cancellation', '30h Battery', 'Water Resistant']
  },
  {
    id: '4',
    name: 'iPad Pro',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80',
    description: '12.9" Liquid Retina XDR display, M2 chip',
    category: 'tablets',
    rating: 4.7,
    features: ['M2 Chip', '12.9" Display', 'Face ID', '5G Support']
  },
  {
    id: '5',
    name: 'Apple Watch Series 9',
    price: 399,
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80',
    description: 'Smartwatch with ECG functionality and GPS',
    category: 'wearables',
    rating: 4.6,
    features: ['ECG', 'GPS', 'Waterproof', 'Retina Display']
  },
  {
    id: '6',
    name: 'Samsung Galaxy S24',
    price: 799,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80',
    description: 'Flagship smartphone with 108MP camera',
    category: 'smartphones',
    rating: 4.4,
    features: ['108MP Camera', '5G', '120Hz Display', 'Snapdragon 8']
  },
  {
    id: '7',
    name: 'Sony WH-1000XM5',
    price: 349,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    description: 'Industry-leading noise canceling headphones',
    category: 'audio',
    rating: 4.7,
    features: ['Noise Canceling', '30h Battery', 'Touch Controls', 'Hi-Fi Audio']
  },
  {
    id: '8',
    name: 'Dell XPS 13',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&q=80',
    description: '13.4" FHD+ InfinityEdge touch display, Intel Core i7',
    category: 'laptops',
    rating: 4.5,
    features: ['Intel i7', '16GB RAM', '512GB SSD', 'InfinityEdge Display']
  },
  {
    id: '9',
    name: 'Samsung Galaxy Tab S9',
    price: 849,
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&q=80',
    description: '11" AMOLED display, S Pen included, Snapdragon 8 Gen 2',
    category: 'tablets',
    rating: 4.4,
    features: ['AMOLED Display', 'S Pen', 'Snapdragon 8', '5G Support']
  },
  {
    id: '10',
    name: 'Google Pixel 8 Pro',
    price: 899,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80',
    description: 'Advanced AI camera system, Tensor G3 processor',
    category: 'smartphones',
    rating: 4.3,
    features: ['Tensor G3', 'AI Camera', '120Hz Display', '7 Years Updates']
  },
  {
    id: '11',
    name: 'Bose QuietComfort 45',
    price: 329,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80',
    description: 'World-class noise cancellation and balanced audio',
    category: 'audio',
    rating: 4.5,
    features: ['Noise Cancellation', '24h Battery', 'Comfortable Fit', 'Voice Assistants']
  },
  {
    id: '12',
    name: 'HP Spectre x360',
    price: 1349,
    image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&q=80',
    description: '14" 2-in-1 laptop with OLED display, Intel Evo platform',
    category: 'laptops',
    rating: 4.6,
    features: ['2-in-1 Design', 'OLED Display', 'Intel Evo', '16GB RAM']
  },
  {
    id: '13',
    name: 'OnePlus 12',
    price: 699,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
    description: 'Flagship killer with Hasselblad camera and fast charging',
    category: 'smartphones',
    rating: 4.2,
    features: ['Hasselblad Camera', '80W Charging', '120Hz Display', 'Snapdragon 8']
  },
  {
    id: '14',
    name: 'Microsoft Surface Pro 9',
    price: 999,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&q=80',
    description: 'Versatile 2-in-1 laptop and tablet with PixelSense display',
    category: 'tablets',
    rating: 4.4,
    features: ['2-in-1 Design', 'PixelSense Display', 'Intel i5', 'Surface Pen']
  },
  {
    id: '15',
    name: 'Fitbit Charge 6',
    price: 159,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&q=80',
    description: 'Advanced fitness tracker with GPS and heart rate monitoring',
    category: 'wearables',
    rating: 4.1,
    features: ['GPS', 'Heart Rate Monitor', '7 Days Battery', 'Sleep Tracking']
  },
  {
    id: '16',
    name: 'Lenovo ThinkPad X1',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80',
    description: 'Business laptop with military-grade durability',
    category: 'laptops',
    rating: 4.7,
    features: ['Military Grade', 'Intel i7', '32GB RAM', '1TB SSD']
  },
  {
    id: '17',
    name: 'JBL Flip 6',
    price: 129,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
    description: 'Portable Bluetooth speaker with powerful sound',
    category: 'audio',
    rating: 4.3,
    features: ['Waterproof', '12h Battery', 'PartyBoost', 'Rich Bass']
  },
  {
    id: '18',
    name: 'Garmin Forerunner 265',
    price: 449,
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&q=80',
    description: 'Advanced running watch with training metrics',
    category: 'wearables',
    rating: 4.6,
    features: ['Running Metrics', 'GPS', '7 Days Battery', 'Music Storage']
  },
  {
    id: '19',
    name: 'Asus ROG Zephyrus',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&q=80',
    description: 'Gaming laptop with RTX 4070 and high refresh rate display',
    category: 'laptops',
    rating: 4.8,
    features: ['RTX 4070', '240Hz Display', 'AMD Ryzen 9', 'RGB Keyboard']
  },
  {
    id: '20',
    name: 'Xiaomi Pad 6',
    price: 399,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&q=80',
    description: '11" 2.8K display with Snapdragon 870 and Dolby Vision',
    category: 'tablets',
    rating: 4.2,
    features: ['2.8K Display', 'Snapdragon 870', 'Dolby Vision', '33W Fast Charge']
  }
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Smartphones', slug: 'smartphones' },
  { id: '2', name: 'Laptops', slug: 'laptops' },
  { id: '3', name: 'Tablets', slug: 'tablets' },
  { id: '4', name: 'Audio', slug: 'audio' },
  { id: '5', name: 'Wearables', slug: 'wearables' }
];