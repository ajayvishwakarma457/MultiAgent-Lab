# Design & Architectural Patterns

Enterprise pattern library documenting proven design patterns, best practices, and anti-patterns for MultiAgent-Lab.

**Pattern Categories:**
- 🎯 **Architectural**: System-level organization
- ⚛️ **React**: Component and state patterns
- 🧪 **Testing**: Testing strategies and approaches
- 🎨 **CSS**: Styling and theming patterns
- 📦 **Code Organization**: File and folder structure

---

## 🎯 Architectural Patterns

### Pattern-001: Component-Driven Architecture

**Category:** Architectural  
**Status:** 🟢 Established  
**Used in:** All component development  
**Related ADR:** ADR-002 (Functional Components)

#### Problem
How should we organize React applications for scalability, maintainability, and team collaboration?

#### Solution
Organize around independent, reusable components with clear responsibilities and interfaces.

#### Implementation

**File Structure:**
```
src/
├── components/
│   ├── TodoItem/
│   │   ├── TodoItem.jsx
│   │   ├── TodoItem.css
│   │   ├── TodoItem.test.js
│   │   └── hooks/
│   │       └── useTodoItem.js
│   ├── TodoList/
│   │   ├── TodoList.jsx
│   │   ├── TodoList.css
│   │   ├── TodoList.test.js
│   │   └── index.js (optional re-export)
│   └── common/
│       ├── Button.jsx
│       ├── Button.css
│       ├── Modal.jsx
│       └── Modal.css
├── hooks/
│   ├── useLocalStorage.js
│   ├── usePrevious.js
│   └── useFetch.js
├── utils/
│   ├── dateFormatter.js
│   ├── validators.js
│   └── api.js
├── styles/
│   ├── global.css
│   ├── variables.css
│   └── animations.css
└── App.jsx
```

**Component File Naming:**
```
✅ Good
- TodoItem.jsx (component)
- TodoItem.test.js (tests)
- TodoItem.css (styles)
- useTodoItem.js (custom hook)

❌ Bad
- todo-item.jsx (kebab-case)
- test.js (no context)
- styles.css (no context)
- hook.js (no context)
```

#### Code Example

```javascript
// ✅ Correct: One component per file
// src/components/TodoItem.jsx
export const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="todo-item">
      {isEditing ? (
        <EditForm todo={todo} onUpdate={onUpdate} />
      ) : (
        <div className="todo-item__content">
          <span className="todo-item__text">{todo.text}</span>
          <button className="todo-item__delete" onClick={() => onDelete(todo.id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

// ❌ Wrong: Multiple unrelated components in one file
export const TodoItem = () => { /* ... */ };
export const TodoList = () => { /* ... */ };
export const TodoStats = () => { /* ... */ };
```

**Component Size:**
- ✅ Target: 100-200 lines per component
- ⚠️ Warning: 200-300 lines (consider splitting)
- ❌ Error: 300+ lines (must split)

#### When to Use
- ✅ Building reusable UI elements
- ✅ Organizing complex UIs into smaller pieces
- ✅ Promoting component reusability
- ✅ Enabling parallel development (teams work on different components)
- ✅ Improving testability (isolated, focused tests)

#### When NOT to Use
- ❌ Over-fragmenting (every function as component creates chaos)
- ❌ Forcing reusability where it doesn't exist
- ❌ Creating wrapper components unnecessarily

#### Pros & Cons
| Aspect | Benefit |
|--------|---------|
| **Reusability** | Components used across application |
| **Maintainability** | Clear responsibilities; easy to find code |
| **Testability** | Components tested in isolation |
| **Scalability** | Easy to add features without major refactoring |
| **Parallel Dev** | Teams work independently on components |
| **Complexity** | May feel over-engineered for simple apps |
| **Boilerplate** | More files to manage |

#### Performance Implications
- ✅ Easier to code-split (lazy-load components)
- ✅ React.memo prevents unnecessary re-renders
- ⚠️ More components = more instances in memory

#### Testing Strategy
```javascript
// Test component in isolation
describe('TodoItem', () => {
  test('renders todo text', () => {
    const { getByText } = render(
      <TodoItem todo={{ id: 1, text: 'Learn React' }} />
    );
    expect(getByText('Learn React')).toBeInTheDocument();
  });
  
  test('calls onDelete when delete button clicked', () => {
    const onDelete = jest.fn();
    const { getByRole } = render(
      <TodoItem todo={{ id: 1, text: 'Learn' }} onDelete={onDelete} />
    );
    fireEvent.click(getByRole('button'));
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
```

#### Related Patterns
- Pattern-002: Container/Presentational Components
- Pattern-005: Composition over Inheritance

