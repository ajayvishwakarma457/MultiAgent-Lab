import { useState, useEffect, useMemo } from 'react'
import TodoItem from './components/TodoItem'
import Statistics from './components/Statistics'
import './App.css'

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }
const DEFAULT_PRIORITY = 'medium'
const DEFAULT_CATEGORY = 'work'
const CATEGORY_COLORS = {
  work: '#667eea',
  personal: '#ff6b9d',
  shopping: '#ffa502',
  health: '#26de81',
  learning: '#a55eea',
  home: '#fc5a8d',
  urgent: '#ff6b6b',
}

export default function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')
  const [darkMode, setDarkMode] = useState(false)
  const [priority, setPriority] = useState(DEFAULT_PRIORITY)
  const [category, setCategory] = useState(DEFAULT_CATEGORY)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      try {
        setTodos(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load todos from localStorage', e)
      }
    }

    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const addTodo = () => {
    const trimmedInput = input.trim()
    const trimmedCategory = category.trim() || DEFAULT_CATEGORY

    if (trimmedInput && trimmedInput.length <= 500) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: trimmedInput,
          completed: false,
          priority,
          category: trimmedCategory,
        },
      ])
      setInput('')
      setPriority(DEFAULT_PRIORITY)
      setCategory(DEFAULT_CATEGORY)
    }
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    if (
      window.confirm(
        `Delete ${completedCount} completed todo${completedCount !== 1 ? 's' : ''}?`
      )
    ) {
      setTodos(todos.filter((todo) => !todo.completed))
    }
  }

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos]
  )
  const totalCount = todos.length

  const allCategories = useMemo(
    () => [...new Set(todos.map((todo) => todo.category))],
    [todos]
  )

  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true
      })
      .filter((todo) => {
        if (categoryFilter === 'all') return true
        return todo.category === categoryFilter
      })
      .filter((todo) => {
        if (!searchTerm.trim()) return true
        return todo.text.toLowerCase().includes(searchTerm.toLowerCase())
      })
      .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
  }, [todos, filter, categoryFilter, searchTerm])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTodo()
    }
  }

  const getCategoryColor = (cat) => {
    return CATEGORY_COLORS[cat] || '#888888'
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="container">
        <div className="header">
          <h1>My Todos</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="dark-mode-toggle"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new todo..."
            className="input-field"
            maxLength={500}
            aria-label="Todo text"
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category..."
            className="category-input"
            maxLength={30}
            aria-label="Todo category"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
            aria-label="Todo priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={addTodo}
            className="add-button"
            aria-label="Add new todo"
          >
            Add
          </button>
        </div>

        <Statistics totalCount={totalCount} completedCount={completedCount} />

        <div className="search-section">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Search todos..."
            className="search-field"
            aria-label="Search todos"
          />
        </div>

        <div className="stats" aria-live="polite" aria-atomic="true">
          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="clear-button"
              aria-label={`Clear ${completedCount} completed todo${completedCount !== 1 ? 's' : ''}`}
            >
              Clear Completed
            </button>
          )}
        </div>

        <div className="filter-section">
          <div className="status-filters">
            <label className="filter-label">Status:</label>
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
              aria-pressed={filter === 'all'}
              aria-label="Show all todos"
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
              aria-pressed={filter === 'active'}
              aria-label="Show active todos"
            >
              Active
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
              aria-pressed={filter === 'completed'}
              aria-label="Show completed todos"
            >
              Completed
            </button>
          </div>

          {allCategories.length > 0 && (
            <div className="category-filters">
              <label className="filter-label">Category:</label>
              <button
                className={`filter-btn ${categoryFilter === 'all' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('all')}
                aria-pressed={categoryFilter === 'all'}
                aria-label="Show todos from all categories"
              >
                All Categories
              </button>
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn category-filter-btn ${categoryFilter === cat ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(cat)}
                  aria-pressed={categoryFilter === cat}
                  aria-label={`Show ${cat} todos`}
                  style={{
                    borderBottom:
                      categoryFilter === cat
                        ? `3px solid ${getCategoryColor(cat)}`
                        : 'none',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <ul className="todos-list">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="empty-message">No todos yet. Add one to get started!</p>
        )}
        {todos.length > 0 && filteredTodos.length === 0 && (
          <p className="empty-message">
            No {filter} {categoryFilter !== 'all' ? `${categoryFilter} ` : ''}
            todos.
          </p>
        )}
      </div>
    </div>
  )
}
