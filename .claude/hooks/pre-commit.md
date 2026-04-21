---
name: "Pre-Commit Check"
description: "Enterprise-grade pre-commit validation with automated checks, security scanning, and quality gates"
trigger: "before-git-commit"
---

# Enterprise Pre-Commit Validation Hook

---

## 🔒 Phase 1: Security & Secrets Detection

### 1.1 Credential Scanning
- [ ] **No Secrets**: No API keys, tokens, passwords, or credentials in code
  ```bash
  # Detect common patterns
  grep -r "password.*=" --include="*.js" --include="*.json"
  grep -r "api_key\|API_KEY\|apiKey" --include="*.js"
  grep -r "secret.*=" --include="*.js"
  ```
- [ ] **No Private Keys**: No .pem, .key, .p12, or certificate files
- [ ] **No AWS Keys**: No hardcoded AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID
- [ ] **No Database URLs**: No connection strings with credentials
- [ ] **No Auth Tokens**: No JWT, OAuth tokens, or Bearer tokens
- [ ] **Tool**: Use `detect-secrets` or `git-secrets` for scanning

### 1.2 File Integrity
- [ ] **No Binary Files**: Only text files (unless explicitly allowed)
- [ ] **No Large Files**: Files > 10MB blocked; commit history pollution
- [ ] **No .env Files**: .env committed; use .env.example instead
- [ ] **No node_modules**: node_modules/ not committed; use .gitignore
- [ ] **No Build Artifacts**: dist/, build/, .next/ excluded
- [ ] **No IDE Files**: .vscode/, .idea/, *.swp excluded
- [ ] **No OS Files**: .DS_Store, Thumbs.db excluded

### 1.3 Dependency Security
- [ ] **Audit Vulnerabilities**: `npm audit` passes; no high/critical issues
- [ ] **License Compliance**: No GPL/incompatible licenses added
- [ ] **Dependency Size**: No massive dependencies added without justification
- [ ] **Outdated Check**: Major version updates reviewed (may contain breaking changes)

---

## 🧹 Phase 2: Code Quality & Standards

### 2.1 Linting & Formatting
- [ ] **ESLint Passing**: `npm run lint` exits with 0
  - No syntax errors
  - No undefined variables
  - No unused variables/imports
  - No console.log (except in test/demo files)
  - No debugger statements
  - No commented-out code
- [ ] **Prettier Formatting**: `npm run format` applied; consistent formatting
- [ ] **No Trailing Whitespace**: Files end with newline; no trailing spaces
- [ ] **Line Length**: Lines < 80 characters (checked; warnings allowed)
- [ ] **Max File Size**: JS files < 500 lines; CSS files < 300 lines

### 2.2 Code Patterns & Anti-Patterns
- [ ] **No Hardcoded Values**: Magic numbers extracted; configuration documented
- [ ] **No Inline Styles**: CSS in external files; no `style={{}}` inline styling
- [ ] **No Direct DOM**: No `document.querySelector()`; use React state/refs
- [ ] **No console.log**: Removed from production code; test-only allowed
- [ ] **No var**: Only `const`/`let`; strict mode enabled
- [ ] **No Arrow Functions in JSX**: Handlers defined outside render
- [ ] **No Class Components**: Functional components only; hooks required
- [ ] **No Circular Dependencies**: Analyzed with dependency tools
- [ ] **No TODO/FIXME**: Without issue reference or resolution timeline

### 2.3 React Patterns
- [ ] **Hook Rules**: Called at top level; not in conditions/loops
- [ ] **useEffect Cleanup**: Cleanup functions present; event listeners removed
- [ ] **No Invalid Dependencies**: useEffect/useCallback dependencies correct
- [ ] **No Prop Drilling**: Props validated; PropTypes or TypeScript used
- [ ] **No Memory Leaks**: No dangling event listeners or timers
- [ ] **Component Naming**: PascalCase for components; camelCase for functions

### 2.4 TypeScript/Type Safety
- [ ] **No `any` Types**: Type inference used where possible
- [ ] **Props Typed**: Function components have prop types/interfaces
- [ ] **Return Types**: Return types specified for complex functions
- [ ] **Strict Mode**: TypeScript `strict: true` enabled
- [ ] **No Type Errors**: `tsc --noEmit` passes without errors

---

## ✅ Phase 3: Tests & Coverage

### 3.1 Test Execution
- [ ] **All Tests Pass**: `npm run test` exits with 0
  - No flaky tests
  - No skipped tests (.skip removed)
  - No pending tests (.todo without issue reference)
- [ ] **Test Coverage >= 80%**:
  - Statements: ≥80%
  - Branches: ≥75%
  - Functions: ≥80%
  - Lines: ≥80%
