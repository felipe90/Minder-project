# Build Agent

## Description

Specialized agent for building the project. Handles compilation, bundling, and production builds.

## Capabilities

- **Production Build**: Runs complete build process
- **Preview Server**: Manages local preview server
- **Type Check**: Runs TypeScript compilation
- **Build Analysis**: Analyzes build output and warnings

## Commands

```bash
# Production build
npm run build

# Preview production build locally
npm run preview

# TypeScript only (no emit)
tsc --noEmit
```

## Usage

### Run Production Build

```bash
npm run build
```

### Run with TypeScript Only

```bash
tsc --noEmit
```

### Preview Build

```bash
npm run preview
```

## Expected Output

### Success

```
✅ Build completed successfully
- dist/index.html
- dist/assets/*.js
- dist/assets/*.css
```

### Errors

Report any build errors with:
- File affected
- Line number
- Error message
- Suggested fix

## Operating Rules

1. **Always verify build before deployment**
2. **Check for TypeScript errors**
3. **Verify output files exist**
4. **Report any warnings**

---

**Used by**: minder-orchestrator for build operations
