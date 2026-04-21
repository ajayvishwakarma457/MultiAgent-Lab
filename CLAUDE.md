# MultiAgent-Lab (React Todo App)

## Project Overview

**Name:** MultiAgent-Lab (React Todo App)

**Stack:** React 18, Vite, CSS

**Purpose:** Learning Claude Code as an AI agent tool

A modern todo application built with React and Vite, designed to explore the capabilities of Claude Code as an AI development assistant.

---

## Coding Standards

### Component Structure
- Use **functional components with React hooks only** (no class components)
- Use `useState` and `useEffect` for state management
- Prefer `const` over `let`/`var`
- Use destructuring for props
- Keep components under 200 lines
- Add JSDoc comments to complex functions

### Code Style
```javascript
// ✅ Preferred
const TodoItem = ({ todo, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return <div className="todo-item">{todo.text}</div>;
};

// ❌ Avoid
const TodoItem = (props) => {
  let isEditing = false;
  return <div style={{ color: 'blue' }}>{props.todo.text}</div>;
};
```

---

## File Organization

```
src/
├── components/        # React components (one per file, paired with CSS)
├── hooks/            # Custom React hooks
├── utils/            # Utility functions and helpers
├── styles/           # CSS files (one per component)
├── App.jsx
└── main.jsx
```

### Component Files
Each component should have:
- `ComponentName.jsx` - React component
- `ComponentName.css` - Styling (imported in component)

---

## CSS Best Practices

### Variables & Theming
- Use CSS custom properties: `--primary-color`, `--spacing-unit`, `--transition-default`, etc.
- Define in root selector or component-scoped

### Responsive Design
- **Mobile-first approach** - start with mobile styles, use media queries to expand
- Use flexible units (rem, em, %) over fixed pixels
- Breakpoints: `768px` (tablet), `1024px` (desktop)

### Animation & Transitions
- Default smooth transition: `transition: 0.3s ease`
- Use transitions for hover states and interactions

### Accessibility
- Minimum contrast ratio: **4.5:1** (WCAG AA)
- Use semantic color contrast checking
- Include focus states for keyboard navigation
- Never remove focus outlines without replacement

---

## Performance Rules

### Optimization Techniques
- Use `React.memo` for list items to avoid unnecessary re-renders
- Use `useCallback` for event handlers passed as props
- Lazy load heavy components with `React.lazy` and `Suspense`

### Anti-Patterns
- Don't use array indices as keys in lists
- Don't create new objects/functions in render
- Avoid inline styles (use CSS classes)

---

## What NOT to Do

❌ **No inline styles** - Use CSS classes instead  
❌ **No console.log in production code** - Remove before committing  
❌ **No hardcoded values** - Use constants or configuration  
❌ **No direct DOM manipulation** - Use React state instead  
❌ **No class components** - Use functional components only  
❌ **No var declarations** - Use const/let  
❌ **No magic numbers** - Define constants with clear names  

---

## Git Workflow

### Commit Messages
- Write **meaningful commit messages** that explain what changed and why
- Use imperative mood: "Add feature" not "Added feature"
- Keep first line under 50 characters
- Include detailed explanation if needed

### Commit Organization
- **One feature per commit** - Keep commits focused and atomic
- **Reference what changed and why** - Make history readable
- Test before committing

### Example
```
Add delete confirmation for todo items

- Show modal before permanent deletion
- Prevent accidental data loss
- Closes #42
```

---

## Development Workflow

### Running the Project
```bash
npm install
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview build
```

### Code Review Checklist
- [ ] Follows coding standards
- [ ] Components under 200 lines
- [ ] No console.log or debugger statements
- [ ] CSS uses variables and is mobile-first
- [ ] Proper use of React hooks
- [ ] Accessibility standards met
- [ ] Performance optimizations applied where needed
