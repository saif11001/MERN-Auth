import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader, Trash2, Trash, CheckCircle, XCircle, ShieldCheck, User } from "lucide-react";
import { formatDate } from "../utils/date";

import {
    getAllUsers,
    deleteUserByAdmin,
    deleteAllUsers,
    logout
} from "../redux/features/auth/authSlice";

const AdminPage = () => {
    const { user, users, isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await dispatch(deleteUserByAdmin(userId));
        }
    };

    const handleDeleteAll = async () => {
        if (window.confirm("Are you sure you want to delete ALL users?")) {
            await dispatch(deleteAllUsers());
        }
    };

    const handleLogout = async () => {
        await dispatch(logout());
        navigate("/login");
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='w-full max-w-4xl mx-auto mt-10 p-8 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-lg'
            style={{ background: 'rgba(255,255,255,0.05)' }}
        >
            <div className="flex justify-between items-center mb-8">
                <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text'>
                    Admin Dashboard
                </h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className='py-2 px-5 bg-white text-gray-900 font-bold rounded-full transition duration-200 hover:bg-gray-100'
                >
                    Logout
                </motion.button>
            </div>

            <motion.div
                className='p-4 rounded-xl border border-white/10 mb-6'
                style={{ background: 'rgba(255,255,255,0.05)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className='text-xl font-semibold text-purple-400 mb-3'>Admin Info</h3>

                <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-1">

                    <div className="col-span-2 flex items-center gap-2 mb-1">
                        <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                        <span className='text-white font-semibold'>{user?.name}</span>
                        <span className='text-xs font-bold px-2 py-0.5 rounded-full bg-purple-900/50 text-purple-400'>
                            admin
                        </span>
                    </div>

                    <div>
                        <p className='text-xs text-gray-500 mb-0.5'>Email</p>
                        <p className='text-gray-300 text-sm'>{user?.email}</p>
                    </div>

                    <div>
                        <p className='text-xs text-gray-500 mb-0.5'>Last Login</p>
                        <p className='text-gray-400 text-sm'>
                            {user?.lastLogin ? formatDate(user.lastLogin) : '—'}
                        </p>
                    </div>

                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className='text-xl font-semibold text-purple-400'>
                        All Users ({users.length})
                    </h3>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDeleteAll}
                        className='flex items-center gap-2 py-2 px-4 border border-white/15 text-purple-600 font-bold rounded-full hover:bg-white/10 transition duration-200'
                    >
                        Delete All
                        <Trash className="w-4 h-4" />
                    </motion.button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <Loader className="w-8 h-8 animate-spin text-purple-400" />
                    </div>
                ) : users.length === 0 ? (
                    <p className="text-gray-400 text-center py-10">No users found</p>
                ) : (
                    <div className="space-y-3">
                        {users.map((u, index) => (
                            <motion.div
                                key={u._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className='p-4 rounded-xl border border-white/10 flex justify-between items-start gap-4'
                                style={{ background: 'rgba(255,255,255,0.05)' }}
                            >
                                <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-1">

                                    <div className="col-span-2 flex items-center gap-2 mb-1">
                                        {u.role === 'admin'
                                            ? <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                                            : <User className="w-4 h-4 text-gray-400 shrink-0" />
                                        }
                                        <span className='text-white font-semibold'>{u.name}</span>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                            u.role === 'admin'
                                                ? 'bg-purple-900/50 text-purple-400'
                                                : 'bg-white/10 text-gray-400'
                                        }`}>
                                            {u.role}
                                        </span>
                                    </div>

                                    <div>
                                        <p className='text-xs text-gray-500 mb-0.5'>Email</p>
                                        <p className='text-gray-300 text-sm'>{u.email}</p>
                                    </div>

                                    <div>
                                        <p className='text-xs text-gray-500 mb-0.5'>Verified</p>
                                        <div className="flex items-center gap-1">
                                            {u.isVerified
                                                ? <><CheckCircle className="w-4 h-4 text-purple-400" /><span className="text-purple-400 text-sm">Yes</span></>
                                                : <><XCircle className="w-4 h-4 text-red-400" /><span className="text-red-400 text-sm">No</span></>
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <p className='text-xs text-gray-500 mb-0.5'>Joined</p>
                                        <p className='text-gray-400 text-sm'>{formatDate(u.createdAt)}</p>
                                    </div>

                                    <div>
                                        <p className='text-xs text-gray-500 mb-0.5'>Last Login</p>
                                        <p className='text-gray-400 text-sm'>
                                            {u.lastLogin ? formatDate(u.lastLogin) : '—'}
                                        </p>
                                    </div>

                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleDeleteUser(u._id)}
                                    className='p-2 border border-white/15 text-purple-600 rounded-lg hover:bg-white/10 transition duration-200 shrink-0 mt-1'
                                >
                                    <Trash2 className="w-4 h-4" />
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default AdminPage;