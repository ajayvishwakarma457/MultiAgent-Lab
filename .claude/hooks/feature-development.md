---
name: "Feature Development"
description: "Enterprise-grade feature development workflow with governance, documentation, and quality gates"
trigger: "manual"
---

# Enterprise Feature Development Workflow

---

## 📋 Phase 1: Requirements & Planning

### 1.1 Requirements Analysis
- [ ] **Feature Brief**: Written spec with user stories, acceptance criteria, and business value
- [ ] **Scope Definition**: Clear scope boundaries; explicit out-of-scope items documented
- [ ] **Acceptance Criteria**: Specific, measurable, testable criteria for "done"
- [ ] **User Stories**: Format: "As [role], I want [action], so that [benefit]"
- [ ] **Dependencies**: List external systems, APIs, databases, or services required
- [ ] **Constraints**: Performance requirements, security rules, compliance needs

### 1.2 Risk Assessment
- [ ] **Technical Risks**: Identified; mitigation strategies documented
- [ ] **Security Risks**: Privacy, data exposure, authentication/authorization concerns
- [ ] **Performance Risks**: Expected load; scalability plan
- [ ] **Compliance Risks**: Legal, regulatory, or data protection implications
- [ ] **Rollback Plan**: Documented approach if deployment fails

### 1.3 Design & Architecture
- [ ] **Component Structure**: Diagram or outline showing component hierarchy
- [ ] **Data Flow**: How data moves through the feature (state, props, API calls)
- [ ] **API Design**: Request/response schemas; error handling strategy
- [ ] **Database Schema**: New tables/fields required (if applicable)
- [ ] **Design Patterns**: Hooks, context, render props approach documented
- [ ] **Accessibility Plan**: WCAG 2.1 AA compliance approach
- [ ] **Performance Targets**: Load time, bundle size impact, Core Web Vitals

### 1.4 Estimation & Planning
- [ ] **Story Points**: Estimated effort using team's scale
- [ ] **Timeline**: Estimated days for implementation, review, testing
- [ ] **Resource Allocation**: Who owns design, implementation, testing, docs
- [ ] **Milestones**: Key checkpoints during development
- [ ] **Blockers**: Known dependencies; communication plan with other teams

### 1.5 Documentation
- [ ] **Architecture Decision Record (ADR)**: Why this approach chosen over alternatives
- [ ] **API Documentation**: Swagger/OpenAPI if new endpoints
- [ ] **Database Migrations**: Schema changes documented with rollback scripts
- [ ] **Configuration**: Environment variables, feature flags, runtime settings

---

## 🚀 Phase 2: Implementation

### 2.1 Pre-Implementation Setup
- [ ] **Feature Branch**: Created from main; naming: `feature/description` or `feature/ticket-123`
- [ ] **Branch Protection**: Branch protection rules enabled (require PR, status checks)
- [ ] **Feature Flag**: Consider feature flags for gradual rollout
- [ ] **Environment Setup**: Local .env configured; databases seeded if needed
- [ ] **Dependencies**: New packages added; versions locked in package-lock.json

### 2.2 Component Development
- [ ] **Functional Components Only**: No class components; use React hooks
- [ ] **Prop Validation**: TypeScript types or PropTypes; defaults provided
- [ ] **Component Size**: Under 200 lines; complexity refactored if needed
- [ ] **Reusability**: Shared logic extracted to hooks/utils
- [ ] **Naming**: PascalCase components; camelCase functions; CONSTANT_CASE for constants
- [ ] **No Inline Styles**: All CSS in external files; CSS variables used
- [ ] **Mobile-First CSS**: Base styles for mobile; media queries for larger screens

### 2.3 Error Handling & Validation
- [ ] **Input Validation**: User inputs validated (type, length, format)
- [ ] **Error Boundaries**: React error boundaries wrap risky components
- [ ] **Graceful Degradation**: Feature degrades gracefully on errors
- [ ] **User Feedback**: Clear error messages; actionable next steps
- [ ] **Logging**: Debug logs during development; production logs for errors only
- [ ] **OWASP Compliance**: Input sanitized; XSS/injection prevented; secrets not in code

### 2.4 Performance Optimization
- [ ] **React.memo**: Used for list items; prevents unnecessary re-renders
- [ ] **useCallback**: Event handlers memoized when passed as props
- [ ] **useMemo**: Expensive computations cached
- [ ] **Code Splitting**: Heavy components lazy-loaded with React.lazy + Suspense
- [ ] **Bundle Impact**: Checked with `npm run analyze`; impact < 50KB acceptable
- [ ] **Image Optimization**: Compressed; webp format used where supported
- [ ] **Debouncing/Throttling**: Applied to frequent events (search, resize, scroll)

