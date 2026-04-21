---
name: "Code Style Standards"
description: "Enterprise-grade coding style guide with comprehensive rules, examples, and configuration"
---

# Enterprise Code Style Standards

Comprehensive style guide for MultiAgent-Lab codebase. All code MUST follow these standards.

**Standards are enforced by:**
- ESLint (linting rules)
- Prettier (formatting)
- Pre-commit hooks (validation before commit)

---

## ⚙️ Tool Configuration

### Prettier (.prettierrc)
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "useTabs": false,
  "tabWidth": 2,
  "arrowParens": "always",
  "bracketSpacing": true,
  "endOfLine": "lf"
}
```

### ESLint (.eslintrc.js)
```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
```

### VS Code Settings (.vscode/settings.json)
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  },
  "files.exclude": {
    "node_modules": true,
    ".git": true
  }
}
```

---

## 📝 JavaScript Style

### Variables

**Rule: Use `const` by default; `let` if reassignment needed; never `var`**

```javascript
// ✅ Correct: const for values that don't change
const MAX_TODOS = 100;
const todos = [{ id: 1, text: 'Learn React' }];
const user = { name: 'John', age: 30 };

// ✅ Acceptable: let when variable reassigned
let count = 0;
count += 1;

// ❌ Wrong: var (hoisting issues, function-scoped)
var firstName = 'John'; // Never use

// ❌ Wrong: const for reassigned variable
const counter = 0;
counter = 1; // Error: Assignment to constant variable
```

**Rationale:** `const` prevents accidental reassignment; `let` has block scope (safer than `var`)

### Naming Conventions

**Variables & Functions: camelCase**
```javascript
// ✅ Good
const userName = 'John';
const todoCount = 42;
const formatDate = (date) => { /* ... */ };
const calculateTotal = (items) => { /* ... */ };

// ❌ Bad
const UserName = 'John'; // PascalCase (reserved for classes/components)
const user_name = 'John'; // snake_case
const userName_ = 'John'; // Trailing underscore
```

**Constants: CONSTANT_CASE**
```javascript
// ✅ Good
const MAX_TODO_LENGTH = 100;
const API_BASE_URL = 'https://api.example.com';
const ITEMS_PER_PAGE = 20;

// ❌ Bad
const maxTodoLength = 100; // Should be CONSTANT_CASE
const MAX_TODO_length = 100; // Mixed case
```

**Classes & Components: PascalCase**
```javascript
// ✅ Good
class UserManager { /* ... */ }
const TodoItem = ({ todo }) => { /* ... */ };
const useLocalStorage = (key) => { /* ... */ };

// ❌ Bad
class userManager { /* ... */ } // Should be PascalCase
const todoItem = ({ todo }) => { /* ... */ }; // Should be PascalCase
```

**Private/Unused Variables: Leading underscore**
```javascript
// Unused parameter in callback
const handleClick = (_event) => {
  // _event not used, leading underscore signals intention
};

// Private-like property
const _internalState = { /* ... */ };
```

### Functions

**Arrow Functions Preferred**
```javascript
// ✅ Preferred: arrow function
const add = (a, b) => a + b;
const greet = (name) => `Hello, ${name}`;

// ✅ Acceptable: named function (clear intent)
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Avoid: function keyword as default
const add = function(a, b) { return a + b; };

// ✅ Correct: Multiple statements
const formatUser = (user) => {
  const firstName = user.name.split(' ')[0];
  const email = user.email.toLowerCase();
  return { firstName, email };
};
```

**Single Parameter (optional parentheses)**
```javascript
// ✅ Both acceptable (Prettier decides)
const square = (x) => x * x;
const square = x => x * x;

// ❌ Wrong: Inconsistent
const square = x => x * x;
const add = (a, b) => a + b; // Mix of no parens and parens
```

**Function Parameter Defaults**
```javascript
// ✅ Good: Clear defaults
const createUser = (name = 'Guest', email = null) => {
  return { name, email };
};

const paginate = (items, pageSize = 10) => {
  return items.slice(0, pageSize);
};

// ❌ Bad: Unclear defaults
const createUser = (name, email) => { /* ... */ }; // No defaults

// ❌ Wrong: Truthy check in function body
const createUser = (name) => {
  const finalName = name || 'Guest'; // Should use parameter default
};
```