---

## ⚛️ React Patterns

### Pattern-002: Custom Hooks for Logic Extraction

**Category:** React  
**Status:** 🟢 Established  
**Used in:** State-heavy components  
**Related ADR:** ADR-002 (Functional Components)

#### Problem
Components mixing business logic with UI rendering become hard to test, reuse, and maintain. How do we extract logic?

#### Solution
Extract logic into custom hooks. Hooks encapsulate stateful logic, making it reusable across components.

#### Implementation

**Pattern Structure:**
```javascript
// ✅ Correct: Custom hook for logic extraction
// src/hooks/useTodoForm.js
export const useTodoForm = (initialTodo) => {
  const [todo, setTodo] = useState(initialTodo);
  const [errors, setErrors] = useState({});
  
  const validate = useCallback((data) => {
    const newErrors = {};
    if (!data.text) newErrors.text = 'Required';
    if (data.text.length < 3) newErrors.text = 'Min 3 chars';
    return newErrors;
  }, []);
  
  const update = useCallback((field, value) => {
    setTodo(prev => ({ ...prev, [field]: value }));
  }, []);
  
  const submit = useCallback(() => {
    const newErrors = validate(todo);
    if (Object.keys(newErrors).length === 0) {
      return todo; // Valid
    }
    setErrors(newErrors);
    return null; // Invalid
  }, [todo, validate]);
  
  return { todo, errors, update, submit };
};

// Component using the hook (clean, focused on UI)
const TodoForm = ({ onSubmit }) => {
  const { todo, errors, update, submit } = useTodoForm({ text: '' });
  
  const handleSubmit = () => {
    const result = submit();
    if (result) onSubmit(result);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={todo.text} 
        onChange={(e) => update('text', e.target.value)}
      />
      {errors.text && <span className="error">{errors.text}</span>}
      <button type="submit">Add</button>
    </form>
  );
};

// ❌ Wrong: Logic mixed in component
const TodoForm = () => {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => setText(e.target.value);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!text) newErrors.text = 'Required';
    if (text.length < 3) newErrors.text = 'Min 3 chars';
    
    if (Object.keys(newErrors).length === 0) {
      // submit
    } else {
      setErrors(newErrors);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={handleChange} />
      {errors.text && <span>{errors.text}</span>}
      <button>Add</button>
    </form>
  );
};
```

#### When to Use
- ✅ Logic reused across multiple components
- ✅ Complex state management (multiple related states)
- ✅ Side effects that need cleanup
- ✅ Logic testing in isolation
- ✅ API integration patterns

#### When NOT to Use
- ❌ Single-use hooks (premature abstraction)
- ❌ Trivial state (simple useState is fine)
- ❌ Tightly coupled to one component

#### Pros & Cons
| Aspect | Benefit |
|--------|---------|
| **Reusability** | Logic shared across components |
| **Testability** | Hook logic tested independently |
| **Separation** | Logic separated from UI |
| **Readability** | Components focus on rendering |
| **Complexity** | Adds indirection (need to understand hook) |

#### Testing Strategy
```javascript
// Test hook in isolation (using react-hooks-testing-library)
import { renderHook, act } from '@testing-library/react-hooks';

describe('useTodoForm', () => {
  test('initializes with default todo', () => {
    const { result } = renderHook(() => useTodoForm({ text: 'Learn' }));
    expect(result.current.todo.text).toBe('Learn');
  });
  
  test('validates required field', () => {
    const { result } = renderHook(() => useTodoForm({ text: '' }));
    act(() => {
      result.current.submit();
    });
    expect(result.current.errors.text).toBeTruthy();
  });
});
```

#### Common Mistakes
- ❌ **Over-extracting**: Creating hooks for single-use logic
- ❌ **Ignoring dependencies**: Missing useEffect dependencies
- ❌ **Complex hooks**: Hooks doing too many things
- ❌ **Naming confusion**: Hooks not clearly named

---

### Pattern-003: Composition Over Prop Drilling

**Category:** React  
**Status:** 🟢 Established  
**Used in:** Shared state scenarios  
**Related ADR:** ADR-002 (Functional Components)

#### Problem
Props passed through multiple levels create "prop drilling": `<A prop={x}><B prop={x}><C prop={x} /></B></A>`. Refactoring becomes difficult.

#### Solution
Use composition and React Context to avoid prop drilling.

#### Implementation

