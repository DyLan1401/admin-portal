import * as UserService from "../service/userService.js"

// Get List User
export const getUsers = async (req, res, next) => {
    try {

        const { page, limit, search, status } = req.query;

        const result = await UserService.GetUsers({ page, limit, search, status });

        return res.status(200).json({
            success: true,
            message: "Get User List successfully.",
            ...result
        });
    } catch (error) {
        next(error);
    }
}

export const getUserDetail = async (req, res, next) => {
    try {

        const { id } = req.params;

        const result = await UserService.GetUserDetail({ id });

        return res.status(200).json({
            success: true,
            message: "Get User successfully.",
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export const updateStatusUser = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { status } = req.body;

        const result = await UserService.updateUserStatus({ id, status, currentUser: req.user, });

        return res.status(200).json({
            success: true,
            message: "Update User Status successfully.",
            data: result
        });
    } catch (error) {
        next(error);
    }
}