import rateLimit from 'express-rate-limit';

export const generalLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: { success: false, message: "Too many requests, please try again after 5 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});

export const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: { success: false, message: "Too many attempts, please try again after 5 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});

export const sensitiveLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: { success: false, message: "Too many attempts, please try again after 5 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});