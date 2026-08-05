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
        if (status && status !== "ACTIVE" && status !== "INACTIVE") {
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