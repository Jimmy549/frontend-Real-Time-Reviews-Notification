// API endpoints
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://tea-ecommerce-backend.onrender.com';

// Tea categories
export const TEA_CATEGORIES = [
  'Black teas',
  'Green teas',
  'White teas',
  'Chai',
  'Matcha',
  'Herbal teas',
  'Oolong',
  'Rooibos',
  'Teaware'
];

// Tea origins
export const TEA_ORIGINS = [
  'India',
  'Japan',
  'Iran',
  'South Africa'
];

// Tea flavors
export const TEA_FLAVORS = [
  'Spicy',
  'Sweet',
  'Citrus',
  'Smooth',
  'Fruity',
  'Floral',
  'Grassy',
  'Minty',
  'Bitter',
  'Creamy'
];

// Tea qualities
export const TEA_QUALITIES = [
  'Detox',
  'Energy',
  'Relax',
  'Digestion'
];

// Caffeine levels
export const CAFFEINE_LEVELS = [
  'No Caffeine',
  'Low Caffeine',
  'Medium Caffeine',
  'High Caffeine'
];

// Allergens
export const ALLERGENS = [
  'Lactose-free',
  'Gluten-free',
  'Nuts-free',
  'Soy-free'
];

// Product variants
export const PRODUCT_VARIANTS = [
  { id: '50g', label: '50 g bag', size: '50g' },
  { id: '100g', label: '100 g bag', size: '100g' },
  { id: '170g', label: '170 g bag', size: '170g' },
  { id: '250g', label: '250 g bag', size: '250g' },
  { id: '1kg', label: '1 kg bag', size: '1kg' },
  { id: 'sampler', label: 'Sampler', size: 'sampler' }
];

// Sort options
export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'newest', label: 'Newest' }
];

// Payment methods
export const PAYMENT_METHODS = [
  { id: 'visa', name: 'Visa', icon: '/images/visa.png' },
  { id: 'mastercard', name: 'Mastercard', icon: '/images/mastercard.png' },
  { id: 'maestro', name: 'Maestro', icon: '/images/maestro.png' },
  { id: 'ideal', name: 'iDEAL', icon: '/images/ideal.png' },
  { id: 'amex', name: 'American Express', icon: '/images/amex.png' }
];

// Shipping info
export const SHIPPING_INFO = [
  'Order before 12:00 and we will ship the same day.',
  'Orders made after Friday 12:00 are processed on Monday.',
  'To return your articles, please contact us first.',
  'Postal charges for retour are not reimbursed.'
];

// Contact info
export const CONTACT_INFO = {
  address: '3 Falahi, Falahi St, Pasdaran Ave, Shiraz, Fars Providence Iran',
  email: 'amoopur@gmail.com',
  phone: '+98 9173038406'
};

// Navigation links
export const NAV_LINKS = [
  { name: 'TEA COLLECTIONS', href: '/collections' },
  { name: 'ACCESSORIES', href: '/accessories' },
  { name: 'BLOG', href: '/blog' },
  { name: 'CONTACT US', href: '/contact' }
];

// Footer links
export const FOOTER_LINKS = {
  collections: [
    { name: 'Black teas', href: '/collections/black-tea' },
    { name: 'Green teas', href: '/collections/green-tea' },
    { name: 'White teas', href: '/collections/white-tea' },
    { name: 'Herbal teas', href: '/collections/herbal-tea' },
    { name: 'Matcha', href: '/collections/matcha' },
    { name: 'Chai', href: '/collections/chai' },
    { name: 'Oolong', href: '/collections/oolong' },
    { name: 'Rooibos', href: '/collections/rooibos' },
    { name: 'Teaware', href: '/collections/teaware' }
  ],
  learn: [
    { name: 'About us', href: '/about' },
    { name: 'About our teas', href: '/about-teas' },
    { name: 'Tea academy', href: '/tea-academy' }
  ],
  customerService: [
    { name: 'Ordering and payment', href: '/ordering-payment' },
    { name: 'Delivery', href: '/delivery' },
    { name: 'Privacy and policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-conditions' }
  ]
};
