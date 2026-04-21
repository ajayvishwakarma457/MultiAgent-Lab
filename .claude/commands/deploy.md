---
name: "Deploy"
description: "Enterprise deployment orchestration with pre-flight validation, multi-environment support, rollback capability, and health verification"
trigger: "/deploy"
---

# Deploy Command

Automate application deployment with comprehensive pre-flight checks, progressive rollout strategies, and automated rollback capability.

---

## Deployment Phases

### Phase 1: Pre-Deployment Validation

#### Code Quality Gates
- [ ] All unit tests passing (`npm run test`)
- [ ] All integration tests passing
- [ ] ESLint/code style validation (`npm run lint`)
- [ ] No console.log/debugger statements in src/
- [ ] TypeScript/type checking passes
- [ ] Code coverage ≥ 80%

#### Security Gates
- [ ] Security audit passing (`/security-review`)
- [ ] Dependency vulnerabilities resolved (`npm audit`)
- [ ] No exposed API keys/secrets in code
- [ ] OWASP security headers configured
- [ ] CORS policies validated

#### Performance Gates
- [ ] Bundle size acceptable (< 500KB gzipped)
- [ ] Lighthouse score ≥ 90
- [ ] Core Web Vitals meet targets
- [ ] No memory leaks detected
- [ ] Performance benchmarks pass

#### Configuration Gates
- [ ] Environment variables defined
- [ ] Feature flags configured
- [ ] Database migrations tested
- [ ] External service endpoints verified
- [ ] API versioning compatible

#### Documentation Gates
- [ ] CHANGELOG.md updated
- [ ] README reflects changes
- [ ] API documentation current
- [ ] Deployment notes documented
- [ ] Breaking changes communicated

---

### Phase 2: Build Process

#### Artifact Generation
```bash
npm run build              # Production build
npm run analyze            # Bundle analysis
npm run generate:sbom      # Software Bill of Materials
```

#### Build Validation
- [ ] Build completes without errors/warnings
- [ ] All assets generated and versioned
- [ ] Source maps excluded from production
- [ ] Assets minified and optimized
- [ ] Build output size verified
- [ ] Build reproducibility verified

#### Artifact Management
- **Versioning**: Semantic versioning (MAJOR.MINOR.PATCH)
- **Tagging**: Git tag created (v1.2.3)
- **Naming**: `app-v1.2.3-build.123.zip`
- **Checksums**: SHA256 hash generated
- **Retention**: Archive production builds for 90 days
- **Accessibility**: Artifact stored in CI/CD artifact repository

---

### Phase 3: Deployment Strategy Selection

#### Blue-Green Deployment (Recommended for Zero-Downtime)
```
Current (Blue)  →  New Version (Green)  →  Switch Traffic
[Production]        [Staging]               [Complete cutover]
    ↑                   ↑
Monitor               Monitor & Validate
```
**Best for**: Critical applications, large user bases
**Rollback time**: < 5 seconds (traffic switch)

#### Canary Deployment (Risk Mitigation)
```
Stable Version  →  Canary (5%)  →  25%  →  50%  →  100%
[90% traffic]      [5% new]
                   Monitor metrics
```
**Best for**: High-risk features, API changes
**Rollback time**: Automatic if metrics degrade

#### Rolling Deployment (Gradual Rollout)
```
Instance 1: old → new
Instance 2: old → new (wait, monitor)
Instance 3: old → new (wait, monitor)
...
```
**Best for**: Stateless services, distributed systems
**Rollback time**: 10-30 minutes (per instance)

#### Direct Deployment (Minimal Infrastructure)
```
Old Version → New Version
[Single server/container]
```
**Best for**: Development/staging environments
**Downtime**: Brief maintenance window

---

### Phase 4: Environment-Specific Deployment

#### Development Environment
- Automatic deployment on merge to `develop`
- Instant feedback loop
- Debug mode enabled
- Verbose logging

#### Staging Environment
- Manual trigger (requires approval)
- Pre-production configuration
- Load testing enabled
- Security scanning automated

#### Production Environment
- **Approval Required**: Release manager sign-off
- **Deployment Window**: Business hours preferred
- **Strategy**: Blue-green or canary
- **Monitoring**: Enhanced alerting active
- **Rollback Plan**: Pre-tested and documented

---

### Phase 5: Deployment Execution

#### Pre-Deployment Steps
```bash
# 1. Verify artifact integrity
sha256sum app-v1.2.3-build.123.zip

# 2. Database migrations (if applicable)
npm run db:migrate

# 3. Backup current version
tar czf app-backup-v1.2.2.tar.gz ./dist

# 4. Deploy new version
# (Strategy-dependent: blue-green | canary | rolling)

# 5. Health check validation
npm run health:check

# 6. Smoke tests
npm run tests:smoke
```

