function TodoItem({ todo, onToggle, onDelete }) {
  const formattedDate = new Date(todo.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      <input
        type="checkbox"
        checked={!!todo.completed}
        onChange={() => onToggle(todo.id)}
        className="mt-1 w-4 h-4 cursor-pointer accent-indigo-600 flex-shrink-0"
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm sm:text-base break-words ${
            todo.completed
              ? 'line-through text-gray-400'
              : 'text-gray-800'
          }`}
        >
          {todo.text}
        </p>
        <p className="text-xs text-gray-400 mt-1">{formattedDate}</p>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors p-1 rounded opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label={`Delete "${todo.text}"`}
        title="Delete"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}

export default TodoItem;
