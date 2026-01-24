import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSign_up_data } from "../Slices/AuthSlice";
import { sendOtp } from "../Services/operations/authApi";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("user");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    // Merge the form data with the current role
    const finalData = { ...data, role };
    
    // 1. Save data to Redux slice
    dispatch(setSign_up_data(finalData));
    
    dispatch(sendOtp(data.email, navigate));
  };

  const getBorderClass = (fieldName) => 
    errors[fieldName] ? "border-red-500 shadow-[0_1px_0_0_#ef4444]" : "border-white/20 focus-within:border-purple-500";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#05010a] relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(123,47,247,0.15),_transparent_70%)]"></div>

      <div className="relative z-10 w-full max-w-5xl h-[780px] flex rounded-2xl overflow-hidden bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(123,47,247,0.25)] mx-4">
        
        <div className="w-full md:w-[60%] px-10 lg:px-14 py-8 flex flex-col justify-center overflow-y-auto">
          <h1 className="text-4xl font-black text-white mb-6 tracking-tight">Create Account</h1>

          {/* Role Toggle */}
          <div className="flex bg-white/5 p-1 rounded-xl w-48 mb-6 border border-white/10">
            <button type="button" onClick={() => setRole("user")} className={`flex-1 py-2 text-xs font-black tracking-widest rounded-lg transition-all ${role === "user" ? "bg-purple-600 text-white" : "text-gray-500"}`}>USER</button>
            <button type="button" onClick={() => setRole("admin")} className={`flex-1 py-2 text-xs font-black tracking-widest rounded-lg transition-all ${role === "admin" ? "bg-purple-600 text-white" : "text-gray-500"}`}>ADMIN</button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <div className={`group border-b transition-all ${getBorderClass("firstName")}`}>
                  <label className="text-xs uppercase text-gray-400 font-bold">First Name</label>
                  <input {...register("firstName", { required: "First name is required" })} className="w-full bg-transparent py-2 text-white outline-none text-base" />
                </div>
                {errors.firstName && <span className="text-[10px] text-red-500 mt-1 font-bold uppercase tracking-tighter">{errors.firstName.message}</span>}
              </div>
              
              <div className="flex flex-col">
                <div className={`group border-b transition-all ${getBorderClass("lastName")}`}>
                  <label className="text-xs uppercase text-gray-400 font-bold">Last Name</label>
                  <input {...register("lastName", { required: "Last name is required" })} className="w-full bg-transparent py-2 text-white outline-none text-base" />
                </div>
                {errors.lastName && <span className="text-[10px] text-red-500 mt-1 font-bold uppercase tracking-tighter">{errors.lastName.message}</span>}
              </div>
            </div>

            <div className="flex flex-col">
              <div className={`group border-b transition-all ${getBorderClass("email")}`}>
                <label className="text-xs uppercase text-gray-400 font-bold">Email Address</label>
                <div className="flex items-center gap-3">
                  <input {...register("email", { required: "Email is required" })} type="email" className="w-full bg-transparent py-2 text-white outline-none text-base" placeholder="name@example.com" />
                  <FaEnvelope className="text-gray-500 group-focus-within:text-purple-400" />
                </div>
              </div>
              {errors.email && <span className="text-[10px] text-red-500 mt-1 font-bold uppercase tracking-tighter">{errors.email.message}</span>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <div className={`group border-b transition-all ${getBorderClass("password")}`}>
                  <label className="text-xs uppercase text-gray-400 font-bold">Password</label>
                  <div className="flex items-center gap-3">
                    <input {...register("password", { required: "Password is required" })} type={showPassword ? "text" : "password"} className="w-full bg-transparent py-2 text-white outline-none text-base" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-purple-400">{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                  </div>
                </div>
                {errors.password && <span className="text-[10px] text-red-500 mt-1 font-bold uppercase tracking-tighter">{errors.password.message}</span>}
              </div>

              <div className="flex flex-col">
                <div className={`group border-b transition-all ${getBorderClass("confirmPassword")}`}>
                  <label className="text-xs uppercase text-gray-400 font-bold">Confirm Password</label>
                  <div className="flex items-center gap-3">
                    <input {...register("confirmPassword", { 
                        required: "Please confirm password", 
                        validate: value => value === password || "Passwords do not match" 
                      })} 
                      type={showConfirmPassword ? "text" : "password"} 
                      className="w-full bg-transparent py-2 text-white outline-none text-base" 
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-gray-500 hover:text-purple-400">{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</button>
                  </div>
                </div>
                {errors.confirmPassword && <span className="text-[10px] text-red-500 mt-1 font-bold uppercase tracking-tighter">{errors.confirmPassword.message}</span>}
              </div>
            </div>

            <div>
              <div className="flex gap-10 py-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" value="male" {...register("gender", { required: "Select gender" })} className="accent-purple-600 w-4 h-4" defaultChecked />
                  <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">Male</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" value="female" {...register("gender", { required: "Select gender" })} className="accent-purple-600 w-4 h-4" />
                  <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">Female</span>
                </label>
              </div>
              {errors.gender && <span className="text-[10px] text-red-500 font-bold uppercase tracking-tighter">{errors.gender.message}</span>}
            </div>

            <button type="submit" className="w-full py-4 mt-2 rounded-xl font-black text-xs tracking-[0.25em] text-white bg-gradient-to-r from-[#4b10b0] via-[#7b2ff7] to-[#4b10b0] bg-[length:200%_auto] hover:bg-right shadow-[0_10px_40px_rgba(123,47,247,0.4)] transition-all duration-500 uppercase active:scale-95">
              REGISTER AS {role}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-500 font-bold tracking-widest uppercase">
            Have an account? <Link to={"/login"} className="ml-2 text-purple-400 hover:text-purple-300 underline decoration-purple-800 underline-offset-8">Sign In</Link>
          </p>
        </div>

        <div className="hidden md:flex w-[40%] relative items-center justify-center bg-gradient-to-br from-[#7b2ff7] via-[#4b10b0] to-[#12042d]" style={{ clipPath: "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)" }}>
          <div className="relative z-10 text-right px-12 text-white">
            <h2 className="text-6xl font-black leading-[0.85] mb-8 uppercase tracking-tighter">READY <br /> <span className="opacity-30">TO</span> <br /> EXPLORE?</h2>
            <div className="h-1.5 w-16 bg-white ml-auto mb-8"></div>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest max-w-[200px] ml-auto leading-loose">Create your profile and unlock the full potential of our system.</p>
          </div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;