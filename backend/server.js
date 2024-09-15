const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import CORS
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS

// Path to the FAQs data file
const dataFilePath = path.join(__dirname, 'data', 'faqs.json');

// Helper function to read FAQs
const readFAQs = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    throw error;
  }
};

// Helper function to write FAQs
const writeFAQs = (faqs) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(faqs, null, 2), 'utf8');
  } catch (error) {
    console.error("Error writing to JSON file:", error);
    throw error;
  }
};

// GET all FAQs
app.get('/api/faqs', (req, res) => {
  try {
    const faqs = readFAQs();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch FAQs.' });
  }
});

// POST a new FAQ
app.post('/api/faqs', (req, res) => {
  try {
    const faqs = readFAQs();
    const newFaq = {
      id: Date.now(),
      question: req.body.question,
      answer: req.body.answer,
      fruit: req.body.fruit
    };
    faqs.push(newFaq);
    writeFAQs(faqs);
    res.status(201).json(newFaq);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create FAQ.' });
  }
});

// PUT (update) an existing FAQ
app.put('/api/faqs/:id', (req, res) => {
  try {
    const faqs = readFAQs();
    const faqId = parseInt(req.params.id);
    const index = faqs.findIndex((faq) => faq.id === faqId);
    if (index !== -1) {
      faqs[index] = { ...faqs[index], ...req.body };
      writeFAQs(faqs);
      res.json(faqs[index]);
    } else {
      res.status(404).json({ message: 'FAQ not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update FAQ.' });
  }
});

// DELETE an FAQ
app.delete('/api/faqs/:id', (req, res) => {
  try {
    const faqs = readFAQs();
    const faqId = parseInt(req.params.id);
    const newFaqs = faqs.filter((faq) => faq.id !== faqId);
    if (faqs.length !== newFaqs.length) {
      writeFAQs(newFaqs);
      res.json({ message: 'FAQ deleted' });
    } else {
      res.status(404).json({ message: 'FAQ not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete FAQ.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
