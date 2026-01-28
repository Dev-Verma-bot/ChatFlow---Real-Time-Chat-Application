import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { HiSearch } from 'react-icons/hi';

const ContactSidebar = () => {
    const { allUsers } = useSelector((state) => state.auth); 
    const [activeTab, setActiveTab] = useState("All");
    // Changed "Direct" to "Individual"
    const tabs = ["All", "Groups", "Individual"];

    return (
        <aside className="
            flex flex-col h-full overflow-hidden border-l border-white/5
            w-full bg-[#05010a] relative z-20
        ">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[100px] pointer-events-none"></div>

            {/* HEADER: Tabs */}
            <div className="p-2 sm:p-6 relative z-10">
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 backdrop-blur-xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 text-[9px] sm:text-[10px] font-black rounded-lg transition-all uppercase ${
                                activeTab === tab 
                                ? "bg-gradient-to-r from-[#4b10b0] to-[#7b2ff7] text-white shadow-[0_0_10px_rgba(123,47,247,0.2)]" 
                                : "text-gray-500 hover:text-gray-300"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* SEARCH SECTION: Icon moved to the right */}
            <div className="px-2 sm:px-6 pb-4 relative z-10">
                <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-xl p-1 focus-within:border-purple-500/50 transition-all">
                    <input 
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-transparent py-1.5 sm:py-3 px-2 text-[10px] sm:text-sm text-white outline-none placeholder:text-gray-700 font-medium order-1"
                    />
                    <HiSearch className="mr-2 cursor-pointer text-gray-600 group-focus-within:text-purple-400 shrink-0 text-sm sm:text-lg order-2" />
                </div>
            </div>

            {/* LIST Section */}
            <div className="flex-1 overflow-y-auto px-1 sm:px-4 pb-10 custom-scrollbar relative z-10">
                <div className="flex items-center gap-2 px-2 mb-4 mt-2">
                    <span className="h-[1px] flex-1 bg-white/10"></span>
                    {/* Fixed visibility: Changed text-white/20 to text-white/60 and increased brightness */}
                    <h3 className="text-[9px] sm:text-[11px] font-bold text-white/70 uppercase whitespace-nowrap tracking-[0.2em]">
                        {activeTab}
                    </h3>
                    <span className="h-[1px] flex-1 bg-white/10"></span>
                </div>
                
                <div className="space-y-1">
                    <UserListItem name="George Lebo" status="Meet me, I'll update" time="09:45" isOnline={true} avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=George" />
                    <UserListItem name="Amelia Kare" status="I'll finish it..." time="09:40" isOnline={true} unreadCount={1} avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia" />
                    <UserListItem name="Nadia Medvedeva" status="New concept..." time="10:15" avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Nadia" />
                    <UserListItem name="Mistio Team" status="Jordan: Hello guys!" time="10:21" unreadCount={2} avatar="https://api.dicebear.com/7.x/initials/svg?seed=MT" />
                </div>
            </div>
        </aside>
    );
};

const UserListItem = ({ name, status, time, avatar, isOnline, unreadCount }) => (
    <div className="group relative rounded-xl transition-all hover:bg-white/[0.05] cursor-pointer">
        <div className="flex items-center gap-2 sm:gap-4 p-2">
            <div className="relative shrink-0">
                <div className={`h-8 w-8 sm:h-11 sm:w-11 rounded-full p-[1px] ${isOnline ? 'bg-green-500' : 'bg-white/10'}`}>
                    <div className="h-full w-full rounded-full bg-[#05010a] overflow-hidden">
                        <img src={avatar} alt="" className="h-full w-full object-cover" />
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col min-w-0">
                <div className="flex justify-between items-center">
                    <h4 className="text-[10px] sm:text-[12px] font-bold text-white/90 truncate uppercase tracking-tight">{name}</h4>
                    <span className="text-[7px] sm:text-[9px] text-gray-400 shrink-0 ml-1 font-medium">{time}</span>
                </div>
                <div className="flex justify-between items-center gap-1">
                    <p className="text-[9px] sm:text-[11px] text-gray-500 truncate font-medium leading-tight">{status}</p>
                    {unreadCount > 0 && (
                        <span className="flex h-3 w-3 sm:h-4 sm:min-w-[16px] items-center justify-center rounded-full bg-purple-600 text-[7px] sm:text-[8px] font-black text-white shrink-0">
                            {unreadCount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    </div>
);

export default ContactSidebar;