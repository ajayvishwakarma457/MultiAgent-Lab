# Complete .claude/ Folder Structure for MultiAgent-Lab

## Full Directory Tree

```
MultiAgent-Lab/
├── .claude/
│   ├── settings.json                    # Global project settings
│   ├── settings.local.json              # Local overrides (gitignored)
│   ├── CLAUDE.md                        # Project standards & coding rules
│   │
│   ├── commands/                        # Custom slash commands
│   │   ├── review.md                    # /project:review command
│   │   ├── fix-issue.md                 # /project:fix-issue command
│   │   ├── deploy.md                    # /project:deploy command
│   │   └── README.md                    # Commands documentation
│   │
│   ├── rules/                           # Modular instruction files
│   │   ├── code-style.md                # Coding standards
│   │   ├── react-patterns.md            # React best practices
│   │   ├── testing-standards.md         # Testing requirements
│   │   ├── git-conventions.md           # Git commit formats
│   │   ├── api-conventions.md           # API naming conventions
│   │   └── README.md                    # Rules documentation
│   │
│   ├── hooks/                           # Custom workflows
│   │   ├── pre-commit.md                # Pre-commit validation
│   │   ├── feature-development.md       # Feature workflow
│   │   ├── bug-fix.md                   # Bug fix process
│   │   ├── performance-optimization.md  # Performance workflow
│   │   ├── code-review.md               # Code review checklist
│   │   └── README.md                    # Hooks documentation
│   │
│   ├── skills/                          # Auto-invoked workflows
│   │   ├── SKILL.md                     # Skill definition
│   │   └── security-review/             # Security skill
│   │       └── SKILL.md
│   │
│   ├── agents/                          # Subagent personas
│   │   ├── code-reviewer.md             # Code reviewer agent
│   │   ├── security-auditor.md          # Security auditor agent
│   │   └── README.md                    # Agents documentation
│   │
│   ├── memory/                          # Project memory storage
│   │   ├── decisions.md                 # Architecture decisions
│   │   ├── patterns.md                  # Discovered patterns
│   │   └── learnings.md                 # Project learnings
│   │
│   └── .gitignore                       # Don't commit sensitive files
│
├── CLAUDE.md                            # Project-level standards (root)
├── MultiAgent-Lab-Architecture.md       # Architecture documentation
├── package.json
├── vite.config.js
├── src/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   └── index.jsx
└── ... (other project files)
```

---

## File-by-File Setup

### 1. `.claude/settings.json`

```json
{
  "model": "haiku",
  "voiceEnabled": true,
  "voice": {
    "enabled": true,
    "mode": "hold"
  },
  "defaultMode": "auto",
  "mcpServers": {
    "web-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-web-search"]
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  },
  "permissions": {
    "allow": [
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(npm run *)",
      "Bash(git rm *)",
      "Bash(git push *)",
      "Bash(timeout 5 npx -y @modelcontextprotocol/server-web-search)",
      "Bash(timeout 5 npx -y @modelcontextprotocol/server-fetch)",
      "Bash(npm search *)"
    ]
  }
}
```

---

### 2. `.claude/settings.local.json` (Gitignored)

```json
{
  "defaultMode": "auto",
  "mcpServers": {
    "web-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-web-search"]
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  },
  "permissions": {
    "allow": [
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(npm run *)",
      "Bash(git rm *)",
      "Bash(git push *)",
      "Bash(timeout 5 npx -y @modelcontextprotocol/server-web-search)",
      "Bash(timeout 5 npx -y @modelcontextprotocol/server-fetch)"
    ]
  }
}
```

---

### 3. `.claude/CLAUDE.md` (Project Standards)

```markdown
# MultiAgent-Lab: React Todo App

## Project Overview
- **Name**: MultiAgent-Lab
- **Purpose**: Learning Claude Code as an AI agent tool
- **Stack**: React 18, Vite, CSS3
- **Node Version**: 22.x
- **Focus**: Exploring AI agents, not production

## Development Standards

### React Components
- Functional components only (no classes)
- Use hooks: useState, useEffect, useCallback, useMemo
- Max 200 lines per component
- Destructure props in function signature
- Use React.memo for list items
- PropTypes or TypeScript for props

### Code Quality
- Prefer const > let > var
- Use arrow functions
- Add JSDoc for complex logic
- No console.log in production code
- No magic numbers (use named constants)
- No hardcoded values

### File Structure
```
src/
├── components/       # React components
├── hooks/           # Custom hooks
├── utils/           # Utility functions
├── styles/          # CSS files
└── App.jsx
```

### CSS Best Practices
- Use CSS variables (--primary-color, --secondary-color, etc)
- Mobile-first responsive design
- Smooth transitions: 0.3s ease
- Accessibility: WCAG AA (4.5:1 contrast)
- No inline styles (use CSS classes)

### Git & Commits
- Format: type(scope): message
- Types: feat, fix, refactor, style, test, docs
- Example: "feat(todo): add priority filter"
- One feature per commit
- Reference what changed and why

### Testing
- Test critical features
- Aim for 80%+ coverage
- Descriptive test names
- Unit + integration tests

### Performance
- Lazy load heavy components
- Memoize expensive computations
- Monitor bundle size
- Minimize re-renders

### Do NOT Do
- No hardcoded values
- No direct DOM manipulation
- No console.log in final code
- No external UI libraries (keep it simple)
- No mixing styling approaches

## MCP Servers Configured
- web-search: Search the web
- fetch: Read content from URLs

## Permission Mode
- Default: auto (smart classifier)
- Can switch with Shift+Tab

## Memory System
- Rules in ~/.claude/rules/
- Hooks in .claude/hooks/
- Commands in .claude/commands/
```

