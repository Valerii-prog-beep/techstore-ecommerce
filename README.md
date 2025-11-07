<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
# techstore-ecommerce
Modern React TypeScript E-commerce Store • React + TypeScript + Tailwind CSS • Shopping Cart &amp; Product Search • Responsive Design &amp; Animations • Custom Hooks &amp; Component Architecture
>>>>>>> 2a0cb9140d51128cea68b1645602a84cb71ec63e
# 🛍️ TechStore - Modern E-commerce Store

A fully-featured, responsive e-commerce application built with modern web technologies.

## 🚀 Live Demo
[![Vercel](https://img.shields.io/badge/Vercel-Live_Demo-black?style=for-the-badge&logo=vercel)](YOUR_DEPLOYED_LINK_HERE)

## 📹 Video Demo
▶️ [Watch walkthrough](YOUR_VIDEO_LINK_HERE)

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
