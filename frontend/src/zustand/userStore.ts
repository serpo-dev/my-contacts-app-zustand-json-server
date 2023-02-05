import { create } from "zustand";

interface UserState {
    isAuth: boolean;
    data: UserData;
    setUserData: (data: UserData) => void;
    clearUserData: () => void;
}

export interface UserData {
    id: number | undefined;
    name: string | undefined;
    surname?: string | undefined;
    email: string | undefined;
    city?: string | undefined;
    age?: number | undefined;
    smallPic?: string | undefined;
    largePic?: string | undefined;
    status?: string | undefined;
}

const defaultData: UserData = {
    id: undefined,
    name: undefined,
    surname: undefined,
    email: undefined,
    city: undefined,
    age: undefined,
    smallPic: undefined,
    largePic: undefined,
    status: undefined,
};

export const useUserStore = create<UserState>((set) => ({
    isAuth: false,
    data: defaultData,
    setUserData: (data: UserData) => set({ isAuth: true, data }),
    clearUserData: () => set({ isAuth: false, data: defaultData }),
}));