### Strings

**Template Literals (Backticks)**
```javascript
// ✅ Preferred: template literals
const greeting = `Hello, ${name}!`;
const query = `SELECT * FROM users WHERE id = ${userId}`;
const multiline = `Line 1
Line 2
Line 3`;

// ❌ Avoid: single/double quotes for interpolation
const greeting = 'Hello, ' + name + '!';
const greeting = "Hello, " + name + "!";

// ✅ Acceptable: single quotes for simple strings (no interpolation)
const message = 'No interpolation here';
const label = 'Click me';
```

**String Operations**
```javascript
// ✅ Good: Modern methods
const text = '  hello world  ';
const trimmed = text.trim();
const upper = text.toUpperCase();
const hasTodo = text.includes('world');
const replaced = text.replace('hello', 'hi');

// ❌ Avoid: charAt/substring (old patterns)
const firstChar = text.charAt(0); // Use text[0]
const slice = text.substring(0, 5); // Use text.slice(0, 5)
```

### Objects & Arrays

**Object Literals**
```javascript
// ✅ Good: Shorthand properties
const name = 'John';
const age = 30;
const user = { name, age }; // Property shorthand

// ✅ Good: Computed property names when needed
const key = 'email';
const user = { [key]: 'john@example.com' };

// ❌ Bad: Repetitive property names
const user = { name: name, age: age }; // No shorthand

// ✅ Good: Object spreading
const newUser = { ...user, role: 'admin' };
const merged = { ...defaults, ...overrides };

// ❌ Avoid: Object.assign (less readable)
const newUser = Object.assign({}, user, { role: 'admin' });
```

**Array Operations**
```javascript
// ✅ Good: Modern array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
const evens = numbers.filter((n) => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// ✅ Good: Spread operator
const newArray = [...array, newItem];
const combined = [...array1, ...array2];
const [first, ...rest] = array;

// ❌ Avoid: forEach for side effects (use .map or better patterns)
array.forEach((item) => {
  processItem(item); // Use better patterns
});

// ✅ Better: for...of when side effects needed
for (const item of array) {
  processItem(item);
}
```

**Destructuring**
```javascript
// ✅ Good: Destructure objects
const { name, email, role = 'user' } = user;
const { id: userId, name: userName } = user; // Rename

// ✅ Good: Destructure arrays
const [first, second, ...rest] = array;
const [, , third] = array; // Skip elements

// ✅ Good: Destructure in parameters
const displayUser = ({ name, email }) => {
  return `${name} (${email})`;
};

// ❌ Bad: Not destructuring
const name = user.name;
const email = user.email;

// ❌ Bad: Over-destructuring (unreadable)
const { a: { b: { c: { d } } } } = deepObject; // Nested destructure
```

### Operators & Spacing

**Operator Spacing**
```javascript
// ✅ Good: Spaces around operators
const sum = a + b;
const product = a * b;
const isEqual = a === b;
const isGreater = a > b;

// ❌ Bad: No spaces
const sum = a+b;
const product=a*b;
const isEqual=a===b;

// ✅ Good: No space after function name
const result = calculate(a, b);
if (condition) { /* ... */ }
for (let i = 0; i < 10; i++) { /* ... */ }

// ❌ Bad: Space after function/keywords
const result = calculate (a, b);
if (condition) { /* ... */ }
```

**Comparison Operators**
```javascript
// ✅ Always use strict equality
if (value === true) { /* ... */ }
if (count === 0) { /* ... */ }
if (user === null) { /* ... */ }

// ❌ Avoid: loose equality (unexpected type coercion)
if (value == true) { /* ... */ } // Could be unexpected
if (count == 0) { /* ... */ } // Works but risky
if (value != null) { /* ... */ } // Loose inequality
```

### Comments & Documentation

