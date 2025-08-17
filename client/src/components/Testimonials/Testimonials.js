import React from 'react';
import './Testimonials.css';

const testimonialsData = [
  {
    quote: "The Monstera I ordered arrived in perfect condition! The packaging was excellent, and the plant is so healthy and beautiful. Will definitely be buying more.",
    author: "Sarah J.",
    rating: 5
  },
  {
    quote: "I'm so impressed with the quality of the artificial olive tree. It looks incredibly realistic and has completely transformed my living room. No maintenance is a huge plus!",
    author: "Michael B.",
    rating: 5
  },
  {
    quote: "Great customer service and fast shipping. The ceramic planter is exactly what I was looking for. Simple, elegant, and very well made.",
    author: "Emily R.",
    rating: 4
  }
];

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

const Testimonials = () => {
  return (
    <div className="testimonials-grid">
      {testimonialsData.map((testimonial, index) => (
        <div key={index} className="testimonial-card">
          <StarRating rating={testimonial.rating} />
          <p className="testimonial-quote">"{testimonial.quote}"</p>
          <p className="testimonial-author">- {testimonial.author}</p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
