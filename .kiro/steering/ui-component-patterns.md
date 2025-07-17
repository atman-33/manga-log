# UI Component Patterns

## Component Organization Structure

### Shared Components (`app/components/`)
- **Purpose**: Components used across multiple pages/routes
- **Examples**: Header, Footer, Layout wrappers, common UI elements
- **Location**: `app/components/`
- **Subdirectories**:
  - `app/components/ui/`: shadcn/ui base components
  - `app/components/layout/`: Layout-related components
  - `app/components/common/`: Other shared components

### Page-Specific Components (`app/routes/{folder}/components/`)
- **Purpose**: Components specific to individual routes/pages
- **Structure**: Following React Router v7 file-based routing
- **Location**: `app/routes/{folder}/components/`
- **Usage**: Components used only by `app/routes/{folder}/route.tsx`
- **Examples**: 
  - `app/routes/_app/components/` for app layout components
  - `app/routes/manga/components/` for manga-specific components

## shadcn/ui Integration
- Base UI components in `app/components/ui/`
- Use `npx shadcn@latest add <component>` to add new components
- Follow shadcn/ui composition patterns
- Customize components through Tailwind CSS classes

## Component Structure Guidelines
- Use TypeScript interfaces for props
- Implement proper accessibility attributes
- Use forwardRef for components that need DOM refs
- Export components as named exports
- Keep page-specific components close to their routes

## Example Component Structure
```typescript
import { cn } from '~/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

export function Button({ 
  className, 
  variant = 'default', 
  size = 'default',
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md',
        // variant and size classes
        className
      )}
      {...props}
    />
  );
}
```

## Import Patterns
- Shared components: `import { Header } from '~/components/layout/header';`
- Page-specific: `import { MangaCard } from './components/manga-card';`
- UI components: `import { Button } from '~/components/ui/button';`

## Theme Integration
- Use `next-themes` for dark/light mode
- Implement proper theme switching
- Use CSS variables for consistent theming
- Test components in both light and dark modes