---

### 4. `.claude/commands/review.md`

```markdown
---
name: "Code Review"
description: "Run automated code review on the project"
trigger: "/project:review"
---

# Code Review Command

Perform comprehensive code review:

## Quality Checks
1. **Bugs** - Logical errors, edge cases
2. **Performance** - Unnecessary re-renders, inefficient code
3. **Accessibility** - ARIA labels, keyboard navigation
4. **Code Style** - DRY principle, naming conventions
5. **Best Practices** - React patterns, error handling
6. **Security** - Input validation, data handling

## Output Format
- List issues with severity (Critical/High/Medium/Low)
- Suggest fixes for each issue
- Ask which ones to implement
- Auto-implement approved fixes
- Commit with meaningful message
```

---

### 5. `.claude/commands/fix-issue.md`

```markdown
---
name: "Fix Issue"
description: "Debug and fix reported issues"
trigger: "/project:fix-issue"
---

# Fix Issue Command

When Claude Code encounters a problem:

## Process
1. **Understand** - Read error message carefully
2. **Trace** - Find root cause in code
3. **Fix** - Implement the fix
4. **Test** - Verify the fix works
5. **Document** - Explain what was wrong and why

## Output
- Clear description of the issue
- Root cause analysis
- Solution implemented
- Tests passing
- Commit explaining the fix
```

---

### 6. `.claude/commands/deploy.md`

```markdown
---
name: "Deploy"
description: "Prepare and deploy the application"
trigger: "/project:deploy"
---

# Deploy Command

When deploying to production:

## Pre-Deploy Checklist
- [ ] All tests pass
- [ ] No console.log in production code
- [ ] Environment variables configured
- [ ] No secrets in code
- [ ] Bundle optimized
- [ ] Performance acceptable

## Build Process
1. Run tests
2. Build production bundle
3. Check bundle size
4. Generate build report
5. Ready for deployment

## Post-Deploy
- Verify deployed version
- Check for errors
- Monitor performance
- Document deployment
```

---

### 7. `.claude/rules/code-style.md`

```markdown
---
name: "Code Style Standards"
description: "Coding style and formatting rules"
---

# Code Style Standards

## JavaScript
- Use const by default
- Use let only when reassignment needed
- Arrow functions preferred
- Template literals for strings
- No semicolons (or always use them - be consistent)
- Max line length: 80 characters

## React
- Functional components only
- Hooks at top level
- Destructure props
- PropTypes for validation
- Component naming: PascalCase
- Variable naming: camelCase

## CSS
- BEM naming convention
- Variables for colors
- Organize by component
- No !important unless necessary
- Mobile-first approach

## Comments
- JSDoc for functions
- Explain WHY, not WHAT
- No commented-out code
- Keep comments updated
```

---

### 8. `.claude/rules/react-patterns.md`

```markdown
---
name: "React Patterns & Best Practices"
description: "Preferred React patterns for all projects"
---

# React Patterns

## Hooks Rules
1. Call at top level only
2. useCallback for event handlers
3. useMemo for expensive computations
4. useEffect cleanup functions
5. Custom hooks for reusable logic

## Component Patterns
- Functional components always
- Props destructuring
- Error boundaries
- Suspense for code splitting
- Lazy loading for heavy components

## State Management
- useState for local state
- Context for app-wide state
- Custom hooks for complex logic
- No prop drilling beyond 2 levels

## Performance
- React.memo for list items
- Code splitting with lazy()
- Image optimization
- Batch API calls
```

---

### 9. `.claude/rules/testing-standards.md`

