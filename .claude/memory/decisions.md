# Architecture Decision Records (ADR)

Enterprise-grade Architecture Decision Records for MultiAgent-Lab (React Todo App).

**Status Legend:**
- 🟢 **Accepted** - In effect; actively used
- 🟡 **Proposed** - Under review; decision pending
- 🔵 **Superseded** - Replaced by another decision
- 🔴 **Deprecated** - No longer recommended; phasing out

---

## ADR-001: React 18 + Vite for Frontend Stack

**Status:** 🟢 Accepted  
**Date:** 2026-04-21  
**Decision Maker:** Ajay Spak  
**Review Date:** 2026-05-21

### Context

We needed to select a frontend framework and build tool for a modern React-based todo application. Requirements included:
- Fast development experience (HMR, instant reload)
- Quick production builds
- Modern JavaScript features
- Active community support
- Suitable for learning Claude Code as an AI development tool

### Decision

Adopt **React 18** with **Vite** as the build tool and development server.

### Rationale

**React 18:**
- Industry standard; largest ecosystem of libraries and tools
- Excellent developer experience (DevTools, documentation)
- Performance improvements (concurrent rendering, automatic batching)
- Strong community; abundant learning resources
- Native hooks support (modern patterns; no class components)

**Vite over Webpack/Create React App:**
- 10-50x faster development server startup (< 500ms)
- Instant HMR (Hot Module Replacement); changes visible immediately
- ES modules native support; no bundling during development
- Smaller build output (optimized production builds)
- Simpler configuration; less opinionated than CRA
- Faster build times (2-3x faster than CRA)
- Modern tooling (uses native ESM, Rollup for production)

### Alternatives Considered

| Alternative | Pros | Cons | Decision |
|-------------|------|------|----------|
| **Create React App** | Zero config; official; widely used | Slow dev server; eject required for customization; outdated tooling | Rejected |
| **Next.js** | Full framework; SSR support; production-ready | Over-engineered for this scope; adds complexity; too opinionated | Rejected |
| **Svelte** | Excellent DX; smaller bundles; fast | Smaller ecosystem; less mature; learning curve | Rejected |
| **Vue 3** | Simple API; good performance | Different paradigm; smaller community than React | Rejected |

### Consequences

**Positive:**
- ✅ Extremely fast development workflow (HMR < 100ms)
- ✅ Quick builds for CI/CD
- ✅ Modern ES module bundling
- ✅ Excellent IDE support (VSCode, IntelliJ)
- ✅ Minimal configuration needed
- ✅ Scales well for growing project

**Negative:**
- ⚠️ SSR/Static generation not built-in (can add with @vitejs/plugin-react)
- ⚠️ Some ecosystem tooling still Webpack-focused
- ⚠️ Smaller community compared to CRA (improving rapidly)

### Implementation Notes

```bash
# Initial setup
npm create vite@latest multiagent-lab -- --template react
cd multiagent-lab
npm install
npm run dev
```

**Key Configuration:**
- `vite.config.js`: Build optimization, plugin configuration
- `.env` files: Environment variables per environment
- `npm run build`: Production build with code splitting
- `npm run preview`: Local preview of production build

### Metrics for Success

- [ ] Dev server starts < 500ms
- [ ] HMR updates visible < 100ms
- [ ] Production build < 3 seconds
- [ ] Bundle size < 300KB (gzipped)
- [ ] Lighthouse score ≥90

### Related Decisions

- ADR-002: Functional Components Only (enabled by React 18 hooks)
- ADR-003: CSS Only (no CSS-in-JS; simplicity priority)

### References

