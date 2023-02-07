import { create } from "zustand";
import { UserData } from "../interfaces";

interface UserState {
    isAuth: boolean;
    data: UserData;
    anotherUserData: UserData;
    setUserData: (data: UserData) => void;
    setAnotherUserData: (anotherUserData: UserData) => void;
    clearUserData: () => void;
    clearAnotherUserData: () => void;
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
    anotherUserData: defaultData,
    setUserData: (data: UserData) => set({ isAuth: true, data }),
    clearUserData: () => set({ isAuth: false, data: defaultData }),
    setAnotherUserData: (anotherUserData: UserData) => set({ anotherUserData }),
    clearAnotherUserData: () => set({ anotherUserData: defaultData }),
}));
