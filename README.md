# E-Commerce Real-Time Reviews & Notifications

A full-stack e-commerce platform with real-time reviews and notifications system.

## 🚀 Project Structure

```
├── ecom-backend/          # NestJS Backend API
│   ├── src/              # Source code
│   ├── package.json      # Backend dependencies
│   └── README.md         # Backend documentation
│
└── ecom-frontend/        # React Frontend
    ├── src/              # Source code
    ├── public/           # Static assets
    ├── package.json      # Frontend dependencies
    └── README.md         # Frontend documentation
```

## 🛠️ Tech Stack

### Backend (NestJS)
- **Framework**: NestJS + TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Real-time**: Socket.IO
- **Deployment**: Render

### Frontend (React)
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **Real-time**: Socket.IO Client
- **Deployment**: Vercel

## ⭐ Key Features

- **Star Rating System**: Interactive 1-5 star reviews
- **Real-time Updates**: Live notifications via WebSocket
- **User Authentication**: JWT-based auth system
- **Review Management**: CRUD operations with permissions
- **Admin Dashboard**: Product and user management
- **Responsive Design**: Mobile-first approach

## 🚀 Quick Start

### Backend Setup
```bash
cd ecom-backend
npm install
npm run start:dev
```

### Frontend Setup
```bash
cd ecom-frontend
npm install
npm run dev
```

## 📝 Recent Updates

- ✅ Enhanced star rating system with hover effects
- ✅ Review security (only author/admin can delete)
- ✅ Star rating validation with error messages
- ✅ View All Reviews functionality
- ✅ Direct login navigation (removed alerts)
- ✅ Clean auth pages (removed social buttons)

## 🔗 Links

- **Frontend**: https://github.com/Jimmy549/frontend-Real-Time-Reviews-Notification
- **Backend**: NestJS API with MongoDB

## 📄 License

MIT License