**Anti-Pattern: Prop Drilling**
```javascript
// ❌ Props passed through multiple levels
const App = () => {
  const [user, setUser] = useState(null);
  return <Header user={user} />;
};

const Header = ({ user }) => {
  return <NavBar user={user} />;
};

const NavBar = ({ user }) => {
  return <UserMenu user={user} />;
};

const UserMenu = ({ user }) => {
  return <span>{user.name}</span>;
};
```

**Better Pattern: Context**
```javascript
// ✅ Use Context for shared state
const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={user}>
      <Header />
    </UserContext.Provider>
  );
};

const Header = () => <NavBar />;
const NavBar = () => <UserMenu />;

const UserMenu = () => {
  const user = useContext(UserContext);
  return <span>{user?.name}</span>;
};
```

**Best Pattern: Composition**
```javascript
// ✅ Pass components as children (Render Props pattern)
const Header = ({ children }) => (
  <header>
    <nav>{children}</nav>
  </header>
);

const App = () => {
  const [user, setUser] = useState(null);
  
  return (
    <Header>
      {user && <UserMenu user={user} />}
    </Header>
  );
};
```

#### Decision Tree
```
Need shared state?
  ├─ Single component → useState
  ├─ Parent-child only → Props
  ├─ Multiple levels → Context or Composition
  └─ App-wide state → Context (with performance optimization)
```

#### Performance Considerations
- **Context**: Re-renders all consumers when value changes (use useMemo to optimize)
- **Composition**: No performance penalty; most efficient
- **Props**: Small overhead for passing multiple props

---

## 🧪 Testing Patterns

### Pattern-004: Behavior-Driven Testing (Not Implementation Testing)

**Category:** Testing  
**Status:** 🟢 Established  
**Test Framework:** Vitest + React Testing Library

#### Problem
Tests that check implementation details (specific DOM structure, internal state) are brittle. Refactoring breaks tests even if behavior doesn't change.

#### Solution
Test user-visible behavior, not implementation. This makes tests resilient to refactoring.

#### Implementation

**Anti-Pattern: Implementation Testing**
```javascript
// ❌ Tests break on refactor (even if behavior unchanged)
describe('TodoItem', () => {
  test('renders in edit mode', () => {
    const { container } = render(<TodoItem todo={todo} />);
    // Tests implementation: specific div structure
    expect(container.querySelector('.todo-item__edit-form')).toBeInTheDocument();
  });
  
  test('state updates on input change', () => {
    const { result } = renderHook(() => useState(false));
    // Tests internal state (shouldn't know about this)
    expect(result.current[0]).toBe(false);
  });
});
```

**Better Pattern: User-Focused Testing**
```javascript
// ✅ Tests behavior; survives refactoring
describe('TodoItem', () => {
  test('user can enter edit mode', () => {
    const { getByRole } = render(<TodoItem todo={todo} />);
    // Test user action, not implementation
    fireEvent.click(getByRole('button', { name: /edit/i }));
    // Test user-visible outcome
    expect(getByDisplayValue(todo.text)).toBeInTheDocument();
  });
  
  test('user can save edited todo', () => {
    const onUpdate = jest.fn();
    const { getByRole, getByDisplayValue } = render(
      <TodoItem todo={todo} onUpdate={onUpdate} />
    );
    
    fireEvent.click(getByRole('button', { name: /edit/i }));
    fireEvent.change(getByDisplayValue(todo.text), {
      target: { value: 'New text' }
    });
    fireEvent.click(getByRole('button', { name: /save/i }));
    
    expect(onUpdate).toHaveBeenCalledWith({ ...todo, text: 'New text' });
  });
});
```

**Query Priority (use in order):**
```javascript
// 1. getByRole (most accessible, user-visible)
getByRole('button', { name: /submit/i })

// 2. getByLabelText (form inputs)
getByLabelText(/todo text/i)

// 3. getByPlaceholderText
getByPlaceholderText(/enter todo/i)

// 4. getByText
getByText(/welcome/i)

// 5. getByTestId (last resort, implementation detail)
getByTestId('todo-item-delete-btn')
```

#### Testing Checklist
- ✅ Test user workflows (not component internals)
- ✅ Test side effects (API calls, state updates)
- ✅ Test error scenarios
- ✅ Test edge cases (empty, null, large data)
- ✅ Mock external dependencies
- ❌ Don't test library code (React, etc.)
- ❌ Don't test implementation details

---

## 🎨 CSS Patterns

### Pattern-005: BEM Naming Convention with CSS Variables

**Category:** CSS  
**Status:** 🟢 Established  
**Related ADR:** ADR-003 (CSS Only)

#### Problem
CSS naming conflicts and inconsistent organization make stylesheets hard to maintain and extend.

#### Solution
Use BEM (Block Element Modifier) naming convention with CSS Variables for theming.