- [ ] **No Console Warnings**: Test output clean; no unhandled warnings
- [ ] **New Features Tested**: New code has test coverage
- [ ] **Breaking Changes Tested**: Breaking changes have migration tests

### 3.2 Test Quality
- [ ] **Descriptive Names**: Test names clearly state what's tested
- [ ] **No Hardcoded Waits**: Async tests use proper waiting (waitFor, etc.)
- [ ] **Proper Mocking**: External APIs mocked; no real API calls
- [ ] **Isolated Tests**: Tests independent; no shared state
- [ ] **No Debugging Left**: No .only, .skip, console.log in tests

---

## 📦 Phase 4: Build & Bundle Validation

### 4.1 Build Status
- [ ] **Build Success**: `npm run build` completes without errors
- [ ] **No Build Warnings**: Build output clean; warnings addressed
- [ ] **Production Ready**: Built assets valid; can be served

### 4.2 Bundle Analysis
- [ ] **Bundle Size**: Stays within budget
  - Main bundle < 150KB (gzipped)
  - Total bundle < 300KB (gzipped)
- [ ] **Bundle Growth**: < 5% growth acceptable; > 10% requires justification
- [ ] **Chunk Splitting**: Code-split chunks configured; prefetch links present
- [ ] **Dead Code**: No unreachable code; tree-shaking enabled
- [ ] **Duplicates**: No duplicate dependencies; npm dedupe clean

### 4.3 Asset Validation
- [ ] **Images Optimized**: PNG/JPEG < 80KB; WebP provided where applicable
- [ ] **SVG Valid**: Valid XML; optimized with svgo
- [ ] **Fonts Included**: Custom fonts have LICENSE file; subsetting documented
- [ ] **No Missing Assets**: All referenced assets included in build

---

## ♿ Phase 5: Accessibility & UX

### 5.1 Accessibility Checks
- [ ] **No Empty alt Tags**: Images have descriptive alt text
- [ ] **Semantic HTML**: Proper heading hierarchy; semantic elements used
- [ ] **Form Labels**: Form inputs have associated labels
- [ ] **Color Contrast**: Text ≥4.5:1 contrast ratio
- [ ] **Focus States**: Visible focus indicators on interactive elements
- [ ] **ARIA Attributes**: Dynamic content properly labeled
- [ ] **Keyboard Navigation**: Tab order logical; all elements reachable

### 5.2 Responsive Design
- [ ] **Mobile Styles**: Mobile styles in base CSS; desktop in media queries
- [ ] **Breakpoints**: Tested at 320px, 768px, 1024px minimum
- [ ] **No Horizontal Scroll**: Content fits at 320px width
- [ ] **Touch Targets**: Interactive elements ≥44x44px
- [ ] **Viewport Meta**: Correct viewport tag; not user-scalable=no

---

## 📝 Phase 6: Documentation & Comments

### 6.1 Code Documentation
- [ ] **JSDoc Present**: Complex functions documented with params/returns
- [ ] **Component Documentation**: Components have prop documentation
- [ ] **Non-Obvious Logic**: "Why" explained; not "what"
- [ ] **README Updated**: For new features; setup/config changes documented
- [ ] **CHANGELOG Entry**: User-facing changes logged
- [ ] **API Documentation**: Endpoint docs updated if APIs changed
- [ ] **Configuration Documented**: Environment variables, feature flags documented

### 6.2 Comments Quality
- [ ] **No Commented Code**: Removed or documented with issue reference
- [ ] **No Stale Comments**: Comments match code; updated if changed
- [ ] **Clear Language**: Comments professional; no typos or unclear phrasing

---

## 📋 Phase 7: Commit Message Validation

### 7.1 Commit Message Format
```
type(scope): subject
<blank line>
body (optional)
<blank line>
footer (optional)
```

### 7.2 Message Quality
- [ ] **Type Valid**: One of: `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`, `ci`, `perf`
- [ ] **Scope Provided**: Component/area affected; lowercase (e.g., `todo`, `api`, `performance`)
- [ ] **Subject**: Imperative mood; no period; under 50 characters
  - ✅ "add priority filter to todo list"
  - ❌ "Added priority filter" / "Add priority filter to todo list because users wanted it"
- [ ] **Issue Reference**: Closes/references issue ticket (if applicable)
  ```
  Closes #42
  Related to #100
  ```
- [ ] **No Unnecessary Details**: Technical implementation details in body, not subject
- [ ] **Breaking Changes**: Marked with `BREAKING CHANGE:` in footer
  ```
  BREAKING CHANGE: Todo API response changed; field 'status' renamed to 'state'
  ```

