import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../src/app.js";

const login = async (agent, email, password) => {
    const response = await agent
        .post("/api/auth/login")
        .send({
            email,
            password,
        });
    expect(response.status).toBe(200);

    return response;
};

const loginAsAdmin = async () => {
    const agent = request.agent(app);

    await login(
        agent,
        process.env.TEST_ADMIN_EMAIL,
        process.env.TEST_ADMIN_PASSWORD
    );

    return agent;
};


describe("User Management Authentication", () => {
    it("should return 401 when session is missing", async () => {
        const response = await request(app)
            .get("/api/admin/users");

        expect(response.status).toBe(401);
    });

    it("should return 403 when authenticated user is not ADMIN", async () => {
        const agent = request.agent(app);

        const loginResponse = await login(
            agent,
            process.env.TEST_USER_EMAIL,
            process.env.TEST_USER_PASSWORD
        );

        expect(loginResponse.body.data.role).toBe("USER");

        const response = await agent
            .get("/api/admin/users");

        expect(response.status).toBe(403);
    });

    it("should allow ADMIN to access user list", async () => {
        const agent = await loginAsAdmin();

        const response = await agent
            .get("/api/admin/users");

        expect(response.status).toBe(200);
    });

    it("should prevent ADMIN from locking their own account", async () => {
        const agent = await loginAsAdmin();

        const meResponse = await agent
            .get("/api/auth/me");

        expect(meResponse.status).toBe(200);

        const adminId = meResponse.body.data.id;

        const response = await agent
            .patch(`/api/admin/users/${adminId}/status`)
            .send({
                status: "LOCKED",
            });

        expect(response.status).toBe(400);
    });

    it("should return 404 when user does not exist", async () => {
        const agent = await loginAsAdmin();

        const response = await agent
            .patch("/api/admin/users/999999/status")
            .send({
                status: "ACTIVE",
            });

        expect(response.status).toBe(404);
    });

    it("should return 400 when status is invalid", async () => {
        const agent = await loginAsAdmin();

        const response = await agent
            .patch("/api/admin/users/6/status")
            .send({
                status: "INVALID_STATUS",
            });

        expect(response.status).toBe(400);
    });

    it("should allow ADMIN to update user status successfully", async () => {
        const agent = await loginAsAdmin();

        const response = await agent
            .patch("/api/admin/users/5/status")
            .send({
                status: "INACTIVE",
            });

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.status).toBe("INACTIVE");
    });
});
