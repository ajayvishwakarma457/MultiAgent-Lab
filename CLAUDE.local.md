# MultiAgent-Lab (React Todo App) - Local Overrides

> **Note:** This file contains local-specific configurations and overrides for CLAUDE.md.
> Edit this file for machine-specific or session-specific settings without affecting team standards.

## Local Development Overrides

### Development Environment
- **Node Version**: 22.x (verify with `node -v`)
- **Package Manager**: npm
- **Dev Server Port**: 5173 (default Vite)
- **API Base URL**: http://localhost:3000

### IDE & Tools
- **Editor**: VS Code with Extensions:
  - ES7+ React/Redux/React-Native snippets
  - ESLint
  - Prettier
  - Thunder Client (API testing)

### Local Testing Setup
- **Framework**: Vitest
- **Test Runner**: npm run test
- **Coverage**: npm run test:coverage
- **Watch Mode**: npm run test:watch

---

## Performance Tuning (Local)

### Build Output
- **Analyzer**: `npm run analyze` to check bundle size locally
- **Dev Server**: Already optimized with Vite HMR
- **Cache Busting**: CSS/JS auto-updated on file changes

### React DevTools
- Install React DevTools browser extension for debugging
- Use Profiler tab to identify render bottlenecks

---

## Debugging & Troubleshooting

### Common Local Issues
- **Port 5173 in use**: Kill process with `lsof -i :5173` → `kill -9 <PID>`
- **Module not found**: Run `npm install` to ensure dependencies
- **Stale cache**: Clear `node_modules/.vite` folder

### Environment Variables
Create `.env.local` (git-ignored) for sensitive data:
```
VITE_API_URL=http://localhost:3000
VITE_DEBUG=true
```

---

## Git Workflow (Local Preferences)

### Branch Naming Convention (Optional)
- Features: `feature/todo-priority-filter`
- Bugs: `fix/todo-delete-bug`
- Docs: `docs/api-guide`

### Before Pushing
- [ ] Run `npm run lint` locally
- [ ] Run `npm run test` - all passing
- [ ] Test in browser manually
- [ ] Commit messages follow format

---

## Notes & Decisions
- **Decision**: Using Vite for fast development (confirmed)
- **Decision**: Functional components only (confirmed)
- **Learning**: Claude Code is excellent for exploratory development

---

## Quick Commands

```bash
# Development
npm run dev        # Start dev server
npm run lint       # Run ESLint
npm run format     # Format code with Prettier

# Testing
npm run test       # Run all tests
npm run test:ui    # Vitest UI

# Production
npm run build      # Create production build
npm run preview    # Preview production build
npm run analyze    # Analyze bundle size
```

---

## Contact & Resources
- **Email**: ajay@spakcomm.com
- **Project Date**: 2026-04-21
