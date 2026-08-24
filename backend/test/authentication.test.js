import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { sessionStore } from "../src/app.js";
const loginAsAdmin = async () => {
    const agent = request.agent(app);

    const response = await agent
        .post("/api/auth/login")
        .send({
            email: process.env.TEST_ADMIN_EMAIL,
            password: process.env.TEST_ADMIN_PASSWORD,
        });

    return {
        agent,
        response,
    };
};

const getSessionId = (response) => {
    const cookie = response.headers["set-cookie"]
        .find((cookie) => cookie.startsWith("connect.sid="));

    expect(cookie).toBeDefined();

    const value = cookie.split(";")[0].split("=")[1];

    return decodeURIComponent(value)
        .replace(/^s:/, "")
        .split(".")[0];
};

const getStoredSession = (sessionId) => {
    return new Promise((resolve, reject) => {
        sessionStore.get(sessionId, (error, sessionData) => {
            if (error) {
                return reject(error);
            }

            resolve(sessionData);
        });
    });
};



describe("Authentication Integration", () => {

    it("should login successfully with valid credentials", async () => {
        const { response } = await loginAsAdmin();

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toMatchObject({
            id: expect.anything(),
            email: process.env.TEST_ADMIN_EMAIL,
            role: "ADMIN",
            status: "ACTIVE",
        });
    });

    it("should not expose sensitive data in login response", async () => {
        const { response } = await loginAsAdmin();

        expect(response.status).toBe(200);

        expect(response.body.data).not.toHaveProperty("password");
        expect(response.body.data).not.toHaveProperty("password_hash");
        expect(response.body.data).not.toHaveProperty("sessionId");
        expect(response.body.data).not.toHaveProperty("sessionID");
        expect(response.body.data).not.toHaveProperty("secret");
    });

    it("should create session after successful login", async () => {
        const { response } = await loginAsAdmin();

        expect(response.status).toBe(200);

        const cookies = response.headers["set-cookie"];

        expect(cookies).toBeDefined();
        expect(cookies.length).toBeGreaterThan(0);

        expect(
            cookies.some((cookie) => cookie.startsWith("connect.sid="))
        ).toBe(true);
    });

    it("should return current user from valid session", async () => {
        const { agent } = await loginAsAdmin();

        const response = await agent
            .get("/api/auth/me");

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toMatchObject({
            id: expect.anything(),
            email: process.env.TEST_ADMIN_EMAIL,
            role: "ADMIN",
            status: "ACTIVE",
        });
    });

    it("should return 401 when session is missing", async () => {
        const response = await request(app)
            .get("/api/auth/me");

        expect(response.status).toBe(401);
    });

    it("should logout successfully", async () => {
        const { agent } = await loginAsAdmin();

        const response = await agent
            .post("/api/auth/logout");

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);
    });


    it("should reject /auth/me after logout", async () => {
        const { agent } = await loginAsAdmin();

        const logoutResponse = await agent
            .post("/api/auth/logout");

        expect(logoutResponse.status).toBe(200);

        const meResponse = await agent
            .get("/api/auth/me");

        expect(meResponse.status).toBe(401);
    });

    it("should logout successfully when session does not exist", async () => {
        const response = await request(app)
            .post("/api/auth/logout");

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);
    });

    it("should return 400 when email is missing", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                password: process.env.TEST_ADMIN_PASSWORD,
            });

        expect(response.status).toBe(400);
    });

    it("should return 400 when password is missing", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: process.env.TEST_ADMIN_EMAIL,
            });

        expect(response.status).toBe(400);
    });

    it("should return 401 when email is invalid", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "not-exist@example.com",
                password: process.env.TEST_ADMIN_PASSWORD,
            });

        expect(response.status).toBe(401);
    });

    it("should return 401 when password is invalid", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: process.env.TEST_ADMIN_EMAIL,
                password: "WrongPassword@123",
            });

        expect(response.status).toBe(401);
    });

    it("should reject INACTIVE account", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: process.env.TEST_INACTIVE_EMAIL,
                password: process.env.TEST_INACTIVE_PASSWORD,
            });

        expect(response.status).toBe(401);
    });

    it("should reject LOCKED account", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: process.env.TEST_LOCKED_EMAIL,
                password: process.env.TEST_LOCKED_PASSWORD,
            });

        expect(response.status).toBe(401);
    });

    it("should return 401 when session is expired", async () => {
        const agent = request.agent(app);

        const loginResponse = await agent
            .post("/api/auth/login")
            .send({
                email: process.env.TEST_ADMIN_EMAIL,
                password: process.env.TEST_ADMIN_PASSWORD,
            });

        expect(loginResponse.status).toBe(200);

        const sessionId = getSessionId(loginResponse);

        const storedSession = await getStoredSession(sessionId);

        expect(storedSession).toBeDefined();

        // Force session absolute expiration
        storedSession.expiresAt = Date.now() - 1000;

        sessionStore.sessions.set(sessionId, storedSession);

        const response = await agent
            .get("/api/auth/me");

        expect(response.status).toBe(401);
    });

    it("should return 401 when session is idle expired", async () => {
        const agent = request.agent(app);

        const loginResponse = await agent
            .post("/api/auth/login")
            .send({
                email: process.env.TEST_ADMIN_EMAIL,
                password: process.env.TEST_ADMIN_PASSWORD,
            });

        expect(loginResponse.status).toBe(200);

        const sessionId = getSessionId(loginResponse);

        const storedSession = await getStoredSession(sessionId);

        expect(storedSession).toBeDefined();

        // Force idle timeout
        storedSession.lastAccessedAt =
            Date.now() - Number(process.env.SESSION_IDLE_TIMEOUT_MS) - 1000;

        sessionStore.sessions.set(sessionId, storedSession);

        const response = await agent
            .get("/api/auth/me");

        expect(response.status).toBe(401);
    });

    it("should return current user without sensitive data", async () => {
        const { agent } = await loginAsAdmin();

        const response = await agent
            .get("/api/auth/me");

        expect(response.status).toBe(200);

        expect(response.body.data).not.toHaveProperty("password");
        expect(response.body.data).not.toHaveProperty("password_hash");
        expect(response.body.data).not.toHaveProperty("sessionId");
        expect(response.body.data).not.toHaveProperty("sessionID");
    });

    it("should clear session cookie on logout", async () => {
        const { agent } = await loginAsAdmin();

        const response = await agent
            .post("/api/auth/logout");

        expect(response.status).toBe(200);

        const cookies = response.headers["set-cookie"];

        expect(cookies).toBeDefined();

        expect(
            cookies.some((cookie) =>
                cookie.startsWith("connect.sid=")
            )
        ).toBe(true);
    });

});