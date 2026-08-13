import AppError from "../errors/AppError.js";

export const authenticate = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;


        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError("Unauthorized: No token provided.", 401);
        }

        const token = authHeader.split(" ")[1];

        if (!token || token !== process.env.DEV_AUTH_TOKEN) {
            throw new AppError("Invalid token.", 401);
        }

        req.user = {
            id: Number(process.env.DEV_CURRENT_USER_ID),
            role: process.env.DEV_CURRENT_USER_ROLE,
        };

        next();
    } catch (error) {
        next(error);
    }
};