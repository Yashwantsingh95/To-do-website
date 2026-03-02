import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import TodoItem from '../components/TodoItem.jsx';

function Dashboard() {
  const { user, getToken } = useAuth();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');

  const fetchTodos = useCallback(async () => {
    try {
      const res = await fetch('/api/todos', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (res.ok) {
        setTodos(data.todos);
      } else {
        setError(data.error || 'Failed to load todos.');
      }
    } catch {
      setError('Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setAdding(true);
    setError('');
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ text: newTodo.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setTodos([data.todo, ...todos]);
        setNewTodo('');
      } else {
        setError(data.error || 'Failed to add todo.');
      }
    } catch {
      setError('Unable to connect to the server.');
    } finally {
      setAdding(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (res.ok) {
        setTodos(todos.map((t) => (t.id === id ? data.todo : t)));
      } else {
        setError(data.error || 'Failed to update todo.');
      }
    } catch {
      setError('Unable to connect to the server.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        setTodos(todos.filter((t) => t.id !== id));
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to delete todo.');
      }
    } catch {
      setError('Unable to connect to the server.');
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Tasks
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back, <span className="font-medium text-indigo-600">{user?.name}</span>!
          {todos.length > 0 && (
            <span className="ml-2">
              {completedCount} of {todos.length} completed
            </span>
          )}
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => setError('')}
            className="ml-2 text-red-400 hover:text-red-600"
            aria-label="Dismiss error"
          >
            ✕
          </button>
        </div>
      )}

      {/* Add todo form */}
      <form onSubmit={handleAdd} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task…"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-colors"
            disabled={adding}
          />
          <button
            type="submit"
            disabled={adding || !newTodo.trim()}
            className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {adding ? (
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              '+ Add'
            )}
          </button>
        </div>
      </form>

      {/* Todo list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : todos.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-gray-500 text-lg font-medium">No tasks yet!</p>
          <p className="text-gray-400 text-sm mt-1">Add your first to-do above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
