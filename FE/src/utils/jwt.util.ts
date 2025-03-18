import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = "access_token";

/**
 * Lưu JWT vào localStorage
 * @param token Chuỗi JWT
 */
const saveToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Lấy JWT từ localStorage
 * @returns Chuỗi JWT hoặc null nếu không có
 */
const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

/**
 * Xóa JWT khỏi localStorage
 */
const removeToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};

/**
 * Giải mã JWT để lấy payload
 * @param token Chuỗi JWT
 * @returns Payload của JWT hoặc null nếu lỗi
 */
const decodeToken = (token: string): any | null => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};

/**
 * Kiểm tra xem JWT có hợp lệ hay không (có hết hạn không)
 * @returns true nếu hợp lệ, false nếu không hợp lệ
 */
const isTokenValid = (token : string): boolean => {
    if (!token) return false;

    const decoded: any = decodeToken(token);
    if (!decoded || !decoded.exp) return false;

    const currentTime = Math.floor(Date.now() / 1000);

    
    return decoded.exp > currentTime;
};

const JwtUtil = {
    saveToken,
    getToken,
    removeToken,
    decodeToken,
    isTokenValid
};


export { JwtUtil }