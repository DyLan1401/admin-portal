import api from "@/lib/axios";
import type { GetUserDetailResponse, GetUsersResponse, UserStatus, UpdateUserStatusResponse } from "@/types/userType"

export const getUsers = async (
    page: number,
    limit: number,
    search?: string,
    status?: UserStatus,
): Promise<GetUsersResponse> => {
    const response = await api.get<GetUsersResponse>(
        "/api/admin/users",
        {
            params: {
                page,
                limit,
                search,
                status,
            },
        }
    );
    return response.data;
};

export const getUserById = async (
    id: number
): Promise<GetUserDetailResponse> => {
    const response = await api.get<GetUserDetailResponse>(
        `/api/admin/users/${id}`
    );

    return response.data;
};

export const updateUserStatus = async (
    id: number,
    status: UserStatus
): Promise<UpdateUserStatusResponse> => {
    const response = await api.patch(
        `/api/admin/users/${id}/status`,
        {
            status,
        }
    );

    return response.data;
};