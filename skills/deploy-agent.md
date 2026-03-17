# Deploy Agent

## Description

Specialized agent for deploying the application to Firebase Hosting. Handles build process and deployment to production.

## Capabilities

- **Production Build**: Runs complete build process
- **Firebase Deploy**: Deploys to Firebase Hosting
- **Deployment Verification**: Confirms successful deployment
- **Rollback**: Reports deployment status

## Commands

```bash
# Build and deploy
npm run build && firebase deploy

# Deploy only (if build exists)
firebase deploy
```

## Usage

### Full Deployment

```bash
npm run build
firebase deploy
```

### Deploy Only

```bash
firebase deploy
```

## Pre-deployment Checklist

Before deploying, verify:
- [ ] Build passes (`npm run build`)
- [ ] No lint errors (`npm run lint`)
- [ ] Tests pass (`npm run test:run`)
- [ ] CHANGELOG updated

## Expected Output

### Success

```
✅ Build completed
✅ Deploy complete!

Project Console: https://console.firebase.google.com/project/PROJECT_ID/overview
Hosting URL: https://PROJECT_ID.web.app
```

### Failure

Report errors:
- Build errors
- Firebase authentication issues
- Deployment errors

## Firebase Configuration

Check `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json"],
    "headers": [...]
  }
}
```

## Operating Rules

1. **Always verify build before deploying**
2. **Run lint and tests before deployment**
3. **Verify deployment URL after deploy**
4. **Update CHANGELOG before deploying**

---

**Used by**: minder-orchestrator for deployment operations
