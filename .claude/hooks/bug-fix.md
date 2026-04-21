---
name: "Bug Fix Workflow"
description: "Enterprise systematic bug fixing with reproduction, root cause analysis, minimal fixes, comprehensive testing, and prevention"
trigger: "manual"
---

# Enterprise Bug Fix Workflow

Systematically fix bugs with reproducible steps, root cause analysis, comprehensive testing, and prevention strategies.

---

## Phase 1: Bug Reproduction & Validation

### Step 1.1: Understand the Bug Report
- [ ] **Title**: Clear, specific description (not "bug", "error", "something broken")
- [ ] **Severity**: P0-P4 assigned (see severity levels)
- [ ] **Reproduction Steps**: Clear, numbered, repeatable instructions
- [ ] **Expected Behavior**: What SHOULD happen
- [ ] **Actual Behavior**: What DOES happen
- [ ] **Environment**: Browser/OS, Node version, deployment (dev/staging/prod)
- [ ] **Error Message**: Full error trace/stack trace/logs
- [ ] **Video/Screenshot**: Visual evidence if applicable
- [ ] **Frequency**: Always, intermittent, under specific conditions?
- [ ] **Affected Users**: Single user, specific user segment, all users?

**Bug Report Quality Checklist:**
```
Issue: #423 - Todo items disappear after edit

Severity: P1 (High)
Component: TodoItem editor
Browser: Chrome 100, Firefox 99
Device: Desktop, Laptop
Reproducibility: Always (100%)

Steps to Reproduce:
1. Navigate to localhost:3000
2. Click on any todo item
3. Edit the text (change "Buy milk" to "Buy bread")
4. Press Enter to save
5. Observe: Item disappears from list

Expected: Item updated and visible in list with new text
Actual: Item removed from DOM entirely

Error Message:
[None - silent failure]

Related Screenshots:
[Before edit.png] → [After edit.png]

First Observed: v1.2.3 (worked in v1.2.2)
Regression: Yes - recent change
Impact: 15% of users affected (editing power users)
Workaround: None - forces reload page
```

### Step 1.2: Environment Validation
```bash
# Verify development environment
node -v          # Should match CLAUDE.md requirement (22.x)
npm -v           # Package manager version
npm list react   # React version

# Clear cache and reinstall
rm -rf node_modules
npm install

# Verify reproduction in dev environment
npm run dev
# [Follow reproduction steps]

# Verify in production build
npm run build
npm run preview
# [Follow reproduction steps]
```

### Step 1.3: Create Failing Test Case

**Unit Test Example:**
```javascript
describe('TodoItem Editor', () => {
  it('should update todo text on save', () => {
    const mockTodo = { id: 1, text: 'Buy milk' };
    const mockOnUpdate = jest.fn();
    
    const { getByRole, getByDisplayValue } = render(
      <TodoItem todo={mockTodo} onUpdate={mockOnUpdate} />
    );
    
    // Edit the todo
    const input = getByDisplayValue('Buy milk');
    fireEvent.change(input, { target: { value: 'Buy bread' } });
    
    // Save the changes
    const saveButton = getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    
    // Assert: Item should still be in DOM with new text
    expect(getByDisplayValue('Buy bread')).toBeInTheDocument();
    expect(mockOnUpdate).toHaveBeenCalledWith(1, 'Buy bread');
  });
});
```

**Integration Test Example:**
```javascript
describe('Todo Edit Integration', () => {
  it('should persist edited todo to storage', async () => {
    // Arrange
    const initialTodos = [
      { id: 1, text: 'Buy milk', completed: false }
    ];
    localStorage.setItem('todos', JSON.stringify(initialTodos));
    
    // Act
    render(<TodoApp />);
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    const input = screen.getByDisplayValue('Buy milk');
    fireEvent.change(input, { target: { value: 'Buy bread' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    // Assert
    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('todos'));
      expect(stored[0].text).toBe('Buy bread');
    });
    
    expect(screen.getByText('Buy bread')).toBeInTheDocument();
  });
});
```

**Run Test to Verify Failure:**
```bash
npm run test -- TodoItem.test.js
# Output:
# ✓ should update todo text on save (FAILED)
# Expected: "Buy bread" to be found in document
# Received: <div class="todo-list"></div> <!-- Empty! -->
```

