import db from '../db/database.js';

const User = {
  create(name, email, hashedPassword) {
    const stmt = db.prepare(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
    );
    const result = stmt.run(name, email, hashedPassword);
    return { id: result.lastInsertRowid, name, email };
  },

  findByEmail(email) {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  },

  findById(id) {
    return db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?').get(id);
  },
};

export default User;
