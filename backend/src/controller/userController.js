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