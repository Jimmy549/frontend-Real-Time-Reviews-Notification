import React from 'react';
import ProductCard from './ProductCard';

const RelatedProducts = ({ products }) => {
  return (
    <div className="related-products">
      <h3>Related Products</h3>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;