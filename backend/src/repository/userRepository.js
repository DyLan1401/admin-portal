import pool from "../config/database.js";


export const updateUserStatus = async ({
    id,
    status,
}) => {
    const [result] = await pool.query(
        `
        UPDATE users
        SET
            status = ?,
            updated_at = NOW()
        WHERE id = ?
        `,
        [status, id]
    );

    return result;
};

export const countUsers = async ({
    whereClause,
    params,
}) => {
    const [[result]] = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM users u
        ${whereClause}
        `,
        params
    );

    return result.total;
};


export const findUsers = async ({
    whereClause,
    params,
    limit,
    offset,
}) => {
    const [rows] = await pool.query(
        `
        SELECT
            u.id,
            u.full_name,
            u.email,
            u.status,
            u.role,
            u.created_at
        FROM users u
        ${whereClause}
        ORDER BY u.created_at DESC, u.id DESC
        LIMIT ?
        OFFSET ?
        `,
        [...params, limit, offset]
    );

    return rows;
};


export const findUserById = async (id) => {
    const [[user]] = await pool.query(
        `
        SELECT
            u.id,
            u.avatar,
            u.full_name,
            u.email,
            u.phone,
            u.role,
            u.status,
            u.created_at,
            u.updated_at
        FROM users u
        WHERE u.id = ?
        `,
        [id]
    );

    return user;
};