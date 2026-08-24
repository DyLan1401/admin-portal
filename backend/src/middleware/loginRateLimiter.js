import rateLimit from "express-rate-limit";
import {
    LOGIN_RATE_LIMIT_WINDOW_MS,
    LOGIN_RATE_LIMIT_MAX,
} from "../config/rateLimitConfig.js";

export const loginRateLimiter = rateLimit({
    windowMs: LOGIN_RATE_LIMIT_WINDOW_MS,
    limit: LOGIN_RATE_LIMIT_MAX,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        error: "Too many login attempts. Please try again later.",
    },
}); 