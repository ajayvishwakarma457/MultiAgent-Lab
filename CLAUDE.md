# MultiAgent-Lab (React Todo App)

Enterprise-grade React todo application. Learning platform for Claude Code as an AI development assistant.

**Quick Links:**
- 📋 **Detailed Standards**: `.claude/rules/` folder
- 🏗️ **Architecture**: `.claude/memory/decisions.md` (ADR)
- 📚 **Patterns**: `.claude/memory/patterns.md`
- 💡 **Learnings**: `.claude/memory/learnings.md`
- 🎯 **Hooks**: `.claude/hooks/` folder

---

## 📌 Project Overview

### Vision & Goals
- **Name**: MultiAgent-Lab (React Todo App)
- **Stack**: React 18, Vite, CSS3, Vitest
- **Node Version**: 22.x (verify: `node -v`)
- **Purpose**: Explore Claude Code as an AI development assistant; demonstrate enterprise-grade development practices

### Key Objectives
✅ Deliver production-ready todo application  
✅ Demonstrate enterprise coding standards  
✅ Showcase Claude Code capabilities  
✅ Document learnings and patterns  
✅ Maintain high code quality (80%+ test coverage)  
✅ Optimize performance (Lighthouse ≥90)  

### Project Status
- **Created**: 2026-04-21
- **Maintainer**: Ajay Spak (ajay@spakcomm.com)
- **Last Updated**: 2026-04-21
- **Repository**: MultiAgent-Lab (local)

---

## 🚀 Quick Start

### Setup
```bash
# Install dependencies
npm install

# Start development server (port 5173)
npm run dev

# Run tests
npm run test

# Build for production
npm run build

# Preview production build
npm run preview
```

### Verify Setup
```bash
node -v          # Should be v22.x
npm -v           # Should be v10+
npm run lint     # Should pass with no errors
npm run test     # Should pass all tests
```

---

## 📚 Documentation Hub

All standards documented in `.claude/` folder. Start here:

| Document | Purpose | Reference |
|----------|---------|-----------|
| **code-style.md** | Code formatting, naming, patterns | ESLint + Prettier config |
| **code-review.md** | Review checklist, severity levels | 4-tier system (🔴🟠🟡🔵) |
| **git-conventions.md** | Commits, branches, PRs | Conventional Commits |
| **react-patterns.md** | 17 React patterns with examples | Hooks, components, state |
| **testing-standards.md** | Unit/integration/component tests | 80%+ coverage target |
| **feature-development.md** | 6-phase workflow with gates | Planning → Deployment |
| **performance-optimization.md** | Metrics, budgets, monitoring | LCP<2.5s, CLS<0.1 |
| **pre-commit.md** | Automated validation pipeline | Security, quality, tests |

### Architecture & Decisions
- **decisions.md** (ADR): React 18+Vite, Functional Components, CSS-only
- **patterns.md**: Design patterns, React patterns, code organization
- **learnings.md**: Validated insights with impact scores

---

## ✅ Code Quality Standards

### Coding Style
- **Language**: JavaScript (ES2021+)
- **Components**: Functional only (no classes)
- **State**: `useState`, `useEffect`, custom hooks
- **Variables**: `const` default, `let` if reassigned, never `var`
- **Formatting**: Prettier (automatic on save, via ESLint)
- **Linting**: ESLint (enforced in pre-commit hook)

### File Organization
```
src/
├── components/           # React components (one per file)
│   ├── TodoItem/
│   │   ├── TodoItem.jsx
│   │   ├── TodoItem.css
│   │   └── TodoItem.test.js
│   ├── TodoList/
│   └── Button/
├── hooks/               # Custom hooks (reusable logic)
│   ├── useTodoForm.js
│   ├── useLocalStorage.js
│   └── useFetch.js
├── utils/              # Utility functions (no React)
│   ├── validators.js
│   ├── dateFormatter.js
│   └── api.js
├── styles/            # Global styles
│   ├── global.css
│   ├── variables.css
│   └── animations.css
└── App.jsx
```

