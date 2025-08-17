import React from 'react';
import { Helmet } from 'react-helmet-async';
import './ServicesPage.css';

const servicesData = [
  {
    title: 'Residential Landscaping',
    description: 'Transform your outdoor space into a beautiful and functional garden oasis. We work with you to design and create a landscape that reflects your style and enhances your home.',
    icon: '🌳'
  },
  {
    title: 'Office & Indoor Plant Curation',
    description: 'Bring life and color to your workspace. We select, install, and maintain the perfect plants to improve air quality, boost productivity, and create a welcoming environment.',
    icon: '🏢'
  },
  {
    title: 'Plant Maintenance Plans',
    description: 'Too busy to care for your plants? Our expert team can provide regular watering, pruning, fertilizing, and pest control to keep your green friends healthy and thriving.',
    icon: '💧'
  },
  {
    title: 'Event Plant Rentals',
    description: 'Elevate your wedding, corporate event, or party with our beautiful plant rentals. We provide stunning arrangements to create a memorable atmosphere.',
    icon: '🎉'
  }
];

const ServicesPage = () => {
  return (
    <div className="container services-page">
      <Helmet>
        <title>Our Services | GardenVerde</title>
        <meta name="description" content="Explore the services offered by GardenVerde, including residential landscaping, office plant curation, maintenance plans, and event rentals." />
      </Helmet>
      <div className="services-hero">
        <h1>Our Services</h1>
        <p>Expert care and design to help you create your perfect green space.</p>
      </div>

      <div className="services-grid">
        {servicesData.map(service => (
          <div key={service.title} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h2 className="service-title">{service.title}</h2>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
