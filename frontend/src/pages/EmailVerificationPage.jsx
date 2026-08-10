import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

import { verifyEmail, resendVerification, clearError } from "../redux/features/auth/authSlice";

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [cooldown, setCooldown] = useState(0);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { isLoading, isResending, resendMessage, error } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleChange = (index, value) => {
        if (value && !/^\d$/.test(value)) return;

        const newCode = [...code];

        if (value.length > 1) {
            const pastCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastCode[i] || "";
            }
            setCode(newCode);
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex]?.focus();
        } else {
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (code[index]) {
                const newCode = [...code];
                newCode[index] = "";
                setCode(newCode);
            } else if (index > 0) {
                const newCode = [...code];
                newCode[index - 1] = "";
                setCode(newCode);
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            e.preventDefault();
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
            e.preventDefault();
            inputRefs.current[index + 1]?.focus();
        }
    }

    const submitCode = async (verificationCode) => {
        try {
            await dispatch(verifyEmail(verificationCode)).unwrap();
            navigate("/");
        } catch (error) {
            setCode(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join('');
        if (verificationCode.length === 6) {
            await submitCode(verificationCode);
        }
    }

    const handleResend = async () => {
        try {
            await dispatch(resendVerification()).unwrap();
            setCode(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
            setCooldown(60);
        } catch (err) {}
    }

    useEffect(() => {
        if(code.every(digit => digit !== '')) {
            const verificationCode = code.join('');
            submitCode(verificationCode);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code])

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='my-auto backdrop-filter backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md mx-auto'
            style={{ background: 'rgba(255,255,255,0.05)' }}
        >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center bg-linear-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                Verify Your E-mail
            </h2>
            <p className="text-gray-400 text-sm text-center mb-5 sm:mb-6">
                Enter the 6-digit code we sent to your email
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-between gap-1 sm:gap-2">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength='6'
                            value={digit}
                            onChange={(e) => { handleChange(index, e.target.value) }}
                            onKeyDown={(e) => { handleKeyDown(index, e) }}
                            className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl sm:text-2xl font-bold text-white rounded-xl outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                        />
                    ))}
                </div>
                
                {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                {resendMessage && !error && (
                    <p className="text-purple-400 text-sm text-center">{resendMessage}</p>
                )}

                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full py-3 px-4 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 transition duration-200 text-sm sm:text-base'
                    type="submit"
                >
                    {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Verify Email"}
                </motion.button>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={isResending || cooldown > 0}
                        className="text-sm text-purple-400 hover:underline disabled:text-gray-500 disabled:no-underline disabled:cursor-not-allowed"
                    >
                        {isResending
                            ? "Sending..."
                            : cooldown > 0
                                ? `Resend code in ${cooldown}s`
                                : "Didn't get the code? Resend"}
                    </button>
                </div>
            </form>
        </motion.div>
    )
};

export default EmailVerificationPage;