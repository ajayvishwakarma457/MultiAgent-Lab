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
