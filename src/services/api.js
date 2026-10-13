import axios from "axios";

const api = axios.create({
    baseURL: "https://campusswap-backend-g9t6.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;