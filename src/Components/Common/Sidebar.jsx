import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Slices/AuthSlice';
import chat from "../../assets/Images/chat.png";
import { 
  HiOutlineUserCircle, HiOutlineChatAlt2, 
  HiOutlineCog, HiOutlineLogout,
  HiOutlineStar, HiMenuAlt2, HiX 
} from 'react-icons/hi';

const Sidebar = () => {
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const activeStyle = (path) => 
    location.pathname === path 
      ? "bg-gradient-to-r from-[#4b10b0] via-[#7b2ff7] to-[#4b10b0] bg-[length:200%_auto] text-white shadow-[0_0_20px_rgba(123,47,247,0.4)]" 
      : "text-gray-400 hover:bg-white/5 hover:text-purple-400";

  return (
    <>
      {/* 1. Mobile Top Bar */}
      <div className="flex w-full items-center justify-between bg-[#05010a] px-6 py-4 text-white md:hidden border-b border-white/5 relative z-[80]">
        <button onClick={() => setIsOpen(true)}>
          <HiMenuAlt2 className="text-2xl text-purple-500" />
        </button>
        {/* Mobile Logo Branding */}
        <div className="flex items-center gap-2">
          <img src={chat} alt="ChatFlow" className="w-6 h-6" />
          <span className="font-black tracking-tighter text-lg uppercase">
            {/* Chat<span className="text-indigo-400">Flow</span> */}
          </span>
        </div>
        <div className="h-9 w-9 rounded-full bg-gradient-to-r from-[#7b2ff7] to-[#4b10b0] p-[2px]">
           <img 
            src={user?.profile_pic} 
            className="h-full w-full rounded-full bg-[#05010a] object-cover" 
            alt="profile" 
          />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[65] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 2. Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] flex w-72 transform flex-col bg-[#05010a] transition-all duration-500 ease-in-out
        md:relative md:translate-x-0 border-r border-white/10
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* NEW CHATFLOW LOGO SECTION */}
        <div className="px-6 py-10 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-1 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
              <img src={chat} alt="ChatFlow" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white leading-none">
                Chat<span className="text-indigo-400">Flow</span>
              </span>
              <span className="text-[10px] font-bold text-purple-500/60 tracking-[0.2em] uppercase mt-1">
                {user?.role || "Terminal"}
              </span>
            </div>
          </div>
          {/* Mobile Close Button */}
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsOpen(false)}>
            <HiX className="text-2xl" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-3 px-4 relative z-10">
          {[
            { to: "/dashboard", icon: <HiOutlineChatAlt2 />, label: "MESSAGES" },
            { to: "/dashboard/profile", icon: <HiOutlineUserCircle />, label: "MY PROFILE" },
            { to: "/dashboard/favourites", icon: <HiOutlineStar />, label: "FAVOURITES" },
            { to: "/dashboard/settings", icon: <HiOutlineCog />, label: "SETTINGS" },
          ].map((link) => (
            <Link 
              key={link.to}
              to={link.to} 
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-500 group uppercase font-black text-xs tracking-widest ${activeStyle(link.to)}`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="mt-auto p-6 space-y-6 relative z-10">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-4 px-5 py-2 text-gray-500 hover:text-red-500 transition-colors font-bold text-xs tracking-[0.2em] uppercase"
          >
            <HiOutlineLogout className="text-xl" />
            <span>Sign Out</span>
          </button>

          <div className="group relative rounded-2xl bg-white/[0.03] p-4 border border-white/10 backdrop-blur-xl hover:border-purple-500/50 transition-all duration-500">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#7b2ff7] to-[#4b10b0] p-[2px] shadow-[0_0_15px_rgba(123,47,247,0.3)]">
                  <img 
                    src={user?.profile_pic} 
                    alt="User" 
                    className="h-full w-full rounded-full border-2 border-[#05010a] object-cover" 
                  />
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-[#05010a]"></div>
              </div>
              
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-black text-white uppercase tracking-tight truncate">
                  {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.user_name}
                </span>
                <span className="text-[10px] font-bold text-purple-500/70 tracking-widest uppercase">
                  @{user?.user_name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;