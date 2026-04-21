---
name: "React Patterns"
description: "Enterprise-grade React patterns, best practices, and anti-patterns with code examples"
---

# Enterprise React Patterns & Best Practices

Professional React patterns for MultiAgent-Lab. Emphasizes functional components, hooks, composition, and performance.

---

## ⚛️ Hooks Patterns

### Pattern-001: Rules of Hooks (Non-Negotiable)

**The Rules:**
1. Call hooks at **top level only** (not in loops, conditions, nested functions)
2. Call hooks from **functional components or custom hooks** only
3. **Dependencies array** must include all values used in the hook

#### ✅ Correct: Hooks at Top Level

```javascript
export const TodoForm = ({ onSubmit }) => {
  // ✅ All hooks at top level
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Side effect logic
  }, [onSubmit]);
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // Submit logic
  }, [text, onSubmit]);
  
  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
};
```

#### ❌ Wrong: Hooks Not at Top Level

```javascript
// ❌ Hook in conditional
export const TodoForm = ({ shouldUseForm }) => {
  if (shouldUseForm) {
    const [text, setText] = useState(''); // Error: Conditional hook
  }
  return null;
};

// ❌ Hook in loop
export const TodoList = ({ todos }) => {
  todos.forEach((todo) => {
    const [isEditing, setIsEditing] = useState(false); // Error: Hook in loop
  });
  return null;
};

// ❌ Hook in nested function
export const TodoForm = () => {
  const handleClick = () => {
    const [text, setText] = useState(''); // Error: Hook in nested function
  };
  return <button onClick={handleClick}>Click</button>;
};
```

**Why This Matters:**
React relies on hook call order to match state to closures. Conditional/loop hooks break this mapping, causing:
- Wrong state assigned to wrong hook
- Stale closures
- Memory leaks
- Crashes

---

### Pattern-002: useState for Local Component State

**When to Use:**
- Local UI state (form inputs, toggles, visibility)
- Component-specific data (not shared widely)

**Best Practices:**

```javascript
// ✅ Good: Separate, related state
export const TodoForm = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  return (
    <form>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>low</option>
        <option>medium</option>
        <option>high</option>
      </select>
    </form>
  );
};

// ✅ Good: Default values in useState
const [count, setCount] = useState(0);
const [user, setUser] = useState(null);
const [isOpen, setIsOpen] = useState(false);

// ❌ Bad: Over-combining state
const [formState, setFormState] = useState({
  text: '',
  priority: 'medium',
  isSubmitting: false
});
// Now all updates require spreading: setFormState({...formState, text: 'new'})

// ❌ Bad: Derived state (calculate instead)
const [user, setUser] = useState(userData);
const [isAdult, setIsAdult] = useState(user.age >= 18); // Derived! Don't store.
// Better: const isAdult = user && user.age >= 18; // Calculate when needed
```

**Functional Updates (when new state depends on old state):**

```javascript
// ✅ Good: Functional update (closure-safe)
const [count, setCount] = useState(0);
setCount((prevCount) => prevCount + 1); // Always uses latest state

// ❌ Problem: Direct update might use stale state
setCount(count + 1); // In async code, count might be stale
```

---

### Pattern-003: useEffect for Side Effects

**Rules:**
1. Effect runs **after render** (not before)
2. **Dependencies array** controls when effect re-runs
3. **Cleanup function** optional (return from effect)

#### Dependency Array Patterns

```javascript
// ✅ Pattern 1: Run once on mount (data fetching)
useEffect(() => {
  fetchUserData();
}, []); // Empty array: runs ONCE after initial render

// ✅ Pattern 2: Run when dependency changes
useEffect(() => {
  fetchTodos(userId);
}, [userId]); // Re-runs when userId changes

// ✅ Pattern 3: Cleanup side effects
useEffect(() => {
  const handler = (e) => console.log(e);
  window.addEventListener('scroll', handler);
  
  return () => {
    // ✅ Cleanup: remove listener when component unmounts
    window.removeEventListener('scroll', handler);
  };
}, []);

// ❌ Wrong: Missing dependencies (stale closure)
const userId = 123;
useEffect(() => {
  fetchTodos(userId); // ESLint warns: userId not in dependencies
}, []); // If userId changes, effect doesn't re-run (stale userId)

// ✅ Fix: Include in dependencies
useEffect(() => {
  fetchTodos(userId);
}, [userId]); // Now re-runs when userId changes
```

