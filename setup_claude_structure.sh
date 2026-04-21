#!/bin/bash

# Complete .claude Folder Setup Script for MultiAgent-Lab
# Run this in your project root to set up the entire structure

echo "🚀 Setting up complete .claude folder structure..."

# Create main directories
mkdir -p .claude/commands
mkdir -p .claude/rules
mkdir -p .claude/hooks
mkdir -p .claude/skills/security-review
mkdir -p .claude/agents
mkdir -p .claude/memory

echo "✅ Created folder structure"

# Create settings.json
cat > .claude/settings.json << 'EOF'
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
EOF

echo "✅ Created settings.json"

# Create settings.local.json
cat > .claude/settings.local.json << 'EOF'
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
EOF

echo "✅ Created settings.local.json"

# Create CLAUDE.md
cat > .claude/CLAUDE.md << 'EOF'
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
EOF

echo "✅ Created CLAUDE.md"

# Create commands
cat > .claude/commands/review.md << 'EOF'
---
name: "Code Review"
description: "Run automated code review"
trigger: "/project:review"
---

# Code Review Command

Perform comprehensive code review:

## Quality Checks
1. **Bugs** - Logical errors, edge cases
2. **Performance** - Unnecessary re-renders
3. **Accessibility** - ARIA labels, keyboard nav
4. **Code Style** - DRY principle, naming
5. **Best Practices** - React patterns, error handling
6. **Security** - Input validation, data handling

## Output Format
- List issues with severity (Critical/High/Medium/Low)
- Suggest fixes for each issue
- Ask which ones to implement
- Auto-implement approved fixes
EOF

cat > .claude/commands/fix-issue.md << 'EOF'
---
name: "Fix Issue"
description: "Debug and fix reported issues"
trigger: "/project:fix-issue"
---

# Fix Issue Command

When encountering a problem:

## Process
1. **Understand** - Read error message carefully
2. **Trace** - Find root cause in code
3. **Fix** - Implement the fix
4. **Test** - Verify the fix works
5. **Document** - Explain what was wrong

## Output
- Description of the issue
- Root cause analysis
- Solution implemented
- Tests passing
EOF

cat > .claude/commands/deploy.md << 'EOF'
---
name: "Deploy"
description: "Prepare and deploy application"
trigger: "/project:deploy"
---

# Deploy Command

Pre-deploy checklist:
- All tests pass
- No console.log in production
- Environment variables configured
- Bundle optimized
- Performance acceptable

Build and deploy process.
EOF

echo "✅ Created commands"

# Create rules
cat > .claude/rules/code-style.md << 'EOF'
---
name: "Code Style Standards"
description: "Coding style and formatting"
---

# Code Style Standards

## JavaScript
- Use const by default
- Arrow functions preferred
- Template literals for strings
- Max line length: 80 characters

## React
- Functional components only
- Hooks at top level
- Destructure props
- Component naming: PascalCase

## CSS
- BEM naming convention
- Variables for colors
- Organize by component
- Mobile-first approach
EOF

cat > .claude/rules/react-patterns.md << 'EOF'
---
name: "React Patterns"
description: "Preferred React patterns"
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

## State Management
- useState for local state
- Context for app-wide state
- Custom hooks for complex logic
EOF

cat > .claude/rules/testing-standards.md << 'EOF'
---
name: "Testing Standards"
description: "Quality testing requirements"
---

# Testing Standards

## Unit Tests
- Test individual functions
- Test edge cases
- Mock external dependencies

## Component Tests
- Props validation
- User interactions
- Conditional rendering

## Integration Tests
- Multiple components together
- State management
- Async operations

## Coverage Targets
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+
EOF

cat > .claude/rules/git-conventions.md << 'EOF'
---
name: "Git Conventions"
description: "Git commit and branching"
---

# Git Conventions

## Commit Format
type(scope): subject

## Types
- feat: New feature
- fix: Bug fix
- refactor: Code refactor
- style: Formatting
- test: Tests
- docs: Documentation

## Examples
- feat(todo): add priority filter
- fix(api): handle timeout
- refactor(components): extract TodoItem
EOF

echo "✅ Created rules"

# Create hooks
cat > .claude/hooks/pre-commit.md << 'EOF'
---
name: "Pre-Commit Check"
description: "Validates code before committing"
trigger: "before-git-commit"
---

# Pre-Commit Validation

## Code Quality
- No console.log in production
- No hardcoded values
- No unused imports

## Tests
- Run: npm run test
- All tests pass
- Coverage >= 80%

## Lint
- Run: npm run lint
- No warnings

## Commit Message
- Format: type(scope): message
- Clear and descriptive
EOF

cat > .claude/hooks/feature-development.md << 'EOF'
---
name: "Feature Development"
description: "Structured feature workflow"
trigger: "manual"
---

# Feature Development Process

## 1. Planning Phase
- Understand requirements
- Break into smaller tasks
- Plan component structure
- Identify edge cases

## 2. Implementation Phase
- Create components following standards
- Add proper error handling
- Write documentation
- Follow CLAUDE.md rules

## 3. Testing Phase
- Write unit tests
- Test user interactions
- Test edge cases
- Verify accessibility

