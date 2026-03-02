import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import Todo from '../models/Todo.js';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// GET /api/todos
router.get('/', (req, res) => {
  try {
    const todos = Todo.findAllByUser(req.userId);
    res.json({ todos });
  } catch (err) {
    console.error('Get todos error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/todos
router.post('/', (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Todo text is required.' });
    }
    const todo = Todo.create(req.userId, text.trim());
    res.status(201).json({ todo });
  } catch (err) {
    console.error('Create todo error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// PUT /api/todos/:id
router.put('/:id', (req, res) => {
  try {
    const todo = Todo.toggleCompleted(parseInt(req.params.id), req.userId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found.' });
    }
    res.json({ todo });
  } catch (err) {
    console.error('Update todo error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// DELETE /api/todos/:id
router.delete('/:id', (req, res) => {
  try {
    const deleted = Todo.delete(parseInt(req.params.id), req.userId);
    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found.' });
    }
    res.json({ message: 'Todo deleted successfully.' });
  } catch (err) {
    console.error('Delete todo error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
