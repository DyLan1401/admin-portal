import AppError from "../errors/AppError.js";
import *  as UserRepository from "../repository/userRepository.js"
import * as SessionService from "../session/sessionService.js"
export const authenticate = async (req, res, next) => {
    try {

        const session = await SessionService.getValidSession(req);

        if (!session) {
            return next(
                new AppError("Unauthorized.", 401)
            );
        }

        const user = await UserRepository.findUserForAuthentication(
            session.userId
        );

        if (!user) {

            await SessionService.destroySession(req);

            return next(
                new AppError("Unauthorized.", 401)
            );
        }

        if (user.status !== "ACTIVE") {
            await SessionService.destroySession(req);

            res.clearCookie("connect.sid", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });

            return next(
                new AppError("Unauthorized.", 401)
            );
        }

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
            status: user.status,
        };

        next();
    } catch (error) {
        next(error);
    }
};