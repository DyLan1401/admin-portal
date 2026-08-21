import AppError from "../errors/AppError.js";
import { SESSION_IDLE_TIMEOUT_MS, SESSION_ABSOLUTE_TTL_MS } from "../config/sessionConfig.js";

export const createSession = async (req, userId) => {
    return new Promise((resolve, reject) => {
        req.session.regenerate((err) => {
            if (err) {
                return reject(new AppError("Failed to create session.", 500));
            }

            const now = Date.now();
            req.session.userId = userId;
            req.session.createdAt = now;
            req.session.lastAccessedAt = now;
            req.session.expiresAt = now + SESSION_ABSOLUTE_TTL_MS;

            resolve({
                userId: req.session.userId,
                createdAt: req.session.createdAt,
                expiresAt: req.session.expiresAt,
                lastAccessedAt: req.session.lastAccessedAt,
            });
        });
    });
};

export const getValidSession = async (req) => {
    if (!req.session.userId) {
        return null;
    }

    const now = Date.now();

    if (req.session.expiresAt && now >= req.session.expiresAt) {
        await destroySession(req);
        return null;
    }

    const lastAccessedAt =
        req.session.lastAccessedAt || req.session.createdAt;

    if (
        now - lastAccessedAt >=
        SESSION_IDLE_TIMEOUT_MS
    ) {
        await destroySession(req);
        return null;
    }

    req.session.lastAccessedAt = now;

    await new Promise((resolve, reject) => {
        req.session.save((err) => {
            if (err) return reject(new AppError("Failed to persist session.", 500));
            resolve();
        });
    });

    return {
        userId: req.session.userId,
        createdAt: req.session.createdAt,
        expiresAt: req.session.expiresAt,
        lastAccessedAt: req.session.lastAccessedAt,
    };
};

export const destroySession = (req) => {
    return new Promise((resolve, reject) => {
        if (!req.session) {
            return resolve();
        }

        req.session.destroy((error) => {
            if (error) {
                return reject(
                    new AppError(
                        "Failed to destroy session.",
                        500
                    )
                );
            }

            resolve();
        });
    });
};