```markdown
---
name: "Testing Standards"
description: "Quality testing requirements"
---

# Testing Standards

## Unit Tests
- Test individual functions
- Test edge cases
- Mock external dependencies
- Aim for 100% coverage of business logic

## Component Tests
- Props validation
- User interactions
- Conditional rendering
- Event handlers

## Integration Tests
- Multiple components together
- State management
- Async operations
- Data flow

## Test Naming
- Format: "should [expected] when [condition]"
- Example: "should show error when email invalid"

## Coverage Targets
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+
```

---

### 10. `.claude/rules/git-conventions.md`

```markdown
---
name: "Git Conventions"
description: "Git commit and branching standards"
---

# Git Conventions

## Commit Message Format
```
type(scope): subject

body (optional)

footer (optional)
```

## Types
- **feat**: New feature
- **fix**: Bug fix
- **refactor**: Code refactor
- **style**: Formatting, style
- **test**: Adding tests
- **docs**: Documentation
- **chore**: Maintenance

## Examples
- feat(todo): add priority filter
- fix(api): handle network timeout
- refactor(components): extract TodoItem
- style(css): update color variables
- test(hooks): add useState tests

## Branch Naming
- feature/[name]
- bugfix/[name]
- refactor/[name]
- docs/[name]

## Pull Requests
- Clear title and description
- Reference related issues
- Link to documentation
- Include screenshots if UI changes
```

---

### 11. `.claude/hooks/pre-commit.md`

```markdown
---
name: "Pre-Commit Check"
description: "Validates code before committing"
trigger: "before-git-commit"
---

# Pre-Commit Validation

## Code Quality
- No console.log in production
- No hardcoded values
- No TODO without context
- No unused imports

## Tests
- Run: npm run test
- All tests pass
- Coverage >= 80%

## Lint
- Run: npm run lint
- No warnings
- No unused variables

## Type Checking
- No untyped variables
- No any types without justification

## Commit Message
- Format: type(scope): message
- Clear and descriptive
- References issues if applicable
```

---

### 12. `.claude/hooks/feature-development.md`

```markdown
---
name: "Feature Development Workflow"
description: "Structured feature development process"
trigger: "manual"
---

# Feature Development Process

## 1. Planning Phase
- Understand requirements
- Break into smaller tasks
- Plan component structure
- Identify edge cases
- Design data flow

## 2. Implementation Phase
- Create components following standards
- Add proper error handling
- Write documentation
- Add JSDoc comments
- Follow CLAUDE.md rules

## 3. Testing Phase
- Write unit tests
- Test user interactions
- Test edge cases
- Verify accessibility
- Manual browser testing

## 4. Review Phase
- Code review checklist
- Performance check
- Accessibility audit
- Documentation complete
- All tests passing

## 5. Commit Phase
- Clear commit message
- Reference issues
- Document changes
- Ready for merge
```

---

### 13. `.claude/hooks/bug-fix.md`

```markdown
---
name: "Bug Fix Workflow"
description: "Systematic approach to fixing bugs"
trigger: "manual"
---

# Bug Fix Process

## 1. Reproduce
- Understand how to reproduce
- Write failing test case
- Confirm bug exists
- Document steps

## 2. Analyze
- Trace issue through code
- Identify root cause
- Check for similar issues
- Understand impact

## 3. Fix
- Implement minimal fix
- No side effects
- Keep changes focused
- Document the fix

## 4. Verify
- Original bug fixed
- No new bugs introduced
- All tests pass
- Edge cases handled

## 5. Document
- Clear commit message
- Explain root cause
- Reference issue
- Prevent similar bugs
```

---

### 14. `.claude/hooks/performance-optimization.md`

```markdown
---
name: "Performance Optimization"
description: "Check and optimize application performance"
trigger: "manual"
---

# Performance Optimization Checklist

## Bundle Size
- Analyze: npm run analyze
- Check unused dependencies
- Code splitting implemented
- Lazy loading where applicable

## React Performance
- No unnecessary re-renders
- React.memo on list items
- useCallback for handlers
- useMemo for expensive computations

## Network
- Images optimized
- API calls batched
- Caching implemented
- No waterfall requests

## Runtime
- No memory leaks
- Efficient algorithms
- Minimal DOM operations
- Event listeners cleaned up

## Monitoring
- Performance metrics tracked
- Core Web Vitals good
- Load time acceptable
- User experience smooth
```

---

### 15. `.claude/hooks/code-review.md`

```markdown
---
name: "Code Review Checklist"
description: "Comprehensive code review process"
trigger: "manual"
---

# Code Review Process

## Functionality
- Does it work as intended?
- All edge cases handled?
- Error handling present?
- User feedback clear?

## Code Quality
- Follows CLAUDE.md standards?
- DRY principle applied?
- Functions have single responsibility?
- Variable names descriptive?

## Performance
- No unnecessary re-renders?
- Efficient algorithms used?
- Bundle size acceptable?
- No memory leaks?

## Testing
- Sufficient test coverage?
- Edge cases tested?
- Integration tests present?
- All tests passing?

## Documentation
- Code comments clear?
- JSDoc present?
- README updated?
- API documented?

## Security
- Input validation present?
- No secrets in code?
- Dependencies secure?
- XSS/CSRF prevention?

## Accessibility
- Semantic HTML used?
- ARIA labels present?
- Keyboard navigation works?
- Color contrast sufficient?
```

