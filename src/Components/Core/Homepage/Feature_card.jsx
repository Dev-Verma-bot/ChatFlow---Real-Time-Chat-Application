import React from 'react';

const FeatureCard = ({ title, description, index }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/20">
      
      {/* Interactive Background Glow */}
      <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top Header Section */}
      <div className="mb-6 flex items-center justify-between">
       
        <div className="h-[1px] w-12 bg-gradient-to-r from-indigo-500 to-transparent" />
        <span className="text-4xl font-black text-white/[0.03] select-none transition-colors group-hover:text-indigo-500/10">
          0{index + 1}
        </span>
      </div>

      {/* Text Content */}
      <div className="relative z-10 space-y-3">
        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
          {description}
        </p>
      </div>
      
      {/* Subtle Bottom Border Highlight */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 group-hover:w-full" />
    </div>
  );
};

export default FeatureCard;