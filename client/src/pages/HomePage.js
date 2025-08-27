import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero/Hero';
import ProductCard from '../components/ProductCard/ProductCard';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import ValueProps from '../components/ValueProps/ValueProps';
import Testimonials from '../components/Testimonials/Testimonials';
import CallToAction from '../components/CallToAction/CallToAction';

// --- Placeholder Data ---
const categories = [
  { name: 'Natural Plants', image: '/assets/images/category-natural.jpg', link: '/products?category=natural' },
  { name: 'Synthetic Plants', image: '/assets/images/category-synthetic.jpg', link: '/products?category=synthetic' },
  { name: 'Garden Furniture', image: '/assets/images/category-furniture.jpg', link: '/products?category=furniture' },
  { name: 'Planters', image: '/assets/images/category-planters.jpg', link: '/products?category=planter' },
];

const featuredProducts = [
  {
    _id: '1',
    name: 'Monstera Deliciosa',
    slug: 'monstera-deliciosa',
    category: 'natural',
    price: 15000.00,
    images: ['/assets/images/placeholder.jpg'],
  },
  {
    _id: '2',
    name: 'Artificial Olive Tree',
    slug: 'artificial-olive-tree',
    category: 'synthetic',
    price: 45000.00,
    salePrice: 35000.00,
    images: ['/assets/images/placeholder.jpg'],
  },
  {
    _id: '3',
    name: 'Acacia Wood Patio Set',
    slug: 'acacia-wood-patio-set',
    category: 'furniture',
    price: 80000.00,
    images: ['/assets/images/placeholder.jpg'],
  },
  {
    _id: '4',
    name: 'Modern Ceramic Planter',
    slug: 'modern-ceramic-planter',
    category: 'planter',
    price: 8000.00,
    images: ['/assets/images/placeholder.jpg'],
  }
];


const HomePage = () => {
  return (
    <div className="homepage">
      <Helmet>
        <title>Albustan - Your Home for Beautiful Plants & Garden Supplies</title>
        <meta name="description" content="Shop a wide variety of natural and synthetic plants, garden furniture, and planters. Create your own green oasis with Albustan." />
      </Helmet>
      <Hero />

      {/* --- Featured Categories Section --- */}
      <section className="featured-categories container section-padding">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          {categories.map(category => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </section>

      {/* --- Featured Products Section --- */}
      <section className="featured-products container section-padding">
        <h2 className="section-title">Our Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* --- Value Propositions Section --- */}
      <section className="value-props section-padding">
        <div className="container">
          <h2 className="section-title">Why Shop With Us?</h2>
          <ValueProps />
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section className="testimonials section-padding">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <Testimonials />
        </div>
      </section>

      {/* --- Call to Action Section --- */}
      <CallToAction />

    </div>
  );
};

// Some basic page-level styles can be added to a global CSS or a dedicated HomePage.css
// For now, adding some structure classes directly.
// e.g. .section-padding { padding: var(--space-6) 0; }
// .section-title { text-align: center; margin-bottom: var(--space-4); }

export default HomePage;
