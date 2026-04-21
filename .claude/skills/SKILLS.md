# Enterprise Custom Skills Registry

Professional custom skills for MultiAgent-Lab development. Each skill provides deep intelligence, not just basic automation.

**Created**: 2026-04-21  
**Status**: ✅ Production Ready  
**Maintained By**: Ajay Spak

---

## 🎯 Skill Overview

| Skill | Purpose | Invocation | Output |
|-------|---------|-----------|--------|
| **enterprise-foundation-audit** | Phase 1 compliance validation | `node .claude/skills/enterprise-foundation-audit.js` | Compliance score, risk level, critical issues |
| **pre-commit-gatekeeper** | Pre-commit quality gates | Automatic via git hook | Risk rating, security scan, quality score |
| **intelligent-component-builder** | Generate enterprise components | `node .claude/skills/intelligent-component-builder.js ComponentName` | Scaffold with tests and docs |
| **test-intelligence** | Strategic test analysis | `node .claude/skills/test-intelligence.js` | Coverage gaps, recommendations, strategy |
| **performance-intelligence** | Performance optimization roadmap | `node .claude/skills/performance-intelligence.js` | Lighthouse, Web Vitals, optimization plan |

---

## 📋 Skill Details

### 1. **enterprise-foundation-audit.js**

**Purpose**: Comprehensive Phase 1 validation with compliance scoring

**What It Does**:
- ✅ Node.js version check (requires 22.x)
- ✅ ESLint validation
- ✅ Test coverage analysis (80%+ target)
- ✅ Production build validation (<300KB gzipped)
- ✅ Lighthouse audit requirement notification
- ✅ WCAG 2.1 AA accessibility scan
- ✅ Console error detection
- ✅ Compliance score calculation (0-100%)
- ✅ Risk level assessment (🟢🟡🟠🔴)

**Usage**:
```bash
node .claude/skills/enterprise-foundation-audit.js
```

**Output**:
```
ENTERPRISE FOUNDATION AUDIT
═══════════════════════════

📊 COMPLIANCE BREAKDOWN
✅ nodeVersion: Node v22.x meets requirements
✅ eslint: ESLint: All files pass style standards
...

🎯 COMPLIANCE SCORE: 85%
📈 RISK LEVEL: 🟢 LOW
✅ Phase 1 READY
```

**When to Run**:
- Before marking Phase 1 complete
- After major code changes
- Before deployment to production

---

### 2. **pre-commit-gatekeeper.js**

**Purpose**: Intelligent pre-commit validation with risk assessment

**What It Does**:
- 🔍 Code quality analysis (complexity, duplication)
- 🔓 Security risk detection (hardcoded secrets, XSS)
- ⚠️ Console.log/debugger detection
- 🧪 Test coverage impact assessment
- 📝 Commit message validation
- 🎯 Risk rating (🟢 SAFE / 🟡 REVIEW / 🔴 BLOCKED)
- 🚫 Automatic commit blocking if critical issues

**Usage** (Automatic):
- Runs on `git commit` via Husky hook
- Shows risk assessment before commit completes

**Manual Trigger**:
```bash
node .claude/skills/pre-commit-gatekeeper.js
```

**Output**:
```
🚨 PRE-COMMIT GATEKEEPER

⚠️ CODE QUALITY ISSUES:
   src/components/Button.jsx (Score: 95%)
   • console.log statement added

📊 QUALITY SCORE: 95%
🎯 RISK RATING: 🟢 SAFE
💡 Approved to commit
```

**When It Runs**:
- Automatically on every `git commit`
- Can be run manually before staging

---

### 3. **intelligent-component-builder.js**

**Purpose**: Generate enterprise-grade components with tests

**What It Generates**:
- 📄 Functional component (JSX with hooks)
- 🎨 BEM CSS file (with variables)
- 🧪 Comprehensive tests (80%+ coverage template)
- 📦 Index.js for clean imports
- 📚 JSDoc documentation

**Usage**:
```bash
# Generate presentational component
node .claude/skills/intelligent-component-builder.js Button

# Output:
# ✅ src/components/Button/
#    • Button.jsx (functional component)
#    • Button.css (BEM naming)
#    • Button.test.js (test template)
#    • index.js (clean export)
```

**Generated Files**:
```
src/components/Button/
├── Button.jsx          (Functional component with hooks)
├── Button.css          (BEM: .button, .button__element, .button--modifier)
├── Button.test.js      (Unit + component tests)
└── index.js            (export { Button } from './Button')
```

**When to Use**:
- Creating new components
- Ensuring consistent patterns
- Reducing scaffolding time

---

### 4. **test-intelligence.js**

**Purpose**: Strategic test gap analysis with recommendations

**What It Does**:
- 📊 Coverage metrics (statements, branches, functions, lines)
- 🔍 Untested code path detection
- 💡 High-value test recommendations
- 🎯 Test quality assessment
- 📈 Coverage trend tracking
- 🧬 Brittleness detection (tests that break on refactoring)

**Usage**:
```bash
node .claude/skills/test-intelligence.js
```

**Output**:
```
🧪 TEST INTELLIGENCE

📊 TEST METRICS
   Tests: 32
   Statement Coverage: 85%
   Branch Coverage: 78%
   Function Coverage: 83%
   Line Coverage: 85%

✅ Target: 80%+ coverage

💡 RECOMMENDATIONS

1. [HIGH] Improve Statement Coverage
   Current: 85% → Target: 80% ✅
   Action: Already met target
   Impact: Reduces production bugs by 35%

2. [MEDIUM] Increase Branch Coverage
   Current: 78% → Target: 75% ✅
   Action: Test both success and error paths
   Impact: Catches conditional logic bugs
```

