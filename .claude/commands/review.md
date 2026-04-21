---
name: "Code Review"
description: "Enterprise automated code review with multi-dimensional analysis, severity classification, and structured feedback"
trigger: "/review"
---

# Code Review Command

Execute comprehensive automated code review across quality dimensions. Identify issues, prioritize by severity, and facilitate remediation.

---

## Review Command Usage

### Basic Syntax
```bash
/review                          # Review staged changes
/review --file=src/components    # Review specific file/directory
/review --branch=feature/xyz     # Review branch vs main
/review --commit=abc123          # Review specific commit
/review --pr=42                  # Review PR #42
/review --full                   # Full codebase audit
/review --focus=security         # Focus on security issues
/review --focus=performance      # Focus on performance
```

### Review Scope Options
```bash
/review --scope=staged           # Staged but uncommitted changes (default)
/review --scope=unstaged         # All changes (staged + unstaged)
/review --scope=branch           # All commits on feature branch
/review --scope=commit --commit=abc123  # Single commit
/review --scope=file --file=src/App.jsx # Single file
/review --scope=full             # Entire codebase (expensive)
```

### Focus Areas (Optional)
```bash
/review --focus=all              # All dimensions (default)
/review --focus=security         # Security vulnerabilities only
/review --focus=performance      # Performance optimization only
/review --focus=accessibility    # Accessibility compliance only
/review --focus=bugs             # Logic errors and edge cases
/review --focus=style            # Code style and organization
```

### Additional Options
```bash
/review --strict                 # Fail on warnings, not just errors
/review --ignore-rule=rule-name  # Skip specific linting rules
/review --threshold=high         # Only show HIGH severity and above
/review --json                   # Output in JSON format (for CI/CD)
/review --fix                    # Auto-fix issues (requires approval)
/review --interactive            # Interactive mode (ask before fixing)
```

---

## Review Methodology

### Phase 1: Code Intake & Analysis

#### Automated Parsing
```bash
# 1. Identify changed files
Changed Files:
├── src/components/TodoItem.jsx (45 lines added, 12 deleted)
├── src/api/todoService.js (23 lines added, 5 deleted)
└── src/styles/todo.css (18 lines added)

# 2. Identify file types
JavaScript/JSX: 2 files, 68 lines
CSS: 1 file, 18 lines

# 3. Identify scope of change
Affected Components: TodoItem, todoService
Affected Styles: todo container and item
Complexity: Medium (multiple interdependencies)
```

#### Dependency Analysis
```
Imports Added:
├── react (existing)
├── ./styles/todo.css (new)
└── ../api/todoService (existing)

Exports Modified:
├── TodoItem component signature changed
└── Export count: 2 (stable)

Breaking Changes: None detected
```

---

### Phase 2: Multi-Dimensional Review

#### Dimension 1: Correctness & Bugs

**Checks:**
- [ ] Logic errors (incorrect conditions, operators)
- [ ] Null/undefined handling
- [ ] Type mismatches
- [ ] Off-by-one errors
- [ ] Infinite loops or recursion
- [ ] Missing error handling
- [ ] Data validation gaps
- [ ] Race conditions

**Example Output:**
```
🔴 CRITICAL: Null Reference
Location: src/components/TodoItem.jsx:32
Issue: Accessing .map() on potentially undefined array
Code: const items = todos.map(t => t.name);
Risk: Runtime error if todos is undefined
Fix: Add guard clause or optional chaining
    const items = todos?.map(t => t.name) || [];
```

#### Dimension 2: Performance

**Checks:**
- [ ] Unnecessary re-renders (missing memo/useCallback)
- [ ] Large bundle impacts
- [ ] Inefficient algorithms (O(n²) where O(n) possible)
- [ ] Memory leaks (missing cleanup functions)
- [ ] Expensive operations in render
- [ ] Missing code splitting
- [ ] Unoptimized images/assets
- [ ] Excessive DOM manipulation

**Example Output:**
```
🟠 HIGH: Unnecessary Re-render
Location: src/components/TodoList.jsx:15
Issue: TodoItem not memoized, re-renders on every parent change
Impact: ~15% performance degradation with 100+ items
Current: const TodoItem = (props) => (...)
Optimized: const TodoItem = memo((props) => {...})
Additional: Wrap event handlers with useCallback
```

**Performance Metrics:**
```
Bundle Size Impact:
- Before: 245 KB (gzipped)
- After: 248 KB (gzipped)
- Delta: +3 KB (+1.2%) - Acceptable

Estimated Render Time Impact:
- Component render: 1.2ms → 1.3ms (+8%) - Minor
- List render (100 items): 45ms → 42ms (-7%) - Improvement ✓
```

#### Dimension 3: Accessibility (WCAG 2.1 AA)