### Component Standards
- ✅ Functional components with hooks only
- ✅ Props destructured in function signature
- ✅ Max 200 lines per component
- ✅ JSDoc for complex logic
- ✅ Paired CSS file (imported in component)
- ✅ One component per file
- ✅ Index files for clean imports

### CSS Standards
- ✅ **BEM Naming**: `.block`, `.block__element`, `.block--modifier`
- ✅ **Variables**: `--primary-color`, `--spacing-md`, etc.
- ✅ **Mobile-First**: Base styles mobile; media queries for expansion
- ✅ **Responsive**: Breakpoints at 768px, 1024px
- ✅ **Accessibility**: 4.5:1 contrast ratio (WCAG AA)
- ✅ **Performance**: GPU-accelerated transforms/opacity only

### JavaScript Standards
- ✅ Arrow functions preferred
- ✅ Template literals for strings (backticks)
- ✅ Destructuring for objects and arrays
- ✅ No console.log in production code
- ✅ No inline styles (use CSS classes)
- ✅ No magic numbers (use constants)
- ✅ Max line length: 80 characters (enforced by Prettier)

### React Patterns
See [react-patterns.md](./.claude/rules/react-patterns.md) for 17 detailed patterns:
- ✅ Hooks at top level (non-negotiable)
- ✅ useEffect with correct dependencies
- ✅ useCallback for event handlers (props)
- ✅ useMemo for expensive computations
- ✅ Custom hooks for logic extraction
- ✅ React.memo for list items
- ✅ Error boundaries for error handling
- ✅ Suspense for code splitting

### Performance Goals
| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse Score | ≥90 | Chrome DevTools |
| LCP (Largest Contentful Paint) | <2.5s | Web Vitals |
| FID (First Input Delay) | <100ms | Web Vitals |
| CLS (Cumulative Layout Shift) | <0.1 | Web Vitals |
| Bundle Size (gzipped) | <300KB | webpack-bundle-analyzer |
| Test Coverage | 80%+ | Vitest |

---

## 🧪 Testing Requirements

**Coverage Targets:**
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

**Test Types:**
- ✅ Unit tests (70%): Pure functions, utilities
- ✅ Component tests (15%): Rendering, interactions
- ✅ Integration tests (15%): Multi-component flows

**Run Tests:**
```bash
npm run test              # Run all tests
npm run test:watch       # Watch mode (re-run on change)
npm run test:coverage    # Coverage report
npm run test -- --grep "pattern"  # Run matching tests
```

**Best Practices:**
- Test user behavior, not implementation
- Use `getByRole` (accessible, user-centric)
- Mock only external dependencies
- Test both success and error paths
- No over-mocking or excessive snapshots

See [testing-standards.md](./.claude/rules/testing-standards.md) for complete patterns.

---

## 🚫 Code Anti-Patterns (NEVER DO)

| Anti-Pattern | Why Not | Fix |
|--------------|---------|-----|
| **Inline styles** | Performance, maintainability | Use CSS classes |
| **console.log** | Leaves debug code | Remove before commit (pre-commit hook) |
| **Hardcoded values** | Configuration inflexible | Use constants, env vars |
| **Direct DOM manipulation** | Not React way | Use state instead |
| **Class components** | Outdated pattern | Use functional + hooks |
| **var keyword** | Function-scoped, hoisting issues | Use const/let |
| **Array indices as keys** | Poor performance | Use stable, unique IDs |
| **Functions in JSX** | New function every render | Use useCallback |
| **Creating objects in render** | Causes re-renders | Move outside, use useMemo |
| **Missing dependencies** | Stale closures, bugs | Include all deps in array |

---

## 📋 Git Workflow

### Commit Format
```
type(scope): subject

body (optional)

footer (optional)
```

