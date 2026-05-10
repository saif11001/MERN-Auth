import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader, Pencil, Trash2, X, Eye, EyeOff } from "lucide-react";
import { logout, editUser, deleteUser } from '../redux/features/auth/authSlice';
import { formatDate } from '../utils/date';

const HomePage = () => {
    const { user, isLoading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [localError, setLocalError] = useState('');

    const handleLogout = async () => {
        await dispatch(logout());
        navigate("/login");
    };

    const openEdit = () => {
        setForm({ name: user?.name || '', email: user?.email || '', password: '' });
        setLocalError('');
        setShowEditModal(true);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setLocalError('');

        const updates = {};
        if (form.name && form.name !== user?.name) updates.name = form.name;
        if (form.email && form.email !== user?.email) updates.email = form.email;
        if (form.password) updates.password = form.password;

        if (Object.keys(updates).length === 0) {
            setLocalError("No changes detected.");
            return;
        }

        try {
            await dispatch(editUser(updates)).unwrap();
            setShowEditModal(false);
        } catch (err) {}
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
            try {
                await dispatch(deleteUser()).unwrap();
                navigate("/login");
            } catch (err) {}
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className='max-w-md w-full mx-auto mt-10 p-8 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10'
                style={{ background: 'rgba(255,255,255,0.05)' }}
            >
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text'>
                    Welcome, {user?.name?.split(" ")[0]}
                </h2>

                <div className='space-y-4'>
                    <motion.div
                        className='p-4 rounded-xl border border-white/10'
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className='text-xl font-semibold text-purple-400 mb-3'>Profile Information</h3>
                        <p className='text-gray-300'>Name: {user?.name}</p>
                        <p className='text-gray-300'>Email: {user?.email}</p>
                    </motion.div>

                    <motion.div
                        className='p-4 rounded-xl border border-white/10'
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className='text-xl font-semibold text-purple-400 mb-3'>Account Activity</h3>
                        <p className='text-gray-300'>
                            <span className='font-bold'>Joined: </span>
                            {new Date(user?.createdAt).toLocaleDateString("en-US", {
                                year: "numeric", month: "long", day: "numeric",
                            })}
                        </p>
                        <p className='text-gray-300'>
                            <span className='font-bold'>Last Login: </span>
                            {user?.lastLogin ? formatDate(user.lastLogin) : "You just signed up!"}
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className='mt-6 flex flex-col gap-3'
                >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={openEdit}
                        className='w-full flex items-center justify-center gap-2 py-3 px-4 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200'
                    >
                        <Pencil className="w-4 h-4" />
                        Edit Profile
                    </motion.button>

                    <div className="flex gap-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleLogout}
                            className='flex-1 py-3 px-4 font-bold rounded-full border border-white/15 text-white hover:bg-white/10 transition duration-200'
                        >
                            Logout
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleDelete}
                            className='flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-white/15 text-purple-600 font-bold rounded-full hover:bg-white/10 transition duration-200'
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Account
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {showEditModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
                        onClick={(e) => e.target === e.currentTarget && setShowEditModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="w-full max-w-md border border-white/10 rounded-2xl shadow-2xl p-8"
                            style={{ background: 'rgba(15,20,60,0.95)' }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                                    Edit Profile
                                </h3>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="text-gray-400 hover:text-white transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleEdit} className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-400 mb-1 block">Name</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full px-4 py-2 rounded-full text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                                        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-400 mb-1 block">Email</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full px-4 py-2 rounded-full text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                                        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-400 mb-1 block">
                                        New Password <span className="text-gray-600">(leave empty to keep current)</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={form.password}
                                            placeholder="••••••••"
                                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                                            className="w-full px-4 py-2 pr-10 rounded-full text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                                            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {(localError || error) && (
                                    <p className="text-red-400 text-sm">{localError || error}</p>
                                )}

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="flex-1 py-2 px-4 border border-white/15 text-white font-bold rounded-full hover:bg-white/10 transition duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-1 py-2 px-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition duration-200 disabled:opacity-50"
                                    >
                                        {isLoading ? <Loader className="w-5 h-5 animate-spin mx-auto" /> : "Save Changes"}
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default HomePage;