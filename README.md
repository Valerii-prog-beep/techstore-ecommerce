
# techstore-ecommerce
Modern React TypeScript E-commerce Store • React + TypeScript + Tailwind CSS • Shopping Cart &amp; Product Search • Responsive Design &amp; Animations • Custom Hooks &amp; Component Architecture
>>>>>>> 2a0cb9140d51128cea68b1645602a84cb71ec63e
# 🛍️ TechStore - Modern E-commerce Store

A fully-featured, responsive e-commerce application built with modern web technologies.

## 🚀 Live Demo
(https://valerii-techstore-ecommerce.netlify.app)

## ✨ Features

- **Product Catalog** - Browse products with search and filtering
- **Shopping Cart** - Persistent cart with add/remove/update functionality
- **Advanced Search** - Debounced search with suggestions and recent searches
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Animations** - Framer Motion for enhanced UX
- **Type Safety** - Full TypeScript implementation
- **State Management** - Zustand for global state

## 🛠 Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **State Management:** Zustand, React Hooks
- **Animations:** Framer Motion
- **Build Tool:** Vite
- **API:** Mock REST API with error handling
- **Storage:** LocalStorage persistence

## 🏗 Project Structure
src/
├── components/ # Reusable UI components
├── hooks/ # Custom React hooks
├── pages/ # Page components
├── types/ # TypeScript definitions
├── api/ # Mock API layer
├── data/ # Mock products data
└── utils/ # Utility functions

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
Key Components
ProductCard - Product display with add to cart

SearchBar - Debounced search with suggestions

Cart - Shopping cart sidebar

ProductFilter - Category-based filtering

QuickView - Product quick view modal
Advanced Features
Debounced search (300ms)

Error boundaries and loading states

LocalStorage persistence

Responsive grid layout

Optimized re-renders with React.memo

Type-safe API layer
