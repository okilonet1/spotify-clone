import { create } from "zustand";

interface UploadModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useUploadModal = create<UploadModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useUploadModal;
