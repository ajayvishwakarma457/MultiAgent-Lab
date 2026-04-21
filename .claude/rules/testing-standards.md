---
name: "Testing Standards"
description: "Enterprise-grade testing standards with patterns, frameworks, and comprehensive examples"
---

# Enterprise Testing Standards

Professional testing approach for MultiAgent-Lab. Uses Vitest + React Testing Library following best practices.

**Testing Tools:**
- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing (user-centric)
- **MSW (Mock Service Worker)**: API mocking
- **@testing-library/jest-dom**: DOM matchers

---

## 📊 Testing Pyramid

```
        🎭 E2E Tests (5%)
       Cypress / Playwright
       
     🔄 Integration Tests (15%)
     Multiple components together
     
  🧪 Unit Tests (70%)
  Functions, utilities, components
  
   (Fast, Isolated, Reliable)
```

**Ratio Guidelines:**
- 70% Unit Tests: Fast, isolated, reliable
- 15% Integration Tests: Real interactions
- 5% E2E Tests: User workflows (usually external)

**Testing Speed:**
- Unit tests: < 100ms
- Integration tests: 100-500ms
- E2E tests: 1-10 seconds

---

## 🧪 Unit Tests

### Pattern-001: Testing Pure Functions

**Setup:**
```javascript
// src/utils/validators.js
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};
```

**Tests:**
```javascript
// src/utils/validators.test.js
import { describe, test, expect } from 'vitest';
import { validateEmail, calculateTotal } from './validators';

describe('validateEmail', () => {
  // ✅ Valid cases
  test('returns true for valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });
  
  test('returns true for email with subdomain', () => {
    expect(validateEmail('user@mail.example.co.uk')).toBe(true);
  });
  
  // ✅ Invalid cases
  test('returns false for email without @', () => {
    expect(validateEmail('userexample.com')).toBe(false);
  });
  
  test('returns false for empty string', () => {
    expect(validateEmail('')).toBe(false);
  });
  
  // ✅ Edge cases
  test('returns false for email with spaces', () => {
    expect(validateEmail('user @example.com')).toBe(false);
  });
  
  test('returns false for email with multiple @', () => {
    expect(validateEmail('user@ex@ample.com')).toBe(false);
  });
});

describe('calculateTotal', () => {
  test('calculates total for multiple items', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 20, quantity: 1 }
    ];
    expect(calculateTotal(items)).toBe(40);
  });
  
  test('returns 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
});
```

**Best Practices:**
- ✅ Test single responsibility (one behavior per test)
- ✅ Descriptive test names (describe what, not how)
- ✅ Cover happy path + edge cases + error cases
- ✅ Don't test library code (React, lodash, etc.)
- ✅ Don't mock what you're testing

---

### Pattern-002: Testing with Mocks

**Setup:**
```javascript
// src/api/userService.js
export const fetchUser = async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

export const createUser = async (userData) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
};
```

**Tests with Mocks:**
```javascript
// src/api/userService.test.js
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { fetchUser, createUser } from './userService';

describe('userService', () => {
  // ✅ Mock global fetch
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('fetchUser', () => {
    test('returns user data on success', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUser)
        })
      );
      
      const user = await fetchUser(1);
      
      expect(user).toEqual(mockUser);
      expect(global.fetch).toHaveBeenCalledWith('/api/users/1');
    });
    
    test('throws error on failed response', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({ ok: false })
      );
      
      await expect(fetchUser(1)).rejects.toThrow('Failed to fetch user');
    });
  });
  
  describe('createUser', () => {
    test('sends correct POST request', async () => {
      const userData = { name: 'Jane', email: 'jane@example.com' };
      const mockResponse = { id: 2, ...userData };
      
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        })
      );
      
      const result = await createUser(userData);
      
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
    });
  });
});
```

**Mocking Best Practices:**
- ✅ Mock only external dependencies (API, storage, libraries)
- ✅ Use `vi.fn()` for spying on functions
- ✅ Clear mocks between tests (`beforeEach`)
- ✅ Test both success and error paths
- ✅ Verify mock was called with correct arguments

---

## 🧩 Component Tests

### Pattern-003: Testing Component Rendering & Props