### Step 1.4: Isolate the Problem
```bash
# 1. Is it reproducible locally?
# ✓ Yes - confirmed on my machine

# 2. Is it reproducible in staging?
# ✓ Yes - reproduced on staging-env.com

# 3. Is it reproducible in production?
# ✓ Yes - 15% of users affected

# 4. Can you narrow it down?
# Try: Only with new text? With special characters? Every time?
# Try: Mobile vs desktop? All browsers or specific ones?
# Try: After page refresh? Using back button?

# 5. When was the regression introduced?
git log --oneline | head -20
# 6f5aec5 (v1.2.3) Updated todo editing logic
# d555aa6 (v1.2.2) Previous stable version (working)

# Yes - broke between v1.2.2 and v1.2.3
```

---

## Phase 2: Root Cause Analysis

### Step 2.1: Understand the Symptom
```
Symptom:
├─ Todo item disappears after edit
├─ No error in console
├─ No network errors
└─ Silent failure (app continues working)

Questions:
├─ Is the item deleted from state?
├─ Is the item hidden with CSS?
├─ Is the list not re-rendering?
├─ Is the item being removed from DOM?
└─ Is the edit handler failing silently?
```

### Step 2.2: Debug Execution Flow

**Browser DevTools Strategy:**
```javascript
// 1. Add breakpoints in edit handler
// src/components/TodoItem.jsx, line 45:
const handleSave = (newText) => {
  console.log('handleSave called with:', newText);
  onUpdate(id, newText); // ← Breakpoint here
};

// 2. Step through code
// Watch: onUpdate function execution
// Watch: Component re-render

// 3. Check state changes
// React DevTools: Does parent state update?
// Does todos array include the updated item?

// 4. Check DOM changes
// DevTools Elements tab: Is item removed or hidden?
```

**Network/API Debugging:**
```bash
# Check Network tab in DevTools
# Is there an API call to update todo?
# Does it succeed or fail?
# Is response data correct?

# Check API logs
tail -f /var/log/app.log | grep "UPDATE.*todo"
# Look for error responses, timeouts, data validation failures
```

**State Management Debugging:**
```javascript
// 1. Add logging to state updates
// src/hooks/useTodos.js:
const updateTodo = (id, text) => {
  console.log('Before update:', todos);
  const updated = todos.map(t => 
    t.id === id ? { ...t, text } : t
  );
  console.log('After update:', updated);
  setTodos(updated);
};

// 2. Use React DevTools profiler
// Record profile while editing
// Identify: Which component re-renders?
// Identify: Is state change reflected in UI?
```

### Step 2.3: Trace the Issue Path

**Scenario: Item disappears silently**

```
Start: User clicks "Edit"
↓
EditMode activated
  └─ Verify: onEdit callback fired? ✓
↓
User types new text
  └─ Verify: Input onChange firing? ✓
  └─ Verify: State (newText) updating? ✓
↓
User presses Enter
  └─ Verify: handleSave called? ✓
  └─ Verify: onUpdate callback called? ✓
↓
Parent receives updated todo
  └─ Verify: updateTodos function called? ✓
  └─ Verify: State array updated? ✓
  └─ Verify: Child component receives new props? ✓
↓
TodoItem re-renders with new text
  └─ Verify: Component renders? ✓ BUT...
  └─ Verify: Item displays in DOM? ✗ FOUND IT!
↓
Root Cause Identified:
Item state updates but doesn't render
Likely: Missing key prop or list rendering issue
```

### Step 2.4: Locate Root Cause

**Hypothesis Testing:**

```javascript
// Hypothesis 1: Missing key prop
// src/components/TodoList.jsx
// ❌ WRONG:
todos.map((todo, index) => (
  <TodoItem key={index} todo={todo} /> // Using index as key!
))

// When list updates, React can't track which item is which
// Item appears to disappear because React reuses DOM nodes

// ✓ CORRECT:
todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} /> // Use stable ID
))
```

