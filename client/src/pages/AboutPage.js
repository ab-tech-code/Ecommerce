import React from 'react';
import { Helmet } from 'react-helmet-async';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="container about-page">
      <Helmet>
        <title>About Us | Albustan</title>
        <meta name="description" content="Learn about Albustan's story, our passion for plants, and our commitment to sustainability." />
      </Helmet>
      <div className="about-hero">
        <h1>Our Story</h1>
        <p>From a small backyard nursery to a thriving online garden, our passion for plants has always been at the heart of what we do.</p>
      </div>

      <div className="about-content">
        <div className="content-section">
          <h2>Rooted in Passion</h2>
          <p>
            Albustan was founded in 2020 with a simple mission: to make the joy of gardening accessible to everyone, everywhere. We believe that a little bit of green can make a big difference in our lives, bringing peace, beauty, and a connection to nature into our homes and workspaces.
          </p>
          <p>
            Our team is composed of horticulturalists, designers, and plant enthusiasts who carefully select and nurture every plant we sell. We are committed to providing you with the healthiest, highest-quality plants, along with the knowledge and support you need to help them thrive.
          </p>
        </div>

        <div className="content-section sustainability">
          <h2>Our Commitment to Sustainability</h2>
          <p>
            We are deeply committed to protecting the planet that gives us so much beauty. Our sustainability efforts include:
          </p>
          <ul>
            <li>🌱 Using 100% recyclable or compostable packaging.</li>
            <li>💧 Implementing water-saving irrigation techniques in our nurseries.</li>
            <li>🌿 Sourcing our materials from responsible and ethical suppliers.</li>
            <li>🌍 Partnering with local conservation projects to give back to the community.</li>
          </ul>
        </div>

        <div className="content-section certifications">
          <h2>Certifications & Awards</h2>
          <div className="badges">
            <div className="badge">Certified Organic Grower</div>
            <div className="badge">Green Business Award 2023</div>
            <div className="badge">Eco-Friendly Packaging Partner</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
