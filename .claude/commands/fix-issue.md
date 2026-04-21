---
name: "Fix Issue"
description: "Enterprise issue resolution with structured diagnosis, root cause analysis, regression prevention, and comprehensive documentation"
trigger: "/fix-issue"
---

# Fix Issue Command

Systematically diagnose, resolve, and prevent recurring issues through structured root cause analysis, comprehensive testing, and knowledge capture.

---

## Issue Triage & Classification

### Issue Severity Levels

| Level | Definition | Response Time | SLA |
|-------|-----------|----------------|-----|
| **P0/CRITICAL** | Production down, data loss, security breach | Immediate (5 min) | Resolve in 4 hours |
| **P1/HIGH** | Major feature broken, significant impact | 15 minutes | Resolve in 24 hours |
| **P2/MEDIUM** | Feature partially broken, workaround exists | 1 hour | Resolve in 3 days |
| **P3/LOW** | Minor issue, cosmetic, edge case | 24 hours | Resolve in 2 weeks |
| **P4/TRIVIAL** | Documentation, typo, future optimization | As capacity allows | Backlog |

### Issue Categories

**Functional Bugs**
- Feature not working as documented
- Incorrect behavior or output
- Missing functionality
- Broken workflow

**Performance Issues**
- Slow response times
- Memory leaks
- High CPU usage
- Bundle size bloat

**Security Issues**
- Vulnerability in code
- Authentication/authorization bypass
- Data exposure
- Injection vulnerabilities

**Integration Issues**
- Third-party API failures
- Database connectivity
- External service outage
- Version incompatibility

**Infrastructure Issues**
- Deployment failures
- Environment configuration
- Monitoring/logging failures
- Resource exhaustion

**User Experience**
- Accessibility violations
- UI/UX bugs
- Inconsistent behavior
- Confusing error messages

---

## Issue Resolution Workflow

### Phase 1: Issue Analysis & Triage

#### Initial Assessment
- [ ] **Issue Title**: Clear, descriptive (not "bug", "error", "fix")
- [ ] **Severity**: Accurately classified (P0-P4)
- [ ] **Components**: Identify affected modules
- [ ] **Reproduction Steps**: Clear, repeatable instructions
- [ ] **Expected vs Actual**: What should happen vs. what happens
- [ ] **Environment**: Browser, Node version, OS, deployment (dev/staging/prod)
- [ ] **Error Messages**: Full error trace, logs, stack traces
- [ ] **Screenshots/Video**: Visual evidence if applicable

#### Issue Validation
```bash
# Can I reproduce it locally?
npm run dev
# [Follow reproduction steps]

# Can I reproduce in staging?
# [Deploy to staging, verify]

# Is it in production?
# [Check production logs, metrics]
```

#### Impact Assessment
- [ ] How many users affected?
- [ ] Data loss risk?
- [ ] Security vulnerability?
- [ ] Blocks deployment/release?
- [ ] Affects revenue/critical path?

**Output**: Issue Card (Jira/Linear) with:
```
Title: [Component] Issue description
Severity: P1
Category: Functional Bug
Affected Versions: v1.2.3
Reproduction: [Step-by-step]
Impact: [X users affected, $Y revenue impact]
Status: Triaged → In Progress
```

---

### Phase 2: Diagnosis & Root Cause Analysis

#### Environment Setup
```bash
# Check out issue branch
git checkout -b fix/issue-#123

# Verify issue reproduction
npm run dev
# [Reproduce problem]

# Gather diagnostics
npm run logs:app --tail=100
npm run logs:browser --tail=50
npm run logs:network --capture=true
```

#### Debugging Methodology

**1. Understand the Symptom**
- What behavior is wrong?
- When did it start? (git log to find regression)
- What changed recently?
- Pattern: consistent or intermittent?

**2. Examine the Error**
```javascript
// Error message analysis
// "Cannot read property 'map' of undefined"
// ↓
// A variable is undefined when accessing .map()
// ↓
// Find where that variable is used
```

**3. Trace Execution Flow**
```bash
# Use browser DevTools
# - Breakpoints at suspicious locations
# - Step through code execution
# - Inspect variable state at each step
# - Monitor network requests

# Use server logs
tail -f /var/log/app.log | grep "ERROR"

# Use profiling
npm run profile:cpu --duration=30s
npm run profile:memory --snapshot=true
```

**4. Locate the Root Cause**
- Is it in your code or a dependency?
- Is it a logic error or data issue?
- Is it an environment/configuration issue?
- Is it a race condition or timing issue?

