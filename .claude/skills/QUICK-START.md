# Enterprise Skills - Quick Start Guide

**Created**: 2026-04-21  
**Updated**: 2026-04-21  
**Status**: ✅ Ready to Use

---

## 🚀 Getting Started (5 Minutes)

### Step 1: Verify All Skills Are In Place

```bash
ls .claude/skills/
```

You should see:
```
enterprise-foundation-audit.js
pre-commit-gatekeeper.js
intelligent-component-builder.js
test-intelligence.js
performance-intelligence.js
SKILLS.md
QUICK-START.md
```

### Step 2: Run Your First Skill

**Foundation Audit** (Phase 1 validation):
```bash
npm run audit:foundation
```

**Output**: Compliance score, what's working, what needs fixing

### Step 3: Check Critical Blocker

**Critical Issue**: Node.js version
```bash
node -v
# Expected: v22.x
# Actual: v18.x ← NEEDS UPGRADE
```

**Fix Node Version**:
```bash
nvm install 22
nvm use 22
node -v  # Verify it's v22.x
```

### Step 4: Run Audit Again

```bash
npm run audit:foundation
```

Should show: ✅ Phase 1 READY (if Node is updated)

---

## 📚 Common Commands

```bash
# Phase 1 Validation
npm run audit:foundation     # Full compliance audit

# Development Workflow
npm run generate:component Button    # Create new component
npm run audit:gatekeeper             # Pre-commit check
npm run audit:tests                  # Test coverage analysis

# Performance & Quality
npm run audit:performance    # Lighthouse + Web Vitals
npm run audit:all            # Run all audits

# Regular Development
npm run dev                  # Start dev server
npm run test:watch          # Develop with tests
npm run build               # Production build
npm run preview             # Test production build
npm run lint:fix            # Auto-fix style issues
```

---

## 🎯 Phase 1 Completion Checklist

**Before You Can Complete Phase 1:**

- [ ] **Node.js**: Upgrade to v22.x
  ```bash
  nvm install 22 && nvm use 22
  ```

- [ ] **Foundation Audit**: Run and verify compliance
  ```bash
  npm run audit:foundation
  # Expected: 🟢 Phase 1 READY
  ```

- [ ] **Tests**: 32+ tests passing
  ```bash
  npm run test
  # Expected: 32 passed
  ```

- [ ] **Coverage**: ≥80% (verify after Node upgrade)
  ```bash
  npm run test:coverage
  # Expected: Statements 80%+
  ```

- [ ] **Build**: Production build succeeds
  ```bash
  npm run build
  # Expected: dist/index.html created
  ```

- [ ] **Lighthouse**: ≥90 (manual audit)
  ```bash
  npm run preview  # Then F12 → Lighthouse
  # Expected: Overall score ≥90
  ```

Once all ✅, Phase 1 is complete!

---

## 🛠️ Common Tasks

### Create a New Component

```bash
npm run generate:component Button

# Output:
# ✅ Component generated successfully!
# 📁 src/components/Button/
#    • Button.jsx (functional component)
#    • Button.css (BEM styles)
#    • Button.test.js (test template)
#    • index.js (clean export)
```

Then:
1. Edit `Button.jsx` to add functionality
2. Update `Button.css` with styling
3. Write tests in `Button.test.js`
4. Run: `npm run test:watch`

### Check Code Quality Before Commit

```bash
npm run audit:gatekeeper

# Output shows:
# - Code quality score
# - Security issues (if any)
# - Commit readiness (🟢 SAFE / 🟡 REVIEW / 🔴 BLOCKED)
```

### Analyze Test Coverage

```bash
npm run audit:tests

# Output shows:
# - Coverage percentage (target: 80%+)
# - Untested code paths
# - High-value test recommendations
# - Strategic gaps to fix first
```

### Check Performance

```bash
npm run audit:performance

# Output shows:
# - Lighthouse scores
# - Core Web Vitals
# - Bundle size analysis
# - Optimization recommendations
```

---

## 🔄 Development Workflow

```
Morning: Start work
├─ npm run dev                    (start dev server)
├─ npm run test:watch            (run tests in background)
└─ Make changes...

Throughout Day: Before commits
├─ npm run lint:fix              (fix style issues)
├─ npm run audit:gatekeeper      (pre-commit check)
└─ git commit (if 🟢 SAFE)

End of Week: Quality check
├─ npm run audit:tests           (coverage analysis)
├─ npm run audit:all             (full quality audit)
└─ Address recommendations

Before Deployment
├─ npm run build                 (production build)
├─ npm run preview               (test build)
├─ npm run audit:foundation      (final compliance)
└─ Deploy if ✅ Phase 1 READY
```

---

## ⚠️ Troubleshooting

### Skills Not Running?

**Error**: `Cannot find module 'node:inspector/promises'`
```
→ Node version mismatch. Upgrade to Node 22.x:
   nvm install 22 && nvm use 22
```

**Error**: `Command not found: npm run audit:foundation`
```
→ Scripts not in package.json. Reinstall:
   npm install
```

**Error**: `ENOENT: no such file or directory`
```
→ Skills not in place. Check:
   ls .claude/skills/
   
If missing, regenerate from backup or git.
```

### Tests Failing?

```bash
npm run test -- --clearCache    # Clear test cache
npm run test:watch              # Run in watch mode
npm run test:coverage           # See coverage gaps
```

### Foundation Audit Failing?

```bash
# 1. Check Node version
node -v                         # Should be v22.x

# 2. Run individual checks
npm run lint                    # ESLint
npm run test                    # Tests
npm run build                   # Build

# 3. Fix any issues, then re-run
npm run audit:foundation
```

---

## 📞 Need Help?

**Skill Documentation**: `.claude/skills/SKILLS.md`  
**Project Standards**: `CLAUDE.md`  
**Local Setup**: `CLAUDE.local.md`  

**Contact**: ajay@spakcomm.com

---

## ✅ You're Ready!

Your enterprise skills are installed and ready to use. Start with:

```bash
# 1. Check current state
npm run audit:foundation

# 2. Upgrade Node if needed
nvm install 22 && nvm use 22

# 3. Run full audit
npm run audit:all

# 4. Complete Phase 1 checklist above
```

Good luck! 🚀
