import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard/ProductCard';
import Loader from '../components/common/Loader/Loader';
import FiltersBar from '../components/FiltersBar/FiltersBar';
import Pagination from '../components/common/Pagination/Pagination';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- State for Filters, Sort, Search, and Pagination ---
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    page: 1,
    q: '',
    category: '',
    sort: '-createdAt'
  });

  const location = useLocation();
  const navigate = useNavigate();

  // --- Sync state with URL query params ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters(prevFilters => ({
      page: parseInt(params.get('page')) || 1,
      q: params.get('q') || '',
      category: params.get('category') || '',
      sort: params.get('sort') || '-createdAt',
    }));
  }, [location.search]);

  // --- Data Fetching ---
  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const activeFilters = { ...filters };
      if (!activeFilters.q) delete activeFilters.q;
      if (!activeFilters.category) delete activeFilters.category;

      const params = new URLSearchParams(activeFilters).toString();
      // Only navigate if the search params are different to avoid loops
      if (location.search.substring(1) !== params) {
        navigate(`${location.pathname}?${params}`, { replace: true });
      }

      const data = await fetchProducts(activeFilters);

      setProducts(data.data.products);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message || 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  }, [filters, navigate, location.pathname, location.search]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // --- Event Handlers ---
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    if (newPage !== filters.page) {
      setFilters(prev => ({ ...prev, page: newPage }));
    }
  };

  const handleResetFilters = () => {
    setFilters({ page: 1, q: '', category: '', sort: '-createdAt' });
  };


  const renderContent = () => {
    if (loading) return <Loader />;
    if (error) return <div className="error-message">Error: {error}</div>;
    if (products.length === 0) return <p>No products found. Try adjusting your filters.</p>;
    return (
      <div className="product-grid">
        {products.map(product => <ProductCard key={product._id} product={product} />)}
      </div>
    );
  };

  return (
    <div className="container products-page">
      <Helmet>
        <title>Shop All Products | GardenVerde</title>
        <meta name="description" content="Explore our full collection of natural plants, synthetic plants, garden furniture, and planters. Filter by category, price, and more." />
      </Helmet>
      <h1 className="page-title">Shop Our Collection</h1>
      <FiltersBar
        searchQuery={filters.q}
        onSearchChange={(e) => handleFilterChange({ q: e.target.value })}
        category={filters.category}
        onCategoryChange={(e) => handleFilterChange({ category: e.target.value })}
        sort={filters.sort}
        onSortChange={(e) => handleFilterChange({ sort: e.target.value })}
        onResetFilters={handleResetFilters}
      />
      <main className="products-main-content">
        {renderContent()}
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default ProductsPage;
