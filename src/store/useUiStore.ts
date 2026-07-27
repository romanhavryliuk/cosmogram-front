import { create } from 'zustand';

export type ModalName = 'deleteProfile' | 'export' | null;

interface UiState {
  isGlobalLoading: boolean;
  activeModal: ModalName;
  /** Довільні дані для відкритої модалки, напр. id профілю на видалення */
  modalPayload: unknown;
  isMobileMenuOpen: boolean;

  setGlobalLoading: (value: boolean) => void;
  openModal: (name: Exclude<ModalName, null>, payload?: unknown) => void;
  closeModal: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isGlobalLoading: false,
  activeModal: null,
  modalPayload: null,
  isMobileMenuOpen: false,

  setGlobalLoading: (value) => set({ isGlobalLoading: value }),
  openModal: (name, payload = null) =>
    set({ activeModal: name, modalPayload: payload }),
  closeModal: () => set({ activeModal: null, modalPayload: null }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));
