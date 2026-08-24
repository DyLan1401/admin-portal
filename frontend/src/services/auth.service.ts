import api from "@/lib/axios";
import { LoginRequest, LoginResponse, MeResponse } from "@/types/authType";



export const login = async (
    credentials: LoginRequest
): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>(
            "/api/auth/login",
            credentials
        );

        return response.data;
    } catch (error) {
        throw error;

    }
};

export const getCurrentUser = async (): Promise<MeResponse> => {
    const response = await api.get<MeResponse>(
        "/api/auth/me"
    );

    return response.data;
};

export const logout = async (): Promise<void> => {
    await api.post("/api/auth/logout");
};