### 2.5 Accessibility
- [ ] **Semantic HTML**: `<button>`, `<input>`, `<nav>`, `<main>` used correctly
- [ ] **ARIA Labels**: Form inputs labeled; dynamic content marked with role/live region
- [ ] **Keyboard Navigation**: Tab order logical; all interactive elements keyboard accessible
- [ ] **Focus Management**: Focus visible; focus trapped in modals
- [ ] **Color Contrast**: Text ≥4.5:1; UI elements ≥3:1 (WCAG AA)
- [ ] **Screen Reader Testing**: Tested with VoiceOver (Mac) or NVDA (Windows)
- [ ] **Motion**: `prefers-reduced-motion` respected; no auto-playing animations

### 2.6 Documentation
- [ ] **JSDoc Comments**: Complex functions documented; parameters and return values
- [ ] **Code Comments**: "Why" not "what"; non-obvious logic explained
- [ ] **README Updated**: New features documented; setup/usage explained
- [ ] **Storybook/Demo**: Visual components documented with usage examples
- [ ] **API Documentation**: Endpoint docs updated; type schemas included

---

## 🧪 Phase 3: Testing

### 3.1 Unit Tests
- [ ] **Function Tests**: Pure functions tested with multiple inputs
- [ ] **Component Tests**: Props validation; conditional rendering; event handlers
- [ ] **Hook Tests**: Custom hooks tested in isolation with react-hooks-testing-library
- [ ] **Edge Cases**: Boundary values, null/undefined, empty collections tested
- [ ] **Error Paths**: Error handling tested; exception messages verified
- [ ] **Coverage Target**: 80%+ statements, 75%+ branches, 80%+ functions

### 3.2 Integration Tests
- [ ] **Multi-Component**: Components working together tested
- [ ] **State Management**: State updates propagate correctly
- [ ] **API Integration**: API calls mocked with MSW or similar
- [ ] **Form Submission**: End-to-end form flow tested
- [ ] **Navigation**: Route changes work; data persists correctly

### 3.3 E2E Tests (for critical flows)
- [ ] **User Workflows**: Critical user journeys tested end-to-end
- [ ] **Different Devices**: Tested on mobile, tablet, desktop breakpoints
- [ ] **Different Browsers**: Chrome, Firefox, Safari, Edge tested
- [ ] **Network Conditions**: Slow network, offline modes tested
- [ ] **Error Scenarios**: API failures, timeouts, network errors handled gracefully

### 3.4 Manual Testing
- [ ] **Happy Path**: Feature works as intended; all acceptance criteria met
- [ ] **Edge Cases**: Tested with edge case data (very long strings, large numbers, etc.)
- [ ] **Error Scenarios**: Tested API failures, validation errors, timeouts
- [ ] **Performance**: No lag, smooth animations, good load times
- [ ] **Accessibility**: Keyboard navigation works; screen reader friendly
- [ ] **Responsive Design**: Tested at 320px, 768px, 1024px+ breakpoints
- [ ] **Cross-Browser**: Tested in all supported browsers

### 3.5 Test Quality
- [ ] **No Flaky Tests**: Tests deterministic; no race conditions or timeouts
- [ ] **Test Isolation**: Tests independent; no shared state between tests
- [ ] **Descriptive Names**: Test names clearly describe what's tested and expected
- [ ] **No Skip/Only**: No `.skip` or `.only` in committed code
- [ ] **No console.log**: No debug output in test code
- [ ] **All Tests Pass**: `npm run test` passes without warnings

---

## 📊 Phase 4: Code Review & Quality Gates

### 4.1 Pre-Review Automation
```bash
npm run lint          # ESLint + Prettier
npm run test          # Vitest with coverage
npm run build         # Production build
npm audit             # Dependency scan
npm run analyze       # Bundle size
```

### 4.2 Code Review
- [ ] **Reviewer Assignment**: At least 2 reviewers; mix of senior + junior
- [ ] **Review Checklist**: Use enterprise code-review.md; mark severity of issues
- [ ] **Blocking Issues**: 🔴 critical issues must be resolved
- [ ] **High Priority**: 🟠 high-priority issues should be addressed
- [ ] **Comments**: Clear, constructive feedback with suggested fixes
- [ ] **Turnaround**: Target 24-hour review time

### 4.3 Performance Review
- [ ] **Bundle Size**: Impact < 50KB (gzipped); justified if larger
- [ ] **Runtime Performance**: No new N² algorithms; no memory leaks
- [ ] **React Devtools Profiler**: No unnecessary component renders
- [ ] **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] **Lighthouse Score**: Target 90+; no regressions

### 4.4 Security Review
- [ ] **OWASP Top 10**: No injection, XSS, auth flaws, data exposure
- [ ] **Secrets**: No API keys, tokens, passwords in code
- [ ] **Dependencies**: All high/critical vulnerabilities resolved
- [ ] **Input/Output**: User inputs validated; outputs encoded/escaped
- [ ] **Authentication**: Proper checks; no privilege escalation

