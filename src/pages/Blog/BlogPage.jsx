import React from 'react';

const BlogPage = () => {
  const posts = [
    { id: 1, title: 'The Art of Tea Brewing', date: 'March 15, 2024', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop', excerpt: 'Learn the perfect techniques for brewing different types of tea.' },
    { id: 2, title: 'Health Benefits of Green Tea', date: 'March 10, 2024', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&h=400&fit=crop', excerpt: 'Discover the amazing health benefits of drinking green tea daily.' },
    { id: 3, title: 'Tea Culture Around the World', date: 'March 5, 2024', image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=600&h=400&fit=crop', excerpt: 'Explore how different cultures celebrate and enjoy tea.' },
    { id: 4, title: 'Best Tea for Relaxation', date: 'February 28, 2024', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop', excerpt: 'Find out which teas are perfect for unwinding after a long day.' },
    { id: 5, title: 'Organic vs Regular Tea', date: 'February 20, 2024', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&h=400&fit=crop', excerpt: 'Understanding the differences between organic and regular tea.' },
    { id: 6, title: 'Tea Pairing Guide', date: 'February 15, 2024', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&h=400&fit=crop', excerpt: 'Learn how to pair tea with food for the best experience.' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Tea Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover stories, tips, and insights about the wonderful world of tea.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="aspect-video overflow-hidden bg-gray-100 mb-4">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h2 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
              <button className="text-sm font-medium text-gray-900 hover:text-gray-600">
                Read More →
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
