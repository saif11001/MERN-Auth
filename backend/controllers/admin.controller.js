import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const adminId = req.userId;
        const users = await User.find({ _id: { $ne: adminId } }).sort({ createdAt: -1 });
        if(users.length === 0) {
            return res.status(200).json({ success: true, users: [] })
        }
        const safeUsers = users.map(user => ({
          ...user._doc,
          password: undefined
        }));

        res.status(200).json({
            success: true,
            users: safeUsers
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const getUser = async (req, res, next) => {
    try {
        const { userId } =  req.params;
        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "There is no user with this email address"
            })
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
};

export const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

        if(!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        res.status(200).json({
            success: true,
            message: "Deleted user successfuly",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteAllUser = async (req, res, next) => {
    try {
        const userId = req.userId;
        const result = await User.deleteMany({ _id: { $ne: userId } });
        if(!result){
            return res.status(404).json({ success: false, message: "Something went wrong" });
        }

        res.status(200).json({
            success: true,
            message: `Deleted ${result.deletedCount} users`
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};