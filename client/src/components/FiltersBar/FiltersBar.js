import React from 'react';
import './FiltersBar.css';

/**
 * A component for filtering and sorting products.
 * @param {object} props
 * @param {string} props.searchQuery - The current search query.
 * @param {function} props.onSearchChange - Handler for search input changes.
 * @param {string} props.category - The currently selected category.
 * @param {function} props.onCategoryChange - Handler for category select changes.
 * @param {string} props.sort - The current sort option.
 * @param {function} props.onSortChange - Handler for sort select changes.
 * @param {function} props.onResetFilters - Handler to reset all filters.
 */
const FiltersBar = ({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  onResetFilters
}) => {
  const categories = ['natural', 'synthetic', 'furniture', 'planter'];
  const sortOptions = [
    { value: '-createdAt', label: 'Newest' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' },
    { value: '-name', label: 'Name: Z to A' },
  ];

  return (
    <div className="filters-bar">
      <div className="filter-group">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={onSearchChange}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={onCategoryChange} className="filter-select">
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort">Sort By</label>
        <select id="sort" value={sort} onChange={onSortChange} className="filter-select">
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <button onClick={onResetFilters} className="reset-filters-btn">
        Reset Filters
      </button>
    </div>
  );
};

export default FiltersBar;
