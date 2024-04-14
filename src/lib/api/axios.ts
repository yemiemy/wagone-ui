import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000/api/v1";

export const MEDIA_URL = "https://3578-5-151-139-52.ngrok-free.app";

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    // withCredentials: true,
});
