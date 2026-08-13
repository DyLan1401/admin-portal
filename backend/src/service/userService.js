import AppError from "../errors/AppError.js"
import * as UserRepository from "../repository/userRepository.js"

export const GetUsers = async ({ page, limit, search, status }) => {
    try {

        //validate page và limit
        const currentPage = Math.max(1, Number.parseInt(page, 10) || 1);
        const currentLimit = Math.min(
            100, Math.max(1, Number.parseInt(limit, 10) || 20)
        );

        const params = [];
        let whereClause = " WHERE 1=1 ";

        //Validate Query
        if (status && status !== "ACTIVE" && status !== "INACTIVE" && status !== "LOCKED") {
            throw new AppError("Invalid status.", 400);
        };

        //Build Search & Filter
        if (search) {
            whereClause += ` AND(u.full_name LIKE ? OR u.email LIKE ?)`;
            params.push(`%${search}%`);
            params.push(`%${search}%`);
        };

        if (status) {
            whereClause += ` AND u.status = ? `;
            params.push(status);
        };

        // Count total users
        const total = await UserRepository.countUsers({ whereClause, params });

        // Calculate pagination
        const totalPages = Math.ceil(total / currentLimit);
        const offset = (currentPage - 1) * currentLimit;

        // Get users
        const result = await UserRepository.findUsers({ whereClause, params, limit: currentLimit, offset });

        //Return User List
        return {
            data: result,
            pagination: {
                page: currentPage,
                limit: currentLimit,
                total,
                total_pages: totalPages,
            },
        };

    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Database query failed.", 500);
    }
}


export const GetUserDetail = async ({ id }) => {
    try {
        //Validate id
        const userId = Number(id);
        if (!Number.isInteger(userId) || userId <= 0) {
            throw new AppError("Invalid user id.", 400);
        }

        //Query DB find user by id
        const user = await UserRepository.findUserById(userId);

        //Business Rules
        if (!user) {
            throw new AppError(`User not found`, 404);
        }

        //Return User Detail
        return user;

    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Database query failed.", 500);
    }
}

export const updateUserStatus = async ({
    id,
    status,
    currentUser
}) => {
    try {

        //Validate id
        const userId = Number(id);

        if (!Number.isInteger(userId) || userId <= 0) {
            throw new AppError("Invalid user id.", 400);
        }

        //Validate status
        if (!status) {
            throw new AppError("Status is required.", 400);
        }
        const allowedStatus = ["ACTIVE", "INACTIVE", "LOCKED"];
        if (!allowedStatus.includes(status)) {
            throw new AppError("Invalid status.", 400);
        };
        //
        const user = await UserRepository.findUserById(userId);

        //Business Rules
        if (!user) {
            throw new AppError(`User not found`, 404);
        }

        // If status is unchanged.
        if (user.status === status) {
            throw new AppError(
                "User is already in this status.", 400);
        }

        // Prevent locking current login user
        if (user.id === currentUser.id && status === 'LOCKED') {
            throw new AppError("You cannot lock yourself out!", 400);
        }

        // Update
        await UserRepository.updateUserStatus({
            id: userId,
            status,
        });

        // Get updated user
        const updatedUser = await UserRepository.findUserById(userId);

        //Return Updated User
        return updatedUser;

    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError("Database query failed.", 500);
    }
};