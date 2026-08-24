import bcrypt from "bcrypt"
import AppError from "../errors/AppError.js"
import *  as UserRepository from "../repository/userRepository.js"

export const login = async ({
    email,
    password,

}) => {
    try {

        // Validate Input
        if (!email || !password) {
            throw new AppError("Email và mật khẩu là bắt buộc.", 400);
        }
        if (typeof email !== "string" || typeof password !== "string") {
            throw new AppError("Email hoặc mật khẩu không hợp lệ.", 400);
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new AppError("Định dạng email không hợp lệ.", 400);
        }

        //find user
        const user = await UserRepository.findUserByEmail(email);

        //user tồn tại
        if (!user) {
            throw new AppError("Invalid email or password.", 401);
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError("Invalid email or password.", 401);
        }

        if (user.status !== "ACTIVE") {
            throw new AppError("Account is not active.", 401);
        }


        return {
            id: user.id,
            email: user.email,
            role: user.role,
            status: user.status
        }


    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError("Database query failed.", 500);
    }
};