**Component:**
```javascript
// src/components/Button.jsx
export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  children 
}) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

**Tests:**
```javascript
// src/components/Button.test.js
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });
  
  test('applies variant class', () => {
    render(<Button variant="danger">Delete</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-danger');
  });
  
  test('applies size class', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-lg');
  });
  
  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
  
  test('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

**Component Testing Best Practices:**
- ✅ Use `getByRole` (accessible, reflects actual usage)
- ✅ Test user interactions (click, type, etc.)
- ✅ Avoid testing implementation details
- ✅ Don't test props directly; test rendered output
- ✅ Test both enabled and disabled states

---

### Pattern-004: Testing Component State

**Component:**
```javascript
// src/components/Counter.jsx
export const Counter = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
};
```

**Tests:**
```javascript
// src/components/Counter.test.js
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter', () => {
  test('renders with initial count', () => {
    render(<Counter initialCount={5} />);
    expect(screen.getByText('Count: 5')).toBeInTheDocument();
  });
  
  test('increments count when increment button clicked', async () => {
    render(<Counter initialCount={0} />);
    
    await userEvent.click(screen.getByRole('button', { name: /increment/i }));
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
  
  test('decrements count when decrement button clicked', async () => {
    render(<Counter initialCount={5} />);
    
    await userEvent.click(screen.getByRole('button', { name: /decrement/i }));
    
    expect(screen.getByText('Count: 4')).toBeInTheDocument();
  });
  
  test('resets count to 0', async () => {
    render(<Counter initialCount={10} />);
    
    await userEvent.click(screen.getByRole('button', { name: /reset/i }));
    
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });
});
```

---

### Pattern-005: Testing Conditional Rendering

**Component:**
```javascript
// src/components/TodoItem.jsx
export const TodoItem = ({ todo, onDelete, isEditing = false }) => {
  if (!todo) {
    return <div>No todo provided</div>;
  }
  
  return (
    <div className={todo.completed ? 'completed' : ''}>
      {isEditing ? (
        <input defaultValue={todo.text} />
      ) : (
        <span>{todo.text}</span>
      )}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};
```

**Tests:**
```javascript
// src/components/TodoItem.test.js
describe('TodoItem', () => {
  test('shows fallback when todo is null', () => {
    render(<TodoItem todo={null} />);
    expect(screen.getByText(/no todo provided/i)).toBeInTheDocument();
  });
  
  test('displays todo text in normal mode', () => {
    const todo = { id: 1, text: 'Learn React', completed: false };
    render(<TodoItem todo={todo} />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
  });
  
  test('shows input field in editing mode', () => {
    const todo = { id: 1, text: 'Learn React', completed: false };
    render(<TodoItem todo={todo} isEditing={true} />);
    expect(screen.getByDisplayValue('Learn React')).toBeInTheDocument();
  });
  
  test('applies completed class when todo is completed', () => {
    const todo = { id: 1, text: 'Learn React', completed: true };
    const { container } = render(<TodoItem todo={todo} />);
    expect(container.querySelector('div')).toHaveClass('completed');
  });
});
```

---

## 🔗 Integration Tests

### Pattern-006: Testing Multiple Components Together

**Components:**
```javascript
// src/components/TodoList.jsx
export const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false }
  ]);
  
  const handleAddTodo = (text) => {
    setTodos([...todos, {
      id: todos.length + 1,
      text,
      completed: false
    }]);
  };
  
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };
  
  return (
    <div>
      <TodoForm onSubmit={handleAddTodo} />
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} />
      ))}
    </div>
  );
};
```

**Integration Tests:**
```javascript
// src/components/TodoList.test.js
describe('TodoList Integration', () => {
  test('adds and deletes todos', async () => {
    render(<TodoList />);
    
    // Initial todo should be displayed
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    
    // Add new todo
    const input = screen.getByPlaceholderText(/add todo/i);
    await userEvent.type(input, 'Build a project');
    await userEvent.click(screen.getByRole('button', { name: /add/i }));
    
    // New todo should appear
    expect(screen.getByText('Build a project')).toBeInTheDocument();
    
    // Delete first todo
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await userEvent.click(deleteButtons[0]);
    
    // First todo should be gone
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Second todo should still exist
    expect(screen.getByText('Build a project')).toBeInTheDocument();
  });
});
```

---

### Pattern-007: Testing with Async Operations

**Component:**
```javascript
// src/components/UserProfile.jsx
export const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((r) => r.json())
      .then((data) => {
        setUser(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{user?.name}</div>;
};
```

**Tests:**
```javascript
// src/components/UserProfile.test.js
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  test('shows loading state initially', () => {
    global.fetch = vi.fn(() =>
      new Promise(() => {}) // Never resolves
    );
    
    render(<UserProfile userId={1} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  
  test('displays user data when loaded', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUser)
      })
    );
    
    render(<UserProfile userId={1} />);
    
    // Wait for loading to finish and user to appear
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
  
  test('shows error message on failure', async () => {
    global.fetch = vi.fn(() =>
      Promise.reject(new Error('Network error'))
    );
    
    render(<UserProfile userId={1} />);
    
    await waitFor(() => {
      expect(screen.getByText(/Error: Network error/)).toBeInTheDocument();
    });
  });
  
  test('refetches when userId changes', async () => {
    const mockUser1 = { id: 1, name: 'John' };
    const mockUser2 = { id: 2, name: 'Jane' };
    
    global.fetch = vi.fn((url) => {
      const userId = url.match(/\/(\d+)$/)[1];
      const user = userId === '1' ? mockUser1 : mockUser2;
      return Promise.resolve({
        json: () => Promise.resolve(user)
      });
    });
    
    const { rerender } = render(<UserProfile userId={1} />);
    
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });
    
    // Change userId
    rerender(<UserProfile userId={2} />);
    
    await waitFor(() => {
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });
    
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
```

**Async Testing Best Practices:**
- ✅ Use `waitFor` for async state updates
- ✅ Test loading, success, and error states
- ✅ Avoid relying on `setTimeout` (use `waitFor` instead)
- ✅ Clean up mocks between tests
- ✅ Test refetching on dependency change

---

## 📋 Test File Organization

**Structure:**
```
src/
├── components/
│   ├── Button.jsx
│   ├── Button.test.js        ← Test file next to component
│   ├── TodoItem.jsx
│   └── TodoItem.test.js
├── utils/
│   ├── validators.js
│   └── validators.test.js
└── __tests__/               ← Or separate test directory
    └── integration/
        └── todoFlow.test.js
```

**Test File Naming:**
- `Component.test.js` (recommended)
- `Component.spec.js` (alternative)
- Never: `test-Component.js` or `tests.js`

---

## 🎯 Coverage Targets

**Enterprise Standards:**
```
Statements: 80%+
Branches: 75%+
Functions: 80%+
Lines: 80%+
```

**Check Coverage:**
```bash
npm run test:coverage

# Output example:
# -----------|----------|----------|----------|----------|
# File       | % Stmts  | % Branch | % Funcs  | % Lines  |
# -----------|----------|----------|----------|----------|
# All files  | 85.5     | 78.2     | 83.1     | 85.3     |
```

**Coverage Rules:**
- ✅ 80%+ coverage indicates good testing
- ⚠️ 100% coverage possible but not always necessary
- ⚠️ High coverage doesn't guarantee quality (test quality matters)
- ❌ Coverage doesn't test user workflows (integration tests matter)

---

## 🧬 Snapshot Testing (Use Sparingly)

**When to Use:**
- Components with complex, stable rendered output
- Use sparingly; prefer explicit assertions

**Example:**
```javascript
describe('TodoItem Snapshot', () => {
  test('matches snapshot', () => {
    const todo = { id: 1, text: 'Learn React', completed: false };
    const { container } = render(<TodoItem todo={todo} />);
    
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

**⚠️ Caution:**
- Snapshots can hide bugs (easy to update carelessly)
- Prefer explicit assertions: `expect(element).toHaveText(...)`
- Only use for stable, infrequently-changing output

---

## ♿ Accessibility Testing

**Test Accessibility:**
```javascript
describe('Button Accessibility', () => {
  test('is keyboard accessible', async () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    
    // Button should be focusable
    button.focus();
    expect(document.activeElement).toBe(button);
    
    // Button should respond to Enter key
    await userEvent.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalled();
  });
  
  test('has proper ARIA labels', () => {
    render(<Button aria-label="Close dialog">✕</Button>);
    expect(screen.getByRole('button', { name: /close dialog/i })).toBeInTheDocument();
  });
});
```

---

## 🚫 Common Testing Mistakes

### ❌ Mistake 1: Testing Implementation Details
```javascript
// ❌ Wrong: Testing internal state
const [hidden, setHidden] = useState(true);
// Don't test: expect(hidden).toBe(false);

