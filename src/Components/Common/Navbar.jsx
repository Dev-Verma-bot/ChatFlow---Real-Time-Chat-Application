import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../Slices/AuthSlice';
import chat from "../../assets/Images/chat.png";
import Sidebar from './Sidebar';
const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (token) {
    return <Sidebar/>;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0E14] py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="p-1 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
            <img src={chat} alt="ChatFlow" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Chat<span className="text-indigo-400">Flow</span>
          </span>
        </Link>

        {/* GUEST NAVBAR ONLY */}
        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-400 md:flex">
            <Link to="/features" className="hover:text-white transition">Features</Link>
            <Link to="/how-it-works" className="hover:text-white transition">How It Works</Link>
            <Link to="/pricing" className="hover:text-white transition">Pricing</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-white hover:text-indigo-400 transition">
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-sm font-bold text-white shadow-lg hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