### 7.3 Commit History Quality
- [ ] **Logical Commits**: One logical change per commit; not squashing unrelated changes
- [ ] **No WIP Commits**: Work-in-progress commits cleaned up before pushing
- [ ] **No Merge Commits**: Rebase preferred; no "Merge branch" commits
- [ ] **No Accidental Commits**: Secrets, large files not committed in any commit

---

## 🚀 Phase 8: Performance Checks

### 8.1 Performance Impact
- [ ] **No Regressions**: React DevTools Profiler shows no new slow renders
- [ ] **Bundle Size Impact**: < 50KB increase acceptable
- [ ] **No Memory Leaks**: Chrome DevTools Memory tab clean
- [ ] **No N² Algorithms**: New code doesn't introduce performance degradation
- [ ] **Caching**: API responses cached; unnecessary requests eliminated

---

## 🔄 Automated Pre-Commit Workflow

### Execute in Order
```bash
# 1. Formatting (auto-fix)
npm run format

# 2. Security Scan
npm run audit              # Dependency vulnerabilities
detect-secrets scan        # Credential detection (if configured)

# 3. Type Check
npx tsc --noEmit          # TypeScript validation

# 4. Lint & Quality
npm run lint              # ESLint + Prettier

# 5. Tests
npm run test              # Unit & integration tests

# 6. Build Validation
npm run build             # Production build

# 7. Bundle Analysis
npm run analyze           # Bundle size check

# 8. Commit Message Validation
# Checked by commitlint (if configured)
```

### Git Hooks Setup (husky + lint-staged)
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{css,scss}": ["stylelint --fix", "prettier --write"],
    "*.md": ["prettier --write"]
  }
}
```

### Commitlint Configuration
```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'refactor', 'style', 
      'test', 'docs', 'chore', 'ci', 'perf'
    ]],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case']
  }
};
```

---

## ✋ Blocking vs. Warning

| Check | Block Commit | Warning Only |
|-------|--------------|--------------|
| Security/Secrets | ✅ | — |
| Test Failures | ✅ | — |
| Build Failure | ✅ | — |
| Lint Errors | ✅ | — |
| Type Errors | ✅ | — |
| Coverage Drop | — | ⚠️ |
| Bundle Size (+5%) | — | ⚠️ |
| Outdated Deps | — | ⚠️ |
| Minor Warnings | — | ⚠️ |

---

## 🚫 Common Blocker Scenarios

### Scenario 1: Test Failure
```
❌ BLOCKED: Test failed
❌ File: src/components/TodoItem.test.js
❌ Error: Cannot find module 'axios'

Action: Run `npm install` and re-test
```

### Scenario 2: Secret Detected
```
❌ BLOCKED: Credentials found
❌ File: .env (should use .env.example)
❌ Pattern: VITE_API_KEY=sk_live_...

Action: Remove file; use .env.example template
```

### Scenario 3: Type Error
```
❌ BLOCKED: TypeScript compilation error
❌ File: src/api/index.ts:42
❌ Error: Property 'data' does not exist on type 'void'

Action: Fix type annotations
```

---

## 📊 Pre-Commit Checklist Summary

### 🔒 Security (Must Pass)
- [ ] No secrets/credentials
- [ ] No binary files
- [ ] npm audit passes
- [ ] .env not committed

### 🧹 Quality (Must Pass)
- [ ] npm run lint passes
- [ ] npm run format applied
- [ ] No console.log/debugger
- [ ] No commented code

### ✅ Tests (Must Pass)
- [ ] npm run test passes
- [ ] Coverage ≥80%
- [ ] No skipped tests

### 📦 Build (Must Pass)
- [ ] npm run build succeeds
- [ ] Bundle size within budget
- [ ] No build warnings

### 📝 Commit (Must Pass)
- [ ] Format: type(scope): message
- [ ] Clear, descriptive message
- [ ] Issue referenced (if applicable)

### ♿ Quality (Should Pass)
- [ ] Accessibility checks pass
- [ ] Documentation updated
- [ ] JSDoc present where needed

---

## ⚙️ Configuration Files

### .prettierrc
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "useTabs": false,
  "tabWidth": 2
}
```

### .eslintrc.js
```javascript
module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'react/jsx-uses-react': 'off'
  }
};
```

---

## Key Principles

1. **Automate Everything**: Never rely on manual checks; scripts enforce rules
2. **Fail Fast**: Catch issues immediately before push; wasted review time prevented
3. **Clear Messages**: Error messages explain what's wrong and how to fix it
4. **Progressive Enforcement**: Warnings guide; errors block; escalate appropriately
5. **Team Standards**: Pre-commit enforces agreed standards consistently
6. **Developer Experience**: Hooks should be helpful, not painful; offer auto-fixes where possible
