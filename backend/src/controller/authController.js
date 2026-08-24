import *  as AuthService from "../service/authenticateService.js"
import * as SessionService from "../session/sessionService.js"

export const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        const user = await AuthService.login({
            email,
            password,
        });

        await SessionService.createSession(
            req,
            user.id
        );

        return res.status(200).json({
            success: true,
            message: "Login Success",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

export const me = async (req, res, next) => {
    try {

        return res.status(200).json({
            success: true,
            message: "Get current user successfully.",
            data: req.user,
        });
    } catch (error) {
        next(error);
    }
};
export const logout = async (req, res, next) => {
    try {
        await SessionService.destroySession(req);

        res.clearCookie("connect.sid", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return res.status(200).json({
            success: true,
            message: "Logout successfully.",
        });
    } catch (error) {
        next(error);
    }
};