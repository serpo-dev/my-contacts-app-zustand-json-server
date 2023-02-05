import { create } from "zustand";

interface NavigateState {
    currentPage: string;
    setCurrentPage: (page: string) => void;
    authTabNum: number;
    setAuthTabNum: (tabNum: number) => void;
}

export const useNavigateStore = create<NavigateState>((set) => ({
    currentPage: " ",
    setCurrentPage: (page: string) => set({ currentPage: page }),
    authTabNum: 0,
    setAuthTabNum: (num: number) => set((state) => ({ authTabNum: num })),
}));
