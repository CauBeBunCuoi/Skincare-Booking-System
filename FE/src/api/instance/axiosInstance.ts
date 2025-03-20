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

// Common request interceptor to add headers
const addCommonHeaders = (config: any) => {
  config.headers["ngrok-skip-browser-warning"] = "69420";
  return config;
};

publicApi.interceptors.request.use(
  (config) => {
    const token = LocalStorageUtil.getAuthTokenFromLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

loginRequiredApi.interceptors.request.use(
  async (config) => {
    const token = LocalStorageUtil.getAuthTokenFromLocalStorage();

    if (token) {
      if (JwtUtil.isTokenValid(token) === false) {
        //** CHO HIỆN THÔNG BÁO YÊU CẦU ĐĂNG NHẬP
        await loginRequiredAlert();

        return Promise.reject(new Error("Token expired"));
      }
      config.headers.Authorization = `${token}`;
    } else {
      //** CHO HIỆN THÔNG BÁO YÊU CẦU ĐĂNG NHẬP
      await loginRequiredAlert();

      return Promise.reject(new Error("No token found"));
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

adminApi.interceptors.request.use(
  async (config) => {
    const token = LocalStorageUtil.getAuthTokenFromLocalStorage();

    if (token) {
      if (JwtUtil.isTokenValid(token) === false) {
        //** CHO HIỆN THÔNG BÁO YÊU CẦU ĐĂNG NHẬP
        await loginRequiredAlert();

        return Promise.reject(new Error("Token expired"));
      }
      const user = JwtUtil.decodeToken(token);

      if (user.role.id != 2 && user.role.id != 3 && user.role.id != 4) {
        //** CHO HIỆN THÔNG BÁO YÊU CẦU ĐĂNG NHẬP
        await loginRequiredAlert();
        return Promise.reject(new Error("No permission"));
      }

      config.headers.Authorization = `${token}`;
    } else {
      //** CHO HIỆN THÔNG BÁO YÊU CẦU ĐĂNG NHẬP
      await loginRequiredAlert();

      return Promise.reject(new Error("No token found"));
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { publicApi, loginRequiredApi, adminApi };
