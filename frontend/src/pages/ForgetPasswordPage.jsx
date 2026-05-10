import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Loader, ArrowLeft } from "lucide-react";

import Input from "../components/Input";
import { forgetPassword } from "../redux/features/auth/authSlice";

const ForgetPasswordPage = () => {

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(forgetPassword(email)).unwrap();
            setSubmitted(true);
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
                    Forgot Password
                </h2>

                {submitted ? (
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ background: 'rgba(167,139,250,0.15)' }}
                        >
                            <Mail className="w-8 h-8 text-purple-400" />
                        </div>
                        <p className="text-gray-300 mb-6">
                            If an account exists for <span className="text-purple-400 font-bold">{email}</span>, you will receive a password reset link shortly.
                        </p>
                        <Link to="/login" className="text-purple-400 hover:underline flex items-center justify-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <p className="text-gray-400 mb-6 text-center">
                            Enter your email and we'll send you a reset link.
                        </p>

                        <Input
                            icon={Mail}
                            type="email"
                            placeholder="E-mail Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {error && (
                            <p className="text-red-400 font-semibold mb-4">{error}</p>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full py-3 px-4 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200'
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Send Reset Link"}
                        </motion.button>
                    </form>
                )}
            </div>

            {!submitted && (
                <div className='px-8 py-4 flex justify-center border-t border-white/10'
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                    <Link to="/login" className='text-sm text-purple-400 hover:underline flex items-center gap-2'>
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </Link>
                </div>
            )}
        </motion.div>
    )
};

export default ForgetPasswordPage;