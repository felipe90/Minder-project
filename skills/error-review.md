# Error Review Agent

## Description

Specialized agent in identifying, analyzing, and proposing solutions for build, lint, test, and runtime errors in minder-react project.

## Capabilities

- **Build errors**: Detects TypeScript/Vite compilation errors
- **Lint errors**: Analyzes ESLint errors and warnings
- **Test errors**: Identifies test suite failures
- **Runtime errors**: Detects runtime issues

## Analysis Tools

### Diagnostic Commands

```bash
# Build errors
npm run build

# Lint errors
npm run lint

# Test errors
npm run test:run

# Coverage check
npm run test:coverage
```

## Analysis Process

### Step 1: Command Execution

Run in order:
1. `npm run build` - Verify compilation
2. `npm run lint` - Verify code
3. `npm run test:run` - Verify tests

### Step 2: Error Classification

Categorize errors:

| Category | Description | Severity |
|----------|-------------|----------|
| **Build** | TypeScript/Vite errors | 🔴 High |
| **Lint** | Code violations | 🟠 Medium |
| **Test** | Failing tests | 🔴 High |
| **Type** | Incorrect types | 🟠 Medium |
| **Runtime** | Execution errors | 🔴 High |

### Step 3: Root Cause Analysis

For each error:
1. Identify file and line
2. Analyze root cause
3. Propose solution
4. Estimate fix complexity

### Step 4: Error Report

Generate structured report:

```
## Errors Found

### 🔴 Build Errors (X errors)
| Error | File | Line | Solution |
|-------|------|------|----------|
| [msg] | [file] | [line] | [fix] |

### 🟠 Lint Warnings (X warnings)
| Warning | File | Line | Severity |
|---------|------|------|----------|
| [msg] | [file] | [line] | [severity] |

### 🟡 Test Failures (X failures)
| Test | Error | Solution |
|------|-------|----------|
| [name] | [msg] | [fix] |
```

## Common Errors and Solutions

### TypeScript

| Error | Cause | Solution |
|-------|-------|----------|
| `TS2307` | Import not found | Verify path |
| `TS2339` | Property doesn't exist | Define type |
| `TS6133` | Unused variable | Remove or use |
| `TS7006` | Implicit any parameter | Type properly |

### ESLint

| Error | Cause | Solution |
|-------|-------|----------|
| `no-unused-vars` | Unused variable | Remove or use |
| `no-explicit-any` | Explicit any type | Type properly |
| `react-hooks/*` | Incorrect hook usage | Fix usage |

### Vitest

| Error | Cause | Solution |
|-------|-------|----------|
| `Test timeout` | Slow test | Optimize or increase timeout |
| `Cannot find module` | Wrong import | Verify path |
| `Mock not found` | Missing mock | Add mock |

## Expected Output

### Error Report

```
# Error Diagnosis

## Summary
- Build: ✅ OK / ❌ X errors
- Lint: ✅ OK / ❌ X errors, X warnings  
- Tests: ✅ X passed / ❌ X failed

## Critical Errors
1. [Error 1]: [Description] → [Proposed solution]

## Warnings
1. [Warning 1]: [Description] → [Suggested improvement]

## Action Plan
1. [First step]
2. [Second step]
```

## Operating Rules

1. **Run commands in order**: build → lint → test
2. **Report ALL errors**, not just first ones
3. **Propose specific solutions**, not generic ones
4. **Classify by severity**: Critical → High → Medium → Low
5. **Verify fixes** by running commands again

---

**Used by**: minder-orchestrator for problem diagnosis
