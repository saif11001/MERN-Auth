import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

import { verifyEmail } from "../redux/features/auth/authSlice";

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { isLoading, error } = useSelector((state) => state.auth);

    const handleChange = (index, value) => {
        const newCode = [...code];
        if(value.length > 1) {
            const pastCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastCode[i] || "";
            }
            setCode(newCode);
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);
            if(value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    }

    const handleKeyDown = (index, e) => {
        if(e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    const submitCode = async (verificationCode) => {
        try {
            await dispatch(verifyEmail(verificationCode)).unwrap();
            navigate("/");
        } catch (error) {}
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join('');
        await submitCode(verificationCode);
    }

    useEffect(() => {
        if(code.every(digit => digit !== '')) {
            const verificationCode = code.join('');
            submitCode(verificationCode);
        }
    }, [code])

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='backdrop-filter backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-md'
            style={{ background: 'rgba(255,255,255,0.05)' }}
        >
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                Verify Your E-mail
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-between gap-2">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength='6'
                            value={digit}
                            onChange={(e) => { handleChange(index, e.target.value) }}
                            onKeyDown={(e) => { handleKeyDown(index, e) }}
                            className="w-12 h-12 text-center text-2xl font-bold text-white rounded-xl outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                        />
                    ))}
                </div>
                
                {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full py-3 px-4 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 transition duration-200'
                    type="submit"
                >
                    {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Verify Email"}
                </motion.button>
            </form>
        </motion.div>
    )
};

export default EmailVerificationPage;