**Root Cause Found:**
```
Issue: Todo item disappears after edit
Location: src/components/TodoList.jsx:32
Root Cause: Using array index as key instead of todo.id

Why This Happens:
1. Initial render: 
   [Todo 1, Todo 2, Todo 3]
   keys: [0, 1, 2]

2. After editing Todo 1:
   [Todo 1 (updated), Todo 2, Todo 3]
   keys: [0, 1, 2] (same keys!)

3. React sees same keys in same positions
   Reuses same DOM nodes
   Item appears to disappear because React 
   reused the DOM for the first item

4. When list re-orders or items are deleted:
   DOM reuse causes visual bugs, lost state,
   missing items, incorrect data display

Timeline:
├─ v1.2.2: Code worked (keys were used correctly)
├─ v1.2.3: Commit 6f5aec5 changed key from {todo.id} to {index}
└─ Result: Break in list rendering logic

Affected Code:
Line 32: <TodoItem key={index} todo={todo} />
         ^^^^^^^^^^^^^^
         Should be: key={todo.id}
```

### Step 2.5: Check for Similar Issues

```bash
# Search for other instances of this pattern
grep -r "key={index}" src/
# Results:
# src/components/TodoList.jsx:32  (FOUND)
# src/components/TagList.jsx:45   (ALSO WRONG!)

# Search for array index keys
grep -r "\.map((.*,.*index" src/
# Results:
# 3 more instances with same pattern

# Check git blame for when this pattern was introduced
git blame src/components/TodoList.jsx | grep "key={index}"
# 6f5aec5 - Updated todo editing logic

# Check what else changed in that commit
git show 6f5aec5
# Multiple key changes - refactoring side effect?
```

**Similar Issues Found:**
- [ ] TodoList.jsx:32 - Using index key (PRIMARY)
- [ ] TagList.jsx:45 - Using index key (SECONDARY)
- [ ] CategoryList.jsx:12 - Using index key (SECONDARY)

---

## Phase 3: Solution Design & Implementation

### Step 3.1: Decide Fix Strategy

**Options:**
```
1. Quick Fix (Patch)
   Change: key={index} → key={todo.id}
   Time: 2 minutes
   Risk: Low
   ✓ RECOMMENDED

2. Comprehensive Fix (Full Solution)
   Change: key={index} → key={todo.id}
   Also: Fix all similar patterns in codebase
   Also: Add lint rule to prevent recurrence
   Time: 30 minutes
   Risk: Low (but larger scope)
   
3. Defensive Fix (Extra Safe)
   Change: key={index} → key={todo.id}
   Also: Add test for key prop requirement
   Also: Update code review checklist
   Time: 1 hour
   Risk: Very low (prevents recurrence)
```

**Decision: Go with Comprehensive Fix**
- Fixes primary issue
- Prevents similar bugs
- Adds safeguards

### Step 3.2: Implement the Fix

**Minimal, Focused Change:**
```javascript
// ❌ BEFORE (Buggy)
// src/components/TodoList.jsx:32
return (
  <div className="todo-list">
    {todos.map((todo, index) => (
      <TodoItem
        key={index}  // ← BUG: Using array index as key
        todo={todo}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    ))}
  </div>
);

// ✓ AFTER (Fixed)
// src/components/TodoList.jsx:32
return (
  <div className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}  // ✓ Using stable ID as key
        todo={todo}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    ))}
  </div>
);
```

**Similar Fixes (Secondary Issues):**
```javascript
// src/components/TagList.jsx:45 - BEFORE
{tags.map((tag, index) => (
  <Tag key={index} tag={tag} />  // ❌
))}

// src/components/TagList.jsx:45 - AFTER
{tags.map(tag => (
  <Tag key={tag.id} tag={tag} />  // ✓
))}
```

**Commit Message:**
```
fix(list): use stable ID for React keys instead of array indices

Previously, list components used array indices as React keys,
which caused items to disappear or display incorrectly after
edits due to React DOM reconciliation issues.

Changes:
- TodoList: key={index} → key={todo.id}
- TagList: key={index} → key={tag.id}
- CategoryList: key={index} → key={category.id}

Root Cause:
React keys must be stable across re-renders. When using array
indices as keys, React reuses DOM nodes incorrectly when list
order changes or items are added/removed, causing visual bugs
and lost state.

Testing:
- Added test: should not lose items when editing
- Added test: should maintain correct item order
- Regression tested: all list operations

Fixes: #423
Tested: Chrome, Firefox, Safari
```

