import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Loader } from "lucide-react";

import Input from "../components/Input";
import { resetPassword } from "../redux/features/auth/authSlice";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [localError, setLocalError] = useState('');
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();

    const { isLoading, error } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        if(password !== confirmPassword) {
            setLocalError("Passwords do not match");
            return;
        }

        try {
            await dispatch(resetPassword({ token, password })).unwrap();
            setSuccess(true);
            setTimeout(() => navigate("/login"), 3000);
        } catch (err) {}
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full backdrop-filter backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden'
            style={{ background: 'rgba(255,255,255,0.05)' }}
        >
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                    Reset Password
                </h2>

                {success ? (
                    <div className="text-center">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ background: 'rgba(167,139,250,0.15)' }}
                        >
                            <Lock className="w-8 h-8 text-purple-400" />
                        </div>
                        <p className="text-gray-300 mb-2">Password reset successfully!</p>
                        <p className="text-gray-400 text-sm">Redirecting to login...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {(error || localError) && (
                            <p className="text-red-400 font-semibold mb-4">
                                {localError || error}
                            </p>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full py-3 px-4 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200'
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Reset Password"}
                        </motion.button>
                    </form>
                )}
            </div>
        </motion.div>
    )
};

export default ResetPasswordPage;