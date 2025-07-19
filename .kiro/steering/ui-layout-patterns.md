# UI Layout Patterns for manga-log

## Responsive Design Requirements
- Must be usable on both mobile and desktop screens
- Use mobile-first approach with Tailwind CSS
- Test layouts on various screen sizes

## Header Component
- **Logo/Title**: Application logo and "manga-log" title
- **Authentication State**:
  - Unauthenticated: Show "Login" button
  - Authenticated: Show user information and "Logout" option
- **Responsive**: Collapse to hamburger menu on mobile if needed

## Main Page Layout (Manga List View)
This is the primary page after login, displaying the user's manga collection.

### Search & Filter Section
- **Search Bar**: Filter manga list by title
- **Sort Options**: Dropdown or buttons for:
  - Last updated date (default sort)
  - Score (highest to lowest)
  - Title (alphabetical A-Z)

### Manga List Display
- **Card Layout**: Each manga as a card showing key information
- **Grid/List Toggle**: Consider both grid and list view options
- **Pagination**: For large collections (implement when needed)

### Empty State
- Show helpful message when user has no manga logged yet
- Include call-to-action to add first manga

## Add/Edit Manga Modal/Form
- **Modal vs Page**: Can be implemented as modal overlay or dedicated page
- **Form Fields** (based on domain model):
  - Title (required, text input)
  - Score (optional, number input or slider, 0.0-5.0)
  - Is Completed (optional, toggle/checkbox)
  - Progress Volume (optional, number input)
  - Progress Chapter (optional, number input)
  - Note (optional, textarea)
- **Actions**: "Save" and "Cancel" buttons
- **Validation**: Client and server-side validation

## Component Hierarchy
```
App
├── Header
│   ├── Logo
│   └── AuthSection
├── MainContent
│   ├── SearchAndSort
│   ├── MangaList
│   │   └── MangaCard[]
│   └── AddMangaButton
└── MangaModal (when open)
    └── MangaForm
```