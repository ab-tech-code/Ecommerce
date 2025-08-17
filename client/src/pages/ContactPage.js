import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Input from '../components/common/Input/Input';
import Button from '../components/common/Button/Button';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState({ loading: false, error: null, success: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: null });

    if (!formData.name || !formData.email || !formData.message) {
        setStatus({ loading: false, error: 'Name, Email, and Message are required.', success: null });
        return;
    }

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong.');
        }
        setStatus({ loading: false, error: null, success: data.message });
        setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
        setStatus({ loading: false, error: err.message, success: null });
    }
  };

  return (
    <div className="container contact-page">
      <Helmet>
        <title>Contact Us | GardenVerde</title>
        <meta name="description" content="Have a question? Send us a message through our contact form or find our business hours and location. We're here to help!" />
      </Helmet>
      <div className="contact-hero">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Whether you have a question about our products, services, or anything else, our team is ready to answer all your questions.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-form-container">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <Input name="name" label="Full Name" value={formData.name} onChange={handleInputChange} required />
            <Input name="email" label="Email Address" type="email" value={formData.email} onChange={handleInputChange} required />
            <Input name="phone" label="Phone Number (Optional)" value={formData.phone} onChange={handleInputChange} />
            <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                />
            </div>
            <Button type="submit" disabled={status.loading}>
              {status.loading ? 'Sending...' : 'Send Message'}
            </Button>
            {status.error && <p className="status-message error">{status.error}</p>}
            {status.success && <p className="status-message success">{status.success}</p>}
          </form>
        </div>

        <div className="contact-info-container">
          <div className="contact-info-block">
            <h3>Business Hours</h3>
            <p>Monday - Friday: 9am - 6pm</p>
            <p>Saturday: 10am - 4pm</p>
            <p>Sunday: Closed</p>
          </div>
          <div className="contact-info-block">
            <h3>Our Location</h3>
            <p>123 Greenery Lane<br/>Plantville, PV 45678</p>
            <div className="map-placeholder">
                <p>(Map will be here)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
