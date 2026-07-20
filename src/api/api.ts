import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`
});

api.interceptors.request.use(
    (config)=>{
        if(
            config.url?.includes("/auth/register") ||
            config.url?.includes("/auth/login")
        )
        {
            return config
        }

        const token = localStorage.getItem('token');

        if(token)
        {
            config.headers["authorization"] = `Bearer ${token}`;
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error)=> Promise.reject(error)
);

export default api;