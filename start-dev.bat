@echo off
echo 🚀 Starting E-Commerce Development Environment...
echo.

echo 📦 Installing dependencies...
echo.

echo Installing backend dependencies...
cd ecom-backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend dependency installation failed
    pause
    exit /b 1
)

echo Installing frontend dependencies...
cd ..\ecom-frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend dependency installation failed
    pause
    exit /b 1
)

cd ..

echo.
echo ✅ Dependencies installed successfully!
echo.
echo 🔧 Starting services...
echo.

echo Starting backend server...
start "Backend Server" cmd /k "cd ecom-backend && npm run start:dev"

timeout /t 5 /nobreak > nul

echo Starting frontend development server...
start "Frontend Server" cmd /k "cd ecom-frontend && npm run dev"

echo.
echo 🎉 Development environment started!
echo.
echo 📋 Services:
echo    Backend:  http://localhost:8080
echo    Frontend: http://localhost:5173
echo.
echo 🧪 To test integration, run: node test-integration.js
echo.
pause