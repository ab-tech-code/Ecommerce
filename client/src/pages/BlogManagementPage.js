import React, { useState } from 'react';
import { createBlogPost } from '../services/api';

const BlogManagementPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBlogPost(formData);
            // Optionally, redirect or show a success message
            alert('Blog post created successfully!');
            setFormData({ title: '', content: '', image: '' });
        } catch (error) {
            console.error('Error creating blog post:', error);
            alert('Failed to create blog post.');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Manage Blog</h2>

            <h3>Create New Post</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
                <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content" required />
                <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default BlogManagementPage;
