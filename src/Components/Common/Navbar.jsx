import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../Slices/AuthSlice';
import chat from "../../assets/Images/chat.png"
const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { isConnected } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (  
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0E14] py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* LOGO SECTION */}
        <Link to="/" className="flex items-center gap-2">
          <div className=" p-1 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
           <img src={chat} ></img>
       
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Chat<span className="text-indigo-400">Flow</span></span>
        </Link>

        {/* CONDITIONAL CONTENT */}
        {!token ? (
          /* --- GUEST NAVBAR (Matches your Image) --- */
          <div className="flex items-center gap-8">
            <div className="hidden items-center gap-6 text-sm font-medium text-slate-400 md:flex">
              <Link to="/features" className="hover:text-white transition">Features</Link>
              <Link to="/how-it-works" className="hover:text-white transition">How It Works</Link>
              <Link to="/pricing" className="hover:text-white transition">Pricing</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-semibold text-white hover:text-indigo-400 transition">Login</Link>
              <Link to="/signup" className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-sm font-bold text-white shadow-lg hover:opacity-90 transition">
                Sign Up
              </Link>
            </div>
          </div>
        ) : (
          /* --- LOGGED-IN NAVBAR --- */
          <div className="flex items-center gap-6">
             {/* Connection Status */}
             <div className="flex items-center gap-2 rounded-full bg-slate-800/40 px-3 py-1 border border-white/5">
                <div className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  {isConnected ? 'Live' : 'Offline'}
                </span>
             </div>

            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white leading-none">{user?.firstName || "User"}</p>
                <p className="text-[10px] text-indigo-400 font-medium">Dashboard</p>
              </div>
              <img 
                src={user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName}`} 
                alt="Profile" 
                className="h-9 w-9 rounded-full border border-indigo-500/50 object-cover cursor-pointer"
                onClick={() => navigate('/dashboard/my-profile')}
              />
              <button 
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-400 transition ml-2"
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;