#### Blue-Green Specific
```bash
# 1. Deploy to "Green" (staging environment)
npm run deploy:green

# 2. Run full validation suite
npm run tests:e2e
npm run performance:test
npm run security:scan

# 3. Switch router to Green
npm run switch:traffic

# 4. Monitor for 15 minutes
npm run monitor:metrics

# 5. Archive Blue for rollback
npm run archive:previous
```

#### Canary Specific
```bash
# 1. Deploy to 5% of instances
npm run deploy:canary --percentage=5

# 2. Monitor key metrics (error rate, latency, CPU)
npm run monitor:canary --duration=15m

# 3. Progressive increase if metrics healthy
npm run scale:canary --to=25% --if-healthy
npm run scale:canary --to=100% --if-healthy

# 4. Automated rollback if degradation detected
npm run rollback:automatic --threshold=5% --metric=error_rate
```

---

### Phase 6: Post-Deployment Verification

#### Automated Checks
- [ ] HTTP health endpoints responding (200 OK)
- [ ] Database connectivity verified
- [ ] External API endpoints reachable
- [ ] Cron jobs/scheduled tasks running
- [ ] Message queues operational
- [ ] Cache layers warming up

#### Functional Validation
- [ ] Core user flows working (smoke tests)
- [ ] API responses within SLA latency
- [ ] Data integrity verified
- [ ] Authentication/authorization functioning
- [ ] Third-party integrations operational

#### Performance Validation
- [ ] Page load times acceptable
- [ ] Core Web Vitals in target range
- [ ] No performance regression > 10%
- [ ] Memory usage stable
- [ ] CPU utilization normal

#### Monitoring & Alerting
- [ ] All monitoring dashboards active
- [ ] Alert thresholds configured
- [ ] Log aggregation working
- [ ] Error tracking operational
- [ ] APM (Application Performance Monitoring) collecting data

---

### Phase 7: Post-Deployment Tasks

#### Communication
- [ ] Deployment completion announced
- [ ] Release notes published (changelog)
- [ ] Stakeholders notified
- [ ] Customer communication sent (if applicable)
- [ ] Support team briefed on changes

#### Documentation
- [ ] Deployment report generated
- [ ] Known issues documented
- [ ] Rollback procedure updated
- [ ] Incident runbook updated
- [ ] Performance baseline recorded

#### Cleanup & Monitoring
- [ ] Old build artifacts archived
- [ ] Temporary resources cleaned up
- [ ] Analytics/metrics collection verified
- [ ] User behavior monitoring active
- [ ] Business metrics tracking enabled

---

## Rollback Procedures

### Automatic Rollback Triggers
- Error rate > 5% for 2+ minutes
- P95 latency > 2x baseline
- Health check failures > 20%
- Data inconsistency detected
- Security vulnerability discovered

### Manual Rollback (Approved Operators)
```bash
# 1. Trigger rollback decision
npm run rollback:initiate --version=v1.2.2 --reason="Critical bug"

# 2. Notify team
npm run notify:rollback

# 3. Execute rollback
npm run deploy:rollback --from=v1.2.3 --to=v1.2.2

# 4. Verify rollback success
npm run verify:deployment

# 5. Post-incident investigation
npm run incident:create --severity=p1 --assignee=oncall
```

### Rollback Timeline
- **Automatic**: < 2 minutes (health check trigger → automatic rollback)
- **Manual**: < 5 minutes (approval → deployment)
- **Verification**: < 5 minutes (health checks + smoke tests)

---

## Versioning & Release Management

### Semantic Versioning
```
MAJOR.MINOR.PATCH-prerelease+build

v1.2.3      # Production release
v1.2.4-rc1  # Release candidate
v1.2.5-beta # Beta release
v2.0.0      # Major version (breaking changes)
```

### Release Notes Generation
```bash
npm run release:notes --from=v1.2.2 --to=v1.2.3
```

**Release Notes Include:**
- List of features added
- Bugs fixed
- Performance improvements
- Security patches
- Breaking changes (highlighted)
- Migration guide (if needed)
- Deployment instructions
- Known issues
- Contributors

### Git Tags & Branches
```bash
# Tag releases
git tag -a v1.2.3 -m "Release version 1.2.3"

# Create release branch if needed
git checkout -b release/1.2.3

# Merge back to main after deployment
git checkout main
git merge release/1.2.3
```

---

## Environment Variables & Configuration

### Development
```env
NODE_ENV=development
DEBUG=true
API_BASE_URL=http://localhost:3000
LOG_LEVEL=debug
```

### Staging
```env
NODE_ENV=staging
DEBUG=false
API_BASE_URL=https://staging-api.example.com
LOG_LEVEL=info
FEATURE_FLAGS={"beta_features": true}
```

### Production
```env
NODE_ENV=production
DEBUG=false
API_BASE_URL=https://api.example.com
LOG_LEVEL=warn
SENTRY_DSN=https://...
```

**Secret Management:**
- [ ] API keys in vault, not in .env
- [ ] Database credentials rotated
- [ ] SSL/TLS certificates valid
- [ ] OAuth tokens refreshed
- [ ] SSH keys provisioned to deployment agents