### Step 3.3: Validate Changes
- [ ] Change is minimal and focused (5 lines changed, not 50)
- [ ] Only addresses the root cause (no unrelated cleanup)
- [ ] Follows CLAUDE.md code standards
- [ ] No console.log or debugger statements
- [ ] No performance regression
- [ ] No breaking changes
- [ ] Backward compatible

---

## Phase 4: Comprehensive Testing

### Step 4.1: Unit Tests (Specific Fix)

```javascript
describe('TodoList - Key Prop Fix', () => {
  it('should use todo.id as key, not array index', () => {
    const todos = [
      { id: 1, text: 'First' },
      { id: 2, text: 'Second' },
      { id: 3, text: 'Third' }
    ];
    
    const { rerender, getByText } = render(
      <TodoList todos={todos} />
    );
    
    // Verify items render
    expect(getByText('First')).toBeInTheDocument();
    expect(getByText('Second')).toBeInTheDocument();
    expect(getByText('Third')).toBeInTheDocument();
  });

  it('should preserve item state when editing', async () => {
    // This would fail with index keys but pass with id keys
    const todos = [
      { id: 1, text: 'Buy milk', completed: false }
    ];
    
    const { getByDisplayValue } = render(
      <TodoList todos={todos} onUpdate={jest.fn()} />
    );
    
    const input = getByDisplayValue('Buy milk');
    fireEvent.change(input, { target: { value: 'Buy bread' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    // Item should still be visible
    expect(getByDisplayValue('Buy bread')).toBeInTheDocument();
  });

  it('should handle list reordering correctly', () => {
    const todos = [
      { id: 1, text: 'First' },
      { id: 2, text: 'Second' },
      { id: 3, text: 'Third' }
    ];
    
    // With index keys, this would cause wrong items to reuse DOM
    const reorderedTodos = [
      { id: 2, text: 'Second' },
      { id: 1, text: 'First' },
      { id: 3, text: 'Third' }
    ];
    
    const { rerender } = render(<TodoList todos={todos} />);
    rerender(<TodoList todos={reorderedTodos} />);
    
    // Items should appear in correct order
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Second');
    expect(items[1]).toHaveTextContent('First');
    expect(items[2]).toHaveTextContent('Third');
  });
});
```

### Step 4.2: Integration Tests (Original Bug Scenario)

```javascript
describe('Todo Edit - Integration Test', () => {
  it('should not lose items after edit (Bug #423 regression)', async () => {
    // This is the exact failing scenario from bug report
    const initialTodos = [
      { id: 1, text: 'Buy milk', completed: false },
      { id: 2, text: 'Buy eggs', completed: false },
      { id: 3, text: 'Buy bread', completed: false }
    ];
    
    render(
      <TodoApp initialTodos={initialTodos} />
    );
    
    // Get first todo
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    
    // Edit first todo
    const editButton = screen.getAllByRole('button', { name: /edit/i })[0];
    fireEvent.click(editButton);
    
    const input = screen.getByDisplayValue('Buy milk');
    fireEvent.change(input, { target: { value: 'Buy cream' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    // Verify: Item should still exist with new text
    await waitFor(() => {
      expect(screen.getByText('Buy cream')).toBeInTheDocument();
      expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();
    });
    
    // Verify: Other items still present
    expect(screen.getByText('Buy eggs')).toBeInTheDocument();
    expect(screen.getByText('Buy bread')).toBeInTheDocument();
  });
});
```

### Step 4.3: Regression Testing

```bash
# Run full test suite
npm run test
# Output:
# ✓ 47/47 tests passing
# ✓ No new failures introduced
# ✓ Coverage maintained at 85%

# Run specific regression tests
npm run test:regression
# Output:
# ✓ Todo edit: items not disappearing (was failing)
# ✓ Todo reorder: correct order maintained
# ✓ Todo delete: other items unaffected

# Test with existing test data
npm run test:e2e
# Output:
# ✓ User workflow: Create → Edit → Delete → List correct
# ✓ Edge cases: Empty list, 1000+ items, special characters
```

### Step 4.4: Manual Verification Checklist

