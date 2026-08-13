import AppError from "../errors/AppError.js";
export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AppError("Your information has not been verified.", 401));
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(new AppError("You do not have permission here.", 403));
        }

        next();
    };
};