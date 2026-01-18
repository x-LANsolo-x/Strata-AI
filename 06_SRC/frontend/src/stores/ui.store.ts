import { create } from 'zustand';

type ModalType = 'createScenario'; // We can add more modal types later

interface ModalState {
  type: ModalType | null;
  isOpen: boolean;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useUiStore = create<ModalState>((set) => ({
  type: null,
  isOpen: false,
  openModal: (type) => set({ isOpen: true, type }),
  closeModal: () => set({ isOpen: false, type: null }),
}));
