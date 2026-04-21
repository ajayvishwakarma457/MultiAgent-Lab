# MultiAgent-Lab - Local Development Setup

> **Purpose**: Machine-specific and session-specific configurations.
> Edit this file for local overrides without affecting team standards in CLAUDE.md.

**Developer**: Ajay Spak (ajay@spakcomm.com)  
**Last Updated**: 2026-04-21  
**Machine**: Local development (macOS)

---

## ✅ Initial Setup Verification

### Prerequisites Check
```bash
# Verify Node version (should be 22.x)
node -v
# Expected: v22.x.x

# Verify npm version (should be 10+)
npm -v
# Expected: 10.x.x or higher

# Verify Git
git --version
# Expected: git version 2.x.x or higher
```

### First-Time Setup
```bash
# 1. Install dependencies
npm install

# 2. Verify installation
npm run lint        # Should pass with no errors
npm run test        # Should pass all tests

# 3. Start dev server
npm run dev         # Should start on http://localhost:5173

# 4. Open in browser
# Visit http://localhost:5173
# Should see todo app running with HMR working
```

### Setup Checklist
- [ ] Node 22.x installed
- [ ] npm dependencies installed
- [ ] Lint passing (no errors)
- [ ] Tests passing (baseline)
- [ ] Dev server starts successfully
- [ ] Browser opens to correct URL
- [ ] HMR working (change file, see instant update)
- [ ] VS Code extensions installed
- [ ] Git configured

---

## 🖥️ Development Environment

### Environment Variables
Create `.env.local` (automatically git-ignored):
```bash
# .env.local
VITE_API_URL=http://localhost:3000
VITE_DEBUG=true
VITE_LOG_LEVEL=debug
```

**Available Variables:**
- `VITE_API_URL`: API endpoint (for testing different backends)
- `VITE_DEBUG`: Enable debug logging (true/false)
- `VITE_LOG_LEVEL`: Logging level (debug, info, warn, error)

### Dev Server Configuration
- **Port**: 5173 (default Vite port)
- **Host**: localhost (or 127.0.0.1)
- **HMR**: Enabled (Hot Module Replacement)
- **Auto-refresh**: On file save

**Change Port (if needed):**
```bash
# Start on different port
npm run dev -- --port 3000
```

### Node & npm Configuration
```bash
# Verify npm configuration
npm config list

# Set npm registry (if needed)
npm config set registry https://registry.npmjs.org/

# Clear npm cache (if having issues)
npm cache clean --force
```

---

## 🏗️ IDE Setup (VS Code)

### Recommended Extensions
Install via VS Code Extensions Marketplace:

| Extension | ID | Purpose |
|-----------|-----|---------|
| ES7+ React/Redux/React-Native snippets | dsznajder.es7-react-js-snippets | Code snippets |
| ESLint | dbaeumer.vscode-eslint | Linting |
| Prettier | esbenp.prettier-vscode | Code formatting |
| React DevTools Profiler | codeinthedark.react-devtools-profiler | React profiling |
| Thunder Client | rangav.vscode-thunder-client | API testing |
| GitLens | eamodio.gitlens | Git integration |
| Vitest | vitest.explorer | Test explorer |

