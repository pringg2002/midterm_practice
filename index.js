const express = require('express');
const router = express.Router();

// Mock Data Collection
let users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' }
];

// 1. GET /api/<resource> (With Query Filtering)
router.get('/', (req, res) => {
  let result = users;
  if (req.query.role) {
    result = result.filter(u => u.role === req.query.role);
  }
  res.status(200).json({
    success: true,
    data: result,
    meta: {
      timestamp: new Date().toISOString(),
      count: result.length
    }
  });
});

// 2. GET /api/<resource>/:id (By Route Parameter)
router.get('/:id', (req, res) => {
  const item = users.find(u => u.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Resource not found.' }
    });
  }
  res.status(200).json({
    success: true,
    data: item,
    meta: { timestamp: new Date().toISOString(), count: 1 }
  });
});

// 3. POST /api/<resource> (Create New Item)
router.post('/', (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) {
    return res.status(400).json({
      success: false,
      error: { code: 'BAD_REQUEST', message: 'Missing mandatory fields.' }
    });
  }
  const newItem = { id: Date.now(), name, role };
  users.push(newItem);
  res.status(201).json({
    success: true,
    data: newItem,
    meta: { timestamp: new Date().toISOString(), count: 1 }
  });
});

// 4. DELETE /api/<resource>/:id (Remove Item)
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Resource not found.' }
    });
  }
  users.splice(index, 1);
  res.status(204).send();
});

module.exports = router;