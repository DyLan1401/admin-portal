export type UserRole = 'ADMIN' | 'USER';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'LOCKED';

export interface User {
    id: number;
    avatar: string;
    full_name: string;
    email: string;
    phone: string | null;
    role: UserRole;
    status: UserStatus;
    created_at: string;
    updated_at?: string;

}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
}

export interface GetUsersResponse {
    data: User[];
    pagination: Pagination;
}


export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export type GetUserDetailResponse = ApiResponse<User>;
export type UpdateUserStatusResponse = ApiResponse<User>;