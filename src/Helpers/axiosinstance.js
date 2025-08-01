import axios from "axios";

const BASE_URL ="backend-production-79a3.up.railway.app/api/v1";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL=BASE_URL;
axiosInstance.defaults.withCredentials=true;

export default axiosInstance;
