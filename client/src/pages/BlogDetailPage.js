import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchBlogPostBySlug } from '../services/api';
import Loader from '../components/common/Loader/Loader';
import './BlogDetailPage.css';

const BlogDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogPostBySlug(slug);
        setPost(data.data.post);
      } catch (err) {
        setError('Failed to fetch the blog post.');
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [slug]);

  if (loading) return <Loader />;
  if (error) return <div className="container error-message">{error}</div>;
  if (!post) return (
    <div className="container">
        <Helmet>
            <title>Post Not Found | GardenVerde</title>
        </Helmet>
        Blog post not found.
    </div>
  );

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container blog-detail-page">
      <Helmet>
        <title>{`${post.title} | GardenVerde Blog`}</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <article className="blog-post-content">
        <header className="blog-post-header">
          <h1 className="blog-post-title">{post.title}</h1>
          <p className="blog-post-meta">
            Posted on {formattedDate} by {post.author.name}
          </p>
        </header>

        {post.heroImage && (
          <img src={post.heroImage} alt={post.title} className="blog-post-hero-image" />
        )}

        <div className="blog-post-body" dangerouslySetInnerHTML={{ __html: post.content }}>
          {/* Using dangerouslySetInnerHTML assuming the content from the CMS/backend is trusted.
              In a real-world scenario, you might want to sanitize this HTML. */}
        </div>

        <footer className="blog-post-footer">
          <Link to="/blog" className="back-to-blog-link">&larr; Back to all posts</Link>
        </footer>
      </article>
    </div>
  );
};

export default BlogDetailPage;
