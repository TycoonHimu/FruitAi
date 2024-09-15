// frontend/src/components/Translator.js
import React, { useState } from 'react';
import './Translator.css'; // Create this CSS file for styling

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dummy translation function
  const translateText = (text) => {
    // For demonstration, reverse the text as "translation"
    return text.split('').reverse().join('');
  };

  const handleTranslate = (e) => {
    e.preventDefault();
    setError('');
    if (!inputText.trim()) {
      setError('Please enter text to translate.');
      return;
    }
    setLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        const result = translateText(inputText);
        setTranslatedText(result);
      } catch (err) {
        setError('Translation failed.');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="translator-container">
      <h2>Translator</h2>
      <form onSubmit={handleTranslate}>
        <textarea 
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
          placeholder="Enter text to translate..." 
          rows="4"
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </form>
      {translatedText && (
        <div className="translated-result">
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Translator;
