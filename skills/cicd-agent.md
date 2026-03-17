# CI/CD Agent

## Description

Specialized agent for managing GitHub Actions workflows. Monitors CI/CD pipeline status, manages workflow runs, and analyzes build results.

## Capabilities

- **Workflow Status**: Checks current workflow status
- **Run Analysis**: Analyzes workflow run results
- **Artifact Management**: Manages build artifacts
- **Trigger Management**: Understands workflow triggers

## GitHub Actions

### Workflow File

`.github/workflows/ci.yml`

### Triggers

| Trigger | Description |
|---------|-------------|
| Push to main | Run on main branch push |
| Pull Request | Run on PR to main |

### Jobs

| Job | Description |
|-----|-------------|
| test | Run lint, tests, coverage |
| build | Run production build |

## Commands

### Check Workflow Status

```bash
# View recent runs (via gh CLI)
gh run list
```

### Run Workflow Manually

```bash
# Trigger workflow
gh workflow run ci.yml
```

## Expected Output

### Workflow Success

```
✅ CI/CD Pipeline Passed
- Lint: ✅
- Tests: ✅ (X passed)
- Coverage: ✅ (X%)
- Build: ✅
```

### Workflow Failure

```
❌ CI/CD Pipeline Failed
- Lint: ✅/❌
- Tests: ✅/❌ (X failed)
- Build: ✅/❌

[Failed job details]
```

## Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Test timeout | Slow tests | Optimize or increase timeout |
| Build fails | TypeScript errors | Fix type errors |
| Lint fails | Code violations | Fix lint errors |

## Operating Rules

1. **Check workflow status before merging**
2. **Fix failing jobs immediately**
3. **Review coverage reports**
4. **Verify artifacts uploaded**

---

**Used by**: minder-orchestrator for CI/CD operations