### VS Code Settings (.vscode/settings.json)
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  },
  "[javascriptreact]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  },
  "editor.rulers": [80],
  "editor.wordWrap": "on",
  "files.exclude": {
    "node_modules": true,
    ".git": true,
    "dist": true
  },
  "search.exclude": {
    "node_modules": true,
    "dist": true,
    ".next": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

### VS Code Keyboard Shortcuts (Optional)
Add to `.vscode/keybindings.json`:
```json
[
  {
    "key": "cmd+shift+f",
    "command": "editor.action.formatDocument"
  },
  {
    "key": "cmd+shift+l",
    "command": "eslint.executeAutofix"
  }
]
```

---

## 🧪 Testing Setup (Local)

### Test Framework: Vitest
- **Fast**: Sub-second test execution
- **Watch Mode**: Re-run tests on file change
- **Coverage**: Built-in coverage reporting
- **UI**: Visual test runner interface

### Running Tests
```bash
# Run all tests once
npm run test

# Run tests in watch mode (re-run on change)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests with UI interface
npm run test:ui

# Run specific test file
npm run test -- Counter.test.js

# Run tests matching pattern
npm run test -- --grep "should increment"

# Debug specific test
npm run test -- --inspect-brk Counter.test.js
```

### Test Coverage Goals
```bash
# Check coverage
npm run test:coverage

# Expected output:
# ────────────────────────────────
# File       % Stmts  % Branch  % Funcs  % Lines
# ────────────────────────────────
# All files     85.5     78.2    83.1    85.3
# ────────────────────────────────
```

**Local Target**: 80%+ coverage minimum

### Debugging Tests
```bash
# Run test with Node debugger
node --inspect-brk node_modules/.bin/vitest --run Counter.test.js

# Open chrome://inspect in Chrome
# Click "Inspect" on the running process
# Step through test code in DevTools
```

---

## 🐛 Debugging & Development Tools

### Browser DevTools (Chrome/Firefox)
1. **Open DevTools**: `F12` or `Cmd+Option+I`
2. **Network Tab**: Monitor API calls, see response times
3. **Console Tab**: View errors, logs, warnings
4. **Elements/Inspector Tab**: Inspect DOM, debug styling
5. **Performance Tab**: Profile app performance, identify bottlenecks

### React DevTools Extension
```bash
# 1. Install React DevTools browser extension
#    Chrome: React Developer Tools
#    Firefox: React Developer Tools

# 2. Open DevTools (F12)
# 3. Click "React" tab
# 4. Inspect components, view props/state
# 5. Use Profiler to identify slow renders
```

### React Profiler (Local Performance Analysis)
```bash
# Wrap component in Profiler to measure performance
import { Profiler } from 'react';

<Profiler id="TodoList" onRender={onRenderCallback}>
  <TodoList />
</Profiler>

// Use React DevTools Profiler tab to:
// - Record render performance
// - Identify slow components
// - See render reasons
```

### Network Throttling (Simulate Slow Connection)
In Chrome DevTools:
1. Network tab
2. Throttling dropdown (top-left)
3. Select "Slow 3G" or "Fast 3G"
4. Reload page
5. See how app performs on slow connection

### Console Debugging
```javascript
// Log component props/state
console.log('Todo state:', todo);

// Log render count (remove before commit!)
console.count('TodoItem render');

// Conditional logs
if (DEBUG) console.log('Debug info:', data);

// ✅ Remember: Remove all console.log before committing!
```

---

## ⚡ Performance Optimization (Local)

### Bundle Size Analysis
```bash
# Analyze bundle size locally
npm run analyze

# Opens visualization showing:
# - Module sizes
# - Duplicates
# - Optimization opportunities
```

### Development Performance
```bash
# Monitor dev server startup time
time npm run dev

# Expected: < 500ms startup

# Monitor HMR update speed
# Edit a file and note time to see changes
# Expected: < 100ms
```

### Lighthouse Audit (Local)
```bash
# 1. Build production bundle
npm run build

# 2. Preview build locally
npm run preview

# 3. Open Chrome DevTools (F12)
# 4. Lighthouse tab
# 5. Generate report (desktop + mobile)

# Expected scores: ≥90 across all categories
```

### React DevTools Profiler
1. Open React DevTools (F12 → React tab)
2. Go to Profiler tab
3. Click record button (circle icon)
4. Perform action (e.g., add todo, click button)
5. Stop recording
6. Analyze:
   - Which components rendered?
   - How long did it take?
   - What caused the render?

---

## 🔧 Troubleshooting & Common Issues

### Port Already in Use
```bash
# Find process using port 5173
lsof -i :5173

# Kill the process
kill -9 <PID>

# Or start on different port
npm run dev -- --port 3000
```

### Module Not Found Error
```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Or just reinstall specific package
npm install lodash
```

### Stale Cache Issues
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Clear npm cache
npm cache clean --force

# Reinstall and start fresh
npm install && npm run dev
```

### Tests Not Running
```bash
# Clear Vitest cache
npm run test -- --clearCache

# Reinstall Vitest
npm install --save-dev vitest

# Run tests again
npm run test
```

### ESLint/Prettier Conflicts
```bash
# Fix all lint errors automatically
npm run lint -- --fix

# Format code
npm run format

# Both should now be in sync
```

### Git Hook Issues (Husky)
```bash
# Reinstall git hooks
npx husky install

# Verify hooks installed
ls -la .husky/

# Try committing again
git commit -m "test"
```

### Dependency Conflicts
```bash
# Check for conflicts
npm ls

# Fix peer dependency warnings
npm install --legacy-peer-deps

# Or update package versions
npm update
```

### Slow Dev Server Startup
```bash
# Check what's slow
npm run dev -- --debug

# Clear cache and reinstall
rm -rf node_modules/.vite
npm run dev
```

### Hot Module Replacement (HMR) Not Working
```bash
# Check browser console for errors (F12)
# Usually causes: syntax error, type error

# Solutions:
# 1. Fix the error causing HMR to fail
# 2. Hard refresh browser (Cmd+Shift+R on Mac)
# 3. Restart dev server (npm run dev)
```

---

## 🔍 Troubleshooting Decision Tree

```
Issue: App won't start
├─ npm run dev fails?
│  ├─ Port in use? → kill process or use different port
│  ├─ Module not found? → npm install
│  ├─ Syntax error? → Check recent changes, fix error
│  └─ Other error? → Check error message, search online
│
Issue: Tests failing
├─ npm run test fails?
│  ├─ Module not found? → npm install
│  ├─ Import error? → Check import paths
│  ├─ Assertion failing? → Fix test or implementation
│  └─ Cache issue? → Clear Vitest cache
│
Issue: Linting errors
├─ npm run lint fails?
│  ├─ Formatting? → npm run format (auto-fix)
│  ├─ Style error? → npm run lint -- --fix
│  └─ Manual fix? → Read error message, update code
│
Issue: Browser shows error
├─ Check console (F12)
│  ├─ Red error? → Read stack trace, fix issue
│  ├─ Yellow warning? → Usually safe, but address if possible
│  └─ Network error? → Check API endpoint, start backend
│
Issue: Performance slow
├─ Dev server slow?
│  ├─ Clear cache → rm -rf node_modules/.vite
│  ├─ Restart → npm run dev
│  └─ Check resource usage → Activity Monitor
│
Issue: Build fails (npm run build)
├─ npm run build fails?
│  ├─ Type error? → Check TypeScript if enabled
│  ├─ Module not found? → npm install missing package
│  ├─ Build error? → Read error, check vite.config.js
│  └─ Too large? → Check bundle size with npm run analyze
```

---

## 📋 Git Workflow (Local)

### Branch Naming (Project Convention)
```bash
# Feature branch
git checkout -b feature/todo-priority-filter

# Bug fix branch
git checkout -b fix/api-timeout-handling

# Documentation branch
git checkout -b docs/api-guide

# Hotfix branch (critical bug)
git checkout -b hotfix/security-patch
```

### Before Pushing
```bash
# 1. Run linting
npm run lint

# 2. Run tests
npm run test

# 3. Format code
npm run format

# 4. Check commit message format
# Should be: type(scope): subject

# 5. Push to remote
git push origin feature/your-feature
```

### Git Aliases (Optional, Add to ~/.gitconfig)
```bash
[alias]
    st = status
    co = checkout
    br = branch
    cm = commit -m
    amend = commit --amend --no-edit
    log1 = log --oneline -10
    push-up = push -u origin HEAD
    sync = pull origin main --rebase
```

---

## 💡 Development Tips & Tricks

### Keyboard Shortcuts (VS Code)
```
Cmd+P         → Quick file open
Cmd+Shift+F   → Find in files
Cmd+K Cmd+C   → Comment line
Cmd+/         → Toggle comment
Cmd+D         → Select word (repeat to select more)
Cmd+Shift+L   → Select all occurrences
Cmd+Option+↑  → Move line up
Cmd+Option+↓  → Move line down
Cmd+Shift+V   → Paste and format
```

### React Component Snippet
```javascript
// Shortcut: rafce (React Arrow Function Component Export)
import React from 'react';

export const ComponentName = () => {
  return <div>ComponentName</div>;
};
```

### Quick npm Script Shortcuts
```bash
# Add to ~/.zshrc or ~/.bash_profile
alias nt='npm run test'
alias nl='npm run lint'
alias nf='npm run format'
alias nb='npm run build'
alias nd='npm run dev'
```

### Environment Variable Quick Toggle
```bash
# Create temporary env override
VITE_DEBUG=true npm run dev

# Or in .env.local
VITE_DEBUG=true
```

---

## 📊 Local Development Metrics

### Performance Targets (Local Development)
| Metric | Target | Command |
|--------|--------|---------|
| Dev Server Startup | < 500ms | `time npm run dev` |
| HMR Update | < 100ms | Edit file, watch console |
| Test Execution | < 5s | `npm run test` |
| Lint + Format | < 10s | `npm run lint && npm run format` |
| Build Time | < 3s | `npm run build` |
| Lighthouse Score | ≥90 | `npm run build && npm run preview` |

### Local Development Notes
```bash
# Monitor app performance
# 1. Open DevTools (F12)
# 2. Performance tab
# 3. Record action
# 4. Review timeline

# Check bundle size impact
npm run analyze

# Monitor memory usage
# Activity Monitor → Node processes
# Should be < 500MB for dev server
```

---

## 🛠️ Quick Command Reference

### Development
```bash
npm run dev              # Start dev server (port 5173)
npm run lint             # Check linting (ESLint)
npm run lint -- --fix    # Auto-fix lint errors
npm run format           # Format code (Prettier)
```

### Testing
```bash
npm run test             # Run all tests once
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
npm run test:ui         # Run tests with visual UI
npm run test -- <file>  # Run specific test file
```

### Production
```bash
npm run build            # Create production build
npm run preview          # Preview production build locally
npm run analyze          # Analyze bundle size
```

### Utility Commands
```bash
npm install              # Install all dependencies
npm install <package>    # Install specific package
npm update               # Update all packages
npm audit               # Check for security vulnerabilities
npm cache clean --force # Clear npm cache
```

---

## 📞 Support & Resources

### Local Debugging Help
- **Browser DevTools**: F12 (Chrome/Firefox)
- **VS Code Debugger**: Built-in, F5 to start
- **Node Inspector**: chrome://inspect for Node debugging
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev

### When Stuck
1. Check `.env.local` configuration
2. Run `npm install` to ensure dependencies
3. Clear cache: `rm -rf node_modules/.vite`
4. Restart dev server: `npm run dev`
5. Check browser console (F12)
6. Search for error message online
7. Contact: ajay@spakcomm.com

### Local Project References
- **Main Docs**: CLAUDE.md (project root)
- **Code Standards**: .claude/rules/
- **Architecture**: .claude/memory/decisions.md
- **Patterns**: .claude/memory/patterns.md

---

## 📝 Session Notes

**Current Session** (2026-04-21):
- [ ] Setup verified (Node 22.x, npm installed)
- [ ] Dev server running (port 5173)
- [ ] Tests passing (baseline)
- [ ] Linting passing (no errors)
- [ ] VS Code extensions installed
- [ ] Git configured

**Notes**:
- First time setup: ~10-15 minutes
- Subsequent sessions: ~30 seconds (just `npm run dev`)
- Performance is good, HMR working well

---

**Last Updated**: 2026-04-21  
**Status**: ✅ Local setup complete and verified
