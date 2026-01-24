import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  // Consistent helper for border and error styling
  const getBorderClass = (fieldName) => 
    errors[fieldName] 
      ? "border-red-500 shadow-[0_1px_0_0_#ef4444]" 
      : "border-white/20 focus-within:border-purple-500";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#05010a] relative overflow-hidden font-sans">
      
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(123,47,247,0.15),_transparent_70%)]"></div>

      {/* Card - Height and Max-Width matches Signup exactly */}
      <div className="relative z-10 w-full max-w-5xl h-[780px] flex rounded-2xl overflow-hidden bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(123,47,247,0.25)] mx-4">
        
        {/* LEFT — Login Form */}
        <div className="w-full md:w-[60%] px-10 lg:px-14 py-8 flex flex-col justify-center">
          <h1 className="text-4xl font-black text-white mb-10 tracking-tight">Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Username Field */}
            <div className="flex flex-col">
              <div className={`group border-b transition-all ${getBorderClass("username")}`}>
                <label className="text-xs uppercase text-gray-400 font-bold tracking-wider">Username</label>
                <div className="flex items-center gap-3">
                  <input 
                    {...register("username", { required: "Username is required" })} 
                    className="w-full bg-transparent py-3 text-white outline-none text-base" 
                    placeholder="Enter your username"
                  />
                  <FaUser className="text-gray-500 group-focus-within:text-purple-400 transition" />
                </div>
              </div>
              {errors.username && (
                <span className="text-[10px] text-red-500 mt-1 font-bold uppercase tracking-tighter">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <div className={`group border-b transition-all ${getBorderClass("password")}`}>
                <label className="text-xs uppercase text-gray-400 font-bold tracking-wider">Password</label>
                <div className="flex items-center gap-3">
                  <input 
                    {...register("password", { required: "Password is required" })} 
                    type={showPassword ? "text" : "password"} 
                    className="w-full bg-transparent py-3 text-white outline-none text-base" 
                    placeholder="••••••••"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="text-gray-500 hover:text-purple-400 transition"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              {errors.password && (
                <span className="text-[10px] text-red-500 mt-1 font-bold uppercase tracking-tighter">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 mt-6 rounded-xl font-black text-xs tracking-[0.25em] text-white 
                bg-gradient-to-r from-[#4b10b0] via-[#7b2ff7] to-[#4b10b0] bg-[length:200%_auto] 
                hover:bg-right shadow-[0_10px_40px_rgba(123,47,247,0.4)] transition-all duration-500 
                uppercase active:scale-95"
            >
              Sign In
            </button>
          </form>

          {/* Redirect to Signup */}
          <p className="mt-12 text-center text-xs text-gray-500 font-bold tracking-widest uppercase">
            Don't have an account? 
            <Link to={"/signup"} className="ml-2 text-purple-400 hover:text-purple-300 underline decoration-purple-800 underline-offset-8">
              Sign Up
            </Link>
          </p>
        </div>

        {/* RIGHT — Welcome Panel (Diagonal Cut) */}
        <div
          className="hidden md:flex w-[40%] relative items-center justify-center bg-gradient-to-br from-[#7b2ff7] via-[#4b10b0] to-[#12042d] overflow-hidden"
          style={{ clipPath: "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        >
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
          
          <div className="relative z-10 text-right px-12">
            <h2 className="text-6xl font-black text-white leading-[0.85] mb-8 uppercase tracking-tighter">
              WELCOME <br /> <span className="opacity-30">BACK</span> <br /> AGAIN
            </h2>
            <div className="h-1.5 w-16 bg-white ml-auto mb-8"></div>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest max-w-[200px] ml-auto leading-loose">
              Enter your credentials and continue your journey with us.
            </p>
          </div>
          
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;