import axios from "axios";

const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return token;
};

const authHeader = `Bearer ${getToken()}`;

export const $axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: { Authorization: authHeader },
});

export const $axios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});
