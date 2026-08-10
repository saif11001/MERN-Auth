import rateLimit from 'express-rate-limit';

export const generalLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 200,
    message: { success: false, message: "Too many requests, please try again after 5 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});

export const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 20,
    message: { success: false, message: "Too many attempts, please try again after 5 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});

export const sensitiveLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 15,
    message: { success: false, message: "Too many attempts, please try again after 10 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});