# React Router v7 Patterns

## Route Structure
- Use file-based routing in `app/routes/`
- Route files: `route.tsx` for route components
- Layout files: `layout.tsx` for shared layouts
- Use underscore prefix for route groups: `_app`, `_landing`
- Use dot notation for nested routes: `users.$id.tsx`

## Data Loading Patterns
- Use `loader` functions for server-side data fetching
- Use `action` functions for form submissions and mutations
- Leverage `useLoaderData()` and `useActionData()` hooks
- Handle loading states with `useNavigation()`

## Route Component Structure
```typescript
import type { LoaderFunctionArgs, ActionFunctionArgs } from 'react-router';

export async function loader({ request, params, context }: LoaderFunctionArgs) {
  // Server-side data loading
}

export async function action({ request, params, context }: ActionFunctionArgs) {
  // Handle form submissions and mutations
}

export default function RouteComponent() {
  const data = useLoaderData<typeof loader>();
  // Component implementation
}
```

## Error Handling
- Use `ErrorBoundary` components for route-level error handling
- Implement proper error responses in loaders/actions
- Use `isRouteErrorResponse()` for typed error handling

## Meta and Headers
- Export `meta` function for dynamic page metadata
- Export `headers` function for custom HTTP headers
- Use proper SEO practices with meta tags