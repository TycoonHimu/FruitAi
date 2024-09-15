// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Chatbot from './components/Chatbot';
import Translator from './components/Translator';
import FAQ from './components/FAQ';
import About from './components/About';
import './App.css';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('authenticated') === 'true';
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route 
          path="/login" 
          element={<Login />} 
        />
        <Route 
          path="/home" 
          element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/chatbot" 
          element={isAuthenticated() ? <Chatbot /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/translator" 
          element={isAuthenticated() ? <Translator /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/faq" 
          element={isAuthenticated() ? <FAQ /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/about" 
          element={isAuthenticated() ? <About /> : <Navigate to="/login" />} 
        />
        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
