    import axios from "axios";

    const API = axios.create({
    baseURL: "http://localhost:5000/api"
    });

    // 🔥 Automatically attach token to every request
    API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`; // ✅ IMPORTANT
    }

    return req;
    });

    // 🔹 Optional helper (for login)
    export const setToken = (token) => {
    localStorage.setItem("token", token);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    };

    export default API;