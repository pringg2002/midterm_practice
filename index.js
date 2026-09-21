const express = require('express');
const router = express.Router();

// Mock Data Collection
let products = [
  { id: 1, name: 'Alice', quantity: '24' },
  { id: 2, name: 'Bob', quantity: 'user30' }
];

router.get('/', (req, res) => {
  let result = products;
  if (req.query.quantity) {
    result = result.filter(u => u.quantity === req.query.quantity);
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
  const { name, quantity } = req.body;
  if (!name || !quantity) {
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
  const index = quantity.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Resource not found.' }
    });
  }
  quantity.splice(index, 1);
  res.status(204).send();
});

module.exports = router;