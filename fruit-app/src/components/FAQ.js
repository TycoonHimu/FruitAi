import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FAQ.css'; // Create this CSS file for styling

const API_URL = 'https://fruitai-backend-zar4.onrender.com/api/faqs';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [fruit, setFruit] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, { timeout: 5000 });
      setFaqs(response.data);
    } catch (err) {
      setError('Failed to fetch FAQs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer || !fruit) {
      setError('All fields are required.');
      return;
    }
    setError('');
    try {
      if (editId) {
        // Update existing FAQ
        await axios.put(`${API_URL}/${editId}`, { question, answer, fruit }, { timeout: 5000 });
        setEditId(null);
      } else {
        // Create new FAQ
        await axios.post(API_URL, { question, answer, fruit }, { timeout: 5000 });
      }
      setQuestion('');
      setAnswer('');
      setFruit('');
      fetchFaqs();
    } catch (err) {
      setError('Operation failed.');
    }
  };

  const handleEdit = (faq) => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setFruit(faq.fruit);
    setEditId(faq.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, { timeout: 5000 });
      fetchFaqs();
    } catch (err) {
      setError('Delete failed.');
    }
  };

  return (
    <div className="faq-container">
      <h2>FAQs</h2>
      <form onSubmit={handleSubmit} className="faq-form">
        <input 
          type="text" 
          placeholder="Question" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Answer" 
          value={answer} 
          onChange={(e) => setAnswer(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Fruit" 
          value={fruit} 
          onChange={(e) => setFruit(e.target.value)} 
          required 
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">{editId ? 'Update FAQ' : 'Add FAQ'}</button>
        {editId && <button type="button" onClick={() => {
          setEditId(null);
          setQuestion('');
          setAnswer('');
          setFruit('');
          setError('');
        }}>Cancel</button>}
      </form>
      {loading ? (
        <p>Loading FAQs...</p>
      ) : (
        <div className="faqs-list">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-item">
              <h4>{faq.question}</h4>
              <p><strong>Answer:</strong> {faq.answer}</p>
              <p><strong>Fruit:</strong> {faq.fruit}</p>
              <div className="faq-actions">
                <button onClick={() => handleEdit(faq)}>Edit</button>
                <button onClick={() => handleDelete(faq.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQ;
