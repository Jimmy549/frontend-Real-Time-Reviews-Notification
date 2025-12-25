import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FilterProvider } from './context/FilterContext';
import GlobalLoader from './components/common/GlobalLoader';
import { useLoading } from './hooks/useLoading';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/superadmin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Header />}
      <main className="flex-1">
        <AppRoutes />
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  const { isLoading } = useLoading(false);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <FilterProvider>
            <AppContent />
            <GlobalLoader />
          </FilterProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