**JSDoc for Public Functions**
```javascript
// ✅ Good: JSDoc for exported functions
/**
 * Formats a user object for display.
 * @param {Object} user - The user object
 * @param {string} user.name - User's name
 * @param {string} user.email - User's email
 * @returns {string} Formatted user string
 */
export const formatUser = (user) => {
  return `${user.name} <${user.email}>`;
};

// ✅ Good: JSDoc for components
/**
 * Displays a single todo item.
 * @component
 * @param {Object} props
 * @param {Object} props.todo - The todo object
 * @param {number} props.todo.id - Todo ID
 * @param {string} props.todo.text - Todo text
 * @param {Function} props.onDelete - Delete callback
 * @returns {ReactElement}
 */
export const TodoItem = ({ todo, onDelete }) => { /* ... */ };
```

**Inline Comments**
```javascript
// ✅ Good: Explain WHY, not WHAT
const MAX_RETRIES = 3; // Retry failed API calls up to 3 times

// Only process completed todos (in-progress ones may change)
const completedTodos = todos.filter((t) => t.completed);

// ❌ Bad: Comments state obvious code
const x = 5; // Set x to 5
const filtered = items.filter(Boolean); // Filter falsy values

// ❌ Bad: Comments describe implementation
// Increment counter
count++;
// Check if greater than 10
if (count > 10) { /* ... */ }
```

**No Commented Code**
```javascript
// ❌ Never leave commented code
// const oldFunction = (x) => x * 2;
// const backup = { ...data };

// ✅ Remove it; git history preserves it
// If needed, add issue reference
// TODO: #123 - Consider adding old calculation method
```

---

## ⚛️ React Style

### Components

**Functional Components Only**
```javascript
// ✅ Correct: Functional component
export const TodoItem = ({ todo, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="todo-item">
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

// ❌ Never: Class components
export class TodoItem extends React.Component {
  render() {
    return <div>{this.props.todo.text}</div>;
  }
}
```

**Component Naming**
```javascript
// ✅ PascalCase for components
export const TodoItem = () => { /* ... */ };
export const TodoList = () => { /* ... */ };
export const UserProfile = () => { /* ... */ };

// ✅ camelCase for hooks
export const useTodoForm = () => { /* ... */ };
export const useLocalStorage = (key) => { /* ... */ };

// ❌ kebab-case
export const todo-item = () => { /* ... */ }; // Error

// ❌ Confusing: hooks not starting with "use"
export const TodoForm = () => { /* ... */ }; // Good component name
export const getTodoData = () => { /* ... */ }; // Better as "useTodoData"
```

### Props

**Props Destructuring in Signature**
```javascript
// ✅ Good: Destructure in function signature
export const TodoItem = ({ todo, onDelete, onUpdate }) => {
  return <div>{todo.text}</div>;
};

// ✅ Good: Default values in destructuring
export const Button = ({ variant = 'primary', size = 'md', children }) => {
  return <button className={`btn btn-${variant} btn-${size}`}>{children}</button>;
};

// ❌ Bad: Using props object directly
export const TodoItem = (props) => {
  return <div>{props.todo.text}</div>;
};

// ❌ Bad: Destructuring in function body
export const TodoItem = (props) => {
  const { todo, onDelete } = props;
  return <div>{todo.text}</div>;
};
```

**Prop Ordering**
```javascript
// ✅ Good: Logical order (data, callbacks, UI)
<TodoItem
  todo={todo}
  isCompleted={isCompleted}
  onUpdate={handleUpdate}
  onDelete={handleDelete}
  className="todo-item"
  disabled={false}
/>

// ❌ Messy: Random order
<TodoItem
  onDelete={handleDelete}
  className="todo-item"
  todo={todo}
  disabled={false}
  onUpdate={handleUpdate}
/>
```

### Hooks

