# UI Component Patterns

## shadcn/ui Integration
- Components located in `app/components/ui/`
- Use `npx shadcn-ui@latest add <component>` to add new components
- Follow shadcn/ui composition patterns
- Customize components through Tailwind CSS classes

## Component Structure
- Use TypeScript interfaces for props
- Implement proper accessibility attributes
- Use forwardRef for components that need DOM refs
- Export components as named exports

## Styling Patterns
- Use Tailwind CSS v4 utility classes
- Leverage CSS variables for theming
- Use `cn()` utility for conditional classes
- Follow mobile-first responsive design

## Example Component
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

## Theme Integration
- Use `next-themes` for dark/light mode
- Implement proper theme switching
- Use CSS variables for consistent theming
- Test components in both light and dark modes