import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Express App", () => {
    it("GET /health should return 200", async () => {
        const response = await request(app)
            .get("/health");

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            status: "ok",
        });
    });


});