### 4.5 Accessibility Audit
- [ ] **Automated Checks**: axe DevTools scan; no critical violations
- [ ] **Manual Audit**: Keyboard navigation, screen reader testing
- [ ] **WCAG 2.1 AA**: All criteria met; no color-only information conveyance
- [ ] **Contrast**: Text ≥4.5:1; UI elements ≥3:1

### 4.6 Approval Criteria
- [ ] ✅ All 🔴 critical issues resolved
- [ ] ✅ All 🟠 high-priority issues addressed or deferred with justification
- [ ] ✅ Test coverage ≥80%; all tests passing
- [ ] ✅ No console.log, debugger, or commented-out code
- [ ] ✅ Performance targets met; bundle impact justified
- [ ] ✅ Accessibility compliant (WCAG 2.1 AA)
- [ ] ✅ At least 2 approvals (or 1 for docs-only)

---

## 📝 Phase 5: Commit & Merge

### 5.1 Commit Standards
- [ ] **Format**: `type(scope): subject` (e.g., `feat(todo): add priority filter`)
- [ ] **Types**: feat, fix, refactor, style, test, docs, chore, ci
- [ ] **Scope**: Feature area or component affected
- [ ] **Subject**: Imperative mood; under 50 characters
- [ ] **Body**: Detailed explanation if needed; reference issue tickets
- [ ] **History**: Clean commit history; squash if needed for clarity

### 5.2 Merge Process
- [ ] **Branch Update**: Rebase/merge with main to resolve conflicts
- [ ] **Squash if Needed**: Keep history clean; combine related commits
- [ ] **Merge Commit**: Use meaningful merge commit message
- [ ] **Branch Deletion**: Delete feature branch after merge
- [ ] **Git History**: Linear, readable history; no merge conflicts

### 5.3 Documentation Finalization
- [ ] **README**: Updated with new features, setup, API changes
- [ ] **Changelog**: Entry added; version bumped if released
- [ ] **API Docs**: Swagger/OpenAPI updated if endpoints added
- [ ] **Migration Guides**: Database/config changes documented with rollback steps
- [ ] **Known Issues**: Any limitations or TODOs documented for team

---

## 🚢 Phase 6: Deployment & Monitoring

### 6.1 Pre-Deployment
- [ ] **Feature Flag**: Enabled on staging; off in production initially
- [ ] **Staging Test**: Full QA cycle on staging environment
- [ ] **Database Migrations**: Tested on staging with production data snapshot
- [ ] **Configuration**: All env vars set; secrets rotated if needed
- [ ] **Rollback Plan**: Tested; documented; team trained

### 6.2 Deployment
- [ ] **Deployment Window**: Scheduled during low-traffic hours
- [ ] **Monitoring Alert**: Enabled for errors, performance degradation
- [ ] **Gradual Rollout**: Feature flag enables for % of users first
- [ ] **Communication**: Stakeholders notified of deployment
- [ ] **Rollback Ready**: Rollback script prepared; team on standby

### 6.3 Post-Deployment Monitoring
- [ ] **Error Logs**: No spike in errors; exceptions tracked
- [ ] **Performance Metrics**: Load time, Core Web Vitals tracked
- [ ] **User Analytics**: Feature adoption, user engagement tracked
- [ ] **Feature Flag**: Gradually increased to 100% over hours/days
- [ ] **Health Check**: 30-minute post-deployment monitoring period

### 6.4 Post-Release
- [ ] **Metrics Dashboard**: Dashboards set up for monitoring
- [ ] **User Feedback**: Collect feedback; address critical issues quickly
- [ ] **Documentation**: Finalize user-facing docs; publish release notes
- [ ] **Analytics Review**: Weekly review of feature adoption and performance
- [ ] **Retrospective**: Team review; lessons learned documented

---

## 📋 Quick Reference Checklist

### Before Starting
- [ ] Feature spec written and approved
- [ ] Story points estimated; timeline defined
- [ ] Resources allocated; dependencies identified

### Before Code Review
- [ ] All tests passing; 80%+ coverage
- [ ] ESLint, Prettier passing
- [ ] Bundle size analyzed; performance targets met
- [ ] Accessibility audit passed
- [ ] Documentation updated

### Before Merge
- [ ] 2+ approvals received
- [ ] All 🔴 critical issues resolved
- [ ] All 🟠 high-priority issues addressed
- [ ] Clean commit history
- [ ] Branch delete prepared

### Before Deployment
- [ ] Staging fully tested
- [ ] Monitoring and alerts configured
- [ ] Rollback plan tested
- [ ] Team notified; on-call engineer assigned

---

## Key Principles

1. **Quality First**: Never rush; quality is non-negotiable
2. **Documentation**: Every feature must be documented for future maintainers
3. **Testing**: Comprehensive testing prevents production issues
4. **Security**: Security reviews catch vulnerabilities early
5. **Performance**: Monitor and optimize from the start
6. **Accessibility**: Built-in; not an afterthought
7. **Communication**: Keep stakeholders informed throughout
8. **Monitoring**: Observe feature in production; be ready to roll back
