import React from 'react';

const HowItWorksCard = ({ title, description, index }) => {
  return (
    <div className="relative flex flex-col items-center text-center group w-full">
      
      {/* --- CONNECTOR LINE --- */}
      {/* This line sits behind the circles and only shows on large screens */}
      {index < 2 && (
        <div className="hidden lg:block absolute top-12 left-1/2 w-full h-[2px] z-0">
          <div className="w-full h-full border-t-2 border-dashed border-slate-700/50" />
          {/* Animated Gradient Overlay for the line */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/40 to-indigo-500/0 animate-pulse" />
        </div>
      )}

      {/* Number Circle Container */}
      <div className="relative mb-8 z-10">
        {/* The Glowing Circle */}
        <div className="flex h-24 w-24  items-center justify-center rounded-full bg-gradient-to-b from-indigo-500 to-purple-600 text-3xl font-bold text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] ring-8 ring-black transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] group-hover:scale-105">
          {index + 1}
        </div>

        {/* The Green Checkmark Icon */}
        <div className="absolute -right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#22C55E] border-[3px] border-black text-white shadow-lg">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Text Content */}
      <div className="space-y-3 px-6 z-10">
        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-400 max-w-[280px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HowItWorksCard;