- [Vite Official Docs](https://vitejs.dev/)
- [React 18 Upgrade Guide](https://react.dev/blog/2022/03/29/react-v18)
- [Vite Performance Benchmarks](https://vitejs.dev/guide/comparisons.html)
- [HMR Documentation](https://vitejs.dev/guide/hmr.html)

---

## ADR-002: Functional Components with React Hooks Only

**Status:** 🟢 Accepted  
**Date:** 2026-04-21  
**Decision Maker:** Ajay Spak  
**Review Date:** 2026-05-21

### Context

React offers two component models: class components and functional components. With React 16.8+, hooks enabled functional components to have full feature parity with classes while providing a cleaner API.

### Decision

Use **functional components exclusively**. No class components allowed in the codebase.

### Rationale

**Functional Components + Hooks Advantages:**
- Simpler code; less boilerplate (no `this`, `constructor`, `render()`)
- Better code reusability (custom hooks > render props > HOCs)
- Easier to reason about; linear data flow
- Better tree-shaking; smaller bundle size
- Modern React patterns; future-focused
- Cleaner testing; pure functions easier to test
- Better TypeScript support; fewer type gymnastics
- Consistency; all components follow same pattern

**Hooks Benefits:**
- `useState`: Local state management
- `useEffect`: Side effects and lifecycle
- `useContext`: Context consumption without render props
- `useCallback`: Event handler memoization
- `useMemo`: Expensive computation caching
- `useReducer`: Complex state logic
- Custom hooks: Reusable logic encapsulation

### Alternatives Considered

| Approach | Pros | Cons | Decision |
|----------|------|------|----------|
| **Functional + Hooks** | Modern, clean, reusable | Learning curve for hooks | ✅ Selected |
| **Class Components** | Familiar pattern; lifecycle methods clear | Verbose, this binding issues, hard to reuse logic | Rejected |
| **Mixed** (functional + class) | Flexibility | Inconsistent codebase; harder to maintain | Rejected |

### Consequences

**Positive:**
- ✅ Cleaner, more readable code
- ✅ Easier refactoring (compose functions vs. class inheritance)
- ✅ Better performance (no instance overhead)
- ✅ Smaller bundle size
- ✅ Easier testing (pure functions)
- ✅ Consistent codebase (single pattern)

**Negative:**
- ⚠️ Learning curve for team new to hooks
- ⚠️ Requires understanding of closure/scope
- ⚠️ Dependency arrays in hooks can be confusing initially
- ⚠️ Some edge cases (stale closures) require careful handling

### Implementation Notes

**Example Pattern:**
```javascript
// ✅ Preferred
const TodoItem = ({ todo, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Side effect logic
  }, [todo.id]);

  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [todo.id, onDelete]);

  return <div>{todo.text}</div>;
};

// ❌ Not Allowed
class TodoItem extends React.Component {
  state = { isEditing: false };
  render() { ... }
}
```

**Rules:**
- Hooks called at top level (not in loops/conditions)
- Dependencies array correct (ESLint plugin enforces)
- Custom hooks extracted for reusable logic
- useCallback for props handlers
- useMemo for expensive computations

### Metrics for Success

- [ ] 100% of components functional (0 class components)
- [ ] ESLint `react-hooks/rules-of-hooks` passes
- [ ] Custom hooks for shared logic (> 50% code reuse)
- [ ] No stale closure bugs in production

### Related Decisions

- ADR-001: React 18 + Vite (hooks are React 18 standard)
- ADR-003: CSS Only (simplicity focus)

### References

- [React Hooks Documentation](https://react.dev/reference/react)
- [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
- [Custom Hooks Guide](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [ESLint React Hooks Plugin](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)

---

## ADR-003: CSS Only (No Styled Components or CSS-in-JS)

**Status:** 🟢 Accepted  
**Date:** 2026-04-21  
**Decision Maker:** Ajay Spak  
**Review Date:** 2026-05-21

### Context

React projects can style components using:
1. Traditional CSS files (with imports)
2. CSS-in-JS libraries (styled-components, Emotion, etc.)
3. CSS Modules
4. Inline styles

Each has trade-offs between developer experience, bundle size, and learning curve.

### Decision

Use **traditional CSS files only**. Each component has a paired `.css` file.

**Structure:**
```
src/
├── components/
│   ├── TodoItem.jsx
│   ├── TodoItem.css
│   ├── TodoList.jsx
│   └── TodoList.css
└── styles/
    └── global.css
```

### Rationale

**CSS Advantages:**
- Zero runtime overhead; no CSS-in-JS library
- Smaller bundle size; CSS separate from JS
- Familiar to all developers (works in all projects)
- Excellent tooling support (PostCSS, Sass, etc.)
- Better CSS optimization (CSP, caching)
- Dev server fast reloads (no JS re-execution)
- Separation of concerns (content vs. presentation)
- Easy debugging (DevTools directly shows styles)

**Why Not CSS-in-JS:**
- Adds library overhead (styled-components ~16KB)
- Runtime performance cost (JS parsing/execution)
- Harder to debug (generated class names)
- Larger bundle size
- Overkill for learning project
- CSS Variables achieve most CSS-in-JS benefits

**CSS Variables (Modern Alternative to CSS-in-JS):**
```css
:root {
  --primary-color: #007bff;
  --spacing-unit: 8px;
  --transition-default: 0.3s ease;
}

.todo-item {
  color: var(--primary-color);
  padding: var(--spacing-unit);
  transition: var(--transition-default);
}
```

### Alternatives Considered

| Approach | Pros | Cons | Decision |
|----------|------|------|----------|
| **CSS Files** | Simple, performant, familiar | No dynamic styling without overhead | ✅ Selected |
| **Styled Components** | Dynamic styling, scoped | ~16KB overhead, runtime cost, debugging hard | Rejected |
| **CSS Modules** | Scoped styling, no conflicts | Webpack specific, learning curve | Rejected |
| **Sass/Less** | Variables, nesting, mixins | Requires compilation step | Optional |
| **Inline Styles** | Dynamic, simple API | Performance issues, verbosity, no hover states | Rejected |

### Consequences

**Positive:**
- ✅ Minimal bundle size (~0 CSS library overhead)
- ✅ Faster dev server (no JS parsing for styles)
- ✅ Familiar to all developers
- ✅ Easy debugging (CSS DevTools work perfectly)
- ✅ Better performance (CSS optimized separately)
- ✅ Standard best practices (CSS separation)
- ✅ CSS variables provide theming without runtime cost

**Negative:**
- ⚠️ Global namespace (naming conventions required)
- ⚠️ No automatic scoping (BEM naming used instead)
- ⚠️ Manual cleanup of unused CSS (but minifier handles)
- ⚠️ No runtime dynamic styling without workarounds (CSS variables used)

### Implementation Notes

**CSS Best Practices:**
1. **BEM Naming Convention:**
   ```css
   /* Block */
   .todo-item { }
   
   /* Element */
   .todo-item__text { }
   .todo-item__delete-btn { }
   
   /* Modifier */
   .todo-item--completed { }
   .todo-item__delete-btn--hover { }
   ```

2. **CSS Variables for Theming:**
   ```css
   :root {
     --color-primary: #007bff;
     --color-danger: #dc3545;
     --spacing: 8px;
     --border-radius: 4px;
   }
   ```

3. **Mobile-First Responsive:**
   ```css
   .todo-list { display: grid; gap: 1rem; }
   
   @media (min-width: 768px) {
     .todo-list { grid-template-columns: repeat(2, 1fr); }
   }
   ```

### Metrics for Success

- [ ] Bundle size < 50KB CSS
- [ ] No CSS naming conflicts
- [ ] CSS DevTools debugging works
- [ ] PageSpeed/Lighthouse CSS score ≥90
- [ ] Theme switching works with CSS variables

### Related Decisions

- ADR-001: React 18 + Vite (CSS can be imported directly)
- ADR-002: Functional Components (no component lifecycle in CSS)

### References

- [CSS Variables (Custom Properties)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [BEM Naming Methodology](http://getbem.com/)
- [Mobile-First Design](https://www.uxpin.com/studio/blog/a-hands-on-guide-to-mobile-first-design/)
- [WCAG Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

## Decision Review Process

### Annual Review
- [ ] Decisions reviewed: Q2 2026
- [ ] Impact assessment: Performance? Team satisfaction? New constraints?
- [ ] Supersession needed?: Technology changed? Better alternatives?

### When to Create New ADR
- Major architectural decision (framework, pattern, library)
- Decision affects multiple components
- Decision has long-term implications
- Team consensus required

### When to Update Existing ADR
- Consequences discovered post-implementation
- Related decisions made
- Status changes (Deprecated, Superseded)
- Metrics updated or new metrics added

---

## Decision Index

| ID | Title | Status | Last Reviewed |
|---|-------|--------|---------------|
| ADR-001 | React 18 + Vite | 🟢 Accepted | 2026-04-21 |
| ADR-002 | Functional Components with Hooks | 🟢 Accepted | 2026-04-21 |
| ADR-003 | CSS Only (No Styled Components) | 🟢 Accepted | 2026-04-21 |
