import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Loader } from "lucide-react";

import Input from "../components/Input";
import { login } from '../redux/features/auth/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, error } = useSelector((state) => state.auth);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login({ email, password })).unwrap();
            navigate('/');
        } catch (error) {}
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full mx-auto my-auto backdrop-filter backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden'
            style={{ background: 'rgba(255,255,255,0.05)' }}
        >
            <div className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-6 text-center bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                    Welcome Back
                </h2>
                <form onSubmit={handleLogin}>
                    <Input icon={Mail} type="email" placeholder="E-mail Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    
                    <div className="flex items-center mb-5 sm:mb-6">
                        <Link to='/forget-password' className="text-sm text-purple-400 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    {error && (
                        <p className="text-red-400 font-semibold mb-4 text-sm">{error}</p>
                    )}
                    
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full py-3 px-4 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200 text-sm sm:text-base'
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Login"}
                    </motion.button>
                </form>
            </div>

            <div className='px-6 sm:px-8 py-4 flex justify-center border-t border-white/10'
                style={{ background: 'rgba(255,255,255,0.03)' }}
            >
                <p className='text-sm text-gray-400'>
                    Don't have an account?{" "}
                    <Link to="/signup" className='text-purple-400 hover:underline'>
                        Sign up
                    </Link>
                </p>
            </div>
        </motion.div>
    )
};

export default Login;