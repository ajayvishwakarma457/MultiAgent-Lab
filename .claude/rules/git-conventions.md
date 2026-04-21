---
name: "Git Conventions"
description: "Enterprise-grade git commit, branching, and workflow conventions with tooling integration"
---

# Enterprise Git Conventions

Professional git workflow for MultiAgent-Lab. Follows [Conventional Commits](https://www.conventionalcommits.org/) standard.

**Enforced by:**
- commitlint (commit message validation)
- Pre-commit hooks (validation before commit)
- GitHub branch protection rules
- PR templates and automation

---

## 📝 Commit Message Format

### Complete Format
```
type(scope): subject

body (optional)

footer (optional)
```

### Real-World Example
```
feat(auth): implement password reset flow

- Add password reset form component
- Send reset email with token
- Validate token expiration
- Update user password in database

Closes #42
Related to #100
```

---

## 📌 Commit Types

| Type | Purpose | When to Use | Changelog |
|------|---------|-----------|-----------|
| **feat** | New feature | User-facing new functionality | ✅ Yes |
| **fix** | Bug fix | Bugfix for user-facing issue | ✅ Yes |
| **refactor** | Code restructure | Internal code improvement; no behavior change | ❌ No |
| **style** | Formatting | Code formatting, linting, whitespace | ❌ No |
| **test** | Testing | Add/update tests; no production code change | ❌ No |
| **docs** | Documentation | README, API docs, comments | ❌ No |
| **chore** | Maintenance | Dependencies, build config, tooling | ❌ No |
| **ci** | CI/CD | GitHub Actions, deploy scripts | ❌ No |
| **perf** | Performance | Performance optimization | ✅ Yes |

### Type Definitions & Examples

**feat: New Feature**
```
✅ When: Adding new user-visible functionality
✅ Examples:
  - feat(todo): add priority filter
  - feat(auth): implement social login
  - feat(dashboard): add widget customization

❌ Wrong type for:
  - Bugfixing existing feature (use: fix)
  - Refactoring (use: refactor)
  - Adding tests (use: test)
```

**fix: Bug Fix**
```
✅ When: Fixing broken functionality
✅ Examples:
  - fix(api): handle null response in user endpoint
  - fix(forms): prevent duplicate submissions
  - fix(styles): correct button alignment on mobile

❌ Wrong type for:
  - Feature additions (use: feat)
  - Performance improvements (use: perf)
  - Code cleanup (use: refactor)
```

**refactor: Code Refactoring**
```
✅ When: Improving code without changing behavior
✅ Examples:
  - refactor(components): extract TodoItem to separate file
  - refactor(utils): consolidate date formatting functions
  - refactor(hooks): rename useTodoState to useTodoForm

⚠️ Note: Not included in changelog (internal improvement)
```

**style: Formatting**
```
✅ When: Formatting, linting, whitespace changes
✅ Examples:
  - style(css): fix indentation in button styles
  - style(js): remove unused variables
  - style: apply prettier formatting

⚠️ Note: Automated via pre-commit; rarely needed manually
```

**test: Testing**
```
✅ When: Adding/updating tests; no production code changes
✅ Examples:
  - test(todo): add coverage for delete confirmation
  - test(forms): add validation edge case tests
  - test(api): mock response handling

⚠️ Note: Not included in changelog
```

**docs: Documentation**
```
✅ When: Documentation changes
✅ Examples:
  - docs(readme): add installation instructions
  - docs(api): document new endpoint parameters
  - docs: update deployment guide

⚠️ Note: Not included in changelog
```

**chore: Maintenance**
```
✅ When: Non-code changes (dependencies, config)
✅ Examples:
  - chore: upgrade react to 18.2.0
  - chore: update eslint config
  - chore: bump node version to 22.x

⚠️ Note: Only in changelog if user-impacting
```

**ci: CI/CD**
```
✅ When: CI/CD pipeline changes
✅ Examples:
  - ci: add github actions for automated testing
  - ci: configure automated deployment
  - ci: update build script

⚠️ Note: Not included in changelog
```

**perf: Performance**
```
✅ When: Performance optimization
✅ Examples:
  - perf(bundle): reduce main bundle size by 15KB
  - perf(render): memoize TodoItem to prevent re-renders
  - perf(api): implement response caching

✅ Note: Included in changelog (user-visible improvement)
```

---

## 🎯 Scope Naming

Scope identifies the affected area. Use lowercase, singular nouns.

### Valid Scopes
```javascript
// Component-based
feat(todo-item): add edit mode
feat(todo-list): add sorting
feat(modal): add close animation

// Feature-based
feat(auth): implement login flow
feat(api): add user endpoint
feat(search): add full-text search

// Layer-based
feat(utils): add date formatter
feat(hooks): add custom useForm hook
feat(styles): add dark mode variables

// File-based (if no component/feature)
feat(constants): add api endpoints
feat(types): add user type definitions
```

### Scope Guidelines
- **Use specific scopes**: Better than generic "app" or "code"
- **Match your codebase**: Use same names as components/features
- **Consistent naming**: Same feature always uses same scope
- **Singular form**: "todo" not "todos"; "user" not "users"
- **Lower case**: Matches commit convention format

### Scope Examples by Type

**Components (from /src/components):**
- `feat(button)`: Add component
- `fix(todo-item)`: Fix component bug
- `refactor(todo-list)`: Reorganize component

**Hooks (from /src/hooks):**
- `feat(use-local-storage)`: New hook
- `fix(use-todo-form)`: Hook bug
- `perf(use-fetch)`: Optimize hook

**Utils (from /src/utils):**
- `feat(validators)`: Add validation
- `fix(date-formatter)`: Fix formatting bug
- `refactor(api)`: Reorganize API client

**Entire App (when change affects multiple areas):**
- `feat(app)`: Major feature affecting app
- `docs(readme)`: Top-level documentation

---

## 📋 Subject Line Best Practices

The subject line is the first line of the commit. Keep it **clear, concise, and present-tense imperative**.

### Format: `type(scope): subject`

**Rules:**
1. **Imperative mood**: "add" not "added" or "adds"
2. **Present tense**: Describes what commit DOES
3. **No period**: No period at end (.prettierrc: `semi: true` is for JS, not commits)
4. **Under 50 characters**: Aim for conciseness
5. **Capitalize first word**: "Add feature" not "add feature"
6. **Specific, not generic**: Describe WHAT changed, not HOW

### Good Examples
```
✅ feat(todo): add priority filter
✅ fix(api): handle null response in user endpoint
✅ refactor(components): extract delete confirmation dialog
✅ perf(bundle): reduce main bundle size by lazy-loading heavy components
✅ docs(readme): add installation instructions
✅ test(auth): add coverage for password reset flow
```

### Bad Examples
```
❌ feat(todo): added new feature       # "added" (past tense)
❌ fix(api): fixes null response       # "fixes" (present 3rd person)
❌ feat(todo): add todo feature        # Redundant "todo"
❌ Updated stuff                        # No type/scope
❌ feat(x): Implement a feature        # Generic
❌ feat(todo): add priority filter.    # Period at end
❌ feat(todo): add priority filter - this is a new feature that allows users to filter todos by priority # Too long
```

### Checking Your Subject Line
Ask yourself:
- Can I complete this sentence: "This commit will [subject]"?
- Is it under 50 characters?
- Is it in present tense, imperative mood?
- Would someone understand WHAT changed from the subject alone?

---

## 📖 Commit Body (Optional)

The body provides detailed explanation. Separate from subject with **blank line**.

**When to include body:**
- ✅ Complex changes requiring explanation
- ✅ Why a change was made (not just what)
- ✅ Alternative approaches considered
- ✅ Breaking changes explanation
- ❌ Simple, self-explanatory commits

**Format:**
```
type(scope): subject

- Bullet point 1 explaining change
- Bullet point 2 with more detail
- Technical notes or rationale

Additional paragraph if needed.
```

**Example:**
```
feat(auth): implement two-factor authentication

- Add OTP generation and verification
- Send verification code via email
- Add backup codes for account recovery
- Update user session to track 2FA status

Uses nodejs-otp library for TOTP generation.
Follows RFC 6238 standard for time-based OTPs.
```

---

## 🏷️ Commit Footer (Optional)

Footer references issues, breaking changes, or related commits.

### Issue References
```
Closes #42          # Closes the issue when PR is merged
Fixes #42           # Alias for Closes
Resolves #42        # Alias for Closes
Closes #42, #43     # Multiple issues

Related to #100     # Referenced but not closed
See #99             # See also
```

### Breaking Changes
```
BREAKING CHANGE: description of the breaking change

# Full example:
feat(api): change user response format

BREAKING CHANGE: user.fullName is now separate firstName/lastName properties
Migration: Use user.firstName + user.lastName instead of user.fullName
```

### Related Commits
```
Related-To: abc1234
Co-Authored-By: Jane Doe <jane@example.com>
```

**Complete Footer Example:**
```
type(scope): subject

Body explaining the change...

Closes #42
Related to #100
Co-Authored-By: Jane Doe <jane@example.com>
```

---

## 🌿 Branch Naming Conventions

Branch names follow pattern: `type/description`

### Branch Types

| Type | Purpose | Example |
|------|---------|---------|
| **feature/** | New feature | `feature/todo-priority-filter` |
| **fix/** | Bugfix | `fix/api-timeout-handling` |
| **refactor/** | Code refactoring | `refactor/component-extraction` |
| **docs/** | Documentation | `docs/api-guide` |
| **test/** | Testing | `test/add-form-validation` |
| **hotfix/** | Critical production fix | `hotfix/security-vulnerability` |

### Branch Naming Rules
- **Lowercase**: `feature/user-auth` not `feature/UserAuth`
- **Hyphens**: `feature/user-profile` not `feature/user_profile`
- **Descriptive**: `feature/add-todo-priority` not `feature/stuff`
- **Ticket reference (optional)**: `feature/issue-42-priority-filter`
- **No special characters**: Only alphanumeric and hyphens

### Examples

**Good Branch Names:**
```
feature/add-priority-filter
feature/issue-42-priority-filter
fix/handle-api-timeout
fix/null-response-handling
refactor/extract-todo-item
docs/update-readme
hotfix/security-patch
```

**Bad Branch Names:**
```
feature_add_priority_filter  # Underscores
feature/AddPriorityFilter    # CamelCase
newfeature                   # No type prefix
fix-api-bug                  # Missing / after type
WIP                          # Not descriptive
```

### Branch Workflow

```
main (production-ready)
  ↓
develop or staging (integration branch)
  ↓
feature/xxx (development branch)
  ↓
Create PR → Code Review → Merge to develop
  ↓
CI/CD Tests → Merge to main (when ready)
```

---

## 🔄 Pull Request (PR) Naming & Description

### PR Title Format
Similar to commit format but more flexible (longer allowed).

```
✅ Good PR titles:
- feat: add todo priority filtering
- fix: handle API timeout errors
- refactor: extract delete confirmation component
- docs: update API documentation

✅ Good (with issue):
- feat: add priority filter (closes #42)
- fix: handle null responses (fixes #99)
```

### PR Description Template
```markdown
## Summary
Brief description of changes (1-3 sentences)

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Performance improvement
- [ ] Refactoring

## What Changed
- Bullet point 1
- Bullet point 2
- Bullet point 3

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests passed
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests passing (npm run test)
- [ ] No console.log/debugger
- [ ] Documentation updated

## Related Issues
Closes #42
Related to #100
```

---

## 🔗 Conventional Commits Integration

### commitlint Configuration
```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat',
      'fix',
      'refactor',
      'style',
      'test',
      'docs',
      'chore',
      'ci',
      'perf'
    ]],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-period': [2, 'never'],
  }
};
```

### Husky Hook Setup
```bash
# Install husky and commitlint
npm install husky @commitlint/config-conventional @commitlint/cli --save-dev

# Setup git hook
npx husky install
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

---

## 🚀 Git Workflow

### Feature Development Workflow
```
1. Create feature branch from main
   git checkout -b feature/todo-priority-filter

2. Make changes and commit (following conventions)
   git commit -m "feat(todo): add priority filter"

3. Create PR on GitHub
   - PR title: "feat: add priority filter"
   - Include description and checklist

4. Code review and CI/CD
   - Address feedback
   - Ensure all tests pass
   - Re-request review if needed

5. Merge when approved
   - Squash commits if multiple small commits
   - Delete feature branch after merge
   - Automatic deployment via CI/CD
```

### Merge Strategy

**Squash Commits (Recommended for features)**
```bash
# Multiple feature commits become single commit
# Keeps main history clean

git merge --squash feature/todo-priority-filter
git commit -m "feat(todo): add priority filter"
```

**Rebase (Alternative)**
```bash
# Rebase feature branch on main, then merge
git rebase main
git merge --ff-only
```

**Avoid: Merge Commits**
```bash
# Creates merge commits (clutters history)
# Generally not recommended for this project
git merge --no-ff feature/todo-priority-filter
```

### Commit Cleanup Before Merge

**Before submitting PR:**
```bash
# View commits on your branch
git log main..HEAD --oneline

# If multiple small commits, consider squashing
git rebase -i main

# Ensure branch is up-to-date with main
git fetch origin
git rebase origin/main
```

---

## ✅ Commit Checklist

Before committing, verify:

- [ ] **Correct type**: feat, fix, refactor, etc.
- [ ] **Specific scope**: Identifies affected area
- [ ] **Imperative mood**: "add" not "added"; "fix" not "fixed"
- [ ] **Under 50 chars**: Subject line concise
- [ ] **No period**: No . at end of subject
- [ ] **Issue reference**: Closes/Fixes included if applicable
- [ ] **Single responsibility**: One logical change per commit
- [ ] **Tests passing**: `npm run test` passes
- [ ] **No console.log**: Removed debug statements
- [ ] **No commented code**: Clean codebase

### Pre-Commit Checklist (automated)
✅ Automatically enforced:
- ESLint passing
- Prettier formatting
- Test coverage
- No secrets/credentials
- Commit message format

---

## 📊 Commit Examples by Type

### Feature Commit
```
feat(auth): implement password reset flow

- Add password reset form component
- Send reset email with token
- Validate token expiration
- Update user password in database
- Add tests for reset flow

Closes #42
```

### Fix Commit
```
fix(api): handle null response in user endpoint

Previously, the API would crash if user endpoint returned null.
Now we validate response and show error message.

Closes #99
```

### Refactor Commit
```
refactor(components): extract delete confirmation

Extracted delete confirmation logic into separate component
to improve reusability and testability.

No behavior change; all tests passing.
```

### Performance Commit
```
perf(bundle): reduce main bundle by lazy-loading modals

- Modal component lazy-loaded with React.lazy
- Reduces main bundle from 180KB to 145KB (-25%)
- Modals still eager-loaded on demand
- No performance regression (verified with Lighthouse)
```

### Breaking Change Commit
```
refactor(api): change user response format

BREAKING CHANGE: user.fullName is now separate firstName/lastName

Migration:
- Use user.firstName + ' ' + user.lastName instead of user.fullName
- Updated all internal code and tests
- See migration guide in docs/

Closes #200
```

---

## 🚫 Common Mistakes

### ❌ Mistake 1: Wrong Type
```
❌ fixed(api): null pointer exception
✅ fix(api): handle null response in user endpoint
```

### ❌ Mistake 2: Generic Scope
```
❌ feat(app): new stuff
✅ feat(todo): add priority filter
```

### ❌ Mistake 3: Non-Imperative Subject
```
❌ feat(todo): added priority filter
✅ feat(todo): add priority filter

❌ feat(todo): filters todos by priority
✅ feat(todo): add priority filter
```

### ❌ Mistake 4: Too Long Subject
```
❌ feat(todo): add the ability to filter todos by their priority level so users can focus on high-priority tasks first
✅ feat(todo): add priority filter

(Use body for details!)
```

### ❌ Mistake 5: Multiple Changes in One Commit
```
❌ feat(app): add auth and update profile
✅ feat(auth): implement login flow
   feat(profile): add edit profile form
   (Two separate commits!)
```

### ❌ Mistake 6: Missing Context
```
❌ feat(api): fix bug
✅ feat(api): handle timeout in user endpoint

(What was fixed? Where? Why?)
```

### ❌ Mistake 7: No Issue Reference
```
❌ fix(api): resolve error handling
✅ fix(api): handle null response (Closes #42)

(Track which issue this fixes!)
```

---

## 🔍 Verifying Your Commit

### Before Pushing
```bash
# View your commits
git log origin/main..HEAD --oneline

# Verify format
# Example output:
# a1b2c3d feat(todo): add priority filter
# d4e5f6g fix(api): handle timeout
# h7i8j9k test(auth): add login tests
```

### Amending Last Commit
```bash
# Forgot to include file?
git add forgotten-file.js
git commit --amend --no-edit

# Need to fix message?
git commit --amend -m "feat(todo): add priority filter"
```

### Interactive Rebase (Clean Up Before Merge)
```bash
# Reorder, squash, or edit commits
git rebase -i origin/main

# In editor:
# pick a1b2c3d feat(todo): add priority filter
# squash d4e5f6g fix: typo in comment
# reword h7i8j9k test: better test name
```

---

## 📋 Quick Reference

### Commit Types at a Glance
```
feat  → User-facing feature        ✅ In changelog
fix   → Bug fix                    ✅ In changelog
perf  → Performance improvement   ✅ In changelog
refactor → Internal improvement    ❌ Not in changelog
style → Formatting                ❌ Not in changelog
test  → Tests only                ❌ Not in changelog
docs  → Documentation             ❌ Not in changelog
chore → Maintenance               ❌ Not in changelog (usually)
ci    → CI/CD changes             ❌ Not in changelog
```

### Commit Format At a Glance
```
type(scope): subject
↓     ↓       ↓
|     |       └─ Imperative, no period, <50 chars
|     └───────── Component/area affected (lowercase)
└───────────── Type of change

Optional body and footer:
- Explain WHY not WHAT
- Reference issues: Closes #42
- Break changes: BREAKING CHANGE: ...
```

---

## Related Documentation

- **CLAUDE.md**: Overall project standards
- **code-style.md**: Code formatting standards
- **patterns.md**: Design patterns
- **decisions.md**: ADR for architectural decisions
- **learnings.md**: Lessons from applying conventions
- [Conventional Commits](https://www.conventionalcommits.org/): Standard reference
