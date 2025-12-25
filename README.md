E-Commerce Frontend

React + Vite frontend E-commerce platform with real-time features.

## 🚀 Features

- **Modern UI**: React 19 + Tailwind CSS
- **Real-time Updates**: Socket.IO integration
- **Authentication**: JWT-based auth system
- **Product Catalog**: Browse and search products
- **Reviews System**: Rate and review products
- **Shopping Cart**: Add to cart functionality
- **Admin Dashboard**: Product and user management
- **Responsive Design**: Mobile-first approach

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS + Material-UI
- **State Management**: Context API
- **HTTP Client**: Axios
- **Real-time**: Socket.IO Client
- **Routing**: React Router DOM

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🌍 Environment Variables

```env
VITE_API_URL=https://your-backend-url.onrender.com
VITE_REVIEWS_API_URL=https://your-backend-url.onrender.com
VITE_APP_NAME=Tea E-Commerce
VITE_VERSION=1.0.0
VITE_NODE_ENV=production
```

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy dist folder to any static hosting
```

## 📱 Pages

- **Home**: Landing page with featured products
- **Products**: Product catalog with filters
- **Product Details**: Individual product page with reviews
- **Cart**: Shopping cart management
- **Auth**: Login/Register pages
- **Dashboard**: Admin panel for management
- **Profile**: User profile management

## 🔌 API Integration

- **Products API**: CRUD operations for products
- **Reviews API**: Review and rating system
- **Auth API**: User authentication
- **Notifications**: Real-time notifications via WebSocket

## 📄 License

MIT License
