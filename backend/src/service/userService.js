import pool from "../config/database.js"
import AppError from "../errors/AppError.js"

export const GetUsers = async ({ page, limit, search, status }) => {
    try {
        //Query
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

        //Build Pagination
        const [[countResult]] = await pool.query(
            `
            SELECT COUNT(*) AS total
            FROM users u
            ${whereClause}`,
            params
        );
        const total = countResult.total;
        const totalPages = Math.ceil(total / currentLimit);
        const offset = (currentPage - 1) * currentLimit;

        //Query Database
        const dataSql =
            `
            SELECT
            u.id, u.full_name, u.email, u.status, u.role, u.created_at 
            FROM users u
            ${whereClause}
            ORDER BY u.created_at DESC, u.id DESC
            LIMIT ?
            OFFSET ?`

        const [result] = await pool.query(dataSql, [...params, currentLimit, offset]);

        //Return Response
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

export const updateUserStatus = async ({
    id,
    status,
}) => {
    try {
        //giả lập id và role của admin
        const currentUserId = Number(process.env.DEV_CURRENT_USER_ID);
        const currentUserRole = process.env.DEV_CURRENT_USER_ROLE;
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

        //Find User
        const findUserSql =
            `
            SELECT
            u.id, u.status, u.role 
            FROM users u
            Where u.id = ?
            `;
        const [[user]] = await pool.query(findUserSql, [userId]);

        //Business Rules
        if (!user) {
            throw new AppError(`User not found`, 404);
        }


        // If status is unchanged.
        if (user.status === status) {
            throw new AppError(
                "User is already in this status.", 400);
        }

        // Check current user role
        if (currentUserRole !== 'ADMIN') {
            throw new AppError("Only admins have the authority to change a user's status!", 403);
        }

        // Prevent locking current login user
        if (user.id === currentUserId && status === 'LOCKED') {
            throw new AppError("You cannot lock yourself out!", 400);
        }

        //Update User Status
        const updateUserSql = `
        UPDATE users 
        SET
        status = ?,
        updated_at=NOW()
        WHERE id = ?
        `;
        await pool.query(updateUserSql, [status, userId]);


        //
        const getUpdatedUserSql =
            `
            SELECT
            u.id,
            u.full_name,
            u.email,
            u.status,
            u.role,
            u.updated_at
            FROM users u
            WHERE u.id = ?
            `;

        const [[updatedUser]] = await pool.query(getUpdatedUserSql, [userId]);


        //Return Updated User
        return {
            data: updatedUser,
        };

    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError("Database query failed.", 500);
    }
};