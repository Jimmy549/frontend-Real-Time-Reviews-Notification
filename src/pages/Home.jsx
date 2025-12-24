import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import heroImage from '../assets/images/main landing page.jpg';
import blackTeaImg from '../assets/images/107c02d9996dfe83fb8bdd868196319fa864018f.jpg';
import greenTeaImg from '../assets/images/4469b82376e6d6e4dd6477a7a98cf42a45a38a05.jpg';
import whiteTeaImg from '../assets/images/45d4af846a0c593ecfde4bf49b9637f4ae8a63f2.jpg';
import matchaImg from '../assets/images/4d22ce807689d07a2d316c9b9bd21294008059d1.jpg';
import herbalTeaImg from '../assets/images/4ed1bd594c5d611a95d9efd892f14ba62c6c68c4.jpg';
import chaiImg from '../assets/images/a7b47e9ba4ca5788c18b5bb669f80c10404bf9ca.jpg';
import oolongImg from '../assets/images/c3915d82a0f798034b1306ab0f3cec5d43cb46ce.jpg';
import rooibosImg from '../assets/images/e488290fae054f73ee109d481150f5b34f3acb4c.jpg';


const Home = () => {
  const collections = [
    { name: 'BLACK TEA', image: blackTeaImg, link: '/collections/black-tea' },
    { name: 'GREEN TEA', image: greenTeaImg, link: '/collections/green-tea' },
    { name: 'WHITE TEA', image: whiteTeaImg, link: '/collections/white-tea' },
    { name: 'MATCHA', image: matchaImg, link: '/collections/matcha' },
    { name: 'HERBAL TEA', image: herbalTeaImg, link: '/collections/herbal-tea' },
    { name: 'CHAI', image: chaiImg, link: '/collections/chai' },
    { name: 'OOLONG', image: oolongImg, link: '/collections/oolong' },
    { name: 'ROOIBOS', image: rooibosImg, link: '/collections/rooibos' },
  ];

  // All tea collection products for home page
  const allTeaProducts = [
    {
      _id: 'tea-1',
      name: 'Earl Grey Premium',
      basePrice: 25.99,
      origin: 'Sri Lanka',
      flavor: 'Bergamot',
      image: blackTeaImg
    },
    {
      _id: 'tea-2',
      name: 'Green Dragon Well',
      basePrice: 32.50,
      origin: 'China',
      flavor: 'Fresh',
      image: greenTeaImg
    },
    {
      _id: 'tea-3',
      name: 'Silver Needle White Tea',
      basePrice: 45.75,
      origin: 'China',
      flavor: 'Delicate',
      image: whiteTeaImg
    },
    {
      _id: 'tea-4',
      name: 'Premium Matcha Powder',
      basePrice: 48.99,
      origin: 'Japan',
      flavor: 'Grassy',
      image: matchaImg
    },
    {
      _id: 'tea-5',
      name: 'Chamomile Dreams',
      basePrice: 18.99,
      origin: 'Egypt',
      flavor: 'Floral',
      image: herbalTeaImg
    },
    {
      _id: 'tea-6',
      name: 'Masala Chai Blend',
      basePrice: 24.50,
      origin: 'India',
      flavor: 'Spicy',
      image: chaiImg
    },
    {
      _id: 'tea-7',
      name: 'Oolong Supreme',
      basePrice: 38.75,
      origin: 'Taiwan',
      flavor: 'Smooth',
      image: oolongImg
    },
    {
      _id: 'tea-8',
      name: 'Red Bush Rooibos',
      basePrice: 22.99,
      origin: 'South Africa',
      flavor: 'Sweet',
      image: rooibosImg
    },
    {
      _id: 'tea-9',
      name: 'English Breakfast',
      basePrice: 28.50,
      origin: 'India',
      flavor: 'Malty',
      image: blackTeaImg
    },
    {
      _id: 'tea-10',
      name: 'Jasmine Phoenix Pearls',
      basePrice: 42.99,
      origin: 'China',
      flavor: 'Jasmine',
      image: greenTeaImg
    },
    {
      _id: 'tea-11',
      name: 'Himalayan Gold',
      basePrice: 35.75,
      origin: 'Nepal',
      flavor: 'Honey',
      image: whiteTeaImg
    },
    {
      _id: 'tea-12',
      name: 'Ceremonial Matcha',
      basePrice: 65.99,
      origin: 'Japan',
      flavor: 'Umami',
      image: matchaImg
    }
  ];

  return (
    <div className="home-page">
      {/* Tea Products Section - Top of page */}
      <section className="tea-products-section px-4 md:px-8 py-8 md:py-12 bg-white">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-center mb-6 md:mb-10">Our Tea Collection</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {allTeaProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link 
            to="/collections" 
            className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            View All Collections
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-image">
            <img src={heroImage} alt="Tea varieties" className="w-full h-auto" />
          </div>
          <div className="hero-text px-4 md:px-8">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-normal mb-4 md:mb-6">Every day is unique, just like our tea</h1>
            <p className="text-sm md:text-base mb-3 md:mb-4">
              Lorem ipsum dolor sit amet consectetur. Orci nibh nullam faucibus adipiscing amet. Nunc nunc eros in.
            </p>
            <p className="text-sm md:text-base mb-6 md:mb-8">
              Lorem ipsum dolor sit amet consectetur. Orci nibh nullam faucibus adipiscing amet. Nunc nunc eros in.
            </p>
            <button className="browse-btn text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3">BROWSE TEAS</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-8 md:py-12">
        <div className="features-container grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4 md:px-8 mb-6 md:mb-8">
          <div className="feature-item text-center">
            <span className="feature-icon text-2xl md:text-3xl mb-2 block">📋</span>
            <span className="feature-text text-xs md:text-sm font-medium">450+ KIND OF LOOSEF TEA</span>
          </div>
          <div className="feature-item text-center">
            <span className="feature-icon text-2xl md:text-3xl mb-2 block">📜</span>
            <span className="feature-text text-xs md:text-sm font-medium">CERTIFICATED ORGANIC TEAS</span>
          </div>
          <div className="feature-item text-center">
            <span className="feature-icon text-2xl md:text-3xl mb-2 block">🚚</span>
            <span className="feature-text text-xs md:text-sm font-medium">FREE DELIVERY</span>
          </div>
          <div className="feature-item text-center">
            <span className="feature-icon text-2xl md:text-3xl mb-2 block">🏷️</span>
            <span className="feature-text text-xs md:text-sm font-medium">SAMPLE FOR ALL TEAS</span>
          </div>
        </div>
        <div className="text-center">
          <button className="learn-more-btn text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3">LEARN MORE</button>
        </div>
      </section>

      {/* Collections Section */}
      <section className="collections-section px-4 md:px-8 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-center mb-6 md:mb-10">Our Collections</h2>
        <div className="collections-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection, index) => (
            <Link to={collection.link} key={index} className="collection-card group">
              <div className="collection-image overflow-hidden rounded-lg mb-3">
                <img src={collection.image} alt={collection.name} className="w-full h-auto transform group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="text-xs md:text-sm font-medium text-center">{collection.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section px-4 md:px-8 py-8 md:py-12 bg-gray-50">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-center mb-6 md:mb-10">Bestsellers</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {allTeaProducts.slice(0, 8).map((product) => (
            <ProductCard key={`bestseller-${product._id}`} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link 
            to="/collections" 
            className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Shop All Teas
          </Link>
        </div>
      </section>

      {/* Last Blog Posts - Mobile */}
      <section className="md:hidden px-4 py-8 bg-gray-50">
        <h2 className="text-xl font-normal mb-6">Last Blog Posts</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <img src={heroImage} alt="Blog post" className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="text-sm font-medium mb-2">HOW TO STEEP TEA LIKE A PRO</h3>
              <p className="text-xs text-gray-600 mb-3">Lorem ipsum dolor sit amet consectetur. Orci nibh nullam faucibus adipiscing amet...</p>
              <Link to="/blog" className="text-xs text-gray-900 font-medium">Read More</Link>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <img src={heroImage} alt="Blog post" className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="text-sm font-medium mb-2">ALL ABOUT TEA AROMAS</h3>
              <p className="text-xs text-gray-600 mb-3">Lorem ipsum dolor sit amet consectetur. Orci nibh nullam faucibus adipiscing amet...</p>
              <Link to="/blog" className="text-xs text-gray-900 font-medium">Read More</Link>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link to="/blog" className="inline-block border border-gray-900 px-6 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors">
            BROWSE ALL POSTS
          </Link>
        </div>
      </section>

      {/* For Wholesalers - Mobile */}
      <section className="md:hidden px-4 py-8">
        <h2 className="text-xl font-normal mb-4">FOR WHOLESALERS</h2>
        <p className="text-sm text-gray-600 mb-6">
          We offer loose tea leaves of the best quality for your business. With a choice of more than 450 different kinds of loose tea, we can make a sophisticated selection that fits exactly in your kind of establishment.
        </p>
        <Link to="/contact" className="inline-block border border-gray-900 px-6 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors">
          GET A FREE CONSULTATION
        </Link>
      </section>
    </div>
  );
};

export default Home;