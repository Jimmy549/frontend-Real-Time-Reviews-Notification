import React from 'react';

const EmptyState = ({ title, message, action }) => {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{message}</p>
      {action && action}
    </div>
  );
};

export default EmptyState;