### Types (Conventional Commits)
- **feat**: New feature (user-facing)
- **fix**: Bug fix
- **refactor**: Code improvement (no behavior change)
- **perf**: Performance optimization
- **test**: Tests only
- **docs**: Documentation
- **style**: Formatting (usually auto-applied)
- **chore**: Maintenance
- **ci**: CI/CD changes

### Example
```
feat(todo): add priority filter

- Add filter dropdown to todo list
- Sort todos by priority (high, medium, low)
- Save filter selection to localStorage

Closes #42
```

### Branch Naming
- **Feature**: `feature/todo-priority-filter`
- **Bug Fix**: `fix/api-timeout-handling`
- **Docs**: `docs/api-guide`
- **Hotfix**: `hotfix/security-vulnerability`

**Rules:**
- Lowercase, hyphens (not underscores)
- Descriptive (not "feature/stuff")
- Reference ticket if available

### Before Committing
✅ Run `npm run test` (tests pass)  
✅ Run `npm run lint` (no errors)  
✅ No console.log or debugger  
✅ No hardcoded values  
✅ Meaningful commit message  

See [git-conventions.md](./.claude/rules/git-conventions.md) for complete details.

---

## 🔄 Development Workflow

### Feature Development
1. **Planning**: Understand requirements, estimate effort, identify risks
2. **Implementation**: Write code following standards, add tests
3. **Testing**: Unit tests + integration tests (80%+ coverage)
4. **Code Review**: Peer review, address feedback
5. **Commit**: Meaningful commit message, atomic commits
6. **Deployment**: CI/CD validation, production release

See [feature-development.md](./.claude/hooks/feature-development.md) for 6-phase workflow.

### Code Review
- **Severity Levels**: 🔴 Blocker, 🟠 High, 🟡 Medium, 🔵 Low
- **SLAs**: Critical (immediate), High (24h), Medium (48h)
- **Checklist**: Use [code-review.md](./.claude/rules/code-review.md)
- **Approval**: 2 reviewers (1 for docs)

### Pre-Commit Validation (Automated)
✅ ESLint + Prettier (formatting, style)  
✅ npm audit (dependency security)  
✅ npm run test (all tests passing)  
✅ npm run build (production build works)  
✅ Commitlint (commit message format)  

**Setup**: Husky + lint-staged (configured in package.json)

---

## 🏗️ Architecture & Decisions

### Key Decisions (ADR)
- **ADR-001**: React 18 + Vite (fast dev, quick builds)
- **ADR-002**: Functional Components (modern, hooks-based)
- **ADR-003**: CSS Only (no CSS-in-JS overhead)

See [decisions.md](./.claude/memory/decisions.md) for full architectural records.

### Design Patterns
6 main patterns documented in [patterns.md](./.claude/memory/patterns.md):
1. Component-Driven Architecture
2. Custom Hooks for Logic Extraction
3. Composition Over Props Drilling
4. Behavior-Driven Testing
5. BEM + CSS Variables
6. Index Files for Clean Imports

Plus 17 React patterns in [react-patterns.md](./.claude/rules/react-patterns.md).

---

## 📊 Project Metrics

### Code Quality
- **Test Coverage**: 80%+ (unit, component, integration)
- **Lighthouse Score**: ≥90 (performance, accessibility, best practices)
- **Code Review**: All changes reviewed, 2 approvals
- **Linting**: 0 errors, 0 warnings

### Performance
- **Bundle Size**: <300KB (gzipped)
- **LCP**: <2.5 seconds
- **FID**: <100 milliseconds
- **CLS**: <0.1
- **Dev Server Startup**: <500ms
- **HMR Update**: <100ms

### Development Velocity
- **Feature Cycle**: Planning → Deployment (2-5 days)
- **Code Review Turnaround**: 24 hours (high priority)
- **Test Execution**: <5 seconds (all tests)
- **Build Time**: <3 seconds (production)

---

## 🔧 Troubleshooting

### Dev Server Not Starting
```bash
# Clear cache
rm -rf node_modules/.vite

# Reinstall
npm install

# Restart server
npm run dev
```

