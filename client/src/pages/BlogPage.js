import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchBlogPosts } from '../services/api';
import BlogPostCard from '../components/BlogPostCard/BlogPostCard';
import Loader from '../components/common/Loader/Loader';
import './BlogPage.css';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogPosts();
        setPosts(data.data.posts);
      } catch (err) {
        setError('Failed to fetch blog posts.');
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  const renderContent = () => {
    if (loading) return <Loader />;
    if (error) return <p className="error-message">{error}</p>;
    if (posts.length === 0) return <p>No blog posts have been published yet.</p>;

    return (
      <div className="blog-posts-grid">
        {posts.map(post => (
          <BlogPostCard key={post._id} post={post} />
        ))}
      </div>
    );
  };

  return (
    <div className="container blog-page">
      <Helmet>
        <title>Gardening Blog | GardenVerde</title>
        <meta name="description" content="Read our blog for gardening tips, plant care guides, inspiration, and the latest news from GardenVerde." />
      </Helmet>
      <div className="blog-hero">
        <h1>Gardening Tips & Inspiration</h1>
        <p>Your source for expert advice, plant care guides, and creative ideas.</p>
      </div>
      {renderContent()}
    </div>
  );
};

export default BlogPage;
