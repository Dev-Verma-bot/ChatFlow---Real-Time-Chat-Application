import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useForm } from 'react-hook-form';
import { HiSearch, HiX } from 'react-icons/hi';
import { SearchUser, GetChatters } from '../../Services/operations/Search_UserApi';
import { setSelectedChat } from '../../Slices/ChatSlice'; 
import { useNavigate } from 'react-router-dom';

const ContactSidebar = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { selectedChat } = useSelector((state) => state.chat); 
    
    const [activeTab, setActiveTab] = useState("All");
    const [allChatters, setAllChatters] = useState([]); 
    const [displayedUsers, setDisplayedUsers] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const navigate= useNavigate();

    const tabs = ["All", "Groups", "Individual"];
    const { register, handleSubmit, reset, watch } = useForm();
    const searchFieldValue = watch("searchField");

    useEffect(() => {
        const fetchInitialChatters = async () => {
            setLoading(true);
            const result = await GetChatters(token);
            if (result) {
                setAllChatters(result);
                setDisplayedUsers(result);
            }
            setLoading(false);
        };
        fetchInitialChatters();
    }, [token]);

    useEffect(() => {
        if (!searchFieldValue || searchFieldValue.trim() === "") {
            setIsSearching(false);
            setDisplayedUsers(allChatters);
        }
    }, [searchFieldValue, allChatters]);

    const handleSearchUser = async (formData) => {
        const query = formData.searchField.trim();
        if (!query) {
            setDisplayedUsers(allChatters);
            return;
        }
        setLoading(true);
        setIsSearching(true);
        const result = await SearchUser(query, token);
        if (result) {
            setDisplayedUsers(result);
        }
        setLoading(false);
    };

    const clearSearch = () => {
        reset({ searchField: "" }); 
        setIsSearching(false);
        setDisplayedUsers(allChatters); 
    };

    // Updated: This function now updates the Redux State
    const handle_selected_user = (user) => {
        dispatch(setSelectedChat(user));
        navigate('./message');
    };

    return (
        <aside className="flex flex-col h-full overflow-hidden border-l border-white/5 w-full bg-[#05010a] relative z-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[100px] pointer-events-none"></div>

            {/* HEADER: Tabs */}
            <div className="p-2 sm:p-6 relative z-10">
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 backdrop-blur-xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                clearSearch();
                            }}
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

            {/* SEARCH SECTION */}
            <form className="px-2 sm:px-6 pb-4 relative z-10" onSubmit={handleSubmit(handleSearchUser)}>
                <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-xl p-1 focus-within:border-purple-500/50 transition-all">
                    <input 
                        type="text"
                        {...register("searchField")} 
                        placeholder="Search users..."
                        className="w-full bg-transparent py-1.5 sm:py-3 px-2 text-[10px] sm:text-sm text-white outline-none placeholder:text-gray-700 font-medium order-1"
                    />
                    <div className="flex items-center gap-1 order-2">
                        {(isSearching || searchFieldValue) && (
                            <HiX 
                                onClick={clearSearch}
                                className="cursor-pointer text-gray-500 hover:text-red-400 text-sm sm:text-lg mr-1"
                            />
                        )}
                        <button type="submit">
                            <HiSearch className="mr-2 cursor-pointer text-gray-600 hover:text-purple-400 shrink-0 text-sm sm:text-lg" />
                        </button>
                    </div>
                </div>
            </form>

            {/* LIST Section */}
            <div className="flex-1 overflow-y-auto px-1 sm:px-4 pb-10 custom-scrollbar relative z-10">
                <div className="flex items-center gap-2 px-2 mb-4 mt-2">
                    <span className="h-[1px] flex-1 bg-white/10"></span>
                    <h3 className={`text-[10px] sm:text-[12px] font-black uppercase whitespace-nowrap tracking-[0.2em] ${isSearching ? 'text-purple-400' : 'text-white/70'}`}>
                        {isSearching ? "Search Results" : activeTab}
                    </h3>
                    <span className="h-[1px] flex-1 bg-white/10"></span>
                </div>
                
                <div className="space-y-1">
                    {displayedUsers && displayedUsers.length > 0 ? (
                        displayedUsers.map((user) => (
                            <div 
                                key={user._id} 
                                onClick={() => handle_selected_user(user)} // Pass user to Redux
                                className={`group relative rounded-xl transition-all cursor-pointer ${
                                    selectedChat?._id === user._id 
                                    ? "bg-white/[0.1] border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]" 
                                    : "hover:bg-white/[0.05] border border-transparent"
                                }`}
                            >
                                <div className="flex items-center gap-2 sm:gap-4 p-2">
                                    <div className="relative shrink-0">
                                        <div className={`h-8 w-8 sm:h-11 sm:w-11 rounded-full p-[1px] ${
                                            selectedChat?._id === user._id ? "bg-purple-500" : "bg-white/10"
                                        }`}>
                                            <div className="h-full w-full rounded-full bg-[#05010a] overflow-hidden">
                                                <img 
                                                    src={user.profile_pic || `https://api.dicebear.com/7.x/initials/svg?seed=${user.first_name}`} 
                                                    alt={user.first_name} 
                                                    className="h-full w-full object-cover" 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col min-w-0">
                                        <div className="flex justify-between items-center">
                                            <h4 className={`text-[10px] sm:text-[12px] font-bold truncate uppercase tracking-tight ${
                                                selectedChat?._id === user._id ? "text-purple-400" : "text-white/90"
                                            }`}>
                                                {user.first_name} {user.last_name}
                                            </h4>
                                        </div>
                                        <div className="flex justify-between items-center gap-1">
                                            <p className="text-[9px] sm:text-[11px] text-gray-500 truncate font-medium leading-tight">
                                                @{user.user_name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-4">
                            <p className="text-center">
                                {loading ? (
                                    <span className="text-purple-400 animate-pulse font-black text-xs sm:text-sm uppercase tracking-widest">Loading...</span>
                                ) : isSearching ? (
                                    <span className="text-red-500 font-black text-sm sm:text-base uppercase tracking-widest">No User Found</span>
                                ) : (
                                    <span className="text-gray-600 font-bold text-[10px] sm:text-xs uppercase">No active conversations</span>
                                )}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default ContactSidebar;