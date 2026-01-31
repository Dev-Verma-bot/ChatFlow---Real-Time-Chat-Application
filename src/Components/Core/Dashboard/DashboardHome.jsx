import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrueFocus from './TrueFocus';
import { setSelectedChat } from "../../../Slices/ChatSlice";

const DashboardHome = () => {
    const { user } = useSelector((state) => state.profile);
    const dispatch= useDispatch();
    useEffect(()=>{
        dispatch(setSelectedChat(null));
    })
    return (

        <div className="relative flex flex-col items-center justify-center h-full w-full bg-[#05010a] m-0 p-0 overflow-hidden">
            
           
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#7b2ff7]/10 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#5227FF]/10 blur-[100px] rounded-full"></div>
            </div>


            <div className="relative z-10 flex flex-col items-center text-center w-full">
                
                {/* The animated Title */}
                <div className="mb-4">
                    <TrueFocus 
                        sentence="Chat Flow"
                        manualMode={false}
                        blurAmount={10}
                        borderColor="#7b2ff7" 
                        animationDuration={0.8}
                        pauseBetweenAnimations={1.5}
                    />
                </div>

                {/* Subtext */}
                <div className="max-w-md">
                    <h2 className="text-gray-500 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase opacity-80">
                        Welcome, <span className="text-white">{user?.first_name || 'User'}</span>
                    </h2>
                    <div className="mt-3 h-[1px] w-8 bg-gradient-to-r from-transparent via-[#7b2ff7] to-transparent mx-auto"></div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;