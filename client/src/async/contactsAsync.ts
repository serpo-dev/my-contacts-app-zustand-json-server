import jwtDecode from "jwt-decode";
import { $axiosAuth } from "../http/axios";
import { useUserStore } from "../zustand/userStore";

interface Decoded {
    email: string;
    sub: string;
    exp: number;
    iat: number;
}

interface Contact {
    id: number;
    userId: number;
    to: number;
}

let userId: number;
const token = window.localStorage.getItem("token");
if (!token) {
    const clearUserData = useUserStore.getState().clearUserData;
    clearUserData();
    userId = -1;
} else {
    const decoded = jwtDecode<Decoded>(token);
    userId = Number(decoded.sub);
}

export const addContact = async (to: number | undefined) => {
    try {
        if (!token || userId === -1) return false;
        if (!to) return false;

        const res = await $axiosAuth.post("/contacts", { userId, to });

        if (res.status !== 201) return false;
        if (!res.data.id) return false;

        return true;
    } catch (e) {
        return false;
    }
};

export const removeContact = async (to: number | undefined) => {
    try {
        if (!token || userId === -1) return false;
        if (!to) return false;

        const res = await $axiosAuth.get(`/contacts?to=${to}&userId=${userId}`);
        if (!res.data) return false;
        if (res.data.length === 0) return true;

        const ids: Array<number> = res.data.map((item: Contact) => item.id);
        let isNotSuccess = false;
        for (let i = 0; i < ids.length; i++) {
            const { status } = await $axiosAuth.delete(`/contacts/${ids[i]}`);
            if (status !== 200) {
                isNotSuccess = true;
            }
        }

        if (isNotSuccess) return false;

        return true;
    } catch (e) {
        return false;
    }
};
