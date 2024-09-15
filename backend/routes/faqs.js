const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const router = express.Router();

// Setup multer for file upload handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Path to the FAQs data file
const dataFilePath = path.join(__dirname, '..', 'data', 'faqs.json');

// Helper function to read FAQs
const readFAQs = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

// Helper function to write FAQs
const writeFAQs = (faqs) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(faqs, null, 2));
};

// GET all FAQs
router.get('/', (req, res) => {
  const faqs = readFAQs();
  res.json(faqs);
});

// POST a new FAQ
router.post('/', upload.single('image'), (req, res) => {
  const faqs = readFAQs();
  const newFaq = {
    id: Date.now(),
    question: req.body.question,
    answer: req.body.answer,
    fruit: req.body.fruit,
    imageUrl: req.file ? `/uploads/${req.file.filename}` : null
  };
  faqs.push(newFaq);
  writeFAQs(faqs);
  res.status(201).json(newFaq);
});

// PUT (update) an existing FAQ
router.put('/:id', upload.single('image'), (req, res) => {
  const faqs = readFAQs();
  const faqId = parseInt(req.params.id);
  const index = faqs.findIndex((faq) => faq.id === faqId);
  if (index !== -1) {
    const updatedFaq = {
      ...faqs[index],
      ...req.body,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : faqs[index].imageUrl
    };
    faqs[index] = updatedFaq;
    writeFAQs(faqs);
    res.json(updatedFaq);
  } else {
    res.status(404).json({ message: 'FAQ not found' });
  }
});

// DELETE an FAQ
router.delete('/:id', (req, res) => {
  const faqs = readFAQs();
  const faqId = parseInt(req.params.id);
  const newFaqs = faqs.filter((faq) => faq.id !== faqId);
  if (faqs.length !== newFaqs.length) {
    writeFAQs(newFaqs);
    res.json({ message: 'FAQ deleted' });
  } else {
    res.status(404).json({ message: 'FAQ not found' });
  }
});

module.exports = router;
