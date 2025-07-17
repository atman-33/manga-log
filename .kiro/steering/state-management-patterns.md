# State Management Patterns for manga-log

## Zustand Store Structure
manga-log uses Zustand for client-side state management as specified in the PRD.

## Core Store Slices

### Manga Store
Manages the user's manga collection and related UI state.

```typescript
interface MangaStore {
  // Data
  mangaList: MangaLog[];
  
  // UI State
  searchQuery: string;
  sortBy: 'updatedAt' | 'score' | 'title';
  isLoading: boolean;
  
  // Actions
  setMangaList: (manga: MangaLog[]) => void;
  addManga: (manga: MangaLog) => void;
  updateManga: (id: number, manga: Partial<MangaLog>) => void;
  deleteManga: (id: number) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: 'updatedAt' | 'score' | 'title') => void;
  
  // Computed
  filteredAndSortedManga: () => MangaLog[];
}
```

### UI Store
Manages modal states and other UI interactions.

```typescript
interface UIStore {
  // Modal States
  isAddMangaModalOpen: boolean;
  editingMangaId: number | null;
  
  // Actions
  openAddMangaModal: () => void;
  openEditMangaModal: (id: number) => void;
  closeModal: () => void;
}
```

## Store Organization
- Keep stores focused and separated by domain
- Use computed values for derived state (filtered/sorted lists)
- Implement optimistic updates for better UX
- Sync with server state through React Router loaders/actions

## Integration with React Router
- Load initial data in route loaders
- Update Zustand store with server data
- Use store for client-side filtering/sorting without server round-trips
- Persist important state changes to server via actions

## Best Practices
- Keep stores minimal and focused
- Use TypeScript interfaces for type safety
- Implement proper error handling in store actions
- Consider using immer for complex state updates if needed