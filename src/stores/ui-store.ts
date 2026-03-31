import type { ReactNode } from 'react';
import { create } from 'zustand';

type ThemeMode = 'dark' | 'light';

type UIState = {
  isSidebarCollapsed: boolean;
  isCommandPaletteOpen: boolean;
  theme: ThemeMode;
  isBottomDrawerOpen: boolean;
  bottomDrawerTitle: string;
  bottomDrawerContent: ReactNode | null;
  toggleSidebar: () => void;
  setTheme: (theme: ThemeMode) => void;
  setCommandPaletteOpen: (isOpen: boolean) => void;
  setBottomDrawer: (payload: { isOpen: boolean; title?: string; content?: ReactNode | null }) => void;
};

export const useUIStore = create<UIState>((set) => ({
  isSidebarCollapsed: false,
  isCommandPaletteOpen: false,
  theme: 'dark',
  isBottomDrawerOpen: false,
  bottomDrawerTitle: 'Details',
  bottomDrawerContent: null,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setTheme: (theme) => set({ theme }),
  setCommandPaletteOpen: (isCommandPaletteOpen) => set({ isCommandPaletteOpen }),
  setBottomDrawer: ({ isOpen, title, content }) =>
    set({
      isBottomDrawerOpen: isOpen,
      bottomDrawerTitle: title ?? 'Details',
      bottomDrawerContent: content ?? null,
    }),
}));