// ✅ Right: Test user-visible behavior
expect(screen.getByText('Content')).toBeInTheDocument();
```

### ❌ Mistake 2: Not Waiting for Async
```javascript
// ❌ Wrong: No wait for async
render(<AsyncComponent />);
expect(screen.getByText('Data')).toBeInTheDocument(); // Fails!

// ✅ Right: Wait for async completion
await waitFor(() => {
  expect(screen.getByText('Data')).toBeInTheDocument();
});
```

### ❌ Mistake 3: Brittle Selectors
```javascript
// ❌ Wrong: Implementation details
getByTestId('component-wrapper')
container.querySelector('.btn')

// ✅ Right: User-centric
getByRole('button', { name: /submit/i })
getByLabelText(/email/i)
```

### ❌ Mistake 4: Testing Library Code
```javascript
// ❌ Wrong: Don't test React internals
test('useState works', () => {
  const [state, setState] = useState(0);
  // Don't test React!
});

// ✅ Right: Test your code
test('counter increments', () => {
  render(<Counter />);
  await userEvent.click(screen.getByRole('button'));
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### ❌ Mistake 5: Over-Mocking
```javascript
// ❌ Wrong: Mocking too much
vi.mock('react'); // Never!
vi.mock('./utils'); // If not testing integration

// ✅ Right: Mock only external dependencies
vi.mock('./api'); // External API
vi.mock('./services'); // External services
```

---

## 📝 Test-Driven Development (TDD)

**Red-Green-Refactor Cycle:**

```
1. RED: Write failing test
   - Test describes desired behavior
   - Test fails (code doesn't exist yet)

2. GREEN: Write minimal code to pass test
   - Just enough to make test pass
   - Don't over-engineer

3. REFACTOR: Improve code quality
   - Keep tests passing
   - Improve readability, performance
   - Remove duplication
```

**Benefits:**
- ✅ Better API design (test uses API before implementation)
- ✅ Higher confidence (code designed for testability)
- ✅ Better coverage (tests written before code)
- ✅ Documentation (tests show expected behavior)

---

## ✅ Testing Checklist

### Before Writing Tests
- [ ] Understand what to test (happy path, edge cases, errors)
- [ ] Identify dependencies that need mocking
- [ ] Plan test structure (describe blocks, logical grouping)

### Writing Tests
- [ ] Test one behavior per test
- [ ] Use descriptive test names
- [ ] Test user interactions, not implementation
- [ ] Test both success and failure scenarios
- [ ] Cover edge cases

### After Writing Tests
- [ ] All tests passing
- [ ] Coverage targets met (80%+)
- [ ] No brittle selectors (use getByRole)
- [ ] No unnecessary mocks
- [ ] Tests are fast (< 5 seconds total)

---

## 🔧 Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode (re-run on file change)
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test file
npm run test -- Counter.test.js

# Run tests matching pattern
npm run test -- --grep "should increment"
```

---

## 🧬 Query Priority (React Testing Library)

**Use in order of preference:**

```javascript
// 1️⃣ getByRole (most accessible, recommended)
getByRole('button', { name: /submit/i })
getByRole('textbox', { name: /email/i })

// 2️⃣ getByLabelText (for form inputs)
getByLabelText(/password/i)

// 3️⃣ getByPlaceholderText (last resort for inputs)
getByPlaceholderText(/enter email/i)

// 4️⃣ getByText (for non-interactive elements)
getByText(/welcome/i)

// 5️⃣ getByTestId (last resort, implementation detail)
getByTestId('custom-element')
```

**Why This Order:**
- `getByRole`: Reflects actual usage; accessible
- `getByLabelText`: Semantically correct
- `getByText`: Content-based
- `getByTestId`: Implementation detail (fragile)

---

## 📋 Quick Checklist

- [ ] Unit tests for utilities and functions
- [ ] Component tests for rendering and interactions
- [ ] Integration tests for user workflows
- [ ] Async tests with `waitFor`
- [ ] No `setTimeout` in tests
- [ ] Coverage 80%+
- [ ] No over-mocking
- [ ] Descriptive test names
- [ ] Tests are fast (< 5 seconds total)
- [ ] All tests pass in CI/CD

---

## Related Documentation

- **code-review.md**: Code review includes test quality
- **patterns.md**: Testing patterns (behavior-driven)
- **code-style.md**: Code style applies to tests too
- **pre-commit.md**: Tests validated before commit
- **feature-development.md**: Testing phase in workflow
