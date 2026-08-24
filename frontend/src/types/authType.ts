export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthUser {
    id: number;
    fullname: string;
    email: string;
    role: string;
    status: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: AuthUser;
}

export interface MeResponse {
    success: boolean;
    message: string;
    data: AuthUser;
}