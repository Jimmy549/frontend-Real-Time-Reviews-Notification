# 🚀 VERCEL DEPLOYMENT INSTRUCTIONS

## Step 1: Go to vercel.com
- Login with your account

## Step 2: Create New Project
- Click "Add New..." → "Project"
- Click "Import" next to your repository

## Step 3: Configure Project
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Root Directory: ./
```

## Step 4: Environment Variables
Add these in Vercel dashboard:
```
VITE_API_URL = https://your-backend-url.onrender.com
VITE_REVIEWS_API_URL = https://your-backend-url.onrender.com
VITE_APP_NAME = Tea E-Commerce
VITE_VERSION = 1.0.0
VITE_NODE_ENV = production
```

## Step 5: Deploy
- Click "Deploy" button
- Wait 2-3 minutes for build to complete

## ✅ Your frontend will be live at:
https://your-project-name.vercel.app

## 🔧 After Backend Deployment:
Update VITE_API_URL with your actual Render backend URL