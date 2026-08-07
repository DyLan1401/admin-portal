export type UserRole = 'ADMIN' | 'USER';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'LOCKED';

export interface User {
    id: number;
    avatar: string | null;
    full_name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    created_at: string;
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