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