---

### 16. `.claude/agents/code-reviewer.md`

```markdown
---
name: "Code Reviewer Agent"
description: "Specialized agent for code reviews"
---

# Code Reviewer Agent

## Role
Provide thorough, professional code reviews

## Responsibilities
- Analyze code for quality
- Check against standards
- Identify bugs and improvements
- Suggest refactoring
- Verify tests are adequate

## Communication Style
- Clear and constructive
- Explain reasoning
- Suggest solutions
- Be encouraging

## Expertise Areas
- React patterns
- JavaScript best practices
- Testing strategies
- Performance optimization
- Code organization
```

---

### 17. `.claude/agents/security-auditor.md`

```markdown
---
name: "Security Auditor Agent"
description: "Specialized agent for security reviews"
---

# Security Auditor Agent

## Role
Identify and prevent security vulnerabilities

## Responsibilities
- Check for OWASP vulnerabilities
- Verify input validation
- Check authentication/authorization
- Identify data exposure risks
- Review dependency security

## Expertise Areas
- Web security
- Data protection
- Secure coding practices
- Vulnerability detection
- Security best practices
```

---

### 18. `.claude/memory/decisions.md`

```markdown
# Architecture Decisions

## Decision 1: React + Vite
- **Date**: 2026-04-21
- **Reason**: Fast development, quick builds
- **Trade-offs**: Smaller ecosystem than Create React App
- **Status**: Confirmed

## Decision 2: Functional Components Only
- **Date**: 2026-04-21
- **Reason**: Modern React, hooks are powerful
- **Trade-offs**: Not compatible with old class patterns
- **Status**: Confirmed

## Decision 3: CSS Only (No Styled Components)
- **Date**: 2026-04-21
- **Reason**: Keep it simple, faster learning
- **Trade-offs**: Less dynamic styling
- **Status**: Confirmed
```

---

### 19. `.claude/memory/patterns.md`

```markdown
# Discovered Patterns

## Pattern 1: Component Organization
- One component per file
- Related styles in same folder
- Clear file naming

## Pattern 2: State Management
- useState for local state
- Custom hooks for complex logic
- No prop drilling

## Pattern 3: Testing
- Test behavior, not implementation
- Mock external dependencies
- Test user interactions
```

---

### 20. `.claude/.gitignore`

```
# Local settings (personal preferences)
settings.local.json
/.claude/commands/personal/
/.claude/rules/personal/

# Sensitive data
.env.local
.env*.local
secrets/
*.key
*.pem

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/

# Build artifacts
dist/
build/
*.tsbuildinfo
```

---

## Setup Instructions

### Quick Setup (Copy-Paste)

```bash
cd MultiAgent-Lab

# Create folder structure
mkdir -p .claude/commands
mkdir -p .claude/rules
mkdir -p .claude/hooks
mkdir -p .claude/skills
mkdir -p .claude/agents
mkdir -p .claude/memory

# Create all files (paste content above)
# Start with settings.json and CLAUDE.md
# Then add rules, commands, hooks, agents

# Verify structure
ls -la .claude/
```

### Commit to Git

```bash
git add .claude/
git add CLAUDE.md
git commit -m "feat: add complete Claude Code configuration"
git push origin main
```

---

## How to Use This Structure

### Daily Development

```
Ask Claude: "Add a new feature to the Todo App"
→ Claude reads CLAUDE.md for standards
→ Claude reads .claude/rules/ for patterns
→ Claude follows feature development hook
→ Feature created with proper structure
```

### Code Review

```
Ask Claude: "/project:review"
→ Claude runs code review
→ Identifies issues
→ Suggests fixes
→ Auto-implements approved changes
```

### Bug Fixing

```
Ask Claude: "/project:fix-issue"
→ Claude analyzes bug
→ Finds root cause
→ Fixes systematically
→ Tests and documents
```

---

## Benefits

✅ **Consistency** - Everyone follows same standards  
✅ **Quality** - Automated checks and reviews  
✅ **Documentation** - Clear processes and decisions  
✅ **Memory** - Claude remembers preferences  
✅ **Speed** - Workflows automate common tasks  
✅ **Scalability** - Structure works for growing projects  

---

## Next Steps

1. Create all files with content above
2. Customize to your preferences
3. Commit to git
4. Test each command/hook
5. Add more as needed
6. Document any new patterns
