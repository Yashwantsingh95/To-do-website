# TodoApp — Full-Stack To-Do Website

A production-ready full-stack to-do web application with JWT authentication, per-user task management, and a modern responsive UI.

## Screenshots

> _Add screenshots here after running the app locally._

---

## Tech Stack

| Layer      | Technology                      |
|------------|---------------------------------|
| Frontend   | React 18 + Vite + Tailwind CSS  |
| Backend    | Node.js + Express.js            |
| Database   | SQLite (`better-sqlite3`)       |
| Auth       | JWT + bcryptjs                  |
| Routing    | React Router v6                 |

---

## Project Structure

```
├── backend/
│   ├── package.json
│   ├── server.js                # Express server entry point
│   ├── .env.example             # Example environment variables
│   ├── db/
│   │   └── database.js          # SQLite database setup & initialization
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js              # Login & Signup routes
│   │   └── todos.js             # CRUD routes for to-dos
│   └── models/
│       ├── User.js              # User model
│       └── Todo.js              # Todo model
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx             # React entry point
│       ├── App.jsx              # Main app with routing
│       ├── index.css            # Tailwind CSS imports
│       ├── context/
│       │   └── AuthContext.jsx  # Auth context for managing user state
│       ├── components/
│       │   ├── Navbar.jsx       # Navigation bar with logout
│       │   ├── ProtectedRoute.jsx
│       │   └── TodoItem.jsx     # Individual to-do item component
│       └── pages/
│           ├── Login.jsx
│           ├── Signup.jsx
│           └── Dashboard.jsx
└── README.md
```

---

## Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

---

## Setup & Running

### 1. Backend

```bash
cd backend

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env and set a strong JWT_SECRET

# Start the development server
npm run dev
```

The backend will start at **http://localhost:5000**.

### 2. Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start at **http://localhost:5173**.

> The Vite dev server is configured to proxy `/api` requests to `http://localhost:5000`, so no CORS issues during development.

### 3. Build for Production

```bash
cd frontend
npm run build
# Serve the dist/ folder with any static file server
```

---

## Environment Variables

Create a `.env` file inside the `backend/` folder:

| Variable       | Description                        | Default                     |
|----------------|------------------------------------|-----------------------------|
| `PORT`         | Port the Express server listens on | `5000`                      |
| `JWT_SECRET`   | Secret key for signing JWT tokens  | _(required — set a strong value)_ |
| `FRONTEND_URL` | Allowed CORS origin                | `http://localhost:5173`     |

---

## API Documentation

### Auth

| Method | Endpoint            | Auth | Description               |
|--------|---------------------|------|---------------------------|
| POST   | `/api/auth/signup`  | No   | Register a new user       |
| POST   | `/api/auth/login`   | No   | Login and receive a JWT   |
| GET    | `/api/auth/me`      | Yes  | Get current user info     |

**POST `/api/auth/signup`**
```json
// Request body
{ "name": "Jane Doe", "email": "jane@example.com", "password": "secret123" }

// Response 201
{ "message": "Account created successfully.", "user": { "id": 1, "name": "Jane Doe", "email": "jane@example.com" } }
```

**POST `/api/auth/login`**
```json
// Request body
{ "email": "jane@example.com", "password": "secret123" }

// Response 200
{ "token": "<jwt>", "user": { "id": 1, "name": "Jane Doe", "email": "jane@example.com" } }
```

### Todos (all require `Authorization: Bearer <token>`)

| Method | Endpoint           | Description                       |
|--------|--------------------|-----------------------------------|
| GET    | `/api/todos`       | Get all todos for logged-in user  |
| POST   | `/api/todos`       | Create a new todo                 |
| PUT    | `/api/todos/:id`   | Toggle todo completion            |
| DELETE | `/api/todos/:id`   | Delete a todo                     |

---

## Database Schema

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## Features

- 🔐 **JWT Authentication** — secure signup & login with bcrypt password hashing
- ✅ **Per-user Todos** — each user sees only their own tasks
- 📱 **Responsive Design** — works great on mobile and desktop
- ⚡ **Real-time Updates** — UI updates instantly on add/toggle/delete
- 🎨 **Modern UI** — Tailwind CSS with indigo color scheme, smooth transitions
- 🔒 **Protected Routes** — dashboard redirects to login if not authenticated
- 💬 **Error & Loading States** — inline messages, skeleton loaders, spinners
