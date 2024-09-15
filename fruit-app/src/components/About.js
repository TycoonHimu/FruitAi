// frontend/src/components/About.js
import React from 'react';
import './About.css'; // Create this CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h2>About This Application</h2>
      <p>
        This Fruit App is designed to provide users with information about various fruits.
        It includes features like a chatbot to explore fruits, a translator for converting text
        into regional languages, and an FAQ section to address common queries related to fruits.
      </p>
      <p>
        Developed by Himanshu Shekhar, this application demonstrates basic CRUD operations,
        responsive UI/UX design, and integration between frontend and backend services.
      </p>
    </div>
  );
};

export default About;
