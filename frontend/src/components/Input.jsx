const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-purple-400" />
      </div>

      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-white/5 rounded-full border border-white/15 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:bg-white/10 text-white placeholder-white/40 transition-all duration-200 outline-none"
      />
    </div>
  );
};

export default Input;