import React from 'react';

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="breadcrumbs">
      {items.map((item, index) => (
        <span key={index}>
          {item.link ? <a href={item.link}>{item.label}</a> : item.label}
          {index < items.length - 1 && <span className="separator"> / </span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;