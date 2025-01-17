import axios from "axios";


const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1/`
const axiosInstance = axios.create(
    {
        baseURL: BASE_URL,
        withCredentials: true
    }
);


export default axiosInstance;