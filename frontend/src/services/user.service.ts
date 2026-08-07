import api from "@/lib/axios";
import type { GetUsersResponse, UserStatus } from "@/types/user.type"

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