**Checks:**
- [ ] Semantic HTML (button, form, nav, etc.)
- [ ] ARIA labels for screen readers
- [ ] Color contrast ratios (4.5:1 minimum)
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Focus management and indicators
- [ ] Alt text for images
- [ ] Form labels and error messages
- [ ] Proper heading hierarchy

**Example Output:**
```
🟡 MEDIUM: Missing ARIA Label
Location: src/components/TodoItem.jsx:18
Issue: Delete button has no accessible label for screen readers
Current: <button onClick={onDelete} className="delete-btn">✕</button>
Fix: <button 
      onClick={onDelete} 
      className="delete-btn"
      aria-label="Delete todo item"
      title="Delete"
    >✕</button>

🟡 MEDIUM: Insufficient Color Contrast
Location: src/styles/todo.css:12
Issue: Completed item text color (gray) vs white background
Contrast Ratio: 3.2:1 (requires 4.5:1)
Current: .todo-completed { color: #999; }
Fix: .todo-completed { color: #666; } /* 4.8:1 ✓ */
```

#### Dimension 4: Code Style & Organization

**Checks:**
- [ ] DRY principle (no duplicate code)
- [ ] Naming conventions (clear, descriptive)
- [ ] File organization (logical structure)
- [ ] Component size (< 200 LOC)
- [ ] Function complexity (< 15 LOC per function)
- [ ] Import organization
- [ ] Consistent formatting
- [ ] JSDoc documentation

**Example Output:**
```
🔵 LOW: Code Duplication
Location: src/api/todoService.js:45 and :78
Issue: Identical error handling logic in two functions
Current:
  try { ... }
  catch (err) { logError(err); return null; }
  
Fix: Extract to shared error handler
  const handleApiError = (err) => { logError(err); return null; }

🔵 LOW: Unclear Naming
Location: src/utils/helpers.js:12
Function Name: fn()
Issue: Single-letter function name is not descriptive
Fix: fn() → formatTodoForDisplay() or sanitizeUserInput()
```

#### Dimension 5: Best Practices & Patterns

**React Specific:**
- [ ] Hook rules (top level, dependencies)
- [ ] useCallback for event handlers
- [ ] useMemo for expensive computations
- [ ] Proper dependency arrays
- [ ] Error boundaries for error handling
- [ ] Suspense for code splitting
- [ ] Key usage in lists (not indices)
- [ ] Prop drilling vs context

**General:**
- [ ] Error handling (try/catch, error states)
- [ ] Logging (appropriate levels, no console.log)
- [ ] Comments (why, not what)
- [ ] Constants (no magic numbers)
- [ ] Type safety (if using TypeScript)

**Example Output:**
```
🟠 HIGH: Hook Dependency Issue
Location: src/hooks/useTodoFetch.js:12
Issue: Missing 'userId' in useEffect dependency array
Current: useEffect(() => {
           fetchTodos(userId);
         }, []) // Missing userId!
         
Risk: Stale closure - won't refetch when userId changes
Fix: useEffect(() => {
      fetchTodos(userId);
    }, [userId])

🔵 LOW: Missing Error Boundary
Location: src/components/TodoList.jsx
Issue: No error boundary wrapper for component tree
Recommendation: Add error boundary parent component
  <ErrorBoundary>
    <TodoList />
  </ErrorBoundary>
```

#### Dimension 6: Security

**Checks:**
- [ ] Input validation/sanitization
- [ ] XSS prevention (dangerous content)
- [ ] CSRF protection
- [ ] SQL injection prevention
- [ ] API key exposure
- [ ] Sensitive data in logs
- [ ] Proper authentication checks
- [ ] Authorization validation

**Example Output:**
```
🔴 CRITICAL: XSS Vulnerability
Location: src/components/TodoItem.jsx:25
Issue: Unsanitized user input rendered as HTML
Current: <div dangerouslySetInnerHTML={{__html: todo.text}} />
Risk: Attacker can inject malicious scripts
Fix: <div>{todo.text}</div> // React escapes by default
     OR use sanitize library if HTML needed

🟠 HIGH: API Key Exposure
Location: src/config.js:3
Issue: API key hardcoded in source code
Current: const API_KEY = "sk_live_abc123xyz..."
Risk: Leaked in git history, visible in deployed files
Fix: Use environment variable
     const API_KEY = process.env.REACT_APP_API_KEY
     Add .env.local to .gitignore
```

---

### Phase 3: Results Aggregation & Prioritization

#### Issue Summary
```
Code Review Results
═══════════════════════════════════════════════════════════

Total Issues Found: 12
├── 🔴 Critical: 1 (must fix)
├── 🟠 High: 3 (should fix before merge)
├── 🟡 Medium: 4 (recommend fixing)
└── 🔵 Low: 4 (consider for future)

Files Reviewed: 3
├── src/components/TodoItem.jsx: 7 issues
├── src/api/todoService.js: 3 issues
└── src/styles/todo.css: 2 issues

Effort Estimate:
├── Time to Fix: 1-2 hours
├── Test Impact: 3 new tests recommended
└── Review Complexity: Medium
```

