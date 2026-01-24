import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";

const ChatCTA = () => {
  return (
    <section className="relative w-full py-[200px] overflow-hidden bg-black">

      {/* Ambient glow (same vibe as homepage) */}
      <div className="absolute -top-30 left-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-[140px]" />
  
      <div className="relative z-10 mx-auto max-w-7xl w-11/12 flex flex-col lg:flex-row gap-16 items-center justify-between">

        {/* LEFT */}
          <div className="lg:w-[45%] relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-25" />

          <div className="relative bg-[#020617] border border-white/10 rounded-xl shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-black border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-2 text-xs text-slate-400 font-mono">
                Convoo
              </span>
            </div>

            {/* Fixed height terminal */}
            <div className="h-[220px] p-6 font-mono text-sm md:text-base text-white">
              <TypeAnimation
                sequence={[
                  "Connecting to secure server...",
                  800,
                  "Connecting to secure server...\nEncrypted tunnel established.",
                  800,
                  "Connecting to secure server...\nEncrypted tunnel established.\nYou: Hey, is the message delivered?",
                  1000,
                  "Connecting to secure server...\nEncrypted tunnel established.\nYou: Hey, is the message delivered?\nServer: Delivered instantly!",
                  1200,
                  "",
                  800,
                ]}
                speed={45}
                repeat={Infinity}
                cursor={true}
                style={{ whiteSpace: "pre-line", display: "block" }}
              />
            </div>

          </div>
        </div>
{/* right  */}
        <div className="lg:w-[40%] space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Ready to Start <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
              Chatting?
            </span>
          </h2>

          <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
            Experience real-time messaging with blazing fast delivery,
            end-to-end encryption, and a premium dark interface.
          </p>

          {/* BUTTONS — MATCH HOMEPAGE */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/login"
              className="group text-center relative overflow-hidden rounded-full
              bg-indigo-600 px-10 py-4 text-md font-bold
              transition-all duration-200 hover:bg-indigo-500
              active:scale-95 shadow-lg  shadow-indigo-500/30"
            >
              Get Started Free
            </Link>

            <button
              className="rounded-full px-10 py-4 text-md font-bold
              border border-white/15 text-white
              bg-white/[0.03] backdrop-blur
              hover:bg-white/[0.06] transition-all duration-200"
            >
              Watch Demo
            </button>
          </div>
        </div>

      
      </div>
    </section>
  );
};

export default ChatCTA;
