import React from 'react';

const AdminPage = () => {
  return (
    <div className="container">
      <h1>Admin Panel</h1>
      <div className="admin-section">
        <h2>Add Product</h2>
        {/* Add Product Form will go here */}
      </div>
      <div className="admin-section">
        <h2>Edit Product</h2>
        {/* Edit Product Form will go here */}
      </div>
      <div className="admin-section">
        <h2>Delete Product</h2>
        {/* Delete Product Form will go here */}
      </div>
    </div>
  );
};

export default AdminPage;
