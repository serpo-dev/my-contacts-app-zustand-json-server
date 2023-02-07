import { $axiosAuth } from "../http/axios";
import { useUserStore } from "../zustand/userStore";
import { UserData } from "../interfaces";

export const updateUserData = async (updatedData: UserData) => {

    const res = await $axiosAuth.patch(`/users/${updatedData.id}`, {
        ...updatedData,
    });

    if (res.status !== 200) return false;
    if (!res.data.id) return false;

    const setUserData = useUserStore.getState().setUserData;
    try {
        setUserData(res.data);
        return true;
    } catch {
        return false;
    }
};

export const getAnotherUserData = async (id: number) => {
    const clearAnotherUserData = useUserStore.getState().clearAnotherUserData;
    clearAnotherUserData();

    const res = await $axiosAuth.get(`/users/${id}`);

    if (res.status !== 200) return false;
    if (!res.data) return false;

    const setAnotherUserData = useUserStore.getState().setAnotherUserData;
    try {
        setAnotherUserData(res.data);
        return true;
    } catch {
        return false;
    }
};