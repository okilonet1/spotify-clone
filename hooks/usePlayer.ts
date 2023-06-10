import { create } from "zustand";

interface PlayerState {
  ids: string[];
  activeId?: string;
  setIds: (ids: string[]) => void;
  setId: (id: string) => void;
  reset: () => void;
}

const usePlayer = create<PlayerState>((set) => ({
  ids: [],
  activeId: undefined,
  setIds: (ids) => set({ ids }),
  setId: (id) => set({ activeId: id }),
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayer;
