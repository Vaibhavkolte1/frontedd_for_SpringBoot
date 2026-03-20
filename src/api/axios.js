import axios from "axios";

const DEFAULT_API_URL = "https://quickmart-backend-2ux2.onrender.com/api";

// const DEFAULT_API_URL = "http://localhost:8080/api"
const BASE_URL = import.meta.env.DEV
    ? '/api'
    : (import.meta.env.VITE_API_URL || DEFAULT_API_URL);

const api = axios.create({
    // baseURL: BASE_URL,
    baseURL: DEFAULT_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;