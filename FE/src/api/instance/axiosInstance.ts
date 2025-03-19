import axios from "axios";
import { loginRequiredAlert } from "../../utils/alert.util";
import { JwtUtil } from "../../utils/jwt.util";
import { LocalStorageUtil } from "../../utils/storage.util";
import { apiBaseUrl } from "../baseUrl";

const publicApi = axios.create({
  baseURL: apiBaseUrl + "/api",
  timeout: 10000,
});

const loginRequiredApi = axios.create({
  baseURL: apiBaseUrl + "/api",
  timeout: 10000,
});

const adminApi = axios.create({
  baseURL: apiBaseUrl + "/api",
  timeout: 10000,
});
const token = LocalStorageUtil.getAuthTokenFromLocalStorage();

// Common request interceptor to add headers
const addCommonHeaders = (config: any) => {
  config.headers["ngrok-skip-browser-warning"] = "69420";
  return config;
};

publicApi.interceptors.request.use(
  (config) => {
    config = addCommonHeaders(config);
    const token = LocalStorageUtil.getAuthTokenFromLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

loginRequiredApi.interceptors.request.use(
  async (config) => {
    config = addCommonHeaders(config);
    const token = LocalStorageUtil.getAuthTokenFromLocalStorage();

    if (token) {
      if (!JwtUtil.isTokenValid(token)) {
        await loginRequiredAlert();
        return Promise.reject(new Error("Token expired"));
      }
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      await loginRequiredAlert();
      return Promise.reject(new Error("No token found"));
    }

    return config;
  },
  (error) => Promise.reject(error)
);

adminApi.interceptors.request.use(
  async (config) => {
    config = addCommonHeaders(config);
    const token = LocalStorageUtil.getAuthTokenFromLocalStorage();


    if (token) {
      if (!JwtUtil.isTokenValid(token)) {
        await loginRequiredAlert();
        return Promise.reject(new Error("Token expired"));
      }
      const user = JwtUtil.decodeToken(token);

      if (![2, 3, 4].includes(user.role.id)) {
        await loginRequiredAlert();
        return Promise.reject(new Error("No permission"));
      }

      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      await loginRequiredAlert();
      return Promise.reject(new Error("No token found"));
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { publicApi, loginRequiredApi, adminApi };