import { create } from 'zustand';
import { setViewTypeCookie } from '~/lib/cookies';

interface UIStore {
  // View Type State
  viewType: 'card' | 'list';
  setViewType: (type: 'card' | 'list') => void;
  initializeViewType: (type: 'card' | 'list') => void;

  // Modal States
  isAddMangaModalOpen: boolean;
  editingMangaId: number | null;

  // Modal Actions
  openAddMangaModal: () => void;
  openEditMangaModal: (id: number) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  // View Type
  viewType: 'card',
  setViewType: (type) => {
    set({ viewType: type });
    // Update cookie when viewType changes
    if (typeof document !== 'undefined') {
      document.cookie = setViewTypeCookie(type);
    }
  },
  initializeViewType: (type) => set({ viewType: type }),

  // Modal States
  isAddMangaModalOpen: false,
  editingMangaId: null,

  // Modal Actions
  openAddMangaModal: () =>
    set({ isAddMangaModalOpen: true, editingMangaId: null }),
  openEditMangaModal: (id) =>
    set({ isAddMangaModalOpen: true, editingMangaId: id }),
  closeModal: () => set({ isAddMangaModalOpen: false, editingMangaId: null }),
}));
