---
agent: agent
---

# Copilot Instructions

## MobX Rules

- State may be updated **only inside the store**.
- Components must observe state using `observer`.
- Do not mutate observables directly in components.
- Use class-based stores with `observable`, `computed`, and `action`.
- Keep business logic inside stores, not in components.

## Code Quality Principles

- Code must be clean, readable, minimal, and self-explanatory.
- No comments; clarity comes from naming and structure.
- Avoid duplication---use reusable components, hooks, and utilities.
- Every component must have a single responsibility.
- Use TypeScript types and interfaces consistently.
- Remove unused code immediately.
- Prefer the **most concise and direct implementation** that preserves
  clarity.

## UI Guidelines (MUI)

- Build all UI using MUI components.
- Style via `sx` or `styled`.
- Avoid hard-coded values; use the theme system.
- Maintain a simple and clear component hierarchy.
- Always prefer built-in MUI component props over custom `sx`. Never use `display: flex`; use Stack or Grid instead.

## Component Guidelines

- Functional components only.
- Avoid logic inside JSX.
- Props must be typed with TypeScript interfaces.
- Keep components small, focused, and minimal.
- Favor short and expressive patterns.

## Store Guidelines

- Implement stores as classes.
- Actions should be atomic and clearly defined.
- Computed values must derive from state without side-effects.
- No side-effects inside constructors.
- Keep store methods minimal and precise.

## Reusability Rules

- Any repeating logic must be extracted into:
  - reusable components
  - custom hooks
  - utilities
- Hooks handle reusable component logic.
- Utilities contain generic logic outside of React.
- Favor concise reusable abstractions over repeated code.

## Imports & Formatting

- External libraries first (alphabetically), then internal project code. Keep imports from the same library grouped and sorted.
- Use `npm run lint` and `npm run prettier-format`. Pre-commit hooks auto-format and fix lint issues.

## General Quality Rules

- Each file handles only one purpose.
- Names for components, functions, and variables must be descriptive.
- Break complex logic into smaller modules.
- Always choose the **shortest, clearest, and most maintainable**
  solution.

## Fetching Guidelines

- For asynchronous API calls, prefer using .then(...) and .catch(...) over try/catch syntax. Avoid wrapping async operations in try/catch blocks unless strictly necessary.

  ## Do / Don't Summary

- ❌ Don't: Use or modify legacy components or theme directories, add new dependencies without approval, use hardcoded styles or types, use `display: flex`.
