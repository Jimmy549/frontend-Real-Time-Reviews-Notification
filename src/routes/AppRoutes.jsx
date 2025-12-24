import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage';
import CollectionsPage from '../pages/Collections/CollectionsPage';
import ExpandedFiltersPage from '../pages/Collections/ExpandedFiltersPage';
import ProductPage from '../pages/Product/ProductPage';
import CartPage from '../pages/Cart/CartPage';
import CheckoutPage from '../pages/Checkout/CheckoutPage';
import PaymentPage from '../pages/Checkout/PaymentPage';
import OrderSuccessPage from '../pages/Checkout/OrderSuccessPage';
import LoginPage from '../pages/Auth/LoginPage';
import SignupPage from '../pages/Auth/SignupPage';
import AdminLoginPage from '../pages/Auth/AdminLoginPage';
import AccessoriesPage from '../pages/Accessories/AccessoriesPage';
import BlogPage from '../pages/Blog/BlogPage';
import ContactPage from '../pages/Contact/ContactPage';
import OrdersPage from '../pages/Orders/OrdersPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import SuperAdminDashboard from '../pages/Dashboard/SuperAdminDashboard';
import ManageProducts from '../pages/Dashboard/ManageProducts';
import ManageOrders from '../pages/Dashboard/ManageOrders';
import RoleBasedRoute from '../pages/Auth/RoleBasedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/collections" element={<CollectionsPage />} />
      <Route path="/collections/:category" element={<CollectionsPage />} />
      <Route path="/collections/filters" element={<ExpandedFiltersPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/orders" element={<OrdersPage />} />

      {/* Super Admin Routes */}
      <Route path="/superadmin" element={
        <RoleBasedRoute allowedRoles={['superadmin']}>
          <SuperAdminDashboard />
        </RoleBasedRoute>
      } />

      <Route path="/admin/products" element={
        <RoleBasedRoute allowedRoles={['superadmin']}>
          <ManageProducts />
        </RoleBasedRoute>
      } />

      <Route path="/admin/orders" element={
        <RoleBasedRoute allowedRoles={['superadmin']}>
          <ManageOrders />
        </RoleBasedRoute>
      } />

      {/* Additional Pages */}
      <Route path="/accessories" element={<AccessoriesPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* 404 */}
      <Route path="*" element={<div className="p-8 text-center">Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