#### Severity Hierarchy
```
Priority 1 (Fix Immediately):
┌─ 🔴 CRITICAL: XSS Vulnerability (dangerouslySetInnerHTML)
└─ 🔴 CRITICAL: Null reference (accessing .map on undefined)

Priority 2 (Fix Before Merge):
├─ 🟠 HIGH: API key exposure
├─ 🟠 HIGH: Hook dependency missing
└─ 🟠 HIGH: Performance regression (unmemoized component)

Priority 3 (Recommended):
├─ 🟡 MEDIUM: Missing error boundary
├─ 🟡 MEDIUM: Missing ARIA labels
├─ 🟡 MEDIUM: Code duplication
└─ 🟡 MEDIUM: Insufficient color contrast

Priority 4 (Future):
├─ 🔵 LOW: Unclear function names
├─ 🔵 LOW: Missing JSDoc comments
├─ 🔵 LOW: Inconsistent formatting
└─ 🔵 LOW: Extract shared utility
```

---

### Phase 4: Remediation & Implementation

#### Fix Suggestions Format
```
Issue #1: XSS Vulnerability
────────────────────────────────────────
Location: src/components/TodoItem.jsx:25
Severity: 🔴 CRITICAL
Category: Security
Status: Requires Fix

Current Code:
┌─────────────────────────────────────────
│ <div dangerouslySetInnerHTML={{__html: todo.text}} />
└─────────────────────────────────────────

Suggested Fix:
┌─────────────────────────────────────────
│ <div>{todo.text}</div>
│ // React automatically escapes text content
└─────────────────────────────────────────

Why This Fixes It:
- React's default rendering escapes HTML
- Prevents injection of malicious scripts
- Maintains security without special handling

Alternative Solutions:
1. If HTML rendering needed: use DOMPurify library
   import DOMPurify from 'dompurify';
   <div>{DOMPurify.sanitize(todo.text)}</div>
   
2. If only specific HTML tags: use html-react-parser with allowlist

Risk Assessment:
- Breaking change: No (improves security)
- Performance impact: None
- Requires testing: Yes (manual QA for display)
```

#### Interactive Fix Approval
```
Fix Review:
───────────────────────────────────────

[1] XSS Vulnerability - CRITICAL
    Current: dangerouslySetInnerHTML={{__html: todo.text}}
    Proposed: <div>{todo.text}</div>
    
    ☐ Approve this fix
    ☐ Approve with modifications
    ☒ Reject (explain below)
    
    Reject reason: Need to preserve markdown formatting
    Alternate suggestion: Use marked.js with sanitization
    
[2] Missing Hook Dependency - HIGH
    ☒ Approve this fix
    
[3] API Key Exposure - HIGH
    ☐ Approve this fix
    ☐ Need to create .env file first
    
Apply Selected Fixes? (y/n): y
```

---

## Review Output Format

### Console/Terminal Output
```
╔═══════════════════════════════════════════════════════╗
║        AUTOMATED CODE REVIEW REPORT                   ║
║                                                       ║
║ Reviewed: src/components/TodoItem.jsx               ║
║ Lines: 45 changed, 12 deleted                        ║
║ Time: 2.3 seconds                                    ║
╚═══════════════════════════════════════════════════════╝

Critical Issues (1)
─────────────────────────────────────────────────────

🔴 XSS Vulnerability (Line 25)
   Category: Security
   Description: Unsanitized user input rendered as HTML
   Severity: CRITICAL (must fix before merge)
   
   Current:
   > 25: <div dangerouslySetInnerHTML={{__html: todo.text}} />
   
   Fix:
   > <div>{todo.text}</div>
   
   ✓ Would fix
   ✗ Skip this issue


High Priority Issues (3)
─────────────────────────────────────────────────────

🟠 API Key Hardcoded (Line 3, src/config.js)
   ... [similar format]


Recommendations Summary
─────────────────────────────────────────────────────
✓ 6 auto-fixable issues (formatting, style)
✓ 3 with suggested implementations
✗ 1 requiring manual fixes (configuration)

Review Complete. 3 issues require attention before merge.
```

