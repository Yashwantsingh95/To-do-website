import db from '../db/database.js';

const Todo = {
  create(userId, text) {
    const stmt = db.prepare('INSERT INTO todos (user_id, text) VALUES (?, ?)');
    const result = stmt.run(userId, text);
    return db.prepare('SELECT * FROM todos WHERE id = ?').get(result.lastInsertRowid);
  },

  findAllByUser(userId) {
    return db
      .prepare('SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC')
      .all(userId);
  },

  findById(id) {
    return db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
  },

  toggleCompleted(id, userId) {
    const todo = db.prepare('SELECT * FROM todos WHERE id = ? AND user_id = ?').get(id, userId);
    if (!todo) return null;
    const newStatus = todo.completed ? 0 : 1;
    db.prepare('UPDATE todos SET completed = ? WHERE id = ? AND user_id = ?').run(newStatus, id, userId);
    return db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
  },

  delete(id, userId) {
    const result = db.prepare('DELETE FROM todos WHERE id = ? AND user_id = ?').run(id, userId);
    return result.changes > 0;
  },
};

export default Todo;
