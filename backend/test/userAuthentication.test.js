import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import * as UserRepository from "../src/repository/userRepository.js";

//tạo Authorization header với token hợp lệ
const authHeader = () => `Bearer ${process.env.DEV_AUTH_TOKEN}`;

// Thiết lập Current User mặc định là ADMIN trước mỗi test
beforeEach(() => {
    process.env.DEV_CURRENT_USER_ID = "1";
    process.env.DEV_CURRENT_USER_ROLE = "ADMIN";
});

describe("User Management Authentication", () => {
    // Case 1: Request không có token phải bị từ chối với HTTP 401
    it("should return 401 when token is missing", async () => {
        const response = await request(app)
            .get("/api/admin/users");

        expect(response.status).toBe(401);
    });

    // Case 2: Request có token không hợp lệ phải bị từ chối với HTTP 401
    it("should return 401 when token is invalid", async () => {
        const response = await request(app)
            .get("/api/admin/users")
            .set("Authorization", "Bearer invalid-token");

        expect(response.status).toBe(401);
    });

    // Case 3: User đã xác thực nhưng không có role ADMIN phải bị từ chối với HTTP 403
    it("should return 403 when user role is USER", async () => {
        process.env.DEV_CURRENT_USER_ROLE = "USER";
        const response = await request(app)
            .get("/api/admin/users")
            .set("Authorization", authHeader())

        expect(response.status).toBe(403);
        process.env.DEV_CURRENT_USER_ROLE = "ADMIN";

    });

    // Case 4: ADMIN có token hợp lệ được phép truy cập User Management
    it("should allow ADMIN to access user list", async () => {
        const response = await request(app)
            .get("/api/admin/users")
            .set("Authorization", authHeader())

        expect(response.status).toBe(200);
    });

    // Case 5: ADMIN không được phép LOCKED chính tài khoản đang đăng nhập
    it("should prevent ADMIN from locking their own account", async () => {

        const response = await request(app)
            .patch("/api/admin/users/1/status")
            .set("Authorization", authHeader())
            .send({
                status: "LOCKED",
            });

        expect(response.status).toBe(400);
    });

    // Case 6: Không thể cập nhật status của user không tồn tại
    it("should return 404 when user does not exist", async () => {

        const response = await request(app)
            .patch("/api/admin/users/999999/status")
            .set("Authorization", authHeader())
            .send({
                status: "ACTIVE",
            });

        expect(response.status).toBe(404);
    });

    // Case 7: Status không thuộc danh sách cho phép phải bị từ chối với HTTP 400
    it("should return 400 when status is invalid", async () => {

        const response = await request(app)
            .patch("/api/admin/users/5/status")
            .set("Authorization", authHeader())
            .send({
                status: "INVALID_STATUS",
            });

        expect(response.status).toBe(400);
    });

    // Case 8: Lỗi Database phải được xử lý và trả về HTTP 500
    it("should return 500 when database error occurs", async () => {

        vi.spyOn(UserRepository, "findUserById")
            .mockRejectedValueOnce(new Error("Database connection failed"));

        const response = await request(app)
            .get("/api/admin/users/2")
            .set("Authorization", authHeader());

        expect(response.status).toBe(500);

        UserRepository.findUserById.mockRestore();
    });

    // Case 9: ADMIN có thể cập nhật status của user khác thành công
    it("should allow ADMIN to update user status successfully", async () => {

        const response = await request(app)
            .patch("/api/admin/users/5/status")
            .set("Authorization", authHeader())
            .send({
                status: "INACTIVE",
            });

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.data.status).toBe("INACTIVE");
    });

});