#### Common Patterns

**Data Fetching:**
```javascript
export const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    
    // Fetch data
    fetchUser(userId)
      .then((data) => {
        setUser(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [userId]); // Re-fetch when userId changes
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{user.name}</div>;
};
```

**Event Listener with Cleanup:**
```javascript
useEffect(() => {
  const handleResize = () => {
    console.log('Window resized');
  };
  
  window.addEventListener('resize', handleResize);
  
  // Cleanup: prevent memory leak
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

**Timer with Cleanup:**
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    setCount((c) => c + 1);
  }, 1000);
  
  return () => clearInterval(timer); // Stop timer on unmount
}, []);
```

---

### Pattern-004: useCallback for Event Handlers

**When to Use:**
- Handlers passed as props to memoized children
- Expensive computations triggered by handler
- Dependencies of other effects

**Why It Matters:**
```javascript
// ❌ Problem: New function every render
export const TodoList = ({ todos }) => {
  const handleDelete = (id) => {
    // Delete logic
  };
  
  return todos.map((todo) => (
    <TodoItem 
      key={todo.id} 
      todo={todo} 
      onDelete={handleDelete} // New function every render!
    />
  ));
};

// Component re-renders → new handleDelete → TodoItem re-renders (even if todo unchanged)

// ✅ Solution: useCallback memoizes function
export const TodoList = ({ todos }) => {
  const handleDelete = useCallback((id) => {
    // Delete logic
  }, []); // Dependencies of this function
  
  return todos.map((todo) => (
    <TodoItem 
      key={todo.id} 
      todo={todo} 
      onDelete={handleDelete} // Same function reference
    />
  ));
};

// If TodoItem is memoized: re-render avoided when props unchanged
```

**Correct Usage:**
```javascript
// ✅ Good: useCallback with correct dependencies
const handleSubmit = useCallback((formData) => {
  submitForm(formData, userId); // Uses userId
}, [userId]); // Include userId in dependencies

// ❌ Bad: Missing dependencies
const handleSubmit = useCallback((formData) => {
  submitForm(formData, userId); // ESLint warns
}, []); // Should include [userId]
```

---

### Pattern-005: useMemo for Expensive Computations

**When to Use:**
- Expensive calculations (filtering large lists, sorting)
- Objects/arrays that trigger child re-renders when changed

**Be Careful:**
useMemo adds overhead. Only use if:
1. Computation is slow (measure with React DevTools Profiler)
2. Value is used in useEffect dependencies
3. Preventing unnecessary child re-renders

```javascript
// ❌ Over-using useMemo (premature optimization)
export const UserProfile = ({ user }) => {
  // Don't memoize simple operations
  const firstName = useMemo(() => user.name.split(' ')[0], [user.name]);
  
  return <div>{firstName}</div>;
};

// ✅ Correct: Memoize expensive computation
export const TodoList = ({ todos, filter }) => {
  const filteredTodos = useMemo(() => {
    // Expensive operation: O(n) filtering and sorting
    return todos
      .filter((t) => t.status === filter)
      .sort((a, b) => b.priority - a.priority);
  }, [todos, filter]); // Re-compute when dependencies change
  
  return <div>{filteredTodos.map((t) => <TodoItem key={t.id} todo={t} />)}</div>;
};

// ✅ Correct: Memoize objects in useEffect dependencies
export const UserForm = ({ userId }) => {
  const user = useMemo(() => ({ id: userId }), [userId]);
  
  useEffect(() => {
    // Effect uses user object
    console.log('User changed:', user);
  }, [user]); // Without useMemo, effect runs every render
};
```

---

### Pattern-006: Custom Hooks for Reusable Logic

**Pattern:**
Extract stateful logic into custom hooks (prefixed with "use").