```
Manual Testing for Bug #423 Fix
═════════════════════════════════════════

Environment: Development (npm run dev)

Test 1: Edit Todo Item
  [ ] Create new todo
  [ ] Click edit
  [ ] Change text
  [ ] Press Enter
  [ ] Verify: Item updated, still visible ✓
  
Test 2: Edit Multiple Items
  [ ] Edit first item ✓
  [ ] Edit second item ✓
  [ ] Edit third item ✓
  [ ] Verify: All three items still visible ✓
  
Test 3: Rapid Editing
  [ ] Edit 5 items in quick succession
  [ ] Verify: No items disappear ✓
  [ ] Verify: All changes persisted ✓
  
Test 4: Special Characters
  [ ] Edit with emoji: "🎉 Party time"
  [ ] Edit with unicode: "Café"
  [ ] Edit with HTML: "<script>alert('xss')</script>"
  [ ] Verify: Display correct (sanitized) ✓
  
Test 5: List Reordering
  [ ] Add items: A, B, C
  [ ] Edit A
  [ ] Delete B
  [ ] Add D
  [ ] Verify: Correct list: A (edited), C, D ✓
  
Test 6: Cross-Browser
  [ ] Chrome - PASS ✓
  [ ] Firefox - PASS ✓
  [ ] Safari - PASS ✓
  [ ] Edge - PASS ✓

Test 7: Performance
  [ ] Edit with 100 items: Instant ✓
  [ ] Edit with 1000 items: < 100ms ✓
  [ ] No memory leaks: ✓
  
Overall Result: ✅ ALL TESTS PASS - Fix verified
```

**Performance Verification:**
```bash
# Check for performance regression
npm run performance:test

# Before fix: TODO list edit = 150ms
# After fix:  TODO list edit = 145ms
# Delta: -5ms (IMPROVEMENT) ✓
```

---

## Phase 5: Code Review & Approval

### Step 5.1: Pre-Review Checklist
- [ ] All tests passing (unit + integration + regression)
- [ ] No console errors or warnings
- [ ] Code follows CLAUDE.md standards
- [ ] Commits are clean and atomic
- [ ] Commit messages explain root cause
- [ ] PR description complete and clear
- [ ] No performance regression
- [ ] Manual testing completed

### Step 5.2: Code Review PR Description

```markdown
## Bug Fix #423: Todo items disappearing after edit

### Root Cause
Array indices were used as React keys instead of stable todo IDs.
When list updates, React reuses DOM nodes incorrectly, causing
items to disappear or display incorrectly.

### Impact
- **Severity:** P1 (High)
- **Users Affected:** 15% (editing power users)
- **Regression:** v1.2.3 (worked in v1.2.2)
- **Scope:** TodoList, TagList, CategoryList components

### Changes
- ✓ TodoList.jsx:32 - key={index} → key={todo.id}
- ✓ TagList.jsx:45 - key={index} → key={tag.id}
- ✓ CategoryList.jsx:12 - key={index} → key={category.id}

### Testing
- ✓ Unit tests: 5/5 passing (new tests for key behavior)
- ✓ Integration tests: 8/8 passing (original bug scenario)
- ✓ Regression tests: 42/42 passing
- ✓ Manual testing: All browsers + edge cases
- ✓ Performance: No regression (slight improvement)

### Verification
Before Fix:
```
Edit first item → Item disappears from list ✗
```

After Fix:
```
Edit first item → Item displays with updated text ✓
```

### Breaking Changes
None - fix is backward compatible

### Deployment Notes
- Safe to deploy immediately
- No database changes
- No config changes
- No breaking changes

### Checklist
- [x] Code follows standards
- [x] All tests passing
- [x] Root cause documented
- [x] Similar issues identified and fixed
- [x] Manual verification complete
- [x] Performance verified
- [x] Ready for production
```

### Step 5.3: Review Approval Criteria
- ✓ Fix addresses root cause (not symptom)
- ✓ Solution is minimal and focused
- ✓ Code quality meets standards
- ✓ Tests are comprehensive
- ✓ No regressions introduced
- ✓ Documentation complete
- ✓ Performance acceptable
- ✓ Security reviewed
- ✓ Ready to merge

---

## Phase 6: Deployment & Monitoring

### Step 6.1: Merge & Deploy