#### Implementation

**BEM Structure:**
```css
/* Block: standalone component */
.todo-item { }

/* Element: part of block */
.todo-item__text { }
.todo-item__delete-btn { }

/* Modifier: variation of block/element */
.todo-item--completed { }
.todo-item__delete-btn--hover { }
.todo-item__delete-btn--active { }
```

**Complete Example:**
```css
/* Variables */
:root {
  --primary-color: #007bff;
  --danger-color: #dc3545;
  --spacing-sm: 4px;
  --spacing-md: 8px;
  --spacing-lg: 16px;
  --transition-default: 0.3s ease;
}

/* Block: todo-item */
.todo-item {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: 4px;
  background: #fff;
  transition: var(--transition-default);
}

/* Element: text */
.todo-item__text {
  flex: 1;
  font-size: 1rem;
  color: #333;
}

/* Element: delete button */
.todo-item__delete-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--danger-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--transition-default);
}

/* Modifier: completed state */
.todo-item--completed .todo-item__text {
  text-decoration: line-through;
  color: #999;
}

/* Modifier: button hover state */
.todo-item__delete-btn:hover {
  background: darken(var(--danger-color), 10%);
  transform: scale(1.05);
}
```

**Theme Switching with CSS Variables:**
```css
/* Light theme (default) */
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
  --border-color: #e0e0e0;
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1e1e1e;
    --text-primary: #ffffff;
    --border-color: #333333;
  }
}

/* Or via class */
body.dark-theme {
  --bg-primary: #1e1e1e;
  --text-primary: #ffffff;
  --border-color: #333333;
}
```

#### Accessibility Checklist
- ✅ Color contrast ≥4.5:1 (WCAG AA)
- ✅ Focus states visible
- ✅ No color-only information (use icons + text)
- ✅ Respect `prefers-reduced-motion`

---

## 📦 Code Organization Patterns

### Pattern-006: Index Files for Clean Imports

**Category:** Code Organization  
**Status:** 🟢 Established

#### Problem
Long import paths with deep nesting create messy code: `import Button from '../../../components/Button/Button'`

#### Solution
Use `index.js` files to re-export from folder, enabling cleaner imports.

#### Implementation

**Folder Structure:**
```
src/components/
├── Button/
│   ├── Button.jsx
│   ├── Button.css
│   └── index.js      ← Re-export
├── Modal/
│   ├── Modal.jsx
│   ├── Modal.css
│   └── index.js      ← Re-export
└── index.js          ← Export all components
```

**Index File Content:**
```javascript
// src/components/Button/index.js
export { Button } from './Button';

// src/components/index.js (export all)
export { Button } from './Button';
export { Modal } from './Modal';
export { TodoItem } from './TodoItem';
// ... etc
```

**Usage:**
```javascript
// ❌ Before (long paths)
import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';

// ✅ After (clean imports)
import { Button, Modal } from '@/components';
```

**Path Aliases (vite.config.js):**
```javascript
export default {
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
};
```

---

## Pattern Reference Table

| Pattern | Category | Use Case | Complexity |
|---------|----------|----------|-----------|
| Component-Driven Architecture | Architectural | Organizing React apps | Medium |
| Custom Hooks | React | Logic extraction | Medium |
| Composition over Props | React | Avoiding prop drilling | Medium |
| Behavior-Driven Testing | Testing | Writing resilient tests | Low |
| BEM + CSS Variables | CSS | Styling with theming | Low |
| Index Files | Organization | Clean imports | Low |

---

## Pattern Evolution

### Patterns by Project Stage

**Early Stage** (MVP)
- Simple component structure
- Direct imports (no index files)
- Basic styling
- Minimal testing

**Growth Stage** (Adding features)
- ✅ Introduce custom hooks
- ✅ Add context for shared state
- ✅ Implement comprehensive testing
- ✅ Establish naming conventions

**Mature Stage** (Optimization)
- ✅ Optimize performance (memo, lazy loading)
- ✅ Implement design patterns
- ✅ Extract shared utilities
- ✅ Improve testing coverage

---

## When to Introduce New Patterns

- [ ] Pattern solves a real problem (not hypothetical)
- [ ] Team consensus on approach
- [ ] Documented with examples
- [ ] Applied consistently across codebase
- [ ] Benefits justify added complexity

---

## Related Documentation

- **CLAUDE.md**: Project coding standards
- **decisions.md**: Architectural decisions (ADR-001, ADR-002, ADR-003)
- **learnings.md**: Lessons learned from applying patterns
- **Hooks**: See `/src/hooks` for custom hook examples
- **Components**: See `/src/components` for pattern implementations
