# MultiAgent-Lab: React Todo App

## Project Overview
- **Name**: MultiAgent-Lab
- **Purpose**: Learning Claude Code as an AI agent tool
- **Stack**: React 18, Vite, CSS3
- **Node Version**: 22.x

## Development Standards

### React Components
- Functional components only (no classes)
- Use hooks: useState, useEffect, useCallback, useMemo
- Max 200 lines per component
- Destructure props in function signature
- PropTypes or TypeScript for props

### Code Quality
- Prefer const > let > var
- Use arrow functions
- Add JSDoc for complex functions
- No console.log in production code
- No hardcoded values

### File Structure
```
src/
├── components/
├── hooks/
├── utils/
├── styles/
└── App.jsx
```

### CSS Best Practices
- Use CSS variables
- Mobile-first responsive design
- Smooth transitions: 0.3s ease
- Accessibility: WCAG AA (4.5:1 contrast)
- No inline styles

### Git Commits
- Format: type(scope): message
- Types: feat, fix, refactor, style, test, docs
- Example: "feat(todo): add priority filter"

### Performance
- Lazy load heavy components
- Memoize expensive computations
- Monitor bundle size
- Minimize re-renders

### Testing
- Test critical features
- Aim for 80%+ coverage
- Descriptive test names

## MCP Servers
- web-search: Search the web
- fetch: Read content from URLs

## Permission Mode
- Default: auto (smart classifier)
