import React, { useState, useEffect, useRef } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const OTPPage = () => {
  const [otp, setOtp] = useState(""); // OTP is now a simple string
  const [timer, setTimer] = useState(59);
  const [error, setError] = useState("");
  
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();
  const { signupData } = useSelector((state) => state.auth);

  // Protection logic
  useEffect(() => {
    if (!signupData) navigate("/signup");
  }, [signupData, navigate]);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const otpArray = otp.split("");
    otpArray[index] = value.slice(-1); // Take the last character entered
    const newOtpString = otpArray.join("");
    
    setOtp(newOtpString);

    // Auto-focus next box
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();

    if (otp.length < 4) {
      setError("Please enter the complete 4-digit code");
      return;
    }

    const finalFormSubmission = {
      ...signupData,
      otp: otp, // Sending the string directly
      status: "verified"
    };

    console.log("🚀 FINAL DATA AS STRING:", finalFormSubmission);
    alert("Success! Check the console for the string OTP.");
  };

  if (!signupData) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#05010a] relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(123,47,247,0.15),_transparent_70%)]"></div>

      <div className="relative z-10 w-full max-w-5xl h-[780px] flex rounded-2xl overflow-hidden bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(123,47,247,0.25)] mx-4">
        
        <div className="w-full md:w-[60%] px-10 lg:px-14 py-8 flex flex-col justify-center">
          <div className="mb-10">
            <div className="w-20 h-20 bg-purple-600/20 border border-purple-500 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(123,47,247,0.3)]">
                <FaShieldAlt className="text-purple-400 text-4xl" />
            </div>
            <h1 className="text-4xl font-black text-white mb-3 tracking-tight">Verify Email</h1>
            <p className="text-gray-400 text-base font-medium">
              Code sent to: <span className="text-purple-400 font-bold">{signupData.email}</span>
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-12">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    value={otp[index] || ""}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-[70px] h-[80px] text-center text-3xl font-black rounded-xl border-b-2 border-white/10 bg-white/5 text-white outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                  />
                ))}
              </div>
              
              {error && <span className="text-xs text-red-500 mt-6 font-bold uppercase tracking-widest">{error}</span>}
            </div>

            <div className="space-y-6">
                <button type="submit" className="w-full py-4 rounded-xl font-black text-xs tracking-[0.25em] text-white bg-gradient-to-r from-[#4b10b0] via-[#7b2ff7] to-[#4b10b0] bg-[length:200%_auto] hover:bg-right shadow-[0_10px_40px_rgba(123,47,247,0.4)] transition-all uppercase active:scale-95">
                  Confirm & Complete
                </button>

                <div className="text-center">
                    {timer > 0 ? (
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                            New code in <span className="text-purple-400">{timer}s</span>
                        </p>
                    ) : (
                        <button type="button" onClick={() => { setTimer(59); setOtp(""); }} className="text-xs text-purple-400 font-black uppercase tracking-widest underline underline-offset-8">
                            Resend Code
                        </button>
                    )}
                </div>
            </div>
          </form>
        </div>

        <div className="hidden md:flex w-[40%] relative items-center justify-center bg-gradient-to-br from-[#7b2ff7] via-[#4b10b0] to-[#12042d]" style={{ clipPath: "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)" }}>
          <div className="relative z-10 text-right px-12 text-white font-black">
            <h2 className="text-6xl leading-[0.85] mb-8 uppercase tracking-tighter">SECURE <br /> <span className="opacity-30">ACCESS</span></h2>
            <div className="h-1.5 w-16 bg-white ml-auto mb-8"></div>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest max-w-[200px] ml-auto">Verify your identity to proceed to the terminal.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;