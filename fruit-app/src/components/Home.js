// frontend/src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Create this CSS file for styling

const Home = () => {
  const navigate = useNavigate();

  const services = [
    { name: 'Chatbot', path: '/chatbot', icon: '💬' },
    { name: 'Translator', path: '/translator', icon: '🌐' },
    { name: 'FAQ', path: '/faq', icon: '❓' },
    { name: 'About', path: '/about', icon: 'ℹ️' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h2>Welcome to the Fruit App</h2>
      <div className="services-grid">
        {services.map((service) => (
          <div 
            key={service.name} 
            className="service-card" 
            onClick={() => navigate(service.path)}
          >
            <span className="service-icon">{service.icon}</span>
            <span>{service.name}</span>
          </div>
        ))}
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
