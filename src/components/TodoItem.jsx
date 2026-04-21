import './TodoItem.css'

/**
 * Renders a single todo item with checkbox, priority/category badges, and delete button.
 * Uses React.memo to avoid unnecessary re-renders in lists.
 */
const TodoItem = ({ todo, onToggle, onDelete, getCategoryColor }) => {
  return (
    <li
      className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}
    >
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="checkbox"
          aria-label={`${todo.completed ? 'Uncheck' : 'Check'} task: ${todo.text}`}
        />
        <span
          className={`priority-badge priority-${todo.priority}`}
          aria-label={`Priority: ${todo.priority}`}
        >
          {todo.priority.charAt(0).toUpperCase()}
        </span>
        <span
          className="category-badge"
          style={{ backgroundColor: getCategoryColor(todo.category) }}
          title={todo.category}
          aria-label={`Category: ${todo.category}`}
        >
          {todo.category}
        </span>
        <span className="todo-text">{todo.text}</span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-button"
        aria-label={`Delete task: ${todo.text}`}
      >
        Delete
      </button>
    </li>
  )
}

export default TodoItem