### Tests Failing
```bash
# Clear test cache
npm run test -- --clearCache

# Run specific test in debug mode
npm run test -- --inspect-brk Counter.test.js
```

### Linting Issues
```bash
# Auto-fix lint errors
npm run lint -- --fix

# Format code
npm run format
```

### Bundle Size Increased
```bash
# Analyze bundle
npm run analyze

# Check for duplicates
npm ls

# Consider code splitting or lazy loading
```

---

## 📚 Learning Resources

### Within This Project
- **Decisions**: Why we chose certain technologies/patterns
- **Learnings**: Validated insights and best practices
- **Patterns**: Design patterns with code examples
- **Hooks**: Git hooks for automation and validation

### External References
- [React Docs](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG 2.1 Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🤝 Contributing

### Before Working on a Feature
1. Read the relevant standards document
2. Check existing patterns in [patterns.md](./.claude/memory/patterns.md)
3. Review recent learnings in [learnings.md](./.claude/memory/learnings.md)
4. Plan using 6-phase workflow from [feature-development.md](./.claude/hooks/feature-development.md)

### During Development
- Follow code style from [code-style.md](./.claude/rules/code-style.md)
- Use React patterns from [react-patterns.md](./.claude/rules/react-patterns.md)
- Write tests following [testing-standards.md](./.claude/rules/testing-standards.md)
- Optimize performance per [performance-optimization.md](./.claude/hooks/performance-optimization.md)

### Before Submitting
- Run pre-commit validation (automatic via Husky)
- Follow code review checklist from [code-review.md](./.claude/rules/code-review.md)
- Use commit format from [git-conventions.md](./.claude/rules/git-conventions.md)

---

## 📞 Contact & Support

- **Project Lead**: Ajay Spak (ajay@spakcomm.com)
- **Issues**: Track in CLAUDE.md under "Known Issues"
- **Documentation**: See `.claude/` folder
- **Learnings**: See `.claude/memory/learnings.md`

---

## 📋 Quick Reference Checklists

### Before Committing
- [ ] Tests passing (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] No console.log/debugger
- [ ] Components <200 lines
- [ ] Props destructured
- [ ] CSS uses variables
- [ ] Accessibility checked (4.5:1 contrast, keyboard navigation)
- [ ] Meaningful commit message

### Before Creating PR
- [ ] All changes committed
- [ ] Branch up-to-date with main
- [ ] PR description filled out
- [ ] Related issues linked
- [ ] Accessibility standards met
- [ ] Performance targets met

### Before Deployment
- [ ] Code reviewed (2 approvals)
- [ ] All tests passing
- [ ] Bundle size acceptable
- [ ] Performance targets met (Lighthouse ≥90)
- [ ] Accessibility audit complete
- [ ] Documentation updated
- [ ] Changelog entry added

---

## 📜 License & Compliance

- **Type**: Learning project (internal)
- **Compliance**: WCAG 2.1 AA (accessibility)
- **Security**: No hardcoded secrets, sanitized inputs
- **Performance**: Monitor Core Web Vitals

---

## 🎯 Success Criteria

Project is production-ready when:
- ✅ 80%+ test coverage (all test types)
- ✅ Lighthouse score ≥90
- ✅ Core Web Vitals targets met (LCP<2.5s, FID<100ms, CLS<0.1)
- ✅ All accessibility standards met (WCAG 2.1 AA)
- ✅ Zero console errors/warnings
- ✅ Bundle size <300KB (gzipped)
- ✅ Code review completed (2 approvals)
- ✅ Documentation complete

**Current Status**: 🟡 In Progress

---

## 📖 Version History

| Date | Version | Changes |
|------|---------|---------|
| 2026-04-21 | 1.0 | Initial enterprise-grade documentation setup |

---

**Last Updated**: 2026-04-21  
**Documentation Revision**: Enterprise Grade  
**Status**: ✅ Complete