## 4. Review Phase
- Code review checklist
- Performance check
- Accessibility audit
- All tests passing

## 5. Commit Phase
- Clear commit message
- Reference issues
- Document changes
EOF

cat > .claude/hooks/bug-fix.md << 'EOF'
---
name: "Bug Fix Workflow"
description: "Systematic bug fixing process"
trigger: "manual"
---

# Bug Fix Process

## 1. Reproduce
- Understand how to reproduce
- Write failing test case
- Confirm bug exists

## 2. Analyze
- Trace issue through code
- Identify root cause
- Check for similar issues

## 3. Fix
- Implement minimal fix
- No side effects
- Keep changes focused

## 4. Verify
- Original bug fixed
- No new bugs introduced
- All tests pass

## 5. Document
- Clear commit message
- Explain root cause
- Prevent similar bugs
EOF

cat > .claude/hooks/performance-optimization.md << 'EOF'
---
name: "Performance Optimization"
description: "Check and optimize performance"
trigger: "manual"
---

# Performance Optimization

## Bundle Size
- Analyze: npm run analyze
- Check unused dependencies
- Code splitting implemented

## React Performance
- No unnecessary re-renders
- React.memo on list items
- useCallback for handlers
- useMemo for expensive computations

## Network
- Images optimized
- API calls batched
- Caching implemented

## Runtime
- No memory leaks
- Efficient algorithms
- Event listeners cleaned up
EOF

cat > .claude/hooks/code-review.md << 'EOF'
---
name: "Code Review"
description: "Comprehensive code review"
trigger: "manual"
---

# Code Review Process

## Functionality
- Does it work as intended?
- All edge cases handled?
- Error handling present?

## Code Quality
- Follows standards?
- DRY principle applied?
- Variable names descriptive?

## Performance
- No unnecessary re-renders?
- Efficient algorithms?
- Bundle size acceptable?

## Testing
- Sufficient coverage?
- Edge cases tested?
- All tests passing?

## Documentation
- Comments clear?
- JSDoc present?
- README updated?

## Security
- Input validation present?
- No secrets in code?
- Dependencies secure?

## Accessibility
- Semantic HTML used?
- ARIA labels present?
- Keyboard navigation works?
EOF

echo "✅ Created hooks"

# Create agents
cat > .claude/agents/code-reviewer.md << 'EOF'
---
name: "Code Reviewer"
description: "Specialized agent for code reviews"
---

# Code Reviewer Agent

## Role
Provide thorough, professional code reviews

## Expertise
- React patterns
- JavaScript best practices
- Testing strategies
- Performance optimization
- Code organization

## Communication
- Clear and constructive
- Explain reasoning
- Suggest solutions
- Be encouraging
EOF

cat > .claude/agents/security-auditor.md << 'EOF'
---
name: "Security Auditor"
description: "Specialized agent for security reviews"
---

# Security Auditor Agent

## Role
Identify and prevent security vulnerabilities

## Expertise
- Web security
- Data protection
- Secure coding
- Vulnerability detection
- Security best practices
EOF

echo "✅ Created agents"

# Create memory files
cat > .claude/memory/decisions.md << 'EOF'
# Architecture Decisions

## Decision 1: React + Vite
- **Date**: 2026-04-21
- **Reason**: Fast development, quick builds
- **Status**: Confirmed

## Decision 2: Functional Components Only
- **Date**: 2026-04-21
- **Reason**: Modern React, hooks are powerful
- **Status**: Confirmed

## Decision 3: CSS Only (No Styled Components)
- **Date**: 2026-04-21
- **Reason**: Keep it simple, faster learning
- **Status**: Confirmed
EOF

cat > .claude/memory/patterns.md << 'EOF'
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
EOF

cat > .claude/memory/learnings.md << 'EOF'
# Project Learnings

## Learning 1: Claude Code Capabilities
- Creates projects from scratch
- Adds features to existing code
- Performs code reviews
- Manages git workflows
- Works with multiple files simultaneously

## Learning 2: MCP Integration
- web-search for research
- fetch for reading documentation
- Powerful when combined
- No auth needed for these servers

## Learning 3: Parallel Tasks
- Use & prefix to run in background
- Multiple tasks execute simultaneously
- Significant speed improvement
- Great for independent features
EOF

echo "✅ Created memory files"

# Create .gitignore
cat > .claude/.gitignore << 'EOF'
# Local settings
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

# IDE
.vscode/
.idea/

# Build
dist/
build/
*.tsbuildinfo
EOF

echo "✅ Created .gitignore"

# Summary
echo ""
echo "=========================================="
echo "✅ Complete .claude Setup Finished!"
echo "=========================================="
echo ""
echo "Folder Structure Created:"
echo ""
ls -la .claude/
echo ""
echo "Next Steps:"
echo "1. Review all files: nano .claude/settings.json"
echo "2. Customize to your preferences"
echo "3. Commit to git: git add .claude/ && git commit -m 'feat: add Claude Code configuration'"
echo "4. Test in Claude Code: Ask 'Show me my configuration'"
echo ""
echo "You're all set! 🚀"
