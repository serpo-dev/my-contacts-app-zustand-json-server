import { $axios, $axiosAuth } from "../http/axios";
import { UserData } from "../zustand/userStore";
import jwt_decode from "jwt-decode";

interface LoginAsyncReq {
    email: string;
    password: string;
}

interface RegisterAsyncReq {
    email: string;
    password: string;
    name: string;
    surname: string;
}

interface DecodedToken {
    email: string;
    exp: number;
    iat: number;
    sub: string;
}

export const loginAsync = async (req: LoginAsyncReq) => {
    const { email, password } = req;
    const res = await $axios.post("/login", { email, password });
    const token = res.data.accessToken;
    window.localStorage.setItem("token", token);
    const data: UserData = { ...res.data.user };
    return data;
};

export const registerAsync = async (req: RegisterAsyncReq) => {
    const { email, password, name, surname } = req;
    const defaultData = {
        age: null,
        city: null,
        status: null,
        smallPic: null,
        largePic: null,
    };
    const res = await $axios.post("/register", {
        email,
        password,
        name,
        surname,
        ...defaultData,
    });
    const token = res.data.accessToken;
    window.localStorage.setItem("token", token);
    const data: UserData = { ...res.data.user };
    return data;
};

export const checkAuthAsync = async () => {
    try {
        const res = await $axiosAuth.get("/auth");
        if (!res) throw new Error("The user is not authenticated");
        const token: string = window.localStorage.getItem("token") || "";
        const decoded = jwt_decode<DecodedToken>(token);
        const id: number = Number(decoded.sub);
        const userData = await $axiosAuth.get(`/users?id=${id}`);
        return { ...userData.data[0] };
    } catch (e) {
        return false;
    }
};