---

## Deployment Report

### Pre-Deployment Report
```
Deployment Report
================
Version: v1.2.3
Date: 2026-04-21 14:30 UTC
Duration: 45 minutes
Strategy: Blue-Green

Pre-Flight Checks: ✅ PASSED
├── Code Quality: ✅ PASSED
├── Security: ✅ PASSED
├── Performance: ✅ PASSED
└── Configuration: ✅ PASSED

Artifact: app-v1.2.3-build.12345.zip
Size: 245 KB (gzipped)
SHA256: a1b2c3d4...

Deployment Plan:
├── Environment: Production (US-East-1)
├── Strategy: Blue-Green (Zero-downtime)
├── Rollback: Automated (error_rate > 5%)
├── Approval: John Doe (Release Manager)
└── Estimated Duration: 15 minutes
```

### Post-Deployment Report
```
Deployment Completed Successfully
==================================
Version: v1.2.3
Deployment Time: 14:30-14:45 UTC (15 minutes)
Status: ✅ SUCCESSFUL

Health Checks: ✅ PASSED (ALL)
Smoke Tests: ✅ PASSED (25/25)
Performance: ✅ WITHIN TARGET
Error Rate: 0.02% (normal)
P95 Latency: 245ms (baseline 240ms)

Rollback Status: Ready (Previous version archived)
Next Check: Auto-monitor for 24 hours
```

---

## Pre-Deployment Checklist Template

```markdown
## Deployment Checklist: v1.2.3

### Code Quality
- [ ] All tests passing: `npm run test` (25/25 passed)
- [ ] No console.log statements found
- [ ] Linting passes: `npm run lint` (0 errors, 0 warnings)
- [ ] Type checking passes
- [ ] Code review approved

### Security
- [ ] Security audit passed
- [ ] No CVEs in dependencies: `npm audit` (0 vulnerabilities)
- [ ] No hardcoded secrets in code
- [ ] CORS properly configured
- [ ] Auth/authz logic verified

### Performance
- [ ] Bundle size acceptable: 245KB gzipped
- [ ] Lighthouse score: 95
- [ ] No memory leaks
- [ ] Load testing passed

### Infrastructure
- [ ] Database migrations tested
- [ ] Environment variables defined
- [ ] Feature flags configured
- [ ] Third-party services verified
- [ ] Monitoring/alerting active

### Documentation
- [ ] CHANGELOG.md updated
- [ ] Release notes prepared
- [ ] Runbooks updated
- [ ] Rollback procedure tested

### Approval
- [ ] QA signoff: ______ (Date: ____)
- [ ] Security signoff: ______ (Date: ____)
- [ ] Release manager approval: ______ (Date: ____)

### Deployment Details
- Start time: ________
- Deployment strategy: [ ] Blue-Green [ ] Canary [ ] Rolling
- Estimated duration: 15 minutes
- Rollback owner: __________
- Incident commander: __________
```

---

## Troubleshooting & Common Issues

### Build Failures
```bash
# Clear cache and rebuild
rm -rf dist node_modules/.vite
npm install && npm run build
```

### Deployment Timeout
- Check deployment agent status
- Verify artifact availability
- Monitor network connectivity
- Review logs: `npm run logs:deployment`

### Health Check Failures
```bash
npm run health:check --verbose
npm run logs:health --tail=100
```

### Rollback Issues
```bash
# Manual verification
npm run verify:version --expected=v1.2.2
npm run verify:database --version=v1.2.2
```

### Performance Degradation
```bash
npm run performance:profile
npm run monitor:metrics --duration=10m
npm run incident:create --severity=p1
```

---

## Integration with CI/CD

### GitHub Actions / GitLab CI
```yaml
deploy:
  stage: deploy
  script:
    - npm run build
    - npm run health:check
    - npm run deploy:production
  only:
    - tags
  when: manual
```

### Approval Workflow
1. Developer pushes to release branch
2. CI pipeline runs pre-flight checks
3. Release manager reviews & approves
4. Deployment triggered automatically
5. Post-deployment monitoring active

---

## Success Criteria

✅ **Deployment Successful If:**
- All pre-flight checks passed
- Deployment completed within SLA (< 15 min)
- Health checks 100% passing
- Error rate < 0.1%
- No performance degradation
- All integrations working
- User-facing features functional
- Monitoring data flowing normally

❌ **Automatic Rollback If:**
- Error rate spike > 5%
- P95 latency > 2x baseline
- Health check failures
- Critical service unavailable
- Data corruption detected
- Security vulnerability triggered

---

## On-Call & Support

### During Deployment
- Oncall engineer monitoring
- Slack channel active (#deployments)
- War room ready if issues
- Incident commander on standby

### Post-Deployment
- Monitoring dashboard watched (24h)
- Support team briefed
- Customer communication plan ready
- Rollback plan pre-tested and ready