#### Root Cause Categories

**Code Defects**
```javascript
// ❌ Missing null check
const items = response.data.items; // might be undefined
items.map(item => item.name);

// ✅ Add guard
const items = response.data?.items || [];
items.map(item => item.name);
```

**Logic Errors**
```javascript
// ❌ Wrong condition
if (isLoading = true) { } // assignment instead of comparison

// ✅ Correct logic
if (isLoading === true) { }
```

**Data Issues**
- Stale/cached data
- Type mismatch (string vs number)
- Missing required fields
- Null/undefined values

**Timing Issues**
- Race conditions
- Async/await issues
- Event listener timing
- Animation frames

**Configuration Issues**
- Wrong environment variables
- Incorrect API endpoints
- Missing feature flags
- Database connection strings

**Dependency Issues**
- Version mismatch
- Breaking change in library
- Incompatible peer dependencies
- Deprecated API usage

#### Root Cause Analysis Report

```
Issue: #123 - Todo items not displaying
Severity: P1 (Critical)

Reproduction: 
1. Create new todo
2. Refresh page
3. Observe: Items list empty

Root Cause Analysis:
┌─ Initial Observation
│  └─ Items display on creation, vanish on refresh
│
├─ Hypothesis 1: Component state issue
│  └─ Tested: State persists correctly ✓
│
├─ Hypothesis 2: API endpoint issue
│  └─ Tested: API returns data ✓
│
├─ Hypothesis 3: Data parsing issue
│  └─ Tested: Response.data.items is undefined ✗ FOUND IT
│
└─ Root Cause: API response format changed
   Backend returns { items: [...] }
   Frontend expects { data: { items: [...] } }
   Regression introduced in v1.2.3 API change

Timeline:
├─ v1.2.2: Working correctly
├─ v1.2.3: API response restructured (breaking change not communicated)
└─ v1.2.4: Frontend code not updated for new format

Affected Code: src/api/todoService.js:45
```

---

### Phase 3: Solution Design

#### Solution Approach
Choose the right fix strategy:

**1. Quick Fix (Temporary)**
- Fast, minimal code change
- Buys time for proper fix
- Risk: Technical debt
```javascript
// Temporary workaround
const items = response.data?.items || response.items || [];
```

**2. Proper Fix (Permanent)**
- Addresses root cause
- Follows project standards
- Longer development time
```javascript
// Update API parser for new format
const parseResponse = (response) => {
  return response.items; // Match new API format
};
```

**3. Preventive Fix (Best)**
- Fixes issue + prevents recurrence
- Adds validation/guards
- Improves resilience
```javascript
// Validate response structure with schema
const itemsSchema = z.array(todoSchema);
const items = itemsSchema.parse(response.items);
```

#### Design Validation
- [ ] Fix addresses root cause, not symptom
- [ ] No side effects or regressions
- [ ] Follows CLAUDE.md standards
- [ ] Backward compatible (if needed)
- [ ] Performance impact assessed
- [ ] Security impact assessed
- [ ] Breaking changes identified

---

### Phase 4: Implementation

#### Code Changes
```bash
# Create focused, atomic commits
git add src/api/todoService.js
git commit -m "fix(todo): handle new API response format

Previously, API response was { data: { items: [...] } }
Now returns { items: [...] } (breaking change in v1.2.3)

Frontend parser updated to handle new format with
backward compatibility for transition period.

Fixes #123"
```

#### Standards Compliance
- [ ] Follows code style (CLAUDE.md)
- [ ] Uses existing patterns/utilities
- [ ] No console.log/debugger statements
- [ ] Proper error handling
- [ ] Accessibility maintained (if UI)
- [ ] Performance acceptable
- [ ] No hardcoded values

#### Change Scope
- [ ] Minimal changes (DRY principle)
- [ ] No unnecessary refactoring
- [ ] Focused on issue resolution
- [ ] No tech debt introduction

```javascript
// ✅ GOOD: Minimal, focused change
- const items = response.data.items;
+ const items = response.data?.items || response.items;

// ❌ AVOID: Scope creep
- Refactor entire component
- Rename variables
- Reorganize file structure
- Add unrelated features
```

---

### Phase 5: Testing

