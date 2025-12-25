# 🚀 Deployment Guide

## Backend Deployment (Render)

### 1. Prepare Repository
```bash
cd ecom-backend
git init
git add .
git commit -m "Initial commit for deployment"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy on Render
1. Go to [render.com](https://render.com)
2. Connect your GitHub account
3. Create new **Web Service**
4. Select your backend repository
5. Use these settings:
   - **Name**: `tea-ecommerce-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: Free

### 3. Environment Variables (Add in Render Dashboard)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://jameel:11223344@cluster0.dgwxhjh.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_ACCESS_SECRET=your-super-secret-access-key-here-make-it-long-and-complex-production-2024
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here-make-it-different-from-access-production-2024
JWT_ISSUER=tea-ecommerce
JWT_AUDIENCE=tea-ecommerce-users
JWT_ACCESS_EXPIRES_IN=604800
JWT_REFRESH_EXPIRES_IN=604800
CORS_ORIGIN=https://tea-ecom-frontend.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
DEFAULT_PAGE_SIZE=12
MAX_PAGE_SIZE=100
```

---

## Frontend Deployment (Vercel)

### 1. Prepare Repository
```bash
cd ecom-frontend
git init
git add .
git commit -m "Initial commit for deployment"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your frontend repository
3. Use these settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Environment Variables (Add in Vercel Dashboard)
```
VITE_API_URL=https://tea-ecommerce-backend.onrender.com
VITE_REVIEWS_API_URL=https://tea-ecommerce-backend.onrender.com
VITE_APP_NAME=Tea E-Commerce
VITE_VERSION=1.0.0
VITE_NODE_ENV=production
```

---

## 🔧 Post-Deployment Steps

### 1. Update CORS Origin
After frontend deployment, update backend CORS_ORIGIN with actual Vercel URL:
```
CORS_ORIGIN=https://your-actual-vercel-url.vercel.app
```

### 2. Test Deployment
1. **Backend Health**: Visit `https://tea-ecommerce-backend.onrender.com`
2. **Frontend**: Visit your Vercel URL
3. **Test Features**:
   - User registration/login
   - Product reviews
   - Real-time notifications
   - Add to cart functionality

### 3. Database Connection
Ensure MongoDB Atlas is configured for production:
- Whitelist Render IP addresses (0.0.0.0/0 for simplicity)
- Database user has proper permissions

---

## 📋 Deployment Checklist

### Backend ✅
- [x] Production environment variables
- [x] CORS configuration updated
- [x] MongoDB connection string
- [x] JWT secrets configured
- [x] Build and start scripts ready

### Frontend ✅
- [x] API URLs updated to production
- [x] Socket.io URL configured
- [x] Environment variables set
- [x] Vercel configuration ready
- [x] Build optimization enabled

---

## 🚨 Important Notes

1. **First Deploy**: Backend may take 2-3 minutes to start (Render free tier)
2. **Cold Starts**: Free tier services sleep after inactivity
3. **Database**: MongoDB Atlas connection should be stable
4. **HTTPS**: Both services will use HTTPS in production
5. **Environment**: Never commit .env files to repository

---

## 🔗 Expected URLs

- **Backend**: `https://tea-ecommerce-backend.onrender.com`
- **Frontend**: `https://your-project-name.vercel.app`

Deploy karne ke baad dono URLs update kar dena!