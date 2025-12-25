// Mock product service - replace with real API calls later
import img1 from '../assets/images/4469b82376e6d6e4dd6477a7a98cf42a45a38a05.jpg';
import img1alt from '../assets/images/45d4af846a0c593ecfde4bf49b9637f4ae8a63f2.jpg';
import img2 from '../assets/images/4d22ce807689d07a2d316c9b9bd21294008059d1.jpg';
import img3 from '../assets/images/4ed1bd594c5d611a95d9efd892f14ba62c6c68c4.jpg';

import catBlack from '../assets/images/107c02d9996dfe83fb8bdd868196319fa864018f.jpg';
import catGreen from '../assets/images/c3915d82a0f798034b1306ab0f3cec5d43cb46ce.jpg';
import catWhite from '../assets/images/e488290fae054f73ee109d481150f5b34f3acb4c.jpg';
import catHerbal from '../assets/images/a7b47e9ba4ca5788c18b5bb669f80c10404bf9ca.jpg';
import catMatcha from '../assets/images/main landing page.jpg';

const mockProducts = [
  {
    id: 1,
    name: 'Ceylon Ginger Cinnamon chai tea',
    description: 'A lovely warming Chai tea with ginger cinnamon flavours.',
    price: 4.85,
    originalPrice: null,
    image: img1,
    images: [img1, img1alt],
    category: 'Chai',
    origin: 'Iran',
    organic: true,
    vegan: true,
    variants: [
      { id: '50g', size: '50 g bag', price: 4.85 },
      { id: '100g', size: '100 g bag', price: 8.50 },
      { id: '170g', size: '170 g bag', price: 12.95 },
      { id: '250g', size: '250 g bag', price: 18.50 },
      { id: '1kg', size: '1 kg bag', price: 65.00 },
      { id: 'sampler', size: 'Sampler', price: 2.50 }
    ],
    steepingInstructions: {
      servingSize: '2 tsp per cup, 6 tsp per pot',
      waterTemperature: '100°C',
      steepingTime: '3 - 5 minutes',
      colorAfter3Minutes: true
    },
    aboutTea: {
      flavor: 'Spicy',
      qualities: 'Smoothing',
      caffeine: 'Medium',
      allergens: 'Nuts-free'
    },
    ingredients: 'Black Ceylon tea, Green tea, Ginger root, Cloves, Black pepper, Cinnamon sticks, Cardamom, Cinnamon pieces.',
    rating: 4.5,
    reviewCount: 128,
    inStock: true
  },
  {
    id: 2,
    name: 'Earl Grey Supreme',
    description: 'Classic Earl Grey with bergamot and cornflower petals.',
    price: 5.25,
    originalPrice: null,
    image: img2,
    images: [img2],
    category: 'Black Tea',
    origin: 'India',
    organic: false,
    vegan: true,
    variants: [
      { id: '50g', size: '50 g bag', price: 5.25 },
      { id: '100g', size: '100 g bag', price: 9.50 }
    ],
    steepingInstructions: {
      servingSize: '1 tsp per cup, 3 tsp per pot',
      waterTemperature: '95°C',
      steepingTime: '3 - 4 minutes',
      colorAfter3Minutes: true
    },
    aboutTea: {
      flavor: 'Citrus',
      qualities: 'Energy',
      caffeine: 'High',
      allergens: 'Gluten-free'
    },
    ingredients: 'Black tea, Bergamot oil, Cornflower petals.',
    rating: 4.7,
    reviewCount: 89,
    inStock: true
  },
  {
    id: 3,
    name: 'Dragon Well Green Tea',
    description: 'Premium Chinese green tea with delicate flavor.',
    price: 6.85,
    originalPrice: null,
    image: img3,
    images: [img3],
    category: 'Green Tea',
    origin: 'China',
    organic: true,
    vegan: true,
    variants: [
      { id: '50g', size: '50 g bag', price: 6.85 },
      { id: '100g', size: '100 g bag', price: 12.50 }
    ],
    steepingInstructions: {
      servingSize: '1 tsp per cup, 3 tsp per pot',
      waterTemperature: '80°C',
      steepingTime: '2 - 3 minutes',
      colorAfter3Minutes: false
    },
    aboutTea: {
      flavor: 'Grassy',
      qualities: 'Detox',
      caffeine: 'Medium',
      allergens: 'Lactose-free'
    },
    ingredients: 'Green tea leaves.',
    rating: 4.3,
    reviewCount: 156,
    inStock: true
  }
];

const mockCategories = [
  { id: 1, name: 'Black Tea', slug: 'black-tea', image: catBlack },
  { id: 2, name: 'Green Tea', slug: 'green-tea', image: catGreen },
  { id: 3, name: 'White Tea', slug: 'white-tea', image: catWhite },
  { id: 4, name: 'Herbal Tea', slug: 'herbal-tea', image: catHerbal },
  { id: 5, name: 'Matcha', slug: 'matcha', image: catMatcha },
  { id: 6, name: 'Chai', slug: 'chai', image: catBlack },
  { id: 7, name: 'Oolong', slug: 'oolong', image: catGreen },
  { id: 8, name: 'Rooibos', slug: 'rooibos', image: catHerbal },
  { id: 9, name: 'Teaware', slug: 'teaware', image: catMatcha }
];

export const productService = {
  // Get all products with filters
  getProducts: async (filters = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredProducts = [...mockProducts];
    
    // Apply filters
    if (filters.category && filters.category.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.category.includes(product.category)
      );
    }
    
    if (filters.origin && filters.origin.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.origin.includes(product.origin)
      );
    }
    
    if (filters.minPrice || filters.maxPrice) {
      filteredProducts = filteredProducts.filter(product => {
        const price = product.price;
        return (!filters.minPrice || price >= filters.minPrice) &&
               (!filters.maxPrice || price <= filters.maxPrice);
      });
    }
    
    if (filters.organic) {
      filteredProducts = filteredProducts.filter(product => product.organic);
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          // Featured/default order
          break;
      }
    }
    
    return {
      products: filteredProducts,
      total: filteredProducts.length,
      page: filters.page || 1,
      limit: filters.limit || 12
    };
  },

  // Get single product by ID
  getProduct: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = mockProducts.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },

  // Get related products
  getRelatedProducts: async (productId, limit = 3) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const currentProduct = mockProducts.find(p => p.id === parseInt(productId));
    if (!currentProduct) return [];
    
    return mockProducts
      .filter(p => p.id !== parseInt(productId) && p.category === currentProduct.category)
      .slice(0, limit);
  },

  // Get categories
  getCategories: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockCategories;
  },

  // Search products
  searchProducts: async (query) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const results = mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    return results;
  }
};