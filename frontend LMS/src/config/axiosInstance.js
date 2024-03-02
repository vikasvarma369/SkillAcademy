import axios from "axios";


const BASE_URL = "/api/v1/";
const axiosInstance = axios.create(
    {
        baseURL: BASE_URL,
        withCredentials: true
    }
);


export default axiosInstance;