**Hooks at Top Level**
```javascript
// ✅ Correct: Hooks at top level
export const TodoForm = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  return <form>{/* ... */}</form>;
};

// ❌ Wrong: Hooks in conditionals
export const TodoForm = ({ onSubmit }) => {
  if (shouldUseForm) {
    const [text, setText] = useState(''); // Error: Conditional hook
  }
  return <form>{/* ... */}</form>;
};

// ❌ Wrong: Hooks in loops
export const TodoForm = ({ todos }) => {
  todos.forEach((todo) => {
    const [text, setText] = useState(todo.text); // Error: Hook in loop
  });
  return <div>{/* ... */}</div>;
};
```

**useEffect Dependencies**
```javascript
// ✅ Good: Explicit dependencies
useEffect(() => {
  fetchTodo(todoId);
}, [todoId]); // Re-run when todoId changes

// ✅ Good: Empty dependency array (run once on mount)
useEffect(() => {
  console.log('Component mounted');
}, []);

// ✅ Good: Cleanup function
useEffect(() => {
  const handler = () => console.log('Resized');
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler); // Cleanup
}, []);

// ❌ Bad: Missing dependencies (stale closures)
useEffect(() => {
  fetchTodo(todoId); // ESLint warns: todoId not in dependencies
}, []); // Should include [todoId]

// ❌ Bad: Infinite loop
useEffect(() => {
  setTodos([...todos, newTodo]); // Adds to todos, triggering re-render
}, [todos]); // todos changed, effect re-runs (infinite loop)
```

### JSX Formatting

**Multi-line JSX**
```javascript
// ✅ Good: Readable formatting
export const TodoItem = ({ todo, onDelete }) => {
  return (
    <div className="todo-item">
      <span className="todo-item__text">{todo.text}</span>
      <button
        className="todo-item__delete"
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </div>
  );
};

// ✅ Acceptable: Simple components on one line
export const EmptyState = () => <div>No todos yet</div>;

// ❌ Bad: Unreadable formatting
export const TodoItem = ({ todo, onDelete }) => {
  return (<div className="todo-item"><span className="todo-item__text">{todo.text}</span><button className="todo-item__delete" onClick={() => onDelete(todo.id)}>Delete</button></div>);
};
```

**Props on Multiple Lines**
```javascript
// ✅ Good: Props on separate lines if many
<TodoItem
  todo={todo}
  isCompleted={isCompleted}
  onUpdate={handleUpdate}
  onDelete={handleDelete}
/>

// ✅ Acceptable: Single line if few props
<Button onClick={handleClick}>Click me</Button>

// ❌ Bad: Mixing styles
<TodoItem
  todo={todo}
  isCompleted={isCompleted} onUpdate={handleUpdate}
  onDelete={handleDelete}
/>
```

---

## 🎨 CSS Style

### Naming Convention: BEM

**Block: Standalone component**
```css
.todo-item { }
.todo-list { }
.button { }
```

**Element: Part of block (double underscore)**
```css
.todo-item__text { }
.todo-item__checkbox { }
.todo-item__delete-btn { }
.button__icon { }
```

**Modifier: Variation (double dash)**
```css
.todo-item--completed { }
.todo-item--highlighted { }
.button--primary { }
.button--large { }
```

**Complete Example:**
```css
/* Block */
.todo-item {
  display: flex;
  gap: var(--spacing-md);
}

/* Element */
.todo-item__text {
  flex: 1;
  font-size: 1rem;
}

.todo-item__delete-btn {
  background: var(--color-danger);
  color: white;
}

/* Modifier */
.todo-item--completed {
  opacity: 0.6;
}

.todo-item--completed .todo-item__text {
  text-decoration: line-through;
}

/* Hover state (modifier-like) */
.todo-item__delete-btn:hover {
  background: var(--color-danger-dark);
}
```

### CSS Variables

**Naming: kebab-case for CSS variables**
```css
/* ✅ Good: Clear naming */
:root {
  --primary-color: #007bff;
  --danger-color: #dc3545;
  --spacing-sm: 4px;
  --spacing-md: 8px;
  --spacing-lg: 16px;
  --transition-default: 0.3s ease;
  --border-radius: 4px;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* ✅ Usage */
.button {
  padding: var(--spacing-md);
  color: var(--primary-color);
  border-radius: var(--border-radius);
  transition: var(--transition-default);
}

/* ❌ Bad: CamelCase (CSS variables use kebab-case) */
:root {
  --primaryColor: #007bff;
  --dangerColor: #dc3545;
}
```