**When to Run**:
- Weekly during development
- Before Phase 2 transition
- To guide test writing priorities

---

### 5. **performance-intelligence.js**

**Purpose**: Deep performance analysis with optimization strategy

**What It Does**:
- 🚀 Lighthouse score estimation (Performance, Accessibility, Best Practices, SEO)
- 📊 Core Web Vitals analysis (LCP, FID, CLS)
- 📦 Bundle size breakdown and analysis
- 🔍 JavaScript execution profiling recommendations
- 💾 Memory leak detection guidance
- 🎯 Optimization roadmap with priorities and impact

**Usage**:
```bash
node .claude/skills/performance-intelligence.js
```

**Output**:
```
⚡ PERFORMANCE INTELLIGENCE

📊 LIGHTHOUSE SCORES
   Performance: 90/100
   Accessibility: 92/100
   Best Practices: 88/100
   SEO: 85/100

   Overall: ✅ 89/100

🎯 CORE WEB VITALS
   LCP: 1.8s (target: <2.5s) ✅
   FID: 45ms (target: <100ms) ✅
   CLS: 0.05 (target: <0.1) ✅

📦 BUNDLE SIZE
   Total: 150KB
   Gzipped: 47KB (target: <300KB) ✅

💡 OPTIMIZATION RECOMMENDATIONS
1. [MEDIUM] Memory Management
   Issue: Potential memory leaks in useEffect cleanup
   Solution: Verify cleanup functions
   Impact: Prevents memory bloat
```

**When to Run**:
- After major feature additions
- Before production deployment
- Monthly performance review
- When Lighthouse score drops

---

## 🔄 Skill Integration

These skills work together in your development workflow:

```
Code Change
    ↓
pre-commit-gatekeeper (validates quality & security)
    ↓
[If ✅] Commit allowed
    ↓
enterprise-foundation-audit (validates Phase 1 standards)
    ↓
[If ready] deployment-orchestrator (validates deployment readiness)
    ↓
Deploy to Production
```

**Continuous Monitoring**:
```
Weekly:
  ├─ test-intelligence (verify coverage)
  └─ performance-intelligence (monitor performance)

Monthly:
  └─ enterprise-foundation-audit (full compliance audit)

Per-Commit:
  └─ pre-commit-gatekeeper (automatic validation)

On-Demand:
  └─ intelligent-component-builder (create new components)
```

---

## 📚 Using Skills in Claude Code

### Running Skills from Terminal

```bash
# Run foundation audit
node .claude/skills/enterprise-foundation-audit.js

# Generate new component
node .claude/skills/intelligent-component-builder.js TodoForm

# Analyze tests
node .claude/skills/test-intelligence.js

# Performance analysis
node .claude/skills/performance-intelligence.js

# Pre-commit check (manual)
node .claude/skills/pre-commit-gatekeeper.js
```

### Skills with Claude Code Integration

The `pre-commit-gatekeeper` runs automatically via git hooks (configured via Husky).

Other skills can be invoked:
- Manually from terminal
- Via npm scripts (recommended)
- Integrated into CI/CD pipeline

### Recommended npm Scripts

Add to `package.json`:
```json
{
  "scripts": {
    "audit:foundation": "node .claude/skills/enterprise-foundation-audit.js",
    "audit:gatekeeper": "node .claude/skills/pre-commit-gatekeeper.js",
    "generate:component": "node .claude/skills/intelligent-component-builder.js",
    "audit:tests": "node .claude/skills/test-intelligence.js",
    "audit:performance": "node .claude/skills/performance-intelligence.js",
    "audit:all": "npm run audit:foundation && npm run audit:tests && npm run audit:performance"
  }
}
```

Then run:
```bash
npm run audit:foundation
npm run generate:component Button
npm run audit:all
```

---

## 🎯 Success Criteria

### Phase 1 Foundation
✅ All skills operational  
✅ Node 22.x installed  
✅ Tests passing (32+)  
✅ Coverage ≥80%  
✅ Build <300KB  
✅ Lighthouse ≥90  

### Phase 2 Development
✅ Skills integrated in workflow  
✅ Component generation automated  
✅ Pre-commit validation active  
✅ Performance monitored weekly  
✅ Tests maintained at 80%+  

---

## 📞 Support & Troubleshooting

**Skill Not Running?**
```bash
# Check Node.js version
node -v  # Should be 22.x

# Check permissions
ls -la .claude/skills/

# Run with explicit path
node /Users/spakcomm-ajay/Documents/Claude-Code/MultiAgent-Lab/.claude/skills/enterprise-foundation-audit.js
```

**Skills Not Updating?**
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies: `npm install`
- Verify files exist: `ls .claude/skills/`

**Questions?**
Contact: ajay@spakcomm.com

---

## 📝 Maintenance

**Last Updated**: 2026-04-21  
**Version**: 1.0 (Enterprise Grade)  
**Status**: ✅ Production Ready  

**Planned Enhancements**:
- Integration with CI/CD pipeline
- Automated performance trending
- Custom threshold configuration
- Slack/Email notifications
- GitHub Actions integration