#### Unit Tests
```javascript
// Test the fix directly
describe('todoService.parseResponse', () => {
  it('handles new API response format', () => {
    const response = { items: [{id: 1, text: 'Test'}] };
    expect(parseResponse(response)).toEqual([{id: 1, text: 'Test'}]);
  });

  it('handles legacy API response format (backward compat)', () => {
    const response = { data: { items: [{id: 1, text: 'Test'}] } };
    expect(parseResponse(response)).toEqual([{id: 1, text: 'Test'}]);
  });

  it('handles missing items gracefully', () => {
    expect(parseResponse({})).toEqual([]);
    expect(parseResponse(null)).toEqual([]);
  });
});
```

#### Integration Tests
```javascript
// Test in real-world scenario
describe('Todo list with new API format', () => {
  it('displays todos from API', async () => {
    // Mock API with new format
    server.use(
      rest.get('/api/todos', (req, res, ctx) => {
        return res(ctx.json({ items: [{id: 1, text: 'Test'}] }));
      })
    );

    render(<TodoList />);
    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });
});
```

#### Regression Testing
```bash
# Ensure fix doesn't break other features
npm run test                    # All unit tests
npm run test:integration       # Integration tests
npm run test:e2e               # End-to-end user flows
npm run test:regression:issue  # Issue-specific regression
```

#### Manual Testing Checklist
- [ ] Reproduce original issue → Now fixed ✓
- [ ] Test common user workflows → Still work ✓
- [ ] Test edge cases → Handle gracefully ✓
- [ ] Test on different browsers/devices → All pass ✓
- [ ] Test with different data scenarios → All pass ✓
- [ ] Performance impact acceptable
- [ ] Accessibility still compliant
- [ ] No console errors/warnings

**Test Results:**
```
Unit Tests:        23/23 PASSED ✓
Integration Tests: 8/8 PASSED ✓
E2E Tests:         12/12 PASSED ✓
Regression Tests:  42/42 PASSED ✓

Coverage:
- Statements: 87% (↑ 2% from fix)
- Branches: 82%
- Functions: 88%
- Lines: 86%
```

---

### Phase 6: Code Review & Validation

#### Pre-Review Checklist
- [ ] All tests passing
- [ ] No lint/type errors
- [ ] Code follows standards
- [ ] Commits are clean and atomic
- [ ] PR description complete

#### PR Template
```markdown
## Issue
Fixes #123 - Todo items not displaying after refresh

## Root Cause
API response format changed in v1.2.3 from 
`{ data: { items: [...] } }` to `{ items: [...] }`
Frontend parser not updated to match new format

## Changes
- Updated `todoService.parseResponse()` to handle new format
- Added backward compatibility for transition period
- Added unit tests for both old and new formats

## Testing
- ✓ Unit tests: 5/5 passing
- ✓ Integration tests: 3/3 passing
- ✓ E2E tests: All passing
- ✓ Manual test on Chrome/Safari/Firefox
- ✓ No performance regression

## Breaking Changes
None - fix is backward compatible

## Deployment Notes
Safe to deploy immediately
No database migrations needed
No environment variable changes
```

#### Review Checklist
- [ ] Fix addresses root cause
- [ ] Solution is appropriate (not over-engineered)
- [ ] Code quality meets standards
- [ ] Tests are comprehensive
- [ ] No regressions introduced
- [ ] Documentation updated
- [ ] Performance acceptable
- [ ] Security reviewed
- [ ] Accessibility verified

---

### Phase 7: Deployment & Monitoring

#### Deployment Process
```bash
# 1. Merge to main
git checkout main
git pull origin main
git merge fix/issue-#123
git push origin main

# 2. Tag release
git tag -a v1.2.4 -m "Fix: Todo items display after refresh"
git push origin v1.2.4

# 3. Deploy
npm run deploy:production --version=v1.2.4

# 4. Verify deployment
npm run health:check
npm run smoke:tests
```

#### Post-Fix Monitoring
```bash
# Monitor for regressions
npm run monitor:errors --duration=1h
npm run monitor:performance --duration=1h

# Key metrics to watch:
# - Error rate (should be < 0.1%)
# - Response latency (should be baseline ± 5%)
# - User session duration (should be normal)
# - Todo creation/display workflows (should work)
```

**Monitoring Dashboard:**
```
Issue #123: Todo Display Fix
Deployed: 2026-04-21 15:30 UTC
Version: v1.2.4

Status: ✅ HEALTHY
┌─ Error Rate: 0.02% (was 2.5%) ↓ 98% improvement
├─ P95 Latency: 245ms (baseline 240ms) ✓
├─ Todo Items Displayed: 100% (was 0%) ✓
├─ User Sessions: 45,000 (normal) ✓
└─ Rollback Plan: Ready if needed

Incidents: None
Alerts: None
```

