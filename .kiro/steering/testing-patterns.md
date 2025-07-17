# Testing Patterns

## Testing Framework
- Use Vitest for unit and integration tests
- Test files in `test/` directory
- Use `.test.ts` or `.test.tsx` file extensions
- Run tests with `npm run test`

## Component Testing
- Test component rendering and behavior
- Use React Testing Library patterns
- Test user interactions and accessibility
- Mock external dependencies appropriately

## Route Testing
- Test loader and action functions independently
- Mock Cloudflare context and environment
- Test authentication flows and protected routes
- Verify proper error handling

## Database Testing
- Use in-memory SQLite for test database
- Set up and tear down test data properly
- Test database operations and migrations
- Use transactions to isolate test data

## Example Test Structure
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Component', () => {
  beforeEach(() => {
    // Setup test data
  });

  it('should render correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

## Testing Best Practices
- Write tests that focus on behavior, not implementation
- Use descriptive test names and organize with describe blocks
- Mock external services and APIs
- Test edge cases and error conditions
- Maintain good test coverage for critical paths