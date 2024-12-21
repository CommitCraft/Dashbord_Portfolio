// routes/contactRoutes.js
const express = require('express');
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

const router = express.Router();

// GET all contacts
router.get('/', getContacts);

// GET a single contact by ID
router.get('/:id', getContactById);

// POST a new contact
router.post('/', createContact);

// PUT (update) a contact by ID
router.put('/:id', updateContact);

// DELETE a contact by ID
router.delete('/:id', deleteContact);

module.exports = router;