---

### Phase 8: Documentation & Knowledge Capture

#### Issue Resolution Summary
```markdown
# Issue #123: Todo items not displaying after refresh

## Summary
Fixed API response parsing to handle breaking change in v1.2.3

## What Went Wrong
- Backend API response format changed without deprecation warning
- Frontend parser assumed old format `{ data: { items: [...] } }`
- New format is `{ items: [...] }`
- Result: Empty items array on page refresh

## How It Was Fixed
Updated `src/api/todoService.js` parseResponse() function to:
1. Accept both old and new API response formats
2. Add null-safety checks with optional chaining
3. Default to empty array if items missing

## What We Learned
1. **API versioning**: Implement versioned endpoints or deprecation warnings
2. **Contract testing**: Add integration tests for API contracts
3. **Communication**: Backend breaking changes need frontend notification
4. **Resilience**: Add defensive coding for data parsing

## Prevention Strategy
- [ ] Add API contract tests
- [ ] Implement API versioning (v1/v2 endpoints)
- [ ] Add deprecation warnings 3 releases ahead
- [ ] Cross-team communication for breaking changes
- [ ] Add monitoring for API response format
```

#### Update Knowledge Base
- [ ] Wiki/documentation updated
- [ ] Runbook updated (if operational issue)
- [ ] FAQ updated (if common issue)
- [ ] Team learned from this incident

#### Communicate Resolution
```
Slack: @channel
Issue #123 RESOLVED ✓
Todo items now display correctly after refresh
Fix deployed to production v1.2.4
No action needed from your side
```

---

## Issue Resolution Metrics

Track per-issue:
- **Time to Resolution**: Triage → Deployed
- **Mean Time to Detect** (MTTD)
- **Mean Time to Resolve** (MTTR)
- **Time to Root Cause**
- **Test Coverage Added**
- **Recurrence Rate** (same issue after 30 days)
- **Severity Accuracy** (was classification correct?)

---

## Common Issue Patterns & Solutions

### Pattern: Undefined/Null Reference
```javascript
// ❌ Error prone
data.user.profile.avatar.url

// ✅ Safe with optional chaining
data?.user?.profile?.avatar?.url

// ✅ Or with nullish coalescing
data?.user?.profile?.avatar?.url ?? '/default-avatar.png'
```

### Pattern: Race Condition
```javascript
// ❌ Prone to race conditions
const fetchTodos = async () => {
  const todos = await api.getTodos();
  setTodos(todos); // May be stale if component unmounted
};

// ✅ Safe with cleanup
useEffect(() => {
  let isMounted = true;
  
  const fetchTodos = async () => {
    const todos = await api.getTodos();
    if (isMounted) {
      setTodos(todos);
    }
  };
  
  fetchTodos();
  return () => { isMounted = false; };
}, []);
```

### Pattern: Memory Leak
```javascript
// ❌ Listener not removed
useEffect(() => {
  window.addEventListener('resize', handleResize);
  // Missing cleanup!
});

// ✅ Cleanup in return
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

### Pattern: State Not Updating
```javascript
// ❌ Mutating state directly
const handleAddTodo = (todo) => {
  todos.push(todo); // Wrong!
  setTodos(todos);
};

// ✅ Create new array
const handleAddTodo = (todo) => {
  setTodos([...todos, todo]);
};
```

---

## Escalation Criteria

Escalate if:
- Root cause unclear after 4 hours (P0) or 1 day (P1)
- Fix requires architectural change
- Multiple components affected
- Data integrity concerns
- Security implications
- Customer escalation received
- Affecting multiple customers

**Escalation Process:**
1. Notify tech lead / engineering manager
2. Create incident war room if P0/P1
3. Involve affected team leads
4. Document blockers and dependencies
5. Daily status updates to stakeholders

---

## Issue Closure Criteria

✅ **Issue can be closed when:**
- Fix implemented and reviewed
- All tests passing (unit, integration, regression)
- Deployed to production
- Verified in production (monitoring clean, users confirmed)
- Documentation updated
- Knowledge base captured
- Root cause understood and prevention plan documented
- No related issues discovered

---

## Issue Reopening

If issue recurs after closure:
1. Add to existing issue (don't create new)
2. Label as "Regression"
3. Investigate: Why did the original fix fail?
4. Higher severity (already allocated resources)
5. Root cause analysis mandatory
