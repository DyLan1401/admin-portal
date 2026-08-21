export const LOGIN_RATE_LIMIT_WINDOW_MS =
    Number(process.env.LOGIN_RATE_LIMIT_WINDOW_MS) ||
    15 * 60 * 1000;

export const LOGIN_RATE_LIMIT_MAX =
    Number(process.env.LOGIN_RATE_LIMIT_MAX) ||
    15;