```bash
# Merge to main
git checkout main
git pull origin main
git merge fix/bug-423-item-disappear
git push origin main

# Tag release
git tag -a v1.2.4 -m "Fix: Todo items disappearing after edit"
git push origin v1.2.4

# Deploy to production
npm run deploy:production --version=v1.2.4

# Verify deployment
npm run health:check
npm run smoke:tests
```

### Step 6.2: Post-Deployment Monitoring

```bash
# Monitor error rate (should drop from 2.5% to ~0%)
npm run monitor:errors --duration=1h

# Monitor key user workflows
npm run monitor:workflow --workflow=edit-todo --duration=1h

# Monitor performance
npm run monitor:performance --duration=1h

# Monitor user impact
npm run monitor:impact --metric=item-disappear-reports --duration=24h
```

**Monitoring Dashboard:**
```
Bug Fix #423 Monitoring
═══════════════════════════════════════

Deployed: 2026-04-21 16:45 UTC
Version: v1.2.4

Status: ✅ HEALTHY
├─ Error Rate: 0.02% (was 2.5%) ↓ 99% improvement ✓
├─ Todo Edit Success: 100% (was ~85%) ✓
├─ Item Disappear Reports: 0 (was 127/24h) ✓
├─ User Sessions: 50,000 (normal) ✓
└─ Performance: 145ms edit time (was 150ms) ✓

Incidents: None
Alerts: None
Rollback: Ready but not needed
```

---

## Phase 7: Documentation & Prevention

### Step 7.1: Root Cause Documentation

```markdown
# Issue #423: Todo Items Disappearing After Edit

## What Happened
Users reported that todo items would disappear from the list
after editing, particularly affecting power users who frequently
edit tasks. The issue was reproducible 100% of the time and
affected 15% of the user base.

## Root Cause
**Array indices were used as React keys instead of stable IDs.**

React uses keys to identify which items have changed. When using
array indices as keys:
- Item at position 0 has key "0"
- Item at position 1 has key "1"
- Item at position 2 has key "2"

When the list updates and re-renders, React still sees keys
[0, 1, 2] in the same positions and reuses the same DOM nodes.
This causes React to associate the wrong data with wrong DOM
elements, resulting in items appearing to disappear.

## Why It Went Unnoticed
- Commit 6f5aec5 changed keys from `{todo.id}` to `{index}`
- The change was subtle (refactoring side effect)
- The bug only manifests during edits or deletions
- Test coverage for list rendering was incomplete

## How It Was Fixed
Changed all list components to use stable IDs as React keys:
- `key={index}` → `key={todo.id}`
- Applied to: TodoList, TagList, CategoryList

## Prevention Strategies
1. **Code Review**: Always check for `key={index}` pattern
2. **Linting**: Added ESLint rule to warn on index keys
3. **Testing**: Added tests verifying key stability
4. **Standards**: Updated CLAUDE.md with best practice
5. **Monitoring**: Alert on list rendering issues

## Lessons Learned
1. React keys are critical for list rendering
2. Tests must cover list mutations (add, delete, reorder)
3. Code review should check for anti-patterns
4. Similar patterns in codebase should be found immediately
```

### Step 7.2: Update Project Standards

**Update CLAUDE.md:**
```markdown
## React List Best Practices

❌ NEVER use array indices as React keys:
```javascript
{items.map((item, index) => (
  <Item key={index} item={item} />  // WRONG!
))}
```

✓ ALWAYS use stable, unique identifiers:
```javascript
{items.map(item => (
  <Item key={item.id} item={item} />  // Correct
))}
```

Why: React uses keys to identify items across renders.
Index-based keys cause React to reuse DOM nodes incorrectly,
leading to items disappearing, losing state, and incorrect updates.

See Issue #423 for example of this bug.
```

### Step 7.3: Add Linting Rule

```javascript
// .eslintrc.json
{
  "rules": {
    "react/jsx-key": "error",  // Warn on missing keys
    "react/no-array-index-key": "warn"  // Warn on index keys
  }
}
```

### Step 7.4: Update Code Review Checklist

**Add to code review template:**
```
Code Review Checklist

List Rendering:
- [ ] Lists use stable, unique keys (not array indices)
- [ ] Keys are consistent across renders
- [ ] No missing keys on list items
- [ ] Tests verify list mutation behavior
```

