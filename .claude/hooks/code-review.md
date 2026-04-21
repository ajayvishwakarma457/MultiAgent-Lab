---
name: "Code Review"
description: "Enterprise-grade comprehensive code review with severity classification"
trigger: "manual"
---

# Enterprise Code Review Checklist

## 🔴 Critical (Blockers)
Must pass before merge. Security, data integrity, or stability issues.

### Security & Compliance
- [ ] **OWASP Top 10**: No injection vulnerabilities, XSS, CSRF, auth flaws, sensitive data exposure
- [ ] **Secrets Management**: No hardcoded credentials, API keys, tokens, or passwords
- [ ] **Dependency Audit**: All dependencies scanned with `npm audit`; critical/high vulnerabilities resolved
- [ ] **Access Control**: Proper authentication/authorization checks; no privilege escalation paths
- [ ] **Input Validation**: All user inputs validated (type, length, format); output encoded/escaped

### Data Integrity & Correctness
- [ ] **Error Handling**: All error paths handled; graceful degradation implemented
- [ ] **State Management**: No race conditions, data corruption, or inconsistent state
- [ ] **Edge Cases**: Null, undefined, empty collections, boundary conditions tested
- [ ] **API Contracts**: Request/response schemas match; versioning handled correctly
- [ ] **Database**: SQL injection prevented (parameterized queries); transaction integrity maintained

## 🟠 High Priority (Major Issues)
Should address before merge. Affects maintainability, performance, or user experience.

### Code Quality & Maintainability
- [ ] **Follows Standards**: Adheres to CLAUDE.md coding standards and project conventions
- [ ] **DRY Principle**: No code duplication; reusable functions extracted to utils/hooks
- [ ] **Naming Conventions**: Variables/functions use clear, descriptive names (no abbreviations unless standard)
- [ ] **Cyclomatic Complexity**: Functions under 10 complexity; nested logic refactored if needed
- [ ] **Component Size**: React components under 200 lines; large components split into smaller ones
- [ ] **Prop Validation**: TypeScript types or PropTypes defined; defaults provided

### Performance & Optimization
- [ ] **Bundle Impact**: No significant bundle size increase; analyze with `npm run analyze`
- [ ] **Render Efficiency**: No unnecessary re-renders; `React.memo`, `useCallback`, `useMemo` used appropriately
- [ ] **Algorithm Efficiency**: O(n) operations scrutinized; no N² loops without justification
- [ ] **Memory Leaks**: No memory leaks; cleanup functions in useEffect, event listeners removed
- [ ] **Asset Optimization**: Images compressed; lazy loading used for heavy components

### Testing & Validation
- [ ] **Test Coverage**: Minimum 80% coverage for critical paths; edge cases tested
- [ ] **Test Quality**: Tests are deterministic, isolated, and meaningful (not just coverage filler)
- [ ] **Integration Tests**: Multi-component flows tested; API mocks/stubs used appropriately
- [ ] **All Tests Pass**: `npm run test` passes without warnings or flaky tests

## 🟡 Medium Priority (Minor Issues)
Address in this PR or follow-up PR. Improves code quality incrementally.

### Documentation & Communication
- [ ] **Code Comments**: Complex logic explained with "why" not "what"; comments kept current
- [ ] **JSDoc/TypeDoc**: Public APIs documented with param/return descriptions; examples provided
- [ ] **README Updated**: For new features; API changes; setup/config changes documented
- [ ] **Changelog**: Entry added for user-facing changes
- [ ] **Commit Messages**: Format: `type(scope): description`; reference issue/ticket numbers

### Accessibility & UX
- [ ] **WCAG 2.1 AA Compliance**: Color contrast ≥4.5:1; semantic HTML used
- [ ] **Keyboard Navigation**: All interactive elements reachable via Tab/Enter; focus states visible
- [ ] **ARIA Labels**: Form inputs, buttons, and dynamic content have appropriate ARIA attributes
- [ ] **Error Messages**: Accessible, descriptive; linked to form fields (not generic alerts)
- [ ] **Responsive Design**: Mobile-first approach; tested on multiple breakpoints (320px, 768px, 1024px+)

### CSS & Styling
- [ ] **CSS Architecture**: Uses component-scoped CSS or BEM naming; CSS variables for theming
- [ ] **No Inline Styles**: All styling in external CSS files; inline styles used only for dynamic values
- [ ] **Mobile-First**: Base styles mobile; media queries for tablet/desktop expansion
- [ ] **Transitions & Animations**: Smooth defaults (0.3s ease); respects `prefers-reduced-motion`

## 🔵 Low Priority (Nice-to-Have)
Improvements for future consideration. Non-blocking.

### Observability & Monitoring
- [ ] **Logging**: Structured logs for debugging; debug-level logs in development only
- [ ] **Error Tracking**: Critical errors reported to monitoring service (Sentry, etc.)
- [ ] **Performance Metrics**: Core Web Vitals tracked; performance budgets respected
- [ ] **Analytics**: User interactions tracked appropriately (with consent)

### Architecture & Design Patterns
- [ ] **Design Patterns**: Appropriate patterns used (hooks for state logic, render props, etc.)
- [ ] **Modularity**: Clear separation of concerns; single responsibility principle followed
- [ ] **Extensibility**: Code designed for future enhancements without major refactoring
- [ ] **Type Safety**: TypeScript types comprehensive; no `any` types unless necessary

### DevOps & CI/CD
- [ ] **CI/CD Integration**: PR builds pass all checks (lint, test, build, security scan)
- [ ] **Deployment Ready**: No environment-specific issues; staging tested before production
- [ ] **Rollback Plan**: Breaking changes have migration path; feature flags for gradual rollout

---

## Review Process

### 1. **Automated Checks** (Pre-Review)
```bash
npm run lint          # ESLint & Prettier
npm run test          # Vitest with coverage
npm run build         # Production build validation
npm audit             # Dependency vulnerabilities
```

### 2. **Manual Review**
- Assign to at least **2 reviewers** for critical changes
- Use checklist above; mark severity of any issues found
- Request changes for 🔴 and 🟠 items; comment on 🟡 and 🔵

### 3. **Approval Criteria**
- ✅ All 🔴 blockers resolved
- ✅ All 🟠 high-priority items addressed or deferred with justification
- ✅ All tests passing; coverage ≥80%
- ✅ No console.log, debugger, or commented-out code
- ✅ At least 2 approvals (or 1 for documentation-only changes)

### 4. **Merge & Post-Merge**
- Squash or rebase commits; clean git history
- Delete feature branch after merge
- Monitor logs/metrics for 30 minutes post-deployment

---

## Severity Levels & Response Times

| Level | Type | Response Time | Action |
|-------|------|---------------|--------|
| 🔴 Critical | Security, data loss, crashes | Immediate | Block merge; fix required |
| 🟠 High | Performance, UX, maintainability | 24 hours | Address before merge |
| 🟡 Medium | Minor issues, style | 48 hours | Preferred; non-blocking |
| 🔵 Low | Nice-to-have improvements | None | FYI; future consideration |

---

## Example Review Comment

```
🔴 **CRITICAL: SQL Injection Vulnerability**
- File: src/api/queries.js:42
- Issue: Direct string interpolation in SQL query
- Fix: Use parameterized query: `db.query("SELECT * FROM users WHERE id = ?", [userId])`
- Reference: OWASP Top 10 - A03:2021 Injection
```

```
🟠 **HIGH: Bundle Size Impact**
- Current: 145KB (gzipped)
- Impact: +8KB on main bundle
- Recommendation: Lazy-load feature with React.lazy + Suspense
```
