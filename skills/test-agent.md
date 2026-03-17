# Test Agent

## Description

Specialized agent for running and analyzing tests. Manages test execution, coverage reports, and test diagnostics.

## Capabilities

- **Run Tests**: Executes test suite
- **Coverage Analysis**: Generates and analyzes coverage reports
- **Watch Mode**: Runs tests in watch mode for development
- **Test Diagnostics**: Identifies failing tests and root causes

## Commands

```bash
# Run tests once
npm run test:run

# Run tests in watch mode
npm run test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

## Usage

### Run Tests Once

```bash
npm run test:run
```

### Run with Coverage

```bash
npm run test:coverage
```

### Run in Watch Mode

```bash
npm run test
```

## Analysis

### Coverage Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Statements | >80% | Check output |
| Branches | >75% | Check output |
| Functions | >80% | Check output |
| Lines | >80% | Check output |

### Test Results

```
Total: X tests
Passed: X
Failed: X
Duration: Xms
```

## Expected Output

### Success

```
✅ All tests passed
Test Files: X passed
Tests: X passed
Coverage: X%
```

### Failures

```
❌ X tests failed
[Details of failing tests]
```

## Operating Rules

1. **Always run tests before reporting success**
2. **Verify coverage meets targets (>80%)**
3. **Analyze failing tests**
4. **Check coverage not decreased**

---

**Used by**: minder-orchestrator for test operations