### Detailed HTML/Markdown Report
```markdown
# Code Review Report
**Date:** 2026-04-21 14:30 UTC
**Reviewer:** Automated Code Reviewer Agent
**Files:** 3 changed (150 lines added/deleted)

## Summary
- **Total Issues:** 12
- **Critical:** 1 | **High:** 3 | **Medium:** 4 | **Low:** 4
- **Recommendation:** Approve with required fixes

## Detailed Findings

### Critical (Must Fix)

#### [C1] XSS Vulnerability
- **File:** src/components/TodoItem.jsx:25
- **Category:** Security
- **Impact:** Allows script injection attacks
- **Fix:** Use React's default escaping

[detailed explanation and code examples]

### High Priority (Should Fix)

[similar format for each issue]

## Metrics

| Metric | Value |
|--------|-------|
| Total Issues | 12 |
| Auto-fixable | 6 |
| Estimated Fix Time | 1-2 hours |
| Test Coverage Impact | +3 tests |

## Approval Status

- [ ] Approved (no issues)
- [x] Approved with required fixes (1 critical, 3 high)
- [ ] Blocked (security/critical issues)
- [ ] Needs Major Revision (architectural concerns)
```

### JSON Output (CI/CD Integration)
```json
{
  "review_id": "rev-2026-04-21-001",
  "status": "issues_found",
  "summary": {
    "total_issues": 12,
    "critical": 1,
    "high": 3,
    "medium": 4,
    "low": 4,
    "approval_status": "approved_with_required_fixes"
  },
  "issues": [
    {
      "id": "C1",
      "severity": "critical",
      "category": "security",
      "file": "src/components/TodoItem.jsx",
      "line": 25,
      "title": "XSS Vulnerability",
      "description": "...",
      "current_code": "...",
      "suggested_fix": "...",
      "auto_fixable": false
    }
  ],
  "recommendations": [
    "Fix 1 critical security issue before merge",
    "Address 3 high-priority performance/dependency issues",
    "Consider medium-priority accessibility and code quality improvements"
  ]
}
```

---

## Integration with Development Workflow

### Pre-Commit
```bash
# Run review on staged changes (fail if critical issues)
git hook: npm run review --scope=staged --threshold=critical
```

### Pre-Push
```bash
# Run review on feature branch (warn if high issues)
git hook: npm run review --scope=branch --threshold=high
```

### Pull Request
```bash
# Automated review on PR creation
CI/CD: npm run review --pr=$PR_NUMBER --json > review-result.json
# Post as PR comment with results
```

### Pre-Merge
```bash
# Final review gate (must pass for production)
CI/CD: npm run review --scope=branch --strict
# Blocks merge if critical or high issues without approval
```

---

## Configuration & Customization

### Review Profile: Strict (Production)
```json
{
  "profile": "strict",
  "fail_on_severity": ["critical", "high"],
  "warn_on_severity": ["medium"],
  "dimensions": ["correctness", "security", "performance", "accessibility"],
  "performance_threshold": "no_regression",
  "bundle_size_limit": "250KB"
}
```

### Review Profile: Balanced (Standard)
```json
{
  "profile": "balanced",
  "fail_on_severity": ["critical"],
  "warn_on_severity": ["high"],
  "dimensions": ["all"],
  "auto_fix": "formatting_only"
}
```

### Review Profile: Relaxed (Development)
```json
{
  "profile": "relaxed",
  "fail_on_severity": ["none"],
  "warn_on_severity": ["critical"],
  "dimensions": ["correctness", "security"],
  "auto_fix": "all"
}
```

---

## Metrics & Measurement

Track per-review:
- **Time to Review:** How long did analysis take?
- **Issues Found:** By type and severity
- **Issue Resolution Rate:** % of issues fixed before merge
- **False Positive Rate:** % of flagged issues developers disagreed with
- **Time to Fix:** Average time to resolve each severity level
- **Auto-Fix Adoption:** % of suggested fixes developers accepted

---

## Review Approval Workflow

```
Code Change
    ↓
[Run /review] → Review Results
    ↓
[No Critical Issues?] 
    ├─ Yes → Approve for Merge
    └─ No → Require Fixes
         ↓
    [Developer Fixes Issues]
         ↓
    [Re-run /review] → Verify Fixes
         ↓
    [Approve for Merge]
```

---

## When to Use Each Command

| Command | When | Example |
|---------|------|---------|
| `/review` | Review staged changes | Before committing |
| `/review --branch=feature` | Review all commits on branch | Before opening PR |
| `/review --pr=42` | Review PR changes | In PR checks |
| `/review --focus=security` | Security-focused audit | Before deployment |
| `/review --full` | Full codebase audit | Quarterly health check |
| `/review --fix` | Auto-fix detected issues | Local development |

---

## Out of Scope (Use /security-review instead)
- ❌ Advanced penetration testing
- ❌ Infrastructure security audit
- ❌ Compliance verification (GDPR, HIPAA)
- ❌ Load/stress testing
- ❌ Dependency vulnerability scanning (use npm audit)

---

## Success Criteria

✅ **Review Successful If:**
- No critical or high-severity issues remaining
- All security vulnerabilities fixed
- Accessibility standards met
- Performance targets maintained
- Code follows project standards
- Team consensus on remaining low-priority items
