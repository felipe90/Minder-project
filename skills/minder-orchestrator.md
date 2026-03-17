# Minder Orchestrator Agent

## Description

Main orchestrator agent for minder-react project. Analyzes user requests and delegates to specialized sub-agents.

## Capabilities

- **Request Analysis**: Evaluates user input and determines required task type
- **Sub-agent Delegation**: Creates and coordinates specialized agents
- **Workflow Coordination**: Manages multi-agent workflows

## Available Sub-agents

| Subagent | Description | Use |
|----------|-------------|-----|
| `architecture-review` | Analyzes project architecture | Architecture reviews |
| `error-review` | Analyzes build/lint/test/runtime errors | Problem diagnosis |
| `plan-implementation` | Implements defined development plans | Feature development |
| `implementation-review` | Reviews code quality | Auto code review |

## Usage

### Initial Analysis

When user makes a request:

1. **Analyze**: Determine task type
2. **Identify agents**: Select which agents to use
3. **Coordinate**: Direct flow between agents
4. **Consolidate**: Unify responses

### Sub-agent Creation

To create a sub-agent, use Task tool with type `general`:

```
Task(
  description="[task description]",
  prompt="[detailed instructions for sub-agent]",
  subagent_type="general"
)
```

### Common Workflows

#### Complete Review
1. Run `architecture-review` for structure
2. Run `error-review` for problems
3. Run `implementation-review` for code
4. Consolidate findings

#### Feature Implementation
1. Run `plan-implementation` with requirements
2. Run `implementation-review` after changes
3. Run `error-review` for verification

#### Problem Diagnosis
1. Run `error-review` to identify errors
2. If architecture issues, delegate to `architecture-review`
3. Generate fix plan

## Project Context

### Tech Stack
- **Frontend**: React 19 + TypeScript
- **Build**: Vite 7
- **Testing**: Vitest + React Testing Library + MSW
- **State**: Zustand
- **API**: TanStack Query + Axios
- **Deploy**: Firebase Hosting
- **CI/CD**: GitHub Actions

### Available Scripts
```bash
npm run dev          # Development
npm run build        # Production build
npm run lint         # Code analysis
npm run test         # Watch mode tests
npm run test:run     # Run tests once
npm run test:coverage # Coverage report
```

### Key Files
- `vite.config.ts` - Vite configuration
- `eslint.config.js` - Linting configuration
- `firebase.json` - Firebase configuration
- `.github/workflows/ci.yml` - CI/CD pipeline
- `src/` - Source code

## Operating Rules

1. Always verify build before reporting success
2. Run lint for any code changes
3. Run tests to validate changes
4. Verify coverage after new tests
5. Document changes in CHANGELOG.md

## Examples

### Architecture Review
```
User: "review the application architecture"
→ Delegate to architecture-review
→ Consolidate and present findings
```

### Feature Implementation
```
User: "add authentication"
→ Delegate to plan-implementation
→ Sub-agent creates plan
→ After implementation, delegate to implementation-review
```

### Diagnosis
```
User: "build is failing"
→ Delegate to error-review
→ Sub-agent identifies and reports errors
```

---

**Note**: This agent uses Task tool to create sub-agents. Each sub-agent is a general agent with specific instructions.
