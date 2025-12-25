import React from 'react';

const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <h1>Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>150</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>45</p>
        </div>
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>230</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;