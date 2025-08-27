import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, deleteProduct } from '../services/api';

const ProductManagementPage = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        image: '',
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await getProducts();
            setProducts(data.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(formData);
            fetchProducts();
            setFormData({ name: '', description: '', price: '', stock: '', image: '' });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Manage Products</h2>

            <h3>Add New Product</h3>
            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" required />
                <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
                <button type="submit">Add Product</button>
            </form>

            <h3>Existing Products</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {products.map(product => (
                    <li key={product._id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
                        <h4>{product.name}</h4>
                        <p>{product.description}</p>
                        <p>Price: ₦{product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagementPage;
