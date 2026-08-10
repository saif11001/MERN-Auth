import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({ icon: Icon, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-purple-400" />
      </div>

      <input
        {...props}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        className="w-full pl-10 pr-10 py-2 bg-white/5 rounded-full border border-white/15 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:bg-white/10 text-white placeholder-white/40 transition-all duration-200 outline-none"
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      )}
    </div>
  );
};

export default Input;