### Property Ordering

**Logical grouping within rules**
```css
/* ✅ Good: Logical order */
.element {
  /* Layout */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  /* Sizing */
  width: 100%;
  height: auto;
  
  /* Spacing */
  padding: 1rem;
  margin: 0;
  
  /* Appearance */
  background: var(--primary-color);
  color: white;
  border-radius: 4px;
  
  /* Effects */
  box-shadow: var(--shadow-sm);
  transition: var(--transition-default);
}

/* ❌ Bad: Random order */
.element {
  color: white;
  display: flex;
  border-radius: 4px;
  padding: 1rem;
  background: var(--primary-color);
  width: 100%;
  gap: 1rem;
}
```

### Media Queries (Mobile-First)

**Approach: Base styles for mobile; expand with media queries**
```css
/* ✅ Mobile-first approach */
.todo-list {
  display: flex;
  flex-direction: column; /* Stack on mobile */
  gap: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .todo-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .todo-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ❌ Bad: Desktop-first (requires overrides) */
.todo-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Desktop first */
}

@media (max-width: 768px) {
  .todo-list {
    grid-template-columns: repeat(2, 1fr); /* Override */
  }
}
```

---

## 📁 File & Folder Organization

### File Naming

```
src/
├── components/
│   ├── TodoItem/
│   │   ├── TodoItem.jsx          ← Component (PascalCase)
│   │   ├── TodoItem.css          ← Styles (match component name)
│   │   ├── TodoItem.test.js      ← Tests (match component name)
│   │   └── index.js              ← Export (optional)
│   ├── TodoList/
│   ├── Button/
│   └── Modal/
├── hooks/
│   ├── useTodoForm.js            ← Custom hook (camelCase, starts with "use")
│   ├── useLocalStorage.js
│   └── useLocalStorage.test.js
├── utils/
│   ├── validators.js             ← Utility functions (camelCase)
│   ├── dateFormatter.js
│   └── api.js
├── styles/
│   ├── global.css                ← Global styles
│   ├── variables.css             ← CSS variables
│   └── animations.css
└── App.jsx                        ← Root component
```

**File Naming Rules:**
- Components: `PascalCase.jsx`
- Hooks: `camelCase.js` (must start with "use")
- Utils/functions: `camelCase.js`
- Styles: `camelCase.css` (match component name)
- Tests: `ComponentName.test.js`

---

## 🔍 Linting & Auto-Formatting

### Run Locally
```bash
# Format code (auto-fixes)
npm run format

# Lint check
npm run lint

# Fix lint issues
npm run lint -- --fix
```

### Pre-Commit Hook
All commits automatically validated:
- ✅ Format checked (Prettier)
- ✅ Linting passed (ESLint)
- ✅ No console.log/debugger
- ✅ No unused imports

### IDE Integration (VS Code)
1. Install **Prettier** extension
2. Install **ESLint** extension
3. Enable "Format on Save"
4. ESLint will auto-fix on save

---

## 📋 Quick Checklist

- [ ] Variables: `const` by default; `let` only if reassigned
- [ ] Functions: Arrow functions preferred
- [ ] Strings: Template literals (backticks)
- [ ] Objects: Shorthand properties; spread operator
- [ ] Components: Functional, PascalCase
- [ ] Props: Destructured in signature
- [ ] Hooks: At top level; dependencies correct
- [ ] CSS: BEM naming; variables for colors
- [ ] Comments: Explain WHY; no commented code
- [ ] No console.log in production code
- [ ] Line length: Max 80 characters (enforced by Prettier)
- [ ] Indentation: 2 spaces (configured in Prettier)

---

## Related Documentation

- **CLAUDE.md**: Overall project standards
- **patterns.md**: Design patterns and best practices
- **code-review.md**: Code review checklist
- **decisions.md**: ADR-002 (Functional Components)
- **learnings.md**: Why these standards exist