```javascript
// ✅ Custom hook: useLocalStorage
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });
  
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setValue];
};

// Usage in component
export const TodoApp = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  
  return <div>{/* Use todos */}</div>;
};

// ✅ Custom hook: useFetch
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true; // Prevent state update on unmounted component
    
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (isMounted) setData(data);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    
    return () => {
      isMounted = false; // Cleanup: mark as unmounted
    };
  }, [url]);
  
  return { data, loading, error };
};

// Usage
export const UserProfile = ({ userId }) => {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{user.name}</div>;
};
```

---

## 🧩 Component Patterns

### Pattern-007: Functional Components with Props Destructuring

```javascript
// ✅ Good: Props destructured in signature
export const TodoItem = ({ 
  todo, 
  onDelete, 
  onUpdate, 
  isDragging = false 
}) => {
  return (
    <div className={isDragging ? 'dragging' : ''}>
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

// ✅ Good: Default values in destructuring
export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  children 
}) => {
  return (
    <button className={`btn btn-${variant} btn-${size}`} disabled={disabled}>
      {children}
    </button>
  );
};

// ❌ Bad: Using props object directly
export const TodoItem = (props) => {
  return <div>{props.todo.text}</div>;
};

// ❌ Bad: All props at once (unclear what component needs)
export const TodoItem = (props) => {
  const { todo, onDelete } = props;
  return <div>{todo.text}</div>;
};
```

### Pattern-008: React.memo to Prevent Unnecessary Re-renders

```javascript
// ✅ Memoize list items
export const TodoItem = React.memo(({ todo, onDelete }) => {
  return (
    <div className="todo-item">
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
});

// ✅ Memoize with custom comparison
export const UserCard = React.memo(
  ({ user, onUpdate }) => {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.user.id === nextProps.user.id;
  }
);

// ✅ Best pattern: useCallback for event handlers + React.memo
export const TodoList = ({ todos, onDeleteTodo }) => {
  const handleDelete = useCallback((id) => {
    onDeleteTodo(id);
  }, [onDeleteTodo]);
  
  return todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
  ));
};

export const TodoItem = React.memo(({ todo, onDelete }) => {
  return <div>{todo.text}</div>;
});

// When parent re-renders: TodoItem doesn't re-render (props unchanged)
```

### Pattern-009: Error Boundaries

**Error boundaries catch errors in child components.**

```javascript
// ✅ Error boundary component
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log to error reporting service
    console.error('Error caught:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <TodoApp />
</ErrorBoundary>
```

### Pattern-010: Suspense for Code Splitting

```javascript
import { Suspense, lazy } from 'react';

// Lazy-load component (loaded on demand)
const TodoList = lazy(() => import('./TodoList'));
const UserProfile = lazy(() => import('./UserProfile'));

// ✅ Suspense shows fallback while loading
export const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoList />
      </Suspense>
      
      <Suspense fallback={<div>Loading profile...</div>}>
        <UserProfile />
      </Suspense>
    </div>
  );
};

// Benefits:
// - TodoList and UserProfile only loaded when needed
// - Smaller main bundle
// - Better initial load time
```

---

## 🔄 State Management Patterns

### Pattern-011: Choosing State Location

**Decision Tree:**
```
Local to component?
  ├─ Yes → useState (inside component)
  ├─ Shared by multiple components (siblings/distant)?
  │   ├─ Used frequently → Context API
  │   ├─ Complex logic → Custom hook
  │   └─ App-wide → Context + useReducer
  └─ Complex updates?
      ├─ Yes → useReducer
      └─ No → useState
```

### Pattern-012: useContext for Global State

```javascript
// ✅ Create context
const UserContext = createContext(null);

// ✅ Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const value = useMemo(() => ({ user, setUser }), [user]);
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Custom hook to access context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

// ✅ Usage
export const UserProfile = () => {
  const { user, setUser } = useUser();
  return <div>{user?.name}</div>;
};

// ⚠️ Performance consideration: Context value changes → all consumers re-render
// Solution: Split contexts (static + dynamic) or use useMemo
```

### Pattern-013: useReducer for Complex State

```javascript
// ✅ Reducer function (pure function)
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload }];
    
    case 'DELETE_TODO':
      return state.filter((t) => t.id !== action.payload);
    
    case 'UPDATE_TODO':
      return state.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
    
    default:
      return state;
  }
};

// ✅ Component using useReducer
export const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  
  return (
    <div>
      <button 
        onClick={() => dispatch({ type: 'ADD_TODO', payload: 'New todo' })}
      >
        Add Todo
      </button>
    </div>
  );
};

// When to use useReducer:
// - Multiple related state variables
// - Complex update logic
// - Easier testing (pure function)
```

