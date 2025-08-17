import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPostCard.css';

const BlogPostCard = ({ post }) => {
  const { title, slug, heroImage, excerpt, author, publishedAt } = post;

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link to={`/blog/${slug}`} className="blog-post-card">
      <div className="blog-card-image">
        <img src={heroImage || '/assets/images/placeholder.jpg'} alt={title} loading="lazy" />
      </div>
      <div className="blog-card-content">
        <h2 className="blog-card-title">{title}</h2>
        <p className="blog-card-meta">
          By {author.name} on {formattedDate}
        </p>
        <p className="blog-card-excerpt">{excerpt}</p>
        <span className="read-more-link">Read More &rarr;</span>
      </div>
    </Link>
  );
};

export default BlogPostCard;