### Step 7.5: Capture in Knowledge Base

**Wiki/Documentation Update:**
```
# Common React Bugs & Prevention

## Bug: Items Disappear from List
**Pattern**: Using array index as React key
**Symptom**: Items vanish after edit/delete/reorder
**Solution**: Use stable ID as key
**Prevention**: Code review + linting rule
**References**: Issue #423, React docs on keys
```

---

## Phase 8: Issue Closure & Metrics

### Step 8.1: Closure Verification
- ✓ Fix implemented and merged
- ✓ All tests passing
- ✓ Deployed to production
- ✓ Verified in production (error rate dropped)
- ✓ Root cause documented
- ✓ Prevention strategies implemented
- ✓ Similar issues fixed (TagList, CategoryList)
- ✓ Knowledge base updated
- ✓ Linting rule added

**Close Issue #423**
```
✅ RESOLVED in v1.2.4

Root cause: Array indices used as React keys
Solution: Changed to stable ID keys
Verification: Error rate 2.5% → 0.02%
Impact: 127 daily reports → 0
Prevention: Linting rule + test coverage

Thanks for reporting!
```

### Step 8.2: Metrics & Impact

```
Bug #423 Metrics
════════════════════════════════════════════

Time to Resolution:
├─ Report to Triage: 10 minutes
├─ Triage to Fix: 45 minutes
├─ Fix to Merge: 30 minutes
├─ Merge to Deploy: 15 minutes
└─ Total MTTR: 100 minutes (< 2 hours target)

Impact Analysis:
├─ Users Affected: 7,500 users (15% of base)
├─ Error Reports: 127 in 24h before fix
├─ Error Reports: 0 in 24h after fix
├─ Success Rate: 85% → 100%
└─ ROI: Fixed critical bug affecting 7,500 users

Prevention:
├─ Linting rule: Prevents future index-key bugs
├─ Test coverage: Prevents regression (3 new tests)
├─ Similar issues: Fixed 2 more (TagList, CategoryList)
└─ Knowledge captured: Prevents same bug in similar code

Quality:
├─ Tests passing: 47/47 ✓
├─ Code review: Approved ✓
├─ No regressions: Verified ✓
├─ Performance: No impact (slight improvement) ✓
└─ Deployment: Smooth, no rollback needed ✓
```

---

## Bug Fix Workflow Summary

### Checklist (Copy for Each Bug)

```
Bug Fix Workflow - Issue #___
═════════════════════════════════════════

Phase 1: Reproduction
  [ ] Bug report analyzed
  [ ] Environment validated
  [ ] Failing test written
  [ ] Problem isolated
  
Phase 2: Root Cause Analysis
  [ ] Symptom documented
  [ ] Execution flow traced
  [ ] Root cause identified
  [ ] Similar issues found
  
Phase 3: Solution Design
  [ ] Fix strategy chosen
  [ ] Implementation planned
  [ ] Standards verified
  
Phase 4: Testing
  [ ] Unit tests passing
  [ ] Integration tests passing
  [ ] Regression tests passing
  [ ] Manual testing complete
  [ ] Performance verified
  
Phase 5: Code Review
  [ ] Pre-review checklist complete
  [ ] PR description clear
  [ ] Review approved
  
Phase 6: Deployment
  [ ] Merged to main
  [ ] Tagged and released
  [ ] Deployed to production
  [ ] Post-deployment verified
  
Phase 7: Documentation
  [ ] Root cause documented
  [ ] Standards updated
  [ ] Linting rules added
  [ ] Knowledge base updated
  
Phase 8: Closure
  [ ] Issue closed
  [ ] Metrics captured
  [ ] Prevention strategies active

Status: ✅ COMPLETE
Time: [hours] | Users Impacted: [#] | Prevention: [Implemented]
```

---

## Quick Reference: When to Use This Workflow

**Use This Workflow When:**
- ✅ Fixing reported bugs
- ✅ Fixing production incidents
- ✅ Addressing regressions
- ✅ Responding to critical issues

**Also Reference:**
- `/fix-issue` - Full issue resolution methodology
- `/security-review` - Security-specific bug analysis
- `/review` - Code quality verification
