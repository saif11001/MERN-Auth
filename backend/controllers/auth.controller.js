import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { User } from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendPasswordChangedEmail } from '../nodemailer/emails.js';

export const signup = async (req, res, next) => {
    const { email, password, name } = req.body;
    try{
        if(!email || !password || !name) {
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists) {
            return res.status(400).json({success: false, message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000
        })

        await user.save();
        
        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail({
            email,
            name,
            token: verificationToken
        });

        res.status(201).json({ 
            Success: true,
            message: 'User created successfuly',
            user: {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

export const verifyEmail = async (req, res, next) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        if(!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail({
            email: user.email,
            name: user.name
        })

        res.status(200).json({
            success: true,
            message: "Email verified successfuly",
            user: {
                ...user._doc,
                password: undefined,
            },
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ success: false, message: "invalid credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({success: false, message: "invalid credentials"});
        }

        generateTokenAndSetCookie(res, user._id);
        
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            SUCCESS: true,
            message: "Logged in successfuly",
            user: {
                ...user._doc,
                password: undefined
            },
        });
    } catch (error) {
        res.status(400).json({success: false, message: error.message });
    }
}

export const logout = async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfuly" });
}

export const forgetPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ success: false, message: "invalid credentials"});
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiresAt = Date.now() + 15 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        const resetLink = `${process.env.CLINT_URL}/reset-password/${resetToken}`;
        await sendResetPasswordEmail({
            email: user.email,
            name: user.name,
            resetLink
        })

        res.status(200).json({ success: true, message: 'Password reset link sent to your email' })
        
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });

        if(!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        sendPasswordChangedEmail({
            email: user.email,
            name: user.name
        });

        res.status(200).json({
            success: true,
            message: "Password reset Successfuly",
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const checkAuth = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if(!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}