---

## 📊 Performance Patterns

### Pattern-014: Code Splitting with React.lazy

```javascript
// ✅ Lazy-load heavy components
const Modal = lazy(() => import('./Modal'));
const Editor = lazy(() => import('./Editor'));

// Large components loaded on-demand (not in main bundle)
```

### Pattern-015: Virtualization for Long Lists

```javascript
import { FixedSizeList } from 'react-window';

// ✅ Render only visible items (huge performance boost)
export const TodoList = ({ todos }) => {
  const Row = ({ index, style }) => (
    <div style={style}>{todos[index].text}</div>
  );
  
  return (
    <FixedSizeList
      height={600}
      itemCount={todos.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
};

// Rendering 10,000 items:
// Without virtualization: Renders all 10,000 (slow)
// With virtualization: Renders ~20 visible items (fast)
```

---

## 🎯 Composition Patterns

### Pattern-016: Composition Over Props Drilling

```javascript
// ❌ Props drilling: props passed through many levels
const App = ({ user }) => <Header user={user} />;
const Header = ({ user }) => <Nav user={user} />;
const Nav = ({ user }) => <UserMenu user={user} />;
const UserMenu = ({ user }) => <span>{user.name}</span>;

// ✅ Composition: pass components as children
const App = () => (
  <Header>
    <Nav>
      <UserMenu />
    </Nav>
  </Header>
);

// ✅ Context: when props used in many places
<UserProvider>
  <App />
</UserProvider>
```

### Pattern-017: Render Props Pattern (Advanced)

```javascript
// ✅ Render props: pass function as prop
export const MouseTracker = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  
  return (
    <div onMouseMove={handleMouseMove}>
      {children(position)} {/* Pass state to child function */}
    </div>
  );
};

// Usage
<MouseTracker>
  {(position) => <div>Mouse at {position.x}, {position.y}</div>}
</MouseTracker>
```

---

## 🚫 Anti-Patterns & Common Mistakes

### ❌ Anti-Pattern 1: Derived State
```javascript
// ❌ Wrong: storing derived state
const [user, setUser] = useState(userData);
const [isAdult, setIsAdult] = useState(user.age >= 18); // Derived!

// ✅ Correct: calculate when needed
const isAdult = user && user.age >= 18;
```

### ❌ Anti-Pattern 2: State Update in Render
```javascript
// ❌ Infinite loop
export const Component = () => {
  const [count, setCount] = useState(0);
  setCount(count + 1); // Calls on every render!
  return <div>{count}</div>;
};

// ✅ Use useEffect
useEffect(() => {
  setCount(count + 1);
}, []);
```

### ❌ Anti-Pattern 3: Missing Dependency Arrays
```javascript
// ❌ Effect runs on every render
useEffect(() => {
  fetchData();
}); // No dependency array!

// ✅ Fix: add dependency array
useEffect(() => {
  fetchData();
}, []); // Runs once on mount
```

### ❌ Anti-Pattern 4: Unnecessary re-renders
```javascript
// ❌ Object created every render
<Component options={{ a: 1, b: 2 }} />

// ✅ Memoize object
const OPTIONS = { a: 1, b: 2 };
<Component options={OPTIONS} />
```

---

## 📋 Quick Checklist

- [ ] Hooks called at top level only
- [ ] useEffect dependencies correct
- [ ] Cleanup functions for side effects (listeners, timers)
- [ ] Event handlers wrapped in useCallback (if passed as props)
- [ ] Lists have stable keys (not array index)
- [ ] No inline functions in JSX (define outside)
- [ ] Props destructured in function signature
- [ ] Memoization used where beneficial (not premature)
- [ ] Error boundaries wrap risky components
- [ ] Suspense for code-split components

---

## Related Documentation

- **code-style.md**: React code style standards
- **patterns.md**: Design patterns (includes React-specific patterns)
- **decisions.md**: ADR-002 (Functional Components with Hooks)
- **learnings.md**: Lessons from applying patterns
