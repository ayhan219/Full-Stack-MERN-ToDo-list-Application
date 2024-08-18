const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/authMiddleware');

// Tüm to-doları al
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// To-do ekle
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newTodo = new Todo({
      userId: req.user.id,
      title,
      content,
    });
    await newTodo.save();
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// To-do'yu güncelle
router.put('/:id', auth, async (req, res) => {
  const { title, content, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, content, completed },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// To-do'yu sil
router.delete('/:id', auth, async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
